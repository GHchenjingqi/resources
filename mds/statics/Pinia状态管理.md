## Pinia状态管理

### 1.为什么使用pinia管理vue数据状态？

Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。

- 搭配TS，支持TS类型推断，写法比vuex简单
- 全局状态管理，修改数据比vuex更加方便灵活
- 支持插件，例如：状态持久化插件

### 2.如何安装使用步骤

安装

```
npm install pinia
```

入口文件 引入

```js
import { createPinia } from 'pinia'
import { createApp } from 'vue'
const app = createApp(App)
// 创建使用pinia
const pinia = createPinia()
app.use(pinia)
```

定义一个 useAlertsStore.js

```js
import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

页面使用时需要引入  useAlertsStore.js

```js
import { useAlertsStore } from 'useAlertsStore.js';
const ageStore = useAlertsStore();
```



### 3.pinia状态管理store的核心组成？

**store是pinia数据存储的实体，它有三个核心内容：state、getter、action。**

- state 类似vue2的data，返回一个包含所有初始数据状态的对象
- getter 类似vue2的计算属性，依赖state数据变化而改变，getter的this指向当前getter对象，无法获取state数据，因此getter的第一个参数默认就是state。
- action 类似vue2的methods，里面存放state的方法，action的this指向当前store存储对象。

**store创建有2种写法：默认写法和setup语法糖写法。**

默认写法，通过选项式将state,getter,action传入。

```js
// 定义option store规范： useID = defineStore(ID,store)
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

setup语法糖写法，该写法会将 state => data , getters => computed , actions => methods 。

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

### 4.如何获取响应式的store数据？

我们直接通过解构得到的store与响应式数据断开了，响应式数据需要通过 storeToRefs() 转后再解构。对于getter和action不需要转。

```js
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```

如何使用state数据？

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      isAdmin: true,
    }
  },
})
```

**访问state**

```js
const store = useStore();
store.count++
```

**重置state** - 恢复默认值

```js
const store = useStore();
store.$reset()
```

**变更state** - **$patch**

```js
store.$patch({
  count: store.count + 1,
  name: 'DIO',
})
```

