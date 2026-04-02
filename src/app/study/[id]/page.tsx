'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, ArrowLeft, ArrowRight, RotateCcw, Check, X, BookOpen } from 'lucide-react'

const DEMO_FLASHCARDS = [
  { id: 1, front: 'Wat is fotosynthese?', back: 'Het proces waarbij planten licht omzetten in glucose en zuurstof.' },
  { id: 2, front: 'Wat is de mitochondria?', back: 'Het organel dat energie produceert voor de cel (ATP).' },
  { id: 3, front: 'Wat is osmose?', back: 'De beweging van water door een semipermeabel membraan van hoog naar laag concentratie.' },
  { id: 4, front: 'Wat is DNA?', back: 'Deoxyribonucleïnezuur: het molecuul dat genetische informatie bevat.' },
  { id: 5, front: 'Wat is een enzym?', back: 'Een biologische katalysator die chemische reacties versnelt in levende organismen.' },
]

export default function StudyPage({ params }: { params: { id: string } }) {
  const [mode, setMode] = useState<'select' | 'flashcard' | 'quiz'>('select')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [score, setScore] = useState({ correct: 0, incorrect: 0 })
  const [quizAnswered, setQuizAnswered] = useState<number | null>(null)

  const cards = DEMO_FLASHCARDS
  const current = cards[currentIndex]

  const handleNext = (correct?: boolean) => {
    if (correct !== undefined) {
      setScore(prev => ({
        correct: correct ? prev.correct + 1 : prev.correct,
        incorrect: correct ? prev.incorrect : prev.incorrect + 1
      }))
    }
    setFlipped(false)
    setQuizAnswered(null)
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const reset = () => {
    setCurrentIndex(0)
    setFlipped(false)
    setScore({ correct: 0, incorrect: 0 })
    setQuizAnswered(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Studeer</span>
            </div>
            <div className="text-sm text-gray-500">{currentIndex + 1}/{cards.length}</div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mode === 'select' && (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Set #{params.id}</h1>
            <p className="text-gray-600 mb-8">Kies een studiemodus</p>
            <div className="grid gap-4">
              <button
                onClick={() => setMode('flashcard')}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Flashcards</div>
                    <div className="text-gray-500 text-sm">Studeer met kaarten en flip-animatie</div>
                  </div>
                </div>
              </button>
              <button
                onClick={() => setMode('quiz')}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Quiz modus</div>
                    <div className="text-gray-500 text-sm">Test je kennis met vragen</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {mode === 'flashcard' && (
          <div>
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }} />
              </div>
            </div>

            <div
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 min-h-64 flex items-center justify-center cursor-pointer hover:shadow-md transition-all mb-6"
              onClick={() => setFlipped(!flipped)}
            >
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase tracking-wide mb-4">
                  {flipped ? '✅ Antwoord' : '❓ Vraag'}
                </div>
                <div className="text-xl font-medium text-gray-900">
                  {flipped ? current.back : current.front}
                </div>
                {!flipped && <div className="text-sm text-gray-400 mt-6">Klik om te draaien</div>}
              </div>
            </div>

            {flipped && (
              <div className="flex gap-3 justify-center mb-6">
                <button onClick={() => handleNext(false)} className="flex items-center gap-2 bg-red-100 text-red-600 font-medium px-6 py-3 rounded-xl hover:bg-red-200 transition-colors">
                  <X className="w-4 h-4" /> Fout
                </button>
                <button onClick={() => handleNext(true)} className="flex items-center gap-2 bg-green-100 text-green-600 font-medium px-6 py-3 rounded-xl hover:bg-green-200 transition-colors">
                  <Check className="w-4 h-4" /> Goed
                </button>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">✅ {score.correct} goed · ❌ {score.incorrect} fout</div>
              <div className="flex gap-2">
                <button onClick={reset} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <RotateCcw className="w-4 h-4 text-gray-500" />
                </button>
                {!flipped && (
                  <button onClick={() => handleNext()} className="flex items-center gap-2 bg-gray-100 text-gray-700 font-medium px-4 py-2 rounded-xl hover:bg-gray-200 transition-colors">
                    Overslaan <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {mode === 'quiz' && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <div className="text-sm text-gray-400 mb-4">Vraag {currentIndex + 1} van {cards.length}</div>
              <div className="text-xl font-medium text-gray-900 mb-6">{current.front}</div>

              {quizAnswered !== null ? (
                <div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <div className="font-medium text-green-700 mb-1">Antwoord:</div>
                    <div className="text-green-800">{current.back}</div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={() => handleNext(false)} className="flex-1 flex items-center justify-center gap-2 bg-red-100 text-red-600 font-medium py-3 rounded-xl hover:bg-red-200 transition-colors">
                      <X className="w-4 h-4" /> Wist ik niet
                    </button>
                    <button onClick={() => handleNext(true)} className="flex-1 flex items-center justify-center gap-2 bg-green-100 text-green-600 font-medium py-3 rounded-xl hover:bg-green-200 transition-colors">
                      <Check className="w-4 h-4" /> Wist ik
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setQuizAnswered(0)} className="w-full p-4 bg-blue-50 border border-blue-200 rounded-xl text-blue-700 font-medium hover:bg-blue-100 transition-colors">
                  Antwoord tonen
                </button>
              )}
            </div>

            <div className="text-sm text-gray-500 text-center">✅ {score.correct} goed · ❌ {score.incorrect} fout</div>
          </div>
        )}
      </main>
    </div>
  )
}
