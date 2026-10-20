"use client"

import type { ReactNode } from "react"
import { MotionConfig } from "framer-motion"

import { ThemeProvider } from "@/components/theme-provider"

export function LayoutClient({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      {/* Skip entrance animations for visitors who ask for reduced motion. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}
