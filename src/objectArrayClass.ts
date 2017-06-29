import { ReturnsOfCounter } from './returnsOfCounterClass';
import { Counter, COUNTER } from './types';
export class ObjectArrayClass implements Counter {
    private copyOfArray: Object[];
    constructor(private objectArray: Object[]) { this.copyOfArray = this.objectArray.slice(); }

    getCounter(): COUNTER {
        let length = this.copyOfArray.length;
        return {
            do: (cb?: (index: number, currentElement: Object, copyOfArray: Object[]) => Object) => {
                let changedArray : Object[] = this.copyOfArray;
                for (var i = 0; i < length; i++) {
                    let ret = cb && cb(i, this.copyOfArray[i], this.copyOfArray);
                    changedArray[i] = ret || changedArray[i];
                }
                return (new ReturnsOfCounter<Object>(changedArray)).getReturns();
            }
        }
    }

}