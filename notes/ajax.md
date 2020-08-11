# ajax

利用XMLHttpRequest对象在页面**不刷新不跳转**的情况进行数据交互

## url同一资源定位符

```
http://www.baidu.com/p/hemtantjt324.html
//	通信协议 服务器地址	文件存放位置
```



## 客户端与服务器的通信过程

客户端发起请求-->服务端处理-->服务端进行响应



## 控制台network调试

doc表示请求的html文件

img表示请求的图片



## XHR

通过表单这种会刷新页面,体验比较差

通过ajax发送请求不发生页面刷新

### 请求方式

#### get|post

get用于向服务端获取资源(获取数据信息图片等)

post用于向服务端发送资源(例如用户名邮箱密码等)



# jQueryAjax

三个方法

```js
$.get(url[,data][,callback])	//	url必选 data callback可选
//	data可以是个对象也可以是键值对字符串多个数据以&连接
$.post()

//	可以发送和get和post请求
$.ajax(
		{
		type: "",	//	亲求类型
		url: "",	//	地址
		data: "",	//	参数
		success: function(){}	//	回调函数
	}
)		
```



## 数据接口

也就我们的url

例如下面这两个接口

```js
http://www.liulongbin.top:3006/api/getbooks 	//	get	接口
http://www.liulongbin.top:3006/api/addbook		//	post接口
http://www.liulongbin.top:3006/api/delbook		//	删除接口
```

### 接口文档

在我们访问接口的时候,要按接口文档的规范,使用正确的url、请求方法、参数和参数格式

接口文档的组成部分

1. 接口名称
2. 接口url
3. 调用方式 如 get 和 post
4. 参数格式
5. 响应格式

### 接口测试工具

#### Postman





## from表单

`from`**表单是用来收集数据向服务器进行提交的**

`action`属性指提交表单时,向何处发送表单数据

一般是后端提供的一个URL地址,这个URL专门用来接收过来的数据

如果未指定action属性,action默认值为当前页面的URL地址,点击提交会跳转到action属性指定的URL地址



收集数据的时候

- 只收集有name的标签

- 以键值对的形式收集,各数据以&符链接例如

  - ```
    username=lion&password=123456
    ```

### from标签

- action
- target  规定在何处打开页面,常用的有`_blank` `_self`
- method  规定以何种方式提交,有`get` 和 `post`
  - get是以url地址的方式提交数据,提交简单少量的数据
  - post是以Form Data的形式提交的数据,大量复杂的数据,包含文件上传的数据

- enctype  在发送表单数据之前如何对数据进行编码
  - 不涉及到文件application/x-www-form-urlencoded
  - 涉及到文件上传的时候需要设定为 multipart/from-data
  - text/plain







## 利用ajax提交数据

**form表单同步提交的缺点**

- 页面会发生跳转
- 页面之前的状态和数据会丢失



解决方案: **表单只负责采集数据,ajax负责将数据提交到服务器**



### 提交步骤***

1. 给表单注册提交事件
2. 阻止默认提交事件
3. serialize()快速收集数据
4. 发起ajax请求



清空表单利用DOM对象的ele.reset()方法,注意这里是DOM对象jQ[0] --> DOM

### 注册提交事件

给form表单注册submit事件

```js
$('#fm').submit(callback(e){//	直接使用submit方法
        e.preventDefault();	//	阻止表单默认提交行为      
})		
$('#fm').on('submit',callback(){})	//	使用on注册submit事件
```

也可以给提交按钮注册单击事件

```js
<input type="submit" value="提交" class='sub'>

$('.sub').click(function(){
  	e.preventDefault();		//	阻止表单的默认提交行为
})
```

- 如果在form表单里面用了button标签,会被默认作为提交按钮



### serialize()

一次性快速获取表单中的所有数据,也只获取带name属性的



## 模版引擎

用于字符串的拼接和渲染

art-template.js

类似于vue

1. 导入art-template

2. 定义数据

3. 定义模版,标注插**值表达式**(模版就是一个script标签,须定义一个id<script type="text/html"></script>)

   标准语法

   ```bash
   //	表达式
   data中的属性可以直接用
   value1 + value2; || ; ? : ; obj.key; obj['key'];.....
   
   //如果要输出的值中包含标签,就需要加上@以保证原文输出,否则会被编码输出
   let obj = {
     value: "<h4>鲁迅,原名周树人</h4>"
   }
   {{@ value}}
   
   //	条件判断
   {{if value}}  {{else if ...}} {{/if}}
                                   
   //	循环语句
    {{each data}}   
          <li>{{$index}}----{{$value}}</li>  	// 	这中间两个变量是两个固定的写法
    {{/each}}
   ```

   

4. 调用template函数

   ```bash
   调用全局template('模版id','数据');	//	返回的是一个模版字符串,插值表达式已被替换
   ```

   

### 过滤器

标准语法

```js
{{vlaue | filterName}} 

//定义过滤器
template.defaults.imports.filterName = function(value){/*return处理结果 */}
```



**模版引擎就是基于字符串的替换,利用到正则的一些方法**

```js
reg.exec()
//	如果匹配到返回的一个正则
//	如果未匹配到就返回null
```



## 数据交换格式

### XML

*EXtensible Markup Language* 可扩展标记语言

- 结构复杂,臃肿,当时包含的数据少
- 结构复杂解析很困难

### JSON

*JavaScript Object Notation* js对象表示法 2001年开始推广

前端用的比较多的是JSON



#### JSON是通过数组和对象

**对象结构:**

| Key                          | Value数据类型                          |
| ---------------------------- | -------------------------------------- |
| 必须使用英文的**双引号**包括 | 数字、字符串、布尔值、null、数组、对象 |

**数组结构:**

| 数据类型                               |
| -------------------------------------- |
| 数字、字符串、布尔值、null、数组、对象 |

⚠️不能使用`undefined` 和`function`这些不允许的类型

- 如果在对象里面写了这两个,会被自动去掉
- 如果在数组里面写了这两个,会被替换成null



#### 两个方法

```js
JSON.parse()	//	将JSON字符串转化为对象
JSON.stringify()	//	将对象转化为字符串

//	可以利用这两个的特性做一个简单深拷贝
```



## 原生ajax

### get请求

- 创建`xhr`对象
- 调用`xhr.open()`
- 调用`xhr.send()`
- 监听`xhr.onreadystatechange()`事件

```js
//  第一步 创建ajax 对象xhr
        let xhr = new XMLHttpRequest();
        //  配置请求项(请求方式,请求地址)
        xhr.open('GET', '');
        //  发送
        xhr.send();
        //  监听xhr.onreadystatechange事件,处理响应
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                //  xhr.responseText是一个JSON格式的字符串
                console.log(xhr.responseText, typeof responseText);
                //  转成JSON对象
                let data = JSON.parse(xhr.responseText);
                console.log(data);
            }
```

**readyState**

|  值  |                状态                |
| :--: | :--------------------------------: |
|  0   | XMLHttpRequest对象被创建但未被调用 |
|  1   |          open()方法被调用          |
|  2   |          send()方法被调用          |
|  3   |         loading数据接收中          |
|  4   |            数据传输成功            |



### post请求

- 创建 xhr 对象
- 调用 open()
- 设置 Content-Type 属性
- 调用 send() 同时将数据以查询字符串的形式,提交给服务器
- 监听 onreadystatechange 事件

```js
//  post 请求
let xhr1 = new XMLHttpRequest();
xhr1.open('post', 'http://www.liulongbin.top:3006/api/addbook')
xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
xhr1.send('bookname=老公的一天&author=刘罗锅&publisher=邹怡龙')
xhr1.onreadystatechange = function () {
    console.log(xhr1.responseText);
    if (xhr1.readyState == 4 && xhr1.status == 200) {
        let res = JSON.parse(xhr1.response)
        console.log(res);
    }
}
```



### 查询字符串

放在url地址的末尾加上查询参数,以?开始用&链接多个参数



## 编码字符串

查询字符串中出现的中文是需要进行URL编码,url中只允许出现英文和英文字符

手动编码和解码的两个方法

`encode`

`decode`

**一般浏览器会自动帮我们转码,不需要我们手动操作**





## XMLHttpRequest Level2

- **可以设置请求时限**

  ​		一定要在send()之前设置,不然请求发生以后就没有意义了

  - ```
    xhr.timeout = 3000
    xhr.ontimeout = function(event){alert("请求超时")}
    ```

- **可以使用FormData对象管理表单数据**

- **可以上传文件**

  - `DOM.files`对象里面的第0位可以拿到上传的文件对象,如果没有的话length为0

- **可以获得数据传输的进度信息**

  - ```js
    // 创建 XHR 对象
    var xhr = new XMLHttpRequest()
    // 监听 xhr.upload 的 onprogress 事件
    xhr.upload.onprogress = function(e) {
         // e.lengthComputable 是一个布尔值，表示当前上传的资源是否具有可计算的长度
         if (e.lengthComputable) {
             // e.loaded 已传输的字节
             // e.total 需传输的总字节
             var percentComplete = Math.ceil((e.loaded / e.total) * 100)
         }
     }
    
    //上传完的一个监听事件
    xhr.upload.onload = function(){}
    ```

    

## FormData对象

利用FormData管理数据

```js
let fd = new FormData()
fd.append('uname', 'lion')
fd.append('upwd', '123456')

let xhr = new XMLHttpRequest()
xhr.open('post','url')
xhr.send(fd)	//	如果发送的是FormData对象就不需要设置请求头,否则会二次编码裂开
```

- 情况一 没有表单
  - 利用FromData收集数据
  - FormData配合ajax发送只能发送post请求,是因为`xhr.send()`里面可以放**查询字符串**也可以放**FormData对象**

- 情况二 有表表单

  - 也可以通过FormData对象快速获取表单中的数据

    ```js
    let form = document.queryselector("form")	//	DOM对象
    
    form.addEventListener(('submit',function(){
    	e.preventDefault()
    	let fd = new FormData(form);
    	let xhr = new XMLHttpRequest()
    	xhr.open('post','url')
    	xhr.send(fd)	//发送FomrData对象是不需要设置请求头的
    	xhr.onreadyStateChange = function(){
    		if(xhr.readyState == 4 && xhr.status == 200){
    			console.log(xhr.responseText)
    		}
    	}
    }))
    ```

    

## 使用JQueryAjax上传文件⚠️⚠️⚠️

**结合FormData**

```js
$.ajax({
     method: 'POST',//	这里是新版的写法,写type也是一样的
     url: 'http://www.liulongbin.top:3006/api/upload/avatar',
     data: fd,//	formdata放在data里面就可以了,本来就是对象,
  		// 没有表单的情况下使用formdata.append('uname',files[0])收集数据
     // 不修改 Content-Type 属性，使用 FormData 默认的 Content-Type 值
     contentType: false,
     // 不对 FormData 中的数据进行 url 编码，而是将 FormData 数据原样发送到服务器
     processData: false,
     success: function(res) {
     	console.log(res)
     }
})
```



### JQuery实现loading效果

```
ajaxStart(function(){})
ajaxStop(function(){})
```





## axios

中文API官网 http://www.axios-js.com/zh-cn/docs/index.html#axios-get-url-config

**axios返回的是一个封装好的对象,对象里面的data才是服务器响应的数据**

执行 `GET` 请求

```js
// 为给定 ID 的 user 创建请求
axios.get('/user?ID=12345')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

// 上面的请求也可以这样做
axios.get('/user', {
    params: {	//	这个params是固定属性不能更改
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行 `POST` 请求

```js
axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```

执行多个并发请求

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // 两个请求现在都执行完成
  }));
```

### axios API

可以通过向 `axios` 传递相关配置来创建请求

##### axios(config)

```js
// 发送 POST 请求
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
// 获取远端图片
axios({
  method:'get',
  url:'http://bit.ly/2mTM3nY',
  responseType:'stream'
})
  .then(function(response) {
  response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
});
```



## 跨域和JSONP

### **同源**:

 协议、域名、端口相同的话就叫两个页面同源

如果有一个不相同就叫跨域



端口号不写的话默认是80

```
http://www.test.com:80/main.html
```

### 同源策略

**浏览器提供的安全功能,限制非同源的数据交互安全机制**

⚠️⚠️⚠️**浏览器的同源策略是允许发起跨域请求的,只是会拦截跨域请求回来的数据,无法被页面获取到**



![image-20200809093547826](/Users/volcanoboy/Library/Application Support/typora-user-images/image-20200809093547826.png)



### 实现跨域请求的方案

- **JSONP**

  - 只支持GET方法,兼容性比较好

  - <script src=""> 利用script标签的src不受同源策略的影响,发起ajax请求,也是因为script标签只能发get请求
    jsonp不属于ajax,因为没有使用到XMLHttpRequest对象  

    ```js
    //	简单的jsonp实现
    <script>    
        function test(data){
            console.log('获取到了数据');
            console.log(data);
        }
    </script>
    
    <script src="http://www.liulongbin.top:3006/api/jsonp?callback=test&name=无敌风火龙&age=18"></script>
    ```

- **CORS**
  - W3C标准,兼容性比较差一点,出来的比较晚



### JQuery $.ajax()发起jsonp请求

`$.ajax()`也可以发起`jsonp`请求,只需要定义`datatype: 'jsonp'`

```js
$.ajax({
	url: 'http://www.liulongbin.top:3006/api/jsonp?name=无敌风火源&age=19',
	dataType: 'jsonp',	//	定义发起为jsonp
	jsonp: 'callback',	// 修改回调函数的属性名
	jsonpCallback: 'myfunc',	//	修改回调函数的名字
	success(res){
		console.log(res);
	}
})
```

**内部也是通过动态script标签scr属性发送的,然后又动态的删除**





## 输入框--防抖

**防抖策略(debounce)是当事件被触发后,延迟n秒后再执行回调,如果在这n秒内事件又被触发,则重新计时**

防抖一般定义500ms比较适中



### 实现输入框的防抖

- 防抖动的 timer
- 定义防抖的函数，函数里面定义一个延时器，在演示器里面调用发起`JSONP`的请求
- 在触发 `keyup` 事件时，立即清空 `timer`，然后调用防抖的函数

```javascript
var timer = null // 1. 防抖动的 timer
function debounceSearch(keywords) { // 2. 定义防抖的函数
     timer = setTimeout(function() {
     // 发起 JSONP 请求
     getSuggestList(keywords)
     }, 500)
 }
$('#ipt').on('keyup', function() { // 3. 在触发 keyup 事件时，立即清空 timer
 clearTimeout(timer)
 // ...省略其他代码
 debounceSearch(keywords)
 })
```

### 缓存搜索的建议列表

#### 定义全局缓存对象

#### 将搜索结果保存到缓存对象中

#### 优先从缓存中获取搜索建议



## 节流(轮播图,电梯导航)

**节流策略(throttle),可以减少一段时间内事件的触发频率**

根据节流阀的状态决定是否触发















