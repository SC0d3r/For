import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from './../interfaces/types';
export class StringArrayClass implements Counter<StringArrayClass> {

    constructor(private _strArray ?: string[]) { }

    getCounter(): COUNTER {
        let _strArray = <string[]>this._strArray;
        let length = _strArray.length;
        return {
            do: (cb?: (index: number, currentElement: string, strArray: string[]) => string) => {
                let changedArray: string[] = _strArray;

                for (var i = 0; i < length; i++) {
                    let ret = cb && cb(i, _strArray[i], _strArray);
                    changedArray[i] = ret || changedArray[i];
                }
                return (new ReturnsOfCounter<string>(changedArray)).getReturns();
            }

        }
    }

    setMixedObj(mixed: string[]): StringArrayClass {
        this._strArray = mixed;
        return this;
    }

}