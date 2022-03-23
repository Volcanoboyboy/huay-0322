# vue3

## vue3知识图谱

![vue3高级语法](C:\Users\EDZ\Desktop\huay\huay-0322\img\vue3高级语法.png)

## 知识点记录

- Proxy 是针对对象来监听，而不是针对某个具体属性，所以不仅可以代理那些定义时不存在的属性，还可以代理更丰富的数据结构，比如 Map、Set 等，并且我们也能通过 deleteProperty 实现对删除操作的代理。

- 但是在 Vue 3 中还有另一个响应式实现的逻辑，就是利用对象的 get 和 set 函数来进行监听，这种响应式的实现方式，只能拦截某一个属性的修改，**这也是 Vue 3 中 ref 这个 API 的实现**。

- ```js
    // 使用 `toRefs` 创建对prop的 `user` property 的响应式引用
    const { user } = toRefs(props)
    // 这是为了确保我们的侦听器能够根据 user prop 的变化做出反应。
  ```

- ```js
  export default {
    props: {
      title: String
    },
    setup(props) {
      console.log(props.title)
    }
  }
  ```

  !WARNING

  但是，因为 `props` 是响应式的，你**不能使用 ES6 解构**，它会消除 prop 的响应性。

- 如果需要解构 prop，可以在 `setup` 函数中使用 [`toRefs`](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#响应式状态解构) 函数来完成此操作：

  ```js
  // MyBook.vue
  
  import { toRefs } from 'vue'
  
  setup(props) {
    const { title } = toRefs(props)
  
    console.log(title.value)
  }
  ```

- 如果 `title` 是可选的 prop，则传入的 `props` 中可能没有 `title` 。在这种情况下，`toRefs` 将不会为 `title` 创建一个 ref 。你需要使用 `toRef` 替代它：

- ```js
  // MyBook.vue
  import { toRef } from 'vue'
  setup(props) {
    const title = toRef(props, 'title')
    console.log(title.value)
  }
  ```

- **TIP**

  因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。

- 组件样式可以直接使用v-bind带入变量

  ```css
  background-color: v-bind(bgColor);
  ```

- provider/inject使用方法

  如果在 `setup()` 中使用 `inject`  `provide`  时，也需要从 `vue` 显式导入。导入以后，我们就可以调用它来定义暴露给我们的组件方式。

  ```js
  <!-- src/components/MyMap.vue -->
  <template>
    <MyMarker />
  </template>
  
  <script>
  import MyMarker from './MyMarker.vue'
  
  export default {
    components: {
      MyMarker
    },
    provide: {
      location: 'North Pole',
      geolocation: {
        longitude: 90,
        latitude: 135
      }
    }
  }
  </script>
  <!-- src/components/MyMarker.vue -->
  <script>
  export default {
    inject: ['location', 'geolocation']
  }
  </script>
  ```

- **模板引用**，在使用组合式 API 时，[响应式引用](https://v3.cn.vuejs.org/guide/reactivity-fundamentals.html#创建独立的响应式值作为-refs)和[模板引用](https://v3.cn.vuejs.org/guide/component-template-refs.html)的概念是统一的。为了获得对模板内元素或组件实例的引用，我们可以像往常一样声明 ref 并从 [setup()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 返回：

  ```html
  <template> 
    <div ref="root">This is a root element</div>
  </template>
  
  <script>
    import { ref, onMounted } from 'vue'
  
    export default {
      setup() {
        const root = ref(null)
  
        onMounted(() => {
          // DOM 元素将在初始渲染后分配给 ref
          console.log(root.value) // <div>This is a root element</div>
        })
  
        return {
          root
        }
      }
    }
  </script>
  ```



- **setup钩子默认替代的是beforCreated, created**，要注意这里的生命周期问题，下面的模板引用例子说明

  ```js
  <template> 
    <div ref="root">This is a root element</div>
  </template>
  
  <script>
    import { ref, onMounted } from 'vue'
  
    export default {
      setup() {
        const root = ref(null)
        
        // console.log(root.value) // null,这里的DOM还没有渲染
  
        onMounted(() => {
          // DOM 元素将在初始渲染后分配给 ref
          console.log(root.value) // <div>This is a root element</div>
        })
  
        return {
          root
        }
      }
    }
  </script>
  ```

  

- **侦听器的使用**，使用模板引用的侦听器应该用 `flush: 'post'` 选项来定义，这将在 DOM 更新*后*运行副作用，确保模板引用与 DOM 保持同步，并引用正确的元素。

  ```vue
  <template>
    <div ref="root">This is a root element</div>
  </template>
  
  <script>
    import { ref, watchEffect } from 'vue'
  
    export default {
      setup() {
        const root = ref(null)
  
        watchEffect(() => {
          console.log(root.value) // => <div>This is a root element</div>
        }, 
        {
          flush: 'post'
        })
  
        return {
          root
        }
      }
    }
  </script>
  ```



## 响应性 API



- isReactive  检查对象是否是由 reactive 创建的响应式代理。

- ## `toRaw`

  返回 [`reactive`](https://v3.cn.vuejs.org/api/basic-reactivity.html#reactive) 或 [`readonly`](https://v3.cn.vuejs.org/api/basic-reactivity.html#readonly) 代理的原始对象。这是一个“逃生舱”，可用于临时读取数据而无需承担代理访问/跟踪的开销，也可用于写入数据而避免触发更改。**不**建议保留对原始对象的持久引用。请谨慎使用。

  ```js
  const foo = {}
  const reactiveFoo = reactive(foo)
  
  console.log(toRaw(reactiveFoo) === foo) // true
  ```

- ## `toRef`

  可以用来为源响应式对象上的某个 property 新创建一个 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })
  
  const fooRef = toRef(state, 'foo')
  
  fooRef.value++
  console.log(state.foo) // 2
  
  state.foo++
  console.log(fooRef.value) // 3
  ```

- ## `toRefs`

  将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 [`ref`](https://v3.cn.vuejs.org/api/refs-api.html#ref)。

  ```js
  const state = reactive({
    foo: 1,
    bar: 2
  })
  
  const stateAsRefs = toRefs(state)
  /*
  stateAsRefs 的类型:
  
  {
    foo: Ref<number>,
    bar: Ref<number>
  }
  */
  
  // ref 和原始 property 已经“链接”起来了
  state.foo++
  console.log(stateAsRefs.foo.value) // 2
  
  stateAsRefs.foo.value++
  console.log(state.foo) // 3
  ```

- 当从组合式函数返回响应式对象时，`toRefs` 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：**这里有个很重要的点，就是直接结构响应式是数据就会丢失响应性，而通过toRefs新建的普通对象同时指向对应对象，解构也具有响应性**

  ```js
  function useFeatureX() {
    const state = reactive({
      foo: 1,
      bar: 2
    })
  
    // 操作 state 的逻辑
  
    // 返回时转换为ref
    return toRefs(state)
  }
  
  export default {
    setup() {
      // 可以在不失去响应性的情况下解构
      const { foo, bar } = useFeatureX()
  
      return {
        foo,
        bar
      }
    }
  }
  ```

- ## `computed`

  接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref) 对象。

  ```js
  const count = ref(1)
  const plusOne = computed(() => count.value + 1)
  
  console.log(plusOne.value) // 2
  
  plusOne.value++ // 错误
  ```

  或者，接受一个具有 `get` 和 `set` 函数的对象，用来创建可写的 ref 对象。

  ```js
  const count = ref(1)
  const plusOne = computed({
    get: () => count.value + 1,
    set: val => {
      count.value = val - 1
    }
  })
  
  plusOne.value = 1
  console.log(count.value) // 0
  ```

- ## `watchEffect`

  立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。

  ```js
  const count = ref(0)
  
  watchEffect(() => console.log(count.value))
  // -> logs 0
  
  setTimeout(() => {
    count.value++
    // -> logs 1
  }, 100)
  ```

  **类型声明：**

  ```ts
  function watchEffect(
    effect: (onInvalidate: InvalidateCbRegistrator) => void,
    options?: WatchEffectOptions
  ): StopHandle
  
  interface WatchEffectOptions {
    flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
    onTrack?: (event: DebuggerEvent) => void
    onTrigger?: (event: DebuggerEvent) => void
  }
  
  interface DebuggerEvent {
    effect: ReactiveEffect
    target: any
    type: OperationTypes
    key: string | symbol | undefined
  }
  
  type InvalidateCbRegistrator = (invalidate: () => void) => void
  
  type StopHandle = () => void
  ```

  **参考**：[`watchEffect` 指南](https://v3.cn.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect)

  ## [#](https://v3.cn.vuejs.org/api/computed-watch-api.html#watchposteffect)`watchPostEffect` 3.2+

  `watchEffect` 的别名，带有 `flush: 'post'` 选项。

  ## [#](https://v3.cn.vuejs.org/api/computed-watch-api.html#watchsynceffect)`watchSyncEffect` 3.2+

  `watchEffect` 的别名，带有 `flush: 'sync'` 选项。

### `<script setup>`

<script setup> 是在单文件组件 (SFC) 中使用组合式 API 的编译时语法糖。相比于普通的 <script> 语法，它具有更多优势：

- 更少的样板内容，更简洁的代码。
- 能够使用纯 Typescript 声明 props 和抛出事件。
- 更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
- 更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)。



### 基本语法

要使用这个语法，需要将 `setup` attribute 添加到 `<script>` 代码块上：

```vue
<script setup>
console.log('hello script setup')
</script>
```

里面的代码会被编译成组件 `setup()` 函数的内容。这意味着与普通的 `<script>` 只在组件被首次引入的时候执行一次不同，`<script setup>` 中的代码会在**每次组件实例被创建的时候执行**。

### [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#顶层的绑定会被暴露给模板)顶层的绑定会被暴露给模板

- <script setup> 范围里的值也能被直接作为自定义组件的标签名使用：这里就相当于自动注册了
  <script setup>
  import MyComponent from './MyComponent.vue'
  </script>


  <template>
    <MyComponent />
  </template>



- ### [#](https://v3.cn.vuejs.org/api/sfc-script-setup.html#动态组件)动态组件

  由于组件被引用为变量而不是作为字符串键来注册的，在 `<script setup>` 中要使用动态组件的时候，就应该使用动态的 `:is` 来绑定：

  ```vue
  <script setup>
  import Foo from './Foo.vue'
  import Bar from './Bar.vue'
  </script>
  
  <template>
    <component :is="Foo" />
    <component :is="someCondition ? Foo : Bar" />
  </template>
  ```



- ### 命名空间组件

  可以使用带点的组件标记，例如 `<Foo.Bar>` 来引用嵌套在对象属性中的组件。这在需要从单个文件中导入多个组件的时候非常有用：

  ```vue
  <script setup>
  import * as Form from './form-components'
  </script>
  
  <template>
    <Form.Input>
      <Form.Label>label</Form.Label>
    </Form.Input>
  </template>
  ```

### 使用自定义指令

全局注册的自定义指令将以符合预期的方式工作，且本地注册的指令可以直接在模板中使用，就像上文所提及的组件一样。

但这里有一个需要注意的限制：必须以 `vNameOfDirective` 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。

```html
<script setup>
const vMyDirective = {
  beforeMount: (el) => {
    // 在元素上做些操作
  }
}
</script>
<template>
  <h1 v-my-directive>This is a Heading</h1>
</template>
```

```html
<script setup>
  // 导入的指令同样能够工作，并且能够通过重命名来使其符合命名规范
  import { myDirective as vMyDirective } from './MyDirective.js'
</script>
```

### `defineProps` 和 `defineEmits`（基于没有this的情况下新api）

在 `<script setup>` 中必须使用 `defineProps` 和 `defineEmits` API 来声明 `props` 和 `emits` ，它们具备完整的类型推断并且在 `<script setup>` 中是直接可用的：

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```

- `defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的**编译器宏**。他们不需要导入且会随着 `<script setup>` 处理过程一同被编译掉。
- `defineProps` 接收与 [`props` 选项](https://v3.cn.vuejs.org/api/options-data.html#props)相同的值，`defineEmits` 也接收 [`emits` 选项](https://v3.cn.vuejs.org/api/options-data.html#emits)相同的值。
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块范围内。

## **style **特性

- ### 自定义注入名称

  你可以通过给 `module` attribute 一个值来自定义注入的类对象的 property 键：

  ```vue
  <template>
    <p :class="classes.red">red</p>
  </template>
  
  <style module="classes">
  .red {
    color: red;
  }
  </style>
  
  <----!> 可以结合模块化使用</----!>
  // 默认, 返回 <style module> 中的类
  useCssModule()
  
  // 命名, 返回 <style module="classes"> 中的类
  useCssModule('classes')
  
  ```

### v-bind

- ## 状态驱动的动态 CSS

  单文件组件的 `<style>` 标签可以通过 `v-bind` 这一 CSS 函数将 CSS 的值关联到动态的组件状态上：

  ```vue
  <template>
    <div class="text">hello</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        color: 'red'
      }
    }
  }
  </script>
  
  <style>
  .text {
    color: v-bind(color);
  }
  </style>
  ```

  这个语法同样也适用于 [``](https://v3.cn.vuejs.org/api/sfc-script-setup)，且支持 JavaScript 表达式 (需要用引号包裹起来)

  ```vue
  <script setup>
  const theme = {
    color: 'red'
  }
  </script>
  
  <template>
    <p>hello</p>
  </template>
  
  <style scoped>
  p {
    color: v-bind('theme.color');
  }
  </style>
  ```