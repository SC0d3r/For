import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class NumberArrayClass implements Counter {
    private copyNums: number[];
    constructor(nums: number[]) {
        this.copyNums = nums.slice();
    }

    getCounter(): COUNTER {
        return {
            do: (cb?: (index: number, currentElement: number, arr: number[]) => number) => {
                let changesOnArray : number[] = this.copyNums;
                for (var i = 0; i < this.copyNums.length; i++) {
                    let ret = cb && cb(i, this.copyNums[i], this.copyNums);
                    if(typeof ret === 'number') changesOnArray[i] = ret;
                    else changesOnArray[i] = ret || changesOnArray[i];
                }
                return (new ReturnsOfCounter<number>(changesOnArray)).getReturns();
            }
        }
    }

}