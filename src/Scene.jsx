import React, { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export const Bbus = React.forwardRef(({ position = [9.5, 0, 16], rotationY = Math.PI }, ref) => {
    const bbus = useGLTF('./models/bluebus.glb');
    useEffect(() => {
        bbus.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                //child.material.metalness = 0.8;
                //child.material.roughness = 0.2;
            }
        });
    }, [bbus]);

    return (
        <group position={position} rotation-y={rotationY} ref={ref}>
            <primitive object={bbus.scene}/>
        </group>
    );
});

export const Engbus = React.forwardRef(({ position = [9.5, 0, -16] }, ref) => {
    const engBus = useGLTF('./models/engbus.glb');

    useEffect(() => {
        engBus.scene.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                //child.material.metalness = 0.8;
                //child.material.roughness = 0.2;
            }
        });
    }, [engBus]);

    return (
        <group position={position} ref={ref}>
            <primitive object={engBus.scene} />
        </group>
    );
});
