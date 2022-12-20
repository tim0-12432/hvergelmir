import Element from "../../types/Element";
import styles from "../../styles/PeriodicTableEntry.module.scss";
import { useRef, useEffect } from "react";

type PeriodicTableEntryProps = {
    element: Element;
}

const colorForSeries = {
    "Alkali Metals": "#f44336",
    "Alkaline Earth Metals": "#e91e63",
    "Transition Metals": "#9c27b0",
    "Post-Transition Metals": "#673ab7",
    "Metalloids": "#3f51b5",
    "Other Metals": "#2196f3",
    "Other Nonmetals": "#00bcd4",
    "Halogens": "#03a9f4",
    "Noble Gases": "#00bcd4",
    "Lanthanides": "#009688",
    "Actinides": "#4caf50",
    "other": "#607d8b"
}

function PeriodicTableEntry(props: PeriodicTableEntryProps) {
    const colorRef = useRef<HTMLDivElement>(null);
    const { element } = props;

    useEffect(() => {
        if (colorRef.current) {
            colorRef.current.style.backgroundColor = colorForSeries[element.series];
        }
    }, [element]);

    return (
        <div className={styles.container} ref={colorRef}>
            <h1 className={styles.h1}>{element.id}</h1>
            <h2 className={styles.h2}>{element.atomicNumber}</h2>
        </div>
    );
}

export default PeriodicTableEntry;