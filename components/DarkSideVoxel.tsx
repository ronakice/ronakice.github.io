"use client"

import React, { useMemo, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Edges } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

const Voxel = ({ position, color, opacity = 1, transparent = false, borderColor, glow = false }: { position: [number, number, number], color: string, opacity?: number, transparent?: boolean, borderColor: string, glow?: boolean }) => {
    return (
        <mesh position={position}>
            <boxGeometry args={[0.95, 0.95, 0.95]} />
            <meshStandardMaterial
                color={color}
                transparent={transparent}
                opacity={opacity}
                roughness={0.1}
                metalness={0.1}
            />
            <Edges
                scale={1}
                threshold={15}
                color={borderColor}
            >
                <meshBasicMaterial color={borderColor} transparent opacity={glow ? 0.8 : 0.3} toneMapped={false} />
            </Edges>
        </mesh>
    )
}

export function DarkSideVoxel() {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

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
            <Canvas camera={{ position: [0, 0, 35], fov: 45 }}>
                {!isDark && <ambientLight intensity={0.8} />}
                {isDark && <ambientLight intensity={0.3} />}
                <pointLight position={[-10, 10, 10]} intensity={1} />
                <pointLight position={[10, -10, 10]} intensity={0.5} />

                <group position={[0, 5, 0]} rotation={[0.1, 0.1, 0]}>
                    {/* Prism */}
                    {prismVoxels.map((voxel, i) => (
                        <Voxel
                            key={`prism-${i}`}
                            {...voxel}
                            borderColor={prismBorderColor}
                            glow={true}
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
                    autoRotateSpeed={0.5}
                    minPolarAngle={Math.PI / 4}
                    maxPolarAngle={Math.PI * 3 / 4}
                />
            </Canvas>
        </div>
    )
}
