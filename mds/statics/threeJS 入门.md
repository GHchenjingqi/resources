官方地址：[https://threejs.org/](https://threejs.org/)

## 一.安装及引入
1.安装

```javascript
npm install --save three
```

2.引入

```javascript
import * as THREE from 'three';
```



## 二.使用threejs
开发一个threejs场景至少需要以下4个元素：

### 1.场景 scene ,类似canvas的画布，用于呈现效果。
```javascript
const scene = new THREE.Scene()
```

设置场景背景色

```javascript
scene.background = new THREE.Color(0xcccccc);
```

设置场景贴图纹理，使用CubeTextureLoader按照 左右、上下、前后的顺序加载图片，最后给scene.background属性。注意：图片的宽高一致，可以将全景图使用 <font style="color:rgb(77, 77, 77);">PTGui软件分割6张图（工具-分割面/QTVR）。</font>

```javascript
// 环境贴图：左右、上下、前后
const cubeTexture = new THREE.CubeTextureLoader().setPath("/public/").load([
    "003.png","001.png",
    "006.png","002.png",
    "004.png","005.png"
]);

this.scene.background =cubeTexture;
```



场景是顶级父级对象，物体，灯光都是子对象，通过 **scene.add** 方法将子对象添加到场景的childen属性中。

**scene.childen** 类型为数组，childen数组长度就是子对象的数量，可以按添加顺序获取到子对象。当然也可以使用 **scene.remove** 移除子对象

### 2.元素物体，几何图形，模型，粒子灯光等。一个物体有材质，创建后还需要把材质和物体组合起来，然后放置到场景中。
```javascript
// 创建立方体 BoxGeometry(长，宽，高)，three的大小单位是米
const geometry = new THREE.BoxGeometry(1,1,1)
// MeshBasicMaterial 为对象创建材质，颜色属性接收16进制(0xff0000），字符串16进制（'#333333'）,颜色（red）
const material =  new THREE.MeshBasicMaterical({color: 0xff0000})
// 创建网格并把物体和材质组装一起
const mesh = new THREE.Mesh(geometry ,material )
// 添加到场景中
scene.add(mesh)
```

除了立方体（BoxGeometry），还有常见的**几何体Geometry**：

+ CapsuleGeometry - 胶囊体
+ CircleGeometry - 圆形
+ ConeGeometry - 圆锥体
+ CylinderGeometry - 圆柱体
+ DodecahedronGeometry - 12面缓冲体
+ SphereGeometry - 球缓冲体
+ TorusGeometry - 圆环体
+ TubeGeometry - 管道体
+ ....

**材质material，**如果需要改变物体的外观效果，就需要用到材质。

![](https://cdn.nlark.com/yuque/0/2024/svg/1460947/1715828395542-d85a93b3-e078-45d0-b707-8b28190fe99f.svg)

物体创建完成之后，我们可以对物体进行：改变位置、缩放比例、旋转角度。

```javascript
cube.position.x = -0.5;
cube.position.y = -0.1;
cube.position.z = 1;

cube.scale.x = 1.25;
cube.scale.y = 0.25;
cube.scale.z = 0.5;
 
cube.rotation.x = -0.5;
// 绕y轴旋转90度  
// 注意：Three.js使用弧度，所以90度需要转换为弧度，即 Math.PI / 2  
cube.rotation.y = Math.PI / 2; 
```



#### 2.1 绘制曲线
##### 方法一：[Catmull-Rom](https://en.wikipedia.org/wiki/Centripetal_Catmull-Rom_spline)<font style="color:rgb(68, 68, 68);">算法，根据一系列点集合绘制平滑曲线</font>
```javascript
const curve = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -10, 0, 10 ), // 经过点1
	new THREE.Vector3( -5, 5, 5 ), // 经过点2
	new THREE.Vector3( 0, 0, 0 ), // 经过点3
	new THREE.Vector3( 5, -5, 5 ), // 经过点4
	new THREE.Vector3( 10, 0, 10 ) // 经过点5
] );

// getPoints 均匀获取曲线上的50个点
const points = curve.getPoints( 50 );
// 创建一个新的 BufferGeometry. 同时将预置属性设置为默认值. 
// setFromPoints通过一组给定的点来创建一条曲线
const geometry = new THREE.BufferGeometry().setFromPoints( points );
// 线材质 
const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// 创建曲线
const curveObject = new THREE.Line( geometry, material );
```

##### 方法二：二维[三次贝塞尔曲线](http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:Bezier_curve.svg)，<font style="color:rgb(68, 68, 68);">由起点、终点和两个控制点所定义</font>
```javascript
const curve = new THREE.CubicBezierCurve(
	new THREE.Vector2( -10, 0 ), // 起点
	new THREE.Vector2( -5, 15 ), // 控制点1
	new THREE.Vector2( 20, 15 ), // 控制点2
	new THREE.Vector2( 10, 0 ) // 终点
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
```

##### 方法三：三维[三次贝塞尔曲线](http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:Bezier_curve.svg)<font style="color:rgb(68, 68, 68);">， 由起点、终点和两个控制点所定义</font>
```javascript
const curve = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ), // 起点
	new THREE.Vector3( -5, 15, 0 ), // 控制点1
	new THREE.Vector3( 20, 15, 0 ), // 控制点2
	new THREE.Vector3( 10, 0, 0 )  // 终点
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
```

##### 方案四： <font style="color:rgb(68, 68, 68);">椭圆的曲线， 将</font>xRadius<font style="color:rgb(68, 68, 68);">与</font>yRadius<font style="color:rgb(68, 68, 68);">设为相等的值它将会成为一个圆</font>
```javascript
const curve = new THREE.EllipseCurve(
	0,  0,            // ax, aY  椭圆中心坐标x,y
	10, 10,           // xRadius, yRadius 椭圆x,y轴半经
	0,  2 * Math.PI,  // aStartAngle, aEndAngle  起始、终止角度
	false,            // aClockwise 是否按照顺时针方向，默认false
	0                 // aRotation  椭圆从X轴正方向逆时针的旋转角度
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const ellipse = new THREE.Line( geometry, material );
```

##### 方案五：二维[二次贝塞尔曲线](http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:B%C3%A9zier_2_big.gif) <font style="color:rgb(68, 68, 68);"> 由起点、终点和一个控制点所定义</font>
```javascript
const curve = new THREE.QuadraticBezierCurve(
	new THREE.Vector2( -10, 0 ), // 起点
	new THREE.Vector2( 20, 15 ), // 控制点1
	new THREE.Vector2( 10, 0 ) // 终点
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

//Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
```

##### 方案六：<font style="color:rgb(68, 68, 68);">三维 </font>[二次贝塞尔曲线](http://en.wikipedia.org/wiki/B%C3%A9zier_curve#mediaviewer/File:B%C3%A9zier_2_big.gif)<font style="color:rgb(68, 68, 68);">， 由起点、终点和一个控制点所定义</font>
```javascript
const curve = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3( -10, 0, 0 ),
	new THREE.Vector3( 20, 15, 0 ),
	new THREE.Vector3( 10, 0, 0 )
);

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry, material );
```

##### 方案七：<font style="color:rgb(68, 68, 68);">样条曲线，从一系列的点中，创建一个平滑的二维样条曲线</font>
```javascript
const curve = new THREE.SplineCurve( [
	new THREE.Vector2( -10, 0 ), // 途径点
	new THREE.Vector2( -5, 5 ),// 途径点
	new THREE.Vector2( 0, 0 ),// 途径点
	new THREE.Vector2( 5, -5 ),// 途径点
	new THREE.Vector2( 10, 0 ) // 途径点
] );

const points = curve.getPoints( 50 );
const geometry = new THREE.BufferGeometry().setFromPoints( points );

const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const splineObject = new THREE.Line( geometry, material );
```

### 3.相机 camera，这里的相机是指 观察物体成像的位置，如同一个相机的视角。创建相机后，也需要把相机放置到场景中。
#### PerspectiveCamera: 透视相机
构造函数接收四个参数

**constructor(fov?: number, aspect?: number, near?: number, far?: number);**

+ fov：角度，视野范围，近大远小
+ aspect：画布长宽比
+ near：近平面距离，小于这个距离物体不可见
+ far：远平面距离，大于这个距离物理不可见，也就是说距离在近远距离之间才可见。

```javascript
// 创建相机 camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,1,1000)
// camera 相机位置
camera.position.z = 3
// 放置到场景
scene.add(camera)
```

**除了透视相机还有以下相机：**

+ **正交相机（OrthographicCamera）** ：这种相机不会产生透视效果，而是以平行投影的方式来渲染场景。

```javascript
const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
scene.add( camera );
```

+ **立体相机（StereoCamera）** ：这种相机用于创建立体效果，它包含两个相机，分别模拟左右眼的视角。
+ **立方体相机（CubeCamera）** ：这种相机用于创建六个面的立方体贴图，可以用于环境映射。  


****

**相机使用**

(1).改变相机位置 - position

可以使用position.set(x,y,z) ，也可以直接修改指定坐标位置 position.x

```javascript
camera.position.z = 5
camera.position.set(5, 5, 10);
```

(2).改变相机朝向 - lookAt(x,y,z)

```javascript
camera.lookAt(0,0,0)
```

### 4.渲染器 renderer ，从相机的角度渲染物体元素。然后设置渲染器分辨率和尺寸，并把渲染器关联到页面。
+ **WebGLRederer将3d场景通过canvas渲染出来。**

将元素关联到页面有两种，可以使用canvas属性绑定页面元素，也可以把 renderer.domElement 添加到body中。

```javascript
// 创建渲染器 WebGLRenderer
const renderer = new THREE.WebGLRederer({
 // 第一种：绑定指定canvas元素
 canvas: 页面canvas元素
 // 抗锯齿属性，开启之后边缘更平滑，降低马赛克出现概率
 antialias: true,
})
// 分辨率
renderer.setPixelRatio = window.devicePixelRatio
// 尺寸
renderer.setSize(window.innerWidth,window.innerHeight)
//  背景色
renderer.setClearColor(0x444444, 1)
// 第二种：将渲染器添加到页面中
document.body.append(renderer.domElement)
```

除了这个**WebGLRederer**渲染器之外，还有

+ **<font style="color:rgb(68, 68, 68);">CSS2DRenderer 三维物体和基于HTML的标签相结合，渲染的元素都是div元素。</font>**
+ **<font style="color:rgb(68, 68, 68);">CSS3DRenderer 通过CSS3的</font>****transform****<font style="color:rgb(68, 68, 68);">属性， 将层级的3D变换应用到DOM元素上。</font>**
+ **<font style="color:rgb(68, 68, 68);">SVGRenderer</font>**** ****<font style="color:rgb(68, 68, 68);">使用SVG来渲染几何数据。</font>**

### 5.最后用渲染器渲染场景和相机，页面就有内容了。
```javascript
renderer.render(scene,camera)
```



### 6.轨道控制器OrbitControls 
用于控制相机运动：**旋转、平移、缩放**，方便观察三位场景。

OrbitControls 将相机和元素关联，实现相机围绕元素运动。第一个参数是相机，第二个参数是元素。

```javascript
// 引入轨道控制器扩展库OrbitControls.js（必须）
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 创建轨道控制器
// 2个参数：要控制的摄像机，用于事件侦听器的 HTML 元素
const controls = new OrbitControls(camera, renderer.domElement);
// 添加阻尼
controls.enableDamping = true
// 阻尼系数
controls.dampingFactor = 0.01
// 自动旋转
controls.autoRotate = true
// 自动旋转速度
controls.autoRotateSpeed = 0.5
// 将轨道控制器添加到场景中
scene.add(controls);
```

这样相机就跟随物体运动了，效果不明显，我们可以添加地面网格效果。

比较舒服的控制参数：

```javascript
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;
```

控制器限制视角（设置最大最小旋转角度）

```javascript
controls.minPolarAngle = Math.PI * 1 / 4; // 最小垂直角度
controls.maxPolarAngle = Math.PI * 2 / 4; // 最大垂直角度
controls.minAzimuthAngle = - Math.PI * 1 / 6; // 最小水平角度
controls.maxAzimuthAngle = Math.PI * 2.5 / 6; // 最大水平角度
```

### 7.坐标格辅助对象 GridHelper
GridHelper方法接受4个参数：

+ size -- 坐标格尺寸. 默认为 10.
+ divisions -- 坐标格细分次数. 默认为 10.
+ colorCenterLine -- 中线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x444444
+ colorGrid -- 坐标格网格线颜色. 值可以为 Color 类型, 16进制 和 CSS 颜色名. 默认为 0x888888

```javascript
const gridHelper =new THREE.GridHelper(10,10, 0x00ff00, 'red')
scene.add(gridHelper)
```

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715829977412-1d4de7b5-00d2-4a00-bee2-6005d4410b18.png)

### 8.AxesHelper 坐标辅助线
红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴。

```javascript
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
```

### 9.fog 雾
```javascript
// 在6 ~15 之间可见物体，超出雾颜色显示在物体上
scene.fog = new THREE.Fog( 0x1888ff, 6, 15 );
```

### 10.页面跟随窗口变化
通过监听 resize 变化，重置渲染器大小及相机宽高比。

```javascript
window.addEventListener("resize", event => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
})
```



### 11.raycaster射线选择物体
threejs选择物体使用raycaster对象，它是相机到点击位置的一条射线，它会返回射线穿过的所有元素。

```javascript
let group; // 需要监听点击元素的组
let selectedObject = null; // 所选择的对象
let raycaster ; // 射线
let pointer ; // 点击位置，用来记录x,y坐标

// 计算属性获取盒子尺寸信息
const canvasbox = computed(()=>{
  return document.querySelector("#canvas").getBoundingClientRect()
})

// 初始化
group = new THREE.Group()
// 需要被选择物体加入到 组
group.add(cube1)
group.add(cube2)
// 组元素加入场景
scene.add(group)

// 创建射线投射器
raycaster = new THREE.Raycaster()
// 鼠标位置
pointer = new THREE.Vector2()

// 注册点击监听事件 pointerdown === click
window.addEventListener('pointerdown', mouseClick, false)

function mouseClick(event) {
  event.preventDefault();
  if ( selectedObject ) {
    selectedObject.material.color.set( '#ffffff' );
    selectedObject = null;
  }

  // 将鼠标坐标标准化
  pointer.x = (event.clientX - canvasbox.value.left) / canvasbox.value.width * 2 - 1;
  pointer.y = -((event.clientY - canvasbox.value.top) / canvasbox.value.height) * 2 + 1;

  // 设置射线起点为鼠标位置，射线的方向为相机视角方向
  raycaster.setFromCamera( pointer, camera );
  const intersects = raycaster.intersectObject( group, true );

  if (intersects.length > 0) {
    console.log(intersects)
    const res = intersects.filter( function ( res ) {
      return res && res.object;
    })[0];
    if( res && res.object ) {
      // 射线穿过的第一个被选的元素
      selectedObject = res.object;
      selectedObject.material.color.set( '#f00' );
      msg.value = `点击了${selectedObject.name}`
    }
  } 
}
```

上面场景是非全屏的，全屏计算标准化坐标方式如下：

```javascript
pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
```

### 12.PointerLockControls控制器
`<font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">PointerLockControls</font>`<font style="color:rgb(77, 77, 77);"> 是 Three.js 中用于处理鼠标锁定状态下的相机控制的类。它允许用户通过</font>[鼠标移动](https://so.csdn.net/so/search?q=%E9%BC%A0%E6%A0%87%E7%A7%BB%E5%8A%A8&spm=1001.2101.3001.7020)<font style="color:rgb(77, 77, 77);">来控制相机的旋转方向、移动位置。</font>

<font style="color:rgb(77, 77, 77);">注意：无论如何控制相机，相机朝向不会发生变化！！！</font>

```javascript
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

let cameraControls = null
// 移动方向
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;


// 相机视角控制器 
cameraControls = new PointerLockControls(camera, renderer.domElement);
scene.add(cameraControls.getObject()); 

const blocker = document.getElementById('box');

blocker.addEventListener('click', function () {
  cameraControls.lock();
});

cameraControls.addEventListener('lock', function () {
  blocker.style.display = 'none';
});

cameraControls.addEventListener('unlock', function () {
  blocker.style.display = 'block';
});


document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);


const onKeyDown = function (event) {
  switch (event.code) {

    case 'ArrowUp':
    case 'KeyW':
      moveForward = true;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = true;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = true;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = true;
      break;

    case 'Space':
      if (canJump === true) velocity.y += 350;
      canJump = false;
      break;
  }
}

const onKeyUp = function (event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      moveForward = false;
      break;

    case 'ArrowLeft':
    case 'KeyA':
      moveLeft = false;
      break;

    case 'ArrowDown':
    case 'KeyS':
      moveBackward = false;
      break;

    case 'ArrowRight':
    case 'KeyD':
      moveRight = false;
      break;

  }
}

```

<font style="color:rgb(77, 77, 77);">动画里面，控制相机方向移动moveForward、moveRight</font>

```javascript
// 控制相机移动
const speed = 0.1;
if (cameraControls.isLocked) {
  const direction = new THREE.Vector3();
  // 前进
  if (moveForward) {
    direction.z += 1;
  }
  // 退后
  if (moveBackward) {
    direction.z -= 1;
  }
  if (moveLeft) {
    direction.x -= 1;
  }
  if (moveRight) {
    direction.x += 1;
  }

  cameraControls.moveForward(speed * direction.z);
  cameraControls.moveRight(speed * direction.x);
}
```

### <font style="color:rgb(77, 77, 77);">13.场景获取模型或物体</font>
方法1：通过名称name属性获取：getObjectByName

```javascript
const home = scene.getObjectByName('node_id36')
```

方法2：通过遍历 scene.children 获取mesh

```javascript
const home = scene.children.find(item => item.name === 'home')
```

### 13. 模型面的问题
+ **<font style="color:rgb(89, 89, 89);">side</font>**<font style="color:rgb(89, 89, 89);">: Integer ，值类型：THREE.FrontSide-默认正面 | THREE.BackSide-反面 | THREE.DoubleSide-双面</font>

<font style="color:rgb(89, 89, 89);"></font>

### <font style="color:#000000;">14.Mesh原型方法</font>
![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1749707636063-a4fe9f16-d89a-404f-9db3-2651904321ac.png)

#### applyMatrix4
applyMatrix4() 是 Three.js 中 Object3D 类的一个重要方法，用于将 4x4 变换矩阵应用于几何体顶点或整个物体。这个方法对于实现复杂变换、坐标系转换和矩阵级联操作非常有用。

```javascript
const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0xaa0000 });
obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
scene.add(obstacle);
// 缩放
scaleBTN.onclick = () => {
  const translationMatrix = new THREEObject.Matrix4().makeScale(1.2, 2.5, 0.3);
  obstacle.applyMatrix4(translationMatrix);
}
// 旋转
rotateBTN.onclick = () => {
  const angle = Math.PI / 4; // 45度
  const axis = new THREEObject.Vector3(0, 1, 0); // 绕Y轴旋转
  const translationMatrix = new THREEObject.Matrix4().makeRotationAxis(axis, angle);
  obstacle.applyMatrix4(translationMatrix);
}
// 平移
translateBTN.onclick = () => {
  const translationMatrix = new THREEObject.Matrix4().makeTranslation(0, 2.5, 0);
  obstacle.applyMatrix4(translationMatrix);
}
// 组合
combineBTN.onclick = () => {
  // 创建组合矩阵：缩放、旋转然后平移
  const scale = new THREEObject.Matrix4().makeScale(0.8, 1.5, 1.2);
  const rotation = new THREEObject.Matrix4().makeRotationX(Math.PI / 3);
  const translation = new THREEObject.Matrix4().makeTranslation(0, 3, 1);

  // 组合矩阵：缩放 -> 旋转 -> 平移
  const matrix = new THREEObject.Matrix4();
  matrix.multiply(translation);  // 最后应用平移
  matrix.multiply(rotation);      // 然后旋转
  matrix.multiply(scale);         // 先应用缩放

  obstacle.applyMatrix4(matrix);
}
```

#### applyQuaternion
applyQuaternion 是Three.js中用于**<font style="color:#7E45E8;">应用旋转</font>**的一个高效方法，使用四元数（quaternion）来表示3D旋转。四元数相比欧拉角具有多项优势：避免万向节锁、插值更平滑、运算更高效。

```javascript
obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
// 创建一个表示绕Y轴旋转90度的四元数
const quaternion = new THREE.Quaternion();
quaternion.setFromAxisAngle(new THREE.Vector3(0, 2, 0), Math.PI / 2);

// 应用四元数旋转到对象 等同于 obstacle.quaternion.multiply(quaternion);
obstacle.applyQuaternion(quaternion);
```

#### attach 
attach 方法可以让你改变对象的父级，但是对象在世界空间中的变换保持不变。

```javascript
// 创建父级对象
const parent1 = new THREE.Group();
const parent2 = new THREE.Group();
scene.add(parent1);
scene.add(parent2);

// 创建子对象并添加到 parent1
const child = new THREE.Mesh(geometry, material);
parent1.add(child);

// 使用 attach 方法将子对象转移到 parent2
parent2.attach(child); // 子对象现在在 parent2 下
```

#### clear
clear 是 Object3D 类的方法（Mesh 继承自它），用于移除对象的所有子对象。

```javascript
// 移除所有子对象,不删除对象本身,高效清空
Object3D.clear()
// 注意清除后仍需手动释放资源防止内存泄漏，常配合dispose使用
// 处置几何体
geometry.dispose();
// 处置材质
material.dispose();
```

#### remove
remove移除子对象不会触发子对象的`dispose`方法，因此需要手动管理资源（如几何体、材质）的释放。

```javascript
// 语法：parent.remove(child1, child2, ...); 
scene.remove(cube);

// 彻底清除物体
// 释放资源（几何体和材质）
cube.geometry.dispose();
if (Array.isArray(cube.material)) {
  cube.material.forEach(mat => mat.dispose());
} else {
  cube.material.dispose();
}
// 清除选中
cube = null;
```

#### clone
clone一个新的对象，几何体属性材质与源对象一样（位置随机），需要手动添加到场景中。<font style="color:rgba(0, 0, 0, 0.6);background-color:rgb(252, 252, 252);"></font>

```javascript
const clone = originalCube.clone();
// 随机位置
clone.position.x = Math.random() * 8 - 4;
clone.position.y = Math.random() * 6 - 3;
// 添加到场景
scene.add(clone);
```

#### copy
copy后者会完全将前者覆盖，包括形状，材质，位置。不会创建新对象。

```javascript
 //复制原始蓝色立方体的属性（几何体、材质等）到红色立方体,注意redCube位置同样被蓝色立方体覆盖
 redCube.copy(originalCube);
```



#### 选择物体
```javascript
// 创建一个立方体
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
cube.name = "myCube";
scene.add(cube);
```

+ getObjectById

每个Object3D实例都有一个唯一的id属性（自动生成）。getObjectById方法通过指定的id来查找对象。

```javascript
// 通过id查找
const foundById = scene.getObjectById(cube.id);
console.log(foundById === cube); // true
```

+ getObjectByName

可以通过对象的name属性来查找。可以给对象设置一个字符串名称，然后使用此方法查找。

```javascript
const foundByName = scene.getObjectByName("myCube");
console.log(foundByName === cube); // true
```

+ getObjectByProperty

通过任意属性和值来查找第一个匹配的对象。

```javascript
// object.getObjectByProperty( name, value )
const foundByType = scene.getObjectByProperty('type', 'Mesh'); // {}
```

+ getObjectsByProperty

与getObjectByProperty类似，但是返回所有匹配的对象（数组）。

```javascript
// object.getObjectsByProperty( name, value )
const cubes = scene.getObjectsByProperty('name', 'cube'); // []
```

#### <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">getWorld*</font>
在 Three.js 中，getWorld* 方法系列用于获取对象在世界坐标系中的状态，而非局部坐标系。

+ <font style="color:rgba(0, 0, 0, 0.9);">getWorldPosition  获取对象在世界坐标系中的位置</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">getWorldDirection 获取对象在正前方向上的世界空间方向向量。</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">getWorldQuaternion 获取表示对象在世界坐标系中旋转的四元数。</font>
+ <font style="color:rgba(0, 0, 0, 0.9);">getWorldScale 获取对象在世界坐标系中的缩放向量。</font>

```javascript
const worldPosition = new THREE.Vector3();
selectedObject.getWorldPosition(worldPosition);

const worldDirection = new THREE.Vector3();
selectedObject.getWorldDirection(worldDirection);

const worldQuaternion = new THREE.Quaternion();
selectedObject.getWorldQuaternion(worldQuaternion);

const worldScale = new THREE.Vector3();
selectedObject.getWorldScale(worldScale);
```

#### 坐标系转换
+ localToWorld  <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">对象的局部坐标系 => 场景的世界坐标系</font>
+ worldToLocal <font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);"> 场景的世界坐标系=> 对象的局部坐标系 </font>

```javascript
cube.localToWorld(localPoint.clone(), worldPoint);
const refLocalPoint = cube.worldToLocal(referencePoint.clone());
```

#### onBeforeRender
在对象被渲染之前调用

```javascript
object.onBeforeRender = function(renderer, scene, camera) {
  // 添加渲染前效果（线框）
  this.material.wireframe = true;
  this.material.wireframeLinewidth = 1;
};
```

#### onAfterRender 
在对象被渲染之后调用。

```javascript
// 渲染后回调
object.onAfterRender = function(renderer, scene, camera) {
  // 清除线框效果
  this.material.wireframe = false;
};
```

#### traverse 遍历
+ traverse(callback) 递归地遍历对象及其所有后代（子对象、子对象的子对象等），并对每个对象执行回调函数。用于修改多个对象的属性或查找指定对象。

```javascript
let count = 0;
scene.traverse(function(object) {
  // 只计算网格（Mesh）对象
  if (object.isMesh) {
    count++;
  }
});
```

+ traverseVisible(callback) 仅遍历可见的子树（visible为true的节点才遍历），如果父级不可见，整个子树都不会遍历，用法同traverse。
+ traverseAncestors(callback) 从直接父级向上遍历祖先节点（父级、祖父级...直到根节点）。

#### toJSON
用于将网格对象转换为 JSON 格式，便于序列化或存储。

```javascript
const json = mesh.toJSON();
```

#### rotateOnAxis
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">对象围绕局部坐标系的特定轴旋转指定角度</font>

```javascript
const axis = new THREE.Vector3(0, 1, 0); // Y轴
cube.rotateOnAxis(axis, Math.PI / 4); // 旋转π/4弧度(45度)

// 绕自定义轴旋转
const customAxis = new THREE.Vector3(1, 1, 0).normalize();
cube.rotateOnAxis(customAxis, Math.PI / 3);
```

#### rotateOnWorldAxis
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">对象围绕世界坐标系中的指定轴旋转。</font>

```javascript
// 在世界坐标系中绕Y轴旋转
const worldYAxis = new THREE.Vector3(0, 1, 0);
cube.rotateOnWorldAxis(worldYAxis, Math.PI/4);
```

#### translateOnAxis
<font style="color:rgba(0, 0, 0, 0.9);background-color:rgb(252, 252, 252);">对象沿局部坐标系中的特定轴移动指定距离。</font>

```javascript
// 沿X轴移动1个单位
const xAxis = new THREE.Vector3(1, 0, 0); // X轴
cube.translateOnAxis(xAxis, 1);

// 沿对角线方向移动
const diagonal = new THREE.Vector3(1, 1, 0).normalize();
cube.translateOnAxis(diagonal, 2);
```

## 三.光源
### 1.光源
是threejs照亮场景的重要元素。

+ AmbientLight  环境光，会均匀的照亮场景中的所有物体，环境光不能用来投射阴影，因为它没有方向。用于模拟天空光，漫射光。环境光没有方向，不能设置位置属性。

```javascript
// 环境光 接受2个参数
AmbientLight( color : 颜色-默认值白色0xffffff, intensity : 光照强度-默认值1 )
```

+ PointLight 点光源，从一个点向各个方向发射的光源。一个常见的例子是模拟一个<font style="color:#DF2A3F;">灯泡</font>发出的光。

```javascript
PointLight( color : Color, intensity : Float, distance : Number, decay : Float )
- color -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 Color 对象。
- intensity -（可选）光照强度。默认值为 1。
- distance - 光源照射的最大距离。默认值为 0（无限远）。
- decay - 沿着光照距离的衰退量。默认值为 2。
```

+ DirectionalLight 平行光，是一种从无限远处射来的平行光线。它通常用于模拟<font style="color:#DF2A3F;">太阳光</font>等光源。

```javascript
// 从上方照射的白色平行光，强度为 0.5。
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
// 光源添加到场景
scene.add( directionalLight );
```

+ SpotLight 聚光灯，是一种锥形光束光源。它通常用于模拟<font style="color:#DF2A3F;">手电筒</font>、舞台灯光等光源。

```javascript
SpotLight( color : Color, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
- color -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 Color 对象。
- intensity -（可选）光照强度。默认值为 1。
- distance - 光源照射的最大距离。默认值为 0（无限远）。
- angle - 光线照射范围的角度。默认值为 Math.PI/3。
- penumbra - 聚光锥的半影衰减百分比。默认值为 0。
- decay - 沿着光照距离的衰减量。默认值为 2。
```

+ HemisphereLight 半球光，是一种模拟天空光和地面反射光的光源。它通常用于室外场景。

**<font style="color:rgb(68, 68, 68);background-color:#EFF0F0;">HemisphereLight( skyColor : </font>****<font style="color:rgb(153, 153, 153);background-color:#EFF0F0;">Integer</font>****<font style="color:rgb(68, 68, 68);background-color:#EFF0F0;">, groundColor : </font>****<font style="color:rgb(153, 153, 153);background-color:#EFF0F0;">Integer</font>****<font style="color:rgb(68, 68, 68);background-color:#EFF0F0;">, intensity : </font>****<font style="color:rgb(153, 153, 153);background-color:#EFF0F0;">Float</font>****<font style="color:rgb(68, 68, 68);background-color:#EFF0F0;"> )</font>**

<font style="color:rgb(68, 68, 68);">skyColor -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 Color 对象。  
</font><font style="color:rgb(68, 68, 68);">groundColor -（可选）一个表示颜色的 Color 的实例、字符串或数字，默认为一个白色（0xffffff）的 Color 对象。  
</font>intensity<font style="color:rgb(68, 68, 68);"> -（可选）光照强度。默认值为 1。</font>

```javascript
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );
```

+ Light 光源的基类 - 所有其他的光类型都继承了该类描述的属性和方法。
+ LightProbe 光照探针，是一种在3D场景中添加光源的另一种方法。
+ RectAreaLight 平面光，光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。



**光源参数属性**

+ 颜色（color） ：光源的颜色
+ 强度（intensity） ：光源的强度
+ 距离（distance） ：光源的有效距离
+ 衰减（decay） ：光源的光照衰减，设置成0-不衰减
+ 位置（position） ：光源的位置
+ 方向（direction） ：光源的方向
+ 目标（target） ：光源的目标点



设置/修改灯光颜色

```javascript
light.color.set( Math.random() * 0xffffff)
```

### 2.开启投影
-- 1 three 渲染器开启投影

```javascript
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
```

-- 2 需要添加投影的物体开启投影

```javascript
sphere.castShadow = true
...
plane.receiveShadow = true
```

-- 3 光源开启投影，仅支持 点光、平行光、聚光。

```javascript
directionalLight.castShadow = true
```

## 四.网格材质和贴图
### 1.网格材质（MeshMaterial）是 Three.js 中用于给网格模型赋予外观的材质。它可以控制模型的颜色、光泽度、透明度等属性。
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1724832819218-388b49ff-b870-4691-857a-9037226e88b0.png)

常用材质：

+ 基础网格材质（MeshBasicMaterial）:  最简单的网格材质，仅支持颜色和透明度属性。
+ 朗伯网格材质（**MeshLambertMaterial**）:  支持漫反射光照模型，可以模拟物体表面对光线的漫反射效果。
+ 冯格网格材质（**MeshPhongMaterial**）:  支持漫反射和镜面反射光照模型，可以模拟物体表面对光线的漫反射和镜面反射效果。
+ 标准网格材质（MeshStandardMaterial）:  基于物理的材质，可以模拟物体表面的真实光照效果。

```javascript
const cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const cubeMaterial = new THREE.MeshLambertMaterial( { color: 'rgb(255,0,0)', emissive: 0x200000 } );
cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
cube.position.z = - 1;
scene.add( cube );
```

### 2.纹理贴图（Texture）是指从网络上加载的图像，用于赋予模型更逼真的外观。
threejs支持的贴图格式：png,jpeg,gif,dds

使用纹理贴图需要创建一个贴图加载器（TextureLoader），加载完成之后传给材质的map属性

```javascript
const loader = new THREE.TextureLoader();
const texture = loader.load('https://example.com/texture.png')
// 材质map属性展示贴图
const material = new THREE.MeshBasicMaterial({
  map: texture,
});
```

案例：给球贴纹理

```javascript
// 创建图形加载器
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/public/all.jpg');
// 创建形状，材质
const geometry2 = new THREE.SphereGeometry( 1, 36, 18 );
const material2 = new THREE.MeshBasicMaterial( { 
    map:texture, 
    color: 0xffffff 
} );
// 创建网格关联材质和形状
const cube = new THREE.Mesh( geometry2, material2 );
this.cube = cube
```

## 五.glb/gltf模型导入threejs
模型导入我们需要借助 GLTFLoader ，然后加载glb文件，并把加载成功的场景添加到当前场景中，同时也可以调用glb场景中的动画。



案例:

```javascript
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const loader = new GLTFLoader();
loader.load('/public/scene.glb', function (gltf) {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(1, 1, 1);
        scene.add(model);
        // 调用 动画函数
        renderer.setAnimationLoop(animate);
}, undefined, function (e) {
        console.error(e);
});

function animate() {
        controls.update();
        renderer.render(scene, camera);
}
```

复杂的三维模型可以通过 DRACOLoader 加载器加载。它主要用于压缩解压三维模型。

注意需要先把 draco文件夹拷贝到公共文件，然后用过gltfloader加载。



```javascript
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/public/draco/gltf/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load('/public/scene.glb', function (gltf) {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(1, 1, 1);
        scene.add(model);

        renderer.setAnimationLoop(animate);
}, undefined, function (e) {
        console.error(e);
});
```

导入的模型如果反面不可见，说明模型只开启的单面可见，需要加载模型的时候改成以下：

```javascript
loader.load(modelPath, function (gltf) {
  const model = gltf.scene;
  gltf.scene.traverse(function (child) {
    if (child.isMesh){
      child.material.side = THREE.DoubleSide; // 双面显示
    }
  })
  scene.add(model);
  renderer.setAnimationLoop(animation);
}
```

## 注意事项
1.three 坐标轴 z轴不是朝上，是朝着屏幕外的！！！

2.场景元素相邻出现闪烁画面，这种事深度渲染造成的<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">渲染伪影（渲染器不知道层级高低关系导致）</font>

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">解决办法：</font>

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">方法1：调大元素之间的间隔</font>

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">方法2：关闭深度检测</font>

```javascript
new THREE.WebGLRenderer( { depthTest: false } );
```

<font style="color:rgb(5, 7, 59);background-color:rgb(253, 253, 254);">方法3：提高深度精度  </font>

```javascript
new THREE.WebGLRenderer( { logarithmicDepthBuffer: true } );
```



