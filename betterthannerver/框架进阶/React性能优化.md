# React 性能优化工具

##1. 课程介绍

实际上， React 使用 Virtual DOM 做优化，在内部已经尽可能的减少了真实 DOM 操作，但是我们作为开发者，依然可以在很多方面做优化。



**代码层面的优化**

1. 减少组件嵌套层级（对 React 底层了解后优化思路）
2. 利用 shouldComponentUpdate 减少渲染次数（React 开发者的优化思路）



**利用工具库的优化**

1. 使用工具来分析性能瓶颈
2. 尝试使用优化技巧解决这些问题
3. 使用工具测试性能是否确实有提升



**学习前提**

- React 的基础原理

  - 了解 React 的原理以及渲染机制

- React-Redux 的用法以及原理

- Webpack

  - 会使用 Webpack 配置一个简单的脚手架

  

**本课程的主要内容**

- React 性能分析工具
- 使用 reselect 结合 Redux 优化复杂状态变更的性能问题
- 使用 Immutable 优化 React 性能
- 长列表场景的优化



**学习本门课程你能收获什么**？

- 能够通过工具分析出性能优化点
- 清晰的知道 React 中常用性能优化的解决方案
- 面试的时候能够多聊聊 React 中常见的性能优化点



**环境准备**

- NodeJS（ v10.0.0 以上 LTS 版本 ）
- Webpack （ v4.0 以上 ）
- VSCode 或者其他编辑器



## 2. React 性能分析工具

### 2.1 使用 Profiler 来分析组件的渲染性能

1. 安装 [React-Developer-Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) 插件

2. 如何使用 Profiler

   ![1572104677055](/Volumes/Transcend/video/2-10 React-性能优化工具/resource/assets/1572104677055.jpg)

3. 如何分析性能问题

   **录制内容分析**

   首先要了解一点，React 在 16 版本之后处理任务分为两个阶段：

   1. **render** 阶段判断哪些变更需要被处理成DOM，也就是生成 Virtual DOM，然后进行 diff
   2. **commit **阶段会根据 render 阶段 diff 的结果来操作 DOM 节点，并且会调用componentDidMount 以及 componentDidUpdate 等等生命周期钩子方法

   

   **柱状图**

   开发工具中通过 commit 阶段对性能数据进行编组，会显示在右侧工具栏上

   看上去像一个柱状图，每一个柱子代表一次 commit，他的颜色和高度对应执行时长，越高颜色越黄代表时间越长，反之越短。

   

   **火焰图**

   火焰图部分会以一个类似树形的结构显示一次 commit 过程中整个每个组件的渲染信息，跟 commit 分组信息类似，颜色和长短对应这个组件的渲染耗时，当然组件的渲染时间需要依赖他的子组件的渲染时间。
   
   

​		**排名视图**
​		选中排名视图，会展示该次 commit 中组件渲染时间由高到低的排名，方便删选最长时间的渲染。



###2.2 使用 [Why did you update](https://github.com/maicki/why-did-you-update) 提示需要优化的组件

Why did you update 这个工具库就像一个插件，可以提示不需要重新渲染的组件。

他的原理是会通过比较组件的 state 和 props 的变化，如果两次渲染值是没有改变的，会提示去避免 re-render。



```javascript
// 如果是开发环境，就加载插件
if (process.env.NODE_ENV === 'development') {
  const { whyDidYouUpdate } = require('why-did-you-update')
  const notifier = (groupByComponent, collapseComponentGroups, displayName, diffs) => {
    // 这里可以进行日志收集或者性能问题预警通知
    console.log(groupByComponent, collapseComponentGroups, displayName, diffs)
  }
  whyDidYouUpdate(React, { notifier })
}
```





##3. 使用 reselect 结合 Redux 优化复杂状态变更的性能

[Reselect](https://github.com/faassen/reselect.git) 库可以创建可记忆的(Memoized)、可组合的 **selector** 函数。Reselect selectors 可以用来高效地计算 Redux store 里的衍生数据。



总结：**reselect 会将计算结果的缓存下来，避免不必要的重复计算，可以用来做性能优化。**



## 4. 使用 Immutable 优化 React 性能

###4.1 mutable 的共享问题

**JavaScript 的数据类型**

基础类型：number, string, boolean, undefined, null, symbol

引用类型：object



JavaScript 中的对象是可变的（Mutable），因为引用类型的变量实际上存储的是内存地址，这个地址指向另一块内存区域，这块区域才是储存的真实的数据。所以这个就会带来一个问题，就是变量的引用同样也是复制的内存地址，就会导致任意一个对象的修改都会影响到其他的变量。

```javascript
// 基本类型
let a = 123
let b = a


let a = { key: 'value' }
let b = a
b.key = 'value2' 
console.log(a) // {key: 'value2'}
console.log(a === b) // true
```

> 共享的可变状态是万恶之源
>
> ​						-- Pete Hunt



**如何解决？**

为了解决这个问题，一般的做法是使用 浅拷贝 或者 深拷贝 来避免被修改。

```javascript
// 浅拷贝
let a = { key: 'value' }
let b = Object.assign({}, a) // ES6 {...a}

// 深拷贝
let deep = { key: { foo: 'value', bar: { foo1: 'value1' } } }
deepClone，需要递归遍历整个 Object 并逐层复制。

```

但是这样做造成了 CPU 和内存的浪费。



###4.2 Immutable data

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。



```javascript
let a = I({ key : 'value'}) 
a.key = 'value2'
console.log(a.key) // value

let b = (a.key = 'value2')
console.log(b.key) // value2
```

**对 Immutable 数据的任何操作都会重新生成一个新的数据。**



###4.3 Immutable 的性能提升

React 的渲染性能很大一部分取决于更新的粒度，

分步更新：Fiber 机制帮我们解决掉了

**精准更新**：开发者来做策略性更新

一定要处理好状态的变化，尽量减少数据对象的层级。利用好 shouldComponentUpdate 来避免不必要的更新，但是如果数据层级过深，比较的性能损耗也许更大，这个时候就可以利用 Immutable 这种数据结构来帮我们解决。



###4.4 Immutable 带来的问题

1. 交互操作困难

   学习成本比较高，需要完全熟悉 Immutable 所有的数据操作的 API。并且一旦使用 Immutable.JS 封装数据，你必须使用 Immutable.JS 的 get()  和 getIn() 属性访问器来访问它。

   ```javascript
   myObj.prop1.prop2.prop3 -> myImmutableMap.getIn(['prop1', 'prop2', 'prop3'])
   ```

   

2. 三方组件或者库不兼容

   这不仅使得与你自己的代码进行交互操作变得尴尬，而且还与其他库（如 lodash 或 ramda）的交互也会很尴尬，这些库都需要普通的 JavaScript 对

   ```javascript
   <Table
     components={components}
     rowClassName={() => 'editable-row'}
     bordered
     dataSource={dataSource.toJS()}
     columns={columns}
   />
   ```

   

3. 难以调试

   Immutable.JS 对象，如 Map，List 等可能很难调试，因为检查这样的对象会看到整个嵌套层级结构，这些层级是你不关心的 Immutable.JS 特定的属性，而且你真正关心的是实际数据被封装了几层。

   

**最佳实践**

永远不要将普通的 JavaScript 对象与 Immutable.JS 混合使用。

建议：如果有复杂的层级比较深的数据，可以考虑局部使用 Immutable。

使用体积更小的 [seamless-immutable](https://github.com/rtfeldman/seamless-immutable)





##5. 长列表场景的优化