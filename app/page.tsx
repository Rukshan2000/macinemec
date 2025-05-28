import { promises as fs } from "fs"
import path from "path"
import Image from "next/image"
import HeroSection from "@/components/hero-section"
import ThreeConstructionScene from "@/components/three-construction-scene"
import AnimatedBlueprint from "@/components/animated-blueprint"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import {
  ArrowRight,
  TrendingUp,
  Building,
  ConeIcon as Crane,
  HardHat,
  Ruler,
  Zap,
  Shield,
  Wrench,
  Target,
} from "lucide-react"

async function getHomeData() {
  const filePath = path.join(process.cwd(), "data", "home.json")
  const fileContents = await fs.readFile(filePath, "utf8")
  return JSON.parse(fileContents)
}

export default async function HomePage() {
  const data = await getHomeData()

  const serviceIcons = [Building, Crane, HardHat, Ruler]
  const serviceColors = [
    "from-blue-500 to-cyan-500",
    "from-orange-500 to-yellow-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-teal-500",
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection data={data.hero} />

      {/* 3D Construction Scene Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium backdrop-blur-sm mb-8 tracking-wider">
              <Wrench className="h-5 w-5" />
              <span>INTERACTIVE 3D SHOWCASE</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8 gradient-text">
              Experience Our Construction Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our interactive 3D models showcasing the precision and innovation behind every project
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Advanced Construction Technology</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our state-of-the-art equipment and innovative construction methods ensure precision, efficiency, and
                safety in every project we undertake.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                  <span className="text-sm">3D Modeling & Visualization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full"></div>
                  <span className="text-sm">Advanced Crane Operations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <span className="text-sm">Precision Excavation</span>
                </div>
              </div>
            </div>

            <ThreeConstructionScene />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 construction-grid opacity-30" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-full text-orange-600 dark:text-orange-400 text-sm font-medium backdrop-blur-sm mb-8 tracking-wider">
              <Zap className="h-5 w-5" />
              <span>OUR CONSTRUCTION EXPERTISE</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold font-heading mb-8 tracking-wider">
              ENGINEERING
              <span className="block gradient-text">EXCELLENCE</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed tracking-wide">
              Industrial-grade construction services powered by cutting-edge technology and expert engineering teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.services.map((service: any, index: number) => {
              const IconComponent = serviceIcons[index] || Building
              const gradientColor = serviceColors[index]
              return (
                <Card
                  key={service.id}
                  className="group card-hover card-construction border-0 shadow-lg hover:shadow-2xl"
                >
                  <div className="absolute inset-0 blueprint-lines opacity-5" />
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientColor} opacity-90`} />
                    <Image
                      src={`/placeholder.svg?height=400&width=600&text=${service.title}`}
                      alt={service.title}
                      fill
                      className="object-cover mix-blend-overlay"
                    />
                    <div className="absolute bottom-4 left-4 z-10">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8 text-center relative z-10">
                    <h3 className="text-xl font-bold font-heading mb-4 text-foreground group-hover:gradient-text transition-all duration-300 tracking-wider">
                      {service.title.toUpperCase()}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>
                    <div className={`h-1 bg-gradient-to-r ${gradientColor} w-full rounded-full`} />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blueprint Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedBlueprint />

            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-medium backdrop-blur-sm mb-4 tracking-wider">
                <Target className="h-5 w-5" />
                <span>PRECISION ENGINEERING</span>
              </div>
              <h3 className="text-4xl font-bold font-heading gradient-text">From Blueprint to Reality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Watch our engineering process come to life through detailed blueprints and technical drawings. Every
                line represents precision, every measurement ensures perfection.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Technical Design</h4>
                    <p className="text-sm text-muted-foreground">Detailed engineering drawings and specifications</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Structural Analysis</h4>
                    <p className="text-sm text-muted-foreground">Advanced calculations and safety assessments</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Quality Construction</h4>
                    <p className="text-sm text-muted-foreground">Precise execution with continuous monitoring</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Showcase Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium backdrop-blur-sm mb-8 tracking-wider">
              <Crane className="h-5 w-5" />
              <span>FEATURED PROJECTS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8 tracking-wider">
              OUR RECENT <span className="gradient-text">WORK</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 1, color: "from-blue-500 to-cyan-500", title: "Steel Structure Complex" },
              { id: 2, color: "from-orange-500 to-yellow-500", title: "Water Treatment Plant" },
              { id: 3, color: "from-purple-500 to-pink-500", title: "Commercial Building" },
            ].map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-xl hover-lift">
                <div className="relative h-[400px] overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=600&width=800&text=Project ${item.id}`}
                    alt={`Project ${item.id}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-200 text-sm mb-4">Modern engineering with innovative design solutions</p>
                  <Link
                    href={`/projects/project-${item.id}`}
                    className="inline-flex items-center text-white font-medium hover:text-yellow-300 transition-colors duration-300"
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <button className="btn-gradient">
                VIEW ALL PROJECTS
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 construction-grid opacity-20" />

        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-slide-in-left">
              <div className="mb-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-full text-green-600 dark:text-green-400 text-sm font-medium backdrop-blur-sm mb-4 tracking-wider">
                  <Shield className="h-5 w-5" />
                  <span>WHY CHOOSE US</span>
                </div>
                <h3 className="text-4xl font-bold font-heading text-foreground mb-6 tracking-wider">
                  ENGINEERING <span className="gradient-text">EXCELLENCE</span> IN EVERY PROJECT
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  With over 15 years of experience in the construction industry, we deliver exceptional quality and
                  innovative solutions for all your engineering needs.
                </p>
              </div>

              <div className="space-y-6">
                {data.whyChooseUs.map((item: any, index: number) => (
                  <div key={index} className="flex items-start group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-5 h-5 bg-white rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold font-heading text-foreground mb-2 group-hover:gradient-text transition-all duration-300">
                        {item.title.toUpperCase()}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[600px] rounded-xl overflow-hidden animate-slide-in-right">
              <Image
                src="/placeholder.svg?height=800&width=600&text=Construction"
                alt="Construction site"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="grid grid-cols-2 gap-4">
                  {data.stats.map((stat: any, index: number) => {
                    const colors = [
                      "from-blue-500 to-cyan-500",
                      "from-orange-500 to-yellow-500",
                      "from-purple-500 to-pink-500",
                      "from-green-500 to-teal-500",
                    ]
                    return (
                      <div
                        key={index}
                        className={`text-center bg-gradient-to-r ${colors[index]} bg-opacity-90 backdrop-blur-sm p-4 rounded-lg hover-glow`}
                      >
                        <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                        <div className="text-white text-xs uppercase tracking-widest">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-500 relative overflow-hidden">
        <div className="absolute inset-0 blueprint-lines opacity-20" />

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-full text-white text-sm font-medium backdrop-blur-sm mb-8 tracking-wider">
            <Crane className="h-5 w-5" />
            <span>READY TO BUILD?</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold font-heading mb-8 tracking-wider text-white">
            LET'S BUILD THE
            <span className="block text-yellow-300">FUTURE</span>
          </h2>
          <p className="text-xl text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed tracking-wide">
            From concept to completion, we deliver world-class construction projects with precision, safety, and
            innovation at every step.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/contact">
              <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                START YOUR PROJECT
                <ArrowRight className="ml-4 h-6 w-6 inline" />
              </button>
            </Link>
            <Link href="/projects">
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
                VIEW OUR WORK
                <TrendingUp className="ml-4 h-6 w-6 inline" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
