### 1.Vuex是什么？
vuex是实现组件全局状态（数据）管理的一种机制，可以在整个项目任意位置实现数据共享。vuex在vue2版本得到广泛使用，vue3使用pinia管理状态。

### 2.如何安装使用？
 (1). 安装vuex依赖

```javascript
npm install vuex --save
npm install vuex@next --save  // 最新版
```

 (2). 入口文件 导入使用

```javascript
import Vuex from 'vuex';
Vue.use(Vue)
```

 (3). 创建store 对象

```javascript
const store = new Vuex.Store({
    state:{
        count:0
    }
})
```

 (4). 将store对象挂载到Vue实例中

```javascript
new Vue({
    el:"#app",
    store
})
```

### 3.Vuex核心组成都有哪些？
+ **State   所有共享数据存储到state中**
+ **Mutation 修改state数据，必须是同步函数**
+ **Action 修改state数据，不过需要通过调用Mutation 修改数据，支持异步**
+ **Getter 对State数据进行包装，调用时返回包装后的数据**
+ **Module 模块**，用于多数据状态分模块存储，避免store数据臃肿

#### State 数据存储
获取数据，第一种：通过 "this.$store.state.key "  获取。

```javascript
this.$store.state.count
```

第二种使用mapState 把属性值映射到计算属性中去。

```javascript
import { mapState } from 'vuex'
export default {
    computed: {
      ...mapState(['count'])
    }
}
```

#### Mutation 变更state数据
vuex认为直接赋值修改数据不合法，推荐使用mutation修改数据。

```javascript
const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    add(state) {
      // 变更状态
      state.count++
    }
  }
})

// 然后在项目中 通过commit调用motation的函数add，从而修改state中的数据。
store.commit('add')
this.$store.commit('add')
```

##### mutation 如何传递参数
mutation(state,step)  state 默认第一个参数，不可修改，commit方法传递的参数是第二个参数。

```javascript
const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    add(state,n) {
      // 变更状态
      state.count+=n
    }
  }
})

// 每次加10
store.commit('add', 10)
```

第二种调用方法，类似获取state的数据一样 ，通过mapMutations 将mutation的方法映射到methods中。

```javascript
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'add'
    ]),
    // 可以在函数中直接使用 add方法
    addEvent(){
         this.add()
    }
}
```

#### Action 异步修改数据
vuex通过action的**dispatch**可以实现异步修改数据。actions不能直接修改state的数据，需要通过第一个参数.commit mutation对应的方法。第二个参数是传参。

```javascript
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    add (state) {
      state.count++
    },
    addN (state,n) {
      state.count+=n
    },
  },
  actions: {
    increment (context,num) {
        setTimeout(() => {
          context.commit('addN',num)
        }, 1000)
    }
  }
})

// 页面调用方法
store.dispatch('increment')
```

同样的action也支持使用扩展运算符将方法映射到methods中。

```javascript
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['increment']),
      
    addNEvent(){
        this.increment(3)  // 每次加3
    }
  }
}
```

#### Getter 包装数据
getter 不会修改State数据，数据发生变化的时候也会跟着变化，类似计算属性。

```javascript
const store = createStore({
  state: {
      count: 0
  },
  getters: {
    getCount (state) {
      return  "当前count的值："+state.count
    }
  }
})
```

**获取getter**

vuex的getter方法通过 this.$store.getters.getCount 调用。

```javascript
 this.$store.getters.getCount
```

也可以使用扩展运算符映射到计算属性中。

```javascript
import { mapGetters } from 'vuex'

export default {
  computed: {
      // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'getCount',
    ])
  }
}

// 使用的话直接 this.getCount 或 {{getCount}}
```

#### Module 模块
Module是为了解决store存储的数据臃肿的，把数据分模块，最后组装到一个store中。每个模块都有自己的state,getter,mutation,action。

```javascript
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})
```

### 4.vuex在vue3里面使用（组合式API）
```javascript
// 引入useStore
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup () {
    // 定义store
    const store = useStore()
    return {
      // 在 computed 函数中访问 state
      count: computed(() => store.state.count),

      // 在 computed 函数中访问 getter
      double: computed(() => store.getters.double)
     
      // 使用 mutation
      increment: () => store.commit('increment'),

      // 使用 action
      asyncIncrement: () => store.dispatch('asyncIncrement')
    }
  }
}
```

### 5.命名空间namespaced及createNamespacedHelpers使用
当状态使用了namespaced:true 表示开启命名空间。我们在页面就可以使用createNamespacedHelpers对状态进行管理了。

创建命名空间的store，如下：

```javascript
const HomePage = {
  namespaced: true,
  state:{
    pageName: '',
  },
  mutations,
  actions:{
    setName(){}
  },
}

export default HomePage
```

全局状态管理器引入使用homepage的状态，如下：

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 引入
import HomePage from './homePage.js'
Vue.use(Vuex)

const store = {
  ...,
  // 多状态分模块
  modules: {
    HomePage,
  }
}

export default new Vuex.Store(store)
```

页面使用：

```javascript
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions } = createNamespacedHelpers('HomePage');

export default {
  computed: {
    ...mapState({
      title: state => state.pageName
    })
  },
  methods: {
    ...mapActions([
      'setName'
    ])
  }
};
```

