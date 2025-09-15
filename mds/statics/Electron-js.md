## 前提条件

1.安装node.js，查看方式 

` node -v `

` npm -v  `




## 安装步骤

### 1.初始化安装，需要注意入口文件为 main.js（默认安装入口为：index.js)

` npm init `


### 2.安装依赖

`npm install electron --save-dev `

*或*

`yarn add electron`

*或*

`cnpm install --save-dev electron`



### 3.修改package.json文件

环境改为“devDependencies”，以及入口命令改为 "electron ."。

```javascript
"scripts": {
    "start": "electron ."
}
```



### 4.新建入口文件main.js 和index.html

```javascript
main.js配置以下代码：

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




### 5.启动应用

`npm run start`

这样就启动了一个简单的应用了。





## 打包步骤



官方打包工具需要node最低版本是14x，不然导入打包工具时会报错。以下是node的各个版本地址，下载指定版本安装即可完成升级或降级：

[https://nodejs.org/download/release/]: https://nodejs.org/download/release/



安装打包工具

`npm install --save-dev @electron-forge/cli`

`npx electron-forge import`



打包命令

`npm run make`