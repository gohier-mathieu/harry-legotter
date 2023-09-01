import Lights from "./Lights.jsx";
import React, {Suspense} from "react";
import {Physics, RigidBody} from "@react-three/rapier";
import {City} from "./Scene2.jsx";
import {Player} from "./PlayerControl.jsx";
import {BusAnimation} from "./Animation.jsx";
import { SquareAnimation} from "./AnimationSquare.jsx";
import Effects from "./Effect.jsx";
export default function Experience()
{
    return <>

        <color args={ [ '#808080' ] } attach="background" />
        <fog attach="fog" args={['#808080', 16, 20]} />
        <Suspense>
            <Physics gravity={ [ 0, - 9.81, 0 ]}  interpolation={false} colliders={false}>
                {/* <Debug /> */}
                <Lights />
                <RigidBody type="fixed"
                           colliders="cuboid"
                           restitution={ 0.2 }
                           friction={ 1 }
                           linearDamping={ 1 }
                           angularDamping={ 1 }
                           collisionMargin={0.05}
                           position={ [ 0, 0, 0 ] }
                           isKinematic
                           gravityScale={0}
                >
                    <City />
                </RigidBody>
                <Player/>
                <BusAnimation/>
                <SquareAnimation/>
            </Physics>
        </Suspense>
        <Effects/>



    </>
}