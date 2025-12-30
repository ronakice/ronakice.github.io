"use client"

import React, { useEffect, useRef } from 'react'
import type p5 from 'p5'

const SketchSelfPortrait = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const p5Instance = useRef<p5 | null>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

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
                    // We can use a transparent background or a subtle dark one
                    // The user used: background(20, 20, 25);
                    // But for a floating widget, maybe transparent is better or a rounded dark box.

                    p.push()
                    // Scale it down from 800x600 to 160x120 (0.2x scale)
                    p.scale(0.2)

                    p.translate(400, 300) // Center of 800x600

                    // Interactive vars
                    // p.mouseX/Y are already relative to the canvas in instance mode.
                    const localMouseX = p.mouseX * 5
                    const localMouseY = p.mouseY * 5

                    let mx = (localMouseX - 400) * 0.05
                    let my = (localMouseY - 300) * 0.05
                    let nervous = p.mouseIsPressed ? 5 : 1

                    timeOffset += 0.02

                    // Stylistic settings
                    p.stroke(240, 240, 255, 200)
                    p.strokeWeight(1.5)

                    // 1. The Head Shape
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
                    drawEyeSpiral(p, timeOffset, nervous, -1)
                    p.pop()

                    p.push()
                    p.translate(eyeDist + mx, eyeY + my)
                    drawEyeSpiral(p, timeOffset + 100, nervous, 1)
                    p.pop()

                    // --- NEW SECTION: OVERSIZED Wayfarer Glasses ---
                    p.push()
                    p.translate(mx, eyeY + my)
                    p.stroke(200, 200, 255, 180)

                    for (let thick = 0; thick < 6; thick++) {
                        p.strokeWeight(1.5)
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

                    p.strokeWeight(1)
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

                    // 3. The Nose
                    p.stroke(240, 240, 255, 180)
                    p.beginShape()
                    let noseX = mx * 1.2
                    let noseY = my * 1.2
                    for (let i = 0; i < 50; i++) {
                        let t = i / 50.0
                        let nX = p.lerp(0, -10, t) + p.map(p.noise(i * 0.2, timeOffset), 0, 1, -5, 5) * nervous
                        let nY = p.lerp(-30, 40, t) + p.map(p.noise(i * 0.2 + 10, timeOffset), 0, 1, -2, 2)
                        if (i > 40) nX += 15 * p.sin((i - 40) * 0.5)
                        p.splineVertex(noseX + nX, noseY + nY)
                    }
                    p.endShape()

                    // 4. The Beard
                    p.push()
                    p.translate(mx * 1.1, my * 1.1)
                    p.stroke(220, 220, 255, 120)
                    p.strokeWeight(0.8)

                    for (let b = 0; b < 60; b++) {
                        p.beginShape()
                        for (let a = -0.2; a <= p.PI + 0.2; a += 0.05) {
                            let baseR = 125
                            let chinLength = p.map(p.sin(a), 0, 1, 0, 90)
                            let nVal = p.noise(a * 4, b * 10, timeOffset)
                            let r = baseR + chinLength + p.map(nVal, 0, 1, -40, 60)
                            let x = r * p.cos(a) * 0.92
                            let y = r * p.sin(a) * 1.1

                            if (y > -20) {
                                p.splineVertex(x + p.map(p.noise(a * 10), 0, 1, -2, 2) * nervous, y)
                            }
                        }
                        p.endShape()
                    }
                    p.pop()

                    // 5. The Mouth
                    p.push()
                    p.translate(mx * 1.1, 95 + my * 1.1)
                    p.stroke(255, 200, 200, 120)
                    p.beginShape()
                    for (let x = -30; x <= 30; x += 5) {
                        // map mouseY to smile factor
                        let smileFactor = p.map(localMouseY, 0, 600, -0.5, 0.5)
                        let y = (x * x) * 0.02 * smileFactor
                        let n = p.map(p.noise(x * 0.1, timeOffset * 2), 0, 1, -2, 2) * nervous
                        p.splineVertex(x + n, y + n)
                    }
                    p.endShape()
                    p.pop()

                    // --- UPDATED SECTION: Vertical Handlebar Moustache ---
                    p.push()
                    p.translate(mx * 1.2, 55 + my * 1.2)
                    p.stroke(240, 240, 255, 180)
                    p.strokeWeight(1.0)

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
                    p.stroke(100, 200, 255, 100)
                    p.strokeWeight(0.8)
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

                const drawEyeSpiral = (p: any, tOffset: number, nervous: number, side: number) => {
                    // Calculate angle to mouse
                    const centerX = (side === -1 ? -60 : 60)
                    const centerY = -30
                    // p.mouseX/Y are already relative to the canvas in instance mode.
                    const localMouseX = p.mouseX * 5
                    const localMouseY = p.mouseY * 5

                    let dx = localMouseX - (400 + centerX)
                    let dy = localMouseY - (300 + centerY)
                    let angle = p.atan2(dy, dx)
                    let distVal = p.constrain(p.sqrt(dx * dx + dy * dy), 0, 20)

                    let pupilX = p.cos(angle) * distVal * 0.5
                    let pupilY = p.sin(angle) * distVal * 0.5

                    p.stroke(240, 240, 255, 200)
                    p.beginShape()
                    for (let a = 0; a < p.TWO_PI; a += 0.2) {
                        let r = 25 + p.map(p.noise(p.cos(a) + tOffset, p.sin(a)), 0, 1, -2, 2)
                        p.splineVertex(r * p.cos(a), r * p.sin(a))
                    }
                    p.endShape(p.CLOSE)

                    p.push()
                    p.translate(pupilX, pupilY)
                    p.stroke(200, 220, 255, 200)
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
    }, [])

    return (
        <div
            className="fixed bottom-6 right-6 z-[60] group cursor-pointer"
            title="A sketchy self-portrait"
        >
            <div
                ref={containerRef}
                className="w-40 h-[120px] bg-background/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:border-primary/30"
            />
            <div className="absolute -top-2 -right-2 bg-primary w-3 h-3 rounded-full animate-pulse border-2 border-background" />
        </div>
    )
}

export default SketchSelfPortrait
