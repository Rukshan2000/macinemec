"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Zap, Shield, Wrench } from "lucide-react"
import { Button } from "@/components/ui/button"
import ParticlesBackground from "./particles-background"

interface HeroData {
  title: string
  subtitle: string
  description: string
  tagline: string
  ctaText: string
  backgroundImage: string
}

interface HeroSectionProps {
  data: HeroData
}

export default function HeroSection({ data }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden construction-grid">
      {/* Particles Background */}
      <ParticlesBackground />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Construction site"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90" />
        <div className="absolute inset-0 blueprint-lines opacity-30" />
      </div>

      {/* 3D Tilt Container */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 text-center animate-tilt-3d">
        <div className="space-y-12 animate-fade-up">
          {/* Construction Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/5 border border-primary/20 rounded-full text-primary text-sm font-medium backdrop-blur-sm tracking-wider">
            <Shield className="h-5 w-5" />
            <span>PREMIER STEEL BUILDERS OF SRI LANKA</span>
          </div>

          {/* Main Title */}
          <div className="space-y-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black font-heading tracking-wider leading-none">
              <span className="block">BUILDING</span>
              <span className="block text-primary" style={{ animationDelay: "0.5s" }}>
                TOMORROW'S
              </span>
              <span className="block" style={{ animationDelay: "1s" }}>
                SKYLINES
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-4xl mx-auto leading-relaxed tracking-wide">
              {data.description}
            </p>
          </div>

          {/* Construction Features */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {data.tagline.split(" • ").map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-6 py-3 bg-background/10 border border-primary/10 rounded-lg text-primary backdrop-blur-sm hover:bg-primary/5 transition-all duration-500 group"
              >
                {index === 0 && <Zap className="h-5 w-5" />}
                {index === 1 && <Wrench className="h-5 w-5" />}
                {index === 2 && <Shield className="h-5 w-5" />}
                <span className="font-medium tracking-wider">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center pt-12">
            <Link href="/projects">
              <Button
                size="lg"
                className="group bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg font-bold font-heading rounded-md transition-all duration-300 tracking-wider"
              >
                {data.ctaText.toUpperCase()}
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="group border border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 px-12 py-6 text-lg font-bold font-heading rounded-md backdrop-blur-sm transition-all duration-300 tracking-wider"
            >
              <Play className="mr-4 h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              WATCH OUR WORK
            </Button>
          </div>

          {/* Emergency Contact */}
          <div className="pt-12">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-blue-500/5 border border-blue-500/20 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm tracking-wider">
              <div className="w-3 h-3 bg-blue-500/70 rounded-full" />
              <span>24/7 EMERGENCY SERVICES: 071 413 9919</span>
            </div>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-primary/50 rounded-full flex justify-center neon-glow">
            <div className="w-2 h-4 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Blueprint SVG Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5" style={{ zIndex: 2 }}>
        <defs>
          <pattern id="blueprint" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#blueprint)" />
      </svg>
    </section>
  )
}
