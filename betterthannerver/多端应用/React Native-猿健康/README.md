# react native

## 第1章 课程简介

### 1-1 react native 简介

学习 react 的时候，有提到 react 的三大特性中的“一次学习，随处编写”。

![image-20191113174727440](https://tva1.sinaimg.cn/large/006y8mN6gy1g8wk2i2ibej30pv0hltby.jpg)

为什么 react 可以 “一次学习，随处编写”？

![image-20191120092500142](https://tva1.sinaimg.cn/large/006y8mN6ly1g948vx4bnsj31g60qk7d6.jpg)





所以 React native 和 Cordova，Ionic，有本质的区别。前者使用原生的组件，后者使用dom。

 React native 和 Cordova，Ionic的核心编程语言都是 JavaScript。

react native 是从**前端**到**大前端**一条不错的途径。 



### 1-2 课程内容

如何 通过 react native 来实现原生应用（android，ios）的开发？

先讲一些基础知识，然后从0到1实现一个 关于健康的 app 项目。



**项目介绍：**

1. 体检预约
   1. 体检预约（列表）
   2. 体检详情
   3. 体检
2. 体检报告
   1. 体检报告（列表）
   2. 报告详情
3. 登陆相关页面
   1. 登陆
   2. 注册
   3. 设置



**知识点：**

1. 初始化 react native 项目

2. 通用路由解决方案

3. 使用第三方 库/组件

4. 使用字体图标

5. 封装自己的字体图标库

6. 本地及网络图片的使用

7. 实现基本的页面布局

8. 封装自己的工具库

   1. 通用请求工具 commonHttp
   2. 通用本地存储 commonStore
   3. 通用提示 commonToast

9. 封装自己的组件

   1. CommonFormItem

   2. CommonFormRadio

   3. CommonFloatButton

      <div><img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wf35wli1j30ig0hgq51.jpg" alt="image-20191214181532420" style="zoom: 50%;" /></div>

10. 通 context 实现全局共享状态，并实现本地缓存

11. 更熟练的 typescript 使用



**面向群体**：

1. 有一定 JavaScript 基础的同学

2. 有一定 react 基础的同学

3. 会使用 react hooks

4. 最好熟悉 typescript，但不必须

   

## 第2章 基础知识

### 2-1 环境搭建

[react native 官方](https://facebook.github.io/react-native/docs/getting-started) 提供两种环境搭建方式。一种是通过 [Expo CLI](https://docs.expo.io/) 安装，另外的一种是 通过 react Native CLI 安装。前者安装简单但是在原生方面的扩展会有限制。

**前置条件**：

需要安装 [nodejs](https://nodejs.org/)

用手机安装 [expo app](https://expo.io/tools#client)

可选编码工具：[vscode](https://code.visualstudio.com/)

**安装方式：**

```shell
//1.全局安装 expo-cli
npm install -g expo-cli

//2.初始化项目
expo init AwesomeProject

//3.运行项目
cd AwesomeProject
npm start # 也可以使用： expo start
```

**测试及代码分析：**

修改代码测试

###  2-2 基础组件-介绍

**组件介绍：**

+ View

  视图组件，类似 html 中的 div，是个容器组件。支持 FlexBox 布局，可以绑定事件。对应 IOS 的 UIView，android 中的 android.view.View。

+ ScrollView

  滚动视图组件，可以响应滚动事件。ScrollView内的内容会一次性全部渲染出来，所以针对长列表会有性能问题。长列表使用 FlatList 或类似的组件。

+ SafeAreaView

  安全区域时图组件，主要解决不规则屏幕的问题。

+ Text

  文本组件，用于显示文本，支持**嵌套**、样式，以及触摸处理。在 react native 中，文本必须放在 Text 内。

+ TextInput

  文本输入组件。获取文本值使用 onChangeText，而不是 onChange。

+ Image

  图片显示组件。支持网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。

  ```jsx
  <Image source={require('imagePath.png')}></Image>
  <Image source={{uri:'http://imageUri.png'}} style={{width:100,height:100}}></Image>
  ```

  对于网络和 base64 数据的图片需要手动指定尺寸！

  

**总结：**

react native 中必须使用 jsx；基础组件也是首字母大写。

以 IOS 或 Android 结尾的组件为对应平台专用组件。

### 2-3 基础组件-实践

**效果：**

实现一个获取天气的小应用。



![image-20191118182116999](https://tva1.sinaimg.cn/large/006y8mN6ly1g92d59kglej30af06djsj.jpg)





**分析及资源：**

1. 回顾 [react hook 用法 ](https://zh-hans.reactjs.org/docs/hooks-state.html)

   ```jsx
   import React, { useState } from 'react';
   
   function Example() {
     // 声明一个叫 "count" 的 state 变量
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

2. 结构

   + SafeAreaView

     + Image

     + Text—请输入城市

     + Text— 当前城市

     + TextInput--请输入城市输入框

     + Text—onPress—点击

     + Text— 今日天气

       

3. 存在两个状态 city 和 weather

4. 图片地址 http://www.itcast.cn/2018czgw/images/logo.png

5. getData 代码

   ```js
   //getData.js
   const getData = (city = "北京") => {
     return fetch(`http://wthrcdn.etouch.cn/weather_mini?city=${city}`)
       .then(response => response.json())
       .then(data => {
         if (data.status !== 1000) {
           return "城市名称错误";
         }
         return data.data.forecast[0].type;
       });
   };
   
   export default getData;
   ```

   

**步骤：**

1. 准备
   1. 新建 getData.js 文件， 拷贝代码
   2. 删除 App.js 中的代码
2. 核心编码
   1. 添加依赖 react，react-native，getData
   2. 编写 App 函数组件
   3. 实现页面结构
   4. 添加并使用两个状态
3. 测试

### 2-4 其他组件-测试

**效果：**

将点击的 Text 换成按钮，使用不同效果的按钮；显示5天天气预报。

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g95itthj4vj30ow19atk5.jpg" alt="image-20191121115450821" style="zoom:50%;" />

**分析：**

Button 最简单的跨平台按钮

Touchable系列

+ TouchableHighlight，当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。**需要指定点击事件才有效果**。
+ TouchableNativeFeedback，使用原生的渲染触摸反馈，只支持 android
+ TouchableOpacity，点击透明度降低，不会添加底层的颜色
+ TouchableWithoutFeedback,即不需要视觉反馈

FlatList 跨平台的高性能列表。

**步骤：**

1. 测试 Button
   1. 添加依赖  Button,TouchableHighlight, TouchableNativeFeedback, TouchableOpacity,TouchableWithoutFeedback,  FlatList
   2. 使用组件
   3. 测试效果
2. 测试 FlatList
   1. 修改 getData 使之返回多条数据
   2. 修改weather 的初始值
   3. 使用 FlatList 替代原来的 Text 显示多天的天气预报
   4. 测试效果



### 2-5 样式简介

**1. StyleSheet.create**

用于不变的样式，可以减少内存分配进而提高性能

**2. 样式的拼接**

```jsx
 <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
```



**3. flex 布局**

> 参考文档1：[react native api](https://reactnative.cn/docs/layout-props/)
>
> 参考文档2:[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
>
> 参考文档3:[Flex 布局教程：语法篇](https://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

+ flex Container
  + flexDirection
  
    ![image-20191119201124297](https://tva1.sinaimg.cn/large/006y8mN6ly1g93ly6b4lij30in08awho.jpg)
  
  + flexWrap
  
    ![image-20191119201138469](https://tva1.sinaimg.cn/large/006y8mN6ly1g93lyetqdtj30jo098dj0.jpg)
  
  + justifyContent
  
    ![image-20191119201054503](https://tva1.sinaimg.cn/large/006y8mN6ly1g93lxnkalcj308o0dhgoo.jpg)
  
  + alignItems
  
    ![image-20191119201202585](https://tva1.sinaimg.cn/large/006y8mN6ly1g93lyufwsoj30b10dswi3.jpg)
  
  + alignContent
  
    ![image-20191119201223130](https://tva1.sinaimg.cn/large/006y8mN6ly1g93lz6nc5jj30bh0dqgqd.jpg)
+ flex item
  + order
  
    ![image-20191119201340304](https://tva1.sinaimg.cn/large/006y8mN6ly1g93m0j6th8j30gl0dn0wn.jpg)
  
  + flexGrow,
  
    如果存在剩余空间，组件如何放大
  
    ![image-20191119201355909](https://tva1.sinaimg.cn/large/006y8mN6ly1g93m0skv2kj30jz08aju3.jpg)
  
  + flexShrink
  
    如果空间不足，组件如何压缩
  
    ![image-20191119201437760](https://tva1.sinaimg.cn/large/006y8mN6ly1g93m1ixlzhj30k604v0uz.jpg)
  
  + flexBasis
  
    定义元素的大小。
  
    ![image-20191119200959685](https://tva1.sinaimg.cn/large/006y8mN6ly1g93lwp4ov1j30cn063gm5.jpg)
  
  + flex
  
    + 当`flex`为一个正整数时，组件尺寸会具有弹性，并根据具体的 flex 值来按比例分配。比如两个组件在同一个父容器中，一个`flex`为 2，另一个`flex`为 1，则两者的尺寸比为 2：1。 `flex: ` equates to `flexGrow: , flexShrink: 1, flexBasis: 0`.
  
    + 当`flex`为 0 时，组件尺寸由`width`和`height`决定，此时不再具有弹性。
  
    + 当`flex`为-1 时，组件尺寸一般还是由`width`和`height`决定。但是当空间不够时，组件尺寸会收缩到`minWidth`和`minHeight`所设定的值。
  
  + align-self
  
    ![image-20191119201637787](https://tva1.sinaimg.cn/large/006y8mN6ly1g93m3lybzlj30jk0a1did.jpg)

**4. 绝对定位**

组件默认是 相对定位的（position：’relative’），可以将组件设置成 绝对定位（position：’absolute’），通过top`, `right`, `bottom`, left控制他的位置。元素设置成 绝对定位后，就会脱离文档流。可以通过zIndex 控制 z 轴方向的层级。

### 2-6 平台 api 简介

开发app 需要一些原生的能力。例如定位，获取用户照片，使用本地存储等。这些能力一般通过 [平台 api](https://docs.expo.io/versions/latest/) 的方式来提供。



**平台 api - 定位**

使用 expo 的 [Location](https://docs.expo.io/versions/v35.0.0/sdk/location/)

![image-20191119222032365](https://tva1.sinaimg.cn/large/006y8mN6ly1g93pojsdzkj30ij0bugmz.jpg)

测试：

1. 安装依赖
2. 使用官方测试代码
3. 代码分析
4. 测试

**平台api - 用户图像**

使用 expo 的 [ImagePicker](https://docs.expo.io/versions/v35.0.0/sdk/imagepicker/)



![image-20191119221919640](https://tva1.sinaimg.cn/large/006y8mN6ly1g93pnayhsqj30lr0n1dkg.jpg)

测试：

 	1. 安装依赖
 	2. 使用官方测试代码
 	3. 代码分析
 	4. 测试

**平台 api - 本地存储**

使用 expo 的 [SecureStore](https://docs.expo.io/versions/v35.0.0/sdk/securestore/)

![image-20191119221953625](https://tva1.sinaimg.cn/large/006y8mN6ly1g93pnvx2xaj30jp0bxmyp.jpg)

测试：

 	1. 安装依赖
 	2. 编写测试代码
      	1. 引入 expo-secure-store 依赖
      	2. 引入 Text 组件
      	3. 添加状态 text
      	4. 显示 text
      	5. 添加2个操作按钮
      	6. 实现按钮响应事件
 	3. 测试

## 第3章 项目框架

### 3-1 初始化项目

**目标：**

初始化项目，安装路由依赖！

**分析：**

路由方案选型：

+ js 实现的路由 [reactnavigation](https://reactnavigation.org/zh-Hans/)

+ 原生路由 [react-native-navigation](https://github.com/wix/react-native-navigation)

类型系统？typescript！

+ 更好的错误提示
+ 更加友好的 api 提示

**操作：**

```shell
# 1. 初始化项目
expo init react-native-health
# 选择 typescript 模板

# 2. 用vscode 打开项目
code react-native-health

# 3. 安装 react -navigation
expo install react-navigation react-native-gesture-handler react-native-reanimated react-native-screens
```



### 3-2 配置路由-stack navigator

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g9cn17yelpj30cg0mn764.jpg" alt="image-20191127153906205" style="zoom:50%;" />

**分析：**

主要参考 [官网](https://reactnavigation.org/docs/zh-Hans/hello-react-navigation.html)

1. 安装依赖

   ```shell
   yarn add react-navigation-stack
   # 或者 npm install react-navigation-stack
   ```

2. 参考官网代码

   ```tsx
   import React from 'react';
   import { View, Text } from 'react-native';
   import { createAppContainer } from 'react-navigation';
   import { createStackNavigator } from 'react-navigation-stack';
   
   class HomeScreen extends React.Component {
     render() {
       return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>Home Screen</Text>
         </View>
       );
     }
   }
   
   const AppNavigator = createStackNavigator({
     Home: {
       screen: HomeScreen,
     },
   });
   
   export default createAppContainer(AppNavigator);
   ```

3. 拆分官网代码

   

**步骤：**

1. 准备
   1. 安装依赖 yarn add react-navigation-stack
   2. 打开文件 App.tsx 
   3. 使用官网代码覆盖 
2. 拆分出 HomePage
   1. 添加依赖 react react-native
   2. 编写函数组件
   3. 编写样式
   4. 导出
3. 拆分出 AppNavigator
   1. 使用官网模板代码
   2. 修改代码
4. 修改App.tsx
5. 测试



### 3-3 路由跳转

**效果：**

![image-20191127163210373](https://tva1.sinaimg.cn/large/006y8mN6ly1g9cokedczqj316k0t6n23.jpg)



**分析：**

1. 在 home 页面添加跳转按钮

2. 添加一个新的 login 页面

3. 通过官网学习页面跳转

   ```tsx
   import * as React from 'react';
   import { Button, View, Text } from 'react-native';
   import { createAppContainer } from 'react-navigation';
   import { createStackNavigator } from 'react-navigation-stack';
   
   class HomeScreen extends React.Component {
     render() {
       return (
         <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>Home Screen</Text>
           <Button
             title="Go to Details"
             onPress={() => this.props.navigation.navigate('Details')}
           />
         </View>
       );
     }
   }
   ```

   

4. 解决类型问题，可以参考[官网](https://reactnavigation.org/docs/zh-Hans/typescript.html)

   ```tsx
   import { NavigationStackProp } from 'react-navigation-stack';
   
   type Props = {
     navigation: NavigationStackProp<{ userId: string }>;
   };
   
   class ProfileScreen extends React.Component<Props> {
     // ...
   }
   ```

   

**操作：**

1. 准备
   1. 打开 src/pages/home/index.tsx
2. 核心编码
   1. 添加 Button，先添加依赖，再添加 jsx
   2. 参考官网代码实现 Button 响应事件
   3. 添加 login 页面
   4. 在 AppNavigator.tsx 中注册 login 页面
3. 测试效果
4. 添加类型检查

### 3-4 路由参数处理

**效果：**

![image-20191127175428784](https://tva1.sinaimg.cn/large/006y8mN6ly1g9cqy1fevbj31680lswj0.jpg)



**分析：**

参考[官网](https://reactnavigation.org/docs/zh-Hans/params.html)

- `navigate`接受可选的第二个参数，以便将参数传递给要导航到的路由。 例如：`navigation.navigate('RouteName', {paramName: 'value'})`。
- 我们可以使用`navigation.getParam`读取参数

**步骤：**

1. 增加页面跳转按钮并传参数 reservationDetailId
2. 添加体检预约详情页 src/pages/reservationDetail/index.tsx
3. 完善 reservationDetail 页面
4. 在路由系统中注册 reservationDetail 页面
5. 使用并展示 reservationDetailId
6. 测试

### 3-5 页面 header 优化

**问题：**

1. 页面没有标题
2. 页面 回退按钮的颜色

![image-20191127184309157](https://tva1.sinaimg.cn/large/006y8mN6ly1g9cscoer9mj30y80m4q5y.jpg)



**分析：**

1. 配置页面 标题 [参考](https://reactnavigation.org/docs/zh-Hans/headers.html)

   ```tsx
   class HomeScreen extends React.Component {
     static navigationOptions = {
       title: 'Home',
     };
     /* render function, etc */
   }
   ```

   

2. 设置 app 主题颜色

   ```tsx
   enum CommonColors {
     lineGray = '#00000012',
     backgroudGray = '#F3F2F7',
     gray = 'gray',
     black = 'black',
     white = 'white',
     primary = '#2CDED4',
     gradientStart = '#2CDFD4',
     gradientEnd = '#29CDC2'
   }
   
   export default CommonColors;
   ```

   

3. 设置 header 颜色 [参考](https://reactnavigation.org/docs/zh-Hans/headers.html)

   ```tsx
   //1. 单独设置颜色
   class HomeScreen extends React.Component {
     static navigationOptions = {
       title: 'Home',
       headerStyle: {
         backgroundColor: '#f4511e',
       },
       headerTintColor: '#fff',
       headerTitleStyle: {
         fontWeight: 'bold',
       },
     };
   
     /* render function, etc */
   }
   
   //2.全局设置颜色
   const Home = createStackNavigator(
     {
       Feed: ExampleScreen,
       Profile: ExampleScreen,
     },
     {
       defaultNavigationOptions: {
         headerTintColor: '#fff',
         headerStyle: {
           backgroundColor: '#000',
         },
       },
       navigationOptions: {
         tabBarLabel: 'Home!',
       },
     }
   );
   
   const Tabs = createBottomTabNavigator({ Home });
   ```

   

**步骤：**

1. 添加 app 主题颜色
2. 设置默认 header 颜色
3. 设置页面标题
   1. 首页--猿健康
   2. 登陆页--登陆
   3. 预约详情页--预约详情
4. 测试

### 3-6 路由跳转优化

在普通函数中如何实现页面跳转？

**效果：**

![image-20191128104105776](https://tva1.sinaimg.cn/large/006y8mN6ly1g9dk1fnacuj30l30et0vq.jpg)



**分析：**

看[官网](https://reactnavigation.org/docs/zh-Hans/navigating-without-navigation-prop.html)

```tsx
//1.获取引用 App.js

import { createStackNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './NavigationService';

const TopLevelNavigator = createStackNavigator({
  /* ... */
});

const AppContainer = createAppContainer(TopLevelNavigator);

export default class App extends React.Component {
  // ...

  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
///////////////////////////////////////////////////////////////////////////
//2.定义 NavigationService.js

import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export default {
  navigate,
  setTopLevelNavigator,
};
///////////////////////////////////////////////////////////////////////////
//3.使用 any js module
import NavigationService from 'path-to-NavigationService.js';

// ...

NavigationService.navigate('ChatScreen', { userName: 'Lucy' });
```



分析结论：

1. 编写 helper 函数 ，包含 setRef 和 navigate 两个方法
2. 在 App.tsx 中获取引用
3. 使用 navigate

**步骤：**

1. 添加文件 src/utils/reactNavigationHelper.ts
   1. 导入 NavigationActions
   2. 定义变量
   3. 实现 setNavigatorRef 方法
   4. 实现 navigate 方法
   5. 导出
2. 在 App.tsx 中获取引用
   1. 导入 useRef, useEffect
   2. 通过 useRef 获取 ref
   3. 通过 useEffect 调用 setNavigatorRef
3. 使用 navigate
4. 测试

## 第4章 静态页面

### 4-1 首页-主体结构

**效果：**

![image-20191128111251848](https://tva1.sinaimg.cn/large/006y8mN6ly1g9dkyhe0izj30hg0eqjw5.jpg)





**分析：**

主体结构

+ ScrollView
  + 轮播图--swiper
  + 功能导航— Functions
  + 广告— Image

**步骤：**

1. 打开 src/home/index.tsx
2. 完善主体结构
3. 测试

### 4-2 首页-轮播图

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm6hej78j30ow19agyp.jpg" alt="image-20191128155620332" style="zoom:50%;" />

**分析：**

1. 参考第三方组件

   [react-native-swiper](https://github.com/leecade/react-native-swiper)

   ```jsx
   //1. 安装依赖 
   yarn add react-native-swiper
   // npm install react-native-swiper
   
   //2. 使用
   export default class SwiperComponent extends Component {
     render() {
       return (
         <Swiper style={styles.wrapper} showsButtons={true}>
           <View style={styles.slide1}>
             <Text style={styles.text}>Hello Swiper</Text>
           </View>
           <View style={styles.slide2}>
             <Text style={styles.text}>Beautiful</Text>
           </View>
           <View style={styles.slide3}>
             <Text style={styles.text}>And simple</Text>
           </View>
         </Swiper>
       )
     }
   }
   ```

2. 参考图片

   ```js
   const defaultImages = [
     'https://tva1.sinaimg.cn/large/006y8mN6ly1g9bk8d7e7ej30ku09q77w.jpg',
     'https://tva1.sinaimg.cn/large/006y8mN6ly1g9bk851wr6j30ku09qq74.jpg',
     'https://tva1.sinaimg.cn/large/006y8mN6ly1g9bk87v2x8j30ku09qq46.jpg'
   ];
   // 图片宽750px，高424px；
   var imageWidth = 750.0;
   var imageHeight = 350.0;
   ```

3. 获得屏幕宽度

   ```js
   import { Dimensions } from "react-native";
   
   const getScreenWidth: () => number = () => Dimensions.get("window").width;
   export default getScreenWidth;
   ```

   

**步骤：**

1.  安装依赖 `yarn add react-native-swiper`
2. 新建文件 src/utils/getScreenWidth.ts 并使用 分析中的代码
3. 实现 CommonSwiper.tsx
   1. 新建文件 /src/components/CommonSwiper.tsx
   2. 添加依赖，包含 react，react-native
   3. 使用参考图片
   4. 计算 组件的高度
   5. 编写样式及参数类型
   6. 实现组件
   7. 导出组件
4. 使用 CommonSwiper
5. 测试

### 4-3 封装 CommonIcon

**目的：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm6ly6buj30ow19ak7m.jpg" alt="image-20191128155659118" style="zoom:50%;" />

**资源：**

1. 字体文件 `/assets/fonts/health-icon.ttf`
2. 字体编号从 59648 开始，共66个字体。

**分析：**

1. 加载字体 [参考](https://docs.expo.io/versions/latest/guides/using-custom-fonts/#using-custom-fonts)

   ```js
   import * as Font from 'expo-font';
   export default class App extends React.Component {
     componentDidMount() {
       Font.loadAsync({
         'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
       });
     }
   
     // ...
   }
   ```

   

2. 创建字体图标组件 [参考](https://docs.expo.io/versions/v35.0.0/guides/icons/#custom-icon-fonts)

   ```js
   import * as React from 'react';
   import * as Font from 'expo-font';
   import { createIconSet } from '@expo/vector-icons';
   
   const glyphMap = { 'icon-name': 1234, test: '∆' };
   const expoAssetId = require("assets/fonts/custom-icon-font.ttf");
   const CustomIcon = createIconSet(glyphMap, 'FontName', expoAssetId);
   
   export default class CustomIconExample extends React.Component {  
     render() {
       return (
         <CustomIcon name="icon-name" size={32} color="red" />
       );
     }
   }
   ```

   

3. 构建 glyphMap

   ```js
   //{59648: 59648, 59649: 59649, 59650: 59650, 59651: 59651, 59652: 59652, 59653: 59653, 59654: 59654, 59655: 59655, 59656: 59656, 59657: 59657, 59658: 59658, 59659: 59659, 59660: 59660, 59661: 59661, 59662: 59662, 59663: 59663, 59664: 59664, 59665: 59665, 59666: 59666, 59667: 59667, 59668: 59668, 59669: 59669, 59670: 59670, 59671: 59671, 59672: 59672, 59673: 59673, 59674: 59674, 59675: 59675, 59676: 59676, 59677: 59677, 59678: 59678, 59679: 59679, 59680: 59680, 59681: 59681, 59682: 59682, 59683: 59683, 59684: 59684, 59685: 59685, 59686: 59686, 59687: 59687, 59688: 59688, 59689: 59689, 59690: 59690, 59691: 59691, 59692: 59692, 59693: 59693, 59694: 59694, 59695: 59695, 59696: 59696, 59697: 59697, 59698: 59698, 59699: 59699, 59700: 59700, 59701: 59701, 59702: 59702, 59703: 59703, 59704: 59704, 59705: 59705, 59706: 59706, 59707: 59707, 59708: 59708, 59709: 59709, 59710: 59710, 59711: 59711, 59712: 59712, 59713: 59713}
   const glyphMap = Array.from({ length: 66 }, (item, i) => i + 59648).reduce((pre,cur)=>{
     pre[cur.toString()]=cur;
     return pre;
   },{})
   ```

   

**步骤：**

1. 加载字体
   1. 打开 App.tsx
   2. 引入依赖 import * as Font from 'expo-font';
   3. 加载字体
2. 封装组件
   1. 创建文件 /src/components/CommonIcon.tsx
   2. 粘贴参考代码
   3. 修改参考代码
3. 使用字体并测试
4. 优化字体名称

### 4-4 首页-功能导航

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g9epgeefqgj30ow19a7kl.jpg" alt="image-20191129103343581" style="zoom:50%;" />



**分析：**

1. 结构
   + wrapper
     + Item—touchableOpacity,View
       + Left—View
         + Text
         + Text
       + Right— CommonIcon



2. 边距

   ![image-20191129110936476](https://tva1.sinaimg.cn/large/006y8mN6ly1g9eqic0pwqj30gc08c74b.jpg)

3. 数据

```jsx
const dataList = [
  {
    title: "体检预约",
    subTitle: "实时预约",
    image: "59652",
    onTap: () => {
      reactNavigationHelper.navigate("ReservationList");
    }
  },
  {
    title: "报告查询",
    subTitle: "一键查询",
    image: "59700",
    onTap: () => {
      reactNavigationHelper.navigate("ReportList");
    }
  },
  {
    title: "健康评估",
    subTitle: "了解自身健康",
    image: "59660",
    onTap: null
  },
  {
    title: "健康干预",
    subTitle: "采集状况",
    image: "59661",
    onTap: null
  },
  {
    title: "健康档案",
    subTitle: "掌上查询",
    image: "59655",
    onTap: null
  },
  {
    title: "健康资讯",
    subTitle: "资讯一览",
    image: "59663",
    onTap: null
  }
];
```



**步骤：**

1. 新建文件 /src/pages/home/functionNavigate/index.tsx
2. 添加依赖 react reactNative
3. 拷贝数据
4. 添加组件基本结构
5. 使用组件
6. 完善组件

### 4-5 首页-广告

**效果：**

<img src="https://tva1.sinaimg.cn/large/006y8mN6ly1g9dt70fqrdj30ow19aatq.jpg" alt="image-20191128155750718" style="zoom:50%;" />

**分析：**

图片资源

```js
const uri =
  "https://tva1.sinaimg.cn/large/006y8mN6ly1g9bjwmyya5j30ku07377e.jpg";
const imageRatio = 750 / 255;
```

**步骤：**

1. 新建文件 /src/pages/home/Advertisement.tsx
2. 添加依赖 react， react-native
3. 准备图片数据
4. 编写组件及样式
5. 导出
6. 使用&测试

### 4-6 体检预约-主体结构

**效果：**

![image-20191129172328354](https://tva1.sinaimg.cn/large/006y8mN6ly1g9f1ahad4kj315m0teqey.jpg)



**分析：**

1. 主体结构是一个 [FlatList](https://reactnative.cn/docs/flatlist/#docsNav),FlatList 支持 自定义header 和 自定义分割线。

   + FlatList
     + Header
     + Divider
     + Item
       + Image
       + Text
       + Tag
       + Button

2.  需要准备的组件

   1. dropdown 下拉选择。我们会用到 第三方 组件 [react-native-modal-dropdown](https://github.com/sohobloo/react-native-modal-dropdown)
   2. 图标 使用 [@expo/vector-icons](https://docs.expo.io/versions/latest/guides/icons/) 提供的 Ionicons
   3. Button 颜色渐变的 所以使用 [react-native-elements](https://react-native-elements.github.io/react-native-elements/) 提供的 Button 
   4. Divider 同样由  react-native-elements提供
   5. Tag 需要自己编写

3. 数据

   ```tsx
   //默认数据
   const defaultDataList = [
     {
       title: "入职无忧套餐",
       subTitle: "基本检查，包含入职要求所有项目",
       imageUri:
         "https://wx1.sinaimg.cn/mw690/005SQLxwly1g9ey2fny93j306e050wf5.jpg",
       sex: "不限",
       age: "20-60",
       id: "login1"
     },
     {
       title: "浪漫七夕体检-青年版",
       subTitle: "七夕节新品--免费升级前列腺",
       imageUri:
         "https://wx3.sinaimg.cn/mw690/005SQLxwly1g9ey2fnqljj306e05074x.jpg",
       sex: "男",
       age: "20-40",
       id: "login2"
     },
   
     {
       title: "青年套餐A",
       subTitle:
         "针对青年人群 消化道疾病筛查 重要器官高清多普勒B超 肿瘤标志物检测",
       imageUri:
         "https://wx3.sinaimg.cn/mw690/005SQLxwly1g9ey2foa8fj306e05074y.jpg",
       sex: "不限",
       age: "20-40",
       id: "login3"
     },
     {
       title: "中老年套餐A",
       subTitle: "针对中老年人群 消化道器官检查 心脑血管疾病筛查...",
       imageUri:
         "https://wx3.sinaimg.cn/mw690/005SQLxwly1g9ey2fnhhkj306e0500t7.jpg",
       sex: "女",
       age: "30-70",
       id: "login4"
     }
   ];
   
   //下拉下单选择项
   const dropDownData = ["不限", "男", "女"];
   
   //箭头名称
   enum IconNames {
     "up" = "md-arrow-dropup",
     "down" = "md-arrow-dropdown"
   }
   ```

   

**步骤：**

1. 准备

   1. 安装依赖  react-native-modal-dropdown 和  react-native-elements
   2. 添加文件 /src/pages/reservationList/index.tsx
   3. 添加 依赖 react，react-native，react-native-modal-dropdown 和  react-native-elements

2. 核心代码

   1. 完成页面主体结构
   2. 添加页面title
   3. 注册路由

3. 测试及优化

   

### 4-7 体检预约-header 部分

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm6qj3g1j30ow19ajym.jpg" alt="image-20191129165306858" style="zoom:50%;" />

**分析：**

[react-native-modal-dropdown 文档](https://github.com/sohobloo/react-native-modal-dropdown)

+ defaultValue 默认值

+ onSelect  现在事件

+  options 选项，数组

  

+ onDropdownWillShow 显示回掉

+ onDropdownWillHide 隐藏毁掉

  

+ adjustFrame 下拉框位置修正

+ dropdownStyle 下拉框样式

+ textStyle 文字样式

+ dropdownTextStyle 下拉框文字样式

**步骤：**

1. 打开文件 /src/pages/reservationList/index.tsx
2. 完善header 结构
3. 完善样式
4. 使用 ModalDropdown
5. 完善细节

### 4-8 体检预约-item部分

**效果：**

完成除 tag 和 button 的部分

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9fctxy8adj30ow19adxb.jpg" alt="image-20191130000240947" style="zoom:50%;" />

**分析：**

item结构

+ item— TouchableOpacity，View
  + Image--Image
  + contentWrapper--View
    + title--Text
    + subTitle--Text
    + footer--View
      + tags--View
        + sex
        + age
      + button

**步骤：**

1. 打开文件 /src/pages/reservationList/index.tsx
2. 完成 item 主体结构
3. 完成 item 样式
4. 测试

### 4-9 体检预约-优化

**效果：**

主要解决 Button 和 tag 的问题

页面跳转问题

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9hle972ynj30ow19aql0.jpg" alt="image-20191201223007194" style="zoom:50%;" />



**分析：**

渐变的button样式 [参考](https://react-native-elements.github.io/react-native-elements/docs/button.html#lineargradient-usage)

```jsx

<Button
  ViewComponent={LinearGradient} // Don't forget this!
  linearGradientProps={{
    colors: ['red', 'pink'],
    start: { x: 0, y: 0.5 },
    end: { x: 1, y: 0.5 },
  }}
/>
```



Tag 组件分析

+ 组件结构 View+Text

+ 组件参数：title:string

**步骤：**

1. 完善 Button 样式
   1. 打开文件 src/pages/reservationList/index.tsx
   2. 完善 buttonStyle
   3. 完善 titleStyle
   4. 完善渐变
2. 完善 Tag 样式
   1. 添加文件 src/components/CommonTag.tsx
   2. 实现 CommonTag 的结构
   3. 使用 CommonTag
   4. 完善样式
3. 实现 页面跳转



### 4-10 预约详情-主体结构

**效果：**

![image-20191202160023199](https://tva1.sinaimg.cn/large/006tNbRwly1g9ifqy90r5j310a0sok58.jpg)



**分析：**

1. 主体结构
   + outWrapper--View
     + wrapper—ScrollView
       + Header—View
       + Notice—TouchableOpacity,View
       + content— View
         + contentHeader—View
         + Table— View
     + button--Button

**步骤：**

1. 在 AppNavigator.tsx 中修改 app 首页
2. 打开文件 src/pages/reservationDetail/index.tsx
3. 完成页面的主体结构
4. 完善基本样式

### 4-11 预约详情-header

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm6yi7i2j30ow19angj.jpg" alt="image-20191202154833986" style="zoom:50%;" />

**分析：**

组件参数：

```jsx
const defaultData = {
  image: uri,
  title: "珍爱高端升级肿瘤12项筛查（男女单人）",
  subTitle:
    "本套餐是一款针对生化五项检查，心，肝，胆，胃，甲状腺，颈椎，肺功能，脑部检查（经颅多普勒）以及癌症筛查，适合大众人群体检的套餐",
  sex: "女",
  age: "20-70"
};
```



组件结构：

+ Wrapper—View
  + Image
  + titleWrapper--View
    + title—Text
    + subTitle—Text
    + TagWrapper—View
      + Sex—CommonTag
      + age—CommonTag

图片资源：

```tsx
const uri =
  "https://tva1.sinaimg.cn/large/006tNbRwly1g9i8rogg6tj30bo09mt9l.jpg";

const imageRatio = 420 / 346;
```

**步骤：**

1. 准备
   1. 创建文件 /src/components/ReservationHeader.tsx
   2. 添加依赖 react ，react-native
   3. 粘贴默认数据和图片资源
2. 核心编码
   1. 编写组件类型
   2. 实现组件基本结构
   3. 使用组件
   4. 完善样式

### 4-12 预约详情-标题部分

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9iffk7y1xj30ow19adzq.jpg" alt="image-20191202154926025" style="zoom:50%;" />

**分析：**

1. 组件参数：

```tsx
type Props={
  iconName:string;
  title:string;
  onPress?:Function;
}
```

2. 组件结构
   + wrapper— TouchableOpacity，View
     + content— View
       + icon— CommonIcon
       + title— Text
     + icon--AntDesign
3. 图标：

![image-20191202183738295](https://tva1.sinaimg.cn/large/006tNbRwly1g9ikam0sbuj3012014745.jpg) ： CommonIcon ，name 是 “59668”

![image-20191202183758468](https://tva1.sinaimg.cn/large/006tNbRwly1g9ikb5q4y1j30120180my.jpg) ： CommonIcon ，name 是 “59652”

![image-20191202183840040](https://tva1.sinaimg.cn/large/006tNbRwly1g9ikbn3edrj301k018jr7.jpg): `<AntDesign name={"right"}></AntDesign>`

4. 打开网页链接 [参考](https://docs.expo.io/versions/latest/workflow/linking/)

```js
import { Linking } from 'expo';
Linking.openURL('http://47.92.145.208/pages/orderNotice.html');
```

**步骤：**

1. 准备

   1. 创建文件 /src/pages/ReservationDetail/Title.tsx
   2. 添加依赖 react , react-native, @expo/vector-icons

2. 核心编码

   1. 编写组件类型
   2. 实现组件基本结构
   3. 使用组件
   4. 完善样式

3. 优化 url 硬编码

   

### 4-13 预约详情-套餐详情-表头

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm73q06wj30ow19ax0u.jpg" alt="image-20191202125623520" style="zoom: 50%;" />

**分析：**

结构：内边距 10px，3个 item 比例为 3:4:3

![image-20191203083912964](https://tva1.sinaimg.cn/large/006tNbRwly1g9j8m9tc7tj30xs06u0ud.jpg)

+ table--View
  + tableHeader--View
    + tableHeaderItem--View
      + text--Text
    + divider--Divider
    + tableHeaderItem--View
      + 文案--Text
    + divider--Divider
    + tableHeaderItem--View
      + 文案--Text

**步骤：**

1. 打开页面 /src/pages/ReservationDetail/index.tsx
2. 完成组件结构
3. 完成组件样式
4. 测试

### 4-14 预约详情-套餐详情-表体

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm78s320j30ow19ax0u.jpg" alt="image-20191202125623520" style="zoom: 50%;" />

**分析：**

结构：

内边距 10px，3个 item 比例为 3:4:3

![image-20191203091840586](https://tva1.sinaimg.cn/large/006tNbRwly1g9j9rbl1b2j30x404mjtm.jpg)



+ tableContent--View

  + tableContentItem--View

    + tableContentCell--View

      + contentText--Text

    + tableContentCell--View

      + contentText--Text

    + tableContentCell--View

      + contentText--Text

        

数据：

```js
const items = [
  {
    name: "一般检查",
    content: "身高 体重 体重指数 收缩压 舒张压",
    construction: "了解身体基本信息判断是否肥胖、超重"
  },
  {
    name: "一般检查1",
    content: "身高 体重 体重指数 收缩压 舒张压",
    construction: "了解身体基本信息判断是否肥胖、超重"
  }
];
```



**步骤：**

1. 打开页面 /src/pages/ReservationDetail/index.tsx
2. 完成组件结构
3. 完成组件样式
4. 测试

### 4-15 预约详情-button及优化

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm7ff88oj30ow19ax0u.jpg" alt="image-20191202125623520" style="zoom: 50%;" />

**分析：**

Button组件参数：

```tsx
type Props = {
  title: string;
  onPress?: Function;
};
```

其他细节优化：

+ table 底部背景色
+ tableContentItem 边线
+ constant 变量名

**步骤：**

1. button 部分
   1. 新建文件 /src/components/CommonFloatButton.tsx
   2. 引入依赖
   3. 完成组件主体
   4. 使用组件
   5. 完善样式
2. 完善细节
   1. 修改 table 底部背景色
   2. 修改 tableContentItem 边线
   3. 修改 constant 变量名



### 4-16 体检提交-主体结构

**效果：**

![image-20191203160025614](https://tva1.sinaimg.cn/large/006tNbRwly1g9jld1indsj311a0u0nmd.jpg)



**分析：**

本页面主要是表单提交的功能。

需要 4 个组件：

+ title— CommonTitle — 自己实现
+ 文本输入— CommonFormItem — 自己实现

+ radio选择— CommonFormRadio — 基于CommonFormItem 自己实现

+ 日期— 不封装成组件 —  基于 react-native-modal-datetime-picker 和 CommonFormItem 实现

结构：

+ View--wrapper
  + ScrollView
    + ReservationHeader
    + content--View
      + title
      + CommonFormItem
      + CommonFormRadio
      + date
  + CommonFloatButton

**步骤：**

1. 新建文件 /src/pages/ReservationSubmit/index.tsx
2. 编写组件基本结构
3. 路由注册，修改默认首页
4. 完善样式

### 4-17 CommonTitle

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9jlrdgwvoj30ow19aqn9.jpg" alt="image-20191203161412149" style="zoom:50%;" />

**分析：**

组件参数：`type Props = { title: string;};`

图标：	`<Ionicons name="ios-arrow-forward" ></Ionicons>`

**步骤：**

1. 创建文件 /src/components/CommonTitle.tsx
2. 添加依赖 react react-native @expo/vector-icons
3. 编写组件基本结构
4. 使用组件
5. 完善组件样式

### 4-18 CommonFormItem

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9kj8xgwfhj30hk0yoqd8.jpg" alt="image-20191204113248651" style="zoom:50%;" />





**分析：**

需要设计得具有可扩展性。

1. 组件参数

   ```tsx
   type Props = {
     label: string;
     renderItem?: () => JSX.Element;
   
     textInputValue?: string;
     textInputOnChangeText?: (text: string) => void;
     textInputPlaceholder?: string;
     textInputSecureTextEntry?: boolean;
     style?: StyleProp<ViewStyle>;
     showDivider?: boolean;
   };
   ```

   

2. 组件结构

   + wrapper— View
     + label—View，Text
     + View
       + TextInput
       + JSX.Element

**步骤：**

1. 准备
   1. 创建文件 /src/components/CommonFormItem.tsx
   2. 引入依赖 react react-native
2. 组件核心部分
   1. 完成组件基本结构
   2. 导出并使用组件
   3. 完善组件样式
3. 优化
   1. 解决样式合并及边线隐藏的问题
   2. 完成业务页面同类组件

### 4-19 CommonFormRadio

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9kj8xgwfhj30hk0yoqd8.jpg" alt="image-20191204113248651" style="zoom:50%;" />

**分析：**

组件参数：

```tsx
type Props = {
  label: string;
  value: number;
  options: Array<string>;
  onChange?: (index: number) => void;
};
```



renderItem 的结构：

+ wrapper— View	
  + Item— TouchableOpacity
    + icon— Ionicons
    + text— Text
  + Item— TouchableOpacity
    + icon— Ionicons
    + text— Text



radio 图标：

```tsx
<Ionicons
  name={  "md-radio-button-on" || "md-radio-button-off" }
  color={CommonColors.primary}
  size={16}
/>
```



**步骤：**

1. 准备

   1. 创建文件 /src/components/CommonFormRadio.tsx
   2. 引入依赖 react, react-native

2. 组件核心部分

   1. 完成组件基本结构
   2. 导出并使用组件
   3. 完善组件样式

3. 优化

   1. 完成业务页面同类组件

      

### 4-20 体检提交-日期选择

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9kj8xgwfhj30hk0yoqd8.jpg" alt="image-20191204113248651" style="zoom:50%;" />

**分析：**

第三方组件 [react-native-modal-datetime-picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker) 的安装及使用

> 当前使用的 [react-native-modal-datetime-picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker)  版本是 7.x

```tsx
//安装 yarn add react-native-modal-datetime-picker  
//# npm install react-native-modal-datetime-picker

import React, { Component } from "react";
import { Button, View } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

export default class DateTimePickerTester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false
    };
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  render() {
    return (
      <>
        <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </>
    );
  }
}
```



状态：

```js
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
```



日历图标：

`<Ionicons name={"md-calendar"} size={16}></Ionicons>`

**步骤：**

1. 准备
   1. 安装  [react-native-modal-datetime-picker](https://github.com/mmazzarolo/react-native-modal-datetime-picker) 
   2. 打开文件 /src/pages/reservationSubmit/index.tsx
   3. 添加 依赖 `import DateTimePicker from "react-native-modal-datetime-picker";`
   4. 粘贴状态代码
2. 核心编码
   1. 使用 DateTimePicker
   2. 借助 CommonFormItem 实现日期展示部分
   3. 完成日期数据交换逻辑
   4. 完善样式

### 4-21 体检提交-细节优化

**问题：**

4 个细节需要优化

1. 组件位置与 ui 不一致

2. CommonFormItem 的隐藏底划线的功能

3. CommonFormItem 文字编辑

4. CommonFromRadio 选项修改

   <img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9kj8xgwfhj30hk0yoqd8.jpg" alt="image-20191204113248651" style="zoom:50%;" />



**步骤：**

1. 修改组件位置问题
2. 使得底划线隐藏功能可用
3. 解决文字编辑问题
4. 解决 radio 编辑问题

### 4-22 体检报告-主体结构

**效果：**

![image-20191205195042945](https://tva1.sinaimg.cn/large/006tNbRwly1g9m399g6ehj313i0mstln.jpg)



**分析：**

结构：

+ wrapper—Flatlist
  + Item

数据：

```jsx
const defaultDataList = [
  {
    date: "2019.12.12",
    uploadDate: "2019.12.19 12:00",
    type: "入职体检",
    id: "0013243542",
    name: "谢永强",
    image: "https://wx2.sinaimg.cn/mw1024/005SQLxwly1g6f89l4obbj305v04fjsw.jpg"
  },
  {
    date: "2019.12.11",
    uploadDate: "2019.12.19 12:00",
    type: "入职体检",
    id: "001324353343",
    name: "谢永强",
    image: "https://wx2.sinaimg.cn/mw1024/005SQLxwly1g6f89l4obbj305v04fjsw.jpg"
  },
  {
    date: "2019.12.13",
    uploadDate: "2019.12.19 12:00",
    type: "入职体检",
    id: "001324352244",
    name: "谢永强",
    image: "https://wx2.sinaimg.cn/mw1024/005SQLxwly1g6f89l4obbj305v04fjsw.jpg"
  }
];
```



**步骤：**

1. 准备
   1. 新建文件 /src/pages/reportList/index.tsx
   2. 添加依赖
   3. 拷贝默认数据
2. 核心编码
   1. 完成页面主体结构
   2. 导出
   3. 注册路由并修改首页
   4. 完善细节



### 4-23 体检报告-item

**效果：**

  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9kkpeaed9j30ow19azxl.jpg" alt="image-20191204122315662" style="zoom:33%;" />


**分析：**

结构：

+ Item—TouchableOpacity,View
  + itemUser—View
    + image—Image
    + name—Text
  + itemContent—View
    + textWrapper—View
      + textLabel—Text
      + textData—Text
  + itemButton--View
    + button— Text

体检报告地址：http://47.92.145.208/pages/health-report-detail.html

**步骤：**

1. 打开文件 /src/pages/reportList/index.tsx
2. 完成 item 结构
3. 完善点击事件
4. 完善样式
5. 测试

### 4-24 登陆页

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9slfpnztfj30ow19an5i.jpg" alt="image-20191211105253703" style="zoom:50%;" />

**分析：**

页面结构：

+ wrapper— ScrollView
  + title— Text
  + name— CommonFormItem
  + password— CommonFormItem
  + button— Button
  + footer— View
    + Text
      + Text
      + colorText— Text

**步骤：**

1. 修改默认首页
2. 完成主体结构
3. 完成样式
4. 测试

### 4-25 注册页

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9slv48v1oj30ow19a473.jpg" alt="image-20191211110751499" style="zoom:50%;" />

**分析：**

结构和登陆页类似，可以基于登陆页修改

**步骤：**

1. 新建文件 /src/pages/register/index.tsx
2. 使用【登陆页】代码
3. 修改组件名称和title
4. 注册路由并修改首页
5. 细节修改
   1. 修改顶部文案
   2. 添加密码确认
   3. 修改按钮titile
   4. 修改底部文案及跳转



### 4-26 设置页

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9sm11p8y5j30ow19aatt.jpg" alt="image-20191211111332486" style="zoom:25%;" />
  <img src="/Users/eric/Library/Application Support/typora-user-images/image-20191211111428429.png" alt="image-20191211111428429" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9sm18igt2j30ow19aahj.jpg" alt="image-20191211111345220" style="zoom:25%;" />
</div>



**分析：**

功能分析：

+ 首页图标
+ 设置页
  + 已登陆状态
  + 未登陆状态

结构分析：

+ wrapper— ScrollView

  + title— Text

    + name— Text

  + button— Button

    

首页图标：

+ 可以通过 navigationOptions.headerRight 自定义 header 右测区域，[参考](https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-used-by-stacknavigator)

+ 图标`<Ionicons name={"md-settings"} size={20} color={CommonColors.primary}></Ionicons>`



**步骤：**

1. 添加首页图标
   1. 打开文件 /src/pages/home/index.tsx
   2. 首页添加图标
2. 添加设置页
   1. 添加设置页 /src/pages/setting/index.tsx
   2. 完成页面结构
   3. 注册路由并设置首页
   4. 完善结构
   5. 完善样式
3. 测试



## 第5章 前后端联调

### 5-1 commonHttp 封装

**问题：**

联调之前我们需要一个发送网络请求的工具，如何解决？

**分析：**

1. 为什么选择 axios？

针对网络请求， react native 给我们提供了 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)。

熟悉 Vue 的同学可能比较熟悉一个第三方库 [axios](https://github.com/axios/axios), axios 支持 配置通用请求前缀，请求取消，请求响应拦截等功能。

2. 为什么要封装？

我们基于 axios 封装 commonHttp！封装后后续可以替换 axios。

3. 模式选择？

axios 支持全局模式和实例模式，如何选择？

```js
//全局模式
axios.get('/user?ID=12345')

//实例模式
const instance = axios.create();
instance.get('/user?ID=12345')
```

选择实例模式！

4. axios 拦截器如何使用？参考[官网](https://github.com/axios/axios#interceptors)

   ```ts
   // Add a response interceptor
   axios.interceptors.response.use(function (response) {
       // Any status code that lie within the range of 2xx cause this function to trigger
       // Do something with response data
       return response;
     }, function (error) {
       // Any status codes that falls outside the range of 2xx cause this function to trigger
       // Do something with response error
       return Promise.reject(error);
     });
   ```

   

**步骤：**

1. 准备
   1. 安装依赖 `yarn add axios`
   2. 创建文件 /src/utils/commonHttp.ts
   3. 引用 axios
2. 核心编码
   1. 创建 axios 实例 并赋值 给 commonHttp
   2. 添加 intercepters
   3. 导出

> 接口地址：http://dev.itcastor.com:3332



### 5-2 commonToast 封装

**问题：**

当网络请求返回异常时，需要通过 toast 给用户提示。

**分析：**

可以使用第三方库 [react-native-root-toast](https://github.com/magicismight/react-native-root-toast)

用法：

```js
import Toast from 'react-native-root-toast';


// Add a Toast on screen.
let toast = Toast.show('This is a message', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});

// You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
setTimeout(function () {
    Toast.hide(toast);
}, 500);
```

基于 react-native-root-toast 封装 commonToast！用法：`commonToast.show(msg:string)`

**步骤：**

1. 准备
   1. 安装依赖 `yarn add react-native-root-toast`
   2. 创建文件 /src/utils/commonToast.ts
   3. 引用 react-native-root-toast
2. 核心编码
   1. 实现 commonToast 基本结构 
   2. 实现 show 方法
   3. 导出 commonToast
   4. 在 commonHttp 中使用 commonToast



### 5-3 commonStore 封装

**问题：**

部分数据需要使用本地存储，如何封装 commonStore？

**分析：**

基于 expo-secure-store 封装 commonStore！

需要实现两个方法：

+ setItemAsync
+ getItemAsync

**步骤：**

1. 准备
   1. 安装依赖 `yarn add expo-secure-store@7.0.0`
   2. 创建文件 /src/utils/commonStore.ts
   3. 引用 expo-secure-store
2. 核心编码
   1. 实现 添加枚举类型 StoreKeys 
   2. 实现 setItemAsync 方法
   3. 实现 getItemAsync 方法
   4. 导出 commonStore

### 5-4 注册页

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9slv48v1oj30ow19a473.jpg" alt="image-20191211110751499" style="zoom:50%;" />

**分析：**

接口文档：

```jsx
const uri = `/register`;
const _res = await commonHttp.post(uri, {
    email: name,
    password
});
```

**步骤：**

1. 修改路由首页为注册页
2. 打开文件 /src/pages/register/index.tsx
3. 添加并使用 3 个 state ，【name，password，passwordRepeat】
4. 编写 submit 方法
   1. 参数异常处理
   2. 发送请求
   3. 请求成功操作
   4. 捕获请求并处理异常
5. 使用 submit 方法
6. 测试

> 查看注册用户地址  http://dev.itcastor.com:3332/users

### 5-5 登陆页-主流程

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9slfpnztfj30ow19an5i.jpg" alt="image-20191211105253703" style="zoom:50%;" />

**分析：**

接口文档：

```jsx
const uri = `/login`;
const res = await commonHttp.post(uri, {
    email: name,
    password
});

//返回 {accessToken:"<token>"}
```



**步骤：**

1. 修改首页为登陆页
2. 打开文件 /src/pages/login/index.tsx
3. 添加并使用 2 个 state ，【name，password】
4. 编写 submit 方法
   1. 参数异常处理
   2. 发送请求
   3. 请求成功操作
   4. 捕获请求并处理异常
5. 使用 submit 方法



### 5-6 页面跳转优化

**问题：**

1. 期望注册后跳转到登陆页
2. 期望登陆后跳转到上一个页面（非登陆注册页）

**分析：**

![image-20191211225111354](https://tva1.sinaimg.cn/large/006tNbRwly1g9t66z9upwj30ja06kdgl.jpg)



需要 reactNavigationHelper 增加两个方法 pop 和 replace。

根据[官方文档](https://reactnavigation.org/docs/en/navigation-prop.html#navigator-dependent-functions),stack navigator 是支持的。并且提供有 [StackActions](https://reactnavigation.org/docs/en/next/stack-actions.html#docsNav) 

**步骤：**

1. 完善 reactNavigationHelper
   1. 添加 pop 方法
   2. 添加 replace 方法
   3. 导出 pop 和 replace 方法
2. 优化路由跳转
   1. **登陆页**跳转到**注册页**使用 replace
   2. **注册页**跳转到**登陆页**使用 replace
   3. 登陆成功后直接 pop
   4. 注册成功后直接 replace 到 **登陆页**
3. 测试
   1. 在体检报告页直接跳转到登陆页



### 5-7 登陆页-共享 token

**问题：**

在部分页面需要获取是否登陆及账号和用户ID，如何共享登陆信息？

**分析：**

1. 可以解析token

账号和用户ID可以从token 中解析出来，**核心问题就是如何共享 token！**

2. 基于 token 创建 authContext

   ```ts
   const auth = {
     token: "",
     setToken: (token: string) => {}
   };
   const authContext = createContext(auth);
   ```

   

3.  App 组件（顶层组件）使用 authContext

4. 把 auth 做为 App 组件（顶层组件）的 state

5. 解决 auth 的初始值问题

**步骤：**

1. 新建文件 /src/context/auth.ts
2. 实现并导出 authContext
3. 打开 App.tsx
4. 使用 authContext.Provider
5. 使用useState 创建 auth
6. 实现 auth 的初始值



### 5-8 登陆页- 解析 token

**效果：**

如何通过token 解析出 是否登陆，用户id，账号？

![image-20191212161548116](https://tva1.sinaimg.cn/large/006tNbRwly1g9u1m20ut6j30yw0eqgng.jpg)

**分析：**

token 遵循 [jwt 标准](https://jwt.io/),[中文参考](ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

第三方库 [jwt-decode](https://www.npmjs.com/package/jwt-decode) 可以解析出 jwt 中信息

```js
var token = 'eyJ0eXAiO.../// jwt token';
 
var decoded = jwt_decode(token);
console.log(decoded);
 
/* prints:
 * { foo: "bar",
 *   exp: 1393286893,
 *   iat: 1393268893  }
 */
```



我们的 token 解析之后就可以看到一个 sub 属性就是用户 ID，还有一个 email 属性就是我们的账号。

**步骤：**

1. 安装依赖 `yarn add jwt-decode`
2. 新建文件 /src/utils/authHelper.ts
3. 实现 isLogin 方法
4. 定义类型 tokenInfo
5. 实现 getInfoFromToken 方法
6. 导出



### 5-9 设置页

**效果：**

<div align=left>
  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9sm11p8y5j30ow19aatt.jpg" alt="image-20191211111332486" style="zoom:25%;" />
  <img src="/Users/eric/Library/Application Support/typora-user-images/image-20191211111428429.png" alt="image-20191211111428429" style="zoom:25%;" />
  <img src="https://tva1.sinaimg.cn/large/006tNbRwly1g9sm18igt2j30ow19aahj.jpg" alt="image-20191211111345220" style="zoom:25%;" />
</div>

**分析：**

让【设置页】正常工作

1. 在【登陆页】保存 token
2. 在【设置页】通过 token 获得登陆信息
3. 在【设置页】退出登陆

**步骤：**

1. 登陆页处理
   1. 打开登陆页 /src/pages/login/index.tsx
   2. 登陆成功时通过 authContext 保存 token
2. 设置页处理
   1. 打开设置页 /src/pages/setting/index.tsx
   2. 通过 token 判断是否登陆
   3. 如果已登陆 获取用户账号（邮箱）
   4. 退出登陆时清除token
3. 测试



### 5-10 登陆页- 缓存 token

**问题：**

打开app 关闭后需要重新登陆，如何优化？



**分析：**

将 token 写入本地缓存。

1. token 变更的时候 写入 本地缓存

2. 初始化 app 时，从本地缓存获取 token

   

**步骤：**

1. 打开 App.tsx
2. setToken 实现的代码中 添加保存本地缓存的逻辑
3. 编写方法 getStoredToken，实现保存token的逻辑
4. 在 useEffect 中调用 getStoredToken
5. 测试



### 5-11 体检预约

**效果**：

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9uw8vrip2j30gw0usn6j.jpg" alt="image-20191213103802782" style="zoom:50%;" />

**分析：**

接口分析：

```js
//1.请求地址：
const uri=`/reservationList?sex=男`

//2.请求类型：
get

//3.返回数据：
[
  {
    "title": "入职无忧套餐",
    "subTitle": "基本检查，包含入职要求所有项目",
    "imageUri": "https://wx1.sinaimg.cn/mw690/005SQLxwly1g9ey2fny93j306e050wf5.jpg",
    "sex": "不限",
    "age": "20-60",
    "id": "1",
    "items": [
      {
        "name": "一般检查",
        "content": "身高 体重 体重指数 收缩压 舒张压",
        "construction": "了解身体基本信息判断是否肥胖、超重"
      },
      {
        "name": "传染病检查",
        "content": "艾滋 非典 梅毒 水豆 手足口 淋病 乙型肝炎和丙型肝炎",
        "construction": "了解是否犯有常见传染病"
      }
    ]
  },
 ]
```



**步骤：**

1. 打开文件 /src/pages/reservationList/index.tsx
2. 添加并使用状态 sexIndex
3. 添加并使用状态 dataList
4. 编写函数 getData
5. 通过 useEffect 调用 getData
6. sexIndex 变更后需要再次调用 getData
7. 测试



### 5-12 预约详情

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm7occaij30ow19a7qd.jpg" alt="image-20191213184123973" style="zoom:50%;" />

**分析：**

接口分析：

```js
//1.请求地址：
const uri = `/reservationList/${id}`;

//2.请求类型：
get

//3.返回数据：
{
  "title": "入职无忧套餐",
  "subTitle": "基本检查，包含入职要求所有项目",
  "imageUri": "https://wx1.sinaimg.cn/mw690/005SQLxwly1g9ey2fny93j306e050wf5.jpg",
  "sex": "不限",
  "age": "20-60",
  "id": "1",
  "items": [
    {
      "name": "一般检查",
      "content": "身高 体重 体重指数 收缩压 舒张压",
      "construction": "了解身体基本信息判断是否肥胖、超重"
    },
    {
      "name": "传染病检查",
      "content": "艾滋 非典 梅毒 水豆 手足口 淋病 乙型肝炎和丙型肝炎",
      "construction": "了解是否犯有常见传染病"
    }
  ]
}
```



**步骤：**

1. 打开文件 /src/pages/reservationDetail/index.tsx

2. 添加并使用状态 data

   1. ReservationHeader 使用data
   2. 修改 ReservationHeader 中的 参数 data 的一个字段，image 改成 imageUri
   3. 使用 data.items 替代写 默认数据 items

3. 如果 data 为null 则显示空页面

4. 编写函数 getData

5. 通过 useEffect 调用 getData

6. 测试

   

### 5-13 体检提交

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9vcbo63a4j30ow19ae1r.jpg" alt="image-20191213195424622" style="zoom:50%;" />

**分析：**

阶段：

+ 进入页面后 
  + 需判断是否登陆，如果没有跳转到登陆页
  + 拉取当前体检套餐的数据
  + 获得当前登陆用户的 userId
+ 用户输入信息，点击提交
  + 将所有的数据提交给后端

接口分析：

**该接口需要登陆态**

```js
//1.请求地址：
 const uri = "/reservationSubmit";

//2.请求类型：
  post
//3.权限信息
  headers: {
          Authorization: `Bearer ${auth.token}`
        }
//4.参数：
  const param = {
      name,
      sex: sexString,
      phoneNumber,
      idNumber,
      marriage: marriageString,
      userId,
      date
    };
```



**步骤：**

1. 打开文件 /src/pages/reservationSubmit/index.tsx
2. 进入页面逻辑
   1. 添加 sexOptions 和 marriageOptions
   2. 获取 userId
   3. 参考 【预约详情】页，获得 ReservationHeader 的数据
   4. 处理未登陆的情况
3. 数据提交逻辑
   1. 添加 submit 方法
   2. 数据校验
   3. 准备 post  参数 及 uri
   4. 发送请求
   5. 处理异常
   6. 使用 submit 方法
4. 测试



### 5-14 体检报告

**效果：**

<img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wm7tuekhj30ow19a4cg.jpg" alt="image-20191213211623576" style="zoom:50%;" />

**分析：**

接口分析：

```js
//1.请求地址：
 const uri = "/reportList?userId=1";

//2.请求类型：
  get
//3.权限信息
  headers: {
          Authorization: `Bearer ${auth.token}`
        }
//4.响应数据：
[
  {
    "userId": 1,
    "date": "2019.12.12",
    "uploadDate": "2019.12.19 12:00",
    "type": "入职体检",
    "id": "0013243542",
    "name": "谢永强",
    "image": "https://wx2.sinaimg.cn/mw1024/005SQLxwly1g6f89l4obbj305v04fjsw.jpg"
  },
  {
    "userId": 1,
    "date": "2019.12.11",
    "uploadDate": "2019.12.19 12:00",
    "type": "入职体检",
    "id": "001324353343",
    "name": "谢永强",
    "image": "https://wx2.sinaimg.cn/mw1024/005SQLxwly1g6f89l4obbj305v04fjsw.jpg"
  }
]
```



**步骤：**

1. 打开文件 /src/pages/reportList/index.tsx
2. 通过 authContext 获取 userId 和 token
3. 如果未登陆 返回空白页，跳转登陆页
4. 添加并使用 dataList 状态
5. 编写函数 getData
6. 通过 useEffect 调用 getData
7. 测试



**扩展（作业）：**

接口数据为空的处理？

需要登陆的页面，不登陆，跳转回来也是空白页，如何处理？



## 第6章 构建打包

### 6-1 构建打包

**问题：**

如何生成安装包？

**分析：**

expo 给我们提供了完整的打包解决方案。[参考](https://docs.expo.io/versions/v36.0.0/distribution/building-standalone-apps/)

1. 完成配置

   ```json
    {
      "expo": {
       "name": "Your App Name",
       "icon": "./path/to/your/app-icon.png",
       "version": "1.0.0",
       "slug": "your-app-slug",
       "sdkVersion": "XX.0.0",
       "ios": {
         "bundleIdentifier": "com.yourcompany.yourappname"
       },
       "android": {
         "package": "com.yourcompany.yourappname"
       }
      }
    }
   ```

 <div align=left>
     <img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wcu86rm0j30ow19ajxv.jpg" alt="image-20191214165746551" style="zoom:33%;" />
     <img src="https://tva1.sinaimg.cn/large/006tNbRwgy1g9wdhbz74cj30k215u13o.jpg" alt="image-20191214171655164" style="zoom:33%;" />
   </div>

2. 打包

   ```shell
   //android 打包
   expo build:android
   
   //Ios 打包
   expo build:ios
   
   ```

   

**步骤：**

1. 替换图标图片
2. 完善配置
3. 打包



## 第7章 总结

### 7-1 项目总结

**项目回顾：**

1. 体检预约
   1. 体检预约（列表）
   2. 体检详情
   3. 体检提交
2. 体检报告
   1. 体检报告（列表）
   2. 报告详情
3. 登陆相关页面
   1. 登陆
   2. 注册
   3. 设置



**知识点回顾：**

1. 初始化 react native 项目
2. 通用路由解决方案
3. 使用第三方 库/组件
4. 使用字体图标
5. 封装自己的字体图标库
6. 本地及网络图片的使用
7. 实现基本的页面布局
8. 封装自己的工具库
   1. 通用请求工具 commonHttp
   2. 通用本地存储 commonStore
   3. 通用提示 commonToast
9. 封装自己的组件
   1. CommonFormItem
   2. CommonFormRadio
   3. CommonFloatButton
10. 通 context 实现全局共享状态，并实现本地缓存
11. 更熟练的 typescript 使用