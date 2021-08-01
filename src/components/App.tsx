import React, { Suspense } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sky, OrbitControls } from '@react-three/drei'
import { DancingBaby } from './models/DancingBaby'
import { FlyingStorkFlock } from './r3f/FlyingStorkFlock'
import { Text } from './r3f/Text'
import { GroundPlane } from './r3f/GroundPlane'

/**
 * Component that renders a 3D block of text that rocks back and forth.
 */
export const TextBlock: React.FC = () => {
  const groupRef = React.useRef<THREE.Group>()

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x =
        groupRef.current.rotation.y =
        groupRef.current.rotation.z =
          Math.sin(clock.getElapsedTime()) * 0.075
    }
  })

  return (
    <group ref={groupRef}>
      <Text hAlign="center" position={[0, 11, 0]} blurb="CONGRATS ON THE" />
      <Text hAlign="center" position={[0, 7.5, 0]} blurb="NEW ARRIVAL" />
      <Text hAlign="center" position={[0, 4, 0]} blurb="MOMMY AND DADDY" />
    </group>
  )
}

/**
 * Full-screen `Canvas` that renders an animated scene with a dancing baby + flying storks +
 * a message of congrats displayed as 3D text.
 */
function App() {
  return (
    <Canvas
      camera={{ position: [0, 10, 35] }} // note: adding `fov: 50` brings things in close
      style={{ width: '100%', height: '100vh' }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[-5, 5, 5]} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
      <group position={[0, -1, 0]}>
        <Suspense
          fallback={
            <Html center>
              <div>Loading...</div>
            </Html>
          }
        >
          <Sky distance={45000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

          <TextBlock />
          <FlyingStorkFlock />
          <DancingBaby position={[0, 0, 10]} />
          <GroundPlane />
        </Suspense>
      </group>
      <OrbitControls />
    </Canvas>
  )
}

export default App
