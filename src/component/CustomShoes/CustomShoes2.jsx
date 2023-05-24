"use client"
import React, { Suspense, lazy } from 'react'
import { useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, OrbitControls, useGLTF } from '@react-three/drei'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { button, folder, useControls } from 'leva'

export function Model(props) {
    // const gltf = useLoader(GLTFLoader, '/shoe.glb');
    // const { nodes, materials } = gltf;
    const shoe = useRef();
    const { nodes, materials } = useGLTF('/shoe.glb', true)

    useFrame(() => {
      // shoe.current.rotation.x += 0.01;
      // shoe.current.rotation.y += 0.01;
    })

    // dpr={dpr}
    const gl = useThree((state) => state.gl)
    useControls({
      ['Chụp hình']: button(() => {
        const link = document.createElement('a')
        // link.setAttribute('download', 'canvas.png')
        // link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
        const image = gl.domElement.toDataURL('image/png').split(',')[1]
        console.log(image)
        link.click()
      })
    })


    return (
      <group {...props} dispose={null} ref={shoe}>
        <group position={[0.01, 0.56, -1.22]} scale={0.43}>
          <mesh geometry={nodes.Cube002.geometry} material={materials.Upper} />
          <mesh geometry={nodes.Cube002_1.geometry} material={materials['BottumBack.001']} />
        </group>
        <group position={[-0.05, 0.5, -0.55]} rotation={[0.63, 0, 0]}>
          <mesh geometry={nodes.Plane.geometry} material={materials['Upper.001']} />
          <mesh geometry={nodes.Plane_1.geometry} material={materials['BottumBack.001']} />
        </group>
        <group position={[-0.02, 0.43, -0.52]}>
          <mesh geometry={nodes.Cube004.geometry} material={materials.Main} />
          <mesh geometry={nodes.Cube004_1.geometry} material={materials.Upper} />
        </group>
        <mesh geometry={nodes.AIr_Max_Logo_2.geometry} material={materials['BottumBack.002']} position={[-0.01, 0.54, -1.57]} rotation={[Math.PI / 2, 0.89, Math.PI]} scale={0.02} />
        <mesh geometry={nodes.Back.geometry} material={materials.BottumBack} position={[0, 0.1, -1.24]} />
        <mesh geometry={nodes.AIr_Max_Logo_1.geometry} material={materials['BottumBack.002']} position={[-0.02, 0.9, -0.85]} scale={0.01} />
        <mesh geometry={nodes.Stitches.geometry} material={materials['Material.001']} position={[-0.03, 0.52, -0.64]} scale={0} />
        <mesh geometry={nodes.NikeLogo1.geometry} material={materials['Middle Sole']} position={[-0.03, 0.4, -0.85]} scale={[-0.22, -0.22, -0.09]} />
        <mesh geometry={nodes.NikeLogo2.geometry} material={materials['Middle Sole']} position={[0.02, 0.12, 0.37]} scale={[0.49, 0.3, 0.4]} />
        <mesh geometry={nodes.Sides.geometry} material={materials.SIDEDESIGN} position={[0.08, 0.15, -0.61]} scale={0.36} />
        <mesh geometry={nodes.Rings.geometry} material={materials['BottumBack.001']} position={[-0.04, 0.54, -0.48]} rotation={[0.46, 0.26, -0.46]} scale={0.83} />
        <mesh geometry={nodes.Front.geometry} material={materials['SIDEDESIGN.001']} position={[0.02, 0.12, 0.37]} scale={[0.49, 0.3, 0.4]} />
        <mesh geometry={nodes.Hook.geometry} material={materials['BottumBack.001']} position={[0.02, 0.83, -1.45]} rotation={[Math.PI / 2, 0, 0]} scale={[0.67, 0.7, 0.92]} />
        <mesh geometry={nodes.Laces.geometry} material={materials['Upper.002']} position={[-0.04, 0.57, -0.45]} scale={-0.28} />
        <mesh geometry={nodes.Middle_back.geometry} material={materials['Back(Brick)']} position={[0, 0.32, -1.18]} />
        <mesh geometry={nodes.Very_bottum.geometry} material={materials['Bottum Sole']} position={[-0.01, -0.11, -0.88]} />
        <mesh geometry={nodes.Parent001.geometry} material={materials['Middle Sole.001']} position={[-0.03, 0, -0.03]} rotation={[0, -0.03, 0]} />
      </group>
    )
}

const CustomShoes2 = () => {
  // const { enabled, dpr, ...props } = useControls({
  //   enabled: true,
  //   movingDownsampling: true,
  //   useTileRender: false,
  //   dpr: { value: 1.5, min: 0.5, max: 2, step: 0.5 },
  //   samples: { value: 128, min: 8, max: 2048, step: 8 },
  //   bounces: { value: 4, min: 1, max: 10, step: 1 },
  //   envMapIntensity: { value: 0.7, min: 0, max: 1 },
  //   denoise: folder({
  //     enableDenoise: false,
  //     enableTemporalDenoise: true,
  //     enableSpatialDenoise: true,
  //     denoiseColorBlendFactor: { value: 0.5, min: 0, max: 1 },
  //     denoiseMomentBlendFactor: { value: 0.5, min: 0, max: 1 },
  //     denoiseColorFactor: { value: 0.1, min: 0, max: 1 },
  //     denoisePositionFactor: { value: 0.1, min: 0, max: 1 }
  //   })
  // })

  return (
    <div>
        <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [2, 2, 2] }}>
        {/* <Canvas camera={{ fov:70, position: [0,0,65] }}> */}
            <Suspense fallback={null}>
                {/* <ambientLight/> */}
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} />
                <Model />
                {/* <color attach="background" args={["hotpink"]} /> */}
                <OrbitControls zoomSpeed={0.7} makeDefault dampingFactor={0.2} />
                {/* <Environment preset="forest" background /> */}
            </Suspense>
        </Canvas>
    </div>
  )
}

export default CustomShoes2