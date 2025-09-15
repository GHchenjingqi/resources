官方地址：[https://hammerjs.github.io/](https://hammerjs.github.io/)

## hammerjs概述


Hammer.js 是一个开源的、轻量级的触屏设备 JavaScript 手势库。它可以在不需要依赖其他工具或库的情况下识别触摸和鼠标事件，允许同时监听多个手势，甚至自定义识别器，并识别滑动方向。



特点：轻量级 | 跨平台兼容 |  简单易用 |  可扩展性强



### 使用hammerjs


#### 安装


`npm install hammerjs`



#### 引入


`// 使用 CommonJS 语法（Node.js） const Hammer = require('hammerjs'); // 或者使用 ES6 语法（例如，在模块化的前端项目中） import Hammer from 'hammerjs';`



#### 初始化


`const manager = new Hammer(document.getElementById('element-id'));`



#### 事件


##### 1.轻击（Tap）- 点击元素时


`manager.on('tap', (ev) => { console.log('Tap event', ev); });`



##### 2.双击（Doubletap）- 轻击元素两次时触发


```javascript
manager.on('doubletap', (ev) => {  
  console.log('Doubletap event', ev);  
});
```



#### 3.滑动（Swipe）- 元素上滑动手指时触发


```javascript
manager.on('swipe', (ev) => {  
  console.log('Swipe event', ev);  
  switch (ev.direction) {  
    case Hammer.DIRECTION_LEFT:  
      console.log('Swiped left');  
      break;  
    case Hammer.DIRECTION_RIGHT:  
      console.log('Swiped right');  
      break;  
    // 可以添加其他方向的处理...  
  }  
});
```



+ SwipeLeft：向左滑动
+ Swiperight：向右滑动
+ Swipetup：向上滑动
+ Swipedown：向下滑动



#### 4.按压（Press）- 长按超过500ms触发


```javascript
manager.on('press', (ev) => {  
  console.log('Press event', ev);  
});
```



+ Pressup：点击事件离开时触发



#### 自定义手势配置 - 改变滑动事件触发的阈值


```javascript
const manager = new Hammer(myElement, {  
  swipe_velocity: 0.4, // 设置滑动速度阈值  
  swipe_max_touches: 1, // 设置同时触摸的最大数量  
  // 可以添加其他配置...  
});
```



#### 移除事件监听器 off


`manager.off('tap');`



#### 监听多个事件类型 on


使用空格分隔的方式来监听多个事件类型。在回调函数中，通过 event.type 属性来确定触发的是哪个事件。



```javascript
const myElement = document.getElementById('my-element');  
const mc = new Hammer(myElement);

mc.on('tap doubletap swipe press', (event) => {  
  switch (event.type) {  
    case 'tap':  
      console.log('Tap event triggered');  
      break;  
    case 'doubletap':  
      console.log('Double tap event triggered');  
      break;  
    case 'swipe':  
      console.log('Swipe event triggered');  
      // 你可以根据swipe的方向做进一步处理  
      switch (event.direction) {  
        case Hammer.DIRECTION_LEFT:  
          console.log('Swiped left');  
          break;  
        case Hammer.DIRECTION_RIGHT:  
          console.log('Swiped right');  
          break;  
        // 其他方向...  
      }  
      break;  
    case 'press':  
      console.log('Press event triggered');  
      break;  
    // 其他事件类型...  
  }  
});
```



#### 5.识别双指缩放（pinch）- 两个手指在元素上执行缩放动作时触发


```javascript
const myElement = document.getElementById('my-element');  
const mc = new Hammer(myElement);

mc.on('pinch', (event) => {  
  const scale = event.scale; // 缩放的比例，初始值为1，放大时大于1，缩小时小于1  
  const isPinchingIn = scale < 1; // 判断是向内缩放还是向外缩放  
  
  console.log('Pinch event triggered');  
  console.log('Scale:', scale);  
  console.log('Pinching in:', isPinchingIn);  
  
  // 根据缩放比例执行相应的逻辑，比如调整元素的大小或位置  
  if (isPinchingIn) {  
    // 处理向内缩放的逻辑  
  } else {  
    // 处理向外缩放的逻辑  
  }  
});
```



Pinch事件，两根手指（默认为两根手指，多指触控需要单独设置）或多根手指相对移动或相向移动的事件



+ Pinchstart：多点触控开始
+ Pinchmove：多点触控过程
+ Pinchend：多点触控结束
+ Pinchcancel：多点触控取消
+ Pinchn：多点触控时两手指距离越来越近
+ Pinchout：多点触控时两手指距离越来越远



#### 6.识别旋转（rotate）- 用两个或多个手指在元素上执行旋转动作时触发


```javascript
const myElement = document.getElementById('my-element');  
const mc = new Hammer(myElement);

mc.on('rotate', (event) => {  
  const angle = event.angle; // 旋转的角度（以度为单位）  
  const isClockwise = angle > 0; // 判断是顺时针旋转还是逆时针旋转  
  
  console.log('Rotate event triggered');  
  console.log('Angle:', angle);  
  console.log('Clockwise:', isClockwise);  
  
  // 根据旋转角度执行相应的逻辑，比如调整元素的旋转状态  
  // 例如，如果你使用的是CSS transforms，你可以这样更新元素的旋转：  
  myElement.style.transform = `rotate(${angle}deg)`;  
});
```



Hammer.js 还提供了 rotate的拆解方法



+ rotatestart 旋转开始
+ rotatemove 旋转过程中
+ rotateend 旋转结束
+ rotatecancel 旋转取消



#### 7.屏幕拖动事件（Pan）


```javascript
hammertime.on('pan',function(e){
    console.log(e)
})
```



+ Panstart：拖动开始
+ Panmove：拖动过程
+ Panend：拖动结束
+ Pancancel：拖动取消
+ Panleft：向左拖动
+ Panright：向右拖动
+ Panup：向上拖动
+ Pandown：向下拖动

