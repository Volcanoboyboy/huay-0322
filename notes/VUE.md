# 项目步骤

划分项目目录结构(大致的分类),先将不需要的清除一下

```bash
--vue.config.js	// vue的配置文件
--.editorconfig	// 项目风格配置

src
├── assets
│		├── img
│   └── css
├── common	//	公共的js文件
│		├──	const.js //	抽取公共常量
│		└──	utils.js	//	公共的方法,混入等
├── components
│		├── common	// 完全公共的组件,不受项目约束的
│		└── content	// 项目相关的公共组件
├── router
├── store
├── network
├── views
│		├── category //	列表页面等
│		├── home // 主页面
│		└── ...
├── app.vue
└── main.js
```

vuex结构抽取,state一般不需要抽取,就放在index.js

```bash
store
  ├── index.js          # 我们组装模块并导出 store 的地方,
  ├── actions.js        # 根级别的 action
  ├── mutations.js      # 根级别的 mutation
  └── modules
      ├── cart.js       # 购物车模块
      └── products.js   # 产品模块
```

1个页面分为1个view组件

1个view组件分配1个路由



### 页面得步骤：

1-每个页面需要得数据先获取

2-在根据功能和内容将UI组件导入

3-将数据渲染到UI组件

4-加上交互和跳转





# 插件和工具库的使用理解

全局只有main.js里面有一个Vue实例,其他插件例如router vuex等都是通过将实例挂载到全局Vue实例上实现全局调用,

其他插件,如果需要全局使用就需要在全局导入,并在Vue实例的原型注册使用,参照axios如下

> router 和 vuex 自己内部默认会为Vue实例注册$router 和$vuex

```js
import axios from  'axios'
Vue.prototype.$axios = axios
//	通过this.$axios调用
```



### 配置开发环境下的代理,解决跨域问题

`Vue.config.js`

```js
module.exports = {
  // vue的配置
  devServer: {
    // 针对开发服务器的配置
    proxy: {
      "/api": {
        // 当请求路径以 /api 开头时，开发服务器需要代理到 http://study.yuanjin.tech
        // /api/user/login  --->   http://study.yuanjin.tech/api/user/login
        target: "http://study.yuanjin.tech",
      },
    },
  },
};
```



# axios

- 按需导入 import axios from 'axios'


- 全局注册	Vue.prototype.$axios = axios

  通过this.$axios调用





#### axios的异步请求的两种写法

```
getNewsData().then((resp) => {

	console.log(resp);

});


async function test(){
	resp = await getNewsData();
	cnosole.log(resp);
}

test();
```



#### ⚠️⚠️⚠️组件之间通信

//我知道我的数据发生了重新渲染,但是我不知道变了以后要给干什么

//触发一个事件,让组件的使用者去搞定这件事

```
this.$emit("change", this.chooseId);
					监听事件名		参数 会返回给handleChange	

//然后在组件使用者身上监听事件

@change="handleChange"

methods: {
	handleChange(chooseId){
		console.log(chooseId);
	}
}

```



#### 插槽

使组件居中等,确定组件位置的特殊组件,相当于组件占位符,可以写默认值 

```
<slot></slot>
```



尽量不要刷新,刷新的消耗比较大,我们一般只通过history模式,只修改路径,router --> view(通过路由配置路径,)



# 指令

#### V-if v-else

**组件如果没有被销毁的情况是默认缓存数据的,这时候第二次使用的时候是会使用缓存数据的,这时候我们使用v-if是比较合适的,通过销毁和重新渲染来达到刷新数据和视图的效果**

V-if 和v-else之间不允许出现其他元素

新增了一个v-else-if

如果当我们的v-if 或者 v-else-if要包裹多个元素的时候可以一用一个<template></template>包裹

一般不用其他元素以免影响结构,而template就是一个隐式的结构相当于文档碎片吧...

```html
<!-- 情况1：正在远程加载中 -->
<span v-if="isLogining">loading...</span>
<!-- 情况2：当前有登录用户 -->
<template v-else-if="loginUser">
  <a href="">{{ loginUser.nickname }}</a>
  <a href="" @click.prevent="handleLoginOut">退出登录</a>
</template>
<template v-else>
  <!-- 使用命名路由的时候要绑定to属性 -->
  <router-link :to="{ name: 'Login' }">登录</router-link>
  <router-link :to="{ name: 'Reg' }">注册</router-link>
</template>
```



+ v-if是通过是否渲染DOM元素来实现显示是否的,**渲染次数少的时候用v-if**
+ 可以搭配v-for使用,进行筛选渲染,但是会消耗性能,不推荐使用
+ 如果需要可以用计算属性处理一下也很简单

#### v-show

+ v-show是通过改变元素的显示模式来实现的,**反复需要切花内容的用v-show**



#### v-for

+ 可以迭代数组和对象,迭代数组的时候可以写两个迭代器(item,index)index指当前迭代的顺序
  + 迭代对象的时候可以写三个迭代器(value,name,index)index都是指当前迭代的顺序
+ 可以接受整数 v-for="n in 10" //1~10
+ 可以在组件上使用v-for但是key时必须的,且item不要直接渲染,明确数据来源以复用组件

建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

vue总是会尽量用已经存在DOM元素进行渲染以获得性能上的提升,我么也应遵循这个渲染原则

*不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。*

#### v-band

+ 值是变量的情况下记得用 **:**

#### v-html

识别html内容,但是不建议使用,防止脚本攻击,因为html里面可以嵌套script片段或者引入攻击脚本

#### 生命周期

要以函数形式写在vue实例里面,不允许用箭头函数,因为要频繁用到this

+ beforeCreate
+ created
+ beforeMount
+ mounted
+ beforeUpdate(当数据发生改变之前响应的)
+ updated
+ beforedestoryed  在组件发生撤销渲染的情况触发,之后再触发destroyed
+ Destroyed



#### 模版语法

在模版语法中完全支持javascritp表达式,要注意区分是不是表达式,不是表达式的不支持

主要是写些三元运算符和一些简单的加减计算,复杂一些的计算要用到计算属性

复杂运算写在模版里面会影响性能,计算属性也是用的表达式,但是会减少渲染,性能要优化一些



#### v-on

事件绑定 简写 `@`

有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量⚠️⚠️⚠️**事件对象变量** `$event` 把它传入方法

$event作为事件参数实际没有位置的区别,只要名字是这个就行了,放在各个位置是没有区别的

且必须使用`$event`命名

#### 计算属性computed

可以减少内容消耗,先计算出来,就相当于减少点·运算符的消耗,先用变量接收然后后期就不需要运算了

只要计算一次就会进行缓存

但是如果原数据一旦变化,计算属性就会自动重新计算

可以设置一个时间对象计算属性进行比较 `new Date()`,比较是不是缓存

**computed带有两个属性 set get**

#### 事件修饰符

常用的一些修饰符

- sync修饰符相当于v-model

+ stop阻止事件冒泡

+ prevent阻止默认事件

+ enter只响应回车键

+ self

+ once

+ passive

  > 通俗点说就是每次事件产生，浏览器都会去查询一下是否有preventDefault阻止该次事件的默认动作。我们加上**passive就是为了告诉浏览器，不用查询了，我们没用preventDefault阻止默认动作。**与prevent冲突

#### 动态绑定class和style

可以与原生class共存

+ :class可以添加多个样式类,可以以对象、数组方式设置数据,或者数组和对象混合使用

+ :style也可以绑定多个样式属性

这里也可以绑定返回对象的计算属性进行进行计算然后绑定

#### 监听器watch

`msg(newValue, oldValue){}`

方法速写,msg是监控的数据

侦听器不仅包裹了数据的变化,还包裹了数组的一些方法

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`



#### 函数事件

当需要传入事件对象的时候,必须以`$event`命名并作为最后一个参数传递

#### v-model表单输入绑定

复选数据应设为数组,以选择多个

当我提交表单的时候,我们可用一个对象收集表单数据进行提交

+ `v-model` 指令在表单 ``、`` 及 `` 元素上创建双向数据绑定

+ `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。
+ 在表单文本区域插值 (`{{text}}`) 并不会生效，应用 `v-model` 来代替。

**绑定的数据也可以通过修饰符来修饰**

`v-model.lazy`	使表单数据输入后在change事件后才发生改变

`v-model.number`	将输入的数据类型转化为整型

`v-model.trim`	过滤用户输入的空白字符



## [自定义组件的 `v-model`](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model)

> 2.2.0+ 新增

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` attribute 用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突：

```
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

⚠️**自定义事件修改数据是同步的,但是vue视图渲染是异步的,所有在视图没刷新的时候,子组件获取的还是原来的数据**





# 组件

如果发现组件存在缓存影响视图的时候,我们可以合理利用v-if来及时销毁组件

#### 全局注册

```
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

+ 因为组件是可复用的 Vue 实例，所以它们与 `new Vue` 接收相同的选项，例如 `data`、`computed`、`watch`、`methods` 以及生命周期钩子等。仅有的例外是像 `el` 这样根实例特有的选项。

+ 组件需要复用,所以data必须是一个函数,以消除数据间的影响,各组件维护自己的独立的数据对象



#### 通过props向子组件传递数据

+ Prop 是你可以在组件上注册的一些自定义 attribute。当一个值传递给一个 prop attribute 的时候，它就变成了那个组件实例的一个 property
+ 理论上一个组件可以有任意个prop,数据类型也是任意的

```
命名:
props: ['postTitle']	如果以驼峰命名,下面就要以短横线的方式命名,属性要写成一个数组
<blog-post post-title="hello!"></blog-post>
```



#### $emit内建方法实现组件间通讯

`$emit(handle-fun, data)`

+ data作为第二个参数可以用来抛出一个特定的值
+ **推荐始终使用 kebab-case 的事件名方式**

因为HTML对大小写不敏感,如果用大驼峰小驼峰最后都会变成小写,导致监听不到事件

```
父组件传值给子组件: props
子组件传值给父组件:	$emit(fun, prams)
```



#### @ is an alias to /src

+ @使用在路径里,作为语法糖指向/src



#### slot插槽

```
<slot></slot>
插槽元素就是留个槽,你在这个组件里面写注入的内容会自动嵌套在插槽位置
```

+ 如果一个组件 template 中没有包含一个  `slot` 元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。
+ 可以为插槽设置一个后备默认值，它只会在没有提供内容的时候被渲染
+ slot可以通过name属性定义多个具名插槽,然后在模版中通过v-slot指令调用对应name插入到相应插槽
+ 没有定义name属性的插槽都隐式带有default属性,模版中没有放在指定name插槽中的内容默认放在默认插槽中
+ 注意 **`v-slot` 只能添加在 `template` 上**,只有在独占默认插槽的情况下在可以写在插件上
+ 只要出现多个插槽,就尽量使用完整的template语法,不要使用独占默认插槽的语法
+ 把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`,但是必须要有参数才行,直接写#是不行的,最好使用明确的插槽取而代之



#### 动态组件

可以通过 Vue 的 `<component> `元素加一个特殊的 ` is` attribute 来实现诸如选项卡的组件切换

```
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component v-bind:is="currentTabComponent"></component>
```

在上述示例中，`currentTabComponent` 可以包括

- 已注册组件的名字，或
- 一个组件的选项对象

`is`属性还可以实现不可嵌套的元素的嵌套

```
<table>
  <tr is="blog-post-row"></tr>
</table>

//自定义组件blog-post-row 作为属性传入
```



#### <keep-alive>组件

我们可以用<keep-alive>元素包裹那些我们第一次渲染想要缓存下来的组件

+ 注意这个 <keep-alive>要求被切换到的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。



#### 访问元素或组件的边界

+ 在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` property 进行访问
+ 和 `$root` 类似，`$parent` property 可以用来从一个子组件访问父组件的实例



#### Vue 提供了 `transition` 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

**利用赋值name属性,定义固定的样式类,vue在渲染的时候会自动添加或删除**



Vue 的过渡系统提供了非常多简单的方法设置进入、离开和列表的动效。那么对于数据元素本身的动效呢，比如：

- 数字和运算
- 颜色的显示
- SVG 节点的位置
- 元素的大小和其他的 property



#### JavaScript 钩子

可以在 attribute 中声明 JavaScript 钩子

```
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

当只用 JavaScript 过渡的时候，**在 `enter` 和 `leave` 中必须使用 `done` 进行回调**。否则，它们将被同步调用，过渡会立即完成。

推荐对于仅使用 JavaScript 过渡的元素添加 `v-bind:css="false"`，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。



#### 混入对象 -- 可以理解为配置的模块化

`minins`

+ 如果混入对象的钩子和自身的钩子同名的时候,混入对象的钩子先执行

+ 值为对象的选项,methods.components和内部的键如果冲突,都合并为组件

#### Prop

#### 静态或动态值

+ 无论值是动态还是静态,都要告诉Vue实例这是一个表达式而不是一个原始值,意思prop必须绑定,`v-bind`
+ 如果prop没有值都意味着`true`

```
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>
```

**porp单向数据流**

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行



+ prop除了可以是常见类型外还可以是*构造函数*,用instanceof验证

+ 如果你**不**希望组件的根元素继承 attribute，**你可以在组件的选项中设置 `inheritAttrs: false`**



#### directives

如果想注册局部指令，组件中也接受一个 `directives` 的选项：

```
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

然后你可以在模板中任何元素上使用新的 `v-focus` property，如下：

```
<input v-focus>
```

**指令有一些可选的钩子函数和钩子函数的参数**



#### $root $parent $children

子组件是可以通过`$root`访问根组件的,可以通过`$parent`访问父组件

父组件可以通过`$children[0]`格式访问子组件



#### $event 就是vue里面的事件对象,必须作为回调函数的最后一个参数,且必须以$event命名



利用内置组件`<component></component>`配合`is`属性可以实现动态组件渲染



**项目里面的地址如果是项目自身的路径,是需要用require(URL)的,因为在打包后,项目里面是没有那种文件路径的**



## vue实现原理 

```
https://www.bilibili.com/video/BV1m741137Q5/?p=32
```

**模块化按需导入**

```js
component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
//	固定写法,这里的意思是,webpackChunkName一致的时候,该包about中的一个路由,就会异步请求整个包
//	有模块化的好处,同一view的内容可以一次加载,减少异步请求的次数,这个必须会用
```



# router

```js
interface RouteConfig = {
  path: string,
  component?: Component,
  name?: string, // 命名路由
  components?: { [name: string]: Component }, // 命名视图组件
  redirect?: string | Location | Function,
  props?: boolean | Object | Function,
  alias?: string | Array<string>,
  children?: Array<RouteConfig>, // 嵌套路由
  beforeEnter?: (to: Route, from: Route, next: Function) => void,
  meta?: any,//	储存一些路由原信息

  // 2.6.0+
  caseSensitive?: boolean, // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions?: Object // 编译正则的选项
}
```



```bash
history 是H5提供的API,之前是通过hash模式实现的,其实也是通过阻止a标签的默认事件,然后执行点击事件

建议给路由取个逻辑名字,然后通过name实现导航(命名路由),这样就算path发生变化,导航也不会出错

路由如果跟我们的a链接的地址是精确匹配,vue会自动给我加上一个类,router-link-exact-active,没有精确匹配也会给我们加上router-link-active

如果我们使用命名路由,那动态路由的参数都写在params属性里面,因为可能有可能有多级动态,不要直接把参数给params
params: {
	id: item.id,
	time: ring.time,
}

第二种导航方式
在代码里面利用编程式导航,this.$router.push() //	这是router对象,利用里面的push方法

```



**通过注入路由器，我们可以在任何组件内通过 `this.$router` 访问路由器，也可以通过 `this.$route` 访问当前路由：**

**利用async await做一个异步请求,熟悉这些钩子,beforeMount(),数据请求放在这里也比较合理**

#### 动态路由

![image-20200722154535325](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200722154535325.png)

#### 路由嵌套

路由嵌套里面的子组件路径是不需要"/"的,

```
path: "news",
```



### 编程式的导航

除了使用 `router-link` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现。

```
router.push(location, onComplete?, onAbort?)

router.replace(location, onComplete?, onAbort?)

router.go(n)
```



#### 重定向和别名

`redirect`	--> 直接配置,或者命名路由,或者返回一个函数

`alias`	命名别名



#### 组件传参 属性(prop)

可以使用布尔模式|对象模式|函数模式(把route传进去就行)

如果 `props` 被设置为 `true`，`route.params` 将会被设置为组件属性。



#### 设置警告路由,既不存在路由就导向404页面或者首页等

通配所有为定义组件,404页面



### 导航守卫(路由钩子函数)

```
全局的路由钩子函数：beforeEach、afterEach
单个的路由钩子函数：beforeEnter
组件内的路由钩子函数：beforeRouteEnter、beforeRouteLeave、beforeRouteUpdate
```

处理一些受保护的页面,比如没登录的情况下是不能访问个人中心这种首保护的页面

就是路由在跳转的过程中的处理事件,起拦截作用,方便理解也可以理解为,路由钩子

例如跳转要查询是不是vip,显示对应页面

全局前置钩子

**在所有页面跳转都会触发,这样对特定操作不友好,所以需要路由独享守卫**

```js
router.beforeEach(to, from, next)

// next -- next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项
// 其实就可以理解为next和编程式导航接受同样的参数
router.beforeEach(function(to, from, next) {
  if (to.meta.auth) {
    // 需要登录才能访问
    if (store.state.loginUser.isLoading) {
      next({ name: "Auth", query: { returnurl: to.fullPath } });
    } else if (store.state.loginUser.data) {
      next(); //允许进入
    } else {
      next({ name: "Login" });
    }
  } else {
    // 都可以访问
    next();
  }
});

//	像这样就可以判断下面路由的meta储存的元信息,然后通过next()控制路由的跳转

 path: "/personal",
      name: "Personal",
      component: () => import("@/views/Personal.vue"),
      meta: {
        auth: true,//路由元信息,用来标记路由访问权限
      },

  
```



#### 通过权鉴页面可以动态路由导航到查询的页面,而不只是Personal页面,这样更合理

```js

//	差不多就是这个逻辑了
handleLogin() {
      if (this.isLoading) {
        return;
      }
      if (this.data) {
        if (this.$route.query.returnurl) {
          //	如果有这个查询的路由,就导到这里路由
          this.$router.push(this.$route.query.returnurl);
        } else {
          //	如果没有查询字符串的路由就导到个人中心页面
          this.$router.push({ name: "Personal" });
        }
      } else {
        //	如果没有数据,就导导登录页面
        this.$router.push({ name: "Login" });
      }
    },
  },
```



全局后置钩子

```
router.afterEach(to, from)
```

路由独享守卫

只在特定路由触发,这样可以个性化操作,比如只在特定路由触发登录组件

```
router.beforeEnter(to, from, nextfun)
```

组件内守卫

```
beforeRouteEnter(to, from, nextFun)
beforeRouteUpdate(to, from, nextFun)
beforeRouteLeave(to, from, nextFun)
```



## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。



#### 路由元信息

就是放在`meta`里面的信息



#### 数据获取

有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：

- **导航完成之后获取**：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。
- **导航完成之前获取**：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。



**在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。**



#### 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

`scrollBehavior` 方法接收 `to` 和 `from` 路由对象。第三个参数 `savedPosition` 当且仅当 `popstate` 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

如果有动画,**要注意在动画结束后设置才会生效**



#### 路由懒加载

## 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 [命名 chunk](https://webpack.js.org/guides/code-splitting-require/#chunkname)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```



### Vuex

全局注册,组件可以通过`this.$store`查看获取仓库属性

```
export default new Vuex.Store({
  //data
  state,
  getters,
  //methods,在mutation里处理状态
  mutations,
  //异步方法
  actions,
  //模块
  modules: {
    buyCar
  }
})
```

将要用到的全局state数据放在computed里面使用,使用计算属性解耦



在组件里面导入mapState

```
import {mapState} from 'vuex'
```

**找箭头函数this指向的时候要记得,函数才算执行环境,单纯的大括号不是执行环境,所以对象这些是不管里面箭头函数的this的指向**



#### TypeScript支持

TypeScript 可能在推断某个方法的类型的时候存在困难。因此，你可能需要在 `render` 或 `computed` 里的方法上标注返回值

```
import Vue, { VNode } from 'vue'

const Component = Vue.extend({
  data () {
    return {
      msg: 'Hello'
    }
  },
  methods: {
    // 需要标注有 `this` 参与运算的返回值类型
    greet (): string {
      return this.msg + ' world'
    }
  },
  computed: {
    // 需要标注
    greeting(): string {
      return this.greet() + '!'
    }
  },
  // `createElement` 是可推导的，但是 `render` 需要返回值类型
  render (createElement): VNode {
    return createElement('div', this.greeting)
  }
})
```



#### 路由

如果只想实现一个简单的页面级应用,可以以下面这种最简单的方式实现,没有必要导入完整的roter库

```
const NotFound = { template: '<p>Page not found</p>' }
const Home = { template: '<p>home page</p>' }
const About = { template: '<p>about page</p>' }

const routes = {
  '/': Home,
  '/about': About
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
```



# Vuex

```js
Vue.use(Vuex)

//创建整个项目的数据仓库对象，将多组件公用的数据放置到此对象里
export default new Vuex.Store({
  
  //共享数据全部配置在这,但是一般会以模块化的方式导入,然后放到modules里面,结果是一样的,但是数据结构会清晰很多
  state,
  
  //全局计算属性
  getters,
  
  //数据的改动methods,在mutation里处理状态,这里所有的方法都是同步方法,不能做ajax异步操作
  //	不能有任何副作用,即不能做异步操作,以便于数据可以返回,没有其他影响
  //  数据的改动必须commit一个mutations
  //  方法的第一参数默认为state里面的要操作的一个数据,payload为所需要传的载荷,只能传一个参数,可以为数组和				对象
  mutations,
  
  //异步方法 带有副作用的操作就放在这里
  //通过dispatch触发一个action,然后在action里面提交mutation修改数据等操作
  actions,
  
  //模块化 -- 如果应用变得复杂store变得臃肿的时候,可以导出多个小的store形成模块化
  //在模块化的时候为了不影响各个仓库,每个仓库都应该使用命名空间 --> nameSpace: true
  //在使用的时候
  modules: {
    buyCar
  }
})


state: 全局状态也就是全局数据
			 在组件里面可以通过$store.state....访问到数据,且数据变动时,会自动完成渲染
       但是这样写会很长,所以一般用一个计算属性,同时可以结合vue提供的辅助函数
       mapGetters|mapState|mapMutations|mapActions

getters: 全局计算属性,只包装数据不改变数据,想要从state获取新的格式数据的操作都放在这里做计算属性

mutations: 修改全局状态的唯一方法(不能做异步操作)
					 #mutations方法名可以用ES6计算属性名完美优化mutation

actions: 内部通过commit一个mutation来修改状态
				 其他组件dispatch一个action来提交mutation间接修改全局状态(可以做异步操作)
				 #其实质就是包了一层可以异步的mutation

modules: sotre模块化,当项目复杂用这个配置导出分块的小store
				 默认情况下，小store内部的 action、mutation 和 getter 是注册在全局命名空间的
         这个时候为了各个mutation和action互不影响,#要为小store开启命名--> namespaced: true
         //这时候提交mutation和分发action都要带上命名空间的文件名
				 
				 当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
         例如: // 模块内容（module assets）
              state: () => ({ ... }), // 使用 `namespaced` 属性不会对其产生影响
              getters: {
                isAdmin () { ... } // -> getters['account/isAdmin']
              },
              actions: {
                login () { ... } // -> dispatch('account/login')
              },
              mutations: {
                login () { ... } // -> commit('account/login')
              },
				
          如果你希望在带命名空间的模块内使用全局 state 和 getter，rootState 和 rootGetters 会作为第三					和第四参数传入 getter，也会通过 context 对象的属性传入 action。
					例如: 
                getters: {
                // 在这个模块的 getter 中，`getters` 被局部化了
                // 你可以使用 getter 的第四个参数来调用 `rootGetters`
                someGetter (state, getters, rootState, rootGetters) {
                  getters.someOtherGetter // -> 'foo/someOtherGetter'
                  rootGetters.someOtherGetter // -> 'someOtherGetter'
                },
                  
                actions: {
                // 在这个模块中， dispatch 和 commit 也被局部化了
                // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
                someAction ({ dispatch, commit, getters, rootGetters }) {
                  getters.someGetter // -> 'foo/someGetter'
                  rootGetters.someGetter // -> 'someGetter'

                  dispatch('someOtherAction') // -> 'foo/someOtherAction'
                  dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

                  commit('someMutation') // -> 'foo/someMutation'
                  commit('someMutation', null, { root: true }) // -> 'someMutation'
                },

                  
严格模式: 在创建store时使用strict: true,既可以保证修改全局状态只会通过mutation,如果不是就会报错
         但是⚠️在发布模式的时候不要使用严格模式,会消耗性能
         #  strict: process.env.NODE_ENV !== 'production'
         // 在生产环境是需要严格模式的,因为默认情况下虽然mutation里面不允许写异步操作,但是没开严格模式的							时候写了异步也不会报错而且也可以执行,只是vuex无法跟踪数据

表单处理: 全局的状态用于表单的时候不能使用v-model,会直接修改全局状态,这样违背了mutation改数据的唯一性
         这个时候推荐使用带有setter的计算属性比较完美的解决了这个问题,而且具有响应式
         computed: {
            message: {
              get () {
                return this.$store.state.obj.message
              },
              set (value) {
                this.$store.commit('updateMessage', value)
              }
            }
          }

⚠️mapState、mapGetters方法放在computed配置项里面
⚠️mapActions、mapMutations方法放在methods配置项里面

使用:
在组件里面可以通过$store.state....访问到数据,且数据变动时,会自动完成渲染
但是这样写会很长,所以一般用一个计算属性,同时可以结合vue提供的辅助函数
mapGetters|mapState|mapMutations|mapActions
学会使用这几个函数,数据和计算属性就比较简单的了 



```

### 辅助函数

**mapGetters|mapState|mapMutations|mapActions**

学会使用这几个函数,数据和计算属性就比较简单的了 

**mapGetters**

开启命名空间

在使用的时候结合展开运算符就可以方便添加新的属性,简直完美

不用辅助函数的时候,我们是通过this.$store.state.channels.isLoading来访问,这样会显得很麻烦,也很简洁

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200814203313966.png" alt="image-20200814203313966" style="zoom:50%;" />

借助mapState函数我们可以直接给导计算属性,和分别写data(){} isLoading(){}是一样的

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200814203356035.png" alt="image-20200814203356035" style="zoom:50%;" />

如果还需要添加其他的计算属性,我们可以利用展开运算符,然后再接着写计算属性就可以了

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200814203949624.png" alt="image-20200814203949624" style="zoom:50%;" />



*computed需要的刚好是一个属性为函数的对象,而mapState刚好返回的就是一个这样的对象,简直完美*





**通过fetch请求后返回的就是一个promise**

```js
fetch('http://example.com/movies.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson);
  });
```



## Action

**Action 通过 `store.dispatch` 方法触发**

Actions 支持同样的载荷方式和对象方式进行分发：

```
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```



#### 混入对象mixin

```js
let option = {
  // 混入对象和原配置的钩子函数如果冲突就以混入对象的钩子为准,除了钩子以外的其他配置都是合并的
    created(){
        console.log("组件创建");
    },
    beforeMount(){
        console.log("挂载前");
    },
    mounted(){
        console.log("挂载");
    }
}
const vm = new Vue({

    el: "#app",
    mixins: [option],
})

//名字相同以vue实例对象为准
```



#### 自定义指令

##### Vue.directive全局定义指令

##### directive局部自定义指令

钩子函数会获取到指令绑定的元素



### 插件

#### 插件的使用

像vue自带的插件router,vue会在看到的时候自动调用vue.use(router)

#### 自定义插件及其使用

```
			let lcPlugin = {
				install:function(Vue){
					console.log("安装LC插件")
					// 1. 添加全局方法或属性
					Vue.bgColor = 'skyblue'
					Vue.changeBg = function () {
						document.body.style.background = Vue.bgColor
					    // 逻辑...
					}
					
					
					  // 2. 添加全局指令
					  Vue.directive('focus', {
					    bind (el, binding, vnode, oldVnode) {
					      // 逻辑...
						  el.innerHTML = '<h1>focus</h1>'
					    }
					    //...
					  })
					  Vue.directive('lc', {
					    bind (el, binding, vnode, oldVnode) {
					      // 逻辑...
					    }
					    //...
					  })
					
					  // 3. 注入组件选项
					  Vue.mixin({
					    created: function () {
					      // 逻辑...
						  console.log("这是混入的生命周期")
					    }
					    //...
					  })
					
					  // 4. 添加实例方法
					  Vue.prototype.$changeColor = function (methodOptions) {
					    // 逻辑...
						Vue.changeBg()
					  }
				}
			}
			
			//`lcPlugin.install(Vue)`
			Vue.use(lcPlugin)

```



### 过滤器



```js
<!-- 在双花括号中 -->
//	利用过滤器capitalize过滤message
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
//	利用formatId过滤器过滤rawId
<div v-bind:id="rawId | formatId"></div>
```

在创建 Vue 实例之前全局定义过滤器：

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

局部定义过滤器

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```





# Vue(课程笔记)

> 渐进式框架
>
> 渐进式:声明式渲染-->组件-->vue-router-->vuex-->项目建立

**构造只会返回this或者其他引用数据类型,如果返回的是基础数据类型会被忽略,在构建实例的时候依然返回this**

## 双向数据绑定(Object.defineProperty)

```js
<script>
      function MyVue(opts) {
        // 返回出去的实例对象
        const vm = {};

        // 实现数据到视图
        // 循环遍历 opts.data 对象
        for (const key in opts.data) {
          console.log(key);

          // // 根据属性名，获取对应绑定的元素
          const _el = document.querySelector(`[my-v-model="${key}"]`);

          const _el_my_v_text = document.querySelector(`[my-v-text="${key}"]`);

          let _value = "";

          // 属性描述符
          const descriptor = {
            // 获取属性值时，进入
            get() {
              return _value;
            },
            // 给属性赋值时，进入
            set(newValue) {
              _value = newValue;
              // 做更新视图的操作...
              _el.value = _value;
              _el_my_v_text.innerText = _value;
            },
          };

          // 定义属性，克隆 opts.data 上面的键值对
          Object.defineProperty(vm, key, descriptor);
        }
        // /实现数据到视图

        // 实现视图到数据
        const rootEl = document.querySelector(opts.el);
        rootEl.addEventListener("input", (e) => {
          const key = e.target.getAttribute("my-v-model");
          const value = e.target.value;
          vm[key] = value;
        });
        // /实现视图到数据

        return vm;
      }

      var vm = new MyVue({
        el: "#root",
        data: {
          name: "",
        },
      });

      // vm.name = "小张";
</script>
```





## 基础语法

```html
    <div id="app">
        <!-- 插值表达式支持表达式,如果复杂的表达式建议放到计算属性 -->
        <h1>{{ msg }}</h1>
        <p>{{ 1 + 2 }}</p>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const vm = new Vue({
            data: { //模版数据
                msg: "hello vue"
            }
        }).$mount("#app") // 模版根元素
    </script>
```

### 语法发展

> 字符串拼接
>
> 模版字符串
>
> vue.js解析模版

### vue语法概述

1. 插值表达式 

   同模版插值

2. 指令

   自定义属性

   > v-开头

   ```
   //	利用 v-cloak解决插值表达式的闪动问题,在脚手架里面文件话组件是不存在闪动
   [v-cloak]{
   	display: none;
   }
   //	然后把v-cloak属性加到元素
   
   //	指令
   v-text // 使用这种方式不会存在闪动 innerText
   v-html //	会存在跨域脚本攻击 (cros site script)innerHtml
   			 // 自己服务器返回的数据可以用,第三方返回的数据最好不要用
   v-pre	//	类似于pre元素   <p v-pre>{{msg}}</p>
   v-once //	只会编译一次,二次改动数据,不会再渲染该元素视图了
   v-model //	双向数据绑定 数据-->视图(绑定)  视图-->数据(监听)
   ```

3. 事件绑定

4. 属性绑定

5. 样式绑定

6. 分支循环结构

### 响应式(观察者模式和发布-订阅者模式)

> 核心API:Object.defineProperty
>
> 数据驱动视图

```js
var obj = { name: "lifen"}
Object.defineProperty(obj, "age", {
	get() {
		console.log("在get该属性的时候会自动触发get函数")
	},
	set() {
		console.log("在set该属性的时候会自动触发set函数")
	}
})
```

### MVVM设计模式

- M(model):模型,数据
- V(view): 视图 模版
- VM(view-model): vue实例模块

### 事件绑定

**v-on:click**

```js
//语法
v-on:"标准事件名"
//简写
@:click="handle" 没有参数的时候handle和handle()是一样的,但是没有括号第一个参数是事件,带了括号就是$event

 methods: {
        handle(p1, p2, event){ // 如果绑定函数调用,事件对象必须以形参名$event进行传递,位置可以不固定
        },
        handle1(event) { // 事件绑定事件名称,默认第一个参数就是事件对象
            console.log(event.target.innerHTML);
        }
    }
```

⚠️不要在vue里面随便使用箭头函数,在调用this的时候极有可能出错

⚠️事件不一定要绑定 处理函数,可以直接写事件,例如@click.prevent

```
不要在选项 property 或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。
```

### 事件修饰符

```
@click.prevent.stop //	连写的时候,有先后性差异
//	典型先后差异@click.prevent.self 和 @click.self.prevent

//	回车修饰符
@keyup.enter = "submit"

//	delete修饰符
@keyip.delete = "clear"  //	现在可以组合修饰符@keyup.ctrl.delete

```

### 自定义按键修饰符

```
Vue.config.keyCodes."自定义修饰名称" = 65;
```

### 属性绑定

```
v-bind //	动态绑定属性,会经过vue的编译,属性值可是表达式和变量
//	简写
:

//	利用v-bind 和v-on就可以实现v-model的双向绑定效果
//	底层的双向数据绑定是基于Object.defineProperty监听set get方法等
```

⚠️绑定属性的时候,**内部的表达式不需要 用编译符号包裹**

### 样式Class绑定

```
//	接收对象和数组两种形式
//	对象
:class = {activeClass : isActive, errorCalss : isError}

//  数组
:class = "[acClass, erClass]"

data: {
	acClass: "activeClass",
	erClass: "errorCalss"
}

//  数组整体绑定
data: {
	classArr: [ //	这样写就方便操作样式,操作数组就比较简单
			{
			acClass: "activeClass"
			},
			{
			erClass: "errorCalss"
			}
	]
}

<style>
activeClass {
	/*样式*/
}

errorCalss {
	/*样式*/
}
</style>
```

⚠️vue的样式绑定不是覆盖式写入,是动态添加的,原有的样式不会受到影响

### style样式绑定

⚠️**style样式绑定是接受一个对象或者数组,参照css是一个格式**

样式如果带“-”就改成大驼峰,background-color --> backgroundColor

```
//	可以接受数组和对象两种形式
```

### v-if v-show

```
//	下列指令中不允许插入其他元素,如果出现多个,可以使用<template></template>包裹
v-if
v-else-if
v-else

//	频繁渲染的时候使用这个可以减少性能的消耗,只是控制display: none
v-show
```

### v-for

#### key

- 同一父级元素中,key值不允许重复,vue在遍历时如果遇到重复key值是会出错的

```html
<!--	对象的遍历 不常用 -->
<div v-for="(value, key, index) in object"></div>
<!--结合v-if使用,但是永远不要把v-for和v-if放在一起 -->
<div "v-for="(value, key, index) in object" v-if = "value == 18></div>
<script>
  data: {
	object: {
		name: "zs",
		age: 18
	}
}
</script>

```



## 表单基本操作

- 单行输入框, input直接通过v-model绑定
- 单选按钮,radio用同一个数据,数据是单个值
- 多选框,chekbox用同一个数组
- 下拉框如果设置了multiple多选属性,数据也需要用数组
- 文本域也和单行输入文本一致,也是用的单个值(⚠️在vue里面不允许在文本域元素中间放数据)

### 表单域修饰符

> 表单域修饰符是跟在v-model后面 --> v-model.number

- .number --> 将字符串转成数字
- .trim --> 去掉字符串的前后空格,不能去掉字符串的中间空格
- .lazy --> 把数据变更的input事件改成change事件

## 自定义指令

**自定义指令钩子**:

- inserted --触发一次
- bind --触发一次,绑定到父节点的时候
- update --更新的时候就会触发,可以出发多次
- componentUpdated --vNode更新就触发
- unbind --解绑的时候触发一次

**钩子函数的参数** (即 `el`、`binding`、`vnode` 和 `oldVnode`

```js
# 注意,在定义指令的时候是不需要v-的,但是在写的时候是需要v-color的
//	全局自定义指令  
//  不带参数的指令
  Vue.directive("focus", {
      inserted(el) {
          //  在绑定的元素被插入到DOM时,Vue会自动调用
          el.focus();
      }
  })

  //  带参数的指令
  Vue.directive("color",{
      bind(el, binding) { //和inserted钩子函数差别不大,
          //	可以通过binding参数获取值和一些其他的属性
          el.style.backgroundColor = binding.value;// 取的就是后面的值
      }
  })

//	局部自定义指令
//	在配置项 directives里面定义,可以定义多个
  diretives: {
    color: {
    bind(el, binding){
      el.style.backgroundColor = binding.value
      }
    }
  }
```

## 计算属性写在computed配置项里面

- 计算属性是有缓存的,这个就和methods是不同的,这能提高效率
- 第二次访问同意属性的时候会直接取缓存的值,不会再进行计算,节省性能
- 而函数methods访问的时候就会触发

```js
computed: {
	reverseStr() { //	反转字符串计算属性,
		return msg.split("").reverse().join()// 这个返回的值就是计算属性的值
	}
}
```

⚠️计算属性不要定义和data里面同名,会出现警告

⚠️计算属性里面不能写异步操作



## 属性props

> 组件需要接收的数据就用属性

⚠️如果默认值是数组和对象的时候,默认值要用函数返回,以防止复用时引用错乱

```
default: function () {
          return []
      }
```



## 帧听器

> 写在watch配置项里面
>
> Vue:当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的
>
> 例子: 在输入框输入文本的时候要缓存到本地以做下次搜索的历史记录,这个时候就可以使用帧听器

- 帧听器是帧听数据变化,然后在帧听器里面做相应的操作
- 配置: 
  - **immediate: true** //该回调将会在侦听开始之后被立即调用
  - **deep: true** // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深

```
data: {
	firstNmae: "Jim"
}

watch: {
	firstName() { //	帧听器必须要和帧听的数据里面的属性名一致
		console.log("Oh changed!")
	}
}
```

⚠️帧听器必须要和帧听的数据的数据属性名一致

⚠️帧听器不需要返回值,只需要做自己需要的操作的就可以了

⚠️帧听器里面可以做异步操作



## 过滤器

> 有全局过滤器Vue.filter(),同时也有filters: {}配置局部过滤

⚠️如果字符串为"",在使用charAt()的时候是不会报错的,但是如果使用数组的访问方式""[0]这样就会报错undefined

```
// 注册 全局过滤器
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

// 局部
filters: {
	myFilter() {
		/*过滤操作*/
	}
}
```

⚠️过滤器是需要返回值的

⚠️不能在v-model, v-text, v-html里面使用过滤器,v-bind是可以使用过滤器

⚠️不能在自定义指令里面使用过滤器

⚠️filter(data[, ...arg]),后续arg可以带其他参数,例如我们要对时间对象进行格式化

⚠️第一个参数是需要的,就是要处理那个数据



## 生命周期

> [文档说明](https://cn.vuejs.org/v2/api/#%E9%80%89%E9%A1%B9-%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90)

```js
//  生命周期钩子 
	//	自动调用
beforeCreate: function () {
    console.log('----------------beforeCreate（拿不到data）----------------');
    console.log(this.msg);
},
//	已经有数据了,但是没有进行挂载的DOM渲染,区别mounted
  # 这里没有渲染DOM是指没有渲染vue的模版,其他DOM是有的
  //	自动调用
  //	⚠️提前载入数据可以增加用户体验,
created: function () {
    console.log('----------------created（可以拿到data，拿不到dom）----------------');
    console.log(this.msg, this.$el);
},
  //	自动调用
beforeMount: function () {
    console.log('----------------beforeMount（可以拿到dom，但没有经过vue解析）----------------');
    //	$el--模版根元素 outerHTML是包括自己的DOM元素
    console.log(this.$el.outerHTML);
},
// 挂载完成,已经进行了渲染,这个钩子用的比较多
  //	自动调用
  //  ⚠️需要同步操作DOM的时候就在这里写
mounted: function () {
    console.log('----------------mounted（dom已经经过vue解析了）----------------');
  	//	$el--模版根元素 outerHTML是包括自己的DOM元素
    console.log(this.$el.outerHTML);
},
  //	在vue实例的数据发生更新的时候自动触发
beforeUpdate: function () {
    console.log('----------------beforeUpdate（最新的数据还没有更新到dom上，dom上还是老数据）----------------');
    console.log(this.$el.outerHTML);
},
updated: function () {
    console.log('----------------updated（最新的数据已经更新到dom上了）----------------');
    console.log(this.$el.outerHTML);
},
beforeDestroy: function () {
    console.log('----------------beforeDestroy（实例仍然完全可用）----------------');
},
  //	销毁只是销毁vue实例,但是已经注册的事件已经按原生的方式绑定到DOM上,而vue却没有帮我们再销毁事件
destroyed: function () {
    console.log('----------------destroyed（实例所有的数据响应式监听和事件监听会被移除）----------------');
    console.log(
        '----------------destroyed（这里所说的事件监听不是说的DOM事件，而是说的通过Vue的事件API绑定的事件，如：$on、$once）----------------'
        );
}
```

⚠️this.$on()监听事件, this.$emit()触发事件



## 数组处理方法

变异方法:vue重写了这些方法使其具有响应式 `push` | `pop` | `shift` | `unshift` | `splice` | `srot` | `reverse`

非变异方法: `filter` `slice` `concat` 这三个会返回一个新数组,不会改动原数组



### ⚠️数据响应式方法补充

`Vue.$set()`

`vm.$set()`

⚠️直接操作数组的索引是不支持响应式的

⚠️在vue实例创建以后再通过vm.info.newProperty = "newValue";**这种方式赋值是不具有响应式的**,但是在实例创建前如果就有这个数据,那这个数据 还是具有响应式的



## 组件

- 标准
- 分治
- 重用
- 组合 -- 利用插槽

### 全局注册

```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  name: "btn-counter", //	利用name属性给组件命名,不然就是匿名组件
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

⚠️组件注意事项

- 组件参数的**data值必须是函数**同时这个函数要求返回一个对象 
- 组件模板必须是**单个根元素**
- 组件模板的内容可以是模板字符串

⚠️命名

- 可以以短横线hello-world,大驼峰HelloWorld命名(推荐)
- 总结: **注册时就用大驼峰,其他地方使用的时候都用短横线,不会出错**

### 局部注册

```js
	// 定义组件的模板
    var Child = {
      template: '<div>A custom component!</div>'
    }
    new Vue({
      //局部注册组件  
      components: {
        // <my-component> 将只在父模板可用  一定要在实例上注册了才能在html文件中使用
        'MyComponent': Child
      }
    })
```

⚠️局部组件只能在他注册的父组件里面使用,其他地方用不了,而且同时注册兄弟组件也不能嵌套

### 开发者工具

⚠️devtools只能监测到使用开发版本的vue编写的文件,使用压缩版vue.min.js是监测不到的

## 组件传值

> 单向数据流,父组件 --> 子组件

## 父传子props

⚠️props配置里面写小驼峰形式,而在标签里面要写短横线形式

⚠️如果是做静态属性,那里面的值(字符串、数字、布尔)就是原始字符串类型,动态绑定的属性里面的类型是经过vue编译的

[属性验证](https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81)

```js
props: ["title", "content"]
//	这里定义的属性可以是静态也可以是动态

//	属性验证
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number, Object, Array, Boolean, Function, RegExp],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

### 子传父$emit

> 方法名固定,触发当前实例上的事件。附加参数都会传给监听器回调

语法

```
vm.$emit( eventName, […args] )
参数：

{string} eventName
[...args]
```

```html
//	子组件模版
<son @click="$emit('enlarge-text')"></son>
//	父组件
<father enlarge-text="handle"></father>
```

### 兄弟组件数据交互

> 通过事件中心进行传递, const hub = new Vue() -- vue实例充当事件中心

> 可以理解为监听自己的事件,当其他组件触发我的事件的时候,我就可以通过监听的事件参数拿到数据

```
const hub = new Vue()
//	监听
hub.$on
//	触发 -- 不能直接写在元素中,会报未定义
hub.$emit
//	销毁 -- 执行销毁函数后,事件就失效来
hub.$off
```

⚠️使用事件中心处理的时候,事件触发hub.$emit()不能放在元素上面,会报错,所以一般放在处理函数上面



### 插槽

> 放在组件中的<slot></slot>标签,也就是在组件中间的位置
>
> 默认情况下没有插槽的组件式不允许写内容的,写了也不会显示,没有地方放内容,能写的情况下至少有一个默认插槽

**插槽和属性的区别**

插槽可以嵌套标签,而属性不能插标签,只能插值

#### 具名插槽

```
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。

在向具名插槽提供内容的时候，我们可以在一个 `<template>` 元素上使用 `v-slot` 指令，并以 `v-slot` 的参数的形式提供其名称：**原slot属性已经废弃**

```
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

#### **作用域插槽**

⚠️为了让 `user` 在父级的插槽内容中可用，我们可以将 `user` (这里user就是指子组件的数据或者属性)作为 `<slot>` 元素的一个 attribute 绑定上去：

```
<span>
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</span>
```

⚠️绑定在 `<slot>` 元素上的 attribute 被称为**插槽 prop**。现在在父级作用域中，我们可以使用带值的 `v-slot` 来定义我们提供的插槽 prop 的名字：**slotProps是自定义的名字,会自动带有slot上绑定的属性**

```
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

⚠️**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**



#### 在作用域插槽中利用解构获取属性也是很好的方式

```
<current-user v-slot="{ user: person }"> //	可以重命名
  {{ person.firstName }}
</current-user>

//	推荐使用 #default="{ user: person}"
```



#### 具名插槽的缩写

> 2.6.0 新增

跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 (`v-slot:`) 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`： `#default`不能省略

```
<base-layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```



## 路由

⚠️**理解和使用路由嵌套,router-link和router-view的位置**

> 根据不同的用户事件,显示不同的页面内容
>
> 本质就是用户事件与处理函数之间的对应关系

- 基本使用
- 嵌套路由
- 动态路由匹配 -- 如果出现多级路由参数,最好使用命名带查询参数路由
- 命名路由
- 编程式导航



### 基于URL的hash值的路由实现

```
//	监听hashchange事件,每一次一url的hash值变化,都会触发该事件
window.onhashChange = function() {}

//	vue里面这个就是用来展示组件的地方,相当于脚手架里面的<router-view></router-view>
<component :is="component-name"></component>

// 上述这种方式也可动态渲染view,基于url中的路由变化,触发window.onhashChange事件,同时还有可以帧听$roter的变化,配合<component></component>的is属性动态渲染指定组件
```



### Vue-router

**配置路由**

```js
//	创建路由实例对象
var router = new VueRouter({

	// routes 是路由规则数组
	routes: {
		//	每个路由规则都是一个配置对象,其中至少包含 path 和component 两个属性:
		//	path 表示当前路由规则匹配的 hash 地址
		//	component 表示当前路由规则对应要展示的组件
		{path: '/user', component: User},
		{path: '/register', component: Register}
	}
})
```



### 嵌套路由

> 在组件内定义好子路由链接和路由占位符
>
> 然后在对应父路由新增children路由配置



### 动态路由

> 动态匹配路由参数

- 利用在路由种`props: true` 配置,然后在模版种就可以直接利用props接收参数
- 还可以配置为`props:{}`
- 还可以为props配置为函数类型 props: route => ({})



### 命名路由

```js
//命名路由可以指定参数,参数以对象形式
//注意命名路由要进行动态绑定,因为我们导航的是路由的名字,而不知直接的路由地址
<router-link :to="{ name: 'user', params: {id: 3} }">User3</router-link>
//	编程式导航也可以用这种方式进行书写
router.push({ name: 'user', params: {id: 3})
```



### ⚠️编程式导航

> a标签和router-link是叫声明式导航
>
> 编程式导航利用的路由实例的静态方法

**router实例方法**

```js
router.push(location, onComplete?, onAbort?)
router.push(location).then(onComplete).catch(onAbort)
router.replace(location, onComplete?, onAbort?)
router.replace(location).then(onComplete).catch(onAbort)
router.go(n)
router.back()
router.forward()
```

```js
router.push可以提供多种类型的参数
//	字符串
router.push("/home")
//	对象
router.push({path: '/home'})
//	命名路由
router.push({name: '/home', params: {userId: 123}})
//	查询参数
router.push({path: "/register", query: { uname: "lisi" }})
```



### vue-cli

- 配置文件不支持热加载
- 重配置后需要重启项目



# vue项目优化

> https默认端口443

**项目优化实现步骤:**

- 生成打包报告,根据报告优化项目
- 第三方库启用CDN
- Element-UI组件按需加载
- 路由懒加载
- 首页内容定制



**具体优化细节**

1. **添加进度条**

   ```
   //	主要利用nprogress插件的两个方法
   //	在axios请求拦截器和响应拦截器分别设置
   NProgress.start()
   NProgress.done()
   ```

2. **运行serve根据报错修改代码**

   ```
   //出现分行报错和格式化冲突的时候,将每行的文字量改为200(默认80)
   {
       "semi":false,
       "singleQuote":true,
       "printWidth":200
   }
   ```

3. **执行build,利用babel-plugin-transform-remove-console移除生成阶段console,**

   ```
   //项目发布阶段需要用到的babel插件
   const productPlugins = []
   
   //判断是开发还是发布阶段,process.env.NODE_ENV是固定写法获取状态
   if(process.env.NODE_ENV === 'production'){
     //发布阶段
     productPlugins.push("transform-remove-console")
   }
   
   module.exports = {
     "presets": [
       "@vue/app"
     ],
     "plugins": [
       [
         "component",
         {
           "libraryName": "element-ui",
           "styleLibraryName": "theme-chalk"
         }
       ],
       ...productPlugins
     ]
   }
   ```

4. **生成打包报告**

   ```
   //命令行生成打包报告
   vue-cli-service build --report
   
   //	GUI 运行build 运行查看分析,控制台面板查看报告
   ```

5. **修改webpack的默认配置**

   ```
   默认情况下vue-cli 3.0生成的项目,隐藏了webpack配置项,如果我们需要配置webpack需要通过vue.config.js来配置
   
   //	为不同的模式配置不同的打包入口
   module.exports = {
       chainWebpack:config=>{
           //发布模式
           config.when(process.env.NODE_ENV === 'production',config=>{
               //entry找到默认的打包入口，调用clear则是删除默认的打包入口
               //add添加新的打包入口
               config.entry('app').clear().add('./src/main-prod.js')
           })
           //开发模式
           config.when(process.env.NODE_ENV === 'development',config=>{
               config.entry('app').clear().add('./src/main-dev.js')
           })
       }
   }
   
   //补充：
   chainWebpack可以通过链式编程的形式，修改webpack配置
   configureWebpack可以通过操作对象的形式，修改webpack配置
   ```

   

6. **加载外部CDN**

   ```
   默认情况下，依赖项的所有第三方包都会被打包到js/chunk-vendors.******.js文件中
   导致js文件过大,我们可以通过externals排除这些包,使他们不被打包到js/chunk-vendors.******.js文件中
   
   
   module.exports = {
       chainWebpack:config=>{
           //发布模式
           config.when(process.env.NODE_ENV === 'production',config=>{
               //entry找到默认的打包入口，调用clear则是删除默认的打包入口
               //add添加新的打包入口
               config.entry('app').clear().add('./src/main-prod.js')
   
               //使用externals设置排除项
               //当遇到import Vue from 'vue'这样的代码,就会直接在全局在全局找Vue这变量
               //而我们用<script src=""></script> CDN这种形式导入的vue刚好在全局挂载了一个Vue变量
               config.set('externals',{
                   vue:'Vue',
                   'vue-router':'VueRout er',
                   axios:'axios',
                   lodash:'_',
                   echarts:'echarts',
                   nprogress:'NProgress',
                   'vue-quill-editor':'VueQuillEditor'
               })
           })
           //开发模式
           config.when(process.env.NODE_ENV === 'development',config=>{
               config.entry('app').clear().add('./src/main-dev.js')
           })
       }
   }
   
   //然后打开public/index.html添加外部cdn引入代码
   
   
   
   ```

7. **定制首页内容**

   ```
   module.exports = {
       chainWebpack:config=>{
           config.when(process.env.NODE_ENV === 'production',config=>{
               ......
               
               //使用插件
               config.plugin('html').tap(args=>{
                   //添加参数isProd
                   args[0].isProd = true
                   return args
               })
           })
   
           config.when(process.env.NODE_ENV === 'development',config=>{
               config.entry('app').clear().add('./src/main-dev.js')
   
               //使用插件
               config.plugin('html').tap(args=>{
                   //添加参数isProd
                   args[0].isProd = false
                   return args
               })
           })
       }
   }
   
   然后在public/index.html中使用插件判断是否为发布环境并定制首页内容
   
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width,initial-scale=1.0">
       <link rel="icon" href="<%= BASE_URL %>favicon.ico">
       <title><%= htmlWebpackPlugin.options.isProd ? '' : 'dev - ' %>电商后台管理系统</title>
   
       <% if(htmlWebpackPlugin.options.isProd){ %>
       <!-- nprogress 的样式表文件 -->
       <link rel="stylesheet" href="https://cdn.staticfile.org/nprogress/0.2.0/nprogress.min.css" />
       ........
       <!-- element-ui 的 js 文件 -->
       <script src="https://cdn.staticfile.org/element-ui/2.8.2/index.js"></script>
       <% } %>
     </head>
     .......
   ```

   

8. **路由懒加载**

   ⚠️脚手架创建的项目的时候打包插件babel预设已经装了

   ```
   安装插件@babel/plugin-syntax-dynamic-import
   实现组件的模块化按需加载
   在babel.config.js中声明该插件
   
   
   //项目发布阶段需要用到的babel插件
   const productPlugins = []
   
   //判断是开发还是发布阶段
   if(process.env.NODE_ENV === 'production'){
     //发布阶段
     productPlugins.push("transform-remove-console")
   }
   
   module.exports = {
     "presets": [
       "@vue/app"
     ],
     "plugins": [
       [
         "component",
         {
           "libraryName": "element-ui",
           "styleLibraryName": "theme-chalk"
         }
       ],
       ...productPlugins,
       //配置路由懒加载插件
       "@babel/plugin-syntax-dynamic-import"
     ]
   }
   ```

9. **项目上线**

   ```
   配置https服务器
   Gzip压缩代码,在配置静态文件中间件之前配置app.use(compression())压缩中间件
   
   使用pm2管理应用(pm2可以在服务器程序关闭的情况下依然能正常托管静态文件)
   // pm2操作
   打开vue_shop_server文件夹的终端，输入命令：npm i pm2 -g
   使用pm2启动项目，在终端中输入命令：pm2 start app.js --name 自定义名称
   查看项目列表命令：pm2 ls
   重启项目：pm2 restart 自定义名称 / id
   停止项目：pm2 stop 自定义名称 / id
   删除项目：pm2 delete 自定义名称 / id
   保存任务到磁盘: pm2 save // 这样就算是关机也会保存任务
   更新任务: pm2 updata
   
   这样就算我们把服务器程序终端关闭,静态资源依然可以访问
   ```



然而这才是一切的开始...

