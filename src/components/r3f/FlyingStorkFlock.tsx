import React from 'react'
import { FlyingStork } from '../models/FlyingStork'

/**
 * Flock of `FlyingStork` components.
 *
 * Implementation adapted from: <https://codesandbox.io/embed/react-three-fiber-gltf-loader-animations-c671i?codemirror=1>.
 *
 * The original featured 3x different bird models, each with different flight characteristics.
 * This behaviour was modified for the storks to lend some variance to the scene.
 */
export const FlyingStorkFlock: React.FC<{}> = () => {
  return (
    <>
      {new Array(15).fill(undefined).map((_, i) => {
        const x = (15 + Math.random() * 20) * (Math.round(Math.random()) ? -1 : 1)
        const y = 1 + Math.random() * 15
        const z = -5 + Math.random() * 10

        const vibe = ['chill', 'groovy', 'movin'][Math.round(Math.random() * 2)]

        const speed = vibe === 'chill' ? 0.75 : vibe === 'groovy' ? 2 : vibe === 'movin' ? 3 : 1
        const factor =
          vibe === 'chill'
            ? 0.5 + Math.random()
            : vibe === 'groovy'
            ? 0.25 + Math.random()
            : vibe === 'movin'
            ? 1 + Math.random() - 0.5
            : 1

        return (
          <FlyingStork
            key={i}
            position={[x, y, z]}
            rotation={[0, x > 0 ? Math.PI : 0, 0]}
            rotate={{
              speed,
              factor,
            }}
          />
        )
      })}
    </>
  )
}
