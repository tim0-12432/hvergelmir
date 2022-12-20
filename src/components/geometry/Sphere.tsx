type SphereProps = {
    radius: number;
    xPos: number;
    yPos: number;
    zPos: number;
    color: string;
}

function Sphere(props: SphereProps) {
    const { radius, xPos, yPos, zPos, color } = props;

    return (
        <mesh position={[xPos, yPos, zPos]}>
            <sphereGeometry attach="geometry" args={[radius, 32, 16]} />
            <meshLambertMaterial attach="material" color={color} />
        </mesh>
    );
}

export default Sphere;