"use client"

import Image from "next/image"

export interface Pet {
  name: string
  src: string
}

interface PetGalleryProps {
  pets: Pet[]
}

export function PetGallery({ pets }: PetGalleryProps) {
  if (pets.length === 0) {
    return (
      <div className="border-2 border-border bg-card p-1">
        <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-primary" />
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              all_pets.log
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-8">
          <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
            {"[ no pets registered yet -- be the first! ]"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="border-2 border-border bg-card p-1">
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 bg-primary" />
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            all_pets.log
          </span>
        </div>
        <span className="font-sans text-[10px] text-muted-foreground">
          {pets.length} {pets.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* Pet list */}
      <div className="max-h-72 overflow-y-auto">
        {pets.map((pet, index) => (
          <div
            key={`${pet.name}-${index}`}
            className="flex items-center gap-4 border-b border-border/40 px-3 py-2.5 transition-colors duration-200 hover:bg-secondary/50"
          >
            {/* Thumbnail */}
            <div className="relative h-10 w-10 shrink-0 border border-border bg-background">
              <Image
                src={pet.src}
                alt={pet.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>

            {/* Name as .exe */}
            <div className="flex flex-col gap-0.5">
              <span
                className="font-serif text-lg text-primary"
                style={{ animation: "text-glow 3s ease-in-out infinite" }}
              >
                {pet.name.toLowerCase().replace(/\s+/g, "_")}.exe
              </span>
              <span className="font-sans text-[10px] text-muted-foreground">
                {`registered -- pet #${String(index + 1).padStart(3, "0")}`}
              </span>
            </div>

            {/* Index */}
            <span className="ml-auto font-sans text-[10px] text-muted-foreground/50">
              {`[${String(index).padStart(2, "0")}]`}
            </span>
          </div>
        ))}
      </div>

      {/* Footer status */}
      <div className="flex items-center justify-between border-t border-border bg-secondary px-3 py-1">
        <span className="font-sans text-[10px] text-muted-foreground">
          {">"} end of list
        </span>
        <span className="font-sans text-[10px] text-muted-foreground">
          {`total: ${pets.length}`}
        </span>
      </div>
    </div>
  )
}
