import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const SquareLeft = React.forwardRef(({ position = [-12.8, 0, 0] }, ref) => {
    const houseL = useGLTF('./models/squareLeft.glb');
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
        houseL.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                //child.material.metalness = 0.5;
                //child.material.roughness = 0.4;


            }
        });

        houseL.scene.rotation.y = Math.PI/2;
    }, [houseL]);


    return <group position={position} ref={ref}>
        <primitive object={houseL.scene} />
        <mesh position={ [ -2.5, 3, 3.1]}>
            <boxGeometry args={ [ 1, 5, 6 ] } />
            <meshPhysicalMaterial attach="material" {...glassMaterial} />
        </mesh>

    </group>;
})


