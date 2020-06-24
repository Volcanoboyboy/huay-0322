# HTML

广义的HTML5是HTML5本身 + CSS3 + Javascript

## 浏览器相关

主流浏览器及其内核

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200506170259372.png" alt="image-20200506170259372" style="zoom:67%;" />

浏览器标准![image-20200506171236137](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200506171236137.png)

## 块级元素

![image-20200509085211802](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200509085211802.png)

## 行内元素

![image-20200509085912050](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200509085912050.png)

## 行内块元素

![image-20200509090504029](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200509090504029.png)

**行内块元素之间**默认有一个**5px**的间隙，两个同时设置浮动就可以解决这个隐式的问题



# CSS

## 布局技巧总结

**.dropdown那里上下可以写在一起，一般用.dropdown_dt和.dropdown_dd命名**

**品优购是这样写的，但是淘宝京东并没有这样写**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200525100857466.png" alt="image-20200525100857466" style="zoom:50%;" />



**文字列表后面的装饰竖线可以直接键入，也可以利用伪元素，看实际情况需要**



**在floor区的导航里面一般使用选项卡布局，因为当点击的时候需要切换floor，后期利用JS实现**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200525101350784.png" alt="image-20200525101350784" style="zoom:50%;" />



**无序列表布局float侧边溢出的时候，可以将ul调大完成li的浮动，后然父级overflow:hidden;可以实现，但是尺寸会有却别**



**使用盒模型(box-sizing:border-box)的时候，可以将border先设为透明，然后需要显示的时候就可以避免抖动问题,因为border-box是定宽定高，突然产生border会更改content尺寸产生抖动**



**注册页面不要做SEO优化，不需要轻易让人找到。**

**行内块元素和文字的四种对齐方式vertical-align:，文字有底线，基线，中线，顶线（基于英文）**



**标题不会继承字体大小，<a>标签不会继承字体颜色，一般在初始化的时候就会统一更改颜色**



**css中字体大小在不同浏览器兼容性问题**

css中使用font-size设定字体大小，不同浏览器的字体height一样，但是width不同，比如在火狐和谷歌中，font-size：20px,字体的高度变为20px，但是谷歌的字体宽度比火狐长

一，解决方法如下：

1、 将浏览器的基准字号设置为 62.5%，也就是 10px，现在 1rem = 10px —— 为了计算方便。然后 在 body上应用 font-size: 2rem;，那么现在body的字体大小就是 20px。

```css
html { font-size: 62.5%; }
body { font-size: 2rem; /* =20px */ }
```

 

2、webkit浏览器渲染出来的字体具有一定的平滑效果，所以我们会看到 chrome 渲染出来的字体要大一点并且宽一点,可添加如下内容：

```css
body { 
 -webkit-font-smoothing: antialiased;
 -moz-osx-font-smoothing: grayscale; 
} 
```

启用浏览器的默认平滑字体效果css：

```css
body {
 -webkit-font-smoothing: subpixel-antialiased;
 -moz-osx-font-smoothing: auto; 
}
```

**设置Chrome下，设置小于12px字体，显示仍为12px**

```css
-webkit-text-size-adjust:none;
```











## 复合属性

### font的复合写法:

![image-20200508124325202](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200508124325202.png)

必须按顺序写，font-size 和font-family必须要写，其他的可以省略

### background的复合写法：

![image-20200509095315409](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200509095315409.png)

没有顺序，一般约定的就是这样写的

### background总结:

![image-20200509095658706](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200509095658706.png)

## 复合选择器

![image-20200508152817148](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200508152817148.png)

**a:visited 识别的是链接地址,如果地址相同,就算点击的是其中一个,其余同连接也会同样响应伪类选择器**



链接伪类选择器的顺序要求

**a:link --> a:visited --> a:hover --> a:acitve**

## 盒模型

**button默认有border，要手动去掉**

### padding

![image-20200509121339741](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200509121339741.png)

### margin

#### 1.相邻块元素，垂直外边距合并

#### 2.嵌套块元素，垂直外边距塌陷

![image-20200509130911236](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200509130911236.png)



## 浮动布局

#### 浮动

（float: left/right;内部将元素转换成inline-block，设置position: absolute;--> inline-block）

浮动使元素脱离标准文档流

所有产生了浮动流的元素，块级元素看不到他们

产生了bfc的元素和文本类属性的元素以及文本都能看到浮动元素（想一想那个文字右侧环绕个的题目）

#### 触发BFC条件

(更改这一点渲染规则刚好可以解决margin塌陷的问题)

```css
position: absolute;
display: inline-block;
float: left/right;
overflow: hidden;
```





网页布局第一准则：**多个块级元素纵向排列找标准流，多个块级元素横向排列找浮动**

任何元素都可以设置浮动，添加浮动的元素具有**行内块元素**的属性

![image-20200510222505702](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200510222505702.png)

![image-20200510222841312](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200510222841312.png)

#### 浮动布局注意：

1.一个元素浮动了，理论上其余的兄弟元素也要浮动。

2.浮动的盒子只会影响浮动盒子后面的标准流，不会影响前面的标准流。



#### 清除浮动的方法

为什么要清除浮动？

-->**父级没有高度**   -->**子盒子浮动了** -->**影响下面的布局了我们就应该清除浮动了**



1.额外标签法

2.父级添加overflow属性

3.父级添加after伪元素(块级元素才能清除浮动，伪元素默认行内元素)

``` CSS
.clearfix::after {
​    content: "";
​    display: block;
​    height: 0;
​    clear: both;
​    visibility: hidden;
}

.clearfix 
​    /* IE6、7 专有 */
​    *zoom: 1;
}
```

4.父级添加双伪元素

```CSS
.clearfix::after,.clearfix::before {
​    content: "";
​    display: table;/* 为了让before和after变成块级元素且在一行 */
}

.clearfix::after {
​    clear: both;
}
.clearfix {
​    /* IE6、7 专有 */
​    *zoom: 1;
}
```



## 定位

定位：将盒子定在某一位置，所以定位也是在摆放盒子，按照定位的方式移动盒子。

**定位 = 定位模式 + 边偏移**

定位模式

position: **static**;（默认的，无定位，按标准流摆放位置）

position: **absolute**;（**内部将元素转换成inline-block**）

绝对定位的特点：

1.如果没有祖先元素或者，祖先元素没有定位，则以浏览器为准定位（Document文档）。

2.若果祖先元素有定位（相对、绝对、固定定位），则以最近一级的有定位祖先元素为参考移动位置。

3.**绝对定位不再占有标准流**。

```css
position: relative;
```

（相对原来的位置进行定位，不脱标继续**占有原来标准流的位置**）

```css
position: fixed;
```

(**内部将元素转换成inline-block**)

固定定位的特点：

1.以浏览器的可视窗口为参照点移动元素。（**不要直接插入图片**，不要直接控制图片，用div嵌套一下）

**跟父元素没有任何关系，不随着滚动条滚动而移动**

2.固定定位不再占有原先的位置。（脱标）

**固定在版心右侧位置**

![image-20200516122706392](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200516122706392.png)

```css
Position: sticky;
```

**粘性定位**

1.以浏览器窗口为参照点移动元素

2.粘性定位占有原先的位置

3.必须添加top\left\right\bottom其中一个才有效



### z-index

**只有定位的元素才有z-index属性**，取值是正负整数和0（没有单位），默认的是auto，相同的时候是后来者居上



**绝对定位的盒子居中**

**加了绝对定位的盒子不能通过margin: 0 auto;水平居中**，但是可以通过计算偏移值实现水平和垂直居中

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200516131529191.png" alt="image-20200516131529191" style="zoom:50%;" />



**并集选择器**集体申明相同样式(实现内聚，解耦合），给同一个元素同时声明left 和rigth 就是先左后右，先上后下

### 网页布局总结

![image-20200516143057662](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200516143057662.png)



### 元素的显示与隐藏

**1.display属性（重点）**

display： none；隐藏元素，且不占有原来的位置

display：block；显示

2.visibility

Visibility: hidden;隐藏元素,占有原来的位置

Visibility: visible;元素可视

3.overflow溢出

有定位超出部分的元素，慎用overflow：hidden；



**土豆视频窗口样式：**

```css
div:hover .mask {
}
```





## table布局

利用

```css
display:table-cell;
```

主要是用来垂直居中(相当于<td>)

```css
display: table-cell; 
vertical-align: middle;
/* 如果display:table-cell 没有父元素  默认和同一级相同属性 排在一样  类似td标签 但是父元素单独加上display:table 会另起一行 如下：文字的垂直水平居中 */

```



## flex(弹性)布局

**flexbox 不会再对对文档的书写模式提供假设，没有固定的上下左右和其他固定的排列，更灵活**

**块级布局更侧重于垂直方向、行内布局更侧重于水平方向，与此相对的，弹性盒子布局算法是方向无关的。**

弹性盒子布局主要适用于应用程序的组件及小规模的布局，**而（新兴的）栅格布局则针对大规模的布局**。

为要使用此样式的元素指派 CSS，需按以下方式设置 [display](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 属性：

```css
display : flex;
```

或者

```css
display : inline-flex;
```

这样做将元素定义为弹性容器，其子元素则成为弹性项目。值 `flex` 使弹性容器成为**块级元素**。值 `inline-flex` 使弹性容器成为**单个不可分的行内级元素**。

**浏览器属性私有化的写法是私有化值，这里不是写在属性前面**

`display : -webkit-flex`。



**不影响弹性盒子的属性**

- [多栏布局模块](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_multi-column_layouts)的 `column-*` 属性对弹性项目无效。
- [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 与 [`clear`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/clear) 对弹性项目无效。使用 `float` 将使元素的 `display` 属性计为`block`。
- [`vertical-align`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/vertical-align) 对弹性项目的对齐无效。



**控制对齐属性**

- [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content) - 控制主轴（横轴）上所有 flex 项目的对齐。
- [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) - 控制交叉轴（纵轴）上所有 flex 项目的对齐。
- [`align-self`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-self) - 控制交叉轴（纵轴）上的单个 flex 项目的对齐。
- [`align-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-content) - 控制“多条主轴”的 flex 项目在交叉轴的对齐。



**常用的属性**

flex熟悉各种简写：flex:1;|flex:2;|flex:auto;等

**(常用)margin 主要用来布局导航栏和拆分**







## Grid(栅格)布局















## CSS高级技巧

### 精灵图（sprites）

目的：为了有效减少服务器接收和发送请求的次数，提高页面的加载速度

使用：

1.主要针对小的背景图片使用

2.主要借助于背景位置来实现--background-position

3.注意是移动背景图片，一般都是负值

### iconfont

展示的是图标，但是本质是文字（文字放大缩小不会失真）

优点：
轻量级、灵活性、兼容性（几乎支持所有浏览器）

不能取代精灵图，简单的小图标就用iconfont，复杂的就还是用精灵图

使用：

1.下载--下载完毕后，原先的文件不要删除，后面都可能会用到

2.**引入**--把下载包里面的fonts文件夹放到我门项目的**根目录**里面

-->CSS字体声明（在style.css复制字体声明部分就可以了）-->**复制IcoMoon Demo文件里面的字体后面的方框（也是使用转义字符）**

![image-20200516164052346](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200516164052346.png)

3.**追加**-->在icomoon网站上传以前文件中的selection.jason-->添加我们需要追加的iconfont-->重新下载并替换我们项目中fonts文件**并且更新字体声明**

### CSS三角

需要注意的是，**高和宽都要声明为0**，如果不声明会继承宽高

```css
div {
    width: 0;
    height: 0;
		line-height: 0;//兼容低版本浏览器
		font-size: 0;//兼容低版本浏览器
    border: 50px solid transparent;
    border-bottom-color: turquoise;
}
```



### CSS常见用户界面

#### 鼠标样式

#### 轮廓线outline:0;

#### 防止拖拽文本域resize:none;

### Vertical-align

用于设置图片或者表单（行内块元素）和文字垂直对齐。只针对行内元素或者行内块元素有效。

#### 解决图片底部默认空白缝隙的问题

因为行内元素｜行内块元素（图片）默认的是和文字的基线对齐，所以有个空白

1.vertical-align: middle|top|bottom(优先使用)

2.多行文本显示省略

一般是后台来做阶段，下面这种方式只适应于webkit和移动端

```css
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```



### 常见布局技巧

#### margin负值的运用-避免border合并加粗

```css
/* 利用margin-left: -1px;使后面的左边狂*/
ul li {
    list-style: none;
	  float: left;
		width: 200px;
		height: 300px;
 		border: 1px solid #cccccc;
   	margin-left: -1px;
}


/* 因为上面左边border缩进被挡住，我们需要在鼠标经过的时候要完全显示border */
ul li:hover {
				/* 1.如果盒子没有定位，则鼠标经过添加相对定位即可 */
				position: relative;
				/* 2.如果li都有定位，则通过z-index提高层级 */
				z-index: 1;
				border-color: #ff4400;
}
```



#### 文字环绕浮动元素

2015.3.31阿里笔试题

{最多两行20px #333，顶部对齐图片，底部间距8px}

{12px #666 行高1.2}使用语义化的HTML标签完成一下布局，考虑模块化和扩展性。容器默认宽度是320px，右侧。

![image-20200517114928822](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517114928822.png)

图片100*100，hover时容器宽度变成400px。

#### 行内块的巧妙运用

父级设置文字居中，内部的行内块元素自动居中，而且自己带有间隙，**比较适合底部的跳页模块**



#### css三角强化

```css
.trangel {
    width: 0;
    height: 0;
    border-width: 100px 50px 0 0 ;
    border-style: solid;
    border-color: transparent red transparent transparent;
}
```

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517154857139.png" alt="image-20200517154857139" style="zoom:50%;" />



### 把背景图片放在paddin里面，兼容性写法

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517113225611.png" alt="image-20200517113225611" style="zoom:50%;" />





## CSS初始化（reset）

**可以参考京东的初始化，已经加载在桌面reset.css**

**可以利用common.css完成模块化开发，相同模块后期只需要插入相同结构(修改差异结构),导入common.css就可以了**















# HTML5和CSS3提高

## HTML5新特性

IE9+以上的版本才支持，移动端没有兼容性问题

div对搜索引擎来说没有语义的



**header nav article section aside footer**

主要是针对搜索引擎，新标签可以多次使用，**在IE9中需要将这些元素转换为块级元素**，新标签在移动端是没有兼容性问题



测试一下这些标签

```html
    <!-- 引用块，通常配合cite属性和<cite>一起使用 -->
		<blockquote cite="http://www.baidu.com">
       <footer><cite></cite></footer>
    </blockquote>
		
		<!-- label域集 -->
    <fieldset>
        <legend></legend>
    </fieldset>
		<!-- 预格式化文本，该文本将完全按照HTML中的内容进行显示 -->
    <pre></pre>

```



### 新增的多媒体标签：

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517163535132.png" alt="image-20200517163535132" style="zoom:50%;" />

![image-20200517164608130](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517164608130.png)



![image-20200517165105702](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517165105702.png)

![image-20200517171157190](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517171157190.png)

![image-20200517171112552](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517171112552.png)



## CSS3

**总纲**

**1.CSS3 新增加了属性、结构伪类、伪元素选择器**

**2.CSS3 2D移动、旋转和缩放属性**

**3.CSS3动画设置方法**

**4.CSS3D 移动、旋转和缩放属性**

![image-20200521195440888](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200521195440888.png)



### 属性选择器

中括号才是属性选择器，前面的是标签选择器，总权重是11，单独属性选择器的权重才是10

div.box是交集选择器

![image-20200517173403241](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517173403241.png)

**注意：类选择器、属性选择器、伪类选择器 权重为10**

### 结构伪类选择器

![image-20200517173946491](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517173946491.png)

**E:nth-child(n)这个是先看n然后再看元素E，选择某个父元素的一个或多个特定的子元素**

n可以是数字，关键字和公式（**作为公式的时候字母必须是n，n从0开始每次往后加1**）

n如果是数字，就是选择第n个子元素，里面数字从1开始...

n可以是关键字：even偶数 odd奇数

![image-20200517175552865](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200517175552865.png)



**E:nth-of-type(n)**这个是先看元素E然后再判断n，注意区别nth-child(n)

**结构伪类选择器的权重为10**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200518110049553.png" alt="image-20200518110049553" style="zoom:50%;" />



### 伪元素选择器（重点）

利用css 创建元素，在DOM结构中不存在，所以叫伪元素，简化结构

**伪元素默认为行内元素**

![image-20200518115053833](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200518115053833.png)

**伪元素选择器权重为1**

**befor after** 

存在于元素逻辑的最前面和最后面的子元素

**经常结合iconfont使用**



```css
/* 伪类选择器和伪元素的联合写法*/
div:hover::befor {
}
```



**伪元素清除浮动**

```css
.clearfix::after {
		content: "";
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
}
```



### 盒子模型

**box-sizing**：border-box|content-box；



### CSS3其他特性

1.图片变模糊

2.计算盒子宽度width：calc函数



#### CSS3滤镜filter

filter: 函数(); 例如: filter: blur(5px); blur 模糊处理 数值越大越模糊



#### CSS3 calc函数

calc()此函数让你在声明CSS属性值时执行一些计算

**width: calc(100% - 30px) 父盒子宽度减30px**



#### CSS3 过渡（重点）

现在经常和:hover搭配一起使用

**谁做过渡给谁加过渡**

**transition: 过渡的属性 时间 运动曲线 何时开始**曲线和预时间可以省略

**transition: all .5s ease 1s;**



#### CSS3 2D转换

转换transform可以实现元素的位移、旋转、缩放等效果。(结合过渡使用会比较优美)

**transform: translate(x,y);移动**

+ translate不会影响其他元素的位置

+ translate中的百分比单位是相对于自己

+ 对行内标签没有效果**



**transform: rotate(360deg);旋转**

+ 单位是deg一定要写

+ 正值顺时针，负值逆时针

+ 默认以元素中心点旋转

**注意这种伪类选择器的写法**

```css
.search_box:hover::after{
}
```



**转换中心点transform-origin**

Transform-origin: x y;(默认值是50% 50%)

可以是百分比｜像素｜方位名词

**写属性的时候如果漏掉一个单位，导致格式不对，会整行属性无效**



**transform: scale(x,y);缩放**

+ x,y里面是数字不接单位，指倍数

+ **scale的优势之处: 不会影响其他的盒子，而且可以设置缩放的中心点（默认是元素中心），而通过修改宽高的缩放是向下扩展且会影响其他元素。**但是scale会放大阴影，这个时候就要考虑了



**综合写法**

+ transform: translate() rotate() scale();

+ 顺序会改变转换效果,(先旋转会改标坐标轴方向）

+ **综合写的时候将位移放在最前面**

#### CSS3 动画(animation)

**动画的基本使用**

1.先定义动画

## **动画序列（关键帧）**

 ```css
@keyframs indentifier{
}
 ```

+ 可以做多个状态的变化

+ 里面的百分比要是整数（就是**时间的划分**）

2.再调用动画

```css
animation-name: name;(必须)
animation-duration: 1s;(必须)
```



<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200519113316767.png" alt="image-20200519113316767" style="zoom:50%;" />

```css
animation-play-state: paused;停止
```

**利用图片的steps()就可以制作关键帧的动画**（百度浏览器的小熊）

**元素可以添加多个动画，用逗号隔开**

```cs
animation: bear 1s steps(8) infinite,move 3s  forword;
```



#### CSS3 3D转换

**3D移动 translate3d**

```css
Transform: translateZ(100px); translateZ单位一般用的px
Transform: translateX(),translateY(),translateZ();
```

简写如下：

```css
transform: translate3d(x,y,z);
```

**透视 perspective**

在2D平面产生近大远小视觉立体，让网页产生3D效果

透视也称为视距：视距就是人的眼睛到屏幕的距离

+ **透视写在被观察元素的父盒子上面或者祖先元素，可以被继承**
+ 同等视距下Z轴为正元素变大，Z轴为负元素缩小,类似于投影

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200521211604708.png" alt="image-20200521211604708" style="zoom:50%;" />



**translateZ**



**3D旋转 rotate3d**

3D旋转可以让元素在三维平面沿着x轴，y轴，z轴或者自定义进行旋转。

```css
transform: rotateX();

transform: rotateY();

transform: rotateZ();
```

这三个使用的比较多

```css
transform: rotate3d(x,y,z,deg);沿着自定义轴旋转deg为角度
```

**这里的x,y,z是取矢量，进行矢量计算就可以进行多样路线运动**

**左手法则判断旋转方向**



**3D呈现 transform-style(重要)**

```css
/* Keyword values */
transform-style: flat;
transform-style: preserve-3d;
```

定义**子元素**的展现形式，默认的是平面flat模式

**通常子元素做了3D操作，父级一定要要做3D呈现，子元素不会以3D呈现**

**代码写给父级，但是影响的是子盒子**

必须定义，不能被继承



**练习一下：**

3D导航栏(**以立方体的X中心轴旋转才是标准的，让前面的元素前移就可以了**)

**旋转木马**(**先摆好位置然后旋转大盒子，只控制Y轴的旋转和Z轴的平移且平移量一致，?这一点不是很懂**)

最好再写一下成哥那个案例六个面半透明翻转（**?怎么让它一边移动一遍旋转**）



#### 浏览器私有前缀

浏览器私有前缀是为了兼容老版本的写法

+ **-moz-: 代表firefox浏览器私有属性**
+ **-ms-: 代表IE浏览器私有属性**
+ **-webkit-: 代表safari | chrome私有属性**
+ **-o-: 代表Opera私有属性**

提倡的写法(border-radius就有兼容性问题)

```scss
-moz-border-radius: 10px;
-webkit-border-radius: 10px;
-o-border-radius: 10px;
border-radius: 10px;
```



## 服务器

本地服务器、远程服务器

http://free.3v.do/

1.去免费空间注册账号

2.记录下主机名、用户名、密码、域名

3.利用FTP(Transmit)软件上传网站到远程服务器





# 代码规范

##  1. HTML 规范

**LOGO SEO优化**

![image-20200523104155975](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200523104155975.png)

###  DOCTYPE 声明

HTML文件必须加上 DOCTYPE 声明，并统一使用 HTML5 的文档声明：

~~~html
<!DOCTYPE html>
~~~

**HTML5标准模版**

```html
<!DOCTYPE html>
  <html lang="zh-CN">
  <head>
  <meta charset="UTF-8">
  <title>HTML5标准模版</title>
  </head>
  <body>

  </body>
</html>
```

### 页面语言lang

推荐使用属性值 `cmn-Hans-CN`（简体, 中国大陆），但是考虑浏览器和操作系统的兼容性，目前仍然使用 `zh-CN` 属性值

```
<html lang="zh-CN">
```

更多地区语言参考：

```
zh-SG 中文 (简体, 新加坡)   对应 cmn-Hans-SG 普通话 (简体, 新加坡)
zh-HK 中文 (繁体, 香港)     对应 cmn-Hant-HK 普通话 (繁体, 香港)
zh-MO 中文 (繁体, 澳门)     对应 cmn-Hant-MO 普通话 (繁体, 澳门)
zh-TW 中文 (繁体, 台湾)     对应 cmn-Hant-TW 普通话 (繁体, 台湾)
```

### charset 字符集合

一般情况下统一使用 “UTF-8” 编码

```
<meta charset="UTF-8">
```

由于历史原因，有些业务可能会使用 “GBK” 编码

```
<meta charset="GBK">
```

请尽量统一写成标准的 “UTF-8”，不要写成 “utf-8” 或 “utf8” 或 “UTF8”。根据 [IETF对UTF-8的定义](http://www.ietf.org/rfc/rfc3629)，其编码标准的写法是 “UTF-8”；而 UTF8 或 utf8 的写法只是出现在某些编程系统中，如 .NET framework 的类 System.Text.Encoding 中的一个属性名就叫 UTF8。

### 书写风格

#### HTML代码大小写

HTML标签名、类名、标签属性和大部分属性值统一用小写

*推荐：*

```
<div class="demo"></div>
```

*不推荐：*

```
<div class="DEMO"></div>
	
<DIV CLASS="DEMO"></DIV>
```

### 类型属性

不需要为 CSS、JS 指定类型属性，HTML5 中默认已包含

*推荐：*

```
<link rel="stylesheet" href="" >
<script src=""></script>
```

*不推荐：*

```
<link rel="stylesheet" type="text/css" href="" >
<script type="text/javascript" src="" ></script>
```

### 元素属性

- 元素属性值使用双引号语法
- 元素属性值可以写上的都写上

*推荐：*

```
<input type="text">
<input type="radio" name="name" checked="checked" >
```

*不推荐：*

```
<input type=text>	
<input type='text'>
<input type="radio" name="name" checked >
```

### 特殊字符引用

文本可以和字符引用混合出现。这种方法可以用来转义在文本中不能合法出现的字符。

在 HTML 中不能使用小于号 “<” 和大于号 “>”特殊字符，浏览器会将它们作为标签解析，若要正确显示，在 HTML 源代码中使用字符实体

*推荐：*

```
<a href="#">more&gt;&gt;</a>
```

*不推荐：*

```
<a href="#">more>></a>
```

### 代码缩进

统一使用四个空格进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）

```
<div class="jdc">
    <a href="#"></a>
</div>
```

### 代码嵌套

元素嵌套规范，每个块状元素独立一行，内联元素可选

*推荐：*

```
<div>
    <h1></h1>
    <p></p>
</div>	
<p><span></span><span></span></p>
```

*不推荐：*

```
<div>
    <h1></h1><p></p>
</div>	
<p> 
    <span></span>
    <span></span>
</p>
```

段落元素与标题元素只能嵌套内联元素

*推荐：*

```
<h1><span></span></h1>
<p><span></span><span></span></p>
```

*不推荐：*

```
<h1><div></div></h1>
<p><div></div><div></div></p>
```

## 2. 图片规范

### 内容图

内容图多以商品图等照片类图片形式存在，颜色较为丰富，文件体积较大

- 优先考虑 JPEG 格式，条件允许的话优先考虑 WebP 格式
- 尽量不使用PNG格式，PNG8 色位太低，PNG24 压缩率低，文件体积大
- **PC平台单张的图片的大小不应大于 200KB。**

### 背景图

背景图多为图标等颜色比较简单、文件体积不大、起修饰作用的图片

- PNG 与 GIF 格式，优先考虑使用 PNG 格式,PNG格式允许更多的颜色并提供更好的压缩率
- 图像颜色比较简单的，如纯色块线条图标，优先考虑使用 PNG8 格式，避免不使用 JPEG 格式
- 图像颜色丰富而且图片文件不太大的（40KB 以下）或有半透明效果的优先考虑 PNG24 格式
- 图像颜色丰富而且文件比较大的（40KB - 200KB）优先考虑 JPEG 格式
- 条件允许的，优先考虑 WebP 代替 PNG 和 JPEG 格式

## 3. CSS规范

### 代码格式化

样式书写一般有两种：一种是紧凑格式 (Compact)

```
.jdc{ display: block;width: 50px;}
```

一种是展开格式（Expanded）

```
.jdc {
    display: block;
    width: 50px;
}
```

**团队约定**

统一使用展开格式书写样式

### 代码大小写

样式选择器，属性名，属性值关键字全部使用小写字母书写，属性字符串允许使用大小写。

```
/* 推荐 */
.jdc{
	display:block;
}
	
/* 不推荐 */
.JDC{
	DISPLAY:BLOCK;
}
```

### 选择器

- 尽量少用通用选择器 `*`
- 不使用 ID 选择器
- 不使用无具体语义定义的标签选择器

```css
/* 推荐 */
.jdc {}
.jdc li {}
.jdc li p{}

/* 不推荐 */
*{}
#jdc {}
.jdc div{}
```

### 代码缩进

统一使用四个空格进行代码缩进，使得各编辑器表现一致（各编辑器有相关配置）

```
.jdc {
    width: 100%;
    height: 100%;
}
```

### 分号

每个属性声明末尾都要加分号；

```
.jdc {
    width: 100%;
    height: 100%;
}
```

### 代码易读性

左括号与类名之间一个空格，冒号与属性值之间一个空格

*推荐：*

```
.jdc { 
    width: 100%; 
}
```

*不推荐：*

```
.jdc{ 
    width:100%;
}
```

逗号分隔的取值，逗号之后一个空格

*推荐：*

```
.jdc {
    box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
}
```

*不推荐：*

```
.jdc {
    box-shadow: 1px 1px 1px #333,2px 2px 2px #ccc;
}
```

为单个css选择器或新申明开启新行

*推荐：*

```css
.jdc, 
.jdc_logo, 
.jdc_hd {
    color: #ff0;
}
.nav{
    color: #fff;
}
```

*不推荐：*

```css
.jdc,jdc_logo,.jdc_hd {
    color: #ff0;
}.nav{
    color: #fff;
}
```

颜色值 `rgb()` `rgba()` `hsl()` `hsla()` `rect()` 中不需有空格，且取值不要带有不必要的 0

*推荐：*

```
.jdc {
    color: rgba(255,255,255,.5);
}
```

*不推荐：*

```
.jdc {
    color: rgba( 255, 255, 255, 0.5 );
}
```

属性值十六进制数值能用简写的尽量用简写

*推荐：*

```
.jdc {
    color: #fff;
}
```

*不推荐：*

```css
.jdc {
    color: #ffffff;
}
```

不要为 `0` 指明单位

*推荐：*

```css
.jdc {
    margin: 0 10px;
}
```

*不推荐：*

```css
.jdc {
    margin: 0px 10px;
}
```

### 属性值引号

css属性值需要用到引号时，统一使用单引号

```css
/* 推荐 */
.jdc { 
	font-family: 'Hiragino Sans GB';
}

/* 不推荐 */
.jdc { 
	font-family: "Hiragino Sans GB";
}
```

### 属性书写顺序

建议遵循以下顺序：

1. 布局定位属性：display / position / float / clear / visibility / overflow（建议 display 第一个写，毕竟关系到模式）
2. 自身属性：width / height / margin / padding / border / background
3. 文本属性：color / font / text-decoration / text-align / vertical-align / white- space / break-word
4. 其他属性（CSS3）：content / cursor / border-radius / box-shadow / text-shadow / background:linear-gradient …

```css
.jdc {
    display: block;
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    margin: 0 10px;
    padding: 20px 0;
    font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
    color: #333;
    background: rgba(0,0,0,.5);
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -o-border-radius: 10px;
    -ms-border-radius: 10px;
    border-radius: 10px;
}
```

[mozilla官方属性顺序推荐](https://www.mozilla.org/css/base/content.css)

## 命名规范

由历史原因及个人习惯引起的 DOM 结构、命名不统一，导致不同成员在维护同一页面时，效率低下，迭代、维护成本极高。

### 目录命名

* 项目文件夹：shoping
* 样式文件夹：css
* 脚本文件夹：js
* 样式类图片文件夹：img
* 产品类图片文件夹： upload
* 字体类文件夹： fonts

### ClassName命名

ClassName的命名应该尽量精短、明确，必须以**字母开头命名**，且**全部字母为小写**，单词之间**统一使用下划线** “_” 连接

.nav_top

#### 常用命名推荐

**注意**：ad、banner、gg、guanggao 等有机会和广告挂勾的不建议直接用来做ClassName，因为有些浏览器插件（Chrome的广告拦截插件等）会直接过滤这些类名，因此

```
<div class="ad"></div>
```

这种广告的英文或拼音类名不应该出现

另外，**敏感不和谐字眼**也不应该出现，如：

```
<div class="fuck"></div>
<div class="jer"></div>
<div class="sm"></div>
<div class="gcd"></div> 
<div class="ass"></div> 
<div class="KMT"></div> 
...
```

| ClassName              | 含义                                     |
| ---------------------- | ---------------------------------------- |
| about                  | 关于                                     |
| account                | 账户                                     |
| arrow                  | 箭头图标                                 |
| article                | 文章                                     |
| aside                  | 边栏                                     |
| audio                  | 音频                                     |
| avatar                 | 头像                                     |
| bg,background          | 背景                                     |
| bar                    | 栏（工具类）                             |
| branding               | 品牌化                                   |
| crumb,breadcrumbs      | 面包屑                                   |
| btn,button             | 按钮                                     |
| caption                | 标题，说明                               |
| category               | 分类                                     |
| chart                  | 图表                                     |
| clearfix               | 清除浮动                                 |
| close                  | 关闭                                     |
| col,column             | 列                                       |
| comment                | 评论                                     |
| community              | 社区                                     |
| container              | 容器                                     |
| content                | 内容                                     |
| copyright              | 版权                                     |
| current                | 当前态，选中态                           |
| default                | 默认                                     |
| description            | 描述                                     |
| details                | 细节                                     |
| disabled               | 不可用                                   |
| entry                  | 文章，博文                               |
| error                  | 错误                                     |
| even                   | 偶数，常用于多行列表或表格中             |
| fail                   | 失败（提示）                             |
| feature                | 专题                                     |
| fewer                  | 收起                                     |
| field                  | 用于表单的输入区域                       |
| figure                 | 图                                       |
| filter                 | 筛选                                     |
| first                  | 第一个，常用于列表中                     |
| footer                 | 页脚                                     |
| forum                  | 论坛                                     |
| gallery                | 画廊                                     |
| group                  | 模块，清除浮动                           |
| header                 | 页头                                     |
| help                   | 帮助                                     |
| hide                   | 隐藏                                     |
| hightlight             | 高亮                                     |
| home                   | 主页                                     |
| icon                   | 图标                                     |
| info,information       | 信息                                     |
| last                   | 最后一个，常用于列表中                   |
| links                  | 链接                                     |
| login                  | 登录                                     |
| logout                 | 退出                                     |
| logo                   | 标志                                     |
| main                   | 主体                                     |
| menu                   | 菜单                                     |
| meta                   | 作者、更新时间等信息栏，一般位于标题之下 |
| module                 | 模块                                     |
| more                   | 更多（展开）                             |
| msg,message            | 消息                                     |
| nav,navigation         | 导航                                     |
| next                   | 下一页                                   |
| nub                    | 小块                                     |
| odd                    | 奇数，常用于多行列表或表格中             |
| off                    | 鼠标离开                                 |
| on                     | 鼠标移过                                 |
| output                 | 输出                                     |
| pagination             | 分页                                     |
| pop,popup              | 弹窗                                     |
| preview                | 预览                                     |
| previous               | 上一页                                   |
| primary                | 主要                                     |
| progress               | 进度条                                   |
| promotion              | 促销                                     |
| rcommd,recommendations | 推荐                                     |
| reg,register           | 注册                                     |
| save                   | 保存                                     |
| search                 | 搜索                                     |
| secondary              | 次要                                     |
| section                | 区块                                     |
| selected               | 已选                                     |
| share                  | 分享                                     |
| show                   | 显示                                     |
| sidebar                | 边栏，侧栏                               |
| slide                  | 幻灯片，图片切换                         |
| sort                   | 排序                                     |
| sub                    | 次级的，子级的                           |
| submit                 | 提交                                     |
| subscribe              | 订阅                                     |
| subtitle               | 副标题                                   |
| success                | 成功（提示）                             |
| summary                | 摘要                                     |
| tab                    | 标签页                                   |
| table                  | 表格                                     |
| txt,text               | 文本                                     |
| thumbnail              | 缩略图                                   |
| time                   | 时间                                     |
| tips                   | 提示                                     |
| title                  | 标题                                     |
| video                  | 视频                                     |
| wrap                   | 容器，包，一般用于最外层                 |
| wrapper                | 容器，包，一般用于最外层                 |



# Javascript面向对象



#### for循环

```javascript
    					// (1)    (2)    (3)
        for(var i = 0;i >= 10;i ++){
            console.log("ace");
        }
        // 先执行一遍（1)整个循环只执行一次
        // 再执行（2）和函数体
        // 再执行（3）
        // 再执行（2）和函数体
        // 再执行（3）
        // -->循环

```

**for循环里面可以直接写执行体，或者不写内容**



#### 数据类型

不可改变的原始值（棧数据）

**Number | String | Boolean | undefined | null**

引用值（堆数据）

**Array | Object | function** 等



#### 运算符

"+"

1.数学运算，字符串链接

2.任何数据类型加字符串都等于字符串



"-" | "*" | "/" | "%" | "=" | "()"

优先级"=" 最弱，"()"优先级较高

"++" "--" "+=" "-=" "/=" "*=" "%="



#### 字符串比较

字符串比较的是ASC码，而且是从第一位一一对应开始比，A --> 65 a --> 97



#### 六个布尔值false的

undefined	null	NaN	""	0	false --> false

其余的都为true,例如**if(function())就为真**现在if里面已经不允许声明函数了



#### 条件语句补充

switch case

break 终止循环，必须写在循环里面，写在外面会报错

continue 终止本次循环进行下一次循环，可以参照逢7过这个游戏



#### 短路语句

```javascript
var data;
data && fn(data);//短路语，实际情况就是这样用的，做一个数据前置判断

function fn(){}
```

data && fn()



#### 六种数据类型 typeof

number	string 	boolean	undefined	object	function



### 类型转换

#### 显式类型转换

+ Number(mix)

+ parseInt(string,radix) -- 只关注将数转化成整型,以数字开始看到非数字位然后返回,其他的都=NaN;第二个radix是**以radix进制转化为10进制**（radix取值范围 2～36）

+ parseFloat(string)

+ toString(radix) -- undefined null 没有toString方法,radix是**将10进制的数转化成radix进制**

+ String(mix)

+ Boolean()

#### 隐式类型转换

+ isNaN()

+ ++/-- +/-(一元正负)

+ +

+ */%

+ && || !

+ <	>	<=	>=

+ ==	!=

Number('abc');内部调用了isNaN()	-->	NaN

**undefined == null**

**NaN任何情况都不等于NaN，所以不等于任何**

**绝对相等 === !== 是这两个不发生类型转换**



number (null) = 0;

typeof(null) = object;

typeof(undefined) = NaN;

typeof(a) = NaN;

**NaN是数字类型**

typeof(Number("abc"));是Number

**未定义的变量只有放在typeof（）里面不会报错，且会返回"undefined"**

**所以typeof(typeof(abc));得到的数据类型是String**



## 函数(高内聚 弱耦合)

解耦合 抽象功能

行参实参不限量

每一个函数自带一个arguments类数组，存放实参列表

实参长度 arguments.length

行参长度 函数名.length

行参和实参虽然实原始值，但是内部是具有映射关系的，联动，但是行参多的时候就算赋值也不会再加到arguments里面去了



**return作用：1.终止函数 2.返回** 用在**switch case**里面比较明显



**递归：**1.找规律2.找出口

递归只能解决简单问题，复杂问题会很慢，通常都不会用递归

```javascript
// 阶乘

        function mul(n){
            if(n == 0 || n == 1){
                return 1
            }
            return n * arguments.callee(n);
        }


        // 裴伯纳切数列第j位
        function sum(j){
            if(n == 1 || n == 2){
                return 1;
            }
            return arguments.callee(n - 1) + arguments.callee(n - 2);
        }
```



## Javascript运行

**三部曲**

+ 语法分析
+ 预编译
+ 解析执行



//函数声明整体提升

//变量	声明提升



#### 预编译前奏

1.imply global 暗示全局变量：即任何变量，若果变量未经声明就赋值，此变量就为全局对象所有，全局对象就是window,window就是全局的域

a = 123;	window.a

var a = b = 123;(这里的b也属于未声明)	window.b



2.一切声明的全局变量，全是window的属性

var a = 123; -->window.a = 123;



#### 预编译

//预编译发生在函数执行的前一刻

**函数表达式不是函数声明，而是变量声明并赋值的过程**

```js
eg:
var a = 5;
function test() {
		a = 0;
		console.log(a);
		console.log(this.a);
		var a;
		console.log(a);
}
test();

GO = {
		a : 5
}

AO = {
		this : window,
		a : undefined --> 0
}
```



```js
eg:
function test(c) {
		var a = 123;
		function b() {}

}

AO {
		arguments : [1],
		this : window,
		c : 1,
		a : undefined,
		b : function(){}
}
```



四部曲**

+ 1.创建AO对象

+ 2.找行参和变量，将变量和行参为AO(包括循环和条件语句里面的变量声明

+ 3.将实参值和行参统一

+ 4.在函数体里面找函数声明，值赋予函数体



**if里面现在是不允许声明函数了**



### 作用域精解

**[[scope]]**

每个javascript函数都是一个对象，对象中有些属性我们可以访问，但有些不可以，这些属性仅供javascript引擎存取，但是有些不可以，这些属性仅供javascript引擎存取，[[scope]]就是其中一个。



**作用域链**

[[scope]]中所储存的执行器上下文对象的集合，这个集合呈链式链接，我们把这种链式链接叫作用域链。



**运行期上下文（函数执行的前一刻才会生成）**

当函数执行时，会创建一个称为**执行期上下文**的内部对象。一个执行期上下文定义了一个函数时的环境，函数每次执行时对应执行上下文都是独一无二的，所以多次调用一个函数会导致创建多个执行上下文，当函数执行完毕，它所产生的执行上下文被销毁。



**查找变量**

从执行环境的作用域链的顶端依次向下查找。

所以外部拿不到内部的变量，内部可以拿到外部的变量。



**销毁只是销毁作用域链顶端自己创建的那个AO，其他的上下文依然在那里**

**运行时作用域链示例**

```javascript
    function a() {
        function b() {
            function c() {

            }
            c();
        }
        b();
    }
    a();

    // a defined a.[[scope]] --> 0 : GO

    // a doing   a.[[scope]] --> 0 : aAO

    // b defined b.[[scope]] --> 0 : aAO
    //                           1 : GO

    // b doing   b.[[socpe]] --> 0 : bAO
    //                           1 : aAO
    //                           2 : GO

    // c doing   c.[[scope]] --> 0 : cAO
    //                           1 : bAO
    //                           2 : aAO
    //                           3 : GO

```



#### 闭包

**当内部函数被保存到外部时，将会生成闭包。闭包会导致原有的作用域链不释放，造成内存泄漏。**

**但凡是内部的函数被保存到了外部，一定产生闭包**



**闭包的作用**

+ 实现公有化变量 eg：函数累加器

+ 可以做缓存（储存结构）eg：eater()

```js
function person(){
            var food = "";//这个是做缓存的
            var obj = {
                eat : function(){
                    console.log("I am eatting" + " " + food);
                    food = "";
                },
                push : function(myFood){
                    food = myFood;
                }
            }
            return obj;
        }
        var tangZheng = person();
        tangZheng.push("xiGua");
        tangZheng.eat();
```

+ 可以实现封装，属性私有化 eg：Person();

  ```js
  function Person(name){
    	var money = 100;//私有化变量
    	this.name = name;
    	this.makeMoney = function(){
        money ++;
        console.log(monye);
      }
    this.payMoney = function(){
      money --;
      console.log(monye);
    }
    //当new的时候会隐式的返回this,形成闭包
  }
  
  var person = new Person("lili");
  
  person.makeMoney();
  console.log(person.money);//外部是查看不到私有化属性的,undefined
  ```

  

+ 模块化开发，防止污染全局变量



#### 立即执行函数

定义：此类行数没有声明，在一次执行过后立即释放，适合做初始化工作。



**表达式后面直接加()才会被执行，函数声明后面加（）是会报错的**

*被（）执行符号执行的表达式，会自动忽略函数的名字，相当于立即执行函数*



**for循环产生闭包的经典原型**

```javascript
function afun() {
            var arr = [];
            // for(var i = 0; i < 10; i ++){
            //     arr[i] = function () {
            //             document.write(i + " ");
            //         }
            // }
            for (var j = 0; j < 10; j++) {
                (function (i) {
                    arr[i] = function () {
                        document.write(i + " ");
                    }
                }(j))
            }
            return arr;
        }
        var myArr = afun();
        for (var k = 0; k < 10; k++) {
            myArr[k]();
        }
```



**对象的创建方法**

```
//1.var obj = {} plainObject 对象字面量/对象直接量
//2.构造函数
//	1）系统自带的构造函数 new Object() Array() Number()
//	2)自定义
```



#### 构造函数三段式

必须要要New才能发生这三步，不然就是正常的函数执行

**构造函数内部原理**

```js
//1.在函数体最前面隐式的加上this = {}
//2.执行 this.xxx = xxx;
//3.隐士的返回this

function Person(name, height) {
            //var this = {}
            this.name = name;
            this.height = height;
            this.say = function() {
                console.log(this.say);
            }
            //return this;
        }
        
        var person = new Person('xiaoming', 180);
        console.log(person.name + ":" + person.height);
```



原始值是没有属性和方法的

原始值数字才是数字，原始值字符串才叫字符串

通过构造函数构造出来的数字对象和字符串对象是可以有属性的

```
var num = new Number(123);
```



强行访问原始值数字和原始值字符串时，包装类发生的内部隐式原理

```javascript
//包装类
var num = 4;

//强行访问原始值属性
num.len = 3;
// new Number(4).len = 3; --> delete


//new Numer(4).len --> undefined(因为上面的只是为了不报错,然后就删除了)
console.log(num.len);
```



### 原型

1.定义：**原型是function对象的一个属性**，它定义了构造函数的制造出的对象的公共最先。通过该构造函数产生的对象，可以继承该原型的属性和方法。原型也是对象。

2.利用原型特点和概念，可以提取共有属性。

3.对象如何查看原型 --> 隐式属性_proto_

4.对象如何查看对象的构造函数 --> constructor

 

```js
//Person.prototype	-->	原型
//Person.prototype = {}	是祖先
Person.prototype.LastName = "Deng";
Person.prototype.say = function() {
		console.log('hehe');
}

function Person() {//构造函数
}

var person = new Person();
var person1 = new Person();
```



**原型里面定义的构造器是可以修改的**

```js
function Person(){
}
function Car(){
}

Car.prototype = {
	constructor : Person
}

var car = new Car();
```



### Object.Creat(null)

**唯一一种创建对象没有原型,不继承自Object.prototype(所以不是所有的对象都有原型)**

```
var person = Object.creat(null);
```



### toString

原始值数字除外

**Undefined | null 没有toString方法，没有原型，没有包装类。**



### 要学会在原型上进行编程

**重写Object.prototype.toString方法**

```
/*	Object.prototype.toString
		Number.prototype.toString
		Array.prototype.toString
		Boolean.prototype.toString
		String.prototype.toString
*/
```



### javaScript精度不准

**天生的，现在采用了科学计数法，以前是没有科学计数法的**

<img src="/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200527095020681.png" alt="image-20200527095020681" style="zoom:50%;" />

### call apply

**call | apply 用于改变this指向，传参列表不同**

```js
//	开发中真正应用的，减少耦合，嵌套已经存在的模块
function Person(age, name){
            this.age = age;
            this.name = name;
        }

        function Student(age, name, sex){
            // var this = {}

            // 这里的this被改变指向了Person，不是上面构造器默认生成的this了
            Person.call(this, age, name);
            this.sex = sex;
        }

        var stu = new Student(18, 'Deng', 'female');
        console.log(stu.name + ':' + stu.age + '岁,' + stu.sex);
```



```js
//企业开发模式    
function Wheel(lunzi){
            this.lunzi = lunzi;
        }

        function Sit(move){
            this.move = move;
        }

        function Model(len){
            this.len = len;
        }

        function Car(lunzi, move, len){
            // apply后面传参只能又一个而且必须是数组，不然会报错
            Wheel.apply(this, [lunzi]);
            Sit.call(this, move);
            Model.call(this, len);
        }

        var car = new Car('Round', 'Running', '5100mm');
        console.log(car.lunzi + " " + car.move + " " + car.len);

```



### 继承

继承的发展史

1.传统形式 -->	原型链

​	过多的继承了没用的属性

2.借用构造函数

​	不能继承借用构造函数的原型

​	每次构造函数都要多走一个函数

3.共享原型

​	不能随便改动自己的原型

4.圣杯模式



### 圣杯模式(继承)

```js
// 圣杯模式
        function jiCheng(Target, Origin){
            function F(){};
            F.prototype = Origin.prototype;
            Target.prototype = new F();

            Target.prototype.constructor = Target;
            // 指明超类
            Target.prototype.uber = Origin;
        }
```



### 函数默认返回(undefined)

```js
function init(){
            // 国际启动函数
  					// 默认返回的undefined
            // return undefined;
            return this;
        }

```



### return this(实现函数连续调用)

```js
        //函数的连续调用,返回this就可以了,默认的return是返回undefined
        var obj = {};
        obj.fun1 = function () {
            console.log('打印第一个函数');
            return this;
        }
        obj.fun2 = function () {
            console.log('打印第二个函数');
            return this;
        }

        obj.fun1().fun2();

```



### obj[prop]

在条件语句或者for in循环当中不能使用obj.prop(内部会编程obj['prop'],这样就是直接访问'prop'值了

而我们是想要访问prop属性,所以应写成obj[prop]



```js
        let obj = {
            prop : niupi
        }

        for (const prop in obj) {
          //for in只会判断能不能访问到这个属性,不管是自己的还是原型链上的
          //hasOwnProperty()方法是判断是不是自己的属性
            if (obj.hasOwnProperty(prop)) {
                const element = obj[prop];
                
            }
        }
```



### instanceof

instanceof 可以在继承关系中用来判断一个实例是否属于它的父类型。

例如：

```js
function Aoo(){}
function Foo(){} 
Foo.prototype = new Aoo();//JavaScript 原型继承 
var foo = new Foo(); 
console.log(foo instanceof Foo)//true 
console.log(foo instanceof Aoo)//true
```



### 函数表达式

函数一旦变成表达式被立即执行,函数名就会被忽略没有意义了,相当于被系统删除了

```js
				let x = 1;
        if(function f () {}){
            x += typeof f;
        }
        console.log(x);//1undefined
```



### 声明变量

#### ***let和const***

https://www.jianshu.com/p/87a5262e0491

来到es6，我们将有六种声明变量，有我们已经学过的函数和var，今天讲的let 和const，还有后面讲的import和class，话不多说，我们先来讲一下我们今天的let
 let 的用法 和var差不多，但是又不同于var，是为了完善之前的语法的不足而设计的，体现在它的块级作用域，因为在之前的语法中只有全局作用域和函数作用域，而在if 和 for 等语句中不存在作用域，也就是说if 和 for 里面的声明输入它们存在的函数作用域或者全局作用域。

##### 块级作用域

```jsx
var a = [];
for (var i = 0; i < 10; i++){
  a[i] = function(){
    console.log(i)；
  }
}
a[6](); //10
```

在执行循环的时候，系统只是将函数附给数组，但是并不会去解析函数里的内容，直到最后一步执行函数了，才会去解析里面的内容，这时候要访问i，因为i使用var声明的，所以只存在于函数作用域或者全局作用域中，这时候 i 会被放到全局作用域中，可是循环已经结束了，所以访问到的i是全局重用域的10；这并不是我们想要的效果，所以我们会使用一个叫立即执行函数的方法来解决这个问题

```jsx
var a = [];
for (var i = 0; i < 10; i++){
    (function(k){
      a[k] = function(){
          console.log(k)；
      }
    }(i))
}
a[6](); //6
```

虽然这个问题得到了解决，但是也太过麻烦，**这时候es6引入了块级作用域**，也就是说，用let 和 const声明的变量除了可以在全局作用域和函数作用域中存在，还可以在块级作用域中存在。

```jsx
var a = [];
for (let i = 0; i < 10; i++){
  a[i] = function(){
    console.log(i)；
  }
}
a[6](); //6
```

**也就是说，每次声明的i都是一个新的变量，只在当前循环中有效存在于*不同的块级作用域*中。**
 另外，在严格模式下，if ，for 这些是不允许声明函数的

##### 不存在变量提升

还有一点就是let 不存在变量提升，什么是变量提升呢？这里我们先来介绍一下用预编译。每次在代码执行之前，浏览器会先对代码进行语法分析，会通篇扫描一遍看看有没有什么低级的错误，没有的话进行第二步，预编译，预编译一共分四步
 1，创建一个AO对象
 2，寻找形参和变量声明，并将其作为属性名放入AO对象中，属性值都赋值为undefined
 3，将实参和形参相统一
 4，在函数里寻找函数声明，用其函数名作为属性名放入AO中，属性值为function；
 这个AO就是我们通常说的上下文（Activeaction Object），虽然里面是空的，但是放着一些隐式属性，如 this:window   arguments:[]
 介绍完了变量提升之后我们可以知道，就算var声明变量在声明前面使用也是可以的，但是这往往会带来一些预想不到的错误，所以let不允许函数在声明之前使用，一使用就报错，而且let引入了暂时性死区的概念，来强化let声明的变量不能提前使用，什么是暂时性死区呢

##### 暂时性死区

```js
        var a = 1;
        if(1){
            console.log(b);//会形成死区,发生引用错误
            // 用let声明是不会提升的 但是又已经定义了a,所以又不能访问外部的a了
            let a = 1;
        }
```

为什么会报错呢？不是可以访问外面的a吗?
 因为let所声明的变量会锁在它所在的作用域里，不允许访问，就是说，它也会先扫描一遍，把let声明的变量保存起来，但是不允许使用，这时候你访问a，由于此作用域中有a，就不用访问外面的a了，但是你不能在它声明之前访问它。

##### 不允许重复声明

就是在同一个作用域中不允许重复声明同一个变量，而且也不能和形参重复。

##### const

const有着let所有的特性，而它是用来声明常量的，一是所声明的变量不允许改变，**二是声明的时候必须赋值**。但是对于复合类型的变量（如数组，对象），const保存的只是地址，里面的内容还是可以改变的，如果想要整个对象都不允许改变，可以使用Object.freeze()方法

```jsx
let constantice = function(obj){
   Object.freeze(obj);
   Object.keys(obj).forEach(function(key,value){
        if(typeof obj[key] === 'Object'){
              constantice (obj[key]);
        }
  })
}
```

##### 全局对象的属性

全局对象就是指最顶层的对象，浏览器的是window，node的是global
 在这里我们有必要了解一下，在es5中，全局对象的属性全局和全局变量是等价的
 一，暗示全局变量
 一切未经声明的变量都会归window所有，成为window的属性
 二，一切用var声明的全局变量都是window的属性
 那么有声明和没有声明的全局变量都会成为window的属性，有什么区别呢？
 没有声明的变量可以被删除，而声明的不可以



```jsx
1.  a = 123;
2.  console.log(window.a === a)  // true
3.  delete window.a;
4.  console.log(window.a); // undefiend
5.  var b = 123;
6.  delete window.b;
7.  console.log(window.b); // 123
```

三，**而用let ，const 和 calss声明的全局变量不归window所有**



### this

1.函数预编译过程this --> window

```js
var a = 5;
function test() {
		a = 0;
		console.log(a);
		console.log(this.a);//this --> window
		var a;
		console.log(a);
}
```

2.全局作用域里this --> window

3.call/apply 可以改变函数运行时this指向

4.obj.fun();	fun()里面的thi指向obj



### arguments.callee

指向函数自身,自调用

```js
//阶乘示例
var sum = (function(n){
		if(n == 1){
		return 1;
		}
		return n * arguments.callee(n - 1);
}(10))
```



### 对象的深度克隆

```js
function deepClone(Target, Origin){
            var Target = Target || {};//防止用户未传第一个参数
            for (const prop in Origin) {
                if (Origin.hasOwnProperty(prop)) {
                    if(typeof(Origin[prop]) == "Object" && typeof(Origin[prop]) != "null"){
                        Target[prop] = (Object.prototype.toString.call(Origin[prop]) == "[Objec Array]") ? [] : {};
                        deepClone(Target[prop], Origin[prop]);
                    }else {
                        Target[prop] = Origin[prop];
                    }
                }
            }
            return Target;
        }
```



### 数组

数组常用的方法

+ 改变原数组

  push | pop | shift |unshift |sort | reverse

  splice

+ 不改变原数组的方法

  concat | join		split | toStrig | slice

**原型上的push方法**

```js
Array.prototype.push = function(){
  	for(var i = 0; i < arguments.length; i ++){
      	this[this.length] = arguments[i];
    }
  	return this.length;
}
```



**splice方法**

```js
var arr = [1,2,3,4,5,6,7];
arr.splice("从第几位开始切","切多少长度","在切口处添加的数据");
```



sort方法

```js
//1.必须写俩形参数 两个行参就是取的数组的两个值
//2.看返回值 1)当返回值为负数时,那么前面的数放在前面
//					2)为正数,那么后面的数载前面
//					3)为0,不动

var arr = [20,13,24,15,3,9];

//这里的这个函数会自己在需要的时候执行,不需要执行
arr.sort(function(a, b)){
		//return a - b;升序
		//return b - a;降序
    //return Math.radom(a, b) - 0.5; 随机乱序
		return b - a;
}
```



### 类数组

​	

```js
        var obj = {
            '1' : 'a',
            '2' : 'b',
            '3' : 'c',
            lenght : 3,

            //下面这两个方法都写上就很像数组了
            push : Array.prototype.push,
            splice : Array.prototype.splice

            //属性要为索引属性 必须要有length属性 最好加上push方法
        }
        
        
        //阿里试题
        var obj = {
            '2' : 'a',
            '3' : 'b',
            length : 2,
            push : Array.prototype.push
        }

        obj.push('c');
				obj.push('d');
				//obj --> ?
```



### 细致的区分数据类型

```js
				//type更详细的区分数据类型
        function type(target){
            var data_type = {
                "[object Array]" : "array",
                "[object Object]" : "object",
                "[object Number]" : "number - object",
                "[object Boolean]" : "boolean - object",
                "[object String]" : "string - object"
            }

            if(target === null){
                return null;
            }
            if(typeof target == "object"){
                var str = Object.prototype.toString.call(target);
                return data_type[str];
            }else{
                return typeof target;
            }
        }
```



### 数组去重

```js
        //数组去重
        Array.prototype.unique = function(){
            var temp = {},
                arr = [],
                len = this.length;
            for(var i = 0; i < len; i ++){
                if(!temp[this[i]]){
                    temp[this[i]] = "abc";
                    arr.push(this[i]);
                }
            }
            return arr;
        }
```



### 不可配置的属性

暗示全局变量和var声明的变量都属于window,但是暗示全局变量是可以delete的,而var声明的变量是不可以delete

所以var出来的变量叫不可配置属性



### try{}catch{error}

里面的错误error只有name和massage两个属性

在try里面发生的错误,不会执行错误后的try里面的代码,但是不会影响try{}以外的



Error.name的六种值对应的信息:

1.EvalError: eval()的使用与定义不一致

2.RangeError:数值越界

3.RangeError: 非法或不能识别的引用数值

4.SyntaxError: 发生语法解析错误

5.TypeError: 操作数类型错误

6.URIError: URI处理函数使用不当



### es5严格模式

"use strict"

两种用法

+ 全局严格模式
+ 局部函数严格模式(推荐)

**不支持with eval arguments callee func.caller,变量赋值前必须声明,局部this必须被赋值**

**(Person.call(null/undefined)赋值是什么就是什么),拒绝重复属性和参数**



# DOM(document Object Model)

# 常用操作总结

**使用 元素节点.style.cssText 来设置多个样式，每个样式由分号( ；)隔开。**

```js
window.onload = function () {
    var box = document.getElementById("box");
    box.style.cssText = "width: 300px; background-image: url(
                                         testImg/test01_2.jpg);";
}


```



### 回调函数

A callback is a function that is passed as an argument to another function and is executed after its parent function has completed.

回调函数是一个作为变量传递给另外一个函数的函数，它在主体函数执行完之后执行。

```js
        function a(callBack){
            callBack();
            console.log('我是主函数');
        }

        function b(){
            setTimeout(() => {
                console.log("我是回调函数");
            }, 3000);
        }

        a(b);
//输出
//我是主函数
//我是回调函数
```



上面的代码中，我们先定义了主函数和回调函数，然后再去调用主函数，将回调函数传进去。
定义主函数的时候，我们让代码先去执行callback()回调函数，但输出结果却是后输出回调函数的内容。这就说明了主函数不用等待回调函数执行完，可以接着执行自己的代码。所以一般回调函数都用在耗时操作上面。比如ajax请求，比如处理文件等。



### 利用协议限定符阻止a标签的默认事件

阻止a标签的默认事件： <a href = “javascript:void(0);">











## 常用的一些节点或者元素节点的遍历属性



```
遍历节点树:
	parentNode -> 父节点 (最顶端的parentNode为#document)
	childNodes -> 子节点们
	firstChild -> 第一个子节点
	lastChild -> 最后一个子节点
	nextSibling -> 后一个兄弟节点 previousSibing -> 前一个兄弟节点
	
基于元素节点树的遍历
	parentElement -> 返回当前元素的父元素节点(IE不兼容)
	children -> 只返回当前元素的元素子节点
	node.childElementCount === node.children.length当前元素节点的子元素节点个数
	firstElementChild -> 返回的是第一个子元素节点(IE不兼容)
	lastElementChild -> 返回的是最后一个子元素节点(IE不兼容)
	nextElementSibling/previousElementSibling
```



## 节点的四个属性和一个方法

**节点的四个属性**

+ NodeName	

  元素的标签名,以大写形式表示,只读

+ nodeValue

  Text节点或Comment节点文本内容,课读写

+ nodeType

  该节点的类型,只读

+ attributes

  Element节点的属性集合

  

**节点的一个方法**

Node.hasChildNodes();



## nodeType的值

**节点的类型**

+ 元素节点 -- 1
+ 属性节点 -- 2
+ 文本节点 -- 3
+ 注释节点 -- 8
+ document -- 9
+ DocumentFragment -- 11



## 元素节点的增插删替

**增**

+ Document.createElement();
+ Document.createtTexNode();
+ Document.createComment();
+ Document.createDocumentFragment();

**插**

+ ParentNode.appendChild();
+ ParentNode.insertBefore(a,b);

**删**

+ Parent.removeChild();

+ Child.remove();

替换

+ Parent.replaceChild(new, origin);

**document.body.appendChild(div);**



## 元素节点属性和方法

**元素节点的一些属性**

+ innerHTML
+ innerText(火狐不兼容)/textContent(老IE不好使)

**元素节点的一些方法**

+ ele.setAttribute();//设置属性
+ ele.getAttribute();//获取属性



## Date对象方法

| Date()        | 放回当日的日期和时间                 |
| :------------ | ------------------------------------ |
| getDate()     | 从Date对象放回一个月中的某一天(1-31) |
| getDay()      | 从Date对象放回一周中的某一天(0-6)    |
| getMonth()    | 从Date对象放回月份(0-11)             |
| getFullYear() | 从Date对象以四位数字放回年份         |



## JS定时器

setInterval();

setTimeout();

clearInterval();

clearTimenout();

全局对象window上的方法,内部函数this指向window

+ 注意:setInterval("func()", 1000);第一个参数是可以直接写js的



## 距离相关方法

### 查看滚动条的滚动距离

Window.pageXOffset/pageYOffset

+ IE8及IE8一下不兼容

Document.body/documentElement.scrollLeft/srollTop

+ 兼容袭比较混乱,用时取两个值相加,因为不可能存在两个同时有值

封装兼容性方法,秋滚动轮滚动距离getScrollOffset()



### 查看视口的尺寸

*Window.innerWidth/innerHeight*

​	IE8及IE8一下不兼容

*Document.documentElement.clientWidth/clientHeight*

​	标准模式下,任意浏览器动兼容

*document.body.clientWidth/clientHeight*

​	适用于怪异模式下的浏览器

封装兼容性方法,放回浏览器视口尺寸*getViewportOffset()*



### 查看元素的几何尺寸

*domEle.getBoundingClientRect();*

兼容性很好

该方法返回一个对象,对象里面有left,top,right,bottom等属性.left和top代表该元素左上角的X和Y坐标,

right和bottom代表元素左下角X和Y坐标

height和width属性老版本IE并未实现

**返回的结果并不是"实时的"**



### 查看元素的位置

*dom.offsetLeft, dom.offsetTop*

对于无定位父级的元素,放回相对文档的坐标.对于有定位父级的返回相对于最近的有定位的父级的坐标

*dom.offsetParent*

返回最近的有定位的父级,如无返回body,body.offsetParent

eg:求元素相对于文档的坐标getElementPosition



## 让滚轮滚动

window上有三个方法

scroll(),scrollTo() | scrollBy();

三个方法功能类似,用法都是将x,y坐标传入.即实现让滚动轮滚动到当前位置.

区别:scrollBy()会在之前的数据基础上做累加

eg:利用scrollBy() 快速阅读的功能



## 直接读写元素CSS属性

**dom.style.prop**只能通过dom.style方法写入,没有其他任何办法了

​	可以读写行间样式,没有兼容性问题,碰到float这样保留字属性,前面加css

​	eg:float -->cssfloat

​	复合属性必须拆解,组合单词变成小驼峰写法

​	写入的值必须时字符串格式

​	

### 查询计算样式window.getComputedStyle(ele, null);

**可以查询到元素使用的全部三种属性**

**虽然计算样式只读 但是超级常用,可以配合ele.style = "Attribute : aaa";**

**这里的第二个参数时用来填伪元素的**,可以填null也可以省略



返回的计算样式值时绝对值,没有相对单位

IE8及IE8以下不兼容



## 绑定事件的三个原生方法

*1.ele.onclick = function (event){}*

​	程序this指向是dom元素本身

*2.obj.addEventListenter(type, func(){}, false);*

​	程序this指向是dom元素本身

*3.obj.attachEvent('on' + type, func);* -->**这个方法是针对IE8一下的,IE9以上上面两个方法都适用**

​	程序this指向window

封装兼容性的*addEvent(elem, type, handle);*方法

```js
    function addEvent(elem, type, handle) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handle, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, function () {
                handle.call(elem);
            });
        } else {
            elem['on' + type] = handle;
        }
    }
```



## 事件处理模型

**事件冒泡捕获存在于结构上,而非视觉上,是不是重叠没有直接关系**

**事件冒泡**

​	结构上(非视觉上)嵌套关系的元素,会存在事件冒泡的功能,即同一事件,自子元素冒泡向父元素.(自底向上)

**事件捕获**

​	结构上(非视觉上)嵌套关系的元素,会存在事件补货的功能,即同一事件,自父元素补货至子元素(事件源元素).(自顶向下)

​	IE没有捕获事件

**触发顺序 先捕获后冒泡**

focus | blur | change | submit | reset | select等事件不冒泡



**兼容性取消事件冒泡**

```js
function stopBubble(event) {
		if(event.stopPropagation) {
				event.stopPropagetion();
		} else{
				event.cancelBubble = true;
		}
}
```



**兼容阻止默认事件**

```js
function cancelHandle(event) {
		if(event.preventDefault) {
				event.preventDefault();
		} else{
				event.returnValue = false;
		}
}
```





**事件委托**

利用事件冒泡,是事件源对象进行处理

优点

+ 性能不需要循环所有的元素一个个绑定事件
+ 灵活,当有新的子元素时不需要重新绑定事件

```js
    var ul = document.getElementsByTagName('ul')[0];
    ul.onclick = function(e){
        var event = e || window.event;
        var target = event.target || event.srcElement;
        console.log(target.innerText);
    }
```



## 事件分类

**鼠标事件**

click | mousedown | mousemove | mouseup | contextmenu | mouseover | mouseout

mouseenter | mouseleave 



用button来区分鼠标的按键,0/1/2

DOM3标准规定:click事件只能监听作践,只能通过mousedown和mouseup来判断鼠标键、

如何解决mousedown和click的冲突



```
方块拖拽
```

## 键盘事件

**keydown keyup keypress**

keydown --> keydown --> keyup

**keydown和keypress的区别**

​	keydown可以响应任意键盘按键,keypress值可以响应字符类键盘按键

​	keypress返回ASCII码,可以转换成相应字符



**window.load是在页面全部加载完了才触发onload,只能用来处理特殊需要**



## JSON

JSON是一种传输数据的格式(以对象为样板,本质上就是对象,但用途有区别,对象就是本地用的,json是用来传输的)



**JSON.parse(); string --> json**

**JSON.stringify(); json --> string**





## JS加载时间线

1.创建Document对象,开始解析web页面.解析HTML元素和他们问呗内容后添加Elment对象和Text节点到文档中阶段document.readyState = 'loading'

2.遇到link外部css,创建线程加载,并继续解析文档

3.***遇到script外部js,并且没有设置async,defer,浏览器加载并阻塞,等待js加载完成时并执行该脚本,然后继续解析***

4.遇到script外部js,并且设置有async,defer浏览器创建线程加载,并继续解析文旦.对于async属性的脚本,脚本加载完成后立即执行.(异步禁止使用document.write() 这个函数会重写页面,禁止)

5.遇到img等,先正常解析dom结构,然后浏览器异步加载src,并且继续解析文档

6.当文档解析完成,document.readyState = 'interactive'

7.文档解析完成后,所有设置有defer的脚本会按照顺序执行(同样禁止使用document.write() 会重写页面,禁止)

8.**document对象触发DOMContentLoaded事件**,这也标志着程序执行从同步脚本执行阶段转化为事件驱动阶段

9.但所有async的脚本加载完成并执行后,img加载完成后,document.readyState= 'complete' window对象触发事件

10.从此,以异步响应方式处理用户输入,网络事件等



```js
console.log(document.readyState);
document.onreadystatechange = funtion(){
		console.log(document.readyState);
}
document.addEventListener('DOMContentLoaded', function(){
		console.log('在DOMContentLoaded后面执行操作是最好的');
}, flase);
```



## RegExp(正则表达式)

**用于匹配特殊字符或有特殊搭配原则的字符的最佳选择**

+ **方括号**

+ **量词**

+ **元字符**

  

**在 JavaScript 中，正则表达式常用于两个*字符串方法*：**search() 和 replace()。

+ *search()* 方法使用表达式来搜索匹配，然后返回匹配的位置。

+ *replace()* 方法返回模式被替换处修改后的字符串。



**百度题:**

```js
var str = "10000000000000";
    var reg = /(?=(\B)(\d{3})+$)/g;
    str.replace(reg, ".");
    console.log(str.replace(reg, "."));
```



### 正则replace()方法

```js
    
    var phoneNum = "13587774654";
    var numReg = /^(135)(\d{8})$/;
    var newArr = phoneNum.replace(numReg, "$&");//测试 $1 $2 ...就明白了,是函数的情况下直接返回需要的表达式就行了
    console.log(newArr);

		//第二个参数为函数的情况,必须要返回需要的表达式,否则就是undefined
		var phoneNum = "13587774654";
    var numReg = /^(135)(\d{8})$/;
    var newArr = phoneNum.replace(numReg, function ($, $1, $2) {
        return $;
        // return $1;
        // return $2;
        // 这里只看顺序,第一位为正则匹配,第二位为第一个子表达式,第三位为第二个子表达式,依次
    });
    console.log(newArr);
```



