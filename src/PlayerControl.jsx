import React, { useRef, useMemo } from 'react'
import { Vector3 } from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

const GRAVITY = 10
const PLAYER_SPEED = 100
const JUMP_FORCE = 1
const ROTATION_AMOUNT = Math.PI / 64;

export function Player() {
    const playerVelocity = useMemo(() => new Vector3(), [])
    const { camera } = useThree()

    const keyboard = useKeyboard()

    function controls(camera, delta, playerVelocity) {
        const speedDelta = delta * PLAYER_SPEED

        const forward = new Vector3(0, 0, -1).applyEuler(camera.rotation);


        playerVelocity.set(0, 0, 0);

        if (keyboard['KeyS']) {
            playerVelocity.add(forward.clone().multiplyScalar(-speedDelta));
        } else if (keyboard['KeyW']) {
            playerVelocity.add(forward.clone().multiplyScalar(speedDelta));
        }

        if (keyboard['Space']) {
            playerVelocity.y = JUMP_FORCE;
        }

        if (keyboard['KeyA']) {
            camera.rotation.y += ROTATION_AMOUNT;
        } else if (keyboard['KeyD']) {
            camera.rotation.y -= ROTATION_AMOUNT;
        }
    }

    function updatePlayer(camera, delta, playerVelocity) {
        playerVelocity.y -= GRAVITY * delta;

        const deltaPosition = playerVelocity.clone().multiplyScalar(delta);
        camera.position.add(deltaPosition);

        if (camera.position.y < 1) {
            camera.position.y = 1;
            playerVelocity.y = 0;
        }

        camera.position.y = Math.max(camera.position.y, 0);
    }

    useFrame(({ camera }, delta) => {
        controls(camera, delta, playerVelocity);
        updatePlayer(camera, delta, playerVelocity);
    })

    return null;
}
