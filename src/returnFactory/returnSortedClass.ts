
import { Return, RETSORTED } from "../interfaces/types";

export class ReturnSortedClass implements Return {
    private sorted : string[] | number[];
    constructor(private array : string[] | number[]){}

    getReturn() : RETSORTED {
        
        let self = this;
        return {
            returnSorted : (cb ?: (a : any , b : any) => number) => {
                let copyArray = self.array.slice();
                return (<number[]>copyArray).sort(cb);
            }
        }
    }
}