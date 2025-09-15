### CSS 元素单位
```markdown
PX 像素，绝对单位，浏览器物理像素单位
%  相对单位，默认相对父元素;如果父级没有设置，就相对根子号，甚至浏览器的默认大小
rem  相对单位，相对于根字号，默认 1rem = 16px，假如修改了根字号 1rem = 根字号
em 相对单位，默认相对父元素的font-size，1em = 父元素的字号
vw  将视口宽度分成了100份  1vw = 视宽 / 100
vh  将视口高度分层了100份 1vh = 视高 / 100
vmin 视口最短边的长度
vmax 视口最长边的长度
rpx 是小程序常用的相对单位(小程序规定屏幕宽度 750rpx)，默认屏宽按照iPhone6( 物理宽度375px)，dpr:2   100vw = 750rpx = 375px   , 相当于 1rpx = 0.5px
```

### CSS 溢出隐藏
```css
.text-h1 {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
.text-h2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical
}
.text-h3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical
}
```

### CSS 滚动轴样式
```css
/* 通用滚动条美化方案 */
::-webkit-scrollbar {
  width: 12px;  /* 垂直滚动条宽度 */
  height: 12px; /* 水平滚动条高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border-radius: 10px;
  border: 3px solid #f1f1f1;
  transition: all 0.3s ease;
}

/* 悬停效果 */
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #ff5252, #ff7675);
  transform: scale(1.05);
}
```

### CSS 鼠标穿透事件
```css
.pointer-none{
  pointer-events:none
}
```

### CSS 文本禁止选择
```css
.sel-no{
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
```

### CSS 变量修改
```css
body{
  --color:red;
}

// js
document.body.style.setProperty('--color', "blue")
```

### CSS 毛玻璃
```css
.glass-card{
  background: rgba(255, 255, 255, 0.5); /* 半透明背景 */
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px); /* 毛玻璃核心 */
  -webkit-backdrop-filter: blur(10px); /* Safari 兼容 */
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: white;
}
```

### CSS 鼠标指针样式修改
```css
#app{
  cursor: url('@/assets/icons/cursor.svg'), pointer;
}
```

### CSS 实现交融动画
+ 通过**<font style="color:#DF2A3F;">颜色滤镜</font>**实现： 子元素开启模糊，让边缘处于灰色，父盒子必须是白色或黑色，才能与子元素做对比计算，这样就将低于对比度的改为白色，高于的改为黑色，从而实现交融融合效果。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753427937330-112f6f40-082b-4605-9d6f-6374800574eb.png)

缺点：不能用其他颜色，会产生颜色差异！

```html
<style>
  .group {
    width: 100vw;
    height: 100vh;
    position: relative;

    filter: contrast(10);
    background-color: #fff;
  }
  .cicle{
    width: 100px;
    height: 100px;
    background-color: #000;
    border-radius: 100px;
    position: absolute;
    left: 300px;
    bottom: 500px;
    filter: blur(10px);
  }
  .ani {
    animation: move 2s linear infinite;
  }
  @keyframes move {
    0%{  bottom: 300px }
    100%{ bottom:500px }
  }
</style>
<div class="group">
  <div class="cicle ani"></div>
  <div class="cicle"></div>
</div>
```

+ 通过透明滤镜实现：创建子元素svg，通过svg滤镜算法实现，原理和颜色滤镜一样，但是效果高于颜色滤镜。

只需要父级使用svg滤镜就行 filter: url(#goo)。

```html
<style>
  .group {
    width: 100vw;
    height: 100vh;
    position: relative;
    filter: url(#goo);
  }
  .cicle{
    width: 100px;
    height: 100px;
    background-color: #111;
    border-radius: 100px;
    position: absolute;
    left: 300px;
    bottom: 500px;
  }
  .ani {
    animation: move 2s linear infinite;
  }
  @keyframes move {
    0%{  bottom: 300px }
    100%{ bottom:500px }
  }
</style>
<div class="group">
  <div class="cicle ani"></div>
  <div class="cicle"></div>
</div>
<svg style="display: none;">
  <defs>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
      <feColorMatrix in="blur" mode="matrix" values="
        1 0 0 0 0  
        0 1 0 0 0  
        0 0 1 0 0  
        0 0 0 20 -10" result="goo"></feColorMatrix>
    </filter>
  </defs>
</svg>
```



+ 文字交融效果

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1753429654370-8fcf0c53-ff41-45cc-884a-76a2824ea892.png)

原理同上。

```html
<style>
  .group {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    filter: contrast(10);
  }
  .text{
    text-align: center;
    font-weight: 600;
    font-size: 50px;
    letter-spacing: -50px;
    filter: blur(2px);
  }
  .ani {
    animation: move 2s linear infinite;
  }
  @keyframes move {
    0%{  letter-spacing: -30px }
    100%{  letter-spacing: 10px  }
  }
</style>
<div class="group">
  <div class="text ani">Hello World!</div>
</div>
```

### CSS <font style="color:rgb(64, 64, 64);">硬件加速</font>
will-change 是一个用于性能优化的 CSS 属性，它提前告知浏览器元素可能发生的变化，让浏览器提前准备优化资源。

**<font style="color:rgb(64, 64, 64);">核心作用：</font>**

1. **<font style="color:rgb(64, 64, 64);">性能优化</font>**<font style="color:rgb(64, 64, 64);">：提示浏览器该元素即将进行变换（transform/opacity/color等）</font>
2. **<font style="color:rgb(64, 64, 64);">创建独立图层</font>**<font style="color:rgb(64, 64, 64);">：将元素提升到单独的合成层，避免重绘时影响整个页面</font>
3. **<font style="color:rgb(64, 64, 64);">减少渲染卡顿</font>**<font style="color:rgb(64, 64, 64);">：提前分配 GPU 资源，使动画更流畅</font>

```css
.element {
  will-change: transform; /* 只声明实际会变化的属性 */
  transition: transform 0.3s ease;
}

.element:hover {
  transform: scale(1.05);
}
```

### CSS 盒子内部四周阴影
```css
 box-shadow:  inset 0 0 10px 5px (235, 10, 10, 0.6);
```

### CSS 文字渐变色
```css
.liner-text{
  background-image: linear-gradient(45deg, #8fcdff, #fdebf4);
  /* 将背景应用到文字上 */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  /* 兼容性写法（非WebKit内核浏览器） */
  background-clip: text;
  color: transparent;
}
```

### CSS 颜色模式切换
需要配合meta元素，定义深色、浅色模式样色。

```html
<!-- 支持浅色模式（默认） -->
<meta name="color-scheme" content="light">

<!-- 支持深色模式 -->
<meta name="color-scheme" content="dark">

<!-- 同时支持浅色和深色模式（推荐） -->
<meta name="color-scheme" content="light dark">
```

通过prefers-color-scheme指定深色模式的CSS预设：

```css
/* 定义浅色模式变量 */
:root {
  --bg-color: #f5f5f5;
  --text-color: #333333;
  --primary-color: #4a90e2;
}

/* 深色模式变量（覆盖浅色模式） */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #f0f0f0;
    --primary-color: #6ab0f3;
  }
}
```

### CSS 倒影效果
box-reflect在谷歌浏览器完全支持，在IE/火狐不兼容。

```css
-webkit-box-reflect:below 15px -webkit-linear-gradient(transparent,transparent 30%,rgba(255,255,255,.3));
```

