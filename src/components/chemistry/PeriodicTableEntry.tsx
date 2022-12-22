import Element from "../../types/Element";
import styles from "../../styles/PeriodicTableEntry.module.scss";
import { useRef, useEffect } from "react";

type PeriodicTableEntryProps = {
    element: Element;
}

const colorForSeries = {
    "alkali metal": "#e55921",
    "alkaline earth metal": "#b67225",
    "diatomic nonmetal": "#559837",
    "polyatomic nonmetal": "#559837",
    "transition metal": "#a55f5a",
    "post-transition metal": "#9e713c",
    "metalloid": "#8f8f8f",
    "halogen": "#bfb872",
    "noble gas": "#658db1",
    "lanthanide": "#94619e",
    "actinide": "#904a99",
    "unknown": "#247354"
}

function PeriodicTableEntry(props: PeriodicTableEntryProps) {
    const colorRef = useRef<HTMLDivElement>(null);
    const { element } = props;

    useEffect(() => {
        if (colorRef.current) {
            colorRef.current.style.backgroundColor = colorForSeries[element.category];
        }
    }, [element]);

    return (
        <div className={styles.container} ref={colorRef}>
            <h1 className={styles.h1}>{element.symbol}</h1>
            <h2 className={styles.h2}>{element.number}</h2>
            <h3 className={styles.h3}>{Math.round(element.atomic_mass)}</h3>
        </div>
    );
}

export default PeriodicTableEntry;