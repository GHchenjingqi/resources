官方地址：[https://github.com/schteppe/cannon.js](https://github.com/schteppe/cannon.js)

介绍：模拟<font style="color:rgb(51, 51, 51);">物体物理引擎包括简单的碰撞检测、各种体型、接触、摩擦和约束。</font>

<font style="color:rgb(51, 51, 51);"></font>

#### <font style="color:rgb(51, 51, 51);">安装</font>
```javascript
npm install --save cannon

// 
<script src="cannon.min.js"></script>
```

#### 使用
```javascript
var world = new CANNON.World({
   gravity: new CANNON.Vec3(0, 0, -9.82) // m/s²
});
 
// Create a sphere
var radius = 1; // m
var sphereBody = new CANNON.Body({
   mass: 5, // kg
   position: new CANNON.Vec3(0, 0, 10), // m
   shape: new CANNON.Sphere(radius)
});
world.addBody(sphereBody);
 
// Create a plane
var groundBody = new CANNON.Body({
    mass: 0 // mass == 0 makes the body static
});
var groundShape = new CANNON.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);
```

threeJS + cannon

```javascript
// 创建 Three.js 几何体和材质
const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
// 小球位置要与刚体小球位置一致
sphereMesh.position.y = 10;
scene.add(sphereMesh);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
// 与 Cannon.js 中的平面旋转位置对应
planeMesh.quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
planeMesh.castShadow = true;
planeMesh.receiveShadow = true;
scene.add(planeMesh);


// 创建物理世界
world = new CANNON.World()
world.gravity.set(0, -9.82, 0);
world.quatNormalizeSkip = 0;
world.quatNormalizeFast = false;
world.broadphase = new CANNON.NaiveBroadphase();
// 创建小球刚体
const sphereShape = new CANNON.Sphere(1);
sphereBody = new CANNON.Body({
  mass: 1,
  shape: sphereShape,
});
sphereBody.position.set(0, 10, 0);
world.addBody(sphereBody);
// 创建平面刚体
const planeShape = new CANNON.Plane();
const planeBody = new CANNON.Body({
  mass: 0, // 地面通常质量为 0，静态不动
  shape: planeShape,
});
// 与 Three.js 中的平面旋转对应
planeBody.quaternion.setFromAxisAngle(
  new CANNON.Vec3(1, 0, 0),
  -Math.PI / 2
);
world.addBody(planeBody);

// 动画关联
setInterval( () => {
  // world.step(1 / 60);
  // 更新 Three.js 物体的位置和旋转以匹配 Cannon.js 物体
  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion);
},1000 /60 )
```

#### 碰撞材质关联
```javascript
// 创建 Cannon.js 物体
const sphereShape = new CANNON.Sphere(1);
// 设置刚体材质
const sphereShapematerial = new CANNON.Material(); 
sphereBody = new CANNON.Body({
  mass: 1,
  shape: sphereShape,
  material: sphereShapematerial
});
sphereBody.position.set(0, 10, 0);
world.addBody(sphereBody);
// 平面刚体
const planeShape = new CANNON.Plane();
// 平面材质
const planeShapematerial = new CANNON.Material(); 
const planeBody = new CANNON.Body({
  mass: 0, // 地面通常质量为 0，静态不动
  shape: planeShape,
  material: planeShapematerial
});
// 与 Three.js 中的平面旋转对应
planeBody.quaternion.setFromAxisAngle(
  new CANNON.Vec3(1, 0, 0),
  -Math.PI / 2
);
world.addBody(planeBody);

// 设置材质关联系数
const contactMaterial = new CANNON.ContactMaterial(planeShapematerial, sphereShapematerial, {
  restitution: 0.5 //反弹恢复系数
})
// 把关联的材质添加到物理世界中
world.addContactMaterial(contactMaterial)
```



#### 注意事项
1. 碰撞刚体位置和three元素mesh位置、角度必须一致。否则，动画会有所差异。
2. 刚体和mesh之间关联是通过 位置关联，也就是说，three更新mesh的位置就是刚体模拟运动的位置。类似跟着刚体运动轨迹移动效果。

