# 好客租房 flutter 项目

## 1 课程简介

### 1.1 为什么学习 flutter 项目

1. 市场需要 flutter—— android 和 ios 使用一套设计图，却需要两批人来开发。目前 flutter 开始支持 web 和 桌面开发。

2. Flutter 使用更好的语言——Dart语言。 Javascript 方便调试，有时性能不能满足需求，语言特性更新依赖浏览器厂商的支持；java 和 oc 性能好，但是调试不如 Javascript 方便。Dart 语言同时支持 JIT（just in time）和 AOT（ahead of time）两种模式。开发时使用Dart的JIT运行模式，可以做到，修改的效果及时展现到页面上；产品发布后，使用Dart的AOT运行模式，保证APP的性能最优。从而极大的**提高 APP 的开发效率**。

3. Flutter 开箱即用—— flutter 提供丰富的组件，能够快速的开发出 **原生 app**。

4. 以项目的方式学习—— 学到更实用的知识。

  

### 1.2 课程内容

**项目知识点：**

- 使用第三方组件

- **通用组件封装**

- 使用静态资源	

  - 本地图片
  - 网络图片
  - 使用自带 icon
  - 使用字体 icon
  - 网络图片缓存超时处理

- 本地存储及 store 封装

- 数据管理 scoped_model							

- 网络请求 及 dio_http 封装

- 序列号及反序列化半自动生成实体类

- 图片上传

- app icon 及 启动页

  

**面向群体：**

- 有一定编程基础—— 会一门其他编程语言
- 有一定 flutter 基础—— 学完 [Flutter 框架入门](https://xuexi.boxuegu.com/video.html?courseId=1132&moduleId=102351&type=PATH&phaseId=737),或者通过[官网](https://flutter.dev/)可以安装 flutter 并运行demo。
- 希望通过项目来强化 flutter 相关技术



**目标：**

能够独立完成常规的 flutter 项目



### 1.3 项目简介

**项目路径**

- 基础回顾

- 项目框架

- 静态页面

- 前后端联调

- 构建打包

  

**包含的页面**

- 登陆页

- 注册页
- 首页
  - 首页tab
  - 搜索tab
  - 咨询tab
  - 我的tab
- 搜索页
- 房屋管理
- 添加房屋
- 房屋详情
- 设置



## 2 基础回顾

1. 无状态组件 vs 有状态组件

   ```dart
   //无状态组件
   class MyText extends StatelessWidget {
   	// 组件的参数
   	final String text;
   
   	// 组件的构造函数
   	MyText(this.text);
   
     //组件的实现部分
   	Widget build(context) {
   		return new Text(
   			text,
   			textStyle: new TextStyle(fontSize: 40.0),
   		);
   	}
   }
   ///////////////////////////////////////////////////////////////////////
   //有状态组件
   class Counter extends StatefulWidget {
     	// 组件的参数
   	final String title;
     Counter({Key key, this.title}) : super(key: key);
   
      // 没有 build 方法，但有 createState() 方法。
     @override
     _MyHomePageState createState() => new _MyHomePageState();
   }
   
   class _MyHomePageState extends State<MyHomePage> {
     //状态
   	int counter = 0;
   
   	void increaseCount() {
    		setState(() {
    			this.counter++;
    		}
    	}
   
   	//build 方法
   	Widget build(context) {
   		return new RaisedButton(
   			onPressed: increaseCount,
   			child: new Text('点击+1'),
   		);
   	}
   }
   ```

2. Material 组件 和 Cupertino 组件

   > flutter 是开箱即用的

   Material 组件 就是 android 风格的组件

   Cupertino 组件 就是 ios 风格的组件

3. 常用组件

   Text - 用于显示文字的组件
   Image -用于显示图片的组件
   Icon - 用于显示图标，有内置的 Material 和 Cupertino 风格的图标
   Container - 类似 html 中的 div。可以很方便的添加 内外边距，对齐，背景，边角的特性。
   Row, Column - 用于水平和垂直方向的多组件展示。使用 flex 布局。
   Stack - 用于z轴方向的多组件展示。可以把一个组件堆叠到另外一个组件上面。类似 css 中的 Position。
   Scaffold - 页面的基本组件, 提供了基本的页面结构。包括 顶部 title 及功能按钮，顶部tab，底部tab，导航按钮等。



## 3 项目框架

### 3.1 初始化项目

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7rqj7ji3mj30qu1aok3j.jpg" alt="image-20191009102305715 " style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7rql6re3sj30ru1f4ajm.jpg" alt="image-20191009102504777" style="zoom:33%;" /></div>

**步骤：**

1. 打开vscode 

2. 初始化项目【菜单】— 【查看】—【命令面板】— 【Flutter：New Project】

3. demo 文件夹分析

   ![image-20191009104401630](https://tva1.sinaimg.cn/large/006y8mN6ly1g7s1j7enq0j307e08maa2.jpg)

4. 打开模拟器【菜单】— 【查看】—【命令面板】— 【Flutter：Launch Emulator】

5. 在 ios 模拟器上运行 demo【菜单】— 【调试】—【启动调试】

6. 在 android 模拟器上运行 demo

7. **demo 代码分析**

   1. 引入 flutter 依赖
   2. 程序入口
   3. 无状态组件
   4. 有状态组件

**注意：**

1. 如果没有命令Flutter：New Project，则说明 flutter 安装有问题
2. 如果没有命令 Flutter：Launch Emulator，则说明模拟器安装有问题

### 3.2 编写一个简单页面-准备

**知识点：**

MaterialApp:  封装了应用程序实现 Material Design 所需要的一些 widget。

Scaffold：Material Design 布局结构的基本实现。

Appbar：一个Material Design应用程序栏，由工具栏和其他可能的widget组成。

```dart
MaterialApp(
  home: Scaffold(
    appBar: AppBar(
      title: const Text('Home'),
    ),
  ),
)
```

[组件细节](https://flutterchina.club/widgets/material/)

**功能拆分：**

![image-20191011100347079](https://tva1.sinaimg.cn/large/006y8mN6ly1g7u17p75lmj30zm0pyafu.jpg)

### 3.3 编写一个简单页面-实现

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7rz6g19lqj30dx0pkq5e.jpg" alt="image-20191009152217329" style="zoom: 50%;" />

**步骤：**

1. 添加 PageContent 组件
   1. 新建文件 /widgets/page_content.dart
   2. 添加 material 依赖
   3. 编写无状态组件
   4. 添加 name 参数
   5. **使用 Scaffold**
2. 添加 home 页面
   1. 新建文件 /pages/home/index.dart
   2. 添加 material, page_content依赖
   3. 编写无状态组件
   4. 使用 PageContent
3. 添加 Application 应用根组件
   1. 新建文件 /application.dart
   2. 添加依赖
   3. **使用 MaterialApp**
4. 测试

### 3.4 安装 fluro 并添加登陆页面

效果：

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7s21xvmubj30dx0pkaci.jpg" alt="image-20191009170147237" style="zoom:50%;" />

步骤：

1. 了解 [fluro](https://github.com/theyakka/fluro)

   1. 简单
   2. 支持参数通配符 /room/:id
   3. 简化自定义动画

2. 添加依赖

   ```yaml
    dependencies:
      fluro: "^1.5.1"
   ```

3. 添加 /pages/login.dart

4. 参考 /pages/home/index.dart 完善登陆页。

### 3.5 如何配置fluro

**问题：**

如何配置fluro？

**分析：**

+ 看[官方文档](https://github.com/theyakka/fluro)
  + 声明 路由
  + 配置 路由
  + 关联 路由 和 materialApp
  + 使用 路由
+ 分析示例代码
  + 编写**路由**配置文件
  + 在 Application 中配置**路由**—声明/配置/关联 路由
  + 测试**路由**

**结论**：

1. 编写**路由**配置文件
   1. 创建 routes.dart 文件 并编写Routes类的基本结构
   2. 定义路由名称
   3. 定义路由处理函数
   4. 编写函数 configureRoutes 关联路由名称和处理函数
2. 在 Application 中配置**路由**
   1. 定义 router 
   2. 通过调用configureRoutes 配置 router
   3. 在 MaterialApp 中使用 router
3. 测试**路由**
   1. 在 PageContent  中添加跳转按钮

### 3.6 配置fluro

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7sr0iwnf6j30dx0pk40z.jpg" alt="image-20191010072522174" style="zoom:50%;" />

**步骤：**

1. 编写**路由**配置文件
   1. 创建 routes.dart 文件 并编写Routes类的基本结构
   2. 定义路由名称
   3. 定义路由处理函数
   4. 编写函数 configureRoutes 关联路由名称和处理函数
2. 在 Application 中配置**路由**
   1. 定义 router 
   2. 通过调用configureRoutes 配置 router
   3. 在 MaterialApp 中使用 router
3. 测试**路由**
   1. 在 PageContent  中添加跳转按钮



参考官网代码：

```dart
//定义路由处理函数
var usersHandler = Handler(handlerFunc: (BuildContext context, Map<String, dynamic> params) {
  return UsersScreen(params["id"][0]);
});

//关联路由和处理函数
void defineRoutes(Router router) {
  router.define("/users/:id", handler: usersHandler);
}
```

### 3.7 优化路由配置

**问题**：

错误页面如何处理？带参数的页面如何处理？

**效果**：

![image-20191010081409711](https://tva1.sinaimg.cn/large/006y8mN6ly1g7ssfaklr3j30l80c9mzg.jpg)



**步骤：**

1. 错误页面处理
   1. 在 /pages 目录添加 not_found.dart 文件
   2. 实现 NotFoundPage
   3. 在 /routes.dart 添加 _notFoundHandler
   4.  在 /routes.dart 的 configureRoutes 中添加 router.notFoundHandler=_notFoundHandler;
   5. 修改 PageContent 测试
2. 带参数页面处理
   1. 在 /pages 目录添加 room_detail/index.dart 文件
   2. 实现 RoomDetailPage
   3. 在 /routes.dart 添加 _notFoundHandler
   4.  在 /routes.dart 的 configureRoutes 中添加 RoomDetailPage;
   5. 修改 PageContent 测试

**补充**：

实现页面步骤

1. 添加依赖
2. 编写组件模板 有状态组件/无状态组件
3. 如果有参数添加组件参数
4. 完善 build 方法

## 4 静态页面

### 4.1 登陆页-页面分析

**效果：**

![006y8mN6ly1g7u4j137ksj30cm0myaah](https://tva1.sinaimg.cn/large/006y8mN6ly1g7u8t9pyggj30cm0myq3f.jpg)

**页面拆分：**

![image-20191011121734395](https://tva1.sinaimg.cn/large/006y8mN6ly1g7u52u1l34j30u20u0wqj.jpg)



+ scafford
  + appBar	
    + title— Text
  
  + body
    + 用户名— TextField
    + 密码— TextField
    + 登陆按钮— RaisedButton
    + 注册链接— Row[Text,FlatButton]



### 4.2 登陆页-主体结构

**效果：**

![image-20191011142754560](https://tva1.sinaimg.cn/large/006y8mN6ly1g7u8ufrl2gj30cm0my76l.jpg)

**步骤：**

1. 添加 Scaffold
2. 完成 appBar 部分
3. 完成 body 部分
   1. 用户名
   2. 密码
   3. 登陆按钮
   4. 注册链接
4. 主体颜色 — theme
5. 测试

### 4.3 登陆页-密码显示隐藏

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7u97z4cyoj30cm0mydib.jpg" alt="image-20191011144055228" style="zoom:50%;" />

**步骤：**

1. 将无状态组件改成有状态组件— 右键 重构
2. 添加可点击的图标— IconButton
3. 添加状态— showPassword
4. 根据状态展示不同内容
5. 给图标添加点击事件
6. 测试



### 4.4 登陆页-细节优化

效果：

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7u8uurjgbj30cm0myaah.jpg" alt="006y8mN6ly1g7u4j137ksj30cm0myaah" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7u97z4cyoj30cm0mydib.jpg" alt="image-20191011144055228" style="zoom:50%;" />
</div>

问题及解决方案：

1. 【去注册】颜色问题

   添加style

3. 上下间距问题？

   添加 Padding

4. 边距/异形屏幕问题？

   使用 SafeArea

5. 垂直高度不足问题？

   使用 ListView 替代 Column

5. 登陆按钮宽度和颜色问题？

   宽度：SizedBox 或者父级固定宽度

   颜色：手动设置

6. 使用 ListView 替代 Column

   


### 4.5 注册页-添加

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ulcpq74jj30p819wgte.jpg" alt="image-20191011214036934" style="zoom:50%;" />

**步骤：**

1. 添加文件 /pages/register.dart
2. 将login.dart 文件拷贝到 register.dart
3. 修改类名称
4. 修改 title
5. 在路由中添加 register
   1. 添加 route name
   2. 添加 route handler
   3. 在 configureRoutes 中关联 name 和router
6. 修改了组件类型，需要重启app后测试

### 4.6 注册页-完善

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ulijpmjrj30p819wjz5.jpg" alt="image-20191011214615552" style="zoom:50%;" />

**步骤：**

1. 删除密码显示逻辑
2. 添加确认密码
3. 修改按钮及下方链接到文案
4. 优化登陆注册跳转，使用 Navigator.pushReplacementNamed

### 4.7 首页-tab-分析

设计图分析：

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ullg1hwmj30p819w1c4.jpg" alt="image-20191011214902143" style="zoom:20%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ullvo01tj30p819waui.jpg" alt="image-20191011214928030" style="zoom:20%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ulm2aciij30p819wwzh.jpg" alt="image-20191011214939606" style="zoom:20%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ulme27ufj30p819wtpq.jpg" alt="image-20191011214952908" style="zoom:20%;" />
</div>



结论：

1. 首页共用 tab 按钮区域 

2. tab 内容区的 appBar 不一样

3. 4 个 tab 内容区不一样

4. 可以使用 flutter 自带组件 [BottomNavigationBar](https://api.flutter.dev/flutter/material/BottomNavigationBar-class.html) 实现

   1. 需要准备 4 个 tab 内容区（tabView）

   2. 需要准备 4 个 BottomNavigationBarItem

      


### 4.8 首页-tab-编码

效果：

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qohfmr6wj30p819w111.jpg" alt="image-20191011230510193" style="zoom:50%;" />

步骤：

1. 将 HomePage 改成有状态组件
2. 使用准备好的数据
3. 使用[官网 demo 代码](https://github.com/blankapp/flutter-widget-livebook/blob/master/uiexplorer/lib/views/slice_bottom_navigation_bar/slice_bottom_navigation_bar.dart)
4. 删除 appBar
5. 修改 Scaffold.body
6. 修改 Scaffold.bottomNavigationBar



参考：官网 tab 代码

```dart
import '../../includes.dart';

class SliceBottomNavigationBar extends StatefulWidget implements SliceExample {
  @override
  String get name => 'SliceBottomNavigationBar';

  static const TextStyle optionStyle = TextStyle(fontSize: 30, fontWeight: FontWeight.bold);
  static const List<Widget> _widgetOptions = <Widget>[
    Text(
      'Index 0: Home',
      style: optionStyle,
    ),
    Text(
      'Index 1: Business',
      style: optionStyle,
    ),
    Text(
      'Index 2: School',
      style: optionStyle,
    ),
  ];

  @override
  _SliceBottomNavigationBarState createState() => _SliceBottomNavigationBarState();
}

class _SliceBottomNavigationBarState extends State<SliceBottomNavigationBar> {

  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('BottomNavigationBar Sample'),
      ),
      body: Center(
        child: SliceBottomNavigationBar._widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            title: Text('Home'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.business),
            title: Text('Business'),
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.school),
            title: Text('School'),
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.amber[800],
        onTap: _onItemTapped,
      ),
    );
  }
}
```



### 4.9 首页-tabIndex-分析

设计图分析：



<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7uomnsrgij30tu0yk7n1.jpg" alt="image-20191011233357243" style="zoom:50%;" />



**结论：**

首页第一个tab（tabIndex）共5个区域，对应5个不同的模块。

1. 顶部区域—— searchBar
2. 轮播图区域—— IndexSwipper
3. 导航区域—— IndexNavigator
4. 房屋推荐区域—— IndexRecommend
5. 资讯区域—— Info

### 4.10  首页-tabIndex-页面结构

**效果：**

  

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7val30qscj30p819wn4s.jpg" alt="image-20191012121340467" style="zoom:50%;" />

**步骤：**

1. 新建文件 /pages/home/tab_index/index.dart
2. 添加依赖，编写无状态组件
3. 简化实现顶部区域--appBar
4. body 部分包含多个组件且可以滚动—使用 ListView
5. 在 HomePage 中使用 TabIndex

### 4.11  首页-tabIndex-轮播图-准备

**问题：**

是否有第三方组件满足轮播图的需求？

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ullg1hwmj30p819w1c4.jpg" alt="image-20191011214902143" style="zoom:20%;" />



**分析：**

有 [flutter_swiper](https://github.com/best-flutter/flutter_swiper)!

**用法：**

```dart
//1. 安装依赖
// flutter_swiper : ^1.1.6

//2. 引入依赖
  import 'package:flutter_swiper/flutter_swiper.dart';

//3. 配置Swiper
  Swiper(
        itemBuilder: (BuildContext context,int index){
          return new Image.network("http://via.placeholder.com/350x150",fit: BoxFit.fill,);
        },
        itemCount: 3,
        pagination: new SwiperPagination(),
        control: new SwiperControl(),
      )
```



**图片资源：**

  'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2tdgve1j30ku0bsn75.jpg',

  'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2whp87sj30ku0bstec.jpg',

  'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2tl1v3bj30ku0bs77z.jpg',

图片宽750px，高424px；

**注意：flutter 如何使用网络图片**

### 4.12  首页-tabIndex-轮播图-实现

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7vgvko2fuj30p819wton.jpg" alt="image-20191012155119426" style="zoom:50%;" />





**步骤：**

1. 准备组件框架代码
   1. 新建文件 /widgets/common_swipper.dart
   2. 添加依赖 material 和 flutter_swiper
   3. 准备图片数据
   4. 编写无状态组件
   5. 添加 images 参数 并在构造函数中赋值
2. 编写 swiper 核心代码
   1. 参照官网使用 swipper
   2. 修改 itemBuilder 和 itemCount
   3. **Swiper 父组件指定高度**
   4. 删除 Swiper.control
3. 测试
   1. 在 tabIndex 中使用 CommonSwiper

###  4.13 首页-tabIndex-导航-准备

**结构分析：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ullg1hwmj30p819w1c4.jpg" alt="image-20191011214902143" style="zoom: 25%;" />

+ indexNavigator--Row
  + item--Column
    + Image—Image.asset
    + 整组— Text
  + item--Column
    - Image—Image.asset
    - 合租— Text
  + item--Column
    - Image
    - 地图找房— Text
  + item--Column
    - Image
    - 去出租— Text



**资源准备：**

1. 本地图片准备

   1. 将图片拷贝到 /static/images/ 目录

   2. 在 pubspec.yaml 中引入图片

      ```ymal
        assets:
      
        # 首页——第一个tab-导航图标
          - static/images/home_index_navigator_total.png
          - static/images/home_index_navigator_map.png
          - static/images/home_index_navigator_share.png
          - static/images/home_index_navigator_rent.png
      ```

      

2. 数据准备

   ```dart
   // /pages/home/tab_index/index_navigator_item.dart
   
   import 'package:flutter/material.dart';
   
   class IndexNavigatorItem {
     final String title;
     final String imageUri;
     final Function(BuildContext contenxt) onTap;
   
     IndexNavigatorItem(this.title, this.imageUri, this.onTap);
   }
   
   List<IndexNavigatorItem> indexNavigatorItemList = [
     IndexNavigatorItem('整组', 'static/images/home_index_navigator_total.png',
         (BuildContext context) {
       Navigator.of(context).pushReplacementNamed('login');
     }),
     IndexNavigatorItem('合租', 'static/images/home_index_navigator_share.png',
         (BuildContext context) {
       Navigator.of(context).pushReplacementNamed('login');
     }),
     IndexNavigatorItem('地图找房', 'static/images/home_index_navigator_map.png',
         (BuildContext context) {
       Navigator.of(context).pushReplacementNamed('login');
     }),
     IndexNavigatorItem('去出租', 'static/images/home_index_navigator_rent.png',
         (BuildContext context) {
       Navigator.pushNamed(context, 'login');
     }),
   ];
   
   
   ```

   

### 4.14 首页-tabIndex-导航-实现

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7vkg5ism6j30p819w7i6.jpg" alt="image-20191012175455974" style="zoom:50%;" />

**步骤：**

1. 添加文件 /pages/home/tab_index/index_navigator.dart
2. 添加依赖 material 和 index_navigator_item
3. 编写无状态组件
4. 完成页面结构
5. 测试
6. 调整细节

### 4.15 组件 CommonImage 封装-分析

**问题：**

轮播图的网络图片偶尔出现超时，怎么解决？

如果涉及图片方面的优化，我们是不是需要修改很多处？

**结论：**

自己封装一个图片组件！

**细化方案：**

1. 根据资源地址是可以区分本地资源和网络的资源的(网络图片地址以 http 开头，本地图片地址以 static 开头)，所以可以共用一个图片组件

2. 网络图片添加本地缓存，延长网络请求超时时间！可以使用第三方组件 [AdvancedNetworkImage](https://github.com/mchome/flutter_advanced_networkimage)

   ```dart
   // 1.安装依赖
   // flutter_advanced_networkimage: ^0.5.0
   
   // 2. 导入依赖
   import 'package:flutter_advanced_networkimage/provider.dart';
   
   // 2.用法
   Image(
     image: AdvancedNetworkImage(
       url,
       header: header,
       useDiskCache: true,
       cacheRule: CacheRule(maxAge: const Duration(days: 7)),
     ),
     fit: BoxFit.cover,
   )
   ```

   

3. 图片组件前期只用支持4个参数。

   1. src — 图片地址 String 必须按参数，可以是网络图片地址或者本地图片地址
   2. width — 图片宽度 double 可选参数
   3. height — 图片高度 double 可选参数
   4. fit— 图片填充方式 BoxFit 可选参数

### 4.16 组件 CommonImage 封装-实现

**效果：**

不影响之前图片展示。

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7vkg5ism6j30p819w7i6.jpg" alt="image-20191012175455974" style="zoom:50%;" />

**步骤：**

1. 准备
   1. 安装 flutter_advanced_networkimage: ^0.5.0 依赖
   2. 添加文件 /widgets/common_image.dart
   3. 引入依赖
   4. 编写 正则 根据图片地址判断是网络图片还是本地图片
2. 编写框架代码
   1. 编写无状态组件
   2. 完善组件参数 src width height fit
3. 完成核心逻辑
   1. 如果是网络图片，使用 flutter_advanced_networkimage
   2. 如果是本地图片，使用 Image.asset
   3. 返回 Container
4. 使用 CommonImage

### 4.17 首页-tabIndex-推荐-准备

分析：

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ullg1hwmj30p819w1c4.jpg" alt="image-20191011214902143" style="zoom: 50%;" />



**组件结构：**

+ recommond—container 【背景色，左右边距】，column
  + header—row，
    + 房屋推荐
    + 更多
  + body— wrap
    + Container width— （屏幕宽度-10*3）/2
      + item— Row（spacebeteen）
        + content— column
          + 文案--Text
          + 文案--Text
        + 图片— CommonImage

**数据准备：**

1. 准备静态图片

   ​    \- static/images/home_index_recommend_1.png

   ​    \- static/images/home_index_recommend_2.png

   ​    \- static/images/home_index_recommend_3.png

   ​    \- static/images/home_index_recommend_4.png

2. 准备数据代码

```dart
class IndexRecommendItem {
  String title;
  String subTitle;
  String imageUri;
  String navigateUri;

  IndexRecommendItem(this.title,this.subTitle, this.imageUri, this.navigateUri);
}

List<IndexRecommendItem> indexRecommendData = [
  IndexRecommendItem(
      '家住回龙观','归属的感觉', 'static/images/home_index_recommend_1.png', 'login'),
  IndexRecommendItem(
      '宜居四五环', '大都市生活','static/images/home_index_recommend_2.png', 'login'),
  IndexRecommendItem(
      '喧嚣三里屯', '繁华的背后','static/images/home_index_recommend_3.png', 'login'),
  IndexRecommendItem(
      '比邻十号线','地铁心连心', 'static/images/home_index_recommend_4.png', 'login'),
];

```





### 4.18 首页-tabIndex-推荐-编码-主体结构部分

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qogbbjxqj30cm0mygqj.jpg" alt="image-20191014173755745" style="zoom:50%;" />

**步骤：**

1. 准备
   1. 新建文件 pages/home/tab_index/index_recommond_data.dart
   2. 使用上一节准备好的数据
   3. 新建文件 pages/home/tab_index/index_recommond.dart
2. 编写核心代码
   1. 添加依赖，无状态组件，dataList 参数，indexRecommendData 改成常量
   2. 添加背景色及边距
   3. 完善 header 部分
   4. 添加 wrap 
3. 测试

### 4.19 首页-tabIndex-推荐-编码-item 部分

 **效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7xvicgqg7j30cm0myq8e.jpg" alt="image-20191014174845620" style="zoom:50%;" />

**步骤：**

1. 新建文件 pages/home/tab_index/index_recommond_item_widget.dart
2. 添加依赖，无状态组件,data 参数，
3. 编写主体结构
5. 使用并测试
5. 完善细节

### 4.20 首页-tabIndex-资讯-准备

**分析：**


<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qok9zdugj30cm0myafz.jpg" alt="image-20191015153023331" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7yx1hfyarj30cm0mydmm.jpg" alt="image-20191015152719582" style="zoom:50%;" />
</div>



**组件结构：**

+ info— Column
  + header - container
    + title— Text
  + body
    + InfoItemWidget
    + InfoItemWidget
    + InfoItemWidget
    + ...



+ InfoItemWidget —container
  + 内容区-- Row	
    + 图片— CommonImage
    + 文字区—**Expand**, Column
      + **titile— container**
        + title 内容— Text
      + 信息区— row
        + 来源— Text
        + 时间— Text

**注意：**

1. 文字区域可能随屏幕宽度而改变
2. title 自动换行问题

**数据准备：**

1. 准备数据代码

```dart
class InfoItem {
  final String title;
  final String imageUri;
  final String source;
  final String time;
  final String navigateUri;
  const InfoItem({this.title, this.imageUri,this.source,this.time, this.navigateUri});
}

const List<InfoItem> infoData = [
  const InfoItem(
      title:'置业选择 | 安贞西里 三室一厅 河间的古雅别院', 
      imageUri:'https://wx2.sinaimg.cn/mw1024/005SQLxwly1g6f89l4obbj305v04fjsw.jpg', 
      source:"新华网" ,
      time:"两天前",
      navigateUri:'login'
      ),
  const InfoItem(
      title:'置业佳选 | 大理王宫 苍山洱海间的古雅别院', 
      imageUri:'https://wx2.sinaimg.cn/mw1024/005SQLxwly1g6f89l6hnsj305v04fab7.jpg', 
      source:"新华网" ,
      time:"一周前",
      navigateUri:'login'
      ),
  const InfoItem(
      title:'置业选择 | 安居小屋 花园洋房 清新别野', 
      imageUri:'https://wx4.sinaimg.cn/mw1024/005SQLxwly1g6f89l5jlyj305v04f75q.jpg', 
      source:"新华网" ,
      time:"一周前",
      navigateUri:'login'
      ),
];

```



### 4.21 首页-tabIndex-资讯-编码-主体结构

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7yxvmmrwej30cm0my77w.jpg" alt="image-20191015155617687" style="zoom:50%;" />

**步骤：**

1. 准备
   1. 添加文件 /pages/home/info/data.dart
   2. 添加上一节数据到 data.dart 
   3. 添加文件 /pages/home/info/index.dart
   4. 在 index.dart 添加 material 依赖
   5. 添加无状态组件
2. 编写核心代码
   1. 完善 title 部分—**注意 title 部分根据参数显示或隐藏**
   2. 完善 body 部分
3. 测试

**注意：**

1. Container alignment 的使用
2. 可以通过以下方式修改 dart 版本

![image-20191015160440388](https://tva1.sinaimg.cn/large/006y8mN6ly1g7yy4ccymnj3077029jri.jpg)

### 4.22 首页-tabIndex-资讯-编码-item部分

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7yzperje9j30cm0mygru.jpg" alt="image-20191015165929042" style="zoom:50%;" />

**步骤：**

1. 创建文件 /pages/home/info/item_widget.dart
2. 引入依赖，编写无状态组件，添加 data 参数
3. 完成主体结构
4. 测试代码
5. 完善细节



### 4.23 首页-tabInfo

**效果：**

tabInfo 主体部分可以直接使用 tabIndex 的最新资讯

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7z08pcx3vj30cm0my7bq.jpg" alt="image-20191015171803323" style="zoom:50%;" />

**步骤：**

1. 新建文件 /pages/home/tab_info/index.dart
2. 添加 material 依赖，编写有状态组件
3. 完善 header 部分
4. 完善body 部分
5. 测试



### 4.24 首页-tabSearch-分析

**效果：**

![image-20191015221840486](https://tva1.sinaimg.cn/large/006y8mN6ly1g7z8xhni9bj30ci0ekgpt.jpg)



**结构拆分：**

+ searchBar — 后续实现

+ filterBar — 后续实现

+ RoomListItemWidget— container，row

  + commonImage

  + Expanded，column

    + title- container，Text

    + subtitle- container，Text

    + tags - SizedBox,Wrap（CommonTag）

    + price- Text

      

**数据准备：**

1. 数据文件 /pages/home/tab_search/dataList.dart

```dart
class RoomListItemData {
  final String id;
  final String title;
  final String subTitle;
  final String imageUri;
  final List<String> tags;
  final int price;
  const RoomListItemData(
      {this.title,
      this.subTitle,
      this.imageUri,
      this.tags,
      this.price,
      this.id});
}

const List<RoomListItemData> dataList = [
  RoomListItemData(
      title: '朝阳门南大街 2室1厅 8300元',
      subTitle: "二室/114/东|北/朝阳门南大街",
      imageUri:
          "https://tva1.sinaimg.cn/large/006y8mN6ly1g6wtu9t1kxj30lo0c7796.jpg",
      price: 1200,
      id: 'roomDetail/1',
      tags: ["近地铁", "集中供暖", "新上", "随时看房"]),
  RoomListItemData(
      title: '整租 · CBD总部公寓二期 临近国贸 精装修 随时拎包入住',
      subTitle: "一室/110/西/CBD总部公寓二期",
      imageUri:
          "https://tva1.sinaimg.cn/large/006y8mN6ly1g6wtu5s7gcj30lo0c7myq.jpg",
      price: 6000,
      id: 'roomDetail/1',
      tags: ["近地铁", "随时看房"]),
  RoomListItemData(
      title: '朝阳门南大街 2室1厅 8300元',
      subTitle: "二室/114/东|北/朝阳门南大街",
      imageUri:
          "https://tva1.sinaimg.cn/large/006y8mN6ly1g6wtu5s7gcj30lo0c7myq.jpg",
      price: 1200,
      id: 'roomDetail/1',
      tags: ["近地铁", "集中供暖", "新上", "随时看房"]),
  RoomListItemData(
      title: '整租 · CBD总部公寓二期 临近国贸 精装修 随时拎包入住',
      subTitle: "一室/110/西/CBD总部公寓二期",
      imageUri:
          "https://tva1.sinaimg.cn/large/006y8mN6ly1g6wtu9t1kxj30lo0c7796.jpg",
      price: 6000,
      id: 'roomDetail/1',
      tags: ["近地铁", "随时看房"]),
];


```



### 4.25 首页-tabSearch-主体结构

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7zbbiwmn5j30cm0mytbd.jpg" alt="image-20191015234121538" style="zoom:50%;" />

**步骤：**

1. 创建文件 /pages/home/tab_search/dataList.dart 使用上一节准备的数据
2. 创建文件 /pages/home/tab_search/index.dart
3. 引入依赖，创建有状态组件
4. 编写主体结构
5. 测试

### 4.26 首页-tabSearch-item 部分

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7zrwuz5pdj30cm0mygrp.jpg" alt="image-20191016091525346"  />

**步骤：**

1. 创建文件 /widgets/room_list_item_widget.dart
2. 引入依赖，创建无状态组件，添加参数 data
3. 完成主体结构
4. 添加测试
5. 完善细节

**要点:**

文本 … 的问题

### 4.27 首页-tabSearch-tag 部分

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7zt76ij91j30cm0mydm2.jpg" alt="image-20191016095957245"  />

**步骤：**

1. 新建文件 widgtes/common_tag.dart
2. 引入 material 依赖，添加无状态组件，添加参数 title,color,backgroundColor
3. 完成展示效果
4. 测试
5. 优化参数 使用 factory 工厂构造函数

**要点：**

圆角设置，factory 使用

### 4.28 组件 SearchBar 封装-分析

**结构分析：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ztf4yxybj30cm0mydmm.jpg" alt="image-20191016100736197" style="zoom: 50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7zteonmzgj30cm0mywko.jpg" alt="image-20191016100710251" style="zoom: 50%;" />
   <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g7ztffbu40j30cm0myq51.jpg" alt="image-20191016100753126" style="zoom: 50%;" />
</div>

**结论：**

![image-20191017160704197](https://tva1.sinaimg.cn/large/006y8mN6ly1g819fgi3xbj30km066gmu.jpg)

1. 结构

   + SearchBar-Container,Row
     + 位置选择按钮
     + 返回图标按钮
     + 输入框—**弹性宽度**
     + 取消文字按钮
     + 地图标志按钮

2. 参数

   ```dart
     final bool showLoaction;//展示位置按钮
     final Function goBackCallback;//回退按钮函数
     final String inputValue;// 搜索框输入值
     final String defaultInputValue;// 搜索框默认值
     final Function onCancel;//取消按钮
     final bool showMap;//展示地图按钮
     final Function onSearch; //用户点击搜索框触发
     final ValueChanged<String> onSearchSubmit;// 用户输入搜索词后，点击键盘的搜索键触发
   ```

   
   
3. 静态资源

   1. 资源地址 /resource/chapter3/01静态资源/static/icons/widget_search_bar_map.png
   2. 拷贝 目标地址 /resource/chapter3/02课堂代码/hook_up_rent/static/icons/widget_search_bar_map.png
   3. 在项目配置文件 pubspec.yaml 添加 
      1.   - static/icons/widget_search_bar_map.png

### 4.29 组件 SearchBar 封装-主体结构开发

**效果：**

![image-20191017125957224](https://tva1.sinaimg.cn/large/006y8mN6ly1g8140sxygdj30kk07qac6.jpg)

**步骤：**

1. 创建文件 /widgets/search_bar/index.dart
2. 引入 material 依赖， 创建有状态组件，添加参数
3. 编写界面代码
4. 测试
5. 完善代码

**要点：**

在有状态组件中使用参数(titile)方式 `widget.title`

### 4.30 组件 SearchBar 封装-完善搜索框

**效果：**

![image-20191017150638762](https://tva1.sinaimg.cn/large/006y8mN6ly1g817omtbu8j30lc06edhc.jpg)

**步骤：**

1. 解决背景色，圆角— Container，TextField.InputDecoration.border=InputBorder.none
2. 前置图标 InputDecoration.prefixIcon
3. 后置图标 InputDecoration.suffixIcon
4. 搜索提示样式 InputDecoration.hintStyle
5. 剧中 InputDecoration.contentPadding 
6. 间距问题 使用 InputDecoration.Icon 替代 InputDecoration.prefixIcon

### 4.31 组件 SearchBar 封装-细节完善

**效果：**

![image-20191017154330658](https://tva1.sinaimg.cn/large/006y8mN6ly1g818qxwsyzj30ko072myv.jpg)

**步骤：**

1. 使用参数 defaultInputValue
2. 使用参数 inputValue
3. 清除按钮逻辑实现
   1. 新增状态 _searchWord
   2. 添加处理函数 _onClean 
   3. 添加并实例化 _controller
   4. 根据 _searchWord 隐藏清除按钮
4. 添加 TextField.onTap
5. 添加 TextField.onSearchSubmit
6. 添加 TextField.textInputAction: TextInputAction.search
7. 删除 `|| true`

### 4.32 组件 SearchBar 封装-使用及优化

**效果：**

<div align=left>
 <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g819a32oi4j30p819wni2.jpg" alt="image-20191017160154572" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qok321wsj30p819wnl4.jpg" alt="image-20191017160218094" style="zoom:25%;" />
</div>

**步骤：**

1. 在 tabIndex 使用
2. 在 tabSearch 使用
3. 在 tabInfo 使用
4. 优化焦点问题
   1. 创建焦点对象 FocusNode _focus，并实例化
   2. 在 TextField 使用焦点对象
   3. 在 TextField onTap 回掉函数中 通过_focus.unfocus() 方法 是去焦点。

### 4.33 首页-tabProfile-分析

**结构分析：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g826io6qqmj30ts0zetnj.jpg" alt="image-20191018111153630" style="zoom: 50%;" />



  **结论：**

+ tabProfile— scaffold
  + appBar
    + AppBar，Text
    + actions
      + IconButton
  + body— ListView
    + Header— 已登陆视图/未登陆视图
    + FunctionButton— 按钮需要使用本地图片
    + Advertisement
    + Info— 已完成组件

**数据准备：**

1. 网络图片

   1. 未登陆图片 "https://tva1.sinaimg.cn/large/006y8mN6ly1g6tbgbqv2nj30i20i2wen.jpg"
   2. 已登陆占位图片 "https://tva1.sinaimg.cn/large/006y8mN6ly1g6tbnovh8jj30hr0hrq3l.jpg"
   3. 广告图片 'https://tva1.sinaimg.cn/large/006y8mN6ly1g6te62n8f4j30j603vgou.jpg'

2. 静态资源

   1. 资源地址 /resource/chapter3/01静态资源/static/images/home_profile_xxx.png

3. 配置文件

   ```yaml
       - static/images/home_profile_record.png
       - static/images/home_profile_order.png
       - static/images/home_profile_favor.png
       - static/images/home_profile_id.png
       - static/images/home_profile_message.png
       - static/images/home_profile_contract.png
       - static/images/home_profile_house.png
       - static/images/home_profile_wallet.png
   ```

   

4. 列表数据

   ```dart
   import 'package:flutter/material.dart';
   
   class FunctionButtonItem {
     final String imageUri;
     final String title;
     final Function onTapHandle;
   
     FunctionButtonItem(this.imageUri, this.title, this.onTapHandle);
   }
   
   
   final List<FunctionButtonItem> list = [
     FunctionButtonItem(
         'static/images/home_profile_record.png', '看房记录', null),
     FunctionButtonItem(
         'static/images/home_profile_order.png', '我的订单', null),
     FunctionButtonItem(
         'static/images/home_profile_favor.png', '我的收藏', null),
     FunctionButtonItem(
         'static/images/home_profile_id.png', '身份认证', null),
     FunctionButtonItem(
         'static/images/home_profile_message.png', '联系我们', null),
     FunctionButtonItem(
         'static/images/home_profile_contract.png', '电子合同', null),
     FunctionButtonItem('static/images/home_profile_house.png', '房屋管理', (context) {
       bool isLogin = true;//todo:
       if (isLogin) {
         Navigator.pushNamed(context, 'roomManage');
         return;
       }
       Navigator.pushNamed(context, 'login');
     }),
     FunctionButtonItem(
         'static/images/home_profile_wallet.png', '钱包', null),
   ];
   ```

   

### 4.34 首页-tabProfile-主体结构

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g81j8q3o2jj30p819wgth.jpg" alt="image-20191017214635705" style="zoom:50%;" />

**步骤：**

1. 准备
   1. 添加文件 pages/home/tab_profile/index.dart
   2. 添加 material 依赖，添加无状态组件
2. 主体结构
   1. 使用 Scaffold 搭建主体结构
   2. 测试效果
3. 完善
   1. 完善 appBar 部分
   2. 完善 body 部分

### 4.35 首页-tabProfile-登陆注册-未登陆视图

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g81kpphsyrj30l411wtg4.jpg" alt="image-20191017223730869" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g828qdenbtj30l411w461.jpg" alt="image-20191018122830354" style="zoom:50%;" />
</div>

**步骤：**

1. 准备
   1. 添加文件 pages/home/tab_profile/header.dart
   2. 添加 material 依赖，添加无状态组件
2. 核心编码
   1. 添加背景色和高度
   2. 添加图片  "https://tva1.sinaimg.cn/large/006y8mN6ly1g6tbgbqv2nj30i20i2wen.jpg”
   3. 添加右侧文字
3. 测试和完善
   1. 测试效果
   2. 完善细节

### 4.36 首页-tabProfile-登陆注册-已登陆视图

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g828qdenbtj30l411w461.jpg" alt="image-20191018122830354" style="zoom:50%;" />

**步骤：**

1. 把内容显示部分抽提成函数
2. 根据登陆状态使用函数
3. 修改已登陆状态函数 "https://tva1.sinaimg.cn/large/006y8mN6ly1g6tbnovh8jj30hr0hrq3l.jpg"
4. 测试

### 4.37 首页-tabProfile-功能按钮-主体结构

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g82eh6gafnj30l411wahv.jpg" alt="image-20191018154712289" style="zoom:50%;" />

**步骤：**

1. 准备
   1. 准备静态图片
   2. 准备数据文件  pages/home/tab_profile/function_button_data.dart
2. 核心编码
   1. 新建 pages/home/tab_profile/function_button.dart
   2. 使用 Wrap 完成主体结构部分 
   3. 使用 Container 替代 item
3. 测试

### 4.38 首页-tabProfile-功能按钮-item 

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g82eq857cej30l411wqdz.jpg" alt="image-20191018155556471" style="zoom:50%;" />

**步骤：**

1. 新建 pages/home/tab_profile/function_button_widget.dart
2. 引入依赖，添加无状态组件，添加 data 参数
3. 完成 Item 主体结构
4. 测试
5. 完善细节

### 4.39 首页-tabProfile-广告及资讯

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g82ew61si7j30l411wqjj.jpg" alt="image-20191018160138846" style="zoom:50%;" />

**步骤：**

1. 创建文件 pages/home/tab_profile/advertisement.dart
2. 引入 material 依赖，添加无状态组件
3. 完善主体结构  'https://tva1.sinaimg.cn/large/006y8mN6ly1g6te62n8f4j30j603vgou.jpg'
4. 测试
5. 完善细节

### 4.40 设置页

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g872a22ec3j30cm0mygnr.jpg" alt="image-20191022163305038" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g872aihmqjj30cm0mygnv.jpg" alt="image-20191022163331340" style="zoom:50%;" />
</div?


**分析：**

需要 toast 弹窗，使用 [fluttertoast](https://github.com/PonnamKarthik/FlutterToast)

用法：

  ```dart
// 1. 安装依赖
//fluttertoast: ^3.1.3

// 2. 引入依赖
import 'package:fluttertoast/fluttertoast.dart';

// 3. 使用
Fluttertoast.showToast(
        msg: "This is Center Short Toast",
        toastLength: Toast.LENGTH_SHORT,
        gravity: ToastGravity.CENTER,
        timeInSecForIos: 1,
        backgroundColor: Colors.red,
        textColor: Colors.white,
        fontSize: 16.0
    );
  ```



**步骤：**

1. 准备

   1. 按照依赖 fluttertoast: ^3.1.3
   2.  utils/common_toast.dart 新建文件，封装 CommonToast
   3. 新建文件 pages/setting.dart，引入依赖，添加无状态组件

2. 核心编码

   1. 完成页面主体结构
   2. 在路由系统注册当前页面
   3. 添加`退出登陆`按钮
   4. 实现退出登陆逻辑

3. 测试

   

### 4.41 房屋管理页-主体结构

**效果：**

![image-20191022174314355](https://tva1.sinaimg.cn/large/006y8mN6ly1g874b29tt6j30cm0mywkh.jpg)

**分析：**

[Tab 的使用](https://api.flutter.dev/flutter/material/DefaultTabController-class.html)

```dart
class MyDemo extends StatelessWidget {
  final List<Tab> myTabs = <Tab>[
    Tab(text: 'LEFT'),
    Tab(text: 'RIGHT'),
  ];

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: myTabs.length,
      child: Scaffold(
        appBar: AppBar(
          bottom: TabBar(
            tabs: myTabs,
          ),
        ),
        body: TabBarView(
          children: myTabs.map((Tab tab) {
            final String label = tab.text.toLowerCase();
            return Center(
              child: Text(
                'This is the $label tab',
                style: const TextStyle(fontSize: 36),
              ),
            );
          }).toList(),
        ),
      ),
    );
  }
}
```



**步骤：**

1. 准备
   1. 添加文件 pages/room_manage/index.dart
   2. 添加 material 依赖，创建无状态组件
2. 核心编码
   1. 使用 Scaffold 添加页面主体结构
   2. 在路由系统注册当前页面
   3. 添加 tab AppBar.bottom : TabBar()
   4. 添加 body: TabBarView()
   5. 在 Scaffold 通过 DefaultTabController 关联 TabBar 和 TabBarView
3. 测试

### 4.42 房屋管理页-发布按钮

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8756r9s6sj30cm0my75n.jpg" alt="image-20191022174314355" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8756d0ocij30cm0myteu.jpg" alt="image-20191022181316816" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g87i4yxwulj30p819w7fd.jpg" alt="image-20191023014100543" alt="image-20191023014100543" style="zoom: 25%;" />
<div>

**分析：**

因为【房源发布】页面也有同样的样式，所以需要封装成组件。组件参数包含 title 和 onTap。

**步骤：**

1. 添加 floatingActionButton 属性
2. 完善发布按钮主体结构 GestureDetector>Container>Center>Text
3. 修改 floatingActionButtonLocation
4. 完善细节
5. 封装组件

### 4.43 发布房源页-分析

**结构分析：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g88040g74ij30cm0myq65.jpg" alt="image-20191023120334314" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8804e2n8qj30cm0myq6q.jpg" alt="image-20191023120357814" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g88057x6ogj30cm0mytbq.jpg" alt="image-20191023120444638" style="zoom:50%;" />
<div>
**结论：**

1. CommonTitle
2. CommonFormItem
3. CommonRadioFormItem
4. CommonSelectFormItem
5. CommonPicker
6. CommonImagePicker
7. CommonCheckButton
8. RoomAppliance

### 4.44 发布房源页-主体结构

**效果：**

![image-20191023124711858](https://tva1.sinaimg.cn/large/006y8mN6ly1g881ddpchrj30cm0my40q.jpg)



**步骤：**

1. 创建文件 pages/room_add/index.dart
2. 添加 material 依赖，添加有状态组件
3. 使用 Scaffold 完成页面主体结构
4. 添加 提交按钮
5. 在路由中注册该页面

### 4.45 发布房源页-CommonTitle

**效果：**

![image-20191022214925230](https://tva1.sinaimg.cn/large/006y8mN6ly1g87bf7gl5wj30cm0myacj.jpg)

**步骤：**

1. 创建文件 widgets/common_title.dart
2. 添加 material 依赖，添加无状态组件，添加 title 参数
3. 完成组件主体内容
4. 使用组件
5. 完善组件

### 4.46 发布房源页-CommonFormItem-分析

**结构分析：**

  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g88040g74ij30cm0myq65.jpg" alt="image-20191023120334314" style="zoom:100%;" />

**结论：**

+ CommonFormItem
  + label
  + Content
    + 文本框
      + hintText
      + onChanged
      + controller
    + 尾缀
      + suffix
      + suffixText

**组件参数：**

```dart
  final String label;
  final Widget Function(BuildContext context) contentBuilder;

  final Widget suffix;
  final String suffixText;

  final String hintText;
  final ValueChanged onChanged;
  final TextEditingController controller;
```

**使用：**

```dart
    CommonFormItem(
            label: '租金',
            hintText: '请输入租金',
            suffixText: '元/月',
            controller: TextEditingController(),
          ),
```



### 4.47 发布房源页-CommonFormItem-实现

**效果：**

![image-20191022233845702](https://tva1.sinaimg.cn/large/006y8mN6ly1g87ekzghipj30cm0myq5m.jpg)

**实现：**

1. 准备
   2. 创建文件 widgets/common_form_item.dart
   2. 添加依赖，编写无状态组件，添加并初始化参数
   3. 使用组件
2. 核心代码
   1. 主体结构 实现
   2. 底线 实现
   3. label 实现
   4. 文本框实现
   5. 尾缀实现
3. 测试



### 4.48 发布房源页-CommonFormItem-实现小区选择

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g887pocxkrj30p819wdqx.jpg" alt="image-20191023162636281" style="zoom:40%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g887pj280bj30p819w116.jpg" alt="image-20191023162624841" style="zoom:40%;" />
</div>

**步骤：**

1. 添加  CommonFormItem
2. 完善 contentBuilder
3. 完善 点击事件处理
4. 测试
5. 优化 CommonFormItem，调整Expanded 位置

### 4.49 发布房源页-CommonRadioFormItem

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g889uqnsn6j30cm0mydj0.jpg" alt="image-20191023174039868" style="zoom:50%;" />

**分析：**

```dart
//参数
  final String label;
  final List<String> options;
  final int value;
  final ValueChanged<int> onChange;

//使用
          CommonRadioFormItem(
              label: '租赁方式',
              options: ['合租', '整租'],
              value: 0,
              onChange: (index) {}),
          CommonRadioFormItem(
              label: '装修',
              options: ['精装', '简装'],
              value: 0,
              onChange: (index) { }),
```



**步骤：**

1. 准备

   1. 新建文件 widgets/common_radio_form_item.dart
   2. 添加 material 依赖，添加无状态组件，添加并初始化参数

2. 核心代码

   1. 使用 CommonFormItem 完成基本结构 label 和 contentBuilder 属性
   2. 在 roomAdd 页面使用 CommonRadioFormItem
   3. 完善 contentBuilder
   4. 处理选项及点击事件 使用 Radio
   5. 完善细节

3. 测试

   1. 让按钮可点击

   

### 4.50 发布房源页-CommonSelectFormItem

**效果：**

![image-20191023191341672](https://tva1.sinaimg.cn/large/006y8mN6ly1g88cjj85ojj30cm0mywhu.jpg)

**分析：**

```dart
//参数
  final String label;
  final int value;
  final List<String> options;
  final Function(int) onChange;

//用法
CommonSelectFormItem(
            label: '户型',
            value: 0,
            onChange: (val) {},
            options: ['一室','二室','三室','四室',],
          ),
CommonSelectFormItem(
            label: '楼层',
            value: 0,
            onChange: (val) {},
            options: ['高楼层','中楼层','低楼层',],
          ),
CommonSelectFormItem(
            label: '朝向',
            value: 0,
            onChange: (val) {},
            options: ['东','南','西','北京',],
          ),



```



**步骤：**

1. 准备
   1. 新建文件 widgets/common_select_form_item.dart
   2. 添加 material 依赖，添加无状态组件，添加并初始化参数
2. 核心代码
   1. 使用 CommonSelectFormItem 完成基本结构
   2. 在 roomAdd 页面使用 CommonSelectFormItem
   3. 完善细节
3. 测试

### 4.51 发布房源页-CommonPicker-分析

**结构分析：**
 <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g88057x6ogj30cm0mytbq.jpg" alt="image-20191023120444638" style="zoom:100%;" />

**结论：**

CommonPicker.showPicker 是一个 class 的静态方法

半屏弹窗— [showCupertinoModalPopup](https://api.flutter.dev/flutter/cupertino/showCupertinoModalPopup.html)

选择区域— [CupertinoPicker](https://api.flutter.dev/flutter/cupertino/CupertinoPicker-class.html)

**使用：**

```dart
//参数
BuildContext context,
List<String> options,
int value,

//返回值
Future<int> result；
  
  
//使用
     var result = CommonPicker.showPicker(
                context: context, options: options, value: value);

            result.then((selectedValue) {
              if (value != selectedValue &&
                  selectedValue != null &&
                  onChange != null) {
                onChange(selectedValue);
              }
            });
```



### 4.52 发布房源页-CommonPicker-主体结构

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g88057x6ogj30cm0mytbq.jpg" alt="image-20191023120444638" style="zoom:50%;" />

**步骤：**

1. 准备
   1. 新建文件 utils/common_picker/index.dart
   2. 引入 material 和 cupertino 依赖
   3. 完善类及静态方法的主体结构
   4. 在 CommonSelectFormItem 中使用 CommonPicker
2. 核心编码
   1. 使用 showCupertinoModalPopup 返回 Future
   2. 完善内容区 header 部分
   3. 使用 CupertinoPicker 完善内容区 body 部分
3. 测试及完善
   1. 使用 CommonPicker
   2. 完善细节

### 4.53 发布房源页-CommonPicker-细节和事件

**目的：**

细节：半屏高度

事件：  roomAdd — CommonSelectFormItem — CommonPicker 关联

**步骤：**

1. 细节
   1. 半屏高度
2. 事件
   1. 在 roomAdd  页面添加状态
   2. 添加事件处理函数
   3. 完善 CommonSelectFormItem 的事件处理部分
   4. 完善 CommonPicker 的事件处理部分
3. 测试

### 4.54 发布房源页-房屋图像-主体结构

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8anfdjkndj30p819wn8i.jpg" alt="image-20191025190120995" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8anhrvynuj30p819w4ci.jpg" alt="image-20191025190339590" style="zoom:33%;" />
</div>

**分析：**

2. common_image_picker 使用

   ```dart
   //1. 参数
   final ValueChanged<List<File>> onChange;
   
   //2.用法
   CommonImagePicker(
     onChange: (List<File> files) {},
   )
   ```

3. 测试图片数据

   ```dart
   const List<String> defautImages = [
     'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2tdgve1j30ku0bsn75.jpg',
     'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2whp87sj30ku0bstec.jpg',
     'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2tl1v3bj30ku0bs77z.jpg',
   ];
   // 图片宽750px，高424px；
   var imageWidth=750.0;
   var imageHeight=424.0;
   var imageWidthHeightRatio = imageWidth / imageHeight;
   
   ```

   

**步骤：**

1. 准备
   1. 添加文件 widgets/common_image_picker.dart
   2. 添加 material  依赖，
   3. 准备测试图片数据
   4. 创建有状态组件
   5. 在 roomAdd 页面使用 CommonImagePicker
2. 核心编码
   1. 准备图片宽高
   2. 准备添加图片按钮
   3. 准备图片 wrapper 函数
   4. 展示图片及添加按钮
3. 测试

### 4.55 发布房源页-房屋图像-添加删除

**效果：**

![image-20191025225136179](https://tva1.sinaimg.cn/large/006y8mN6ly1g8au2w250zj30cm0mywjk.jpg)

**分析：**

1. 添加— 使用第三方组件 [image_picker](https://pub.dev/packages/image_picker) 读取本地图片

   ```dart
   //1.安装依赖
     image_picker: ^0.6.1+4
       
   //2. iOS 配置 <project root>/ios/Runner/Info.plist:
     <key>NSCameraUsageDescription</key>
   	<string>Use to get room image </string>
   	<key>NSMicrophoneUsageDescription</key>
   	<string>Use to capture audio for room</string>
   	<key>NSPhotoLibraryUsageDescription</key>
   	<string>Use to get room image</string>
       
   //3. 引入依赖
   import 'package:image_picker/image_picker.dart';
   
   //4. 使用
     _pickImage() async {
       var image = await ImagePicker.pickImage(source: ImageSource.gallery);
     }
   ```

   
   
2. 删除 — 图标叠加 使用 Stack

**步骤：**

1. 准备
   1.  安装 image_picker 依赖
   2. 引入 image_picker 依赖
2. 核心代码
   1. 实现添加图片逻辑
      1. 添加状态 files
      2. 图片数据使用 files
      3. 添加方法 pickImage
      4. addButton 添加事件
      5. 测试
   2. 实现图片删除逻辑
      1. 添加删除图标
      2. 实现删除事件
      3. 测试

### 4.56 发布房源页-房屋标题描述

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8azo4v64vj30p819w13i.jpg" alt="image-20191026020503437" style="zoom:50%;" />

**步骤：**

1. 添加房屋标题 
   1. 提示文案：请输入标题（例如：整组，小区名 2室 2000元）
2. 添加房屋描述 
   1. 提示文案： 请输入房屋描述信息
3. 添加 controller
4. 测试及细节完善

### 4.57 发布房源页-房屋配置-分析

**设计图分析：**

 <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8804e2n8qj30cm0myq6q.jpg" alt="image-20191023120357814" style="zoom:100%;" />

**结论：**

1. 结构 Wrap 

2. 图标，使用字体文件

   1. 静态文件 /static/fonts/iconfont.ttf

   2. 配置文件

      ```yaml
        fonts:
          - family: CommonIcon
            fonts:
            - asset: static/fonts/iconfont.ttf
      ```

   3. 字体使用

      ```dart
      //字体的使用
      Icon(
        IconData(
          item.iconPoint,
          fontFamily: Config.CommonIcon,
        ),
      )
        
      //config.dart
      class Config {
        static const CommonIcon = 'CommonIcon';
      }
      ```

      

3. 数据

   ```dart
   class RoomApplianceItem {
     final String title;
     final int iconPoint;
     final bool isChecked;
   
     const RoomApplianceItem(this.title, this.iconPoint, this.isChecked);
   }
   
   const List<RoomApplianceItem> _dataList = [
     RoomApplianceItem('衣柜', 0xe918, false),
     RoomApplianceItem('洗衣机', 0xe917, false),
     RoomApplianceItem('空调', 0xe90d, false),
     RoomApplianceItem('天然气', 0xe90f, false),
     RoomApplianceItem('冰箱', 0xe907, false),
     RoomApplianceItem('暖气', 0xe910, false),
     RoomApplianceItem('电视', 0xe908, false),
     RoomApplianceItem('热水器', 0xe912, false),
     RoomApplianceItem('宽带', 0xe90e, false),
     RoomApplianceItem('沙发', 0xe913, false),
   ];
   
   //组件参数 
   final ValueChanged<List<RoomApplianceItem>> onChange;
   ```

   

4. CommonCheckButton 的实现

   ```dart
   import 'package:flutter/material.dart';
   
   class CommonCheckButton extends StatelessWidget {
     final bool isChecked;
   
     const CommonCheckButton(
       this.isChecked, {
       Key key,
     }) : super(key: key);
   
     @override
     Widget build(BuildContext context) {
       return isChecked
           ? Icon(
               Icons.check_circle,
               color: Colors.green,
             )
           : Icon(
               Icons.radio_button_unchecked,
               color: Colors.green,
             );
     }
   }
   ```

**操作：**

1. 准备图标
2. 创建文件 widgets/room_appliance.dart
3. 准备数据
4. 准备config 文件
5. CommonCheckButton 实现

### 4.58 发布房源页-房屋配置-实现

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8804e2n8qj30cm0myq6q.jpg" alt="image-20191023120357814" style="zoom:100%;" />

**步骤：**

1. 准备
   1. 添加 material 依赖						
   2. 添加有状态组件
   3. 添加并初始化参数
2. 核心编码
   1. 完成主体结构
   2. 使用 RoomApplicance
   3. 添加点击事件
3. 测试&完善

### 4.59 房屋详情页-分析

**设计图分析：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8bytr0d67j30p819w4i4.jpg" alt="image-20191026222110661" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8bytzs3xzj30p819wwz6.jpg" alt="image-20191026222134127" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8byv8a1sdj30p819wnh5.jpg" alt="image-20191026222246341" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8byz39nhsj30p819wtoe.jpg" alt="image-20191026222628499" style="zoom:33%;" />
</div>

**结论：**

1. 页面结构

   1. 主体结构— Scaffold
      1. 顶部部分 — appBar
      2. 内容部分— Stack
         1. ListView
            1. 房屋图片
               1. Swiper
            2. 房屋基本信息
               1. 标题
               2. 价格
               3. 标签
            3. 房屋详细信息
               1. 面积
               2. 楼层
               3. 房型
               4. 装修
            4. 房屋配置
            5. 房屋概况
            6. 猜你喜欢
         2. 浮动操作区
            1. 收藏
            2. 联系房东按钮
            3. 预约看房按钮

2. 房屋数据结构

   

   ```dart
   class RoomDetailData {
     String id;
     String title;
     String community;
     String subTitle;
     int size;
     String floor;
     int price;
     String roomType;
     List<String> houseImgs;
     List<String> tags;
     List<String> oriented;
     List<String> applicances;
   
     RoomDetailData({
       this.id,
       this.title,
       this.community,
       this.subTitle,
       this.size,
       this.roomType,
       this.houseImgs,
       this.tags,
       this.price,
       this.floor,
       this.oriented,
       this.applicances,
     });
   
   }
   
   
   var defaultData=RoomDetailData(id:'1111',title: '整租 中山路 历史最低价',community: '中山花园',subTitle: '近地铁，附近有商场！',size: 100,floor: '高楼层',price: 3000,oriented: ['南'],roomType: '三室',applicances:['衣柜','洗衣机'],tags:["近地铁", "集中供暖", "新上", "随时看房"],houseImgs: [
     'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2tdgve1j30ku0bsn75.jpg',
     'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2whp87sj30ku0bstec.jpg',
     'http://ww3.sinaimg.cn/large/006y8mN6ly1g6e2tl1v3bj30ku0bs77z.jpg',
   ]);
   ```

   

3. 分享按钮 [share](https://pub.dev/packages/share)

   

   ```dart
   //1. 安装依赖
     share: ^0.6.3+1
       
   //2. 引入依赖
       import 'package:share/share.dart';
   
   //3. 使用
       Share.share('check out my website https://example.com');
   
   ```

   

### 4.60 房屋详情页面-主体结构

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8cu2dspbjj30p819wqc8.jpg" alt="image-20191027162209294" style="zoom:50%;" />

**步骤：**

1. 准备
   1. 将RoomDetailPage 转成 有状态组件
   2. 安装 share 依赖
   3. 添加 data.dart,并粘贴之前准备的代码
2. 核心编码
   1. 完善 appBar 部分主体结构
   2. 添加分享按钮
   3. 使用  Stack 完善body的主体结构
   4. 完善 底部按钮区域
3. 测试&完善细节
   1. 修改 widgets/room_list_item_widget.dart 添加点击事件
   2. 修改 pages/home/tab_search/dataList.dart 修改id
   3. 测试

### 4.61房屋详情页面-底部按钮

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8cum08jihj30p819wqdo.jpg" alt="image-20191027164103701" style="zoom:50%;" />

**步骤：**

1. 添加收藏按钮
2. 添加‘联系房东’ 按钮
3. 添加’预约看房’按钮
4. 添加收藏事件及展示
5. 测试

### 4.62 房屋详情页面-房屋图片&房屋基本信息

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qogjo9o9j30p819wwvp.jpg" alt="image-20191027182706325" style="zoom:50%;" />

**步骤：**

1. 添加 图片
2. 添加 价格
3. 添加 标签
4. 添加 分割线
5. 测试

### 4.63 房屋详情页面-房屋详细信息

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qohkqqvpj30p819wtuc.jpg" alt="image-20191027201641436" style="zoom:50%;" />



**步骤：**

1. 添加 Container Wrap 结构
2. 实现【面积】部分
3. 重构组件
4. 实现 【楼层】【房型】【装修】
5. 测试

### 4.64 房屋详情页面-房屋配置

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8d13ytdm8j30p819w4h1.jpg" alt="image-20191027202554492" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8804e2n8qj30cm0myq6q.jpg" alt="image-20191023120357814" style="zoom:50%;" />
</div>
**步骤：**

1.  打开文件 /widgets/room_appliance.dart
2. 创建 无状态组件 RoomApplianceList
3. 添加并初始化参数 final List<String> list;
4. 完善内容部分
5. 在 /pages/room_detail/index.dart 使用 RoomApplianceList
6.  完善细节
7.  测试

### 4.65 房屋详情页面-房屋概况&猜你喜欢

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qogu8mdnj30p819w4i8.jpg" alt="image-20191028182158254" style="zoom:50%;" />

**步骤：**

1. 添加 container 和 container.padding,Column
2. 添加 Text 用于显示 房屋概况
3. 添加按钮区域（收起/举报）
4. 添加状态 showAllText=false 和 showTextTool 变量。
5. 根据 showAllText 和 showTextTool 显示相应内容
6. 添加事件控制 showAllText；
7. 添加 Info()

### 4.66 filterBar-分析

**结构分析：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8e3fzn31aj30p819wqog.jpg" alt="image-20191028183213292" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8e3fjz0xjj30p819wh22.jpg" alt="image-20191028183147814" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8e3h64007j30p819w4av.jpg" alt="image-20191028183321054" style="zoom:25%;" />
</div>

**结论：**

1. 结构

   + filterBar— Row
     + 区域--Item
     + 方式--item
     + 租金--item
     + 筛选--item
   + Picker选择器 — CommonPicker
   + 筛选选择器 — Drawer

2. 组件参数

   ```dart
   ValueChanged<FilterBarResult> onChange
   ```
   
   

**数据及结构：**

```dart
// pages/home/tab_search/filter_bar/data.dart
//结果数据类型
class  FilterBarResult {
  final String areaId ;
  final String priceId ;
  final String rentTypeId;
  final List<String> moreIds;

  FilterBarResult({this.areaId, this.priceId, this.rentTypeId, this.moreIds});
  
}

//通用类型
class GeneralType{
  final String name;
  final String id;

  GeneralType(this.name, this.id);
}

List<GeneralType> areaList = [
  GeneralType('区域1', '11'),
  GeneralType('区域2', '22'),
];
List<GeneralType> priceList = [
  GeneralType('价格1', '11'),
  GeneralType('价格2', '22'),
];
List<GeneralType> rentTypeList = [
  GeneralType('出租类型1', '11'),
  GeneralType('出租类型2', '22'),
];
List<GeneralType> roomTypeList = [
  GeneralType('房屋类型1', '11'),
  GeneralType('房屋类型2', '22'),
];
List<GeneralType> orientedList = [
  GeneralType('方向1', '11'),
  GeneralType('方向2', '22'),
];
List<GeneralType> floorList = [
  GeneralType('楼层1', '11'),
  GeneralType('楼层2', '22'),
];

```



### 4.67 filterBar-展示区域

**效果：**

![image-20191029143432400](https://tva1.sinaimg.cn/large/006y8mN6ly1g8f26zsicyj30cm0my0ys.jpg)

**步骤：**

1. 准备
   1. 新建文件  pages/home/tab_search/filter_bar/data.dart，填充数据
   2. 新建文件 pages/home/tab_search/filter_bar/index.dart
   3. 引入 material 依赖， 创建**有**状态组件，添加并初始化参数
2. 核心编码
   1. 编写基本结构，解决外边框样式问题
   2. 在 tabSearch页面中使用 Filter_bar
   3. 编写 filterBar 的 item 组件
   4. 使用 item 组件

### 4.68 filterBar-picker 部分

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8f2dyfapgj30cm0my0ym.jpg" alt="image-20191029144113752" style="zoom:67%;" />

**步骤：**

1. 添加 4 个按钮的激活状态
2. 添加 4 个结果值
3. 添加 4 响应事件
4. 添加 _onChange 方法用于通知 FilterBar 的父组件
5. 完成【区域】选择的 picker 部分
6. 参照【区域】完成 【方式】和【租金】的 picker 部分
7. 【筛选】先使用空白函数

### 4.69 filterBar-drawer 部分-展示部分

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8e3fzn31aj30p819wqog.jpg" alt="image-20191028183213292" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8g4q7o78vj30p819wtjr.jpg" alt="image-20191029181501072" style="zoom: 25%;" />
</div>




**步骤：**

1. 准备
   1. 创建文件 filter_bar/filter_drawer.dart
   2. 添加 material 依赖 添加无状态组件
2. 核心编码
   1. 实现页面基本结构
   2. 在 tabSearch页面使用 FiterDrawer
   3. 实现选项按钮
   4. 将选项按钮提取成组件 FilterDrawerItem
3. 完善细节
   1. 隐藏 Drawer 按钮
   2. 打开 Drawer

### 4.70 filterBar-drawer 部分-数据分析

**问题：**

如何将 Drawer 的数据传递到 FilterBar中来?

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8e3fzn31aj30p819wqog.jpg" alt="image-20191028183213292" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8f2dyfapgj30cm0my0ym.jpg" alt="image-20191029144113752" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8g4q7o78vj30p819wtjr.jpg" alt="image-20191029181501072" style="zoom: 25%;" />
</div>

**分析：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8g6mz60ajj30lm0midgv.jpg" alt="image-20191030135349549" style="zoom:50%;" />

**结论：**

使用全局状态，基于 [scoped_model](https://github.com/brianegan/scoped_model) 实现

**细节：**

```dart
//1. 安装依赖
 scoped_model: ^1.0.1
//2. 引入依赖
import 'package:scoped_model/scoped_model.dart';
//3.使用

//3.1 创建 model
class CounterModel extends Model {
  int _counter = 0;
  int get counter => _counter;
  void increment() {
    _counter++;
    notifyListeners();
  }
}
//3.2 在根组件外使用 model
class CounterApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
   
    return new ScopedModel<CounterModel>(
      model: new CounterModel(),
      child: new Column(children: [
        Widget(
        //...
        ),
        Widget(),
      ])
    );
  }
}
//3.3 在子组件中获取 model 中的数据/方法
  var counter =
      ScopedModel.of<CounterModel>(context, rebuildOnChange: true).counter;
  ScopedModel.of<CounterModel>(context, rebuildOnChange: true).increment();
```



### 4.71 filterBar-drawer 部分-ScopedModel-model

**分析：**

1. 数据分析

   ```dart
   List<GeneralType> _roomTypeList = [];
   List<GeneralType> _orientedList = [];
   List<GeneralType> _floorList = [];
   Set<String> _selectedList = new Set<String>();
   ```

   

2. 使用分析

+ FilterBar 使用
  + 添加可选数据列表  set dataList(Map<String, List<GeneralType>> data) 
  + 获取选中数据列表 Set<String> get selectedList
+ FilterDrawer 使用
  + 获取可选数据列表 Map<String, List<GeneralType>> get dataList 
  + 添加/删除选中数据列表 selectedListToggleItem(GeneralType data)

**实现：**

1.  创建文件 scoped_model/room_filter.dart
2. 添加 scoped_model 依赖
3. 编写 model 基本结构
4. 实现 model 数据结构
5. 实现 model 方法

### 4.72 filterBar-drawer 部分-ScopedModelHelper

**问题：**

操作 model 首先得获取 model，官方提供获取的方法需要注意 rebuildOnChange: true 参数！

能够封装一下？

**解决：**

能，自己编写一个 getModel 方法

```dart
//官方 
ScopedModel.of<T>(context, rebuildOnChange: true)
  
////////vs/////////
  
//自己封装
getModel<T>(context)
```



**实现：**

1. 添加文件 utils/scopoed_model_helper.dart
2. 添加 scopedModel 和 material 依赖
3. 实现 类的基本结构
4. 实现静态方法 getModel

### 4.73 filterBar-drawer 部分-ScopedModel-使用

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qogy72cvj30p819wtjr.jpg" alt="image-20191029181501072" style="zoom: 33%;" />

**知识回顾**：

1. 有状态组件生命周期 initState— 只执行一次，没有context,或者 context 不完整

2. 有状态组件生命周期 didChangeDependencies 依赖变更后就会执行，有context，会执行多次

3. 一次执行，并且需要 context

   ```dart
    @override
     void initState() {
       Timer.run(_getData);
       super.initState();
     }
   ```

   

**步骤：**

1. application 中添加 Model
2. 在 FilterBar 的 initState 生命周期 set dataList(Map<String, List<String>> data) 
3. 在 FilterBar 的 didChangeDependencies 生命周期 Set<String> get selectedList
4. 在 FilterDrawer 的 build 函数中 Map<String, List<GeneralType>> get dataList 
5. 在 FilterDrawer 的 Item 点击事件中 selectedListToggleItem(String data)
6. 测试
7. 优化

## 5 前后端联调

### 5.1 介绍 Dio

**问题：**

flutter 中如何发送网络请求？

**分析：**

```dart
// 通过 httpClient 发送请求 
get() async {
  var httpClient = new HttpClient();
  var uri = new Uri.https(
      'itcast.cn', '/path1/path2', {'param1': '42', 'param2': 'foo'});
  var request = await httpClient.getUrl(uri);
  var response = await request.close();
  var responseBody = await response.transform(UTF8.decoder).join();
  return responseBody;
}

////////////////////vs/////////////////////
//通过 dio
get() async {
    Response response = await Dio().get(
      "https://itcast.cn/path1/path2？param1=42&param2=foo");
  
  return response;
}

```

**结论：**

使用 [dio](https://github.com/flutterchina/dio) 作为 app 的网络请求工具。

Dio 对 HttpClient 的封装，增加了一些功能如 拦截器，全局配置，请求取消等。

**使用：**

```dart
// 安装依赖
  dio: ^2.1.6
    
// 引入依赖
import "package:dio/dio.dart";

//使用
Dio().get("https://itcast.cn/test");

//其他用法
BaseOptions options = new BaseOptions(
          baseUrl: "https://itcast.cn",
          connectTimeout: 1000 * 10,
          receiveTimeout: 3000,
          extra: {'context': context});
Dio dio = new Dio(options);
dio.get('/test');
```



### 5.2 封装 DioHttp

**问题：**

dio 的 api 变了，我们需要修改的代码较多；或者后续使用其他组件替代 dio？

**解决：**

封装 DioHttp

**详细分析：**

1. 内部状态

   + Dio _client;
   + BuildContext context;

2. 初始化

   + static DioHttp of(BuildContext context) 

3. 方法

   + get
      ```dart
     Future<Response<Map<String, dynamic>>> get(String path,
         [Map<String, dynamic> params, String token]) async {}
     ```

   + post
      ```dart
     Future<Response<Map<String, dynamic>>> post(String path,
           [Map<String, dynamic> params, String token]) async {}
     ```

   + postData
      ```dart
     Future<Response<Map<String, dynamic>>> postFormData(String path,
           [Map<String, dynamic> params, String token]) async {}
     ```

  

**编码：**

1. 创建文件 utils/dio_http.dart
2. 添加 dio，material 依赖 
3. 完成 DioHttp 的基本结构
4. 完成 初始化部分
5. 完成 get 方法
6. 完成 post 方法
7. 完成 postData 方法



### 5.3 注册页联调

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8hm8tum7rj30du0o641r.jpg" alt="image-20191031193919114" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8hm985q4tj30cm0myacg.jpg" alt="image-20191031193944213" style="zoom:50%;" />
</div>
**步骤：**

1. [接口文档](http://dev.itcastor.com:3333/)分析
2. 打开页面 pages/register.dart
3. 在 _RegisterPageState 添加 3 个 TextEditingController，并赋给 3个 TextField
4. 添加处理函数 _registerHandle() async {},并在注册按钮事件中调用
5. 处理注册逻辑
   1. 获取 TextFeild 值
   2. 处理 输入异常
   3. 发送网络请求
   4. 处理异常返回
   5. 跳转到 登陆页面
6. 测试

### 5.4 登陆页联调--分析

**问题：**

1. 登陆状态怎么和其他页面同步？
2. 再次打开 app ，是否需要二次登陆？
3. 登陆过期如何处理？

**分析：**

1. 使用 ScopedModel 同步登陆信息（token）。
2. 登陆成功后，将 token 写入本地存储；添加一个app 启动页，app启动的时候，加载token！
3. 在 DioHttp 中添加 Dio 拦截器，当登陆过期是，打开登陆页。

**添加和使用本地缓存：**

[shared_preferences文档](https://github.com/flutter/plugins/tree/master/packages/shared_preferences)

```dart
//安装依赖
shared_preferences: ^0.5.4+3
//引入依赖
import 'package:shared_preferences/shared_preferences.dart';
//使用
_incrementCounter() async {
  SharedPreferences prefs = await SharedPreferences.getInstance();
  int counter = (prefs.getInt('counter') ?? 0) + 1;
  print('Pressed $counter times.');
  await prefs.setInt('counter', counter);
}
```



### 5.5 封装 Store

**问题：**

本地缓存 shared_preferences 的api 可能会变？

**结论：**

将 shared_preferences 封装成 store

**详细分析：**

1. 内部数据 final SharedPreferences storage;
2. 方法
   1.   getString(StoreKeys key) async{}
   2.   setString(StoreKeys key,String value) async{}
   3.   getStringList(StoreKeys key) async{}
   4.   setStringList(StoreKeys key,List<String> value) async{}

**实现步骤：**

2. 新建文件 /utils/store.dart
3. 添加 shared_preferences 依赖
4. 编写类的基本结构
5. 实现初始化方法
6. 实现 getString setString getStringList setStringList
7. 添加 storeKeys

### 5.6 实现 AuthModel

**分析：**

1. 内部数据 token

2. 方法

   1. String get token 

   2. bool get isLogin

   3. void initApp(BuildContext context) async {}

   4. void login(String token,BuildContext context) {}

   5. void logout() 


**步骤：**

1. 新建文件 scoped_model/auth.dart
2. 定义 内部数据 _token
3. 实现分析的5个方法/属性
4. 在 Application 中使用 AuthModel



### 5.7 登陆页联调

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8jh7csaz3j30cm0mymzl.jpg" alt="image-20191102101557307" style="zoom:50%;" />
</div>

**步骤：**

1. 打开页面 pages/login.dart
2. 在 _LoginPageState 添加 2 个 TextEditingController，并赋给 2 个 TextField
3. 添加处理函数 _loginHandle() async {},并在登陆按钮事件中调用
4. 处理登陆逻辑
   1. 获取 TextFeild 值
   2. 处理 输入异常
   3. 发送网络请求
   4. 处理异常返回
   5. 回到上一个路由 
5. 测试

### 5.8 使用 AuthModel 及退出登陆

**效果：**


<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8jh9r63mrj30cm0myn2u.jpg" alt="image-20191102101818196" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8jh7csaz3j30cm0mymzl.jpg" alt="image-20191102101557307" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8jhacwkz1j30cm0my449.jpg" alt="image-20191102101852510" style="zoom: 50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8jh9c6hu4j30cm0mymze.jpg" alt="image-20191102101754250" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8jh9r63mrj30cm0myn2u.jpg" alt="image-20191102101818196" style="zoom:50%;" />
</div>

**步骤：**

1. 首页-tabProfile-header 部分使用登陆态
2. 首页-tabProfile-房屋管理部分使用登陆态
3. 退出登陆逻辑实现
4. 测试

### 5.9 完善个人信息

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8jz1rby7hj30cm0mydln.jpg" alt="image-20191102203321057" style="zoom:50%;" />

**分析：**

可以在登陆成功后，发送网络请求，获取登陆用户的个人信息！

将登陆用户的个人信息保存到 AuthModel 中，在 App 内共享。

获取个人信息，参考[接口文档](http://dev.itcastor.com:3333/#/user/get_user)。

Get `/user` 需要token

**步骤：**

1. 添加 UserInfo

   1. 添加 models/user_info.dart

   2. 完善 UserInfo 属性

      ```dart
        final String avatar;
        final String gender;
        final String nickname;
        final String phone;
        final int id;
      ```

      

   3. 添加工厂构造函数 factory UserInfo.fromJson(Map<String, dynamic> json)

2. 在 AuthModel 添加 以下属性/方法

   1. UserInfo _userInfo;
   2. UserInfo get userInfo => _userInfo;
   3. _getUserInfo(BuildContext context) async {}
   4. 在 login/logout 方法中 维护 userInfo

3. 在 pages/home/tab_profile/header.dart 中使用 UserInfo

4. 测试

### 5.10 model 生成半自动化

**问题：**

工厂构造函数代码能否自动生成？

![image-20191102203629795](https://tva1.sinaimg.cn/large/006y8mN6ly1g8jz4zipw6j30g409nmyx.jpg?1)

**方案：**

使用 [json_serializable](https://github.com/dart-lang/json_serializable) 

**详细用法：**

```dart
//1.安装依赖
dependencies: 
  json_annotation: ^3.0.0

dev_dependencies:
  build_runner: ^1.6.7
  json_serializable: ^3.2.2
    
//2. 引入依赖
    import 'package:json_annotation/json_annotation.dart';

//3. 代码准备
import 'package:json_annotation/json_annotation.dart';

part 'user_info.g.dart';

@JsonSerializable()
class UserInfo {
  final String avatar;
  final String gender;
  final String nickname;
  final String phone;
  final int id;

  UserInfo(this.avatar, this.gender, this.nickname, this.phone, this.id);

  factory UserInfo.fromJson(Map<String, dynamic> json) =>
      _$UserInfoFromJson(json);

  Map<String, dynamic> toJson() => _$UserInfoToJson(this);
}

//4. 执行命令
flutter packages pub run build_runner build
```

**操作：**

1. 安装依赖
2. 修改 userInfo 代码
3. 执行命令
4. 测试 @JsonKey(name: 'value')

### 5.11 优化model

**问题：**

优化现有 model，方便后面的开发。

**分析：**

GeneralType 的使用场景，

从[接口文档](http://dev.itcastor.com:3333/#/house/get_houses_condition)中看 GeneralType 对应真实的字段。

**操作：**

1. 优化 GeneralType

2. 优化 RoomDetailData

   ```dart
   import 'package:json_annotation/json_annotation.dart';
   
   part 'room_detail_data.g.dart';
   
   @JsonSerializable()
   class RoomDetailData {
     @JsonKey(name: 'houseCode')
     String id;
   
     String title;
     String community;
   
     @JsonKey(name: 'description')
     String subTitle;
     int size;
     String floor;
     int price;
     String roomType;
   
     @JsonKey(name: 'houseImg')
     List<String> houseImgs;
     List<String> tags;
     List<String> oriented;
   
     @JsonKey(name: 'supporting')
     List<String> applicances;
   
     RoomDetailData({
       this.id,
       this.title,
       this.community,
       this.subTitle,
       this.size,
       this.roomType,
       this.houseImgs,
       this.tags,
       this.price,
       this.floor,
       this.oriented,
       this.applicances,
     });
   
     factory RoomDetailData.fromJson(Map<String, dynamic> json) =>
         _$RoomDetailDataFromJson(json);
   
     Map<String, dynamic> toJson() => _$RoomDetailDataToJson(this);
   }
   ```

   

3. 优化 RoomListItemData

   ```dart
   import 'package:json_annotation/json_annotation.dart';
   
   part 'room_list_item_data.g.dart';
   
   @JsonSerializable()
   class RoomListItemData {
     @JsonKey(name: 'houseCode')
     final String id;
   
     final String title;
   
     @JsonKey(name: 'desc')
     final String subTitle;
   
     @JsonKey(name: 'houseImg')
     final String imageUri;
   
     final List<String> tags;
   
     final int price;
   
     const RoomListItemData(
         {this.title,
         this.subTitle,
         this.imageUri,
         this.tags,
         this.price,
         this.id});
   
     factory RoomListItemData.fromJson(Map<String, dynamic> json) =>
         _$RoomListItemDataFromJson(json);
   
     Map<String, dynamic> toJson() => _$RoomListItemDataToJson(this);
   }
   
   ```

   

4. 修改引用

### 5.12 城市选择器-分析

**效果：**
<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8k2d4vw71j30cm0myn4w.jpg" alt="image-20191102222807503" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8k2cu1e70j30cm0myacr.jpg" alt="image-20191102222750006" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8k4g2su3ej30cm0my10e.jpg" alt="image-20191102234008594" style="zoom:50%;" />
</div>

**分析：**

1. 城市选择使用  [city_pickers](https://pub.dev/packages/city_pickers)
2. 需要在本地缓存中 存储 city，需要使用 Store
3. 目前仅部分城市可用，在config 中添加可用城市列表
4. 多个页面共享当前 city 状态，需要使用 ScopedModel

**代码准备：**

1. 使用 [city_pickers](https://pub.dev/packages/city_pickers)

   ```dart
   //1. 安装依赖
   city_pickers: ^0.1.28
     
   //2. 引入依赖
     import 'package:city_pickers/city_pickers.dart';
   
   //3. 使用
       var result = await CityPickers.showCitiesSelector(
         context: context,
         theme: new ThemeData(
           primaryColor: Colors.green,
         ),
       );
   
    String cityName = result?.cityName;
   ```

   

2. 配置可用 city

   ```dart
   // config.dart
    static List<GeneralType> availableCitys = [
       GeneralType('北京', 'AREA|88cff55c-aaa4-e2e0'),
       GeneralType('上海', 'AREA|dbf46d32-7e76-1196'),
       GeneralType('深圳', 'AREA|a6649a11-be98-b150'),
       GeneralType('广州', 'AREA|e4940177-c04c-383d'),
     ];
   ```

   

3. 编写 CityModel

   ```dart
   //scoped_model/city.dart
   
   import 'package:hook_up_rent/models/general_type.dart';
   import 'package:scoped_model/scoped_model.dart';
   
   class CityModel extends Model {
     GeneralType _city ;
    
   
     set city(GeneralType data) {
       _city=data;
       notifyListeners();
     }
   
     GeneralType get city {
       return _city;
     } 
   }
   
   ```

   

4. 在 application 中使用 CityModel

5. Store.StoreKeys 添加 city

6. 在 scoped_model_helper.dart 中 添加 getAreaId 方法

   ```dart
    static String getAreaId(context){
       return ScopedModelHelper.getModel<CityModel>(context).city?.id??Config.AvailableCitys.first.id;
     }
   ```

   

   

### 5.13 城市选择器-实现

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8k2d4vw71j30cm0myn4w.jpg" alt="image-20191102222807503" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8k2cu1e70j30cm0myacr.jpg" alt="image-20191102222750006" style="zoom:50%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8k4g2su3ej30cm0my10e.jpg" alt="image-20191102234008594" style="zoom:50%;" />
</div>

**分析：**

1. 点击按钮
2. 弹出城市选择器
3. 选择城市
4. 保存城市
   1. 判断城市合法
   2. 城市保存到 ScopedModel
   3. 城市保存到 Store
5. 打开app，获取城市
   1. 先从 ScopedModel 获取
   2. 如果前者为空，使用默认值的第一个 ；并从 Store 获取（异步）

**步骤：**

1. 打开 widgets/search_bar/index.dart
2. 实现修改城市逻辑
   1. 使用 _changeLocation
   2. 实现 _changeLocation
   3. 实现 _saveCity
3. 实现获取城市逻辑
   1. 使用 _getLocation
   2. 实现 _getLocation
   3. 使用 city.name
4. 测试



### 5.14 联调 FilterBar

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8ncetrlqwj30p819wnh0.jpg" alt="image-20191105183211125" style="zoom: 33%;" />

**分析：**

其实就是获取条件数据。

接口，参考[接口文档](http://dev.itcastor.com:3333/)。

```dart
final url = '/houses/condition?id=$areaId';

List<GeneralType> areaList = List<GeneralType>.from(data['area']['children']
    .map((item) => GeneralType.fromJson(item))
    .toList());
List<GeneralType> priceList = List<GeneralType>.from(
    data['price'].map((item) => GeneralType.fromJson(item)).toList());
List<GeneralType> rentTypeList = List<GeneralType>.from(
    data['rentType'].map((item) => GeneralType.fromJson(item)).toList());
List<GeneralType> roomTypeList = List<GeneralType>.from(
    data['roomType'].map((item) => GeneralType.fromJson(item)).toList());
List<GeneralType> orientedList = List<GeneralType>.from(
    data['oriented'].map((item) => GeneralType.fromJson(item)).toList());
List<GeneralType> floorList = List<GeneralType>.from(
    data['floor'].map((item) => GeneralType.fromJson(item)).toList());
```

​	

**步骤：**

1. 打开文件 pages/home/tab_search/filter_bar/index.dart
2. 核心编码
   1. 将filter_bar/data.dart 的数据剪切到 index.dart 作为 6 个 List 状态默认值为[];
   2. 在 _getData 中获取网上数据并 setState
3. 测试及优化
   1. 测试
   2. 解决数据返回时，组件已卸载掉问题
   3. 解决城市变更的问题

### 5.15 联调找房页

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qoh45y15j30p819w1gi.jpg" alt="image-20191105215732107" style="zoom:50%;" />



**分析：**

1. 需要一个数据列表的状态 List<RoomListItemData> dataList;

2. 实现 FIlterBar.onChange 的处理逻辑

3. 房屋列表查询接口

   ```dart
   //1. url
   String url = '/houses?cityId=' +
       '$cityId&area=$area&mode=$mode&price=$price&more=$more&start=1&end=20';
   //2. 返回数据
   resMap['body']['list'];
   ```

   

**步骤：**

1. 打开文件 pages/home/tab_search/index.dart
2. 核心代码
   1. 添加状态 List<RoomListItemData> dataList;
   2. 展示数据使用 dataList；
   3. 完善 RoomListItemWidget ， 图片地址需要添加 baseUri
   4. 给 FIlterBar 添加 onChange 参数 _onFilterBarChange(FilterBarResult data) async {}
   5. 实现 _onFilterBarChange 方法
3. 测试

### 5.16 房屋详情页

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8ng6sn3lbj30p819w42u.jpg" alt="image-20191105204257467" style="zoom:50%;" />

**分析：**

进页面就获取数据

接口详情：

```dart
// url
final url = '/houses/$roomId';

// 数据
resMap['body']
```

**步骤：**

1. 打开文件 pages/room_detail/index.dart
2. 在列表中使用 data；
3. 借助 initState 生命周期 执行 _getData
4. 实现 _getData() async {} 方法，注意解决图片相对路径问题
5. 测试

### 5.17 房屋管理页

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8nh1icu57j30p819w7iy.jpg" alt="image-20191105211234993" style="zoom:50%;" />

**分析：**

进页面就获取数据

接口详情：

```dart
// url
    String url = '/user/houses';

//数据
   resMap['body'];
```



**步骤：**

1. 打开文件 pages/room_manage/index.dart
2. 将无状态组件转成有状态组件
3. 添加状态List<RoomListItemData>  availableDataList
4. 借助 initState 生命周期 执行 _getData，注意使用延迟执行 _getData
5. 实现 _getData() async {} 方法，注意接口需要 token
6. 测试

### 5.18 房源发布-分析

**结构分析：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8nh3k1oj9j30p819wn96.jpg" alt="image-20191105211432939" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8ocdz3blkj30p819w18z.jpg" alt="image-20191106151725583" style="zoom:33%;" />
</div>

**功能拆分：**

+ 基础数据准备阶段

  + 户型列表
  + 楼层列表
  + 朝向列表

+ 输入信息阶段

  + 选择小区

+ 数据提交阶段

  + 校验数据

  + 上传图片

  + 提交数据


**步骤：**

1. 条件数据准备
2. 选择小区逻辑
3. 图片上传逻辑
4. 数据验证及提交
5. 优化

### 5.19 房源发布-条件数据

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8occymkspj30p819w13k.jpg" alt="image-20191106151626499" style="zoom:50%;" />

**分析：**

接口及返回数据

```dart
    //url
    String url = '/houses/params';

    //返回处理
    var res = await DioHttp.of(context).get(url);
    var data = json.decode(res.toString())['body'];
    List<GeneralType> floorList = List<GeneralType>.from(
        data['floor'].map((item) => GeneralType.fromJson(item)).toList());
    List<GeneralType> orientedList = List<GeneralType>.from(
        data['oriented'].map((item) => GeneralType.fromJson(item)).toList());
    List<GeneralType> roomTypeList = List<GeneralType>.from(
        data['roomType'].map((item) => GeneralType.fromJson(item)).toList());

```



**步骤：**

1. 打开页面 page/room_add/index.dart

2. 添加 3 个状态

   ```dart
     List<GeneralType> floorList = [];
     List<GeneralType> orientedList = [];
     List<GeneralType> roomTypeList = [];
   ```

3. 使用 3 个状态的数据

4. 借助 initState 生命周期，延迟调用 _getParams

5. 实现 _getParams() async {}

6. 测试

### 5.20 房源发布-小区选择-主流程

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8nh3k1oj9j30p819wn96.jpg" alt="image-20191105211432939" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8odxpyrbwj30p819wdn6.jpg" alt="image-20191106161057893" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8ofzwx9ltj30p819wk30.jpg" alt="image-20191106172219026" style="zoom:25%;" />
</div >

**分析：**

1. 页面基本结构

   + Scaffold
     + AppBar
     + ListView

   ​	

2. 准备 Community Model

   ```dart
   import 'package:json_annotation/json_annotation.dart';
   part 'community.g.dart';
   
   @JsonSerializable()
   class Community{
     @JsonKey(name: 'community')
     final String id;
   
     @JsonKey(name: 'communityName')
     final String name;
   
     Community(this.id, this.name);
     factory Community.fromJson(Map<String,dynamic> json)=>_$CommunityFromJson(json);
     Map<String,dynamic> toJson()=>_$CommunityToJson(this);
   }
   
   List<Community> list=[
     Community('11','小区1'),
     Community('22','小区2'),
     Community('33','小区3'),
   ];
   ```



**步骤：**

1. 准备

   1. 新建文件  models/community.dart 
   2. 使用数据并执行构建命令
   3. 新建文件 pages/community_picker.dart
   4. 添加依赖及有状态组件 CommunityPickerPage

2. 核心编码

   1. 完成页面基本结构

   2. 路由注册

   3. 在 room_add 页面调用CommunityPickerPage并使用返回值

   4. 完善页面 Body 部分

      

### 5.21 房源发布-小区选择-细节完善及联调

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8oh1tzpexj30p819wdrk.jpg" alt="image-20191106175348034" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8ogym5y0fj30p819wdnt.jpg" alt="image-20191106175537711" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8ogzewm9vj30p819w4a6.jpg" alt="image-20191106175601850" style="zoom:25%;" />
</div>

**分析：**

1. 添加 searchBar

2. 小区选择页接口联调

   ```dart
   //接口说明
   final url = '/area/community?name=$value&id=$areaId';
   var res = await DioHttp.of(context).get(url);
   var data = json.decode(res.toString())['body'];
   List<Community> dataList = List<Community>.from(
       data.map((item) => Community.fromJson(item)).toList());
   ```

   

**步骤：**

1. 打开文件 pages/community_picker.dart

2. 添加列表状态 List<Community> dataList = []; 并使用

3. 添加 searchBar

4. appBar 背景色及隐藏回退按钮

5. 添加并现 SearchBar.onSearchSubmit 方法

6. 测试

   

### 5.22 房源发布-图片上传

**效果：**

点击提交，上传图片，上传成功后，把图片通过toast 展示到页面上。
<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8ocdz3blkj30p819w18z.jpg" alt="image-20191106151725583" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8phuhiy3rj30p819wk7z.jpg" alt="image-20191107151150374" style="zoom:33%;" />
</div>

**分析：**

1. 图片上传函数

​	输入： List<File>

​	输出： String imageString ，多张图片地址以 ｜ 隔开

​	函数签名 ：Future<String> uploadImages(List<File> files, BuildContext context) async {}

2. 图片上传接口

```dart
//准备 formData 
var fromData = FormData();
  fromData.add("file",
      files.map((file) => UploadFileInfo(file, 'picture.jpg')).toList());

//准备url
  String url = '/houses/image';

//发送请求，处理返回
  var res = await DioHttp.of(context).postFormData(url, fromData, token);
  var data = json.decode(res.toString())['body'];
  String images = List<String>.from(data).join('|');
```



**步骤：**

1. 实现图片上传函数
   1. 添加文件 utils/upload_images.dart
   2. 编写函数的主体结构
   3. 实现函数体
2. 使用图片上传函数
   1. 打开 room_add/index.dart
   2. 添加状态 List<File> images = [];
   3. 在 CommonImagePicker.onChange 中 setState
   4. 添加并使用 _submit() async {} 方法
   5. 实现 _submit
3. 测试

### 5.23 房源发布-数据校验及提交

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8phzuwao2j30p819wwt1.jpg" alt="image-20191107151647017" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8pkqlzxe0j30ks16a42g.jpg" alt="image-20191107165149497" style="zoom:33%;" />
<div>
**分析：**

1. 数据校验

   【小区】，【租金】，【大小】 不能为空

2. 接口联调

   接口说明：

   ```dart
   //参数
   Map<String, dynamic> params = {
     "title":'',
     "description": '',
     "price": '',
     "size": '',
     "oriented": '',
     "roomType": '',
     "floor":'',
     "community": '',
     "houseImg": '',//多条以 ｜ 分割
     "supporting": '',//多条以 ｜ 分割
   };
   
   //接口url
   String url = '/user/houses';
   
   //数据返回
   var res = await DioHttp.of(context).post(url, params, token);
   var status = json.decode(res.toString())['status'];
   ```

   

**步骤：**

1. 打开 room_add/index.dart
2. 数据校验逻辑
3. 参数准备
4. 发送请求并返回
5. 测试
6. 优化

### 5.24 房源发布-优化

**问题1:**

![image-20191107155636634](https://tva1.sinaimg.cn/large/006y8mN6ly1g8pj53dpiyj30m1026js2.jpg)

**解决1:**

如果可选项为空，则不展示对应的选择项

---

**问题2:**

选择小区时，点击搜索框时，报错

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8plfac89lj30os09adjh.jpg" alt="image-20191107171538194" style="zoom:50%;" />

**解决2:**

添加空判断！

---

**问题3:** 

【房源发布】页数据提交后，【房屋管理】页列表未更新！

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8phzuwao2j30p819wwt1.jpg" alt="image-20191107151647017" style="zoom:33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8pkqlzxe0j30ks16a42g.jpg" alt="image-20191107165149497" style="zoom:33%;" />
<div>

**解决3:**

通过路由传参数解决

### 5.25 登陆过期处理

**问题：**

点击提交无反应！！！

  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8phzuwao2j30p819wwt1.jpg" alt="image-20191107151647017" style="zoom:33%;" />

**分析：**

1. 接口未正常返回应该给予提示
2. 处理登陆过期问题。

登陆过期是所有需要登陆态接口的通用问题，

通过 Dio 的拦截器（Interceptor） 解决。

用法：

```dart
Interceptor interceptor = InterceptorsWrapper(onResponse: (Response res) {
});

client.interceptors.add(interceptor);
```

**解决：**

1. 打开 room_add/index.dart 在 _submit 方法中处理未正常返回的情况
2. 解决登陆态过期问题
   1. 打开 utils/dio_http.dart
   2. 添加 interceptor
   3. 实现 interceptor
   4. 使用 interceptor
3. 测试

### 5.26 添加 flutter 启动页

**问题：**

重启 app 之后，需要重新登陆

**方案：**

在启动页处理

启动页就是一个普通的页面，延迟 3 秒跳转到首页

**效果：**


<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qoh9bqtmj30p819wqbp.jpg" alt="image-20191108153505121" style="zoom: 33%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qo5nbsp0j30p819w7p1.jpg" alt="image-20191108153532725" style="zoom:33%;" />
</div>



**步骤：**

1. 准备
   1. 添加图片资源 - static/images/loading.jpg
   2. 创建 pages/loading.dart
2. 核心编码
   1. 完成页面基本结构
   2. 实现延迟跳转和调用initApp
   3. 注册路由
   4. 在 application.dart中 修改程序入口页面
3. 测试及优化
   1. 退出登陆 store 未清空问题 — logout 清空 store
   
   2. loading 页直接跳转到 登陆页问题 — 特殊处理
   
      

## 6 构建打包

### 6.1 构建打包分析

主要包含几部分

+ 准备
  + 桌面图标修改
  + 应用名称修改
  + 启动图片修改
+ 构建

资源地址：`/resource/chapter6/01静态资源/package`

添加启动页后仍然有明显的白屏！
<div align=left>
    <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qpo42gijj30p819wab5.jpg" alt="image-20191108162756561" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qpogs8jwj30p819wqbp.jpg" alt="image-20191108162813406" style="zoom:25%;" />
    <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8qo5nbsp0j30p819w7p1.jpg" alt="image-20191108153532725" style="zoom:25%;" />
</div>




### 6.2 构建 Android 包

**效果**：

生成打包文件，能在开启开发模式的手机上运行
<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8rl57wx5gj30l016kb29.jpg" alt="image-20191109103659224" style="zoom:31%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8rl5rr6i2j30ji13wnpd.jpg" alt="image-20191109103730446" style="zoom:33%;" />
</div>



**步骤：**

1. 修改应用名称

    `/项目目录/android/app/src/main/AndroidManifest.xml`    文件 `application` 标签 `android:label` 属性

2. 修改图标及背景图

   文件地址：`/resource/chapter6/01静态资源/package/android/res`

   目标地址：`/项目目录/android/app/src/main/res`

3. 修改构建配置

   在 `android/app/build.gradle` 文件中 `android.lintOption` 添加属性 `checkReleaseBuilds false`

4. 构建

   flutter build apk 

5. 查看文件



部分同学构建出现版本问题，参考[解决方案](https://github.com/flutter/flutter/issues/27254)

![image-20191109151923403](https://tva1.sinaimg.cn/large/006y8mN6ly1g8rtb22358j318i09aaks.jpg)

![image-20191109152002315](https://tva1.sinaimg.cn/large/006y8mN6ly1g8rtbsj8wzj31cs0ji76j.jpg)

### 6.3 构建 ios 包

**效果**：

生成打包文件，能在开启开发模式的手机上运行（需要 苹果开发者账号 ）
<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8rl3an1c4j30jc10s4qp.jpg" alt="image-20191109103508002" style="zoom: 38%;" />
  <img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g8rl44se3dj30mg16kgqc.jpg" alt="image-20191109103552033" style="zoom:33%;" />
</div>

**步骤：**

1. 修改应用名称 

   `/项目目录/ios/Runner/info.plist`文件 修改key 为 CFBundleName 的值。

2. 修改图标及背景图

   文件地址：`/resource/chapter6/01静态资源/package/ios/Assets.xcassets`

   目标地址：`/项目目录/Runner/Assets.xcassets`

3. 构建

   flutter build ios

4. 查看文件

   

## 7 总结

1. 回顾实现的功能/页面

   实现了完整的登陆注册，添加房源，查找房源，查看房源的功能。

   - 登陆页

   - 注册页

   - 首页

     - 首页tab
     - 搜索tab
     - 咨询tab
     - 我的tab

   - 搜索页

   - 房屋管理

   - 添加房屋

   - 房屋详情

   - 设置

2. 回顾项目知识点

   **项目知识点：**

   - 使用第三方组件

   - **通用组件封装**

   - 使用静态资源	

     - 本地图片
     - 网络图片
     - 使用自带 icon
     - 使用字体 icon
     - 网络图片缓存超时处理

   - 本地存储及 store 封装

   - 数据管理 scoped_model							

   - 网络请求 及 dio_http 封装

   - 序列化及反序列化半自动生成实体类

   - 图片上传

   - app icon 及 启动页

3. 个人感悟

   技术一直在更新；唯有终身学习，才能让自己保持竞争力！