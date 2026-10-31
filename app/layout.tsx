import type { Metadata } from 'next'
import { Barlow_Condensed, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { LayoutClient } from '@/components/layout-client'

// Condensed display for headings (record-sleeve lettering); Plex Sans for prose.
const display = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
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
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
