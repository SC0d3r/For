import { TillValueClass } from './tillValueClass';
import { TillKeyClass } from './tillKeyClass';
import { EnteringTillFactory, Tills, TillKey, TILLS } from "./types";

export class TillFactory implements Tills{
    constructor(private mixed: EnteringTillFactory) {
    };

    getTills(): TILLS {
        let tillKey = (new TillKeyClass(this.mixed)).getTills();
        let tillValue = (new TillValueClass(this.mixed)).getTills();
        let tills : TILLS = Object.assign({} , tillKey , tillValue);
        return tills;
    }

}