# js基础

[TOC]

## js初识

### 编程语言

00000001(二进制) --> 汇编语言(英文缩写标识符) --> 高级语言 (js c++ c python等)

html 标记语言不发出指令,用来被读取



CPU --> 内存条 --> 硬盘(机械的比较慢,跟CPU的速度差距太大了)

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200612200943130.png" alt="image-20200612200943130" style="zoom:50%;" />



+ 脚本语言,不需要进行编印,由js引擎直接逐行来进行解释并执行
+ 现在可以基于Node.js技术进行服务器端编程



### javascript

+ 表单验证 最开始的目的



#### 渲染引擎

解析HTML CSS,内核,例如blik和webkit

#### JS引擎

JS解释器,用来读取网页中Javascript代码,对其处理后运行, chrome  V8





## 数据类型初识

```
编程语言 能与计算机进行交流 有自己的逻辑
            机器语言    汇编语言    高级语言(C C++ java js python php golang)
        
        js的三种引入方式
        <!-- 1.行内式 直接写到与元素内部 -->
        <!-- 2.引入式 通过<script src="main.js">标签引入,外部引入标签中间不允许使用代码,使用了代码也不会执行 -->
        <!-- 3.内嵌式 直接在结构中直接通过<script>标签嵌入 -->

        注释
        单行注释 多行注释

        变量的使用
        1.声明变量
        2.赋值

        通过const声明的变量必须初始化,而且初始化的原始值不可更改

        未声明 和 未初始化的变量  在typeof来看是一样的

        数据类型
        数字类型
        八进制 010,以0开头
        十六进制 以0x开头

        数字中是有最大值和最小值的,超过最大值和最小值都是infinity
        infinity 和 NaN 都是数字类型
        
        转义字符\
        换行符\n 中的n是指newline
        \t tab 
        \b 空格blank
```



### 变量申明和原理

变量命名,不允许数组开头,只允许**英文字母**和**$** 和 **_** 

```
// 变量申明和原理,括号运算符
var a = (1,2,5,667,8);//8
```

**变量类型应该是在预编译的时候确定的**



**通过promot输入的是string类型**





## 运算符

```
/**
 * 模版字符串
 */

var num = 4;
console.log(`我就是要吃${ num }个包子`);

/**
 * 数据类型
 * 数字 字符串 布尔 undefined null 
 * null + 数字 --> 还是数字
 * undefined + 数字 --> NaN
 */

 /**
  * 字面量
  */

  /**
   * 数据类型的转换
   * 
   * - 是隐式转换为数字类型
   */

   console.log("12" - "12");//为了不报错,尽量想办法转换为数字进行运算

    /**
     * Boolean 为false
     * 0 false "" null undefined NaN
     */

     /**
      * 浮点数进行计算会出现误差
      */

    //   递增运算符和递减运算符必须配合变量使用
    //   ++ 1;//这种写法是无效的,只是一个无意义的表达式

   var result = 25 ^ 3;
   console.log(result);
```



## 流程控制

```
				/**
         * 流程控制
         * 
         * 顺序结构 分支结构 循环执行
         * if里面的表达式默认隐式转换为布尔型
         * if可以单独出现,但是else不能单独出现
         * 
         * 润年:四年一润 百年不润 四百年再润
         * 
         * 多分支语句最后只会执行一个条件语句,多选一
         * 最后一条else是不跟if的,else if中间有空格
         * 
         * switch case
         * 1.开发里面表达式我们经常写成变量,但是其结果要是一个常量不然没办法比较
         * 2.变量和case里面的值相匹配的时候是全等,必须是值和数据类型都一致
         * 3.如果当前的case里面没有break,则不会退出switch继续执行下一个case,直接执行不再进行比较了
         */
```

```js
switch(num){
	case 1:
	case 2:
	alert("swtich可以从上面漏下来");
	break;
	case 3:
	alert("3");
	break;
	default:
	break;
}
```



### 循环

**for循环**

​    1.循环的起始

​    2.循环的事件

​    3.循环的增量/减量



​    断点调试

​    source 里面在行上打断点,还可添加表达式观察等

​    打点后需要刷新



break

**continue 必须在循环中使用,放在循环外报错**



## 数组

[数组方法展示](./notes/javaScript数组方法)

**终极方法**

```js
splice(start: number, deleteCount?: number): T[];
    /**
     * Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
     * @param start The zero-based location in the array from which to start removing elements.
     * @param deleteCount The number of elements to remove.
     * @param items Elements to insert into the array in place of the deleted elements.
     *
```



## 函数



### **return**

​    默认终止函数,单写return默认返回undefined,不写return执行到最后也默认返回undefined

​    return只能写一个,写多个也没用

​    return 返回逗号多个值的时候只回返回最后一个



###     **arguments**

​    是当前函数的内置对象,所有函数都内置了一个arguments对象,arguments中储存了传递的所有实参

​    arguments是一个类数组,只有函数才有arguments,且每个函数都有一个arguments

​    1.具有数组length属性

​    2.以索引为属性

​    一般会添加数组的push和splice方法,这样会更像数组

​    可以按照数组遍历arguments



###     **函数声明**

​    1.函数声明

​    2.函数表达式

​        函数表达式类似于变量声明,所以接收的是变量不是函数,只是里面有函数引用

​        函数表达式也可以进行传递参数

​        函数表达式不允许出现函数名,会报错



###     **作用域**

​    1.全局作用域,整个script标签或者是一个单独的js文件

​    2.局部作用域(函数作用域) 在函数内部就是局部作用域



### **变量作用域**

####     **全局变量**

​    全局作用域的变量和暗示全局变量

​    比较占内存,只有在浏览器被关闭的时候才会被销毁

####     **局部变量**

​    局部声明的变量和行参属于局部变量(注意暗示全局变量)

​    变量储存在函数中,在函数执行完就销毁,比较节省内存



####     预解析 代码执行

​    函数声明整体提升,变量声明提升,提升到当前作用域最顶端



####     **对象**

​    对象是由属性和行为组成



####     **创建对象的三种方式**

​    对象字面量的方式

​    new Object

​    利用构造函数创建对象



####     **内置对象**

​    Math

​    其中Math.random比较重要

​    Date

​    时间戳

​    var date = new Date();

​    date.valueof();

​    date.getTime();



​    var date = +new Date();



​    Date.now;H5新写法



​    日期对象必须要实例化才能使用

​    一般我们都会进行日期格式化

​    Array

​    let arr = new Array(2);

​    写一个值的时候是指定数组长度,创建了指定长度的空数组

​    String



数组去重(重点)

https://segmentfault.com/a/1190000016418021







## WebAPI

DOM如何起作用? 源代码 --> DOM --> 引擎渲染

### 获取元素

根据ID获取

​        使用document.getElementById方法



​        1.文档从上往下加载,所以先得有标签,所以我们script写到标签的下面,后期使用async

​        2.文档方法采用的驼峰命名法,需要参数(对大小写敏感的字符串)

​        3.返回的是一个DOM元素对象

​        4.**使用console.dir()可以更好的查看返回元素对象**



​        系统自己就存在叫与元素ID值同名的DOM元素,可以直接使用,就是第一个带这个ID的元素,不需要获取

​        但是不建议,直接使用,未声名且兼容性个浏览器有差



getElementsByTagName --> 根据标签名



#### IE9新增

getElementsByClassName --> 根据类名选择到一个元素的类数组

querySelector --> 根据选择器选择第一个选到的DOM元素

querySelectorAll --> 根据选择器来选择到一个类数组



#### 获取body标签

​        body = document.body;



#### 获取html标签

​        htmlEle = document.documentElement;



#### 事件三要素

​        1.事件是由三部分组成: 事件源 事件类型 事件处理程序

​        事件命名不需要驼峰命名



#### 改变元素内容

​        element.innerText

​        设置标签之间的文字内容,不识别html标签,非标准 去除空格和换行

​        element.innerHtml //这个写法更友好

​        W3C标准,识别html标签,保留空格和换行

这两个方法都是可读可写的



表单元素的值需要通过修改input.value而不是element.innerHTMl

操作DOM元素的属性: vlaue type disable

操作DOM元素的className,如果本身就有类,就需要多个同时保存,不然会覆盖原类



#### 复制节点/拷贝

​    element.clone()浅拷贝,默认只拷贝当前节点,不管里面的子节点和内容,参数改为true的时候就是深拷贝



#### 三种创建元素的方式

​    document.write() 会重写页面,禁用

​    element.innerHTML

​    单个重新渲染就会比较慢,如果先把字符串拼接好,然后再通过一次渲染还是比较快的

​    document.createElement()

​    这种直接创建元素的方式效率会比较高

​    

#### 添加绑定事件

​    addEventListenter("event", handel, false);

​    第三个参数确定事件传递模式,true为捕获,false为冒泡

​    attachEvent("on" + type, function(){

​        handle.call(ele);//这里的this指向window

​    })

#### 三种事件的移除

​    button.onclick = null;

​    button.removeEventListener("click",handel);

​    button.detachEvent("on" + click, handel);



#### 事件执行顺序

事件有捕获和冒泡,IE是没有事件捕获的

事件捕获和事件冒泡是结构上的,而不是视觉上的

只能执行捕获或者冒泡的其中一种

如果元素有绑定监听事件,那通过事件冒泡或者事件捕获就可以获得这个消息

如果不同的元素各有捕获和冒泡,那就先捕获然后再冒泡

+ 有些事件是没有冒泡的 例如 oblur onfocus onmouseenter onmouseleavue



​    

#### 事件对象

​    事件对象只有有李事件才会存在,它是系统自动创建的,不需要我们传参

​    事件对象是一系列数据的集合,里面包含事件的相关信息

​    window.event   ie6,7,8

​    event.target是触发事件的对象 而this.target返回的绑定事件的对象

​    event.srcelement 非标准 ie6,7,8

+ currentTarget 也是指向绑定事件的对象,ie6,7,8不支持



#### 阻止默认行为

​    e.preventDefault();(addEventListener)

​    e.returnValue;(ie6,7,8)

​    return false;(onclik)



#### 获取光标距离可视区的距离

​    e.clientX

​    e.clientY

​    

#### 获取光标距离文档的距离

​    e.pageX

​    e.pageY



#### 事件

​	mousemove事件

​    当光标移动1px就会触发



​    键盘的三个事件 

​    keyup keydown keypress 

​    其中keypress不识别功能键,比如shift 左箭头和右箭头



​    keyCode是返回键的ASCII码值

​    keyup 和 keydown 不区分字母的大小写,keypress事件区分字母大小写



#### 	**window对象**

​    document location navigation screen history

​    window对象是浏览器的顶级对象,它具有双重角色

​    1.是全局顶级对象

​    2.是JS访问浏览器窗口的一个接口

​    window下的一个特殊属性window.name



​    区别window.onload和window.onDOMContentLoaded

​    通常不要使用window.onload,但凡有一个没有加载成功都不会执行window.onload



​    DOMContentLoaded在DOM结构渲染完成以后就会触发这个事件,相对比较快也比较合理



​    window.onbeforeunload

​    在页面重载或者卸载前会触发这个事件



​    window.onresize

​    在窗口大小发生变化的时候就会触发这个事件



​    setTimeout() setInterval()



#### **JS 单线程 同步任务 异步任务**

​    **JS回调函数是属于异步任务**



​    1.先执行执行棧中的同步任务

​    2.异步任务放到任务队列中

​    3.一旦执行棧中的所有同步任务执行完毕,系统就会按次序读取任务队列中的异步任务,于是被读取的异步任务结束等待状态,进入执行棧,开始执行



​    事件循环 event loop

​    主线程不断的重复获得任务、执行任务、再获得任务、再执行这种机制被称为事件循环



#### BOM

**location对象**

​    location是window的一个属性 叫统一资源定位符(Uniform Resource Locator, URL)

​    组成 protocol host port path query fragment 



**属性**

​    location.href 可以实现跳转

​    host port pathname 

​    location.search 可以获取url栏的参数

​    hash



**方法**

​    location.assign 跟href一样,可以跳转页面,记录浏览历史,可以后退

​    location.replace 不记录浏览历史,不可以后退页面

​    location.reload 重新刷新页面带一个布尔参数



​    navigator**对象**

​    navigator.userAgent.match(){}

​    history.forword()

​    history.back()参数可以选择跳转步数,可以选负数



**获取光标距离可视区的距离**

​    `e.clientX`

​    `e.clientY`

​    

获取光标距离文档的距离

​    `e.pageX`

​    `e.pageY`



mousemove事件

当光标移动1px就会触发



**键盘的三个事件** 

`keyup keydown keypress `

其中`keypress`不识别功能键,比如shift 左箭头和右箭头



**keyCode是返回键的ASCII码值**

`keyup` 和 `keydown` 不区分字母的大小写,`keypress`事件区分字母大小写

​	

**offset偏移量(不带单位)**

`offsetTop`

`offsetLeft`

动态获取

⚠️相对有定位的父级的距离,元素偏移量只有这两个值

⚠️是通过：offsetTop的使用方式是`element.offsetTop`，而不是`element.style.offsetTop`

​    

element.offsetParent 返回有定位的父级    

element.parentNode 返回最近一级的父级

`element.offsetWidth` 获取元素可视宽度

`element.offsetHeight` 获取元素可视高



#### client

```
//以下属性也不可写,只有style可写
clientTop	获取上边框
clientLeft	获取左边框

clientWidth	获取content+padding宽度
clientHeight	获取content+padding高度
```



#### 立即执行函数

```
(function(){})()
(function(){}())

//多个立即执行函数要用分号隔开
//创建块级作用域
//同样可以传参数,
```



#### pageShow事件

在火狐里面有页面缓存特性,所以有时候不能用load事件,返回到之前页面的时候不会触发load事件

而`pageShow`事件是都会触发的



### scroll

`window.scroll(x,y)`

```
元素内容被卷去的部分:
scrollTop	被卷去的头部高度,不带单位 比较重要
//可以通过监控这个值修改侧边栏的定位模式,以到达侧边栏的滚动和固定定位的变更,类似淘宝侧边栏效果
scrollLeft	被卷去的左侧宽度,不带单位
!!!这两个是可读可写的

!!!注意：scrollTop的使用方式是element.scrollTop，而不是element.style.scrollTop

scrollWidth	返回实际宽度,不包含边框,不带单位
scrollHeight	放回实际高度,不包含边框,不带单位

页面被卷进的头部可以用
window.pageYOffset  == document.documentElement.scrollTop(H5模式) == document.body.scrollTop(混杂模式)
window.pageXOffset	== document.documentElement.scrollLeft(H5模式) == document.body.scrollLeft(混杂模式)
!!!pageYOffset pageXOffset 是不可以写,只可读,但是scrollTop和scrollLeft是可读可写的
```



#### mouseover 和 mouseenter

`mouseover`经过子元素的时候也会触发,因为`mouseover`会冒泡

`mouseouter`从子元素出来的时候也会触发,`mouseouter`会冒泡



`mouseenter`经过子元素不会触发,因为`mouseenter`不会冒泡

`mouseleave`出子元素不会触发,因为`mouseleave`不会冒泡



#### 利用计时器形成动画

+ 利用将定时器绑定到对象的属性上面,以实现不同的定时器
+ 当设置步长的时候就要考虑小数可能到不了边界,要考虑左右向下或者向上取整以超越边界清除定时器

**步长算法**

```
step = (targetPosition - positionNow) / 10;	//份数可以自己调整
```





# 移动端



#### 触屏事件

`touchstart`	手指触摸DOM元素事件

`touchmove`	手指移动DOM元素事件

`touchend`	手指结束DOM元素事件



#### 触屏事件所带的属性对象

```
touches //正在触摸屏幕的所有手指的列表
targetTouches	//正在触摸当前DOM元素的手指列表
//若果侦听的是一个DOM元素,他们两个是一样的
changedTouches //手指状态发生了改变的列表 从无到有 或者从有到无
```



#### classList属性

*是元素包含所有的类名的类数组*

H5新属性,IE10以上,但是在移动端可以不考虑兼容了

方法

```
classList.add()  //	在后面追加类名,不会覆盖原有的类名,不需要加.
classList.remove()	//	删除类名,不需要加点.
element.calssList.toggle()	//	切换类
element.calssList.replace(foo, bar)	//	用bar类替换foo类
```



#### 点击300ms延时解决方案

+ 利用`user-scalable = no`

+ 封装tap,点击没有移动,并且touchstart到touchend时间差小于150ms,就判定为一次点击



#### 常用插件

+ fastclick
+ swiper
+ superslider
+ zy-media



#### 本地储存

`sessionStorage`	约5M

1. 生命周期为关闭浏览器窗口
2. 在同一页面下数据可以共享
3. 以键值对形式储存

+ 方法

```js
// Save data to sessionStorage
sessionStorage.setItem('key', 'value');

// Get saved data from sessionStorage
let data = sessionStorage.getItem('key');

// Remove saved data from sessionStorage
sessionStorage.removeItem('key');

// Remove all saved data from sessionStorage
sessionStorage.clear();
```

`localStorage`	约20M

1. 生命周期永久生效,除非手动删除,否则关闭页面也会存在
2. 同一浏览器可以多页面共享
3. 以键值对形式储存使用
   + 方法同上



# jQuery

`插件库` **write less do more**

#### 入口函数

```

$(document).ready(function(){})

$(function(){})
```



```
//如果命名冲突,可以像这样先调用noConflict(),然后入口用jQuery,在入口函数传入$
$.noConflict();
jQuery(function($){
    $("button").click(function(){
        $("div").slideToggle("fast");
    })
})
```



#### DOM对象和jQuery对象

+ 用jquery获取的就是jquery对象
+ jQuery对象只能用jQuery的方法,原生的DOM对象只能使用原生的属性和方法



jQuery对象转化为DOM对象

```
//两种方法
$('video').[0].play()
$('video').get(0).play()

//如下
$.noConflict();
jQuery(function ($) {
    $("button").click(function () {
        // $("div").slideToggle("fast");
        $("div")[0].style.width = "400px";
        $("div").get(0).style.height = "400px";
    })
})
```



#### 隐式迭代

给*类数组jQuery对象*设置样式,内部会进行隐式迭代,不用在单独遍历或循环



#### 排他思想

核心是利用`siblings()`是指不包括自己的兄弟元素这个方法



#### 链式编程

```
$(this).css("color", "red").siblings("color", "");
可以连续调用,基于返回this类似模式

let index = $(this).index();
//获取当前元素的索引
```



**jQuery里面的类操作是追加或者选择删除,不影响原来的类**

```
show(speed, easing, callback)
里面包含三个参数
```



#### hover()方法

+ 可以写一个回调,hover进出同时触发

+ 也可以写两个回调,进出分开触发(没有toggle()的时候)

+ ```
   $(function(){
              $("div").hover(function(){
                  $(this).css("background-color", "#f00");
              },function(){
                  $(this).css("background-color", "cyan");
              })
          })
  ```



#### stop()

+ 结束上一次动画,执行本次动画,用来解决动画队列的问题,相当于防抖
+ 写在动画之前,谁做动画就写在谁前面

#### fadeTo(speed, opacity)

+ 可以利用这个方法做出高亮显示,动画一般都会有执行队列加入过多的问题,记得防抖

#### animate({}, easing, callback)

+ 动画函数,包含三个参数



#### 元素的操作

**属性操作**

- 元素的固定属性通过prop()
- 元素的自定义属性通过attr()
- data()数据缓存基于json,基于h5 dataset字符集



**内容操作**

- html()	可以配合模版字符串,产生奇效哈哈哈哈
- text()
- val()表单内容



**遍历**

- each(function(index, domEle){}) 这里 迭代器domEle是一个DOM对象
- jquery里面还自带一个$each(arr, function(index, ele))



**文档操作**

**增**

```
$("<p></p>")
```

子级操作:	append prepend 

同级操作:	after befor

**删**

- remove() 删除选中
- empty() 清空内部元素
- html("")

empty() 清空内部元素

html("")



**尺寸**

- width()/height()获取或设置修改尺寸 只算widht和height
- innerWidth() innerHeight() 包括padding
- outerWidth() outerHeight() 包括border 

+ + outerWidth(true)包括margin



**位置**

- offset 获取或者设置匹配元素在文档的相对偏移。返回的对象包含两个整型属性：top 和 left，以像素计。此方法只对可见元素有效。
- position 获取相对有定位父级的偏移,返回对象包含两个整型,不可设置,只能获取
- scrollTop scrollLeft 文档被卷去的宽度或者高度



**只有元素才能设置动画,像document是不能设置动画的,使用效果之前,记得用stop()方法防抖**

**!!!熟悉使用节流阀**



#### jQuery事件

**事件注册**

```
element.handle(function(){})
```

**事件处理**

一个或者多个事件绑定 `on`

**语法**

$(*selector*).on(*event,childSelector,data,function*)

| 参数            | 描述                                                         |
| :-------------- | :----------------------------------------------------------- |
| *event*         | 必需。规定要从被选元素添加的一个或多个事件或命名空间。  由空格分隔多个事件值，也可以是数组。必须是有效的事件。 |
| *childSelector* | 可选。规定只能添加到指定的子元素上的事件处理程序（且不是选择器本身，比如已废弃的 delegate() 方法）。 |
| *data*          | 可选。规定传递到函数的额外数据。                             |
| *function*      | 可选。规定当事件发生时运行的函数。                           |

+ **可以利用on这种方法实现事件委托**(老的方法已经删除了)
+ **可以给动态创建的元素绑定事件,而当个绑定的方式静态的(因为是基于事件委托,所以就算是后添加元素触发了事件,事件也会冒泡被绑定处理函数的元素捕获**

*可以理解为执行程序绑定在子元素身上,事件被父级捕获就会触发,然后就执行对应子程序上面的执行函数*



**解绑事件**

```
off()	//解绑所有事件
off("click")	//接触指定时间
one()	//用此方法绑定事件,事件只会触发一次
```

**自动触发事件**

```
element.click();
element.triggle();
element.triggelHandler();	//	用这种方式会阻止元素的默认行为
```



**事件对象**



**对象拷贝**

```
$extend(boolean, targetObj, obj);
//	第一个参数为true的时候是深拷贝,否则是浅拷贝,参数可选
```

**插件**

+ 瀑布流插件 --> jQuery之家
+ 懒加载插件



# 数据可视化

#### 常见的一些数据可视化库

**D3.js**	热度高些,难度大些

**ECharts.js **	百度

**Hightcharts.js**

**Antv** 蚂蚁金服



#### 边框图片

*模型大小不一,但是边框样式相同,此时就需要边框图片来完成*

`border-image`属性,这个属性是依赖border的,如果不写border是不会显示的

采用九宫格切图法,顺序: 上-右-下-左;切除四个完整的角

```
border-image-source	路径
border-image-slice	图片边框的内偏移(剪裁的尺寸,不加单位,按上右下左顺序不能错)
border-image-width	图片边框的宽度(需要加单位)不是边框的宽度是边框图片的宽度)
border-image-repeat	图像边框是否应平铺(repeat)、铺满(round)或拉伸(stretch)默认拉伸
```

+ 我们在设置内容的时候会距离border有我们切图的距离,这时候可以通过设置内部新模型,然后设置position: absolute;然后设置四个方向为负值进行拉伸,然后根据需要调整padding就行了



#### 通过类名引用字体图标

1. 引入style.css文件
2. 引入fonts文件夹,修改路径





































### (自己记的)函数的意义：**高内聚，低耦合，复用与多态**



#### setInterval定时器判断写法

```
				let timer = null;
        let index = 0;

        if(timer == null) {
            timer = setInterval(() => {
            console.log(index + 1);
            index = (index + 1) % 5;
        }, 1000);
        }

        function stop(){//写个回调函数以清除定时器
            clearInterval(timer);
        }
```



#### 箭头函数

箭头函数的特点之一就是不绑定新的this，所以箭头函数的this是在词法层面就绑定到了外层作用域，他的this只能是来自外层作用域的this，无论你通过什么方式都不能改变，除非你修改了外层作用域的this。





#### 错误处理

```
try{
        console.log("执行了try里面的代码");
        return "返回的是1";
    }catch (error){
        console.log("执行了catch里面的代码");
        return "返回的是2";
    }finally{
        console.log("无论是否报错finally里的代码都执行，finally就是这么屌！");
        return "返回的是3";
    }
};
```

这里是return的是"返回的是3"

**原理分析如下**

因为函数还有一条规则是函数只能有一个返回值，当执行try的时候，遇到return，确实退出本次执行了，此时的返回值也是try内的返回值，但是因为finally的机制，必须还要再执行一次，finally里面的代码，此时return被改写成了finally里的返回值；【因为函数只能有一个返回值】；所以此时返回的是3！（catch的时候思路一样）

**但是改成下面这样就返回第一个了**

```
try{
        console.log("执行了try里面的代码");
        return "返回的是1";
    }catch (error){
        console.log("执行了catch里面的代码");
        return "返回的是2";
    }finally{
        console.log("无论是否报错finally里的代码都执行，finally就是这么屌！");
    }
};
var a=testError();
console.log(a);
//返回结果是：
// 执行了try里面的代码；
// 无论是否报错finally里的代码都执行，finally就是这么屌！
// 返回1；【！注意此时finally里面没有返回值，所以函数的返回值又是1了；】
```



- if("getElementsByClassName" in document){}

直接用in来判断是不是document的一个属性,是的话返回true，不是的话返回false；判断属性，直接返回布尔值，**用in来判断属性的性能最好**！

- if(typeof document.getElementsByClassName==="function"){}

**认为只有这样才是兼容的**



#### 抛出错误

最常用的是：Error通用类型、范围错误RangeError，变量引用错误ReferenceError、变量类型错误TypeError；

> ```
>  throw  new Error("抛出通用错误");//Uncaught Error: 抛出通用错误
> ```

```
throw  new Error(抛出通用错误);//Uncaught ReferenceError,抛出通用错误 is not defined;
throw new SyntaxError("SyntaxError语法错误");
throw new RangeError("RangeError范围错误");
throw new ReferenceError("ReferenceError变量引用错误");
throw new TypeError("TypeError变量类型错误");
```



#### 运算符

应用对象的时候，运算符通常会调用对象上的valueOf或者toString方法，转成字符串后再次进行操作；

**逗号操作符**

+ 在一行语句中执行多个不同的操作 ,一般用于声明多个变量;

- 忽略第一个操作符，返回第二个操作符；

  ```
    var a=,
    	b=4,
    	c=5;
  
    var test=1,2,3,4,5,6,7;//结果test的值是7；
  ```



#### 计算程序的耗时

Data.now() 方法，返回表示调用这个方法时的日期和时间的毫秒数。这个方法简化了使用 Data 对象分析代码的工作;

```
//取得开始时间
var start = Date.now();
//调用函数
for(var i=0;i<10000000;i++){

}
//取得停止时间
var end = Date.now();
console.log(end-start);
```

支持 Data.now() 方法的浏览器包括 IE9+、Firefox 3+、Safari 3+、Opera 10.5 和 Chrome。在不支持它的浏览器中，使用+操作符把 Data 对象转换成字符串，也可以达到同样的目的。

```
//取得开始时间
var start = +Date.now();
//调用函数
for(var i=0;i<10000000;i++){

}
//取得停止时间
var end = +Date.now();
console.log(end-start);
```



#### 日期比较

原理：比较的是转成毫秒数后，然后再比较毫秒数；日期越靠后，毫秒数越大； Date 类上有一个 valueOf() 方法，返回日期的毫秒表示（距离1970年午夜的毫秒差）



#### 推荐的日期格式化方法->toUTCString

```
var testDate1=new  Date("8/13/2016");
console.log(testDate1.toUTCString());//1471017600000
```

有一个名叫 toGMTString() 的方法，这是一个与toUTCString() 等价的方法，其存在目的在于确保向后兼容。不过，ECMAScript 推荐现在编写的代码一律使用 toUTCString() 方法。



#### 字符串方法

 *indexOf(searchValue，fromindex)*

- 功能：返回某个指定的字符串值在字符串中首次出现的位置。
- 参数：searchValue是必需的，规定需检索的字符串值；fromindex是可选的整数参数。规定在字符串中开始检索的位置。它的合法取值是 0 到 stringObject.length - 1。如省略该参数，则将从字符串的首字符开始检索。
- 注释：indexOf() 方法对大小写敏感！如果要检索的字符串值没有出现，则该方法返回 -1。



*split(separator,howmany)*

- 功能：把字符串分割为字符串数组。
- 参数：separator必需。字符串或正则表达式，从该参数指定的地方分割 stringObject。howmany，可选。该参数可指定返回的数组的最大长度。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。
- 返回值：一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。返回的数组中的字串不包括 separator 自身。但是，如果 separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的文本）。
- 注释：如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。String.split() 执行的操作与 Array.join 执行的操作是相反的。



#### 全局对象的方法

**全局可以直接使用**

- isNaN()
- isFinite()
- parseInt() 与 parseFloat()
- encodeURI() 和 encodeURIComponent()
- decodeURI() 和 decodeURIComponent()
- eval()



#### encodeURI() 和 encodeURIComponent()

```
var uri1 = "http://www.wrox.com/illegal value.htm#start";
var uri2 = "https://www.google.com.hk/webhp?tab=Tw";

console.log(encodeURI(uri1));//http://www.wrox.com/illegal%20value.htm#start
console.log(encodeURI(uri2));//https://www.google.com.hk/webhp?tab=Tw
console.log(encodeURIComponent(uri1));//http%3A%2F%2Fwww.wrox.com%2Fillegal%20value.htm%23start
console.log(encodeURIComponent(uri2));//https%3A%2F%2Fwww.google.com.hk%2Fwebhp%3Ftab%3DTw
```

**encodeURI() 不会对本身属于 URI 的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而 encodeURIComponent() 则会对它发现的任何非标准字符进行编码。**

使用 encodeURI() 编码后的结果是除了空格之外的其他字符都原封不动，只有空格被替换成了%20 。而 encodeURIComponent() 方法则会使用对应的编码替换所有非字母数字字符。这也正是可以对整个 URI使用 encodeURI() ，而只能对附加在现有 URI后面的字符串使用 encodeURIComponent()的原因所在。

Global 对象的 encodeURI() 和 encodeURIComponent() 方法可以对 URI（Uniform ResourceIdentifiers，通用资源标识符）进行编码，以便发送给浏览器。有效的 URI 中不能包含某些字符，例如空格。而这两个 URI 编码方法就可以对 URI 进行编码，它们用特殊的 UTF-8 编码替换所有无效的字符，从而让浏览器能够接受和理解。

> 使用 encodeURIComponent() 方法的时候要比使用encodeURI()更多，因为在实践中更常见的是对查询字符串参数而不是对基础URI进行编码。





#### 构造函数Function

```
//构造函数的定义方法
var test3 = new Function("arg1","arg2","console.log('构造函数的定义方法:',arg1+arg2)");//不推荐

```

使用 Function 构造函数。 Function 构造函数可以接收任意数量的参数，但最后一个参数始终都被看成是函数体，而前面的参数则枚举出了新函数的参数。



#### 预编译

函数声明是赋值的过程,变量声明提升,函数表达式是在执行的时候赋值的



#### 函数内部属性

arguments.caller 这个属性中保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值为 null

##### arguments.caller

这个属性中保存着调用当前函数的函数的引用，如果是在*全局作用域中调用当前函数，它的值为 null* 。

```
      function outer(){
        inner();
      }
      function inner(){
        console.log(inner.caller);//function outer(){inner()}
      }
      outer();
```



#### bind()

ECMAScript 5 还定义了一个方法： bind() 。这个方法会创建一个函数的实例，其 this 值会被绑定到传给 bind() 函数的值。

```
window.color = "red";
var o = { color: "blue" };
function sayColor(){
    console.log(this.color);
}
var objectSayColor = sayColor.bind(o);//这里返回一个this指向o的sayColor的函数引用
objectSayColor(); //blue
```

在这里， sayColor() 调用 bind() 并传入对象 o ，创建了 o bjectSayColor() 函数。 object-SayColor() 函数的 this 值等于 o ，因此即使是在全局作用域中调用这个函数，也会看到 "blue" 。这种技巧的优点后面总结。



#### GetcomputedStyle(ele, pseudoele)

**第一个参数是元素**,**第二个参数是元素的伪元素字符串**

**getComputedStyle的兼容性写法**：

```
 function getCss(element,value){
    if(window.getComputedStyle){
        return getComputedStyle(element,null)[value];
    }else{
        return element.currentStyle[value];//低版本IE兼容
    }
}
```





#### JS中的盒子模型关与尺寸的DOM属性**

```
clientWidth;//获取元素的可见宽度。width+左右padding；
clientHeight;//获取元素的可见高度。width+上下padding；
clientLeft;//获取元素的左边框宽度
clientTop;//获取元素的上边框高度；

offsetWidth;//获取元素width+左右padding+左右border+（可见的）垂直滚动条的宽度；
offsetHeight;//获取元素的width+上下padding+上下border+（可见的）水平滚动条的高度；
offsetLeft;//获取元素距离父级参照物的左偏移量；
offsetTop;//获取元素距离父级参照物的上偏移量；
offsetParent;//获取元素的父级参照物/上级参照物（和parentNode区分开）

window.onscroll;//随时的计算当前页面距离body顶部的偏移量(左上角)；
scrollWidth;//获取元素实际内容的宽，在没有内容溢出的情况下和clientWidth一样，有内容的溢出，则是width+左padding；
scrollHeight;//获取元素实际内容的宽，在没有内容溢出的情况下和clientWidth一样，有内容的溢出，则是width+左padding；
scrollLeft;//横向滚动条卷去的高度，这是一个可读写的属性；设置scrollLeft=0；就回到了页面横向第一屏最上边；
scrollTop;//纵向滚动条卷去的高度，这是一个可读写的属性；设置scrollTop=0；就回到了页面纵向第一屏最上边；
```

JS中没有直接获取margin值的属性；







# 移动web流式布局



**移动端浏览器都是基于webkit所以兼容性只要考虑webkit就可以了**



#### viewport标准写法

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200613230448225.png" alt="image-20200613230448225" style="zoom:50%;" />

在调试器中显示的是pixles的屏幕宽高,而不是分辨率,分辨率和我们开发中的px存在一定比例

#### 背景缩放

如果只设置了一个值,*那就是基于等比例拉伸*

```
background-size:contain;/*宽边触边*/
background-size:cover;/*窄边触边*/
```



#### 移动端开发选择

单独制作

响应式开发







#### 移动端属性兼容

移动端发展的晚,对H5,C3都有很好过的支持,而且大部分移动端浏览器都是基于webkit内核,私有化属性只写webkit就行了



#### 移动端技术选型

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200615144637137.png" alt="image-20200615144637137" style="zoom:50%;" />



### flex布局原理



**设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效**



**父级属性:**

**通过给父盒子添加flex属性,来控制子元素的位置和排序方式**



**Justify-content 设置主轴上的子元素排列方式**



**felx-wrap 设置在父级上,设置子元素是否换行**



**align-items 设置侧轴参照位置**(默认的情况下就是拉伸)

**有高度的情况下,设置侧轴拉伸不会生效**



**align-content 设置多行侧轴布局,单行情况无效**



**flex-flow 复合属性相当于同时设置flex-direction 和 flex-wrap**





**子级属性:**

**flex属性是指元素分配空白空间的占比,优先于自身宽高执行**

**align-self用来单独设置自身在侧轴的对齐**

**oder用来排序,默认是0** 可以设置正负值,小值靠前



#### 典型居中布局,利用flex布局处理

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200616204046242.png" alt="image-20200616204046242" style="zoom:50%;" />

```
.style {
    display: flex;
    flex-direction: column;//改变主轴,然后主 侧轴都居中
    justify-content: center;
    align-items: center;
}
```



**Background: -webkit-linergrident();这个背景线性渐变要使用私有化**





### 响应式布局之Bootstrap



#### **Bootstrap 起步:**

创建文件夹结构   创建html结构  引入相关样式文件  书写内容



**固定将父级划分为12份,内部也是将子元素实现浮动**

使用.container类 内部已经预定义类媒体查询



**.container类** 的响应式布局已经预定义好了

​            1200 --> 1170  --> lg 超大屏

​            9929 --> 70  --> md 中屏幕

​            768 --> 750  --> sm  小屏幕

​            超小屏幕 100%  --> xs  超小屏幕



**.container-fluid** 单独开发的流式布局的类 适用与移动端宽度设置为100%



#### **Bootstrap  栅格系统**

在父级使用row类刚好用margin: 0 -15px;抵消了内部的padding 15px,有列就有行



**Bootstrap组件的字体图标放在::before里面**









浏览器检测

Document.implementation.hasFeature(p1, p2)



DOMContentLoaded事件是在形成完整的DOM树之后触发的,不理会图像、JavaScript文件、CSS文件或其他资源是否已经下载完毕



# 算法



#### 数据范围循环

```
const index = 0;
const num = 5;
index = (index + 1) % num;(0 ~ num - 1)
```





# Git

#### 控制系统分类

**本地控制系统**

使用软件记录不同版本,单机运行,不支持多人协作开发,出故障,所有历史更新记录会丢失

**集中化版本控制系统**

基于服务器客户端的运行模式,服务器记录更新记录,客户端只保留罪行的文件版本

不支持提交离线版本更新,服务器崩溃,所有人无法正常工作,数据故障历史记录会丢失

 **分布式的版本控制系统**

联网运行

断网后支持离线本地提交版本更新

服务器故障,可使用任何一个客户端的备份进行恢复



### Git

直接记录快照,而非差异比较

近乎所有操作都是本地执行



缺点:占用磁盘空间较大

优点:版本切换时非常快,每个版本都是完整的文件快照,版本切换时直接恢复目标版本的快照即可.

**空间换时间**



**git下载**:https://git-scm.com/downloads



**配置用户名和邮箱**:使用全局配置的情况下只需要配置一次就可以了

```
git config --global user.name "tangzheng"

git config --global user.email "hytangzheng@126.com"
```



**常用命令:**

```
git config --list --global 查看所有的全局配置

git config user.name 查看指定的配置

git help config 命令帮助手册

git config -h 命令的快速参考
```



**创建Git仓库的两种方式** 

```
Git init //初始化当前文件夹为本地Git仓库
```

1.将尚未进行版本控制的本地目录转换为Git仓库

​	**在项目目录中右键打开 Git Bash(unix环境中就是打开终端)**

​	**执行*git init*命令创建项目仓库,会创建一个.git隐藏目录**

2.从其他服务器克隆一个已存在的Git仓库



**检查文件状态**

Git标准的工作流程是 工作区 --> 暂存区 --> Git仓库,有时候可以简化为工作区 --> Git仓库

```
git status
```

git status 查看文件状态包

未被跟踪的文件意味着Git在之前的快照中没有这些文件:Git不会自动将之纳入跟踪范围

**可以使用精简的方式显示文件状态**

```
git status -s
```



***git add*** 

```
git add index.html
```

+ 使用git add 命令添加跟踪文件

+ 把已跟踪的、且已修改的文件放到缓存区

+ 把有冲突的文件标记为已解决的状态



```
eg: git add index.html
```



<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622193925054.png" alt="image-20200622193925054" style="zoom:50%;" />



**提交已暂存的文件 git commit -m **"**提交的消息**"

```
git commit -m "提交的消息"
```

提交消息命令,即可将缓存区中记录的index.html的快照,提交到Git仓库中进行保存

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622195440782.png" alt="image-20200622195440782" style="zoom:50%;" />



**撤销对文件的修改**

所有的修改都会丢失,且无法恢复,谨慎操作!!

```
git check out -- index.html
```

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622195544731.png" alt="image-20200622195544731" style="zoom:50%;" />

**向暂存区中一次性添加多个文件**

```
git add.
```

在项目开发中经常使用



**取消暂存的文件**

```
git reset HEAD 要移除的文件名称 | .(移除所有)
```



**跳过使用暂存区**

```
git commit -a -m "描述消息"
```



**移除文件**

+ 从Git仓库和工作区中同时移除对应的文件

  ```
  git rm -f index.js
  ```

+ 只从Git仓库中移除index.css 但保留工作区中的index.css文件

  ```
  git rm --cached index.css
  ```

**忽略文件**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622202143961.png" alt="image-20200622202143961" style="zoom:50%;" />

**glob模式**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622202200613.png" alt="image-20200622202200613" style="zoom:50%;" />

**.gitignore**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622202509964.png" alt="image-20200622202509964" style="zoom:50%;" />

**查看提交历史**

```
git log //还有很多其他配置查看格式
```



**回退到固定的版本**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622204954351.png" alt="image-20200622204954351" style="zoom:50%;" />





# Github

**开源**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622211214049.png" alt="image-20200622211214049" style="zoom:50%;" />

5**种开源协议**

**![image-20200622211628892](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622211628892.png)**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622211639683.png" alt="image-20200622211639683" style="zoom:50%;" />

**GPL是强制开源,MIT唯一限制条件就是在修改后的代码或者发行包中,必须包含原作者的许可信息**





**远程仓库的访问方式**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622220219320.png" alt="image-20200622220219320" style="zoom:50%;" />

**查看仓库的HTTPS 和 SSH**

+ 新建的仓库可以直接看到

+ 上传过文件的仓库可以在如下位置查看

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200622221504096.png" alt="image-20200622221504096" style="zoom:50%;" />



#### 基于HTTPS将本地仓库上传到Github中

**将本地的Git仓库添加到远程仓库中:**

在新建的项目那里有完整的提示,分为本地有Git仓库和本地无Git仓库



**在推送文件到提交状态后,并不会自动上传到Github,需要执行以下命令:**

```
git push
```



#### master主分支

不能在master主分支上进行开发,只能在功能分支上面进行开发,在分支开发完成后,合并到主分支,功能分支就被销毁



#### 分支命令

login为所需操作的文件

```
git branch
git branch login //创建了login功能分支,但是不会切换分支
git checkout login //切换到login功能分支上
git checkout -login //创建并切换到login功能分支上
合并分支
先切换到主分支 git checkout "master"
然后在合并分支 git merge "login"

删除分支
不能直接删除当前所在分支,必须切换到其他分支才可删除分支
git branch -d login
git branch -D login//强制删除本地分支

遇到冲突需要合并的时候手动解决冲突
```



**将本地分支推送到远程仓库**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200623102725730.png" alt="image-20200623102725730" style="zoom:50%;" />

**查看远程仓库中所有的分支列表**

```
git remote show "远程仓库名称"
```



**拉取远程分支的最新的代码**

```
get pull //从远程仓库,拉取当前分支最新的代码,保持当前分支的代码和远程分支代码一致
```



**删除远程分支**

可以使用如下命令 //区别删除本地分支

```
git push 远程仓库名称 --delete 远程分支名称

eg:
git push origin --delete pay
```



#### 总结

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200623111505864.png" alt="image-20200623111505864" style="zoom:50%;" />

# Ajax

## XMLHttpRequest对象

[`XMLHttpRequest.open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/open)

初始化一个请求。该方法只能在 JavaScript 代码中使用，若要在 native code 中初始化请求，请使用 [`openRequest()`](https://developer.mozilla.org/zh-CN/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIXMLHttpRequest)。

[`XMLHttpRequest.send()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/send)

发送请求。如果请求是异步的（默认），那么该方法将在请求发送后立即返回。

[`XMLHttpRequest.setRequestHeader()`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/setRequestHeader)

设置 HTTP 请求头的值。必须在 `open()` 之后、`send()` 之前调用 `setRequestHeader()` 方法。

**常见请求头格式：**

json：xhr.setRequestHeader("Content-type","application/json; charset=utf-8");//内容类型

form：xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");

文本：xhr.setRequestHeader("Content-type", "text/plain; charset=utf-8");



### http状态码:

4请求成功

200成功

400请求路径不存在

404请求错误,路径错误



form表单的action属性是跳转url

Method指提交的方式





# 安装babel

打开终端，输入命令：cnpm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/node @babel/polyfill
如果你需要在一个Node项目中使用Babel，你可以使用babel-core
如果你想要在命令行使用Babel，你可以安装babel-cli
babel-node命令可以直接运行ES6脚本
@babel/preset-env
转化最新语法如箭头函数, class, 扩展运算符，想要转换最新的api还需引入babel-polyfill（eg: includes）
@babel/polyfill
一些新的api：Iterator、Generator、Set、Map、Proxy、Reflect、Symbol、Promise等全局对象

2.创建babel.config.js

在项目目录中创建babel.config.js文件。
编辑js文件中的代码如下：
    const presets = [
        ["@babel/env",{
            targets:{
                edge:"17",
                firefox:"60",
                chrome:"67",
                safari:"11.1"
            }
        }]
    ]
    //暴露
    module.exports = { presets }

3.创建index.js文件

在项目目录中创建index.js文件作为入口文件
在index.js中输入需要执行的js代码，例如：
console.log("ok");

4.使用npx执行文件

打开终端，输入命令：npx babel-node ./index.js
1
5.设置默认导入/导出
A.默认导出

export default {
    成员A,
    成员B,
    .......
},如下：
let num = 100;
export default{
    num
}

B.默认导入

import 接收名称 from "模块标识符"，如下：
import test from "./test.js"





# 流式总结



控制台字符串显示为黑色**

**数字显示为蓝色**

**布尔型显示为深蓝色**



#### 数组也可以与空穿进行相加

```
console.log([1,2,3,4]+"");//1,2,3,4

```

#### undefined 和 null没有toString方法,使用string()

#### 浮点运算存在误差

**浮点数之间的运算也是非常不准确的，需要转成整数，然后再运算，运算后再转回对应的小数**

```
//浮点数直接运算，结果不一定是正确的; var test1=0.1+0.2; console.log(test1);//0.30000000000000004 var test2=(0.110+0.210)/10; console.log(test2);//0.3
```



#### 0没有正负0 === -0

```
console.log(0===(-0));//true
```



#### undefined和null

undefined派生自null；因为undefined派生子null；所以Null和undefined做比较的时候是true；但是null和undefined和别的人和类型比较都不想等；

- undefined派生子null，因此在使用”==”进行比较的时候会返回true；
- 没有必要将变量显示声明undefined；
- 声明非空对象对应将其赋值为null；比如做定时器的时候用timer=null来重置变量；



Null是第二个只有一个值的数据类型，这个特殊的值是null，从逻辑上来看，null值表示一个空对象指针，而这也正是typeof操作符检测null时候，返回"object"的原因； 只要意在保存对象的变量还没有真正保存对象，就应该明确的让变量赋值为null值；这不仅可以体现null作为空对象指针的惯例，而且也有助于进一步却分null和undefined；



#### 注意parseInt和parseFloat是比较松散的

```
  console.log(Number([1,2,3]))
  console.log(parseInt([3,2,3]))
  console.log(parseFloat([1,2,3]))
```





encodeURI和ecnodeURIComponent的区别

encodeURI和encodeURIComponent都是对url的编码。

它们都是编码URL，唯一区别就是编码的字符范围了：

**encodeURI方法不会对下列字符编码  ASCII字母、数字、~!@#$&*()=:/,;?+'**

**encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'**

所以encodeURIComponent比encodeURI编码的范围更大。

**当你要编码整个URL，使用这个URL，那么用encodeURI。**

**当你要编码URL中的参数的时候，那么encodeURIComponent是最好方法。**



$ajax返回的是一个promies



异步操作 async/await 虽然是同步的写法,但是是异步操作