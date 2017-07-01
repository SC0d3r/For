import { ReturnsOfCounter } from './returnsOfCounterClass';
import { TillFactory } from './tillFactory/tillFactory.class';
import { ReturnFactory } from './returnFactory/returnFactory.class';
import { DoFactory } from './doFactory/doFactory.class';


import { COUNTER, RETURN, TILLS, Mixed, EnteringTillFactory } from "./interfaces/types";

type ForReturns = COUNTER & RETURN & TILLS;
type FOR_FUNC = (Mixed) => COUNTER & RETURN & TILLS;

let For: any;

For = (mixed: Mixed): ForReturns => {
    let copyOfMixed: any[] = [];
    if (For.__copy && Array.isArray(mixed)) copyOfMixed = returnCopyOfGivenArray(mixed);
    else copyOfMixed = <any>mixed;

    const counter = (new DoFactory(copyOfMixed)).getCounter();
    const returns = (new ReturnFactory(<string[] | number[]>copyOfMixed)).getReturn();
    const tills = (new TillFactory(<EnteringTillFactory>copyOfMixed)).getTills();
    const returnMethods = (new ReturnsOfCounter<any>(<any>copyOfMixed)).getReturns();
    const combinedFactories: ForReturns = Object.assign({}, counter, returns, tills, returnMethods);
    return combinedFactories;
}

For.__copy = true; // by default all the given arrays will be copied and used 

// if you diable copying the returnSorted method will copy either way
For.disableCopy = () => {
    For.__copy = false;
}
For.enableCopy = () => {
    For.__copy = true;
}

function returnCopyOfGivenArray(arr : any[]){
    return arr.slice();
}




export = For;