import { Counter, COUNTER } from './types';
export class FunctionClass implements Counter {
    constructor(private func : Function){}
    
    getCounter(): COUNTER {
        return {
            do : (cb : (returns : any) => void) => {
                let result : any;
                while(result = this.func()){
                    cb(result);
                }
            }
        }
    }

}