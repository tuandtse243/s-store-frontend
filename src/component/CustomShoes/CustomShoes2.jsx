"use client"
import React, { Suspense, useEffect, useState } from 'react'
import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { button, folder, useControls } from 'leva'
import { Button, Row } from 'antd'
import { useRouter } from 'next/navigation'
import { Color } from 'three'
import { deleteObjectStore, openDatabase, saveData } from '@/helpers/ConnectIndexedDB/SaveInIndexedDB';

const Model = ({ images, setImages }) => {
    const router = useRouter();
    const shoe = useRef();
    const { nodes, materials } = useGLTF('/shoe.glb')
    // console.log(nodes)

    // useFrame(() => {
    //   shoe.current.rotation.x += 0.00005;
    //   shoe.current.rotation.y += 0.00005;
    // })

    const gl = useThree((state) => state.gl)
    useControls({
    ['Chụp hình']: 
         button(() => {
          const link = document.createElement('a')
          const image = gl.domElement.toDataURL('image/png').split(',')[1];
          if (typeof window !== "undefined") {
            const request = window.indexedDB.open('myDatabase', 1);
            request.onsuccess = (event) => {
              const db = event.target.result;
              saveData(db, image);
            };
          }

          images.push(image)
          setImages(images)
          link.click()
          router.refresh()
        })
    })

    const meshFilter = []
    for (const [key, value] of Object.entries(nodes)) {
      if(value.isMesh) {
        meshFilter.push(key)
      }
    }
    
    const colorPickers = {}
    meshFilter.forEach((m) => {
      colorPickers[m] = {
        value: '#' + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, '0'),
        onChange: (v) => {
          nodes[m].material.color = new Color(v)
        }
      }
    })
    // console.log(colorPickers)

    useControls(colorPickers)
    return (
        <group  dispose={null} ref={shoe}>
          <group position={[0.01, 0.56, -1.22]} scale={0.43}>
            <mesh geometry={nodes.Cube002.geometry} material={materials.Upper} >
            </mesh>
            <mesh geometry={nodes.Cube002_1.geometry} material={materials['BottumBack.001']}/>
          </group>
          <group position={[-0.05, 0.5, -0.55]} rotation={[0.63, 0, 0]}>
            <mesh geometry={nodes.Plane.geometry} material={materials['Upper.001']} />
            <mesh geometry={nodes.Plane_1.geometry} material={materials['BottumBack.001']} />
          </group>
          <group position={[-0.02, 0.43, -0.52]}>
            <mesh geometry={nodes.Cube004.geometry} material={materials.Main}/>
            <mesh geometry={nodes.Cube004_1.geometry} material={materials.Upper} />
          </group>
          <mesh geometry={nodes.AIr_Max_Logo_2.geometry} material={materials['BottumBack.002']} position={[-0.01, 0.54, -1.57]} rotation={[Math.PI / 2, 0.89, Math.PI]} scale={0.02} />
          <mesh geometry={nodes.Back.geometry} material={materials.BottumBack} position={[0, 0.1, -1.24]} />
          <mesh geometry={nodes.AIr_Max_Logo_1.geometry} material={materials['BottumBack.002']} position={[-0.02, 0.9, -0.85]} scale={0.01} />
          <mesh geometry={nodes.Stitches.geometry} material={materials['Material.001']} position={[-0.03, 0.52, -0.64]} scale={0} />
          <mesh geometry={nodes.NikeLogo1.geometry} material={materials['Middle Sole']} position={[-0.03, 0.4, -0.85]} scale={[-0.22, -0.22, -0.09]} />
          <mesh geometry={nodes.NikeLogo2.geometry} material={materials['Middle Sole']} position={[0.02, 0.12, 0.37]} scale={[0.49, 0.3, 0.4]} />
          <mesh geometry={nodes.Sides.geometry} material={materials.SIDEDESIGN} position={[0.08, 0.15, -0.61]} scale={0.36} />
          <mesh geometry={nodes.Rings.geometry} material={materials['BottumBack.001']} position={[-0.04, 0.54, -0.48]} rotation={[0.46, 0.26, -0.46]} scale={0.83} >
          </mesh>
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
  const [images, setImages] = useState([]);
  const router = useRouter();
  // console.log(images)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side-only code
      const request = window.indexedDB.open('myDatabase', 1);
      request.onsuccess = (event) => {
          const db = event.target.result;
          // Call deleteObjectStore function with the desired object store name
          const objectStoreToDelete = 'ImageStore';
          deleteObjectStore(db, objectStoreToDelete);
      };
    }
    openDatabase();
  }, [])

  return (
    <div>
        {/* <Canvas gl={{ preserveDrawingBuffer: true }} camera={{ position: [1.5, 1, 1.5] }}> */}
        <Canvas gl={{ preserveDrawingBuffer: true }} shadows camera={{ position: [0, 0, 1.66] }}>
            <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} />
                <Model images={images} setImages={setImages}/>
                <OrbitControls zoomSpeed={0.7} makeDefault dampingFactor={0.2} />
                <ContactShadows position={[0, -0.8, 0]} color="#ffffff" />
                {/* <Environment preset="forest" /> */}
            </Suspense>
        </Canvas>
        <Row style={{width: '100%'}}>
          {
            images.map((image) => <img src={`data:image/jpeg;base64,${image}`} height={400} width={400} style={{border: '1px solid black', marginLeft: '5px', marginBottom: '5px'}}/>)
          }
        </Row>
        {images.length === 3 && <Button onClick={() => router.push('/order-customShoes')} style={{margin: '20px 0px'}}>Đặt hàng</Button>}
    </div>
  )
}

export default CustomShoes2

// link.setAttribute('download', 'canvas.png')
// link.setAttribute('href', gl.domElement.toDataURL('image/png').replace('image/png', 'image/octet-stream'))

// const gltf = useLoader(GLTFLoader, '/shoe.glb');
// const { nodes, materials } = gltf;