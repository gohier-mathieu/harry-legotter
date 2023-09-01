import Experience from "./Experience.jsx";
import {Canvas} from "@react-three/fiber";
import React, {useEffect, useState} from "react";
import {Center, Sparkles, Text3D} from '@react-three/drei';
import * as THREE from 'three';


export function App() {
    const [showHomePage, setShowHomePage] = useState(true);

    const handleStartClick = () => {
        setShowHomePage(false);
    };



    const [titleColor, setTitleColor] = useState('red');
    const colorOptions = ['red', 0x7DFF33, 'blue', 'yellow'];

    const changeSparklesColor = () => {
        const currentIndex = colorOptions.indexOf(titleColor);
        const nextIndex = (currentIndex + 1) % colorOptions.length;
        setTitleColor(colorOptions[nextIndex]);
    };

    useEffect(() => {
        const colorChangeInterval = setInterval(() => {
            changeSparklesColor();
        }, 2000); // Changement de couleur toutes les 2 secondes

        return () => {
            clearInterval(colorChangeInterval); // Nettoyage de l'intervalle lors du démontage du composant
        };
    }, [titleColor]);

    const silverMaterial = new THREE.MeshPhysicalMaterial({
        color: titleColor,
        metalness: 1,
        roughness: 0,
        transmission:1
    });

    return (
        <div className="app-container">
            {showHomePage && (
                <div className="home-page">
                    <Canvas
                        className="canvas2"
                        shadows
                        camera={{
                            fov: 60,
                            near: 0.1,
                            far: 200,
                        }}>

                        <Center>
                            <Text3D
                                font="./Harry P_Regular.json"
                                position={[0, 0, 0]}
                                color={0xc0c0c0}
                                fontSize={5}
                                maxWidth={5}
                                lineHeight={1}
                                letterSpacing={0.02}
                                textAlign="center"
                                curveSegments={10}
                                outlineWidth={0.01}
                                outlineColor="white"
                                material={silverMaterial}
                            >

                            Harry Legotter

                        </Text3D>
                        </Center>
                        <directionalLight
                            color={titleColor}
                            position={[80, 0, 100]}
                            intensity={200}
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                            shadow-camera-near={1}
                            shadow-camera-far={50}
                            shadow-camera-top={15}
                            shadow-camera-right={15}
                            shadow-camera-bottom={-15}
                            shadow-camera-left={-15}
                        />
                        <directionalLight
                            color={titleColor}
                            position={[-80, 0, 100]}
                            intensity={200}
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                            shadow-camera-near={1}
                            shadow-camera-far={50}
                            shadow-camera-top={15}
                            shadow-camera-right={15}
                            shadow-camera-bottom={-15}
                            shadow-camera-left={-15}
                        />
                        <directionalLight
                            color={titleColor}
                            position={[0, -40, 100]}
                            intensity={200}
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                            shadow-camera-near={1}
                            shadow-camera-far={50}
                            shadow-camera-top={15}
                            shadow-camera-right={15}
                            shadow-camera-bottom={-15}
                            shadow-camera-left={-15}
                        />
                        <directionalLight
                            color={titleColor}
                            position={[0, 40, 100]}
                            intensity={200}
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                            shadow-camera-near={1}
                            shadow-camera-far={50}
                            shadow-camera-top={15}
                            shadow-camera-right={15}
                            shadow-camera-bottom={-15}
                            shadow-camera-left={-15}
                        />

                        <Sparkles
                            size={4}
                            scale={[10, 6, 10]}
                            position-y={0}
                            speed={0.5}
                            color={titleColor}
                        />
                    </Canvas>
                    <div className="canvas-back">
                        <p>welcome to the magical world of harry legotter. Use W,S,A,D to move around.</p>
                        <button onClick={handleStartClick}>Start</button>
                    </div>

                </div>

            )}

            {!showHomePage && (
                <Canvas
                    className="canvas"
                    flat
                    shadows
                    camera={{
                        fov: 75,
                        near: 0.1,
                        far: 200,
                    }}
                >
                    <Experience />
                </Canvas>
            )}
        </div>
    );
}