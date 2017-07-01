import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class StringArrayClass implements Counter {
    constructor(private strArray: string[]) {  }

    getCounter(): COUNTER {
        let length = this.strArray.length;
        return {
            do: (cb?: (index: number, currentElement: string, strArray: string[]) => string) => {
                let changedArray : string[] = this.strArray;

                for (var i = 0; i < length; i++) {
                    let ret = cb && cb(i, this.strArray[i], this.strArray);
                    changedArray[i] = ret || changedArray[i];
                }
                return (new ReturnsOfCounter<string>(changedArray)).getReturns();
            }

        }
    }

}