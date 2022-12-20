import { MeshProps } from "@react-three/fiber";
import React from "react";

type SphereProps = {
    radius: number;
    xPos: number;
    yPos: number;
    zPos: number;
    color: string;
}

const Sphere = React.forwardRef((props: SphereProps, ref: any) => {
    const { radius, xPos, yPos, zPos, color } = props;

    return (
        <mesh ref={ref} position={[xPos, yPos, zPos]}>
            <sphereGeometry attach="geometry" args={[radius, 32, 16]} />
            <meshLambertMaterial attach="material" color={color} />
        </mesh>
    );
});

export default Sphere;