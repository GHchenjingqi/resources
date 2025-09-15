## Canvas基础知识
Canvas，是html5新增的一个标签。用于展示通过 `JS`在这个标签上绘制各种图案。

### 一.canvas和svg的区别
+ 语言不通，canvas是通过js绘制的2D图像，svg使用xml描述2D图形；
+ svg是矢量图形，不依赖分辨率，不适合做游戏等大型渲染的程序；Canvas依赖分辨率，用于开发图形秘籍类的游戏。

### 二.canvas使用
在html中添加canvas标签:

```html
<canvas id="cas" width="300" height="300" > 
    你的浏览器不支持canvas
</canvas>

```

在js中创建canvas画布进行绘制。

```javascript
var cv = document.getElementById("cas");//获取canvas画布渲染盒子
if(!cv.getContext) return;//检测是否支持画布
var ctx = cv.getContext("2d");//创建二维画布
```

#### 1.画矩形 fillRect
+ fillStyle  填充颜色样式
+ fillRect   绘制矩形
+ strockRect  绘制描边矩形
+ clearRect  清除矩形区域的内容

```javascript
function draw(){//简单的canvas绘制矩形的方法
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    ctx.fillStyle = "#000000";//绘制样式
    ctx.fillRect(10,10,10,10);//绘制形状，填充矩形fillRect(x轴位置,y轴位置,宽度,高度);
     //描边矩形strockRect(x, y, width, height)；
     //清除矩形区域clearRect(x, y, widh, height)
}
draw();
```

#### 2.画直线
画直线步骤：开始创建路径beginPath => 移动到起点moveTo => 绘制终点lineTo => 绘制线宽lineWidth => 结束路径closePath => 路径描边stroke。

```javascript
function draw(){//绘制线段
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布

    ctx.beginPath();//绘制路径开始
    ctx.moveTo(0,0);//绘制路径起点
    ctx.lineTo(300,150);//绘制路径的结束点
    ctx.lineWidth= 5;//线宽，默认是1.0
    ctx.closePath();//闭合路径
    ctx.stroke();//绘制线段,默认为黑色

}
draw();
```

#### 3.画三角形
绘制三角形方法和绘制直线一样，需要通过路径创建形状，然后填充颜色或者描边。

```javascript
function draw(){//填充三角形
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    
    ctx.beginPath();//绘制路径开始
    ctx.moveTo(10,10);//绘制第一个顶点
    ctx.lineTo(50,150);//绘制第二个顶点
    ctx.lineTo(150,80);//绘制第三个顶点
    ctx.closePath();//闭合路径
    
    ctx.fill();//绘制线段,默认为黑色
    // 也可以使用stroke绘制描边三角形 ctx.stroke();//绘制线段,默认为黑色
}
draw();
```

#### 4.画圆形
通过 arc 方法绘制闭合路径：

+ arc(x, y, r, startAngle, endAngle, anticlockwise):    以(x, y)为圆心，以r为半径，从 startAngle弧度开始到endAngle弧度结束。anticlosewise是布尔值，true表示逆时针，false表示顺时针。(默认是顺时针)

```javascript
function draw(){//简单的canvas绘制矩形的方法
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    ctx.beginPath();
    ctx.arc(150,150,50,0,2*Math.PI);
    ctx.fillStyle= "red";
    ctx.fill();//填充
}
draw();
```

#### 5.画弧线
绘制弧线有2个方法，一种是arc方法，另外一种是使用arcTo方法实现。

+ arcTo(x,y,m,n,r)    以控制点1（x,y) 和控制点2（m,n)  r是弧线半径。

```javascript
function draw(){//填充圆弧
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    ctx.beginPath();//绘制路径开始
    ctx.arc(50, 50, 40, 0, 2*Math.PI , false);
    ctx.arcTo(50,50,5,100,100);
    ctx.stroke();//绘制线段,默认为黑色
}
draw();
```

#### 6.贝塞尔曲线
+ quadraticCurveTo 绘制贝塞尔一次二次曲线
+ bezierCurveTo 绘制贝塞尔三次曲线

无论绘制贝塞尔任何曲线，都需要先移动到起点位置，再创建控制点。如果没有起点，quadraticCurveTo 绘制成直线。

绘制步骤：beginPath =>moveTo => quadraticCurveTo =>stroke

```javascript
function draw(){//贝塞尔一次，二次曲线quadraticCurveTo
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    
    ctx.beginPath();//绘制路径开始
    ctx.moveTo(10,10);//绘制第一个顶点，没有起点，贝塞尔曲线是一次直线
    ctx.quadraticCurveTo(50, 20, 10, 60);//贝塞尔曲线
    
    ctx.stroke();//绘制线段,默认为黑色
}
draw();
```

```javascript
function draw(){//贝塞尔三次次曲线bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)：
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    
    ctx.beginPath();//绘制路径开始
    ctx.moveTo(10,10);//绘制第一个顶点，可以4个点控制
    var cp1x = 5,cp1y= 8;//控制点1
    var cp2x = 50,cp2y= 46;//控制点2
    var x = 180,y= 46;//控制点2
    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);//至少三个点
    
    ctx.stroke();//绘制线段,默认为黑色
}
draw();
```

#### 7.虚线
canvas 通过 setLineDash 设置 实线长度和间隔 和lineDashOffset设置偏移量，最后使用描边绘制形状。就得到了对应虚线的形状了。

```javascript
function draw(){//虚线
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布

    ctx.setLineDash([20, 5]);  // [实线长度, 间隙长度]
    ctx.lineDashOffset = -10;//lineDashOffset属性设置起始偏移量
    
    ctx.strokeRect(50, 50, 210, 210);
}
draw();
```

#### 8.画文字
canvas使用 fillText绘制文字。

+ fillText(text, x, y [, maxWidth])  在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.
+ strokeText(text, x, y [, maxWidth])  在指定的(x,y)位置绘制描边文字，绘制的最大宽度是可选的

文字样式可选属性：

+ font 文字大小和样式
+ textAlign 对齐方式:center,left,right。
+ textBaseline 基线对齐方式：top, hanging, middle, alphabetic, ideographic, bottom。
+ direction 文本方向：ltr, rtl, inherit。默认值是 inherit。

```javascript
function draw(){
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布

    ctx.font = "20px sans-serif"; // 文字样式
    ctx.textAlign = "center"; // 对齐方式
    ctx.fillText("天若有情", 10, 100);//
}
draw();
```

#### 9.移动 translate
translate坐标**原点移动**

```javascript
function draw(){/
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    
    ctx.save(); //保存坐原点平移之前的状态
    ctx.translate(100, 100);
    ctx.strokeRect(0, 0, 100, 100)
    ctx.restore(); //恢复到最初状态
    ctx.translate(220, 220);
    ctx.fillRect(0, 0, 100, 100)
}
draw();
```

#### 10.旋转 rotate
使用 **rotate** 旋转坐标轴旋转的角度(angle)，它是顺时针方向的，以弧度为单位的值。旋转的中心是坐标原点。

```javascript
function draw(){
    var cv = document.getElementById("cas");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 50, 50)

    ctx.save();
    ctx.translate(100, 100);
    ctx.rotate(Math.PI / 180 * 45);
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 100, 100);
    ctx.restore();

    ctx.save();
    ctx.translate(0, 0);

    ctx.restore();
}
draw();
```

#### 11.变形 transform
transform变形矩阵

```javascript
function draw(){
    var cv = document.getElementById("tou");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布

    ctx.transform(1, 1, 0, 1, 0, 0);
    ctx.fillRect(0, 0, 100, 100);
}
draw();
```

#### 12.裁剪 clip
clip()把已经创建的路径转换成裁剪路径。

裁剪路径的作用是遮罩。只显示裁剪路径内的区域，裁剪路径外的区域会被隐藏。

```javascript
function draw(){//
    var cv = document.getElementById("tou");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布

    ctx.beginPath();
    ctx.arc(20,20, 100, 0, Math.PI * 2);
    ctx.clip();

    ctx.fillStyle = "pink";
    ctx.fillRect(50, 20, 100,100);
}
draw();
```

#### 13.形状合成 globalCompositeOperation
接收参数：

+ source-over(default)这是默认设置，新图像会覆盖在原有图像。
+ source-in 仅仅会出现新图像与原来图像重叠的部分，其他区域都变成透明的。(包括其他的老图像区域也会透明)
+ source-out仅仅显示新图像与老图像没有重叠的部分，其余部分全部透明。(老图像也不显示)
+ source-atop新图像仅仅显示与老图像重叠区域。老图像仍然可以显示。
+ destination-over新图像会在老图像的下面。
+ destination-in 仅仅新老图像重叠部分的老图像被显示，其他区域全部透明。
+ destination-out仅仅老图像与新图像没有重叠的部分。 注意显示的是老图像的部分区域。
+ destination-atop 老图像仅仅仅仅显示重叠部分，新图像会显示在老图像的下面。
+ lighter 新老图像都显示，但是重叠区域的颜色做加处理
+ darken 保留重叠部分最黑的像素。(每个颜色位进行比较，得到最小的)blue: #0000ff  red: #ff0000 所以重叠部分的颜色：#000000
+ lighten 保证重叠部分最量的像素。(每个颜色位进行比较，得到最大的)blue: #0000ff  red: #ff0000 所以重叠部分的颜色：#ff00ff
+ xor 重叠部分会变成透明
+ copy 只有新图像会被保留，其余的全部被清除(边透明)

```javascript
function draw(){//globalCompositeOperation 合成
    var cv = document.getElementById("tou");//获取canvas画布渲染盒子
    if(!cv.getContext) return;//检测是否支持画布
    var ctx = cv.getContext("2d");//创建二维画布
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, 200, 200);
    
    ctx.globalCompositeOperation = "source-in"; //全局合成操作
    ctx.fillStyle = "red";
    ctx.fillRect(100, 100, 200, 200);
}
draw();
```

#### 14.颜色
+ fillStyle - 填充颜色
+ strokeStyle - 描边颜色

```plain
ctx.fillStyle = "red";
```

#### 15.渐变颜色
##### 线性渐变：createLinearGradient(x1,y1,x2,y2)
根据 2个坐标点 决定线性渐变的方向。

通过addColorStop 增加渐变的控制点颜色。

```javascript
ctx.beginPath()
// 使用 Path2D 代理路径
let arx = new Path2D()
arx.arc(300,200,50,0,Math.PI * 2,true)
ctx.lineWidth = '5'

// 定义渐变色 ctx.createLinearGradient(x,y, x2, y2)
let linnerColor = ctx.createLinearGradient(200,200,400,200)
linnerColor.addColorStop(0,'red')
linnerColor.addColorStop(1,'blue')
ctx.strokeStyle = linnerColor

ctx.stroke(arx)
ctx.closePath()
```

##### 径向渐变：createRadialGradient(x,y,r,  x2, y2,r2)
根据2个圆绘制径向渐变。

通过addColorStop 增加渐变颜色。

```javascript
let RadialrColor = ctx.createRadialGradient(300,200,5,300,200,100)
RadialrColor.addColorStop(0,'red')
RadialrColor.addColorStop(1,'blue')
ctx.fillStyle = RadialrColor
ctx.fillRect(200,100,200,200)
```

#### 16.背景填充 createPattern
_context_.createPattern(_image_,"repeat|repeat-x|repeat-y|no-repeat");

该方法用于 刮奖效果

```javascript
let img = document.createElement("img")
img.src = "../hd.png"
img.onload = function(){
    var pat= ctx.createPattern(img,"repeat");
    ctx.rect(0,0,600,400)
    // 缩放 scale(横比例，纵比例)
    ctx.scale(0.1,0.1)
    // 填充
    ctx.fillStyle = pat
    ctx.fill()
}
```

#### 17.阴影
<font style="color:rgb(44, 44, 54);">Canvas 2D 渲染上下文提供了以下四个属性来控制阴影：</font>

+ shadowColor  <font style="color:rgb(44, 44, 54);">阴影的颜色，支持rgb/a, hex等色值</font>
+ <font style="color:rgb(44, 44, 54);">shadowBlur 模糊程度 ，默认值0，值必须>=0</font>
+ <font style="color:rgb(44, 44, 54);">shadowOffsetX 在x轴的偏移量，默认值0</font>
+ <font style="color:rgb(44, 44, 54);">shadowOffsetY 在y轴的偏移量，默认值0</font>

```javascript
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // 半透明黑色
ctx.shadowBlur = 10;                     // 模糊半径 10 像素
ctx.shadowOffsetX = 5;                   // 向右偏移 5 像素
ctx.shadowOffsetY = 5;                   // 向下偏移 5 像素

ctx.fillStyle = 'lightblue'; // 矩形填充色
ctx.fillRect(50, 50, 100, 80); // 绘制矩形
```

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1754042856670-80393f78-e3a8-4c19-88fb-1923bef05ef2.png)

