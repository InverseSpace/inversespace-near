import React, { useEffect, useContext, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { MintbaseCollectionContext } from '../hooks/CollectionProvider'

// Example BS for react-three-fiber
function Box(props: JSX.IntrinsicElements['mesh']) {
    // This reference will give us direct access to the THREE.Mesh object
    const mesh = useRef<THREE.Mesh>(null!)
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshLambertMaterial />
      </mesh>
    )
}

// TODO: Create an artworks-provider

/* 
TODO: create a procedural frame
 - takes an image, color, frame-width
*/ 

// TODO: Arrange all art in a line

export default function BasicGallery(props) {
    const { store } = useContext(MintbaseCollectionContext)
    const [artMats, setArtMats] = useState([])
    useEffect(() => {
        // check to see if the store is there
        console.log( "store??: ", store)
        // const mats = useLoader
    },[store])

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />
        </Canvas>
    )
}