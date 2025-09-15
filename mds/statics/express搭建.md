官方地址：[https://www.expressjs.com.cn/starter/hello-world.html](https://www.expressjs.com.cn/starter/hello-world.html)

## 环境搭建步骤：


1.初始化项目

```javascript
npm init
```

并指定文件入口index.js/main.js



2.安装express

```javascript
npm install express --save
```



3.新建项目入口文件 index.js ,并复制以下代码：

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```



4.执行启动项目  


```javascript
node index.js
```



## 笔记
### express.static 静态服务中间件
配置一个或多个静态资源文件目录  


```javascript
app.use(express.static('public'))
```

### 404配置
```javascript
app.all("*",function (req,res) {
  // 设置中文乱码，就手动添加
  res.set('Content-Type', 'text/html');
  res.end("404,找不到页面！");
}
```



### 端口监听
```javascript
app.listen(3000, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
```

### 跳转|重定向
#### location 跳转
```javascript
res.location('/home')
res.location('http://www.baidu.com')
```



#### redirect 重定向
```javascript
res.redirect("/home");
res.redirect(301,"/home");
```



### 路由使用
子文件引入路由并抛出

```javascript
const  express = require('express');
// 引入路由
const router = express.Router();
router.get('/', (req, res) => {
  res.send('123')
})
export default router;
```



入口页面 引入并使用中间件注册

```javascript
app.use('/home',  require('./src/routes/user')
```



### 请求参数req
+ get参数获取 - req.query

```javascript
router.get('/', (req, res) => {
  // 获取参数
  console.log(req.query.id);
  // 获取请求url
  console.log(req.url);
  // 获取请求路径
  console.log(req.path);
  // 获取请求头
  console.log(req.headers);
  // 获取请求方法
  console.log(req.method);
})
```

+ post参数获取 - req.body

新版本之间使用express.json

```javascript
app.use(express.json());
// 用于解析URL编码的请求体
app.use(express.urlencoded({  
  extended: true
}));
```

express低版本需要先安装插件body-parser，然后express使用插件，就可以正常解析post传递的参数。

```javascript
const bodyParser=require("body-parser");
const app = express();

app.post('/changeStatus', function (req, res) {
    console.log( req.body )
    console.log( req.body.id )
    
})
```

### 返回参数 res
##### 一.res.sendFile 使用绝对路径
```javascript
res.sendFile(path.join(__dirname, '../../public', 'index.html'));
```

##### 二.res.render 返回动态模版
必须用到 “模板引擎”渲染html代码，所以必须要先安装一个模板引擎，例如ejs。  
1.安装：

```javascript
npm i ejs
```

  
2.入口文件引入  
// 动态模版解析渲染插件



```javascript
app.set('view engine','ejs');
```

3.子路由使用

```javascript
router.get('/',function(req,res,next){
  // ejs默认目录指向 views的ejs文件
  res.render('list',{
    title:'我是动态标题',
    content:'<h2>我是标题2</h2>',
    person:{
      name:'张三',
      age:20,
      sex:true,
      fav:['读书','听音乐','唱歌']
    }
  });
});
```



4.根目录新建views目录（ejs文件默认目录），新建list.ejs文件  
文件内部可以使用ejs语法

+ 取值 <%=username%>
+ 引入模版 <%include header.html%>
+ 不转义 <%-html%>
+ js语句 ：  
- <% if(username){ %>  <% } %>  
- <%arr.forEach(item=>{%> <% } %>

##### 三.res.send 发送http相应，返回字符串、Buffer对象或对象，数组
发送字符串或者Buffer对象时，需要设置类型：Content-Type为text/html

```plain
res.set('Content-Type', 'text/html');
res.send('<p>html</p>')
res.status(404).send({error:'无法找到资源'})
```



##### 四.res.json 发送json响应,可以返回对象，null
```javascript
res.json({
  name: '张三',
  age: 18
})
res.status(500).json({error:'服务器错误'})
```



##### 五.res.write 原封不动的返回原数据,只能返回字符串和buffer对象格式
res.write()与res.end()总是且必须成对出现

```javascript
res.write("Hello World");
res.end();
```

### 读写表格xls文件
对xls表格操作需要用到插件库：xlsx ，安装之后引入

```javascript
const XLSX = require('xlsx');
```

+ 读取表格内容，返回数组类型

```javascript
// filePath 文件路径+文件名
function getExcelData(filePath 文件路径+文件名) {
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    // 获取第一个工作表
    const sheet = workbook.Sheets[sheetNames[0]];
    // 将工作表转换为JSON对象
    const data = XLSX.utils.sheet_to_json(sheet);
    return data;
}
// 获取内容
let aaa = getExcelData("./notice.xlsx")
```

+ 写入表格内容

```javascript
// filePath 文件路径+文件名
// jsonData 需要存储的数据 - 数组格式
// sheetName xls的表名
function setExcelData(filePath, jsonData, sheetName = 'Sheet1') {
    const excleBook = XLSX.utils.book_new() // 新建文件
    const oldData = getExcelData(filePath)
    jsonData = oldData.concat(jsonData)
    XLSX.utils.book_append_sheet(excleBook, XLSX.utils.json_to_sheet(jsonData), sheetName); // 向文件中添加sheet，并将数据写入sheet
    XLSX.writeFile(excleBook, filePath); // 输出文
}
// 写入内容
setExcelData("./notice.xlsx", [{...}])
```

