import { Counter, COUNTER } from './types';
export class NumberClass implements Counter {
    constructor(private counter: number) { }
    getCounter(): COUNTER {
        return {
            do: (cb: (counter: number) => void) => {
                for (var i = 0; i < this.counter; i++) {
                    cb(i);
                }
            }
        }
    }

}