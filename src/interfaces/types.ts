export type Mixed = Function | number | number[] | string | string[] | Object | Object[];

// -------- return of counters
export type Returns = {
    returns: any[];
    assign: (array: any[]) => void;
    append: (array: any[]) => void;
    prepend: (array: any[]) => void;
}
// -------- counters
export type COUNTER = { do: (key?: any, value?: any, copyOfArr?: any[]) => Returns };

export interface Counter<CLASS> {
    getCounter(): COUNTER;
    setMixedObj(mixed : Mixed) : CLASS;
}


// ---------- returns
export type RETSUM = {
    returnSum: () => string | number;
}

export type RETUNIQ = {
    returnUniq: () => number[] | string[];
}

export type RETSORTED = {
    returnSorted: (cb?: (a: any, b: any) => number) => number[] | string[];
}

export type RETURN = RETSUM & RETUNIQ & RETSORTED;

export interface Return {
    getReturn(): RETSUM | RETUNIQ | RETSORTED;
}


// ---------- tills
export type EnteringTillFactory = string[] | number[] | Object[] | Object;

export type TillKey = {
    tillKey: (condition: string) => COUNTER & Returns;
}

export type TillValue = {
    tillValue: (condition: string) => COUNTER & Returns;
}

export interface Tills {
    getTills(): TillKey | TillValue;
}

export type TILLS = TillKey & TillValue;