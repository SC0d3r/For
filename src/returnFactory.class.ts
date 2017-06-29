import { ReturnSortedClass } from './returnSortedClass';
import { ReturnUniqClass } from './returnUniqClass';
import { ReturnSumClass } from './returnSumClass';
import { Mixed, Return, RETURN } from "./types";

export class ReturnFactory implements Return {
    private factoryReturn : RETURN;
    constructor(private mixedType: string[] | number[]) {
        this.makeReturn();
    }
    private makeReturn() : void {
        const factoryReturnUniq = (new ReturnUniqClass(this.mixedType)).getReturn();
        const factoryReturnSum = (new ReturnSumClass(this.mixedType)).getReturn();
        const factoryReturnSorted = (new ReturnSortedClass(this.mixedType)).getReturn();

        this.factoryReturn = Object.assign({} , factoryReturnSum , factoryReturnUniq , factoryReturnSorted);
    }

    getReturn(): RETURN {
        return this.factoryReturn;
    }

}