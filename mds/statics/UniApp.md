## 一、基础知识
### 1.1 UniApp 核心概念与价值
UniApp 是基于 Vue.js 的跨平台开发框架，通过 "一次编写，多端运行" 的特性，可将代码发布至 iOS、Android、H5、微信 / 支付宝等十余种小程序平台。其核心优势在于：

+ **技术统一**：采用 Vue.js 语法规范，降低跨端学习成本
+ **生态完善**：内置丰富组件与 API，支持扩展 UI 库（如 Uni UI）
+ **全栈能力**：结合 UniCloud 可实现前端与服务器端统一开发
+ **性能均衡**：通过编译器与运行时优化，兼顾跨端兼容性与运行效率

### 1.2 开发环境搭建
#### 1.2.1 核心工具安装
+ **HBuilderX（推荐）**：官方集成开发环境，支持一键运行多端
    1. 下载地址：[HBuilderX 官网](https://www.dcloud.io/hbuilderx.html)
    2. 安装后在 "工具" 菜单中勾选 "uni-app" 插件
+ **Node.js**：提供 npm 包管理能力，需安装 v14 + 版本
+ **平台开发者工具**：
    - 微信小程序：安装[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
    - App 端：无需额外安装，HBuilderX 内置打包能力

#### 1.2.2 项目创建与运行
1. **创建项目**：
    - HBuilderX：文件 → 新建 → 项目 → 选择 "uni-app" 模板
    - CLI 方式：vue create -p dcloudio/uni-preset-vue my-project
1. **目录结构解析**：

```plain
├── pages              # 页面组件目录（必填）
│   └── index          # 首页文件夹
│       └── index.vue  # 首页组件
├── static             # 静态资源目录（必填，不编译）
├── App.vue            # 应用入口组件（必填）
├── main.js            # 应用入口文件（必填）
├── manifest.json      # 应用配置文件（必填，含平台配置）
├── pages.json         # 页面路由配置（必填）
└── store              # 状态管理目录（可选）
```

1. **运行项目**：
    - 选中项目 → 点击 "运行" → 选择目标平台（如 "微信小程序"）
    - 首次运行需配置对应平台开发者工具路径

### 1.3 基础语法与规范
#### 1.3.1 页面组件规范
遵循 Vue 单文件组件（SFC）规范，每个页面由 3 部分组成：

```javascript
<template>
  <!-- 组件结构：使用UniApp基础组件 -->
  <view class="container">
    <text>{{ message }}</text>
    <my-button @click="handleClick"></my-button>
  </view>
</template>
<script>
  // 逻辑处理：遵循Vue语法
import myButton from '@/components/my-button/my-button.vue'
export default {
  components: { myButton }, // 注册自定义组件
  data() {
    return {
      message: 'Hello UniApp'
    }
  },
  methods: {
    handleClick() {
      uni.showToast({ title: '点击成功' })
    }
  }
}
</script>
<style scoped>
  /* 样式：支持scss/less */
  .container {
  padding: 20rpx;
}
</style>
```

#### 1.3.2 核心语法差异
+ **组件标签**：贴近小程序规范，如<view>替代<div>，<text>替代<span>
+ **API 调用**：统一使用[uni.xxx](http://uni.xxx)前缀，替代各平台专有 API（如uni.request替代wx.request）
+ **生命周期**：**同时支持 Vue 生命周期与 UniApp 扩展生命周期**

```javascript
export default {
  onLaunch() { /* 应用初始化完成 */ },
  onLoad() { console.log("页面加载") },
  onShow() { console.log("页面显示") },
  onReady() { console.log("页面初次渲染完成") },
  onHide() { console.log("页面隐藏") },
  onUnload() { console.log("页面卸载") }
  mounted() { /* Vue组件挂载完成 */ }
}
```

## 二、多端兼容
### 2.1 多端兼容核心原理
UniApp 通过 "编译器 + 运行时" 双层架构实现跨端兼容：

+ **编译器**：将 Vue 代码编译为各平台原生代码（如微信小程序的 wxml/wxss/js）
    - Vue2 版基于 Webpack 实现，Vue3 版基于 Vite 实现（编译更快）
+ **运行时**：每个平台提供专属运行环境，解析编译后的代码
    - 小程序端：提供 Vue 语法转义引擎
    - App 端：提供 webview（.vue 页面）与原生（.nvue 页面）双渲染引擎
    - H5 端：扩展 Vue 运行时以支持 UniApp API

### 2.2 条件编译：处理平台差异
#### 2.2.1 基础语法
使用特殊注释标记平台专属代码，编译时仅保留目标平台代码：

```javascript
// #ifdef MP-WEIXIN
console.log('仅微信小程序可见') // 微信小程序专属逻辑
// #endif
// #ifndef H5
console.log('除H5外均可见') // 排除H5平台
// #endif
// #ifdef APP-ANDROID || APP-IOS
console.log('仅App平台可见') // 多平台适配
// #endif
```

#### 2.2.2 全场景支持
| 应用场景 | 语法示例 |
| --- | --- |
| 模板结构 | <view v-if="isMP">小程序专属内容</view> |
| 样式 | /* #ifdef H5 */ .box { margin: 10px; } /* #endif */ |
| 配置文件 | 在 pages.json 中配置平台专属窗口样式 |
| 组件引用 | // #ifdef APP-NVUE import NativeComp from '@/components/native-comp' // #endif |


#### 2.2.3 常用平台标识
| 标识 | 对应平台 |
| --- | --- |
| MP-WEIXIN | 微信小程序 |
| APP-PLUS | App 平台（含 Android/iOS） |
| H5/WEB | 网页端 |
| MP-ALIPAY | 支付宝小程序 |
| MP-BAIDU | 百度小程序 |


### 2.3 多端兼容实战技巧
#### 2.3.1 组件与 API 适配
+ **优先使用跨端组件**：基础组件（如<view>、<button>）在各平台表现一致
+ **API 兼容性判断**：使用uni.canIUse('apiName')检测 API 支持情况

```javascript
if (uni.canIUse('getLocation')) {
  uni.getLocation()
} else {
  uni.showToast({ title: '当前平台不支持定位' })
}
```

+ **扩展 API 处理**：不常用 API 需单独引入插件（如地图、支付等）

#### 2.3.2 样式兼容方案
+ **使用弹性布局**：App-nvue 平台仅支持 flex 布局，建议全平台统一使用
+ **尺寸单位**：优先使用 rpx（响应式像素），自动适配不同屏幕宽度
+ **平台样式覆盖**：通过条件编译编写平台专属样式

```css
.container {
  padding: 20rpx; /* 通用样式 */
  /* #ifdef H5 */
  padding-top: 40rpx; /* H5专属样式 */
  /* #endif */
}
```

## 三、状态管理：应用数据统一管控
### 3.1 状态管理方案选型
| 方案 | 适用场景 | 优势 |
| --- | --- | --- |
| Vuex | Vue2 项目、复杂状态依赖 | 生态成熟、支持严格模式 |
| Pinia | Vue3 项目、TypeScript 支持 | 轻量简洁、支持组合式 API |
| 全局变量 | 简单场景、临时数据 | 实现简单、无需额外依赖 |


### 3.2 Vuex 实战指南
#### 3.2.1 环境搭建
1. 安装依赖

```css
npm install vuex --save
```

2. 创建 store 目录：

```javascript
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: { /* 全局状态 */ },
  mutations: { /* 同步修改状态 */ },
  actions: { /* 异步操作 */ },
  getters: { /* 状态计算 */ },
  modules: { /* 模块拆分 */ }
})
```

1. 注册到应用：

```javascript
// main.js
import Vue from 'vue'
import App from './App'
import store from './store'
const app = new Vue({
  store, // 注入全局
  ...App
})
app.$mount()
```

#### 3.2.2 核心功能实现
+ **状态定义与访问**：

```javascript
// store/index.js
state: {
  userInfo: null, // 用户信息
  count: 0        // 计数器
},
getters: {
  isLogin: state => !!state.userInfo // 计算登录状态
}
// 组件中访问
computed: {
  ...mapState(['count']),
    ...mapGetters(['isLogin'])
}
```

+ **状态修改**：

```javascript
// store/index.js
mutations: {
  setUserInfo(state, info) {
    state.userInfo = info // 同步修改
  },
  increment(state) {
    state.count++
  }
},
actions: {
  // 异步登录
  login({ commit }, userData) {
    return new Promise(resolve => {
      uni.request({
        url: '/api/login',
        data: userData,
        success: res => {
          commit('setUserInfo', res.data)
          resolve(true)
        }
      })
    })
  }
}
// 组件中调用
methods: {
  ...mapMutations(['increment']),
    async handleLogin() {
    await this.$store.dispatch('login', { username: 'test' })
  }
}
```

### 3.3 Pinia 实战指南
#### 3.3.1 环境搭建
1. 安装依赖

```basic
npm install pinia --save
```

2. 创建 store：

```javascript
// store/index.js
import { createPinia } from 'pinia'
const store = createPinia()
export default store
// store/modules/user.js
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({ userInfo: null }),
  getters: {
    isLogin: state => !!state.userInfo
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = info
    }
  }
})
```

1. 注册到应用：

```javascript
// main.js
import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return { app }
}
```

#### 3.3.2 数据持久化
结合 UniApp 存储 API 实现状态持久化：

```javascript
// store/modules/user.js
export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: uni.getStorageSync('userInfo') || null
  }),
  actions: {
    setUserInfo(info) {
      this.userInfo = info
      uni.setStorageSync('userInfo', info) // 持久化存储
    },
    logout() {
      this.userInfo = null
      uni.removeStorageSync('userInfo') // 清除存储
    }
  }
})
```

### 3.4 登录状态管理最佳实践
实现 "登录 - 保持 - 退出" 完整流程：

1. **登录流程**：
    - 调用登录接口获取用户信息
    - 通过 mutation/action 更新状态
    - 持久化存储到uni.setStorageSync
1. **状态保持**：
    - 应用启动时从uni.getStorageSync读取状态
    - 在App.vue的onLaunch生命周期初始化
1. **权限控制**：
    - 路由拦截：在pages.json中配置需要登录的页面
    - 组件内判断：通过isLogin状态控制内容显示

## 四、性能优化：打造高性能跨端应用
### 4.1 基础优化策略
#### 4.1.1 图片优化
+ **格式选择**：优先使用 WebP 格式（比 JPG 小 30%），App/H5 / 微信小程序均支持
+ **懒加载**：使用vue-lazyload插件实现图片延迟加载

```javascript
// main.js
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('@/assets/loading.gif'), // 加载中占位图
  error: require('@/assets/error.png')      // 加载失败占位图
})
// 组件中使用
<image v-lazy="imageUrl" mode="widthFix"></image>
```

+ **尺寸适配**：使用srcset属性提供多尺寸图片，避免大图小用

#### 4.1.2 代码优化
+ **代码分割**：对大型组件使用异步加载

```plain
// 路由配置中异步加载页面
{
  "path": "pages/detail/detail",
  "style": {},
  "lazyCodeLoading": "requiredComponents" // 按需加载
}
```

+ **减少冗余代码**：
    - 移除未使用的组件和 API
    - 通过条件编译剔除非目标平台代码
+ **合理使用组件**：
    - 高频使用的组件注册为全局组件
    - 避免过度拆分细小组件（增加渲染开销）

### 4.2 进阶优化技巧
#### 4.2.1 渲染优化
+ **减少重绘回流**：
    - 避免频繁修改 DOM 样式，优先使用 class 切换
    - 列表渲染添加key属性，且避免使用索引作为 key
+ **虚拟列表**：长列表使用uni-ui的uni-list或第三方虚拟列表组件

```vue
<template>
  <view class="long-list">
    <virtual-list :list="dataList" :height="500"></virtual-list>
  </view>
</template>
```

+ **渲染引擎选择**：
    - 复杂交互页面使用.nvue（原生渲染）
    - 普通页面使用.vue（webview 渲染）

#### 4.2.2 网络优化
+ **请求优化**：

```javascript
// 请求缓存示例
const requestCache = new Map()
function requestWithCache(url, data) {
  const key = `${url}-${JSON.stringify(data)}`
  if (requestCache.has(key)) {
    return Promise.resolve(requestCache.get(key))
  }
  return uni.request({ url, data }).then(res => {
    requestCache.set(key, res.data)
    return res.data
  })
}
```

    - 封装请求拦截器，统一处理错误和登录态过期
    - 实现请求缓存，避免重复请求
+ **预加载**：在首页加载时预加载常用页面数据
+ **图片 CDN**：使用 CDN 加速图片加载，减少服务器压力

#### 4.2.3 包体积优化
+ **资源压缩**：
    - 图片压缩：使用 TinyPNG 等工具压缩图片
    - 代码压缩：HBuilderX 打包时勾选 "代码压缩"
+ **按需引入**：
    - UI 库按需加载（如 Uni UI 组件按需导入）
    - 第三方库使用按需引入（如 lodash-es）
+ **减小基础包体积**：
    - 非首屏页面配置为按需加载
    - 大型静态资源（如视频）使用网络链接而非本地资源

### 4.3 各平台专项优化
#### 4.3.1 小程序优化
+ **分包加载**：

```plain
// pages.json
{
  "subPackages": [
    {
      "root": "pages/sub",
      "pages": [{"path": "list/list"}]
    }
  ]
}
```

+ **避免滥用全局变量**：减少getApp()调用，优先使用状态管理
+ **优化启动速度**：
    - 首屏尽量减少网络请求
    - 避免在onLaunch中执行耗时操作

#### 4.3.2 App 优化
+ **启动优化**：
    - 关闭不必要的启动页动画
    - 延迟初始化非核心服务
+ **内存优化**：
    - 及时销毁页面中的定时器
    - 大图片使用后手动释放内存
+ **性能监控**：使用 HBuilderX 的 "性能分析" 工具监控卡顿问题

## 五、实战案例：TodoList 跨端应用
### 5.1 项目结构
```plain
├── pages
│   ├── index          # 首页（任务列表）
│   └── add            # 添加任务页
├── components
│   └── todo-item.vue  # 任务项组件
├── store
│   └── index.js       # 状态管理
└── static
    └── icons          # 图标资源
```

### 5.2 核心代码实现
#### 5.2.1 状态管理（store/index.js）
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    todos: uni.getStorageSync('todos') || []
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.unshift({
        id: Date.now(),
        content: todo,
        done: false
      })
      uni.setStorageSync('todos', state.todos)
    },
    toggleTodo(state, id) {
      const todo = state.todos.find(t => t.id === id)
      if (todo) todo.done = !todo.done
      uni.setStorageSync('todos', state.todos)
    }
  }
})
```

#### 5.2.2 任务列表组件（pages/index/index.vue）
```vue
<template>
  <view class="container">
    <view class="todo-list">
      <todo-item 
        v-for="todo in todos" 
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        ></todo-item>
    </view>
    <button class="add-btn" @click="goAdd">添加任务</button>
  </view>
</template>
<script>
  import { mapState, mapMutations } from 'vuex'
  import todoItem from '@/components/todo-item.vue'
  export default {
    components: { todoItem },
    computed: { ...mapState(['todos']) },
    methods: {
      ...mapMutations(['toggleTodo']),
      goAdd() {
        uni.navigateTo({ url: '/pages/add/add' })
      }
    }
  }
</script>
```

## 六、常见问题与解决方案
### 6.1 开发环境问题
| 问题现象 | 解决方案 |
| --- | --- |
| 微信小程序运行失败 | 1. 检查开发者工具路径配置 2. 开启开发者工具端口 |
| HBuilderX 编译卡顿 | 1. 升级到最新版本 2. 关闭不必要的插件 |
| npm 包无法引入 | 1. 检查 node 版本 2. 重新安装 node_modules |


### 6.2 跨端兼容问题
| 问题现象 | 解决方案 |
| --- | --- |
| 样式在 H5 正常但小程序异常 | 1. 使用 rpx 单位 2. 避免使用复杂 CSS 选择器 |
| API 在部分平台不支持 | 1. 使用 uni.canIUse 检测 2. 条件编译适配 |
| .nvue 页面样式异常 | 1. 仅使用 flex 布局 2. 避免使用复杂选择器 |


### 6.3 性能问题
| 问题现象 | 解决方案 |
| --- | --- |
| 列表滚动卡顿 | 1. 使用虚拟列表 2. 减少列表项复杂度 |
| 应用启动缓慢 | 1. 分包加载 2. 优化首屏资源 |
| 图片加载慢 | 1. 使用 CDN 2. 图片压缩 3. 懒加载 |


