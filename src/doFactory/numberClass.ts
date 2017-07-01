import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class NumberClass implements Counter {
    constructor(private counter: number) { }
    getCounter(): COUNTER {
        return {
            do: (cb?: (index: number) => number) => {
                let indexes: number[] = [];
                for (let ind = 0; ind < this.counter; ind++) {
                    indexes[ind] = ind;
                    let ret = cb && cb(ind);
                    if(typeof ret === 'number') indexes[ind] = ret;
                    else indexes[ind] = ret || indexes[ind];
                }
                return (new ReturnsOfCounter<number>(indexes)).getReturns();
            }
        }
    }

}