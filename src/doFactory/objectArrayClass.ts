import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from "../interfaces/types";

export class ObjectArrayClass implements Counter {
    constructor(private objectArray: Object[]) { }

    getCounter(): COUNTER {
        let length = this.objectArray.length;
        return {
            do: (cb?: (index: number, currentElement: Object, objectArray: Object[]) => Object) => {
                let changedArray : Object[] = this.objectArray;
                for (var i = 0; i < length; i++) {
                    let ret = cb && cb(i, this.objectArray[i], this.objectArray);
                    changedArray[i] = ret || changedArray[i];
                }
                return (new ReturnsOfCounter<Object>(changedArray)).getReturns();
            }
        }
    }

}