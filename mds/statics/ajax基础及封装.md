### 1.什么是Ajax ?
就是使用 **XMLHttpRequest** 对象与服务器通信。

### 2.Ajax优缺点
优点：

+ 页面无需刷新与服务端进行通信
+ 可以实现局部刷新功能

缺点：

+ 存在跨域问题

### 3.实现XHR请求数据的步骤
+ 创建 `XMLHttpRequest` 对象
+ 通过 `XMLHttpRequest` 对象的 `open()` 方法与服务端建立连接
+ 构建请求所需的数据内容，并通过` XMLHttpRequest` 对象的 `send()` 方法发送给服务器端
+ 通过 `XMLHttpRequest` 对象提供的 `readystatechange、loadend` 事件监听服务器端的通信状态
+ 接受并处理服务端向客户端响应的数据结果
+ 将处理结果更新到 `HTML`页面中

```javascript
// 创建 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();
// 创建服务连接：http://example.com
xhr.open("GET", "http://example.com/data.json");
// 发送数据
xhr.send();
// onreadystatechange 监听与服务器通信结果
xhr.onreadystatechange = function() {
  // readyState状态
  // 0：请求未初始化
  // 1：服务器连接已建立
  // 2：请求已接收
  // 3：请求处理中
  // 4：请求已完成，且响应已就绪
  if(xhr.readyState == 4 ) {
      // 服务器状态码
      if(xhr.status >= 200 && xhr.status < 300){
      	var data = JSON.parse(xhr.responseText);
        // 处理数据
      }
  }
}
```

### 4.请求头设置 setRequestHeader 
通过setRequestHeader设置请求头

```javascript
xhr.open("POST","/ajax/demo.php",true)
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
xhr.send()
```

Content-type 类型

+ `**<font style="color:#DF2A3F;">application/json</font>**`：用于传输 **JSON 格式**的数据
+ `application/xml`：用于传输 XML 格式的数据
+ `text/plain`：纯文本格式，通常用于普通文本文件
+ `text/html`：用于传输 HTML 格式的数据
+ `image/jpeg, image/png, image/gif`：用于传输图像数据
+ `multipart/form-data`：通常用于**上传文件**，表单数据会被编码成一系列的部分
+ `**<font style="color:#DF2A3F;">application/x-www-form-urlencoded</font>**`：通常用于发送**表单数据**，数据会被编码为键值对的形式（表单默认的提交数据的格式）

### 5.ajax封装
```javascript
function ajax(config) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // 默认配置
    const defaultConfig = {
      method: 'GET',
      responseType: 'json',
      timeout: 10000,
      headers: {}
    };

    config = Object.assign({}, defaultConfig, config);

    const {
      method,
      url,
      data,
      responseType,
      headers,
      timeout,
      onUploadProgress,
      onDownloadProgress
    } = config;

    // 处理 URL 和 GET 参数
    let requestUrl = url;
    if (method.toUpperCase() === 'GET' && data) {
      const params = serializeParams(data);
      requestUrl += (requestUrl.includes('?') ? '&' : '?') + params;
    }

    xhr.open(method, requestUrl);

    // 设置响应类型
    xhr.responseType = responseType;

    // 设置请求头
    if (headers) {
      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    // 自动设置 Content-Type（如果没有手动设置）
    if (method.toUpperCase() === 'POST' && !headers['Content-Type']) {
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
    }

    // 进度事件监听
    if (onUploadProgress && xhr.upload) {
      xhr.upload.onprogress = onUploadProgress;
    }
    if (onDownloadProgress) {
      xhr.onprogress = onDownloadProgress;
    }

    // 超时处理
    xhr.timeout = timeout;
    xhr.ontimeout = () => {
      reject(new Error(`请求超时(${timeout}ms)`));
    };

    // 成功加载
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        reject(new Error(`请求失败: ${xhr.statusText}`));
      }
    };

    // 网络错误
    xhr.onerror = function () {
      reject(new Error('网络错误'));
    };

    // 发送请求体
    let body = null;
    if (method.toUpperCase() === 'POST') {
      if (data instanceof FormData) {
        body = data;
      } else if (typeof data === 'string') {
        body = data; // 原样发送字符串（如 JSON）
      } else {
        // 默认转为 x-www-form-urlencoded 格式
        body = serializeParams(data);
      }
    }

    xhr.send(body);
  });
}

// 工具函数：序列化参数（支持嵌套对象简单扁平化）
function serializeParams(data) {
  const params = new URLSearchParams();
  function append(key, value) {
    if (value !== undefined && value !== null) {
      params.append(key, value);
    }
  }

  function flatten(obj, parentKey = '') {
    for (let key in obj) {
      const newKey = parentKey ? `${parentKey}[${key}]` : key;
      const value = obj[key];
      if (value && typeof value === 'object' && !(value instanceof File)) {
        flatten(value, newKey);
      } else {
        append(newKey, value);
      }
    }
  }

  flatten(data);
  return params.toString();
}
```

get案例

```javascript
ajax({
  method: 'GET',
  url: '/api/data?id=123&name=test'
}).then(res => console.log(res)).catch(err => console.error(err));
// 或
ajax({
  method: 'GET',
  url: '/api/data',
  data: { id: 123, name: 'test' }
}).then(res => console.log(res)).catch(err => console.error(err));
```

post案例

```javascript
ajax({
  method: 'POST',
  url: '/api/submit',
  data: { username: 'alice', password: '123456' }
}).then(res => console.log(res)).catch(err => console.error(err));
```

post案例json格式

```javascript
ajax({
  method: 'POST',
  url: '/api/json',
  data: JSON.stringify({ username: 'alice', password: '123456' }),
  headers: {
    'Content-Type': 'application/json'
  }
}).then(res => console.log(res)).catch(err => console.error(err));
```

文件上传

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

ajax({
  method: 'POST',
  url: '/api/upload',
  data: formData
}).then(res => console.log(res)).catch(err => console.error(err));
```

文件下载

```javascript
ajax({
  method: 'GET',
  url: '/api/download', // 替换为你的后端接口
  responseType: 'blob',  // 关键：接收 blob 数据
  data: {
    fileId: 123          // 可选参数，根据后端要求传
  }
}).then(response => {
  // 从响应头中获取文件名（假设后端返回了 Content-Disposition）
  const disposition = xhr.getResponseHeader('Content-Disposition');
  let filename = 'downloaded-file';

  if (disposition && disposition.indexOf('filename=') !== -1) {
    const fileNameMatch = disposition.match(/filename="?([^"]+)"?/);
    if (fileNameMatch.length > 1) {
      filename = decodeURIComponent(fileNameMatch[1]);
    }
  }

  // 创建 Blob 对象并创建下载链接
  const blob = new Blob([response]);
  const downloadUrl = window.URL.createObjectURL(blob);

  // 创建 a 标签进行下载
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', filename); // 设置下载文件名
  document.body.appendChild(link);
  link.click();

  // 清理资源
  link.remove();
  window.URL.revokeObjectURL(downloadUrl);

}).catch(error => {
  console.error('文件下载失败:', error);
});
```





