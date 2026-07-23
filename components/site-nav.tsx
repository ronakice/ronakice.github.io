"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"

const sections = [
  ["work", "Work"],
  ["publications", "Publications"],
  ["mentorship", "Mentorship"],
  ["now", "Now"],
  ["listening-room", "Music"],
  ["contact", "Contact"],
] as const

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("home")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setActive(visible.target.id)
      },
      { rootMargin: "-20% 0px -65%", threshold: [0, 0.2, 0.6] }
    )

    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [open])

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Primary navigation">
        <Link className="wordmark" href="#home" onClick={() => setOpen(false)}>
          Ronak Pradeep
        </Link>

        <div className="desktop-nav">
          {sections.map(([id, label]) => (
            <Link key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined}>
              {label}
            </Link>
          ))}
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        {open && (
          <div id="mobile-navigation" className="mobile-nav">
            <span className="eyebrow">Navigate the notebook</span>
            {sections.map(([id, label]) => (
              <Link
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setOpen(false)}
              >
                <span>{label}</span>
                <span aria-hidden="true">↘</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
