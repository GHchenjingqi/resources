本篇文档适用于threeJS使用ShaderMaterial材质。

## 一、什么事着色器
着色器事在GPU上并行的强类型语言的高级画点工具。着色器是一种规范接口，可以基于多种语言接入，常见的有C，JS等。

计算机仅可以绘制：点、线、三角形。

## 语言标准
针对不通平台语言有所不同。

+ GLSL ES1.0  全平台 (推荐）
+ GLSL    Mac/Linux
+ HLSL 11  Window/xbox
+ PSSL   playstation

## 着色器分类
1.**顶点着色器**（vertex shader）:用来描述顶点特性（位置，大小，颜色）的程序。

2.**片元着色器**（fragment shader）：进行逐片处理光照过程的程序。

虽然分为这两类，但是使用的时候还是需要将顶点+片元结合起来使用。注意：在threeJS中着色器代码都是字符串格式。

## 着色器执行步骤
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1732168449868-1981a024-4f43-4aa2-a899-fe6d045b516b.png)



## 着色器工具
注意，写法和threeJS不太一样，变量不需要加“gl_"，小写开头。

例如：**gl_FragColor** (threeJS)  ==>  **fragColor** (shader)

地址：[https://www.shadertoy.com/new](https://www.shadertoy.com/new)

## 知识扩充
### 仿射变换
仿射变换：**<font style="color:rgb(25, 27, 31);">平移、旋转、放缩、剪切、反射。</font>**

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1732169811834-157ba0aa-7df3-48ba-9bc8-7dde49ce4428.png)

### 齐次坐标
齐次坐标：由4个分量组成的矢量（x, y, z, w）。<font style="color:rgb(25, 27, 31);">它既能够用来明确区分向量和点，同时也更易用于进行仿射（线性）几何变换。齐次坐标系解决了笛卡尔坐标无法表示无穷远点的问题。</font>

+ 当w等1时，转为三维坐标（x,y,z）
+ w值不等1，转为三维坐标（x/w, y/w, z/w）
+ w值必须大等于0，越趋近于0，三维坐标无穷远



### 笛卡尔坐标
笛卡尔坐标，又称三维坐标系，或右手坐标系（大拇指x轴,食指y轴,中指z轴）。

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1732169085082-4a4db053-b5a5-43b2-9893-c13fff3d7c38.png)

### 三角函数
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1732171190359-396cd5d0-dff0-4bc5-814e-9b98529ca0f1.png)

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1732171218916-6ecb755e-72d3-461b-84ce-3a5f810434a1.png)

百度地址：[三角函数公式](https://baike.baidu.com/item/%E4%B8%89%E8%A7%92%E5%87%BD%E6%95%B0%E5%85%AC%E5%BC%8F/4374733?fr=aladdin)



## 着色器语法
### 定义变量
1.顶点着色器使用 attribute

格式：attribute + 类型 + 变量名

```html
attribute  vec4  a_position
```

 2.片元着色器使用 uniform

格式：uniform + 类型 + 变量名

```html
uniform vec4 u_fgc
```

3.varying定义

格式：varying + 类型 + 变量名

```html
varying vec2 vUv;
```

### 顶点着色器
代码不报错，就是不显示，就加下面代码。

```html
void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
```

+ projectionMatrix: 投影矩阵   
+ modelViewMatrix: 模型视图矩阵  
+ position: 顶点位置

### 片元着色器
```html
void main()
{
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0); // 这里改变颜色
}
```

gl_FragColor 我们可以对它进行动态修改，这样就会生成动态的效果。



## 测试
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1732172890372-ae5a259f-11c1-4105-a958-cb393bfa5df2.png)

##### shader案例（手动删注释）
```html
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
   vec2 uv = fragCoord/iResolution.xy;
    // 从左到右渐变
    // fragColor = vec4(uv.x, 0.0, 0.0, 1.0);
    // 从上到下渐变
    // fragColor = vec4(uv.y, 0.0, 0.0, 1.0);
    // 左右黑白灰
    // fragColor = vec4(vec3(uv.x), 1.0);
    // 上下黑白灰
    // fragColor = vec4(vec3(uv.y), 1.0);
    // 青色红色
    // fragColor = vec4(uv, 0.0, 1.0);
    // 蓝色紫色
    // gl_FragColor = vec4(uv, 1.0, 1.0);
    // 颜色突变,左黑右白
    // float color = step(0.5, uv.x);
    // fragColor = vec4(vec3(color), 1.0);
    // 颜色突变,左白右黑
    // float color = step(uv.x,0.5);
    // fragColor = vec4(vec3(color), 1.0);
    // 重复条纹。 fract重复次数
    // fragColor = vec4(vec3(fract(uv.x * 3.0)), 1.0);
    // 重复条纹,颜色突变
    fragColor = vec4(vec3(step(0.5, fract(uv.y * 3.0))), 1.0);
}
```

threejs案例：

```html
let frag2 = `
varying vec2 vUv;
void main() {
    // 从左到右渐变
    // gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
    // 从上到下渐变
    // gl_FragColor = vec4(vUv.y, 0.0, 0.0, 1.0);
    // 左右黑白灰
    // gl_FragColor = vec4(vec3(vUv.x), 1.0);
    // 上下黑白灰
    // gl_FragColor = vec4(vec3(vUv.y), 1.0);
    // 青色红色
    // gl_FragColor = vec4(vUv, 0.0, 1.0);
    // 蓝色紫色
    // gl_FragColor = vec4(vUv, 1.0, 1.0);
    // 颜色突变,左黑右白
    // float color = step(0.5, vUv.x);
    // gl_FragColor = vec4(vec3(color), 1.0);
    // 颜色突变,左白右黑
    // float color = step(vUv.x,0.5);
    // gl_FragColor = vec4(vec3(color), 1.0);
    // 重复条纹。 fract重复次数
    // gl_FragColor = vec4(vec3(fract(vUv.x * 3.0)), 1.0);
    // 重复条纹,颜色突变
    gl_FragColor = vec4(vec3(step(0.5, fract(vUv.y * 3.0))), 1.0);
}`

// 着色器材质
const materal2 = new THREE.ShaderMaterial({
    vertexShader: vertexShader,// 顶点着色器
    fragmentShader: frag2,// 片元着色器
    side: THREE.DoubleSide
})
const mesh2 = new THREE.Mesh(geomtry, materal2)
```



效果

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1732174215738-14db5756-8b42-4f8a-b058-3637def6fc22.png)



##### 动态修改片元着色器
```html
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    vec2 uv = fragCoord.xy / iResolution.xy;
	  fragColor = vec4(uv,0.5+0.5*sin(iTime),1.0);
}
```

























<font style="color:rgb(24, 25, 28);"></font>



