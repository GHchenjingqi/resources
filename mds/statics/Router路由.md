## Router路由

前端路由一共有三种模式：hash，history，memory ，常用2种为： **hash模式 和 history模式**。

安装 vue-router

```
npm install vue-router@4
```

#### router-link

在vue项目里使用 router-link 替换a标签。

#### router-view

router-view 用来显示动态切换的组件内容。显示的是对应router-link 的路由组件。

```js
// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。 createWebHashHistory / createWebHistory
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})

// 5. 创建并挂载根实例
const app = Vue.createApp({})
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')

// 现在，应用已经启动了！
```

#### 指定路由模式

vue3 使用 history 属性替代了vue2的mode属性，可选值如下：

- createWebHashHistory   hash模式
- createWebHistory  history模式
- creatMemoryHistory   memory模式

```js
const router = VueRouter.createRouter({
	history：createWebHashHistory
})
```

vue2路由指定模式

mode的可选值如下：hash，history，abstract（node环境强制开启模式）

```
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

#### 带参数的动态路由

动态参数写法 /:参数名

```
{ path: '/users/:id', component: User },
```

获取动态参数

```
$route.params.id
```

路由可选参数 ？

```
{ path: '/users/:userId?' },
```

#### 路由跳转 router.push

点击 `router-link` 时，内部会调用这个方法，所以点击 `router-link :to="..."` 相当于调用 `router.push(...)` 。

| 声明式                    | 编程式             |
| :------------------------ | :----------------- |
| `<router-link :to="...">` | `router.push(...)` |

```js
// 字符串路径
router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```

#### 路由替换 router.replace

| 声明式                            | 编程式                |
| :-------------------------------- | :-------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

```js
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

#### 路由历史 router.go

```js
// 向前移动一条记录，与 router.forward() 相同
router.go(1)

// 返回一条记录，与 router.back() 相同
router.go(-1)

// 前进 3 条记录
router.go(3)

// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)
```

#### 路由命名

所有的路由命名都必须唯一。

路由配置：

```js
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User,
  },
]
```

跳转路由配置方式一：

```html
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```

跳转路由配置方式二：

```js
router.push({ name: 'user', params: { username: 'erina' } })
```

#### 路由重定向 redirect

router通过redirect重定向路由。

```js
const routes = [{ path: '/home', redirect: '/' }]
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
```

#### 路由别名 alias

```js
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

#### 路由守卫

##### 全局前置守卫 beforeEach，通过next方法放行。

```js
const router = createRouter({ ... })

router.beforeEach((to, from,next) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

##### 全局解析守卫 beforeResolve

```js
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission()
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // ... 处理错误，然后取消导航
        return false
      } else {
        // 意料之外的错误，取消导航并把错误传给全局处理器
        throw error
      }
    }
  }
})
```

##### 全局后置守卫 afterEach

```js
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```

##### 独享路由守卫 

直接在路由配置上定义 beforeEnter。

```js
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

#### 组件守卫

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

```js
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
```

#### 路由懒加载

```js
// 将
// import UserDetails from './views/UserDetails.vue'
// 替换成
const UserDetails = () => import('./views/UserDetails.vue')

const router = createRouter({
  // ...
  routes: [
    { path: '/users/:id', component: UserDetails }
    // 或在路由定义里直接使用它
    { path: '/users/:id', component: () => import('./views/UserDetails.vue') },
  ],
})
```

### 404配置

```js
routes: [{
    path: '/:pathMatch(.*)*', // vue2
    path: '/:catchAll(.*)', // vue3
    name: 'NotFound',
    component: NotFound
}]
```

### 路由鉴权拦截

对于需要登录查看的路由，或者一定等级能查看的鉴权功能，需要用到路由全局前置守卫和路由元信息meta。

1.设置路由元信息：requiresAuth 

```js
{
    path: '/',
    name: 'home',
    component: HomeView,
    // 只有经过身份验证的用户才能创建帖子
    meta: { requiresAuth: true }
},
```

2.路由前置守卫

```js
// 路由鉴权守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const flag = localStorage.getItem('loginSatus')
    // 登录标识假时就跳转到登录页面
    if (flag === 'true') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
```

