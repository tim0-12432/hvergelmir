import Sphere from '../geometry/Sphere';

type ElectronProps = {
    xPos: number;
    yPos: number;
    zPos: number;
    active?: boolean;
}

function Electron(props: ElectronProps) {
    return <Sphere
        {...props}
        radius={0.25}
        color={props.active ? "yellow" : "blue"}
    />;
}

export default Electron;