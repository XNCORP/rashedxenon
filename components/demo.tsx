"use client"

import { useState, useEffect } from "react"
import { WebGLShader } from "@/components/ui/web-gl-shader"
import { MusicPlayer } from "@/components/ui/music-player"

// ─── Your Profile Config ──────────────────────────────────────────────────────
const PROFILE = {
  name: "RASHED",
  location: "Chattogram, Bangladesh",
  photo: "/mypic.png",
}

const SOCIAL_LINKS = {
  discord:   "https://discord.com/users/1282738365711519785",
  instagram: "https://www.instagram.com/rashedxenon",
  facebook:  "https://www.facebook.com/rashedxenon/",
  whatsapp:  "https://wa.me/8801625215258",
}
// ─────────────────────────────────────────────────────────────────────────────

function DiscordIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px]">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.001.025.012.048.03.063a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03ZM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418Zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px]">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px]">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px] md:w-[28px] md:h-[28px]">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

const socials = [
  { label: "Discord",   icon: <DiscordIcon />,   href: SOCIAL_LINKS.discord   },
  { label: "Instagram", icon: <InstagramIcon />,  href: SOCIAL_LINKS.instagram },
  { label: "Facebook",  icon: <FacebookIcon />,   href: SOCIAL_LINKS.facebook  },
  { label: "WhatsApp",  icon: <WhatsAppIcon />,   href: SOCIAL_LINKS.whatsapp  },
]

export default function ProfilePage() {
  const [imgError, setImgError] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const setVH = () => {
      const vh = (window.visualViewport?.height || window.innerHeight) * 0.01
      document.documentElement.style.setProperty('--vh', vh + 'px')
    }
    setVH()
    window.addEventListener('resize', setVH)
    window.visualViewport?.addEventListener('resize', setVH)
    return () => {
      window.removeEventListener('resize', setVH)
      window.visualViewport?.removeEventListener('resize', setVH)
    }
  }, [])

  return (
    <div 
      className="relative w-full flex items-center justify-center overflow-hidden"
      style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      {/* ── Enter Overlay ── */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050505] transition-opacity duration-1000 cursor-pointer ${
          entered ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setEntered(true)}
      >
        <span className="text-white/60 tracking-[0.4em] text-sm md:text-sm font-medium animate-pulse">
          [ TAP TO ENTER ]
        </span>
      </div>

      {/* Background shader — untouched */}
      <WebGLShader />

      {/* Radial vignette so text stays legible over the arc */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 44%, rgba(0,0,0,0.42) 0%, transparent 100%)",
        }}
      />

      {/* ── Main content block — shifted slightly above centre ── */}
      <div
        className="z-[2] flex flex-col items-center px-5 py-6 md:px-12 md:py-12 select-none box-border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[420px] max-h-[90vh] overflow-y-auto md:relative md:top-auto md:left-auto md:translate-x-0 md:-translate-y-[60px] md:w-auto md:max-w-none md:max-h-none md:overflow-visible"
        style={{
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "20px",
        }}
      >

        {/* ── Profile Photo ── */}
        <div className="relative group" style={{ marginBottom: 20 }}>
          {/* outer glow blob */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-700 group-hover:scale-110"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
              filter: "blur(18px)",
              transform: "scale(1.2)",
            }}
          />
          {/* photo ring */}
          <div
            className="relative rounded-full overflow-hidden border-2 border-white/30 ring-1 ring-white/10 transition-all duration-500 group-hover:border-white/50 w-[100px] h-[100px] md:w-[clamp(110px,15vw,150px)] md:h-[clamp(110px,15vw,150px)]"
            style={{
              boxShadow:
                "0 0 32px rgba(255,255,255,0.15), 0 0 80px rgba(255,255,255,0.05)",
            }}
          >
            {!imgError ? (
              <img
                src={PROFILE.photo}
                alt={PROFILE.name}
                className="w-full h-full object-cover"
                style={{ objectPosition: "center", borderRadius: "50%" }}
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-white/10 via-white/5 to-transparent flex items-center justify-center">
                <span
                  className="text-white/35 font-black"
                  style={{ fontSize: "clamp(36px, 5vw, 52px)" }}
                >
                  {PROFILE.name[0]}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ── Name ── */}
        <h1
          className="text-white font-black uppercase tracking-[0.35em] text-center leading-none"
          style={{
            fontSize: "clamp(38px, 6vw, 58px)",
            textShadow: "0 0 40px rgba(255,255,255,0.3)",
            marginBottom: 10,
            paddingLeft: "0.35em", // perfectly offsets tracking-[0.35em] visually
          }}
        >
          {PROFILE.name}
        </h1>

        {/* ── Location ── */}
        <div
          className="flex items-center gap-1.5 text-white/45"
          style={{ marginBottom: 28 }}
        >
          <PinIcon />
          <span
            className="font-semibold tracking-[0.22em] uppercase"
            style={{ fontSize: "clamp(12px, 1.5vw, 14px)" }}
          >
            {PROFILE.location}
          </span>
        </div>

        {/* ── Social Icons ── */}
        <div
          className="flex items-center gap-4"
          style={{ marginBottom: 36 }}
        >
          {socials.map(({ label, icon, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="
                group flex items-center justify-center
                rounded-2xl
                text-white/40
                border border-white/10
                transition-all duration-300
                hover:text-white
                hover:border-white/35
                hover:scale-110
                hover:-translate-y-1
              "
              style={{
                width: "clamp(52px, 7vw, 60px)",
                height: "clamp(52px, 7vw, 60px)",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.boxShadow = "0 0 22px rgba(255,255,255,0.14), 0 6px 24px rgba(0,0,0,0.45)"
                el.style.background = "rgba(255,255,255,0.10)"
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.boxShadow = "none"
                el.style.background = "rgba(255,255,255,0.04)"
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* ── Music Player ── */}
        <MusicPlayer />

      </div>
    </div>
  )
}
