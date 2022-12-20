import { GroupProps, useFrame } from '@react-three/fiber';
import { useEffect, useRef, useState, createRef } from 'react';
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

    const [portalRefs, setPortalRefs] = useState<React.RefObject<GroupProps>[]>([]);
    const [core, setCore] = useState<JSX.Element[]>([]);
    const [electrons, setElectrons] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const elem = props.element;
        setPortalRefs([...(Array(elem.electronAmount).fill(undefined).map((_, i) => portalRefs[i] || createRef()))]);

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
            const distance = value === 1 ? 15 : 12;
            const theta = Math.acos(-1 + (2 * index + 1) / elem.electronAmount);
            const phi = Math.sqrt(elem.electronAmount * Math.PI) * theta;
            const xPos = distance * Math.cos(phi) * Math.sin(theta);
            const yPos = distance * Math.sin(phi) * Math.sin(theta);
            const zPos = distance * Math.cos(theta);

            if (value === 1) {
                newElectrons.push(<Electron ref={portalRefs[index]} key={`electron-${index}`} xPos={xPos} yPos={yPos} zPos={zPos} active={true} />);
            } else {
                newElectrons.push(<Electron ref={portalRefs[index]} key={`electron-${index}`} xPos={xPos} yPos={yPos} zPos={zPos} />);
            }
        });
        setElectrons([...newElectrons]);
    }, [props.element.electronAmount]);

    useFrame((_state, delta) => {
        if (atomRef.current && coreRef.current && portalRefs.length > 0) {
            atomRef.current.rotation.y += delta * 0.5;
            atomRef.current.rotation.x += delta * 0.25;

            for (let i = 0; i < portalRefs.length; i++) {
                const portal = portalRefs[i].current;
                if (portal) {
                    portal.rotation.y += delta * 0.25 * (i % 2) * (i % 2 == 0 ? 1 : -1);
                    portal.rotation.x += delta * 0.30 * (i % 3) * (i % 3 == 0 ? 1 : -1);
                    portal.rotation.z += delta * 0.15 * (i % 5) * (i % 5 == 0 ? 1 : -1);
                }
            }
        }
    });

    useEffect(() => {
        const elem: Element = props.element;

        if (elem.atomicNumber > 1) {
            const coreOrder = [];
            for (let i = 0; i < elem.atomicNumber * 2; i++) {
                coreOrder.push(i < elem.atomicNumber ? 1 : 0);
            }
            coreOrder.sort(() => Math.random() - 0.5);

            const newCore: JSX.Element[] = [];
            const phi = Math.PI * (3 - Math.sqrt(5));
            const amount = coreOrder.length;
            coreOrder.forEach((value, index) => {
                const yPos = 1 - (index / (amount - 1) * 2.3) * 2;
                const radius = Math.sqrt(1 - yPos * yPos);
                const theta = phi * index;
                const xPos = Math.cos(theta) * radius;
                const zPos = Math.sin(theta) * radius;

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
    }, [props.element.atomicNumber]);

    return (
        <group ref={atomRef}>
            <group ref={coreRef} key={`atom-core-${core.length}`}>
                {core}
            </group>
            <group key={`atom-portals-${electrons.length}`}>
                {electrons}
            </group>
        </group>
    );
}

export default Atom;