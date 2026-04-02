'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, ArrowLeft, ArrowRight, FileText, Link as LinkIcon, Loader2, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

type Step = 1 | 2 | 3
type InputType = 'text' | 'url'
type OutputType = 'flashcards' | 'quiz' | 'explanation'

interface GeneratedItem {
  front?: string
  back?: string
  question?: string
  options?: string[]
  correctAnswer?: number
  explanation?: string
}

interface GeneratedResult {
  result: GeneratedItem[] | Record<string, unknown>
  raw: string
}

export default function CreatePage() {
  const [step, setStep] = useState<Step>(1)
  const [inputType, setInputType] = useState<InputType>('text')
  const [content, setContent] = useState('')
  const [outputType, setOutputType] = useState<OutputType>('flashcards')
  const [subject, setSubject] = useState('')
  const [level, setLevel] = useState('middelbaar')
  const [language, setLanguage] = useState('Nederlands')
  const [count, setCount] = useState(10)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GeneratedResult | null>(null)
  const [currentCard, setCurrentCard] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast.error('Voer eerst inhoud in')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, type: outputType, config: { subject, level, language, count } }),
      })
      if (!res.ok) throw new Error('Generatie mislukt')
      const data = await res.json() as GeneratedResult
      setResult(data)
      setStep(3)
      toast.success('Content gegenereerd!')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Er is een fout opgetreden'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const getItems = (): GeneratedItem[] => {
    if (!result) return []
    if (Array.isArray(result.result)) return result.result as GeneratedItem[]
    if (result.result && typeof result.result === 'object') {
      const r = result.result as Record<string, unknown>
      if (Array.isArray(r.flashcards)) return r.flashcards as GeneratedItem[]
      if (Array.isArray(r.questions)) return r.questions as GeneratedItem[]
      if (Array.isArray(r.items)) return r.items as GeneratedItem[]
    }
    return []
  }

  const items = getItems()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Aanmaken
              </span>
            </div>
            <div className="text-sm text-gray-500">Stap {step}/3</div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-0">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`flex-1 h-1 ${s <= step ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-gray-100'}`} />
            ))}
          </div>
          <div className="flex justify-between py-3 text-xs text-gray-500">
            <span className={step >= 1 ? 'text-blue-600 font-medium' : ''}>1. Invoer</span>
            <span className={step >= 2 ? 'text-blue-600 font-medium' : ''}>2. Configuratie</span>
            <span className={step >= 3 ? 'text-blue-600 font-medium' : ''}>3. Resultaat</span>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Input */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Voeg je studiemateriaal toe</h2>
            <p className="text-gray-600 mb-6">Upload een foto, plak tekst, of geef een URL op</p>

            <div className="flex gap-2 mb-6">
              {[
                { id: 'text', label: 'Tekst', icon: FileText },
                { id: 'url', label: 'URL', icon: LinkIcon },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setInputType(tab.id as InputType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    inputType === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {inputType === 'text' && (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Plak hier je aantekeningen, tekst uit een boek, of andere studiematerialen..."
                className="w-full h-64 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              />
            )}

            {inputType === 'url' && (
              <input
                type="url"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="https://..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => {
                  if (!content.trim()) { toast.error('Voer eerst inhoud in'); return }
                  setStep(2)
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                Volgende stap <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Configuration */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Configureer je content</h2>
            <p className="text-gray-600 mb-6">Stel in hoe je wilt dat de AI content genereert</p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type output</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'flashcards', label: 'Flashcards', desc: 'Term & definitie' },
                    { id: 'quiz', label: 'Quiz', desc: 'Meerkeuzevragen' },
                    { id: 'explanation', label: 'Uitleg', desc: 'Gestructureerde uitleg' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setOutputType(opt.id as OutputType)}
                      className={`p-4 rounded-xl border-2 text-left transition-colors ${
                        outputType === opt.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vak (optioneel)</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Bijv. Biologie, Geschiedenis..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niveau</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="basisschool">Basisschool</option>
                    <option value="middelbaar">Middelbaar</option>
                    <option value="mbo">MBO</option>
                    <option value="hbo">HBO</option>
                    <option value="universiteit">Universiteit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taal</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="Nederlands">Nederlands</option>
                    <option value="Engels">Engels</option>
                    <option value="Frans">Frans</option>
                    <option value="Duits">Duits</option>
                    <option value="Spaans">Spaans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aantal items: {count}</label>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>5</span><span>30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Terug
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                {loading ? 'Genereren...' : 'Genereer met AI'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && result && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Content gegenereerd!</h2>
                <p className="text-gray-500 text-sm">{items.length} items aangemaakt</p>
              </div>
            </div>

            {outputType === 'flashcards' && items.length > 0 && (
              <div className="space-y-4">
                <div
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-48 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setFlipped(!flipped)}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                      {flipped ? 'Antwoord' : 'Vraag'} ({currentCard + 1}/{items.length})
                    </div>
                    <div className="text-xl font-medium text-gray-900">
                      {flipped ? items[currentCard]?.back : items[currentCard]?.front}
                    </div>
                    <div className="text-sm text-gray-400 mt-4">Klik om te draaien</div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    onClick={() => { setCurrentCard(Math.max(0, currentCard - 1)); setFlipped(false) }}
                    disabled={currentCard === 0}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Vorige
                  </button>
                  <button
                    onClick={() => { setCurrentCard(Math.min(items.length - 1, currentCard + 1)); setFlipped(false) }}
                    disabled={currentCard === items.length - 1}
                    className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Volgende
                  </button>
                </div>
              </div>
            )}

            {outputType === 'quiz' && items.length > 0 && (
              <div className="space-y-4">
                {items.slice(0, 5).map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="font-medium text-gray-900 mb-4">{i + 1}. {item.question}</div>
                    <div className="space-y-2">
                      {item.options?.map((opt, j) => (
                        <div key={j} className={`p-3 rounded-xl border text-sm ${j === item.correctAnswer ? 'border-green-300 bg-green-50 text-green-700' : 'border-gray-200'}`}>
                          {String.fromCharCode(65 + j)}. {opt}
                        </div>
                      ))}
                    </div>
                    {item.explanation && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-xl text-sm text-blue-700">
                        💡 {item.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {outputType === 'explanation' && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
                  {result.raw}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => { setStep(1); setResult(null); setContent(''); setCurrentCard(0); setFlipped(false) }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Nieuw aanmaken
              </button>
              <Link href="/library" className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Opslaan in bibliotheek <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
