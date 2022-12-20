import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Element from '../types/Element';
import Atom from './chemistry/Atom';
import { Theme} from '../App';

type EnvironmentProps = {
    className?: string;
    currentElement: Element;
    theme: Theme;
}

function Environment(props: EnvironmentProps) {
    return (
        <div className={props.className}>
            <Canvas>
                <OrbitControls />
                {props.theme == "dark" && <Stars/>}
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} />
                <Atom element={props.currentElement} />
            </Canvas>
        </div>
    );
}

export default Environment;