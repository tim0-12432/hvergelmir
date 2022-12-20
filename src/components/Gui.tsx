import { Stats } from "@react-three/drei";
import Element from "../types/Element";
import PeriodicTable from "./chemistry/PeriodicTable";
import styles from "../styles/Gui.module.scss";
import { useEffect, useState } from "react";

type GuiProps = {
    className?: string;
    selected: Element;
    onSelect: (elementId: string) => void;
    toggleTheme: () => void;
}

function Gui(props: GuiProps) {
    const [isDebug, setIsDebug] = useState<boolean>(false);

    const { selected, onSelect, toggleTheme } = props;

    useEffect(() => {
        const debug = localStorage.getItem("debug");
        if (debug) {
            setIsDebug(debug as unknown as boolean);
        } else {
            localStorage.setItem("debug", isDebug.toString());
            setIsDebug(false);
        }
    }, []);

    return (
        <div className={`${props.className} ${styles.container}`}>
            {isDebug == true && <Stats />}
            <div className={styles.selectContainer}>
                <select
                    className={styles.select}
                    defaultValue={selected.id}
                    onChange={(e) => {
                        onSelect(e.target.value);
                        e.currentTarget.blur();
                    }}
                >
                {
                    PeriodicTable
                        .sort((a, b) => {
                            return ("" + a.id).localeCompare(b.id);
                        })
                        .map((element: Element, index) => {
                            return <option key={index} value={element.id}>
                                {`${element.name} (${element.id})`}
                            </option>
                        })
                }
                </select>
            </div>
            <div className={styles.info}>
                <p>Series: <span>{selected.series}</span></p>
                <p>Period: <span>{selected.period}</span></p>
                <p>Group: <span>{selected.group}</span></p>
                <p>Atomic Mass: <span>{selected.atomicMass}u</span></p>
            </div>
            <div className={styles.themeContainer}>
                <button
                    className={styles.themeButton}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleTheme();
                        e.currentTarget.blur();
                    }}
                >&#10050;</button>
            </div>
        </div>
    );
}

export default Gui;