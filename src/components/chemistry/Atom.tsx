import { GroupProps, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react'
import Element from '../../types/Element';
import Electron from './Electron';
import Neutron from './Neutron';
import Proton from './Proton';

type AtomProps = {
    element: Element;
}

function Atom(props: AtomProps) {
    const atomRef = useRef<GroupProps>(null);
    const coreRef = useRef<GroupProps>(null);
    const portalRef = useRef<GroupProps>(null);

    const [core, setCore] = useState<JSX.Element[]>([]);
    const [electrons, setElectrons] = useState<JSX.Element[]>([]);

    useFrame((_state, delta) => {
        if (atomRef.current && coreRef.current && portalRef.current) {
            atomRef.current.rotation.y += delta * 0.5;
            atomRef.current.rotation.x += delta * 0.25;
            portalRef.current.rotation.y += delta * 0.3;
            portalRef.current.rotation.x += delta * 0.5;
        }
    });

    useEffect(() => {
        const elem: Element = props.element;
        const coreOrder = [];
        for (let i = 0; i < elem.atomicNumber * 2; i++) {
            coreOrder.push(i < elem.atomicNumber ? 1 : 0);
        }
        coreOrder.sort(() => Math.random() - 0.5);

        const newCore: JSX.Element[] = [];
        if (elem.atomicNumber > 1) {
            coreOrder.forEach((value, index) => {
                const distance = 2.5;
                const theta = Math.acos(-1 + (2 * index + 1) / elem.atomicNumber);
                const phi = Math.sqrt(elem.atomicNumber * Math.PI) * theta;
                const xPos = distance * Math.cos(phi) * Math.sin(theta);
                const yPos = distance * Math.sin(phi) * Math.sin(theta);
                const zPos = distance * Math.cos(theta);

                if (value === 1) {
                    newCore.push(<Proton key={`core-${index}`} xPos={xPos} yPos={yPos} zPos={zPos} />);
                } else {
                    newCore.push(<Neutron key={`core-${index}`} xPos={xPos} yPos={yPos} zPos={zPos} />);
                }
            });
            setCore([...newCore]);
        } else {
            setCore([<Proton xPos={0} yPos={0} zPos={0} />]);
        }

        const electronOrder = [];
        for (let i = 0; i < elem.electronAmount; i++) {
            if (i > elem.electronAmount - 1 - elem.group) {
                electronOrder.push(1);
            } else {
                electronOrder.push(0);
            }
        }
        electronOrder.sort(() => Math.random() - 0.5);
        const newElectrons: JSX.Element[] = [];
        electronOrder.forEach((value, index) => {
            const distance = 10;
            const theta = Math.acos(-1 + (2 * index + 1) / elem.electronAmount);
            const phi = Math.sqrt(elem.electronAmount * Math.PI) * theta;
            const xPos = distance * Math.cos(phi) * Math.sin(theta);
            const yPos = distance * Math.sin(phi) * Math.sin(theta);
            const zPos = distance * Math.cos(theta);

            if (value === 1) {
                newElectrons.push(<Electron key={`electron-${index}`} xPos={xPos} yPos={yPos} zPos={zPos} active={true} />);
            } else {
                newElectrons.push(<Electron key={`electron-${index}`} xPos={xPos} yPos={yPos} zPos={zPos} />);
            }
        });
        setElectrons([...newElectrons]);
    }, [props.element]);

    return (
        <group ref={atomRef}>
            <group ref={coreRef}>
                {core}
            </group>
            <group ref={portalRef}>
                {electrons}
            </group>
        </group>
    );
}

export default Atom;