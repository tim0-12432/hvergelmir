import { Point } from '@react-three/drei';
import React from 'react';
import Sphere from '../geometry/Sphere';

type ElectronProps = {
    xPos: number;
    yPos: number;
    zPos: number;
    active?: boolean;
}

const Electron = React.forwardRef((props: ElectronProps, ref: any) => {
    return (
        <group
            ref={ref}
        >
            <Sphere
                {...props}
                radius={0.25}
                color={props.active ? "yellow" : "blue"}
            />
        </group>
    );
});

export default Electron;