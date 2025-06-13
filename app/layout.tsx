import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { DarkModeToggle } from '@/components/dark-mode-toggle'

export const metadata: Metadata = {
  title: 'Ronak Pradeep',
  description: 'PhD Student at University of Waterloo',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          {children}
          <DarkModeToggle />
        </ThemeProvider>
      </body>
    </html>
  )
}
