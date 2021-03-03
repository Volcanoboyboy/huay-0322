#数据结构--线性数据结构

##1. 课程介绍

对于数据结构的质疑：

1. 数据结构到底是什么？
2. 为什么我从来没有用到过数据结构？
3. 在前端开发中，就算使用了数据结构和算法，对项目的提升并不大。



**千万不要把自己定位在软件开发的最表层**



学习数据结构和算法的根本原因：

1. [年薪30w＋的软件开发工程师需要掌握的技能](https://yq.aliyun.com/articles/647843)
2. 应对业务逻辑越来越多的从后端转向前端的趋势
3. 软件开发的内功，培养自己通过一定思考来解决问题的意识



**学习前提**

- JavaScript 基础

- ES6 基础

  


**本课程的主要内容**

- 什么叫做数据结构？
- 栈
- 队列
- 链表



**学习本门课程你能收获什么**？

- 了解前端中比较常见的几种数据结构
- 使用特定数据结构解决业务问题
- 大厂面试必备技能



**环境准备**

- VSCode 或者其他编辑器



## 2. 什么叫做数据结构

> 数据结构是计算机存储、**组织数据的方式**。指的是相互之间存在一种或多种特定关系的**数据元素**的集合。
>
> ​																																							-- 百度百科

可比喻成一个企业的组织结构，组织结构其实就是**部门与部门之间的关系结构**。

![4](/Volumes/Transcend/video/6-01 数据结构--线性数据结构/resource/assets/4.jpg)



数据结构就是**用来描述数据与数据之间的关系**



**线性和非线性数据结构**

线性结构：数据元素之间一对一的关系

非线性结构：数据元素之间一对多的关系



```javascript
const arr = ['a', 'b', 'c'];
```



![5](/Volumes/Transcend/video/6-01 数据结构--线性数据结构/resource/assets/5.png)



**存储方式**

顺序存储：Set、Array

散列存储：Map、Object

链式存储：链表



##3. 栈

栈是一种遵从先进后出 (LIFO) 原则的有序集合

栈的特点是只能在**某一端（只有一个口子）**添加或删除数据，遵循**先进后出**的原则

插入操作在栈中被称作入栈（push）

删除操作栈中被称作退栈（pop） 

使用场景：方法调用，作用域

![2](/Volumes/Transcend/video/6-01 数据结构--线性数据结构/resource/assets/2.png)

```javascript
class Stack {
  constructor() {
    this.stack = [];
  }
  push(item) {
    return this.stack.push(item);
  }
  pop() {
    return this.stack.pop();
  }
  peek() {
    return this.stack[this.getSize() - 1];
  }
  getSize() {
    return this.stack.length;
  }
  isEmpty() {
    return this.getSize() === 0;
  }
}
```



**栈的应用：**

> #### [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)
>
> 给定一个只包括` '('，')'`，`'{'，'}'`，`'['，']' `的字符串，判断字符串是否有效。
>
> 有效字符串需满足：
>
> 1. 左括号必须用相同类型的右括号闭合。
> 2. 左括号必须以正确的顺序闭合。
>
> 注意空字符串可被认为是有效字符串。



解题思路：

分析测试用例

1. 字符串固定

2. 成对出现

3. 闭合顺序（最后出现的括号第一个闭合） => 最先出现的括号最后一个闭合



算法原理

1. 用栈模拟括号的顺序

2. 可以创建一个对象，建立左右括号的对应关系，key 为左括号，value 为右括号



算法流程

1. 遍历字符串的每一个字符

2. 如果是左括号，入栈

3. 如果是右括号，判断栈顶的第一个元素与当前右括号是否对应？如果不对应，就返回 false

4. 遍历完之后保证栈内为空



##4. 队列

队列是一种遵从先进先出 (FIFO) 原则的有序集合

队列一个线性结构，特点是在某一端添加数据，在另一端删除数据，遵循**先进先出**的原则。

插入（insert）操作也称作入队（enqueue）

 删除（delete）操作也被称为出队（dequeue)

![3](/Volumes/Transcend/video/6-01 数据结构--线性数据结构/resource/assets/3.png)

```javascript
class Queue {
  constructor() {
    this.queue = []
  }
  enQueue(item) {
    return this.queue.push(item)
  }
  deQueue() {
    return this.queue.shift()
  }
  getHeader() {
    return this.queue[0]
  }
  getSize() {
    return this.queue.length
  }
  isEmpty() {
    return this.getSize() === 0
  }
}
```



**队列的应用：**

> #### [数据流中的移动平均值](https://leetcode-cn.com/problems/moving-average-from-data-stream/)
>
> 给定一个整数数据流和一个窗口大小，根据该滑动窗口的大小，计算其所有整数的移动平均值。
>
> 示例:
>
> ```javascript
> MovingAverage m = new MovingAverage(3);
> m.next(1) = 1
> m.next(10) = (1 + 10) / 2
> m.next(3) = (1 + 10 + 3) / 3
> m.next(5) = (10 + 3 + 5) / 3
> ```



解题思路：

分析测试用例

1. 窗口大小固定，并且为整数
2. 调用 next 添加数字并求平均值
3. 超过窗口大小，最先添加的数字优先移除（先进先出）



算法原理

1. 使用队列添加整数
2. 创建成员变量来保存计算的值



算法流程

1. 新增整数，进行入队操作
2. 累加整数并保存
3. 如果队列大小超出窗口大小，进行出队操作，并对成员变量进行减法。
4. 返回平均值



## 5. 链表

链表是一个线性结构，同时也是一个天然的递归结构。链表结构可以充分利用计算机内存空间，实现灵活的内存动态管理。



![1](/Volumes/Transcend/video/6-01 数据结构--线性数据结构/resource/assets/1.jpeg)



```javascript
class Node {
  constructor(v, next) {
    this.value = v;
    this.next = next;
  }
}
class LinkList {
  constructor() {
    // 链表长度
    this.size = 0;
    // 虚拟头部
    this.dummyNode = new Node(null, null);
  }
  find(header, index, currentIndex) {
    if (index === currentIndex) return header;
    return this.find(header.next, index, currentIndex + 1);
  }
  addNode(v, index) {
    this.checkIndex(index);
    // 当往链表末尾插入时，prev.next 为空
    // 其他情况时，因为要插入节点，所以插入的节点
    // 的 next 应该是 prev.next
    // 然后设置 prev.next 为插入的节点
    let prev = this.find(this.dummyNode, index, 0);
    prev.next = new Node(v, prev.next);
    this.size++;
    return prev.next;
  }
  insertNode(v, index) {
    return this.addNode(v, index);
  }
  addToFirst(v) {
    return this.addNode(v, 0);
  }
  addToLast(v) {
    return this.addNode(v, this.size);
  }
  removeNode(index, isLast) {
    this.checkIndex(index);
    index = isLast ? index - 1 : index;
    let prev = this.find(this.dummyNode, index, 0);
    let node = prev.next;
    prev.next = node.next;
    node.next = null;
    this.size--;
    return node;
  }
  removeFirstNode() {
    return this.removeNode(0);
  }
  removeLastNode() {
    return this.removeNode(this.size, true);
  }
  checkIndex(index) {
    if (index < 0 || index > this.size) throw Error('Index error');
  }
  getNode(index) {
    this.checkIndex(index);
    if (this.isEmpty()) return;
    return this.find(this.dummyNode, index, 0).next;
  }
  isEmpty() {
    return this.size === 0;
  }
  getSize() {
    return this.size;
  }
}
```

