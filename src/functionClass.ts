import { ReturnsOfCounter } from './returnsOfCounterClass';
import { Counter, COUNTER } from './types';
export class FunctionClass implements Counter {
    constructor(private func: Function) { }

    getCounter(): COUNTER {
        return {
            do: (cb?: (returns: any) => any) => {
                let result: any;
                let changesOnArray : any[] = [];
                let i = 0;
                while (result = this.func()) {
                    let ret = cb && cb(result);
                    if(ret) changesOnArray[i++] = ret;
                }
                return (new ReturnsOfCounter<number>(changesOnArray)).getReturns();
            }
        }
    }

}