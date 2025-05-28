"use client"

import { useEffect, useRef, useState } from "react"

export default function AnimatedBlueprint() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (svgRef.current) {
      observer.observe(svgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg p-8 relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="text-cyan-400">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Blueprint Drawing */}
      <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 400 300" className="relative z-10">
        {/* Building Outline */}
        <path
          d="M 50 250 L 50 100 L 150 100 L 150 80 L 250 80 L 250 100 L 350 100 L 350 250 Z"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="2"
          strokeDasharray="1000"
          strokeDashoffset={isVisible ? "0" : "1000"}
          className="transition-all duration-[3s] ease-out"
        />

        {/* Internal Structure */}
        <g
          strokeDasharray="500"
          strokeDashoffset={isVisible ? "0" : "500"}
          className="transition-all duration-[2s] ease-out delay-1000"
        >
          {/* Floor Lines */}
          <line x1="50" y1="200" x2="350" y2="200" stroke="#ff6b35" strokeWidth="1.5" />
          <line x1="50" y1="150" x2="350" y2="150" stroke="#ff6b35" strokeWidth="1.5" />

          {/* Vertical Supports */}
          <line x1="100" y1="100" x2="100" y2="250" stroke="#ffd23f" strokeWidth="1.5" />
          <line x1="200" y1="80" x2="200" y2="250" stroke="#ffd23f" strokeWidth="1.5" />
          <line x1="300" y1="100" x2="300" y2="250" stroke="#ffd23f" strokeWidth="1.5" />
        </g>

        {/* Dimensions */}
        <g opacity={isVisible ? "1" : "0"} className="transition-opacity duration-1000 delay-2000">
          {/* Dimension Lines */}
          <line x1="40" y1="100" x2="40" y2="250" stroke="#4ecdc4" strokeWidth="1" />
          <line x1="35" y1="100" x2="45" y2="100" stroke="#4ecdc4" strokeWidth="1" />
          <line x1="35" y1="250" x2="45" y2="250" stroke="#4ecdc4" strokeWidth="1" />

          {/* Dimension Text */}
          <text x="25" y="180" fill="#4ecdc4" fontSize="12" textAnchor="middle" transform="rotate(-90, 25, 180)">
            15.0m
          </text>

          <line x1="50" y1="260" x2="350" y2="260" stroke="#4ecdc4" strokeWidth="1" />
          <line x1="50" y1="255" x2="50" y2="265" stroke="#4ecdc4" strokeWidth="1" />
          <line x1="350" y1="255" x2="350" y2="265" stroke="#4ecdc4" strokeWidth="1" />

          <text x="200" y="275" fill="#4ecdc4" fontSize="12" textAnchor="middle">
            30.0m
          </text>
        </g>

        {/* Annotations */}
        <g opacity={isVisible ? "1" : "0"} className="transition-opacity duration-1000 delay-3000">
          <circle cx="200" cy="90" r="3" fill="#ff6b35" />
          <line x1="203" y1="87" x2="230" y2="60" stroke="#ff6b35" strokeWidth="1" />
          <text x="235" y="58" fill="#ff6b35" fontSize="10">
            Steel Frame
          </text>

          <circle cx="100" cy="175" r="3" fill="#ffd23f" />
          <line x1="103" y1="172" x2="130" y2="145" stroke="#ffd23f" strokeWidth="1" />
          <text x="135" y="143" fill="#ffd23f" fontSize="10">
            Support Beam
          </text>
        </g>

        {/* Title Block */}
        <g opacity={isVisible ? "1" : "0"} className="transition-opacity duration-1000 delay-4000">
          <rect x="280" y="20" width="110" height="50" fill="none" stroke="#00d4ff" strokeWidth="1" />
          <text x="335" y="35" fill="#00d4ff" fontSize="12" textAnchor="middle" fontWeight="bold">
            MACHINEMEC
          </text>
          <text x="335" y="48" fill="#00d4ff" fontSize="10" textAnchor="middle">
            ENGINEERING
          </text>
          <text x="335" y="60" fill="#4ecdc4" fontSize="8" textAnchor="middle">
            DWG-001 REV A
          </text>
        </g>
      </svg>

      {/* Animated Progress Indicator */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="h-1 bg-cyan-500/20 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-[5s] ease-out ${
              isVisible ? "w-full" : "w-0"
            }`}
          />
        </div>
        <p className="text-xs text-cyan-400 mt-2">Blueprint Generation Progress</p>
      </div>
    </div>
  )
}
