# Nodejs通用业务模块

## 课程目标

- 了解nodejs的生态与未来
- 理解alinode监控体系的应用场景与使用
- 理解nodejs在云原生应用领域的生态与发展

## why

- 知己知彼，百战不殆
- 开阔技术视野，技术的提升不能仅仅停留在crud领域



## 第一章 nodejs之生态

### 2019年前端，选择Nodejs 还是 PHP？

观点：

- 作为前端玩一玩可以学nodejs，真正的后端还是选择php
- 未来语言不重要，nodejs必有一席之地

https://www.zhihu.com/question/333368965/answer/771411673

总结： 

- 反对前端写js也有道理，有些前端确实连本职工作都没做好，就去写nodejs后端，确实不太好，造成不必要的麻烦
- 但是也鼓励前端去深入的学习后端领域的知识，技术是没有界限的
- 在后端基础扎实的情况下，未来nodejs大有可为

### Node.js 在双十一中有哪些应用，表现如何？

https://www.zhihu.com/question/37379084/answer/74601296

观点：

- 观点1

  - nodejs大放异彩，整个双十一期间未出现任何由nodejs引发的故障
  - 覆盖业务
    - 天猫首页，大部分天猫频道页，活动页面
    - 商品详情，店铺和搜索页等
    - 页面搭建平台
  - nodejs角色
    - 完整的web业务流程
    - 页面渲染服务
  - 稳定性
    - 自动化测试
    - 监控和报警,alinode
  - 多节点部署

- 观点2

  - node在阿里内部遍地开花

  - 业务场景

    - 淘宝，支付宝，1688 等直面用户
    - 内部系统
    - 本地工具

  - 架构形态

    - 前后端分离
    - 全栈应用(内部)

  - nodejs对比java

    - 技术和人才储备上来看，依然差距比较大
  
- 生态差距也比较大
  
    

- **总结：** **nodejs到底该如何使用？何时使用？**

  主流企业级微服务架构体系简化图：
  
  ![image-20191130234831856](assets/image-20191130234831856.png)
  
  
  
  - nodejs的异步非阻塞模型比较擅长处理i/o操作，也就是上层服务(api，渲染)，所以nodejs的绝大部分应用场景都是在上层( 大厂 )
  - 当然nodejs也可以同时做上下层服务，前提是应用并发较小 ( 产品试错阶段，或者内部管理系统 )
  - 优点
    - 擅长游走于上层服务领域 (接口聚合，渲染等)
    - 小快灵，快速堆砌产品原型
    - 对前端工程师友好
  - 缺点
    - 在下层服务领域的生态远远跟不上Java，goLang等正统服务端语言(特别是微服务架构体系)



## 第二章 接入alinode性能平台

### 产品概述

Node.js 性能平台( Node.js Performance Platform )是面向所有 Node.js 应用提供 **性能监控、安全提醒、故障排查、性能优化** 等服务的整体性解决方案，尤其适用于中大型 Node.js 应用。

Node.js 性能平台凭借对 Node.js 内核深入的理解,提供完善的工具链和服务,协助客户主动、快速发现和定位线上问题。

### 应用场景

Node.js 性能平台可以应用于所有 Node.js 应用，尤其适用于中大型 Node.js 应用。

Node.js 提供的精确到虚拟机级别的深度监控，能够如实的反应应用运行状态，通过配置报警规则，用户可以在发现系统出现故障（内存泄露或者 CPU 热点等）趋势时，通过诊断接口迅速定位故障点。

Node.js 性能平台特别适合业务发展迅速、应用发布频繁、流量上升明显的 Node.js 应用。

### 功能特性

#### 系统层面

针对服务器（物理机、虚拟机、Docker 等）级别，提供如下监控指标：

- 内存使用
- CPU 使用率
- 系统负载
- 系统 QPS
- 硬性性能指标
- 磁盘使用率
- GC 统计
- ……

#### 进程层面

针对每个 Node.js 进程，提供如下监控指标：

- 堆内（total 和 used）和堆外内存统计
- 堆内各个内存空间占用内存统计
- 垃圾回收（GC）占整个进程运行时间比例
- QPS
- 按 1s、15s、30s、60s 的 CPU 统计
- libuv 句柄，定时器统计
- ……

#### 安全提醒

- npm 模块安全漏洞提醒

#### 故障排查

- 热点函数分析，通过线上 CPU Profiling 分析定位到热点函数
- 内存泄露分析，通过线上堆快照分析定位到内存泄露可疑点
- GC 过程追踪
- 堆时间线
- …..

#### 性能优化

- Node.js 性能平台可以提供性能优化建议



### 快速入门

- 阿里云账号，在这里 https://www.aliyun.com/product/nodejs 开通服务
- 一台可以连接到互联网的服务器，或者开发机器

### I. 创建应用

- 登录阿里云官网 https://www.aliyun.com/
- 前往 [Node.js性能平台控制台](https://node.console.aliyun.com/) `创建新应用` 输入应用名 `demo` ,记录下 `App ID` 和 `App Secret` ，后面可以从应用界面的 `设置` 中查看该设置。

### II. 服务器部署 Node.js 性能平台

#### a. 安装 Node.js 性能平台所需组件

```shell
# 安装版本管理工具 tnvm，安装过程出错参考：https://github.com/aliyun-node/tnvm
wget -O- https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh | bash
source ~/.bashrc
# tnvm ls-remote alinode 查看需要的版本
tnvm install alinode-v3.11.4 # 安装需要的版本
tnvm use alinode-v3.11.4 # 使用需要的版本
npm install @alicloud/agenthub -g # 安装 agenthub
```

验证安装是否成功,需要确保`which node` 和`which agenthub`的路径中包括`.tnvm`即可。

```shell
root@iZbp1gqe9a9t5d246bp7vqZ:~# which node/root/.tnvm/versions/alinode/v3.11.4/bin/noderoot@iZbp1gqe9a9t5d246bp7vqZ:~# which agenthub /root/.tnvm/versions/alinode/v3.11.4/bin/agenthub
```

将`创建新应用`中获得的`App ID` 和 `App Secret` 按如下所示保存为 `yourconfig.json`。

```shell
{  "appid": "12345",                          # 前面申请到的 appid，保存时删掉这条注释。  	     "secret": "kflajglkajlgjalsgjlajdgfakjkgj" # 前面申请到的 secret，保存时删掉这条注释。
}
```

**注意：**

**1. 本例未配置 错误日志、报警 等功能。**

**2. 性能平台每分钟上传一次日志，请等待几分钟后查看数据。**

**3. 更详细的 Node.js 性能平台 runtime 部署参见 自助式部署 runtime**

#### b.使用egg接入nodejs性能平台

1. 安装runtime

```
npm i nodeinstall -g
nodeinstall --install-alinode ^3
```

2. 安装egg-alinode插件

```
npm i egg-alinode --save
```

3. 在 Egg 项目的 config/plugin.js 中启用此插件

```js
// config/plugin.js
exports.alinode = {
  enable: true,
  package: 'egg-alinode'
};
```

4. 在 Egg 项目的 config/config.default.js 中添加配置

```js
// config/config.default.js
exports.alinode = {
  server: 'wss://agentserver.node.aliyun.com:8080',
  appid: 'Node.js 性能平台给您的项目生成的 appid',
  secret: 'Node.js 性能平台给您的项目生成的 secret',
  logdir: 'Node.js 性能平台日志输出地址绝对路径，与 NODE_LOG_DIR 保持一致。如：/tmp/',
  error_log: [
    '您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
    '例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
    '不更改 Egg 默认日志输出路径可不配置本项目',
  ],
  agentidMode:'IP' '可选，如果设置，则在实例ID中添加部分IP信息，用于多个实例 hostname 相同的场景（以容器为主）'
};
```

5. 启动应用

```js
egg-scripts start --daemon
```

### 性能指标

#### Memory

内存

#### CPU

#### Load

Load < 0.7时：系统很闲，马路上没什么车，要考虑多部署一些服务

0.7 < Load < 1时：系统状态不错，马路可以轻松应对

Load == 1时：系统马上要处理不多来了，赶紧找一下原因

Load > 1时：马路已经非常繁忙了，进入马路的每辆汽车都要无法很快的运行

#### gc_avg   gc_max

gc所花费的时间百分比

#### Apdex

性能指标

0  代表失望

1  代表满意