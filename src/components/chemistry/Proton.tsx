import Sphere from '../geometry/Sphere';

type ProtonProps = {
    xPos: number;
    yPos: number;
    zPos: number;
}

function Proton(props: ProtonProps) {
    return <Sphere
        {...props}
        radius={1}
        color={"red"}
    />;
}

export default Proton;