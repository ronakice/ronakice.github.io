"use client"

import type { ReactNode } from "react"

import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {children}
      <DarkModeToggle />
    </ThemeProvider>
  )
}
