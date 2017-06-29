import { Counter, COUNTER } from './types';
export class StringClass implements Counter {
    constructor(private str: string) { }

    getCounter(): COUNTER {
        return {
            do: (cb: (currentChar: string, index: number, str: string) => void) => {
                for (var i = 0; i < this.str.length; i++) {
                    cb(this.str[i] , i , this.str);
                }
            }
        }
    }

}