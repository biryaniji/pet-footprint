"use client"

import { useRef, useState } from "react"

interface UploadButtonProps {
  onUpload: (files: FileList, petName: string) => void
}

export function UploadButton({ onUpload }: UploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [petName, setPetName] = useState("")

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0 && petName.trim()) {
      onUpload(e.target.files, petName.trim())
      setPetName("")
      setIsOpen(false)
      e.target.value = ""
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-border bg-secondary px-4 py-1.5 font-sans text-xs uppercase tracking-[0.15em] text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-label="Upload pet photo"
      >
        <span className="font-serif text-base text-primary">+</span>
        <span>upload</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-40 mt-2 w-64 border-2 border-border bg-card p-1">
          {/* Title bar */}
          <div className="flex items-center justify-between border-b border-border bg-secondary px-3 py-1.5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-primary" />
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                add_pet.exe
              </span>
            </div>
            <button
              onClick={() => { setIsOpen(false); setPetName("") }}
              className="flex h-3 w-3 items-center justify-center border border-border bg-background font-serif text-[8px] text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            >
              x
            </button>
          </div>

          {/* Form content */}
          <div className="flex flex-col gap-3 p-3">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pet-name" className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {">"} pet name:
              </label>
              <input
                id="pet-name"
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="type name here..."
                className="border border-border bg-background px-2 py-1.5 font-serif text-sm text-primary placeholder:text-muted-foreground/40 focus:border-primary focus:outline-none"
              />
            </div>

            <button
              onClick={() => {
                if (petName.trim()) {
                  inputRef.current?.click()
                }
              }}
              disabled={!petName.trim()}
              className="border border-border bg-secondary px-3 py-1.5 font-sans text-[10px] uppercase tracking-[0.15em] text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-secondary disabled:hover:text-foreground"
            >
              {"[ select photo ]"}
            </button>

            {!petName.trim() && (
              <p className="font-sans text-[10px] text-muted-foreground/60">
                {"// enter name first, then pick a photo"}
              </p>
            )}
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}
