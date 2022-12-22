import Series from "./Series";

export type Element = {
    "name": string,
    "atomic_mass": number,
    "boil": number | null,
    "category": Series,
    "density": number | null,
    "melt": number | null,
    "number": number,
    "period": Period,
    "phase": Phase,
    "source": string,
    "symbol": string,
    "shells": number[],
    "electron_configuration": string,
    "electron_affinity": number | null,
    "electronegativity_pauling": number | null,
    "ionization_energies": number[]
}

export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Phase = "Solid" | "Liquid" | "Gas";

export default Element;