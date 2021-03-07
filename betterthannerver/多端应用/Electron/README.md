



# Electron

## 课程介绍

![image-20191117000423516](README.assets/image-20191117000423516.png)

**什么是Electron？**

- 使用Javascript，HTML和CSS构建跨平台的桌面应用
- Web技术-Electron基于Chromium和Node.js
- 开源-众多贡献者组成的活跃社区共同维护的开源项目
- 跨平台-兼容Mac，Windows和Linux



**谁在使用Electron？**

![image-20191116162730212](README.assets/image-20191116162730212.png)



**本课程的主要内容：**

- Electron的基础知识，理解进程概念和跨进程通信原理 
- 加强前端开发基础 -  HTML，JS，CSS
-  深入了解浏览器的工作原理
-  加强三大流行框架Vue框架的应用



**本课程的学习路径：**

- 了解Electron的基本工作原理
- 配置Electron下载加速源
- Electron初始化项目
- 认识vue cli，使用Vue CLI配置基本的开发项目
- 开发一款Electron的应用



**本课程的学习目标：**

- 了解Electron的工作原理
- 掌握浏览器的工作原理
- 熟悉使用Electron常见API
- 学会使用原生JS或者框架配合Electron进行开发



**本课程的学习准备：**

- Github账号
- Linux服务器，或者虚拟机（Centos 7.x）
- 安装Docker服务，参见：https://www.daocloud.io/mirror，或者使用window desktop/mac descktop，参见：https://www.docker.com/products/docker-desktop





## Electron

### Electron项目初始化

#### 安装nvm去管理多Node版本

Windows: https://github.com/coreybutler/nvm-windows/releases

安装小贴士： 如果本地已经有node的版本，直接使用`install`的版本进行安装，如果安装完成之后找不到Node的版本，可以再次把node安装一次（没有看错，是安装node）

Mac&linux: https://github.com/nvm-sh/nvm

安装命令：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash
```

安装完成之后，还需要添加环境变量：



#### 建议使用cnpm淘宝源进行安装

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

初始化Electron项目：

```bash
# 克隆示例项目的仓库
$ git clone https://github.com/electron/electron-quick-start

# 进入这个仓库
$ cd electron-quick-start

# 安装依赖并运行
$ cnpm install && cnpm start
```

PS: 如果不使用cnpm进行下载，会非常卡顿

![image-20191117000641412](README.assets/image-20191117000641412.png)



运行起来后得到如下画面：

![image-20191117000804537](README.assets/image-20191117000804537.png)



### 多进程

什么是进程？

狭义定义：进程是正在运行的程序的实例（an instance of a computer program that is being executed）。

广义定义：进程是一个具有一定独立功能的程序关于某个数据集合的一次运行活动。它是操作系统动态执行的基本单元，在传统的操作系统中，进程既是基本的分配单元，也是基本的执行单元。



Electron是由Chromium作为内核，Chromium是一个多进程的。

![image-20191116235854034](README.assets/image-20191116235854034.png)

Electron里面有主进程与渲染进程：

- 主进程 - Main Process
  - 可以使用和系统对接的Electron API - 创建菜单，上传文件 等。
  - 创建渲染进程 - Renderer Process
  - 全面支持Nodejs
  - 只有一个，作为程序的入口
- 渲染进程
  - 可以有多个，每个对应一个窗口
  - 每个都是一个单独的进程
  - 全面支持Nodejs和DOM API
  - 可以使用一部分Electron提供的API



### 第一个应用

使用`nodemon`监听文件的变化：

```bash
"dev": "nodemon --watch main.js --exec electron ."
```



`main.js`

```js
const { app, BrowserWindow } = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
  
  const secondWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    parent: mainWindow
  })
  secondWindow.loadFile('index.html')
})
```



index.html:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Itheima</title>
</head>
<body>
  Hello World!
</body>
</html>
```



加载出来的效果：

![image-20191117001654376](README.assets/image-20191117001654376.png)



### 调试Electron应用

- nodemon监听main.js入口文件的变化（见上文）
- 使用gulp/webpack去监听文件的变化 + `electron-connect`来reload/restart Electron应用
- 使用vscode来调试node应用



#### Electron-connect的使用方法

安装，配合`gulp`进行使用

```
npm install electron
npm install electron-connect gulp --save-dev
```



创建`gulpfile.js`默认的配置任务：

```js
const { series, watch, task } = require("gulp");
const electron = require("electron-connect").server.create();

// series串行执行gulp任务, watch 监听文件的变化
task("serve", function(cb) {
  electron.start(() => {
    watch("main.js", electron.restart);
    // 监听渲染进程中的文件变化，进行页面的重载
    watch(["index.html"], electron.reload);
  });
  cb();
});

exports.default = series("serve");
```



修改`main.js`文件

```js
const { app, BrowserWindow } = require("electron");
// 加入这一行
const client = require("electron-connect").client;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  win.loadFile("index.html");

	// 加入这一行
  client.create(win);
}

app.on("ready", createWindow);
```



修改渲染进程中的`index.html`：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <script>
      // 需要引用electron-connect
      require("electron-connect").client.create();
    </script>
  </head>
  <body>
    hello world! hello itheima!
    <script>
      const path = require("path");
      console.log(path.resolve("./"));
    </script>
  </body>
</html>
```

最后使用命令：

```
npx gulp
```

或者在`package.json`中添加`gulp`命令：

```json
{
  "name": "electron-helloworld",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "hot": "nodemon main.js --exec 'electron .'",
    "gulp": "gulp"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "electron": "^7.1.5"
  },
  "devDependencies": {
    "electron-connect": "^0.6.3",
    "gulp": "^4.0.2",
    "nodemon": "^2.0.2"
  }
}
```



**子窗口（多页面）热更新调试**

- 修改`gulpfile.js`中对子窗口的资源文件进行监听

- 修改`main.js`主进程，添加`client.create(子窗口实例)`

- 修改子窗口的html，添加:

  ```js
  <script>require('electron-connect').client.create()</script>
  ```

然后就可以开心的玩耍了~~~



#### 在vscode中调试electron

添加调试配置，就可以断点调试`main.js`了：

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "sourceMaps": true,
      "program": "${workspaceFolder}/main.js"
    }
  ]
}
```



### 进程间通信

为什么需要进程间的通信？

![image-20191117002640240](README.assets/image-20191117002640240.png)



通讯方式：IPC(Interprocess Communication)进程之间进行通讯，事件驱动的方式驱动。



`main.js`

```js
const { app, BrowserWindow, ipcMain } = require('electron')

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.loadFile('index.html')
  ipcMain.on('message', (event, arg) => {
    console.log(arg);
    // event.sender.send('reply', 'hello from main')
    mainWindow.send('reply', 'hello from main')
  })
})
```



html中引用`render.js`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Itheima</title>
</head>
<body>
  Hello World!
  <p id="app"></p>
  <script src="render.js"></script>
</body>
</html>
```



`render.js`负责来响应消息：

```js
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('message', 'hello from server')
  ipcRenderer.on('reply', (event, arg) => {
    document.getElementById('app').innerHTML = arg
  })
})
```



### 跨进程通信API

#### Remote(渲染进程中使用主进程)

![image-20191215100324789](README.assets/image-20191215100324789.png)

> 在渲染进程中使用主进程模块。

进程: [渲染进程](https://electronjs.org/docs/glossary#renderer-process)

`remote` 模块为渲染进程（web页面）和主进程通信（IPC）提供了一种简单方法。

在Electron中, GUI 相关的模块 (如 `dialog`、`menu` 等) 仅在主进程中可用, 在渲染进程中不可用。 为了在渲染进程中使用它们, `ipc` 模块是向主进程发送进程间消息所必需的。 使用 `remote` 模块, 你可以调用 main 进程对象的方法, 而不必显式发送进程间消息, 类似于 Java 的 [RMI ](https://en.wikipedia.org/wiki/Java_remote_method_invocation)。
例如：从渲染进程创建浏览器窗口

```javascript
const { BrowserWindow } = require('electron').remote
let win = new BrowserWindow({ width: 800, height: 600 })
win.loadURL('https://github.com')
```

**注意:** 反过来（如果需要从主进程访问渲染进程），可以使用 [webContents. executeJavascript ](https://electronjs.org/docs/api/web-contents#contentsexecutejavascriptcode-usergesture)。

**注意事项：** 因为安全原因，remote 模块能在以下几种情况下被禁用：

- [`BrowserWindow`](https://electronjs.org/docs/api/browser-window) - 通过设置 `enableRemoteModule` 选项为 `false`。
- [`<webview>`](https://electronjs.org/docs/api/webview-tag) - 通过把 `enableremotemodule`属性设置成 `false`



#### 主进程访问渲染进程

用法：

```
contents.executeJavaScript(code[, userGesture])
```

- `code` String
- `userGesture` Boolean (optional) - Default is `false`.

在页面中执行 `code`。

在浏览器窗口中，一些HTML API（如`requestFullScreen`）只能是 由来自用户的手势调用。 将 `userGesture` 设置为 `true` 将删除此限制。

Code execution will be suspended until web page stop loading.

```javascript
contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
  .then((result) => {
    console.log(result) // Will be the JSON object from the fetch call
  })
```



Example： 点击百度logo即可关闭窗口

```js
  const win1 = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    parent: win
  });

  win1.loadURL("http://www.baidu.com");

  win1.webContents.executeJavaScript(`
    document.getElementById("lg").addEventListener("click", function(){
        require("electron").ipcRenderer.send("app.quit");
    });
  `)

  ipcMain.on("app.quit", function (event) {
    win1.close();
  });
```



## 实战应用

### 配置quickstart项目

好的工程目录，可以方便我们阅读项目

- 删除无用的无关的文件
- 修改`main.js`，加入`nodeIntegration: true`
- 修改`gulpfile.js`中watch监听的文件路径与名称
- 新建渲染进程目录`renderer`，在该目录下创建相关的页面和资源文件



### 原型图流程图

父窗口：

![image-20191215090251703](README.assets/image-20191215090251703.png)



子窗口：

![image-20191215090210689](README.assets/image-20191215090210689.png)



流程图：

![image-20191215130712451](README.assets/image-20191215130712451.png)



### 项目开发

#### 开发主页面

- 按照流程图 + 原型图，我们创建`mainWindow`
- 在renderer目录下，创建`index.html`，与`index.js`

- 引用BootStrap&font-awesome，使用buttons、layout和utilities，创建主页面

安装：

```bash
npm install -S bootstrap font-awesome
```



主进程index.html

```html
<!DOCTYPE html>

<head>
  <meta charset="UTF-8" />
  <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
  <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
  <title>Music App</title>
  <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="../node_modules/font-awesome/css/font-awesome.css">
  <script>require('electron-connect').client.create()</script>
</head>

<body>
  <div class="container mt-4">
    <h1>My Player</h1>
    <button id="add" type="button" class="btn btn-primary btn-lg btn-block mt-4">Add music to List</button>
  </div>
  <!-- You can also require other files to run in this process -->
  <script src="./index.js"></script>
</body>

</html>
```



#### 封装AppWindow窗口类

```js
class AppWindow extends BrowserWindow {
  constructor(config, file) {
    const base = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      },
      show: false
    }
    const finalConfig = Object.assign(base, config)
    // const finalConfig = { ...base, ...config }
    super(finalConfig)

    // 加载页面
    this.loadFile(file)

    // ready to show
    this.once('ready-to-show', () => {
      this.show()
    })
    // 配合electron-connect热加载
    client.create(this);
  }
}
```



#### 添加音乐窗口

两种方法来创建”添加“窗口：

- ipc事件传递点击事件消息，在主窗口的渲染进程中来进行创建
- 使用remote来进行创建窗口



我们介绍第一种方式来创建，熟悉ipc的通信

`main.js`添加Ipc消息响应监听

```js
  ipcMain.on('add-music-window', () => {
    const secondWindow = new AppWindow({
      width: 500,
      height: 400,
      parent: mainWindow
    }, './renderer/add.html')
  })
```



`index.html`

```html
...
<button id="add" type="button" class="btn btn-primary btn-lg btn-block mt-4">Add music to List</button>
...
```



`index.js`

```js
const { ipcRenderer } = require('electron')

document.getElementById('add').addEventListener('click', function () {
  ipcRenderer.send('add-music-window')
})
```



添加窗口的`add.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Choose Music</title>
  <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container mt-4 pb-4">
    <h1>Add Menu</h1>
    <button type="button" class="btn btn-lg btn-block btn-outline-primary mt-4">Choose Music from Files</button>
    <button type="button" class="btn btn-primary btn-lg btn-block mt-4">Import Files</button>
  </div>
</body>
</html>
```



效果演示：

![image-20191215154018135](README.assets/image-20191215154018135.png)



#### dialog模块介绍

> 显示用于打开和保存文件、警报等的本机系统对话框。

线程：[主线程](https://electronjs.org/docs/glossary#main-process)

An example of showing a dialog to select multiple files:

```javascript
const { dialog } = require('electron')
console.log(dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] }))
Copy
```

这个对话框是从Electron的主线程上打开的。如果要使用渲染器进程中的对话框对象, 可以使用remote来获得:

```javascript
const { dialog } = require('electron').remote
console.log(dialog)
```



`filters` 指定一个文件类型数组，用于规定用户可见或可选的特定类型范围。例如:

```javascript
{
  filters: [
    { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
    { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
    { name: 'Custom File Type', extensions: ['as'] },
    { name: 'All Files', extensions: ['*'] }
  ]
}
```

`extensions` 数组应为没有通配符或点的扩展名 (例如, `"png"` 是正确的, 而 `".png"` 和 `*. png "` 就是错误的)。 若要显示所有文件, 请使用 `"*"` 通配符 (不支持其他通配符)。



添加音乐文件，调用原生dialog窗口：

```js
const { dialog } = require('electron')
  
dialog.showOpenDialog({
  properties: ['openFile', 'multiSelections'],
  filters: [
    { name: 'musics', extensions: ['mp3'] },
  ]
})
```



#### 添加文件列表

- 取路径中的文件名称
- 动态添加文件名称到页面上来



`add.js`

```js
const { ipcRenderer } = require('electron')
const path = require('path')

$('select').addEventListener('click', () => {
  ipcRenderer.send('open-music-dialog')
})

const renderHTML = (arr) => {
  const lists = $('musicList')
  // 取路径中的文件名称
  // 动态添加文件名称到页面上来
  // const result = arr.map((item) => path.basename(item))
  // console.log('TCL: renderHTML -> result', result)
  const htmlstr = arr.reduce((html, item) => {
    html += `<li class="list-group-item">${path.basename(item)}</li>`
    return html
  }, '')
  lists.innerHTML = `<ul class="list-group">${htmlstr}</ul>`
}

// 获取选择音乐的文件路径
ipcRenderer.on('selected-files', (event, args) => {
  if (Array.isArray(args)) {
    renderHTML(args)
  }
})
```

> 在这里我们使用原生的js去操作DOM，学习主流框架的底层原理。
>
> 同样的，你也可以去使用vue、react来完成DOM的操作



#### Electron Store持久化数据

- 使用数据库软件
- 使用HTML5提供的浏览器对象
- 使用本地文件



使用electron-store来实现本地数据的持久化：

```bash
$ npm install electron-store
```

例子：

```js
const Store = require('electron-store');

const store = new Store();

store.set('unicorn', '🦄');
console.log(store.get('unicorn'));
//=> '🦄'

// Use dot-notation to access nested properties
store.set('foo.bar', true);
console.log(store.get('foo'));
//=> {bar: true}

store.delete('unicorn');
console.log(store.get('unicorn'));
//=> undefined
```



实现`DataStore.js`

```js
const Store = require('electron-store');
const uuid = require('uuid/v4')
const path = require('path')

class DataStore extends Store {
  constructor(settings) {
    super(settings)
    this.items = this.get('items') || []
  }

  // 保存列表文件
  saveItems () {
    this.set('items', this.items)
    return this
  }

  // 获取列表文件
  getItems () {
    return this.get('items') || []
  }

  /**
   * 添加文件
   * @param {Array} lists 文件列表
   */
  addItem (lists) {
    // 查找已经保存的文件列表
    // 过滤已经存在的文件
    // 文件名称相同，但是文件路径不同
    const listItems = lists.map(item => {
      return {
        id: uuid(),
        path: item,
        fileName: path.basename(item)
      }
    }).filter(item => {
      const currentPaths = this.getItems().map(i => i.path)
      // 判断，当前存储的文件路径是否与传递过来的文件路径相同，
      // 如果数组中不存在对应的路径，则保留该文件
      return currentPaths.indexOf(item.path) < 0
    })
    this.items = [...this.items, ...listItems]
    return this.saveItems()
  }

  // 删除特定的文件
  deleteItem (itemId) {
    this.items = this.items.filter(item => item.id !== itemId)
    return this.saveItems()
  }
}

module.exports = DataStore
```



#### 主窗口的列表数据

- 存储在Store中的数据
- Import从添加窗口添加过来的数据



main.js读取Store中的数据

- 使用到store类
- 使用到webContents中的`did-finish-load`事件

```js
  mainWindow.webContents.on('did-finish-load', () => {
    // 每当electron重启之后，加载本地存储的内容
    mainWindow.send('getItems', myStore.getItems())
  })
```



index.js渲染列表

```js
const path = require('path')

const { ipcRenderer } = require('electron')

$('add').addEventListener('click', function () {
  ipcRenderer.send('add-music-window')
})

ipcRenderer.on('getItems', (event, args) => {
  // 渲染列表
  renderHTML(args)
})

const renderHTML = (arr) => {
  const lists = $('lists')
  // 取路径中的文件名称
  // 动态添加文件名称到页面上来
  // const result = arr.map((item) => path.basename(item))
  const htmlstr = arr.reduce((html, item) => {
    html += `<li class="list-group-item">
        <div class="row d-flex justify-content-between align-items-center px-3 py-2">
          <div class=""><i class="fa fa-music mr-3" aria-hidden="true"></i>${item.fileName}</div>
          <div class="">
            <i class="fa fa-play mr-4" aria-hidden="true"></i>
            <i class="fa fa-trash" aria-hidden="true"></i>
          </div>
        </div>
      </li>`
    return html
  }, '')
  lists.innerHTML = `<ul class="list-group">${htmlstr}</ul>`
}
```

#### 数据存储与音频播放

**音频播放**

- HTML的Audio标签：[简介](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)

- HTMLAudioElement控制播放、暂停、停止，[简介](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLAudioElement)

基本用法：

```html
<!-- Simple audio playback -->
<audio src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" autoplay>
  Your browser does not support the <code>audio</code> element.
</audio>

<!-- Audio playback with captions -->
<audio src="foo.ogg">
  <track kind="captions" src="foo.en.vtt" srclang="en" label="English">
  <track kind="captions" src="foo.sv.vtt" srclang="sv" label="Svenska">
</audio> 
```

进阶用法：

```html
<audio id="demo" src="audio.mp3"></audio>
<div>
  <button onclick="document.getElementById('demo').play()">播放声音</button>
  <button onclick="document.getElementById('demo').pause()">暂停声音</button>
  <button onclick="document.getElementById('demo').volume+=0.1">提高音量</button>
  <button onclick="document.getElementById('demo').volume-=0.1">降低音量</button>
</div> 
```

停止媒体播放：

```js
var mediaElement = document.getElementById("myMediaElementID");
mediaElement.pause();
mediaElement.src='';
//or
mediaElement.removeAttribute("src"); 
```



**DOM存储自定义数据**

- HTML使用自定义data属性：data-*来存储
- JS中使用HTMLelement的data属性来读取

例子：

```js
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe
</div>

var el = document.querySelector('#user');

// el.id == 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''

el.dataset.dateOfBirth = '1960-10-03'; // set the DOB.

// 'someDataAttr' in el.dataset === false

el.dataset.someDataAttr = 'mydata';
// 'someDataAttr' in el.dataset === true
```



**事件冒泡与代理 ：**

- 浏览器先捕获后冒泡
- 捕获是自外向里，自上而下
- 冒泡是自里向外，自下而上

![image-20191218234849505](README.assets/image-20191218234849505.png)

浏览器默认是冒泡，需要设置`addEventListener`的第3个属性：

语法

```
target.addEventListener(type, listener[, options]);
target.addEventListener(type, listener[, useCapture]);
target.addEventListener(type, listener[, useCapture, wantsUntrusted  ]);  // Gecko/Mozilla only
```

参数

- `type`

  表示监听[事件类型](https://developer.mozilla.org/zh-CN/docs/Web/Events)的字符串。

- `listener`

  当所监听的事件类型触发时，会接收到一个事件通知（实现了 [`Event`](https://developer.mozilla.org/zh-CN/docs/Web/API/Event) 接口的对象）对象。`listener` 必须是一个实现了 [`EventListener`](https://developer.mozilla.org/zh-CN/docs/Web/API/EventListener) 接口的对象，或者是一个[函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Functions)。有关回调本身的详细信息，请参阅[The event listener callback](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#The_event_listener_callback) 

- options 可选

  一个指定有关 `listener `属性的可选参数**对象**。可用的选项如下：`capture`:  [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，表示 `listener` 会在该类型的事件捕获阶段传播到该 `EventTarget` 时触发。`once`:  [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，表示 `listener 在添加之后最多只调用一次。如果是` `true，` `listener` 会在其被调用之后自动移除。`passive`: [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，设置为true时，表示 `listener` 永远不会调用 `preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。`` mozSystemGroup`: 只能在 XBL 或者是 Firefox' chrome 使用，这是个 [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，表示 `listener `被添加到 system group。

- `useCapture` 可选

  [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，在DOM树中，注册了listener的元素， 是否要先于它下面的EventTarget，调用该listener。 当useCapture(设为true) 时，沿着DOM树向上冒泡的事件，不会触发listener。当一个元素嵌套了另一个元素，并且两个元素都对同一事件注册了一个处理函数时，所发生的事件冒泡和事件捕获是两种不同的事件传播方式。事件传播模式决定了元素以哪个顺序接收事件。进一步的解释可以查看 [事件流](http://www.w3.org/TR/DOM-Level-3-Events/#event-flow) 及 [JavaScript Event order](http://www.quirksmode.org/js/events_order.html#link4) 文档。 如果没有指定， `useCapture` 默认为 false 。 



再来看看caniUse:

![image-20191218222038262](README.assets/image-20191218222038262.png)



**音频处理，使用事件代理，绑定click事件，控制音乐的播放&暂停：**

```js
const { ipcRenderer } = require('electron')
const audioItem = new Audio()
let allItems = []
let currentItem = null

$('add').addEventListener('click', function () {
  ipcRenderer.send('add-music-window')
})

ipcRenderer.on('getItems', (event, args) => {
  allItems = args
  // 渲染列表
  renderHTML(args)
})

const renderHTML = (arr) => {
  const lists = $('lists')
  // 取路径中的文件名称
  // 动态添加文件名称到页面上来
  // const result = arr.map((item) => path.basename(item))
  const htmlstr = arr.reduce((html, item) => {
    html += `<li class="list-group-item">
        <div class="row d-flex justify-content-between align-items-center px-3 py-2">
          <div class=""><i class="fa fa-music mr-3" aria-hidden="true"></i>${item.fileName}</div>
          <div class="">
            <i class="fa ${(currentItem && currentItem.id === item.id && isPlay(audioItem)) ? 'fa-pause' : 'fa-play'} mr-4" aria-hidden="true" data-id="${item.id}"></i>
            <i class="fa fa-trash" aria-hidden="true" data-id="${item.id}"></i>
          </div>
        </div>
      </li>`
    return html
  }, '')
  lists.innerHTML = `<ul class="list-group">${htmlstr}</ul>`
  // bindEvent()
}

// 判断音乐是否正在播放
const isPlay = (audio) => {
  return !audio.paused
}

// 方法一：绑定事件给play-btn
// const bindEvent = () => {
//   const elems = document.querySelectorAll('.list-group li')
//   elems.forEach((item) => {
//     const playBtn = item.querySelector('.fa-play')
//     playBtn.removeEventListener('click', function (event) {
//       const target = event.target
//     })
//     playBtn.addEventListener('click', function (event) {
//       const target = event.target
//       const { id } = target.dataset
//     })
//   })
// }

// 方法二：绑定事件给外层元素，利用浏览器的事情冒泡与事件代理
$('lists').addEventListener('click', function (event) {
  event.preventDefault()
  const target = event.target
  // const name = target.className
  const classList = target.classList
  let id = ''
  if (classList.contains('fa')) {
    id = target.dataset.id
  }
  if (classList.contains('fa-play')) {
    // 如果当前播放的音乐与将要播放的音乐相同，则继续播放
    if (currentItem && currentItem.id === id) {
      audioItem.play()
    } else {
      currentItem = allItems.find(item => item.id === id)
      audioItem.src = currentItem.path
    }
    audioItem.play()
    // reset icon
    const resetElem = document.querySelector('.fa-pause')
    if (resetElem) {
      resetElem.classList.replace('fa-pause', 'fa-play')
    }
    classList.replace('fa-play', 'fa-pause')
  } else if (classList.contains('fa-pause')) {
    // 音乐暂停
    audioItem.pause()
    classList.replace('fa-pause', 'fa-play')
  } else if (classList.contains('fa-trash')) {
    // 删除音乐
    ipcRenderer.send('delete-item', id)
    if (currentItem.id === id) {
      audioItem.pause()
    }
  }

  // const result = isPlay(audioItem)
  // console.log('TCL: result', result)
})
```



主渲染窗口，控制音乐文件的删除：

```js
  // 接收删除id数据 
  ipcMain.on('delete-item', (event, args) => {
    // console.log('TCL: createWindow -> args', args)
    const updateItems = myStore.deleteItem(args).getItems()
    mainWindow.send('getItems', updateItems)
  })
```



#### 播放进度

- 静态样式

  ```html
  <div class="container fixed-bottom bg-white pb-4" id="progress-wrap">
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
    </div>
  </div>
  ```

  

- 动态加载

  index.js

  ```js
  const renderProgressHTML = (name, duration) => {
    const wrap = $('progress-wrap')
    const html = `
        <div class="row d-flex justify-content-between align-items-center mb-2 px-3 pt-2">
          <div class="font-weight-bold" id="play-status">正在播放: ${name}</div>
          <div><span id="progress-status">00:00</span>/${convert(duration)}</div>
        </div>
        <div class="progress">
          <div class="progress-bar bg-success" role="progressbar" id="progress">0%</div>
        </div>
    `
    wrap.innerHTML = html
  }
  
  
  ```

  

- 计算进度

  ```js
  // 更新进度条状态
  const updateProgressHTML = (currentTime, duration) => {
    const progress = Math.floor(currentTime / duration * 100)
    const elem = $('progress')
    if (elem) {
      elem.style.width = progress + '%'
      elem.innerHTML = progress + '%'
      const status = $('progress-status')
      // const min = Math.floor(duration / 60) < 10 ? '0' + Math.floor(duration / 60) : Math.floor(duration / 60)
      status.innerHTML = convert(currentTime)
      // status.innerHTML = convert(currentTime) + '/' + convert(duration)
    }
  }
  
  // 音频加载完成后，触发的事件loadedmetadata
  audioItem.addEventListener('loadedmetadata', function () {
    const duration = audioItem.duration
    const name = currentItem.fileName
    renderProgressHTML(name, duration)
  
    // 动态计算列表的高度
    const progressWrap = $('progress-wrap').offsetHeight
    const app = $('app')
    app.style.paddingBottom = progressWrap + 15 + 'px'
    const progress = $('progress')
    progress.style.width = '0%'
  
    // 点击进度条，跳转到指定的播放位置
    document.querySelector('.progress').addEventListener('click', (event) => {
      // 当前点击的位置 / 进度条的长度 * 100 = 快进的百分比
      const progressWidth = document.querySelector('.progress').offsetWidth
      const clickPosition = event.offsetX
      const percent = Math.floor(clickPosition / progressWidth * 100)
      const progross = $('progress')
      progress.innerHTML = percent + '%'
      progress.style.width = percent + '%'
      audioItem.currentTime = percent / 100 * audioItem.duration
    })
  })
  
  // 音频在播放中，触发的事件timeupdate
  audioItem.addEventListener('timeupdate', function () {
    const duration = audioItem.duration
    const currentTime = audioItem.currentTime
    updateProgressHTML(currentTime, duration)
  })
  ```

- 工具类

  ```js
  const convert = (time) => {
    const min = ('0' + Math.floor(time / 60)).substr(-2)
    const seconds = ('0' + Math.floor(time % 60)).substr(-2)
    return min + ':' + seconds
  }
  ```

#### 播放器样式优化

- 播放时，设置被播放歌曲的文字颜色 

  ```js
  $('lists').addEventListener('click', function (event) {
  	//...
    if (classList.contains('fa-play')) {
      // ...
      // 删除text-primary状态，删除音乐选择状态
      const textElem = document.querySelector('.text-primary')
      removeClass(textElem, 'text-primary')
      classList.replace('fa-play', 'fa-pause')
      const parent = target.closest('.d-flex')
      addClass(parent, 'text-primary')
    } 
  	// ...
  })
  ```

- 删除列表中的重复内容

  ```js
  let arr = []
  for (let i = 0; i < args.length; i++) {
    const item = args[i]
    arr.push({
      id: uuid(),
      path: item,
      fileName: path.basename(item),
      md5: await md5File(item)
    })
  }
  
  // 方法一： for -> for
  // 方法二： Set arr.md5 -> newArr -> md5
  const newArr = Array.from(new Set(arr.map((item) => item.md5)))
  let rlist = []
  arr.map((item) => {
    if (newArr.indexOf(item.md5) !== -1) {
      rlist.push(item)
      // 去重
      newArr.splice(newArr.indexOf(item.md5), 1)
    }
  })
  ```

  方法三：

  ```js
  let arr = {}
  for (let i = 0; i < args.length; i++) {
    const item = args[i]
    const md5 = await md5File(item)
    arr[md5] = {
      id: uuid(),
      path: item,
      fileName: path.basename(item),
    }
  }
  const rlist = Object.keys(arr).map((key) => {
    arr[key].md5 = key
    return arr[key]
  })
  ```



#### 播放状态（循环播放&随机播放）

初步设置播放状态：

- 判断当前播放时间与总时长是否一致，判断是否到结尾
- 设置播放按钮的状态

```js
// 音频在播放中，触发的事件timeupdate
audioItem.addEventListener('timeupdate', function () {
  const duration = audioItem.duration
  const currentTime = audioItem.currentTime
  updateProgressHTML(currentTime, duration)
  // 说明当前的歌曲已经播放完成
  if (duration === currentTime) {
    resetIcons()
    const index = allItems.indexOf(currentItem)
    // 判断是否还有下一首音乐
    if (index < allItems.length - 1) {
      currentItem = allItems[index + 1]
      audioItem.src = currentItem.path
      audioItem.play()
      // 修改播放记录的字体与播放按钮的状态
      const elem = document.querySelectorAll('.list-group-item')[index + 1]
      const playBtn = elem.querySelector('.fa-play')
      playBtn.classList.replace('fa-play', 'fa-pause')
      const firstChild = elem.firstElementChild
      addClass(firstChild, 'text-primary')
    } else {
      // 没有下一首歌了
      resetIcons()
      $('progress-wrap').innerHTML = ''
    }
  }
})
```



resetIcons方法：

```js
// 重置播放按钮的状态
const resetIcons = () => {
  // 删除text-primary状态，删除音乐选择状态
  const textElem = document.querySelector('.text-primary')
  removeClass(textElem, 'text-primary')
  // reset icon
  const resetElem = document.querySelector('.fa-pause')
  if (resetElem) {
    resetElem.classList.replace('fa-pause', 'fa-play')
  }
}
```



多状态控制：

- 单列表正序播放
- 随机
- 单曲循环
- 列表循环



index.js形成控制的样式：

```js
const renderProgressHTML = (name, duration) => {
  const wrap = $('progress-wrap')
  const html = `
      <div class="row d-flex justify-content-between align-items-center mb-2 px-3 pt-2">
        <div class="font-weight-bold" id="play-status">
        <span id="ctrl" class="mr-3">
          <i class="fa fa-sort-amount-asc d-inline" aria-hidden="true"></i>
          <i class="fa fa-random d-none" aria-hidden="true"></i>
          <i class="fa fa-refresh d-none" aria-hidden="true"><span class="repeat-1">1</span></i>
          <i class="fa fa-refresh d-none" aria-hidden="true"></i>
        </span>
        正在播放: ${name}</div>
        <div><span id="progress-status">00:00</span>/${convert(duration)}</div>
      </div>
      <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" id="progress">0%</div>
      </div>
  `
  wrap.innerHTML = html
}
```



设置正在播放音乐的状态：

这里主要设置播放的字体颜色 + icon

```js
// 设置正在播放的音乐状态
const setAudioText = (num) => {
  // 修改播放记录的字体与播放按钮的状态
  const elem = document.querySelectorAll('.list-group-item')[num]
  const playBtn = elem.querySelector('.fa-play')
  playBtn.classList.replace('fa-play', 'fa-pause')
  const firstChild = elem.firstElementChild
  addClass(firstChild, 'text-primary')
}
```



播放按钮的状态切换：

```js
audioItem.addEventListener('loadedmetadata', function () {
  //...
  // 播放按钮加入点击事件，循环播放状态
  $('ctrl').addEventListener('click', (event) => {
    // const target = event.target
    const ctrlLen = $('ctrl').querySelectorAll('.fa').length
    const elem = $('ctrl').querySelector('.d-inline')
    removeClass(elem, 'd-inline')
    addClass(elem, 'd-none')
    // 判断控制列表的长度
    if (ctrlIndex < ctrlLen - 1) {
      ctrlIndex++
    } else {
      ctrlIndex = 0
    }
    // 设置下一个控制按钮显示
    addClass($('ctrl').querySelectorAll('.fa')[ctrlIndex], 'd-inline')
  })
  
  // ...
})
```



四种播放逻辑的控制：

```js
// 音频在播放中，触发的事件timeupdate
audioItem.addEventListener('timeupdate', function () {
  const duration = audioItem.duration
  const currentTime = audioItem.currentTime
  updateProgressHTML(currentTime, duration)
  // 说明当前的歌曲已经播放完成
  // ctrlIndex 0-顺序播放，1-随机播放，2-单曲循环，3-整个列表循环
  if (duration === currentTime) {
    if (ctrlIndex === 0) {
      resetIcons()
      const index = allItems.indexOf(currentItem)
      // 判断是否还有下一首音乐
      if (index < allItems.length - 1) {
        currentItem = allItems[index + 1]
        audioItem.src = currentItem.path
        audioItem.play()
        setAudioText(index + 1)
      } else {
        // 没有下一首歌了
        resetIcons()
        $('progress-wrap').innerHTML = ''
      }
    } else if (ctrlIndex === 1) {
      resetIcons()
      let num = Math.floor(Math.random() * allItems.length)
      const index = allItems.indexOf(currentItem)
      // 排队随机出来的音乐还是当前音乐
      while (num === index) {
        num = Math.floor(Math.random() * allItems.length)
      }
      currentItem = allItems[num]
      // 切换音乐源
      audioItem.src = currentItem.path
      audioItem.play()
      // 设置音乐字体的状态
      setAudioText(num)
      console.log(ctrlIndex);
    } else if (ctrlIndex === 2) {
      audioItem.play()
    } else if (ctrlIndex === 3) {
      resetIcons()
      const index = allItems.indexOf(currentItem)
      // 判断是否还有下一首音乐
      if (index < allItems.length - 1) {
        currentItem = allItems[index + 1]
        setAudioText(index + 1)
      } else {
        currentItem = allItems[0]
        setAudioText(0)
      }
      audioItem.src = currentItem.path
      audioItem.play()
    }
  }
})
```

#### 顶部播放按钮

- 添加顶部按钮的样式

  ```html
  <div class="row d-flex justify-content-between align-items-center px-3">
  	<h1 class="d-inline">My Player</h1>
    <div class="big-ctrl no-select">
      <i id="prev" class="fa fa-backward"></i>
      <i id="play" class="fa fa-play mx-2 big"></i>
      <i id="next" class="fa fa-forward"></i>
    </div>
  </div>
  ```

  css样式：

  ```css
  .no-select {
    -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
  }
  ```

- 添加index.js中的逻辑内容

  - 播放中的时候，对播放状态的判断
  - 上一首、下一首 对播放功能进行判断

```js
// 判断音乐正在播放，修改全局播放按钮状态
const checkPlayStatus = () => {
  const classList = $('play').classList
  if (isPlay(audioItem)) {
    // 说明音乐正在播放
    if (classList.contains('fa-play')) {
      classList.replace('fa-play', 'fa-pause')
    }
  } else {
    // 说明音乐没有播放
    if (classList.contains('fa-pause')) {
      classList.replace('fa-pause', 'fa-play')
    }
  }
}

const bigPlay = (target) => {
  // const target = event.target
  const classList = target.classList
  if (classList.contains('fa-pause')) {
    classList.replace('fa-pause', 'fa-play')
    audioItem.pause()
    $('lists').querySelector('.fa-pause').classList.replace('fa-pause', 'fa-play')
  } else {
    // 初始化播放
    classList.replace('fa-play', 'fa-pause')
    if (currentItem === null) {
      currentItem = allItems[0]
      audioItem.src = currentItem.path
      audioItem.play()
      setAudioText(0)
    } else {
      // 继续播放
      audioItem.play()
      const index = allItems.indexOf(currentItem)
      setAudioText(index)
    }
  }
}

// 全局播放按钮
$('play').addEventListener('click', (event) => {
  const target = event.target
  bigPlay(target)
})

const prevFunc = () => {
  if (ctrlIndex === 0) {
    const index = allItems.indexOf(currentItem)
    // 判断是否还有下一首音乐
    if (index > 0) {
      resetIcons()
      currentItem = allItems[index - 1]
      audioItem.src = currentItem.path
      audioItem.play()
      setAudioText(index - 1)
    }
  } else if (ctrlIndex === 1) {
    randomMusic()
  } else if (ctrlIndex === 2) {
    audioItem.currentTime = 0
    audioItem.play()
  } else if (ctrlIndex === 3) {
    resetIcons()
    const index = allItems.indexOf(currentItem)
    // 判断是否还有下一首音乐
    if (index > 0) {
      currentItem = allItems[index - 1]
      setAudioText(index - 1)
    } else {
      // 来到了最后一首歌
      currentItem = allItems[allItems.length - 1]
      setAudioText(allItems.length - 1)
    }
    audioItem.src = currentItem.path
    audioItem.play()
  }
  checkPlayStatus()
}

// 前进、后退的播放按钮
// 0-顺序播放，1-随机播放，2-单曲循环，3-整个列表循环
$('prev').addEventListener('click', (event) => {
  prevFunc()
})

const nextFunc = () => {
  if (ctrlIndex === 0) {
    const index = allItems.indexOf(currentItem)
    // 判断是否还有下一首音乐
    if (index < allItems.length - 1) {
      resetIcons()
      currentItem = allItems[index + 1]
      audioItem.src = currentItem.path
      audioItem.play()
      setAudioText(index + 1)
    }
  } else if (ctrlIndex === 1) {
    randomMusic()
  } else if (ctrlIndex === 2) {
    audioItem.currentTime = 0
    audioItem.play()
  } else if (ctrlIndex === 3) {
    resetIcons()
    const index = allItems.indexOf(currentItem)
    // 判断是否还有下一首音乐
    if (index < allItems.length - 1) {
      currentItem = allItems[index + 1]
      setAudioText(index + 1)
    } else {
      // 来到了最后一首歌，继续播放第一首歌
      currentItem = allItems[0]
      setAudioText(0)
    }
    audioItem.src = currentItem.path
    audioItem.play()
  }
  checkPlayStatus()
}

$('next').addEventListener('click', (event) => {
  nextFunc()
})
```



#### 快捷键控制播放

- globalShortcut全局快捷键注册

  ```js
  function registerGlobalCtrls (win) {
    // 下一首，全局快捷键
    globalShortcut.register('CommandOrControl+Right', () => {
      win.send('next-music')
    })
  
    // 上一首，全局快捷键
    globalShortcut.register('CommandOrControl+Left', () => {
      win.send('prev-music')
    })
  
    // 暂停 或者是 继续播放
    globalShortcut.register('CommandOrControl+Shift+P', () => {
      win.send('playorpause')
    })
  
    // if (!ret) {
    //   console.log('registration failed')
    // }
  
    // // 检查快捷键是否注册成功
    // console.log(globalShortcut.isRegistered('CommandOrControl+X'))
  
  }
  ```

- Menu Api注册快捷键

  remote模块，动态的添加右键菜单

  ```js
  const { ipcRenderer,remote } = require('electron')
  const { Menu, MenuItem } = remote
  const menu = new Menu()
  
  menu.append(new MenuItem({
    label: 'Print',
    accelerator: 'CmdOrCtrl+P',
    click: () => { console.log('Click Print') }
  }))
  
  window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
  })
  ```

  使用`Menu.buildFromTemplate`方法重新初始化菜单：

  ```js
  const initMenu = (win) => {
    const isMac = process.platform === 'darwin'
  
    const template = [
      // ...
      {
        label: '播放',
        submenu: [
          {
            label: !isShow ? '暂停' : '继续',
            accelerator: 'Space',
            click: () => {
              isShow = !isShow
              // 重新初始化
              initMenu(win)
              win.send('playorpause')
            }
          },
       		// ..
        ]
      },
    ]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  }
  ```

  

#### 电源状态监测

使用到`powerMonitor`模块：

```js
const {
  app,
  BrowserWindow,
  ipcMain,
  powerMonitor
} = require("electron");
```



下面示例：

```js
// 当应用准备OK之后
app.on('ready', function(){
  MonitorPower(mainWindow)
})

// 监听电源的状态
const MonitorPower = (win) => {
  powerMonitor.on('on-battery', () => {
    win.send('power-battery')
  })
  powerMonitor.on('on-ac', () => {
    win.send('power-ac')
  })
}
```



`index.js`断电之后音乐停止，接上电源之后音乐继续播放

```js
// 电源监听事件
ipcRenderer.on('power-battery', (event) => {
  powerMonitorPlay('battery');
})

ipcRenderer.on('power-ac', (event) => {
  powerMonitorPlay('ac')
})

const powerMonitorPlay = (type) => {
  const { classList } = $('play')
  if (type === 'battery') {
    if (classList.contains('fa-pause')) {
      classList.replace('fa-pause', 'fa-play')
      audioItem.pause()
      $('lists').querySelector('.fa-pause').classList.replace('fa-pause', 'fa-play')
    }
  } else if (type === 'ac') {
    if (audioItem && audioItem.currentTime !== 0) {
      // 继续播放
      classList.replace('fa-play', 'fa-pause')
      audioItem.play()
      const index = allItems.indexOf(currentItem)
      setAudioText(index)
    } else {
      // 让用户来控制播放
    }
  }
}
```



#### 音量状态设置

样式开发 ：

按钮及外框的样式

```css
.mute {
  -webkit-transform: scale(0.5);
          transform: scale(0.5);
  position: relative;
  left: -6px;
}

.mute-wrap {
  margin-right: -8px;
}

#volume {
  position: relative;
}

.volume {
  width: 30px;
  height: 90px;
  position: absolute;
  border-radius: 3px;
  -webkit-box-shadow: 0 0 5px rgba(0,0,0,0.1);
          box-shadow: 0 0 5px rgba(0,0,0,0.1);
  top: -95px;
  left: -8px;
  /* border: 1px solid red; */
}

.volume-icon {
  position: relative;
  z-index: 1000;
}

.arrow {
  position: absolute;
  top: 83px;
  left: 9px;
  z-index: 500;
}

.arrow:after {
  display: inline-block;
  content: '';
  border: 6px solid transparent;
  border-top-color: #fff;
}

.volume-progress {
  z-index: 800;
  width: 4px;
  height: 75px;
  border-radius: 2px;
  position: relative;
  left: 50%;
  top: 50%;
  margin-left: -2px;
  margin-top: -37.5px;
}

.dot {
  border-radius: 50%;
  border: 5px solid #007bff;
  display: inline-block;
  left: -3.5px;
  top: 32px;
  position: absolute;
  z-index:2000;
}

.volume-bar {
  width: 4px;
  height: 50%;
  display: inline-block;
  background: #dcdcdc;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
}
```



DOM结构动态生成`main.js`：

```js
const renderProgressHTML = (name, duration) => {
  const wrap = $('progress-wrap')
  const html = `
      <div class="row d-flex justify-content-between align-items-center mb-2 px-3 pt-2">
        <div class="font-weight-bold" id="play-status">
        <span id="ctrl" class="mr-3">
          <i class="fa fa-sort-amount-asc d-inline" aria-hidden="true"></i> 
          <i class="fa fa-random d-none" aria-hidden="true"></i>
          <i class="fa fa-refresh d-none" aria-hidden="true"><span class="repeat-1">1</span></i>
          <i class="fa fa-refresh d-none" aria-hidden="true"></i>
        </span>
       <!-- 这里 -->
        <span id="volume" class="mr-3 no-select">
          <span class="volume-icon d-inline">
            <i class="fa fa-volume-up" aria-hidden="true"></i>
          </span>
          <span class="volume-icon mute-wrap d-none">
            <i class="fa fa-volume-off" aria-hidden="true"></i>
            <i class="fa fa-times mute" aria-hidden="true"></i>
          </span>
          <div class="volume d-none">
            <div class="volume-progress bg-primary">
              <i class="dot"></i>
              <div class="volume-bar"></div>
            </div>
            <div class="arrow"></div>
          </div>
        </span>
        正在播放: ${name}</div>
        <div><span id="progress-status">00:00</span>/${convert(duration)}</div>
      </div>
      <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" id="progress">0%</div>
      </div>
  `
  wrap.innerHTML = html
}
```



鼠标事件监听及交互 

```js
// 添加音乐音量控制事件
const addVolumeEvent = () => {
  // 滑块事件
  document.querySelector('.dot').addEventListener('mousedown', (event) => {
    // 移动滑块事件
    this.addEventListener('mousemove', moveDot)
  })

  // 移除mousemove滑块的事件
  document.addEventListener('mouseup', (event) => {
    const dotElem = document.querySelector('.dot')
    const top = dotElem.style.top
    dotTop = top ? parseInt(top.replace('px', '')) : dotTop
    dotY = 0
    this.removeEventListener('mousemove', moveDot)
  })

  // 添加点击音量切换按钮事件
  $('volume').addEventListener('click', (event) => {
    const target = event.target
    const { classList } = target
    if (!classList.contains('fa')) {
      return
    }
    changeMuteMode()
  })

  // 鼠标移入时，显示调节进度条
  $('volume').addEventListener('mouseover', (event) => {
    const elem = document.querySelector('.volume')
    removeClass(elem, 'd-none')
    addClass(elem, 'd-inline')
  })

  // 鼠标移出时，隐藏调节音量进度条
  document.querySelector('.volume').addEventListener('mouseleave', (event) => {
    const elem = event.target
    removeClass(elem, 'd-inline')
    addClass(elem, 'd-none')
  })
}
```



设置静音

```js
// 静音切换
const changeMuteMode = () => {
  const dotElem = document.querySelector('.dot')
  const progress = document.querySelector('.volume-bar')
  const icons = document.querySelectorAll('.volume-icon')
  // 设置audio的音量volume
  // 设置dot的高度
  // 设置volume-progress百分比
  if (volumeStatus) {
    oldVolume = dotTop
    dotTop = 67
    audioItem.volume = 0
    dotElem.style.top = '67px'
    progress.style.height = '100%'
    removeClass(icons[0], 'd-inline')
    addClass(icons[0], 'd-none')
    removeClass(icons[1], 'd-none')
    addClass(icons[1], 'd-inline')
  } else {
    dotTop = oldVolume
    audioItem.volume = 1 - dotTop / 67
    dotElem.style.top = dotTop + 'px'
    progress.style.height = Math.floor(dotTop / 67 * 100) + '%'
    removeClass(icons[1], 'd-inline')
    addClass(icons[1], 'd-none')
    removeClass(icons[0], 'd-none')
    addClass(icons[0], 'd-inline')
  }
  volumeStatus = !volumeStatus
}
```



切换音乐模式

```js
// 设置播放模式
const setMusicMode = () => {
  // 设置成当前播放按钮的状态
  const elem = $('ctrl').querySelector('.d-inline')
  elem.classList.replace('d-inline', 'd-none')
  // removeClass(elem, 'd-inline')
  // addClass(elem, 'd-none')
  const currentElem = $('ctrl').querySelectorAll('.d-none')[ctrlIndex]
  // 删除了需要设置的按钮的d-none状态，设置成了d-inline
  currentElem.classList.replace('d-none', 'd-inline')
}
```



滑块滑动事件：

```js
const moveDot = (evt) => {
  const dist = 2
  // 获取dot拖拽的方向，拖拽的进度
  // 改变dot位置 -> top / height
  const dotElm = document.querySelector('.dot')
  // 改变进度条的高度 -> top / height
  const progress = document.querySelector('.volume-bar')
  // 改变音乐音量的大小
  const y = evt.y
  // 取得按钮的初始的位置
  const top = dotTop
  if (dotY === 0) {
    dotY = y
  } else {
    let abs = Math.abs(dotY - y)
    if (dotY > y) {
      // 向上移动，减少y值
      if (top - abs < -dist) {
        dotElm.style.top = -dist + 'px'
        progress.style.height = '0%'
        audioItem.volume = 1
      } else {
        dotElm.style.top = top - abs + 'px'
        progress.style.height = Math.floor((top - abs) / 65 * 100) + '%'
        audioItem.volume = 1 - (top - abs + dist) / 65
      }
    } else {
      // 向下移动，增加y值
      if (top + abs > 65 + dist) {
        dotElm.style.top = '67px'
        progress.style.height = '100%'
        audioItem.volume = 0
      } else {
        dotElm.style.top = top + abs + 'px'
        progress.style.height = Math.floor((top + abs) / 65 * 100) + '%'
        audioItem.volume = 1 - (top + abs - dist) / 65
      }
    }
  }
}
```



#### 自动化任务及工程化配置

安装依赖：

```
npm install -D pump gulp-uglify-es node-sass gulp-sass gulp-imagemin
```



gulp自动化脚本：

```js
const {
  series,
  watch,
  task,
  src,
  dest,
  parallel
} = require("gulp");
const electron = require("electron-connect").server.create();
const pump = require('pump')
const config = require('./src/config')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default
const imagemin = require('gulp-imagemin')
const del = require('del')

const isDev = process.env.NODE_ENV === 'production' ? false : true

// 对public文件进行拷贝
task('copy', (done) => {
  const arr = ['public'].map((item) => `./src/${item}/**/*.*`)
  pump([
    src(arr, { base: './src' }),
    dest(config.dist)
  ], done)
})

task('template', (done) => {
  pump([
    src('./src/*.html'),
    dest(config.dist)
  ], done)
})

// sass样式文件进行编译
task('styles', (done) => {
  pump([
    src(config.src.css + '/**/*.scss'),
    sass({
      outputStyle: 'compressed'
    }),
    autoprefixer({
      cascade: false
    }),
    dest(config.dist + '/css')
  ], done)
})
// js, images文件需要进行压缩
task('scripts', (done) => {
  const arr = isDev ? [
    src(config.src.js),
    dest(config.dist)
  ] : [
      src(config.src.js),
      uglify({
        compress: {
          sequences: true,
          dead_code: true,
          conditionals: true,
          booleans: true,
          unused: true,
          if_return: true,
          join_vars: true,
          drop_console: true
        }
      }),
      dest(config.dist)
    ]
  pump(arr, done)
})

task('images', (done) => {
  pump([
    src(config.src.image + '/**/*.*'),
    imagemin(),
    dest(config.dist + '/images')
  ], done)
})

// 清除dist目录
task('clean', (done) => {
  del(config.dist)
  done()
})

function serve (done) {
  electron.start(() => {
    watch("src/main.js", restart);
    watch(['src/**/*html'], series(
      'copy',
      'images',
      'template',
      reload
    ))
    watch(['src/**/*.js'], series(
      'copy',
      'images',
      'scripts',
      reload
    ))
    watch(['src/**/*.scss'], series(
      'copy',
      'images',
      'styles',
      reload
    ))
  });
  done();
}

function restart (done) {
  electron.restart("--enable-logging", function (state) {
    if (state === "restarted" || state === "restarting") {
      done();
    } else {
      done(
        "Unexpected state while restarting electron-connect server. State " +
        state
      );
    }
  });
}

function reload (done) {
  electron.reload();
  done();
}

exports.default = series([
  'clean',
  'images',
  parallel('scripts', 'styles'),
  'template',
  'copy',
  serve
]);

exports.build = series([
  'clean',
  'images',
  parallel('scripts', 'styles'),
  'template',
  'copy'
]);
```



### 项目打包

打包方式介绍

- 手动打包
- Electron packager
- Electron builder



安装Electron builder:

```
npm install electron-build -D
```



基本的打包步骤：

1. 安装`electron-builder`
2. 配置package.json中对应的属性
   - 基本信息: name, description, version, productName
   - 构建脚本: scripts
   - 构建配置: build，参考：https://www.electron.build/configuration/configuration#build
   - 添加应用icon

3. 使用打包命令：

   ```
   npm run build
   
npm run pack
   ```
   
   

配置文件pakcage.json：

```json
  "scripts": {
    "dist": "electron-builder --dir",
    "pack": "electron-builder"
  },  
	"build": {
    "appId": "simpleMusicPlayer",
    "mac": {
      "category": "public.app-category.productivity"
    },
    "dmg": {
      "background": "build/appbg.jpg",
      "icon": "build/icon.icns",
      "iconSize": "128",
      "title": "Electron播放器",
      "contents": [
        {
          "x": 380,
          "y": 280,
          "type": "link",
          "path": "/Applications"
        },
        {
          "x": 110,
          "y": 280,
          "type": "file"
        }
      ],
      "window": {
        "width": 500,
        "height": 500
      }
    },
    "win": {
      "target": "squirrel",
      "icon": "build/icon.ico"
    },
    "linux": {
      "target": [
        "AppImage",
        "deb"
      ]
    }
  },
```

