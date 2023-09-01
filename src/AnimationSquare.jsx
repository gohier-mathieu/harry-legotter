import React, {useEffect, useRef, useState} from 'react';
import { useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { SquareRight } from './SquareRight.jsx';
import { SquareLeft } from './SquareLeft.jsx';
import { Square } from './CentralSquare.jsx';
import * as THREE from "three";
import {Sparkles, Text3D} from "@react-three/drei";

export function SquareAnimation() {
    const houseLRef = useRef(null);
    const houseRRef = useRef(null);
    const houseRef = useRef(null);
    const textPlaneRef = useRef(null);
    const sparklesRef = useRef(null);
    const [animationStarted, setAnimationStarted] = useState(false);


    const handleMeshClick = () => {
        if (!animationStarted) {
            setAnimationStarted(true);
            gsap.delayedCall(0.1, animateHouses)
        }
    };

    const animateHouses = () => {
                gsap.to(textPlaneRef.current.position, {
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
                gsap.to(houseLRef.current.position, {
                    duration: 5,
                    z: 1.6,
                    ease: 'power2.out',
                });

                gsap.to(houseRRef.current.position, {
                    duration: 5,
                    z: -1.6,
                    ease: 'power2.out',
                });

                gsap.to(houseRef.current.scale, {
                    duration: 5,
                    z: 1,
                    ease: 'power2.out',
                });
                gsap.to(houseRef.current.position, {
                    duration: 5,
                    x: -12.8,
                    ease: 'power2.out',
                });
            };


    return (
        <group>
            <SquareRight ref={houseRRef} />
            <SquareLeft ref={houseLRef} />
            <Square ref={houseRef} />
            <mesh
                position={[-6.5, 1, 2]}
                rotation={[0, THREE.MathUtils.degToRad(90), 0]}
                ref={textPlaneRef}
                onClick={handleMeshClick}
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
        </group>
    );
}
