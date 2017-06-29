import { Return, RETSUM } from './types';
export class ReturnSumClass implements Return {

    constructor(private vals: string[] | number[]) { }
    getReturn(): RETSUM {
        let vals = this.vals;
        const length = vals.length;
        let self = this;
        return {
            returnSum : () => {
                let sum : any = self.createAccordingToTypeSum();
                for (let i = 0; i < length; i++) {
                    sum += vals[i];
                }
                return sum;
            }
        }
    }

    private createAccordingToTypeSum() : 0 | ''{
        switch (typeof this.vals[0]) {
            case 'number':
                return 0;
            case 'string':
                return '';
            default:
                throw new Error('not a valid type to calculate sum');
        }
    }

}