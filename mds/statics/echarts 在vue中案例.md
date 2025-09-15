官方在线地址：[https://echarts.apache.org/examples/zh/index.html#chart-type-line](https://echarts.apache.org/examples/zh/index.html#chart-type-line)

### 1.组件封装
```vue
<template>
    <div class="chartLayer" id="maine">
      <div ref="chartDom" style="width: 100%; height: 100%;"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';
  import * as echarts from 'echarts';
  
  // 定义props，用于接收父组件传递的数据
  const props = defineProps({
    option: {
      type: Object,
      default: () => ({})
    }
  });
  
  // 创建一个响应式引用来保存DOM元素
  const chartDom = ref(null);
  let chartInstance = null;
  
  // 初始化ECharts实例并设置配置项
  onMounted(async () => {
    if (props.option && Object.keys(props.option).length !== 0) {
      chartInstance = echarts.init(chartDom.value);
      await nextTick(); // 确保DOM已经渲染完成
      setChartOption(props.option);
    }
  });
  
  // 监听option的变化
  watch(() => props.option, (newOption) => {
    if (chartInstance && newOption) {
      setChartOption(newOption);
    }
  });
  
  // 设置ECharts选项
  const setChartOption = (option) => {
    if (chartInstance) {
      chartInstance.setOption(option);
    }
  };
  
  // 图表响应式
  nextTick(() => {
    if (chartInstance != null && chartInstance.resize) {
      const maine = document.getElementById("maine"); // 获取dom元素
      const objResizeObserver = new ResizeObserver((entries) => {
        chartInstance.resize();
      });
      objResizeObserver.observe(maine);
    }
  });
  
  // 销毁ECharts实例
  onUnmounted(() => {
    if (chartInstance != null && chartInstance.dispose) {
      window.removeEventListener('resize', chartInstance.resize);
      chartInstance.dispose();
    }
  });
  </script>
  
  <style scoped>
  .chartLayer {
    box-sizing: content-box;
    width: 100%;
    height: 100%;
  }
  </style>
```

组件使用：

```vue
<script setup>
import Echart from '../components/Echarts.vue'
</script>

<template>
    <Echart class="one" :option="option1" />
</template>
```

### 2.案例参数
#### 多类型柱状图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1721108945291-90d67a9f-40e8-464a-96a3-13fb4a5fb49d.png)

参数设置：

```javascript
// 数据格式
let data3 = [
  ['类别', '超长', '超高', '超宽'],
  ['7/10', 43, 85, 93],
  ['7/11', 83, 73, 55],
  ['7/12', 86, 65, 82],
  ['7/13', 86, 65, 82],
  ['7/14', 86, 65, 82],
  ['7/15', 86, 65, 82],
  ['7/16', 72, 53, 39]
]

// 多频柱状图
export const option1 = {
  legend: {
    textStyle: {
      color: '#ddd' // 这里设置图例的字体颜色为红色
    }
  },
  tooltip: {},
  dataset: {
    source: data3
  },
  xAxis: [
    {
      type: 'category',
      name: "日期",
    }
  ],
  yAxis: {
    name: "单位（辆）",
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#2A384D",
      }
    },
  },
  series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
};
```

#### 基础柱状图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1721109181276-e08f7412-8e2c-43ce-b865-13dbe3d94c76.png)

参数设置：

```javascript
// 获取今天的日期
let day = new Date().getDate();
let weeks = []
for (let i = 0; i < 7; i++) {
    weeks.push(day - i)
}
weeks = weeks.sort((a, b) => a - b)

// 基础柱状图
export const option1 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#fff'
            }
        }
    },
    xAxis: [
        {
            type: 'category',
            name: "日期",
            data: weeks,
            axisPointer: {
                type: 'shadow'
            },
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: "单位（辆）",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
                formatter: '{value}'
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "#2A384D",
                }
            },
        },
    ],
    series: [
        {
            name: '柱状图',
            type: 'bar',
            data: [20, 49, 70, 232, 200, 150, 80]
        },
    ]
};
```

#### 圆角变窄柱状图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1721110025693-5986749b-a6ce-4f2a-a7f3-8baa5877ba35.png)

参数设置：

```javascript
export const option3 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                type: "dashed",
                color: "#2A384D",
            }
        },
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        barWidth: '20%', // 这里变窄
        itemStyle: {
            borderRadius: [50, 50, 0, 0] // 这里设置圆角的大小
        }
    }]
}
```



#### 渐变双频柱状图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1730537864198-a55f176d-33a7-4fd2-b78e-108123feb6e3.png)

参数设置：

```javascript
{
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        data: ['物流下发', '实际计量'],
        left: '230',
        itemWidth: 15,
        itemGap: 30,
        textStyle: {
            color: '#ddd', // 这里设置图例的字体颜色为红色
            fontSize:12,
        },
    },
    xAxis: [
        {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
            axisPointer: {
                type: 'shadow'
            },
            axisLabel: {
                fontSize:12,
                color: '#7AADFF' // 设置 X 轴刻度文字的颜色
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '万吨',
            min: 0,
            max: 250,
            interval: 50,
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dashed",
                    color: "transparent",
                }
            },
            nameGap: 30, // 名称与轴线之间的距离
            nameTextStyle: {
                align: 'left', // 设置 Y 轴名称的文字对齐方式为左对齐
                color: '#fff', // 设置 Y 轴名称的文字颜色
                fontSize: 12, // 设置 Y 轴名称的文字大小
                padding: [0, 0, 0, -28] // 调整名称文字的位置，[top, right, bottom, left]
            },
            axisLabel: {
                fontSize: 12 ,
                color: '#ddd' // 设置 X 轴刻度文字的颜色
            }
        },
    ],
    series: [
        {
            name: '物流下发',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' 万吨';
                }
            },
            data: [
                2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
            ],
            barWidth: '20%',
            itemStyle: {
                color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    { offset: 0, color: '#1EE7E7' }, // 起始颜色
                    { offset: 1, color: '#11657D' }  // 结束颜色
                ],
                global: false // 缺省为 false
                }
            }
        },
        {
            name: '实际计量',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' 万吨';
                }
            },
            barWidth: '20%',
            data: [
                2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
            ],
            itemStyle: {
                color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    { offset: 0, color: '#1890FF' }, // 起始颜色
                    { offset: 1, color: '#0E4685' }  // 结束颜色
                ],
                global: false // 缺省为 false
                }
            }
        },
    ]
}
```

#### 空心饼状图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1721109242244-2d7a0051-286a-4fe9-9a7b-c72a55c56f40.png)

参数设置：

```javascript
export const option2 = {
    tooltip: {
        trigger: 'item',
    },
    legend: {
        textStyle: {
            color: '#ddd' // 这里设置图例的字体颜色为红色
        },
        top: '5%',
        left: 'center'
    },
    graphic: {
        type: "text",
        left: "center",
        top: "center",
        style: {
            text:
                circularGraph.sum.name +  //圆饼中心显示数据，这里是显示得总数
                "\n" +
                String(circularGraph.sum.number).replace(
                    /(\d)(?=(?:\d{6})+$)/g,
                    "$1."
                ),
            textAlign: "center",
            fill: "#fff",
            width: 30,
            height: 30,
            fontSize: 12
        }
    },
    series: [
        {
            name: '超限类型',
            type: 'pie',
            radius: ['25%', '56%'],
            emphasis: {
                label: {

                    fontSize: 16,
                }
            },
            label: {
                normal: {
                  show: true,
                  formatter: '{b}{d}%',
                  textStyle: {
                    color: '#fff',
                    fontSize: 12,
                  }
                },
                labelLine: {show: true}
            },
            data: circularGraph.data
        }
    ]
};


```

#### 空心间隙饼图
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1721111585690-6e16c6a8-fa3c-4f19-9e38-9e8215c90b06.png)

参数设置：

```javascript
// 间隙空心饼图
export const option4 = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
        textStyle: {
            color: '#ddd' // 这里设置图例的字体颜色为红色
        },
        top: '5%',
        left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
```



