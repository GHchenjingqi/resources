### 一.live-server
live-server是一个简单的开发HTTP服务器，具有实时重载功能。

#### 安装
```basic
npm install -g live-server
```

#### 使用
```basic
live-server --port=3001
# 允许跨域
live-server --port=3001 --cors
```

#### 其他命令
```basic
--port=NUMBER：选择要使用的端口，默认为环境变量中的PORT或8080。
--host=ADDRESS：选择要绑定的主机地址，默认为环境变量中的IP或0.0.0.0（表示任何地址）。
--no-browser：不自动打开浏览器。
--browser=BROWSER：指定要使用的浏览器，而不是系统默认浏览器。
--quiet | -q：不显示日志信息。
--verbose | -V：显示更详细的日志信息。
--open=PATH：在浏览器中打开指定路径的页面，而不是默认的服务器根目录。
--watch=PATH：仅监视指定路径的文件变化，默认会监视所有文件。
--ignore=PATH：指定要忽略的文件路径。
--no-css-inject：在CSS文件发生变化时重新加载页面，而不是动态注入样式。
--middleware=PATH：指定一个.js文件作为中间件，用于自定义服务器功能。
--entry-file=PATH：在缺少文件时，用指定路径的文件替代（适用于单页面应用）。
--mount=ROUTE:PATH：将指定路径下的文件内容在指定的路由下提供访问。（可以定义多个）
--spa：将类似/abc的请求转换为/#/abc的形式（对于单页面应用很方便）。
--wait=MILLISECONDS：在重新加载页面之前等待所有文件的变化，默认为100毫秒。
--htpasswd=PATH：启用http-auth，需要在指定路径上提供htpasswd文件。
--cors：允许跨域访问。
--https=PATH：指定一个HTTPS配置模块的路径。
--https-module=MODULE_NAME：指定自定义的HTTPS模块。
--proxy=ROUTE:URL：将指定路由下的请求代理到指定的URL上。
--help | -h：显示简要的使用说明。
--version | -v：显示版本号
```



