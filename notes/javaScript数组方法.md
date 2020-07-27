# **JavaScript 数组方法**
**1,Array.isArray() 用于确定传递的值是否是一个 Array。**  
>
```
Array.isArray([1, 2, 3]);  
// true
Array.isArray({foo: 123}); 
// false
Array.isArray("foobar");   
// false
Array.isArray(undefined);  
// false
```
>
----
**2，Array.from() 方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例。**
>**Array.from() 可以通过以下方式来创建数组对象：**  
. 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）  
. 可迭代对象（可以获取对象中的元素,如 Map和 Set 等）  
>>**`从String生成数组`**  
>>Array.from('array') //output：['a','r','r','a','y',]  
>>**`从Set生成数组(可用于数组去重)`**  
>>let set = new  Set(['app','ban','app','appear'])  
>>Array.from(set) // output: ['app','ban','appear']  
>>**`从Map生成数组`**  
>>let map = new Map([[1,2],[2,3],[3,4]])  
>>Array.from(map) // output:[[1,2],[2,3],[3,4]]  
>>  
>>let mapper = new Map([['1','a'],['2','b']])  
>>Array.from(mapper.values())   //['a','b']
>>
>>let mapper = new Map([['1','a'],['2','b']])  
>>Array.from(mapper.keys())  //['1','2']
----
**3,Array.of() 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。**
```
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```
---
**4,Array.concat() 方法用于合并两个或多个数组。不更改现有数组，返回新数组。**  
```
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
// output: ["a", "b", "c", "d", "e", "f"]
```
---
**5,Array.copyWithin(target,start,end) 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。**
```
target
0 为基底的索引，复制序列到该位置。如果是负数，target 将从末尾开始计算。
如果 target 大于等于 arr.length，将会不发生拷贝。如果 target 在 start 之后，复制的序列将被修改以符合 arr.length。
const array1 = ['a', 'b', 'c', 'd', 'e'];
start
0 为基底的索引，开始复制元素的起始位置。如果是负数，start 将从末尾开始计算。
如果 start 被忽略，copyWithin 将会从0开始复制
end
0 为基底的索引，开始复制元素的结束位置。copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数， end 将从末尾开始计算。

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// expected output: Array ["d", "b", "c", "d", "e"]

// copy to index 1 all elements from index 3 to the end
console.log(array1.copyWithin(1, 3));
// expected output: Array ["d", "d", "e", "d", "e"]
```
---
**6，Array.every()方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。**

```
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```
---
**7，Array.fill(value,start,end)方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。**
```
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(10, 2, 4));
// output: [1, 2, 10, 10]

// fill with 5 from position 1
console.log(array1.fill(5, 1));
// output: [1, 5, 5, 5]

console.log(array1.fill(6));
// output: [6, 6, 6, 6]
```
---
**8，Array.filter(callback(element,index,array))方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。**
```
function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44] 
```
---
**9，Array.find(callback(element,index,array))方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。**
```
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);
// expected output: 12
```
---
**10，Array.findIndex(callback(element,index,array))方法返回数组中满足提供的测试函数的第一个元素的索引。否则返回-1**
```
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```
---
**11，Array.includes(valueToFind，fromIndex)方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。**
```
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true

const pets = ['cat', 'dog', 'bat'];

console.log(pets.includes('at'));
// expected output: false
```
---
**12，Array.indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1**
```
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1
```
---
**13，flat() 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。**
```
var arr1 = [1, 2, [3, 4]];
arr1.flat(); 
// [1, 2, 3, 4]

var arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat();
// [1, 2, 3, 4, [5, 6]]

var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

```
**14，flatMap() 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为1的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。**
```
**map() 与 flatMap()**
var arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// only one level is flattened
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]

```
---
**15，Array.forEach(callback(element,index,array))方法对数组的每个元素执行一次提供的函数。不会改变原数组,没办法中止或者跳出forEach循环**
```
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"
```
---
**16，Array.join()方法将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。**
```
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(''));
// expected output: "FireAirWater"

console.log(elements.join('-'));
// expected output: "Fire-Air-Water"
```
---
**17，Array.keys()方法返回一个包含数组中每个索引键的Array Iterator对象**
```
const array1 = ['a', 'b', 'c'];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// expected output: 0
// expected output: 1
// expected output: 2
```
---
**18，Array.lastIndexOf()方法返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。**
```
const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo'];

console.log(animals.lastIndexOf('Dodo'));
// expected output: 3

console.log(animals.lastIndexOf('Tiger'));
// expected output: 1
```
---
**19， Array.map()方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。**
```
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```
---
**20，Array.pop()方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。**
```
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];

console.log(plants.pop());
// expected output: "tomato"

console.log(plants);
// expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
```
---
**21， Array.push()方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度**
```
const animals = ['pigs', 'goats', 'sheep'];

const count = animals.push('cows');
console.log(count);
// expected output: 4
console.log(animals);
// expected output: Array ["pigs", "goats", "sheep", "cows"]
```
---
**22，Array.reduce()方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。**
```
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
// expected output: 10

// 5 + 1 + 2 + 3 + 4
console.log(array1.reduce(reducer, 5));
// expected output: 15
```
---
**23,Array.reverse()方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。**
```
const array1 = ['one', 'two', 'three'];
console.log('array1:', array1);
// expected output: "array1:" Array ["one", "two", "three"]

const reversed = array1.reverse();
console.log('reversed:', reversed);
// expected output: "reversed:" Array ["three", "two", "one"]
```
---
**24,Array.shift()方法从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度。**
```
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// expected output: Array [2, 3]

console.log(firstElement);
// expected output: 1
```
---
**25，Array.slice()方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变。**
```
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// expected output: Array ["bison", "camel", "duck", "elephant"]
```
---
**26，Array.splice(start,deleteCount,item1,item2,...)方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。**
```
deleteCount|可选
整数，表示要移除的数组元素的个数。
如果 deleteCount 大于 start 之后的元素的总数，则从 start 后面的元素都将被删除（含第 start 位）。
如果 deleteCount 被省略了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
如果 deleteCount 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]

myFish.splice(2, 0, "drum");//从第 2 位开始删除 0 个元素，插入“drum”
myFish.splice(3, 1); //从第 3 位开始删除 1 个元素
myFish.splice(2, 1, "trumpet") //从第 2 位开始删除 1 个元素，插入“trumpet”
myFish.splice(-2, 1);//从倒数第 2 位开始删除 1 个元素
myFish.splice(2);//从第 2 位开始删除所有元素
```
---

**27,Array.some()方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值,返回true就会终止迭代**
```
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// expected output: true
```
---
**28，Array.toString()返回一个字符串，表示指定的数组及其元素。**
```
const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```
---
**29，Array.unshift()方法将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。**
```
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// expected output: 5

console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]
```