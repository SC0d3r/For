import { Return, RETUNIQ } from "../interfaces/types";

export class ReturnUniqClass implements Return {
    constructor(private array : string[] | number[]){}

    getReturn() : RETUNIQ {
        let array = this.array;
        const length = array.length;
        let uniqArr : any = [];

        return {
            returnUniq : () => {
                for (let i = 0; i < length; i++) {
                    let currentItem = array[i];
                    if(uniqArr.indexOf(currentItem) === -1){
                        uniqArr.push(currentItem);
                    }
                }
                return uniqArr;
            }
        }
    }
}