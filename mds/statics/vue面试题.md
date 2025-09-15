### 一.VUE2生命周期

#### 1.vue的生命周期都有哪些？（8个）

beforeCreate，created，beforeMount，mounted，beforeUpdate，updated，beforeDestory，destoryed

#### 1.1 发送请求在create阶段还是在mounted阶段？

这个问题需要看项目了业务的情况。因为父组件引入子组件，会先执行父的前3个生命周期，再执行子组件的前4个周期。如果业务父组件引入的子组件，并且优先加载子组件数据，那么父组件需要再 mounted 中发送请求。

如何项目没有引入子组件，发送请求可以发到任何生命周期中。

#### 2.为什么发送请求不在 beforeCreate里？

单独发送请求在任何位置都可以得到数据。但是一般请求函数被封装到methods里面，在beforeCreate阶段无法获取到methods的方法（报错），因此一般不在beforeCreate阶段请求数据。

#### 2.1 beforeCreate和created有什么区别？

- **$data**

beforeCreate没有$data

created阶段有$data

- **methods**

beforeCreate无法获取method方法

created阶段可以获取到method里面的方法

#### 3.在create阶段如何获取dom元素？

在create阶段需要通过异步操作获取dom元素，使用同步方法获取不到！

可以使用 setTimeout，$nextTick 获取元素dom。

#### 4.进入页面之后会执行哪些生命周期？

页面会默认执行create和mount 2大周期。

- beforeCreate
- created
- beforeMount
- mounted

#### 5.第二次或第N次进入页面会执行哪些生命周期？

如果当前组件使用了缓存组件 keep-alive， 只会执行一个 activated；

如果没有用缓存组件，每次都会执行 beforeCreate，created，beforeMount，mounted 前4个生命周期。

#### 6.父组件引入子组件，那么生命周期执行循序是什么？

子组件的2大周期会在父组件beforeMount之后执行，子组件加载完毕之后，最后执行父组件的mounted。

- 父：beforeCreate，created，beforeMount

- 子：beforeCreate，created，beforeMount，mounted

    ...

- 父：mounted

#### 7.加入keep-alive会执行哪些生命周期？（8+2）

- activated
- deactivated

如果当前组件加入了keep-alive，第一次进入页面，会执行5个生命周期，会在mounted后执行一个activated周期。如下：

beforeCreate，created，beforeMount，mounted，activated

#### 8.说一下常用的生命周期及对应使用场景？

- created   ===>  单组件时，获取数据
- mounted  ===> 同步可以获取DOM元素
- activated  ===> 详情页判断id是否相等，不相等重新发起请求
- destoryed ===> 用于避免数据污染，可以销毁数据，或者记录数据

### 二.组件传值

#### 1.组件传值方式

**父传子：**

---> 父组件通过props传递数据

--->  子组件通过 this.$parent.xxx

**子传父：**

---> 子组件通过 this.$emit 触发父组件方法传参

**父传孙**：

--->  依赖注入  provide / inject

**平辈传值：**

---> 通过bus（一个new Vue()实例） 总线传递数据：

平辈组件都引入bus，传递数据使用 bus.$emit ，接收数据使用 bus.$on。

#### 2.子组件如何修改父组件的值

- this.$parent.xxx

#### 3.父组件修改子组件的值

通过给子组件添加ref选择器，选择子元素

- this.$refs.child.xxx = "123"

#### 4.如何找到根组件？

- this.$root  // #app

### 三.插槽 slot

父组件向子组件内传递 代码块或数据时，可以用插槽，

#### 1.匿名插槽 

无名字插槽

#### 2.具名插槽

有名字插槽

```html
// 组件内：
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

// 父使用插槽
<template v-slot:header>
    <!-- header 插槽的内容放这里 -->
</template>
<template #header>
    <!-- header 插槽的内容放这里 -->
</template>
```

#### 3.插槽作用域

通过插槽实现父子组件传递组件就需要用到插槽作用域。插槽作用域返回时一个对象，代码块要用需要使用解构获取参数。

```
<template #header={name}>
    <!-- header 插槽的内容放这里 -->
    {{name}}
</template>
```

### 四.vue如何封装组件？

封装高级组件: 具备插槽及作用域，父子通信的组件。

### 五.关于vuex

#### 1.vuex有哪些属性？

- state 全局共享属性，存放数据状态
- getters 计算属性
- mutations 修改数据的同步方法
- actions  修改数据的异步方法，也是调用mutation方法
- modules  把多个store组合在一起

#### 2.vuex数据时单向的还是双向的？

vuex 是单向数据流！组件内不能直接通过this.数据修改，但是组件里面修改数据可以使用 mutations 或actions修改数据。

#### 3.vuex如何做持久化存储？

- 1.使用插件：vuex-persist ，使用步骤：安装-引入-实例化-挂载到vuex的plugins插件中
- 2.localStorage自己写，setter通过localStorage.setItem，getter时也从localStorage里面取！

### 六.vue设置代理

#### 1.vue项目设置代理是为了解决接口跨域问题。

vue根目录新建一个 vue.config.js，里面新增 **devServer** 属性代码：

```js
module.exports = {
  devServer: {
    proxy: 'http://localhost:4000' , // 接口跨域地址
  }
}
```

#### 2.代理打包之后，会出现代理接口跨域问题！如何解决？

解决：新增环境变量，脚手架会自动识别环境是生产还是开发环境。通过环境变量改变接口默认的url地址。然后打包时，也会通过环境变量改变接口的地址。

a.项目根目录新增2个文件：

- 开发环境 ： .env.development
- 生成环境 ： .env.production

b.文件内容新增环境变量：

```js
// 开发文件内容
VUE_APP_TITLE = '项目名称'
VUE_APPA_ENV = 'dev'
VUE_APPA_BASE_API = 'http://localhost:8088/'

// 生产文件内容
VUE_APP_TITLE = '项目名称'
VUE_APPA_ENV = 'pro'
VUE_APPA_BASE_API = 'http://40.64.123.44:8088/'
```

全局获取环境变量方法： **process.env.xxxxx**

更多vue代理知识：https://cli.vuejs.org/zh/config/#devserver-proxy

### 七.打包问题

#### 1.打包之后白屏问题什么原因导致的？ 

原因：项目默认打包后文件路径是绝对路径！需要通过 vue.config.js文件的 **publicPath**属性配置为相对路径。

```js
module.exports = {
  publicPath:"./"
}
```

#### 2.打包后，路径点击之后白屏，图片内容都不显示？

原因：路由模式是 history 模式，需要改成 hash 模式，在路由的 mode属性改为 hash模式。

#### 3.如何项目上线需要 history 模式 ,但是前端开发是 hash 模式，怎么处理？

需要后端设置 重定向！

### 八.vue路由模式

#### 1.路由都有哪些模式？都有什么区别？

路由一共有2种模式：history和hash

区别：

- 表现形态不一样：hash 路径在域名和文件夹之间多了 “#” 符号，history没有
- 跳转请求：history遇到404不存在的路径会发起跳转请求，hash不会发送请求
- 前端开发使用 hash 模式，使用history打包会出现白屏问题

#### 2.介绍一下SPA及缺点？

SPA是单页面应用，整个项目就是一个页面。

缺点：

- 对SEO网络优化不友好
- 频繁的回流重绘导致性能不好

#### 3.vue路径如何传参？

**显示传参（地址栏可以看到参数）：**

通过路由的 path 和 query设置参数

```js
this.$router.push({
	path:'about',
	query:{
		id:222
	}
})

// 获取路由参数： this.$route.query.xxx
const id = this.$route.query.id
```

**隐式传参（地址栏看不到参数）：**

通过路由的name属性和params 设置

```js
this.$router.push({
	name:'about',
	params:{
		id:222
	}
})

// 获取隐式参数方式： this.$route.params.id
const id = this.$route.params.id
```

#### 4.路由导航守卫有哪些？

**路由守卫分为三部分：全局3个、独享1个、组件内3个**

- 全局守卫： beforeEach / beforeResolve / afterEach (to,from,next)

- 路由独享： beforeEnter

- 组件内：beforeRouteEnter / beforeRouteUpdate / beforeRouteLeave 

路由守卫使用场景：未登录跳转到登录页面

#### 5.动态路由

动态路由场景一般都是详情页面，根据参数不同加载不同内容。

```js
{
     path:"list",
     name:"list",
     children:[
         {
          path: "/list/:id", // 动态路由
          name: 'details',
          component:()=> import("../view/list/detail.vue") // 懒加载
         }
     ]
}
```

### 九.setup函数可以跟data，methods等同时使用吗？

**可以共存，vue3兼容了vue2的写法。setup的声明周期函数早于 beforeCreate钩子函数。**

**并且 选项式的属性方法：data和methods等可以使用this调用setup里面的数据和方法。**

**但是 setup 不能调用 data ，methods的数据和方法，setup的this指向 undefined.**

```js
<script>
    export default{
    name:"vue3",
        data(){
        return {
            ccc: this.name  // 调用setup的数据
        }
    },
    methods:{
        b(){
            this.add()
        },
    }
    setup(){
        const count = ref(0)
        function add(){
            count++
        }
        return {
            add
        }
    }
}
</script>
```

### 十.Vue2和Vue3的区别？

#### 1.vue数据响应式区别

vue2劫持数据原理：使用Object的defineProperty方法劫持对象属性的getter和Setter，在数据更新时触发响应式的回调，然后更新页面。

vue2数据响应式的缺点：vue实例新增的数据属性或者删除某个属性，无法正常监听到数据变化。

首页这不是vue设计的缺陷，只能说是技术历史缺陷——vue2被作者设计时ES6还未出现。

因此，Vue3的响应式，从根本上弥补了vue2版本的缺陷：通过使用ES6的Proxy代理数据，Proxy代理的数据增删改查都可以监听到。当数据发生变化，然后又通过ES6的Reflect反射更优雅的去调用对应的方法，从而实现数据的响应式，

#### 2.vue生命周期不同

vue2的8个生命周期：beforeCreate，created，beforeMount，mounted，beforeUpdate，updated，beforeDestroy ，destroyed 

vue3的生命周期：setup、onBeforeMount、onMounted、onBeforeUpdate、onUpdated、onBeforeUnmount、onUnmounted

vue3生命周期在vue2的基础上都加了On，beforeCreate和created阶段周期使用setup代替。

#### 3.vue3新增特性

- framents 多个根节点
- Teleport 组件 将模板添加到指定父级Dom中
- Suspense 组件 异步组件用于处理异步数据组件的处理
- composition 组合式API	

composition 组合式API包含以下语法：setup语法糖，响应式数据定义（ref,reactive,readonly,computed,watch,watchEffect), 生命周期钩子，依赖注入（provide,inject)

#### 4.diff算法不同

vue2是遍历每一个虚拟节点，并进行节点对比返回一个patch对象，patch对象用于记录节点不同之处，最后通过patch去更新DOM。

vue3在初始化时给每一个虚拟节点添加了patchflag标识，当虚拟节点变化时，flag标识会被标记，渲染时没有变化的patchflag直接复用。

#### 5.vue3非兼容改变

- 移除了filter 过滤器
- v-for 和 v-if 优先级改变，vue3: if > for 
- vue3 的 this不再指向 vue实例
- 生命周期钩子改变
- 更好的支持 typeScript
