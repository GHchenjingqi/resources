## 常用命令
```shell
flutter doctor 查看相关配置是否成功
flutter help/flutter 查看帮助
flutter create name  创建项目
flutter run  运行项目
```



## android studio 配置及调试
在虚拟机上运行flutter项目时，需要先创建虚拟机，把安卓机在电脑运行起来，然后打开项目，启动就会自动添加上运行的虚拟机和dart文件，点击调试，就可以在虚拟机里看到页面了。



## Dart常用的类
图标类 - Icons    Icons.add

颜色类 - Colors    Colors.red

时间类 - DateTime   DateTime.now()

## Widget组件 —— 一切皆组件
Flutter三棵树：Widget树、Element 树、Render 树、Layer 树

### 组件分类
#### 1、基础组件
文本，Text

按钮，TextButton等

图片图标，Image、Icon

输入框 和 表单，TextField、Form

进度指示器，LinearProgressIndicator、CircularProgressIndicator

单选框和复选框，Switch、Checkbox

#### 2、布局之容器组件
装饰，DecoratedBox、BoxDecoration等，如颜色、背景、边框、渐变、阴影等

复合容器，Container，它是结合align、padding、margin、box、变换等多种功能。

尺寸，主要是设置页面的宽高大小 或 宽高比例。

宽高SizedBox、AspectRatio、LimitedBox、FractionallySizedBox等；

限制类ConstrainedBox、BoxConstraints、UnconstrainedBox等

对齐，Align

居中，Center

填充，Padding

剪裁，ClipOval、ClipPath、ClipRect、ClipRRect等

变换(如旋转等)，Transform

适配(如换行，即超出父组件边界约束)，FittedBox

#### 3、布局组件
线性布局，Row、Column

弹性布局，Flex、Expanded

流式布局（子元素自动换行），Wrap、Flow

层叠布局，Stack、Positioned

#### 4、复合组件（滚动、列表等）
简单滚动列表（类似iOS的ScrollView），SingleChildScrollView

列表，ListView、AnimatedList

二维列表（类似iOS的CollectionView），GridView

自定义滚动列表，CustomScrollView、NestedScrollView

TabBar，TabBarView

#### 5、交互组件
手势，GestureDetector、GestureRecognizer等相关类

动画，Animation、Curve、AnimationController、Tween、Ticker等相关类

通知信息交互 <font style="color:rgb(199, 37, 78);background-color:rgb(249, 242, 244);">showDialog</font>：AlertDialog确认取消弹窗、<font style="color:rgb(79, 79, 79);">SimpleDialog选择项弹窗、ActionSheet底部弹窗等</font>

```dart
showDialog(
      context: context, // 上下文不用管
      barrierDismissible: false, //点击弹窗以外背景是否取消弹窗
      builder: (context) {
        return AlertDialog(
          title: const Text("温馨提示！"),
          content: const Text("您确定要删除吗？"),
          actions: [
            TextButton(
              onPressed: () {
                //关闭弹窗
                Navigator.of(context).pop();
              },
              child: const Text("取消"),
            ),
            TextButton(
              onPressed: () {
                //关闭弹窗
                Navigator.of(context).pop();
              },
              child: const Text("确定"),
            ),
          ],
        );
      })
```

<font style="color:rgb(77, 77, 77);">toast提示，</font><font style="color:rgb(79, 79, 79);">Fluttertoast插件</font>

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1716542272079-d05bb4b7-b260-4ba4-bcc1-4b244e691240.png)

```dart
import 'package:fluttertoast/fluttertoast.dart';

Fluttertoast.showToast(
    msg: "消息内容",
    toastLength: Toast.LENGTH_SHORT,
    gravity: ToastGravity.CENTER,
    backgroundColor: Colors.blue,
    textColor: Colors.white,
    fontSize: 30.00
);
```



### 创建组件的固定语法：
```dart
// WgName 是组件名称
class WgName extends StatefulWidget {
  const WgName({super.key});

  @override
  State<StatefulWidget> createState() => _WgNameUpdateState();
}

class _WgNameUpdateState extends State<Payment> {
   // 每个组件都有自己的 build构建入口
   @override
   Widget build(BuildContext context) {}
}
```

### 组件的生命周期
![](https://cdn.nlark.com/yuque/0/2024/webp/1460947/1716446192507-613a9660-00e4-4ca0-b46b-92fd68c2dd6a.webp)

![](https://cdn.nlark.com/yuque/0/2024/webp/1460947/1716446282634-ed89e03c-3d52-452f-bc74-243a9b5674c9.webp)



### <font style="color:rgb(25, 27, 31);">StatelessWidget 和 StatefulWidget的区别</font>
<font style="color:rgb(25, 27, 31);">StatelessWidget是状态不可变的widget。初始状态设置以后就不可再变化。如果需要变化需要重新创建。StatefulWidget可以保存自己的状态。那问题是既然widget都是immutable的，怎么保存状态？其实Flutter是通过引入了State来保存状态。当State的状态改变时，能重新构建本节点以及孩子的Widget树来进行UI变化。注意：如果需要主动改变State的状态，需要通过setState()方法进行触发，单纯改变数据是不会引发UI改变的。</font>

#### <font style="color:rgb(25, 27, 31);">StatelessWidget 无状态代码结构：</font>
```dart
import 'package:flutter/material.dart';
class 组件名 extends StatelessWidget {
  const 组件名({super.组件参数});
  // 重构build方法创建UI
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('First Screen'),
      ),
      body: Center(),
    );
  }
}
```

<font style="color:rgb(25, 27, 31);">无状态的组件生命周期只有2个：</font>

#### <font style="color:rgb(25, 27, 31);">StatefulWidget 有状态代码结构：</font>
```dart
import 'package:flutter/material.dart';

class 组件名 extends StatefulWidget {
  const 组件名({super.参数});
  // 通过 createState 创建状态实例 _FulStatePageState
  @override
  实例方法 createState() => 实例方法();
}

// 通过 State 继承 组件名下的状态
class 实例方法 extends State<组件名> {
  // 通过 重写 build 创建UI
  @override
  Widget build(BuildContext context) {
    return Container( );
  }
}


```



### 组件传递数据
#### 1.路由传递参数
在main.dart，或者路由文件里面设置，通过routes传递，不过参数不能动态改变。

```dart
Widget build(BuildContext context) {
    const Map datas = {"id":"123456"};
    return MaterialApp(
      title: 'Flutter',
      initialRoute: '/',
      routes: {
        '/detail': (context) => const DetailView(data: datas),
      },
)}
```

子组件-接收数据

```dart
class DetailView extends StatefulWidget {
  final Map data;
  const DetailView({super.key,required this.data});
}
class _DetailViewState extends State<DetailView> {
  initState() {
    super.initState();
    // 私用数据
    print(widget.data);
  }
}
```

#### 2.Navigator传递数据
我们在使用路由跳转的时候，设置动态数据。Navigator用来管理堆栈功能（push 是将路由添加到堆栈的顶部，pop是从同一堆栈中删除顶部路由）

##### Navigator.push使用
1.跳转前设置

```dart
ElevatedButton(
  onPressed:(){
    Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) => DetailView(data: {"id":"123456"}),
      ),
    );
},
```

2.子组件接收

```dart
class DetailView extends StatefulWidget {
  final Map data;
  const DetailView({super.key,required this.data});
}
class _DetailViewState extends State<DetailView> {
  initState() {
    super.initState();
    // 私用数据
    print(widget.data);
  }
}
```





## Scaffold脚手架
Scaffold是界面的主体,组件的展示都必须依附于它。

+ appBar - 顶部的标题栏
+ body - 显示整体布局
+ floatingActionButton - 右下角按钮
+ floatingActionButtonLocation - 按钮的位置
+ floatingActionButtonAnimator - 按钮动画
+ drawer - 左侧滑动组件
+ onDrawerChanged - 滑动事件监听
+ endDrawer - 右侧滑动组件
+ onEndDrawerChanged - 编辑完成
+ bottomNavigationBar - 底部菜单组件
+ backgroundColor - 背景色



### 1.单一子元素组件（single-child）
顾名思义，只能有一个子元素。

#### Container，常用的唯一子组件。
##### 对齐方式：alignment ，对齐方式将影响子元素位置。
有2种使用方式。第一种采用属性值的方法（topLeft/topCenter/topRight/center/centerLeft/centerRight/bottomLeft/bottomCenter/bottomRight）,第二种就是函数参数的形式，如：Alignment(-1,-1)，这种理解也简单，坐标x轴向右为正，y轴向下为正，中心是（0,0）。

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1716195872148-ca42db76-f7b9-4847-937a-7631e87f391b.png)

案例，实现唯一元素水平垂直居中：

```dart
alignment：Alignment.center
// 或
alignment：Alignment(0,0)
```

##### 盒子约束 constraints
通过定义宽高的最大最小值约束盒子。

```dart
constraints：BoxConstraint:{
  // 最大高度
  maxHeight:400,
  //最大宽度
  maxWidth:400,
  minHeight:400,
  minWidth:400,
}
```

一行代码将盒子扩展到最大约束大小。

```dart
constraints: BoxConstraints.expand()
```

##### 设置margin
EdgeInsetsDirectional属性：start - 左， end - 右，top - 上

```dart
margin: EdgeInsetsDirectional.only(start:20.0,top:10.0,end:20.0,bottom: 10.0),
```

也可以使用 EdgeInsets.only 和 EdgeInsets.all 设置单独一侧间距，不过这时左右依旧是left、right。

```dart
// 仅左侧设置间距 10
margin: EdgeInsets.only(left: 10.0),
// 仅右侧设置间距10
margin: EdgeInsets.only(right: 10.0),
// 仅左右设置10间距
margin: EdgeInsets.only(left: 10.0,right:10.0),
// 外间距全部设置10
margin: EdgeInsets.all(10.0),
```

还可以使用 EdgeInsets.symmetric 对称设置间距

```dart
// 垂直上下间距8
const EdgeInsets.symmetric(vertical: 8.0)
// 水平左右间距8
const EdgeInsets.symmetric(horizontal: 8.0)
```

##### 设置padding
设置padding内填充和margin一样。

##### 装饰器 Decoration 
用于扩展盒子样式，边框、圆角、阴影、背景渐变等。

```dart
decoration: BoxDecoration(
    // 颜色
    color:  Color(0xffaaaaaa),
    // 背景图
    image: new DecorationImage(image: new NetworkImage(imgUrl))
    // 边框
    border: Border.all(width:3,color: Color(0xffaaaaaa)),
    // 圆角
    borderRadius: BorderRadius.all(Radius.circular(10.0)),
    // 阴影
    boxShadow:[
        color: Color(0xffaaaaaa),
        offset:Offset(2.0,2.0),
        blurRadius:4.0
    ],
    // 渐变色，支持线性渐变和径向渐变
    gradient: LinearGradient(colors:[ Colors.red,Colors.green,Colors.yellow ]）
    // 裁剪方式, BoxShape.circle 圆形，这个和borderradius互斥，不能同时使用。
    shape:  BoxShape.rectangle,
)
```

##### 变形 transform
设置container的变换矩阵，类型为Matrix4。

```dart
// 旋转
transform: new Matrix4.rotationZ(0.3),
transform: new Matrix4.rotationY(0.3),
transform: new Matrix4.rotationX(0.3),
// 倾斜
transform: new Matrix4.skewX(0.3)
```

#### SingleChildScrollView 滚动布局
类似与 scrollView，不然超出部分不显示，会被隐藏。SingleChildScrollView可以设置滚动方向（水平或垂直）。

```dart
SingleChildScrollView(
   // horizontal 水平方向 |  vertical 垂直方向
   scrollDirection: Axis.vertical,
   padding: EdgeInsets.all(16.0),
   child: Center(
          child: Column(
            //动态创建一个List<Widget>
            children: str.split("")
            //每一个字母都用一个Text显示,字体为原来的两倍
                .map((c) => Text(c, textScaleFactor: 2.0,))
                .toList(),
          ),
    ),
)
```



#### Baseline 基线对齐
```dart
new Baseline (
    baseline: 100.0
    baselineType: TextBaseline.alphabetic,
    child: new Text('hi,hhhh')
)
```

Padding - 填充

Center - 居中对齐

Align

FittedBox

AspectRatio



### 2.底部导航栏 <font style="color:rgb(64, 64, 64);">BottomNavigationBar</font>
<font style="color:rgb(64, 64, 64);">Scaffold方法下提供 bottomNavigationBar属性用于定义应用程序的底部导航栏，主要由按钮加文字组成， 可以实现点击按钮切换不同的页面，显示在Scaffold的底部区域。</font>

#### <font style="color:rgb(64, 64, 64);">BottomNavigationBar属性</font>
![](https://cdn.nlark.com/yuque/0/2024/webp/1460947/1716445196420-5d8eb50f-3825-4bae-801b-3911795922ab.webp)

####  items 的<font style="color:rgb(64, 64, 64);">BottomNavigationBarItem 属性</font>
![](https://cdn.nlark.com/yuque/0/2024/webp/1460947/1716445259746-e5e1645d-a287-42f3-840f-cc3bb7fd29ab.webp)

案例

封装成组件：

```dart
import 'package:flutter/material.dart';
import 'package:flutter_play/index.dart';
import 'package:flutter_play/find.dart';
import 'package:flutter_play/shop.dart';
import 'package:flutter_play/home.dart';
 
//底部导航页-切换页面
final pages = [
  IndexPage(), //首页
  FindPage(), //发现页
  ShopPage(), //商城页
  HomePage()  //个人主页
];
//底部导航-图标和文字定义
List<BottomNavigationBarItem> items(){
  return [
    const BottomNavigationBarItem(
      icon: Icon(Icons.home),
      label: '首页',
    ),
    const BottomNavigationBarItem(
      icon: Icon(Icons.find_in_page),
      label: '发现',
    ),
    const BottomNavigationBarItem(
      icon: Icon(Icons.shop),
      label: '商城',
    ),
    const BottomNavigationBarItem(
      icon: Icon(Icons.local_activity),
      label: '我的',
    ),
  ];
}
```

**<font style="color:rgb(64, 64, 64);">main.dart 引入</font>**

```dart
import 'package:flutter/material.dart';
import 'package:flutter_play/bottomNavigationBar.dart';
 
/*启动页*/
void main() {
  runApp(const MyApp());
}
 
class MyApp extends StatelessWidget {
  const MyApp({super.key});
 
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: ThemeData(), //主题
      home: const MyHomePage(),
    );
  }
}
 
class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key});
 
  @override
  State<MyHomePage> createState() => _MyHomePageState();
}
 
class _MyHomePageState extends State<MyHomePage> {
 
  int _bottomNavigationIndex = 0;  //底部导航的索引
 
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: pages[_bottomNavigationIndex], //页面切换
        bottomNavigationBar: _bottomNavigationBar()  //底部导航
    );
  }
 
  //底部导航-样式
  BottomNavigationBar _bottomNavigationBar(){
    return BottomNavigationBar(
      items: items(), //底部导航-图标和文字的定义，封装到函数里
      currentIndex: _bottomNavigationIndex,
      onTap: (flag) {
        setState(() {
          _bottomNavigationIndex = flag;  //使用底部导航索引
        });
      }, //onTap 点击切换页面
      fixedColor: Colors.blue,  //样式：图标选中时的颜色：蓝色
      type: BottomNavigationBarType.fixed, //样式：选中图标后的样式是固定的
    );
  }
}
```

### 3.下拉刷新
<font style="color:rgb(25, 27, 31);">Flutter中下拉刷新需要用RefreshIndicator把ListView包装一层，然后实现onRefresh方法。</font>

```dart
var itemCount = 30;

RefreshIndicator(
  onRefresh: _onRefresh,
  child: ListView.separated(
    padding: const EdgeInsets.all(30),
    itemCount: itemCount + 1,
    itemBuilder: (BuildContext context, int index) {
      return Container(
        height: 50,
        child: ListTile(title: Text("$index")),
      );
    },
    //设置分割线，颜色为黑色，高度为1
    separatorBuilder: (BuildContext context, int index){
      return Divider(color: Colors.black, height: 1,);
    },
  ),
)

Future _onRefresh() {
  //可根据业务做刷新操作，必须返回一个Future，此处仅做2秒延迟
  return Future.delayed(Duration(seconds: 2), (){
    print("刷新完成");
    setState(() {
      itemCount = 30;
    });
  });
}
```

### 零碎知识
#### 变量定义
+ var 定义变量，可以重复复制，但类型必须一致，不存在变量提升；
+ dynamic 动态变量，类型可以不一直；

#### 常量定义
+ const 编译时常量，是隐式final;
+ final 只能声明一次常量。



#### 自定义颜色
```dart
const cor = Color(0xFF007EEF); // 蓝色，0xFF前缀是16进制，FF是透明度
```

#### 居中属性
水平居中，值从MainAxisAlignment中取

```dart
mainAxisAlignment:  MainAxisAlignment.center
```

垂直居中，值从CrossAxisAlignment中取

```dart
crossAxisAlignment: CrossAxisAlignment.center
```

#### 调整间距组件Gap 和 SizedBox
##### SizedBox内置小部件，允许显式的设置宽高。
```dart
SizedBox(height: 10)
```

也可以用来约束文本小部件

```dart
SizedBox(
    width: 100,
    height: 100,
    child: Text(
        "Widget 1",
        style: TextStyle(fontSize: 16),
        maxLines: 2,
        overflow: TextOverflow.ellipsis,
    ),
)
```



##### Gap，2.3新引入的小部件，Gap的类型有MaxGap和SilverGap，依赖于Gap包
MaxGap - 具备弹性，当空间不足最大时，会适应缩小间距提高盒子的空间。

```dart
Row(
  children: [	
    Text('Button 1'),
    MaxGap(20),
    Text('Button 2'),
  ],
)
```

SilverGap用于Sliver 内部创建固定的空间

```dart
CustomScrollView(
  slivers: [
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          return Text('Item $index');
        },
        childCount: 10,
      ),
    ),
    SliverGap(height: 32.0),
    SliverList(
      delegate: SliverChildBuilderDelegate(
        (context, index) {
          return Text('Item ${index + 10}');
        },
        childCount: 10,
      ),
    ),
  ],
)
```

#### 首页不显示icon
```dart
leading: null,
```



#### flutter 后置操作符 !
<font style="color:rgb(51, 51, 51);">后置操作符 </font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">!</font><font style="color:rgb(51, 51, 51);"> 是一个新增的功能，它表示变量一定不为null。这是Dart语言的非空断言操作符。如果你在代码中使用了该操作符，但变量是null，那么你会得到一个</font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">NullError</font><font style="color:rgb(51, 51, 51);">。</font>

```dart
String? str;
 
void main() {
  str = "Hello, World!";
  print(str?.length); // This will print the length of the string if str is not null.
  print(str!); // This will print the string itself if str is not null.
}
```

<font style="color:rgb(51, 51, 51);">在这个例子中，</font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">str?.length</font><font style="color:rgb(51, 51, 51);"> 会安全地返回 </font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">str</font><font style="color:rgb(51, 51, 51);"> 的长度，如果 </font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">str</font><font style="color:rgb(51, 51, 51);"> 是null，它会返回null，而 </font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">str!</font><font style="color:rgb(51, 51, 51);"> 会直接返回 </font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">str</font><font style="color:rgb(51, 51, 51);"> 的值，如果 </font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">str</font><font style="color:rgb(51, 51, 51);"> 是null，它会抛出 </font><font style="color:rgb(51, 51, 51);background-color:rgb(237, 238, 240);">NullError</font><font style="color:rgb(51, 51, 51);">。</font>

<font style="color:rgb(51, 51, 51);"></font>

#### <font style="color:rgb(51, 51, 51);">枚举 enum</font>
```dart
// 定义
enum RoomType {
  /// 游戏
  game('1', 1),
  /// 歌厅
  song('3', 3),
  /// 直播
  live('5', 5);
  //  映射 value 和 number 可以返回
  final String value;
  final int number;
  const RoomType(this.value, this.number);
}

// 使用映射取枚举对应值
String roomType = RoomType.song.value;  /// 值为 '3'
int roomType = RoomType.song.number;  /// 值为 3
```

#### navigator 路由堆栈
先学一下 navigator

+ maybePop 试着删除顶层路由，不能删就放弃，避免唯一页面被删除，程序挂掉。

```dart
Navigator.maybePop(context);
```

+ canPop 栈内只有一个元素是，返回false，其他是true

```dart
Navigator.canPop(context) ? Navigator.pop(context): null;
```

+ push 将内容添加到栈顶层（展示该内容页面）

```dart
Navigator.push(context,  new MaterialPageRoute(
    builder: (context)  {
      return Scaffold(
        appBar: AppBar(
          title: Text('我是新的界面'),
        )
      );
    }
));
```

+ pushNamed 将路由页面添加到栈顶层，展示指定某个路由

```dart
Navigator.pushNamed(context, '/detail');
```

+ pushAndRemoveUntil 和 pushNamedAndRemoveUntil 用于删除堆栈所有路由，并返回到首页，应用场景：已登录用户想注销回到首页。

```dart
Navigator.pushAndRemoveUntil(
    context,
    MaterialPageRoute(builder: (BuildContext context) => MyHomePage()),
    ModalRoute.withName('/'),
);
```



## 基础组件
### 图片引入
#### 1.远程图片
```dart
Image(image: NetworkImage( "https://picsum.photos/200/200"),width: 100.0,)
```

也可以

```dart
Image.network(
  "https://avatars2.githubusercontent.com/u/20411648?s=460&v=4",
  width: 100.0,
)
```

#### 2.本地图片
```dart
Image(image: AssetImage( "https://picsum.photos/200/200"),width: 100.0,)
```

也可以

```dart
Image.asset("images/avatar.png",
  width: 100.0,
)
```

**图片参数**

- width 宽

- height 高

- color 图片混合色

- colorBlendMode 混合模式，和color组合使用，只从BlendMode中取

- fit 缩放模式：fill,cover,contain,fitWidth,fitHeight,none

- repeat 重复方式，值从 ImageRepeat中取

- alignment 对齐方式

### 单选框和复选框
```dart
// 单选框
Switch(
          value: _switchSelected,//当前状态
          activeColor: Colors.red, //选中时的颜色
          onChanged:(value){
            // 修改状态值
            setState(() {
              _switchSelected=value;
            });
          },
),
// 复选框
Checkbox(
          value: _checkboxSelected,
          activeColor: Colors.red, //选中时的颜色
          onChanged:(value){
            setState(() {
              _checkboxSelected=value;
            });
          } ,
)
```

### 按钮
常用flutter按钮有以下几种：

+ RaisedButton  填充按钮
+ FlatButton 文字按钮，没有背景色
+ IconButton 图标按钮
+ FloatingActionButton 悬浮按钮
+ OutlineButton 描边按钮

案例：

```dart
RaisedButton(
  // 背景色
  color: Colors.red,
  // 子元素-文字内容
  child: Text("填充按钮")
  // 文字颜色
  textColor:  Colors.white,
  //点击事件
  onPressed:()=>{}
)
```



### <font style="color:rgb(79, 79, 79);">ListView 组件</font>
![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1716540219717-e11ca825-bcdc-4d25-8665-a87bd8e00a2e.png)

默认垂直滚动，水平滚动scrollDirection改为：Axis.horizontal。

```dart
ListView(
  scrollDirection: Axis.horizontal,  // 定义水平列表
  children: <Widget>[]
)
```

ListView.builder 创建动态列表

```dart
class HomeContent extends StatelessWidget {
  List list = new List();
  HomeContent({Key key}) : super(key: key) {
    for (var i = 0; i < 20; i++) {
      list.add("这是第${i}条数据");
    }
  }
  @override
  Widget build(BuildContext context) {
    // 定义动态列表
    return ListView.builder(
      itemCount: this.list.length,
      itemBuilder: (context, index) {
        return ListTile(
          leading: Icon(Icons.phone),
          title: Text("${list[index]}"),
        );
      },
    );
  }
}

```

### <font style="color:rgb(51, 51, 51);">ListTile 属性</font>
```dart
leading,              // 内容的==>前置图标
title,                // 内容的==>标题
subtitle,             // 内容的==>副标题
trailing,             // 内容的==>后置图标
isThreeLine = false,  // 内容的==>是否三行显示
dense,                // 内容的==>直观感受是整体大小
contentPadding,       // 内容的==>内容内边距
enabled = true,       // 内容 是否禁用
onTap,                // item onTap 点击事件
onLongPress,          // item onLongPress 长按事件
selected = false,     // item 是否选中状态
```

### GridView 网格布局
<font style="color:rgb(77, 77, 77);">GridView 创建网格列表有多种方式，主要介绍两种：</font>

<font style="color:rgb(77, 77, 77);">1、可以通过GridView.count 实现网格布局  
</font><font style="color:rgb(77, 77, 77);">2、通过GridView.builder 实现网格布局</font>

![](https://cdn.nlark.com/yuque/0/2024/png/1460947/1716540561997-f4592ac6-ce71-4862-90fc-647cda8882c2.png)

```dart
GridView.count(
      padding: EdgeInsets.all(20),
      crossAxisCount: 2,
      crossAxisSpacing: 20,
      mainAxisSpacing: 20,
      // childAspectRatio:0.7,
      children: this._getListData(),
);
```

```dart
GridView.builder(
      itemCount: listData.length,
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
          //横轴元素个数
          crossAxisCount: 2,
          //纵轴间距
          mainAxisSpacing: 20.0,
          //横轴间距
          crossAxisSpacing: 10.0,
          //子组件宽高长度比例
          childAspectRatio: 1.0),
      itemBuilder: this._getListData,
);
```

### <font style="color:rgb(51, 51, 51);">ReorderableListView 拖拽组件</font>
<font style="color:rgb(51, 51, 51);">ReorderableListView是一个Flutter控件，它允许用户通过拖放来重新排列列表中的项目。</font>

```dart
ReorderableListView(
     children:boxes,
     // 长按拖拽之后触发
     onReorder: (int oldIndex, int newIndex) {
            print("oldIndex ="+oldIndex.toString()+",newIndex ="+newIndex.toString());
            if (oldIndex < newIndex) {
              newIndex -= 1;
            }
            var tmp = boxes.removeAt(oldIndex);
            boxes.insert(newIndex, tmp);
     },
)
```

## Flutter 路由跳转
### 方式一.使用Navigator导航器跳转， Navigator.of(context).push()
```dart
onPressed: () {
  Navigator.of(context).push(
    MaterialPageRoute(
      builder: (context) => const SongScreen(song: song),
    ),
  );
},
```



### 方式二.使用name命名跳转
```dart
import 'package:test1/pages/home.dart';
import 'package:test1/pages/detail.dart';

Widget build(BuildContext context) {
  return MaterialApp(
    // 默认页面
    initialRoute: '/',
    // 路由配置，每个子路由使用的是页面的名称，如：HomeView
    routes: {
      '/': (context) => const HomeView(),
      '/detail': (context) => const DetailView(),
    },
  );
}
```



HomeView 页面内容如下：

```dart
import 'package:flutter/material.dart';
class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('First Screen'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pushNamed(context, '/detail');
          },
          child: const Text('详情页面'),
        ),
      ),
    );
  }
}
```

这样就实现了 页面之间的跳转。

### 方式三.使用插件 getit
#### GetIt 状态管理
官方地址：[https://pub-web.flutter-io.cn/documentation/get_it/latest/](https://pub-web.flutter-io.cn/documentation/get_it/latest/)

GetIt 本身是一个容器管理插件，其最初的设计是用于完成依赖注入DI 和 IOC 容器的功能。由于容器中的对象是全局的，因此可以用来做数据同步。

所谓的容器，本质上就是一个**全局Map对象**，存入对象后，在需要用的时候取出。



用法：

1.全局注入

```dart
// 注册对象：一般是单例
GetIt.instance.registerSingleton<T>(T object);
// 异步注册
GetIt.instance.registerSingletonAsync<T>(T object);
```

2.直接读取

```dart
GetIt.instance.get<T>();
```



## Flutter 安装依赖第三方插件
1.pubspec.yaml 文件 新增插件名了版本

```yaml
dependencies:
  get: ^4.6.6
```

2.点击右上角的 flutter commands 的 pub get 等待终端下载即可。使用命令也可以：

```dart
flutter packages get
```



