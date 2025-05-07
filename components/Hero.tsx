"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import TypewriterComponent from "typewriter-effect"

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 50, stiffness: 300 }
  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Calculate mouse position as percentage of window
      const x = (clientX / windowWidth - 0.5) * 20
      const y = (clientY / windowHeight - 0.5) * 20

      setMousePosition({ x, y })
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center pt-20">
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0,rgba(255,255,255,0.05)_100%)]" />
      </motion.div>

      <div className="container mx-auto">
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="order-2 md:order-1">
            <motion.h2
              className="text-emerald-600 dark:text-emerald-400 font-medium text-lg mb-2"
              variants={itemVariants}
            >
              Hello, I&apos;m
            </motion.h2>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
              variants={itemVariants}
            >
              Shiv Jani
            </motion.h1>
            <motion.div className="mb-6 text-xl text-gray-700 dark:text-gray-300" variants={itemVariants}>
              <h3 className="font-medium">
                <TypewriterComponent
                  options={{
                    strings: ["Full Stack Developer", "UI/UX Designer", "Mobile App Developer", "Creative Coder"],
                    autoStart: true,
                    loop: true,
                    delay: 40,
                    deleteSpeed: 20,
                  }}
                />
              </h3>
              <p className="mt-2">Crafting beautiful digital experiences with code</p>
            </motion.div>

            <motion.div className="flex space-x-4 mb-8" variants={itemVariants}>
              <motion.a
                href="https://github.com/Jani-shiv"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors interactive"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/shiv-jani/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-200 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors interactive"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin size={20} />
              </motion.a>
              
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white interactive" asChild>
                <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  Get in Touch
                </motion.a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950 interactive"
                asChild
              >
                <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  View Projects
                </motion.a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="order-1 md:order-2 flex justify-center"
            variants={itemVariants}
            ref={imageRef}
            style={{
              x: springX,
              y: springY,
            }}
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image src="https://avatars.githubusercontent.com/u/153932136?v=4" alt="Profile" fill className="object-cover" priority />

              {/* Animated glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-emerald-500/30 to-transparent"
                animate={{
                  rotate: [0, 360],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Floating badges */}
            <motion.div
              className="absolute -right-4 top-10 bg-white dark:bg-gray-800 shadow-lg rounded-full px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              React
            </motion.div>

            <motion.div
              className="absolute -left-4 top-20 bg-white dark:bg-gray-800 shadow-lg rounded-full px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              Next.js
            </motion.div>

            <motion.div
              className="absolute right-10 -bottom-2 bg-white dark:bg-gray-800 shadow-lg rounded-full px-3 py-1 text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              TypeScript
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        >
          <a
            href="#projects"
            className="flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 interactive"
          >
            <span className="text-sm mb-2">Scroll Down</span>
            <ArrowDown size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
