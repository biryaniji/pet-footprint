"use client"

import { useState, useEffect } from "react"
import { SparkleText } from "@/components/sparkle-text"
import { PetSlideshow } from "@/components/pet-slideshow"
import { UploadButton } from "@/components/upload-button"
import { MusicPlayer } from "@/components/music-player"
import { PetGallery } from "@/components/pet-gallery"
import type { Pet } from "@/components/pet-gallery"

export default function Home() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPets() {
      const res = await fetch("/api/pets")
      const data = await res.json()
      if (Array.isArray(data)) {
        setPets(data.map((p: any) => ({ name: p.name, src: p.image_url })))
      }
      setLoading(false)
    }
    fetchPets()
  }, [])

  async function handleUpload(files: FileList, petName: string) {
    const newPets: Pet[] = []

    for (const file of Array.from(files)) {
      const fileName = `${Date.now()}-${file.name}`
      const formData = new FormData()
      formData.append("file", file)
      formData.append("fileName", fileName)

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const uploadData = await uploadRes.json()
      if (!uploadData.url) continue

      await fetch("/api/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: petName, image_url: uploadData.url }),
      })

      newPets.push({ name: petName, src: uploadData.url })
    }

    setPets((prev) => [...prev, ...newPets])
  }

  return (
    <main className="relative flex min-h-svh flex-col items-center bg-background overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background: "linear-gradient(transparent 50%, rgba(0,0,0,0.08) 50%)",
          backgroundSize: "100% 4px",
          animation: "flicker 8s infinite",
        }}
      />

      <header className="flex w-full items-center justify-end gap-3 px-6 py-5 md:px-10">
        <MusicPlayer />
        <UploadButton onUpload={handleUpload} />
      </header>

      <div className="flex flex-1 flex-col items-center justify-center gap-10 px-6 pb-20 md:gap-14">
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

        {loading ? (
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
            {"[ loading pets... ]"}
          </p>
        ) : (
          <>
            <div className="w-full max-w-xl md:max-w-2xl">
              <PetSlideshow pets={pets} />
            </div>
            <div className="w-full max-w-xl md:max-w-2xl">
              <PetGallery pets={pets} />
            </div>
          </>
        )}
      </div>

      <footer className="pb-6 text-center">
        <p className="font-sans text-xs text-muted-foreground/40 uppercase tracking-[0.2em]">
          {"[ made with love by biryani ]"}
        </p>
      </footer>
    </main>
  )
}