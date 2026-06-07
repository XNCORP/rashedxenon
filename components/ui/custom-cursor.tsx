"use client"

import { useEffect, useRef } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let glowX = -100
    let glowY = -100
    let animId: number
    let hovering = false

    const move = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const onEnter = () => {
      hovering = true
      if (ringRef.current) {
        ringRef.current.style.width = "52px"
        ringRef.current.style.height = "52px"
        ringRef.current.style.borderColor = "rgba(255,255,255,0.7)"
        ringRef.current.style.boxShadow =
          "0 0 24px rgba(255,255,255,0.35), 0 0 48px rgba(255,255,255,0.1)"
      }
    }

    const onLeave = () => {
      hovering = false
      if (ringRef.current) {
        ringRef.current.style.width = "36px"
        ringRef.current.style.height = "36px"
        ringRef.current.style.borderColor = "rgba(255,255,255,0.22)"
        ringRef.current.style.boxShadow =
          "0 0 10px rgba(255,255,255,0.1)"
      }
    }

    const loop = () => {
      const ease = 0.11
      const glowEase = 0.07

      ringX += (mouseX - ringX) * ease
      ringY += (mouseY - ringY) * ease
      glowX += (mouseX - glowX) * glowEase
      glowY += (mouseY - glowY) * glowEase

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`
      }
      if (ringRef.current) {
        const offset = hovering ? 26 : 18
        ringRef.current.style.transform = `translate(${ringX - offset}px, ${ringY - offset}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX - 40}px, ${glowY - 40}px)`
      }

      animId = requestAnimationFrame(loop)
    }

    document.addEventListener("mousemove", move)
    document.body.style.cursor = "none"

    // attach hover listeners to all interactive elements
    const attach = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, [data-cursor]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnter)
          el.addEventListener("mouseleave", onLeave)
        })
    }
    attach()

    // re-attach on DOM changes
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    loop()

    return () => {
      document.removeEventListener("mousemove", move)
      document.body.style.cursor = ""
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Sharp dot — exact cursor position */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-white"
        style={{ willChange: "transform" }}
      />
      {/* Smooth ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-[width,height,border-color,box-shadow] duration-200"
        style={{
          width: 36,
          height: 36,
          borderColor: "rgba(255,255,255,0.22)",
          boxShadow: "0 0 10px rgba(255,255,255,0.1)",
          willChange: "transform",
        }}
      />
      {/* Soft glow blob — slowest follow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] w-20 h-20 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />
    </>
  )
}
