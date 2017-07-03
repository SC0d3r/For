import { ReturnsOfCounter } from './../returnsOfCounterClass';
import { Counter, COUNTER } from "../interfaces/types";

export class ObjectArrayClass implements Counter<ObjectArrayClass> {

    constructor(private _objectArray?: Object[]) { }

    getCounter(): COUNTER {
        let length = (<Object[]>this._objectArray).length;
        let changedArray: Object[] = <Object[]>this._objectArray;
        return {
            do: (cb?: (index: number, currentElement: Object, objectArray: Object[]) => Object) => {
                for (var i = 0; i < length; i++) {
                    let ret = cb && cb(i, changedArray[i], changedArray);
                    changedArray[i] = ret || changedArray[i];
                }
                return (new ReturnsOfCounter<Object>(changedArray)).getReturns();
            }
        }
    }

    setMixedObj(mixed: Object[]): ObjectArrayClass {
        this._objectArray = mixed;
        return this;
    }

}