### 1.VUE3环境安装篇

#### 安装vue脚手架 vue-cli

```
npm install -g @vue/cli
```

查看脚手架版本

```
vue -V
```

创建项目

```
vue create 项目名
```

选择手动安装（同时选上 vuex,router,TS)，自动安装vue3只有vue3，不同选其他的vuex，路由等。

目录说明

- node_modules 依赖模块

- public 公共静态资源
- src 源代码文件
- package.json 项目配置依赖



安装axios出现异常报错：“code ERESOLVE，ERESOLVE could not resolve”。解决办法，安装命令后面加 -legacy-peer-deps，如下：

```
npm install axios -legacy-peer-deps
```

#### **指定启动端口**

在vue.config.js里面新增devServe属性，如下：

```js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: '8088',
    host: 'localhost'
  }
})
```

#### **安装使用 elementPlus** 

```
npm install element-plus --save -legacy-peer-deps
```

使用elementplus

在main.ts 加入

```TS
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).mount('#app')
```

#### **安装使用elementplus-icon**

```
npm install @element-plus/icons-vue --save -legacy-peer-deps
```

在main.ts 加入

```js
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
// 一定要在创建之后遍历添加组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus).use(store).use(router).mount('#app')
```

#### 动态引入图片问题

动态require引入图片时报错,vue3不能使用require引入图片，可以改成 import，如下：

```js
import Logo from '../assets/images/logo.png'
```

并在shims-vue.d.ts 文件设置全局可识别

```ts
// 解决TS不识别的文件类型
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明图片文件可使用
declare module '*.png'
declare module '*.jpg'
declare module '*.gif'
```

### 2.实战问题篇

#### 计算属性获取动态参数

设置动态路由

```js
{
    path: '/content/:name',
    name: 'content',
    component: () => import('../views/ContentView.vue')
},
```

获取动态参数

```js
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'ContentView',
  setup () {
    const route = useRoute()
    // 计算属性 箭头函数
    const title = computed(() => {
      return route.params.name
    })
    return {
      title
    }
  }
})
```

#### 设置404路由

```js
{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFind.vue')
}
```

#### 异常报错：

error Extra semicolon semi

解决办法：检测是否有 分号存在";"

#### 搜索框之外点击关闭

修饰符 @click.prevent.self  ，点击输入框不关闭，点击背景关闭

```html
<div class="LayerBoom" @click.prevent.self="closeEvent">
    <div class="layer-center" v-if="position == 'center'">
        <slot name="center"></slot>
    </div>
</div>
```

#### VUE3添加debugger无效，如何解决？

vue.config.js 配置：

```js
configureWebpack: {
    // 加入如下配置
    devtool: 'source-map'
}
```

如何代码加了debugger报错，在rules规则里面新增：

```js
"rules": {
      "no-debugger": "off"
}
```

#### vue3嵌套路由配置之后，页面显示空白？

嵌套路由的父页面需要使用 router-view组件进行渲染子路由的内容。

```vue
 <router-view></router-view>
```

#### vue3自定义ref 实现防抖

```js
import { customRef } from "vue";
export function debounceRef(value, duration = 1000) {
  let timer: number
  return customRef((track, trigger) => {
    return{
      get() {
        // 收集依赖
        track()
        return value
      },
      set(values) {
        // 派发更新
        clearTimeout(timer)
        timer = setTimeout(() => {
          trigger()
          value = values
        }, duration)
      }
    }
  })
}
```

