"use client"

import { useRef, useState, useEffect, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import * as THREE from "three"
import { FallbackLogo } from "./fallback-logo"

function Logo3D({ rotation = [0, 0, 0], position = [0, 0, 0] }) {
  const meshRef = useRef()
  const [textureLoaded, setTextureLoaded] = useState(false)
  const [textureError, setTextureError] = useState(false)

  // Create a fallback material with a gradient
  const fallbackMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color("#7E22CE"),
    emissive: new THREE.Color("#ffc940"),
    emissiveIntensity: 0.5,
    metalness: 0.7,
    roughness: 0.3,
  })

  // Try to load the texture, but handle errors gracefully
  const logoTexture = useMemo(() => {
    const texture = new THREE.TextureLoader().load(
      "/logo.png",
      () => setTextureLoaded(true),
      undefined,
      () => setTextureError(true),
    )
    texture.transparent = true
    texture.alphaTest = 0.5
    return texture
  }, [])

  // Create a material that uses the logo texture or fallback
  const material = useMemo(() => {
    if (textureError) {
      return fallbackMaterial
    }

    return new THREE.MeshStandardMaterial({
      map: logoTexture,
      transparent: true,
      emissive: new THREE.Color("#ffc940"),
      emissiveIntensity: 0.5,
      emissiveMap: logoTexture,
    })
  }, [logoTexture, textureError])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />

      {/* If texture fails to load, show a text alternative */}
      {textureError && (
        <Html position={[0, 0, 0.1]} center>
          <div className="text-amber-400 font-bold text-lg" style={{ textShadow: "0 0 10px rgba(255, 201, 64, 0.7)" }}>
            HOA
          </div>
        </Html>
      )}
    </mesh>
  )
}

export function Logo3DScene({ className = "" }) {
  const [isMounted, setIsMounted] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Error boundary for the 3D scene
  useEffect(() => {
    const handleError = (error) => {
      console.error("3D Logo error:", error)
      setHasError(true)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  // Fallback for server-side rendering or errors
  if (!isMounted || hasError) {
    return <FallbackLogo className={className} />
  }

  return (
    <div className={`${className} w-full h-full`}>
      <Canvas onError={() => setHasError(true)}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Logo3D />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

