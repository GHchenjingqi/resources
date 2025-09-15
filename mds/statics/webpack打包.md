webapck命令

```js
npm install webpack  // 安装
npm webpack  // 打包命令
```

### 1.webpack有什么用？

**webpack** 是一个用于现代 JavaScript 应用程序的 ***静态模块打包工具***。**将模块化开发的碎片资源组合为一个或多个静态资源。**

webpack原理：将多个文件合并成一个对象的中，路径作key，内容做value，然后放到IIFE立即执行函数中，然后通过函数执行路径对应的函数，将函数结果返回存放到不重复的对象集合中。

```js
(function(modules){
	var moduleExport = {}
	function require(moduleKey){
		if(moduleExport[moduleKey]) return moduleExport[moduleKey]
		var func = modules[moduleKey]
		var module = {
			exports:{}
		}
		func(module,export,require);
		var res = module.export;
		moduleExport[moduleKey] = res;
	}
})({
	"../src/main.js":function(module){console.log(123);module.exports = "a"},
	"../src/index.js":function(module,exports,require){ console.log(456);module.exports = "b"},
})
```

### 2.webpack的核心功能有哪些？

- entry 入口
- output 输出
- loader 模块
- plugin 插件
- mode 模式



#### 入口 entry

入口文件默认值是 ./src/index.js

```js
module.exports = {
  entry: './path/to/my/entry/file.js',
};
// 等效于
module.exports = {
  entry: {
      main:'./path/to/my/entry/file.js',
  }
};
// 等效于
module.exports = {
  entry:['./path/to/my/entry/file.js'] // 多个入口文件
};
```

#### 输出 output

output属性是配置webpack模块打包后的位置。

```js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'), // 路径目录
    filename: 'bundle.js', // 文件名
  },
};
```

#### loader - module模块转换

loader 用于对模块的源代码进行转换。由于webpack只认识js和json文件，对于其他文件需要通过对应的loader做转换。

```js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
     path: path.resolve(__dirname, 'dist'), // 路径目录
     filename: 'bundle.js', // 文件名
  },
  module:{
  	 rules: [
         { test: /\.txt$/, use: 'raw-loader' },// 打包时遇到 txt文件用raw-loader转换以下
         { test: /.css$/,use: ["style-loader","css-loader" ] }, // 遇到css 用这2个转换
     ], 
  }
};
```

#### plugin 插件

插件用于打包优化，资源管理。

例如：将html也打包，使用 html-webpack-plugin 插件。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入插件
const webpack = require('webpack'); // 用于访问内置插件

module.exports = {
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [
      // 使用插件
      new HtmlWebpackPlugin({ 
          title:"我是标题", // 页面标题
          template: './src/index.html'  // 模板文件
      })
  ],
};
```

#### mode 模式

mode用于指定当前项目的环境。不同模式有不同的优化。

- development 开发环境
- production 生存环境
- none 默认打包模式

```js
module.exports = {
  mode: 'production',
};
```



除以上的核心胚子，还有target属性。用于针对某个服务端。默认还是web，也可以修改为node。

```js
module.exports = {
  target: 'node',
};
```

### 3.webpack和vite打包的区别？为什么vite打包速度快于webpack?

#### 1).工作原理上不同

webpack编译打包时，会根据入口文件分析出所有的模块依赖关系，然后所有引用文件都打包成一个或多个js文件。这样的项目会越来臃肿，启动时间越来越长！

vite运行项目时，会通过 **esbulid** 将所有的模块转换为 **es module**文件，不需要对整个项目进行打包。而浏览器在加载改模块的时候，会根据请求按需动态引入编译，再返给浏览器。

#### 2).热更新不同

webpack项目中，每次修改都会对整个项目重新打包编译，虽然webpack有缓存机制，但不能从根本上解决问题。

vite在监听到文件发生变化时，会通过websocket通知浏览器，发起重新请求，只对发生变化的模块进行重新编译，然后进行替换。

#### 3).构建速度不同

webpack和vite由于原理上不同，再加上vite底层是go语言开发了，执行速度是js的10到100倍，因此导致vite的构建速度远远高于webpack。

#### 4).配置不同

webpack配置复杂度更高，插件社区更完善健全，更符合大型项目或稳定项目。

vite配置简单，兴起时间短，插件不健全，适合中小型项目。
