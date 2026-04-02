'use client'

import Link from 'next/link'
import { Brain, Zap, BookOpen, Camera, Globe, ArrowRight, Star, TrendingUp } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
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
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">Hoe het werkt</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Reviews</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login" className="text-gray-700 hover:text-gray-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                Inloggen
              </Link>
              <Link href="/auth/signup" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Gratis starten
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Powered by AI
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
            Van foto naar{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              flashcards
            </span>{' '}
            in 30 seconden
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload een foto van je aantekeningen of plak tekst in, en StudySnap AI genereert automatisch quizzen, flashcards en uitleg voor je.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity text-lg">
              Gratis starten <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl hover:border-gray-300 transition-colors text-lg">
              Bekijk hoe het werkt
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">Geen creditcard nodig • Gratis voor studenten</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">50K+</div>
              <div className="text-gray-500 mt-1">Actieve studenten</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">2M+</div>
              <div className="text-gray-500 mt-1">Gegenereerde flashcards</div>
            </div>
            <div>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">94%</div>
              <div className="text-gray-500 mt-1">Betere cijfers</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Hoe het werkt</h2>
            <p className="text-xl text-gray-600">In 3 eenvoudige stappen klaar om te studeren</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: Camera, title: 'Upload je materiaal', desc: 'Maak een foto van je aantekeningen, upload een PDF, of plak tekst direct in de app.' },
              { step: '02', icon: Brain, title: 'AI genereert content', desc: 'Onze AI analyseert je materiaal en genereert automatisch quizzen, flashcards en uitleg.' },
              { step: '03', icon: BookOpen, title: 'Studeer en leer', desc: 'Gebruik de interactieve studietools en volg je voortgang met gedetailleerde statistieken.' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative">
                <div className="absolute -top-4 left-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Stap {item.step}
                </div>
                <item.icon className="w-10 h-10 text-blue-500 mb-4 mt-2" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Alles wat je nodig hebt</h2>
            <p className="text-xl text-gray-600">Krachtige tools voor effectief studeren</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'Quiz Generator', desc: 'Automatisch gegenereerde meerkeuzevragen, open vragen en waar/onwaar beweringen.', colorClass: 'bg-blue-100 text-blue-500' },
              { icon: BookOpen, title: 'Smart Flashcards', desc: 'Intelligente flashcards met spaced repetition algoritme voor maximale retentie.', colorClass: 'bg-purple-100 text-purple-500' },
              { icon: Zap, title: 'Directe Uitleg', desc: 'Complexe concepten eenvoudig uitgelegd met voorbeelden en mind maps.', colorClass: 'bg-green-100 text-green-500' },
              { icon: Camera, title: 'Foto Upload', desc: 'Maak een foto van je aantekeningen of studieboek en verwerk het direct.', colorClass: 'bg-orange-100 text-orange-500' },
              { icon: Globe, title: 'Meerdere Talen', desc: 'Genereer content in Nederlands, Engels, Frans, Duits of Spaans.', colorClass: 'bg-red-100 text-red-500' },
              { icon: TrendingUp, title: 'Voortgang', desc: 'Volg je studeervoortgang en zie waar je nog op moet focussen.', colorClass: 'bg-indigo-100 text-indigo-500' },
            ].map((feature) => (
              <div key={feature.title} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl ${feature.colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Wat studenten zeggen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Sara van den Berg', role: 'Geneeskunde student', quote: 'StudySnap AI heeft mijn studie compleet veranderd. Ik maak nu in 10 minuten flashcards waar ik vroeger uren over deed!' },
              { name: 'Thomas de Vries', role: 'Rechten student', quote: 'De quizzen die worden gegenereerd zijn verrassend goed. Perfect voor mijn tentamen voorbereiding.' },
              { name: 'Lisa Bakker', role: 'Docent Biologie', quote: 'Ik gebruik StudySnap AI om lesmateriaal te maken voor mijn leerlingen. Een enorme tijdsbesparing!' },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Klaar om slimmer te studeren?</h2>
          <p className="text-blue-100 text-xl mb-8">Sluit je aan bij duizenden studenten die al beter leren met AI</p>
          <Link href="/auth/signup" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-lg">
            Start gratis vandaag <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg">StudySnap AI</span>
            </div>
            <p className="text-sm">© 2024 StudySnap AI. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
