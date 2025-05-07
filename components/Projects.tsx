"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ExternalLink, Github, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const categories = [
    { id: "all", name: "All" },
    { id: "web", name: "Web" },
    { id: "mobile", name: "Mobile" },
    { id: "ui", name: "UI/UX" },
  ]

  const projects = [
    {
      title: "My E-commerce Store",
      description:
        "A full-stack e-commerce platform with product management, cart functionality, and payment integration.",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHZkbTdwYjQyeHpuc216c2c4ZTJ4d2NucWJocmMxZzcxeTRjdzdweCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/W1fnaLpc7uD8dz1wve/giphy.gif",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      categories: ["web"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/Jani-shiv/E-commers-React.js-",
      featured: true,
    },
    {
      title: "MyCyclecare",
      description: "A web application for tracking workouts, nutrition, and fitness goals.",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG1oZGV0MGc4ajBqMWxhbm8wb3oxcWRkazUxemd0eTQzNTJpZ2Q1eiZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/avLkfgNjdzSEnOVo7d/giphy.gif",
      tags: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
      categories: ["web", "ui"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      title: "Portfolio Website",
      description: "A personal portfolio website to showcase my projects and skills.",
      image: "https://media.giphy.com/media/MD0svLSDeudszrNrp0/giphy.gif?cid=ecf05e470qxpreveu31wwtv7yki61droq77e5uf0eu3c6n53&ep=v1_gifs_search&rid=giphy.gif&ct=g",
      tags: ["React", "Chart.js", "Weather API", "Styled Components"],
      categories: ["web", "ui"],
      liveUrl: "https://portpholiyo-20fv2228l-janis-projects-6734836e.vercel.app/",
      githubUrl: "https://github.com/Jani-shiv/Portpholiyo",
      featured: false,
    },
    {
      title: "10 Days of React",
      description: "A collection of React projects built over 10 days to enhance my skills.",
      image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjZ4cm11MDQxNzU1OWRyOGV3bnlxOThtMXgzNGN4YW1jY3hyenkwZSZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/juua9i2c2fA0AIp2iq/giphy.gif",
      tags: ["React", "JavaScript", "CSS", "HTML"],
      categories: ["web"],
      liveUrl: "https://react-10-days-journey.vercel.app/",
      githubUrl: "https://github.com/Jani-shiv/10-Day-React---Journey",
      featured: false,
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.categories.includes(activeFilter))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section id="projects" className="py-20">
      <div ref={ref} className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience in web development.
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 interactive ${
                  activeFilter === category.id
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">Try changing your filter criteria</p>
            <Button variant="outline" className="mt-4 interactive" onClick={() => setActiveFilter("all")}>
              Show all projects
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  categories: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden h-full bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay with links */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex space-x-3">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors interactive"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={18} />
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors interactive"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={18} />
            </motion.a>
          </div>
        </motion.div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <motion.h3
          className="text-xl font-bold mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-gray-600 dark:text-gray-400 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {project.description}
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {project.tags.map((tag, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
            >
              {tag}
            </Badge>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  )
}
