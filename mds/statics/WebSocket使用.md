### 一、WebSocket是什么？
WebSocket是一种协议，用于提供低延迟/全双工/长连接的客户端与服务器通信方式。

**半双工：**通信双方不能同时发消息，只能等待一方发完，另一方才能发送消息。

**全双工**：通信的双方可以同时发送和接收消息，不需要等待对方相应和传输完成。

应用场景：

+ 即时通讯
+ 游戏

#### 1.客户端网络信息
**响应码：101**

**响应头：**

```plain
// Upgrade连接
Connection:Upgrade
// 提供基础的防护，减少恶意连接
Sec-Websocket-Accept:PXw5jD28Z2rpv/HTi51a1KS2HtI=
// Upgrade类型：websocket
Upgrade:websocket
```

**响应体**：

+ 显示客户端和服务器发送的消息记录

#### 2.对比传统方法
**传统实现即时通讯的方法**：

+ **轮询**：定期向服务器发送请求，频繁请求服务器；
+ **长轮询**：客户端发送请求后，保持连接打开，等待新数据相应后再关闭连接；请求还是比较频繁。
+ **comet**：保持长连接，在往返请求后继续保持连接打开，它是基于http模型，模拟的长连接；

**传统实现双向通信的方法缺点：**

用的轮询长轮询，缺点会产生大量的请求和响应，造成不必要的网络开销和延迟

#### 3.WebSocket的缺点
+ 不提供加密功能。如需保证数据安全，需要设置白名单或SSL协议。
+ 不支持IE10以前浏览器。采用ajax替代。
+ 需要不断的维护优化长连接，不然会过度消耗服务器资源。

### 二、websocket如何用？
#### 1.WebSocket事件方法有：
+ onopen  开启通信
+ onmessage 接收消息
+ onerror 发生错误时触发
+ onclose  连接关闭时触发

#### 2.WebSocket方法
+ send  发送消息
+ close 关闭连接

#### 3.案例
WebSocket通信的最小单位是：帧。

服务端采用nodejs：

```javascript
const express = require('express');
const WebSocket = require('ws');

// 2.创建服务器的实例对象
const app = express();
// WebSocket配置开始端口服务
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', function connection(ws) {
    console.log('恭喜你，连上客户端了！');
    ws.on('message', function incoming(message) {
        console.log('服务端接收: %s', message);
    });
    // 服务端发送至客户
    ws.send('你好啊，用户!');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
```

客户端使用js接收消息：

```javascript
// 客户端需要通过 WebSocket 创建连接，连接开头是ws+服务端的地址
let ws = new WebSocket('ws://localhost:8080');
// 开启通信
ws.onopen = function () {
    console.log('ws onopen');
    // 发送消息
    ws.send('ws真好用！');
};
// 接收消息
ws.onmessage = function (e) {
    console.log('ws onmessage');
    console.log('服务端传回: ' + e.data);
};
```

#### 4.单例模式
```javascript
class WebSocketManager {
    constructor(url) {
        if (WebSocketManager.instance) {
            return WebSocketManager.instance;
        }

        this.url = url;
        this.socket = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectInterval = 3000; // 毫秒
        this.messageListeners = [];
        this.readyState = WebSocket.CLOSED;

        this.connect();

        WebSocketManager.instance = this;
    }

    connect() {
        if (!this.url) {
            console.error("WebSocket URL is not defined.");
            return;
        }

        this.socket = new WebSocket(this.url);
        this.readyState = this.socket.readyState;

        this.socket.onopen = () => {
            console.log("WebSocket connected.");
            this.reconnectAttempts = 0; // 重置重连计数器
            this.readyState = WebSocket.OPEN;
        };

        this.socket.onmessage = (event) => {
            // 分发消息给所有监听者
            this.messageListeners.forEach((listener) => {
                listener(event);
            });
        };

        this.socket.onclose = (event) => {
            console.log(`WebSocket closed: ${event.reason}`);
            this.readyState = WebSocket.CLOSED;
            this.attemptReconnect();
        };

        this.socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            this.socket.close();
        };
    }

    attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => {
                console.log(`Reconnecting WebSocket... Attempt ${this.reconnectAttempts + 1}`);
                this.reconnectAttempts++;
                this.connect();
            }, this.reconnectInterval);
        } else {
            console.warn("Maximum reconnect attempts reached. Giving up.");
        }
    }

    sendMessage(message) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.warn("WebSocket not open. Message not sent.");
        }
    }

    addMessageListener(callback) {
        if (typeof callback === 'function') {
            this.messageListeners.push(callback);
        }
    }

    removeMessageListener(callback) {
        const index = this.messageListeners.indexOf(callback);
        if (index > -1) {
            this.messageListeners.splice(index, 1);
        }
    }

    close() {
        if (this.socket) {
            this.socket.close();
            this.readyState = WebSocket.CLOSED;
        }
    }

    // 获取当前连接状态
    getSocketState() {
        return this.socket ? this.socket.readyState : WebSocket.CLOSED;
    }

    // 静态方法获取实例
    static getInstance(url) {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager(url);
        }
        return WebSocketManager.instance;
    }
}

// 导出单例（如果使用模块系统）
export default WebSocketManager;
```

前端使用单例模式：

```javascript
import WebSocketManager from '@/utils/websocket'
// 初始化并获取单例实例
const wsManager = WebSocketManager.getInstance('wss://your-websocket-url');
// 添加消息监听器
wsManager.addMessageListener((event) => {
    console.log('Received message:', event.data);
});
// 发送消息
wsManager.sendMessage(JSON.stringify({ type: 'hello', content: 'Hello Server!' }));
// 关闭连接（可选）

// 销毁
wsManager.close()
wsManager.removeMessageListener()
wsManager = null
```



### 三、常见问题
#### 1.WebSocket的心跳机制：为什么WebSocket需要心跳机制？
为了保持WebSocket稳定的长连接，服务器和客户端之间通过心跳包来保持连接状态。以房子长时间没有数据传输而被切断。

**心跳包**：一种特殊的数据帧包（空数据），定期发送，确保**连接有效不中断**！

改造客户端代码：

```javascript
const socket = new WebSocket('ws://localhost:8080'); // WebSocket 建立连接
const heartCheck = initHeartCheck()；// 初始化心跳检测对象

// WebSocket建立连接成功
socket.addEventListener('open', function (event) {
　　heartCheck.start();// 启动心跳检测
　　socket.send('Hello Server!');
});
// WebSocket接受到服务端消息
socket.addEventListener('message',function(event){
  heartCheck.start();// 启动心跳检测
})
// WebSocket 连接被关闭
socket.addEventListener('close',function(event){
  heartCheck.reset();// 启动心跳检测
})
// WebSocket 连接因错误而关闭
socket.addEventListener('error',function(event){
  heartCheck.reset();// 启动心跳检测
})

function initHeartCheck() {
        return {
            timeout: 2 * 1000, // 每2s向服务端发送一次消息
            serverTimeout: 10 * 1000, // 10s收不到服务端消息算超时
            timer: null,
            serverTimer: null,
            reset() { // 心跳检测重置
                clearTimeout(this.timer);
                clearTimeout(this.serverTimer);
                this.timer = null;
                this.serverTimer = null;
                return this;
            },
            start() { // 心跳检测启动
                this.reset();
                this.timer = setTimeout(() => { 
                    socket.send('ping'); // 定时向服务端发送消息
                    if (!this.serverTimer) {
                        this.serverTimer = setTimeout(() => {
                            // 关闭连接触发重连
                           console.log(new Date().toLocaleString(), "not received pong, close the websocket");
                          socket.close(); //关闭websocket或根据业务需求去重连 
                        }, this.serverTimeout);
                    }
                }, this.timeout);
            },
        }
    }
```

