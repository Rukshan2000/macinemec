"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Box, Cylinder, Cone, Sphere } from "@react-three/drei"
import * as THREE from "three"

// Construction Crane Component
function ConstructionCrane() {
  const craneRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (craneRef.current) {
      craneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={craneRef} position={[2, 0, 0]} castShadow receiveShadow>
      {/* Crane Base */}
      <Cylinder args={[0.5, 0.7, 1.2]} position={[0, 0.6, 0]} castShadow>
        <meshPhysicalMaterial color="#ff6b35" roughness={0.4} metalness={0.8} clearcoat={0.2} />
      </Cylinder>

      {/* Crane Mast with lattice structure */}
      <group position={[0, 2.5, 0]}>
        <Cylinder args={[0.08, 0.08, 4.5]} castShadow>
          <meshPhysicalMaterial color="#ffd23f" roughness={0.5} metalness={0.7} />
        </Cylinder>
        {/* Lattice supports */}
        <Box args={[0.1, 3, 0.1]} position={[0.1, 1.5, 0.1]} rotation={[0, 0, Math.PI / 4]} castShadow>
          <meshPhysicalMaterial color="#ffd23f" roughness={0.5} metalness={0.7} />
        </Box>
        <Box args={[0.1, 3, 0.1]} position={[-0.1, 1.5, -0.1]} rotation={[0, 0, -Math.PI / 4]} castShadow>
          <meshPhysicalMaterial color="#ffd23f" roughness={0.5} metalness={0.7} />
        </Box>
      </group>

      {/* Crane Jib */}
      <Box args={[3.5, 0.12, 0.12]} position={[1.75, 4.5, 0]} castShadow>
        <meshPhysicalMaterial color="#ff6b35" roughness={0.4} metalness={0.8} />
      </Box>

      {/* Counter Jib with counterweight */}
      <Box args={[1.2, 0.12, 0.12]} position={[-0.6, 4.5, 0]} castShadow>
        <meshPhysicalMaterial color="#ff6b35" roughness={0.4} metalness={0.8} />
      </Box>
      <Box args={[0.5, 0.5, 0.5]} position={[-1.2, 4.5, 0]} castShadow>
        <meshPhysicalMaterial color="#333" roughness={0.6} metalness={0.9} />
      </Box>

      {/* Hook with cable */}
      <Cylinder args={[0.02, 0.02, 1]} position={[2.5, 4, 0]} castShadow>
        <meshPhysicalMaterial color="#555" roughness={0.7} metalness={0.8} />
      </Cylinder>
      <Sphere args={[0.1, 16, 16]} position={[2.5, 3.5, 0]} castShadow>
        <meshPhysicalMaterial color="#333" roughness={0.6} metalness={0.9} />
      </Sphere>
    </group>
  )
}

// Building Model Component
function BuildingModel() {
  const buildingRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (buildingRef.current) {
      buildingRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={buildingRef} position={[-2, 0, 0]} castShadow receiveShadow>
      {/* Building Base */}
      <Box args={[1.8, 3.5, 1.8]} position={[0, 1.75, 0]} castShadow>
        <meshPhysicalMaterial color="#4ecdc4" roughness={0.3} metalness={0.2} clearcoat={0.5} />
      </Box>

      {/* Building Top */}
      <Box args={[1.4, 1.2, 1.4]} position={[0, 4, 0]} castShadow>
        <meshPhysicalMaterial color="#45b7d1" roughness={0.3} metalness={0.2} clearcoat={0.5} />
      </Box>

      {/* Roof */}
      <Cone args={[1, 0.6]} position={[0, 4.8, 0]} castShadow>
        <meshPhysicalMaterial color="#ff6b35" roughness={0.4} metalness={0.7} />
      </Cone>

      {/* Windows with glass effect */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Box
          key={i}
          args={[0.25, 0.4, 0.02]}
          position={[i % 2 === 0 ? -0.5 : 0.5, 1.5 + Math.floor(i / 2) * 0.7, 0.91]}
          castShadow
        >
          <meshPhysicalMaterial color="#87ceeb" roughness={0.1} metalness={0.1} transmission={0.9} opacity={0.8} />
        </Box>
      ))}
    </group>
  )
}

// Excavator Component
function Excavator() {
  const excavatorRef = useRef<THREE.Group>(null)
  const armRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (excavatorRef.current) {
      excavatorRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
    if (armRef.current) {
      armRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.3 - 0.2
    }
  })

  return (
    <group ref={excavatorRef} position={[0, 0, 2]} castShadow receiveShadow>
      {/* Body */}
      <Box args={[1.7, 1, 2.2]} position={[0, 0.5, 0]} castShadow>
        <meshPhysicalMaterial color="#ffd23f" roughness={0.5} metalness={0.7} />
      </Box>

      {/* Tracks with detail */}
      <Cylinder args={[0.35, 0.35, 2]} rotation={[Math.PI / 2, 0, 0]} position={[-0.7, 0.15, 0]} castShadow>
        <meshPhysicalMaterial color="#333" roughness={0.6} metalness={0.9} />
      </Cylinder>
      <Cylinder args={[0.35, 0.35, 2]} rotation={[Math.PI / 2, 0, 0]} position={[0.7, 0.15, 0]} castShadow>
        <meshPhysicalMaterial color="#333" roughness={0.6} metalness={0.9} />
      </Cylinder>

      {/* Cab with glass */}
      <Box args={[0.9, 0.7, 0.9]} position={[-0.3, 1.2, -0.3]} castShadow>
        <meshPhysicalMaterial color="#ff6b35" roughness={0.4} metalness={0.8} />
      </Box>
      <Box args={[0.6, 0.4, 0.6]} position={[-0.3, 1.4, -0.3]} castShadow>
        <meshPhysicalMaterial color="#87ceeb" roughness={0.1} metalness={0.1} transmission={0.9} opacity={0.8} />
      </Box>

      {/* Arm with joints */}
      <group ref={armRef} position={[0.5, 0.9, 0.5]}>
        <Cylinder args={[0.12, 0.12, 1.7]} rotation={[0, 0, Math.PI / 4]} position={[0.85, 0.85, 0]} castShadow>
          <meshPhysicalMaterial color="#ffd23f" roughness={0.5} metalness={0.7} />
        </Cylinder>
        <Cylinder args={[0.12, 0.12, 1.2]} rotation={[0, 0, Math.PI / 3]} position={[1.5, 1.5, 0]} castShadow>
          <meshPhysicalMaterial color="#ffd23f" roughness={0.5} metalness={0.7} />
        </Cylinder>
        {/* Bucket */}
        <Box args={[0.5, 0.35, 0.35]} position={[1.8, 1.8, 0]} castShadow>
          <meshPhysicalMaterial color="#333" roughness={0.6} metalness={0.9} />
        </Box>
      </group>
    </group>
  )
}

// Main Scene Component
function ConstructionScene() {
  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, 10, -5]} intensity={0.8} color="#4ecdc4" castShadow />

      {/* Sky Dome */}
      <Sphere args={[50, 32, 32]} rotation={[0, 0, Math.PI]} receiveShadow>
        <meshPhysicalMaterial color="#87ceeb" roughness={0.1} metalness={0} side={THREE.BackSide} />
      </Sphere>

      <BuildingModel />
      <ConstructionCrane />
      <Excavator />

      {/* Ground with texture simulation */}
      <Box args={[20, 0.2, 20]} position={[0, -0.1, 0]} receiveShadow>
        <meshPhysicalMaterial color="#8fbc8f" roughness={0.7} metalness={0} clearcoat={0.1} />
      </Box>

      <OrbitControls enableZoom={true} enablePan={false} maxPolarAngle={Math.PI / 2} minDistance={3} maxDistance={15} />
    </>
  )
}

export default function ThreeConstructionScene() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-[400px] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading 3D Scene...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/5 to-purple-500/5">
      <Canvas
        camera={{ position: [8, 6, 8], fov: 50 }}
        shadows
        gl={{ antialias: true }}
      >
        <ConstructionScene />
      </Canvas>
    </div>
  )
}