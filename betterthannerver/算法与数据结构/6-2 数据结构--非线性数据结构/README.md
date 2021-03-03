# 数据结构--非线性数据结构

##1. 课程介绍

非线性数据结构：数据元素之间**一对多**的关系。

数据之间有分支。



**学习前提**

- JavaScript 基础

- ES6 基础



**本课程的主要内容**

- 树
  - 二叉树
  - 二叉搜索树
  - Trie 树（字典树）
  - 并查集
  - 堆
- 图
  - 有向图
  - 无向图
  - 带权图



**学习本门课程你能收获什么**？

- 了解前端中比较常见的几种非线性数据结构
- 使用特定数据结构解决问题
- 大厂面试必备技能



**环境准备**

- VSCode 或者其他编辑器



##2. 树

树是一种经常用到的数据结构，用来模拟具有树状结构性质的数据集合。树拥有很多种结构，同时也是一个天然的**递归**结构。

特点：

1. 唯一一个根节点
2. 层级结构
3. 节点关系
4. 可分解

![1](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/1.png)

**递归**

从前有座山，山上有座庙，庙里有个老和尚和一个小和尚，有一天，老和尚对小和尚说：

从前有座山，山上有座庙，庙里有个老和尚和一个小和尚，有一天，老和尚对小和尚说：

从前有座山，山上有座庙，庙里有个老和尚和一个小和尚，有一天，老和尚对小和尚说：



**递归函数必须有退出条件**

当钟声响起时，老和尚和小和尚都要去睡觉了，那么这个故事就结束了。



### 2.1 二叉树

二叉树是一种非常重要的数据结构，很多其它数据结构都是基于二叉树的基础演变而来的。

二叉树拥有一个根节点，每个节点**至多**拥有两个子节点，分别为：左节点和右节点。树的最底部节点称之为叶节点。

![2](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/2.jpg)



当一颗树的叶数量数量为满时，该树可以称之为满二叉树。



#### 2.1.1 二叉树的遍历

![3](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/3.jpg)

**先序遍历**--先访问根节点，然后遍历左子树，最后遍历右子树

根 - 左 - 右

F - B - A - D - C - E - G - I - H



**中序遍历**--先遍历左子树，然后访问根节点，然后遍历右子树

左 - 根 - 右

A - B - C - D - E - F - G - H - I



**后序遍历**--先遍历左子树，然后遍历右子树，最后访问树的根节点

左 - 右 - 根

A - C - E - D - B - H - I - G - F



这三种遍历也叫做**深度优先遍历**。

深度优先：把某一边遍历完再说。



[先序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

```javascript
// 先序遍历
// 利用栈
var preorderTraversal = function(root) {
    let myStack = new Stack();
    let res = [];
    root && myStack.push(root);
    while(myStack.getSize() > 0) {
        let cur = myStack.pop();
        res.push(cur.val);
        cur.right && myStack.push(cur.right);
        cur.left && myStack.push(cur.left);
    }
    return res;
};

// 递归法
var preorderTraversal = function(root) {
    const res = [];
    set(root);
    return res;
    function set(tree) {
        if (!tree) return;
        res.push(tree.val);
        tree.left && set(tree.left);
        tree.right && set(tree.right);
    }
};

```



#### 2.1.2 二叉树的层序遍历

层序遍历（广度优先遍历）就是逐层遍历树结构。

从一个根节点开始，首先访问节点本身。 然后遍历它的相邻节点，其次遍历它的二级邻节点、三级邻节点，以此类推。

![3](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/3.jpg)

F - B - G - A - D - I - C - E - H

F - B - A - D - C - E -G - I - H

[层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

```javascript
// 层序遍历
// 先访问根就对了
var levelOrder = function(root) {
    const res = [];
    set(root, 0);
    return res;
    function set(tree, count) {
        if (!tree) return;
        if (!Array.isArray(res[count])) res[count] = [];
        res[count].push(tree.val);
        tree.left && set(tree.left, count + 1);
        tree.right && set(tree.right, count + 1);
    }
};
```



### 2.2 二叉搜索树

二叉搜索树也是二叉树，拥有二叉树的特性。

1. 每个节点中的值必须 大于（或等于）存储在其左侧子树中的任何值
2. 每个节点中的值必须 小于（或等于）存储在其右子树中的任何值

**左小右大**

**分而治之的思想**

![5](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/5.png)

1 2 3 4 5 6 7

注意：对于任何一个二叉搜索树，采用**中序遍历**的方式，一定可以得到一个递增的序列。



####2.2.1 **[二叉搜索树的查找](https://leetcode-cn.com/problems/search-in-a-binary-search-tree/)**

```javascript
var searchBST = function(root, val) {
    if (val < root.val) {
        return root.left ? searchBST(root.left, val) : null;
    }
    if (val > root.val) {
        return root.right ? searchBST(root.right, val) : null;
    }
    if (root.val === val) {
        return root;
    }
};
```



####2.2.2 **[二叉搜索树的插入](https://leetcode-cn.com/problems/insert-into-a-binary-search-tree/)**

```javascript
var insertIntoBST = function(tree, val) {
    searchBST(tree, val);
    return tree;
    function searchBST(root, val) {        
        if (val < root.val) {
            if (root.left) {
                searchBST(root.left, val)
            } else {
                root.left = new TreeNode(val);
            }
        }
        if (val > root.val) {
            if (root.right) {
                searchBST(root.right, val)
            } else {
                root.right = new TreeNode(val);
            }
        }
        if (root.val === val) {
            root.left = new TreeNode(val);
        }
    };
};
```





### 2.3 Trie 树

在计算机科学，**Trie**，又称 **前缀树** 或 **字典树**，是 N叉树的一种特殊形式。

特点：

1. 根节点就是一个空字符串
2. 节点不存储字符，只有路径上才存储
3. 从根节点开始到任意一个节点，将沿途经过的字符连接起来就是该节点对应的字符串



![6](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/6.png)

字符：apple，app，cat，cap



#### 2.3.1 **[前缀树的实现](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)**

```javascript
class TrieNode {
  constructor() {
    // 代表当前节点的处于第几层
    this.path = 0;
    // 代表当前节点结束位置
    this.end = 0;
    // 存储字母的容器
    this.next = new Array(26).fill(null);
  }
}

const Trie = function() {
    this.root = new TrieNode();
};

Trie.prototype.insert = function(word) {
    if (!word) return;
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      // 获得字符先对应的索引
      let index = word[i].charCodeAt() - 'a'.charCodeAt();
      // 如果索引对应没有值，就创建
      if (!node.next[index]) {
        node.next[index] = new TrieNode();
      }
      node.path += 1;
      node = node.next[index];
    }
    node.end += 1;
};

Trie.prototype.search = function(word) {
    if (!word) return;
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      let index = word[i].charCodeAt() - 'a'.charCodeAt();
      // 如果索引对应没有值，代表没有需要搜素的字符串
      if (!node.next[index]) {
        return 0;
      }
      node = node.next[index];
    }
    return node.end;
};

Trie.prototype.startsWith = function(prefix) {
    if (!prefix) return;
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
        let index = prefix[i].charCodeAt() - 'a'.charCodeAt();
        if (!node.next[index]) {
            return 0;
        }
        node = node.next[index];
    }
    return 1;
};
```



前缀树的应用场景： 自动补全

前缀树的局限性：Trie 树的核心思想是**空间换时间**



### 2.4 并查集

并查集（Union / Find）是一种特殊的树结构，用于处理一些不交集的合并及查询问题。

并查集就是：**使用合并和查找的方式来解决集合的问题**

初始时并查集中的元素是不相交的，经过一系列的基本操作(Union)，最终合并成一个大的集合

主要用来解决 **动态连通性** 一类问题的一种算法

该结构中每个节点都有一个父节点，如果只有当前一个节点，那么该节点的父节点指向自己。

并查集的特点：

1. 树结构是逆向的，子节点指向父节点
2. 森林结构





![7](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/7.png)



#### 2.4.1 **并查集的实现**

这里引入一种新的合并策略，这是一种启发式策略，称之为**按秩合并**。

秩就是层级

**翻译成人话：就是将层级小的子树的根指向层级大的子树的根**。



```javascript
class DisjointSet {
  // 初始化样本
  constructor(count) {
    // 初始化时，每个节点的父节点都是自己
    this.parent = new Array(count);
    // 用于记录树的层级，用于按秩合并
    this.rank = new Array(count);
    for (let i = 0; i < count; i++) {
      this.parent[i] = i;
      this.rank[i] = 1;
    }
  }
  // 算法流程
  // 目的：找到目标节点的根节点 find(3) -> 0
  // 1. 循环判定，当前节点的值（父节点）是否为自己，如果不是的话表示还没找到
  // 2. 则当前节点的值重新赋值，等于以数组项为索引的值
  // 3. 重新赋值后，继续循环判定
  // 4. 直到当前节点的值等于自己，返回当前节点的值

  find(p) {
    while (p != this.parent[p]) {
      this.parent[p] = this.parent[this.parent[p]];
      p = this.parent[p];
    }
    return p;
  }
  // 算法流程
  // 目的：合并两个节点，会根据树的层级大小判定合并策略
  // 1. 首先需要寻找两个数字的父节点  0 <- 1    2 <- 3  union(3, 1)  <=>  union(0, 2)
  // 2. 如果 两个数字相等，直接退出
  // 3. 判定两棵树的层级，层级小的加到层级大的树下面
  // 4. 如果两棵树的层级相等，那么随意合并
  union(p, q) {
    let i = this.find(p);
    let j = this.find(q);
    if (i === j) return;
    if (this.rank[i] < this.rank[j]) {
      this.parent[i] = j;
    } else if (this.rank[i] > this.rank[j]) {
      this.parent[j] = i;
    } else {
      this.parent[j] = i;
      this.rank[i] += 1;
    }
  }
}
```





### 2.5 堆

堆的一个经典的实现是**完全二叉树**。这样实现的堆称为**二叉堆**。

完全二叉树：**增加了限定条件的二叉树**。假设一个二叉树的深度为 n。为了满足完全二叉树的要求，该二叉树的前n - 1 层必须填满，第 n 层的所有的节点都连续集中在最左边。

这种数据结构具有以下两个性质：

- 堆总是一棵完全二叉树。即除了最底层，其他层的节点都被元素填满，且最底层从左到右填入

- 任意节点小于（或大于）它的所有子节点

将根节点最大的堆叫做**最大堆**或**大根堆**，根节点最小的堆叫做**最小堆**或**小根堆**。



![8](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/8.jpg)

![10](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/10.jpg)



#### 2.5.1 **堆和二叉搜索树的区别**

1. 节点的顺序

   在二叉搜索树中，左子节点必须比父节点小，右子节点必须必比父节点大。但是在堆中并非如此。在最大堆中两个子节点都必须比父节点小，而在最小堆中，它们都必须比父节点大。

2. 搜索

   在二叉树中搜索会很快，但是在堆中搜索会很慢。在堆中搜索不是第一优先级，因为使用堆的目的是将最大（或者最小）的节点放在最前面，从而**快速的进行插入、删除操作**。



#### 2.5.2 一棵树的数组对象

![9](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/9.jpg)

```javascript
[ 15, 10, 9, 7, 5, 3 ]
```



节点位置计算公式：

```javascript
parent(i) = Math.floor((i - 1)/2);
left(i)   = 2i + 1;
right(i)  = 2i + 2;
```



| Node | Index | 父节点 | 左子节点 | 右子节点 |
| ---- | ----- | ------ | -------- | -------- |
| 15   | 0     | -1     | 1        | 2        |
| 10   | 1     | 0      | 3        | 4        |
| 9    | 2     | 0      | 5        |          |
| 7    | 3     | 1      |          |          |
| 5    | 4     | 1      |          |          |
| 3    | 5     | 2      |          |          |



#### 2.5.3 **堆的操作**

**插入操作**

![11](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/11.png)



**删除根节点**

![12](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/12.png)



堆有两个核心的操作，分别是 **shiftUp** 和 **shiftDown** 。前者用于添加元素，后者用于删除根节点。

shiftUp 的核心思路是一路将节点与父节点对比大小，如果比父节点大，就和父节点交换位置。

shiftDown 的核心思路是先将根节点和末尾交换位置，然后移除末尾元素。接下来循环判断父节点和两个子节点的大小，如果子节点大，就把最大的子节点和父节点交换。



#### 2.5.4 **最大堆的实现**

```javascript
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  insert(item) {
    // 将节点直接入队
    this.heap.push(item);
    // 判定是否需要交换位置
    this.shiftUp(this.getSize() - 1);
  }

  remove(index) {
    // 交换位置并且删除队尾节点
    this.swap(index, this.getSize() - 1);
    this.heap.splice(this.getSize() - 1, 1);
    // 判定是否需要交换位置
    this.shiftDown(index);
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  getLeftIndex(index) {
    return index * 2 + 1;
  }

  shiftUp(index) {
    // 如果当前节点比父节点大，就交换
    while(this.heap[index] > this.heap[this.getParentIndex(index)]) {
      this.swap(index, this.getParentIndex(index));
      // 将索引修改成父节点
      index = this.getParentIndex(index);
    }
  }

  shiftDown(index) {
    // 判断当前节点是否有左子节点
    while(this.getLeftIndex(index) < this.getSize()) {
      let leftIndex = this.getLeftIndex(index);
      let rightIndex = leftIndex + 1;
      let changeIndex = leftIndex;
      // 判断是否有右子节点，并且右子节点是否大于左子节点
      if (rightIndex < this.getSize() && this.heap[rightIndex] > this.heap[leftIndex]) {
        changeIndex = rightIndex;
      }
      // 判断父节点是否比子节点都大，则终止循环，否则就交换位置
      this.swap(index, changeIndex);
      index = changeIndex;
    }
  }

  swap(left, right) {
    const rightValue = this.heap[right];
    this.heap[right] = this.heap[left];
    this.heap[left] = rightValue;
  }

  getSize() {
    return this.heap.length;
  }

  isEmpty() {
    return this.getSize() === 0;
  }
}
```





## 3. 图

图是一种复杂的非线性结构。

在树形结构中，数据元素之间有着明显的层次关系，并且每个数据元素只与上一层中的一个元素(parent node)及下一层的多个元素(孩子节点)相关。

在图形结构中，节点之间的关系是**任意的**，图中任意两个数据元素之间都有可能相关。

- 图中的节点也被称作**顶点（vertice）**

- 两个节点相连的部分称为**边（edge）**

![13](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/13.png)

​																		**G = (V，E)**



### 3.1 无向图

对于一个图，若每条边都是没有方向的，则称该图为**无向图**。

(Vi，Vj) 和 (Vj，Vi) 表示的是同一条边。

无向图的顶点集和边集分别表示为：

V(G) = {V1，V2，V3，V4，V5}

E(G) = {(V1，V2)，(V1，V4)，(V2，V3)，(V2，V5)，(V3，V4)，(V3，V5)，(V4，V5)}

![14](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/14.png)

**顶点的度**

顶点的度表示以该顶点作为一个端点的边的数目（**当前顶点有几条边跟它连接**）

eg:  D(V3) = 3



**路径和回路**

从一个顶点到另一顶点途径的所有顶点组成的序列（包含这两个顶点）

eg:  r = v1, v2, v3

如果路径中第一个顶点和最后一个顶点相同，则此路径称为"回路"（或"环"）

eg: c = v1, v2, v3, v1



### 3.2 有向图

对于一个图，若每条边都是有方向的，则称该图为**有向图**。

<Vi，Vj> 和 <Vj，Vi> 是两条**不同的有向边**。

**注意**

- 无向图是用小括号表示，而有向图是用尖括号表示
- 有向边又称为弧

有向图的顶点集和边集分别表示为：

V(G ) = {V1，V2，V3}

E(G) = {<V1，V2>，<V2，V3>，<V3，V1>，<V1，V3>}

![15](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/15.png)

**有向图的度**

顶点的度分为入度和出度。入度表示以该顶点为终点的入边数目（**接收**），出度是以该顶点为起点的出边数目（**发送**），该顶点的度等于其入度和出度之和。

比如，顶点 V1 的入度 ID(V1) = 1，出度 OD(V1) = 2，所以 D(V1) = ID(V1) + OD(V1) = 3



### 3.3 带权图

权（Weight）：图中边和弧有相关的数字，这个数字叫做权（Weight）。

这些带权的图通常称为网（Network）。



![16](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/16.png)

地图应用：

- 顶点：城市
- 边：两个城市之间的路线
- 权重：两个城市之间的距离

![17](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/17.png)



###3.4 图的表示方式

**邻接矩阵**

可以使用一个二维数组建立一个矩阵，矩阵元素 **a[i] [j]**，矩阵横坐标表示起始顶点，纵坐标表示到达顶点。

如果是带权图，矩阵中存储权重，如果顶点直接无关联可以用 ∞ 符号来表示。

![18](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/18.png)



```javascript
const graph = [
  [0, 2, '∞', 5],
  ['∞', 0, '∞', 1],
  [3, '∞', 0, 8],
  ['∞', '∞', '∞', 0],
];

const graph = [
  [1, 1, 0, 1],
  [0, 1, 0, 1],
  [1, 0, 1, 1],
  [0, 0, 0, 1],
]
```





**邻接表**

每个顶点都有一个记录着与它所相邻顶点的表。

可以使用一个数组或者 Map 来建立一个邻接表，它存储这所有的顶点。每个顶点都有一个列表（可以是数组、链表、集合等数据结构），存放着与其相邻的顶点。



![15](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/15.png)

```javascript
const graph = {
  	'v1': [ 'v2'，'v3' ],
  	'v2': [ 'v3' ],
  	'v3': [ 'v1' ],
};

const graph = {
  	'v1': [{ vertice: 'v2', weight: 2 }, { vertice: 'v3', weight: 4 }],
  	'v2': [ 'v3' ],
  	'v3': [ 'v1' ],
};
```













**图论**

**图论**（英语：**Graph theory**），是组合数学的一个分支，和其他数学分支，如群论、矩阵论、拓扑学有着密切关系。图是图论的主要研究对象。图是由若干给定的顶点及连接两顶点的边所构成的图形，这种图形通常用来描述某些事物之间的某种特定关系。顶点用于代表事物，连接两顶点的边则用于表示两个事物间具有这种关系。

![19](/Volumes/Transcend/video/6-02 数据结构--非线性数据结构/resource/assets/19.png)