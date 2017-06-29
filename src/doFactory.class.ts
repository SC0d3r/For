import { ObjectArrayClass } from './objectArrayClass';
import { FunctionClass } from './functionClass';
import { ObjectClass } from './objectClass';
import { StringArrayClass } from './stringArrayClass';
import { StringClass } from './stringClass';
import { NumberArrayClass } from './numberArrayClass';
import { NumberClass } from './numberClass';
import { Mixed, COUNTER, Counter } from "./types";
export class DoFactory implements Counter {
    private counter: COUNTER
    constructor(private mixedObj: Mixed) {
        this.makeCounter();
    }


    private makeCounter(): void {
        if (typeof this.mixedObj === 'function') {
            this.counter = (new FunctionClass(this.mixedObj)).getCounter();
        } else if (typeof this.mixedObj === 'number') {

            this.counter = (new NumberClass(<number>this.mixedObj)).getCounter();

        } if (typeof this.mixedObj === 'string') {

            this.counter = (new StringClass(<string>this.mixedObj)).getCounter();

        } else if (Array.isArray(this.mixedObj)) {

            if (typeof this.mixedObj[0] === 'number') {

                this.counter = (new NumberArrayClass(<number[]>this.mixedObj)).getCounter();

            } else if (typeof this.mixedObj[0] === 'string') {
                
                this.counter = (new StringArrayClass(<string[]>this.mixedObj)).getCounter();
            }else if(typeof this.mixedObj[0] === 'object'){
                this.counter = (new ObjectArrayClass(<Object[]>this.mixedObj)).getCounter();
            }

        } else if (typeof this.mixedObj === 'object') {
            this.counter = (new ObjectClass(this.mixedObj)).getCounter();
        }

    }

    public getCounter(): COUNTER {
        return this.counter;
    }
}