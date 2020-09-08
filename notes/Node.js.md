# Node.js

> Node.js是一个基于chrome V8引擎的Javascript runtime(后端,服务器)

#### Chrome浏览器的运行环境

- V8引擎: 解析和执行Javascript代码
- 内置API: 运行环境提供的特殊接口,只能在所属的运行环境被调用

#### Node.js运行环境

- 不能调用浏览器DOM 和 BOM的API,内置对象不一样

## 内置对象

### fs文件系统模块

```js
fs.readFile(path[, options], callback) //	读取文件中的内容

const fs = require("fs");
fs.readFile("./file/hello.text", "utf8", (err, dataStr) => {
    // console.log(err);// 如果err为null就是读取成功了,如果不为null就是读取失败了
    // console.log(dataStr);

    if(err) {
        return console.log("读取文件失败", err.message);
    }

    console.log(("读取文件成功,文件内容为:"+ dataStr));
})
```



```js
fs.writeFile(file, data[, options], callback)

/**
 * 1)覆盖式的写入
 * 2)如果文件不存在,自动帮我们创建文件
 * 3)只会创建文件,不会创建目录
 */
fs.writeFile("./file/nodefile.text","不知道我等的是不是你",(err) => {
    //  如果写入成功err的值就是null,否则就是一个错误对象
    if(err){
        console.log(文件写入失败);
    }
    console.log("写入文件成功");
})
```



**node环境的中的换行** `\r\n`



### 相对路径的问题

> 相对路径是相对我们终端的路径,如果们终端和相对路径拼接后不对就会出错

> ⚠️在我们使用相对路径的时候,node会以当前终端路径拼接所写的路径,不包括我们自己cd的,所以如果需要cd就会拼接出错

**解决: **

- **使用绝对路径**: 移植性非常差,不可维护
- **__dirname**: 表示当前js文件所处目录,这个路径跟终端所处位置没有关系(*推荐使用*)



### path模块

`path.join()`

凡是涉及到路径拼接的操作，**都要使用 `path.join()` 方法进行处理**。不要直接使用 + 进行字符串的拼接,`path.join()`会帮我们做一些处理,减少一些手误等问题

```js
const fs = require('fs')
const path = require('path')

// 使用 path.join() 做路径分割
fs.readFile(path.join(__dirname, '/Tom.txt'), 'utf8', function (err, data) {
  // 判断 err 对象是否为 null
  if (err) {
    return console.log('文件读取失败：', err.message)
  }

  console.log('文件读取成功，内容是：', data)
})
```

参数只能为字符串

```js
path.join('foo', {}, 'bar');
// Throws 'TypeError: Path must be a string. Received {}'
```

`path.basename()`

> 可以取得一个路径中的文件名

```
path.basename(path[, ext])//path: 文件名 ext: 后缀名 return: String
```

 `path.extname()` 

可以获取路径中的扩展名部分，语法格式如下

```js
path.extname(path)
```



`exec()`返回一个数组或者null

`replace()`在不改变原字符串的情况,返回一个替换后的字符串,我们一般需要的是这个返回的值



## http模块

> IP地址是网络设备在网络中的唯一标记
>
> `http.createServer()` 方法，就能方便的把一台普通的电脑，变成一台 `Web` 服务器
>
> `127.0.0.1` 对应的域名是 `localhost`，它们都代表我们自己的这台电脑，在使用效果上没有任何区别
>
> web服务和端口号一一对应,一个端口不能被多个服务占用

```js
const http = require("http");
```

```js
//	1.导入模块
const http = require("http")
//	2.创建服务器
const server = http.createServer()

/** 
	req: 请求对象, 包含了与客户端相关的数据和属性 req.url  req.method
	res: 响应对象,调用res.end()以完成响应
*/
server.on("request", function(req, res){
    console.log("正在访问服务器");
  //	1).获取请求相关的信息
  //	2).对请求数据做处理
  //	3).对请求做出响应
  res.setHeader("Content-Type", "text/html;charset=utf-8") //	设置请求头,编码中文,不然就是乱码
  res.end("响应内容")
})
//	3.启动服务器
server.listen(8080, function(){
    console.log("访问服务器成功");
})
```



## 模块化 node.js 是遵循common.js的模块化

> `Node.js` 中根据模块来源的不同，将模块分为了 3 大类，分别是：模块之间是不能交叉访问的
>
> 1. 内置模块（内置模块是由 `Node.js` 官方提供的，例如 `fs`、`path`、`http` 等）
> 2. 自定义模块（用户创建的每个 `.js` 文件，都是自定 义模块）
> 3. 第三方模块（由第三方开发出来的模块，并非官方提供的内置模块，也不是用户创建的自定义模块，**使用前需要先下载**）

```js
// 1.加载内置模块
let fs = require("fs");

// 2.加载自定义模块
//	这里的路径是相对的当前文件路径,不需要拼接路径了,但是要"./",可以不写后缀
let index = require("./index") 

// 3.加载第三方模块
let elementUI = require("elment-ui")
```

### 作用域

> 模块成员(当前模块定义的变量,常量,函数),只能在当前模块访问

> 每一个模块都有一个模块对象moduel,有一个module.exports属性,默认情况下是一个空对象{}

```js
//	利用module.exports 可以导出模块成员,当然也可以一个一个暴露
//	如果即有单个也有对象,始终以module.exports指向的对象为准,即整个时候module这个对象是没有name属性的
module.exports.name = "乔安娜"
module.exports = {
		username: "li xiao long",
  	age: 19
}

//	基于commo.js的模块化导入
let exp = require("./explore") //	这种自己的模块化是要加 ./ 的
console.log(exp.username); // li xiao long
console.log(exp);	//  {username: "li xiao long"}

//  node还提供了exports这个对象,默认情况下,exports和module.exports指向同一个对象,但是最终还是以module.exports对象为准
//	但是exports不能以独立对象的形式导出
exports.age = 19;
exports.name = "小李";

```





## npm 

### 下载源管理工具

`nrm`

```js
npm i nrm -g //	下载
nrm use taobao	//	切换
nrm ls	//	查看
```

npm 指令

```
//下载
npm install jquery
npm i jquery 
//多个下载
npm install jquery moment
//指定版本下载
npm install jquery@12.1.4
//卸载
npm uninstall jquery
```

### 包的版本号

`2.24.0`

第一位:大版本号

第二位:功能版本

第三问:bug修复版本



### package.json

> 记录当前项目使用了哪些包,npm规定必须有一个package.json配置文件,在项目初始化时就要创建此配置文件
>
> 在下载包时npm会自动帮我们配置在此文件

在项目快速创建package.json文件:(**项目名称不允许出现中文和空格**)

```
npm init -y
```

然后可以通过此配置文件可以自动下载所有配置过的包,只需执行此命令

```
npm install
```



### 包的分类

- 开发依赖包 --> `devDependencies` 节点中的包,只在开发期间会用到的包

- 核心依赖包 --> `dependencies` 节点中的包, 在开发和上线之后都会用到

  ```
  npm i glup -D #开发依赖包  npm i glup --save--dev #全称 包名和和-D前后顺序不重要
  npm i jquery  #核心依赖包
  ```

- 全局的包

```
npm i nrm -g #全局安装
npm uninstall nrm -g #全局卸载包
```



### 包的结构规范



1. 单独的目录存在
2. 包的根目录下必须包含`package.json`这个配置文件
3. package.json中必须包含`name`, `version`, `main`这个三个属性,分别代表**名字,版本号,入口**



### 发布包 到npmjs.com

> npm账号注册完成后,可以在终端中执行npm login命令 依次输入信息进行登录

⚠️在运行npm login命令之前,必须把下包的服务器切换为npm的官方服务器,否则会发布失败 --> 利用nrm npm

### 发布与删除

```
//切换到根目录
npm publish //发布
npm unpublish 包名 --force //删除,如果要删除要在24小时删除
```



## 模块的加载机制

> 模块化导入会执行模块中的代码,而且会被缓存,不会形成重复导入
>
> 如果内置模块和其他模块重名,内置模块优先级最高

```js
// 1.加载内置模块
let fs = require("fs");

// 2.加载自定义模块
//	这里的路径是相对的当前文件路径,不需要拼接路径了,但是要"./",可以不写后缀
let index = require("./index") 

// 3.加载第三方模块
let elementUI = require("elment-ui")
```

> 文件加载补全顺序

```
1. 按确切的文件名进行加载
2. 补全.js扩展名进行加载
3. 补全.json进行加载
4. 补全.node进行加载
5. 加载失败
```

> 模块导入查找

```
从当前目录开始逐级向上查找
```

> 目录作为模块导入

```
1.在被加载目录下查找一个叫package.json的文件,寻找main属性,作为require()加载入口
2.如果没有package.json 或者main入口不存在,就加载index.js
3.如果都不行就抛出错误,找不到模块
```



## Express 这算的上是我们第一个框架了

> 基于node.js的web开发框架
>
> 创建web网站服务器、api接口服务器

- 创建web网站服务器 主要实现就是通过托管静态资源

  ```js
  const express = require('express')
  
  const app = express()
  
  // 静态资源托管 访问不到public文件件,只能访问到里面的静态文件,如果需要可以在前面配置一个文件夹
  app.use(express.static('./public'))
  
  // 启动服务器
  app.listen(80, () => {
      console.log('服务器启动成功,请访问：http://127.0.0.1')
  })
  ```

- 创建api接口服务器

  ```js
  // 导入express
  const express = require('express')
  // 创建服务器对象
  const app = express()
  // 利用cros解决跨域
  const cors = require('cors')
  // 调用cors()
  app.use(cors())
  // 挂载注册的路由
  app.post('/user/reg', (req, res) => {
  		res.send({status:0,message: '注册成功'})
  })
  
  // 启动服务
  app.listen(3006, ()=>{
  	console.log('running')
  })
  ```

  

### 语法

```
const express = require("express")
//创建服务器
const app = express();
//监听请求
app.get(req, res)	//监听get请求
app.post(req, res) //监听post请求
app.use(req, res)	//监听所有请求
//响应数据
res.send() //	里面可以直接放中文或者html字符串
//req请求对象
req.query //查询参数 ?name=lisi&age=18
req.params //动态参数
// 在注册app.use(express.urlencoded({extended: false}))中间件后可以使用
req.body //	如果没有注册上述中间件 req.body就是undefined
```



#### nodemon

> 全局插件,在我们修改服务器内容的时候,会自动帮我们关闭和重启服务器

### 获取url的动态参数 :id

> 动态参数是查询地址的一部分,而查询字符串是?后面的内容

`req.params` 和vue router里面的是一样的

```
"/getuser/:id/:username" #多级动态参数,:id :相当于占位符,:id相当于这整个动态参数名字
```



### Express托管静态资源

```
app.use(express.static("文件目录"))  //	这样就可以访问文件目录下的文件,访问的时候不要包括“文件目录”
```

#### **处理托管资源的前缀**

```
app.use("/files", express.static("./files")) //	这样在访问index.html的时候就必须带有/files
```

### Express路由

> 客户端请求地址和服务端处理函数的映射关系

**挂载路由**: 请求方式 ,请求地址, 处理函数

```
app.get("/user", () => {}) //	排在前面的优先级越高
app.post("/", () => {})
```

#### 路由模块化

- 调用express.Router()函数创建路由对象
- 使用app.use()函数注册路由模块化



### 中间件

> 相当于路由守卫

```
app.get("/", (req, res, next) => {
	.....
	next()//经过处理后导航到指定的路由
	//	在调用next()后就不要再写冗余的代码了
})
```

> 局部中间件和全局中间件都可以定义多个,但是多个中间件函数公用一份 req, res

#### 应用:

在前期的中间件上挂载一些属性,后面的中间件就能使用到

#### 注意事项

1.  **一定要在路由之前注册中间件**
2.  客户端发送过来的请求，可以连续调用多个中间件进行处理
3.  执行完中间件的业务代码之后，不要忘记调用 `next()` 函数
4.  为了防止代码逻辑混乱，调用 `next()` 函数后不要再写额外的代码
5.  连续调用多个中间件时，多个中间件之间，共享 `req` 和 `res` 对象

#### 错误级别的中间件

```
app.use((err, req, res, next) => {
	console.log(err.message)
})
```

**注意： 错误级别的中间件，必须注册在所有路由之后**,其他的中间件都要放在路由之前



### 内置中间件

- `express.static`    app.use(express.static("文件目录"))

  ```js
  app.use(express.static("/public"))//	托管静态资源
  ```

  ⚠️这个中间件也非常重要

- `express.json`    -->  @4.16.0+.      app.use(express.json())

- ⚠️⚠️⚠️`express.urlencoded` --> @4.16.0+     app.use(express.urlencoded({ extended: false }))  **获取请求体数据**(就是我们发送ajax所带的数据对象⚠️⚠️⚠️)req.body,如果没有使用这个中间件,req.body就是undefined

  ```js
  // 解析 POST 提交过来的表单数据
  app.use(express.urlencoded({ extended: false }))
  ```

  ⚠️这个自带的中间件很重要

### 第三方中间件

在 `express@4.16.0` 之前的版本中，经常使用 `body-parser` 这个第三方中间件，来解析请求体数据。使用步骤如下

- 运行 `npm install body-parser` 安装中间件
- 使用 `require` 导入中间件
- 调用 `app.use()` 注册并使用中间件(使用的时候可以去npmjs.com查询文档)

### 自定义中间件

```
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// 解析表单数据的中间件
app.use((req, res, next) => {
  // 定义中间价具体的业务逻辑
  // 1. 定义一个 str 字符串，专门用来存储客户端发送过来的请求体数据
  let str = ''
  // 2. 监听 req 的 data 事件
  req.on('data', (chunk) => { //这里涉及到文件的碎皮式传输
    str += chunk
  })

  // 3. 监听 req 的 end 事件
  req.on('end', () => {
    // 在 str 中存放的是完整的请求体数据
    console.log(str)
    // 将字符串格式的请求体数据，解析成对象
  })
})

app.post('/user', (req, res) => {
  res.send('ok')
})

// 调用 app.listen方法，指定端口号并启动 web 服务器
app.listen(3000, () => {
  console.log('running……')
})


```



### 接口跨域问题

1.  到目前为止，我们编写的 `GET` 和 `POST` 接口，存在一个很严重的问题：**不支持跨域请求**

2.  解决接口跨域问题的方案主要有两种

    - **CORS**  (主流的解决方案，推荐使用)
    - **JSONP**  (有缺陷的解决方案：只支持 GET 请求)



#### 手动设置解决跨域问题

```
app.use(function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "接受的请求源类型,*表示接受所有url地址")
	res.setHeader("Access-Control-Allow-Headers", "设置自己想要跨域的额外请求头")
	res.setHeader("Access-Control-Allow-Methods", "设置自己想要发起的请求类型")
})
```

**默认情况下**，CORS仅支持客户端发起GET, POST, HEADE请求

CORS 仅支持客户端向服务器发送如下的 9 个请求头,这9个之外的也会报跨域错

- `Accept`
- `Accept-Language`
- `Content-Language`
- `DPR`
- `Downlink`
- `Save-Data`
- `Viewport-Width`
- `Width`
- `Content-Type` （值仅限于 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded` 三者之一）



#### !!!第三方cros解决跨域问题

```
// 安装 npm install cros

// 导入中间件
const cors = require('cors')
// 配置中间件
app.use(cors())
```

**如果不在服务器默认的请求内,就叫做预检请求,总共会发起两次请求**

**在服务器默认请求范围内,就叫简单请求,简单请求只发起一起请求**



#### JOSNP方案

> 下面为原生方案,一般用jQuery会简单明了一些

**服务器端**

```js
const express = require("express");
const { json } = require("express");
const app = express();

app.get("/jsonp", (req, res) => {
    const fnName = req.query.callback;//获取传入回调函数名
    const jsonStr = JSON.stringify({
        name: "小伙子",
        age: 40
    })

    const str = `${fnName}(${jsonStr})`;//解析为函数执行的样子,在发起请求的页面执行
    res.send(str)

})

app.listen(80, () => {
    console.log("启动服务器成功,http://127.0.0.1");
})
```

**客户端**

```js
		<script>
        function fn(data) {
            console.log(data);
        }
    </script>
    <script src="http://127.0.0.1/jsonp?callback=fn"></script>
```





# 数据库SQL (Structured Query Language)

> 关系型数据库: mySQL  Oracle  SQL server(传统型)
>
> 非关系型数据库: mangoDB

**传统型数据库组织结构:**

数据库(database)、数据表(table)、数据行(row)、字段(field)



**数据储存原则**

- 不同的项目要对应独立的数据库
- 不同的数据要储存到数据库中不同的表中
- 行代表一条数据,数据内容由字段决定



## 常用的SQL语句

```sql
-- 通过 * 把 users 表中所有的数据查询出来
-- select * from users

-- 从 users 表中把 username 和 password 对应的数据查询出来
-- select username, password from users

-- 向 users 表中，插入新数据，username 的值为 tony stark  password 的值为 098123
-- insert into users (username, password) values ('tony stark', '098123')
-- select * from users

-- 将 id 为 4 的用户密码，更新成 888888
-- update users set password='888888' where id=4
-- select * from users

-- 更新 id 为 2 的用户，把用户密码更新为 admin123  同时，把用户的状态更新为 1
-- update users set password='admin123', status=1 where id=2
-- select * from users

-- 删除 users 表中， id 为 4 的用户
-- delete from users where id=4
-- select * from users

-- 演示 where 子句的使用
-- select * from users where status=1
-- select * from users where id>=2
-- select * from users where username<>'ls'
-- select * from users where username!='ls'

-- 使用 AND 来显示所有状态为0且id小于3的用户
-- select * from users where status=0 and id<3

-- 使用 or 来显示所有状态为1 或 username 为 zs 的用户
-- select * from users where status=1 or username='zs'

-- 对users表中的数据，按照 status 字段进行升序排序
-- select * from users order by status

-- 按照 id 对结果进行降序的排序  desc 表示降序排序   asc 表示升序排序（默认情况下，就是升序排序的）
-- select * from users order by id desc

-- 对 users 表中的数据，先按照 status 进行降序排序，再按照 username 字母的顺序，进行升序的排序
-- select * from users order by status desc, username asc

-- 使用 count(*) 来统计 users 表中，状态为 0 用户的总数量
-- select count(*) from users where status=0

-- 使用 AS 关键字给列起别名
-- select count(*) as total from users where status=0
-- select username as uname, password as upwd from users
```



### 在API服务器js中操作mySQL

```js
//  查询sql语句的结果是数组
    db.query("SELECT * FROM `user`", (err, res) => {
        console.log(err, res);
    })

    //  执行插入语句,res是一个对象
    db.query("insert into user(username, password) values('lion messi','10')", (err, res) => 		{
        if (err) return console.log(err.message);
        console.log(res);
    })

    // 执行更新语句 res也是一个对象
    db.query("update user set password='6883122',status='1' where id=7", (err, res) => {
        if (err) return console.log(err.message);
        console.log(res);
    })

    //  执行删除语句 res也是一个对象
    db.query("delete from user where id = 2", (err, res) => {
        if (err) return console.log(err.message);
        console.log(res);
    })
```



### 标记删除

> 如果使用delete语句会在数据库中删除数据,而这样做有很大风险,推荐使用标记删除

> 标记删除实际就是将数据status状态设为0,status一般我们认为设计的
>

### 身份认证(权鉴)

- session 基于cookie
- JWT



#### **cookie**

1.  `Cookie` 是**存储在用户浏览器中的一段不超过 4 KB 的字符串**。它由一个**名称**（Name）、一个**值**（Value）和其它几个用于控制 Cookie **有效期**、**安全性**、**使用范围**的**可选属性**组成
2.  不同域名下的 Cookie 各自独立，每当客户端发起请求时，会**自动**把**当前域名下**所有**未过期的 Cookie** 一同发送到服务器
3.  `Cookie` 的几大特性
    - 自动发送
    - 域名独立
    - 过期时限
    - 4KB 限制



#### session中间件

> 由于cookie默认不支持跨域,所以session方案默认不支持跨域

```js
npm i express-session
const session = require("express-session")
app.use(session({/*配置*/}))

//注册以后   就可以利用req.session对用户的信息进行储存

//取数据  req.session.username req.session.isLogin

//退出    清空当前用户cookie
req.session.destory()//	调用这个方法就行了
```



#### **JWT**

> 利用生成token和解析token,然后在对token的对比,进行授权

1.生成**token**

```
npm install jsonwebtoken express-jwt

//	jsonwebtoken用于生成JWT字符串
//	express-jwt用于解析token成数据对象

//	生成token
const jwt = require("jsonwebtoken")
//	解析token
const expressToken = require("express-jwt")
//	生成密钥
const secretkey = "/**/" 
//生成token
const token = jwt.sign({/*信息数据对象*/}, secretkey, {/*token配置对象对象*/})
```

2.解析**token**(使用中间件自动解析token)

客户端每次在访问受保护的借口时,都需要主动通过请求头中Authorization字段,将token字符串发送到服务器进行身份认证

此时我们可以通过**express-jwt**这个中间件,自动将客户端发送过来的Token解析还原成JSON对象



```
//	app.use()来注册中间件
//	expressJWT({secret: secretKey})
//	.unless({path: [^\/api\//]})用来指定哪些接口不需要访问权限
app.use(expressJWT({secret: secretKey,algorithms:['HS256']}).unless({path: [/^\/api\//]}))
```

3.使用全局错误处理中间件，手动捕获解析 JWT 失败后产生的错误

```
app.use((err, req, res, next) => {res.send()})  
//	res.send()只能响应一次,如果需要响应多次,需要前置return
```



**表单验证原则:前端验证为辅,后端验证为主**





































# 模块化

除了ES2015提供的模块规范，当前广泛应用的Javascript模块规范共有两种:

（1）CommonJS。

（2）AMD。

**一.CommonJS规范:**

此规范适用于服务器端，例如node.js模块系统就是遵照此规范的。

简单代码演示如下:

```
let ant= require('ant');
```

全局性方法require()，用于加载模块；上面就是加载了一个名为"ant"的模块。

模块加载完成之后，就可以使用模块中的元素了，代码演示如下:

```
let ant= require('ant');
ant.do()
```

**二.AMD规范:**

异步操作在浏览器环境下特别的重要，比如我们要远程请求服务器一个较大文件，如果这个过程不是异步，那网页肯定要卡死，人性化程度特别低，所以浏览器端的模块需要异步加载，CommonJS规范不适合。

AMD的全称是**"Asynchronous Module Definition"**（异步模块定义），采用异步方式加载模块，所以不会在浏览器端造成堵塞。看一段简单的代码实例:

```
require([module], callback);
```

require.js符合AMD规范；第一个参数是数组，里面的成员就是要加载的模块；第二个参数callback，则是加载成功之后要执行的回调函数。

模块的加载和模块中元素的使用是异步的，所以适合于浏览器端。













