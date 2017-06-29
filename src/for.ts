import { DoFactory } from './doFactory.class';
import { Mixed, COUNTER } from "./types";

export function For(mixed: Mixed) : COUNTER{
    var doFactory = new DoFactory(mixed);
    return doFactory.getCounter();
}
