"use client"

import { useEffect, useState, useRef } from "react"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import Skills from "@/components/Skills"
import About from "@/components/About"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"
import Cursor from "@/components/Cursor"
import Loader from "@/components/Loader"
import ParticleBackground from "@/components/ParticleBackground"
import { motion, useScroll, useSpring } from "framer-motion"
import { useTheme } from "next-themes"

export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [isLoading, setIsLoading] = useState(true)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set mounted to true after component mounts
    setMounted(true)

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Smooth scroll to section when clicking on nav links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()
        const targetId = target.getAttribute("href")
        const targetElement = document.querySelector(targetId as string)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: "smooth",
          })
        }
      }
    }

    // Custom cursor effect
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && cursorDotRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`

        // Add a slight delay to the dot for a trailing effect
        setTimeout(() => {
          if (cursorDotRef.current) {
            cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
          }
        }, 100)
      }
    }

    // Handle cursor over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("interactive")
      ) {
        cursorRef.current?.classList.add("cursor-expanded")
      }
    }

    const handleMouseOut = () => {
      cursorRef.current?.classList.remove("cursor-expanded")
    }

    document.addEventListener("click", handleAnchorClick)
    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver, true)
    document.addEventListener("mouseout", handleMouseOut, true)

    return () => {
      clearTimeout(timer)
      document.removeEventListener("click", handleAnchorClick)
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver, true)
      document.removeEventListener("mouseout", handleMouseOut, true)
    }
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <main className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-[100dvh] overflow-hidden">
      {/* Custom cursor (hidden on mobile) */}
      <Cursor cursorRef={cursorRef} cursorDotRef={cursorDotRef} />

      {/* Animated background particles */}
      <ParticleBackground />

      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 z-50 origin-left" style={{ scaleX }} />

      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </div>

      <Footer />
    </main>
  )
}
