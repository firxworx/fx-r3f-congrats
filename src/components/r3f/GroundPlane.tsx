import React from 'react'
import { usePlane } from '@react-three/cannon'

export const GroundPlane: React.FC = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
    material: {
      friction: 0.5,
    },
  }))

  return (
    <mesh ref={ref} receiveShadow={true} scale={[40, 40, 40]}>
      <planeBufferGeometry />
      <meshPhongMaterial color={'#8BD8F8'} transparent opacity={0.5} />
      {/* <meshStandardMaterial map={texture} attach="material" /> */}
    </mesh>
  )
}
