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

