import { Stats } from "@react-three/drei";
import Element, { Period } from "../types/Element";
import PeriodicTable from "./chemistry/PeriodicTable";
import styles from "../styles/Gui.module.scss";
import { useEffect, useState } from "react";
import PeriodicTableEntry from "./chemistry/PeriodicTableEntry";

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

    const getChar = (period: Period) => {
        switch (period) {
            case 1: return "K";
            case 2: return "L";
            case 3: return "M";
            case 4: return "N";
            case 5: return "O";
            case 6: return "P";
            case 7: return "Q";
            default: return "-";
        }
    };

    return (
        <div className={`${props.className} ${styles.container}`}>
            {isDebug == true && <Stats />}
            <div className={styles.selectContainer}>
                <select
                    className={styles.select}
                    defaultValue={selected.symbol}
                    onChange={(e) => {
                        onSelect(e.target.value);
                        e.currentTarget.blur();
                    }}
                >
                {
                    PeriodicTable
                        .sort((a, b) => {
                            return ("" + a.symbol).localeCompare(b.symbol);
                        })
                        .map((element: Element, index) => {
                            return <option key={index} value={element.symbol}>
                                {`${element.name} (${element.symbol})`}
                            </option>
                        })
                }
                </select>
            </div>
            <div className={styles.info}>
                <p>Series: <span>{selected.category}</span></p>
                <p>Period: <span>{selected.period} ({getChar(selected.period)})</span></p>
                <p>Atomic Number: <span>{selected.number}</span></p>
                <p>Atomic Mass: <span>{selected.atomic_mass}u</span></p>
                <p>Electrons: <span>{selected.shells.join(", ")}</span></p>
                <p>Phase: <span>{selected.phase}</span></p>
                {selected.boil !== null && <p>Boiling Point: <span>{selected.boil}K</span></p>}
                {selected.melt !== null && <p>Melting Point: <span>{selected.melt}K</span></p>}
                <p>Density: <span>{selected.density}</span></p>
            </div>
            <div className={styles.elemContainer}>
                <PeriodicTableEntry element={selected} />
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