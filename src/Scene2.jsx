import React, {useEffect, useRef, useState} from 'react';
import {Sparkles, Text3D, useGLTF} from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
export function City({ position = [0, 0, 0] }) {
    const floor = useGLTF('./models/city.glb');
    const environmentMap = new THREE.TextureLoader().load('./environment/neoncity.jpg');
    const textPlaneRef = useRef(null);

    const bulbMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffff00,
        emissiveIntensity: 2,
        color: 0x000000,
        metalness: 0.7,
        roughness: 0.2,
    });




    const spotLights = Array.from({ length: 20 }, () => {
        const spotLight = new THREE.SpotLight(0xffff00, 4, 10, Math.PI, 0.1);
        spotLight.position.set(0, 0, 0);
        return spotLight;
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0,
        metalness: 0,
        transmission: 1,
        transparent: true,
        ior: 1.5,
        clearcoat: 0,
        clearcoatRoughness: 0,
        envMap: environmentMap,
        depthWrite: true,
    });

    const sparklesRef = useRef(null);


    const findObjectByName = (parent, name) => {
        if (parent.name === name) {
            return parent;
        }
        for (const child of parent.children) {
            const found = findObjectByName(child, name);
            if (found) {
                return found;
            }
        }
        return null;
    };

    const startBrasAnimation = () => {
        const object = findObjectByName(floor.scene, 'bras');
        if (object) {
            const targetRotation = -Math.PI/2;
            const duration = 4;
            const ease = 'power1.inOut';


            const tl = gsap.timeline({ repeat: -1, yoyo: true });
            tl.to(textPlaneRef.current.position, {
                duration: 0.1,
                y: 16,
                ease: 'power2.out',
            });
            gsap.to(sparklesRef.current.position, {
                delay: 0,
                duration: 0.1,
                y: -15,
            });
            gsap.to(sparklesRef.current.scale, {
                delay: 0,
                duration: 10,
                x:20,
                y:20,
                z:20
            });
            tl.to(object.rotation, {
                x: targetRotation,
                duration,
                ease,
            });
        }
    };
    useEffect(() => {
        floor.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;

                //child.material.metalness = 0.6;
                //child.material.roughness = 0.4;
                const objectName = child.name;

                if (objectName.startsWith('L')) {
                    const objectIndex = parseInt(objectName.substring(1));

                    if (!isNaN(objectIndex) && objectIndex >= 1 && objectIndex <= 21) {
                        child.material = bulbMaterial;
                        child.add(spotLights[objectIndex - 1]);

                    }
                }
            }
        });
    }, [floor]);

    return <group position={position}>
        <primitive object={floor.scene} />
        <mesh position={ [ 3.75, 1.5, -15.1]}>
            <boxGeometry args={ [ 3, 2.8, 2.8 ] } />
            <meshPhysicalMaterial attach="material" {...glassMaterial} />
        </mesh>
        <mesh position={ [ -5, 1.5, -13.5]}>
            <cylinderGeometry args={ [ 0.4,0.4, 3, 32 ] } />
            <meshPhysicalMaterial attach="material" {...glassMaterial} />
        </mesh>
        <mesh position={ [ -1.6, 1.5, -13.5]}>
            <cylinderGeometry args={ [ 0.4,0.4, 3, 32 ] } />
            <meshPhysicalMaterial attach="material" {...glassMaterial} />
        </mesh>

        <mesh
            position={[1, 1, -5.5]}
            rotation={[0, THREE.MathUtils.degToRad(-0), 0]}
            ref={textPlaneRef}
            onClick={startBrasAnimation}
        >
            <Sparkles
                ref={sparklesRef}
                size={0.6}
                scale={[0.4, 0.2, 0.4]}
                position={[0, 16, 0]}
                speed={0.2}
                color={0xffff00}
            />
            <boxGeometry args={[0.5, 0.2, 0.05]} />
            <meshPhysicalMaterial
                color={0xffd700}
                side={THREE.DoubleSide}
                metalness={0.8}
                roughness={0.2}
            />
            <Text3D
                font="./helvetiker_regular.typeface.json"
                position={[-0.19, -0.04, 0.02]}
                size={0.075}
                height={0.02}
                curveSegments={12}
                bevelEnabled
                bevelThickness={0.02}
                bevelSize={0.002}
                bevelOffset={0}
                bevelSegments={0.5}
            >
                Click Me
                <meshStandardMaterial
                    emissive={0xffff00}
                    emissiveIntensity={2}
                    color={0x000000}
                    metalness={0.8}
                    roughness={0.2}
                />
            </Text3D>
        </mesh>
    </group>;
}
