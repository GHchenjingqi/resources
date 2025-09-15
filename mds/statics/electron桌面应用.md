## 构建方式
### 必备环境
+ 安装node.js

```javascript
node -v
v16.14.2
```

### 方式一：官方传统SSR
官方地址：[https://www.electronjs.org/](https://www.electronjs.org/)

中文地址：[https://electron.nodejs.cn/](https://electron.nodejs.cn/)

#### 1.初始化安装，需要注意入口文件为 main.js（默认安装入口为：index.js)
```bash
npm init 
```

#### 2.安装依赖
```bash
npm install electron --save-dev 
// 或
yarn add electron
// 或
cnpm install --save-dev electron
```



#### 3.修改package.json文件
环境改为“devDependencies”，以及入口命令改为 "electron ."。

```javascript
"scripts": {
    "start": "electron ."
}
```



#### 4.新建入口文件main.js 和index.html
main.js配置以下代码：

```javascript
const { app, BrowserWindow } = require('electron')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})
```

#### 5.启动应用
```bash
npm run start
```

这样就启动了一个简单的应用了。



#### 6.打包步骤
官方打包工具需要node最低版本是14x，不然导入打包工具时会报错。以下是node的各个版本地址，下载指定版本安装即可完成升级或降级：

安装打包工具

```bash
npm install --save-dev @electron-forge/cli
npx electron-forge import
```

执行打包命令

```bash
npm run make
```



### 方式二：vue项目加入electron
#### 1.安装electron
```bash
npm install electron --save-dev
```

#### 2.根目录创建electron文件夹及main.js
```javascript
import { app, BrowserWindow } from 'electron';
import { fileURLToPath } from 'url';
import path from 'path';

let mainWindow;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
    //   preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false, // 如果需要使用 Node.js API，需禁用隔离
    },
  });

  // 加载 Vite 开发服务器或生产环境的静态文件
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173'); // Vite 默认开发服务器端口
    mainWindow.webContents.openDevTools(); // 打开开发者工具（可选）
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html')); // 生产环境加载打包后的文件
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
```

#### 3.修改package.js
加入electron入口地址和启动脚本

```javascript
"main": "electron/main.js",
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "electron:dev": "electron .", 
    "start": "npm run build && electron ."
},
```



#### 4.修改vite配置
资源路径改为相对路径，build包地址指定及端口地址指定。

```javascript
export default defineConfig({
  base: './',
  build: {
    outDir: 'dist', // 输出目录
    emptyOutDir: true, // 清空输出目录
  },
  server: {
    port: 5173, // 确保与 Electron 中的端口号一致
  },
})
```

#### 5.打包步骤
安装`<font style="color:rgb(44, 44, 54);">electron-builder</font>`<font style="color:rgb(44, 44, 54);">插件</font>

```bash
npm install electron-builder --save-dev
```

修改package.js （使用前删掉备注，json不允许备注）

```json
"build": {
  "appId": "com.example.myapp",
  "files": [
    "dist/**/*",
    "electron/**/*"
  ],
  "directories": {
    "output": "release"
  },
  "win": {
    "icon": "public/icon.ico", // 图标
    "target": [
      {
        "target": "nsis", // win包exe类型 x64内核
        "arch": [
          "x64"
        ]
      }
    ]
  },
  "nsis":{  // win包配置
    "oneClick": false, // 显示安装向导界面，不是一键安装
    "perMachine": true, // 允许每台机器安装一次
    "allowToChangeInstallationDirectory": true  // 允许选择安装目录
  },
},
  "main": "electron/main.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "electron:dev": "electron .", 
    "start": "npm run build && electron .",
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
  },
```

#### 6.实现热重载
##### electronmon
每次修改调试都需要重新运行命令，这个时候就适合使用热重载插件：electronmon。

安装：

```bash
npm install electronmon --save-dev
```

修改package.js

```bash
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "electron:dev": "electronmon .",
    "start": "npm run build && electron .",
    "pack": "electron-builder --dir",
    "dist": "electron-builder"
}
```

这种热更新只针对 electron目录代码生效。

##### nodemon
安装：

```bash
npm install nodemon --save-dev
```

根目录 nodemon.json配置文件

```json
{
  // 忽略目录
  "ignore": [
    "dist",
    "release",
    "node_modules",
    "public"
  ],
  // 重新编译快捷键 - r
  "restartable":"r",
  // 监听哪些
  "watch": ["*.*"],
  // 监听文件后缀
  "ext": "html,js,css,vue",
  // node环境变量
  "exec": "node --experimental-vm-modules --no-warnings"
}
```

修改package文件

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "electron:dev": "nodemon --exec electron .",
  "start": "npm run build && electron .",
  "pack": "electron-builder --dir",
  "dist": "electron-builder"
}
```

开发运行：

```json
npm run electron:dev
```

### 方式三：使用electron-vite
electron官方出品[https://cn.electron-vite.org/](https://cn.electron-vite.org/)

#### 1.前提条件
electron-vite 需要 Node.js 版本 18+， Vite 版本 4.0+

#### 2.安装命令
```bash
# 安装
npm i electron-vite -D
# 创建
npm create @quick-start/electron@latest
yarn create @quick-start/electron
pnpm create @quick-start/electron

#或者直接拉取安装
npx degit alex8088/electron-vite-boilerplate electron-app
cd electron-app
npm install
npm run dev
```

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1745543589931-f167e33d-b990-4fb6-ab5a-9256124bfeb3.png)

#### 3.子窗口打开路由方案
官方提供的方式如下，但是这种写法打完包build之后会出现问题，子窗口无法打开路由只可以显示当前页面，需要给loadFile传递第二个路由参数（**<font style="color:#DF2A3F;">vue/react必须是hash路由</font>**）：

```javascript
if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
  let url = process.env['ELECTRON_RENDERER_URL']+`/#${routepath}`
  childWin.loadURL(url)
} else {
  // 官方写法：childWin.loadFile(path.join(__dirname, `../renderer/index.html`))
  childWin.loadFile(path.join(__dirname, `../renderer/index.html`), { hash: routepath })
}
```

## 核心知识
### 1.进程模型
+ <font style="color:rgb(28, 30, 33);">主进程：electron主进程使用 </font>[<font style="color:rgb(2, 131, 153);">BrowserWindow</font>](https://electron.nodejs.cn/docs/latest/api/browser-window)<font style="color:rgb(28, 30, 33);"> 模块创建和管理应用窗口。因此main.js就是electron的主进程文件。</font>
+ <font style="color:rgb(28, 30, 33);">渲染进程：Electron 应用每个打开的 </font>`<font style="color:rgb(28, 30, 33);background-color:rgb(246, 247, 248);">BrowserWindow</font>`<font style="color:rgb(28, 30, 33);">窗口就会生成一个渲染进程。业务功能都是在渲染进程文件中实现（vue项目的views/传统项目的html/js）。</font>
+ <font style="color:rgb(28, 30, 33);">预加载脚本（preload.js）：主进程与渲染进程之间的通信桥梁。在渲染进程执行，同时在窗口文件执行前执行，通常用于定义全局数据。</font>



程序执行顺序：**<font style="color:#117CEE;">node主进程 => preload预加载 => 渲染进程</font>**

### 2.进程通信
##### 主进程设置全局变量
通过预加载文件传递至渲染进程。

```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  // 主进程=> 渲染进程 定义全局变量
  systemData:{
    node_version: process.versions.node,
    chrome_version: process.versions.chrome,
    electron_version: process.versions.electron,
  }
})
```

渲染进程获取：

```javascript
import { computed, ref } from 'vue';
const system = computed(()  => {
    return electron.systemData
})
console.log(system)
```

##### 渲染进程与主进程通信 invoke <=> handle
主进程main.js设置管道ipcMain及事件监听

```javascript
 ipcMain.handle('file-read', (event,data) => {
    return fs.readFileSync('D:/hello.txt',data).toString()
 });
```

preload.js如下：

```javascript
const { contextBridge, ipcRenderer } = require('electron');
// 全局API
contextBridge.exposeInMainWorld('electron', {
  // invoke 双向通信，既能发送，也能接收
  readFile: ()=>{
    return ipcRenderer.invoke('file-read');
  }
});
```

页面向主进程通信，调用electron的API

```javascript
const read = async () => {
  let res = await electron.readFile("123")
}
```



##### 渲染进程单向通信主进程 send => on
渲染页面：

```javascript
<button @click="texthandle">写入123456到a.text</button>

const text = () => {
    electron.saveFile("123")
}
```

预加载文件：

```javascript
contextBridge.exposeInMainWorld('electron', {
  // 渲染进程单向调用预加载脚本 => 预加载触发主进程监听事件 =>  主进程执行
  saveFile: (data)=>{
    ipcRenderer.send('file-save', data);
  }
})
```

主进程：

```javascript
import fs from 'fs';
// 监听渲染进程发送的消息(主进程接收)
ipcMain.on('file-save', (event,data) => {
  // 写入到d盘文件中
  fs.writeFileSync('D:/hello.txt',data)
});
```

##### 主进程单向与渲染进程通信 send => on
主进程加载注册监听事件，注意一定要在did-finish-load回调里，不然渲染进程无法接受到。

```javascript
// 主进程发消息，在加载页面前注册监听事件
mainWindow.webContents.on('did-finish-load', () => {
  console.log('did-finish-load');
  mainWindow.webContents.send('main-msg','我是主进程，发送123456');
});
```

预加载文件添加调取主进程的方法：

```javascript
contextBridge.exposeInMainWorld('electron', {
  // 定义渲染页面调用方法
  getMainMsg:(callback)=>{
    ipcRenderer.on('main-msg', (event, message) => {
      callback(message);
    });
  }
})
```

渲染进程获取主进程数据：

```vue
const mainMsg = ref('');
onMounted(() => {
    // 组件挂载时注册监听
    electron.getMainMsg((message) => {
      mainMsg.value = message; // 更新响应式变量
    });
});
```

##### 渲染进程之间通信
渲染页面1设置参数 通过send传递给main主进程，main主进程通过窗口 mainWindow.webContents.send 将数据传递出管道，渲染页面2通过on监听主进程管道事件，从而实现渲染进程之间通信。

```javascript
// set.vue 渲染页面1发送数据
const save = async () => {
  await api.send('set-menu-md', showMD )
  sendMSG('保存成功', 'success')
}

// 主进程监听及传递管道数据  
ipcMain.on('set-menu-md',async (_,flag) => {
  mainWindow.webContents.send('set-menu-flag',flag)
});

// menu.vue 页面 获取主进程传递的数据
window.api.on("set-menu-flag" ,async (_, flag) => {
  console.log('set-menu-flag',flag)
  status = flag
  initMenus(status)
})
```

### 3.窗口设置
##### 常用属性
通过BrowserWindow创建窗口的时候可以设置窗口的属性：

```javascript
new BrowserWindow({
  width: 800, // 窗口宽度 minWidth | maxWidth
  height: 600, // 窗口高度 minHeight | maxHeight
  resizable: false, // 窗口禁止缩放
  show:true, // 是否显示
  x: 0, // 窗口位置x轴,单位px
  y: 0, // 窗口位置y轴,单位px

  hasShadow:false, // 是否有阴影
  backgroundColor: 'red',  // 窗口背景色
  autoHideMenuBar: true,  // 隐藏窗口菜单
  
  webPreferences: { // 预加载文件设置
    preload: path.join(__dirname, 'preload.js'),
    contextIsolation: true, // 必须启用上下文隔离，不然无法
    nodeIntegration: false, // 禁用 Node.js 集成
  },
})
```

##### 窗口样式设置
+ a.默认窗口：左边icon+title，右边关闭缩小操作按钮
+ b.无标题，无关闭缩小放大操作按钮

通过**<font style="color:#DF2A3F;">titleBarStyle</font>**设置，**<font style="color:#DF2A3F;">会导致窗口无法移动，窗口内点击事件无法触发</font>**！

```javascript
new BrowserWindow({
   titleBarStyle: 'hidden', // 隐藏标题栏及缩小关闭操作按钮
})
```

解决办法一：给窗口元素添加可拖拽样式-webkit-app-region: drag，子元素（需交互的元素）将拖拽移除。

```css
#app{
  -webkit-app-region: drag;
}
.content {
  -webkit-app-region: no-drag;
}
```

解决办法二：通过渲染进程与主进程通信实现。

渲染页面：

```vue
<template>
  <div class="titlebar" @mousedown="mousedown"></div>
</template>
<script setup>
  import { ref } from 'vue';

  // 节流函数优化频繁的 IPC 通信
  const throttleMove = (fn, delay = 16) => {
    let lastCall = 0
    return (...args) => {
      const now = Date.now()
      if (now - lastCall >= delay) {
        fn(...args)
        lastCall = now
      }
    }
  }

  const isKeyDown = ref(false)
  const dinatesX = ref(0)
  const dinatesY = ref(0)
  const mousedown = (e) => {
    isKeyDown.value = true
    dinatesX.value = e.x
    dinatesY.value = e.y
    // 获取初始鼠标屏幕坐标
    document.onmousemove = throttleMove((ev) => {
      if (isKeyDown.value) {
        // 获取移动后的鼠标屏幕坐标
        let x = ev.screenX - dinatesX.value
        let y = ev.screenY - dinatesY.value
        // 计算鼠标移动后的坐标差值
        const data = {
          appX: x,
          appY: y
        }
        electron.invoke('move',data)
      }
    })
    document.onmouseup = () => {
      isKeyDown.value = false
    }
  }
</script>
<style scoped>
  .titlebar{
    width: 100vw;
    height: 60px;
    background: #000;
    -webkit-user-select: none;
    cursor: grab;
  }
  .titlebar:active {
    cursor: grabbing;
  }
</style>

```

主进程main.js：

```javascript
ipcMain.handle('move', (event,data) => {
  const win = BrowserWindow.getFocusedWindow()
  if (!win) return

  // 添加边界检查，遇到边界不再移动
  const { width, height } = win.getBounds()
  const { workArea } = screen.getPrimaryDisplay()

  const safeX = Math.max(0, Math.min(data.appX, workArea.width - width))
  const safeY = Math.max(0, Math.min(data.appY, workArea.height - height))
  // 设置活动窗口位置
  win.setPosition(safeX, safeY)
});
```



+ c.无标题，无关闭缩小放大操作按钮，也无法正常移动窗口，借用b场景解决方案。

```javascript
new BrowserWindow({
   frame: false, // 隐藏标题栏及缩小关闭操作按钮，需要自定义关闭缩小按钮
})
```

放大缩小关闭自定义：

```javascript
ipcMain.handle('oper', (event,type) => {
    if(type=='min'){
      mainWindow.minimize()
    }
    if(type=='max'){
       // 解决单向放大后无法恢复
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
    if(type=='close'){
      // 窗口关闭
      mainWindow.close()
      // 退出应用
      app.quit()
    }
});
```

渲染页面：

```vue
<template>
  <button @click="min">缩小</button>
  <button @click="max">放大</button>
  <button @click="close">关闭</button>
</template>
<script setup>
  const min = () => {
    electron.invoke('oper','min');
  }

  const max = () => {
    electron.invoke('oper','max');
  }
  const close = () => {
    electron.invoke('oper','close');
  }
</script>
```

##### 窗口锁定
通过设置 setKiosk(布尔) 改变窗口锁定状态。

```javascript
win.setKiosk(flag)
```

判断是否锁定通过 isKiosk()获取

```javascript
win.isKiosk()
```

##### 窗口置顶
```javascript
// 方案一
new BrowserWindow({
  alwaysOnTop: true, // 置顶
})

// 方案二
win.setAlwaysOnTop(true)
```

##### 窗口透明
transparent透明只会在无边框模式下生效。

```javascript
new BrowserWindow({
  frame: false, // 无边框
  transparent: true, // 透明
})
```

渲染页面设置透明效果样式。如果不生效，请检测body及元素父级是否有背景色。

```javascript
.box{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5);
        color: #fff;
        border-radius: 30px;
        overflow: hidden;
    }
```

### 4.屏幕信息获取
```javascript
import { app, BrowserWindow ,ipcMain ,screen } from 'electron';
// 获取主屏信息
const primaryDisplay = screen.getPrimaryDisplay()
// 例如：获取屏幕宽高
const { width, height } = primaryDisplay.workAreaSize
```

getPrimaryDisplay() 返回以下主屏信息

```javascript
{
  accelerometerSupport: 'unknown',
  bounds: { x: 0, y: 0, width: 1920, height: 1080 }, // 屏幕边界
  colorDepth: 24,
  colorSpace: '{primaries:BT709, transfer:SRGB, matrix:RGB, range:FULL}', // 屏幕色彩
  depthPerComponent: 8,
  detected: true,
  displayFrequency: 60, //  屏幕频率
  id: 2980471640,
  internal: false,
  label: 'DP2VGA  V205',
  maximumCursorSize: { width: 0, height: 0 },
  monochrome: false,
  nativeOrigin: { x: 0, y: 0 }, 
  rotation: 0,
  scaleFactor: 1,
  size: { width: 1920, height: 1080 }, // 屏幕大小
  workArea: { x: 0, y: 0, width: 1920, height: 1040 }, 
  workAreaSize: { width: 1920, height: 1040 }, // 可用工作区
  touchSupport: 'unknown'  // 是否支持点击
}
```

### 5.窗口缩小至托盘
```javascript
import { app, BrowserWindow ,ipcMain ,Tray , Menu } from 'electron'
let mainWindow = null,  tray = null;
app.whenReady().then(() => {

   // 窗口操作
  ipcMain.handle('oper', (event, type) => {
    if (type == 'min') {
      mainWindow.minimize()
    }
    if (type == 'close') {
      // 窗口隐藏到托盘
      mainWindow.hide();
    }
  });
  
  // 创建托盘图标
  tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: '显示窗口', click: () => mainWindow.show() },
    { label: '退出', click: () => app.quit() }
  ]);
  tray.setToolTip('我的应用');
  tray.setContextMenu(contextMenu);

  // 监听托盘图标点击
  tray.on('click', () => mainWindow.show());
})
```

## 小技巧
#### 1.默认打开开发工具，主进程main.js添加
```plain
mainWindow.webContents.openDevTools(); 
```

#### 2.设置屏幕位置方法
方案一：通过BrowserWindow设置x,y，缺点必须同时设置x,y的坐标值，否则不生效!

```javascript
new BrowserWindow({
  x:10,
  y:10
}）
```

方案二：通过win.setBounds(<font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">{</font><font style="color:rgb(54, 172, 170);background-color:rgb(246, 248, 250);">x</font><font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">:</font><font style="color:rgb(54, 172, 170);background-color:rgb(246, 248, 250);">440</font><font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">,</font><font style="color:rgb(54, 172, 170);background-color:rgb(246, 248, 250);">y</font><font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">:</font><font style="color:rgb(54, 172, 170);background-color:rgb(246, 248, 250);">225</font><font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">,</font><font style="color:rgb(54, 172, 170);background-color:rgb(246, 248, 250);">width</font><font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">:</font><font style="color:rgb(54, 172, 170);background-color:rgb(246, 248, 250);">800</font><font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">,</font><font style="color:rgb(54, 172, 170);background-color:rgb(246, 248, 250);">height</font><font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">:</font><font style="color:rgb(54, 172, 170);background-color:rgb(246, 248, 250);">600</font><font style="color:rgb(57, 58, 52);background-color:rgb(246, 248, 250);">}</font>) ,可以实现x,y仅设置一个属性，另外一个属性自动居中效果！

```javascript
win.setBounds({x:440,y:225,width:800,height:600})
win.setBounds({x:440})  // x轴440，Y轴居中-垂直
win.setBounds({y:40})  // y轴40，x轴居中-水平
```

方案三：通过win.setPosition(x,y)设置窗口位置，x,y必须都有值！

```javascript
win.setPosition(100,100)
```





#### 3.主进程加载页面及文件
单文件主窗口

```javascript
if (process.env.NODE_ENV === 'development') {
  // 开发环境加载网页
  mainWindow.loadURL('http://localhost:5173'); // Vite 默认开发服务器端口
} else {
  // 正式环境加载文件
  mainWindow.loadFile(path.join(__dirname, '../dist/index.html')); // 生产环境加载打包后的文件
}
```



#### 4.自定义本地图片资源协议
由于浏览器默认不允许加载本地资源，隐藏需要通过Nodejs作为中间层转发资源，解决办法：主线程自定义协议asset:// 拦截然后将资源转发给渲染进程。

```javascript
// 注册自定义协议,用于加载本地图片资源 asset://
protocol.registerFileProtocol('asset', (request, callback) => {
  let urlPath = request.url.replace(/^asset:\/\//, '') // 去掉 asset://
  urlPath = decodeURIComponent(urlPath) // 解码 URL 编码部分

  // 如果路径以 C:/ 开头，改为 C:\ 格式
  if (/^[A-Za-z]:[\\\/]/.test(urlPath)) {
    urlPath = urlPath.replace(/\//g, '\\') // 统一为 Windows 路径
  }

  // 确保路径是绝对路径且存在
  try {
    const fullPath = path.resolve(urlPath)
    callback({ path: fullPath }) // 正确返回路径对象
  } catch (e) {
    console.error('无法解析路径:', e)
    callback({ error: -6 }) // ERR_ACCESS_DENIED
  }
})
```

渲染进程仅需要将协议头"asset://"添加到路径前边即可。

```javascript
imgList.value = list.map(item => {
  return {
    src: item,
    url: 'asset://' + encodeURIComponent(item)
  }
})
```

#### 5.自定义本地音频资源协议
同图片协议一致，本地音频也是无法直接播放的，需要我们用nodejs转发一次

```javascript
import mime from 'mime-types';
...
protocol.registerFileProtocol('electron', (request, callback) => {
  // 1. 移除协议头
  let rawPath = request.url.replace(/^electron:\/\//, '')
  let urlPath = decodeURIComponent(rawPath) // 解码 URL 编码部分
  // 如果路径以 C:/ 开头，改为 C:\ 格式
  if (/^[A-Za-z]:[\\\/]/.test(urlPath)) {
    urlPath = urlPath.replace(/\//g, '\\') // 统一为 Windows 路径
  }
  // 确保路径是绝对路径且存在
  try {
    const fullPath = path.resolve(urlPath);
    const mimeType = mime.lookup(fullPath) || 'application/octet-stream';

    // 处理Range请求头
    const rangeHeader = request.headers.Range || request.headers.range;
    if (rangeHeader) {
      const stats = fs.statSync(fullPath);
      const totalSize = stats.size;
      const range = rangeHeader.match(/bytes=(\d+)-(\d*)/);
      const start = parseInt(range[1], 10);
      const end = range[2] ? parseInt(range[2], 10) : totalSize - 1;

      // 确保范围有效
      if (start >= totalSize || end >= totalSize) {
        callback({ 
          statusCode: 416, // Range Not Satisfiable
          headers: { 'Content-Range': `bytes */${totalSize}` }
        });
        return;
      }

      // 返回206 Partial Content
      callback({
        statusCode: 206,
        headers: {
          'Content-Range': `bytes ${start}-${end}/${totalSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': end - start + 1,
          'Content-Type': mimeType
        },
        path: fullPath,
        offset: start,
        length: end - start + 1
      });
    } else {
      // 普通请求返回整个文件
      callback({ 
        path: fullPath,
        headers: { 'Content-Type': mimeType }
      });
    }
  } catch (e) {
    console.error('无法解析路径:', e)
    callback({ error: -6 }) // ERR_ACCESS_DENIED
  }
})
```

渲染进程仅需将音频路由前加协议头"electron://"。

```javascript
getAssetURL(filePath){
  if (!filePath) return
  const processedPath = encodeURIComponent( filePath.replace(/\\/g, '/') )
  return `electron://${processedPath}`
}
```

#### 6.快捷键监听
下面是快捷键注册的三种场景，要根据实际情况选择。

方法一：渲染进程页面注册监听事件，仅对**<font style="color:#117CEE;">当前页面</font>**生效

方法二：中间件预加载里面添加，仅对当前应用**<font style="color:#117CEE;">窗口显示</font>**的时候生效，**<font style="color:#DF2A3F;">最小化或窗口隐藏不生效</font>**！

```javascript
let keys = {};
document.addEventListener('keydown', function(event) {
    // 记录按键状态
    keys[event.key] = true;

    // 检查是否同时按下了Ctrl和S键
    if(keys['Control'] && keys['s']) {
        event.preventDefault(); // 阻止默认行为
        console.log('Ctrl + S 被按下了');
        // 在这里执行你想要的操作
    }
});

document.addEventListener('keyup', function(event) {
    // 更新按键状态
    delete keys[event.key];
});
```

方法三：在主进程里注册全局监听事件，只要应用没关闭都可以监听到。

```javascript
import { app,  BrowserWindow,  globalShortcut } from 'electron'

app.whenReady().then(()=>{
  // 注册全局快捷键
  globalShortcut.register('CommandOrControl+Shift+S', () => {
    console.log('Ctrl + Shift + S 被按下了');
    // 在这里执行截图逻辑，例如调用desktop-screenshot库进行截图
  });
});


// 即将关闭应用程序时
app.on('will-quit', () => {
  // 清理所有已注册的全局快捷键
  globalShortcut.unregisterAll();
});

```

## 异常问题
#### 1.<font style="background-color:rgb(211, 227, 253);">VM4 sandbox_bundle:2</font><font style="background-color:rgb(211, 227, 253);">Electron Security Warning (Insecure Content-Security-Policy) This renderer process has either no Content Security Policy set or a policy with "unsafe-eval" enabled. This exposes users of this app to unnecessary security risks.</font>
解决办法：这是浏览器的内容安全策略（[https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CSP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Guides/CSP)）。将以下代码添加到index.html里面。

```html
<meta  http-equiv="Content-Security-Policy"  content="default-src 'self'; img-src https://*; child-src 'none';" />
或
<meta  http-equiv="Content-Security-Policy" content="default-src 'self';style-src 'self' 'unsafe-inline'; img-src 'self' data:;" />
```

#### 2.<font style="color:rgb(63, 63, 63);background-color:rgb(224, 223, 255);">Error launching app Unable to find Electron app at D...</font>
<font style="color:rgb(44, 44, 54);">解决办法：表明 Electron 无法找到你的应用程序的入口文件，package.js加入"main": "electron/main.js"</font>

#### <font style="color:rgb(44, 44, 54);">3.</font><font style="color:rgb(63, 63, 63);background-color:rgb(224, 223, 255);">ReferenceError: require is not defined in ES module scope, you can use importinsteadThis file is being treated as an ES module because it has a 'js' file extension and'*' contains "type": "module". </font>
解决办法：<font style="color:rgb(44, 44, 54);">项目启用了 ES 模块（</font>`<font style="color:rgb(44, 44, 54);">"type": "module"</font>`<font style="color:rgb(44, 44, 54);">），而你在代码中使用了 CommonJS 的 </font>`<font style="color:rgb(44, 44, 54);">require</font>`<font style="color:rgb(44, 44, 54);"> 语法。ES 模块和 CommonJS 是两种不同的模块系统，不能直接混用。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1745301260368-8f74e7c7-7813-4c87-beb5-d224f9ef4162.png)

#### 4.控制台报错：<font style="color:rgb(63, 63, 63);background-color:rgb(224, 223, 255);"> Failed to load resource: net::ERR_FILE_NOT_FOUND index-CEOqqEAN.js:1</font>
解决办法：<font style="color:rgb(44, 44, 54);">由于路径配置不正确导致的，修改vite配置base为相对路径。</font>

```bash
base: './', // 使用相对路径
```

#### 5.打包时报错：<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(243, 243, 243);"> errorOut=ERROR: Cannot create symbolic link :: C:\Users\...libcrypto.dylib ERROR: Cannot create symbolic link :  C:\Users\...\10.12\lib\libssl.dylib</font>
解决办法：<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">是由于 </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">Windows 系统权限不足导致无法创建符号链接（symlink）</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">，尤其是在解压 </font>`<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(243, 243, 243);">winCodeSign</font>`<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);"> 依赖包时尝试创建 macOS 的 </font>`<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(243, 243, 243);">.dylib</font>`<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);"> 文件符号链接。</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">方案一： 按 </font>`<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(243, 243, 243);">Win + I</font>`<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);"> 打开 </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">设置</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);"> → </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">更新和安全</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);"> → </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">开发者选项</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);"> → 勾选 </font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">“开发者模式”</font>**<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">。</font>

<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">方案二：使用管理者权限执行打包命令：</font>

```bash
npm run build
```

#### 6.对比tauri优缺点
**electron**

缺点：包体积大（<font style="color:rgba(0, 0, 0, 0.9);">Chromium和node被打包了</font>）、<font style="color:rgba(0, 0, 0, 0.9);">较高内存占用，启动较慢，直接访问API有暴露被攻击风险。</font>

优点：<font style="color:rgba(0, 0, 0, 0.9);">全平台统一打包兼容性好，插件社区成熟，纯前端开发难度低。</font>

**<font style="color:rgba(0, 0, 0, 0.9);">tauri</font>**

缺点：不同平台兼容性差（<font style="color:rgba(0, 0, 0, 0.9);">基于系统原生 WebView</font>技术），插件社区不成熟，有一点技术难度（后端rust）

优点：包体积极小，低内存启动快，更安全（<font style="color:rgba(0, 0, 0, 0.9);">Rust 后端隔离系统 API</font>）

### 


