# 深入Vue原理

![](./1.png)



## Object.defineProperty介绍

```javascript
Object.defineProperty(obj, prop, descriptor)
obj：必需。目标对象
prop：必需。需定义或修改的属性的名字
descriptor：必需。目标属性所拥有的特性
```

value：被定义的属性的值，默认为undefined

writable：是否可以被重写，true可以重写，false不能重写，默认为false。

enumerable：是否可以被枚举（使用for...in或Object.keys()）。设置为true可以被枚举；设置为false，不能被枚举。默认为false。

configurable：是否可以删除目标属性或是否可以再次修改属性的特性（writable, configurable, enumerable）。设置为true可以被删除或可以重新设置特性；设置为false，不能被可以被删除或不可以重新设置特性。默认为false。



### 存取器getter/setter



> 注意：当使用了getter或setter方法，不允许使用writable和value这两个属性



getter: 当访问该属性时，该方法会被执行。函数的返回值会作为该属性的值返回。

setter: 当属性值修改时，该方法会被执行。该方法将接受唯一参数，即该属性新的参数值。

```javascript
var obj = {};
var initValue = 'hello';
Object.defineProperty(obj,"newKey",{
    get:function (){
        //当获取值的时候触发的函数
        return initValue;    
    },
    set:function (value){
        //当设置值的时候触发的函数,设置的新值通过参数value拿到
        initValue = value;
    }
});
//获取值
console.log( obj.newKey );  //hello

//设置值
obj.newKey = 'change value';

console.log( obj.newKey ); //change value
```



**不要在getter中再次获取该属性值，也不要在setter中再次设置改属性，否则会栈溢出！**



## 实现数据代理

```javascript
class Vue {
  constructor(options) {
    this.$options = options
    this.initData()
  }
  initData() {
    let data = this._data = this.$options.data
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      Object.defineProperty(this,keys[i],{
        enumerable:true,
        configurable:true,
        get:function proxyGetter() {
          return this._data[keys[i]]
        },
        set:function proxySetter(value) {
          this._data[keys[i]] = value
        }
      })
    }
  }
}
```



## 实现数据劫持

```javascript
class Vue {
  constructor(options) {
    this.$options = options
    this.initData()
  }
  initData() {
    let data = this._data = this.$options.data
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      Object.defineProperty(this,keys[i],{
        enumerable:true,
        configurable:true,
        get:function proxyGetter() {
          return this._data[keys[i]]
        },
        set:function proxySetter(value) {
          this._data[keys[i]] = value
        }
      })
    }


    for (let i = 0; i < keys.length; i++) {
      let value = data[keys[i]]
      Object.defineProperty(data,keys[i],{
        enumerable:true,
        configurable:true,
        get:function reactiveGetter() {
          console.log(`获取data的${keys[i]}值`);
          return value
        },
        set:function reactiveSetter(val) {
          console.log(`data的${keys[i]}发生了改变`);
          value = val
        }
      })
    }

  }
}
```

## 实现数据递归劫持

将数据响应式的代码抽离到工厂函数中，并且新定义一个Observer类，为后续工作做铺垫

```javascript
class Vue {
  constructor(options) {
    this.$options = options
    this.initData()
  }
  initData() {
    let data = this._data = this.$options.data
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      Object.defineProperty(this,keys[i],{
        enumerable:true,
        configurable:true,
        get:function proxyGetter() {
          return this._data[keys[i]]
        },
        set:function proxySetter(value) {
          this._data[keys[i]] = value
        }
      })
    }
    observe(data)
  }
}
function observe(data) {
  let type = Object.prototype.toString.call(data)
  if(type !== '[object Object]' && type !== '[object Array]'){
    return
  }
  new Observer(data)
}
function defineReactive(obj,key,val) {
  //如果被观测的值是对象，则递归
  observe(val)

  Object.defineProperty(obj,key,{
    enumerable:true,
    configurable:true,
    get:function reactiveGetter() {
      console.log(`获取data的${key}值`);
      return val
    },
    set:function reactiveSetter(newval) {
      console.log(`data的${key}发生了改变`);
      val = newval
    }
  })
}
class Observer {
  constructor(data){
    this.walk(data)
  }
  walk(data){
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data,keys[i],data[keys[i]])
    }
  }
}

```



## 实现Watcher

由于模板涉及到vue的编译和vdom等知识，所以先用`watch`选项与`$watch` api 来测试对属性的监听

问题一：首先，回调函数肯定不能硬编码在`setter`中

因此，我们**每个属性**需要有个自己的“**筐**”，不管是使用`watch`选项初始化还是使用`$watch`api来监听某个属性时，我们需要把这些回调添加到这个"筐"中，等到属性`setter`触发时，从“筐”中把收集的回调拿出来**通知**(`notify`)他们执行

问题二：有可能存在**同一个回调**可能依赖多个属性，例如模板或者computed

因此，我们可以使用对属性求值，来触发相应的`getter`，在`getter`中让“筐”去找当前的回调（`depend`），并且收集它

问题三：“筐”去哪里找当前的回调？

我们可以把当前需要被收集的回调在触发`getter`之前存在一个公共的地方，触发后再从公共的地方移除。就像从一个舞台上台再下台的过程。

根据面向对象的编程思想，我们把"筐"抽象成一个`Dep`类的实例，把回调抽象成一个`Watcher`类的实例

```javascript
class Vue {
  constructor(options) {
    this.$options = options
    // TODO:data可能是函数
    this._data = options.data
    this.initData()
    this.initWatch()
  }
  initData() {
    let data = this._data
    let keys = Object.keys(data)
    for (let i = 0; i <keys.length; i++) {
      Object.defineProperty(this,keys[i],{
        enumerable:true,
        configurable:true,
        get:function proxyGetter() {
          return data[keys[i]]
        },
        set:function proxySetter(value) {
          data[keys[i]] = value
        }
      })
    }
    observe(data)
  }
  initWatch() {
    let watch = this.$options.watch
    let keys = Object.keys(watch)
    for (let i = 0; i < keys.length; i++) {
      this.$watch(keys[i],watch[keys[i]])
    }
  }
  $watch(exp,cb) {
    new Watcher(this,exp,cb)
  }
}
function observe (data) {
  let type = Object.prototype.toString.call(data)
  if(type !== '[object Object]' && type !== '[object Array]'){
    return
  }
  new Observer(data)
}
class Observer {
  constructor(data){
    this.walk(data)
  }
  walk(data){
    let keys = Object.keys(data)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data,keys[i],data[keys[i]])
    }
  }
}
function defineReactive(obj, key, val) {
  observe(obj[key])
  let dep = new Dep()
  Object.defineProperty(obj,key,{
    enumerable:true,
    configurable:true,
    get:function reactiveGetter() {
      if(Dep.target){
        dep.depend()
      }
      return val
    },
    set:function reactiveSetter(value) {
      if(val === value){
        return
      }
      dep.notify()
      val = value
    }
  })
}
class Dep {
  constructor() {
    this.subs = []
  }
  depend() {
    if(Dep.target){
      this.subs.push(Dep.target)
    }
  }
  notify(){
    this.subs.forEach(watcher => {
      watcher.run()
    })
  }
}
class Watcher {
  constructor(vm,exp,cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.get()
  }
  get() {
    Dep.target = this
    this.vm[this.exp]
    Dep.target = null
  }
  run() {
    this.cb.call(this.vm)
  }
}
```

实际在Vue中，watcher实例的求值和调用回调函数是异步调用的，并且在上一个事件循环中无论改变几次属性，回调只会异步调用一次，所以我们对Watcher及run方法进行改造：

```javascript
let watcherQueue = []
let watcherId = 0
class Watcher {
  constructor(vm,exp,cb) {
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.get()
    this.id = ++watcherId
  }
  get() {
    Dep.target = this
    this.vm[this.exp]
    Dep.target = null
  }
  run() {
    if(watcherQueue.indexOf(this.id) !== -1){
      return
    }
    watcherQueue.push(this.id)
    let index = watcherQueue.length - 1
   Promise.resolve().then(()=>{
      this.cb.call(this.vm)
      watcherQueue.splice(index,1)
    })
  }
}
```



至此，我们实现了一个基本的基于发布订阅的Dep和Watcher，但是目前仍然存在以下问题：

1. **对象新增属性**仍然无法触发回调
2. **数组**仍然没有做处理，如果使用Object.defineProperty对数组进行劫持会存在以下问题：

- 改变了数组的顺序、改变了数组的长度、或者删除了数据。数组的下标全乱了。这时候怎么办？`Object.defineProperty(array, '0', {});` 我们这个定义到底谁是谁？
- 数组的原生方法进行增删改查无法触发回调
- 与对象相似，对一个不存在的下标赋值也无法触发



## 实现$set方法

对象上的`__ob__`是用来干什么的？

实际上`__ob__`就是`Observer`对象，并且对象上存储了一个`Dep实例`

![./2.png](.\2.png)

可以看到，这个`dep`是和之前`defineReactive`闭包中的“筐”不同的另外一个“筐”，当属性的值是一个对象时，把触发`getter`的`watcher`也收集了一份在自己的`subs`中，这样就方便我们之后通过代码`命令式地`去触发这个属性对象的`watcher`。

所以`$set`方法的实现思路基本如下：

1. 在创建`Observer`实例时，也创建一个新的"筐"，挂在`Observer`实例上，然后把`Observer`实例挂载到对象的`__ob__`属性上。
2. 触发`getter`时，不光把`watcher`收集一份到之前的“筐里”，也收集一份在这个新的"筐"里。
3. 用户调用`$set`时，手动地触发`__ob__.dep.notify()`
4. 最后别忘了在`notify()`之前调用`defineReactive`把新的属性也定义成响应式

关键代码如下：

```javascript
class Vue {
  //...
  $set(target,key,value) {
    let ob = target.__ob__
    defineReactive(target,key,value)
    ob.dep.notify()
  }
}
class Observer {
  constructor(data){
    this.dep = new Dep()
    this.walk(data)
    Object.defineProperty(data,'__ob__',{
      enumerable:false,
      configurable:false,
      value:this,
      writable:true,
    })
  }
  //...
}
function observe (data) {
  let type = Object.prototype.toString.call(data)
  if(type !== '[object Object]' && type !== '[object Array]'){
    return
  }
  if(data.__ob__){
    return data.__ob__
  }
  return new Observer(data)
}
function defineReactive(obj, key, val) {
  let childOb = observe(obj[key])
  let dep = new Dep()
  Object.defineProperty(obj,key,{
    enumerable:true,
    configurable:true,
    get:function reactiveGetter() {
      if(Dep.target){
        dep.depend()
        if(childOb){
          childOb.dep.depend()
        }
      }
      return val
    },
    //...
  })
}

```



## 实现对数组的处理

基于前面的`__ob__`来实现对数组的处理的思路：

1. 因为前面已经说了，使用`Object.defineProperty`的办法劫持数组，会存在问题。所以在实现数据劫持的时候，数组本身不用管，而是去循环劫持数组的元素，因为元素也有可能是对象。

   实现方法：数组的回调也通过`__ob__.dep`来收集，在数组调用`push`,`pop`等方法时手动去触发`__ob__.dep.notify`

2. 原型对象`Array.prototype`上的方法不能直接修改，因为这样会破坏其他用到这些方法的代码的功能

   实现方法：在数组和`Array.prototype`的原型链上插入一个自定义的对象，拦截原来的`push`等方法，在自定义对象中的同名方法中先执行原本的方法，再去人为的调用`__ob__.dep.notify()`去执行之前收集的回调

```javascript
//...
class Observer {
  constructor(data){
    this.dep = new Dep()
    if(Array.isArray(data)){
      data.__proto__ = arrayMethods
    }else {
      this.walk(data)
    }
    //...
  }
  //...
}
class Dep {
  //...
}
class Watcher {
  //...
}
const mutationMethods = ['push','pop','shift']
const arrayMethods = Object.create(Array.prototype)
const arrayProto = Array.prototype
mutationMethods.forEach(method => {
  arrayMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this,args)
    this.__ob__.dep.notify()
    return result
  }
})
```

注意，数组里面的元素如果是对象，需要变成响应式

```javascript
//...
class Observer {
  constructor(data){
    this.dep = new Dep()
    if(Array.isArray(data)){
      data.__proto__ = arrayMethods
      this.observeArray(data)
    }else {
      this.walk(data)
    }
    //...
  }
  //...
  observeArray(arr){
    for (let i = 0; i < arr.length; i++) {
      observe(arr[i])
    }
  }
}
class Dep {
  //...
}
class Watcher {
  //...
}
const mutationMethods = ['push','pop','shift']
const arrayMethods = Object.create(Array.prototype)
const arrayProto = Array.prototype
mutationMethods.forEach(method => {
  if(method === 'push'){
      this.__ob__.observeArray(args)
  }
  arrayMethods[method] = function (...args) {
    const result = arrayProto[method].apply(this,args)
    this.__ob__.dep.notify()
    return result
  }
})
```



## 实现computed  

根据计算属性几个特点设计思路：

1. 它的值是一个函数运行的结果
2. 函数里用到所有属性都会引起计算属性的变化

计算属性仍然属于Vue响应式实现的一种，`本质上还是一个watcher`。但是又似乎与之前的`watcher`实现有所不同，因为之前的`watcher`是只能监听一个属性

解决思路：

`Watcher`第二参数`exp`也可以传一个函数，然后`运行`这个函数并获取返回值，运行过程中，函数里所有的`this.xxx`属性都会触发`setter`这样一来，就可以让多个`dep`都能收集到这个`watcher`。

3. 计算属性不存在于data选项中，需要单独进行初始化

4. 计算属性`只能取，不能存`。也就是说计算属性的`setter`无效，考虑下面代码：

   ```javascript
       let vm = new Vue({
         data:{
           a:3,
           b:5
         },
         watch:{
           x() {
             console.log('对x的监听回调触发');
           }
         },
         computed:{
           x() {
             return this.a * this.b
           }
         }
       })
   ```

   

   也意味着，计算属性本身不再需要筐去收集，对一个计算属性进行监听，回调触发的本质是计算属性依赖的其他属性发生了变化。

   初步实现代码如下：

   ```javascript
   class Vue {
     constructor(options) {
       this.$options = options
       // TODO:data可能是函数
       this._data = options.data
       this.initData()
       this.initComputed()
       this.initWatch()
     }
     initData() {
         //...
     }
     initComputed(){
       let computed = this.$options.computed
       if(computed){
         let keys = Object.keys(computed)
         for (let i = 0; i < keys.length; i++) {
           const watcher = new Watcher(this, computed[keys[i]],function () {
             
           })
           Object.defineProperty(this,keys[i],{
             enumerable:true,
             configurable:true,
             get:function computedGetter(){
               watcher.get()
               return watcher.value
             },
             set:function computedSetter() {
               console.warn('请不要对计算属性赋值')
             }
           })
         }
       }
     }
     initWatch(){
       let watch = this.$options.watch
       if(watch){
         let keys = Object.keys(watch)
         for (let i = 0; i < keys.length; i++) {
           new Watcher(this, keys[i],watch[keys[i]])
         }
       }
     }
     //...
   }
   class Watcher {
     //...
     //求值
     get() {
       Dep.target = this
       if(typeof this.exp === 'function'){
         this.value = this.exp.call(this.vm)
       }else {
         this.value = this.vm[this.exp]
       }
       Dep.target = null
     }
     run() {
       //...
       Promise.resolve().then(()=>{
         this.get() //重新求值
         this.cb.call(this.vm)
         let index = watcherQueue.indexOf(this.id)
         watcherQueue.splice(index,1)
       })
     }
   }
   //...
   ```

   

继续解决还存在的问题

3. 计算属性是`惰性`的：计算属性依赖的其他属性发生变化时，计算属性`不会`立即重新计算，要等到对获取计算属性的值，也就是`求值`时才会重新计算。

4. 计算属性是`缓存`的：如果计算属性依赖的其他属性没发生变化，即使重新对计算属性`求值`，也`不会`重新计算计算属性。

   考虑如下代码：

   ```javascript
       let vm = new Vue({
         data: {
           a: 3,
           b: 5,
         },
         computed: {
           x() {
             console.log('计算x');
             return this.a * this.b
           }
         }
       })
       //没有任何打印
       vm.x
       //15
       //计算x
       vm.x
       //15
       vm.a = 4
       //没有任何打印
       vm.x
       //20
       //计算x
   ```

   

解决思路：给computed相关的`watcher`打一个标记`this.lazy = true`，代表这是一个`lazy watcher`，当dep通知watcher进行更新时，如果是`lazy watcher`，则只会给自己一个标记 `this.dirty = true`等到对计算属性进行`求值`时，如果watcher的`dirty === true`则会对watcher进行求值，并且把得到的值保存在watcher实例上(`watcher.value`)，如果watcher的`dirty === false`则直接返回`watcher.value`

另外需要注意的一点：

```javascript
let vm = new Vue({
  data:{
    a:3,
    b:5
  },
  watch:{
    x() { //2号watcher
      console.log('监听x');
    }
  },
  computed:{
    x() { 
      console.log('计算x');
      return this.a * this.b
    }
  }
})
//计算x
vm.a = 4
//计算x
//监听x
```

`

```javascript
class Vue {
  //...
  initComputed() {
    let computed = this.$options.computed
    if(computed){
      let keys = Object.keys(computed)
      for (let i = 0; i < keys.length; i++) {
        const watcher = new Watcher(this, computed[keys[i]],function () {},{lazy:true})
        Object.defineProperty(this,keys[i],{
          enumerable:true,
          configurable:true,
          get:function computedGetter() {
            if(watcher.dirty){
              watcher.get()
              watcher.dirty = false
            }
            return watcher.value
          },
          set:function computedSetter() {
            console.warn('请不要给计算属性赋值')
          }
        })
      }
    }
  }
}

class Dep {
  notify() {
    this.subs.forEach((watcher)=>{
      //依次执行回调函数
      watcher.update()
    })
  }
}
class Watcher {
  constructor(vm,exp,cb,options = {}) {
    this.dirty = this.lazy = !!options.lazy
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.id = ++watcherId
    this.lazy || this.get()
  }
  //求值
  get() {
    Dep.target = this
    if(typeof this.exp === 'function'){
      this.value = this.exp.call(this.vm)
    }else {
      this.value = this.vm[this.exp]
    }
    Dep.target = null
  }
  update() {
    if(this.lazy){
      this.dirty = true
    }else {
      this.run()
    }
  }

}
```



目前仍然存在bug，考虑如下测试代码

```javascript
  let vm = new Vue({
    data:{
      person:{
        name:'zs'
      }
    },
    watch:{
      x() { //2号watcher
        console.log('x监听');
      }
    },
    computed:{
      x() { //1号watcher
        console.log('x计算');
        return JSON.stringify(this.person)
      }
    }
  })
  vm.person = {name:'ls'} //没有任何打印

```

实际Vue中会先后打印 'x计算'，'x监听'，我们的实现中仍然没有打印

说明2号watcher执行run的时候，会对x进行求值。因此watcher的run中不光要调用回调，也要调用`get()`：

```javascript
  run() {
    //...
    Promise.resolve().then(()=>{
      this.get()
      this.cb.call(this.vm)
      let index = watcherQueue.indexOf(this.id)
      watcherQueue.splice(index,1)
    })
  }
```



但是加上代码后我们的实现中仍然没有打印，问题出在哪里？

展开`person`对象：

实际Vue中：

![](.\3.png)

我们的实现中：

![](.\4.png)

分析原因：

把computed中的watcher称为`1号watcher`，把watch中的watcher称为`2号watcher`。在initWatcher调用时，`2号watcher`上台，求值，触发了`person`的`getter`，触发`1号watcher`的`get()`方法，`1号watcher`也上台，覆盖了`2号watcher`，person的筐开始收集台上的`1号watcher`，结束后清空舞台。person并没有收集到`1号watcher`

解决思路：

- 维护一个`栈`，有新的watcher上台时入栈，下台时出栈，台上永远是`栈顶`的watcher
- watcher被dep收集时，也收集dep，`互相收集`。这样的话，计算属性的`getter`完成后，检查舞台上还有没有watcher，有就把自己的watcher收集的dep拿出来通知，收集舞台上的watcher

```javascript
class Vue {
  //...
  initComputed() {
    //...
        Object.defineProperty(this,keys[i],{
          enumerable:true,
          configurable:true,
          get:function computedGetter() {
            if(watcher.dirty){
              watcher.get()
              watcher.dirty = false
            }
            if(Dep.target){
              watcher.deps.forEach(dep => {
                dep.depend()
              })
            }
            return watcher.value
          },
          set:function computedSetter() {
            console.warn('请不要给计算属性赋值')
          }
        })
      }
    //...
  }
 //...
}
class Dep {
  constructor() {
    this.subs = []
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  depend() {
    if(Dep.target){
      Dep.target.addDep(this)
    }
  }
  notify() {
    this.subs.forEach((watcher)=>{
      //依次执行回调函数
      watcher.update()
    })
  }
}
let targetStack = []
class Watcher {
  constructor(vm,exp,cb,options = {}) {
    this.dirty = this.lazy = !!options.lazy
    this.vm = vm
    this.exp = exp
    this.cb = cb
    this.id = ++watcherId
    this.deps = []
    if(!this.lazy){
      this.get()
    }
  }
  addDep(dep){
    if(this.deps.indexOf(dep) !== -1) {
      return
    }
    this.deps.push(dep)
    dep.addSub(this)
  }
  //求值
  get() {
    Dep.target = this
    targetStack.push(this)
    if(typeof this.exp === 'function'){
      this.value = this.exp.call(this.vm)
    }else {
      this.value = this.vm[this.exp]
    }
    targetStack.pop()
    Dep.target = targetStack.length ? targetStack[targetStack.length - 1] : null
  }
  update() {
    if(this.lazy){
      this.dirty = true
    }else {
      this.run()
    }
  }
  run() {

    if(watcherQueue.indexOf(this.id) !== -1){ //已经存在于队列中
      return
    }
    watcherQueue.push(this.id)

    Promise.resolve().then(()=>{
      this.get() //重新求值
      this.cb.call(this.vm)
      let index = watcherQueue.indexOf(this.id)
      watcherQueue.splice(index,1)
    })
  }
}
```









## 实现对模板的编译

目前为止，我们已经实现Vue的响应式系统。现在需要对html进行响应。最简单的方法可以创建一个watcher：

```javascript
    new Watcher(this, ()=>{
      document.querySelector('#app').innerHTML = `<p>${this.name}</p>`
    },()=>{})
```

在Vue中确实也是这么做的，这个watcher被称为`render watcher`，watcher中的求值函数并没有这么简单。

我们的实现存在一些问题：

1. 用户是可以使用模板语法的，需要把模板进行一些处理，最终转换成一个执行dom更新的函数
2. 直接替换所有dom的开销很大，最好按需更新dom

为了**尽量减少不必要的dom操作**和实现**跨平台**的特性，Vue中引入了Virtual-DOM(虚拟DOM，以下简称VDOM)。

什么是VDOM？简单的说就是一个`JS对象`,它可以用来描述当前DOM长什么样。

为了得到当前Vue实例的VDOM，每个实例需要有一个函数来**生成VDOM**，被称为**渲染函数**。(`vm.$options.render`)

Vue实例如果传入了dom或者template，首先就是要把模板字符串转化成渲染函数，这个过程就是**编译**

### 解析器(parser)

关于 Vue 编译原理这块的整体逻辑主要分三步，这三步是有前后关系的：

- 第一步是将 `模板字符串` 转换成 `element ASTs`（解析器）
- 第二步是对 `AST` 进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）（本课程忽略）
- 第三步是 使用 `element ASTs` 生成 `render` 函数代码字符串（代码生成器）

![](.\5.png)

AST是什么？

简单的说一种代码转换成另外一种代码时，对源代码的描述。

[JS AST在线生成](https://astexplorer.net/)

Vue中对模板parse后的AST长什么样？

```javascript
{
  children: [{…}],
  parent: {},
  tag: "div",
  type: 1, //1-元素节点 2-带变量的文本节点 3-纯文本节点，
  expression:'_s(name)', //type如果是2，则返回_s(变量)
  text:'{{name}}' //文本节点编译前的字符串
}
```

源代码生成AST一般包含两个步骤：词法分析和语法分析

![](.\6.png)

Vue中的parse是每解析到一个token会立即对token进行处理

本课程只以最单纯的html模板为例。`v-model`，`v-if`,`v-for`,`@click`，以及html中的`单标签元素`，`注释`等情况可以作为课后作业完成。

思路：

以`<`为标识符，代表一个`开始标签`或者是`结束标签`，如果是开始标签，代表树的层级加了一层，如果是结束标签代表层级回退了一层。同时每一层要记录它的父级元素是谁。

所以可以使用一个`栈`去维护当前元素到了哪一层。有`开始标签`则入栈，`结束标签`则出栈。另外，标签之间是文本节点，文本节点不对栈进行操作

实现对HTML进行parse

```javascript
function parser(html) {
  let stack = []
  let root
  let currentParent
  while (html) {
    let ltIndex = html.indexOf('<')
    if(ltIndex > 0){ //前面有文本
      //type 1-元素节点  2-带变量的文本节点  3-纯文本节点
      let text = html.slice(0,ltIndex)
      currentParent.children.push(element)
      const element = {
        type: 3,
        text,
        parent:currentParent
      }
      html = html.slice(ltIndex)
    }else if(html[ltIndex + 1] !== '/'){ //前面没有文本，且是开始标签
      let gtIndex = html.indexOf('>')
      const element = {
        type: 1,
        tag:html.slice(ltIndex + 1,gtIndex), //不考虑dom的任何属性
        parent: currentParent,
        children:[],
      }

      if(!root){
        root = element
      }else {
        currentParent.children.push(element)
      }
      stack.push(element)
      currentParent = element
      html = html.slice(gtIndex + 1)
    }else { //结束标签
      let gtIndex = html.indexOf('>')
      stack.pop()
      currentParent = stack[stack.length - 1]
      html = html.slice(gtIndex + 1)
    }
  }
  return root
}
```

实现对文本节点的parse

思路：

以`{{`和`}}`为标识符，对把插值变量名转换成`_s(name)`的形式。

```javascript
function parseText(text) {
  let originText = text
  let tokens = []
  let type = 3
  while (text) {
    let start = text.indexOf('{{')
    let end = text.indexOf('}}')
    if(start !== -1 && end !== -1){
      type = 2
      if(start > 0){
        tokens.push(JSON.stringify(text.slice(0,start)))
      }
      let exp = text.slice(start+2,end)
      tokens.push(`_s(${exp})`)
      text = text.slice(end + 2)
    }else {
      tokens.push(JSON.stringify(text))
      text = ''
    }
  }
  let element = {
    type,
    text:originText,
  }
  type === 2 ? element.expression = tokens.join('+') : ''

  return element
}
```

### 代码生成器(codegenerator)

生成AST后需要把AST再转换成渲染函数

思路：

1. 递归AST，遇到元素节点则生成如下格式的字符串`_c(标签名, 属性对象, 后代数组)`
2. 遇到文本节点，如果是纯文本节点，则生成如下格式的字符串`_v(文本字符串)`
3. 如果是带变量的文本节点，则生成如下格式的字符串`_v(_s(变量名))`
4. 为了让变量能正常取到，生成最后将字符串包一层`with(this)`
5. 最后把字符串作为函数体生成一个函数，挂载到`vm.$options`上

```javascript
function generate(ast) {
  const code = genElement(ast)
  return {
    render: `with(this){return ${code}}`,
  }
}
function genElement (el){
  const children = genChildren(el)
  let code = `_c('${el.tag}',{},${children})`
  return code
}
function genChildren (el){
  if (el.children.length) {
    return '[' + el.children.map(child=>genNode(child)).join(',') + ']'
  }
}
function genNode (node) {
  if (node.type === 1) {
    return genElement(node)
  } else {
    return genText(node)
  }
}
function genText (text){
  return `_v(${text.type === 2 ? text.expression : JSON.stringify(text.text)})`
}
```



## 实现Vdom

什么是VDOM？

简单的说就是一个`JS对象`,它可以用来描述当前DOM长什么样。

例如：

```html
<ul>
    <li>1</li>
    <li>2</li>
</ul>
```

对应的vdom：

```javascript
{
  tag: 'ul',
  attrs: {},
  children: [
    {
      tag: 'li',
      attrs: {},
      children: [
        {
          tag: null,
          attrs: {},
          children:[],
          text:'1'
        }
      ]
    },
    {
      tag: 'li',
      attrs: {},
      children: [
        {
          tag: null,
          attrs: {},
          children:[],
          text:'2'
        }
      ]
    }
  ]
}
```

VDOM有什么用？

1.大多数情况下，提供了比暴力刷新整个dom树更好的**性能**

`操作JS对象是很快的，但是操作dom元素是很慢的`。如果数据发生改变，视图应该怎样更新？

直接重新拼接html模板，然后把新的html挂载在根元素上？

显然这种方法会很耗费性能，因为它要大量的删除和创建dom

如果视图通过vdom来描述，那么当数据发生改变时，**可以将新的vdom和旧的vdom进行对比，找到哪里发生了改变，再去对应的dom上改变相应的元素**

![](.\7.png)

2. 上述步骤只有最后一步更新需要依赖dom api，意味着只要能跑js的地方就可以用vdom去描述当前视图，更新时只用调用相应平台的api就行，实现了**跨平台**。

### 由渲染函数生成Vdom

定义一个简单的类VNode，描述一个DOM节点的相关信息，实现上一节渲染函数中未实现的`_c`,`_v`,`_s`函数。

```javascript
//vnode.js
class VNode {
  constructor(tag, attrs, children,text) {
    this.tag = tag
    this.attrs = attrs
    this.children = children
    this.text = text
  }
}
//index.js
class Vue {
  //...
  _c(tag,attrs,children) {
    return new VNode(tag,attrs,children)
  }
  _v(text) {
    return new VNode(null,null,null,text)
  }
  _s(val){
    if(val === null || val === undefined){
      return ''
    }else if(typeof val === 'object'){
      return JSON.stringify(val)
    }else {
      return String(val)
    }
  }
}


```

目前为止，成功地用一个JS树状对象，描述了渲染后的HTML应该长什么样。运行`vm.$options.render.call(vm)`即可得到当前vdom

### 实现diff和patch

首先实现一个`createElm`函数将Vdom转化为真正的dom，稍后更新dom会用到此函数

```javascript
function createElm(vnode) {
  if(!vnode.tag){
    const el = document.createTextNode(vnode.text)
    vnode.elm = el
    return el
  }
  const el = document.createElement(vnode.tag)
  vnode.elm = el
  vnode.children.map(createElm).forEach(childDom => {
    el.appendChild(childDom)
  })
  return el
}
```

延续模板编译里的思路，将原先粗暴式的代码进行改造。

思路：

- 实现一个`$mount`函数，初次挂载到真实dom时调用，将原先的初始化`render watcher`的逻辑搬到$mount里 
- 实现一个`_update`函数，该函数接受一个新的vdom，然后对比新旧vdom并更新真实dom，`render watcher`中不再暴力更新dom，而是调用`_update`函数

```javascript
//改造前
new Watcher(this, ()=>{
  document.querySelector('#app').innerHTML = `<p>${this.name}</p>`
},()=>{})

//改造后
class Vue {
  constructor(options) {
    //...
    if(options.el){
      let html = document.querySelector(options.el).outerHTML
      let ast = parser(html)
      let code = generate(ast).render
      this.$options.render = new Function(code)
      this.$mount(options.el)
    }
  }
  $mount(el) {
    this.$el = document.querySelector(el)
    this._watcher = new Watcher(this, ()=>{this._update(this.$options.render.call(this))}, ()=>{})
  }
  _update(vnode) {
    if(this._vnode){
      patch(this._vnode,vnode)
    }else {
      patch(this.$el,vnode)
    }
    this._vnode = vnode
  }
}
```


接下来，实现vdom机制中最核心的patch。vue中vdom进行patch的逻辑是基于`snabbdom`，课后同学们可以进一步阅读源码，本课程不考虑节点属性和节点的key。

思路：

- patch函数接受两个参数：旧的vdom和新的vdom
- 当第一次挂载时旧的vdom是一个真实dom，单独处理
- 后续更新时，分为如下三种情况
  1. 新节点不存在，则`删除`对应的dom
  2. 新旧节点标签不一样或文本不一样，则调用`createElm`生成新dom，并`替换`旧dom
  3. 旧节点不存在，新节点存在，则调用`createElm`生成新dom，并原dom后`添加`新dom
  4. 递归以上逻辑

```javascript
function patch(oldNode,newNode,) {
  const isRealElement = oldNode.nodeType
  //如果是对真实dom进行patch
  if(isRealElement){
    let parent = oldNode.parentNode
    parent.replaceChild(createElm(newNode),oldNode)
    return
  }
  //当前vdom对应的真实dom
  let el = oldNode.elm
  //当前vdom对应的真实父级dom
  let parent = el.parentNode
  if(newNode){
    newNode.elm = el
  }
  if (!newNode) { //新节点不存在，删除
    parent.removeChild(el)
  } else if (changed(newNode, oldNode)) { //发生了变化，替换
    parent.replaceChild(createElm(newNode), el)
  } else if(newNode.children){
    
    const newLength = newNode.children.length
    const oldLength = oldNode.children.length
    for (let i = 0; i < newLength || i < oldLength; i++) {
      if (i >= oldLength) { //旧节点不存在，有多余的新节点，增加
        el.appendChild(createElm(newNode.children[i]))
      } else { //递归
        patch(oldNode.children[i], newNode.children[i])
      }
    }
  }
}
//由vdom创建真实dom
function createElm(vnode) {
  if(!vnode.tag){
    const el = document.createTextNode(vnode.text)
    vnode.elm = el
    return el
  }
  const el = document.createElement(vnode.tag)
  vnode.elm = el
  vnode.children.map(createElm).forEach(childDom => {
    el.appendChild(childDom)
  })
  return el
}
//判断是否是相同节点
function changed(newNode, oldNode) {
  return (newNode.tag !== oldNode.tag || newNode.text !== oldNode.text)
}
```

