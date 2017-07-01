
import { Tills, EnteringTillFactory, TillKey, COUNTER, Returns } from "../interfaces/types";
import { DoFactory } from "../doFactory/doFactory.class";
import { ReturnsOfCounter } from "../returnsOfCounterClass";

export class TillKeyClass implements Tills {
    constructor(private mixed: EnteringTillFactory) { }

    getTills(): TillKey {
        return {
            tillKey: (condition: string): COUNTER & Returns => {
                let condtionedArrayOrObj: any[] | Object = this.mixed;
                if (Array.isArray(this.mixed)) condtionedArrayOrObj = this.mixed.slice();

                let counterForThisType: COUNTER = (new DoFactory(this.mixed)).getCounter();
                // console.log(counterForThisType);
                counterForThisType.do((key: any, val: any) => {
                    const conditionResult: boolean = this.parseConditionOnThisVal(condition, key);
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
        let [cond, value] = condition.trim().split(' ');

        let val: any = parseInt(value);
        if (isNaN(val)) {
            // if (cond === '<' ||
            //     cond === '>' ||
            //     cond === '<=' ||
            //     cond === '>=') { console.error('asdsada');throw new Error('**not a valid value for this condition**'); }
            val = value;
        }

        switch (cond) {
            case "<":
                if (onWhat < val) return true;
                else return false;
            case ">":
                if (onWhat > val) return true;
                else return false;
            case "<=":
                if (onWhat <= val) return true;
                else return false;
            case ">=":
                if (onWhat >= val) return true;
                else return false;
            case "=":
                // if (typeof onWhat === 'string') val = val + '';
                if (onWhat === val) return true;
                else return false;
            default:
                throw new Error('the condtion you passed is incorrect');
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