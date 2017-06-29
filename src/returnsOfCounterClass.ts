import { Returns } from "./types";

export class ReturnsOfCounter<T> {
    private defaultReturns: any[] = [];
    constructor(private arr: T[]) {
        let temp : any[] = [];
        if(typeof arr === 'number') {
            for(var i = 0;i < arr;i++) {
                temp.push(i);
            }
            this.arr = <any>temp;
        }else if(typeof arr === 'string'){
            for(var i = 0;i < (<any>arr).length;i++) {
                temp.push(arr[i]);
            }
            this.arr = <any>temp;
        }else if(typeof arr === 'object' && !Array.isArray(arr)){
            let keys = Object.keys(arr);
            for(let i = 0;i < keys.length ; i++){
                let currentKey = keys[i];
                let currentValue = arr[currentKey];
                temp[i] = [currentKey , currentValue];
            }
            this.arr = <any>temp;
        }
     }

    getReturns(): Returns {
        let arr = this.arr;
        return {
            returns: (arr.slice ? arr.slice() : arr),
            assign: (array: any[]) => {
                if (!Array.isArray(array)) throw new Error('you can only assign to arrays');
                let length = arr.length;
                for (var i = 0; i < length; i++) {
                    array[i] = arr[i];
                }
            },
            append: (array: any[]) => {
                if (!Array.isArray(array)) throw new Error('you can only assign to arrays');
                let length = arr.length;
                if (length === undefined) array.push(arr); // arr here is just a string or number
                for (var i = 0; i < length; i++) {
                    array.push(arr[i]);
                }
            },
            prepend: (array: any[]) => {
                if (!Array.isArray(array)) throw new Error('you can only assign to arrays');
                let length = arr.length;
                if (length === undefined) array.unshift(arr); // arr here is just a string or number
                for (var i = 0; i < length; i++) {
                    array.unshift(arr[i]);
                }
            }
        }
    }
}