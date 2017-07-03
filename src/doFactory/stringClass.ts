import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from "../interfaces/types";

export class StringClass implements Counter<StringClass> {
    
    constructor(private _str ?: string) { }

    getCounter(): COUNTER {
        return {
            do: (cb?: (index: number, currentChar: string, str: string) => string) => {
                let changedArray : string[] = [];
                let str = <string>this._str;
                for (var i = 0; i < str.length; i++) {
                    let ret = cb && cb(i, str[i], str);
                    changedArray[i] = ret || str[i];
                }
                return (new ReturnsOfCounter<string>(changedArray)).getReturns();
            }
        }
    }

    setMixedObj(mixed: string): StringClass {
        this._str = mixed;
        return this;
    }

}