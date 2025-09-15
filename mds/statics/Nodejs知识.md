### 一、进程与线程
#### 1.进程：程序执行的一个过程。
例如：电脑每打开一个软件任务管理器就会出现一个进程，应用关闭进程运行结束。



#### 2.线程：进程的分支，一个进程可以有多个线程。
 通过“资源监视器”找到进程的pid：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1756191613572-fea2d391-47a4-4506-a429-6b8fa8dc4f86.png)

 通过CMD命令：

```bash
pslist -dmx 进程ID
```

### 二、Buffer 缓冲区
Buffer 缓冲区，类似JS的数组，存在于内存空间中，用于表示固定长度的字节序列，处理二进制数据。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1756197804581-a013ada9-ffa7-4f99-8407-c2651bd342bb.png)

#### 1.特点：
+ 大小固定，无法调整，不能改变大小
+ 每个元素占1字节（byte)，1字节=8bit

#### 2.创建Buffer 
+ alloc   —— 分配时，每一个二进制位都会被归0
+ allocUnsafe —— 创建的buffer 会有旧数据，导致每次的值不一致！！！
+ from —— 将对应的字符串转换unicode编码之后，再转成16进制

```javascript
// alloc 
let buf = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
// allocUnsafe
buf = Buffer.allocUnsafe(10000); // 多个<Buffer 70 71 f9.....>
// from
buf = Buffer.from('hello'); // <Buffer 68 65 6c 6c 6f>
console.log(buf);
```

#### 3.Buffer 的属性
+ length —— 获取buffer的长度（返回原字符串长度）
+ toString() —— 转换成字符串
+ indexOf() —— 查找字符串，返回字符串的索引
+ includes() —— 判断字符串是否包含某字符，返回布尔值
+ copy() —— 复制buffer

```javascript
console.log(buf.length); // 5
// 2. indexOf
console.log(buf.indexOf('l')); // 2
// includes
console.log(buf.includes('l')); // true
// 3. toString
console.log(buf.toString()); // hello
// 4. copy
let buf2 = Buffer.alloc(10);
buf.copy(buf2, 0, 0, 5); // <Buffer 68 65 6c 6c />
```

#### 4.修改Buffer
Buffer 修改数据时，长度溢出会扔掉高位。

```javascript
// 获取修改数据
let bb = buf[0].toString(2); // 01101000
console.log(bb);
// 修改数据
buf[0] = 91;
console.log(buf.toString()); // [ello

// 溢出，会舍弃到高位数据
buf[0] = 361; // 0001 0110 1001 
console.log(buf.toString()); // iello   i => 0110 1001 
```

### 三、path模块
#### 1.node全局变量
+ __dirname 当前文件所在目录的绝对路径
+ __filename 当前文件的绝对路径

注意：当在es模块中和package.json中设置了"type": "module"时全局变量将不可用！！！以下是兼容写法：

```javascript
// 获取当前文件的文件路径（等价于 __filename）
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

#### 2.resolve - 拼接处规范的绝对路径
```javascript
path.resolve(__dirname, filepath, filepath....)  

const path1 = path.resolve(__dirname, 'files/00古诗.txt');
console.log(path1); // D:\gitresp\nodeAPI\docs\files\00古诗.txt
```

+ filepath必须是相对路径
+ filepath可以是一个路径片段
+ filepath可以多个
+ filepath可以是 ./files || ../files || files ，唯独不能是绝对路径 /files

#### 3.join - 拼接路径片段
```javascript
const path2 = path.join(__dirname, 'files', '00古诗.txt');
console.log(path2); // D:\gitresp\nodeAPI\docs\files\00古诗.txt
```

#### 4.sep 路径分隔符
获取当前系统的分隔符，windows为\，linux为/

```javascript
console.log(path.sep); // \
```

#### 5.parse 解析路径片段,返回一个对象
```javascript
console.log(path.parse); 
// 如下：
{
  root: '/',
  dir: '/Users/alex/project/src/app',
  base: 'index.js',
  name: 'index',
  ext: '.js'
}
```

#### 6.dirname  目录名
```javascript
console.log('目录名:', path.dirname(__filename));
```

#### 7.basename 文件名
```javascript
console.log('文件名:', path.basename(__filename));
```

#### 8.extname 扩展名
```javascript
console.log('扩展名:', path.extname(__filename));
```

### 四、http模块
#### 1.createServer 创建服务
```javascript
let server = http.createServer((req,res)=>{
  请求信息：
  req.method    请求方式 GET POST
  req.url       请求路径
  req.headers   请求头,内容如下：
      {
        host: '127.0.0.1:30001',
          connection: 'keep-alive',
          pragma: 'no-cache',
          'cache-control': 'no-cache',
          'sec-fetch-site': 'same-origin',
          'sec-fetch-mode': 'no-cors',
          'sec-fetch-dest': 'empty',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'
      }
  req.httpVersion  http版本 1.1

  响应信息：
  // 设置响应头 比如：Content-Type
  res.statusCode = 401  // 状态码
  res.setHeader('key','value') // 设置响应头，也可以自定义，当值为数组的时候，就设置了多个同名响应头
  res.writeHead(200,{ 'Content-Type':'text/html;charset=utf-8' }) // 设置响应头和状态码
  res.write('hello world') // 向响应流中写入一部分响应体
  res.end("你好") // 结束响应,并发送最后一段数据（字符串或Buffer对象）
})
```

#### 2.listen 服务监听
```javascript
server.listen(30001,()=>{
    console.log('server is listening 30001')
})
```

#### 3.获取request参数
a.用url 模块

```javascript
const url = require('url')
const urlObj = url.parse(req.url,true) 
// urlObj 如下：
  {
      protocol: null,
      slashes: null,
      auth: null,
      host: null,
      port: null,
      hostname: null,
      hash: null,
      search: '?web=10',
      query: { web: '10' },
      pathname: '/',
      path: '/?web=10',
      href: '/?web=10'
  }
```

b.用html5的URL对象

```javascript
const url =  new URL(req.url,'http://127.0.0.1')  // 必须是完整的url路径
// url如下：
        {
            href: 'http://127.0.0.1/?web=10',
            origin: 'http://127.0.0.1',
            protocol: 'http:',
            username: '',
            password: '',
            host: '127.0.0.1',
            hostname: '127.0.0.1',
            port: '',
            pathname: '/',
            search: '?web=10',
            searchParams: URLSearchParams { 'web' => '10' },
            hash: ''
        }
// 获取query参数
url.searchParams.get('web')
```

c.mime类型

 媒体类型/资源类型，类型结构： [type]/[subtype]

+ text/html 
+ text/css  
+ text/javascript 
+ application/json  
+ image/png  
+ image/jpeg  
+ video/mp4  
+ audio/mpeg  
+ application/octet-stream - 默认文件下载类型

### 五、fs模块
#### 1.读取文件
读取场景：电脑开机、程序运行、查看文件、播放音乐和视频

+ 同步读取

```javascript
readFile(path, [options?], callback)
```

+ 异步读取

```javascript
readFileSync(path, [options?])
```

+ 流式读取

```javascript
// 创建流通道：
rs = fs.createReadStream(path)
// 读取数据,chunk为数据块，最大长度65536字节（64kb),也就是每次读取64kb的流数据
rs.on('data', chunk=>{ })
// 传输完毕
rs.on('end', ()=>{ })
```

实战：

```javascript
const fs = require('fs');
// 1.按utf-8 异步读取
fs.readFile('./files/古诗.txt', 'utf-8', function (err, data) { 
    if (err) {
        console.log(err);
    } else {
        console.log("异步读取："+data);
    }
});

// 2.按utf-8 同步读取
const data = fs.readFileSync('./files/古诗3.txt', 'utf-8');
console.log("同步读取："+data);

// 3.流式读取
const rs = fs.createReadStream('./files/古诗.txt');
rs.on('data', function (chunk) { 
    console.log("流式读取："+chunk.length +"字节");
});
rs.on('end', function () { 
    console.log("流式读取结束");
});
```

#### 2.写入文件
使用场景： 文件下载、应用安装、编辑保存、日志保存、录制视频等

+ 异步（不会等结果）写入文件

```javascript
writeFile(path, data, [options?], callback)
```

+ 同步（会等结果）写入文件,会阻塞主线程， 

类似JS的 await（js的await只是“看起来像是同步”，await后面的代码被放到了then中）

```javascript
writeFileSync(path, data, [options?])
```

+ 追加写入 - 异步（不会等结果）

```javascript
appendFile(path, data, [options?], callback)
```

+ 追加写入 - 同步（会等结果）

```javascript
appendFileSync(path, data, [options?])
```

+ 文件流式写入

```javascript
//创建流通道：
ws = fs.createWriteStream(path)
//写入数据：
ws.write(data) 
//关闭通道：
ws.close()
```

实战：

```javascript
const fs = require('fs');

// 写入
const text = '《静夜思》\n唐·李白\n床前明月光，疑是地上霜。\n举头望明月，低头思故乡。';
fs.writeFile('./files/古诗.txt', text, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('写入成功');
    }
});
console.log(2); // 先执行2，再执行写入成功，因此 writeFile 是异步写入
// 同步写入
fs.writeFileSync('./files/古诗2.txt', text);

// 异步追加
fs.appendFile('./files/古诗.txt', '\n白日依山尽，黄河入海流。', function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('追加成功');
    }
});

// 同步追加
fs.appendFileSync('./files/古诗2.txt', "\n欲穷千里目，更上一层楼。");


// 5.流式写入
const ws = fs.createWriteStream('./files/古诗3.txt');
ws.write('白日依山尽\n');
ws.write('接天莲叶无穷碧\n');
ws.close()

```

#### 3.文件移动和重命名
+ 异步移动重命名

```javascript
rename(oldPath, newPath, callback)
```

+ 同步移动重命名

```javascript
renameSync(oldPath, newPath)
```

实战：

```javascript
const fs = require('fs');

// 1.同步文件移动+重命名
fs.renameSync('./files/ascll.png', './docs/asc.png');

// 2.异步文件移动+重命名
fs.rename('./files/ascll.png', './docs/asc.png', function (err) { 
    if (err) {
        console.log(err);
    } else {
        console.log("异步文件移动成功");
    }
});
```

#### 4.复制文件
+ 使用 readFileSync + writeFileSync 结合
+ 流式复制 createReadStream +  createWriteStream

```javascript
const fs = require('fs');

// 1.同步复制 ,会占用磁盘空间比较大
const data = fs.readFileSync('./files/古诗.txt');
fs.writeFileSync('./files/古诗4.txt', data);

// 2.流式复制，更节约资源
const rs2 = fs.createReadStream('./files/古诗.txt');
const ws2 = fs.createWriteStream('./files/古诗5.txt');
// rs2.on('data', function (chunk) { 
//    ws2.write(chunk);
// });
rs2.pipe(ws2);
```

#### 5.文件删除
+ 异步删除

```javascript
unlink(path, callback)
```

+ 同步删除

```javascript
unlinkSync(path)
```

+ rm删除

```javascript
rm(path, options, callback)
```

实战：

```javascript
const fs = require('fs');

// 1.文件删除
fs.unlink('./files/001.txt',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});
// 2.同步删除
fs.unlinkSync('./files/001.txt');

// 3.rm(path, options, callback)
fs.rm('./files/001.txt',{force:true},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});
```

#### 6.查看资源状态
+ 异步获取文件信息

```javascript
stat(path, callback)
```

+ 同步获取文件信息

```javascript
res = statSync(path)

res.isFile()  是否是文件，返回布尔值
res.isDirectory()  是否是目录，返回布尔值
```

实战：

```javascript
const fs = require('fs');
// 1.异步获取文件信息
fs.stat('./files/古诗.txt', function(err, stats) { 
    if (err) {
        console.log(err);
        return
    }
    console.log(stats);
});
// 2.同步获取文件信息
let stat = fs.statSync('./files/古诗.txt');
console.log(stat);
```

#### 7.文件夹创建
+ 异步文件夹创建

```javascript
mkdir(path, options, callback)
```

    options： recursive: true, 递归创建

+ 同步文件夹创建

```javascript
mkdirSync(path, options)
```

+ 多层级文件夹创建

```javascript
fs.mkdirSync('./html3/a/b', { recursive:true });
```

实战：

```javascript
fs.mkdir('./html',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('创建成功');
    }
});
// 同步创建
fs.mkdirSync('./html3');
// 3.递归创建多层级目录
fs.mkdirSync('./html3/a/b', { recursive:true});
```

#### 8.文件夹内容读取
文件夹读取，返回文件夹下的文件名数组

+ 异步读取文件夹

```javascript
readdir(path, callback)
```

+ 同步读取文件夹

```javascript
readdirSync(path)
```

实战：

```javascript
var fs = require('fs');

// 1.异步文件夹读取
fs.readdir('./files',(err, files)=>{
    if(err){
        console.log(err);
    }else{
        console.log(files);
    }
});
// 2.同步文件夹读取
fs.readdirSync('./files');
```

#### 9.文件夹删除
+ 异步文件夹删除 - 只能删除非空目录

```javascript
rmdir(path, callback)
```

+ 同步文件夹删除

```javascript
rmdirSync(path) - 只能删除非空目录
```

+ rm删除

```javascript
rm('./html3',{ recursive:true },callback)
```

实战：

```javascript
// 删除目录非空目录，会有警告说新版会移除rmdir，让使用rm
fs.rmdir('./html3',{ recursive:true },(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});
// 添加recursive:true可以多层级删除
fs.rm('./html3',{ recursive:true },(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('删除成功');
    }
});
```

