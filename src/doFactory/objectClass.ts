import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class ObjectClass implements Counter {
    constructor(private obj: any) { }

    getCounter(): COUNTER {
        return {
            do: (cb?: (currentKey: string, currentValue: any) => [string , any]) => {
                let keys = Object.keys(this.obj);
                let length = keys.length;
                let changedArray : [string , any][] = [];

                for (var i = 0; i < length; i++) {
                    let currentKey: string = keys[i];
                    let currentValue: string = this.obj[currentKey];
                    changedArray[i] = [currentKey , currentValue];
                    let ret = cb && cb(currentKey, currentValue);
                    changedArray[i] = ret || changedArray[i];
                }
                
                return (new ReturnsOfCounter<[string , any]>(changedArray)).getReturns();
            }
        }
    }

}