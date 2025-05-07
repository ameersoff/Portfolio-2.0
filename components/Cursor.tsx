"use client"

import type { RefObject } from "react"

interface CursorProps {
  cursorRef: RefObject<HTMLDivElement>
  cursorDotRef: RefObject<HTMLDivElement>
}

export default function Cursor({ cursorRef, cursorDotRef }: CursorProps) {
  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-8 h-8 rounded-full bg-emerald-500/30 backdrop-blur-sm pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100 ease-out"
      />

      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed w-2 h-2 rounded-full bg-emerald-500 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out"
      />
    </>
  )
}
