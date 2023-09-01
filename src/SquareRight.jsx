import React, {useEffect, useRef} from 'react';
import {Environment, useGLTF} from '@react-three/drei';
import * as THREE from 'three';

export const SquareRight = React.forwardRef(({ position = [-12.8, 0, 0] }, ref) => {

    const houseR = useGLTF('./models/squareRight.glb');
    const envRef = useRef(null);
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
        houseR.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                //child.material.metalness = 0.5;
                //child.material.roughness = 0.4;


            }
        });

        houseR.scene.rotation.y = Math.PI/2;
    }, [houseR]);

    return <group position={position} ref={ref}>

        <primitive object={houseR.scene} />
        <mesh position={ [ -2.5, 3, -3.1]}>
            <boxGeometry args={ [ 1, 5, 6 ] } />
            <meshPhysicalMaterial attach="material" {...glassMaterial} />
        </mesh>

    </group>;
})


