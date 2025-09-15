## 简介 - 是什么？
nuxtjs <font style="color:rgb(44, 44, 54);">简化了 Vue.js 应用的开发过程，可以帮助开发者</font>**<font style="color:#DF2A3F;">高效构建SPA/SSR应用</font>**<font style="color:rgb(44, 44, 54);">。同时也兼具</font><font style="color:#DF2A3F;">后端开发</font><font style="color:rgb(44, 44, 54);">能力，也就是说Nuxtjs是一个全栈开发框架。</font>

<font style="color:rgb(44, 44, 54);">官网：</font>[https://nuxt.com/docs/4.x/getting-started/installation](https://nuxt.com/docs/4.x/getting-started/installation)

### - SPA 
spa是单页面应用，又称客户端渲染CSR

### - MPA
mpa是多页面应用，又称服务端渲染SSR



## 优势 - 为什么用？
nuxtjs 有助于网站**<font style="color:#2F8EF4;">SEO</font>**网络引擎优化。

## <font style="color:rgb(44, 44, 54);">安装 - 如何用？</font>
下面是Nuxtjs 4.0+ 版本使用命令：

```bash
# 注意node环境
npm create nuxt <project-name>
# vscode打开项目
code <project-name>
```

Nuxtjs4.0与3.0版本的区别？

+ 目录结构，4.0前端相关目录都在app目录下，3.0都在根目录下，目录结构更清晰。



### 1.components 定义组件
在components目录下的插件默认是全局组件，可以不需要引入，直接在项目中使用。

例如：

```vue
<template>
  <div>
    header <slot>xxx</slot>
  </div>
</template> 
```

使用：

```vue
<template>
  <div>
    <Header>头部</Header>
  </div>
</template>
<script setup lang="ts">
</script>
```

#### 多层级组件
多目录层级的组件，可以用驼峰式 BaseMenus，或破折号使用  base-menus 。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753352971120-bd2ecb60-2cc9-4be9-886f-d365aed74820.png)

```html
<Main class="flex-aic-jcfs">
    <BaseLogo :options="headerObj" />
    <BaseMenus :options="headerObj.menus" />
    <BaseLogin />
</Main>
```

#### 内置组件
常用的ClientOnly - 客户端渲染、Teleport、NuxtTime、NuxtLayout、NuxtLink、NuxtIsland - 纯静态组件、NuxtImg，更多组件：**<font style="color:rgb(255, 255, 255);"></font>**[https://nuxt.com/docs/4.x/api/components/client-only](https://nuxt.com/docs/4.x/api/components/client-only)

### 2.pages 路由
在pages目录创建的页面等于就开启了路由。基于目录结构创建动态路由。

如果删掉app.vue,在pages创建index.vue，恭喜你创建了多页面应用！

#### 动态模版
针对动态路由 /article?id=2 或 /article/2  可以创建 article目录，里面 [id].vue 这样表示动态模版页。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753352766171-b9ac6ff5-af8a-4b14-98ee-44e690048721.png)

动态参数获取：

```bash
const route = useRoute()
const id = route.params.id
```

#### 路由跳转
+ a 链接，使用NuxtLink跳转

```vue
<NuxtLink to="/about">About</NuxtLink>
```

+ js里使用 navigateTo跳转

```vue
navigateTo('/login')
```

### 3.layout布局
如果在前端目录创建layouts文件夹，新建default.vue 页面。那整个项目默认会自动嵌套在layouts里面。这对开发后台应用很有利。换句话说，app.vue没有使用 NuxtLayout 组件，但是有layouts/default目录文件，也会自动生效。

```vue
<template>
  <div class="def-layout">
    <slot />
  </div>
</template>
```

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753409123250-da07f240-285a-4d07-99db-c1160e6eb8c7.png)

#### 动态布局Layout
使用 NuxtLayout 内置组件实现 layout切换，指定layout的name属性。

我们先layouts目录先创建一个home.vue的文件:

```vue
<template>
  <div class="home-layout">
       <slot />
  </div>
</template>
```

在首页使用NuxtLayout并动态指定模板名称。不能直接写死name，否则不生效。

```vue
<template>
    <Header />
      <NuxtLayout :name="layoutName">
        <Home />
      </NuxtLayout>
    <Footer />
</template>
<script setup>
  const layoutName = 'home'
</script>
```

### 4.Store状态
#### useState
useState 是 Nuxt 3 提供的一个组合式 API，用来创建**<font style="color:#7E45E8;">跨组件、跨请求持久化</font>**的响应式状态。它本质上是一个基于 useStateAsync 和 ref 的封装。

```vue
<template>
  <div>
    <p>当前计数: {{ counter }}</p>
    <button @click="counter++">增加</button>
  </div>
</template>

<script setup>
const counter = useState('counter', () => 0)
</script>
```

跨组件共享：

```javascript
// 组件A.vue 
const user = useState('user', () => ({ name: '匿名' }))
// 组件B.vue 
const sameUser = useState('user') // 访问相同状态
```

### 5.SEO优化
#### 全局配置
全局使用head在配置文件（nuxt.config.ts）中添加配置，但是这种优先级低，会被页面的 useHead 配置覆盖。

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      title: '默认标题',
      titleTemplate: '%s - 我的网站',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '默认网站描述' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        { src: '/global-script.js' }
      ]
    }
  }
})
```

#### 页面配置
在页面setup里使用hook，自定义当前页面的head信息，会替换配置文件中全局的head信息。

+ **useHead 用于修改head的任何内容**

```javascript
useHead({
  title: 'My App',
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
})
```

+ **useSeoMeta 可以修改TDK相关内容**

```javascript
useSeoMeta({
  title: 'My Amazing Site',
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
```

### 6.server 服务端
在根目录server创建api目录，里面新增一个testapi.js（目录结构：server/api/testapi.js），定义接口需要通过**<font style="color:#2F8EF4;">defineEventHandler</font>**函数，返回接口内容，如下：

```javascript
export default defineEventHandler(event =>{
  return  {
    code:200,
    data: [],
    message: 'success',
  }
})
```

在地址栏访问[http://localhost:3000/api/testapi](http://localhost:3000/api/testapi) 就可以测试接口返回内容。

#### getQuery
获取url中的**<font style="color:#E4495B;">query参数</font>**方法，通过nuxtjs提供的 **<font style="color:#E4495B;">getQuery</font>** 得到所有的参数对象。

```javascript
export default defineEventHandler(event =>{
  // 获取参数
  let query = getQuery(event)
  return  {
    code:200,
    data: query.id,
    message: 'success',
  }
})
```

这时，通过 url传参访问 [http://localhost:3000/api/testapi?id=65](http://localhost:3000/api/testapi?id=65)，就得到下面响应内容：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753163380451-ae2df826-0c72-423a-8cda-1b5806b44184.png)

#### readBody
获取post请求body中的参数使用**readbody**获取。与query参数不一样的是**readbody需要**异步获取。

```javascript
export default defineEventHandler(async (event) => {
  // 读取请求体
  const body = await readBody(event)
  const a = body.username
})
```

### 7.常用hook
vue3、vue-router、Pinia等插件使用方式，不需要单独import引入，可以直接使用hook函数，如下：

```javascript
// pinia
const store = useUserStore()
const {  loginhandler } = store
// vue-router
const route = useRoute()
const id = route.params.id 
```

#### $fetch 请求
用于<font style="color:rgb(64, 64, 64);">发起 GET/POST/PUT 等 HTTP 请求，类似与ajax,axios。</font>

特点：<font style="color:rgb(64, 64, 64);">纯数据获取，</font>**<font style="color:rgb(64, 64, 64);">不处理</font>**<font style="color:rgb(64, 64, 64);">响应缓存或 SSR 优化，可在</font>**<font style="color:rgb(64, 64, 64);">任意地方</font>**<font style="color:rgb(64, 64, 64);">使用（组件、Store、API 路由）。</font>

```javascript
const data = await $fetch('/api/data');
```

#### <font style="color:rgb(64, 64, 64);">useAsyncData</font>
用于**<font style="color:#117CEE;">管理异步数据</font>**状态，专为 Nuxt 的 SSR 优化设计。

特点：**<font style="color:#DF2A3F;">包装</font>**异步逻辑（不限于 HTTP 请求，可以是任何 async 操作），**<font style="color:#DF2A3F;">避免重复获取数据</font>**（通过唯一 key 缓存）。

注意：必须用在组件 setup() 或生命周期钩子中。 提供加载状态 (pending)、错误处理 (error)、刷新 (refresh)

```javascript
const res = await useAsyncData('key',async fn)

// 例如
const { data: articals ,pending, error, refresh } = await useAsyncData(
  'artical', // 唯一标识
  async () => {
    const { data } = await $fetch(`/api/artical`, { 
        method: 'get', 
        params: { id: id }
    })
    return data
})
```

#### useFetch
URL 请求的简化版 useAsyncData，内部组合了 useAsyncData 和 $fetch。 自动生成唯一 key（基于 URL 和请求参数）。

特点：代码更简洁，适合纯 HTTP 请求场景，支持与 useAsyncData 相同的状态 (data, pending, refresh 等)。

```javascript
const { data, pending, error, refresh } = useFetch('/api/data');
```

#### useCookie
优雅的使用cookie。[https://nuxt.com/docs/4.x/api/composables/use-cookie](https://nuxt.com/docs/4.x/api/composables/use-cookie)

```javascript
const counter = useCookie('counter')
counter.value = counter.value || Math.round(Math.random() * 1000)
```

更多hook查阅文档：[https://nuxt.com/docs/4.x/api/composables/on-prehydrate](https://nuxt.com/docs/4.x/api/composables/on-prehydrate)

## 部署 - 如何部署
### 1.纯静态网站
执行打包：

```bash
npm run generate
# 或运行
nuxt generate
```

然后将dist目录内容扔到静态服务器根目录即可！例如，PhpStudy环境下。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753346358919-e1e2b082-e8f7-4a71-9812-c1db7161e118.png)

对于纯静态的网站，就需要对前后端进行部署，推荐下面2种方案。

### 2.前后端docker
a.在项目根目录下，创建docker构建文件和忽略文件，如下。

Dockerfile内容：

```bash
# 使用 Node 22 官方镜像（基于 Debian）
FROM node:22-bookworm

# 设置工作目录
WORKDIR /app

# 1. 复制包管理文件
COPY package.json package-lock.json ./

# 2. 安装依赖（包含构建工具）
RUN npm install

# 3. 复制其他文件
COPY . .

# 4. 构建应用
RUN npm run build

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", ".output/server/index.mjs"]
```

.dockerignore内容：

```bash
node_modules
.nuxt
.output
.DS_Store
dist
*.log
.env
.git
```

b.执行构建命令：一定要注意node版本，不然会报错！nuxt4.0要求node20+

```bash
docker build --no-cache -t nuxt-app .
```

c.运行docker容器：

```bash
docker run -p 3000:3000 -e NUXT_PUBLIC_API_BASE=your_api_url nuxt-app
```

### 3.前后端pm2 +node
a.项目执行

```bash
npm run build
# 或运行
nuxt build
```

b.运行前端服务

```bash
node .output/server/index.mjs
```

c.全局安装PM2，并运行后端服务

```bash
# 全局安装
npm install -g pm2
# 运行后端服务
pm2 start .output/server/index.mjs --name "nuxt-app"
# 保存当前进程列表,下面命令式服务器配置
pm2 save
# 开机唤醒进程
pm2 startup
```

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753352436650-294a0125-db3e-40da-983b-e817ee5baf02.png)

## 问题 - 怎么办？
### 1.<font style="color:rgb(38, 38, 38);">为什么nuxt build之后前后端启动都指向了 .output/server/index.mjs？</font>
+ 架构设计：全栈一体化。打包后，静态资源 - public ；服务端 - server
+ 服务端渲染（SSR）工作流。在<font style="color:rgb(64, 64, 64);">当访问任意路由时：请求首先到达index.mjs，该文件判断请求类型：</font>
    - <font style="color:rgb(64, 64, 64);">如果是静态资源 → 返回 .output/public 中的文件</font>
    - <font style="color:rgb(64, 64, 64);">如果是 API 路由 → 执行对应的 API 处理器</font>
    - <font style="color:rgb(64, 64, 64);">如果是页面路由 → 执行 Vue SSR 渲染</font>

<font style="color:rgb(64, 64, 64);"></font>

<font style="color:rgb(64, 64, 64);">原理：</font><font style="color:rgb(64, 64, 64);">Nuxt 3+ 使用 Nitro 作为服务端引擎：编译时会将 页面路由（</font>`**<font style="color:rgb(64, 64, 64);background-color:rgb(236, 236, 236);">/pages/**</font>**`<font style="color:rgb(64, 64, 64);">）、服务端路由（</font>`**<font style="color:rgb(64, 64, 64);background-color:rgb(236, 236, 236);">/server/api/**</font>**`<font style="color:rgb(64, 64, 64);">）、服务端中间件都打包进index.mjs。以下是核心逻辑：</font>

```javascript
// 伪代码示意
export default async function handleRequest(event) {
  // 1. 先尝试匹配API路由
  if (event.path.startsWith('/api')) {
    return handleAPIRequest(event)
  }

  // 2. 再尝试返回静态文件
  if (await serveStaticAsset(event)) {
    return
  }

  // 3. 最后执行SSR渲染
  return renderSSRPage(event)
}
```

### 2.如何全局引入css？
nuxt.config.ts 文件内，添加全局css配置：

```javascript
export default defineNuxtConfig({
  css: [
    '@/assets/css/ui.css',
  ]
})
```

单页面应用，也可以在app.vue里面引入。

```html
<script>
  import('@/assets/css/first.css')
</script>
// 或
<style>
  @import url("~/assets/css/second.css");
</style>
```

### 3.如何全局引入插件，例如pinia？
npm安装插件

```javascript
npm i pinia @pinia/nuxt
```

nuxt.config.ts 文件内，添加全局配置

```javascript
export default defineNuxtConfig({
  modules: ['@pinia/nuxt']
})
```

