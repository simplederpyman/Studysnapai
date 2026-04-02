import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'StudySnap AI - Van foto naar flashcards in 30 seconden',
  description: 'Intelligent leerplatform waar gebruikers foto\'s of tekst kunnen uploaden om automatisch quizzen, flashcards en uitleg te genereren met AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
