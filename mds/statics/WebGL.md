<font style="color:rgb(77, 77, 77);">webgl需要图形学知识，而webgl需要通过js和glsl两种语言。</font>

## webGL 坐标系
与canvas坐标系不同（原点在左上角），webgl的原点在画布中心位置（同数学坐标系一致）。

canvas坐标系如下：

![canvas坐标](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715736439252-32e0fad4-726f-408a-bbf9-481c6cdde3da.png)

webgl坐标系如下：

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715736504505-0f12968d-4c87-4123-998d-dc6a3f6224e7.png)

## webGL 颜色
webgl的颜色参数也是安装 rgba的顺序，和css的rgba一致，不同的是webgl的rgb三项值域为【0-1】，css中rgb的值域【0-255】，因此css色转webgl色rgb需要分别除以255。

```javascript
const rgba = [255,100,0,1]
const r = rgb[0] / 255;
const g = rgb[1] / 255;
const b = rgb[2] / 255;
const a = rgb[3];
gl.clearColor(r, g, b, a);
```

案例-颜色跑马灯

```javascript
import { Color } from "https://unpkg.com/three/build/three.module.js";
var color = new Color(1,0,0);
ani()
function ani(){
  // 每次R值偏移0.005
  color.offsetHSL(0.005, 0, 0);
  gl.clearColor(color.r, color.g, color.b, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  requestAnimationFrame(ani);
}
```

## webgl 着色器
webgl绘图需要用到两种着色器。vec4 （4维矢量对象）

1.顶点着色器 Vertex shader ：描述顶点的特征，如位置、颜色等

定点着色器代码 要要写在type=“x-shader/x-vertex” 的script中。

```javascript
<script id="vertexShader" type="x-shader/x-vertex">
    void main() {
        // 位置：x,y,z
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        // 大小
        gl_PointSize = 100.0;
    }
</script>
// 获取定点着色器内容
const vsSource = document.getElementById('vertexShader').innerText;
```



2.片元着色器 Fragment shader：进行逐片元处理，如光照。

片元着色程序，要写在type=“x-shader/x-fragment” 的script中。

```javascript
<script id="fragmentShader" type="x-shader/x-fragment">
    void main() {
        // 颜色:r,g,b
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
    }
</script>
// 获取片元着色器内容
const fsSource = document.getElementById('fragmentShader').innerText;
```

着色器初始化函数：

```javascript
function initShaders(gl, vsSource, fsSource) {
				//创建程序对象
				const program = gl.createProgram();
				//建立着色对象
				const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
				const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
				//把顶点着色对象装进程序对象中
				gl.attachShader(program, vertexShader);
				//把片元着色对象装进程序对象中
				gl.attachShader(program, fragmentShader);
				//连接webgl上下文对象和程序对象
				gl.linkProgram(program);
				//启动程序对象
				gl.useProgram(program);
				//将程序对象挂到上下文对象上
				gl.program = program;
				return true;
}

function loadShader(gl, type, source) {
				//根据着色类型，建立着色器对象
				const shader = gl.createShader(type);
				//将着色器源文件传入着色器对象中
				gl.shaderSource(shader, source);
				//编译着色器对象
				gl.compileShader(shader);
				//返回着色器对象
				return shader;
}

```

这样canvas的图形就有了颜色。

## webGL渲染规则
webgl绘图和canvas绘图不同，每次都会走完js主线程，再次绘图，每次异步执行gl.drawArrays方法都会把图像重置，重新画。

## webGL 着色器参数动态
### 位置参数动态化 - gl_Position
**1.设置位置动态参数**

```javascript
<script id="vertexShader" type="x-shader/x-vertex">
// attribute 向外抛出变量 a_Position ,类型是 vec4
    attribute vec4 a_Position;
    void main() {
	 gl_Position = a_Position;
	 gl_PointSize = 100.0;
 }
</script>
```

**2.获取动态位置参数**

js使用getAttribLocation从gl.program上下文中获取动态位置参数

```javascript
const a_Position  = gl.getAttribLocation(gl.program,'a_Position')
```

**3.改变动态位置参数 gl.vertexAttrib3f(变量,x,y,z)**

```javascript
gl.vertexAttrib3f(a_Position,0.0,0.5,0.0);
```

vertexAttrib3f 方法扩展 

```javascript
gl.vertexAttrib1f(location,v0)  // 修改第1个值
gl.vertexAttrib2f(location,v0,v1) // 修改前2个值
gl.vertexAttrib3f(location,v0,v1,v2) // 修改前3个值
gl.vertexAttrib4f(location,v0,v1,v2,v3) // 修改前4个值
```

案例 - 元素跟随点击位置，元素中心同点击的位置

```javascript
canvas.addEventListener("click",function(event){
	// 获取点击位置
	const { clientX,clientY } = event
	// 获取画布的位置信息
	const {left,top,width,height} = canvas.getBoundingClientRect();
	console.log(canvas.getBoundingClientRect())
	// 除皮，点击位置 - 画布边界 = 画布内部的点击位置信息
	const [cssX,cssY]=[clientX-left, clientY-top];
	// 半个画布宽高
	const [halfWidth,halfHeight]=[width/2,height/2];
	// 获取画布内点击的坐标信息
	const [xBaseCenter,yBaseCenter]=[cssX-halfWidth,cssY-halfHeight];
	// y轴取反
	const yBaseCenterTop=-yBaseCenter;
	// 数学坐标 => webgl坐标
	const [x,y]=[xBaseCenter/halfWidth,yBaseCenterTop/halfHeight];
	gl.vertexAttrib3f(a_Position,x,y,0.0);
	// 重新绘图
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// 清理绘图区
	gl.clear(gl.COLOR_BUFFER_BIT);
	// 绘制顶点
	gl.drawArrays(gl.POINTS, 0, 1);
})
```

案例 - 每次点击画布，就新增一个元素在点击位置

```javascript
let glPosition = []
canvas.addEventListener("click",function(event){
	// 获取点击位置
	const { clientX,clientY } = event
	// 获取画布的位置信息
	const {left,top,width,height} = canvas.getBoundingClientRect();
	// 除皮，点击位置 - 画布边界 = 画布内部的点击位置信息
	const [cssX,cssY]=[clientX-left, clientY-top];
	// 半个画布宽高
	const [halfWidth,halfHeight]=[width/2,height/2];
	// 获取画布内点击的坐标信息
	const [xBaseCenter,yBaseCenter]=[cssX-halfWidth,cssY-halfHeight];
	// y轴取反
	const yBaseCenterTop=-yBaseCenter;
	// 数学坐标 => webgl坐标
	const [x,y]=[xBaseCenter/halfWidth,yBaseCenterTop/halfHeight];
	glPosition.push({x,y})
	// 重新绘图
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// 清理绘图区
	gl.clear(gl.COLOR_BUFFER_BIT);
	// 绘制顶点
	glPosition.forEach(({x,y}) =>{
		gl.vertexAttrib2f(a_Position,x,y);
		gl.drawArrays(gl.POINTS, 0, 1);
	})
})
```

### 大小参数动态化
1.设置位置动态参数

```javascript
attribute float a_PointSize;
void main() {
	 gl_PointSize = a_PointSize;
}
```

2.获取动态大小参数

js使用getAttribLocation从gl.program上下文中获取动态位置参数

```javascript
const a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize ')
```

3.改变大小参数 gl.vertexAttrib1f(变量,size)

```javascript
gl.vertexAttrib1f(a_PointSize ,60);
```



案例 - 每次点击画布，新增元素随机大小，元素位置同鼠标点击位置

```javascript
let glPosition = []
canvas.addEventListener("click",function(event){
	// 获取点击位置
	const { clientX,clientY } = event
	// 获取画布的位置信息
	const {left,top,width,height} = canvas.getBoundingClientRect();
	// 除皮，点击位置 - 画布边界 = 画布内部的点击位置信息
	const [cssX,cssY]=[clientX-left, clientY-top];
	// 半个画布宽高
	const [halfWidth,halfHeight]=[width/2,height/2];
	// 获取画布内点击的坐标信息
	const [xBaseCenter,yBaseCenter]=[cssX-halfWidth,cssY-halfHeight];
	// y轴取反
	const yBaseCenterTop=-yBaseCenter;
	// 数学坐标 => webgl坐标
	const [x,y]=[xBaseCenter/halfWidth,yBaseCenterTop/halfHeight];
	const size = Math.random() * 50;
	glPosition.push({x,y,size})
	
	// 重新绘图
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// 清理绘图区
	gl.clear(gl.COLOR_BUFFER_BIT);
	// 绘制顶点
	glPosition.forEach(({x,y,size}) =>{
		gl.vertexAttrib2f(a_Position,x,y);
		gl.vertexAttrib1f(a_PointSize,size);
		gl.drawArrays(gl.POINTS, 0, 1);
	})
})
```

### 颜色参数动态化
1.设置颜色动态参数

```javascript
precision mediump float;
uniform vec4 u_FragColor;
void main() {
         gl_FragColor = u_FragColor;
}
```

2.获取动态颜色参数

```javascript
const u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');
```

3.改变颜色参数 gl.uniform4f(变量,...color)

```javascript
gl.uniform4f(u_FragColor,1.0,1.0,0.0,1.0);
```

uniform变量改变扩展 ：

+ <font style="color:rgb(25, 27, 31);">uniform4f - 4 是有4个数据，f 是float 浮点类型 ，4个参数分别就是rgba4个</font>
+ <font style="color:rgb(25, 27, 31);">uniform4fv - 4 是有4个数据，f 是float 浮点类型, v 是vector 矢量，因此可以由4个浮点构成</font>

案例 -  每次点击画布，新增元素随机大小，元素位置同鼠标点击位置，颜色随机

```javascript
let glPosition = []
canvas.addEventListener("click",function(event){
	// 获取点击位置
	const { clientX,clientY } = event
	// 获取画布的位置信息
	const {left,top,width,height} = canvas.getBoundingClientRect();
	// 除皮，点击位置 - 画布边界 = 画布内部的点击位置信息
	const [cssX,cssY]=[clientX-left, clientY-top];
	// 半个画布宽高
	const [halfWidth,halfHeight]=[width/2,height/2];
	// 获取画布内点击的坐标信息
	const [xBaseCenter,yBaseCenter]=[cssX-halfWidth,cssY-halfHeight];
	// y轴取反
	const yBaseCenterTop=-yBaseCenter;
	// 数学坐标 => webgl坐标
	const [x,y]=[xBaseCenter/halfWidth,yBaseCenterTop/halfHeight];
	const size = Math.random() * 50;
	const colors = new Float32Array([ Math.random(), Math.random(), Math.random(), 1.0 ])
	glPosition.push({x,y,size,colors})
	
	// 重新绘图
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	// 清理绘图区
	gl.clear(gl.COLOR_BUFFER_BIT);
	// 绘制顶点
	glPosition.forEach(({x,y,size,colors}) =>{
		gl.vertexAttrib2f(a_Position,x,y);
		gl.vertexAttrib1f(a_PointSize,size);
		gl.uniform4fv(u_FragColor,colors);
		gl.drawArrays(gl.POINTS, 0, 1);
	})
})
```

