官方地址：[https://echarts.apache.org/zh/index.html](https://echarts.apache.org/zh/index.html)

## Vue3环境安装echart
1.main.js全局引入

```javascript
import * as echarts from 'echarts'
app.config.globalProperties.$echarts = echarts
```



2.组件内使用 getCurrentInstance 获取当前vue实例

```javascript
import { ref, onMounted, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance() // 获取全局配置项
var myChart =  proxy.$echarts.init(myRef.value,'dark');
myChart.setOption({});
```



## echarts使用技巧
### 1.开启深色模式，init方法第二个参数传“dark”
```javascript
echarts.init(myRef,'dark');
```

### 2.echarts图标背景色改为透明，backgroundColor设置为空
```javascript
myChart.setOption({
    backgroundColor: '',
});
```

### 3.echart常见参数
主要属性参数：

```javascript
{
  // 主标题
  title: {},
  // 默认色板，图表会依次取值给每一项数据
  color:{},
  // 背景色
  backgroundColor:"",
  // 图标图例说明
  legend:{},
  // 横轴标尺
  xAxis:{},
  // 纵轴标尺
  yAxis:{},
  // 图标离容器的距离
  grid:{},
  // 工具箱
  toolbox:{},
  // 提示
  tooltip:{},
  // 数据
  series:[],
    // 区域缩放控制器
    dataZoom:{},
  animation：图表的动画效果设置
  animationThreshold: 2000,    //是否开启动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画
    animationDuration: 1000,     //初始动画时长
    animationEasing: 'cubicOut',    //初始动画缓动效果
    animationDelay: 0,   //初始动画的延迟，毫秒，支持回调函数
    animationDurationUpdate: 300,   //数据更新动画的时长，毫秒，支持回调函数
    animationEasingUpdate: 'cubicInOut',  //数据更新动画的缓动效果
    animationDelayUpdate: 0,    //数据更新动画的延迟，毫秒，支持回调函数
    }
```



### 4.title-标题设置
```javascript
title: {
  // 是否显示标题组件,（true/false）
  show: true,// 主标题
    text: "近7日出入库统计",
    //1.标题居中：left的值为'left','center','right'
    left: "center",
    // 主副标题间隔
    itemGap: 20,
    // 主标题样式
    textStyle：{
    // 文字颜色
    color: "#FFF",
      // 字体大小
      fontSize: 12,
      // 行高
      lineHeight: 14,
      // 字体粗细:'normal,'bold,'bolder','lighter','100|200|300|400...'
      fontWeight: "bold",
      //字体系列
      fontFamily:'sans-serif',
      //字体风格 'normal','italic','oblique'
      fontStyle:'normal',
      // 文字水平对齐方式（left/right）
      align:'center',
      // 文字垂直对齐方式（top/bottom）
      verticalAlign:'middle',
      },
  // 标题边框颜色
  borderColor: '',// 边框宽度（默认单位px）
    borderWidth: 1,// 副标题
    subtext:"",
    // 副标题文本样式
    subtextStyle:{},
}
```

### 5.xAxis 和 yAxis 参数
坐标轴，刻度等属性

```javascript
{
  // 坐标轴类型，通常为 'category'（类目轴）或 'value'（数值轴）
  type: 'category',
  // 坐标轴两边留白大小：true-自动计算，false-不留白，具体的百分比数值-留白大小
  boundaryGap: false,
  // 类目轴的数据，在柱状图、折线图等中表示每个类目的名称
  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  // 坐标轴标签的样式设置，包括字体、颜色、旋转角度等。
  axisLabel：{},
  // 坐标轴轴线的样式设置，包括颜色、线型、宽度等。
  axisLine：{},
  // 坐标轴刻度线的样式设置，包括显示与否、长度等。
  axisTick：{},
}
```



### 6.legend 图例参数
分类图例样式，可以修改位置及样式类型

```javascript
{
  // 图例类型，默认为'plain'，当图例很多时可使用'scroll'
  type:"plain",
    // 垂直位置-距离顶部距离，相对容器位置，top\bottom\left\right
  top: '5%',
    // 水平位置
  left: 'center'，
  // 可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
  padding:[0,50,0,0],
    // 图例内容样式
  textStyle：{
    color: '#ccc', // 所有图例的字体颜色
      backgroundColor:'black',	// 所有图例的字体背景色
  },
  // 图例提示框，默认不显示
  tooltip: {
    show: true,
      color: 'red'
  },
  // 图例数据
  data: [
    // 单个图例内容
    {
      name: '销量', // 对应数据中的name
      icon: 'circle', // 图例的外框样式
      textStyle: {
        color: '#000' // 图例的颜色
        // backgroundColor:'skyblue',// 图例文字的背景色
      }
    }]
}
```



### 7.工具栏配置 toolbox
用于展示下载、导出等功能图标

```javascript
{
    // 工具栏配置
    toolbox:{
        id:'1',                       // 组件ID
        show:true,                    // 是否显示工具栏
        orient:'horizontal',          // 工具栏 icon 的布局朝向
        itemSize:15,                  // 工具栏 icon 的大小
        itemGap:10,                   // 工具栏 icon 每项之间的间隔
        showTitle:true,               // 是否在鼠标悬浮 icon 时，显示每一个工具的标题
        zlevel:1,                     // 组件所有图形的 zlevel 值， 画布 Canvas 分层，图层优先级
        z:1,                          // 组件所有图形的 z 值，图形前后绘制顺序
        left:'10%',                   // 工具栏组件距离容器左侧的距离
        right:'10%',                  // 工具栏组件距离容器右侧的距离
        top:'10%',                    // 工具栏组件距离容器顶部的距离
        bottom:'10%',                 // 工具栏组件距离容器底部的距离   
        width:"20%",                  // 工具栏组件宽度
        height:'10%',                 // 工具栏组件高度 
        // 工具栏的 tooltip 设置
        tooltip:{
            show:true,                                           // 是否展示提示组件
            // formatter:'{a}',                                   // 提示框显示内容，{a} 默认英文名称, {b} 默认中文名称   
            formatter:function(param){
                return '<div>'+param.title+'内容'+'</div>';      //  自定义提示框显示内容  
            },
            // 提示框字体样式
            textStyle:{
                fontSize:18,   
            },   
        },
        // 统一配置工具栏中 icon 的样式 头
        iconStyle:{
            color:'red',                // 图形颜色
            borderWidth:5,              // 图形描边宽度
            borderColor:'red',          // 图形描边颜色
            borderType:'solid',         // 图形描边线类型
            borderDashOffset:10,        // 描边线类型为虚线时，虚线的偏移量
            borderCap:'butt',           // 指定线段末端的形状
            borderJoin:'bevel',         // 指定两个线段连接处的形状 
            borderMiterLimit:10,        // 当 borderJoin 为 miter 时，斜接面比例
            shadowBlur:5,               // 图形阴影长度
            shadowColor:'red',          // 图形阴影颜色
            shadowOffsetX:20,           // 图形阴影水平偏移量
            shadowOffsetY:10,           // 图形阴影竖直偏移量
            opacity:0.8,                // 图形透明度   
        },
        // 统一配置工具栏中 icon 的样式 尾
  
        // 统一配置鼠标 hover 工具 icon 时，强调样式 头
        emphasis:{
            // 强调时，icon 和对应标签样式
            iconStyle:{
                color:'red',                      // 图形的颜色
                borderColor:'#000',               // 图形的描边颜色
                borderWidth:5,                    // 图形的描边宽度
                borderType:'solid',               // 图形描边线的类型
                borderDashOffset:5,               // 图形描边为虚线时，虚线的偏移量
                borderCap:'butt',                 // 指定线段末端的形状
                borderJoin:'bevel',               // 设置两个线段相连部分的形状
                borderMiterLimit:10,              // 当 borderJoin 为 miter 时,斜接面比例
                shadowBlur:10,                    // 图形阴影大小
                shadowColor:'red',                // 图形阴影颜色
                shadowOffsetX:10,                 // 图形阴影水平偏移量
                shadowOffsetY:10,                 // 图形阴影竖直偏移量
                opacity:0.7,                      // 图形透明度
        
                textPosition:'bottom',            // 文字的位置
                textFill:'#fff',                  // 文字颜色
                textAlign:'left',                 // 文字对齐方式
                textBackgroundColor:'red',        // 文本区域填充颜色
                textBorderRadius:'',              // 文本区域圆角大小
                textPadding:10,                   // 文本区域内边距                      
            },   
        },
        // 统一配置鼠标 hover 工具 icon 时，强调样式 尾
  
        // 配置每一个工具项  头
        feature:{
            // 保持 Ehcarts 为图片工具， 头
            saveAsImage:{
                show:true,                      // 是否显示工具
                title:'保持图片',                // 工具标签
                icon:'image://url',             // 工具 icon
                type:'png',                     // 自定义保持图片的后缀
                name:'filename',                // 自定义保持图片的名称，默认获取 tite 标题的 text 内容作为文件名称
                backgroundColor:'auto',         // 保持图片的背景颜色，默认白色
                connectedBackgroundColor:'red', // 如果图表使用了 echarts.connect 对多个图表进行联动，则在导出图片时会导出这些联动的图表。该配置项决定了图表与图表之间间隙处的填充色。    
                excludeComponents:['toolbox'],  // 保持图片时，图片中忽略的组件列表
         
                // ionc 样式设置
                iconStyle:{
                   // ··· 该配置与什么的 iconStyle 统一配置内容一致，在此省去重复代码                   
                },
          
                //  配置鼠标 hover 工具 icon 强调样式
                emphasis:{
                    iconStyle:{
                        // 强调时，icon 和对应标签样式
                        //··· 该配置与上面的 emphasis 中 iconStyle 统一配置内容一致，在此省去重复代码              
                    },         
                },          
            },
            // 保持 Ehcarts 为图片， 尾
      
            // 配置项还原 头
            restore:{
                show:true,                       // 是否显示工具
                title:'还原',                    // 鼠标悬浮时显示标签
                icon:'image://url',              // 工具 icon
         
                // ionc 样式设置
                iconStyle:{
                   // ··· 该配置与什么的 iconStyle 统一配置内容一致，在此省去重复代码                   
                },
          
                //  配置鼠标 hover 工具 icon 强调样式
                emphasis:{
                    iconStyle:{
                         // 强调时，icon 和对应标签样式
                        //··· 该配置与上面的 emphasis 中 iconStyle 统一配置内容一致，在此省去重复代码              
                    },         
                },         
            },  
            // 配置项还原 尾
      
            // 数据视图，将图表简单以表格形式展示 头
            dataView:{
                show:true,                  // 是否显示工具
                title:'数据视图',            // 工具标签
                icon:"image://url",         // 工具 icon
          
                // ionc 样式设置
                iconStyle:{
                   // ··· 该配置与什么的 iconStyle 统一配置内容一致，在此省去重复代码                   
                },
          
                //  配置鼠标 hover 工具 icon 强调样式
                emphasis:{
                    iconStyle:{
                         // 强调时，icon 和对应标签样式
                        //··· 该配置与上面的 emphasis 中 iconStyle 统一配置内容一致，在此省去重复代码              
                    },         
                },    
            },
            // 数据视图，将图表简单以表格形式展示 尾
      
            // 数据区域缩放 头
            dataZoom:{
                show:true,                             // 是否显示工具
                title:['缩放','还原'],                  // 缩放和还原的标题
                filterMode:'filter',                   // 超出范围的数据缩放展示
                xAxisIndex:[0,1],                      // 指定哪些 xAxis 被控制
                yAxisIndex:[0,1],                      // 指定哪些 yAxis 被控制
                icon:{
                       zoom:'image://url',             // 缩放 icon
                       back:'image://url',             // 还原 icon
                },
                // 刷选框样式 头
                brushStyle:{
                    color:'red',                       // 图形颜色
                    borderColor:'red',                 // 图形描边颜色
                    borderWidth:5,                     // 图形描边宽度
                    borderType:'solid',                // 图形描边线类型
                    borderDashOffset:5,                // 图形描边线为虚线时，虚线的偏移量
                    borderCap:'butt',                  // 指定线段末端形状 
                    borderJoin:'bevel',                // 两个线段相连部分的形状
                    borderMiterLimit:10,               // borderJoin 为 miter 时,斜接面比例
                    shadowBlur:20,                     // 图形阴影大小
                    shadowColor:'red',                 // 图形阴影颜色
                    shadowOffsetX:10,                  // 图形阴影水平偏移量
                    shadowOffsetY:10,                  // 图形阴影竖直偏移量
                    opacity:0.5,                       // 图形透明度    
                },
                // 刷选框样式 尾
 
                // ionc 样式设置
                iconStyle:{
                   // ··· 该配置与什么的 iconStyle 统一配置内容一致，在此省去重复代码                   
                },
          
                //  配置鼠标 hover 工具 icon 强调样式
                emphasis:{
                    iconStyle:{
                         // 强调时，icon 和对应标签样式
                        //··· 该配置与上面的 emphasis 中 iconStyle 统一配置内容一致，在此省去重复代码              
                    },         
                },    
            },
            // 数据区域缩放 尾
      
            //  切换图形类型 头
            magicType:{
                show:true,                    // 是否显示工具
                // 单独配置每一个图形的标题
                title:{
                    line:'折线图',            // 折线图标题
                    bar:'柱状图',             // 柱状图标题
                    stack:'堆叠',             // 堆叠图标题
                    tiled:'平铺',             // 平铺图标题
                },
                // 单独配置每一个图形的 icon
                icon:{
                  line:'image://url',         // 折线图的 icon   
                  bar:'image://url',          // 柱状图的 icon
                  stack:'image://url',        // 堆叠图的 icon 
                  tiled:'image://url',        // 平铺图的 icon        
                },
          
                // ionc 样式设置
                iconStyle:{
                   // ··· 该配置与什么的 iconStyle 统一配置内容一致，在此省去重复代码                   
                },
          
                //  配置鼠标 hover 工具 icon 强调样式
                emphasis:{
                    iconStyle:{
                         // 强调时，icon 和对应标签样式
                         //··· 该配置与上面的 emphasis 中 iconStyle 统一配置内容一致，在此省去重复代码              
                    },         
                }, 
          
                // 单独配置每一个系列的显示数据
                option:{
                    line:{
                        // 这里面的配置和 series 中每个系列中的配置一样
                    },
                              
                },
          
                // 指定在切换图形类别时，哪些数据图形变化
                seriesIndex:{
                    line:[0,1,2],            // 切换成折线图时，数据一、二、三对应改变
                    bar:[0,2],               // 切换成柱状图时，数据一、三对应改变 
                    // ···       
                },     
            },
            //  切换图形类型 尾
      
            // 选框组件控制按钮 头
            brush:{
                type:['rect','polygon'],      // 开启的哪些选框组件，例如，矩形选框、任意形状选框等
                // 配置选框的 icon
                icon:{
                    rect:'image://url',       // 矩形选框的 icon
                    polygon:'image://url',    // 任意形状选框的 icon
                    lineX:'image://url',      // 横向选框的 icon
                    lineY:'image://url',      // 纵向选框的 icon
                    keep:'image://url',       // 开启单项和多选的 icon
                    clear:'image://url',      // 清空所有选框的 icon   
                },
                // 配置选框的标题
                title:{
                    rect:'矩形选框',
                    polygon:'圈选',
                    lineX:'横向选择',
                    lineY:'纵向选择',
                    keep:'多选',
                    clear:'清除选择',
                }     
            },
            // 选框组件控制按钮 尾
      
            // 自定义工具按钮,名称必须 my 开始， 头
            myTool:{
                show:true,                  // 是否显示
                title:"自定义按钮",          // 工具标题
                icon:'image://url',         // 工具 icon
                onclick:function(){},       // 自定义点击方法
                iconStyle:{
                   // ··· 该配置与什么的 iconStyle 统一配置内容一致，在此省去重复代码                   
                },
                emphasis:{
                    iconStyle:{
                         // 强调时，icon 和对应标签样式
                         //··· 该配置与上面的 emphasis 中 iconStyle 统一配置内容一致，在此省去重复代码              
                    },         
                },                                        
            }  
            // 自定义工具按钮,名称必须 my 开始， 尾                                  
        },
        // 配置每一个工具项  尾                               
    }
```

### 8.tooltip 提示组件
<font style="color:#080808;background-color:#ffffff;">鼠标经过显示的提示信息</font>

```javascript
{
  show:true,                // 是否显示提示组件
    trigger:'item',           // 提示组件触发类型
    // 坐标指示器配置 头
    axisPointer:{
    type:'line',          // 指示器类型
      axis:'auto',          // 指示器的坐标轴
      snap:true,            // 坐标轴指示器是否吸附到具体的数值点上
      z:1,                  // 坐标轴指示器的 z 值，图形层级// 指示器文本标签配置  头
    label:{
      show:true,                // 是否显示文本标签
        precision:2,              // 文本标签中数值的精度，当前保留两位小数点
        formatter:'{value}单位',  // 文本标签格式器，可以使用方法
        margin:10,                // 文本标签距离轴的距离
        color:'red',              // 文字颜色
        fontStyle:'normal',       // 字体的风格
        fontWeight:'normal',      // 字体粗细
        fontFamily:'serif',       // 字体系列
        fontSize:15,              // 字体大小
        lineHeight:15,            // 行高
      width:100,                // 文本显示宽度
        height:100,               // 文本显示高度
        textBorderColor:'red',    // 文字描边颜色
        textBorderWidth:20,       // 文字描边宽度
        textBorderType:'solid',   // 文字描边类型
        textBorderDashOffset:2,   // 文字描边为虚线时，虚线的偏移量
        textShadowColor:'red',    // 文字阴影
        textShadowBlur:10,        // 文字阴影长度
        textShadowOffsetX:10,     // 文字阴影水平偏移量
      textShadowOffsetY:10,     // 文字阴影竖直偏移量
        overflow:'truncate',      // 文字超出宽度是否截断或者换行
        ellipsis:'···',           // 文字超出宽度设置为 truncate 时，末尾显示内容
        padding:[5,5,5,5],        // 文本标签的内边距
        backgroundColr:'red',     // 文本标签的背景颜色
        borderColor:'red',        // 文本标签边框颜色
        borderWidth:10,           // 文本标签的边框宽度
        shadowBlur:3,             // 文本标签阴影
      shadowColor:'red',        // 文本标签阴影颜色
        shadowOffsetX:10,         // 文本标签阴影水平偏移量
        shadowOffsetY:10,         // 文本标签阴影竖直偏移量
        },
        // 指示器文本标签配置  尾// 直线指示器的样式, type 为 line 生效， 头
        lineStyle:{
        color:'red',              // 线的颜色
          width:2,                  // 线的宽度
          type:'solid',             // 线的类型
          dashOffset:10,            // 线的类型为虚线时，虚线的偏移量
          cap:'butt',               // 线段末端形状
          join:'bevel',             // 两个线段连接部分的形状
          miterLimit:10,            // join 为 miter 时,斜接面比例
          shadowBlur:10,            // 线的阴影
        shadowColor:'red',        // 线的阴影颜色
          shadowOffsetX:10,         // 阴影水平偏移量
          shadowOffsetY:10,         // 阴影竖直偏移量
        opacity:0.8,              // 线的透明度
          },
      // 直线指示器的样式, type 为 line 生效， 尾// 阴影指示器图形样式, type 为 shadow 生效， 头
      shadowStyle:{
        color:'red',              // 图形填充颜色
          shadowBlur:10,            // 图形阴影大小
          shadowColor:'red',        // 图形阴影颜色
          shadowOffsetX:'red',      // 图形阴影水平偏移量
          shadowOffsetY:'red',      // 图形阴影竖直偏移量
          opacity:0.8,              // 图形透明度
          },
          // 阴影指示器图形样式, type 为 shadow 生效， 尾// 十字准星指示器样式,type 为 cross 生效，头
          crossStyle:{
          color:'red',              // 线的颜色
            width:2,                  // 线的宽度
            type:'dashed',            // 线的类型
            dashOffset:10,            // 线的类型为虚线时，虚线的偏移量
            cap:'butt',               // 指定线段末端的图形
            join:'bevel',             // 两个线段连接处的形状
            miterLimit:10,            // join 为 miter 时，斜接面比例
            shadowBlur:10,            // 线的阴影程度
          shadowColor:'red',        // 线的阴影颜色
            shadowOffsetX:10,         // 线阴影的水平偏移量
            shadowOffsetY:10,         // 线阴影的竖直偏移量
          opacity:0.8,              // 线的透明度}
            // 十字准星指示器样式,type 为 cross 生效 尾
            animation:true,                 // 是否开启动画
            animationThreshold:100,         // 动画的阈值，当单个系列显示的图形数量大于这个阈值时会关闭动画。
          animationDuration:100,          // 初始动画时长
            animationEasing:'cubicIn',      // 初始动画的缓动效果
animationDelay:100,             // 初始动画的延迟
animationDurationUpdate:200,    // 数据更新动画时长
animationEasingUpdate:'linear', // 数据更新缓动效果
animationDelayUpdate:100,       // 数据更新动画延迟}// 坐标指示器配置 尾showContent:true,                   // 是否显示提示框浮层
alwaysShowContent:true,             // 是否一直显示提示框内容
triggerOn:'click',                  // 提示框触发的条件
showDelay:100,                      // 浮层显示的延迟时间
hideDelay:100,                      // 浮层隐藏的延迟
enterable:true,                     // 鼠标是否可以进入提示框浮层中
renderMode:'html',                  // 浮层渲染模式
confine:true,                       // 将 tooltip 框限制在图表区域内
appendToBody:true,                  // 是否将 tooltip 的 DOM 节点添加到 HTML 的 body 子节点上
className:'name',                   // 指定 DOM 节点类名
transitionDuration:2,               // 提示框浮层的移动动画过度时间，单位 S/秒
position:'left',                    // 提示框浮层的位置，设置之后就会固定，不会跟随鼠标移动
formatter:'{a}单位'                 // 提示框浮层内容格式器，模板变量有 {a}, {b}，{c}，{d}，{e}，分别表示系列名，数据名，数据值等。
valueFormatter:(value) => '$' + value.toFixed(2),                  // tooltip 中数值显示部分的格式化回调函数。
backgroundColor:'red',              // 提示框浮层的背景颜色
borderColor:'#333',                 // 提示框浮层的边框颜色
borderWidth:3,                      // 提示框浮层的边框宽度
padding:[5,5,5,5],                  // 提示框浮层的内边距
// 提示框浮层的文本样式 头
textStyle:{
color:'red',                       // 文字的颜色
fontStyle:'normal',                // 字体的风格
fontWeight:'normal',               // 字体的粗细
fontFamily:'serif',                // 字体系列
fontSzie:15,                       // 字体大小
lineHeight:20,                     // 行高
width:10,                          // 文本显示宽度
height:100,                        // 文本显示高度
textBorderColor:'red',             // 文字描边颜色
textBorderWidth:10,                // 文字描边宽度
textBorderType:'solid',            // 文字描边类型
textBorderDashOffset:10,           // 描边类型为虚线时，虚线的偏移量
textShadowColor:'red',             // 文字阴影颜色
textShadowBlur:10,                 // 文字阴影长度
textShadowOffsetX:10,              // 文字阴影水平偏移量
textShadowOffsetY:10,              // 文字阴影竖直偏移量
overflow:'none',                   // 文字超出宽度截断或者换行
ellipsis:'···',                    // overflow 配置为 truncate 的时候，文本末尾显示的文本}
// 提示框浮层的文本样式 尾
extraCssText:'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',       // 额外附加到浮层的 css 样式。order:'seriesAsc',                                            // 多系列提示框浮层排列顺序。}
```



### 9.dataRange 值域 - 常用于展现地域数据时选择值域范围
```javascript
{
    orient: 'vertical', // 布局方式，默认为垂直布局，可选为：
                        // 'horizontal' ¦ 'vertical'
    x: 'left',          // 水平安放位置，默认为全图左对齐，可选为：
                        // 'center' ¦ 'left' ¦ 'right'
                        // ¦ {number}（x坐标，单位px）
    y: 'bottom',        // 垂直安放位置，默认为全图底部，可选为：
                        // 'top' ¦ 'bottom' ¦ 'center'
                        // ¦ {number}（y坐标，单位px）
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: '#ccc',   // 值域边框颜色
    borderWidth: 0,        // 值域边框线宽，单位px，默认为0（无边框）
    padding: 5,            // 值域内边距，单位px，默认各方向内边距为5，
                           // 接受数组分别设定上右下左边距，同css
    itemGap: 10,           // 各个item之间的间隔，单位px，默认为10，
                           // 横向布局时为水平间隔，纵向布局时为纵向间隔
    itemWidth: 20,             // 值域图形宽度，线性渐变水平布局宽度为该值  10
    itemHeight: 14,            // 值域图形高度，线性渐变垂直布局高度为该值  10
    splitNumber: 5,            // 分割段数，默认为5，为0时为线性渐变
    color:['#1e90ff','#f0ffff'],// 颜色(值域的颜色渐变范围)
    //text:['高','低'],         // 文本，默认为数值文本
    textStyle: {
        color: '#333'           // 值域文字颜色
    }
}
```

### 10.series 存放数据的大数组
```javascript
{
  // series的类型，line表示折线图   bar表示柱状图   pie表示饼图   scatter表示散点图
  type: 'line',
    // series的名称，用于tooltip的显示，legend的图例筛选等
    name: '数据系列1',
    // series的数据，可以是数组，也可以是函数，详见下面的data配置项
    data: [1, 2, 3, 4, 5],
    // series的样式配置，如颜色、线条粗细、图形类型等
    itemStyle: {
    color: '#ff4c4c', // 线条颜色
      borderWidth: 2, // 线条粗细
      borderType: 'solid', // 线条类型
      borderColor: '#fff', // 线条颜色
      lineStyle: {
      type: 'solid', // 线条类型
        width: 2, // 线条粗细
        color: '#ff4c4c' // 线条颜色
    },
    areaStyle: {
      color: '#ff4c4c' // 填充颜色
    },
    symbol: 'circle', // 点的形状
      symbolSize: 10 // 点的大小
  },
  // series的标签配置，如显示文本、文本位置、文本样式等
  label: {
    show: true, // 是否显示标签
      position: 'top', // 标签位置，如'top'、'bottom'、'left'、'right'等
      formatter: '{c}', // 标签文本格式化字符串，支持'{a}'、'{b}'、'{c}'等变量
      color: '#666', // 标签颜色
      fontWeight: 'bold', // 标签字体粗细
      fontFamily: 'Arial', // 标签字体
      fontSize: 16 // 标签字号
  },
  // series的标记配置，如显示点、点的样式、点的大小等
  markPoint: {
    data: [
      { type: 'max', name: '最大值' },
      { type: 'min', name: '最小值' }
    ],
      symbol: 'circle', // 点的形状
      symbolSize: 10, // 点的大小
      label: {
      show: true, // 是否显示标签
        color: '#666', // 标签颜色
        fontWeight: 'bold', // 标签字体粗细
        fontFamily: 'Arial', // 标签字体
        fontSize: 16 // 标签字号
    }
  },
  // series的动画配置，如动画类型、动画时长、动画延迟等
  animation: {
    type: 'scale', // 动画类型，如'scale'、'fadeIn'、'explode'等
      duration: 1000, // 动画时长，单位为ms
      delay: 0, // 动画延迟，单位为ms
      easing: 'cubicOut' // 动画缓动函数，如'linear'、'easeIn'、'cubicOut'等
  },
  // series的其他配置，如是否开启平滑曲线、是否开启渐变色等
  smooth: false, // 是否开启平滑曲线
    gradient: { // 是否开启渐变色
    type: 'linear', // 渐变类型，如'linear'、'radial'等
      colorStops: [{ offset: 0, color: '#ff4c4c' }, { offset: 1, color: '#fff' }], // 渐变颜色
      global: false // 是否全局开启渐变色
  }
}
```

### 11.formatter 用法
<font style="color:rgb(44, 44, 54);">在 ECharts 中，</font>`<font style="color:rgb(44, 44, 54);">formatter</font>`<font style="color:rgb(44, 44, 54);"> 是一个非常强大的选项，用于自定义图表中的文本显示格式，特别是在 </font>`<font style="color:rgb(44, 44, 54);">tooltip</font>`<font style="color:rgb(44, 44, 54);">（提示框）、</font>`<font style="color:rgb(44, 44, 54);">label</font>`<font style="color:rgb(44, 44, 54);">（标签）和 </font>`<font style="color:rgb(44, 44, 54);">axisLabel</font>`<font style="color:rgb(44, 44, 54);">（坐标轴标签）等地方。</font>`<font style="color:rgb(44, 44, 54);">formatter</font>`<font style="color:rgb(44, 44, 54);"> 可以是一个字符串模板或一个回调函数，允许你灵活地控制显示的文本内容。</font>

+ {a} (name): 代表数据项的名称。对于不同类型的图表，{a} 的含义可能有所不同：

对于饼图、散点图、柱状图等，{a} 通常表示数据项的名称（如类别名、标签名等）。

对于地图，{a} 表示区域的名称（如国家、省份、城市等）。

对于时间序列图表，{a} 可能表示时间点的名称或标签。

+ `**<font style="color:rgb(44, 44, 54);">{b}</font>**`**<font style="color:rgb(44, 44, 54);"> (seriesName)</font>**<font style="color:rgb(44, 44, 54);">: 代表系列名称（即图例项的名称）。如果你有多个系列，</font>`<font style="color:rgb(44, 44, 54);">{b}</font>`<font style="color:rgb(44, 44, 54);"> 会显示当前数据点所属的系列名称。</font>
+ `**<font style="color:rgb(44, 44, 54);">{c}</font>**`<font style="color:rgb(44, 44, 54);">: 代表数据值。对于数值型数据，</font>`<font style="color:rgb(44, 44, 54);">{c}</font>`<font style="color:rgb(44, 44, 54);"> 会显示具体的数值；对于非数值型数据，</font>`<font style="color:rgb(44, 44, 54);">{c}</font>`<font style="color:rgb(44, 44, 54);"> 会显示数据项的原始值。</font>
+ `**<font style="color:rgb(44, 44, 54);">{d}</font>**`<font style="color:rgb(44, 44, 54);">: 代表百分比（仅适用于某些图表类型，如饼图）。它会显示当前数据项占总和的百分比。</font>
+ `**<font style="color:rgb(44, 44, 54);">{@xxx}</font>**`<font style="color:rgb(44, 44, 54);">:用于访问数据项中的特定字段。xxx 是数据项对象中的字段名。例如，如果你的数据项包含一个名为 value 的字段，你可以使用 {@value} 来引用它。</font>

<font style="color:rgb(44, 44, 54);"></font>

<font style="color:rgb(44, 44, 54);">案例一：在这个例子中，</font>`<font style="color:rgb(44, 44, 54);">{b}</font>`<font style="color:rgb(44, 44, 54);"> 会显示系列名称（如 "Series A"），</font>`<font style="color:rgb(44, 44, 54);">{a}</font>`<font style="color:rgb(44, 44, 54);"> 会显示数据项的名称（如 "Category 1"），而 </font>`<font style="color:rgb(44, 44, 54);">{c}</font>`<font style="color:rgb(44, 44, 54);"> 会显示数据值（如 "335"）。</font>

```javascript
option = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {a} - {c}'
    },
    series: [
        {
            name: 'Series A',
            type: 'pie',
            data: [
                { value: 335, name: 'Category 1' },
                { value: 310, name: 'Category 2' },
                { value: 234, name: 'Category 3' }
            ]
        }
    ]
};
```

案例二：<font style="color:rgb(44, 44, 54);">数据项中包含额外的字段，比如 </font>`<font style="color:rgb(44, 44, 54);">population</font>`<font style="color:rgb(44, 44, 54);">，你可以使用 </font>`<font style="color:rgb(44, 44, 54);">{@population}</font>`<font style="color:rgb(44, 44, 54);"> 来引用它</font>

```javascript
option = {
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {a} - Population: {@population}'
    },
    series: [
        {
            name: 'Series A',
            type: 'pie',
            data: [
                { value: 335, name: 'Category 1', population: 1000000 },
                { value: 310, name: 'Category 2', population: 2000000 },
                { value: 234, name: 'Category 3', population: 1500000 }
            ]
        }
    ]
};
```

## 可视化大屏如何实现炫酷的动态边框？


使用 datav-vue3 插件（[https://datav-vue3.jiaminghi.com/guide/#%E5%AE%89%E8%A3%85](https://datav-vue3.jiaminghi.com/guide/#%E5%AE%89%E8%A3%85)）



1.  安装 

```javascript
npm install @dataview/datav-vue3
```

 

2.  main.js引入 

```javascript
import * as DataV from '@dataview/datav-vue3';
app.use(DataV, { classNamePrefix: 'dv-' })
```

 

3.  node_modeles/@dataview/datav-vue3/package.json 的module属性的文件类型改为 mjs，不然报错 

```javascript
"module": "./es/index.mjs",
```

 

4.  组件内使用 

```javascript
import { BorderBox8 } from '@dataview/datav-vue3';
```

## echart 图标首次加载不显示，第二次或者窗口变化后显示？
查看echart组件是否设置高度（具体宽度px，异常单位：百分比100%），部分图标必须要有高度才能正常加载。



## echart图标类型
### 1.折线图
有两种类型：一种是平铺，一种是堆积(加和)，面积填充的交区域图

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651394050-389b4f8d-431d-4b0d-ab5d-da70c3456ada.png)

### 2.柱形图
类目在纵轴，数据在横轴的叫条形图，也有平铺和堆积两种状态

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651407393-04537c5f-1da8-4e24-a469-f04d83ac13ef.png)

### 3.散点图
有两个维度的数据，横坐标和纵坐标，当我们给他第三个维度数据，给他映射大小的时候，我们一般叫他气泡

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651441347-c8550c71-a504-42e7-8bbf-319848bf2202.png)

### 4.k线
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651459375-9bd2a4c1-0438-40ee-92c8-fee2cc1333f1.png)

### 5.饼图
空心的，我们一般叫他圆环图，玫瑰图是饼图的一种变形

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651465479-d5bbae90-235a-4f2c-81df-4402dea54ccf.png)

### 6.雷达图
多维度的数据

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651470604-3910c2e6-df71-438f-8339-a780ca07fdd1.png)

### 7.和弦图
关系网络，每条弧代表一条实体，弧与弧之间会有弦链接在一起代表他们之间的关系

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651477432-94217ce1-7a0b-4a37-b32b-39300a626482.png)

### 8.力导向布局图
每一个节点是一个实体，节点与节点之间的连线代表他们之间的关系。和弦图和力导向图都是关系型的图

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651485656-f88ba117-96ac-4dc5-8bc3-f0a8fa3b9ddd.png)

### 9.地图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651492422-ba07d556-38a6-4212-9262-5f3e64bf8223.png)

### 10.仪表盘
对关键指标形象的展现。一个仪表盘一个针，多根针其实是几个仪表盘堆叠而已

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651503437-e77709d6-3c5e-444a-969a-8bb71e727a34.png)

### 11.漏斗图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651508610-cd351fab-b0ad-40fa-bbcb-4d0e8215cb08.png)

### 12.事件河流图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651515531-71d38210-2b84-4240-a8ff-b9449a77edd3.png)

### 13.矩形树图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651525276-69d98daa-b612-4f54-be5c-ffc92f93b3e2.png)

### 14.韦恩图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651531141-b3033ef8-2942-4ab2-bf51-72df77b03389.png)

### 15.树图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651538447-c0997e6f-c8e2-4167-ad73-284ff2144cb2.png)

### 16.字浮云
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1715651544400-5e2251a9-1b7b-44db-ae12-cf4e78515314.png)

