'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Brain, Plus, BookOpen, Zap, TrendingUp, Clock, Star, ArrowRight, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface UserData {
  email?: string
  user_metadata?: { full_name?: string }
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/auth/login')
      } else {
        setUser(user)
      }
    })
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('Uitgelogd')
    router.push('/')
  }

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Gebruiker'

  const recentSets = [
    { id: '1', title: 'Biologie H4 - Celdeling', type: 'flashcards', count: 24, progress: 75 },
    { id: '2', title: 'Geschiedenis WO2', type: 'quiz', count: 15, progress: 40 },
    { id: '3', title: 'Wiskunde Integralen', type: 'flashcards', count: 18, progress: 90 },
    { id: '4', title: 'Nederlands Literatuur', type: 'quiz', count: 12, progress: 20 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <Link href="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              <Link href="/create" className="text-gray-600 hover:text-gray-900">Aanmaken</Link>
              <Link href="/library" className="text-gray-600 hover:text-gray-900">Bibliotheek</Link>
            </nav>
            <button onClick={handleLogout} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Uitloggen</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Goedemiddag, {firstName}! 👋</h1>
          <p className="text-gray-600 mt-1">Wat ga je vandaag studeren?</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">7</div>
            <div className="text-sm text-gray-500">Sets deze week</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">142</div>
            <div className="text-sm text-gray-500">Studeer minuten</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">87%</div>
            <div className="text-sm text-gray-500">Retentie score</div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
              <Star className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-500">Streak dagen</div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link href="/create" className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white hover:opacity-90 transition-opacity flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-lg">Nieuw aanmaken</div>
              <div className="text-blue-100 text-sm">Upload materiaal en genereer content</div>
            </div>
          </Link>
          <Link href="/library" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900">Mijn bibliotheek</div>
              <div className="text-gray-500 text-sm">Bekijk al je sets</div>
            </div>
          </Link>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <div className="font-bold text-lg text-gray-900">Snelle quiz</div>
              <div className="text-gray-500 text-sm">Oefen je kennis</div>
            </div>
          </div>
        </div>

        {/* Recent sets */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recente sets</h2>
            <Link href="/library" className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
              Alle sets <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {recentSets.map((set) => (
              <Link key={set.id} href={`/study/${set.id}`} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900">{set.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${set.type === 'flashcards' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {set.type === 'flashcards' ? 'Flashcards' : 'Quiz'}
                  </span>
                </div>
                <div className="text-sm text-gray-500 mb-3">{set.count} items</div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${set.progress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">{set.progress}% voltooid</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
