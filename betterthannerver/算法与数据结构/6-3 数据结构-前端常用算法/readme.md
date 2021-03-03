# 前端常用算法

## 前端工程师为什么需要学习算法？

- 算法就好比武功的内功，内功深厚了，武力才高强。
- 能够更深刻的理解实现业务的框架，react, vue等。虚拟dom，diff等等，就使用了很多的算法思想。
- 近几年程序员就业形式越来越严峻，要求越来越高，良好的算法功底也是加分项，帮助你在面试中脱颖而出。

## 时间复杂度和空间复杂度

**算法**（Algorithm）是指用来操作数据、解决程序问题的一组方法。对于同一个问题，使用不同的算法，也许最终得到的结果是一样的，但在过程中消耗的资源和时间却会有很大的区别。那么我们应该如何去衡量不同算法之间的优劣呢？

- 时间维度：是指执行当前算法所消耗的时间，我们通常用「时间复杂度」来描述。
- 空间维度：是指执行当前算法需要占用多少内存空间，我们通常用「空间复杂度」来描述。

### 时间维度

- O(n)

```js
for(var i = 0; i < n; i++) {
    // .....
}
```

- O(logN)

```js
while(i < n) {
    i = i * 2;
  	// ...
}
```

-  O(n²)

```js
for(var i = 0; i < n; i++) {
    // .....
    for(var j = 0; j < n; j ++) {
        // ....
    }
}
```



![image-20200103104836482](assets/image-20200103104836482.png)

### 空间维度

一个典型的空间换时间的例子：

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]
```



## 第一章 排序算法

### 冒泡排序

- 时间复杂度： O(n²)
- 空间复杂度： O(1)

https://visualgo.net/zh/sorting?slide=1

```js
// 冒泡排序

var initArr = [9,8,7,6,5,4,3];

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function bubbleSort(arr) {
    var len = arr.length;

    for (let i = 0; i < len; i ++) {
        for(let j = 0; j < len - i; j ++) {
            // j + 1 可能溢出，  
            // console.log(arr[j + 1])
            if (!arr[j + 1]) {
                break;
            }
            console.log(arr[j + 1])
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
    }
    console.log(initArr)
    return initArr;
}

bubbleSort(initArr)
```



### 插入排序

- 时间复杂度： O(n²)
- 空间复杂度： O(1)

```js
function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

var initArr = [9,8,7,6,5,4,3];


// 缺点： 不停的swap影响性能
function insertSort(arr) {
    
    var len = arr.length;

    // 边界情况
    if (len < 2) {
        return arr;
    }

    for(let i = 1; i < len; i ++) {
        for (var j = i; j > 0; j --) {

            if (arr[j - 1] > arr[j]) {
                swap(arr, j , j - 1);
            }
        }
    }

    console.log(arr);
}
console.time('优化前');
insertSort(window.testArr);
console.timeEnd('优化前');
console.log(window.count);
```

#### 理论上的优化

```js
// 优化： 利用覆盖原则，只swap一次
function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

var initArr = [9, 8, 7, 6, 5, 4, 3];


function insertSort(arr) {
    var len = arr.length;

    if (arr.length < 2) {
        return arr;
    }

    for (let i = 1; i < len; i++) {
        var iIndex = i;
        var moveIndex = i - 1;
        var temp = arr[i];
        // var flag = true;
        // debugger;
        // debugger;
        if (arr[iIndex] > arr[moveIndex]) {
            continue;
        }

        //333
        for (let j = i; j > - 1; j--) {
            if (arr[j - 1] < temp) {
                arr[j] = temp;
                break;
            }

            if (!arr[j - 1]) {
                arr[j] = temp;
                break;
            }

            arr[j] = arr[j - 1];
        }

    }
    console.log(arr)
}

console.time('优化后');
insertSort(window.testArr);
console.timeEnd('优化后');
console.log(window.count);
```

### 归并排序

- 时间复杂度： O(nlogN)
- 空间复杂度： O(n)

```js
// var initArr = [9,8,7,6,5,4,3,2, 12,20,40];

// 归并排序
function mergeSort(arr) {
    var len = arr.length;
    _mergeSort(arr, 0, len - 1)
}

function _mergeSort(arr, left, right)  {
    if (left >= right) {
        return;
    }
    // debugger;
    
    var mid = parseInt((left + right) / 2);

    // console.log('left', left, 'right', right)
    _mergeSort(arr, left, mid);
    _mergeSort(arr, mid + 1, right);
    _merge(arr, left, mid, right);
}

function _merge(arr, left, mid,right) {
    
    // console.log('')

    var tempArr = [];
    var leftPoint = left;
    var rightPoint = mid + 1;

    // if (arr[leftPoint] < arr[rightPoint]) {
    //     leftPoint ++;
    // } else {
    //     rightPoint ++;
    // }
    
    // 循环为 merge的总长度
    for(var i = 0; i < right - left + 1; i ++) {
        // debugger;
        if (leftPoint > mid) {
            tempArr.push(arr[rightPoint]);
            rightPoint ++;
            continue;
        }

        if (rightPoint > right) {
            tempArr.push(arr[leftPoint]);
            leftPoint ++;
            continue;
        }

        if (arr[leftPoint] < arr[rightPoint]) {
            tempArr.push(arr[leftPoint]);
            leftPoint ++;
            continue;
        } else {
            tempArr.push(arr[rightPoint]);
            rightPoint ++;
            continue;
        }
    }

    tempArr.forEach((val, index) => {
        // console.log(i, value)
        arr[left + index] = val;
    });
    // debugger;

    // console.log(tempArr)
}

console.time('优化后');
mergeSort(window.testArr);
console.timeEnd('优化后');
// console.log(testArr)

// console.log(initArr)
```

### 快速排序

- 时间复杂度： O(nlogN)
- 空间复杂度： O(n)

```js
// 快速排序

var initArr = [9,8,7,6,5,4,3,2, 12,20,40];

function quickSort(arr) {
    
    if(arr.length === 0) {
        return []
    }

    if (arr.length === 1) {
        return arr;
    }

    var targetNum = arr[0];

    var leftArr = [];
    var rightArr = [];

    for (var i = 1; i < arr.length; i ++) {
        var num = arr[i]
        if (num < targetNum) {
            leftArr.push(num);
        } else {
            rightArr.push(num);
        }
    }

    var newArr = quickSort(leftArr).concat(targetNum, quickSort(rightArr));
    return newArr;
}

console.log(quickSort(initArr))
```

### 堆排序

- 时间复杂度： O(nlogN)
- 空间复杂度： O(n)

首先，实现一个堆

```js
class Heap {
    constructor() {
        this.data = [null];
    }

    getData() {
        console.log(this.data);
        return this.data;
    }

    insert(num) {
        this.data.push(num);

        this.shiftUp(this.data.length - 1);
    }

    extracMax() {
        if (this.data.length > 1) {
            // var resultArr = this.data.splice(1, 1);
            // debugger;
            swap(this.data, 1, this.data.length - 1);
            var result = this.data.pop();
            this.shiftDown(1);
            return result;
        }
    }

    shiftUp(currentIndex) {
        while (currentIndex > 1 && this.data[currentIndex] > this.data[parseInt(currentIndex / 2)]) {
            swap(this.data, currentIndex, parseInt(currentIndex / 2));
            currentIndex = parseInt(currentIndex / 2);
        }
    }

    shiftDown(currentIndex) {
        // debugger;
        while (this.data[currentIndex * 2] > this.data[currentIndex] || this.data[currentIndex * 2 + 1] > this.data[currentIndex]) {
            if (this.data[currentIndex * 2] < this.data[currentIndex * 2 + 1]) {
                swap(this.data, currentIndex * 2 + 1, currentIndex);
                currentIndex = currentIndex * 2 + 1;
            } else {
                swap(this.data, currentIndex * 2, currentIndex);
                currentIndex = currentIndex * 2;
            }
        }
    }
};
```



接下来进行排序

```js
var initArr = [9, 8, 7, 6, 5, 4, 3, 2, 1];  // 测试数据

function heapSort() {
    var heapData = new Heap();
    var resultArr = [];
    initArr.forEach((val, index) => {
        heapData.insert(val);
    });

    // console.log(heapData.getData())
    // debugger;
    for (var i = 0; i < initArr.length; i++) {
        // debugger;
        var result = heapData.extracMax();

        resultArr.unshift(result);
    }
    console.log(resultArr);
    return resultArr;
}

heapSort(initArr);
```

# 第二章 动态规划

## 斐波那契数列

**斐波那契数列**指的是这样一个数列 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233，377，610，987，1597，2584，4181，6765，10946，17711，28657，46368........

斐波那契数列：1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...

如果设F(n）为该数列的第n项（n∈N*），那么这句话可以写成如下形式：:F(n)=F(n-1)+F(n-2)

显然这是一个线性[递推数列](https://baike.baidu.com/item/递推数列/9140424)。



- 时间复杂度 O(2 ^ n)

```js
function fibo(n) {
    if(n === 0) {
        return 0;
    }

    if(n === 1) {
        return 1;
    }

    return fibo(n - 1) + fibo(n - 2)
}
```



- 时间复杂度 O(n)

递归的思想，**自上向下**的解决问题

```js
function fibo2(n) {
    if(n === 0) {
        return 0;
    }

    if(n === 1) {
        return 1;
    }

    if (memo[n]) {
        return memo[n];
    }

    return memo[n] = fibo2(n - 1) + fibo2(n - 2)
}
```



**动态规划核心：**

**将原问题拆解成若干子问题，同时保存子问题的答案，使得每个子问题只求解一次，最终得到原问题的答案。**

**自下向上解决问题**。

- 使用动态规划的思想

时间复杂度 O(n)

```js
var memo = {};

function fibo(n) {
    memo[0] = 0;
    memo[1] = 1;
    // debugger
    for (var i = 2; i <= n; i++) {
        memo[i] = memo[i - 1] + memo[i - 2];
    }
    // debugger
    return memo[n];
}

console.log(fibo(20))
```



### 真题

#### 爬楼梯

假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**注意：**给定 *n* 是一个正整数。

**示例 1：**

```
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

**示例 2：**

```
输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

答案：

```js
var memo = {};

function step(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    if(!memo[n]) {
        memo[n] = step(n - 1) + step(n - 2);
    }
    return memo[n];
}


```

动态规划：

```js
// 动态规划
// 自下 而上  

var memo = {};

function fibo(n) {
    // 递推
    // debugger;
    memo[0] = 1;
    memo[1] = 1;

    for(var i = 2; i <= n; i++) {
        memo[i] = memo[i - 2] + memo[i - 1];
    }

    return memo[n];
}

console.time('1');
console.log(fibo(40))
console.timeEnd('1');
```



#### 整数拆分

给定一个正整数 *n*，将其拆分为**至少**两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

**示例 1:**

```
输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
```

**示例 2:**

```
输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
```

**说明:** 你可以假设 *n* 不小于 2 且不大于 58。

答案：

```js
function intBreak(n) {
    if(n === 1) {
        return 1;
    }

    var res = -1;
    for(var i = 1; i <= n - 1; i ++) {
        res = Math.max(res, i * (n - i), i * intBreak(n - 1));
    }

    return res;
}
```

使用动态规划的解法：

```js
var memo = {};
function intBreak_dynamic (n) {
    memo[1] = 1;

    for(var i = 2; i <= n; i ++ ) {
        for(var j = 1; j <= i - 1; j ++) {
            memo[i] = Math.max(memo[i], j * (i - j), j * memo(i - j));
        }
    }

    return memo[n];
}
```

## 递归与回溯

### 电话号码的字母组合

给定一个仅包含数字 `2-9` 的字符串，返回所有它能表示的字母组合。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

![image-20200118195145082](assets/image-20200118195145082.png)

**示例:**

```
输入："23"
输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

```js
var arr = [];

var data = {
  "2": "abc",
  "3": "def",
  "4": "ghi",
  "5": "jkl",
  "6": "mno",
  "7": "pqrs",
  "8": "tuv",
  "9": "wxyz"
}

function combile(digits, index, res) {
  if (index > digits.length - 1) {
    arr.push(res);
    return;
  }

  var letterStr = data[digits[index] + ''];
  for (var i = 0; i < letterStr.length; i++) {
    combile(digits, index + 1, res + letterStr[i]);
  }
  // debugger; 

  console.log(res)
}

var letterCombinations = function (digits) {
  combile(digits, 0, '');
};

letterCombinations('29');

console.log(arr)
```

