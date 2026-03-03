"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import type { Pet } from "@/components/pet-gallery"

interface PetSlideshowProps {
  pets: Pet[]
}

export function PetSlideshow({ pets }: PetSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const nextSlide = useCallback(() => {
    if (pets.length <= 1) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % pets.length)
      setIsTransitioning(false)
    }, 800)
  }, [pets.length])

  const prevSlide = useCallback(() => {
    if (pets.length <= 1) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + pets.length) % pets.length)
      setIsTransitioning(false)
    }, 800)
  }, [pets.length])

  useEffect(() => {
    if (pets.length <= 1) return
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide, pets.length])

  // Reset index if it goes out of range
  useEffect(() => {
    if (currentIndex >= pets.length && pets.length > 0) {
      setCurrentIndex(0)
    }
  }, [currentIndex, pets.length])

  if (pets.length === 0) {
    return (
      <div className="border-2 border-border bg-card p-1">
        <div className="flex aspect-video w-full items-center justify-center border border-border/50">
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
            {"[ no signal -- upload a pet above ]"}
          </p>
        </div>
      </div>
    )
  }

  const currentPet = pets[currentIndex]

  return (
    <div className="flex flex-col gap-0">
      {/* Monitor top bar */}
      <div className="flex items-center justify-between border-2 border-b-0 border-border bg-secondary px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-primary" />
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            pet_viewer.exe
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex h-3 w-3 items-center justify-center border border-border bg-background font-serif text-[8px] text-muted-foreground">
            _
          </span>
          <span className="flex h-3 w-3 items-center justify-center border border-border bg-background font-serif text-[8px] text-muted-foreground">
            {"[]"}
          </span>
          <span className="flex h-3 w-3 items-center justify-center border border-border bg-background font-serif text-[8px] text-muted-foreground">
            x
          </span>
        </div>
      </div>

      {/* Monitor screen */}
      <div className="relative border-2 border-border bg-card p-1.5">
        <div className="relative aspect-video w-full overflow-hidden bg-background">
          {pets.map((pet, index) => (
            <div
              key={`${pet.name}-${index}`}
              className="absolute inset-0 transition-opacity duration-[800ms] ease-in-out"
              style={{
                opacity: index === currentIndex && !isTransitioning ? 1 : 0,
              }}
            >
              <Image
                src={pet.src}
                alt={pet.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 640px"
                priority={index === 0}
              />
            </div>
          ))}

          {/* Prev arrow */}
          {pets.length > 1 && (
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 border border-border bg-background/80 px-2 py-1 font-serif text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm"
              aria-label="Previous pet"
            >
              {"◀"}
            </button>
          )}

          {/* Next arrow */}
          {pets.length > 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 border border-border bg-background/80 px-2 py-1 font-serif text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm"
              aria-label="Next pet"
            >
              {"▶"}
            </button>
          )}

          {/* Pet name overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-background/80 to-transparent px-3 pb-2 pt-6">
            <span
              className="font-serif text-xl text-primary md:text-2xl"
              style={{ animation: "text-glow 3s ease-in-out infinite" }}
            >
              {currentPet?.name.toLowerCase().replace(/\s+/g, "_")}.exe
            </span>
          </div>

          {/* CRT curvature vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%)",
            }}
          />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-border/50 bg-secondary px-2 py-1 mt-1.5">
          <span className="font-sans text-[10px] text-muted-foreground">
            {currentPet ? `${currentPet.name.toLowerCase().replace(/\s+/g, "_")}.exe` : "---"}
          </span>

          {/* Dot indicators */}
          {pets.length > 1 && (
            <div className="flex gap-1.5">
              {pets.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsTransitioning(true)
                    setTimeout(() => {
                      setCurrentIndex(index)
                      setIsTransitioning(false)
                    }, 400)
                  }}
                  className={`h-1.5 w-1.5 transition-colors duration-300 ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-border"
                  }`}
                  aria-label={`Go to pet photo ${index + 1}`}
                />
              ))}
            </div>
          )}

          <span className="font-sans text-[10px] text-muted-foreground">
            {`${currentIndex + 1}/${pets.length}`}
          </span>
        </div>
      </div>
    </div>
  )
}