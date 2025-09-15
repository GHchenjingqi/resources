## 一、介绍
QGis 是一款获取地图信息资源的开源软件，可以用来制作不同风格的地图。

官方地址：[https://qgis.org/](https://qgis.org/)

下载（[https://qgis.org/download/](https://qgis.org/download/)）完成之后，选择“QGIS DeskTop ***” 启动即可！

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755138155114-ed96dff6-916c-4dd1-b933-3a6ef3886764.png)

## 二、使用
### 1.切换中文
打开之后默认是英文，找到设置 - 通用设置 - 修改中文并重启。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755138191570-61abcf11-b46e-44b2-84c4-1a764e6884ab.png)

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755138251488-63eaafac-e363-480d-8ada-29f6cc2eeb2f.png)

### 2.安装插件
选择“插件”-“管理并安装插件”

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755138609097-58be089e-39ca-49ad-b550-a1c8f39f2b39.png)

等待连接到远程仓之后，就可以检索安装插件。比如我们安装“天地图”插件。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755138681552-119506c6-b401-422f-9fa2-d26d7f70c31b.png)

点击安装即可。

在浏览器搜索天地图官网（[https://console.tianditu.gov.cn/api/key](https://console.tianditu.gov.cn/api/key)）注册登录-申请为开发者-创建应用

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755138798336-46d0827e-7348-49c8-986c-71cd3419737e.png)

再回到QGIS软件，找到天地图插件的设置图标，并将key添加进去，就可以正常使用了。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755138849419-d97d9c95-6379-46da-a720-0627ae7ffbb7.png)

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755138897644-1e33ca17-c4ae-463a-9df0-182e369da227.png)

### 3.窗口设置
有时候某些窗口碍事就会关掉，再需要时还需要显示出来。

“视图”-“面板”- 对应窗口

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755139527324-688c7ae5-8ead-472a-9afc-e401bd14743d.png)

### 4.资源获取
#### 4.1 DEM**<font style="color:rgb(36, 36, 36);">高程数据</font>**
前往“地理空间数据云（[https://www.gscloud.cn/](https://www.gscloud.cn/)）”,注册登录之后-高级检索-选择DEM数据-选择行政区或其他-检索-全选下载对应的dem数据。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755139750572-11eae521-1fae-4626-9478-dae678ad6fae.png)

#### 4.2 shp资源数据
可以前往gitcode获取一些开源的shp，如：全国行政区shp，全国河流shp

资源地址：[https://gitcode.com/search?q=shp&scope=group&type=repo&namespace=open-source-toolkit](https://gitcode.com/search?q=shp&scope=group&type=repo&namespace=open-source-toolkit)

### 5.XYZ地图添加
#### 5.1 高德地图
步骤：找到浏览器面板-XYZ切片-新建连接

```bash
# 矢量图
https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}

# 卫星遥感图
http://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}
```

添加名称，并将url复制到URL中，确定即可。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1755496706566-71753d7d-d4de-482f-bb76-853483daebbf.png)

