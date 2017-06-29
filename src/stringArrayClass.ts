import { Counter, COUNTER } from './types';
export class StringArrayClass implements Counter {
    private copyOfArray : string [];
    constructor(private strArray: string[]) { this.copyOfArray = this.strArray.slice();}

    getCounter(): COUNTER {
        let length = this.strArray.length;
        return {
            do: (cb: (currentElement : string , index : number , copyOfArray : string[]) => void) => {
                for (var i = 0; i < length; i++) {
                    cb(this.copyOfArray[i] , i , this.copyOfArray);
                }
            }
        }
    }

}