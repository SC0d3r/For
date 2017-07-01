import { ReturnsOfCounter } from './returnsOfCounterClass';
import { TillFactory } from './tillFactory/tillFactory.class';
import { ReturnFactory } from './returnFactory/returnFactory.class';
import { DoFactory } from './doFactory/doFactory.class';


import { COUNTER, RETURN, TILLS, Mixed, EnteringTillFactory } from "./interfaces/types";

type ForReturns = COUNTER & RETURN & TILLS;

let For: any;

const doFactory = new DoFactory();
const returnFactory = new ReturnFactory();
const tillFactory = new TillFactory();
const returnsOfCounterFactory = new ReturnsOfCounter();

For = (mixed: Mixed): ForReturns => {
    let maybeCopyOfMixed: any[] = [];
    if (For.__copy && Array.isArray(mixed)) maybeCopyOfMixed = mixed.slice();
    else maybeCopyOfMixed = <any>mixed;

    const counter = doFactory.setMixedObj(maybeCopyOfMixed).getCounter();
    const returns = returnFactory.setMixedObj(<string[] | number[]>maybeCopyOfMixed).getReturn();
    const tills = tillFactory.setMixedObj(<EnteringTillFactory>maybeCopyOfMixed).getTills();
    const returnMethods = returnsOfCounterFactory.setMixedObj(<any>maybeCopyOfMixed).getReturns();
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


export = For;