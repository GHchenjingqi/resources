前端CSS或JavaScript在使用<font style="color:rgb(37, 41, 51);">transform时本质就是通过matrix矩阵改变元素的移动变换。matrix是实现二维矩阵，matrix3d是实现三维矩阵。</font>

```css
/*公式*/ 
transform: matrix(a,b,c,d,e,f);
/*不旋转、不缩放、不倾斜、不平移*/
transform: matrix(1, 0 ,0 ,1, 0, 0);
```

<font style="color:rgb(37, 41, 51);">换句话说，通过matrix函数就可以实现CSS对应的二维变换：skew-拉伸、scale-缩放、rotate-旋转和translate-位移。</font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1756087462079-ccd7d60c-e68f-406a-b5f0-f99cc7b6f81f.png)

<font style="color:rgb(37, 41, 51);"></font>

### <font style="color:rgb(37, 41, 51);">1.transform-origin 变换中心</font>
元素默认的属性变化都是元素的中心点。但可以根据需要改变中心点：

```css
transform-origin: bottom left;
```

### 2.<font style="color:rgb(37, 41, 51);">translate 位移</font>
matrix函数实现唯一，只与**<font style="color:#AE146E;">ef</font>**参数有关（abcd采用默认值1001）。

```css
transform: matrix(1, 0, 0, 1,  30, 30);
/*等同于*/
transform: translate(30px,30px)
/*或*/
translate: 30px 30px;
```

### 3.<font style="color:rgb(51, 51, 51);">scale 缩放</font>
scale缩放与参数**<font style="color:#117CEE;">ad</font>**有关（bcef采用默认值0）

```css
transform: matrix(sx, 0, 0, sy,  0, 0);
/*等同于*/
transform: scale(sx,sy)
```

### 4.**<font style="color:rgb(51, 51, 51);">rotate 旋转</font>**
rotate旋转与**<font style="color:#F38F39;">abcd</font>**4个变量和三角函数有关（值在-1-1之间）。记忆：cs-sc 。

```css
transform: matrix(cosθ,sinθ,-sinθ,cosθ,0,0);
/*等同于*/
transform:rotate(deg);             
```

### 5.skew 拉伸
skew拉伸与**<font style="color:#DF2A3F;">bc</font>**和tan正切函数有关。

```css
transform: matrix(1,tanθy,tanθx,1,0,0);
/*等同于*/
transform: skew(30deg,30deg); 
```

