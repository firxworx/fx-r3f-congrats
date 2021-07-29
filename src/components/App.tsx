import React, { Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sky, OrbitControls } from '@react-three/drei'
import { FlyingStorkFlock } from './r3f/FlyingStorkFlock'
import { DancingBaby } from './models/DancingBaby'
import { Physics } from '@react-three/cannon'
import * as THREE from 'three'
import { Text } from './r3f/Text'
import { GroundPlane } from './r3f/GroundPlane'

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

function App() {
  return (
    <Canvas
      // concurrent
      // shadowMap
      // camera={{ position: [10, 1, -10], fov: 50 }}
      camera={{ position: [0, 10, 35] }}
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
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

          <Physics gravity={[0, -9.8, 0]} tolerance={0} iterations={50} broadphase={'SAP'}>
            <TextBlock />
            <FlyingStorkFlock />
            <DancingBaby position={[0, 0, 10]} />
            <GroundPlane />
          </Physics>
        </Suspense>
      </group>
      {/*
        <mesh rotation={[-0.5 * Math.PI, 0, 0]} position={[0, -1, 0]} receiveShadow>
          <planeBufferGeometry args={[10, 10, 1, 1]} />
          <shadowMaterial transparent opacity={0.2} />
        </mesh>
      */}
      <OrbitControls />
    </Canvas>
  )
}

export default App
