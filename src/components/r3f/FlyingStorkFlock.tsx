import React from 'react'
import { FlyingStork } from '../models/FlyingStork'

/**
 * Flock of `FlyingStork` components.
 *
 * Adapted from: <https://codesandbox.io/embed/react-three-fiber-gltf-loader-animations-c671i?codemirror=1>
 */
export const FlyingStorkFlock: React.FC<{}> = () => {
  return (
    <>
      {new Array(10).fill(undefined).map((_, i) => {
        // original: const x = (15 + Math.random() * 30) * (Math.round(Math.random()) ? -1 : 1)
        const x = (15 + Math.random() * 20) * (Math.round(Math.random()) ? -1 : 1)
        const y = 1 + Math.random() * 10 // orig -> const y = -10 + Math.random() * 20
        const z = -5 + Math.random() * 10

        // the original features 3x different bird models with slightly different flight
        // characteristics... they are retained here to give some variance to the scene
        const bird = ['stork', 'parrot', 'flamingo'][Math.round(Math.random() * 2)]

        // original speeds: stork = 0.5; flamingo = 2; parrot = 5
        const speed = bird === 'stork' ? 1 : bird === 'flamingo' ? 2 : bird === 'parrot' ? 3 : 1
        const factor =
          bird === 'stork'
            ? 0.5 + Math.random()
            : bird === 'flamingo'
            ? 0.25 + Math.random()
            : bird === 'parrot'
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
