"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

// Small animated illustrations for the playlist section. Each one is decorative
// (aria-hidden) and settles into a meaningful still frame for reduced motion.

const SIGIL_CLASS = "relative w-28 h-28 md:w-44 md:h-44 shrink-0 select-none"

// ---------------------------------------------------------------------------
// ॐ: a solar eclipse driven by scroll. Totality, when the corona and the ॐ
// appear, lands as the sigil crosses the middle of the viewport.
// ---------------------------------------------------------------------------
export function EclipseSigil() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.4 })
  const still = useMotionValue(0.5)
  const p = reduce ? still : smooth

  const moonX = useTransform(p, [0.18, 0.43, 0.57, 0.82], [-78, 0, 0, 78])
  const sunGlow = useTransform(p, [0.18, 0.41, 0.59, 0.82], [1, 0.12, 0.12, 1])
  const corona = useTransform(p, [0.38, 0.45, 0.55, 0.62], [0, 1, 1, 0])
  const omScale = useTransform(p, [0.4, 0.47, 0.53, 0.6], [0.85, 1, 1, 0.85])
  // Baily's beads / diamond ring: a flash at second and third contact.
  const beadIn = useTransform(p, [0.39, 0.425, 0.45], [0, 1, 0])
  const beadOut = useTransform(p, [0.55, 0.575, 0.61], [0, 1, 0])

  return (
    <div ref={ref} className={SIGIL_CLASS} aria-hidden="true">
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible text-amber-400 dark:text-amber-50">
        <defs>
          <radialGradient id="ecl-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff7d6" />
            <stop offset="55%" stopColor="#fcd34d" />
            <stop offset="85%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </radialGradient>
          <radialGradient id="ecl-glow" cx="50%" cy="50%" r="50%">
            <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#f97316" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ecl-corona" cx="50%" cy="50%" r="50%">
            <stop offset="42%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="55%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ecl-moon" cx="40%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#1c1c24" />
            <stop offset="100%" stopColor="#07070a" />
          </radialGradient>
          <filter id="ecl-soft" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
        </defs>

        <motion.circle cx="100" cy="100" r="92" fill="url(#ecl-glow)" style={{ opacity: sunGlow }} />

        <motion.g style={{ opacity: corona }}>
          <circle cx="100" cy="100" r="82" fill="url(#ecl-corona)" />
          {/* Streamers turn very slowly so the corona feels alive, not spinning. */}
          <g className="origin-center animate-[spin_90s_linear_infinite] motion-reduce:animate-none" filter="url(#ecl-soft)">
            {[0, 38, 81, 127, 164, 212, 251, 298, 333].map((angle, i) => (
              <ellipse
                key={angle}
                cx="100"
                cy="100"
                rx={i % 3 === 0 ? 70 : 56}
                ry="3.2"
                fill="currentColor"
                opacity={i % 2 ? 0.28 : 0.45}
                transform={`rotate(${angle} 100 100)`}
              />
            ))}
          </g>
        </motion.g>

        <circle cx="100" cy="100" r="34" fill="url(#ecl-sun)" />

        <motion.g style={{ x: moonX }}>
          <circle cx="100" cy="100" r="35.5" fill="url(#ecl-moon)" />
          <circle cx="100" cy="100" r="35.5" fill="none" stroke="white" strokeOpacity="0.06" />
        </motion.g>

        <motion.g style={{ opacity: beadIn }}>
          <circle cx="131" cy="86" r="11" fill="#fffbeb" opacity="0.5" filter="url(#ecl-soft)" />
          <circle cx="131" cy="86" r="3.2" fill="white" />
        </motion.g>
        <motion.g style={{ opacity: beadOut }}>
          <circle cx="69" cy="114" r="11" fill="#fffbeb" opacity="0.5" filter="url(#ecl-soft)" />
          <circle cx="69" cy="114" r="3.2" fill="white" />
        </motion.g>
      </svg>

      <motion.span
        className="absolute inset-0 grid place-items-center text-2xl md:text-[1.9rem] text-amber-200 [text-shadow:0_0_14px_rgba(251,191,36,0.85)]"
        style={{ opacity: corona, scale: omScale }}
      >
        ॐ
      </motion.span>
    </div>
  )
}

// ---------------------------------------------------------------------------
// A Day in the Life: the sun rises, crosses the sky, and rests half-set at dusk
// as the first stars come out.
// Plays once on first view; hovering replays it.
// ---------------------------------------------------------------------------
const ARC_CX = 100
const ARC_CY = 138
const ARC_R = 72

export function DaySigil() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const t = useMotionValue(-0.12)
  const playing = useRef(false)

  const play = useCallback(() => {
    if (reduce || playing.current) return
    playing.current = true
    t.set(-0.12)
    animate(t, 1, { duration: 6.5, ease: [0.45, 0, 0.55, 1] }).then(() => {
      playing.current = false
    })
  }, [reduce, t])

  useEffect(() => {
    if (reduce) t.set(0.5)
    else if (inView) play()
  }, [inView, reduce, play, t])

  const cx = useTransform(t, (v) => ARC_CX - ARC_R * Math.cos(Math.PI * v))
  const cy = useTransform(t, (v) => ARC_CY - ARC_R * Math.sin(Math.PI * v))
  const sunColor = useTransform(t, [0, 0.5, 1], ["#fb923c", "#fef3c7", "#f43f5e"])
  const trail = useTransform(t, (v) => Math.min(Math.max(v, 0), 1))
  const stars = useTransform(t, [0.8, 1], [0, 1])

  return (
    <div ref={ref} className={SIGIL_CLASS} aria-hidden="true" onMouseEnter={play}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="day-sky" x1="0" x2="1">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <clipPath id="day-horizon">
            <rect x="0" y="0" width="200" height={ARC_CY} />
          </clipPath>
          <filter id="day-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <path
          d={`M${ARC_CX - ARC_R} ${ARC_CY} A${ARC_R} ${ARC_R} 0 0 1 ${ARC_CX + ARC_R} ${ARC_CY}`}
          fill="none"
          stroke="currentColor"
          className="text-muted-foreground/30"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        <motion.path
          d={`M${ARC_CX - ARC_R} ${ARC_CY} A${ARC_R} ${ARC_R} 0 0 1 ${ARC_CX + ARC_R} ${ARC_CY}`}
          fill="none"
          stroke="url(#day-sky)"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ pathLength: trail }}
        />

        <g clipPath="url(#day-horizon)">
          <motion.circle r="15" cx={cx} cy={cy} fill={sunColor} filter="url(#day-glow)" opacity="0.7" />
          <motion.circle r="8.5" cx={cx} cy={cy} fill={sunColor} />
        </g>

        <line x1="14" y1={ARC_CY} x2="186" y2={ARC_CY} stroke="currentColor" className="text-muted-foreground/50" strokeWidth="1" />

        <motion.g style={{ opacity: stars }} className="text-violet-500 dark:text-violet-200" fill="currentColor">
          <circle cx="58" cy="58" r="1.6" />
          <circle cx="98" cy="38" r="1.2" />
          <circle cx="142" cy="62" r="1.8" />
          <circle cx="124" cy="96" r="1" />
        </motion.g>
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Liebesträume: one octave under a crescent moon. An A-flat major arpeggio
// (C, E-flat, A-flat) plays through once in view; each key sends a note upward.
// ---------------------------------------------------------------------------
const WHITE_KEYS = 8
const KEY_W = 20
const KEY_X0 = 100 - (WHITE_KEYS * KEY_W) / 2
const KEY_Y = 122
// Black keys sit after these white-key indices (C#, D#, F#, G#, A#).
const BLACK_AFTER = [0, 1, 3, 4, 5]
const PHRASE = ["w0", "b1", "b4", "w7", "b4", "b1", "w0", "b1", "b4", "w7", "b4", "w7"]

type Note = { id: number; x: number }

export function NocturneSigil() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()
  const [pressed, setPressed] = useState<string | null>(null)
  const [notes, setNotes] = useState<Note[]>([])
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const playing = useRef(false)

  const keyCenter = (key: string) => {
    const i = Number(key.slice(1))
    return key[0] === "w" ? KEY_X0 + i * KEY_W + KEY_W / 2 : KEY_X0 + (BLACK_AFTER[i] + 1) * KEY_W
  }

  const play = useCallback(() => {
    if (reduce || playing.current) return
    playing.current = true
    PHRASE.forEach((key, step) => {
      timers.current.push(
        setTimeout(() => {
          setPressed(key)
          const id = Date.now() + step
          setNotes((n) => [...n, { id, x: keyCenter(key) }])
          timers.current.push(setTimeout(() => setNotes((n) => n.filter((note) => note.id !== id)), 2400))
        }, step * 420)
      )
    })
    timers.current.push(
      setTimeout(() => {
        setPressed(null)
        playing.current = false
      }, PHRASE.length * 420 + 200)
    )
  }, [reduce])

  useEffect(() => {
    if (inView) play()
  }, [inView, play])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  return (
    <div ref={ref} className={SIGIL_CLASS} aria-hidden="true" onMouseEnter={play}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <mask id="noc-crescent">
            <circle cx="148" cy="44" r="17" fill="white" />
            <circle cx="140" cy="38" r="15" fill="black" />
          </mask>
          <filter id="noc-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        <g className="text-violet-400 dark:text-violet-100" fill="currentColor">
          <circle cx="148" cy="44" r="17" mask="url(#noc-crescent)" filter="url(#noc-glow)" opacity="0.6" />
          <circle cx="148" cy="44" r="17" mask="url(#noc-crescent)" />
        </g>

        {notes.map((note, i) => (
          <motion.text
            key={note.id}
            x={note.x}
            y={KEY_Y - 6}
            textAnchor="middle"
            fontSize="15"
            className="fill-primary"
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{ opacity: [0, 0.9, 0], y: -64, x: i % 2 ? 10 : -8 }}
            transition={{ duration: 2.4, ease: "easeOut" }}
          >
            {i % 2 ? "♪" : "♫"}
          </motion.text>
        ))}

        {Array.from({ length: WHITE_KEYS }, (_, i) => {
          const isDown = pressed === `w${i}`
          return (
            <rect
              key={`w${i}`}
              x={KEY_X0 + i * KEY_W + 0.5}
              y={KEY_Y + (isDown ? 1.5 : 0)}
              width={KEY_W - 1}
              height="56"
              rx="2.5"
              className={isDown ? "fill-violet-300 stroke-violet-500" : "fill-zinc-50 stroke-zinc-400 dark:fill-zinc-200 dark:stroke-zinc-500"}
              style={{ transition: "fill 300ms, y 120ms" }}
              strokeWidth="1"
            />
          )
        })}
        {BLACK_AFTER.map((after, i) => {
          const isDown = pressed === `b${i}`
          return (
            <rect
              key={`b${i}`}
              x={KEY_X0 + (after + 1) * KEY_W - 6.5}
              y={KEY_Y + (isDown ? 1.5 : 0)}
              width="13"
              height="34"
              rx="2"
              className={isDown ? "fill-violet-500" : "fill-zinc-900"}
              style={{ transition: "fill 300ms, y 120ms" }}
            />
          )
        })}
      </svg>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Footer: a faint ECG trace that keeps time like the heartbeat at the end of
// the album.
// ---------------------------------------------------------------------------
export function Heartbeat() {
  return (
    <svg viewBox="0 0 64 20" className="inline-block h-4 w-12 align-middle text-rose-500" aria-hidden="true">
      <path d="M0 10 H20 L23 6 L26 10 L29 1 L33 19 L36 10 L39 8 L42 10 H64" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1.4" strokeLinejoin="round" />
      <path
        d="M0 10 H20 L23 6 L26 10 L29 1 L33 19 L36 10 L39 8 L42 10 H64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="heartbeat-trace"
      />
    </svg>
  )
}
