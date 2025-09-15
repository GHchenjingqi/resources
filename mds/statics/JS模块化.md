## JS模块化

### 1.模块化背景

- CommonJS，2009年Mozilla工程师提出的CommonJS规范，同年**Nodejs**基于CommonJS应用而生。（Node端同步方案）
- AMD，2010年美国程序员开发了Require.js，并发布了AMD规范。（浏览器端异步方案，为了解决**JS加载顺序**先后导致异常问题）
- CMD，2011年支付宝前端玉伯开发了 Sea.js，并发布了CMD规范。浏览器端异步方案，写法更优雅。
- ES6模块化，2015年EMCScript官方发布了ES6模块化及其规范。Node和浏览器端都支持（需要通过babel转换）！

无论是CommonJS，AMD还是CMD 都是为了前端模块化的发展做了贡献，如同JQuery一样，倒逼着官方进步。正是由于它们的存在，前端发展才更加完善。随着前端三剑客（react,vue,angular)的出现，无论是AMD还是CMD，还是JQuery都成为了历史。

### 2.CommonJS规范

基于Node环境，代码案例：

```js
// math.js 模块文件
function add(a,b){
	return a+b;
}
function sub(a,b){
    return a-b;
}
// CommonJS 导出规范
module.exports = {
    add,sub
}
```

引入及使用模块文件：

```js
const math = require('./math.js')
let res = math.add(1,2)
```

### 3.AMD 规范

浏览器端使用 require.js(https://requirejs.org/) ，常用于多页面应用，代码案例：

a.html页面引入requirejs

```html
<!DOCTYPE html>
<html>
    <head>
        <title>My Sample Project</title>
        <!-- data-main 需要加载的AMDjs文件  -->
        <script data-main="scripts/main" src="js/require.js"></script>
    </head>
    <body>
        <h1>My Sample Project</h1>
    </body>
</html>
```

b.main入口文件配置

```js
// main.js
require.config({
    baseUrl: "/js", // 入口目录
    paths: {
        // 相对于js目录的位置及文件名，不需要加js后缀
        "jquery": "../lib/jquery.min"
    },
});
// 引入js模块文件
require(['index.js'])
```

c.定义模块

```
// js模块定义
define(['jquery'],function($){
	// jquery加载完之后，执行函数
	$('btn').click(function(){
		alert("AMD")
	})
})
```

### 4.CMD 规范

浏览器端，使用sea.js （https://seajs.github.io/seajs/docs/）代码实例：

a.页面引入

```html
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Hello Sea.js</title>
</head>
<body> 
<script src="../sea-modules/seajs/seajs/2.2.0/sea.js"></script>
<script>
  // Set configuration
  seajs.config({
    base: "../sea-modules/",
    alias: {
      "jquery": "jquery/jquery/1.10.1/jquery.js"
    }
  });
  // 使用文件
  seajs.use("examples/hello/1.0.0/main");
</script>

</body>
</html>
```

b.main定义模块

```js
// 所有模块都通过 define 来定义
define(function(require, exports, module) {
  // 通过 require 引入依赖
  var $ = require('jquery');
  var Spinning = require('./spinning');

  // 通过 exports 对外提供接口
  exports.doSomething = ...

  // 或者通过 module.exports 提供整个接口
  module.exports = ...

});
```

### 5.ES6模块化

目前无论node端还是浏览器端，使用ES6模块化都需要将js进行babel转换成es5的写法，环境才可正常运行。

