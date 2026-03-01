"use client"

import { useEffect, useState, useCallback } from "react"

interface Sparkle {
  id: string
  x: number
  y: number
  size: number
  delay: number
  duration: number
  type: "star" | "cross" | "dot"
}

function generateSparkle(): Sparkle {
  const types: Sparkle["type"][] = ["star", "cross", "dot"]
  return {
    id: crypto.randomUUID(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 4,
    delay: Math.random() * 2,
    duration: Math.random() * 1.5 + 0.8,
    type: types[Math.floor(Math.random() * types.length)],
  }
}

function SparkleShape({ type }: { type: Sparkle["type"] }) {
  if (type === "cross") {
    return (
      <path
        d="M12 2V22M2 12H22"
        stroke="currentColor"
        strokeWidth="2"
        className="text-sparkle"
      />
    )
  }
  if (type === "dot") {
    return (
      <circle cx="12" cy="12" r="3" fill="currentColor" className="text-sparkle" />
    )
  }
  return (
    <path
      d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
      fill="currentColor"
      className="text-sparkle"
    />
  )
}

export function SparkleText({ children }: { children: React.ReactNode }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  const addSparkle = useCallback(() => {
    const newSparkle = generateSparkle()
    setSparkles((prev) => [...prev.slice(-14), newSparkle])
  }, [])

  useEffect(() => {
    const initialSparkles = Array.from({ length: 8 }, () => generateSparkle())
    setSparkles(initialSparkles)

    const interval = setInterval(addSparkle, 500)
    return () => clearInterval(interval)
  }, [addSparkle])

  return (
    <span className="relative inline-block">
      <span className="relative z-10">{children}</span>
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          className="pointer-events-none absolute z-20"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            animation: `sparkle-fade ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <SparkleShape type={sparkle.type} />
        </svg>
      ))}
    </span>
  )
}
