import type { Metadata } from 'next'
import { IBM_Plex_Mono, Literata, Recursive } from 'next/font/google'
import './globals.css'
import { LayoutClient } from '@/components/layout-client'

const recursive = Recursive({
  subsets: ['latin'],
  variable: '--font-recursive',
  weight: 'variable',
  display: 'swap',
})

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
  weight: 'variable',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-plex-mono',
  weight: ['400', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ronakice.github.io'),
  title: 'Ronak Pradeep — Information Retrieval & AI Research',
  description: 'Research Scientist at Databricks AI Research working on synthetic data, reinforcement learning, retrieval, and evaluation for information-seeking agents.',
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'Ronak Pradeep — The Retrieval Spectrum',
    description: 'Research on open rerankers, scalable RAG evaluation, and information-seeking agents.',
    url: '/',
    siteName: 'Ronak Pradeep',
    type: 'website',
    images: [{ url: '/og-retrieval-spectrum.png', width: 1200, height: 630, alt: 'Ronak Pradeep and the Retrieval Spectrum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ronak Pradeep — The Retrieval Spectrum',
    description: 'Research on open rerankers, scalable RAG evaluation, and information-seeking agents.',
    images: ['/og-retrieval-spectrum.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${recursive.variable} ${literata.variable} ${plexMono.variable}`}>
      <body>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  )
}
