"use client"

import { useState } from "react"
import { SparkleText } from "@/components/sparkle-text"
import { PetSlideshow } from "@/components/pet-slideshow"
import { UploadButton } from "@/components/upload-button"
import { MusicPlayer } from "@/components/music-player"
import { PetGallery } from "@/components/pet-gallery"
import type { Pet } from "@/components/pet-gallery"

const DEFAULT_PETS: Pet[] = [
  { name: "Buddy", src: "/images/pet-1.jpg" },
  { name: "Whiskers", src: "/images/pet-2.jpg" },
  { name: "Snowball", src: "/images/pet-3.jpg" },
  { name: "Cheddar", src: "/images/pet-4.jpg" },
]

export default function Home() {
  const [pets, setPets] = useState<Pet[]>(DEFAULT_PETS)

  function handleUpload(files: FileList, petName: string) {
    const newPets: Pet[] = []
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file)
      newPets.push({ name: petName, src: url })
    })
    setPets((prev) => [...prev, ...newPets])
  }

  return (
    <main className="relative flex min-h-svh flex-col items-center bg-background overflow-hidden">
      {/* CRT scanline overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
        }}
      />

      {/* Slow scanline sweep */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "linear-gradient(transparent 50%, rgba(0,0,0,0.08) 50%)",
          backgroundSize: "100% 4px",
          animation: "flicker 8s infinite",
        }}
      />

      {/* Header */}
      <header className="flex w-full items-center justify-end gap-3 px-6 py-5 md:px-10">
        <MusicPlayer />
        <UploadButton onUpload={handleUpload} />
      </header>

      {/* Main content */}
      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-20 md:gap-14">
        {/* Sparkle heading */}
        <div className="text-center">
          <h1
            className="font-serif text-4xl leading-relaxed tracking-tight text-primary md:text-6xl md:leading-relaxed"
            style={{ animation: "text-glow 3s ease-in-out infinite" }}
          >
            <SparkleText>
              {"Congrats your pet has a"}
              <br className="hidden sm:block" />
              {" digital footprint"}
            </SparkleText>
          </h1>
          <p className="mt-5 font-sans text-xs uppercase tracking-[0.25em] text-muted-foreground">
            {"// dedicating a little corner of the internet for our BABIESS"}
          </p>
        </div>

        {/* Pet photo window */}
        <div className="w-full max-w-xl md:max-w-2xl">
          <PetSlideshow pets={pets} />
        </div>

        {/* Pet gallery list */}
        <div className="w-full max-w-xl md:max-w-2xl">
          <PetGallery pets={pets} />
        </div>
      </div>

      {/* Retro footer */}
      <footer className="pb-6 text-center">
        <p className="font-sans text-xs text-muted-foreground/40 uppercase tracking-[0.2em]">
          {"[ made with love by biryani ]"}
        </p>
      </footer>
    </main>
  )
}
