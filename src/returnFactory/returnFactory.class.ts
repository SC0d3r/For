import { ReturnSortedClass } from './returnSortedClass';
import { ReturnUniqClass } from './returnUniqClass';
import { ReturnSumClass } from './returnSumClass';

import { Return, RETURN } from "../interfaces/types";

export class ReturnFactory implements Return {
    private factoryReturn : RETURN;
    constructor(private mixedType ?: string[] | number[]) {
        mixedType ? this.makeReturn() : '';
    }

    private makeReturn() : void {
        const factoryReturnUniq = (new ReturnUniqClass(<string[] | number[]>this.mixedType)).getReturn();
        const factoryReturnSum = (new ReturnSumClass(<string[] | number[]>this.mixedType)).getReturn();
        const factoryReturnSorted = (new ReturnSortedClass(<string[] | number[]>this.mixedType)).getReturn();

        this.factoryReturn = Object.assign({} , factoryReturnSum , factoryReturnUniq , factoryReturnSorted);
    }

    public setMixedObj(mixed : string[] | number[]) : ReturnFactory{
        this.mixedType = mixed;
        this.makeReturn();
        return this;
    }

    getReturn(): RETURN {
        return this.factoryReturn;
    }

}