# Nodejs进程守护

## 课程目标

1. 理解什么是进程守护
2. 理解为什么nodejs服务需要进程守护
3. 从源码理解Egg对进程守护的处理

## 进程守护

守护进程，也即通常所说的 Daemon 进程，是 Linux 下一种**特殊的后台服务进程**，它独立于控制终端并且周期性的执行某种任务或者等待处理某些发生的事件。守护进程通常在系统引导时启动，在系统关闭时终止。Linux 系统下大多数服务都是通过守护进程实现的。守护进程的名称通常以 d 结尾，如 httpd、crond、mysqld等。

### 控制终端 是什么？

终端是用户与操作系统进行交流的界面。在 Linux 系统中，用户由终端登录系统登入系统后会得到一个 shell 进程，这个终端便成为这个 shell 进程的控制终端（Controlling Terminal）。**shell 进程启动的其他进程，由于复制了父进程的信息，因此也都同依附于这个控制终端。**

从终端启动的进程都依附于该终端，**并受终端控制和影响。**终端关闭，相应的进程都会自动关闭。守护进程脱离终端的目的，也即是不受终端变化的影响不被终端打断，当然也不想在终端显示执行过程中的信息。

如果不想进程受到用户、终端或其他变化的影响，**就必须把它变成守护进程**。守护进程可以在 Linux 启动时从脚本 /etc/rc.d 启动，也可以由作业规划进程 crond 启动，还可以通过用户终端（一般是 Shell）启动。

### 如何实现守护进程

**守护进程属于 Linux 进程管理的范畴。**其首要的特性是后台运行，其次，要与从启动它的父进程的运行环境隔离开来，需要处理的内容大致包括会话、控制终端、进程组、文件描述符、文件权限掩码以及工作目录等。

实现一个守护进程，其实就是将普通进程按照上述特性改造为守护进程的过程。需要注意的一点是，不同版本的 Unix 系统其实现机制不同，BSD 和 Linux 下的实现细节就不同。根据上述的特性，我们便可以创建一个简单的守护进程，这里以 Linux 系统下从终端 Shell 来启动为例。

核心步骤： 

> 1. 创建子进程，父进程退出
> 2. 子进程创建新会话

#### shell

```
nohup node http.js &
```

#### nodejs

核心： detached， 帮助父子进程脱离关系

```js
var spawn = require('child_process').spawn;

const ls = spawn('node', ['http.js'], {
    detached: true
});

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
});

```



## 需要进程守护的原因

服务稳定的因素

1. 后台运行
2. 对后台运行进程的"守护"

由于nodejs的单线程的脆弱性，一旦遇到运行错误便会严重到退出node进程导致系统或应用瘫痪。

**结论： 进程守护，守护的过程其实可以理解为，服务的重启。**

实例：

遇到错误，进程退出。

```js
var http = require('http');

var server = http.createServer((req, res) => {
    if(req.url === '/zqz'){
        throw 'req Error';
    }
    res.end('Hello world!');
}).listen('3000', 'localhost', () => {
    console.log('Server running...');
});
```

我们请求localhost:3000

```
 $  node index.js
Server running...
```

## 常用进程守护方案

- pm2
- forever

### PM2

![image-20191027012904510](assets/image-20191027012904510.png)

PM2是带有内置负载平衡器的Node.js应用程序的生产过程管理器。它使您可以使应用程序永远保持活动状态，无需停机即可重新加载它们，并简化常见的系统管理任务。

```
npm install pm2 -g
```

启动服务：

```
pm2 start app.js
```

![image-20191027012935914](assets/image-20191027012935914.png)



### Forever

![image-20191027012925383](assets/image-20191027012925383.png)

```
npm install forever -g
```

启动服务:

```
forever start app.js
```

### Egg

启动命令

```
npm run start
```

引用：package.json

```js
  "scripts": {
    "start": "egg-scripts start --daemon --title=egg-server-demo",
    "stop": "egg-scripts stop --title=egg-server-demo",
    "dev": "egg-bin dev",
    "debug": "egg-bin debug",
    "test": "npm run lint -- --fix && npm run test-local",
    "test-local": "egg-bin test",
    "cov": "egg-bin cov",
    "lint": "eslint .",
    "ci": "npm run lint && npm run cov",
    "autod": "autod"
  },
```

#### Egg.js 进程管理为什么没有选型 PM2 ？

> 1. PM2 模块本身复杂度很高，出了问题很难排查。我们认为框架使用的工具复杂度不应该过高，而 PM2 自身的复杂度超越了大部分应用本身。
> 2. 没法做非常深的优化。
> 3. 切实的需求问题，一个进程里跑 leader，其他进程代理到 leader 这种模式（[多进程模型](https://link.zhihu.com/?target=https%3A//eggjs.org/zh-cn/core/cluster-and-ipc.html)），在企业级开发中对于减少远端连接，降低数据通信压力等都是切实的需求。特别当应用规模大到一定程度，这就会是刚需。egg 本身起源于蚂蚁金服和阿里，我们对标的起点就是大规模企业应用的构建，所以要非常全面。这些特性通过 PM2 很难做到。

##### 引入EGG作者天猪的回答

https://www.zhihu.com/question/298718190/answer/511704261

## 从源码分析EGG进程管理

script中的start为切入点，从egg-script开始分析

```js
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "egg": {
    "declarations": true
  },
  "dependencies": {
    "egg": "^2.15.1",
    "egg-scripts": "^2.11.0"
  },
  "devDependencies": {
    "autod": "^3.0.1",
    "autod-egg": "^1.1.0",
    "egg-bin": "^4.11.0",
    "egg-ci": "^1.11.0",
    "egg-mock": "^3.21.0",
    "eslint": "^5.13.0",
    "eslint-config-egg": "^7.1.0"
  },
  "engines": {
    "node": ">=10.0.0"
  },
  "scripts": {
    "start": "egg-scripts start --daemon --title=egg-server-demo",
    "stop": "egg-scripts stop --title=egg-server-demo",
    "dev": "egg-bin dev",
    "debug": "egg-bin debug",
    "test": "npm run lint -- --fix && npm run test-local",
    "test-local": "egg-bin test",
    "cov": "egg-bin cov",
    "lint": "eslint .",
    "ci": "npm run lint && npm run cov",
    "autod": "autod"
  },
  "ci": {
    "version": "10"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "author": "",
  "license": "MIT"
}

```

### 从命令行开始

```js
class EggScripts extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-scripts [command] [options]';

    // load directory
    this.load(path.join(__dirname, 'lib/cmd'));
  }
}
```

看看Command来自哪里？

```js
const BaseCommand = require('common-bin');
class Command extends BaseCommand {
  
}
```

#### common-bin

https://github.com/node-modules/common-bin

BaseCommand其实是对命令行的一种抽象，可以方便我们进行命令行工具的业务编写。

目录规范：与Egg-scripts一致

```
test/fixtures/my-git
├── bin
│   └── my-git.js
├── command
│   ├── remote
│   │   ├── add.js
│   │   └── remove.js
│   ├── clone.js
│   └── remote.js
├── index.js
└── package.json
```

#### command.js

主要集中在sourcemap参数的处理。

```js
'use strict';

const fs = require('fs');
const path = require('path');
const BaseCommand = require('common-bin');
const Logger = require('zlogger');
const helper = require('./helper');

class Command extends BaseCommand {
  constructor(rawArgv) {
    super(rawArgv);

    Object.assign(this.helper, helper);

    // 参数的解析规则
    this.parserOptions = {
      removeAlias: true,
      removeCamelCase: true,
      execArgv: true,
    };

    // common-bin setter, don't care about override at sub class
    // https://github.com/node-modules/common-bin/blob/master/lib/command.js#L158
    this.options = {
      sourcemap: {
        description: 'whether enable sourcemap support, will load `source-map-support` etc',
        type: 'boolean',
        alias: [ 'ts', 'typescript' ],
      },
    };

    // 日志对于服务器来说也非常的重要  
    this.logger = new Logger({
      prefix: '[egg-scripts] ',
      time: false,
    });
  }

  get context() {
    // 环境信息 以及参数
    const context = super.context;
    const { argv, execArgvObj, cwd } = context;

    // read `egg.typescript` from package.json
    let baseDir = argv._[0] || cwd;
    if (!path.isAbsolute(baseDir)) baseDir = path.join(cwd, baseDir);
    const pkgFile = path.join(baseDir, 'package.json');
    if (fs.existsSync(pkgFile)) {
      const pkgInfo = require(pkgFile);
      if (pkgInfo && pkgInfo.egg && pkgInfo.egg.typescript) {
        argv.sourcemap = true;
      }
    }

    // execArgv
    if (argv.sourcemap) {
      execArgvObj.require = execArgvObj.require || [];
      execArgvObj.require.push(require.resolve('source-map-support/register'));
    }

    argv.sourcemap = argv.typescript = argv.ts = undefined;

    return context;
  }

  exit(code) {
    process.exit(code);
  }
}

module.exports = Command;

```

#### zlogger

Egg底层依赖的log库。

支持的功能：

- ✔︎ Extends [Console](https://nodejs.org/api/console.html#console_new_console_stdout_stderr)
- ✔︎ Support custom prefix before every line
- ✔︎ Support custom stdout and stderr
- ✔︎ Support print time
- ✔︎ Support child logger
- ✔︎ Support logger level

https://github.com/node-modules/zlogger

#### StartCommand

```js
'use strict';

const path = require('path');

const Command = require('../command');
const debug = require('debug')('egg-script:start');
const { execFile } = require('mz/child_process');
const fs = require('mz/fs');
const homedir = require('node-homedir');
const mkdirp = require('mz-modules/mkdirp');
const moment = require('moment');
const sleep = require('mz-modules/sleep');
const spawn = require('child_process').spawn;
// 工具库
const utils = require('egg-utils');

class StartCommand extends Command {
  constructor(rawArgv) {
    super(rawArgv);
    this.usage = 'Usage: egg-scripts start [options] [baseDir]';

    //自定义方法
    this.serverBin = path.join(__dirname, '../start-cluster');
    // 参数定义
    this.options = {
      // 进程名称
      title: {
        description: 'process title description, use for kill grep, default to `egg-server-${APP_NAME}`',
        type: 'string',
      },
      // 指定创建多少个子进程
      workers: {
        description: 'numbers of app workers, default to `os.cpus().length`',
        type: 'number',
        alias: [ 'c', 'cluster' ],
        default: process.env.EGG_WORKERS,
      },

      port: {
        description: 'listening port, default to `process.env.PORT`',
        type: 'number',
        alias: 'p',
        default: process.env.PORT,
      },
      env: {
        description: 'server env, default to `process.env.EGG_SERVER_ENV`',
        default: process.env.EGG_SERVER_ENV,
      },
      // egg业务代码
      framework: {
        description: 'specify framework that can be absolute path or npm package',
        type: 'string',
      },
      daemon: {
        description: 'whether run at background daemon mode',
        type: 'boolean',
      },
      stdout: {
        description: 'customize stdout file',
        type: 'string',
      },
      stderr: {
        description: 'customize stderr file',
        type: 'string',
      },
      timeout: {
        description: 'the maximum timeout when app starts',
        type: 'number',
        default: 300 * 1000,
      },
      'ignore-stderr': {
        description: 'whether ignore stderr when app starts',
        type: 'boolean',
      },
      node: {
        description: 'customize node command path',
        type: 'string',
      },
    };
  }

  get description() {
    return 'Start server at prod mode';
  }

  * run(context) {
    const { argv, env, cwd, execArgv } = context;

    // 当前用户的根目录
    const HOME = homedir();

    // 日志文件路径
    const logDir = path.join(HOME, 'logs');

    // egg-script start 
    // egg-script start ./server
    // egg-script start /opt/app
    let baseDir = argv._[0] || cwd;

    // baseDir处理
    if (!path.isAbsolute(baseDir)) baseDir = path.join(cwd, baseDir);
    argv.baseDir = baseDir;

    // 是否守护
    const isDaemon = argv.daemon;
    // 获取 framework 地址
    argv.framework = yield this.getFrameworkPath({
      framework: argv.framework,
      baseDir,
    });

    this.frameworkName = yield this.getFrameworkName(argv.framework);

    const pkgInfo = require(path.join(baseDir, 'package.json'));
    argv.title = argv.title || `egg-server-${pkgInfo.name}`;

    argv.stdout = argv.stdout || path.join(logDir, 'master-stdout.log');
    argv.stderr = argv.stderr || path.join(logDir, 'master-stderr.log');

    // normalize env
    env.HOME = HOME;

    // egg-scripts start 会把环境变为生产环境
    env.NODE_ENV = 'production';

    // it makes env big but more robust
    env.PATH = env.Path = [
      // for nodeinstall
      path.join(baseDir, 'node_modules/.bin'),
      // support `.node/bin`, due to npm5 will remove `node_modules/.bin`
      path.join(baseDir, '.node/bin'),
      // adjust env for win
      env.PATH || env.Path,
    ].filter(x => !!x).join(path.delimiter);

    // for alinode
    env.ENABLE_NODE_LOG = 'YES';
    env.NODE_LOG_DIR = env.NODE_LOG_DIR || path.join(logDir, 'alinode');
    yield mkdirp(env.NODE_LOG_DIR);

    // cli argv -> process.env.EGG_SERVER_ENV -> `undefined` then egg will use `prod`
    if (argv.env) {
      // if undefined, should not pass key due to `spwan`, https://github.com/nodejs/node/blob/master/lib/child_process.js#L470
      env.EGG_SERVER_ENV = argv.env;
    }

    const command = argv.node || 'node';

    const options = {
      execArgv,
      env,
      stdio: 'inherit',
      detached: false,  // 在创建子进程的时候可以脱离父亲
    };

    this.logger.info('Starting %s application at %s', this.frameworkName, baseDir);

    // remove unused properties from stringify, alias had been remove by `removeAlias`
    const ignoreKeys = [ '_', '$0', 'env', 'daemon', 'stdout', 'stderr', 'timeout', 'ignore-stderr', 'node' ];
    const clusterOptions = stringify(argv, ignoreKeys);
    // Note: `spawn` is not like `fork`, had to pass `execArgv` youself
    const eggArgs = [ ...(execArgv || []), this.serverBin, clusterOptions, `--title=${argv.title}` ];
    this.logger.info('Run node %s', eggArgs.join(' '));

    // whether run in the background.
    if (isDaemon) { // 守护进程 

      this.logger.info(`Save log file to ${logDir}`);

      const [ stdout, stderr ] = yield [ getRotatelog(argv.stdout), getRotatelog(argv.stderr) ];
      options.stdio = [ 'ignore', stdout, stderr, 'ipc' ];
      options.detached = true;
      
      // debug('Run spawn `%s %s`', command, eggArgs.join(' '));
      // debug('=======', command, eggArgs, options );

      const child = this.child = spawn(command, eggArgs, options);
      this.isReady = false;
      child.on('message', msg => {
        /* istanbul ignore else */
        if (msg && msg.action === 'egg-ready') {
          this.isReady = true;
          this.logger.info('%s started on %s', this.frameworkName, msg.data.address);
          child.unref();
          child.disconnect();
          this.exit(0);
        }
      });

      // check start status
      yield this.checkStatus(argv);
    } else {
      options.stdio = [ 'inherit', 'inherit', 'inherit', 'ipc' ];
      debug('Run spawn `%s %s`', command, eggArgs.join(' '));
      const child = this.child = spawn(command, eggArgs, options);
      child.once('exit', code => {
        // command should exit after child process exit
        this.exit(code);
      });

      // attach master signal to child
      let signal;
      [ 'SIGINT', 'SIGQUIT', 'SIGTERM' ].forEach(event => {
        process.once(event, () => {
          debug('Kill child %s with %s', child.pid, signal);
          child.kill(event);
        });
      });
    }
  }

  * getFrameworkPath(params) {
    return utils.getFrameworkPath(params);
  }

  * getFrameworkName(framework) {
    const pkgPath = path.join(framework, 'package.json');
    let name = 'egg';
    try {
      const pkg = require(pkgPath);
      /* istanbul ignore else */
      if (pkg.name) name = pkg.name;
    } catch (_) {
      /* istanbul next */
    }
    return name;
  }

  * checkStatus({ stderr, timeout, 'ignore-stderr': ignoreStdErr }) {
    let count = 0;
    let hasError = false;
    let isSuccess = true;
    timeout = timeout / 1000;
    while (!this.isReady) {
      try {
        const stat = yield fs.stat(stderr);
        if (stat && stat.size > 0) {
          hasError = true;
          break;
        }
      } catch (_) {
        // nothing
      }

      if (count >= timeout) {
        this.logger.error('Start failed, %ds timeout', timeout);
        isSuccess = false;
        break;
      }

      yield sleep(1000);
      this.logger.log('Wait Start: %d...', ++count);
    }

    if (hasError) {
      try {
        const args = [ '-n', '100', stderr ];
        this.logger.error('tail %s', args.join(' '));
        const [ stdout ] = yield execFile('tail', args);
        this.logger.error('Got error when startup: ');
        this.logger.error(stdout);
      } catch (err) {
        this.logger.error('ignore tail error: %s', err);
      }

      isSuccess = ignoreStdErr;
      this.logger.error('Start got error, see %s', stderr);
      this.logger.error('Or use `--ignore-stderr` to ignore stderr at startup.');
    }

    if (!isSuccess) {
      this.child.kill('SIGTERM');
      yield sleep(1000);
      this.exit(1);
    }
  }
}

function* getRotatelog(logfile) {
  yield mkdirp(path.dirname(logfile));

  if (yield fs.exists(logfile)) {
    // format style: .20150602.193100
    const timestamp = moment().format('.YYYYMMDD.HHmmss');
    // Note: rename last log to next start time, not when last log file created
    yield fs.rename(logfile, logfile + timestamp);
  }

  return yield fs.open(logfile, 'a');
}

function stringify(obj, ignore) {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (!ignore.includes(key)) {
      result[key] = obj[key];
    }
  });
  return JSON.stringify(result);
}

module.exports = StartCommand;

```

### npm link

node 应用开发中，我们不可避免的需要使用或拆分为 npm 模块，经常遇到的一个问题是：

> 新开发或修改的 npm 模块，如何在项目中试验？

但其实 npm 本身已经对此类情况提供了专门的 `npm link` 指令。

相关文档： [docs.npmjs.com/cli/link](https://yq.aliyun.com/go/articleRenderRedirect?url=https%3A%2F%2Flink.juejin.im%2F%3Ftarget%3Dhttps%3A%2F%2Fdocs.npmjs.com%2Fcli%2Flink)

```none
$ cd path/to/my-project
$ npm link path/to/my-utils
```

简单的替换一个单词，就搞定了，cool~

如果这两种的目录不在一起，那还有一种方法：

```none
$ # 先去到模块目录，把它 link 到全局
$ cd path/to/my-utils
$ npm link
$
$ # 再去项目目录通过包名来 link
$ cd path/to/my-project
$ npm link my-utils
```

该指令还可以用来调试 node cli 模块，譬如需要本地调试我们的 egg-init，可以这样：

```none
$ cd path/to/egg-init
$ npm link
$ # 此时全局的 egg-init 指令就已经指向你的本地开发目录了
$ egg-init # 即可
```

想去掉 link 也很简单：

```none
npm unlink my-utils
```

### Egg-Scripts流程

![image-20191027192550338](assets/image-20191027192550338.png)

### egg-cluster

