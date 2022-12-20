import Sphere from '../geometry/Sphere';

type NeutronProps = {
    xPos: number;
    yPos: number;
    zPos: number;
}

function Neutron(props: NeutronProps) {
    return <Sphere
        {...props}
        radius={1}
        color={"white"}
    />;
}

export default Neutron;