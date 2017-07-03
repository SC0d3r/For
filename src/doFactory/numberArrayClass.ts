import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class NumberArrayClass implements Counter<NumberArrayClass> {

    constructor(private _nums?: number[]) {
    }

    getCounter(): COUNTER {
        let changesOnArray: number[] = <number[]>this._nums;
        let length = changesOnArray.length;
        return {
            do: (cb?: (index: number, currentElement: number, arr: number[]) => number) => {
                for (var i = 0; i < length; i++) {
                    let ret = cb && cb(i, changesOnArray[i], changesOnArray);
                    if (typeof ret === 'number') changesOnArray[i] = ret;
                    else changesOnArray[i] = ret || changesOnArray[i];
                }
                return (new ReturnsOfCounter<number>(changesOnArray)).getReturns();
            }
        }
    }


    setMixedObj(mixed: number[]): NumberArrayClass {
        this._nums = mixed;
        return this;
    }

}