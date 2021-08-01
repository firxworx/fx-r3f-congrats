import React from 'react'

/**
 * Plane at origin, rotated 90-degrees along the x-axis, to serve as the ground.
 */
export const GroundPlane: React.FC = () => {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true} scale={[40, 40, 40]}>
      <planeBufferGeometry />
      <meshPhongMaterial color={'#8BD8F8'} transparent opacity={0.5} />
    </mesh>
  )
}
