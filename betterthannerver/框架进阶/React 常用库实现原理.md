# React 常用工具库的实现原理

##1. 课程介绍

真正学会 React 是一个漫长的过程，因为 React 并不仅仅是一个库，而是一个庞大的体系。想要发挥它的威力，我们需要学习一整套解决方案，从前端到服务端，都是一些全新的方案。

React Router 是完整的 React 路由解决方案



**什么是路由？**

```javascript
http://www.xxx.com/
http://www.xxx.com/about
http://www.xxx.com/concat
```



对于我们来说软件开发者来说，路由就是 URL，可以将其理解为**文件的路径**



**服务端路由**

当我们的浏览器每进入到一个路由地址，首先访问的是服务器，因为每一个路由地址都会对应服务端的一个 html 模板，当服务端匹配到对应的模板后，就会把这个模板返回到浏览器。

![服务端路由](/Volumes/Transcend/video/React-常用工具库实现原理/resource/assets/服务端路由.jpg)



**前端路由**

浏览器第一次访问是从服务端获取 html 模板，之后的路由会被前端路由系统接管。

![前端路由](/Volumes/Transcend/video/React-常用工具库实现原理/resource/assets/前端路由.jpg)



**学习前提**

- React

- React-Router 的基本用法

  - 清楚如何在 React 中配置 router

- Webpack

  - 会使用 Webpack 配置一个简单的脚手架

  

**本课程的主要内容**

- 前端路由的两种方式
- React-Router 的实现
- 实现路由组件按需加载 



**学习本门课程你能收获什么**？

- 深入了解前端路由的核心原理
- 学习如何自己实现一个简单的前端路由
- 如何在路由层面结合 Webpack 做打包优化，实现按需加载路由组件



**环境准备**

- NodeJS（ v10.0.0 以上 LTS 版本 ）
- Webpack （ v4.0 以上 ）
- VSCode 或者其他编辑器



##2. 前端路由的两种方式

### 2.1 hash

平时单页面网站经常使用的模式，# 有两种情况，一个是我们所谓的锚点，比如典型的回到顶部按钮原理、[各个标题之间的跳转](https://ant.design/components/button-cn/)等，路由里的 # 不叫锚点，我们称之为 hash，大型框架的路由系统大多都是哈希实现的。



**hash 的特性**

1. 改变 # 不触发网页重载

```javascript
http://www.xxx.com/index.html#page1 
// 改成
http://www.xxx.com/index.html#page2
```

浏览器不会重新向服务器请求 index.html



2. 改变 # 会改变浏览器的访问历史

每一次改变 # 后的部分，都会在浏览器的访问历史中增加一个历史记录，使用 "后退" 按钮，就可以回到上一个位置。



3. 可以通过  **[onhashchange](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/hashchange_event)** 事件去监测 hash 的变更

```javascript
window.addEventListener("hashchange", func, false);
```





**hash 的缺陷**

1. SEO问题，对于搜索引擎来说全都是一个路由地址（**HTTP请求不包含 #**）



### 2.2 [history API](https://developer.mozilla.org/zh-CN/docs/Web/API/History_API)

这种路由模式下，没有难看的 # 号，URL 与服务端路由看起来没有差别。



**history 的特性**

1. HTML5 新增的历史记录 API 可以实现无刷新更改地址栏链接，配合 AJAX 可以做到无刷新跳转，并可以增加访问历史记录。

```javascript
window.history.pushState(null, null, "/about/");
window.history.replaceState(null, null, "/concat/");
```



2. 通过 **[popstate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/popstate_event)** 事件来监听 URL 变化

当用户点击浏览器的「前进」、「后退」按钮时，就会触发 popstate 事件。可以监听这一事件，从而作出反应。

```javascript
window.addEventListener("popstate", function(e) {
    var state = e.state;
    // do something...
});

```



实现前端路由的四个要素：

1. 可修改地址
2. 无刷新
3. 可增加访问历史
4. 可监听



**history 的缺陷**

1. 兼容性较差
2. **需要服务端配合做网页重定向**



### 2.3 hash vs history

| 对比         | hash 路由                              | History API 路由                                             |
| ------------ | :------------------------------------- | :----------------------------------------------------------- |
| url字符串    | 不好看                                 | 正常                                                         |
| 命名限制     | 通常只能在同一个`document`下进行改变   | url 地址可以自己来定义，只要是同一个域名下都可以，自由度更大 |
| 状态保存     | 无内置方法，需要另行保存页面的状态信息 | 将页面信息压入历史栈时可以附带自定义的信息                   |
| 参数传递能力 | 受到url总长度的限制                    | 将页面信息压入历史栈时可以附带自定义的信息                   |
| 实用性       | 可直接使用                             | 通常服务端需要修改代码以配合实现                             |
| 兼容性       | IE8以上                                | IE10以上                                                     |



## 3. React-Router 的实现

### 3.1 最简单的路由

```react
export default class App extends React.Component {

  state = {
    route: window.location.hash.substr(1)
  }

	// 1. 监听
  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({
        route: window.location.hash.substr(1)
      })
    })
  }

	// 2. 更新
  renderChild = () => {
    let el = null
    switch (this.state.route) {
      case '/about': el = About; break;
      case '/inbox': el = Inbox; break;
      default:      el = Home;
    }
    return el
  }

  render() {
    const Child = this.renderChild()

    return (
      <div>
        <h1>App</h1>
        <ul>
          <li><a href="#/about">About</a></li>
          <li><a href="#/inbox">Inbox</a></li>
        </ul>
        <Child />
      </div>
    )
  }
}
```



**问题：**

1. 无法复用，写法太过于硬编码
2. 无法完成嵌套路由，配置太冗余
3. 无法模糊匹配路由



```react
React.render((
  <Router>
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} >
        {/* 添加一个路由，嵌套进我们想要嵌套的 UI 里 */}
        <Route path="messages/(:id)" component={Message} />
      </Route>
    </Route>
  </Router>
), document.getElementById('root'))
```



###3.2 React-Router 的基本原理

![](/Volumes/Transcend/video/React-常用工具库实现原理/resource/assets/base.png)

**URL 和 UI 的同步问题**

实现 URL 与 UI 界面的同步。其中在 React-Router 中，URL 对应  Location 对象，而 UI 是由 React 中的 components 来决定的，这样就转变成 location  与 components 之间的同步问题。



**前端路由处理的事情**

1. 监听路由的变化，
2. 实现 URL 与 UI 的同步



### 3.3 实现 React 版本的 Router

解决这三个问题：

1. 写法太过于硬编码，扩展性非常弱 -> 将路由转换成 React 组件
2. 无法完成嵌套路由太冗余 -> 支持像 React 组件那样的嵌套
3. 无法模糊匹配路由 -> 支持路由的规则匹配

需求：

1. 将路由转换成 React 组件
   - Router
     - 监听 URL 的变化
     - 传递 location 数据
   - Route
     - 匹配路由
     - 渲染对应的组件
2.  支持像 React 组件那样的嵌套
   - Route 支持嵌套
3. 支持路由的规则匹配
   - 匹配路由的正则





## 4. 实现路由组件按需加载 

对于一个大型应用来说，一个首当其冲的问题就是所需加载的 JavaScript 的大小。讲道理当我们访问一个页面的时候，最优的方式是只加载当前渲染页所需的 JavaScript。

利用**代码拆分**的方式将代码拆分成一个个的小包，在用户浏览到对应页面的时候**动态加载**。而路由是个非常适于做代码拆分的地方。



**如何做？**

使用 Webpack + **[dynamic import](https://webpack.docschina.org/guides/code-splitting/#%E5%8A%A8%E6%80%81%E5%AF%BC%E5%85%A5-dynamic-imports-)** 并结合路由的入口文件做拆包处理。

![687474703a2f2f7468656a616d65736b796c652e636f6d2f696d672f72656163742d6c6f616461626c652d73706c69742d62756e646c65732e706e67](/Volumes/Transcend/video/React-常用工具库实现原理/resource/assets/687474703a2f2f7468656a616d65736b796c652e636f6d2f696d672f72656163742d6c6f616461626c652d73706c69742d62756e646c65732e706e67.png)

Dynamic import 标准相关库：[React-loadable](https://github.com/jamiebuilds/react-loadable)