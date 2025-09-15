## RollUP打包

将js文件进行打包。

### 安装

```cmd
npm install --global rollup
或
yarn add rollup
```

### 使用

#### 打包命令

将main.js打包成 iife类型的 bundle.js文件

```cmd
rollup main.js  --file bundle.js  --format iife
```

将 main.js 打包成 node环境的commonjs模块文件

```cmd
rollup main.js --file bundle.js --format cjs
```

自动兼容浏览器和node环境

```cmd
rollup main.js --file bundle --format unm --name "mybundle"
```

#### 配置文件

新建 rollup.config.js 文件

```js
export default {
 input: 'src/main.js',
 output:{
 	file:"dist/bundle.js",
 	format:'iife'
 }
}
```

使用配置文件

```cmd
npm rollup --config rollup.config.js
```

