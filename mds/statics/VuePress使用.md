## 介绍
<font style="color:rgb(60, 60, 67);">VuePress 是一个以 Markdown 为中心的静态网站生成器。</font>

<font style="color:rgb(60, 60, 67);">原理是通过vue+router实现单页面应用，内容是使用</font>[markdown-it](https://github.com/markdown-it/markdown-it)<font style="color:rgb(60, 60, 67);">插件将md文件转成html内容。构建时，vuepress，和nuxtjs一样是通过 npx generate命令将项目打包为ssr项目。</font>

## <font style="color:rgb(60, 60, 67);">安装</font>
VuePress 2.0版本

### 方式一：使用vuepress构建
默认安装最新的版本

```bash
npm init vuepress vuepress-starter
```

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753925584047-449a350c-db18-4951-8df7-211a55b12997.png)

目录结构如下:

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753926027116-23669c2f-a8d0-408b-bdf6-c88c38d58171.png)

```bash
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
│  └─ get-started.md
└─ package.json
```

### 方式二：手动创建
```bash
# 初始化
npm init
# 安装 vuepress
npm install -D vuepress@next
# 安装打包工具和主题
npm install -D @vuepress/bundler-vite@next @vuepress/theme-default@next

# 创建docs目录和docs/.vuepress目录
mkdir docs
mkdir docs/.vuepress
```

新建config.js

```javascript
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
})
```

接下来就可以在docs目录下创建md文档了，每个文档对应一个页面，目录结构如下：

```bash
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
└─ package.json
```

## 使用
### 1.常用命令
```json
"scripts": {
  "docs:dev": "vuepress dev docs",
  "docs:build": "vuepress build docs",
  "docs:clean-dev": "vuepress dev docs --clean-cache",
  "docs:update-package": "npx vp-update"
}
```

### 2.配置
#### 常用配置 config.js
```javascript
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(), // 打包配置
  // 默认主题
  theme: defaultTheme(),
  // 默认主题
  // 自定义-主题参数
  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: [{
        text: '首页',
        link: '/',
    }],
  }),
  base:'/', // base应该是一个以/开始和结束的绝对路径,部署到 https://foo.github.io/bar/，那么base应该被设置成 "/bar/"
  lang: 'zh-CN',
  head:[
    ['link', { rel: 'icon', href: '/images/logo.png' }]
  ],
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  public: `${sourceDir}/.vuepress/public`, // 默认配置无需添加和修改
  dest: './dist', // 打包到根目录dist下
})
```

#### 客户端配置 client.js
可以用来劫持路由，定制功能。

```javascript
import { defineClientConfig } from 'vuepress/client'
import MyLayout from './layouts/MyLayout.vue'
export default defineClientConfig({
  // 客户端应用创建后被调用
  enhance({ app, router, siteData }) {},
  // 组合式 API 都可以在这里使用
  setup() {},
  // 布局声明，Frontmatter语法使用
  layouts: {
    MyLayout,
  },
  // 全局组件放置在客户端Vue应用的根节点下，如全局弹窗
  rootComponents: [],
})
```

<font style="color:rgb(60, 60, 67);">Frontmatter </font>使用layout

```markdown
---
layout: MyLayout
---
```

## 主题开发
1.下载默认主题（theme-default），基于默认主题进行二次开发，从node_modules复制出来。

2.修改配置config.js，引入新主题

```javascript
// 主题入口
import { defaultTheme } from './docs/theme-default2/lib/node/index.js'
```

3.新增自定义配置：

```javascript
export default defineUserConfig({
  // 自定义字段
  customValue:"aaaa"
})

// 主题添加ts类型 shared/options.d.ts
customValue?: string | false;

// 主题組件内获取自定义参数
useThemeLocalData()
```

4.获取页面数据：

```javascript
const page = usePageData()
```

