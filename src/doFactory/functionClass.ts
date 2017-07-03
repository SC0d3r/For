import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from "../interfaces/types";

export class FunctionClass implements Counter<FunctionClass> {
    constructor(private _func?: Function) { }

    getCounter(): COUNTER {
        // if(this.func === undefined) throw new Error('First set a function for this process')
        return {
            do: (cb?: (returns: any) => any) => {
                let result: any;
                let changesOnArray : any[] = [];
                let i = 0;
                const func = <Function>this._func;
                while (result = func()) {
                    let ret = cb && cb(result);
                    if(ret) changesOnArray[i++] = ret;
                }
                return (new ReturnsOfCounter<number>(changesOnArray)).getReturns();
            }
        }
    }

    setMixedObj(mixed: Function): FunctionClass {
        this._func = mixed;
        return this;
    }

}