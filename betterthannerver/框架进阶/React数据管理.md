# React 状态管理容器

## 1. 课程介绍

[React](https://zh-hans.reactjs.org/) 被官方定义为 **用于构建用户界面的 JavaScript 库**，其实 React 只是 DOM 的一个抽象层，并不是 Web 应用的完整解决方案。一套完整的解决方案，应该由 React 生态系统来共同构建，生态系统其实是由 React 为核心发展起来的一系列问题解决方案。

> React生态：纯净，一个库或者工具就解决一个问题，没有副作用

如果一个非常简单的应用，也许根本就不需要用到 React 生态。所以只有稍微复杂的场景我们才会用到一些其他特定问题解决方案，React-Router，Antd 等等其实都是 React 生态中的解决方案。

而我们即将要讲的**状态管理机制**，其实本质上就是一种问题的解决方案。



**通常复杂 Web 应用具备的两个关键点** 

- 代码结构问题
- 跨组件之间的通信问题



**我们一定要使用状态管理容器吗**？

Redux 的创造者 Dan Abramov 在 2016 年 [也许你可以不必使用 Redux](https://zhuanlan.zhihu.com/p/22597353)

- 如果你不知道是否需要 Redux，那就是不需要它

- 只有遇到 React 实在解决不了的问题，你才需要 Redux

简单说，如果你的 UI 层非常简单，没有很多交互，Redux 就是不必要的，用了反而增加复杂性。



**以下这些情况可以不使用状态管理容器：**

- 用户的使用方式非常简单
- 用户之间没有协作
- 不需要与服务器大量交互，也没有使用 WebSocket
- 视图层（View）只从单一来源获取数据

**使用状态管理容器的一般场景：**

- 用户的使用方式复杂
- 不同身份的用户有不同的使用方式（比如普通用户和管理员）
- 多个用户之间可以协作
- 与服务器大量交互，或者使用了WebSocket
- View要从多个来源获取数据



**关键词：** **多交互、多数据源**



**组件层面使用状态管理容器的场景：**

- 某个组件的状态，需要共享
- 某个状态需要在任何地方都可以拿到
- 一个组件需要改变全局状态
- 一个组件需要改变另一个组件的状态

![ReactJS - without Redux vs with Redux  ](https://image.slidesharecdn.com/006-170302100440/95/006-react-redux-framework-6-638.jpg?cb=1488450003)



**学习前提**

- React
- React-Redux 的基本用法
  - 了解 Redux 中的几个关键概念
- Webpack
  - 会使用 Webpack 配置一个简单的脚手架

**本课程的主要内容**

- 深入分析 Redux 设计思想以及源码剖析
- React-Redux 中几个重要方法的解析
- Redux-Saga 的设计思想以及基本用法
- 另外一种状态管理解决方案 -- Mobx
  - Mobx 的设计思想
  - Mobx 的原理介绍
- 状态管理容器的最佳实践



**学习本门课程你能收获什么**？

- 能在技术选型时有清晰的思路是否需要引入状态管理机制
- 深入了解如何更好的使用状态管理容器
- 面试的时候能思路清晰的描述 Redux 以及 Mobx 的设计思想，能够看到面试官膜拜的眼神，offer =  easy
- 学习优秀开发者写代码的技巧或者思路，能在以后自己需要设计大型软件系统时灵感喷发



**环境准备**

- NodeJS（ v10.0.0 以上 LTS 版本 ）
- Webpack （ v4.0 以上 ）
- VSCode 或者其他编辑器



## 2. Redux 设计思想以及源码剖析

###2.1 Redux 的设计思想

#### 2.1.1 为什么会出现 Redux（React-Redux）？

**PS. 这里先声明一下，我们用到的 React-Redux 实际上是 Redux 在 React 中的实现，咱们先放在一起去理解学习**

我们知道只有遇到 React 解决不了的问题，我们才会使用 React 生态圈里面其他的解决方案。想象一下  React 中是如何进行数据传递的？

1. 在顶层的组件获取数据后再以 props 的形式传给子组件就好了

![clipboard.png](https://segmentfault.com/img/bVbnAbW?w=550&h=300)

​								

2. 当加入交互功能后，兄弟组件之间需要共享 state 了，当组件一修改后组件二也要同步更新。React 的解决方案是**状态提升（Lifting State Up）**，通过父组件来统一更新 state，再将新的state 通过 props 传递下去

![clipboard.png](https://segmentfault.com/img/bVbnAcd?w=550&h=325)



3. 随着功能的不断丰富，组件越来越多，state也越来越复杂，直到有一天你发现，修改和共享某个state变得极其艰难。共享的 state 需要放在最顶层维护，然后一层一层地往下传递修改 state 的方法和展现的数据。这时你会发现，很多数据中间层的组件根本不需要用到，但由于子组件需要用，不得不经过这些中间层组件的传递。更令人头疼的事，当 state 变化的时候，你根本分不清楚是由哪个组件触发的。

![clipboard.png](https://segmentfault.com/img/bVbnAcu?w=550&h=475)



4. 如果使用 Redux 对应用进行重构，状态的变化就会变得非常清晰。应用的 state 统一放在 Store 里面维护，当某个组件中数据发生变更，首先会直接更新的 Store 中，然后会通过发布订阅机制通知到需要被更新的 View 中进行数据更新。

![clipboard.png](https://segmentfault.com/img/bVbmUqQ?w=700&h=475)



**前端复杂性的根本原因是大量无规律的交互和异步操作**

变化和异步操作的相同作用都是改变了当前 View 的状态，但是它们的无规律性导致了前端的复杂，而且随着代码量越来越大，我们要维护的状态也越来越多。

我们很容易就对这些状态何时发生、为什么发生以及怎么发生的失去控制。那么怎样才能让这些状态变化能被我们预先掌握，可以复制追踪呢？

Redux 通过一些约定，将应用的数据统一管理，实现了**视图和数据分离**，并且任何一次数据的修改可追溯，可预测。

这就是 Redux 设计的动机所在。



**结论**

Redux 是一个为 JavaScript 应用设计的，可预测的状态容器。Redux 的出现其实就是解决了复杂应用的状态（数据）管理问题，可以使 **UI 和 Data 完全分离**，并且可以**跨层级任意传递数据**。



####2.1.2 Redux 设计思想的来源

[Redux官方文档](https://cn.redux.js.org/docs/introduction/Motivation.html)中有过这样一句话，

>  跟随 [Flux](http://facebook.github.io/flux)、[CQRS](http://martinfowler.com/bliki/CQRS.html) 和 [Event Sourcing](http://martinfowler.com/eaaDev/EventSourcing.html) 的脚步，通过限制更新发生的时间和方式，**Redux 试图让 state 的变化变得可预测**



**Flux 架构**

Flux与 MVC、MVVM 一样，是一种架构思想，下面过程中，数据总是“单向流动”，任何相邻的部分都不会发生数据的“双向流动”，这保证了流程的清晰。**Flux的最大特点，就是数据的“单向流动”**。

![dw topic](https://awps-assets.meituan.net/mit-x/blog-images-bundle-2017/efd23693.png)



1. 用户访问 View
2. View 发出用户的 Action
3. Dispatcher 收到 Action，要求 Store 进行相应的更新
4. Store 更新后，发出一个 change 事件
5. View 接收到事件并更新



两个关键点

1. Redux 来源于 Flux 架构
2. Flux 架构最大的特点是单向数据流



**CQRS（Command Query Responsibility Segregation）**

顾名思义，“命令与查询职责分离” –> **”读写分离”**。整体的思想是把 Query 操作和 Command 操作分成两块独立的库来维护，当事件库有更新时，再来同步读取数据库。



**ES（Event Sourcing）**

举个例子：我们平常记账有两种方式，直接记录每次账单的结果或者记录每次的收入/支出，那么我们自己计算的话也可以得到结果，ES 就是后者。

第一种：80 -> 60 -> 70 (面向结果)

第二种：-20 -> -20 -> +10 (面向过程)

而 Event Sourcing 其实就是**面向过程**的一种方式，每一次事件会记录当前干了什么，而不会直接获取结果，当需要结果时，可根据事件记录推导结果。这种方式的最大的优点就是**高性能，可追踪**。



[Redux 官方文档](https://cn.redux.js.org/docs/introduction/ThreePrinciples.html)中的三大原则

> **单一数据源** -> 来源与 Flux 架构
>
> 	- 整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
>
> **State 是只读的** -> 来源与 Event Sourcing
>
> 	- 唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象
> 	- 这样确保了视图和网络请求都不能直接修改 state，相反它们只能表达想要修改的意图
> 	- Action 就是普通对象而已，因此它们可以被日志打印、序列化、储存、后期调试或测试时回放出来
>
> **使用纯函数来执行修改** -> 来源与 CQRS
>
> ```
> - 为了描述 action 如何改变 state tree ，你需要编写 Reducers
> - Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state
> ```



所以，Redux 中的设计思想其实就是将以上三种架构思路容纳在一起，形成了自己的一套状态管理解决方案。



### 2.2 Redux 的数据流

#### 2.2.1 Redux 的核心运作流程

相信同学们在写 Redux 的时候应该遇到过这样一个问题，也许就一个简简单单的修改并存储数据的操作，要写好几个模板代码。我们熟知的 Redux 那几个核心概念是都会有一个文件需要我们自己去写。

Redux 由 [Flux](http://facebook.github.io/flux/) 演变而来，是基于 Flux 架构思想的一个库的实现。它的核心运作流程为：

![Redux Library API â¢ Redux is a small and compact library: o createStore(reducer) o combineReducers(reducers) o applyMiddle...](https://image.slidesharecdn.com/reduxdataflowwithangular2-161118085712/95/redux-data-flow-with-angular-2-20-638.jpg?cb=1479459463)



1. View 层通过 dispatch 方法发出 action，通知 store 用户有新操作
2. store 收到通知会将处理权利交给 reducer，并传递给 reducer 两个参数：previousState 和 action
3. reducer 针对收到的用户操作（action）进行对应的数据处理，最后将处理完生成的新数据返回给 store。
4. store 收到新数据会通知 View 进行更新。



#### 2.2.2 Redux 与 Flux 的区别

Redux 的作用跟 Flux 是一样的，它可以看作是 Flux 的一种实现，但是又有点不同，具体的不同总结起来就是:

- **Redux 只有一个 Store**：Flux 里面会有多个 Store 存储应用数据，并在 Store 里面执行更新逻辑，当 Store 变化的时候再通知 controller-view 更新自己的数据，Redux 将各个 Store 整合成一个完整的 Store，并且可以根据这个 Store 推导出应用完整的 state。同时 Redux 中更新的逻辑也不在 Store 中执行而是放在 Reducer 中。
- **Redux 没有 Dispatcher**：Redux 没有 Dispatcher 这个概念。它使用的是 Reducer 来进行事件的处理，Reducer 是一个纯函数`(preState, action) => newState`，根据应用的状态和当前的 action 推导出新的 state。在 Redux 应用中，可能有多个 Reducer，每一 Reducer 来负责维护应用整体 state 树中某一部分，多个 Reducer 可以合并成一个 Reducer，来维护整个 state。



**Flux 数据流**

![flux](https://github.com/wangning0/Autumn_Ning_Blog/raw/master/blogs/2016-1-3/flux/pt/flux_c.png)

​	

**Redux 数据流**

![redux](https://github.com/wangning0/Autumn_Ning_Blog/raw/master/blogs/2016-1-3/flux/pt/redux_c.png)





#### 2.2.3 小节

1. Redux 主要解决了两个问题
   - 跨组件间数据传递的问题
   - 通过架构约定解决 UI 和 Data 分离问题
2. Redux 的设计思想主要是来源与 Flux 架构，并且方案上结合了 CQRS 和 ES，实现了可预测，可追溯的数据。
3. Redux 核心运作流程实际上遵循了三大原则
   - 单一数据源 -> 唯一一个 Store
   - state 是只读的 -> 需要 dispatch 一个 action
   - 使用纯函数来执行修改 -> 真正的 state 有且只能通过 Reducer 纯函数来修改
4. Redux 与 Flux 的区别主要是两个
   - Redux 只有一个 Store
   - Redux 没有 Dispatcher
   
   

### 2.3 手写一个 Redux

我们已经了解了 Redux 的运行机制，以及我们在使用层面用到几个核心概念，那接下来我们可以尝试深入到 Redux 的代码中去，通过代码更加了解 Redux 的实现细节。



#### 2.3.1 实现 createStore 方法

首先我们看下 [API 文档](https://cn.redux.js.org/docs/api/)，我们一定要使用到的方法就是 createStore 方法，我们看下这个方法的入参。我们知道 createStore 看这个名字一定就是这个方法创建了一个 Store 的对象，然后我们看看这个 Store 对象上有什么。
其实有一定经验的同学一看这个 API 就可以知道这个函数内部是如何实现了，我们看这个 dispatch 和 subscribe，听名字就知道这个就是个发布订阅器。那我们这么去实现一个发布订阅呢？



Redux 官网的计数器 Demo

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <div>
      <p>
        Clicked: <span id="value">0</span> times
        <button id="increment">+</button>
        <button id="decrement">-</button>
        <button id="incrementIfOdd">Increment if odd</button>
      </p>
  </div>
</body>
</html>
```



```javascript
import { createStore } from 'redux';

function counter(state, action) {
  if (typeof state === 'undefined') {
    return 0
  }
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

let store = createStore(counter);

var valueEl = document.getElementById('value');

function render() {
  valueEl.innerHTML = store.getState().toString();
}

render();

store.subscribe(render);

document.getElementById('increment')
  .addEventListener('click', function () {
    store.dispatch({ type: 'INCREMENT' })
  });

document.getElementById('decrement')
  .addEventListener('click', function () {
    store.dispatch({ type: 'DECREMENT' })
  });

document.getElementById('incrementIfOdd')
  .addEventListener('click', function () {
    if (store.getState() % 2 !== 0) {
      store.dispatch({ type: 'INCREMENT' })
    }
  });
```

#### 2.3.2 代码技巧

**技巧一：** 有三个形参时，实现第二个形参可以选填：

```javascript
if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
  	enhancer = preloadedState
    preloadedState = undefined
}
```



**技巧二：**发布订阅有一种比较巧妙的写法就是，写订阅时直接返回取消订阅的方法

```javascript
function subscribe(listener) {
 	...
  return function unSubcribe() {
    ...
  }
}
```



**技巧三：** isDispatching 规定 reducer 中不允许使用 getState、subscribe 和 dispatch。关键代码在 dispatch 方法中（见下面的代码片段），可以看到在开始执行 reducer 之前 isDispatching 先置为 true，一直到 reducer 全部执行完才会再设置为 false，随后只要分别在 getState、subscribe、dispatch 三个方法中判断当 isDispatching 为 true 时抛出异常。

```javascript
 try {
   isDispatching = true
   currentState = currentReducer(currentState, action)
 } finally {
   isDispatching = false
 }
```



**技巧四：**在操作引用类型数据的时候，一定要注意是否具有唯一性，如果多处使用，对于结果一定要有自己的预判

```javascript
if (nextListeners === currentListeners) {
  nextListeners = currentListeners.slice();
}
```





### 2.4 combineReducers 的源码分析

```javascript
// 传入一个 object
export default function combineReducers(reducers) {
  // 获取该 Object 的 key 值
  const reducerKeys = Object.keys(reducers)
  // 过滤后的 reducers
  const finalReducers = {}
  // 获取每一个 key 对应的 value
  // 在开发环境下判断值是否为 undefined
  // 然后将值类型是函数的值放入 finalReducers
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i]

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning(`No reducer provided for key "${key}"`)
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key]
    }
  }
  // 拿到过滤后的 reducers 的 key 值
  const finalReducerKeys = Object.keys(finalReducers)

  // 在开发环境下判断，保存不期望 key 的缓存用以下面做警告
  let unexpectedKeyCache
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError
  try {
    // 该函数解析在下面
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }
  // combineReducers 函数返回一个函数，也就是合并后的 reducer 函数
  // 该函数返回总的 state
  // 并且你也可以发现这里使用了闭包，函数里面使用到了外面的一些属性
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }
    // 该函数解析在下面
    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      )
      if (warningMessage) {
        warning(warningMessage)
      }
    }
    // state 是否改变
    let hasChanged = false
    // 改变后的 state
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      // 拿到相应的 key
      const key = finalReducerKeys[i]
      // 获得 key 对应的 reducer 函数
      const reducer = finalReducers[key]
      // state 树下的 key 是与 finalReducers 下的 key 相同的
      // 所以你在 combineReducers 中传入的参数的 key 即代表了 各个 reducer 也代表了各个 state
      const previousStateForKey = state[key]
      // 然后执行 reducer 函数获得该 key 值对应的 state
      const nextStateForKey = reducer(previousStateForKey, action)
      // 判断 state 的值，undefined 的话就报错
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      // 然后将 value 塞进去
      nextState[key] = nextStateForKey
      // 如果 state 改变
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    // state 只要改变过，就返回新的 state
    return hasChanged ? nextState : state
  }
}
```



`combineReducers` 函数总的来说很简单，总结来说就是接收一个对象，将参数过滤后返回一个函数。该函数里有一个过滤参数后的对象 finalReducers，遍历该对象，然后执行对象中的每一个 reducer 函数，最后将新的 state 返回。



###2.5 中间件机制的原理以及 applyMiddlewares 的源码分析

这是很重要的一个工具方法，代码量很小，但无论从代码技巧上还是使用地位上都很重要。

Redux 中间件的作用实际是增强了 dispatch 功能。看源码最后 return { …store, dispatch} 可以知道是用增强后的 dispatch 替代了原来的 store.dispatch。下图为 applyMiddleware 在工作流中的作用。



![This is what the Redux middleware flow looks like](https://designingforscale.com/content/images/2017/09/reduxMiddleware.png)



1. 遵循 Redux middleware API 的函数，接受 Store 的 dispatch 和 getState 函数作为命名参数
2. 返回一个应用了 middleware 后的 store enhancer



#### 2.5.1 代码分析

```javascript
// 该函数返回一个柯里化的函数
// 所以调用这个函数应该这样写 applyMiddleware(...middlewares)(createStore)(...args)
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
   // 这里执行 createStore 函数，把 applyMiddleware 函数最后次调用的参数传进来
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }
    let chain = []
    // 每个中间件都应该有这两个函数
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 把 middlewares 中的每个中间件都传入 middlewareAPI
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 和之前一样，从右至左调用每个中间件，然后传入 store.dispatch
    dispatch = compose(...chain)(store.dispatch)
    // 这里只看这部分代码有点抽象，我这里放入 redux-thunk 的代码来结合分析
    // createThunkMiddleware返回了3层函数，第一层函数接收 middlewareAPI 参数
    // 第二次函数接收 store.dispatch
    // 第三层函数接收 dispatch 中的参数
		// 最后把经过中间件加强后的 dispatch 于剩余 store 中的属性返回，这样你的 dispatch
    return {
      ...store,
      dispatch
    }
  }
}
```



```javascript
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
  // 判断 dispatch 中的参数是否为函数
    if (typeof action === 'function') {
    // 是函数的话再把这些参数传进去，直到 action 不为函数，执行 dispatch({tyep: 'XXX'})
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}
const thunk = createThunkMiddleware();

export default thunk;
```



####2.5.2 代码技巧

**技巧一：**函数柯里化的应用

可以看到 middleware 的写法 `({dispatch, getState}) => (next) => (action) => action` 是一种典型的柯里化函数，柯里化函数很适合做**偏底层**一些的函数抽象，方便再次封装时拿到任何一层的返回结果去做相应操作，随后也可选择是否再继续调用、何时调用。另外通过 middleware 结合 compose 的使用知道，柯里化函数很方便做函数组合。



**技巧二： **多个中间件组合调用

在 applyMiddleware 中我们知道调用 `compose(middleware1, middleware2, middleware3)(store.dispatch)` 相当于调用 `middleware1( middleware2( middleware3( store.dispatch ) ) )`。compose 源码中只用了数组的原生方法 reduce 就优雅的解决了函数层层嵌套的问题。

这对我们平时写代码是个很好的启发，reduce 方法还很擅长做求和、去重、数组扁平化、数据分类等复杂操作，可以替代很多递归操作来实现功能。



```javascript
export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```







## 3. React-Redux 中几个重要方法的解析

### 3.1 React-Redux 与 Redux 之间的关系

Redux 是一款状态管理库，Redux 本身和 React 没有关系，只是状态管理中心，是 [React-Redux](https://cn.redux.js.org/docs/react-redux/api.html) 让他们联系在一起。

![关系图](https://segmentfault.com/img/remote/1460000011473976?w=1149&h=554)

Redux 是独立的应用状态管理工具。它是可以独立于 React 之外的。如果我们需要在 React 当中运用它，那么我们需要手动订阅 Store 的状态变化，来对我们的 React 组件进行更新。而 React-Redux 就可以帮我们实现了这个功能，我们只需对 Store 进行处理，React 组件就会有相应的变化。



**结论：**

1. Redux 本身和任何框架或者库都没有关系
2. React-Redux 两个主要的 API，Provider 和 connect



### 3.2 Provider 的作用与原理

[Provider](https://github.com/reduxjs/react-redux/blob/4.x/src/components/Provider.js) 模块的功能并不复杂，主要分为以下两点：

- 在原应用组件上包裹一层，使原来整个应用成为 Provider 的子组件
- 接收 Redux 的 Store 作为 props，通过context 对象传递给子孙组件上的 connect



```javascript
export default class Provider extends Component {
  getChildContext() {
    return { store: this.store }
  }

  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }

  render() {
    return Children.only(this.props.children)
  }
}

Provider.propTypes = {
  store: storeShape.isRequired,
  children: PropTypes.element.isRequired
}
Provider.childContextTypes = {
  store: storeShape.isRequired
}

```



render 方法中，渲染了其子级元素，使整个应用成为 Provider 的子组件。

1. `this.props.children`是 React 内置在 `this.props` 上的对象，用于获取当前组件的所有子组件
2. Children 为 React 内部定义的顶级对象，该对象上封装了一些方便操作子组件的方法。Children.only 用于获取仅有的一个子组件，没有或超过一个均会报错。**故需要注意：确保 Provider 组件的直接子级为单个封闭元素，切勿多个组件平行放置。**

**一句话就是 Provider 将 Redux 中的 Store 对象通过 context 传给所有的子组件。**



### 3.3 connect 方法的原理

正如这个模块的命名，[connect](https://cn.redux.js.org/docs/react-redux/api.html) 模块才是真正连接了 React 和 Redux。



> connect(mapStateToProps, mapDispatchToProps, mergeProps)(MyComponent)



```javascript
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
export const connect = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    }
    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }
    componentDidMount() {
      const { store } = this.context
      store.subscribe(() => this.update())
      this.update()
    }
    update() {
      const { store } = this.context
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}
```

1、connect 通过 context 获取 Provider 中的 Store，通过 store.getState() 获取整个 Store tree 上所有 state
2、connect 模块的返回值 wrapWithConnect 为 function
3、wrapWithConnect 返回 一个 ReactComponent 对象 Connect，Connect 重新 render 外部传入的原组件WrappedComponent，并把 connect 中传入的 mapStateToProps, mapDispatchToProps 与组件上原有的 props 合并后，通过属性的方式传给 WrappedComponent。



**Connect 的功能概括起来就两点：**
**1、包装原组件，将 state 和 action 通过 props 的方式传入到原组件内部**
**2、监听 store tree 变化，使其包装的原组件可以响应 state 变化**



**小结**

分析 React-Redux 源码，详细介绍了Provider 和 connect模块，重新梳理了React、Redux、React-Redux 三者间的关系。

可以看到，React-Redux 的核心功能都在 connect模块中，理解好这个模块，有助于我们更好的使用 React-Redux 处理业务问题，优化代码性能。



## 4. Redux-Saga 的设计思想以及基本用法

###4.1 Redux-Saga 的介绍

[Redux-Saga](https://redux-saga-in-chinese.js.org/) 是一个用于管理应用程序 Side Effect（副作用，例如异步获取数据，访问浏览器缓存等）的 library，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。



![Redux Logo Landscape](https://redux-saga.js.org/logo/0800/Redux-Saga-Logo-Landscape.png)





### 4.2 从 Redux-thunk 过渡到 Redux-Saga

虽然它们都是为了解决异步 action 的问题，但是本质上完全不一样。Thunk 比较简单，没有做太多的封装，把大部分自主权交给了用户。缺点就是要写的代码有点多，没有任何封装，很多事情需要开发者手动去做。

而 Redux Saga 采用了另外一套思路，Saga 可以理解为一个和系统交互的常驻“进程”，而所有的异步操作看成“线程”。Redux-Saga 把异步获取数据这类的操作都叫做副作用（Side Effect）。



**Redux-Saga 的理解**

Redux-Saga 其实就是一个 Redux 中间件。从结果上来讲，可以将 Redux-Saga 理解为 **Redux-Thunk + Generator 函数**，它通过创建 Sagas 将所有的异步操作逻辑存放在一个地方进行集中处理。

预备知识：[ES6 的 Generator 函数](http://es6.ruanyifeng.com/#docs/generator)

```javascript
import { put, takeEvery, delay } from 'redux-saga/effects'

function* incrementAsync(action) {
   try {
      yield delay(1000)
      yield put({type: "INCREMENT"});
   } catch (e) {
   }
}

function* mySaga() {
  yield takeEvery("INCREMENTASYNC", incrementAsync);
}

export default mySaga;
```



```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import counter from './reducers'
import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const middlewares = applyMiddleware(sagaMiddleware, logger)
const store = createStore(counter, middlewares)


sagaMiddleware.run(mySaga)
```



相比 Redux-Thunk，使用 Redux Saga 有几处明显的变化：

- 在组件中，不再 `dispatch(action creator)`，而是 `dispatch(pure action)`
- 组件中不再关注由谁来处理当前 action，action 经由 root saga 分发
- 使用 `ES6 Generator` 语法，简化异步代码语法

除开上述这些不同点，Redux Saga 真正的威力，在于其提供了一系列帮助方法，使得对于各类事件可以进行更细粒度的控制，从而完成更加复杂的操作。



### 4.3 Redux-Saga 常用的 effects API

#### 4.3.1 [Effect](https://redux-saga-in-chinese.js.org/docs/api/)

一个 effect 就是一个 Plain Object JavaScript 对象，可以使用 Redux-Saga 提供的工厂函数来创建 effect。 举个例子，你可以使用 `put({type: "SUCCEEDED", action.data})` 指示 middleware 调用 Redux 中的 dispatch， 并将结果返回给 yield effect 的那个 Generator。

Effect 可以通过 yield 传给 sagaMiddleware 进行执行， 如果我们应用 Redux-Saga，**所有的 Effect 都必须被 yield 才会执行**。



**take(pattern)**   

> 等待 dispatch 匹配某个 action
>
> 可以理解为 *拿到消息* 

```javascript
yield take('CLICK_Action');
```

take 系列还包含 takeEvery(pattern, saga, ...args)，takeLatest(pattern, saga, ...args)

- take 只会执行一次
- take 没有第二个参数



**put(action)**

> 触发某个 action， 作用和 dispatch 相同
>
> 可以理解为把 *消息同步给 store*

```javascript
export function* asyncData(action) {
   try {
      yield put({type: "SUCCEEDED", action.data})
   } catch (error) {
      yield put({type: "FAILED", error})
   }
}
```



**call(fn, ...args)**

>  调用函数 `fn` 
>
> 可以理解为 **处理消息**

```javascript
export function* fetchData(action) {
   try {
      const data = yield call(Api.fetchUser, action.payload.url)
      yield put({type: "FETCH_SUCCEEDED", data})
   } catch (error) {
      yield put({type: "FETCH_FAILED", error})
   }
}
```



**select(selector, ...args)**

> 作用和 Redux  中的 getState 相同
>
> 可以理解为从 *store 获取数据*

```javascript
function* incrementAsync(action) {
   try {
      yield delay(1000)
      const data = yield select() // 不传参数就是拿到整个 store 的数据
      yield put({type: "INCREMENT"});
   } catch (e) {
   }
}
```



**fork(fn, ...args)**

> 调用函数 `fn` , 作用跟 call 相同
>
> 但是这里调用为**非阻塞调用**



####4.3.2 阻塞调用/非阻塞调用

阻塞调用的意思是，Saga 在 yield Effect 之后会等待其执行结果返回，结果返回后才会恢复执行 Generator 中的下一个指令。

非阻塞调用的意思是，Saga 会在 yield Effect 之后立即恢复执行。



```javascript
function* saga() {
  yield take(ACTION)              // 阻塞: 将等待 action
  yield call(ApiFn, ...args)      // 阻塞: 将等待 ApiFn (如果 ApiFn 返回一个 Promise 的话)
  yield call(otherSaga, ...args)  // 阻塞: 将等待 otherSaga 结束

  yield put(...)                   // 阻塞: 将同步发起 action (使用 Promise.then)

  const task = yield fork(otherSaga, ...args)  // 非阻塞: 将不会等待 otherSaga
  yield cancel(task)                           // 非阻塞: 将立即恢复执行
}
```



####4.3.3 模拟登录

sagas.js

```javascript
import { put, takeEvery, call } from 'redux-saga/effects'
import api from './services'

function* login(action) {
   try {
     yield put({ type: "REQUESTLOGIN" });
     const data = yield call(api.login, action.userName);
     yield put({ type: "LOGINSUCCESS", data });
   } catch (error) {
     yield put({ type: "LOGINFAILD", error });
 }
}

function* mySaga() {
  yield takeEvery("LOGIN", login);
}

export default mySaga;
```



Home.js

```javascript
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
    }
  }

  setUserName = (userName) => {
    this.setState({
      userName,
    })
  }

  render() {
    const { isLogin, login, loading, error } = this.props
    const { userName } = this.state;
    return (
      <div>
        <p>用户登录</p>
        <hr />
        <input
          type="text"
          onChange={e => this.setUserName(e.target.value)}
          value={userName}
        />
        <button onClick={() => login(userName)} disabled={loading}>{loading ? "登录中..." : "登录"}</button>
        {error && <p>{error}</p>}
        {isLogin && <p>欢迎, {userName}</p>}
      </div>
    )
  }
}

const mapStateToProps = state => (
  {
    isLogin: state.isLogin,
    loading: state.loading,
    error: state.error,
  }
)

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home)
```



reducer.js

```javascript
export default (state = { isLogin: false, loading: false, error: "" }, action) => {
  switch (action.type) {
    case "REQUESTLOGIN":
      return { isLogin: false, loading: true, error: "" };
    case "LOGINSUCCESS":
      return { isLogin: true, loading: false, error: "" };
    case "LOGINFAILD":
      return { isLogin: false, loading: false, error: action.error };
    default:
      return state;
  }
}
```



#### 4.3.4 总结

- Redux-thunk

```javascript
export function fetchData(someValue) {
  return (dispatch, getState) => {
    myAjaxLib.post("/someEndpoint", { data: someValue })
      .then(response => dispatch({ type: "REQUEST_SUCCEEDED", payload: response })
        .catch(error => dispatch({ type: "REQUEST_FAILED", error: error });
  };
}
```

- Redux-Saga

```javascript
function* fetchData(action) {
  const { payload: { someValue } } = action;
  try {
    const result = yield call(myAjaxLib.post, "/someEndpoint", { data: someValue });
    yield put({ type: "REQUEST_SUCCEEDED", payload: response });
  } catch (error) {
    yield put({ type: "REQUEST_FAILED", error: error });
  }
}
```



**Redux-Saga 的优缺点**

优点：

1. 集中处理了所有的异步操作，异步部分一目了然
2. 以同步的方式写异步代码
3. 异步操作的流程是可以控制的，可以随时取消相应的异步操作

缺点：

1. 太复杂，学习成本较高
2. 思维非线性



**个人建议：**异步操作比较多并且多人维护的业务场景，建议使用



## 5. 另外一种状态管理解决方案 -- Mobx 

### 5.1 Mobx 的介绍

我们先清空一下大脑，回到初心，思考我们需要解决的问题是什么。

状态管理的核心诉求简单来说就是：统一维护公共的应用状态，以统一并且可控的方式更新状态，状态更新后，View 跟着更新。不管是什么思想，达成这个目标就 ok。



Flux 体系的状态管理方式，只是一个选项，但并不代表是唯一的选项。MobX 就是另一个选项。

MobX背后的哲学很简单：任何源自应用状态的东西都应该自动地获得。译成人话就是**状态只要一变，其他用到状态的地方就都跟着自动变**。



![MobX unidirectional flow](https://cn.mobx.js.org/flow.png)

### 5.2 Mobx 的用法

Mobx 背后的哲学就是 状态只要一变，其他用到**状态（被观察者）**的**地方（观察者）**就都跟着自动变。

观察者与被观察者

**被观察者  Observable state(可观察的状态)**

```javascript
import { observable } from "mobx";

class Todo {
    @observable title = "";
    @observable finished = false;
}
```



**观察者  Computed values(计算值)**

```javascript
import { observable, computed } from "mobx";

class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}
```



**观察者  Reactions(反应)**

```javascript
import { observable, computed, autorun } from "mobx";

class TodoList {
    @observable todos = [];
    @computed get unfinishedTodoCount() {
        return this.todos.filter(todo => !todo.finished).length;
    }
}

const todos = new TodoList()

 autorun(() => {
   console.log("Tasks left: " + todos.unfinishedTodoCount)
 })

```



**三个步骤**

首先 Mobx 跟 Redux 一样，它也只是一个基础库，要将 Mobx 结合 React ,必须使用另一个库，叫做 [mobx-react](https://github.com/mobxjs/mobx-react)。

1. 定义状态并使其可观察

   ```javascript
   import { observable, action, computed } from 'mobx'
   
   class ClickTimesStore {
     @observable count = 0
   
     @action inc = () => {
       this.count++
     }
   
     @action dec = () => {
       this.count--
     }
   
     @computed get totalClickTime() {
       return this.count + ' - ' + Math.random()
     }
   }
   
   export default new ClickTimesStore
   ```

   

2. 创建视图以响应状态的变化

   ```javascript
   import React from 'react'
   import { observer, inject } from 'mobx-react'
   
   @inject('clickTimes')
   @observer
   class Counter extends React.Component {
   
     constructor(props) {
       super(props)
     }
   
   	render() {
   		return (
       	<div>
           <button> + </button>
           <button> - </button>
           <p>observable Count: </p>
           <pre>
             {this.props.clickTimes.count}
           </pre>
           <p>@computed values:</p>
           <pre>
             {this.props.clickTimes.totalClickTime}
           </pre>
   			</div>
       )
   	}
   }
   
   export default Counter
   
   ```

   

3. 更改状态

   ```javascript
   onInc = () => {
     this.props.clickTimes.inc()
   }
   
   onDec = () => {
     this.props.clickTimes.dec()
   }
   
   <button onClick={this.onInc}> + </button>
   <button onClick={this.onDec}> - </button>
   ```

   



### 5.3 Redux vs Mobx

**单个 Store vs 多个 Store**

简单来说，Store 就是您保存所有数据的地方。

Redux 总是有一个大型 Store，其中存储了所有状态。 Mobx 通常有多个 Store。 因此，在 Mobx 中，我们可以在逻辑上分隔 Store。

此外，在 Redux 中，数据通常是标准化的。 在 Mobx 中，您可以保留非规范化数据。



**普通数据 vs 可观察数据**

Redux 使用普通的 Javascript 对象来存储数据。 而 Mobx 使用 observable 来存储数据，我们可以监听可观察数据并自动跟踪数据发生的变化。 而在 Redux 中，必须手动跟踪所有更新。



**不可变与可变（纯与不纯）**

Redux 使用不可变状态。 这意味着状态是只读的，不能直接覆盖它们。 在 Redux 中，先前的状态被新状态替换。 因此 Redux 是纯粹的，或者它使用 [纯函数](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976).

当你必须恢复到以前的状态时，这可以非常方便。 例如 撤消回退 操作。

在 Mobx 中，状态可以被覆盖。 只需使用新值更新状态即可。 因此，Mobx 可以被称为不纯粹。



**学习成本**

Mobx 更容易学习，并且具有稳定的学习曲线。 特别是因为大多数传统的 Javascript 开发人员都熟悉 OOP，所以很容易掌握 Mobx。 Mobx 中有很多抽象，这也使它更容易。 你不必为许多事情烦恼，否则你必须小心。 （例如：订阅状态）

Redux 遵循函数式编程范例。 对于没有函数式编程经验的 Javascript 开发人员来说，很难直接完全掌握 Redux。 您将需要了解像 [Redux Thunk ](https://github.com/gaearon/redux-thunk)这样的中间件，这将使学习曲线更加陡峭。

在 MobX 中有很多内置的抽象，这导致代码更少。 但是在实现 Redux 时，你最终会编写很多样板代码。



**规模和维护**

由于整个纯函数的东西和函数式编程范例 Redux 更易于维护。 Redux可以控制一切。



**如何选择做选型**

1. 应用程序是否小而简单？

   选 MobX

2. 喜欢快速构建应用程序？

   选MobX

3. 大型团队正在寻找更易维护的代码？

   选 Redux

4. 具有可扩展选项的复杂应用

   选 Redux

5. 最后也是最重要的问题 -- 你喜欢哪一个？

   就选择哪一个

因为：

![img](https://media.giphy.com/media/l0EoA9PZXBnvJDQxW/giphy.gif)

##6. 状态管理容器使用的最佳实践