import React, { useRef, useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils'

/*
original file auto-generated by: https://github.com/pmndrs/gltfjsx
edited by: @firxworx

author: chernyi.r (https://sketchfab.com/chernyi.r)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/stork-224ec84e92424611a1ba9178b663be0b
title: stork
*/

const MODEL_FILE = 'flying-stork.glb'

type GLTFResult = GLTF & {
  nodes: {
    qweewq11Group1_qq2lambert7_0: THREE.Mesh
    qq2Group1_qq2lambert7_0: THREE.Mesh
    qq2pCube1_qq2lambert6_0: THREE.Mesh
    polySurface12_qq2lambert5_0: THREE.Mesh
    qq2polySurface4_qq2lambert4_0: THREE.SkinnedMesh
    qq2qq4polySurface2_qq2lambert4_0: THREE.SkinnedMesh
    _rootJoint: THREE.Bone
  }
  materials: {
    qq2lambert7: THREE.MeshStandardMaterial
    qq2lambert6: THREE.MeshStandardMaterial
    qq2lambert5: THREE.MeshStandardMaterial
    qq2lambert4: THREE.MeshStandardMaterial
  }
}

// from gltfjsx -
// type ActionName = 'Take 001'
// type GLTFActions = Record<ActionName, THREE.AnimationAction>

/**
 * Component that renders an animated GLB of a flying stork.
 */
export const FlyingStork: React.FC<
  JSX.IntrinsicElements['group'] & {
    rotate?: {
      speed: number
      factor: number
    }
  }
> = ({ rotate, ...props }) => {
  const groupRef = useRef<THREE.Group>()
  const innerGroupRef = useRef<THREE.Group>()

  const [start] = useState(() => Math.random() * 100)

  const { scene, materials, animations } = useGLTF(MODEL_FILE) as GLTFResult

  // SkeletonUtils is used for cloning because reportedly gltf.scene.clone() has issues with skinned meshes
  const clone = useMemo(() => SkeletonUtils.clone(scene) as THREE.Group, [scene])
  const { nodes } = useGraph(clone) as GLTFResult

  const clonedAnimations = animations.map((animation) => animation.clone())
  const { actions, names, mixer } = useAnimations(clonedAnimations, groupRef)

  const animationIndex = 0

  useEffect(() => {
    // reset animations, fade-in, play
    actions[names[animationIndex]]?.reset().fadeIn(0.5).play()

    return () => {
      // fade out in effect clean-up
      actions[names[animationIndex]]?.fadeOut(0.5)
    }
  }, [actions, names, animationIndex])

  useFrame((_state, delta) => {
    if (rotate && groupRef.current && innerGroupRef.current) {
      // make the stork fly around a circular path
      groupRef.current.rotation.y -= Math.sin((delta * rotate.factor) / 2) * Math.cos((delta * rotate.factor) / 2) * 1.5
      mixer.update(delta * rotate.speed)

      // other ideas from the inspiration example follow (these are untested + likely need tweaking to look good with the stork model in play)
      // note - the `start` variable was defined above using state set with a random initial value:
      //
      // move up and down over duration of flight
      // innerGroupRef.current.position.y = Math.sin(start + _state.clock.elapsedTime) * 2.5
      //
      // create the impression of rolling/banking + yawing over duration of flight
      // innerGroupRef.current.rotation.x = Math.PI / 2 + (Math.sin(start + state.clock.elapsedTime) * Math.PI) / 10
      // innerGroupRef.current.rotation.y = (Math.sin(start + state.clock.elapsedTime) * Math.PI) / 2
    }
  })

  return (
    <group ref={groupRef} dispose={null}>
      <group ref={innerGroupRef} {...props}>
        <group>
          <primitive object={nodes._rootJoint} />
          <mesh
            geometry={nodes.qweewq11Group1_qq2lambert7_0.geometry}
            material={nodes.qweewq11Group1_qq2lambert7_0.material}
          />
          <group position={[0.13, 0, 0]}>
            <mesh geometry={nodes.qq2Group1_qq2lambert7_0.geometry} material={nodes.qq2Group1_qq2lambert7_0.material} />
          </group>
          <group position={[-1.03, -0.6, -1.12]} rotation={[0, 0, -0.48]} scale={[0.3, 0.3, 0.26]}>
            <mesh geometry={nodes.qq2pCube1_qq2lambert6_0.geometry} material={materials.qq2lambert6} />
          </group>
          <mesh geometry={nodes.polySurface12_qq2lambert5_0.geometry} material={materials.qq2lambert5} />
          <skinnedMesh
            geometry={nodes.qq2polySurface4_qq2lambert4_0.geometry}
            material={nodes.qq2polySurface4_qq2lambert4_0.material}
            skeleton={nodes.qq2polySurface4_qq2lambert4_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.qq2qq4polySurface2_qq2lambert4_0.geometry}
            material={nodes.qq2qq4polySurface2_qq2lambert4_0.material}
            skeleton={nodes.qq2qq4polySurface2_qq2lambert4_0.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(MODEL_FILE)
