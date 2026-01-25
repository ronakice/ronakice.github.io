"use client"

import React, { useMemo, useEffect, useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Edges, Stars } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

const Voxel = ({ position, color, opacity = 1, transparent = false, borderColor, glow = false, flashTime = 0, onClick }: { position: [number, number, number], color: string, opacity?: number, transparent?: boolean, borderColor: string, glow?: boolean, flashTime?: number, onClick?: (e: any) => void }) => {
    const meshRef = React.useRef<THREE.Mesh>(null)
    const materialRef = React.useRef<THREE.MeshStandardMaterial>(null)
    const edgesMaterialRef = React.useRef<THREE.MeshBasicMaterial>(null)

    // Store original colors to avoid re-parsing every frame
    const originalColor = useMemo(() => new THREE.Color(color), [color])
    const whiteColor = useMemo(() => new THREE.Color('#ffffff'), [])
    const originalBorderColor = useMemo(() => new THREE.Color(borderColor), [borderColor])

    useFrame(() => {
        if (!materialRef.current || !edgesMaterialRef.current) return

        const now = Date.now()
        const timeSinceFlash = (now - flashTime) / 1000 // seconds

        // Enhanced flash: slower decay (2.5 instead of 3) for longer lasting effect
        // Added a quick initial burst followed by slower fade
        let intensity = 0
        if (timeSinceFlash >= 0) {
            // Initial burst (first 0.1s) stays at full intensity
            if (timeSinceFlash < 0.1) {
                intensity = 1
            } else {
                intensity = Math.exp(-(timeSinceFlash - 0.1) * 2.5)
            }
            if (intensity < 0.01) intensity = 0
        }

        // Interpolate Color - flash to white
        materialRef.current.color.lerpColors(originalColor, whiteColor, intensity)

        // Enhanced emissive - brighter flash
        materialRef.current.emissive.setScalar(intensity)
        materialRef.current.emissiveIntensity = intensity * 0.8

        // Interpolate Edges - flash to bright white
        edgesMaterialRef.current.color.lerpColors(originalBorderColor, whiteColor, intensity)

        const baseOpacity = glow ? 0.8 : 0.3
        const targetOpacity = 1.0
        edgesMaterialRef.current.opacity = baseOpacity + (targetOpacity - baseOpacity) * intensity
    })

    return (
        <mesh position={position} onClick={onClick} ref={meshRef}>
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
            <Edges
                scale={1}
                threshold={15}
                color={borderColor}
            >
                <meshBasicMaterial ref={edgesMaterialRef} color={borderColor} transparent opacity={glow ? 0.8 : 0.3} toneMapped={false} />
            </Edges>
        </mesh>
    )
}

export function DarkSideVoxel({ onPrismClick }: { onPrismClick?: () => void }) {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [flashTime, setFlashTime] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Check for mobile viewport
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

    // Colors based on theme
    const bgColor = isDark ? '#000000' : 'transparent' // Use transparent to match page background in light mode
    const prismBorderColor = isDark ? '#ffffff' : '#000000'
    const incomingBeamColor = '#ffffff'

    // Generate Prism Voxels
    const prismVoxels = useMemo(() => {
        const v: { position: [number, number, number], color: string, opacity: number, transparent: boolean }[] = []
        const rows = 11 // Increased height
        const depth = 2
        for (let i = 0; i < rows; i++) {
            for (let x = -i; x <= i; x++) {
                for (let z = -depth; z <= depth; z++) {
                    const isBorder = x === -i || x === i || i === rows - 1 || z === -depth || z === depth
                    v.push({
                        position: [x, rows - i - 6, z], // Adjusted offset for centering
                        color: isBorder ? '#888888' : '#050505', // Darker inside
                        opacity: isBorder ? 0.1 : 0.8, // Less bright borders, dark solid-ish core
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
            // Beam at z=0
            v.push({ position: [Math.round(x), Math.round(y), 0], color: incomingBeamColor, opacity: 0.9 })
        }
        return v
    }, [incomingBeamColor])

    // Outgoing Beams (Rainbow)
    const outgoingBeams = useMemo(() => {
        const v: { position: [number, number, number], color: string, opacity: number }[] = []
        const colors = [
            '#ff0000', // Red
            '#ff7f00', // Orange
            '#ffff00', // Yellow
            '#00ff00', // Green
            '#0000ff', // Blue
            '#8b00ff'  // Violet
        ]

        const startX = 2
        const startY = -1.5 // Lower the start point slightly

        colors.forEach((color, idx) => {
            // Red (idx 0) should be on top, Violet (idx 5) on bottom
            // Red refracts least (flattest), Violet refracts most (downwards)

            const yOffset = (colors.length - 1 - idx) * 0.3 // Spread them out vertically at start
            const angleDivergence = -0.15 - (idx * 0.05) // Red: -0.15, Violet: -0.4

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
                {/* Star field background - only in dark mode */}
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
                {/* Add subtle colored lights for spectral effect */}
                <pointLight position={[15, -5, 5]} intensity={0.3} color="#ff0000" />
                <pointLight position={[15, -8, 5]} intensity={0.3} color="#8b00ff" />

                <group position={[0, 4, 0]} rotation={[0.1, 0.1, 0]}>
                    {/* Prism */}
                    {prismVoxels.map((voxel, i) => (
                        <Voxel
                            key={`prism-${i}`}
                            {...voxel}
                            borderColor={prismBorderColor}
                            glow={true}
                            flashTime={flashTime}
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
