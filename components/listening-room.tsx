"use client"

import type { Playlist } from "@/lib/site-data"
import { useEffect, useRef, useState } from "react"

const messages = [
  "A good ranking needs rhythm.",
  "The playlist is longer than the evaluation section.",
  "I promise the spectrum is semantically grounded.",
  "You found the sketch. Excellent recall.",
]

function SketchCompanion() {
  const [message, setMessage] = useState(messages[0])
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  return (
    <button
      className="sketch-companion"
      type="button"
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        setPointer({ x: ((event.clientX - rect.left) / rect.width - 0.5) * 8, y: ((event.clientY - rect.top) / rect.height - 0.5) * 8 })
      }}
      onClick={() => setMessage((current) => messages[(messages.indexOf(current) + 1) % messages.length])}
      aria-label="Ask the sketch for another listening-room note"
    >
      <span className="sketch-note">{message}</span>
      <svg viewBox="0 0 260 260" role="img" aria-label="Animated line-art portrait of Ronak">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M71 82C68 30 184 19 194 91c33 61-2 143-65 145-61 2-94-87-58-154Z" />
          <path d="M72 85C37 33 99 8 142 28M74 70C87 10 184 12 199 76M67 101C36 57 52 29 89 25M192 58c36 24 26 78 9 102" />
          <path d="M78 93 116 89l-4 34-35-3Zm68-4 39 5-3 31-36-3Zm-31 11 31 1" />
          <circle cx={98 + pointer.x} cy={106 + pointer.y} r="4" fill="currentColor" />
          <circle cx={165 + pointer.x} cy={107 + pointer.y} r="4" fill="currentColor" />
          <path d="M132 105c-9 22-10 38 5 41M112 161c13 11 30 11 43-1" />
          <path d="M77 128c4 57 29 94 55 96 32-2 58-47 58-96M84 142c3 47 20 77 47 81M181 142c-4 44-24 75-50 81" />
        </g>
      </svg>
      <span className="sketch-action">Click for another note ↗</span>
    </button>
  )
}

function SpotifyEmbed({ playlist }: { playlist: Playlist }) {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoaded(true)
        observer.disconnect()
      }
    }, { rootMargin: "500px" })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="spotify-frame">
      {loaded ? (
        <iframe
          src={playlist.src}
          title={`${playlist.title} playlist on Spotify`}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : <div className="spotify-placeholder">Playlist enters the queue when it approaches the viewport.</div>}
    </div>
  )
}

export function ListeningRoom({ playlists }: { playlists: Playlist[] }) {
  return (
    <div className="listening-layout">
      <aside><SketchCompanion /></aside>
      <div className="playlist-stack">
        {playlists.map((playlist, index) => (
          <article className="playlist" key={playlist.title}>
            <div className="playlist-number">SIDE {String(index + 1).padStart(2, "0")}</div>
            <h3>{playlist.title}</h3>
            <p>{playlist.description}</p>
            <span>{playlist.note}</span>
            <SpotifyEmbed playlist={playlist} />
          </article>
        ))}
      </div>
    </div>
  )
}
