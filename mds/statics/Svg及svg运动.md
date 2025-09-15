## <font style="color:rgb(77, 77, 77);">一、svg基础知识</font>
svg基础形状有6种：circle | rect | ellipse | line | polyline | path

```html
<!-- svg 宽、高、viewbox可视窗口大小 -->
	<svg  width="200px" height="200px" viewbox="0 0 200 200"  version="1.1" xmlns="http://www.w3.org/2000/svg">
		<!-- circle 圆形  圆心（cx,cy） 半径r  填充fill -->
	  <circle cx="150" cy="50" r="50" fill="#333"></circle>
		<!-- rect 矩形 起点（x,y）宽、高   stroke描边色 fill填充色 stroke-width描边线宽-->
		<rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="2"></rect>
		<!-- rect 圆角矩形 起点（x,y） 圆角（rx,ry)  -->
		<rect x="60" y="10" rx="5" ry="5" width="30" height="30" stroke="black" fill="transparent" stroke-width="2"/>
		<!-- ellipse 椭圆形  圆心（cx,cy） x半径rx  y半径ry -->
		<ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="2"/>
		<!-- line 直线  点1（x1,y1）点2（x2,y2） -->
		<line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="2"/>
		<!-- polyline 折线  points点集合-->
		<polyline points="60, 110 65, 120 70, 115 75, 130 80, 125 85, 140 90, 135 95, 150 100, 145"  stroke="red" />
		<!-- path 路径  d路径集合  
				M = moveto(M X,Y) ：将画笔移动到指定的坐标位置
				L = lineto(L X,Y) ：画直线到指定的坐标位置
				H = horizontal lineto(H X)：画水平线到指定的X坐标位置
				V = vertical lineto(V Y)：画垂直线到指定的Y坐标位置
				C = curveto(C X1,Y1,X2,Y2,ENDX,ENDY)：三次贝赛曲线
				S = smooth curveto(S X2,Y2,ENDX,ENDY)：平滑曲率
				Q = quadratic Belzier curve(Q X,Y,ENDX,ENDY)：二次贝赛曲线
				T = smooth quadratic Belzier curveto(T ENDX,ENDY)：映射
				A = elliptical Arc(A RX,RY,XROTATION,FLAG1,FLAG2,X,Y)：弧线
				Z = closepath()：关闭路径
		-->
		<path d="M20,130 Q40,15 50,130 T90,130" fill="none" stroke="blue" stroke-width="2"/>
	</svg>
```

![](https://cdn.nlark.com/yuque/0/2024/svg/1460947/1722839304679-03fb16eb-36fd-4661-aa66-4a711aa353c4.svg)

## <font style="color:rgb(77, 77, 77);">二、svg运动</font>
<font style="color:rgb(77, 77, 77);">svg元素运动可以使用以下标签完成：</font>

```markdown
<set />
<animate />
<animateColor />
<animateTransform />
<animateMotion />
```

### <font style="color:rgb(77, 77, 77);">1.利用</font><font style="color:rgb(77, 77, 77);">svg中的</font><font style="color:rgb(77, 77, 77);"> <set/>标签实现</font>
3秒后移动到x轴60px处

```html
<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <title>马儿跑</title>
  <g> 
    <text font-family="microsoft yahei" font-size="120" y="160" x="160">
		马
	    <set attributeName="x" attributeType="XML" to="60" begin="3s" />
	</text>
  </g>
</svg>
```

+ attributeName 运动属性
+ to="60" 到指定位置
+ begin="3s" 开始时间

![](https://cdn.nlark.com/yuque/0/2024/svg/1460947/1722836251328-82d046dc-ae29-487d-9b81-789acec48273.svg)

### <font style="color:rgb(77, 77, 77);">2.利用</font><font style="color:rgb(77, 77, 77);">svg中的</font><font style="color:rgb(77, 77, 77);"> <</font><font style="color:rgb(51, 51, 51);">animate/</font><font style="color:rgb(77, 77, 77);">>标签实现</font>
无限循环运动，从右到左移动到60px处

```html
<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <g> 
    <text font-family="microsoft yahei" font-size="120" y="160" x="160">
    马
      <animate attributeName="x" from="160" to="60" begin="0s" dur="3s" repeatCount="indefinite" />
    </text>
  </g>
</svg>
```

+ attributeName 运动属性
+ from="160" 开始位置
+ to="60" 到指定位置
+ begin="0s" 开始时间
+ dur="3s" 动画时长
+  repeatCount="indefinite"  无限循环

![](https://cdn.nlark.com/yuque/0/2024/svg/1460947/1722836210452-b0eabe51-d434-4aaa-a84e-63f0df3b07a0.svg)

### <font style="color:rgb(77, 77, 77);">3.利用</font><font style="color:rgb(77, 77, 77);">svg中的</font><font style="color:rgb(77, 77, 77);"> <</font><font style="color:rgb(51, 51, 51);">animateColor/</font><font style="color:rgb(77, 77, 77);">>标签实现</font>
是颜色动画，目前已废弃，不支持使用。可以使用<font style="color:rgb(51, 51, 51);">animate代替。</font>

<font style="color:rgb(51, 51, 51);"></font>

### <font style="color:rgb(77, 77, 77);">4.利用</font><font style="color:rgb(77, 77, 77);">svg中的</font><font style="color:rgb(77, 77, 77);"> <</font><font style="color:rgb(51, 51, 51);">animateTransform/</font><font style="color:rgb(77, 77, 77);">>标签实现</font>
效果等效于css3的<font style="color:rgb(51, 51, 51);">transform</font>

```html
<svg width="320" height="320" xmlns="http://www.w3.org/2000/svg">
  <g> 
    <text font-family="microsoft yahei" font-size="80" y="100" x="100">马</text>
    <animateTransform attributeName="transform" begin="0s" dur="3s"  type="scale" from="1" to="1.5" repeatCount="indefinite"/>
  </g>
</svg>
```

+ attributeName="transform"  要运动属性
+ begin="0s" 开始时间
+ dur="3s"  动画时长
+ type="scale"  动画类型
+ from="1"  开始属性值
+ to="1.5"  结束属性值
+ repeatCount="indefinite" 无限循环

![](https://cdn.nlark.com/yuque/0/2024/svg/1460947/1722836541153-8c19f517-54fe-4cbd-843e-3134113a7665.svg)

### <font style="color:rgb(77, 77, 77);">5.利用svg中的</font>**<font style="color:rgb(77, 77, 77);"><animateMotion/></font>**<font style="color:rgb(77, 77, 77);">标签实现</font>
红点无限循环绕path运动

```html
<svg width="900px" height="600px" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <path id="path1" stroke-width="2" fill="transparent" stroke="black" d="m289.77678,224.0641c-34,-14.79094 -285,-17.79094 -286,-106.50871c-1,-88.71777 415.99999,-110.3554 434.99999,-111.3554c19,-1 461.99999,9.12196 461.99999,101.42509c0,92.30313 -355,118.64808 -371,127.74564c-16,9.09756 -74,41.99652 -80,102.82927" />
  <circle r="5" fill="red" >
    <animateMotion dur="3s"  repeatCount="indefinite">
      <mpath href="#path1"/>
    </animateMotion>
  </circle>
</svg>
```

+ dur 指定动画时长，repeatCount 重复次数  <animateMotion dur="3s"  
+ repeatCount="indefinite">mpath的 指定运动路径  <mpath href="#path1"/>



![](https://cdn.nlark.com/yuque/0/2024/svg/1460947/1722836938863-1854c63e-8d50-4cd2-83ea-83afe78aa53b.svg)





