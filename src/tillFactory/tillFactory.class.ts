import { TillValueClass } from './tillValueClass';
import { TillKeyClass } from './tillKeyClass';

import { Tills, EnteringTillFactory, TILLS } from "../interfaces/types";


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