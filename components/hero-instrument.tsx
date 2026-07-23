"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const DarkSideVoxel = dynamic(
  () => import("@/components/DarkSideVoxel").then((mod) => mod.DarkSideVoxel),
  { ssr: false }
)

const stages = ["RETRIEVE", "RERANK", "GROUND", "EVALUATE"]

export function HeroInstrument() {
  const [enhanced, setEnhanced] = useState(false)
  const [penguin, setPenguin] = useState(false)
  const [canAnimate, setCanAnimate] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const updateCapability = () => {
      const allowed = !media.matches && !connection?.saveData && window.innerWidth >= 1024
      setCanAnimate(allowed)
      if (!allowed) setEnhanced(false)
    }
    updateCapability()
    window.addEventListener("resize", updateCapability)
    media.addEventListener("change", updateCapability)
    return () => {
      window.removeEventListener("resize", updateCapability)
      media.removeEventListener("change", updateCapability)
    }
  }, [])

  const refract = () => {
    setPenguin((value) => !value)
    if (canAnimate) setEnhanced(true)
  }

  return (
    <div className="instrument-shell">
      <div className="instrument-stage" aria-label="A query refracting into stages of an information retrieval pipeline">
        {enhanced ? (
          <div className="instrument-webgl" aria-hidden="true">
            <DarkSideVoxel onPrismClick={() => setPenguin((value) => !value)} />
          </div>
        ) : (
          <svg className="retrieval-prism" viewBox="0 0 720 390" role="img" aria-labelledby="prism-title prism-desc">
            <title id="prism-title">The retrieval spectrum</title>
            <desc id="prism-desc">A query enters a prism and becomes retrieve, rerank, ground, and evaluate stages.</desc>
            <defs>
              <linearGradient id="spectrum" x1="0" x2="1">
                <stop offset="0" stopColor="#28C7BE" />
                <stop offset=".52" stopColor="#F2A541" />
                <stop offset="1" stopColor="#E95D5D" />
              </linearGradient>
              <filter id="soft-glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <g className="query-beam">
              <text x="18" y="198">QUERY</text>
              <path d="M20 214H246" />
            </g>
            <path className="prism-body" d="M248 304 356 86l108 218Z" />
            <g className="output-beams" filter="url(#soft-glow)">
              <path d="M404 196 698 90" />
              <path d="M416 210 698 166" />
              <path d="M418 224 698 244" />
              <path d="M410 238 698 320" />
            </g>
            <g className="stage-labels">
              {stages.map((stage, index) => <text key={stage} x="548" y={82 + index * 78}>{stage}</text>)}
            </g>
          </svg>
        )}

        <button type="button" className="portrait-switch" onClick={refract} aria-label="Refract the prism and swap the portrait">
          <picture key={penguin ? "penguin" : "ronak"}>
            <source
              type="image/webp"
              srcSet={penguin
                ? "/images/MrPenguin_circle-256.webp 256w, /images/MrPenguin_circle-512.webp 512w"
                : "/images/RonakPradeep_circle-256.webp 256w, /images/RonakPradeep_circle-512.webp 512w"}
              sizes="(max-width: 767px) 96px, 128px"
            />
            <img
              src={penguin ? "/images/MrPenguin_circle.png" : "/images/RonakPradeep_circle.png"}
              alt={penguin ? "Mr. Penguin, Ronak's easter egg portrait" : "Ronak Pradeep"}
              width="176"
              height="176"
              fetchPriority="high"
            />
          </picture>
          <span>{penguin ? "Signal transformed" : "Refract"}</span>
        </button>
      </div>
      <div className="instrument-caption">
        <span>THE RETRIEVAL SPECTRUM</span>
        <span>{canAnimate ? "Interactive instrument" : "Static, low-energy mode"}</span>
      </div>
    </div>
  )
}
