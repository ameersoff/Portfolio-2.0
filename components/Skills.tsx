"use client"

import { useEffect } from "react"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Database, Layout, Palette, Server, Smartphone, Terminal, Zap } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState("all")

  const skillCategories = [
    {
      id: "frontend",
      title: "Frontend Development",
      icon: <Layout className="w-6 h-6" />,
      skills: ["React", "Next.js", "HTML5", "CSS3", "JavaScript", "TypeScript", "Tailwind CSS", "Framer Motion"],
    },
    {
      id: "backend",
      title: "Backend Development",
      icon: <Server className="w-6 h-6" />,
      skills: ["Node.js", "Express", "Python", "Django", "RESTful APIs", "GraphQL", "Authentication", "Authorization"],
    },
    {
      id: "database",
      title: "Database",
      icon: <Database className="w-6 h-6" />,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "Redis", "Prisma", "Mongoose", "SQL"],
    },
    {
      id: "devops",
      title: "DevOps & Tools",
      icon: <Terminal className="w-6 h-6" />,
      skills: ["Git", "GitHub", "Docker", "CI/CD", "AWS", "Vercel", "Netlify", "Testing"],
    },
    {
      id: "design",
      title: "UI/UX Design",
      icon: <Palette className="w-6 h-6" />,
      skills: [
        "Figma",
        "Adobe XD",
        "Responsive Design",
        "Wireframing",
        "Prototyping",
        "User Research",
        "Accessibility",
        "Color Theory",
      ],
    },
    {
      id: "mobile",
      title: "Mobile Development",
      icon: <Smartphone className="w-6 h-6" />,
      skills: ["React Native", "Flutter", "iOS", "Android", "Expo", "Mobile UI", "App Performance", "Native APIs"],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const filteredCategories =
    activeTab === "all" ? skillCategories : skillCategories.filter((category) => category.id === activeTab)

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div ref={ref} className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I specialize in a range of technologies and tools that enable me to build modern, responsive, and
            user-friendly applications.
          </p>
        </motion.div>

        <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="all" className="interactive">
                All Skills
              </TabsTrigger>
              <TabsTrigger value="frontend" className="interactive">
                Frontend
              </TabsTrigger>
              <TabsTrigger value="backend" className="interactive">
                Backend
              </TabsTrigger>
              <TabsTrigger value="database" className="interactive">
                Database
              </TabsTrigger>
              <TabsTrigger value="devops" className="interactive">
                DevOps
              </TabsTrigger>
              <TabsTrigger value="design" className="interactive">
                Design
              </TabsTrigger>
              <TabsTrigger value="mobile" className="interactive">
                Mobile
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700 group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-center mb-4">
                      <motion.div
                        className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400 mr-3 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, i) => (
                        <motion.span
                          key={i}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300 interactive"
                          whileHover={{
                            scale: 1.05,
                            backgroundColor: "#10b981",
                            color: "#ffffff",
                            boxShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
                          }}
                          transition={{ duration: 0.2 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>

        <motion.div
          className="mt-16 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-6 text-center flex items-center justify-center">
            <Zap className="w-5 h-5 mr-2 text-emerald-500" />
            Technical Proficiency
          </h3>
          <div className="grid gap-6">
            {[
              { name: "Frontend Development", percentage: 90 },
              { name: "Backend Development", percentage: 85 },
              { name: "UI/UX Design", percentage: 80 },
              { name: "Mobile Development", percentage: 75 },
              { name: "DevOps", percentage: 70 },
            ].map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                  >
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute top-0 right-0 h-full w-10 bg-white/30"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          {/* Animated code snippet */}
          <motion.div
            className="mt-10 p-4 bg-gray-900 text-gray-300 rounded-lg font-mono text-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center mb-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-500">code-sample.tsx</span>
            </div>
            <TypewriterText
              text={`// My coding approach
const solveProblems = async (problem) => {
  if (problem.isSimple) {
    return quickSolution(problem);
  }
  
  const steps = breakDownProblem(problem);
  const solutions = await Promise.all(
    steps.map(step => researchAndSolve(step))
  );
  
  return optimizeAndRefine(solutions);
};

// Always learning new technologies
const mySkills = [...currentSkills, ...continuousLearning];`}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// Typewriter effect component
function TypewriterText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 30) // Adjust typing speed

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return (
    <div>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block w-2 h-4 bg-emerald-500 ml-1"
        />
      )}
    </div>
  )
}
