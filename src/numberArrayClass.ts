import { Counter, COUNTER } from './types';
export class NumberArrayClass implements Counter {
    private copyNums: number[];
    constructor(nums: number[]) {
        this.copyNums = nums.slice();
    }

    getCounter(): COUNTER {
        return {
            do: (cb: (currentElement: number, index: number, arr: number[]) => void) => {
                for (var i = 0; i < this.copyNums.length; i++) {
                    cb(this.copyNums[i], i, this.copyNums);
                }
            }
        }
    }

}