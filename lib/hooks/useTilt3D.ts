import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { MotionStyle } from 'framer-motion'
import React from 'react'

interface UseTilt3DOptions {
  maxDeg?: number
}

export function useTilt3D({ maxDeg = 6 }: UseTilt3DOptions = {}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxDeg}deg`, `-${maxDeg}deg`])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxDeg}deg`, `${maxDeg}deg`])

  const rectRef = React.useRef<DOMRect | null>(null)

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = e.currentTarget.getBoundingClientRect()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return
    const rect = rectRef.current
    const xPct = (e.clientX - rect.left) / rect.width - 0.5
    const yPct = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    rectRef.current = null
  }

  const tiltStyle: MotionStyle = {
    rotateX,
    rotateY,
    transformStyle: 'preserve-3d',
    willChange: 'transform',
  }

  return { tiltStyle, handleMouseEnter, handleMouseMove, handleMouseLeave }
}
