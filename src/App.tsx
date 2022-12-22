import { useEffect, useState } from "react";
import PeriodicTable from "./components/chemistry/PeriodicTable";
import Environment from "./components/Environment";
import Gui from "./components/Gui";
import styles from "./styles/App.module.scss";
import Element from "./types/Element";
import app from "../package.json";

export type Theme = "dark" | "light";

function App() {
    const [selectedElement, setSelectedElement] = useState<Element>(PeriodicTable[0]);
    const [theme, setTheme] = useState<Theme>("dark")

    const updateSelectedElement = (elementId: string) => {
        const element = PeriodicTable.find((element) => element.symbol === elementId);
        if (element) {
            setSelectedElement(element);
        }
        console.log(element);
    };

    const updateTheme = (theme: Theme) => {
        setTheme(theme);
        localStorage.setItem("theme", theme);
    };

    const toggleTheme = () => {
        if (theme === "dark") {
            updateTheme("light");
        } else {
            updateTheme("dark");
        }
    };

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme) {
          updateTheme(theme as Theme);
        } else {
          updateTheme("dark");
        }
    }, []);

    return (
        <div className={`${styles.app} ${theme == "light" ? styles.light : styles.dark}`}>
            <Environment className={styles.env} currentElement={selectedElement} theme={theme} />
            <Gui className={styles.gui} selected={selectedElement} onSelect={updateSelectedElement} toggleTheme={toggleTheme} />
            <footer className={styles.footer}>Made with &hearts; by <a href="https://github.com/tim0-12432" target="_blank">tim0_12432</a> &copy; 2022 | v{app.version}</footer>
        </div>
    );
}

export default App;
