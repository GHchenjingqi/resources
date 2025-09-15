# postMessage 页面间通信

postMessage 是window对象的一个方法，用于同源策略不同页面间通信。

语法：

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```

- otherWindow  其他窗口的引用，比如：iframe ,执行 window.open返回的窗口对象
- message  需要传递的数据
- targetOrigin  指定哪些窗口可以接收消息。目标窗口协议/主机地址/端口 任意不一致都会导致跨域，无法通信。

注意：用于接收消息的任何事件监听器**必须**首先使用origin和source属性来检查消息的发送者的身份。

### postMessage 实现父子页面通信

父页面使用 iframe:

```html
<iframe src="http://127.0.0.1:8020/HelloHBuilder/postMessage2.html" width="" comment="接收页面"></iframe>
<script type="text/javascript">
    let iframe = document.querySelector("iframe")
    let str = "aqwieuqwiu"
    iframe.onload = function(){
        iframe.contentWindow.postMessage('aqwieuqwiu','*');
    }
</script>
```

子页面：

```js
let app = document.getElementById("app")
window.addEventListener('message',function(event){
    let or = event.origin
    // 安全检查
    if(or == 'http://127.0.0.1:8020'){
        let res = event.data
        app.textContent = res
    }
})
```



### postMessage 如何实现跨域？

postMessage 本身不能实现跨域通信，因为它是window对象的一个方法，用于同源策略不同页面间通信。

跨域可以通过一个服务器作为中间人转发消息。例如：服务器通过node和soclet.io实现转发广播。跨域页面也通过soclet方法接收。

```js
// 安装socket.io
// npm install socket.io
 
const http = require('http');
const socketIO = require('socket.io');
 
// 创建服务器
const server = http.createServer((req, res) => {
  res.end('Socket server is running.');
});
 
// 初始化socket.io
const io = socketIO(server);
 
// 监听客户端连接
io.on('connection', (socket) => {
  console.log('Client connected');
 
  // 监听客户端发来的消息
  socket.on('message', (data) => {
    console.log('Received message:', data);
 
    // 将消息广播给所有客户端
    socket.broadcast.emit('message', data);
  });
});
 
// 监听3000端口
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

页面：

```js
// 引入socket.io-client
// <script src="https://cdn.socket.io/socket.io-version/socket.io.min.js"></script>
 
const socket = io('http://localhost:3000');
 
// 监听服务器发来的消息
socket.on('message', (data) => {
  console.log('Received message:', data);
});
 
// 发送消息到服务器
socket.emit('message', { message: 'Hello from client!' });
```

