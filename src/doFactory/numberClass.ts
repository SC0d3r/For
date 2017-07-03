import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class NumberClass implements Counter<NumberClass> {
    
    constructor(private _num?: number) { }
    getCounter(): COUNTER {
        return {
            do: (cb?: (index: number) => number) => {
                let indexes: number[] = [];
                const num = <number>this._num;
                for (let ind = 0; ind < num; ind++) {
                    indexes[ind] = ind;
                    let ret = cb && cb(ind);
                    if(typeof ret === 'number') indexes[ind] = ret;
                    else indexes[ind] = ret || indexes[ind];
                }
                return (new ReturnsOfCounter<number>(indexes)).getReturns();
            }
        }
    }

    setMixedObj(mixed: number): NumberClass {
        this._num = mixed;
        return this;
    }

}