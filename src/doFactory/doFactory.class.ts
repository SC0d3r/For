import { ObjectArrayClass } from './objectArrayClass';
import { FunctionClass } from './functionClass';
import { ObjectClass } from './objectClass';
import { StringArrayClass } from './stringArrayClass';
import { StringClass } from './stringClass';
import { NumberArrayClass } from './numberArrayClass';
import { NumberClass } from './numberClass';

import { Counter, COUNTER, Mixed } from './../interfaces/types';

export class DoFactory implements Counter<DoFactory> {
    private _counter: COUNTER
    private _classes: Object = {};
    constructor(private _mixedObj?: Mixed) {
        this._makeClasses();
        _mixedObj ? this.makeCounter() : '';
    }

    private _makeClasses(): void {
        this._classes['function'] = new FunctionClass();
        this._classes['string'] = new StringClass();
        this._classes['number'] = new NumberClass();
        this._classes['object'] = new ObjectClass();
        this._classes['string[]'] = new StringArrayClass();
        this._classes['number[]'] = new NumberArrayClass();
        this._classes['object[]'] = new ObjectArrayClass();
    }

    private makeCounter(): void {
        this._counter = this._classes[this._getMixedObjType()]
            .setMixedObj(this._mixedObj).getCounter();
    }

    private _getMixedObjType(): string {
        const mixedObj = this._mixedObj;
        const isMixedObjArray = Array.isArray(mixedObj);
        return isMixedObjArray ? (typeof (<string | number | Object>mixedObj)[0]) + '[]' : typeof mixedObj;
    }

    public setMixedObj(obj: Mixed): DoFactory {
        this._mixedObj = obj;
        this.makeCounter();
        return this;
    }

    public getCounter(): COUNTER {
        return this._counter;
    }
}