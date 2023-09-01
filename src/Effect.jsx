import { EffectComposer, Vignette} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
export default function Effects()
{
    return <EffectComposer>
        <Vignette
            offset={ 0.3 }
            darkness={ 0.9 }
            blendFunction={ BlendFunction.NORMAL }
        />
    </EffectComposer>
}