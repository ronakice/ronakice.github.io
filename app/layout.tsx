import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { LayoutClient } from '@/components/layout-client'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const description =
  'Research Scientist at Databricks AI Research working on information retrieval, RAG, and evaluation. PhD, University of Waterloo.'

export const metadata: Metadata = {
  metadataBase: new URL('https://ronakice.github.io'),
  title: 'Ronak Pradeep',
  description,
  icons: { icon: '/images/MrPenguin_icon.png', apple: '/images/MrPenguin_apple.png' },
  openGraph: {
    title: 'Ronak Pradeep',
    description,
    url: '/',
    type: 'website',
    images: [{ url: '/images/RonakPradeep.png', width: 1004, height: 912, alt: 'Ronak Pradeep' }],
  },
  twitter: { card: 'summary', creator: '@rpradeep42', images: ['/images/RonakPradeep.png'] },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}>
      <body className="font-serif">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
