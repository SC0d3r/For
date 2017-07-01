
import { Tills, EnteringTillFactory, TillValue, COUNTER, Returns } from "../interfaces/types";
import { DoFactory } from "../doFactory/doFactory.class";
import { ReturnsOfCounter } from "../returnsOfCounterClass";

export class TillValueClass implements Tills {
    constructor(private mixed: EnteringTillFactory) { }

    getTills(): TillValue {
        return {
            tillValue: (condition: string): COUNTER & Returns => {
                let condtionedArrayOrObj: any[] | Object = this.mixed;
                if (Array.isArray(this.mixed)) condtionedArrayOrObj = this.mixed.slice();

                let counterForThisType: COUNTER = (new DoFactory(this.mixed)).getCounter();
                // console.log(counterForThisType);
                counterForThisType.do((key: (number | string), val: any) => {
                    const conditionResult: boolean = this.parseConditionOnThisVal(condition, val);
                    if (!Boolean(conditionResult)) delete condtionedArrayOrObj[key];
                });
                if (Array.isArray(condtionedArrayOrObj)) condtionedArrayOrObj = removeUndefinedsFromArray(condtionedArrayOrObj);
                let returns =  (new ReturnsOfCounter<any>(<any>condtionedArrayOrObj)).getReturns();
                let counter =  (new DoFactory(condtionedArrayOrObj)).getCounter();
                return Object.assign({} , returns , counter);
            }
        }
    }

    private parseConditionOnThisVal(condition: string, onWhat: string | number): boolean {
        let cond : string, value : string | number, keyInObj : string = '';
        [cond, value] = condition.trim().split(' ');
        if(typeof this.mixed[0] === 'object') [keyInObj , cond , value] = condition.trim().split(' ');
        let val: any = parseInt(value);
        if (isNaN(val)) {
            val = value;
        }

        switch (cond) {
            case "<":
                if ((onWhat[keyInObj] || onWhat) < val) return true;
                else return false;
            case ">":
                if ((onWhat[keyInObj] || onWhat) > val) return true;
                else return false;
            case "<=":
                if ((onWhat[keyInObj] || onWhat) <= val) return true;
                else return false;
            case ">=":
                if ((onWhat[keyInObj] || onWhat) >= val) return true;
                else return false;
            case "=":
                // if (typeof (onWhat[keyInObj] || onWhat) === 'string') val = val + '';
                if ((onWhat[keyInObj] || onWhat) === val) return true;
                else return false;
            default:
                throw new Error(`the condtion you passed is incorrect \n
                * if this is an object the first thing in condition string must be the desured field in object *`);
        }
    }
}

function removeUndefinedsFromArray(array: any[]): any[] {
    let length = array.length;
    let resultArr: any[] = [];
    for (let i = 0; i < length; i++) {
        let currentElem = array[i]
        if (currentElem !== undefined) resultArr.push(currentElem);
    }
    return resultArr;
}