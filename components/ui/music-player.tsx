"use client"

import { useState, useRef, useEffect, useCallback } from "react"

// ─── Configure your music here ────────────────────────────────────────────────
export const MUSIC_CONFIG = {
  src: "/music.mp3",          // e.g. "/audio/song.mp3" or an https:// URL
  title: "Wassup Homiee !",
  cover: "",        // e.g. "/cover.jpg"
}
// ─────────────────────────────────────────────────────────────────────────────

function formatTime(t: number) {
  if (!t || isNaN(t) || !isFinite(t)) return "0:00"
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60).toString().padStart(2, "0")
  return `${m}:${s}`
}

function PrevIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
    </svg>
  )
}
function NextIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M6 18l8.5-6L6 6v12zm10-12v12h2V6h-2z" />
    </svg>
  )
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  )
}
function MusicNoteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white/25">
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
    </svg>
  )
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(74)
  const [coverError, setCoverError] = useState(false)
  const hasAudio = Boolean(MUSIC_CONFIG.src)

  const togglePlay = useCallback(async () => {
    if (!audioRef.current || !hasAudio) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      await audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying, hasAudio])

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!progressRef.current || !audioRef.current || !duration) return
      const rect = progressRef.current.getBoundingClientRect()
      const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
      audioRef.current.currentTime = ratio * duration
      setCurrentTime(ratio * duration)
    },
    [duration]
  )

  useEffect(() => {
    if (!hasAudio) return
    const audio = new Audio(MUSIC_CONFIG.src)
    audioRef.current = audio
    audio.loop = true
    
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime))
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration))
    
    audio.play().then(() => {
      setIsPlaying(true)
    }).catch(() => {
      // Autoplay blocked by browser — play on first user interaction instead
      const playOnInteraction = () => {
        audio.play().then(() => setIsPlaying(true)).catch(() => {})
      }
      document.addEventListener('click', playOnInteraction, { once: true })
    })

    return () => audio.pause()
  }, [hasAudio])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full mt-1" style={{ maxWidth: "min(460px, 90vw)" }}>
      <div
        className="flex items-center gap-4 rounded-2xl border border-white/[0.08] p-4"
        style={{
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Album cover */}
        <div className="relative w-14 h-14 rounded-xl flex-shrink-0 overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
          {MUSIC_CONFIG.cover && !coverError ? (
            <img
              src={MUSIC_CONFIG.cover}
              alt="Album"
              className="w-full h-full object-cover"
              onError={() => setCoverError(true)}
            />
          ) : (
            <MusicNoteIcon />
          )}
          {/* subtle vinyl shine */}
          {isPlaying && (
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent animate-pulse" />
          )}
        </div>

        {/* Middle: title + progress */}
        <div className="flex-1 min-w-0">
          <p className="text-white/85 text-[12px] font-semibold tracking-wide truncate mb-2">
            {MUSIC_CONFIG.title}
          </p>

          {/* Progress bar */}
          <div
            ref={progressRef}
            className="relative w-full h-[3px] rounded-full cursor-pointer group"
            style={{ background: "rgba(255,255,255,0.12)" }}
            onClick={seek}
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-white/80 transition-all"
              style={{ width: `${progress}%` }}
            />
            {/* thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ left: `calc(${progress}% - 5px)` }}
            />
          </div>

          {/* Time */}
          <div className="flex justify-between mt-1.5 text-[10px] text-white/30 font-medium">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            aria-label="Previous"
            className="text-white/30 hover:text-white/70 transition-colors p-1 hover:scale-110"
          >
            <PrevIcon />
          </button>

          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white border border-white/20 hover:border-white/40 transition-all hover:scale-110"
            style={{
              background: "rgba(255,255,255,0.1)",
              boxShadow: isPlaying ? "0 0 14px rgba(255,255,255,0.15)" : "none",
            }}
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <button
            aria-label="Next"
            className="text-white/30 hover:text-white/70 transition-colors p-1 hover:scale-110"
          >
            <NextIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
