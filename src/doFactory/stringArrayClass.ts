import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class StringArrayClass implements Counter {
    private copyOfArray: string[];
    constructor(private strArray: string[]) { this.copyOfArray = this.strArray.slice(); }

    getCounter(): COUNTER {
        let length = this.strArray.length;
        return {
            do: (cb?: (index: number, currentElement: string, copyOfArray: string[]) => string) => {
                let changedArray : string[] = this.copyOfArray;

                for (var i = 0; i < length; i++) {
                    let ret = cb && cb(i, this.copyOfArray[i], this.copyOfArray);
                    changedArray[i] = ret || changedArray[i];
                }
                return (new ReturnsOfCounter<string>(changedArray)).getReturns();
            }

        }
    }

}