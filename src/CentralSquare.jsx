import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import  * as THREE from 'three';

export const Square = React.forwardRef(({ position = [-14.8, 0, 0] }, ref) => {

    const house = useGLTF('./models/central.glb');
    const environmentMap = new THREE.TextureLoader().load('./environment/neoncity.jpg');

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.05,
        metalness: 0,
        transmission: 0.99,
        transparent: true,
        ior: 2.33,
        clearcoat: 0,
        clearcoatRoughness: 0,
        envMap: environmentMap,
        depthWrite: false,
    });


    useEffect(() => {
        house.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                //child.material.metalness = 0.5;
                //child.material.roughness = 0.4;


            }
        });

        house.scene.rotation.y = Math.PI/2;
    }, [house]);

    return <group position={position} scale={[1, 1, 0]} ref={ref}>

        <primitive object={house.scene} />
        <mesh position={ [ -2.5, 3, 0]}>
            <boxGeometry args={ [ 1, 5, 3 ] } />
            <meshPhysicalMaterial attach="material" {...glassMaterial} />
        </mesh>
        <pointLight
            color="green"
            intensity={8.5}
            distance={10}
            position={[-2.5, 3, 0]}
        />
    </group>;
})


