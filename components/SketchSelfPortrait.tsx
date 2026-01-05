"use client"

import React, { useEffect, useRef } from 'react'
import type p5 from 'p5'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

const SketchSelfPortrait = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const p5Instance = useRef<p5 | null>(null)
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [currentMessage, setCurrentMessage] = React.useState("")
    const [isVisible, setIsVisible] = React.useState(false)
    const [activeSection, setActiveSection] = React.useState<string | null>(null)
    const lastMessageTime = useRef(Date.now())
    const shownMessages = useRef<Set<string>>(new Set())

    const messages: Record<string, string[]> = {
        home: [
            "Welcome to my tiny corner of the web!",
            "I'm the sketchy version of Ronak. Nice to meet you.",
            "Psst... if you click that voxel prism, I might change flavors.",
            "I see you're trying to focus on something without interruption. Can I help?"
        ],
        research: [
            "RAG is cool, but have you seen my spline curves?",
            "Evaluating LLMs is hard. Drawing them is harder.",
            "I'm a Research Scientist by day, a p5.js sketch by... always."
        ],
        updates: [
            "Fresh off the press! Or at least, fresh off the code editor.",
            "My graduation cap is virtual, but my pride is real.",
        ],
        papers: [
            "That's a lot of papers. I hope you're using a good retriever.",
            "RankZephyr is my favorite. Don't tell the others.",
            "If you find a typo, it was definitely the 'other' LLM."
        ],
        mentorship: [
            "Always happy to chat! Just mind the sketchiness."
        ],
        playlists: [
            "Finally, some good music!",
            "Did you hear that beat? Oh, it's just my jitter function.",
        ],
        global: [
            "Is it just me, or is the scroll bar getting a workout?",
            "I'm watching you... in a non-creepy, sketchy way.",
            "Stop staring! I'm shy.",
            "The dark side of the Force is strong with this one."
        ]
    }

    useEffect(() => {
        setMounted(true)

        const sections = ['home', 'research', 'updates', 'papers', 'mentorship', 'playlists']
        const observers = sections.map(id => {
            const el = document.getElementById(id)
            if (!el) return null

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id)
                    }
                },
                { threshold: 0.5 }
            )
            observer.observe(el)
            return observer
        })

        return () => observers.forEach(o => o?.disconnect())
    }, [])

    useEffect(() => {
        if (!mounted || !activeSection) return

        const triggerMessage = () => {
            const now = Date.now()
            if (now - lastMessageTime.current < 6000) return

            if (Math.random() > 0.42) {
                const sectionPool = messages[activeSection] || []
                const globalPool = messages.global || []

                const useSection = Math.random() < 0.6 && sectionPool.length > 0
                const selectedPool = useSection ? sectionPool : globalPool

                let available = selectedPool.filter(m => !shownMessages.current.has(m))

                // If preferred pool is empty, try the other one
                if (available.length === 0) {
                    const fallbackPool = useSection ? globalPool : sectionPool
                    available = fallbackPool.filter(m => !shownMessages.current.has(m))
                }

                // Silence rule: if truly nothing is left to say in either pool, refrain from automatic trigger
                if (available.length === 0) {
                    return
                }

                const randomMsg = available[Math.floor(Math.random() * available.length)]

                setCurrentMessage(randomMsg)
                setIsVisible(true)
                shownMessages.current.add(randomMsg)
                lastMessageTime.current = now

                // Auto-hide after 5 seconds
                const timer = setTimeout(() => setIsVisible(false), 5000)
                return () => clearTimeout(timer)
            }
        }

        const interval = setInterval(triggerMessage, 5500)
        return () => clearInterval(interval)
    }, [mounted, activeSection])

    // Ensure we correctly detect light mode. Fallback to dark if unsure.
    const isDark = mounted ? resolvedTheme === 'dark' : true

    useEffect(() => {
        if (!mounted || typeof window === 'undefined') return

        const initP5 = async () => {
            const p5 = (await import('p5')).default

            const sketch = (p: any) => {
                let timeOffset = 0

                p.setup = () => {
                    const canvas = p.createCanvas(160, 120)
                    canvas.parent(containerRef.current!)
                    p.strokeJoin(p.ROUND)
                    p.strokeCap(p.ROUND)
                    p.noFill()
                }

                p.draw = () => {
                    p.clear()

                    // Colors based on theme (Premium Palette)
                    const baseStroke = isDark ? [240, 240, 255, 180] : [30, 41, 59, 255]      // Slate-800 for Light
                    const accentStroke = isDark ? [130, 180, 255, 200] : [2, 132, 199, 240]    // Sky-600 for Light
                    const lipStroke = isDark ? [255, 150, 150, 200] : [190, 18, 60, 250]      // Rose-700 for Light
                    const hairStroke = isDark ? [100, 200, 255, 100] : [15, 23, 42, 140]       // Deep Indigo/Slate for Light
                    const glassesStroke = isDark ? [200, 200, 255, 180] : [51, 65, 85, 230]    // Slate-600 for Light

                    const weightMult = isDark ? 1 : 1.4 // Slightly heavier strokes in light mode for clarity

                    p.push()
                    // Scale it down from 800x600 to 160x120 (0.2x scale)
                    p.scale(0.2)

                    p.translate(400, 300) // Center of 800x600

                    // Interactive vars
                    const localMouseX = p.constrain(p.mouseX * 5, -200, 1000)
                    const localMouseY = p.constrain(p.mouseY * 5, -200, 800)

                    let mx = p.constrain((localMouseX - 400) * 0.05, -30, 30)
                    let my = p.constrain((localMouseY - 300) * 0.05, -30, 30)
                    let nervous = p.mouseIsPressed ? 5 : 1

                    timeOffset += 0.02

                    // 1. The Head Shape
                    p.stroke(...baseStroke)
                    p.strokeWeight(1.8 * weightMult)
                    for (let k = 0; k < 3; k++) {
                        p.beginShape()
                        for (let a = 0; a < p.TWO_PI; a += 0.1) {
                            let xoff = p.map(p.cos(a), -1, 1, 0, 2)
                            let yoff = p.map(p.sin(a), -1, 1, 0, 2)
                            let r = 180 + p.map(p.noise(xoff + k, yoff + k, timeOffset * 0.5), 0, 1, -20, 20) * nervous

                            let rAdjust = (a > p.PI / 4 && a < 3 * p.PI / 4) ? 1.05 : 1.0

                            let x = r * p.cos(a) * 0.85
                            let y = r * p.sin(a) * rAdjust

                            p.splineVertex(x + mx * 0.5, y + my * 0.5)
                        }
                        p.endShape(p.CLOSE)
                    }

                    // 2. The Eyes
                    let eyeDist = 60
                    let eyeY = -30

                    p.push()
                    p.translate(-eyeDist + mx, eyeY + my)
                    drawEyeSpiral(p, timeOffset, nervous, -1, baseStroke, accentStroke, weightMult)
                    p.pop()

                    p.push()
                    p.translate(eyeDist + mx, eyeY + my)
                    drawEyeSpiral(p, timeOffset + 100, nervous, 1, baseStroke, accentStroke, weightMult)
                    p.pop()

                    // --- Wayfarer Glasses ---
                    p.push()
                    p.translate(mx, eyeY + my)
                    p.stroke(...glassesStroke)

                    for (let thick = 0; thick < 6; thick++) {
                        p.strokeWeight(1.5 * weightMult)
                        let nScrawl = (val: number) => val + p.map(p.noise(val, thick, timeOffset), 0, 1, -2, 2)

                        // Left Lens Frame
                        p.beginShape()
                        p.vertex(nScrawl(-130 - thick), nScrawl(-45 - thick))
                        p.vertex(nScrawl(-20 + thick), nScrawl(-45 - thick))
                        p.vertex(nScrawl(-30 + thick), nScrawl(40 + thick))
                        p.vertex(nScrawl(-115 - thick), nScrawl(40 + thick))
                        p.endShape(p.CLOSE)

                        // Right Lens Frame
                        p.beginShape()
                        p.vertex(nScrawl(20 - thick), nScrawl(-45 - thick))
                        p.vertex(nScrawl(130 + thick), nScrawl(-45 - thick))
                        p.vertex(nScrawl(115 + thick), nScrawl(40 + thick))
                        p.vertex(nScrawl(30 - thick), nScrawl(40 + thick))
                        p.endShape(p.CLOSE)

                        // Bridge
                        p.beginShape()
                        p.vertex(nScrawl(-20), nScrawl(-35))
                        p.vertex(nScrawl(20), nScrawl(-35))
                        p.endShape()
                    }

                    p.strokeWeight(1.2)
                    p.beginShape()
                    p.vertex(-130, -45)
                    p.bezierVertex(-150, -50)
                    p.bezierVertex(-170, -30)
                    p.bezierVertex(-185, -20)
                    p.endShape()
                    p.beginShape()
                    p.vertex(130, -45)
                    p.bezierVertex(150, -50)
                    p.bezierVertex(170, -30)
                    p.bezierVertex(185, -20)
                    p.endShape()
                    p.pop()

                    // 3. The Nose (More Prominent)
                    p.stroke(...baseStroke)
                    p.strokeWeight(2.5 * weightMult)

                    // Main bridge
                    p.beginShape()
                    let noseX = mx * 1.2
                    let noseY = my * 1.2
                    for (let i = 0; i < 50; i++) {
                        let t = i / 50.0
                        let nX = p.lerp(0, -10, t) + p.map(p.noise(i * 0.2, timeOffset), 0, 1, -5, 5) * nervous
                        let nY = p.lerp(-30, 45, t) + p.map(p.noise(i * 0.2 + 10, timeOffset), 0, 1, -2, 2)
                        if (i > 40) nX += 18 * p.sin((i - 40) * 0.5)
                        p.splineVertex(noseX + nX, noseY + nY)
                    }
                    p.endShape()

                    // Nostrils / Base detail
                    p.strokeWeight(1.8 * weightMult)
                    p.beginShape()
                    for (let i = 0; i < 20; i++) {
                        let t = i / 20.0
                        let nX = p.lerp(5, 25, t) + p.map(p.noise(i * 0.5, timeOffset), 0, 1, -3, 3)
                        let nY = 45 + p.sin(t * p.PI) * 10
                        p.splineVertex(noseX + nX, noseY + nY)
                    }
                    p.endShape()

                    // 4. The Beard
                    p.push()
                    p.translate(mx * 1.1, my * 1.1)
                    p.stroke(...accentStroke)
                    p.strokeWeight(0.8 * weightMult)

                    for (let b = 0; b < 60; b++) {
                        p.beginShape()
                        // Use a slightly wider angle range to cover sideburns properly
                        for (let a = -0.3; a <= p.PI + 0.3; a += 0.05) {
                            // Match the head's base radius (~180)
                            let faceR = 180
                            // Beard thickness: more volume at the chin, less at the sideburns
                            let beardThick = p.map(p.sin(a), 0, 1, 15, 70)
                            let nVal = p.noise(a * 3, b * 0.15, timeOffset)

                            // r follows the face curvature but with some "growth"
                            let r = faceR + p.map(nVal, 0, 1, -beardThick, beardThick * 0.5)

                            // Use same scaling factors as the head for consistent curvature
                            let x = r * p.cos(a) * 0.85
                            let y = r * p.sin(a) * 1.05

                            // Cheek line logic: beard should be lower in the middle (below nose/mouth)
                            // and higher at the sides (sideburns).
                            // cos(a) is near 0 at chin (a=PI/2), near 1 or -1 at sides.
                            let cheekLine = p.map(p.abs(p.cos(a)), 0, 1, 65, -15)

                            if (y > cheekLine) {
                                p.splineVertex(x + p.map(p.noise(a * 10, b), 0, 1, -2, 2) * nervous, y)
                            }
                        }
                        p.endShape()
                    }
                    p.pop()

                    // 5. The Mouth (Lips - Multiple Layers for Prominence)
                    p.push()
                    p.translate(mx * 1.1, 105 + my * 1.1)
                    p.stroke(...lipStroke)

                    let smileFactor = p.map(p.constrain(localMouseY, 0, 600), 0, 600, -0.4, 0.4)

                    // Draw Upper Lip
                    for (let l = 0; l < 3; l++) {
                        p.strokeWeight((1.5 + l * 0.5) * weightMult)
                        p.beginShape()
                        for (let x = -40; x <= 40; x += 5) {
                            let y = (x * x) * 0.015 * smileFactor - 2 + l
                            // Add a cupid's bow dip
                            if (p.abs(x) < 10) y += 3 * (1 - p.abs(x) / 10)
                            let n = p.map(p.noise(x * 0.1, l, timeOffset), 0, 1, -2, 2) * nervous
                            p.splineVertex(x + n, y + n)
                        }
                        p.endShape()
                    }

                    // Draw Lower Lip
                    for (let l = 0; l < 3; l++) {
                        p.strokeWeight((2.0 + l * 0.5) * weightMult)
                        p.beginShape()
                        for (let x = -35; x <= 35; x += 5) {
                            let y = (x * x) * 0.025 * smileFactor + 8 + l
                            let n = p.map(p.noise(x * 0.1, l + 10, timeOffset), 0, 1, -2, 2) * nervous
                            p.splineVertex(x + n, y + n)
                        }
                        p.endShape()
                    }
                    p.pop()

                    // --- Vertical Handlebar Moustache ---
                    p.push()
                    p.translate(mx * 1.2, 55 + my * 1.2)
                    p.stroke(...baseStroke)
                    p.strokeWeight(1.0 * weightMult)

                    for (let side = -1; side <= 1; side += 2) {
                        for (let s = 0; s < 15; s++) {
                            p.beginShape()
                            for (let i = 0; i <= 40; i++) {
                                let t = i / 40.0
                                let horizontalTarget = side * 150
                                let xBase = p.lerp(0, horizontalTarget, t)
                                let yBase = 0
                                if (t < 0.5) {
                                    yBase = p.map(t, 0, 0.5, 0, 30)
                                } else {
                                    let t2 = p.map(t, 0.5, 1.0, 0, 1)
                                    yBase = 30 - (p.pow(t2, 2.5) * 120)
                                    xBase -= (side * p.pow(t2, 2) * 20)
                                }
                                let nX = p.map(p.noise(i, s, timeOffset), 0, 1, -4, 4)
                                let nY = p.map(p.noise(i + 10, s, timeOffset), 0, 1, -4, 4)
                                p.splineVertex(xBase + nX, yBase + nY + (s * 1.5))
                            }
                            p.endShape()
                        }
                    }
                    p.pop()

                    // 6. The Head Hair
                    p.stroke(...hairStroke)
                    p.strokeWeight(0.8 * weightMult)
                    for (let j = 0; j < 25; j++) {
                        p.beginShape()
                        let startA = p.PI - 0.8
                        let endA = p.TWO_PI + 1.0
                        for (let a = startA; a <= endA; a += 0.1) {
                            let baseR = 200
                            let nVal = p.noise(a * 2, timeOffset + j * 10)
                            let r = baseR + p.map(nVal, 0, 1, -40, 100)
                            let x = r * p.cos(a) * 0.9 + mx * 0.2
                            let y = r * p.sin(a) + my * 0.2
                            p.splineVertex(x, y)
                        }
                        p.endShape()
                    }
                    p.pop()
                }

                const drawEyeSpiral = (p: any, tOffset: number, nervous: number, side: number, baseStroke: number[], accentStroke: number[], weightMult: number) => {
                    const centerX = (side === -1 ? -60 : 60)
                    const centerY = -30
                    const localMouseX = p.constrain(p.mouseX * 5, -200, 1000)
                    const localMouseY = p.constrain(p.mouseY * 5, -200, 800)

                    let dx = localMouseX - (400 + centerX)
                    let dy = localMouseY - (300 + centerY)
                    let angle = p.atan2(dy, dx)
                    let distVal = p.constrain(p.sqrt(dx * dx + dy * dy), 0, 20)

                    let pupilX = p.cos(angle) * distVal * 0.5
                    let pupilY = p.sin(angle) * distVal * 0.5

                    p.stroke(...baseStroke)
                    p.strokeWeight(1.5 * weightMult)
                    p.beginShape()
                    for (let a = 0; a < p.TWO_PI; a += 0.2) {
                        let r = 25 + p.map(p.noise(p.cos(a) + tOffset, p.sin(a)), 0, 1, -2, 2)
                        p.splineVertex(r * p.cos(a), r * p.sin(a))
                    }
                    p.endShape(p.CLOSE)

                    p.push()
                    p.translate(pupilX, pupilY)
                    p.stroke(...accentStroke)
                    p.strokeWeight(1.2 * weightMult)
                    p.beginShape()
                    for (let i = 0; i < 40; i++) {
                        let r = p.map(i, 0, 40, 1, 8)
                        let theta = i * 0.8 + tOffset * 2
                        let nx = p.map(p.noise(i, tOffset * 5), 0, 1, -2, 2) * nervous
                        let ny = p.map(p.noise(i + 100, tOffset * 5), 0, 1, -2, 2) * nervous
                        p.splineVertex(r * p.cos(theta) + nx, r * p.sin(theta) + ny)
                    }
                    p.endShape()
                    p.pop()
                }
            }

            p5Instance.current = new p5(sketch)
        }

        initP5()

        return () => {
            p5Instance.current?.remove()
        }
    }, [isDark, mounted])

    return (
        <div
            className="fixed bottom-6 right-6 z-[60] group cursor-pointer"
            onClick={(e) => {
                e.stopPropagation()
                const effectiveSection = activeSection || "home"
                const sectionPool = messages[effectiveSection] || []
                const globalPool = messages.global || []
                const useSection = Math.random() < 0.6 && sectionPool.length > 0
                const selectedPool = useSection ? sectionPool : globalPool

                let available = selectedPool.filter(m => !shownMessages.current.has(m))

                // Manual click can force-reset if we've seen it all
                if (available.length === 0) {
                    const fallbackPool = useSection ? globalPool : sectionPool
                    available = fallbackPool.filter(m => !shownMessages.current.has(m))

                    if (available.length === 0) {
                        shownMessages.current.clear()
                        available = [...sectionPool, ...globalPool]
                    }
                }

                const randomMsg = available[Math.floor(Math.random() * available.length)]

                // Reset visibility quickly to trigger a clean re-animation if needed
                setIsVisible(false)
                setTimeout(() => {
                    setCurrentMessage(randomMsg)
                    setIsVisible(true)
                    shownMessages.current.add(randomMsg)
                    lastMessageTime.current = Date.now() // Delay next auto-trigger
                }, 50)
            }}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        key={currentMessage}
                        initial={{ opacity: 0, scale: 0.8, x: 5, y: 5 }}
                        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 5, y: 5 }}
                        className="absolute bottom-[80%] right-[70%] mb-1 mr-1 w-44 p-3.5 bg-background/95 backdrop-blur-md border border-border/50 shadow-2xl rounded-2xl rounded-br-none z-[70] pointer-events-none"
                    >
                        <p className="text-[12px] font-medium leading-normal text-foreground/90 italic">
                            "{currentMessage}"
                        </p>
                        {/* Speech bubble tail */}
                        <div className="absolute -bottom-1 -right-0 w-3 h-3 bg-background/95 border-r border-b border-border/50 transform rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div
                ref={containerRef}
                className="w-40 h-[120px] bg-background/40 backdrop-blur-sm border border-border/20 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30"
            />
            <div className="absolute -top-1 -right-1 bg-primary w-3 h-3 rounded-full animate-pulse border-2 border-background" />
        </div>
    )
}

export default SketchSelfPortrait
