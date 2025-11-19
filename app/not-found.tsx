"use client"

import { useEffect } from "react"

export default function NotFound() {
  useEffect(() => {
    // Client-side only
  }, [])
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground">Page not found</p>
      </div>
    </div>
  )
}

