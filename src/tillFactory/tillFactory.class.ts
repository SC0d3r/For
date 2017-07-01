import { TillValueClass } from './tillValueClass';
import { TillKeyClass } from './tillKeyClass';

import { Tills, EnteringTillFactory, TILLS } from "../interfaces/types";


export class TillFactory implements Tills {
    private tills : TILLS;
    constructor(private mixed ?: EnteringTillFactory) {
        mixed ? this.createTills() : '';
    };

    getTills(): TILLS {
        return this.tills;
    }


    public setMixedObj(mixed: EnteringTillFactory) : TillFactory {
        this.mixed = mixed;
        this.createTills();
        return this;
    }

    private createTills(){
        let tillKey = (new TillKeyClass(<EnteringTillFactory>this.mixed)).getTills();
        let tillValue = (new TillValueClass(<EnteringTillFactory>this.mixed)).getTills();
        let tills: TILLS = Object.assign({}, tillKey, tillValue);
        this.tills = tills;
    }
}