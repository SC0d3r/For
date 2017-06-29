import { For } from "./for";

describe('For : ', () => {
    describe('.do : ', () => {

        it('should recieve a number and pass the (counter start from zero to that number) to a callback', () => {
            let number = 0;
            For(5).do((x: number) => {
                number += x;
            });
            expect(number).toBe(0 + 1 + 2 + 3 + 4);
        });

        it('should recieve an array of numbers and pass (currentElement , index , CopyOfArray) to callback', () => {
            let sum = 0;
            let indexSum = 0;
            For([2, 3]).do((x: number, i: number, arr: number[]) => {
                sum += x;
                indexSum += i;
            });
            expect(sum).toBe(5);
            expect(indexSum).toBe(1);
        });

        it('should recieve a string and pass (currentCharacter , index , stringItself) to callback', () => {
            let result = '';
            let wholeStr: string = '';
            let indexSum: number = 0;
            For('godSake').do((char: string, index: number, str: string) => {
                result += char;
                wholeStr = str;
                indexSum += index;
            });
            expect(result).toBe('godSake');
            expect(wholeStr).toBe('godSake');
            expect(indexSum).toBe(21);
        });


        it('should recieve an array of strings and pass (currentElement , index , CopyOfArray) to callback', () => {
            let sum = '';
            let indexSum = 0;
            For(['god', 'sake']).do((x: string, i: number, arr: string[]) => {
                sum += x;
                indexSum += i;
            });
            expect(sum).toBe('godsake');
            expect(indexSum).toBe(1);
        });

        it('should recieve an obj and pass (key , value) to the callback', () => {
            let obj = {
                name: 'god',
                lastName: 'sake'
            };
            let fullName: string = '';
            For(obj).do((key: string, value: string) => {
                fullName += value;
            });

            expect(fullName).toBe('godsake');
        });

        it('should recieve a function and call that function till it return falsy and pass the return of that function to do', () => {
            function gen(array: string[]) {
                return function () {
                    return array.pop();
                }
            }
            let f = gen(['god', 'sake']);
            let result: string = '';
            For(f).do((returns: string) => {
                result += returns;
            });

            expect(result).toBe('sakegod');
        });
    });
    describe('.returnSum',() => {
        it('should recieve an array and return sum of the items of array',() => {
            const a = [1,2,3];
            const result = For(a).returnSum();
            expect(result).toBe(34);
        });
    });

});