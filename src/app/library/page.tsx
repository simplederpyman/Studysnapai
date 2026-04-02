'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Search, Plus, BookOpen, Folder, ArrowRight } from 'lucide-react'

const DEMO_SETS = [
  { id: '1', title: 'Biologie H4 - Celdeling', type: 'flashcards', count: 24, subject: 'Biologie', updatedAt: '2 uur geleden' },
  { id: '2', title: 'Geschiedenis WO2', type: 'quiz', count: 15, subject: 'Geschiedenis', updatedAt: 'Gisteren' },
  { id: '3', title: 'Wiskunde Integralen', type: 'flashcards', count: 18, subject: 'Wiskunde', updatedAt: '3 dagen geleden' },
  { id: '4', title: 'Nederlands Literatuur', type: 'quiz', count: 12, subject: 'Nederlands', updatedAt: 'Vorige week' },
  { id: '5', title: 'Scheikunde Elementen', type: 'flashcards', count: 30, subject: 'Scheikunde', updatedAt: 'Vorige week' },
  { id: '6', title: 'Economie Begrippen', type: 'explanation', count: 1, subject: 'Economie', updatedAt: '2 weken geleden' },
]

const FOLDERS = [
  { id: '1', name: 'Exacte vakken', count: 3 },
  { id: '2', name: 'Talen', count: 1 },
  { id: '3', name: 'Maatschappijvakken', count: 2 },
]

export default function LibraryPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'flashcards' | 'quiz' | 'explanation'>('all')

  const filtered = DEMO_SETS.filter(s =>
    (filter === 'all' || s.type === filter) &&
    (s.title.toLowerCase().includes(search.toLowerCase()) || s.subject.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                StudySnap AI
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/create" className="text-gray-600 hover:text-gray-900">Aanmaken</Link>
              <Link href="/library" className="text-blue-600 font-medium">Bibliotheek</Link>
            </nav>
            <Link href="/create" className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              <Plus className="w-4 h-4" /> Nieuw
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="md:w-64 space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Mappen</h3>
              <div className="space-y-1">
                {FOLDERS.map(folder => (
                  <button key={folder.id} className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left">
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{folder.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{folder.count}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Filter</h3>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'Alles' },
                  { id: 'flashcards', label: 'Flashcards' },
                  { id: 'quiz', label: 'Quiz' },
                  { id: 'explanation', label: 'Uitleg' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setFilter(opt.id as typeof filter)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${filter === opt.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Zoeken in bibliotheek..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(set => (
                <Link key={set.id} href={`/study/${set.id}`} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${set.type === 'flashcards' ? 'bg-blue-100 text-blue-700' : set.type === 'quiz' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                      {set.type === 'flashcards' ? 'Flashcards' : set.type === 'quiz' ? 'Quiz' : 'Uitleg'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{set.title}</h3>
                  <div className="text-xs text-gray-500 mb-3">{set.subject} · {set.count} items</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{set.updatedAt}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </Link>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-3 text-center py-12 text-gray-500">
                  <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>Geen sets gevonden</p>
                  <Link href="/create" className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                    <Plus className="w-4 h-4" /> Nieuwe set aanmaken
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
