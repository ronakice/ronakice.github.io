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

export const metadata: Metadata = {
  title: 'Ronak Pradeep',
  description: 'Research at Yupp AI; PhD, University of Waterloo',
  generator: 'v0.dev',
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
