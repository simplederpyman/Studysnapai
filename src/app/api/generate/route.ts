import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json() as { content: string; type: string; config: { subject?: string; level?: string; language?: string; count?: number } }
  const { content, type, config } = body

  const apiKey = process.env.OPENROUTER_API_KEY
  const model = process.env.OPENROUTER_MODEL || 'qwen/qwen3-plus:free'

  if (!apiKey) {
    return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 })
  }

  let prompt = ''
  if (type === 'quiz') {
    prompt = `Genereer ${config.count || 10} multiple choice vragen op basis van de volgende inhoud. Geef de output als een JSON array met objecten die de volgende velden hebben: question (string), options (array van 4 strings), correctAnswer (index 0-3 als integer), explanation (string).\n\nInhoud:\n${content}`
  } else if (type === 'flashcards') {
    prompt = `Genereer ${config.count || 10} flashcards op basis van de volgende inhoud. Geef de output als een JSON array met objecten die de volgende velden hebben: front (term of vraag als string), back (definitie of antwoord als string).\n\nInhoud:\n${content}`
  } else if (type === 'explanation') {
    prompt = `Maak een duidelijke uitleg van de volgende inhoud in het ${config.language || 'Nederlands'}. Gebruik kopjes, bullet points en voorbeelden waar van toepassing.\n\nInhoud:\n${content}`
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://studysnap.ai',
      'X-Title': 'StudySnap AI',
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'Je bent een intelligente studieassistent die leermateriaal genereert. Antwoord altijd in geldig JSON formaat tenzij anders gevraagd.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 4000,
    }),
    signal: AbortSignal.timeout(60000),
  })

  if (!response.ok) {
    const error = await response.text()
    return NextResponse.json({ error: `OpenRouter API error: ${error}` }, { status: response.status })
  }

  const data = await response.json() as { choices: Array<{ message: { content: string } }> }
  const resultText = data.choices[0]?.message?.content || ''

  let parsedResult
  try {
    const jsonMatch = resultText.match(/```(?:json)?\n?([\s\S]*?)\n?```/)
    parsedResult = JSON.parse(jsonMatch ? jsonMatch[1] : resultText) as unknown
  } catch {
    parsedResult = { raw: resultText }
  }

  return NextResponse.json({ result: parsedResult, raw: resultText })
}
