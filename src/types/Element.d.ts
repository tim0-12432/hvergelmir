import Series from "./Series";

export type Element = {
    id: string;
    name: string;
    group: Group;
    series: Series;
    period: Period;
    atomicNumber: number;
    atomicMass: number;
    electronAmount: number;
}

export type Group = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18;

export type Period = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export default Element;