"use client"

import { useRef, useState, useEffect } from "react"

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const tryPlay = () => {
      audio.volume = 0.3
      audio.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        // autoplay blocked, wait for user interaction
        const handleInteraction = () => {
          audio.play().then(() => {
            setIsPlaying(true)
          }).catch(() => {})
          document.removeEventListener("click", handleInteraction)
          document.removeEventListener("keydown", handleInteraction)
        }
        document.addEventListener("click", handleInteraction)
        document.addEventListener("keydown", handleInteraction)
      })
    }

    tryPlay()
  }, [])

  function toggleMute() {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.muted = false
      setIsMuted(false)
    } else {
      audio.muted = true
      setIsMuted(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/come-along-with-me.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMute}
        className="flex items-center gap-2 border border-border bg-secondary px-3 py-1.5 font-sans text-xs uppercase tracking-[0.15em] text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        aria-label={isMuted ? "Unmute music" : "Mute music"}
      >
        {isMuted ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        )}
        <span>{isMuted ? "muted" : "playing"}</span>
      </button>
    </>
  )
}
