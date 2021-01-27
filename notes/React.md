# react基础

### 什么是react

> react是一个构建用户界面的js库
>
> 起源于facebook的内部项目,13年开源

#### 特点

+ 声明式
+ 基于组件
+ 学习一次随处使用

### 配合脚手架

⚠️npx create-react-app my-pro

> 这里的npx是npm5.2之后自带的指令,就是可以不用安装到本地,直接执行远程的脚手架,创建项目,建议使用

启动项目 npm start/yarn start 



### 脚手架中使用React

```react
import React from 'react'
import React from 'react-dom'

const h1 = React.creatElement('h1', null, '我是标题')
ReactDOM.render(h1, document.getElementById('root'))
```



### JSX的使用

> 基于上面使用React.creatElement创建dom会比较麻烦,当结构复杂的时候
>
> jsx就是js的扩展,babel中的preset-react会对该语法解析

⚠️**注意点**

+ react元素的属性名使用驼峰命名法,且要避免使用关键字,例如class --> className
+ 没有子节点可以单标签自闭合
+ 推荐使用小括号包裹防止意外插入分号

### JSX语法

#### 嵌入JS表达式

语法: {javascript表达式}

⚠️**注意点**

+ 合法表达式都可以嵌入
+ JSX本身也是js表达式,可以直接放一个jsx
+ js中对象只会出现在style中,其他的不支持会报错
+ 不能出现js语句,会报错

### 条件渲染

+ 使用if-else
+ 三元表达式
+ 短路语句

### 列表渲染

+ 渲染一组数据应该使用数组的map方法
+ 同时也是需要加key属性的,原则就是map()遍历谁就给谁添加key属性
+ 同时key不要使用索引号做为key

### 样式处理

##### 行内样式-style

```react
<li key={item.id} style={{'color': 'red',"backgroundColor": 'pink'}}>{item.name}</li>
```

##### 类名 -className

创建CSS文件编写样式代码

```css
.container {
    text-align: center
}
```

在js中进行引入，然后设置类名即可

```react
import './css/index.css'

<li className='container' key={item.id} style={{'color': 'red',"backgroundColor": 'pink'}}>{item.name}</li>
```

# react组件

> 使用react就是在使用组件,特点: 可复用 独立 可组合

### 组件的类型

##### 函数式组件(无状态组件)

+ 函数名必须以大写字母开头,这是用来却别原生元素和组件的,必须要大写
+ 函数组件必须有返回值,如果没有也要手动返回null表示不渲染任何内容

#### 示例demo

编写函数组件

```react
function Hello() {
    return (
        <div>这是第一个函数组件</div>
    )
}
```

利用ReactDOM.render()进行渲染

```react
ReactDOM.render(<Hello />,document.getElementById('root'))
```



##### 类组件⚠️

+ 使用ES6语法的class创建的组件
+ 类民称也必须要大写字母开头
+ 类应该继承React.Component父类,从而可以使用父类中的属性和方法
+ 类组件必须提供render方法,且render方法必须要有return返回值,没有也返回null

##### 抽离成单独的JS文件式组件

将每个组件放到单独的JS文件中,使用ES6模块化导入导出然后和html元素一样在jsx中使用就行



### React事件处理⚠️

#### 事件绑定

+ 类似原生DOM事件
+ on + 事件名 = 事件处理函数 onClick = function() {}
+ 注意: React事件采用驼峰命名法

```react
export default class extends React.Component {
    clickHandle(e){
        console.log('点了')
    }
    render(){
        return (
            <div><button onClick = {this.clickHandle}>点我点我点我</button></div>
        )
    }
}
```

+ 类组件和函数组件事件是差不多的,只是在类组件中绑定事件函数时需要用来this.在函数中不需要用this

#### 事件对象

+ 可以通过事件处理函数的参数获取到事件对象
+ React的事件对象叫做 合成事件,做个兼容处理的结果,兼容所有浏览器
+ 除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 `stopPropagation()`和 `preventDefault()`
+ 如果你想获取到原生事件对象，可以通过 `nativeEvent` 属性来进行获取

```react
export default class extends React.Component {
    clickHandle(e){
        // 获取原生事件对象
        console.log(e.nativeEvent)
    }
    render(){
        return (
            <div><button onClick = {this.clickHandle}>点我点我点我</button></div>
        )
    }
}
```

### 有状态组件和无状态组件

- 函数组件又叫做 无状态组件，类组件又叫做 有状态组件
- 状态(state) 即数据
- 函数组件没有自己的状态，只负责数据展示
- 类组件有自己的状态，负责更新UI，让页面动起来



### State和SetState

#### state的基本使用

+ 状态state即数据,是组件内部的私有数据,只能在组件内部使用
+ state的值是对象,表示一个组件中可以 有 多个数据
+ 通过this.state来获取状态

```react
export default class extends React.Component {
    constructor(){
        super()

        // 第一种初始化方式
        this.state = {
            count : 0
        }
    }
    // 第二种初始化方式
    state = {
        count:1
    }
    render(){
        return (
            <div>计数器 :{this.state.count}</div>
        )
    }
}
```

#### setState()修改状态

+ 状态是可变的
+ this.setState({需要改的数据})
+ ⚠️不要直接修改state中的值,这是错误的
+ setState()作用 1.修改state2.更新UI -- 数据驱动视图

```react
export default class extends React.Component {
    // 第二种初始化方式
    state = {
        count:1
    }
    render(){
        return (
            <div>
                <div>计数器 :{this.state.count}</div>
                <button onClick={() => {
                     this.setState({
            	 		count: this.state.count+1
           			  })   
                }}>+1</button>
            </div>
        )
    }
}
```

+ 修改state里面的值我们需要通过this.setState()来进行修改
+ React底层会有监听,一旦我们调用了setState导致了数据的变化,就会重新调用一个render方法,重新渲染当前组件



### 抽取事件处理函数this指向问题

⚠️当我们把上面代码的事件处理程序抽取出来后，会报错，找不到this

#### 解决办法

+ 在JSX中我们写的事件处理函数可以找到this，原因在于在JSX中我们利用箭头函数，箭头函数是不会绑定this，所以会向外一层去寻找，外层是render方法，在render方法里面的this刚好指向的是当前实例对象
+ 利用原型bind方法是可以更改函数里面this的指向的，所以我们可以在构造中调用bind方法，然后把返回的值赋值给我们的函数即可

```react
class App extends React.Component {
  constructor() {
    super()
	...
    // 通过bind方法改变了当前函数中this的指向
    this.onIncrement = this.onIncrement.bind(this)
  }
  // 事件处理程序
  onIncrement() {
    ...
  }

  render() {
    ...
  }
}
```

+ class的实例方法

```react
 // 事件处理程序
  onIncrement = () => {
    console.log('事件处理程序中的this：', this)
    this.setState({
      count: this.state.count + 1
    })
  }
```

其实就是将实例的处理函数改成尖头函数,这样this就能够指向实例了

⚠️注意：该语法是实验性语法，但是，由于babel的存在可以使用

### 表单处理

> 因为html表单元素有自己的状态,但是作为react组件所有的状态改变都必须通过setState改变
>
> 所以就出现受控组件和非受控组件,主要是表单的处理

#### 受控表单组件的处理过程

文本框、富文本框、下拉框

+ 将value值与state绑定,然后添加onChange事件通过this.setState改变状态

单选框

+ 单选框需要绑定checked的值,然后也是添加onChange事件

#### 优化

+ 多个表单公用一个事件处理函数就行了,只需要判断e.target的type区别出是value还是checked值
+ 在表单上面添加name属性值和状态的属性同名就行了

#### 非受控组件的处理过程

> 主要是通过ref获取dom并操作dom的方法

- 调用 `React.createRef()` 方法创建ref对象
- 将创建好的 ref 对象添加到文本框中
- 通过ref对象获取到文本框的值



### React组件基础总结

1. 组件的两种创建方式: 函数组件和类组件
2. 无状态(函数)组件,负责静态结构展示
3. 有状态(类)组件,负责更行UI,让页面动起来
4. 绑定事件注意this指向问题
5. 推荐使用受控组件来处理表单
6. 完全利用JS语言的能力创建组件,这就是React的思想

# React组件进阶

## 目标

- 能够使用props接收数据
- 能够实现父子组件之间的通讯
- 能够实现兄弟组件之间的通讯
- 能够给组件添加props校验

## 组件通讯介绍

组件是独立且封闭的单元，默认情况下，只能使用组件自己的数据。在组件化过程中，我们将一个完整的功能拆分成多个组件，以更好的完成整个应用的功能。而在这个过程中，多个组件之间不可避免的要共享某些数据。为了实现这些功能，就需要打破组件的独立封闭性，让其与外界沟通，这个过程就是组件通讯

## 组件的props（★★★）

### 基本使用

- 组件时封闭的，要接受外部数据应该通过props来实现
- props的作用：接收传递给组件的数据
- 传递数据：给组件标签添加属性

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/props-设置.png)

- 接收数据：函数组件通过 参数 props接收数据，类组件通过 this.props接收数据

  - 函数组件获取

    ![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/函数组件获取.png)

  - 类组件获取

    ![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/类组件获取.png)


​    

### 特点

- 可以给组件传递任意类型的数据
- props是只读属性，不能对值进行修改
- 注意：使用类组件时，如果写了构造函数，应该将props传递给super(),否则，无法在构造函数中获取到props，其他的地方是可以拿到的

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/类组件注意点.png)

## 组件通讯的三种方式（★★★）

### 父组件传递数据给子组件

- 父组件提供要传递的state数据
- 给子组件标签添加属性，值为state中的数据
- 子组件中通过props接收父组件中传递的数据

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/父传子.png)

### 子组件传递数据给父组件

- 利用回调函数，父组件提供回调，子组件调用，将要传递的数据作为回调函数的参数
- 父组件提供一个回调函数，用来接收数据
- 将该函数作为属性的值，传递给子组件

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/子传父-父亲设置回调.png)

- 子组件通过props调用回调函数

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/子传父-调用回调.png)

### 兄弟组件传递

- 将共享状态(数据)提升到最近的公共父组件中，由公共父组件管理这个状态
- 这个称为状态提升
- 公共父组件职责：1. 提供共享状态 2.提供操作共享状态的方法
- 要通讯的子组件只需要通过props接收状态或操作状态的方法

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/兄弟传递.png)

#### 示例demo

- 定义布局结构，一个Counter里面包含两个子组件，一个是计数器的提示，一个是按钮

```react
class Counter extends React.Component {
    render() {
        return (<div>
            <Child1 />
            <Child2 />
        </div>
        )
    }
}
class Child1 extends React.Component {
    render() {
        return (
            <h1>计数器：</h1>
        )
    }
}
class Child2 extends React.Component {
    render() {
        return (
            <button>+1</button>
        )
    }
}
```

- 在父组件里定义共享状态，把这个状态传递给第一个子组件

```react
class Counter extends React.Component {
    // 提供共享的状态
    state = {
        count: 0
    }
    render() {
        return (<div>
            {/* 把状态提供给第一个子组件 */}
            <Child1 count={this.state.count}/>
            <Child2 />
        </div>
        )
    }
}
```

- 在第一个子组件里面就能通过props获取到

```react
class Child1 extends React.Component {
    render() {
        return (
            <h1>计数器：{this.props.count}</h1>
        )
    }
}
```

- 在父组件中提供共享方法，通过属性传递给第二个子组件，方便第二个子组件来进行调用

```react
    // 提供共享方法
    onIncrement = (res) => {
        // 只要第二个子组件调用了这个函数，就会执行里面代码
        this.setState({
            count: this.state.count + res
        })
    }
    render() {
        return (<div>
            ...
            {/* 把共享方法提供给第二个子组件 */}
            <Child2 onIncrement={this.onIncrement} />
        </div>
        )
    }
```

- 在第二个子组件里面通过props来获取到对应函数，然后进行调用

```react
class Child2 extends React.Component {
    handleClick = () => {
        // 这里一旦调用，就会执行父组件里面 onIncrement函数
        this.props.onIncrement(2)
    }
    render() {
        return (
            <button onClick={this.handleClick}>+</button>
        )
    }
}
```

## Context（★★★）

如果出现层级比较多的情况下（例如：爷爷传递数据给孙子），我们会使用Context来进行传递

作用： 跨组件传递数据

### 使用步骤

- 调用 `React.createContext()` 创建 Provider(提供数据) 和 Consumer(消费数据) 两个组件

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/创建Context.png)

- 使用Provider 组件作为父节点

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/provider.png)

- 设置value属性，表示要传递的数据

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/设置value属性.png)

- 哪一层想要接收数据，就用Consumer进行包裹，在里面回调函数中的参数就是传递过来的值

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/Comsumer.png)

### 小结

- 如果两个组件相隔层级比较多，可以使用Context实现组件通讯
- Context提供了两个组件：Provider 和 Consumer
- Provider组件： 用来提供数据
- Consumer组件： 用来消费数据

## props进阶

### children属性

- children属性： 表示组件标签的子节点，当组件标签有子节点时，props就会有该属性
- children属性与普通的props一样，值可以使任意值（文本、react元素、组件、甚至是函数）

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/props-children.png)



### props校验（★★★）

- 对于组件来说，props是外来的，无法保证组件使用者传入什么格式的数据，简单来说就是组件调用者可能不知道组件封装着需要什么样的数据
- 如果传入的数据不对，可能会导致报错
- 关键问题：组件的使用者不知道需要传递什么样的数据
- props校验：允许在创建组件的时候，指定props的类型、格式等

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/props-校验.png)

- 作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增加组件的健壮性

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/props-错误提示.png)

#### 使用步骤

- 安装包  `prop-types (yarn add prop-types | npm i props-types)`
- 导入prop-types 包
- 使用`组件名.propTypes={}` 来给组件的props添加校验规则
- 校验规则通过PropTypes对象来指定

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/propsTypes.png)



#### 常见的约束规则

- 创建的类型： `array、bool、func、number、object、string`
- React元素类型：`element`
- 必填项：`isRequired`
- 特定结构的对象： `shape({})`
- 更多的[约束规则](<https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html#proptypes>)

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/props-约束规则.png)

### props的默认值

- 场景：分页组件 -> 每页显示条数

![](/Users/volcanoboy/Desktop/react课程资料/day-02/笔记/images/props默认值.png)

# 组件生命周期（★★★）

## 目标

- 说出组件生命周期对应的钩子函数
- 钩子函数调用的时机

## 概述

意义：组件的生命周期有助于理解组件的运行方式，完成更复杂的组件功能、分析组件错误原因等

组件的生命周期： 组件从被创建到挂载到页面中运行，再到组件不在时卸载的过程

生命周期的每个阶段总是伴随着一些方法调用，这些方法就是生命周期的钩子函数

构造函数的作用：为开发人员在不同阶段操作组件提供了实际

## 生命周期阶段

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/生命周期.png)

### 创建时（挂载阶段）

- 执行时机：组件创建时（页面加载时）
- 执行顺序

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/创建时-函数执行顺序.png)

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/创建时-函数的作用.png)

### 更新时

执行时机：`setState()、 forceUpdate()、 组件接收到新的props`

说明：以上三者任意一种变化，组件就会重新渲染

执行顺序：

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/更新时.png)

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/更新时-函数作用.png)

### 卸载时

执行时机：组件从页面中消失

作用：用来做清理操作

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/卸载时.png)

### 不常用的钩子函数

#### 旧版的生命周期钩子函数

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/旧版生命周期函数.png)

#### 新版完整生命会走棋钩子函数

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/新版生命周期函数.png)

##### `getDerivedStateFromProps()`

- **`getDerivedStateFromProps`** 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容
- 不管原因是什么，都会在*每次*渲染前触发此方法

##### `shouldComponentUpdate()`

- 根据 **`shouldComponentUpdate()`** 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染
- 当 props 或 state 发生变化时，**`shouldComponentUpdate()`** 会在渲染执行之前被调用。返回值默认为 true

##### `getSnapshotBeforeUpdate()`

- **`getSnapshotBeforeUpdate()`** 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期的任何返回值将作为参数传递给 **`componentDidUpdate()`**
- 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等

# render-props模式 （★★★）

## 目标

- 知道render-props模式有什么作用
- 能够说出render-props的使用步骤

## React组件复用概述

- 思考：如果两个组件中的部分功能相似或相同，该如何处理？
- 处理方式：复用相似的功能
- 复用什么？
  - state
  - 操作state的方法
- 两种方式：
  - render props模式
  - 高阶组件（HOC）
- 注意： 这两种方式不是新的API，而是利用React自身特点的编码技巧，演化而成的固定模式

## 思路分析

- 思路：将要复用的state和操作state的方法封装到一个组件中

- 如何拿到该组件中复用的state

  - 在使用组件时，添加一个值为函数的prop，通过函数参数来获取

    ![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/render-props-01.png)

- 如何渲染到任意的UI

  - 使用该函数的返回值作为要渲染的UI内容

    ![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/render-props-02.png)

## 使用步骤

- 创建Mouse组件，在组件中提供复用的逻辑代码
- 将要复用的状态作为 props.render(state)方法的参数，暴露到组件外部
- 使用props.render() 的返回值作为要渲染的内容

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/render-props模式-01.png)

#### 示例demo

```react
class Mouse extends React.Component {
    // 鼠标位置状态
    state = {
        x: 0,
        y: 0
    }

    // 监听鼠标移动事件
    componentDidMount(){
        window.addEventListener('mousemove',this.handleMouseMove)
    }
    handleMouseMove = e => {
        this.setState({
            x: e.clientX,
            y: e.clientY
        })
    }
    render(){
        // 向外界提供当前子组件里面的数据
        return this.props.render(this.state)
    }
}
class App extends React.Component {
    render() {
        return (
            <div>
                App
                <Mouse render={mouse => {
                    return <p>X{mouse.x}Y{mouse.y}</p>
                }}/>
            </div>
        )
    }
}
ReactDOM.render(<App />,document.getElementById('root'))
```

## children代替render属性

- 注意：并不是该模式叫 render props就必须使用名为render的prop，实际上可以使用任意名称的prop
- 把prop是一个函数并且告诉组件要渲染什么内容的技术叫做： render props模式
- 推荐：使用childre代替render属性

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/render-props-children模式.png)

## 优化代码

- 推荐给render props模式添加props校验

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/优化-添加校验.png)

-  

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/优化-移除事件绑定.png)



# 高阶组件 （★★★）

## 目标

- 知道高阶组件的作用
- 能够说出高阶的使用步骤

## 概述

- 目的：实现状态逻辑复用
- 采用 包装模式
- 手机：获取保护功能
- 手机壳：提供保护功能
- 高阶组件就相当于手机壳，通过包装组件，增强组件功能

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/手机壳.png)

## 思路分析

- 高阶组件(HOC、Higher-Order Component) 是一个函数，接收要包装的组件，返回增强后的组件

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/高阶组件-函数.png)

- 高阶组件内部创建了一个类组件，在这个类组件中提供复用的状态逻辑代码，通过prop将复用的状态传递给被包装组件`WrappedComponent`

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/高阶组件-类组件内部实现.png)

## 使用步骤

- 创建一个函数，名称约定以with开头
- 指定函数参数，参数应该以大写字母开头
- 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回
- 在该组件中，渲染参数组件，同时将状态通过prop传递给参数组件
- 调用该高阶组件，传入要增强的组件，通过返回值拿到增强后的组件，并将其渲染到页面

**包装函数**

```react
// 定义一个函数，在函数内部创建一个相应类组件
function withMouse(WrappedComponent) {
    // 该组件提供复用状态逻辑
    class Mouse extends React.Component {
        state = {
            x: 0,
            y: 0
        }
        // 事件的处理函数
        handleMouseMove = (e) => {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }
        // 当组件挂载的时候进行事件绑定
        componentDidMount() {
            window.addEventListener('mousemove', this.handleMouseMove)
        }
        // 当组件移除时候解绑事件
        componentWillUnmount() {
            window.removeEventListener('mousemove', this.handleMouseMove)
        }
        render() {
            // 在render函数里面返回传递过来的组件，把当前组件的状态设置进去
            return <WrappedComponent {...this.state} />
        }
    }
    return Mouse
}
```

**哪个组件需要加强，通过调用`withMouse`这个函数，然后把返回的值设置到父组件中即可**

```react
function Position(props) {
    return (
        <p>
            X:{props.x}
            Y:{props.y}
        </p>
    )
}
// 把position 组件来进行包装
let MousePosition = withMouse(Position)

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                高阶组件
                <MousePosition></MousePosition>
            </div>
        )
    }
}
```

## 设置`displayName`

- 使用高阶组件存在的问题：得到两个组件的名称相同
- 原因：默认情况下，React使用组件名称作为`displayName`
- 解决方式：为高阶组件设置`displayName`，便于调试时区分不同的组件
- `displayName的作用：用于设置调试信息(React Developer Tools信息)`
- 设置方式：

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/高阶组件-displayName.png)

## 传递props

- 问题：如果没有传递props，会导致props丢失问题
- 解决方式： 渲染`WrappedComponent`时，将state和props一起传递给组件

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/传递props.png)

## 小结

- 组件通讯是构建React应用必不可少的一环
- props的灵活性让组件更加强大
- 状态提升是React组件的常用模式
- 组件生命周期有助于理解组件的运行过程
- 钩子函数让开发者可以在特定的时机执行某些功能
- `render props` 模式和高阶组件都可以实现组件状态逻辑的复用
- 组件极简模型： `(state,props) => UI`

# React原理

## 目标

- 能够知道`setState()`更新数据是异步的
- 能够知道JSX语法的转化过程

## `setState()`说明 （★★★）

### 更新数据

- `setState()`更新数据是异步的
- 注意：使用该语法，后面的`setState`不要依赖前面`setState`的值
- 多次调用`setState`，只会触发一次render

### 推荐语法 

- 推荐：使用 `setState((state,props) => {})` 语法
- 参数state： 表示最新的state
- 参数props： 表示最新的props

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/推荐语法.png)



### 第二个参数

- 场景：在状态更新(页面完成重新渲染)后立即执行某个操作
- 语法：`setState(update[,callback])`

![](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/第二个参数.png)

## JSX语法的转化过程 （★★★）

- JSX仅仅是`createElement()` 方法的语法糖(简化语法)
- JSX语法被 @babel/preset-react 插件编译为`createElement()` 方法
- React 元素： 是一个对象，用来描述你希望在屏幕上看到的内容

![语法糖](/Users/volcanoboy/Desktop/react课程资料/day-03/笔记/images/语法糖.png)

# React原理揭秘

## 目标

- 能够说出React组件的更新机制
- 能够对组件进行性能优化
- 能够说出虚拟DOM和DIff算法

## 组件更新机制

- setState() 的两个作用
  - 修改state
  - 更新组件
- 过程：父组件重新渲染时，也会重新渲染子组件，但只会渲染当前组件子树（当前组件以其所有子组件）

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E7%BB%84%E4%BB%B6%E6%9B%B4%E6%96%B0.png?lastModify=1607686636)

## 组件性能优化

### 减轻state

- 减轻state：只存储跟组件渲染相关的数据（比如：count/ 列表数据 /loading等）
- 注意：不用做渲染的数据不要放在state中
- 对于这种需要在多个方法中用到的数据，应该放到this中

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E5%87%8F%E8%BD%BBstate.png?lastModify=1607686636)

### 避免不必要的重新渲染

- 组件更新机制：父组件更新会引起子组件也被更新，这种思路很清晰
- 问题：子组件没有任何变化时也会重新渲染
- 如果避免不必要的重新渲染？
- 解决方式：使用钩子函数 shouldComponentUpdate(nextProps, nextState)
  - 在这个函数中，nextProps和nextState是最新的状态以及属性
- 作用：这个函数有返回值，如果返回true，代表需要重新渲染，如果返回false，代表不需要重新渲染
- 触发时机：更新阶段的钩子函数，组件重新渲染前执行(shouldComponentUpdate => render)

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/shouldComponentUpdata.png?lastModify=1607686636)

#### 随机数案例

需求：随机生成数字，显示在页面，如果生成的数字与当前显示的数字相同，那么就不需要更新UI，反之更新UI。

利用nextState参数来判断当前组件是否需要更新

```
class App extends React.Component {
    state = {
        number: 0
    }
    // 点击事件，每次点击生成一个随机数
    hanldeBtn = () => {
        this.setState({
            number: Math.floor(Math.random() * 3)
        })
    }
    // 将要更新UI的时候会执行这个钩子函数
    shouldComponentUpdate(nextProps,nextState) {
         // 判断一下当前生成的 值是否与页面的值相等
         if(nextState.number !== this.state.number){
             return true
         }
         return false
    }
    render() {
        return (
            <div>
                随机数：{this.state.number} <br />
                <button onClick={this.hanldeBtn}>生成随机数</button>
            </div>
        )
    }
}
```

利用props参数来判断是否需要进行更新

```
class App extends React.Component {
    state = {
        number: 0
    }
    // 点击事件，每次点击生成一个随机数
    hanldeBtn = () => {
        this.setState({
            number: Math.floor(Math.random() * 3)
        })
    }

    render() {
        return (
            <div>
                <NumberBox number={this.state.number} />
                <button onClick={this.hanldeBtn}>生成随机数</button>
            </div>
        )
    }
}
class NumberBox extends React.Component {
    // 将要更新UI的时候会执行这个钩子函数
    shouldComponentUpdate(nextProps, nextState) {
        // 判断一下当前生成的 值是否与页面的值相等
        if (nextProps.number !== this.props.number) {
            return true
        }
        return false
    }
    render() {
        return (
            <h1>随机数：{this.props.number} </h1>
        )
    }
}
```

### 纯组件

#### 作用以及使用

- 纯组件： PureComponent 与 React.Component 功能相似
- 区别： PureComponent 内部自动实现了 shouldComponentUpdate钩子，不需要手动比较
- 原理：纯组件内部通过分别比对前后两次 props和state的值，来决定是否重新渲染组件

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/PureComponent.png?lastModify=1607686636)

#### 实现原理

- 说明：纯组件内部的对比是 shallow compare（浅层对比）
- 对于值类型来说：比较两个值是否相同

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E5%80%BC%E7%B1%BB%E5%9E%8B%E6%AF%94%E5%AF%B9.png?lastModify=1607686636)

- 引用类型：只比对对象的引用地址是否相同

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B%E6%AF%94%E5%AF%B9.png?lastModify=1607686636)

- 注意：state 或 props 中属性值为引用类型时，应该创建新数据，不要直接修改原数据

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E6%B3%A8%E6%84%8F%E7%82%B9.png?lastModify=1607686636)

## 虚拟DOM和Diff算法

- React更新视图的思想是：只要state变化就重新渲染视图
- 特点：思路非常清晰
- 问题：组件中只有一个DOM元素需要更新时，也得把整个组件的内容重新渲染吗？ 不是这样的
- 理想状态：部分更新，只更新变化的地方
- React运用的核心点就是 虚拟DOM 配合 Diff 算法

### 虚拟DOM

本质上就是一个JS对象，用来描述你希望在屏幕上看到的内容

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E8%99%9A%E6%8B%9FDOM.png?lastModify=1607686636)

### Diff算法

执行过程

- 初次渲染时，React会根据初始化的state（model），创建一个虚拟DOM对象（树）
- 根据虚拟DOM生成真正的DOM，渲染到页面
- 当数据变化后(setState())，会重新根据新的数据，创建新的虚拟DOM对象（树）
- 与上一次得到的虚拟DOM对象，使用Diff算法比对（找不同），得到需要更新的内容
- 最终，React只将变化的内容更新（patch）到DOM中，重新渲染到页面

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/diff%E7%AE%97%E6%B3%95.png?lastModify=1607686636)

### 代码演示

- 组件render()调用后，根据状态和JSX结构生成虚拟DOM对象(render()方法的调用并不意味着浏览器进行渲染，render方法调用时意味着Diff算法开始比对了)
- 示例中，只更新p元素的文本节点内容
- 初次渲染的DOM对象

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E5%88%9D%E6%AC%A1%E7%9A%84%E8%99%9A%E6%8B%9FDOM%E5%AF%B9%E8%B1%A1.png?lastModify=1607686636)

- 数据更新之后的虚拟DOM对象

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E6%9B%B4%E6%96%B0%E5%90%8E%E7%9A%84%E8%99%9A%E6%8B%9FDOM%E5%AF%B9%E8%B1%A1.png?lastModify=1607686636)

## 小结

- 工作角度：应用第一，原理第二
- 原理有助于更好的理解React的自身运行机制
- setState() 异步更新数据
- 父组件更新导致子组件更新，纯组件提升性能
- 思路清晰简单为前提，虚拟DOM和Diff保效率（渲染变化的组件）
- 虚拟DOM -> state + JSX
- 虚拟DOM最大的特点是 脱离了浏览器的束缚，也就是意味着只要是能支持js的地方都可以用到react，所以为什么说react是可以进行跨平台的开发

# React路由基础

## 目标

- 能够说出React路由的作用
- 能够掌握-react-router-dom的基本使用
- 能够使用编程式导航跳转路由
- 能够知道React路由的匹配模式

## React路由介绍

现代的前端应用大多数是SPA（单页应用程序），也就是只有一个HTML页面的应用程序。因为它的用户体验更好、对服务器压力更小，所以更受欢迎。为了有效的使用单个页面来管理多页面的功能，前端路由应运而生。

- 前端路由功能：让用户从一个视图（页面）导航到另一个视图（页面）
- 前端路由是一套映射规则，在React中，是URL路径与组件的对应关系
- 使用React路由简单来说，就是配置路径和组件

## 路由的基本使用

### 使用步骤

- 安装： yarn add react-router-dom

  - 如果没有安装yarn工具的，需要先全局安装一下yarn：npm install -g yarn

- 导入路由的三个核心组件： Router / Route / Link

  ```
  import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
  ```

  使用Router 组件包裹整个应用

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/Router.png?lastModify=1607686636)

- 使用Link组件作为导航菜单（路由入口）

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/link%E5%85%A5%E5%8F%A3.png?lastModify=1607686636)

- 使用Route组件配置路由规则和要展示的组件（路由出口）

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/route.png?lastModify=1607686636)

### 常用组件说明

- **Router组件：**包裹整个应用，一个React应用只需要使用一次
  - 两种常用的Router： HashRouter和BrowserRouter
  - HashRouter： 使用URL的哈希值实现 （localhost:3000/#/first）
  - 推荐 BrowserRouter：使用H5的history API实现（localhost3000/first）
- **Link组件：**用于指定导航链接（a标签）
  - 最终Link会编译成a标签，而to属性会被编译成 a标签的href属性
- **Route组件：**指定路由展示组件相关信息
  - path属性：路由规则，这里需要跟Link组件里面to属性的值一致
  - component属性：展示的组件
  - Route写在哪，渲染出来的组件就在哪

### 路由的执行过程

- 当我们点击Link组件的时候，修改了浏览器地址栏中的url
- React路由监听地址栏url的变化
- React路由内部遍历所有的Route组件，拿着Route里面path规则与pathname进行匹配

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/route%E5%8C%B9%E9%85%8D.png?lastModify=1607686636)

- 当路由规则（path）能够匹配地址栏中的pathname时，就展示该Route组件的内容

### 编程式导航

- **场景：**点击登陆按钮，登陆成功后，通过代码跳转到后台首页，如何实现？
- **编程式导航：**通过JS代码来实现页面跳转
- history是React路由提供的，用于获取浏览器历史记录的相关信息
- **push(path)：**跳转到某个页面，参数path表示要跳转的路径
- go(n)：前进或后退功能，参数n表示前进或后退页面数量

![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E7%BC%96%E7%A8%8B%E5%BC%8F%E5%AF%BC%E8%88%AA.png?lastModify=1607686636)

### 默认路由

- 现在的路由都是通过点击导航菜单后展示的，如果进入页面的时候就主动触发路由呢

- 默认路由：表示进入页面时就会匹配的路由

- 默认路由：只需要把path设置为 `'/'`

  ![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E9%BB%98%E8%AE%A4%E8%B7%AF%E7%94%B1.png?lastModify=1607686636)

  ### 匹配模式

  #### 模糊匹配模式

  - 当Link组件的to属性值为 '/login' 时候，为什么默认路由也被匹配成功？
  - 默认情况下，React路由是模糊匹配模式
  - 模糊匹配规则：只要pathname以path开头就会匹配成功

  ![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E6%A8%A1%E7%B3%8A%E5%8C%B9%E9%85%8D%E6%A8%A1%E5%BC%8F.png?lastModify=1607686636)

  #### 精准匹配

  - 默认路由认可情况下都会展示，如果避免这种问题？
  - 给Route组件添加exact属性，让其变为**精准匹配模式**
  - 精确匹配：只有当path和pathname完全匹配时才会展示改路由

  ![img](file:///Users/volcanoboy/Desktop/react%E8%AF%BE%E7%A8%8B%E8%B5%84%E6%96%99/day-04/%E7%AC%94%E8%AE%B0/images/%E7%B2%BE%E7%A1%AE%E5%8C%B9%E9%85%8D.png?lastModify=1607686636)

  ### 小结

  - React路由可以有效的管理多个视图实现 SPA
  - 路由先需要通过安装
  - Router组件包裹整个应用，只需要使用一次
  - Link组件是入口，Route组件是出口
  - 通过props.history实现编程式导航
  - 默认是模糊匹配，添加exact编程精确匹配
  - React路由的一切都是组件，可以像思考组件一样思考路由