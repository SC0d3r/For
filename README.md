# For

## In A Nutshell 

an npm package for easing the `iterations` over objs , strings , ...

## my Goals
- single entry point
- one syntax
- cover all types


## Installation
using `npm`
```
$ npm i --save for-ease
```

### in  *vanilla javascript*
```javascript
const For = require('for-ease');

```

### in  Typescript
```javascript
import For = require('for-ease');
```

# Examples

## `do` method :

##### Recieves a `number` and passes the current `index` to the callback
```javascript
function job(index){console.log(index);}

For(5).do(job);// output : 0,1,2,3,4
```

##### Recieves an array of `numbers` or `strings` or `objects` and passes (`index`, `CurrentElement` , `CopyOfArray`) to the callback

```javascript
For([2, 3]).do((index : number, currentElement: number, copyOfArr: number[]) => {
    // Your Code
});
```

##### Recieves a `string` and passes (`index` , `currentCharacter` , `stringItself`) to the callback

```javascript
For('godSake').do((index: number, char: string, str: string) => {
    // Your Code
});
```

##### Recieves an `obj` and passes (`key` , `value`) to the callback

```javascript
let obj = {
    name: 'god',
    lastName: 'sake'
};
For(obj).do((key: string, value: string) => {
    // Your Code
});
```
##### Recieves a `function` and calls that function till it returns `falsy` and passes the `return` of that function to the callback

```javascript
function reverser(array: string[]) {
    return function () {
        return array.pop();
    }
}

let func = reverser(['god', 'sake']);
let result: string = '';

For(func).do((returns: string) => {
    result += returns;
});
// result will be : 'sakegod'

//or get the return array

let result = For(func).do(x => x).returns;
// result is ['sake','god'] 

// dont forget that the callback function must return its argument
// otherwise the .returns give empty array
```

## `returnSum` method :

##### Recieves an array of `numbers` or `strings` and return `sum` of array items

```javascript
const result = For([1, 2, 3]).returnSum();
//result is 6
```

## `returnUniq` method :

##### Recieves an array of `numbers` and returns just the `unique` ones

```javascript
const result = For([1,2,3,1]).returnUniq();
// result is [1,2,3];
```

## `returnSorted` method :

##### Recieves an array and returns `sorted` array **(`Does not affect the original array`)**

```javascript
const originalArr = [1,2,-1];
const result = For(originalArr).returnSorted();
// result is [-1,1,2];
// originalArr still is [1,2,-1]
```

## `tillKey` method :

##### Recieves a condition and returns `elements` till condition is true (`key` is `index` in array not the `elements`)

#### Conditions

##### `<=`

```javascript
let sum = 0;
For([1, 2, 3, 4]).tillKey('<= 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
//sum is 6
```
##### `>=`
```javascript
let sum = 0;
For([1, 2, 3, 4]).tillKey('>= 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
//sum is 7
```
##### `<`
```javascript
let sum = 0;
For([1, 2, 3, 4]).tillKey('< 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
// sum is 3
```

##### `>`

```javascript
let sum = 0;
For([1, 2, 3, 4]).tillKey('> 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
//sum is 4
```

##### `=`

```javascript
let sum = 0;
For([1, 2, 3, 4]).tillKey('= 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
// sum is 3
```

#### With `strings`

```javascript
let sum = '';
For(['1', '2', '3', '5']).tillKey('>= 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
// sum is '35'
```
##### With `Objects`

```javascript
let sum = '';
let arr = [{ name: 'batman' }, { name: 'superman' }];

For(arr).tillKey('= 1').do((index: number, val: { name: string }, arr: number[]) => {

    sum += val.name;

});
//sum is 'superman' 
```

##### returns the result of `condition` with `.returns` 

```javascript
let result = For([0,1,2,3]).tillKey('<= 2').returns;
//result is [0,1,2]
```


## `tillValue` method :

##### Recieves a condition and returns `elements` till condition is true 

##### `Note` : condtions as above

##### usage : 

```javascript
let sum = 0;
For([1, 2, 3, 4]).tillValue('<= 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
//sum is 3


let sum = 0;
For([1, 2, 3, 4]).tillValue('= 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
//sum is 2
```

##### With `Strings`

```javascript
let sum = '';
For(['1', '2', '3', '5']).tillValue('>= 2').do((index: number, val: number, arr: number[]) => {
    sum += val;
});
//sum is '235'
```

##### `Special Case : ` Objects
##### for object you have to add the key to the condition

```javascript
let sum = 0;
let arr = [{ name: 'batman', age: 34 }, { name: 'superman', age: 22 }, { name: 'flash', age: 18 }];

For(arr).tillValue('age > 19').do((index: number, val: { name: string, age: number }, arr: number[]) => {
    sum += val.age;
});
//sum is 56 

```
##### returns the result of `condition` with `.returns`

```javascript
let result = For([1,2,3,4,5]).tillValue('<= 2').returns;
//result is [1,2]
```

## `.returns` getter

```javascript
let result = For(3).do().returns;
//or do this
let sameResult = For(3).returns;
//result is [0,1,2] like sameResult

let originalArray = [2,3,4];
let copyOfArray = For(originalArray).do().returns;
// or do this
let copyOfArray = For(originalArray).returns;
```

##### `Note :` if the callback `returns` sth it will be placed in the result array (but not changing the original array)

```javascript
let originalArr = [1, 2, 3];
let result = For(originalArr).do(() => 2).returns;
// originalArr is [1,2,3]
//result is [2,2,2];
```

##### Returns an array of [key,value] pairs of an object

```javascript
let obj = { name: 'superman', age: 34, phone: 34234 };

let result = For(obj).do().returns;

// or just do this

let result = For(obj).returns;
// either way result will be [['name', 'superman'], ['age', 34], ['phone', 34234]]
```

##### Returns indexes if we give `For` only a `number`

```javascript
let result = For(4).do().returns;

// or just this

let result = For(4).returns;

//either way result will be [0,1,2,3]
```

##### Can be used to create an array of predefined size

```javascript
let result = For(3).do(() => 0).returns;
//result is [0,0,0]
```

##### Can be used to return the result of passed function

```javascript
function reverser(array: string[]) {
    return function () {
        return array.pop();
    }
}

let f = reverser(['god', 'sake']);
let result:any[] = [];

result = For(f).do((ret => ret)).returns;
//result is ['sake','god']
```

## `assign` Method

##### Recieves an array and assigns the result to it (**not** `modifying` the `original` array)

```javascript
let originalArray = [1, 2, 3, 4];
let resultArray: any[] = [];

For(originalArray).do(() => 2).assign(resultArray);
//resultArr is [2 , 2 ,2 , 2] cause in this example the callback function always returns 2  
```

## `append` Method

##### Recieves an array and appends the result to end of it (**not** `modifying` the `original` array)

```javascript
const originalArray = [1, 2, 3, 4];
let resultArray: any[] = [56, 87];

For(originalArray).do(x => x + 1).append(resultArray);
//resultArray is [56, 87, 2, 3, 4, 5]
```

## `prepend` Method 

##### Recieves an array and prepends the result in front of it(**not** `modifying` the `original` array)

```javascript
let originalArray = [1, 2, 3, 4];
let resultArray: any[] = [56, 87];

For(originalArray).do(x => x * x).prepend(resultArray);
//resultArray is [1, 4, 9, 16, 56, 87]
```





#

[**source code on github**](https://github.com/SC0d3r/For)



