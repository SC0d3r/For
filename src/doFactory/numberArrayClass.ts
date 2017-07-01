import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class NumberArrayClass implements Counter {
    constructor(private nums: number[]) {
    }

    getCounter(): COUNTER {
        return {
            do: (cb?: (index: number, currentElement: number, arr: number[]) => number) => {
                let changesOnArray : number[] = this.nums;
                for (var i = 0; i < this.nums.length; i++) {
                    let ret = cb && cb(i, this.nums[i], this.nums);
                    if(typeof ret === 'number') changesOnArray[i] = ret;
                    else changesOnArray[i] = ret || changesOnArray[i];
                }
                return (new ReturnsOfCounter<number>(changesOnArray)).getReturns();
            }
        }
    }

}