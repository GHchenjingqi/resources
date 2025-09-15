gui是配合threeJS实现控制元素参数的，它可以简单的通过滑块，下拉等交互，控制threejs场景元素的位置，颜色，旋转，动画等。

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1724985277804-b01ebd5e-765a-4148-97a7-ac65a7084530.png)

```javascript
// 滑块： 
gui.add(obj,'key',min,max,step).name('显示名称')
// 检查框：
gui.add(obj,'key').name('显示名称')
// 下拉框：
gui.add(obj,'key',arr).name('显示名称')
// 按钮：
gui.add(obj,'key').name('显示名称').onChange(callback)
// 颜色：
gui.addColor(obj,'key').name('显示名称')
// 事件：
gui.add(obj,'key').name('显示名称').onChange(callback)
// 分组：
gui.addFolder('分组名称')
// 移除：
gui.remove(obj)
// 清空：
gui.destroy()
// 打开：
gui.open()
// 关闭：
gui.close()
// 保存：
gui.save()
// 加载：
gui.load()
// 监听：
gui.on('change',callback)
// 取消监听：
gui.off('change',callback)
```

实际案例

```javascript
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js'
// gui 控制参数
const gui = new GUI()
gui.domElement.style.top = '2rem'
gui.domElement.style.right = '2rem'

// 控制参数
let pointGui ={
  position:{
    x:2,
    y:4,
    z:-1
  },
  intensity:600,
  color:'ffffff'
}

// light 是 three的点光灯元素

let pl = gui.addFolder('点光')
pl.add(pointGui.position, 'x', -10, 10, 0.1).name('光源x').onChange((value) => {
  light.position.x = value;
})
pl.add(pointGui.position, 'y', -10, 10, 0.1).name('光源y').onChange((value) => {
  light.position.y = value;
})
pl.add(pointGui.position, 'z', -10, 10, 0.1).name('光源z').onChange((value) => {
  light.position.z = value;
})
pl.add(pointGui,'intensity', 0,800, 0.1).name('点光强度').onChange((value) => {
  light.intensity = value;
})
pl.addColor(pointGui, 'color').name('点光颜色').onChange((value) => {
  light.color.set(value);
})
```

