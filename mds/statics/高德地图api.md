官方地址：[https://lbs.amap.com/api/javascript-api-v2/summary](https://lbs.amap.com/api/javascript-api-v2/summary)

## 创建地图实例
```javascript
let map = new AMap.Map("id元素", {
  // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
  viewMode:"2D", 
  // 初始化地图层级，地图缩放比例，数字越大，显示地图越小，越小显示地图越大
  zoom:"11", 
  // 初始化地图中心点
  center: [116.397428, 39.90923] , 

  // 是否监控地图容器尺寸变化
  resizeEnable: true,
  // 是否在有矢量底图的时候自动展示室内地图，PC默认true,移动端默认false
  showIndoorMap:false,
  // 地图是否可通过鼠标拖拽平移，默认为true
  dragEnable: true,
  // 地图是否可通过键盘控制(上下左右），默认为true
  keyboardEnable: true,
  // 地图是否可通过双击鼠标放大地图，默认为true
  doubleClickZoom: false,
  // 地图是否可缩放，默认值为true
  zoomEnable: false,
  // 地图是否可旋转，3D视图默认为true，2D视图默认false
  rotateEnable: false，3D视图默认为true，2D视图默认false
    // 地图是否可倾斜
    pitchEnable: false,
  // 是否展示地图的热点（鼠标经过商家显示商家信息）
  isHotspot:false,
  // 3D y轴角度
  pitch:90,
  // 不显示地图文字标记
  showLabel: false,
  // 初始地图是否展示地形,3D使用	
  terrain:false,

  })
```

### 地图插件 plugin 使用
插件有2种使用方法，第一种使用回调式：

```javascript
map.plugin('AMap.Driving', function() {
  var driving = new AMap.Driving({
    // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
    policy: AMap.DrivingPolicy.LEAST_TIME
  })
  
  var startLngLat = [116.379028, 39.865042]
  var endLngLat = [116.427281, 39.903719]
  
  driving.search(startLngLat, endLngLat, function (status, result) {
    // 未出错时，result即是对应的路线规划方案
  })
})
```

第二种，全局式写法

```javascript
// 全局注册插件 AMap.Driving
Amap = await AMapLoader.load({
  key: process.env.VUE_APP_AMAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
  version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  plugins: ['AMap.Driving'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
})


// 使用插件
const ridingOption = {
  map: map,  // 关联map实例
  panel: "panel",  // 路线绘制div的id
  policy: 1,
  hideMarkers: true, // 隐藏标记
  isOutline: true, // 是否显示路线外框
  outlineColor: '#ffeeee', // 路线颜色
  autoFitView: false // 自动适应视图
}
const riding = new AMap.Driving(ridingOption)

//根据起终点坐标规划行车路线路线
riding.search([117.089746,36.582442],[117.102489,36.551805], function(status, result) {
  if (status === 'complete') {
    console.log('路线数据查询成功')
  } else {
    console.log('路线数据查询失败' + result)
  }
});

```



## 实例事件及常用方法
### 一.添加元素/图层/控件到地图上 add
```javascript
// 添加单个
map.add(labelsLayer);
// 添加多个
map.add([labelsLayer,two]);
```



### 二.地图元素/图层/控件删除 remove
```javascript
map.remove(labelsLayer);
```

### 三.注册事件 - on
#### 1.加载完成 complete
```javascript
map.on("complete", function(){
  log.success("地图加载完成！");  
});
```

#### 2.移动 moveend
```javascript
map.on('moveend', 回调函数);
```

#### 3.缩放 zoomend
```javascript
map.on('zoomend', 回调函数);
```



#### 4.点击 click
```javascript
map.on('click', function(e) {
  // e点击位置信息
  document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
});
```



#### 5.热点经过事件 hotspotover
```javascript
map.on('hotspotover', function(result) {
  placeSearch.getDetails(result.id, function(status, result) {
    if (status === 'complete' && result.info === 'OK') {
      placeSearch_CallBack(result);
    }
  });
});
```

### 四.移除事件 - off


### 五.实例方法
#### 1.设置地图层级 setZoom
```javascript
map.setZoom(number);
```

另外一种写法，带动画过渡效果

<font style="color:rgb(71, 101, 130);background-color:rgb(241, 241, 241);">setZoom(zoom, immediately, duration)</font>

+ <font style="color:rgb(71, 101, 130);background-color:rgb(241, 241, 241);">zoom</font><font style="color:rgb(37, 43, 72);">地图的缩放级别。</font>
+ <font style="color:rgb(71, 101, 130);background-color:rgb(241, 241, 241);">immediately 是否立即跳转</font>
+ <font style="color:rgb(71, 101, 130);background-color:rgb(241, 241, 241);">duration 过渡动画时长</font>

```javascript
map.setZoom(16.5, false, 2500)
```

#### 2.设置地图中心点 setCenter
```javascript
map.setCenter([lng, lat]);
```

另外一种写法，带动画过渡效果

<font style="color:rgb(71, 101, 130);background-color:rgb(241, 241, 241);">setCenter(zoom, immediately, duration)</font>

```javascript
map.setCenter( new AMap.LngLat(117.101009,36.562788), false, 3500)
```

<font style="color:rgb(71, 101, 130);background-color:rgb(241, 241, 241);"></font>

#### 3.同时设置地图层级与中心点 setZoomAndCenter
```javascript
map.setZoomAndCenter(number, [lng, lat])
```



#### 4.设置/更改城市 setCity
```javascript
map.setCity("郑州")
```



#### 5.获取当前城市 getCity
```javascript
map.getCity( function(info){
  // info:{"province":"北京市","city":"","citycode":"010","district":"西城区"}
  alert(JSON.stringify(info) )
})
```



#### 6.获取地图边界 getBounds
返回地图 2个坐标，表示地图矩形边界

```javascript
var bounds = map.getBounds();
// northEast，southWest
document.querySelector("#ne").innerText = bounds.northEast.toString();
document.querySelector("#sw").innerText = bounds.southWest.toString();
```

#### 7.设置地图边界 setBounds
```javascript
var mybounds = new AMap.Bounds([116.319665, 39.855919], [116.468324,39.9756]);
map.setBounds(mybounds);
```



#### 8.限制地图的显示范围 setLimitBounds
限制显示范围后，移动地图会有限制，不能自由移动

```javascript
var bounds = map.getBounds();
map.setLimitBounds(bounds);
```



#### 9.地图平移 panBy | panTo
```javascript
// 平移像素值（正向左|负向右，正向上|负向下）
map.panBy(50, 100)
// panTo移动到指定位置
map.panTo([116.405467, 39.907761]);
```



#### 10.设置鼠标样式 setDefaultCursor
```javascript
map.setDefaultCursor("pointer");
```



#### 11.获取当前地图级别 getZoom
```javascript
var zoom = map.getZoom();
```

#### 12.获取当前地图中心位置 getCenter
```javascript
var center = map.getCenter();
```

#### 13.自动平移到中心位置 setFitView
```javascript
map.setFitView();
```

#### 14.设置地图样式 setMapStyle
```javascript
map.setMapStyle('amap://styles/dark'); // 夜间黑色
map.setMapStyle("amap://styles/light");// 月光银
map.setMapStyle("amap://styles/whitesmoke");// 远山黛
map.setMapStyle("amap://styles/fresh"); // 草色青
map.setMapStyle("amap://styles/grey");//  雅士灰
map.setMapStyle("amap://styles/macaron");// 马卡龙
map.setMapStyle("amap://styles/blue");// 靛青蓝
map.setMapStyle("amap://styles/darkblue");//极夜蓝
map.setMapStyle("amap://styles/wine");//酱籽
```



#### 15.设置地图要素 setFeatures
```javascript
map.setFeatures(  ['bg', 'road', 'building', 'point'] );
```

#### 16.销毁地图 destroy
```javascript
map.destroy()
```

### 六.覆盖物遮罩添加
#### 1.点坐标图添加
```javascript
var marker = new AMap.Marker({
  icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
  position: [116.405467, 39.907761],
  anchor:'bottom-center'
});
// 添加遮罩
map.add(marker);
```

#### 2.构造矢量圆形
```javascript
var circle = new AMap.Circle({
  center: new AMap.LngLat("116.403322", "39.920255"), // 圆心位置
  radius: 1000,  //半径
  strokeColor: "#F33",  //线颜色
  strokeOpacity: 1,  //线透明度
  strokeWeight: 3,  //线粗细度
  fillColor: "#ee2200",  //填充颜色
  fillOpacity: 0.35 //填充透明度
});
// 添加
map.add(circle);
```

除了Marker，Circle

### 七.图层添加
#### 1.高德默认图层
```javascript
var map = new AMap.Map('container', {
  center: [116.397428, 39.90923],
  layers: [//只显示默认图层的时候，layers可以缺省
    AMap.createDefaultLayer()//高德默认标准图层
  ],
  zoom: 13
});
```

#### 2.卫星图层 Satellite
```javascript
var satelliteLayer = new AMap.TileLayer.Satellite();
map.add(satelliteLayer);
```

#### 3.路网图层 RoadNet
```javascript
var roadNetLayer =  new AMap.TileLayer.RoadNet();
map.add(roadNetLayer );
```



#### 4.交通图层 Traffic


```javascript
var trafficLayer = new AMap.TileLayer.Traffic({});
map.add( trafficLayer  );
```

### 八.控件添加
#### 1.组合了旋转、倾斜、复位、缩放在内的地图控件 ControlBar
```javascript
var controlBar = new AMap.ControlBar({
  position: {
    top: '10px',
    right: '10px',
  }
})
map.addControl(controlBar);
```

#### 2.加载工具条 ToolBar
```javascript
var tool = new AMap.ToolBar();
mapObj.addControl(tool);
```

#### 3.比例尺插件  Scale
```javascript
var scale = new AMap.Scale(),
map.addControl(scale);
```

#### 4.地图鹰眼插件，默认在地图右下角显示缩略图  HawkEye
```javascript
var  overView = new AMap.HawkEye({
  opened: false
})
map.addControl(overView );
```



### 九.JSAPI 加载器
可以避免异步加载、重复加载等常见错误加载错误。  
引入 @amap/amap-jsapi-loader 文件

```javascript
AMapLoader.load({ 
  // map key
  key:'608d75903d29ad471362f8c58c550daf',
  // 版本号
  version:'2.0',
  // 插件
  plugins:['AMap.MapType']
}).then((AMap)=>{
  // 回调，用于初始化插件
  map.addControl(new AMap.MapType())
}).catch((e)=>{
  console.error(e);
});
```



### 十.显示地图参数信息
```javascript
new PrettyJSON.view.Node({
  el: document.querySelector("#map-status"),
  data: mapOpts
});
```



## 异常处理记录
#### 1.amap 多标签页面切换导致内存泄露问题
解决办法：

```javascript
beforeDestroy: function () {
  this.map.destroy()
  if (this.canvas) {
    //此处是获取高德生成的地图画布canvas元素，其他方式亦可
    var gl = this.canvas.getContext('webgl');
    //监听上下文丢失-可不添加。
    this.canvas.addEventListener('webglcontextlost', function(e) {}, false);
    //丢失上下文的方法
    gl.getExtension('WEBGL_lose_context').loseContext();
  }
  
},


// 地图图块加载完成后触发
map.on('complete', () => {
    // 避免销毁时获取不到canvas
    this.canvas = document.querySelector('canvas.amap-layer')
})
```

