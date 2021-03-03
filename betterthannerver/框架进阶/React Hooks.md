# React Hooks

##1. 课程介绍

React Hooks 是 v16.8 版本引入了全新的 API，它算是一个**颠覆性**的变革。

- 所有的 React 组件都可以是一个函数，再也不需要写类组件了
- 再也不需要记住 React 有哪些生命周期钩子函数了



> **All in FP -- 让函数组件一统江湖**



**学习前提**

- React 的基础用法

  - 了解 React 组件的写法以及种类

- Webpack

  - 会使用 Webpack 配置一个简单的脚手架

  

**本课程的主要内容**

- 为什么会出现 React Hooks
- State Hook 和 Effect Hook 的用法
- 创建自己的 Hooks
- 额外的 Hooks
- 使用 Hooks 的注意事项



**学习本门课程你能收获什么**？

- 使用纯函数思想写 React 组件
- 能够知道 Hooks 的特性，并能够有意识的创建自定义 Hooks 封装特定的业务逻辑



**环境准备**

- NodeJS（ v10.0.0 以上 LTS 版本 ）
- Webpack （ v4.0 以上 ）
- VSCode 或者其他编辑器



##2. 为什么会出现 React Hooks



> 为什么类组件用的好好，react 官方又搞了一个什么 hooks，并且还想让函数组件替代类组件呢？



**写法对比**

Class 版本

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```



React Hooks 版本

```javascript
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

可以让代码变得更简单



**复用性对比**

render props

```javascript
import Child from 'Child'
class PlacementProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { placement: 'top' };
  }
  
  change = (dir) => {
    this.setState({
      placement: dir,
    })
  }

  render() {
    return (
      <div>
        {this.props.content({placement: this.state.placement, handleChange: change})}
      </div>
    )
  }
}

function Child(props) {
  const { placement, handleChange } = props;
  return (
  	<select value={placement} onChange={(e) => { handleChange(e.currentTarget.value) }}>
    	<option value="top">top</option>
      <option value="bottom">bottom</option>
      <option value="left">left</option>
      <option value="right">right</option>
    </select>
  )
}

<PlacementProvider content={data => (
  <Child placement={data.placement} handleChange={data.handleChange} />
)}/>

```



高阶组件

```javascript
import React from 'react';

const withPlacement = WrappedComponent => {
  return (
    class W extends React.Component {
      constructor(props) {
        super(props);
        this.state = { placement: 'top' };
      }
      
      change = (dir) => {
        this.setState({
          placement: dir,
        })
      }
      
      render() {
        return <WrappedComponent placement={this.state.placement} handleChange={this.change} />
      }
    }
  )
};

export default withPlacement(Child);
```



Hooks

```javascript
import React, { useState } from 'react';

function usePlacement() {
  const [placement, setPlacement] = useState('top');
  
  return {
    placement,
    setPlacement,
  };
}

function Child() {
  const {placement, setPlacement} = usePlacement();
  return (
  	<select value={placement} onChange={(e) => { setPlacement(e.currentTarget.value) }}>
    	<option value="top">top</option>
      <option value="bottom">bottom</option>
      <option value="left">left</option>
      <option value="right">right</option>
    </select>
  )
}

export default Child;
```

可以减少代码层级关系，没有多余的层级嵌套



**副作用处理对比**

Class 版本

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidMount() {
    // 改变 title
    document.title = `You clicked ${this.state.count} times`;
    // 发送 ajax
    request('/api/get')
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
    request('/api/get')
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```



Hooks 版本

```javascript
import { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 类似于componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 改变 title
    document.title = `You clicked ${count} times`;
  });
  
   useEffect(() => {
     // 发送 ajax
    request('/api/get');
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

没有生命周期函数，并且可以让每个 effect 的职责单一



总结起来，React Hooks 出现的原因主要就两种：

1. 解决了类组件经常被诟病的一些问题
2. 拥抱函数式编程，让我们的代码变得复用性更高，更加简洁



##3. State Hook 和 Effect Hook 的用法

###3.1 State Hook

```javascript
// 返回一个 state，以及更新 state 的函数。
const [state, setState] = useState(initialState); 

// 初始化值
const [count, setCount] = useState(0); 

// 它不仅可以是一个值，也可以是一个函数
const [state, setState] = useState(() => { return initialState + 1 });

// 连续声明
const [count, setCount] = useState(0);
const [text, setText] = useState('my text'); 
const [xxx, setXxx] = useState([{ age: 18 }]); 

// 函数式更新
setCount(prevCount => prevCount + 2);

// 跳过更新
setCount(2);
setCount(2);

```



注意：

1. 声明的名称叫做 xxx,那么必定有一个值叫做 setXxx()
2. 初始值只在第一次加载起作用，在后续的渲染中，useState 返回的值将始终是更新后最新的 state
3. useState 必须在函数组件的最外层使用，不可以加在任何条件或者嵌套内
4. React 使用 Object.is 来比较 state，如果 state 没有变化，则不会触发更新



###3.2 Effect Hook

```javascript
// 该 Hook 接收一个包含副作用函数，componentDidMount 与 componentDidUpdate 的集合
useEffect(() => {
  document.title = `You clicked ${count} times`;
});

// 清除 effect, componentWillUnmount
useEffect(() => {
  const timer = setInterval(() => { console.log('timer') }, 1000);
  return () => {
    clearInterval(timer);    
  };
});

// effect 的条件执行
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]);
```



注意：

1. useEffect 是异步的，将在每轮渲染结束后执行
2. 清除 effect 会在每次重新渲染执行
3. useEffect 要么不返回，要么返回一个方法
4. 可以通过设置第二个参数优化性能
5. 设置第二个参数为空数组，则只会在组件第一次加载和最后一次卸载时执行



##4. 创建自己的 Hooks

自定义 Hook 更像是一种约定，而不是一种功能。如果函数的名字以 **use** 开头，并且调用了其他的 Hook，则就称其为一个自定义 Hook。



提取自定义 Hooks

```javascript
const useFetchData = (filmId) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  
  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.co/api/films/${filmId}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [filmId]);

  return [loading, data];
};
```



使用自定义 Hook

```javascript
function App({ filmId }) {
  const [loading, data] = useFetchData(filmId);

  if (loading === true) {
    return <p>Loading ...</p>;
  }

  return (
    <div>
      <p>电影名称: {data.title}</p>
      <p>导演: {data.producer}</p>
      <p>发布日期: {data.release_date}</p>
    </div>
  );
}
```



**Hook 是一种复用状态逻辑的方式（是即高阶组件 和 render props 后的另外一种增加复用性的方式）**

优势：自定义 Hook 可以让我们在不增加组件的情况下达到同样的目的。



##5. 额外的 Hooks

**useReducer**

```javascript
const initialState = { number: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {number: state.number + 1};
    case 'decrement':
      return {number: state.number - 1};
    case 'awesome':
      const number = state.number * state.number + Math.random();
      return { number };
    default:
      throw new Error();
  }
}

function Counter(){
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
          Count: {state.number}
					<button onClick={() => { setState({ number: state.number + 1 }) }}>+</button>
					<button onClick={() => { setState({ number: state.number - 1 }) }}>-</button>
 					<button onClick={() => dispatch({type: 'increment'})}>+</button>
          <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    )
}

```

在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。



注意：

**他们的作用都是帮我们声明一个状态，useState 适合声明单一状态，而 useReducer 适合处理多状态的场景。**



**useContext**

作用：接受 React.createContext 返回的值，并返回该 Context 的 value。

```javascript
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

注意：

useContext 的参数必须是 **context 对象本身**

只要 Context.Provider 的 value 发生变化，使用到 useContext 的组件就会触发更新



**useRef**

使用 ref 访问组件的 DOM

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```



使用 uesRef 创建函数组件内的私有变量（类似于 class 里的 this 对象上的属性）

```javascript
function Example() {
  const intervalRef = useRef();

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(timer);
    });
    intervalRef.current = timer;
    return () => {
      clearInterval(intervalRef.current);
    };
  });
}
```

注意：

useRef 的值需要放到 current 上

useRef 的 current 值改变，不会引发组件更新



[React Hooks 文档](https://zh-hans.reactjs.org/docs/hooks-reference.html)





## 6. 使用 Hooks 的注意事项

**只在最顶层使用 Hook**



**不要在普通的 JavaScript 函数中调用 Hook**