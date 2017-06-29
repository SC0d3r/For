export type Mixed = number | number[] | string | string[] | Object;

export type COUNTER  = {do : Function};
export type RETURN = {returnSum : Function};

export interface Counter {
    getCounter() : COUNTER;
}