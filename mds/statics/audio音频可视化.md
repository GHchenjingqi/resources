### 音频可视化
<font style="color:rgba(0, 0, 0, 0.85);">音频可视化是一种将音频信号转换为视觉形式的技术和过程，通过图形、图像等视觉元素来直观地展示音频的各种特征和信息，使人们能够以视觉方式感知和理解音频内容。</font>

#### <font style="color:rgba(0, 0, 0, 0.85);">音频数据处理</font>
<font style="color:rgba(0, 0, 0, 0.85);">音频处理通过Web Audio API实现，以下是获取可视化数据的方法：</font>

```javascript
// 创建音频上下文
const audioContext = new AudioContext();
// 将音频元素连接到音频上下文
const source = audioContext.createMediaElementSource(audio);
// 创建音频分析器
analyser = audioContext.createAnalyser();
bufferLength = analyser.frequencyBinCount;
analyser.fftSize = bufferLength / 2

// 音乐源连接分析器节点
source.connect(analyser);
// 分析器连接输出设备
analyser.connect(audioContext.destination);

// 定义音频数据类型： 8位无符号整数
arrlist = new Uint8Array(bufferLength)
// 分析的数据输出到 定长数组
analyser.getByteFrequencyData(arrlist)
```

<font style="color:rgba(0, 0, 0, 0.85);"> 执行流程图：</font>![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1741761074634-e03d1609-8637-4e20-b937-7f0790f6892a.png)



#### 可视化案例
```javascript
let canvas, ctx, canvas2, ctx2
let audio, analyser,bufferLength, arrlist
let isPlaying = false // 播放状态
const dpr = window.devicePixelRatio || 1;

init()
function init(){
    canvasInit()
    canvasInit2()
    audioInit()
}
function canvasInit(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    // 设置 canvas 分辨率
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);
}
function canvasInit2(){
    canvas2 = document.getElementById('canvas2');
    ctx2 = canvas2.getContext('2d');
    // 设置 canvas 分辨率
    canvas2.width = canvas2.clientWidth * dpr;
    canvas2.height = canvas2.clientHeight * dpr;
    ctx2.scale(dpr, dpr);
}

function audioInit(){
    audio = document.getElementById('audio');
    audio.src = 'http://124.70.13.57/music/tdll.mp3'
    audio.controls = true
    audio.autoplay = false
    audio.crossOrigin = 'anonymous';
    // 监听音频播放事件
    audio.addEventListener('play', () => {
        isPlaying = true;
        creatAudioVisolization()
        draw(); // 开始绘制
        draw2()
    });

    // 监听音频暂停事件
    audio.addEventListener('pause', () => {
        isPlaying = false;
    });

    // 监听音频结束事件
    audio.addEventListener('ended', () => {
        isPlaying = false;
        clearCanvas(); // 清空画布
    });
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)
}

// Web Audio API
function creatAudioVisolization(){
    // 创建音频上下文
    const audioContext = new AudioContext();
    // 将音频元素连接到音频上下文
    const source = audioContext.createMediaElementSource(audio);
    // 创建音频分析器
    analyser = audioContext.createAnalyser();
    bufferLength = analyser.frequencyBinCount;
    analyser.fftSize = bufferLength / 2
    // 音乐源连接分析器节点
    source.connect(analyser);
    // 分析器连接
    analyser.connect(audioContext.destination);
    // 定义音频数据
    arrlist = new Uint8Array(bufferLength)
}

// 横向对称柱状图
function draw() {
    if(!isPlaying) return
    requestAnimationFrame(draw)
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // 获取音频数据
    analyser.getByteFrequencyData(arrlist)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const bufferLength = analyser.frequencyBinCount;
    const barWidth = (canvas.width / bufferLength); // 计算每个柱子的实际宽度，现在考虑全部频率数据
    const halfBufferLength = Math.floor(bufferLength / 2); // 只用一半的数据来绘制，另一半用于镜像

    for (let i = 0; i < halfBufferLength; i++) {
        const magnitude = arrlist[i];
        const barHeight = magnitude * (canvas.height / 256); // 将频率值映射到画布高度

        // 计算柱子的颜色
        const r = magnitude + 50 > 255 ? 255 : magnitude + 50;
        const g = 50;
        const b = 150;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        // fillRect()
        // 绘制左侧柱子
        let xLeft = i * barWidth;
        let yLeft = canvas.height - barHeight;
        ctx.fillRect(xLeft, yLeft, barWidth, barHeight);
        // 绘制右侧柱子（对称）
        let xRight = canvas.width - ((i + 1) * barWidth );
        let yRight = canvas.height - barHeight;
        ctx.fillRect(xRight, yRight, barWidth, barHeight);
    }
}

// 圆形
function draw2(){
    if (!isPlaying) return; // 如果音频没有在播放，则不再继续绘制

    requestAnimationFrame(draw2);

    // 获取音频数据
    analyser.getByteFrequencyData(arrlist);

    // 清除画布
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

    const bufferLength = analyser.frequencyBinCount;
    const centerX = canvas2.width / 2;
    const centerY = canvas2.height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    const innerRadius = radius * 0.5;
    const angleStep = (Math.PI * 2) / bufferLength;

    for (let i = 0; i < bufferLength; i++) {
        const magnitude = arrlist[i];
        const barHeight = magnitude * (radius - innerRadius) / 256;

        // 动态颜色设置
        const r = magnitude + 50 > 255 ? 255 : magnitude + 50;
        ctx2.fillStyle = `rgb(${r},50,150)`;

        // 主角度范围（上方）
        const startAngle = i * angleStep;
        const endAngle = (i + 1) * angleStep;
        // 镜像角度范围（下方）
        const mirroredStart = Math.PI * 2 - endAngle;
        const mirroredEnd = Math.PI * 2 - startAngle;

        // 绘制上方扇形条
        drawSector(startAngle, endAngle, barHeight);
        // 绘制下方镜像扇形条
        drawSector(mirroredStart, mirroredEnd, barHeight);
    }

    function drawSector(start, end, height) {
        const outerR = innerRadius + height;

        ctx2.beginPath();
        // 内圈起点 -> 外圈起点 -> 外圈弧 -> 内圈终点 -> 内圈弧（逆向闭合）
        ctx2.moveTo(
            centerX + Math.cos(start) * innerRadius,
            centerY + Math.sin(start) * innerRadius
        );
        ctx2.lineTo(
            centerX + Math.cos(start) * outerR,
            centerY + Math.sin(start) * outerR
        );
        ctx2.arc(centerX, centerY, outerR, start, end);
        ctx2.lineTo(
            centerX + Math.cos(end) * innerRadius,
            centerY + Math.sin(end) * innerRadius
        );
        ctx2.arc(centerX, centerY, innerRadius, end, start, true);
        ctx2.closePath();
        ctx2.fill();
    }
}

```

效果：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1741761274986-4ec84c6c-3131-440c-a0f8-d9a6532488ba.png)

注意：音频文件需要允许跨域请求。

###  音频文件转为二进制文件
<font style="color:rgb(143, 143, 143);"> 二进制格式：Int8Array、Uint8Array、Int16Array、Int32Array</font>

```javascript
fetch('0002.wav')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    // 创建Blob对象
    const blob = new Blob([arrayBuffer], { type: 'audio/wav' });

    // 创建一个FileReader实例
    const reader = new FileReader();

    // 文件读取成功完成后的处理
    reader.onload = function(event) {
      // event.target.result 包含了二进制的数据
      console.log(event.target.result);
    };

    // 以二进制形式读取Blob
    reader.readAsArrayBuffer(blob);
});
```

