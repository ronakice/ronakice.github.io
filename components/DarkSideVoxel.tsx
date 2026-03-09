"use client"

import React, { useMemo, useEffect, useState, useRef, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Edges, Stars } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

// ─── Single Voxel (no per-voxel useFrame) ───────────────────────────
// Each voxel still renders its own <mesh> + <Edges> for visual fidelity,
// but registers its material refs with the parent FlashController
// instead of running its own useFrame callback.

const Voxel = React.memo(({
    position, color, opacity = 1, transparent = false, borderColor, glow = false,
    registerMaterial, onClick,
}: {
    position: [number, number, number]
    color: string
    opacity?: number
    transparent?: boolean
    borderColor: string
    glow?: boolean
    registerMaterial?: (entry: { mat: THREE.MeshStandardMaterial; edge: THREE.MeshBasicMaterial; color: THREE.Color; borderColor: THREE.Color; glow: boolean }) => (() => void)
    onClick?: (e: any) => void
}) => {
    const materialRef = useRef<THREE.MeshStandardMaterial>(null)
    const edgesMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

    const originalColor = useMemo(() => new THREE.Color(color), [color])
    const originalBorderColor = useMemo(() => new THREE.Color(borderColor), [borderColor])

    // Register with the parent's flash controller on mount
    useEffect(() => {
        if (!registerMaterial || !materialRef.current || !edgesMaterialRef.current) return
        const unregister = registerMaterial({
            mat: materialRef.current,
            edge: edgesMaterialRef.current,
            color: originalColor,
            borderColor: originalBorderColor,
            glow: glow,
        })
        return unregister
    }, [registerMaterial, originalColor, originalBorderColor, glow])

    return (
        <mesh position={position} onClick={onClick}>
            <boxGeometry args={[0.95, 0.95, 0.95]} />
            <meshStandardMaterial
                ref={materialRef}
                color={color}
                transparent={transparent}
                opacity={opacity}
                roughness={0.1}
                metalness={0.1}
                emissive="#000000"
                emissiveIntensity={0}
            />
            <Edges scale={1} threshold={15} color={borderColor}>
                <meshBasicMaterial ref={edgesMaterialRef} color={borderColor} transparent opacity={glow ? 0.8 : 0.3} toneMapped={false} />
            </Edges>
        </mesh>
    )
})

Voxel.displayName = 'Voxel'

// ─── Flash controller ───────────────────────────────────────────────
// ONE useFrame for all voxels. Materials register themselves here.

interface MaterialEntry {
    mat: THREE.MeshStandardMaterial
    edge: THREE.MeshBasicMaterial
    color: THREE.Color
    borderColor: THREE.Color
    glow: boolean
}

function FlashController({ flashTime, children }: { flashTime: number; children: React.ReactNode }) {
    const entries = useRef<Set<MaterialEntry>>(new Set())
    const whiteColor = useMemo(() => new THREE.Color('#ffffff'), [])

    const registerMaterial = useCallback((entry: MaterialEntry) => {
        entries.current.add(entry)
        return () => { entries.current.delete(entry) }
    }, [])

    useFrame(() => {
        const now = Date.now()
        const timeSinceFlash = (now - flashTime) / 1000

        let intensity = 0
        if (timeSinceFlash >= 0) {
            if (timeSinceFlash < 0.1) {
                intensity = 1
            } else {
                intensity = Math.exp(-(timeSinceFlash - 0.1) * 2.5)
            }
            if (intensity < 0.01) intensity = 0
        }

        // Skip work when not flashing
        if (intensity === 0) return

        for (const e of entries.current) {
            e.mat.color.lerpColors(e.color, whiteColor, intensity)
            e.mat.emissive.setScalar(intensity)
            e.mat.emissiveIntensity = intensity * 0.8

            e.edge.color.lerpColors(e.borderColor, whiteColor, intensity)
            const baseOpacity = e.glow ? 0.8 : 0.3
            e.edge.opacity = baseOpacity + (1.0 - baseOpacity) * intensity
        }
    })

    return (
        <group>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.type === Voxel) {
                    return React.cloneElement(child as React.ReactElement<any>, { registerMaterial })
                }
                return child
            })}
        </group>
    )
}

export function DarkSideVoxel({ onPrismClick }: { onPrismClick?: () => void }) {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [flashTime, setFlashTime] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setMounted(true)
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handlePrismClick = (e: any) => {
        e.stopPropagation()
        setFlashTime(Date.now())
        onPrismClick?.()
    }

    const isDark = !mounted || (theme === 'dark' || resolvedTheme === 'dark')

    const prismBorderColor = isDark ? '#ffffff' : '#000000'
    const incomingBeamColor = '#ffffff'

    // Generate Prism Voxels
    const prismVoxels = useMemo(() => {
        const v: { position: [number, number, number], color: string, opacity: number, transparent: boolean }[] = []
        const rows = 11
        const depth = 2
        for (let i = 0; i < rows; i++) {
            for (let x = -i; x <= i; x++) {
                for (let z = -depth; z <= depth; z++) {
                    const isBorder = x === -i || x === i || i === rows - 1 || z === -depth || z === depth
                    v.push({
                        position: [x, rows - i - 6, z],
                        color: isBorder ? '#888888' : '#050505',
                        opacity: isBorder ? 0.1 : 0.8,
                        transparent: true
                    })
                }
            }
        }
        return v
    }, [])

    // Incoming Beam
    const incomingBeam = useMemo(() => {
        const v: { position: [number, number, number], color: string, opacity: number }[] = []
        const startX = -16
        const endX = -2
        const startY = -3
        const endY = -0.5

        const steps = Math.abs(endX - startX)
        for (let i = 0; i < steps; i++) {
            const t = i / steps
            const x = startX + (endX - startX) * t
            const y = startY + (endY - startY) * t
            v.push({ position: [Math.round(x), Math.round(y), 0], color: incomingBeamColor, opacity: 0.9 })
        }
        return v
    }, [incomingBeamColor])

    // Outgoing Beams (Rainbow)
    const outgoingBeams = useMemo(() => {
        const v: { position: [number, number, number], color: string, opacity: number }[] = []
        const colors = [
            '#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#8b00ff'
        ]

        const startX = 2
        const startY = -1.5

        colors.forEach((color, idx) => {
            const yOffset = (colors.length - 1 - idx) * 0.3
            const angleDivergence = -0.15 - (idx * 0.05)

            for (let i = 0; i < 14; i++) {
                const x = startX + i
                const y = startY + yOffset + (i * angleDivergence)

                v.push({
                    position: [Math.round(x), Math.round(y), 0],
                    color: color,
                    opacity: 0.9
                })
            }
        })
        return v
    }, [])

    if (!mounted) return <div className="h-full w-full bg-transparent" />

    return (
        <div className={`h-full w-full flex items-center justify-center overflow-hidden bg-transparent`}>
            <Canvas key={isMobile ? 'mobile' : 'desktop'} camera={{ position: [0, 0, isMobile ? 55 : 30], fov: isMobile ? 65 : 50 }}>
                {isDark && (
                    <Stars
                        radius={100}
                        depth={50}
                        count={3000}
                        factor={4}
                        saturation={0}
                        fade
                        speed={0.5}
                    />
                )}

                {!isDark && <ambientLight intensity={0.8} />}
                {isDark && <ambientLight intensity={0.4} />}
                <pointLight position={[-10, 10, 10]} intensity={1.2} />
                <pointLight position={[10, -10, 10]} intensity={0.6} />
                <pointLight position={[15, -5, 5]} intensity={0.3} color="#ff0000" />
                <pointLight position={[15, -8, 5]} intensity={0.3} color="#8b00ff" />

                <group position={[0, 4, 0]} rotation={[0.1, 0.1, 0]}>
                    <FlashController flashTime={flashTime}>
                        {/* Prism */}
                        {prismVoxels.map((voxel, i) => (
                            <Voxel
                                key={`prism-${i}`}
                                {...voxel}
                                borderColor={prismBorderColor}
                                glow={true}
                                onClick={handlePrismClick}
                            />
                        ))}

                        {/* Incoming */}
                        {incomingBeam.map((voxel, i) => (
                            <Voxel
                                key={`in-${i}`}
                                {...voxel}
                                borderColor="#000000"
                            />
                        ))}

                        {/* Outgoing */}
                        {outgoingBeams.map((voxel, i) => (
                            <Voxel
                                key={`out-${i}`}
                                {...voxel}
                                borderColor={isDark ? '#000000' : '#ffffff'}
                            />
                        ))}
                    </FlashController>
                </group>

                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.4}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI * 3 / 4}
                />
            </Canvas>
        </div>
    )
}
