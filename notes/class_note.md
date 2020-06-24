# js基础

#### 编程语言

00000001(二进制) --> 汇编语言(英文缩写标识符) --> 高级语言 (js c++ c python等)

html 标记语言不发出指令,用来被读取



CPU --> 内存条 --> 硬盘(机械的比较慢,跟CPU的速度差距太大了)

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200612200943130.png" alt="image-20200612200943130" style="zoom:50%;" />



+ 脚本语言,不需要进行编印,由js引擎直接逐行来进行解释并执行
+ 现在可以基于Node.js技术进行服务器端编程



#### javascript

+ 表单验证 最开始的目的



#### 渲染引擎

解析HTML CSS,内核,例如blik和webkit

#### JS引擎

JS解释器,用来读取网页中Javascript代码,对其处理后运行, chrome  V8





### 数据类型初识



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



**控制台字符串显示为黑色**

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



### 变量申明和原理

变量命名,不允许数组开头,只允许**英文字母**和**$** 和 **_** 

```
// 变量申明和原理,括号运算符
var a = (1,2,5,667,8);//8
```

**变量类型应该是在预编译的时候确定的**



**通过promot输入的是string类型**































### 函数的意义：**高内聚，低耦合，复用与多态**



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

        function stop(){
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

# 流式总结

encodeURI和ecnodeURIComponent的区别

encodeURI和encodeURIComponent都是对url的编码。

它们都是编码URL，唯一区别就是编码的字符范围了：

**encodeURI方法不会对下列字符编码  ASCII字母、数字、~!@#$&*()=:/,;?+'**

**encodeURIComponent方法不会对下列字符编码 ASCII字母、数字、~!*()'**

所以encodeURIComponent比encodeURI编码的范围更大。

**当你要编码整个URL，使用这个URL，那么用encodeURI。**

**当你要编码URL中的参数的时候，那么encodeURIComponent是最好方法。**
