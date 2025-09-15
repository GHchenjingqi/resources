### 一、PWA介绍
PWA，全称为**<font style="color:#2F4BDA;">Progressive</font>** Web App （渐进式web应用），是谷歌推出的一种运用现代Web技术实现的用户体验接近原生应用的Web应用程序。<font style="color:rgb(44, 44, 54);">像应用一样安装在用户的设备上，并且支持</font>**<font style="color:#DF2A3F;">离线访问</font>****<font style="color:rgb(44, 44, 54);">、推送通知</font>**<font style="color:rgb(44, 44, 54);">等功能。</font>

<font style="color:rgb(44, 44, 54);">官方文档地址：</font>[https://web.developers.google.cn/patterns/web-apps?hl=zh-cn](https://web.developers.google.cn/patterns/web-apps?hl=zh-cn)

<font style="color:rgb(44, 44, 54);">网站+PWA技术，可以实现离线时打开软件的效果。网站通过秒级安装到客户端，加载浏览器缓存实现类似原生应用的体验。</font>

<font style="color:rgb(44, 44, 54);"></font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1751524831426-113a2bd8-8c17-44ff-bb7f-2d333a58615f.png)

**特点**：

1.打开web时，地址栏出现安装应用图标，点击会直接安装到设备

2.控制台应用里的service workers 会显示已注册

3.控制台缓存里存在离线缓存数据

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1751524991842-c9b50e03-0435-45ba-9642-ae2e7932515f.png)

**<font style="color:rgb(44, 44, 54);">优点</font>**<font style="color:rgb(44, 44, 54);">：</font>

<font style="color:rgb(44, 44, 54);">1.跨平台兼容性强，一套web代码多端兼容；</font>

<font style="color:rgb(44, 44, 54);">2.无需安装，节省空间，比electron体积小的多；</font>

<font style="color:rgb(44, 44, 54);">3.免上架应用市场，免平台税；</font>

<font style="color:rgb(44, 44, 54);">4.离线访问，没有网络也可以使用。</font>

**<font style="color:rgb(44, 44, 54);"></font>**

**<font style="color:rgb(44, 44, 54);">缺点：</font>**

<font style="color:rgb(44, 44, 54);">1.功能限制，web应用对硬件访问蓝牙/nfc有缺陷。</font>

<font style="color:rgb(44, 44, 54);">2.网络依赖，首次打开必须有网络条件；</font>

<font style="color:rgb(44, 44, 54);">3.无应用市场，曝光量不足。</font>

<font style="color:rgb(44, 44, 54);">4.性能不足，不如原生应用。</font>

<font style="color:rgb(44, 44, 54);"></font>

### <font style="color:rgb(44, 44, 54);">二、实现一个PWA</font>
#### 1.创建<font style="color:rgb(44, 44, 54);">Manifest文件</font>
<font style="color:rgb(44, 44, 54);">Web应用元数据的一个JSON文件，包括应用名称、图标、开始URL等信息。</font>

```json
{
  "name": "My PWA Application",  // 应用的名字，会在添加到主屏幕时显示
  "short_name": "PWA",  // 短名字，在空间有限时使用
  "start_url": ".",  // 启动路径，默认是当前目录
  "display": "standalone",  // 显示模式：fullscreen, standalone, minimal-ui, browser
  "background_color": "#ffffff",  // 背景颜色，在启动画面和浏览器UI中使用
  "theme_color": "#0000ff",  // 主题颜色，通常用于浏览器的地址栏或工具栏
  "description": "An example Progressive Web App.",  // 应用描述
  "icons": [
    {
      "src": "/images/icons/icon-192x192.png",  // 图标路径
      "sizes": "192x192",  // 图标尺寸
      "type": "image/png"  // MIME类型
    },
    {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "orientation": "any",  // 屏幕方向：any, natural, landscape, landscape-primary, landscape-secondary, portrait, portrait-primary, portrait-secondary
  "scope": "/",  // 定义应用的范围，即哪些页面可以被视为PWA的一部分
  "lang": "en-US",  // 应用的语言环境
  "dir": "ltr",  // 文本的方向：ltr（从左到右），rtl（从右到左）
  "related_applications": [],  // 相关的原生应用程序列表
  "prefer_related_applications": false  // 是否优先使用相关的原生应用
}
```

基础版：

```json
{
  "name": "My PWA Application",
  "short_name": "PWA",
  "start_url": ".",
  "display": "fullscreen",
  "background_color": "#ffffff",
  "description": "An example Progressive Web App.",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "icons/manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "icons/manifest-icon-192.maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "icons/manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "icons/manifest-icon-512.maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ]
}
```

icons图标可以使用pwa-asset-generator（[https://github.com/elegantapp/pwa-asset-generator](https://github.com/elegantapp/pwa-asset-generator)） 插件生成，再从终端拷贝icon集合

```bash
// 安装
npm install pwa-asset-generator
// 执行,将logo.png处理为不同分辨率并拷贝到icons里面
npx pwa-asset-generator logo.png icons
```

在html的head引入mainfest.json

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="manifest" href="manifest.json">
  </head>
```

#### <font style="color:rgb(44, 44, 54);">2.引入service worker 服务工作者</font>
可以使用下面的文件，也可以使用第三方服务工作者库**<font style="color:rgb(44, 44, 54);">Workbox </font>**

```javascript
// 离线缓存名称
const CACHE_NAME = 'my-app-cache-v1';
// 离线缓存的文件
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

// 配置：决定使用网络优先还是缓存优先策略
const cacheStrategy = 'network-first' // 或者 'cache-first'

// 安装阶段：缓存必要的资源
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // 强制激活新版本
});

// 激活阶段：清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim(); // 立即控制所有页面
});

// 请求拦截：使用缓存策略响应请求
self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  event.respondWith((async () => {
    if (cacheStrategy === 'network-first') {
      // 尝试从网络获取最新内容，失败后使用缓存
      try {
        const responseFromNetwork = await fetch(request);
        return responseFromNetwork;
      } catch (error) {
        const responseFromCache = await caches.match(request);
        if (responseFromCache) return responseFromCache;
        if (request.destination === 'document') return caches.match('/');
      }
    } else if (cacheStrategy === 'cache-first') {
      // 先尝试从缓存中获取，如果不存在则从网络获取
      const responseFromCache = await caches.match(request);
      return responseFromCache || fetch(request);
    }
  })());
});
```

#### 3.主页面加载sw
```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  });
}
```



demo地址：[https://github.com/GHchenjingqi/PWA](https://github.com/GHchenjingqi/PWA)，其他更深入用法，比如分享**<font style="color:rgb(55, 71, 79);background-color:rgb(241, 243, 244);">navigator.share()。</font>**

归根结底依旧是通过js调用 **<font style="color:#601BDE;">navigator</font>** 对象([https://developer.mozilla.org/en-US/docs/Web/API/Navigator](https://developer.mozilla.org/en-US/docs/Web/API/Navigator))的可用API实现应用的功能。

```plain

```

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1751530051708-64f156e4-8b4c-47fe-8384-249646aa95d2.png)

