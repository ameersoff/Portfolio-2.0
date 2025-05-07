"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Calendar, MapPin, Briefcase, GraduationCap, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function About() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("about")

  // For image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const images = ["/profile.jpg", "/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"]

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-20">
      <div ref={ref} className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know more about me, my background, and what drives my passion for web development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImageIndex] || "/placeholder.svg"}
                    alt="About Me"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <motion.button
                  onClick={prevImage}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors interactive"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={nextImage}
                  className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors interactive"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>

              {/* Image indicators */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImageIndex === index ? "bg-white w-4" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl p-4 shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #10b981, #0ea5e9, #10b981)",
                  opacity: 0.3,
                }}
              />
              <span className="relative z-10">5+ Years Experience</span>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate={isInView ? "visible" : "hidden"}>
            <Tabs defaultValue="about" className="mb-8" onValueChange={setActiveTab}>
              <TabsList className="mb-6 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="about" className="interactive">
                  About Me
                </TabsTrigger>
                <TabsTrigger value="experience" className="interactive">
                  Experience
                </TabsTrigger>
                <TabsTrigger value="education" className="interactive">
                  Education
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <TabsContent value="about" key="about">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div variants={itemVariants} className="mb-6">
                      <h3 className="text-2xl font-bold mb-4">Who am I?</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        I am a passionate Full Stack Developer with expertise in creating responsive and user-friendly
                        web applications. With a strong foundation in both frontend and backend technologies, I enjoy
                        bringing ideas to life through code.
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        My journey in web development started 5 years ago, and since then, I've worked on various
                        projects ranging from e-commerce platforms to content management systems. I'm constantly
                        learning and adapting to new technologies to stay at the forefront of web development.
                      </p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid gap-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Date of Birth</h4>
                          <p className="text-gray-600 dark:text-gray-400">January 15, 1995</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Location</h4>
                          <p className="text-gray-600 dark:text-gray-400">San Francisco, CA</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Employment</h4>
                          <p className="text-gray-600 dark:text-gray-400">Senior Developer at TechCorp</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Education</h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            B.S. in Computer Science, Stanford University
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="experience" key="experience">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6">My Journey</h3>
                    <div className="space-y-8 mb-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-emerald-400 before:to-transparent">
                      <div className="relative flex items-start md:flex-col">
                        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-6 md:ml-0 md:mt-6 md:w-1/2 md:pr-10 md:text-right">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="font-bold text-emerald-500 mb-1">2021 - Present</div>
                            <h4 className="font-bold mb-1">Senior Developer</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              Leading development teams and architecting scalable web applications at TechCorp.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative flex items-start md:flex-col md:items-end">
                        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-6 md:ml-0 md:mt-6 md:w-1/2 md:pl-10">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="font-bold text-emerald-500 mb-1">2018 - 2021</div>
                            <h4 className="font-bold mb-1">Web Developer</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              Developed responsive websites and web applications at InnovateTech.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="relative flex items-start md:flex-col">
                        <div className="md:absolute md:left-1/2 md:-translate-x-1/2 bg-emerald-500 border-4 border-white dark:border-gray-900 rounded-full p-1.5 w-10 h-10 flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-6 md:ml-0 md:mt-6 md:w-1/2 md:pr-10 md:text-right">
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                            <div className="font-bold text-emerald-500 mb-1">2016 - 2018</div>
                            <h4 className="font-bold mb-1">Freelance Developer</h4>
                            <p className="text-gray-600 dark:text-gray-400">
                              Worked on various client projects, specializing in frontend development.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="education" key="education">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold mb-6">Education & Certifications</h3>
                    <div className="space-y-6 mb-6">
                      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="w-5 h-5 text-emerald-500 mr-2" />
                          <h4 className="font-bold">B.S. in Computer Science</h4>
                        </div>
                        <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-1">2012 - 2016</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">Stanford University</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">
                          Graduated with honors. Specialized in software engineering and artificial intelligence.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="w-5 h-5 text-emerald-500 mr-2" />
                          <h4 className="font-bold">AWS Certified Solutions Architect</h4>
                        </div>
                        <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-1">2020</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">Amazon Web Services</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">
                          Professional certification for designing distributed systems on AWS.
                        </p>
                      </div>

                      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="w-5 h-5 text-emerald-500 mr-2" />
                          <h4 className="font-bold">Full Stack Web Development</h4>
                        </div>
                        <p className="text-emerald-600 dark:text-emerald-400 text-sm mb-1">2018</p>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">Udacity Nanodegree</p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm">
                          Intensive program covering modern web development technologies and practices.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>

            <motion.div variants={itemVariants}>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white interactive" asChild>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  rel="noreferrer"
                >
                  Download Resume
                </motion.a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
