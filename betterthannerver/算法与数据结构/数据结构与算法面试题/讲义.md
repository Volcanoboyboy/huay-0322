# 算法与数据结构面试题

## 第1章 课程简介

### 1-1 课程简介

特别对于前端工程师来说，数据结构和算法的能力更像我们的**内功**，不是显而易见的。

什么时候需要展示？就是面试的时候！

所以我们特意准备了数据结构与算法相关的面试题，以帮助大家更好的展示自己的能力。

切记：题目不是关键。关键是**理解算法的原理**和**手写代码的能力**！



**课程内容：**

1. 线性结构算法题
2. 非线性结构算法题
3. 综合算法题



**面向群体**：

1. 有一定 JavaScript 基础的同学
2. 对数据结构和和算法有一定了解
4. 最好熟悉 typescript，但不必须




最后再次强调：

+ 理解算法原理需要反复琢磨

+ 手写代码能力需要反复练习



### 1-2 环境准备

**问题：**

后续我们会一起做一些题目，但是如何证明我们的解决方案是可行的？

**分析：**

单元测试是一个不错的工具。

我们借助与 [jest](https://jestjs.io/) 搭建一个简单支持 typescript 的单元测试工具。



前置工具：

+  [nodejs](https://nodejs.org/zh-cn/) 环境，最好是最新版或10.0以上版本

+ 编辑器 推荐 [vscode](https://code.visualstudio.com/)

+ git-bash 或其他命令行工具

+ 推荐 包管理工具 [yarn](https://yarnpkg.com/en/docs/install)

  

jest 测试环境搭建：

```shell
# 安装依赖
yarn global add jest  #npm install jest --global
yarn add jest @types/jest --dev#npm install jest @types/jest --dev
yarn add --dev babel-jest @babel/core @babel/preset-env #npm install babel-jest @babel/core @babel/preset-env --dev
yarn add --dev @babel/preset-typescript #npm install @babel/preset-typescript --dev

# 添加 babel 配置
#// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {targets: {node: 'current'}}],
    '@babel/preset-typescript',
  ],
};

# 配置 jest 命令
#// package.json
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watchAll"
  },

```



**步骤：**

1. 创建项目文件
2. 初始化项目
3. 安装依赖
4. 添加 babel 配置
5. 配置 package.json
6. 测试

> 另外一个安装方式 直接克隆这个项目 https://github.com/itcast-wh/jest-typescript-tester/tree/init



## 第2章 线性结构算法题

### 2-1 括号匹配问题-读题

**题目：**

来源：[LeetCode](https://leetcode-cn.com/problems/valid-parentheses)

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。



**示例：**

示例 1:

输入: "()"
输出: true

示例 2:

输入: "()[]{}"
输出: true

示例 3:

输入: "(]"
输出: false

示例 4:

输入: "([)]"
输出: false

示例 5:

输入: "{[]}"
输出: true

示例 6:

输入: "{"
输出: false



**准备用例：**

1. 创建文件 isBracketsValid.ts
2. 实现函数的主体结构
3. 创建文件 isBracketsValid.test.ts
4. 实现测试用例1



###  2-2 括号匹配问题-解题

**题目：**

给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

**分析：**

借助**栈**的结构来解决！

```flow
st=>start: 开始
e=>end: 结束
op1=>operation: 将字符串拆分为数组(可省略)
op2=>operation: 取出一个元素 item
op3=>operation: 取出栈顶元素 stackItem
cond1=>condition: item 与 stackItem 匹配
op4=>operation: stackItem 出栈
op5=>operation: item 入栈
cond2=>condition: 遍历完所有元素


st->op1->op2->op3->cond1
cond1(yes)->op4->cond2
cond1(no)->op5->cond2
cond2(no)->op2
cond2(yes)->e


```

验证：

输入: “ "

栈：

输出: true



示例 2:

输入: “”

栈：

栈：输出: true



示例 3:

输入: "”

栈：(]

栈：输出: false



**操作：**

1. 准备
   1. 将字符串拆分成数组
   2. 创建一个空的 栈
   3. 创建括号匹配规则
   4. 创建获取栈顶元素的方法
2. 核心逻辑
   1. 逐个将栈顶元素和数组中的元素匹配
   2. 根据匹配结果执行不同的操作
   3. 检查 栈是否为空。
3. 测试
4. 优化



### 2-3 使用栈实现队列-读题

**题目：**

来源：[LeetCode](https://leetcode-cn.com/problems/implement-queue-using-stacks/)

使用栈实现队列的下列操作：

push(x) -- 将一个元素放入队列的尾部。
pop() -- 从队列首部移除元素。
peek() -- 返回队列首部的元素。
empty() -- 返回队列是否为空。



**示例:**

```js
MyQueue queue = new MyQueue();
queue.push(10);
queue.push(11);  
queue.peek();  // 返回 10
queue.pop();   // 返回 10
queue.empty(); // 返回 false
queue.pop();   // 返回 11
queue.empty(); // 返回 true
```



**说明:**

你只能使用标准的栈操作 -- 也就是只有 push to top, peek/pop from top, size, 和  empty 操作是合法的。
你所使用的语言也许不支持栈。你可以使用 list 或者 deque（双端队列）来模拟一个栈，只要是标准的栈操作即可。
假设所有操作都是有效的 （例如，一个空的队列不会调用 pop 或者 peek 操作）。



**步骤：**

1. 实现一个标准栈

2. 实现一个标准队列

3. 使用栈实现队列

   

### 2-4 使用栈实现队列-实现一个标准栈

**问题：**

实现一个标准栈

**分析：**

标准栈方法

+ empty

+ size

+ peak

+ push

+ pop

  

测试用例

```ts
  const stack = new Stack();
  expect(stack.empty()).toBe(true);

  stack.push(10);
  expect(stack.empty()).toBe(false);
  expect(stack.size()).toBe(1);
  expect(stack.peak()).toBe(10);
  expect(stack.size()).toBe(1);

  stack.push(11);
  expect(stack.empty()).toBe(false);
  expect(stack.size()).toBe(2);
  expect(stack.peak()).toBe(11);
  expect(stack.size()).toBe(2);

  expect(stack.pop()).toBe(11);
  expect(stack.empty()).toBe(false);
  expect(stack.size()).toBe(1);
  expect(stack.peak()).toBe(10);
  expect(stack.size()).toBe(1);

  expect(stack.pop()).toBe(10);
  expect(stack.empty()).toBe(true);
  expect(stack.size()).toBe(0);
  expect(stack.peak()).toBe(undefined);
```



**步骤：**

1. 新建文件 Stack.ts
2. 实现 Stack 的基本结构并导出
3. 新建文件 Stack.test.ts
4. 实现测试用例
5. 完善Stack 代码细节



### 2-5 使用栈实现队列-实现一个标准队列

**问题：**

实现一个标准队列

**分析：**

标准队列方法

+ empty
+ size
+ peak
+ push
+ pop



测试用例

```ts
  const queue = new Queue();
  expect(queue.empty()).toBe(true);

  queue.push(10);
  expect(queue.empty()).toBe(false);
  expect(queue.size()).toBe(1);
  expect(queue.peak()).toBe(10);
  expect(queue.size()).toBe(1);

  queue.push(11);
  expect(queue.empty()).toBe(false);
  expect(queue.size()).toBe(2);
  expect(queue.peak()).toBe(10);
  expect(queue.size()).toBe(2);

  expect(queue.pop()).toBe(10);
  expect(queue.empty()).toBe(false);
  expect(queue.size()).toBe(1);
  expect(queue.peak()).toBe(11);
  expect(queue.size()).toBe(1);

  expect(queue.pop()).toBe(11);
  expect(queue.empty()).toBe(true);
  expect(queue.size()).toBe(0);
  expect(queue.peak()).toBe(undefined);
```



**步骤：**

1. 新建文件 Queue.ts
2. 实现 Queue 的基本结构并导出
3. 新建文件 Queue.test.ts
4. 实现测试用例
5. 完善 Queue 代码细节



### 2-6 使用栈实现队列-分析及解题

**问题：**

使用栈实现队列。

**分析：**

+ 1，2，3 入队后出队的顺序为 1，2，3

+ 1，2，3 入栈后出栈的顺序为 3，2，1



如果入两次出入栈是不是就和一次出入队列的顺序一样了

详细步骤：

1. push 直接使用 A 栈
2. pop/peak 使用 B 栈
   1. 当 B 栈为空时，将 A 栈所有内容移动到 B栈
3. 队列的长度等于两个栈长度之和



![image-20191222190638745](https://tva1.sinaimg.cn/large/006tNbRwgy1ga5pxtzhyaj310k0cgq4i.jpg)



**步骤：**

1. 新建文件 MyQueue.ts
2. 在 MyQueue.ts 中使用 Queue.ts 的代码
3. 新建文件 MyQueue.test.ts
4. 在 MyQueue.test.ts 中使用 Queue.test.ts 的代码(略修改)
5. 完善 MyQueue 代码细节



### 2-7 单链表反转-读题

**题目：**

来源：[LeetCode](https://leetcode-cn.com/problems/reverse-linked-list/)

反转一个单链表。



**示例:**

输入: 1->2->3->4->5->null
输出: 5->4->3->2->1->null



输入：1->null

输出：1->null



输入：null

输出：null



**回顾：**

单链表节点：

```ts
class ListNode<T> {
  val: T;
  next: null | ListNode<T>;
  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

//构建链表 1->2->null
//const node1 = new ListNode(1);
//const node2 = new ListNode(2);
//node1.next = node2;
```



**步骤：**

1. 创建文件 ListNode.ts
2. 粘贴代码



### 2-8 单链表反转-构建单元测试

**问题：**

构建单链表反转的单元测试。

**分析：**

使用示例测试

输入: 1->2->3->4->5->null

输出: 5->4->3->2->1->null



输入：1->null

输出：1->null



输入：null

输出：null



**步骤：**

1. 新建文件 reverseList.ts
2. 实现函数基本结构并导出
3. 新建文件 reverseList.test.ts
4. 完善 reverseList.test.ts 代码细节
   1. 测试 null
   2. 测试 单节点链表
   3. 测试多节点链表
      1. 构建多节点
      2. 测试已构建的多节点链表
      3. 反转多节点链表
      4. 测试已反转的多节点链表



### 2-9 单链表反转-常规解

**问题：**

反转一个单链表。

**分析：**

1. 单独处理 null 的情况

2. 声明一个null（做为第一个元素）

3. 将链表从头到尾逐个指向前一个元素

   

![image-20191223164559453](https://tva1.sinaimg.cn/large/006tNbRwgy1ga6r2py59ij30e00iaabp.jpg)



**步骤：**

1. 处理 head 为 null 的情况
2. 声明变量 cur，next，result
3. 当 next 不为 null 执行以下操作
   1. cur.next=result
   2. moveNext (cur, next,result)
4. cur.next=result
5. 返回 cur



**扩展：**

这里我使用3个变量，cur，next，result。防止指针丢失使用2个变量就够了。如何实现？



### 2-10 单链表反转-递归解

**问题：**

反转一个单链表。



**分析：**

使用递归的方式实现单链表反转。

![image-20191223170256422](https://tva1.sinaimg.cn/large/006tNbRwgy1ga6rkge2whj30cx0cv752.jpg)

**步骤：**

1. 复制代码文件和测试用例代码文件
2. 修改测试用例代码
3. 修改文件代码
   1. 处理 head 为null 或者单节点的情况
   2. 处理递归
   3. 修正指向 head 的指针
   4. 修正 head 的指针





### 2-12 二分法

## 第3章 非线性结构算法题

### 3-1 二叉树层序遍历-读题

**问题：**

来源：[LeetCode](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

给定一个二叉树，返回其按层次遍历的节点值。 （即逐层地，从左到右访问所有节点）。



**示例:**
给定二叉树: [3,9,20,null,null,15,7],

​    3

   / \
  9  20
    /  \
   15   7
返回其层次遍历结果：

[
  [3],
  [9,20],
  [15,7]
]

**分析：**

理解二叉树的数组表示法。

+ 构建二叉树
+ 先通过数组构建一棵二叉树，[参考](https://support.leetcode-cn.com/hc/kb/article/1194353/)
+ 树的中序遍历
+ 遍历树并记录层级



**回顾：**

构建二叉树

```ts
//TreeNode.ts
export default class TreeNode<T> {
  val: T;
  left: TreeNode<T>;
  right: TreeNode<T>;
  constructor(item: T) {
    this.val = item;
    this.left = null;
    this.right = null;
  }
}

//构建二叉树 
//     1
//    / \
//   2   3
const tree = new TreeNode(1);
const left = new TreeNode(2);
const right = new TreeNode(3);
tree.left = left;
tree.right = right;

```



### 3-2 二叉树层序遍历-通过数组构建二叉树-思路

**问题：**

如何通过数组构建二叉树

[参考 leetcode 说明](https://support.leetcode-cn.com/hc/kb/article/1194353/)

![image-20191225160923136](https://tva1.sinaimg.cn/large/006tNbRwgy1ga9197wbimj30mh0ljgmp.jpg)



**分析：**

找规律：

+ 规律1:index 为奇数的为左子树，index 非0的偶数节点为右子树
+ 规律2:节点按照创建的顺序做为父节点挂载子节点，
+ 规律3:每个节点都是 2 次作为父节点（最后的null可以省略）
+ 规律4:val 为 null 的节点，没有子节点



**思路：**

1. 创建节点

2. 挂载节点【挂载节点关键在于找父节点，父节点为非null的节点，与节点创建的顺序一致。】

   1. index===0 
   2. index 为奇数，当前节点挂载到左边
   3. index 为非0偶数，当前节点挂载到右边，【父节点出队】

3. 节点入队

   

**测试用例**（数组构建二叉树）：

```ts
//getBinaryTreeFromArray.test.ts

test("getBinaryTreeFromArray", () => {
  const tree1 = getBinaryTreeFromArray([]);
  expect(tree1).toBe(null);

  const tree2 = getBinaryTreeFromArray([1, 2, 3]);
  expect(tree2.val).toBe(1);
  expect(tree2.left.val).toBe(2);
  expect(tree2.right.val).toBe(3);

  const tree3 = getBinaryTreeFromArray([1, null, 2, 3]);
  expect(tree3.val).toBe(1);
  expect(tree3.right.val).toBe(2);
  expect(tree3.right.left.val).toBe(3);

  const tree4 = getBinaryTreeFromArray([
    5,
    4,
    7,
    3,
    null,
    2,
    null,
    -1,
    null,
    9
  ]);
  expect(tree4.val).toBe(5);
  expect(tree4.left.val).toBe(4);
  expect(tree4.left.left.val).toBe(3);
  expect(tree4.left.left.left.val).toBe(-1);
  expect(tree4.right.val).toBe(7);
  expect(tree4.right.left.val).toBe(2);
  expect(tree4.right.left.left.val).toBe(9);
});

```



**步骤：**

1. 创建文件 getBinaryTreeFromArray.ts
2. 实现函数基本结构
3. 创建文件 getBinaryTreeFromArray.test.ts
4. 粘贴测试用例代码



### 3-3 二叉树层序遍历-通过数组构建二叉树-实现

**问题：**

如何通过数组构建二叉树

**分析：**

1. 创建节点

2. 挂载节点【挂载节点关键在于找父节点，父节点为val为非null的节点，与节点创建的顺序一致。】

   1. index===0 
   2. index 为奇数，当前节点挂载到左边
   3. index 为非0偶数，当前节点挂载到右边，【父节点出队】

3. 节点入队【父节点队列】

   

**步骤：**

1. 打开 getBinaryTreeFromArray.ts
2. 准备变量 arrIndex,tree,queue
3. 遍历数组
   1. 根据数组元素创建树节点
   2. 挂载节点
      1. 当前节点为根节点时
      2. 当前节点为奇数节点时
      3. 当前节点为非零偶数节点时,父节点出队
   3. 节点入队
4. 返回 tree



**扩展：**

利用队列实现广度优先搜索（BFS）—— 参考 3-8 节



### 3-4 二叉树层序遍历-二叉树遍历

**问题：**

来源：[leetcode](https://leetcode-cn.com/problems/binary-tree-inorder-traversal)

给定一个二叉树，返回它的中序遍历。



**示例:**

输入: [1,null,2,3]
   1
    \
     2
    /
   3

输出: [1,3,2]



**分析：**

1. 递归解题思路

+ 递推公式
  + f（tree）=f（tree.left）+print(tree.val)+f(tree.right)
+ 终止条件
  + Tree 为 null 时终止

2. 测试用例

```ts
import getBinaryTreeFromArray from "./getBinaryTreeFromArray";
import inorderTraversal from "./inorderTraversal";

test("inorderTraversal", () => {
  const tree = getBinaryTreeFromArray([1, null, 2, 3]);

  expect(tree.val).toBe(1);
  expect(tree.right.val).toBe(2);
  expect(tree.right.left.val).toBe(3);

  const expectResult = [1, 3, 2];

  const result = inorderTraversal(tree);
  expect(JSON.stringify(result)).toBe(JSON.stringify(expectResult));
});

```



**步骤：**

1. 创建文件 inorderTraversal
   1. 创建文件 inorderTraversal.ts
   2. 编写函数结构
   3. 导出
2. 编写测试用例
   1. 创建文件 inorderTraversal.test.ts
   2. 粘贴测试用例
3. 完善细节
   1. 声明 result 变量
   2. 实现 traversal 函数
      1. 处理节点为空的情况
      2. 遍历左子树
      3. 将当前节点的值 push 到 result
      4. 遍历右子树
   3. 调用 traversal 函数
   4. 返回 result
4. 优化 getBinaryTreeFromArray



> 所有的测试都无法做到100%，只有不断的迭代才能提高软件质量。 算法也是如此！



### 3-5 二叉树层序遍历-解题

**问题：**

二叉树的层序遍历



**分析：**

如果遍历树的时候知道当前节点的层级就好了！

测试用例：

```ts
// 给定二叉树: [3,9,20,null,null,15,7],

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回其层次遍历结果：

// [
//   [3],
//   [9,20],
//   [15,7]
// ]

import getBinaryTreeFromArray from "./getBinaryTreeFromArray";
import layerTraversal from "./layerTraversal";

test("layerTraversal", () => {
  const tree = getBinaryTreeFromArray([3, 9, 20, null, null, 15, 7]);

  expect(tree.val).toBe(3);
  expect(tree.left.val).toBe(9);
  expect(tree.right.val).toBe(20);
  expect(tree.right.left.val).toBe(15);
  expect(tree.right.right.val).toBe(7);

  const expectResult = [[3], [9, 20], [15, 7]];

  const result = layerTraversal(tree);
  expect(JSON.stringify(result)).toBe(JSON.stringify(expectResult));
});
```



**解决：**

1. 实现函数主体结构 

   1. 创建文件 layerTraversal.ts
   2. 粘贴 inorderTraversal 代码
   3. 修改函数名称

2. 实现测试用例

   1. 创建文件
   2. 粘贴代码

3. 完善函数细节

   1. 给 traversal 添加可选参数 层级 deepth=0

   2. 调用 traversal 时添加将 tree.val 添加到层级数组中 result[deepth]

      1. 层级数组为空，添加数组
      2. 层级数组不为空，push(val)

      



### 3-6 N叉树的层序遍历-读题

**题目：**

来源：[leetcode](https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/)

给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。

**示例：**

给定一个 3叉树 :

 ![image-20191226162646915](https://tva1.sinaimg.cn/large/006tNbRwgy1gaa7dojlqmj30gi067dg0.jpg)



返回其层序遍历:

[
     [1],
     [3,2,4],
     [5,6]
]

**准备工作：**

1. 多叉树节点表示：

```ts
//MultiwayTreeNode.ts
class MultiwayTreeNode<T> {
  val: T;
  children: MultiwayTreeNode<T>[];
  constructor(val: T, children: MultiwayTreeNode<T>[] = []) {
    this.val = val;
    this.children = children;
  }
}

export default MultiwayTreeNode;
```



2. layerTraversalForMultiwayTree 框架代码：

   ```ts
   //layerTraversalForMultiwayTree.ts
   import MultiwayTreeNode from "./MultiwayTreeNode";
   
   const layerTraversalForMultiwayTree = (root: MultiwayTreeNode<number>) => {
     const result = [];
   
     return result;
   };
   
   export default layerTraversalForMultiwayTree;
   ```

   

   

3. 测试用例：

```ts
//layerTraversalForMultiwayTree.test.ts

import MultiwayTreeNode from "./MultiwayTreeNode";
import layerTraversalForMultiwayTree from "./layerTraversalForMultiwayTree";

test("layerTraversalForMultiwayTree", () => {
  /**
   *
   *       1
   *    /  ｜  \
   *   3   2    4
   *  / \
   * 5   6
   *
   */

  const node1 = new MultiwayTreeNode<number>(1, []);
  const node2 = new MultiwayTreeNode<number>(2, []);
  const node3 = new MultiwayTreeNode<number>(3, []);
  const node4 = new MultiwayTreeNode<number>(4, []);
  const node5 = new MultiwayTreeNode<number>(5, []);
  const node6 = new MultiwayTreeNode<number>(6, []);
  const tree = node1;
  tree.children = [node3, node2, node4];
  node3.children = [node5, node6];

  const result = [[1], [3, 2, 4], [5, 6]];

  expect(JSON.stringify(layerTraversalForMultiwayTree(tree))).toBe(
    JSON.stringify(result)
  );
});
```



### 3-7 N叉树的层序遍历-递归解

**问题：**

给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。



**分析：**

直接参考二叉树的层序遍历逻辑

1. 把中序遍历改成前序遍历

2. 递归2个子节点改成递归多个子节点

   

**步骤：**

1. 打开文件 layerTraversalForMultiwayTree.ts

2. 将 layerTraversal 的函数主体拷贝到  layerTraversalForMultiwayTree.ts

3. 中序遍历改成前序遍历

4. 将【递归2个子节点】改成【递归多个子节点】

5. 测试

   

### 3-8 N叉树的层序遍历-bfs解

**问题：**

给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。

> bfs= breadth first search 广度优先搜索算法



**分析：**

+ 实现 bfs：

1. 将根节点推入到一个队列中
2. 针对队列中的节点逐个执行以下操作
   1. 出队一个元素 item
   2. 讲 item 的值 push到 result 中 
   3. item 的子节点逐个入队



+ 加入深度信息：

1. 优化— — 加入深度信息
   1. 在队列的 item 中添加深度信息【深度信息与树的节点一同入队】

![image-20191226162646915](https://tva1.sinaimg.cn/large/006tNbRwgy1gaaa7rucjvj30gi067746.jpg)

**步骤：**

1. 准备工作

   1. 创建文件 breadthFirstSearch.ts
   2. 完成函数的主体结构并导出
   3. 在 layerTraversalForMultiwaryTree.test.ts 添加相应的测试用例

2. 非核心逻辑

   1. 编写队列 item 类型 QueueItem={depth,tree}
   2. 定义变量 result=[] 并返回 result
   3. 处理 空树的情况
   4. 定义变量 queue = new Queue<QueueItem>();
   5. 实现 pushResult 方法— 根据 deepth 把 val 放入正确的位置 

3. 核心逻辑 

   1. 根节点（携带深度信息）入队

   2. 逐个处理队列中的节点

      1. 获取 tree 和 deepth 信息

      2. 调用 pushResult

      3. 逐个将子元素（携带深度信息）入队——  注意 deepth+1

         

### 3-9 N叉树的层序遍历-dfs解

**问题：**

给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。

> dfs= depth first search 深度优先搜索算法



**分析：**

将`广度优先搜索算法`改成`深度优先搜索算法`即可！

![image-20191226162646915](https://tva1.sinaimg.cn/large/006tNbRwgy1gaaauxv5g8j30gi067746.jpg)



1. 复用 bfs 代码
2. 将队列换成栈
3. 子元素 倒序入栈

**步骤：**

1. 添加文件 depthFirstSearch.ts
2. 复制 breadthFirstSearch.ts 到 depthFirstSearch.ts，修改函数名和导出
3. 在 layerTraversalForMultiwaryTree.test.ts 添加相应的测试用例
4. 将队列改为 栈
5. 子节点入栈前先倒序
6. 测试



## 第4章 综合算法题

###  4-1 爬楼梯-读题

**问题：**

来源：[LeetCode](https://leetcode-cn.com/problems/climbing-stairs)

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。



**示例：**

示例 1：

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。

1. 1 阶 + 1 阶

2. 2 阶

  

示例 2：

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶



示例 3：

输入： 10
输出： 89



示例 4：

输入： 11
输出：144

**单元测试：**

```ts
//climbingStarts.test.ts

// import climbingStars from "./climbingStarts";

// test("climbingStars", () => {
//   const func = climbingStars;
//   expect(func(1)).toBe(1);
//   expect(func(2)).toBe(2);
//   expect(func(3)).toBe(3);
//   expect(func(10)).toBe(89);
//   expect(func(11)).toBe(144);
// });
```





###  4-2 爬楼梯-枚举解

**题目：**

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？



**分析：**

1. 复习数学知识

 [m 中选 n 组合计算方式](https://baike.baidu.com/item/排列组合/706498?fr=aladdin)： 

`C(8,3)=8*7*6/(1*2*3) = 56=8!/(3!*5!) `

![img](https://tva1.sinaimg.cn/large/006tNbRwgy1gadpgsynugj308606na9w.jpg)

2. 推导

假设10阶楼梯的计算方法：

![image-20191229173018282](https://tva1.sinaimg.cn/large/006tNbRwgy1gadq2kbsq8j30ho0am758.jpg)



如果走2阶的步数为x，则:

1. x 取值范围 0到 Math.floor(n/2)
2. 走1阶到步数为 n-2x
3. 总步数为 n-x
4. 最终走法为 C(n-x,x)=(n-x)!/(x!*(n-2x)!)



**步骤：**

1. 准备
   1. 创建文件 climbingStarsExhaustivity.ts
   2. 完成函数基本结构并导出
   3. 添加测试
2. 实现函数
   1. 实现阶乘计算公式 factorial
   2. 计算2步最多的次数 maxTwoStep
   3. 构建从 0 到 maxTwoStep 的数组
   4. 计算每一个的可能性（走法）
   5. 针对数组的值求和 sum
   6. 返回 sum



### 4-3 爬楼梯-递归解

**题目：**

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？



**分析：**

假设我们的在第 x 阶楼梯上，要么是从 x-1阶楼梯上来的，要么就是从 x-2 阶楼梯上来的。

爬到n阶楼梯的方法 = 爬到 n-1 阶楼梯的方法 + 爬到 n-2 阶楼梯的方法

递归的关键在与找到递归公式和递归的终止条件：

+ 递归公式 f(n)=f(n-1)+f(n-2)

+ 递归终止条件：f(1)=1;f(2)=2;

  

**步骤：**

1. 准备
   1. 创建文件 climbingStarsRecursive.ts
   2. 完成函数基本结构并导出
   3. 添加测试
2. 实现函数
   1. 实现递归边界条件
   2. 现递归公式



### 4-4 爬楼梯-递归解优化

**题目：**

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？



**分析：**

分析递归的执行过程：

![image-20191230102701995](https://tva1.sinaimg.cn/large/006tNbRwgy1gaejgkt43pj30qe0j2dj0.jpg)



如何解决：

缓存f(n),从而避免重复计算



计算 f(n) 之前先检查缓存

1. 命中缓存直接返回
2. 未命中缓存，计算，将结果写入缓存，返回



**步骤：**

1. 准备
   1. 创建文件 climbingStarsRecursiveCache.ts
   2. 粘贴 climbingStarsRecursive.ts 的代码并修改函数名称
   3. 添加测试
2. 实现函数
   1. 添加缓存 const cache = {};
   2. 添加变量 let result = n;
   3. 根据缓存的命中情况 给 result 赋值
   4. 返回 result
3. 对比
   1. 通过 console.log 查看函数调用的次数并对比



### 4-5 爬楼梯-动态规划解

**题目：**

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？



**分析：**

填表

![image-20191231113229056](https://tva1.sinaimg.cn/large/006tNbRwgy1gafrg5a3nzj30qf0hf76x.jpg)





**步骤：**

1. 准备
   1. 创建文件 climbingStarsDynamicProgramming.ts
   2. 添加函数框架并导出
   3. 添加测试
2. 实现函数
   1. 解决 n<3 的情况
   2. 声明变量 index，lastLast，last，current
   3. 实现循环 index<n 时
      1.  index++
      2.   lastLast = last;
      3.    last = current;
      4. ​    current = last + lastLast;
   4. 返回 current



### 4-6 最大子序列和-读题

**题目：**

来源：[LeetCode](https://leetcode-cn.com/problems/maximum-subarray)

给定一个整数数组 ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。



**示例:**

输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6



输入:[8,-2,-4,-1,-8,3,8,8,3,4,2,-9,-1,-3,-6,8,-3,9]
输出: 28
解释: 连续子数组 [3,8,8,3,4,2] 的和最大，为 28



输入:[1]
输出: 1
解释: 连续子数组 [1] 的和最大，为 1



**测试用例：**

```ts
import maxSubArray from "./maxSubArray";

test("maxSubArray", () => {
  const func = maxSubArray;
  expect(func([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  expect(
    func([8, -2, -4, -1, -8, 3, 8, 8, 3, 4, 2, -9, -1, -3, -6, 8, -3, 9])
  ).toBe(28);
  expect(func([1])).toBe(1);
});
```





### 4-7 最大子序列和-枚举解

**题目：**

给定一个整数数组 ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。



**分析：**

把所有的子序列都列举出来，然后计算他们都和，求得最大值。详细步骤如下：

假定给定的数组长度为n。

则子数组的长度可能为 1,2,3,…,n

+ 当子数组长度为1 ，有n个值，可以找到一个最大值
+ 当子数组长度为2 ，有n-2+1个值，可以找到一个最大值
+ 当子数组长度为3 ，有n-3+1个值，可以找到一个最大值
+ ...
+ 当子数组长度为x ，有n-x+1个值，可以找到一个最大值
+ ...

+ 当子数组长度为n ，可以找到一个最大值



假设子数组长度为3，则有n-3+1 个可能的和，找出其中最大值。

![image-20191231162232571](https://tva1.sinaimg.cn/large/006tNbRwgy1gafzctevwsj30ju05r0t0.jpg)

**步骤：**

1. 准备
   1. 创建文件 maxSubArrayExhaustivity.ts
   2. 添加函数框架并导出
   3. 添加测试
2. 实现函数
   1. 声明变量 count=1，max=Number.MIN_SAFE_INTEGER,len=arr.length
   2. 实现循环 count<=len 时
      1. 定义子数组开始索引 start=0；
      2. 定义子数组结束索引 end = count - 1;
      3. 计算子数组和 sum
      4. 根据 sum 的大小更新 max
      5. 迭代后移子数组 直到 end=len-1
         1. start++
         2. end++
         3. 计算 sum
         4. 更新 max
      6.  count++
   3. 返回 max



### 4-8 最大子序列和-动态规划解

**题目：**

给定一个整数数组 ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。



**分析：**

+ `最大子数组的最后一个元素` x 肯定是数组中的某一个元素。

+ 当每一个元素为最大子数据的最后一个数的时候，计算出其对于的最大子序列和。

  + 当数组（arr）的第 1 个元素为最大子数组的最后一个元素时，最大子数组和 currentEndMax1 即为arr[0]
  + 当数组（arr）的第 2 个元素为最大子数组的最后一个元素时，最大子数组和 currentEndMax2 即为`currentEndMax1>0? currentEndMax1+ arr[1]:arr[1]`
  + 当数组（arr）的第 3 个元素为最大子数组的最后一个元素时，最大子数组和 currentEndMax3 即为`currentEndMax2>0? currentEndMax2+ arr[2]:arr[2]`
  + ...
  + 当数组（arr）的第 x 个元素为最大子数组的最后一个元素时，最大子数组和 currentEndMaxX即为`currentEndMax(x-1)>0? currentEndMax(x-1)+ arr[x-1]:arr[x-1]`
  + ...
  + 当数组（arr）的第 n 个元素为最大子数组的最后一个元素时，最大子数组和 currentEndMaxN 即为`currentEndMax(n-1)>0? currentEndMax(n-1)+ arr[n-1]:arr[n-1]`

+ 最后 所有 currentEndMax 中最大值即为 该数组的最大子序列和。

  



![image-20191231182630988](https://tva1.sinaimg.cn/large/006tNbRwgy1gag2xrorhej30li0fhgn9.jpg)



**步骤：**

1. 准备
   1. 创建文件 maxSubArrayDynamicProgramming.ts
   2. 添加函数框架并导出
   3. 添加测试
2. 实现函数
   1. 声明变量 max=Number.MIN_SAFE_INTEGER，currentEndMax = arr[0]，index=1
   2. 根据 currentEndMax 的大小更新 max
   3. 实现循环 index < arr.length 时
      1. 计算出新的 currentEndMax
      2. 根据 currentEndMax 的大小更新 max
      3. index++;
   4. 返回 max



## 第5章 总结

### 5-1 总结

**已讲内容：**

1. 线性结构算法题

   1. 栈
   2. 队列
   3. 链表

   

2. 非线性结构算法题

   1. 二叉树及递归

   2. 图的遍历 bfs 和 dfs

      

3. 综合算法题

   1. 常规解
   2. 动态规划解



**未讲到的内容：**

	+ 多链表
	+ 排序算法
	+ 二分法查找
	+ 二叉搜索树
	+ 数据结构堆
	+ 有向图
	+ 文字查找
	+ ...



**最后再次强调：**

+ 理解算法原理需要反复琢磨

+ 手写代码能力需要反复练习



