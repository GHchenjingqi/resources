## Worker对象

worker用于创建子线程，不会阻塞主线程，互不干涉。它是一种网络接口，不能直接访问window和dom元素。

self 是线程js的当前对象。

##### 应用场景：

- 处理超大数据
- 分析视频、音频、pdf等文件

#### 使用

父页面和线程js通过**postMessage**传递消息；

通过**onmessage** 接收数据。

错误通过onerror捕获。

#### 关闭线程

线程开启之后需要手动关闭，不然一直在。

- 主线程关闭子线程

```js
work.terminate()
```

- 子线程关闭当前线程

```js
self.close()
```

#### 案例：

主线程 - 父页面

```js
var work = new Worker("./a.js")
var arr = [3,5,6,2,1]
// 父页面传递数据
work.postMessage(arr)
// 父页面接收子线程处理后的数据
work.onmessage = function(e){
    console.error(e.data)
}
```

子线程 - js文件

```js
// 接收消息
self.onmessage = function(e){
	// 处理数据
	let arr2 = sort(e.data)
	// 向主线程发送消息
	self.postMessage(arr2)
    // 关闭子线程
    self.close()
}

function sort(arr){
	return arr.sort((a,b) => a - b)
}
```

子线程不能使用以下

- window 对象
- document 对象
- parent 对象
- alert 和 confirm

