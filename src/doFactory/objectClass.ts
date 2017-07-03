import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class ObjectClass implements Counter<ObjectClass> {
    
    constructor(private _obj?: any) { }

    getCounter(): COUNTER {
        return {
            do: (cb?: (currentKey: string, currentValue: any) => [string , any]) => {
                let obj = this._obj;
                let keys = Object.keys(obj);
                let length = keys.length;
                let changedArray : [string , any][] = [];

                for (var i = 0; i < length; i++) {
                    let currentKey: string = keys[i];
                    let currentValue: string = obj[currentKey];
                    changedArray[i] = [currentKey , currentValue];
                    let ret = cb && cb(currentKey, currentValue);
                    changedArray[i] = ret || changedArray[i];
                }
                
                return (new ReturnsOfCounter<[string , any]>(changedArray)).getReturns();
            }
        }
    }

    setMixedObj(mixed: any): ObjectClass {
        this._obj = mixed;
        return this;
    }

}