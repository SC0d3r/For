
import { Returns } from "./interfaces/types";

export class ReturnsOfCounter<T> {
    private returnObjs: Returns;
    constructor(private mixed?: T[]) {
        mixed ? this.createReutrns() : '';
    }

   
    private createReutrns(){

        this.makeMixedObj();

        let arr = <T[]>this.mixed;
        let length = arr.length;

        this.returnObjs =  {
            returns: arr,
            assign: (array: any[]) => {
                if (!Array.isArray(array)) throw new Error('you can only assign to arrays');
                for (var i = 0; i < length; i++) {
                    array[i] = arr[i];
                }
            },
            append: (array: any[]) => {
                if (!Array.isArray(array)) throw new Error('you can only assign to arrays');
                // if (length === undefined) array.push(arr); // arr here is just a string or number
                for (var i = 0; i < length; i++) {
                    array.push(arr[i]);
                }
            },
            prepend: (array: any[]) => {
                if (!Array.isArray(array)) throw new Error('you can only assign to arrays');
                // if (length === undefined) array.unshift(arr); // arr here is just a string or number
                for (var i = 0; i < length; i++) {
                    array.unshift(arr[i]);
                }
            }
        }
    }


    private makeMixedObj() {
        let resultArray = this.initializeArrayAccordingToType(<any>this.mixed, typeof this.mixed);
        if (resultArray.length !== 0) this.mixed = resultArray;
    }

    private initializeArrayAccordingToType(mixed: (string | number | Object), type: string): any[] {
        let temp: any[] = [];
        if (type === 'number') {
            for (var i = 0; i < mixed; i++) {
                temp.push(i);
            }
        } else if (type === 'string') {
            let length = (<any>mixed).length;
            for (var i = 0; i < length; i++) {
                temp.push(mixed[i]);
            }
        } else if (type === 'object' && !Array.isArray(mixed)) {
            let keys = Object.keys(mixed);
            let length = keys.length;
            for (let i = 0; i < length; i++) {
                let currentKey = keys[i];
                let currentValue = mixed[currentKey];
                temp[i] = [currentKey, currentValue];
            }
        }
        return temp;
    }


    // --- public apis

     
    public getReturns(): Returns {
        return this.returnObjs;
    }

    public setMixedObj(mixed : T[]) : ReturnsOfCounter<T>{
        this.mixed = mixed;
        this.createReutrns();
        return this;
    }

}