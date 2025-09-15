### <font style="color:rgb(44, 44, 54);">常见媒体类型</font>
+ <font style="color:rgb(44, 44, 54);">screen：用于屏幕显示。</font>
+ <font style="color:rgb(44, 44, 54);">print：用于打印。</font>
+ <font style="color:rgb(44, 44, 54);">speech：用于语音合成（如屏幕阅读器）。</font>
+ <font style="color:rgb(44, 44, 54);">all：适用于所有设备类型。</font>

### 1.分辨率
#### <font style="color:rgb(44, 44, 54);">1.1.通用手机和平板设备</font>
```css
@media screen and (max-width: 768px) {
  /* 手机和平板设备的样式 */
}
```

#### 1.2.<font style="color:rgb(44, 44, 54);">仅针对手机设备</font>
```css
@media screen and (max-width: 480px) {
  /* 手机设备的样式 */
}
```

#### 1.3.**<font style="color:rgb(44, 44, 54);">仅针对平板设备</font>**
```css
@media screen and (min-width: 481px) and (max-width: 768px) {
  /* 平板的样式 */
}
```

#### 1.4.bootstraps由小到大兼容写法
```css
/* 小屏幕及以上的样式 */
@media (min-width: 576px) {
  .custom-class {
    background-color: #f8f9fa;
  }
}

/* 中屏幕及以上的样式 */
@media (min-width: 768px) {
  .custom-class {
    background-color: #e9ecef;
  }
}

/* 大屏幕及以上的样式 */
@media (min-width: 992px) {
  .custom-class {
    background-color: #dee2e6;
  }
}

/* 超大屏幕及以上的样式 */
@media (min-width: 1200px) {
  .custom-class {
    background-color: #ced4da;
  }
}
```

### 2.针对不同方向的设备
```css
@media screen and (orientation: portrait) {
  /* 竖屏设备的样式 */
}

@media screen and (orientation: landscape) {
  /* 横屏设备的样式 */
}
```

### 3.打印样式
```css
@media print {
  /* 打印的样式 */
}
```

### 4.**<font style="color:rgb(44, 44, 54);">高分辨率屏幕</font>**
高分辨率下使用resolution特性<font style="color:rgb(44, 44, 54);">来检测设备的像素密度</font>。

+ `**<font style="color:rgb(44, 44, 54);">dpi</font>**`<font style="color:rgb(44, 44, 54);">：每英寸的点数。</font>
+ `**<font style="color:rgb(44, 44, 54);">dppx</font>**`<font style="color:rgb(44, 44, 54);">：每像素的点数，1 dppx = 96 dpi。</font>

```css
@media (min-resolution: 2dppx) {
  /* ios2倍屏的样式 */
}

@media (min-resolution: 3dppx) {
  /* ios3倍屏的样式 */
}
```

### 5.触摸设备
```css
/* 非触摸设备 */
@media (hover: hover) and (pointer: fine) {
  .button:hover {
    background-color: #ccc;
  }
}

/* 触摸设备 */
@media (hover: none) and (pointer: coarse) {
  .button:active {
    background-color: #ccc;
  }
}
```

### 6.系统深色模式
通常默认浅色，只对深色做代码兼容。

```css
@media (prefers-color-scheme: dark) {
  /* 深色模式下的样式 */
}
@media (prefers-color-scheme: light) {
  /* 亮色模式下的样式 */
}
@media (prefers-color-scheme: no-preference) {
  /* 无明确任何模式下的样式 */
}
```

### 7.兼容朗读speech
```css
@media speech {
  h1, h2, h3, h4, h5, h6 {
    voice-family: 'female'; /* 设置语音性别 */
    stress: 100; /* 设置重音强度 */
    richness: 100; /* 设置音色丰富度 */
  }
  p {
    pause-after: 50ms; /* 设置段落之间的停顿时间 */
  }
  a {
    speak: spell-out; /* 逐字朗读链接文本 */
  }
  ul, ol {
    speak: normal; /* 正常朗读列表项 */
  }
  li {
    pause-before: 25ms; /* 设置列表项之间的停顿时间 */
  }
  strong {
    volume: +10dB; /* 增加强调文本的音量 */
  }
  em {
    pitch-range: 50; /* 调整强调文本的音调范围 */
  }
}
```

