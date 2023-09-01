

export default function Lights()
{


    return <>

        <directionalLight
            position={[20, 10, 1]}
            intensity={0.5}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={1}
            shadow-camera-far={50}
            shadow-camera-top={15}
            shadow-camera-right={15}
            shadow-camera-bottom={-15}
            shadow-camera-left={-15}
        />
        <ambientLight intensity={ 0.5 } />
    </>
}