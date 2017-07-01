import For = require("../for");

describe('For : ', () => {
    describe('.do : ', () => {

        it('should recieve a number and pass the (counter start from zero to that number) to a callback', () => {
            let number = 0;
            For(5).do((x: number) => {
                number += x;
            });
            expect(number).toBe(0 + 1 + 2 + 3 + 4);
        });

        it('should recieve an array of numbers and pass ( index , currentElement , CopyOfArray) to callback', () => {
            let sum = 0;
            let indexSum = 0;
            For([2, 3]).do((i: number, x: number, arr: number[]) => {
                sum += x;
                indexSum += i;
            });
            expect(sum).toBe(5);
            expect(indexSum).toBe(1);
        });

        it('should recieve a string and pass (index , currentCharacter , stringItself) to callback', () => {
            let result = '';
            let wholeStr: string = '';
            let indexSum: number = 0;
            For('godSake').do((index: number, char: string, str: string) => {
                result += char;
                wholeStr = str;
                indexSum += index;
            });
            expect(result).toBe('godSake');
            expect(wholeStr).toBe('godSake');
            expect(indexSum).toBe(21);
        });


        it('should recieve an array of strings and pass (index , currentElement  , CopyOfArray) to callback', () => {
            let sum = '';
            let indexSum = 0;
            For(['god', 'sake']).do((i: number, x: string, arr: string[]) => {
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

        it('should recieve an array of objs and pass (key , value) to the callback', () => {
            let arr = [{ name: 'god' }, { name: 'sake' }];
            let fullName: string = '';
            For(arr).do((key: string, value: { name: string }) => {
                fullName += value.name;
            });

            expect(fullName).toBe('godsake');
        });

        it('should recieve a function and call that function till it return falsy and pass the return of that function to callback', () => {
            function reverser(array: string[]) {
                return function () {
                    return array.pop();
                }
            }
            let f = reverser(['god', 'sake']);
            let result: string = '';
            For(f).do((returns: string) => {
                result += returns;
            });

            expect(result).toBe('sakegod');
        });
    });


    describe('.returnSum', () => {
        it('should recieve an array of numbers and return sum of the items of array', () => {
            const a = [1, 2, 3];
            const result = For(a).returnSum();
            expect(result).toBe(6);
        });

        it('should recieve an array of strings and return sum of the items of array', () => {
            const a = ['1', '2', '3'];
            const result = For(a).returnSum();
            expect(result).toBe('123');
        });
    });

    describe('.returnUniq', () => {
        it('should recieve an array of numbers and return just unique ones', () => {
            const a = [1, 2, 3, 2, 1, 45, 6];
            const result = For(a).returnUniq();
            expect(result).toEqual([1, 2, 3, 45, 6]);
        });
    });


    describe('.returnSorted ', () => {
        it('should recieve an array and return sorted array', () => {
            const a = [1, 2, 45, 67, 3, -1, 3];
            const result = For(a).returnSorted();
            expect(result).toEqual([-1, 1, 2, 3, 3, 45, 67]);
        });
        it('should not change the current array', () => {
            const a = [1, 2, 45, 67, 3, -1, 3];
            const result = For(a).returnSorted();
            expect(a).toEqual([1, 2, 45, 67, 3, -1, 3]);
        });
    });


    describe('.tillKey', () => {
        it('should recieve a condition and return till condtion <= is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillKey('<= 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(6);
        });

        it('should recieve a condition and return till condtion >= is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillKey('>= 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(7);
        });

        it('should recieve a condition and return till condtion < is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillKey('< 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(3);
        });

        it('should recieve a condition and return till condtion > is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillKey('> 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(4);
        });

        it('should recieve a condition and return till condtion = is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillKey('= 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(3);
        });

        it('should recieve array of string and do the same ', () => {
            let sum = '';
            For(['1', '2', '3', '5']).tillKey('>= 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe('35');
        });


        it('should recieve a condition and return till condtion = is true for objs', () => {
            let sum = '';
            let arr = [{ name: 'sasan' }, { name: 'godsake' }];
            For(arr).tillKey('= 1').do((index: number, val: { name: string }, arr: number[]) => {
                console.log(index, val);
                sum += val.name;
            });
            expect(sum).toBe('godsake');
        });

        it('should throw if the condition is wrong', () => {
            let sum = '';
            function a() {
                For([2, 4]).tillKey('><= 2').do((index: number, val: number, arr: number[]) => {
                    sum += val;
                });

            }
            expect(a).toThrow();
        });

        it('can be used to get the elements that they have met the condition with returns ',() => {
            let a = For(4).do().returns;
            let res = For(a).tillKey('<= 2').returns;
            expect(res).toEqual([0 , 1, 2]);
            
        })
    });

    // ---- tillValue

    describe('.tillValue', () => {
        it('should recieve a condition and return till condtion <= is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillValue('<= 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(3);
        });

        it('should recieve a condition and return till condtion >= is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillValue('>= 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(9);
        });

        it('should recieve a condition and return till condtion < is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillValue('< 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(1);
        });

        it('should recieve a condition and return till condtion > is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillValue('> 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(7);
        });

        it('should recieve a condition and return till condtion = is true', () => {
            let sum = 0;
            For([1, 2, 3, 4]).tillValue('= 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe(2);
        });

        it('should recieve array of strings and do the same ', () => {
            let sum = '';
            For(['1', '2', '3', '5']).tillValue('>= 2').do((index: number, val: number, arr: number[]) => {
                sum += val;
            });
            expect(sum).toBe('235');
        });


        it('should recieve a condition and return till condtion = is true for objs', () => {
            let sum = 0;
            let arr = [{ name: 'sasan', age: 34 }, { name: 'godsake', age: 22 }, { name: 'humam', age: 18 }];
            For(arr).tillValue('age > 19').do((index: number, val: { name: string, age: number }, arr: number[]) => {
                // console.log(index, val);
                sum += val.age;
            });
            expect(sum).toBe(56);
        });

        it('should throw if the condition is wrong', () => {
            let sum = '';
            function a() {
                For([2, 4]).tillValue('><= 2').do((index: number, val: number, arr: number[]) => {
                    sum += val;
                });

            }
            expect(a).toThrow();
        });

        it('cann be used to get the elements that they have met the condition with returns ',() => {
            let a = For(10).do().returns;
            let res = For(a).tillValue('<= 2').returns;
            expect(res).toEqual([0 , 1, 2]);
            
        })
    });

    describe('.do().returns', () => {
        it('should return a copy of original array', () => {
            let a = [1, 2, 3, 4, 5];
            let newA = For(a).do().returns;
            expect(a).toEqual(newA);
        });

        it('should modify the array with return of callback function', () => {
            let originalArr = [1, 2, 3];
            let result = For(originalArr).do(() => 2).returns;
            expect(originalArr).toEqual([1, 2, 3]);
            expect(result).toEqual([2, 2, 2]);
        });

        it('should return an array of key value pairs of an object', () => {
            let a = { name: 'asd', age: 34, phone: 34234 };
            let result = For(a).do().returns;
            expect(result).toEqual([['name', 'asd'], ['age', 34], ['phone', 34234]]);
        });

        it('should give indexes if you pass only a number to For', () => {
            let result = For(4).do().returns;
            expect(result).toEqual([0, 1, 2, 3]);
        })

        it('can be used to create an array of pre defined size', () => {
            let result = For(5).do(() => 0).returns;
            expect(result).toEqual([0, 0, 0, 0, 0]);
        })

        it('should recieve a function and call that function till it return falsy and pass the return of that function to do', () => {
            function reverser(array: string[]) {
                return function () {
                    return array.pop();
                }
            }

            let f = reverser(['god', 'sake']);
            let result:any[] = [];
            result = For(f).do((ret => ret)).returns;

            expect(result).toEqual(['sake', 'god']);
        });
    });

    describe('.do().assign', () => {
        it('should recieve an array and assign the result to it', () => {
            let originalArray = [1, 2, 3, 4];
            let resultArray: any[] = [];
            For(originalArray).do(() => 2).assign(resultArray);

            expect(resultArray).toEqual([2, 2, 2, 2]);
        });
    });

    describe('.do().append', () => {
        it('should recieve an array and append the result to end of it', () => {
            let originalArray = [1, 2, 3, 4];
            let resultArray: any[] = [56, 87];
            For(originalArray).do(() => 2).append(resultArray);

            expect(resultArray).toEqual([56, 87, 2, 2, 2, 2]);
        });
    });


    describe('.do().prepend', () => {
        it('should recieve an array and prepend the result in front of it', () => {
            let originalArray = [1, 2, 3, 4];
            let resultArray: any[] = [56, 87];
            For(originalArray).do(() => 2).prepend(resultArray);

            expect(resultArray).toEqual([2, 2, 2, 2, 56, 87]);
        });
    });
});