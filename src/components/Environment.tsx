import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import Element from '../types/Element';
import Atom from './chemistry/Atom';

type EnvironmentProps = {
    className?: string;
    currentElement: Element;
}

function Environment(props: EnvironmentProps) {
    return (
        <div className={props.className}>
            <Canvas>
                <OrbitControls />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} />
                <Atom element={props.currentElement} />
            </Canvas>
        </div>
    );
}

export default Environment;