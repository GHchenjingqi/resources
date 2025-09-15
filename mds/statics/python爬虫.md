## 一、python基础
python是弱类型语言

### 1.基本用法
```python
# 导入整个模块
import somemodule
# 从某个模块中导入某个函数
from somemodule import somefunction
# 从某个模块中导入多个函数 
from somemodule import firstfunc, secondfunc, thirdfunc

# 注释：打印输出
print ("Hello, Python!") 

# 条件语句与缩进
if True:
    print ("True")
else:
    print ("False")

# 等待用户输入
input("\n\n按下 enter 键后退出。")

# 每行结束不需要加‘;’符合；单行语句需要加
import sys; x = 'runoob'; sys.stdout.write(x + '\n')


# 删除对象单个引用
del a
# 删除对象多个引用
del a,b,c
```

### 2.数据类型
不可变数据类型：<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">Number（数字）、String（字符串）、Tuple（元组）；可变数据类型：List（列表）、Dictionary（字典）、Set（集合）。</font>

+ <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">Number（数字）：整数(</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">int</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">)、布尔型(</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">bool</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);"> )、浮点数(</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">float</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">)和复数(</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">complex</font>**<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">)</font>

```python
>>> 5 + 4  # 加法
9
>>> 4.3 - 2 # 减法
2.3
>>> 3 * 7  # 乘法
21
>>> 2 / 4  # 除法，得到一个浮点数
0.5
>>> 2 // 4 # 除法，得到一个整数，向下取整
0
>>> 17 % 3 # 取余 
2
>>> 2 ** 5 # 乘方
32

# 平方根
>>> 16 ** 0.5 # 
4
# cmath平方根
import cmath
>>> cmath.sqrt(16)

```

+ <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">String（字符串）：以单行字符串（""、''）、多行字符串（ ''' '''）</font>

```python
str = 'abcdefg'
# 截取到最后 bcdefg
str[1:]

# 截取指定位置 bc
str[1:3]

# 两头截取 bc
str[1:-4]

# 倒序截取 abc
str[:-4]

# 字符串输出2次
str * 2

# 字符串相加
str + '123’
```

+ <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">bool（布尔类型）：值为 True 和 False</font>

```python
print(bool(0))         # False
print(bool(42))        # True
print(bool(''))        # False
print(bool('Python'))  # True
print(bool([]))        # False
print(bool([1, 2, 3])) # True

# 布尔逻辑运算
print(True and False)  # False
print(True or False)   # True
print(not True)        # False
```

+ <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">List（列表）：类似js数组，有序的对象集合。常用方法如下：</font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1741241374220-b55a2c1d-7799-4877-85ee-294f6360df99.png)		  ![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1741241388741-682a582e-368c-4b38-9a5b-8adc956998a9.png)

```python
list = [ 'abcd', 786 , 2.23, 'runoob', 70.2 ]  # 定义一个列表
tinylist = [123, 'runoob']

print (list)            # 打印整个列表
print (list[0])         # 打印列表的第一个元素
print (list[1:3])       # 打印列表第二到第四个元素（不包含第四个元素）
print (list[2:])        # 打印列表从第三个元素开始到末尾
print (tinylist * 2)    # 打印tinylist列表两次
print (list + tinylist)  # 打印两个列表拼接在一起的结果
```

+ <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">Tuple（元组）：写在小括号里</font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1741241511534-acb673cc-b908-44d0-8f40-2812933e67db.png)

```python
tuple = ( 'abcd', 786 , 2.23, 'runoob', 70.2  )
tinytuple = (123, 'runoob')

print (tuple)             # 输出完整元组
print (tuple[0])          # 输出元组的第一个元素
print (tuple[1:3])        # 输出从第二个元素开始到第三个元素
print (tuple[2:])         # 输出从第三个元素开始的所有元素
print (tinytuple * 2)     # 输出两次元组
print (tuple + tinytuple) # 连接元组
```

+ <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">Set（集合）：是一种无序、可变的数据类型，用于存储唯一的元素</font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1741241652239-0402e606-1ec8-4cc2-9575-9c8831c12153.png)

```python
sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}
# 成员判断
if 'Runoob' in sites :
    print('Runoob 在集合中')
else :
    print('Runoob 不在集合中')

# 集合运算
a = set('abracadabra')
b = set('alacazam')
print(a - b)     # a 和 b 的差集 {'r', 'b', 'd'}
print(a | b)     # a 和 b 的并集 {'b', 'c', 'a', 'z', 'm', 'r', 'l', 'd'}
print(a & b)     # a 和 b 的交集 {'c', 'a'}
print(a ^ b)     # a 和 b 中不同时存在的元素  {'z', 'b', 'm', 'r', 'l', 'd'} 

{ True : '123', 1:'abc'  }
# Key值是布尔会被转数字类型，key值唯一处理后： { 1:'abc'  }
```

+ <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">Dictionary（字典）：字典是无序的对象集合，类似js的对象，通过key取值</font>

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1741241605170-6579cb9f-3cda-466c-8c78-a565a06aaa5d.png)

```python
dict = {}
dict['one'] = "1 - 菜鸟教程"
dict[2]     = "2 - 菜鸟工具"

# 输出所有键
print (dict.keys())
# 输出所有值
print (dict.values()) 
```

#### <font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">用</font><font style="color:#DF2A3F;background-color:rgb(250, 252, 253);">type</font><font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">或</font><font style="color:#DF2A3F;background-color:rgb(249, 249, 249);">isinstance</font><font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">判断数据类型。</font>
```python
# isinstance
isinstance(1.0, int)
# > False

# type
type(6)
# <class 'int'>

```

### 3.类型转换
显示转换：

```python
y = int(2.8) # y 输出结果为 2
z = int("3") # z 输出结果为 3
y = float(2.8)   # y 输出结果为 2.8
z = float("3")   # z 输出结果为 3.0
z = str(3.0)  # z 输出结果为 '3.0'
```

隐式转换：

```python
n = 125 + 1.3

```

+ 字符串+数字会报错！！！

### 4.控制语句
if条件控制：

```python
if condition_1:
    statement_block_1
elif condition_2:
    statement_block_2
else:
    statement_block_3
```

match...case条件控制，类似js的switch case

```python
match subject:
    case <pattern_1>:
        <action_1>
    case <pattern_2>:
        <action_2>
    case <pattern_3>:
        <action_3>
    case _:  # 默认出口
        <action_wildcard>
```

while循环

```python
# while
while <expr>：
    <statement(s)>

# while  else
while <expr>:
    <statement(s)>
else:
    <additional_statement(s)>
```

for in循环

```python
# for in
for <variable> in <sequence>:
    <statements>

# for else
for <variable> in <sequence>:
    <statements>
else:
    <statements>
```

range函数，<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">遍历数字序列</font>

```python
for i in range(5):
     print(i)  # 1 2 3 4 5

for i in range(5,9) :
    print(i) # 5 6 7 8 
```

### 5.函数
```python
def 函数名（参数列表）:
    函数体

# 有返回值
def area(width, height):
    return width * height

# 无返回值
def hello() :
    print("Hello World!")

# lambda 表达式，类似JS的箭头函数  
# lambda 参数: 表达式
x = lambda a, b : a * b
print(x(5, 6))  # 30

# 装饰器：二次处理函数——将函数结果扔到装饰器里再处理一次
@time_logger
def target_function():
    pass
# 等同于
target_function = time_logger(target_function)
```

### 6.推导式
<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">推导式是一种独特的数据处理方式，可以从一个数据序列构建另一个新的数据序列的结构体。</font>

列表推导式:

```python
[表达式 for 变量 in 列表] 
[表达式 for 变量 in 列表 if 条件]

[i for i in range(30) if i % 3 == 0]
>>> [0, 3, 6, 9, 12, 15, 18, 21, 24, 27]

vec = [2, 4, 6]
[3*x for x in vec]
>>> [6,12,18]

[[x, x**2] for x in vec]
>>> [[2, 4], [4, 16], [6, 36]]
```

字典推导式：

```python
{ key_expr: value_expr for 变量 in collection  }
{ key_expr: value_expr for 变量 in collection  if 条件 }

listdemo = ['Google','Runoob', 'Taobao']
{key:len(key) for key in listdemo}
>>> {'Google': 6, 'Runoob': 6, 'Taobao': 6}

{x: x**2 for x in (2, 4, 6)}
>>> {2: 4, 4: 16, 6: 36}
```

集合推导式：

```python
{ 表达式 for 变量 in 序列 }
{ 表达式 for 变量 in 序列 if 条件 }

{i**2 for i in (1,2,3)}
>>> {1, 4, 9}

{x for x in 'abracadabra' if x not in 'abc'}
>>> {'d','r'}
```

元组推导式，注意元组返回的事迭代器，需要<font style="color:rgb(0, 128, 128);background-color:rgb(249, 249, 249);">tuple转成元组</font>

```python
(表达式 for 变量 in 序列 )
或
(表达式 for 变量 in 序列 if 条件 )

a = (x for x in range(1,10))
tuple(a) 
>>> (1, 2, 3, 4, 5, 6, 7, 8, 9)
```

### 7.面向对象
```python
class MyClass:
    # 类属性 - 外部可访问
    w = 0
    # ___私有属性 - 外部不可访问
    __witdh = 0

    # 构造函数 - 类实例化时调用
    # self - 类实例本身
    def __init__(self, width, height):
        self.w = width
        self.h = height

    # 类方法 - 类实例可调用
    def run(self):
        return self.w * self.h

# 类继承
class MyClass2(MyClass):
    def __init__(self, width, height):
        # super
        super().__init__(width, height)


x = MyClass(10,15)
print(x.run())
print(x.w)

y = MyClass2(100,10)
print(y.run())
print(y.w)
```

### 8.文件
<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">open() 方法打开一个文件，返回文件对象</font>

_**<font style="color:rgb(51, 51, 51);background-color:#FBDE28;">open(file, mode='r')</font>**_

```python
file = open('123.txt','r')
file.read()
```

mode常用类型（更多推荐[https://www.runoob.com/python3/python3-file-methods.html](https://www.runoob.com/python3/python3-file-methods.html)）有：

+ r  <font style="color:rgb(51, 51, 51);">只读方式</font>
+ <font style="color:rgb(51, 51, 51);">w </font><font style="color:rgb(51, 51, 51);">只用于写入</font>
+ <font style="color:rgb(51, 51, 51);">w+ 用于读写</font>
+ <font style="color:rgb(51, 51, 51);">wb 只用于写入二进制</font>
+ <font style="color:rgb(51, 51, 51);">wb+ 用于写入二进制</font>

file文件操作方法：

```python
file.close() # 关闭文件
file.flush() # 刷新文件内部缓冲，直接把内部缓冲区的数据立刻写入文件
file.read() # 读取文件
file.readline([size])  # 读取指定行
file.write(str)  # 写入字符串
file.writelines(sequence) #向文件写入一个序列字符串列表
```

### 9.常用函数
```python
# replace 全部替换
"runoob".replace("o", "x")  # runxxb

# random 随机返回0-1之间的数
random.random()

# 列表序列号（变字符串）
import json
# json编码
str = json.dumps(data)
# json解码
data = json.load(f)

# 时间获取
import time
# 时间戳
ticks = time.time()
# strftime格式化  格式化成2016-03-20 11:45:39形式
time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

# map(fn,[])
def add2(i):
    return i+2
# list() 类型转为list
list(map(add2,[1,2,3]))
>>> 等同于
[add2(i) for i in [1,2,3]]
```

### 10.pip用法
<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">pip 是 Python 包管理工具，类似npm/yarn。对依赖包进行安装，删除等操作。</font>

```python
# 查看版本
pip --version

# 安装
pip install 包

# 卸载
pip uninstall 包

# 查看已安装的包
pip list
```

### 11.<font style="color:rgb(0, 0, 0);background-color:rgb(250, 252, 253);">pyecharts图表</font>
<font style="color:rgb(51, 51, 51);background-color:rgb(250, 252, 253);">pyecharts 是一个基于 ECharts 的 Python 数据可视化库。</font>

```python
pip install pyecharts
```

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1741313751958-6737736b-fbca-4731-bb5d-bb409c7a485d.png)

案例：

```python
from pyecharts.charts import Bar

# 准备数据
x_data = ['一月', '二月', '三月', '四月', '五月']
y_data = [10, 20, 15, 25, 30]

# 创建柱状图
bar_chart = Bar()
bar_chart.add_xaxis(x_data)
bar_chart.add_yaxis("销售额", y_data)

# 也可以传入路径参数，如 bar_chart.render("bar_chart.html")
bar_chart.render()
```

同级目录会生成一个“render.html”文件，打开就是绘制的图表。



## 二、爬虫部分
### 安装必须插件
pip是pythone的安装依赖命令符

```python
pip install requests beautifulsoup4
```

+ requests 用于模拟浏览器页面请求

### 爬虫步骤
+ 1.发送请求 - requests
+ 2.解析数据 - BeautifulSoup/json
+ 3.提取数据
+ 4.保存数据 - with open("文件", "w", 编码) as file

### 获取豆瓣Top50电影排行 - html获取数据
+ csv 操作csv文件
+ BeautifulSoup 用于解析Html/xml字符串

```python
import requests
from bs4 import BeautifulSoup
import csv

# 1. 发送HTTP请求获取网页内容（类似JS的fetch）
url = "https://movie.douban.com/top250"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}

response = requests.get(url, headers=headers)

# 2. 解析HTML内容（类似JS的DOM操作）
soup = BeautifulSoup(response.text, "html.parser")

# 3. 提取电影数据（通过CSS选择器定位元素）
movies = []
for item in soup.select(".item"):
    title = item.select_one(".title").text
    rating = item.select_one(".rating_num").text
    link = item.select_one("a")["href"]
    movies.append({
        "title": title,
        "rating": rating,
        "link": link
    })

# 4. 保存到CSV文件（类似JS写入文件）
with open("movies.csv", "w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=["title", "rating", "link"])
    writer.writeheader()
    writer.writerows(movies)

print("数据已保存到 movies.csv 文件！")
```

### 百度新闻 - API接口获取数据
+ json 解析json数据

```python
import requests
import json

# 1. 发送HTTP请求获取网页内容（类似JS的fetch）
url = "https://news.baidu.com/widget?id=LocalNews&loc=8206&ajax=json&t=1740990658439"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Cookie":"BIDUPSID=511EE2E51AFB200FB810A6B547E8D8DF; PSTM=1715224886; BAIDUID=2440377A056D28148F049494487811E3:SL=0:NR=10:FG=1; BDUSS=luLVRNc25Rfk5NSE5OSWVKeEhrbVhLN3JBUk1wMlE4WDhILVpFUzNSaTlPRTFuRVFBQUFBJCQAAAAAAAAAAAEAAACkO1whsKXRvc3f0sEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL2rJWe9qyVnaD; BDUSS_BFESS=luLVRNc25Rfk5NSE5OSWVKeEhrbVhLN3JBUk1wMlE4WDhILVpFUzNSaTlPRTFuRVFBQUFBJCQAAAAAAAAAAAEAAACkO1whsKXRvc3f0sEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL2rJWe9qyVnaD; MAWEBCUID=web_aFTZWWfbhqUakOCdOKqSRaHuUsEsOURPybvKiRMbmBcnJICjRD; MCITY=-268%3A; H_WISE_SIDS_BFESS=110085_287281_1992049_626068_628198_632155_633618_633569_634603_635511_636123_639037_639614_637511_639929_640078_640333_627286_640393_637862_640378_640829_640962_640974_640989_641048_641081_641054_641120_641173_641219_640865_641400_641424_641459_641468_641516_640916_641496_639679_641665_641591_641590_641593_641585_641588_641756_641797_641841_641262_641907_642007_642057_642072_641938_640773_642157_642202_641703_642322_642344_641154_642407_641423_642623_642658_642451_642537_642505_642755_642912_641325_642954_642987_642992_642979_642974_643040_643022_639696_642931_643057_643213_643294_643279_643181_643276; H_PS_PSSID=61027_62167_62206_62261_62282_62134_62136_62325_62345_62330_62368_62372; H_WISE_SIDS=61027_62167_62206_62261_62282_62134_62136_62325_62345_62330_62368_62372; ab_sr=1.0.1_YzVkYWI0YjdmMWU2YjIyMThlZTRjZDI5MWVhZGYxMDgwYzAzYWFmNWE0ZWJiNDgyNTA0YTg5NTYzMTUzMzljYmFlYzg5NjdiOGYxMDc5M2NjNmEzMWNlZjc2ZTk4ZmUzM2U3NTljZmIxYjMyZjcxNGM5ZDE2MGM1YWM3Y2VmZjcxMzg3YTlmYjA3ZTNmNThlNDk4ZjUzNzIxOGY5YWEzOQ==; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID_BFESS=2440377A056D28148F049494487811E3:SL=0:NR=10:FG=1; delPer=0; PSINO=2; Hm_lvt_e9e114d958ea263de46e080563e254c4=1740990596; Hm_lpvt_e9e114d958ea263de46e080563e254c4=1740990596; HMACCOUNT=F32079A778FF9CB6; LOCALGX=%u5317%u4EAC%7C%30%7C%u90D1%u5DDE%7C%34%33%37%32"
}

response = requests.get(url, headers=headers)

data = json.loads(response.text)

# 2. 解析JSON内容
firsts = (data["data"]["LocalNews"]["data"]["rows"]["first"])

# 3. 提取数据
news = []
for item in firsts:
    title = item["title"]
    url = item["url"]
    img = item["imgUrl"]
    news.append({
        "title":title, 
        "url":url, 
        "img":img
    })

# 4. 保存数据
newsstr = json.dumps(news, ensure_ascii=False)
with open("news.json", "w", encoding="utf-8") as file:
    file.write(newsstr)
print('json保存成功')   

with open("news.txt", "w", encoding="utf-8") as file:
    file.write(newsstr)    
print('文本保存成功')   
```

图片资源下载

+ Image.open 只能打开本地图片，因此需要BytesIO将图片缓存到本地
+ random 用于生成随机数
+ os 用于创建匹配图片目录

```python
import requests
import json
from PIL import Image
import os
from io import BytesIO
import random

# 1. 发送HTTP请求获取网页内容（类似JS的fetch）
url = "https://news.baidu.com/widget?id=LocalNews&loc=8206&ajax=json&t=1740990658439"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    "Cookie":"BIDUPSID=511EE2E51AFB200FB810A6B547E8D8DF; PSTM=1715224886; BAIDUID=2440377A056D28148F049494487811E3:SL=0:NR=10:FG=1; BDUSS=luLVRNc25Rfk5NSE5OSWVKeEhrbVhLN3JBUk1wMlE4WDhILVpFUzNSaTlPRTFuRVFBQUFBJCQAAAAAAAAAAAEAAACkO1whsKXRvc3f0sEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL2rJWe9qyVnaD; BDUSS_BFESS=luLVRNc25Rfk5NSE5OSWVKeEhrbVhLN3JBUk1wMlE4WDhILVpFUzNSaTlPRTFuRVFBQUFBJCQAAAAAAAAAAAEAAACkO1whsKXRvc3f0sEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAL2rJWe9qyVnaD; MAWEBCUID=web_aFTZWWfbhqUakOCdOKqSRaHuUsEsOURPybvKiRMbmBcnJICjRD; MCITY=-268%3A; H_WISE_SIDS_BFESS=110085_287281_1992049_626068_628198_632155_633618_633569_634603_635511_636123_639037_639614_637511_639929_640078_640333_627286_640393_637862_640378_640829_640962_640974_640989_641048_641081_641054_641120_641173_641219_640865_641400_641424_641459_641468_641516_640916_641496_639679_641665_641591_641590_641593_641585_641588_641756_641797_641841_641262_641907_642007_642057_642072_641938_640773_642157_642202_641703_642322_642344_641154_642407_641423_642623_642658_642451_642537_642505_642755_642912_641325_642954_642987_642992_642979_642974_643040_643022_639696_642931_643057_643213_643294_643279_643181_643276; H_WISE_SIDS=61027_62167_62206_62261_62282_62134_62136_62325_62345_62330_62368_62372; H_PS_PSSID=61027_62167_62206_62261_62282_62134_62136_62325_62345_62330_62368_62372; H_WISE_SIDS=61027_62167_62206_62261_62282_62134_62136_62325_62345_62330_62368_62372; ab_sr=1.0.1_YzVkYWI0YjdmMWU2YjIyMThlZTRjZDI5MWVhZGYxMDgwYzAzYWFmNWE0ZWJiNDgyNTA0YTg5NTYzMTUzMzljYmFlYzg5NjdiOGYxMDc5M2NjNmEzMWNlZjc2ZTk4ZmUzM2U3NTljZmIxYjMyZjcxNGM5ZDE2MGM1YWM3Y2VmZjcxMzg3YTlmYjA3ZTNmNThlNDk4ZjUzNzIxOGY5YWEzOQ==; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID_BFESS=2440377A056D28148F049494487811E3:SL=0:NR=10:FG=1; delPer=0; PSINO=2; Hm_lvt_e9e114d958ea263de46e080563e254c4=1740990596; Hm_lpvt_e9e114d958ea263de46e080563e254c4=1740990596; HMACCOUNT=F32079A778FF9CB6; LOCALGX=%u5317%u4EAC%7C%30%7C%u90D1%u5DDE%7C%34%33%37%32"
}

response = requests.get(url, headers=headers)
data = json.loads(response.text)

#  生成随机字符串
def generate_custom_random_string(length=10):
    # 自定义字符池（包含字母、数字和特殊字符）
    characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    return ''.join(random.choices(characters, k=length))


# 加载图片并下载
save_dir = "C:/Users/admin/Desktop/pics/"
os.makedirs(save_dir, exist_ok=True)
def download_img(url,fileName):
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    filename = fileName + ".jpg"
    img.save(os.path.join(save_dir, filename))
    

# 2. 解析JSON内容
firsts = (data["data"]["LocalNews"]["data"]["rows"]["first"])
idx = 1
news = []
for item in firsts:
    title = item["title"]
    url = item["url"]
    img = item["imgUrl"]
    imgname = generate_custom_random_string(5)
    download_img(img,imgname)
    news.append({
        "index": idx,
        "title": title,
        "img": imgname+'.jpg',
    })


# 4.数据存储
newstr = json.dumps(news, ensure_ascii=False, indent=2)
with open("news.txt", "w", encoding="utf-8") as f:
    f.write(newstr)

print("结束")

```

### selenium  自动化测试工具
<font style="color:rgb(247, 49, 49);">Selenium</font><font style="color:rgb(22, 30, 46);">是一个Web的自动化测试工具,最初是为网站自动化测试而开发的,可以按指定的命令自动操作。</font>

```python
pip install selenium
```

#### 模拟操作
+ webdriver.Chrome 启动浏览器
+ driver.get 打开网页
+ driver.quit 关闭浏览器
+ find_element(By.CSS_SELECTOR, ".img") 使用css选择器获取单个元素
+ find_elements(By.CSS_SELECTOR, ".img") 使用css选择器获取所有元素
+ search_box.send_keys(Keys.ENTER)  模拟回车事件
+ search_box.send_keys("Selenium")  模拟输入字符串“Selenium”

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

# 配置执行完不关闭浏览器
options = Options()
options.add_experimental_option("detach", True)
 
# 启动 Chrome 浏览器
driver = webdriver.Chrome(options=options)

# 打开网页
driver.get("https://www.baidu.com")
search_box = driver.find_element(By.NAME, "wd") 
search_box.send_keys("Selenium")
# 模拟回车 
# search_box.send_keys(Keys.ENTER)
# 模拟点击搜索按钮
button = driver.find_element(By.CSS_SELECTOR, "input#su")
button.click()
# print("获取完毕！")

# 关闭浏览器
# driver.quit()

```

#### <font style="color:rgb(22, 30, 46);">使用selenium当爬虫，模拟打开浏览器获取页面数据：</font>
+ WebDriverWait 异步等待
+ EC.presence_of_all_elements_located 获取所有符合条件的元素，返回数组
+ EC.presence_of_element_located 获取一个元素，返回对象
+ get_attribute 获取标签上的属性

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import json

# 获取div背景图片-截取
def getDivBackgroundImg(style_value):
    if style_value == None: return ""
    str = style_value[25:]
    str = 'https://'+str[:-3]
    return str


# 1. 发送HTTP请求获取网页内容（类似JS的fetch）
# 启动 Chrome 浏览器
driver = webdriver.Chrome()

try:
    # 打开网页
    driver.get("https://www.imooc.com/course/list")
    # 异步 等待直到某个关键元素出现（如异步加载的内容）  presence_of_element_located -单个元素  presence_of_all_elements_located -多个元素
    soup = WebDriverWait(driver, 20).until(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, ".list a"))
    )
    # 获取数据
    course = []
    if len(soup)>0:
        for a in soup:
            title = a.get_attribute("data-title")
            url = a.get_attribute("href")
            div = a.find_element(By.CSS_SELECTOR, ".img")
            sty = div.get_attribute("style")
            img = getDivBackgroundImg(sty)
            if title and url:
                course.append({
                    "title": title,
                    "img": img,
                    "url": url
                })

        driver.quit()

        str = json.dumps(course, ensure_ascii=False)
        with open("course.txt", "w", encoding="utf-8") as file:
            file.write(str)

        print("获取完毕！")
    
except TimeoutException:
    print("超时：未找到目标元素")

```



