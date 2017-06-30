import { ReturnsOfCounter } from './returnsOfCounterClass';
import { TillFactory } from './tillFactory.class';
import { ReturnFactory } from './returnFactory.class';
import { DoFactory } from './doFactory.class';
import { Mixed, COUNTER, RETURN, EnteringTillFactory, TILLS } from "./types";


type ForReturns = COUNTER & RETURN & TILLS;

function For(mixed: Mixed) : ForReturns{
    const counter = (new DoFactory(mixed)).getCounter();
    const returns = (new ReturnFactory(<string[] | number[]>mixed)).getReturn();
    const tills = (new TillFactory(<EnteringTillFactory>mixed)).getTills();
    const returnMethods =  (new ReturnsOfCounter<any>(<any>mixed)).getReturns();
    const combinedFactories : ForReturns = Object.assign({} , counter , returns , tills , returnMethods);
    return combinedFactories;
}
export = For;