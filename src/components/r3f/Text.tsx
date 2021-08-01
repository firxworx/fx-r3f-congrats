import React, { useMemo, useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

/**
 * Component that renders 3D Text of the `blurb` given as props.
 *
 * Loads font data from `public/font.blob`. The font includes alphanumeric characters but no puncuation.
 * Support for the space character was added manually.
 */
export const Text: React.FC<{
  blurb: string
  vAlign?: 'top' | 'bottom' | 'center'
  hAlign?: 'left' | 'right' | 'center'
  size?: number
  position: [number, number, number]
  color?: string
}> = ({ vAlign = 'center', hAlign = 'center', size = 1, color = '#000000', blurb, position, ...props }) => {
  const font = useLoader(THREE.FontLoader, 'font.blob')

  const config = useMemo(
    () => ({
      font,
      size: 30,
      height: 30,
      curveSegments: 32,
      bevelEnabled: true,
      bevelThickness: 6,
      bevelSize: 2.5,
      bevelOffset: 0,
      bevelSegments: 8,
    }),
    [font],
  )

  const meshRef = useRef<THREE.Mesh>()

  useLayoutEffect(() => {
    if (meshRef.current) {
      const sz = new THREE.Vector3()
      meshRef.current.geometry.computeBoundingBox()

      // reminder - getSize() copies into the given Vector3
      // @see https://threejs.org/docs/#api/en/math/Box3.getSize
      meshRef.current.geometry?.boundingBox?.getSize(sz)

      meshRef.current.position.x = hAlign === 'center' ? -sz.x / 2 : hAlign === 'left' ? 0 : -sz.x
      meshRef.current.position.y = vAlign === 'center' ? -sz.y / 2 : vAlign === 'top' ? 0 : -sz.y
    }
  }, [blurb, hAlign, vAlign])

  return (
    <group {...props} position={position} scale={[0.1 * size, 0.1 * size, 0.1]}>
      <mesh ref={meshRef}>
        <textGeometry args={[blurb, config]} />
        <meshPhongMaterial
          // blue shade suitable for baby boy
          color={'#086187'}
        />
        {/* // dev (standard material is not affected by lights) <meshStandardMaterial color={'#555555'} /> */}
        {/* // original <meshNormalMaterial /> */}
      </mesh>
    </group>
  )
}
