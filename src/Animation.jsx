import React, {  useRef, useState } from 'react';
import { Sparkles, Text3D } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import {Bbus, Engbus} from "./Scene.jsx";

export function BusAnimation() {
    const engbusRef = useRef(null);
    const bbusRef = useRef(null);
    const textPlaneRef = useRef(null);
    const sparklesRef = useRef(null);
    const [animationStarted, setAnimationStarted] = useState(false);

    const handleMeshClick = () => {
        if (!animationStarted) {
            setAnimationStarted(true);
            gsap.delayedCall(0.1, animateBuses)
        }
    };

    const animateBuses = () => {
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
        gsap.to(engbusRef.current.position, {
            delay:0.1,
            duration: 26,
            z: 20,
            ease: 'power2.out',
        });

        gsap.to(bbusRef.current.position, {
            duration: 18,
            z: -16,
            ease: 'power2.out',
        });

        gsap.to(bbusRef.current.scale, {
            delay: 1.5,
            duration: 3,
            x: 0.2,
            ease: 'power2.out',
            onComplete: () => {
                gsap.to(bbusRef.current.scale, {
                    delay: 0.5,
                    duration: 3,
                    x: 1,
                });
            },
        });
    };



    return (
        <group>
            <Engbus ref={engbusRef} />
            <Bbus ref={bbusRef} />
            <mesh
                position={[6.5, 1, 11.5]}
                rotation={[0, THREE.MathUtils.degToRad(-45), 0]}
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
                    opacity={1}
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
