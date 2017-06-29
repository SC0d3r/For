import { Counter, COUNTER } from './types';
export class ObjectClass implements Counter {
    constructor(private obj: any) { }

    getCounter(): COUNTER {
        return {
            do: (cb: (currentKey : string , currentValue : any) => void) => {
                let keys = Object.keys(this.obj);
                let length = keys.length;
                for (var i = 0; i < length; i++) {
                    let currentKey : string = keys[i];
                    let currentValue : string = this.obj[currentKey];
                    cb(currentKey , currentValue);
                }
            }
        }
    }

}