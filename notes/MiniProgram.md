 

# 小程序

## 微信小程序

```bash
#小程序的navBar和tabBar只能在app.json里面配置
# *"globalStyle"*: {

​        *"navigationBarTitleText"*: "优购",

​        *"navigationBarBackgroundColor"*: "#ea4451",

​        *"backgroundColor"*: "#F8F8F8"

​    },

​    *"tabBar"*: {

​        *"backgroundColor"*: "#fff",

​        *"color"*: "#333",

​        *"selectedColor"*: "#ea4451",

​        *"list"*: [

​            {

​                *"text"*: "首页",

​                *"pagePath"*: "pages/index/index",

​                *"iconPath"*: "static/tabs/icon_home@3x.png",

​                *"selectedIconPath"*: "static/tabs/icon_home_active@3x.png"

​            },
					]

#通过设置编译模式也可以实现自定义展示的首页,用于调试

#小程序是采用的rpx适配（rpx是小程序独有），而且有一点好的是，rpx能自动计算屏幕大小，只需要加这个单位就可以了

#小程序的跳转方式有两种:navigator相当于HTML中的a标签，实现跳转,还可以通过api编程式跳转

#小程序不能主动关闭,后台一定时间会自动关闭,或者内存不足的时候会自动关闭

#小程序有个包大小限制2048kb，如果超过这个就要先抽取文件，将一些静态的文件转为线上地址，然后在project.config.json

#wxss中如果使用文件，是不支持本地文件的，只支持线上地址和base64，当然base64文件是比较大的

#wxss不支持本地资源,tabBar只支持本地资源(提升用户体验)

#样式也可以通过@import导入,但是只能导入.wxss文件,线上的地址是不行的

#不支持数据劫持,所以要通过this.setData({})
#然后this是指向当前对象,所以要通过this.data.msg的形式访问数据


#小程序提供了场景值,来区分小程序是通过何种途径打开的,也就是一些有规则数字,可以通过onLaunch和onShow里面获得

/**
   * 数据交互:
   * 跳转地址时可以通过类似于查询参数的形式实现数据传递
   * 然后在目标页面中onLoad参数中获取传递的参数
   */

   /**
    * 模块化:
    * 小程序支持common.js模块化,这样就可以解耦js文件
    * npm的使用 npm init -y  初始化一个package.json(构建的时候必须要有这个配置文件) 小程序中使用						require时,要在工具中先构建npm
    * 由于有些包小程序是不支持的,所以在构建的时候报错也是正常的
    */
   /**
    * 定义全局生命周期:
    * 也就是那几个:
    */
   /**
    * 定义全局的属性或方法:
    * 然后可以在任何js都可以通过getApp()获取小程序实例
    * 通常可以在模块js中获取然后再导出,然后在页面js中使用
    */
   /**
    * 前端一般通过调用方法访问小程序的API
    * 后端通过访问URL访问小程序接口
    */
   /**
    * 常见PAI:
    * 都是通过wx这个全局实例调用的
    * 小程序内置加载提示状态 wx.showLoading({title: 'title',}) --> wx.hideLoading({success: 					(res) => {},})
    * wx.showToast({title: 'title',}) -- 提示框
    * wx.showModal({cancelColor: 'cancelColor',}) -- 确认框
    * 访问选择框等等... 一般是传入对象,然后查文档配置就行来了
    * chooseImage,在success回调中可以获取到照片路径
    * uploadFile上传文件,然后根据文档配置,需要将上传域名加入上传文件信任域名
    */
   /**
    * 小程序性能提升:
    */
   /**
    * wxs: 要注意wxs和js是不一样的,有很多语法不支持,比如|| `` const let这些
    * 微信分类渲染层(wxss,wxml)和逻辑层(wxs),且渲染层和逻辑层是彼此独立的,其中data是通过native通信的
    * 所以为了直接在渲染层直接操作逻辑层,所以创建了新的脚本语言,<wxs></wxs>
    * 必须定义module属性,天生支持模块化,通过src属性导入(但不支持相对路径)
    * wxs可以直接在wxml中定义也可以通过wxs文件模块化导入
    * 应用: 就是在视图层对数据进行格式化处理,也就相当于过滤器
    * wxs中通过getDate()或者去
    */
   /**
    * 模版的使用: 模版类似于组件,但是现在已经支持组件了,就不需要模版了
    * 利用<template></template>标签定义模版,然后通过template的is属性指定模版,类似于vue的component内     			置组件
    * 通过data给模版传入数据,可以在复用模版的时候使用自定义的数据
    * 也支持模块化通过<import />标签的src导入
    */

    /**
     * 组件: 
     * 创建好组件后在页面的.json文件中注册,然后就可以在wxml中使用了
     * 组件的自定义属性,初始化数据,方法逻辑定义
     * 自定义组件通信: 父子通信(父=>子用属性,子=>父还是用事件监听和事件触发this.triggerEvent("事件名					 字", 参数)触发)
     */

     /**
      * UI框架介绍:
      * 像vue和react这些严格来说不叫框架,只是用来构建用户界面的,加上axios,vuex,vue-router这些之后才算的				上框架
      * 也正因为vue支持自定义组件,所有才支持像Element-UI这类的UI框架
      * 微信有WeUI
      */

     /**
      * 数据可视化: F2支持微信小程序
      * ff-canvas必须要有宽高和一个父元素,不然会报错
      */

     /**
      * 小程序中是通过表单中的button组件的额form-type熟悉来提交或重置的
      * 表单数据有两种，一是submit事件事件对象包含input值，而是change事件的事件对象包含其他的数据
      */
```



## uni-app开发

```bash
#所有小程序的配置都在page.json中

#全局或者页面的样式都是配置中的style中配置

#虽然支持div和h4这类原生元素但是会被改变成view所以直接使用原生小程序的元素就可以了

#小程序的生命钩子可以混合vue的钩子，但是有些是不能替换的，所以还是优先使用小程序的钩子

# app.vue中的script标签就相当于小程序的app.js,style标签就是全局样式

# 利用uni-app开发将wx换成uni.getSystemInfoSync() sync指同步,没加sync就是异步要指定回调
# 在onLoad()里面发起uni.request({url: '',success(res){},fail(err){}})

#uni.request({})返回的是一个promise,uniapp对该promise进行了封装,返回结果是一个数组,第一位是error对象,如果是成功的话,错误对象是null,如果是有错误对象就是请求错误了 
#可以使用 promise.then语法也可以使用async/await语法

#下拉刷新,现在pages.json中style配置onEnablePullDownRefresh: true;在页面监听onPullDownRefresh事件,

# uniapp的v-show是有bug的,设置的权重不够,view的处理是打包为行内样式

#小程序区域可控制的滚动的组件 -<view-scroll>
#页面中也有解决方案,例如swiper,iScroll

#小程序的本地储存--> storeage,有现成的api,而且没有session和localStorage的区别,且不需要进行序列化

#小程序本地储存每条限制1M,总共限制10M,过量就会自动清除,

#小程序的路由和vue是不一样的,主要是用来跳转,由于跳转的功能比较多,所以api也比较多,小程序是有五级页面限制

#navigateTo:历史记录:主动跳转和返回储存的历史记录是不一样的
#navigateBace: 参数delta相当于$router.go()
#redirectTo: 清除当前页的历史记录,并用重定向的页面替换,这时候返回会跳转两级
#reluanch: 清空所有记录然后记录reluanch页
#switchTab: 这个路由是用来切换tabBar的,而且只能通过这种方式来跳转,不能通过navigatorTo

#TabBar方法只有在tabBar配置路径中才能显示,其他页面不能通过showTabBar来显示,但是在tabBar配置路径是可以通过hideTabBar来隐藏的

```





## 开发流程

```
UI: 
前端
后端
测试: 提bug
产品: 需求会变
运维: 

流程:
1.产品提出需求
2.产品评审(开会)
3.安排工期
4.进行开发 测试用例
5.测试
6.调试
7.上线
8.线上测试
```

