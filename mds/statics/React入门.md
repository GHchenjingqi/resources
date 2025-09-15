官方地址：[https://react.docschina.org/](https://react.docschina.org/)

## 一、安装
前置条件：安装node，建议v16.15+

**方式一：react脚手架**

1.全局安装react脚手架create-react-app

```bash
npm install -g create-react-app
```

2.创建项目

```bash
create-react-app my-app
```

3.启动项目

```bash
npm start
```

**方式二：vite安装**

```bash
npm create vite@latest
```

## 二、基础知识
+ react使用的jsx语法（简单理解：函数返回html代码块）
+ react引入css及图片静态资源 需要开头import导入
+ 定义组件有函数式组件、类组件。函数式组件，返回jsx内容，但需要使用“()”包括返回jsx内容

```javascript
function Mypp (){
  return (
    <div className="App">函数组件</div>
  )
}

class Mayypp extends React.Component {
  render() {
    return (
      <div className="App">类组件</div>
    )
  }
}
```

+ 组件传参、接收都需要用 {} 进行多包括一层，{number},{true},{[1,2,3]},{{name:''}}
+ 动态style，也需要用 {} 进行多包括一层，{{'color':'red'}}
+ 组件内动态生成列表使用map遍历，只能使用**表达式（****<font style="color:#DF2A3F;">a+b | a | demo() | arr.map | function(){} </font>****）**，不能用代码块
+ 组件动态绑定参数 使用{}
+ 条件渲染使用 if判断，或三元运算
+ 响应事件使用 onclick={handle} 来绑定，事件不需要加(),如果这样写handle()会渲染后立即执行
+ 响应数据定义时，useState 必须在组件或函数内使用，不能放到顶层（同import同级）
+ div 的class需要使用className替换
+ 组件内多个子元素可以使用 “<></> ”或多嵌套一层div包裹，就不会报错了
+ 多层次组件嵌套，组件可以作为参数进行传递
+ 组件状态和操作状态的方法在同一个组件内。操作方法通过参数传递给子组件。

### 1.函数式组件
案例：

```javascript
import logo from './logo.svg';
// 引入页面css 及静态资源
import './App.css';
// 响应数据引入
import { useState } from 'react';

// 自定义组件及组件传参 需要用{}在传递和接收时包括，否则会报错
function Buttons({params}){
  // useState 必须在组件或函数内使用
  // count 是响应数据，setCount 是响应数据的修改函数
  const [count,setCount] = useState(0);

  const handle = (e) => {
    console.log(e.target.innerText)
    // 修改数据使用setCount，不能直接赋值修改
    setCount( count + Number(e.target.innerText) )
  }
  let buttons = [...params]

  const btns = buttons.map((button, index) => <button onClick={handle} style={{'color': index%2===0 ? "red" : "blue"}} key={index}>{button}</button>)

  return(
    <>
      <div>
        <p>{count}</p>
      </div>
      <div className='btnGroup'>
          { btns }
      </div>
    </>
  )
}
function App() {
  return (
    <div className="App">
    <header className="App-header">
    <img src={ logo } className="App-logo" alt="logo" />
    <Buttons params={["1", "2", "3", "4", "5"]} />
    </header>
    </div>
  );
}

export default App;
```

### 2.类组件
组件(类组件）实例的三大属性state、props和refs 。

+ state 状态，必须是对象

```jsx
class Myapp extends React.Component {
  constructor (props) {
    super(props)
    // 初始化状态
    this.state = {
      flag: false
    }
    // 改变函数执行，避免this指向问题
    this.changeFlag = this.changeFlag.bind(this)
  }
  changeFlag () {
    // 修改状态 setState ，更新是合并，不是替换不会删除属性
    this.setState({
      flag: !this.state.flag
    })
  }
  render() {
    // 读取状态 this.state.flag
    return <div className="App" onClick={this.changeFlag}>类组件2,状态{ this.state.flag ? "红" : "蓝"}</div>
  }
}

// 简写
class Mayypp2 extends React.Component {
  // 借用类的静态属性
  state = { flag: false}
  // 赋值 + 箭头函数
  changeFlag= () =>{
    this.setState({
      flag: !this.state.flag
    })
  }
  render() {
    return <div className="App" onClick={this.changeFlag}>类组件2,状态{ this.state.flag ? "红" : "蓝"}</div>
  }
}
```

+ refs 选择器，是ref选择器的对象集合

```jsx
class Mayypp extends React.Component {
  constructor(props) {
    super(props)
    // 新版写法React.createRef,函数式使用useRef，旧版 this.refs.name
    this.myRef = React.createRef();
  }
  render() {
    return <div className="App" ref={this.myRef}>类组件 ,props:{this.props.name}</div>
  }
}
```

简写，将ref元素挂到实例上。

```jsx
class Mayypp extends React.Component {
  test = ()=>{
    console.log(this.myRef)
  }
  render() {
    // 外部可以通过this.myRef获取到元素
    return <div className="App" ref={c => this.myRef = c} onClick={this.test}>类组件 ,props:{this.props.name}</div>
  }
}
```

+ props 参数属性，是只读的，保证单向数据流

```jsx
class Mayypp extends React.Component {
  render() {
    // 接收参数 this.props.name
    return <div className="App">类组件 ,props:{this.props.name}</div>
  }
}

function App() {
  // 单一传参-属性赋值
  // 扩展运算-批量传参
  const plist = { name: 'react' , age: 18 , sex: '男' }
  return (
    <>
      <Mypp name='react' />
      <Mayypp {...plist} />
    </>
  )
}
```



### 3.参数类型限制
props 限制类型propTypes（需安装 prop-type 依赖[https://github.com/facebook/prop-types](https://github.com/facebook/prop-types)）和默认值-defaultProps

```jsx
class Mayypp extends React.Component {
  render() {
    console.log('Mayypp', this)
    return <div className="App">类组件 ,props:{this.props.name}</div>
  }
}
// 类型限制
Mayypp.propTypes = {
  name: PropTypes.string
}
// 默认值
Mayypp.defaultProps = {
  name: '默认值'
}
```

简写：

```jsx
class Mayypp extends React.Component {
  static propTypes = {
    name: PropTypes.string
  }
  static defaultProps = {
    name: '默认值'
  }
  render() {
    console.log('Mayypp', this)
    return <div className="App">类组件 ,props:{this.props.name}</div>
  }
}
```

注意：1.类组件的构造器可以省略！不省略时必须接收props和super(props)参数。

2.类组件的构造函数<font style="color:#DF2A3F;">constructor执行一次</font>；<font style="color:#DF2A3F;">render函数执行 1 + n 次</font>，触发重新渲染就会调用render；<font style="color:#DF2A3F;">ref执行2次</font>，第一次参数为null，第二次才是真实的元素节点。



### 4.多状态管理
统一使用柯里化函数存储状态，避免多次声明及存储。

```jsx
class Myapp extends React.Component {
  state = {
    username: '',
    password: '',
    phone: ''
  }
  handleSubmit = (e) => {
    e.preventDefault()
    // 提交事件
  }

  formSave = (key) => {
    return (e) => {
      this.setState({
        [key]: e.target.value
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.formSave('username')} type="text" name='username' />
        <input onChange={this.formSave('password')}  type="text" name='password' />
        <input onChange={this.formSave('phone')}  type="text" name='phone' />
        <button>提交</button>
      </form>
    )
  }
}
```

### 5.组件的生命周期回调
组件从创建到销毁经历的一系列的过程，被成为组件的生命周期。

#### 旧版生命周期
![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1747378865780-de7d7005-8956-43ff-81d0-416adff5ae0f.png)

##### a.组件初始化过程
+ constructor 构造函数
+ ~~componentWillMount ~~ 组件即将挂载
+ render  初始化时、状态更新时调用
+ **componentDidMount** 组件挂载完时调用

##### b.组件更新过程
+ setState 修改状态 
+ shouldComponentUpdate  更新阀门：默认返回true-更新， false-不更新
+ ~~componentWillUpdate ~~ 即将更新
+ render 重新渲染
+ **componentDidUpdate** 更新完成时触发

##### c.父传子组件更新过程
+ ~~componentWillReceiveProps~~ 将接收参数时，第一次不触发，父参数修改时才触发；
+ shouldComponentUpdate  更新阀门：默认返回true-更新， false-不更新
+ ~~componentWillUpdate ~~ 即将更新
+ render 重新渲染
+ **componentDidUpdate** 更新完成时触发

##### d.强制更新组件
+ forceUpdate 强制更新
+ ~~componentWillUpdate ~~ 即将更新
+ render 重新渲染
+ **componentDidUpdate** 更新完成时触发

##### e.组件卸载
   旧版卸载组件使用~~ ReactDOM.unmountComponentAtNode~~(document.getElementById('root'))，新版使用 <font style="color:#117CEE;">root.unmount()。</font>

+ **componentWillUnmount** 卸载前

#### 新版生命周期
![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1747381696280-17492b54-bbce-4b95-ade2-e6bf82c1fd55.png)

新版即将废弃（不兼容）旧版的三个带will的钩子函数componentWillMount、componentWillReceiveProps和componentWillUpdate，需要在前面加 "UNSAFE_"和安装 `npx react-codemod rename-unsafe-lifecycles`。

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1747382197172-1f4ccb53-cf74-485a-95ca-acbc46c43ade.png)

同时，新版新增了2个钩子 getDerivedStateFromProps、getSnapshotBeforeUpdate。

+ getDerivedStateFromProps(props, state) 当<font style="color:rgb(35, 39, 47);">state 依赖于 props 时使用</font>

```javascript
class Myapp extends React.Component {
  state ={
    number: 0
  }
  static getDerivedStateFromProps(props, state) {
    console.log("接收的参数",props) // {number:199}
    console.log("组件的状态",state) // {number: 0}
    // return props 之后，state将永远是199 无法在修改成功
    return props
  }
  ...
}

// 组件传参Props
<Myapp number={199} />
```

+ getSnapshotBeforeUpdate(prevProps, prevState) 组件更新之前触发，获取上次的参数和状态，值作为**componentDidUpdate** 的第三个参数传入

```javascript
getSnapshotBeforeUpdate(preProps, preState) {
    console.log("获取上次参数和状态快照：",preProps, preState)
    return "返回更新钩子的第三个参数"
}
// 更新完成之后
componentDidUpdate(prevProps, prevState, snapshot) {
   // snapshot是getSnapshotBeforeUpdate返回的参数
   console.log("获取上次参数、状态、快照结果：",prevProps, prevState, snapshot)
}
```



新组件对比旧组件，废弃了三个**<font style="color:#ECAA04;">will</font>**钩子，新增2个不常用**<font style="color:#2F4BDA;">get</font>**钩子。开发中更常用 render、componentDidMount、componentDidUpdate、componentWillUnmount 这四个钩子。

##### a.组件初始化过程
+ constructor 构造函数
+ getDerivedStateFromProps 状态依赖参数时
+ render  初始化时、状态更新时调用
+ **componentDidMount** 组件挂载完时调用

##### b.组件更新时
+ getDerivedStateFromProps  状态依赖参数时
+ shouldComponentUpdate 更新阀门：默认返回true-更新， false-不更新
+ render 重新渲染
+ getSnapshotBeforeUpdate 获取快照
+ **componentDidUpdate** 更新完成时触发

##### c.组件卸载
+ **componentWillUnmount** 卸载前



### 6.diff算法
又可以理解成下面的面试问题：

+ react/vue 中的key有什么作用？内部原理是什么？
+ 为什么遍历的key不建议使用index作为索引值？

上面的问题，归根原因都是在虚拟dom生成真实dom时候的diff算法在起作用。

diff算法：当组件数据发生变化时，react/vue会快速生成**<font style="color:#4861E0;">新虚拟dom</font>**，然后新旧虚拟dom**按照****<font style="color:#DF2A3F;">key</font>****进行逐项比较虚拟dom**。没有对应的key就直接生成对应真实dom；如果有相同的key，就比较新旧项虚拟dom是否一致，如果一致，就会就地复用旧的真实dom，如果新旧的虚拟dom不一致，就会重新生成真实dom。

当使用index做索引时，特别是在往列表前插入数据时，会导致"list.length-1"次重新生成真实dom，影响性能损耗。因此不建议index做索引！

### 7.路由 react-router
react路由使用react-router-dom插件库实现。

+ BrowserRouter 浏览器路由模式
+ HashRouter  哈希路由模式，地址栏“/#/**”
+ Link 跳转链接，需要在router路由模式里面使用。

```javascript
import { BrowserRouter ,Link} from 'react-router-dom'
// 编写路由链接，等同于a链接
<BrowserRouter>
  <Link to="/">Home</Link> 
</BrowserRouter>
```

+ <font style="color:rgb(44, 44, 54);">NavLink 用于带选中的跳转链接</font>

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink to="/" activeClassName="selected">首页</NavLink></li>
      <li><NavLink to="/about" activeClassName="selected">关于我们</NavLink></li>
    </ul>
  </nav>
);
export default Navigation;
```

+ Route 用于注册路由，需要在router路由模式里面使用。



```javascript
// Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
// 导入你想要展示的不同页面组件
import HomePage from '../views/Home';
import AboutPage from '../views/About';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>
);

export default AppRouter;
```

为便于同一个路由BrowserRouter管理路由链接和注册路由，可以在app里面统一处理路由，子组件就不需要使用 BrowserRouter 包括Link和Route。

```jsx
import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '../router/index'; // 引入刚刚创建的路由配置文件
import Header from "./Header";
export default function Layout() { 
    return (
        <Router>
            <Header />
            <div className="content">
                <AppRouter />
            </div>
        </Router>
    )
}
```

主入口引入布局

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './components/Layout'; // 引入刚刚创建的路由配置文件
import  './assets/main.css'
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Layout />
  </StrictMode>,
)

```



## 三、jsx核心语法
### 1.模版变量使用 - 单括号，元素属性值不加引号
```jsx
function Home() {
  const Home = "Home页面";
  const title = "首页";
  return (
    <h1 title={title}>{Home}</h1>
  );
}
```



### 2.响应数据使用 - useState
```jsx
function Home() {
  const [change, setChange] = useState(false);
  const Home = "Home页面";
  const title = "首页";
  const handleClick = () => {
    setChange(!change);
  };
  return (
    <>
      <h1>{change ? Home : title  }</h1>
      <Button type="primary" onClick={handleClick}>Button</Button>
    </>
  );
}
```



### 3.动态class
```jsx
function Home() {
  const [change, setChange] = useState(false);
  const Home = "Home页面";
  const handleClick = () => {
    setChange(!change);
  };
  return (
    <>
      <h1 className={change ? 'title' : ''}>{ Home }</h1>
      <Button type="primary" onClick={handleClick}>Button</Button>
    </>
  );
}
```

### 4.动态style - 双括号{{}}
style接收一个css属性集合的对象，因此看起来就是双括号{{}}。

```jsx
function Home() {
  const [change, setChange] = useState(false);
  const Home = "Home页面";
  const handleClick = () => {
    setChange(!change);
  };
  return (
    <>
      <h1 style={{ background: change ? "green" : "blue" }}>{ Home }</h1>
      <Button type="primary" onClick={handleClick}>Button</Button>
    </>
  );
}
```

### 5.条件渲染
```jsx
function Home() {
  const [change, setChange] = useState(false);
  const handleClick = () => {
    setChange(!change);
  };
  // 条件渲染，返回jsx
  const DivContent = ()=>{
    return change ? <div>这是一个div</div> : <p>这是文字</p>;
  };

  return (
    <>
      <DivContent />
      <Button type="primary" onClick={handleClick}>Button</Button>
    </>
  );
}
```

### 6.对象渲染
```jsx
function Home() {
  const [data, setData] = useState({
    name: "张三",
    age: 18,
  });

  const handleAge = () => {
    setData({
      ...data,
      age: data.age + 1,
    });
  };
  return (
    <>
      <div>{data.name + data.age}岁</div>
      <Button type="primary" onClick={handleAge}>过年了，年龄+1</Button>
    </>
  );
}
```

### 7.数组渲染 - map
```jsx
function Home() {
  const [list, setList] = useState([{ id:0 ,name: "张三", age: 18 },{ id:2 ,name: "李丽", age: 25 },{ id:4 ,name: "王五", age: 45 }]);

  const ListContent = ()=>{
    return list.map(item=>(
      <li key={item.id+ Math.random()}>{item.name},今年{item.age}岁了</li>
    ))
  }
  const handleClickType = (e) => {
    const type = e.currentTarget.dataset.type;
    if(type === '0'){
      setList([{ id: list.length+2 ,name: "赵六"+list.length+2, age: 25 },...list]);
    }
    if(type === '1'){
      setList([...list,{ id: list.length+2 ,name: "王七"+list.length+12, age: 25 }]);
    }
    if(type === '2'){
      setList(list.filter(item=>item.id !== 2));
    }
    if(type === '3'){
      setList(list.map(item=>{
        if(item.id == 2){
          return {...item,age: "36"}
        }else{
          return item;
        }
      }));
    }
  }
  return (
    <>
      <ListContent />
      <Button type="primary" data-type="0" onClick={handleClickType}>往前加</Button>
      <Button type="primary" data-type="1" onClick={handleClickType}>往后加</Button>
      <Button type="primary" data-type="2" onClick={handleClickType}>不显示ID为2的</Button>
      <Button type="primary" data-type="3" onClick={handleClickType}>修改ID为2的年龄为36</Button>
    </>
  );
}
```

数组遍历时，只允许返回一个根元素，如果多个可以用 "**<font style="color:#DF2A3F;"><></></font>**"，若需要在根元素上加属性，比如key，就需要使用"**<font style="color:#DF2A3F;">Fragment</font>**"。

```jsx
const ListContent = ()=>{
  return list.map(item=>(
    <Fragment key={item.id+ Math.random()}>
      <li>{item.name}，今年{item.age}岁了</li>
      <div>----------------------------</div>
    </Fragment>
  ))
}
```

### 8.组件通信
##### 1.父传子 - props
+ 属性写到html标签上，就是子组件参数props的子属性，会被传递给子组件。
+ jsx写到组件内部，就会默认传递给子组件props的children属性，就形成了“插槽”。
+ 父传子的属性都是只读的！！！

```jsx
function Home() {
  const ListItem = ({title,content, children})=>{
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{content}</p>
        {children}
      </div>
    )
  }
  return (
    <>
      <ListItem title="标题1" content="内容1" />
      <ListItem title="标题2" content="内容2" />
      <ListItem title="标题3" content="内容3" >
        <div className="slot">这是一个默认插槽</div>
      </ListItem>
    </>
  );
}
```

加上css效果如下:

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1737620261986-b8e77570-fd99-4e15-81db-c87dda3efa5f.png)

**具名插槽，通过属性传递的方式传输jsx，组件接收时，需要设置默认值（不然报错）。**

```jsx
function Home() {
  const ListItem = ({title,content,footer=<></>, children})=>{
    return (
      <div className="card">
        <h3>{title}</h3>
        <p>{content}</p>
        {children}
        {footer}
      </div>
    )
  }
  return (
    <>
      <ListItem title="标题1" content="内容1" footer={<div className="list-footer">具名插槽1</div>} />
      <ListItem title="标题2" content="内容2" footer={<div className="list-footer">具名插槽2</div>} />
      <ListItem title="标题3" content="内容3" >
        <div className="slot">这是一个默认插槽</div>
      </ListItem>
    </>
  );
}
```

加上css效果如下：

![](https://cdn.nlark.com/yuque/0/2025/png/1460947/1737620948468-32ff1cd5-f5bf-4b60-9d16-11c37a406e39.png)

##### 2.子传父 - 子调用父方法传递参数
父组件接收，通过props属性接收一个，函数参数就是子组件传递的值。

```jsx
function Home() {
  const Child = ({onActive})=>{
    const hanldeClick = ()=>{
      onActive('父组件，你好。我是子组件传参！');
    }
    return <Button onClick={hanldeClick}>子组件按钮</Button>
  }

  return (
    <Child onActive={(msg)=>{ alert(msg)}} />
  );
}
```

##### 3.组件之间：父组件传递数据
子组件共享父组件数据，组件A修改，组件B使用。

```jsx
function Parent() {
  const [data, setData] = useState('');

  const handleDataChange = (newData) => {
    setData(newData);
  };

  return (
    <div>
      <ChildA onDataChange={handleDataChange} />
      <ChildB data={data} />
    </div>
  );
}
// 修改
function ChildA({ onDataChange }) {
  const handleClick = () => {
    onDataChange('Data from ChildA');
  };

  return (
    <div>
      <button onClick={handleClick}>Send Data to ChildB</button>
    </div>
  );
}
// 使用
function ChildB({ data }) {
  return (
    <div>
      <p>Data from ChildA: {data}</p>
    </div>
  );
}
```

##### 4.组件之间：Context API 数据共享
```jsx
import React, { createContext, useState } from 'react';
const DataContext = createContext();

function Parent() {
  const [data, setData] = useState('');

  return (
    <DataContext.Provider value={{ data, setData }}>
      <ChildA />
      <ChildB />
    </DataContext.Provider>
  );
}

function ChildA() {
  const { setData } = React.useContext(DataContext);
  const handleClick = () => {
    setData('Data from ChildA');
  };

  return (
    <div>
      <button onClick={handleClick}>Send Data to ChildB</button>
    </div>
  );
}

function ChildB() {
  const { data } = React.useContext(DataContext);
  return (
    <div>
      <p>Data from ChildA: {data}</p>
    </div>
  );
}
export default Parent;
```

复杂的场景推荐方法：状态管理库（如 Redux、MobX）、事件总线（Event Bus）。



##### 5.任意组件之间：pubsubjs 第三方库
官方地址：[https://github.com/mroderick/PubSubJS](https://github.com/mroderick/PubSubJS)

需要的地方订阅，获取到数据的地方发布，可用于react任意层级组件间通信。

消息订阅：

```javascript
import PubSub from 'pubsub-js'

// 挂载完成后立即订阅消息
componentDidMount() {
  // B页面订阅msglist消息
  PubSub.subscribe('msglist', (_,data)=>{
    // 收到消息后的回调
  });
}
```

消息发布：

```javascript
import PubSub from 'pubsub-js'

// 发布消息
PubSub.publish('msglist', {name: 'my new car'});
```



## 四、Hook函数
Hook函数只能在**<font style="color:#DF2A3F;">函数组件内</font>**使用，不可在类组件中使用！否则报错。

### 1.StrictMode 
自带的开发工具，开发模式下会<font style="color:#DF2A3F;">检查组件（过时生命周期钩子及过时API），并发出警告和错误信息</font>。生产环境不影响。

```jsx
  import { StrictMode } from 'react'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 2.createRoot 
是React18引入的新API，用于初始化 React 应用的根节点。新特性：并发渲染（优先处理优先级高的任务）、自动批处理（自动批处理状态更新）。

```javascript
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### 3.useState 
是 React 提供的一个 Hook，用于在函数组件中添加状态（state）

```javascript
import { useState } from 'react'
// const [state-状态名, setState-更新修改状态方法] = useState(initialState-初始值|初始函数);
const [count, setCount] = useState(0);
// 更新状态，默认状态更新是异步的，值不会立即生效，如果依赖更新后的状态需要用useEffect。
setCount(prevCount => prevCount + 1)
// 多状态更新
const [user, setUser] = useState({ name: 'John', age: 30 });
setUser(prevUser => ({ ...prevUser, age: 31 }));
```

### 4.useEffect 
是 React 提供的一个 Hook，用于在函数组件中执行副作用操作（指那些与组件渲染无关的操作，例如数据获取、订阅、手动修改 DOM 等）。

useEffect 可以看作是类组件中 componentDidMount、componentDidUpdate 和 componentWillUnmount 的组合。

**useEffect(fn-副作用函数, 可选[dependencies]-依赖数组)  **

+ **依赖数组省略，每次渲染都会执行；**
+ **传入空数组，只会在组件挂载和卸载时执行；**
+ **传值后，有点类似vue监听watch/computed计算属性。**



```javascript
useEffect(() => {
    const timer = setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);

    // 清理定时器
    return () => clearInterval(timer);
}, []); // 空数组表示只在挂载和卸载时执行
```

![](https://cdn.nlark.com/yuque/0/2025/jpeg/1460947/1736933499247-647fd414-dda2-467e-bba6-ee8611d7b6db.jpeg)

#### useEffect 常见用途
a.数据获取 - 挂载时获取数据

```javascript
useEffect(() => {
  fetch('/api/data')
    .then(response => response.json())
    .then(data => setData(data));
}, []);
```

b.订阅事件 - 卸载时取消订阅

```javascript
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
```

c.手动修改Dom

```javascript
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // 在 count 变化时更新标题
```

### 5.React Router 
是React 生态中最流行的路由管理工具，实现单页面应用（SPA）中实现多页面的效果。

使用步骤：

1. 安装 react-router-dom 包

```shell
npm install react-router-dom
```

2. 路由配置

```jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/home";
import User from "./components/User";
import NoFound from "./components/NoFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
}

export default AppRoutes;
```

3. 路由使用

```jsx
// app.jsx
import { BrowserRouter ,Link} from 'react-router-dom'
import AppRoutes from './routes'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/about">About</Link> | 
        <Link to="/contact">Contact</Link> | 
        <Link to="/user/145">User 1</Link> | 
        <Link to="/login">Login</Link>
      </nav>
      <AppRoutes />
    </BrowserRouter>
  )
}
export default App
```

```jsx
import React, { useReducer } from 'react';

function couterReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'sub':
      return state - 1;
    default:
      return state;
  }
}

export default function About() {
  //  [状态key, 状态修改方法] = useReducer(代理函数，默认值)
  const [couter, dispatch] = useReducer(couterReducer, 0);
  const handleClickAdd = () => {
    dispatch({ type: 'add' });
  };

  const handleClickSub = () => {
    dispatch({ type: 'sub' });
  }
  return (
    <>
      <h1>{couter}</h1>
      <Button type="primary" onClick={handleClickAdd}>加1</Button>
      <Button type="primary" onClick={handleClickSub}>减1</Button>
    </>
  );
}
```

### 6.useRef 和 React.createRef
**useRef** 是 React 中的一个 Hook，用于创建一个可变的引用对象（ref），该对象在整个组件生命周期内保持不变。

与 useState 不同，**<font style="color:#DF2A3F;">useRef 的值变化不会触发组件重新渲染</font>**，因此它非常<font style="color:#000000;">适合存储不需要影响 DOM 渲染的值或直接操作 DOM 元素</font>。

```jsx
import React, { useRef } from 'react';
export default function About() {
const refObj = useRef({name:'化学'});
return (
    <Button type="primary" onClick={()=>{refObj.current.name = "历史"; alert(refObj.current.name );}}>修改name</Button>
 );
}
```

+ useRef操作dom

```jsx
import React, { useRef } from 'react';
export default function About() {
const refDom = useRef(null);
const changebox = () => {
    refDom.current.style.background = 'blue';
}
return (
  <>
  <h3>useRef操作dom</h3>
  <div ref={refDom} style={{background: 'red', width: '100px', height: '100px', marginBottom:'10px'}}></div>
  <Button type="primary" onClick={changebox}>变蓝色</Button>
  </>
  );
}
```

**React.createRef()** 返回一个容器，用于存储ref指定的元素节点。

```jsx
function Mypp (){
  let refapp = React.createRef()
  // 获取预算的属性值  this.refapp.current.key
  return  <div className="App" ref={refapp}>函数组件</div>
}
```

### 7.热重载hot
hot 函数是 React Hot Loader 库提供的一个高阶组件，用于在开发环境实现热重载，提升开发体验。

```javascript
import { hot } from 'react-hot-loader/root';
import App from './App';

// 包裹根组件
export default hot(App);
```



```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import Routes from '@configs/router.config'

const HotRoutes = hot(Routes)
ReactDOM.render(
  <HotRoutes />,
  document.getElementById('root'),
)
```

### 8.useReducer  状态管理工具
<font style="color:rgb(64, 64, 64);">状态逻辑简单，优先使用 </font>`<font style="color:rgb(64, 64, 64);">useState</font>`<font style="color:rgb(64, 64, 64);">；如果状态逻辑复杂，优先使用 </font>`<font style="color:rgb(64, 64, 64);">useReducer</font>`<font style="color:rgb(64, 64, 64);">。</font>

```tsx
import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

// 定义初始状态
const initialState = {
    data: null,
    loading: false,
    error: null,
};

// 定义 Reducer 函数
function reducer(state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            return {
                ...state,
                loading: true,
                error: null,
            };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// 组件定义
function DataFetchingComponent() {
    const [state, dispatch] = useReducer(reducer, initialState);

    // 使用 useEffect 在组件挂载时发起请求
    useEffect(() => {
        dispatch({ type: 'FETCH_INIT' });

        axios.get('https://api.example.com/data')
            .then(response => {
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            });
    }, []); // 空数组表示仅在组件挂载时执行

    // 根据状态渲染不同的内容
    if (state.loading) return <p>Loading...</p>;
    if (state.error) return <p>Error: {state.error}</p>;

    return (
        <div>
            {/* 假设 data 是一个对象数组 */}
            {state.data.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
}

export default DataFetchingComponent;
```

### 9.<font style="color:rgb(6, 7, 31);background-color:rgb(253, 253, 254);">React Fiber</font>
Fiber是React16引入的<font style="color:#DF2A3F;">新调度算法</font>，它重构了React的调度机制，解决了旧版“渲染进程阻塞主进程导致卡顿”和“调度缺乏优先级”的问题。

解决以下问题：

+ **<font style="color:#DF2A3F;">渲染阻塞</font>**：旧版递归遍历组件树，无法中断渲染过程，导致主线程长阻塞页面卡顿。
+ **<font style="color:#DF2A3F;">缺乏调度优先级</font>**：旧版所有任务同等优先级，无法处理用户交互等优先级高的操作。

实现了下面功能：

1. **可中断渲染**
+ 链表结构：将组件拆分为Fiber节点，每个节点保存组件状态，形成链表。
+ 增量渲染：通过requestAnimationFrame和requestIdleCallback将渲染任务拆分多个“时间片”，利用空闲时间逐步执行，避免阻塞主进程。
2. **优先级调度：**
+ 任务分级：用户输入>数据更新>动画
+ 动态暂停/恢复：高优先级任务可中断低任务
3. **双缓存机制**
+ 当前帧：缓存当前渲染UI状态
+ 备用帧：缓存正在构建的新状态

总结：<font style="color:rgb(6, 7, 31);background-color:rgb(253, 253, 254);">Fiber 通过</font>**<font style="color:rgb(6, 7, 31);background-color:rgb(253, 253, 254);">可中断渲染</font>**<font style="color:rgb(6, 7, 31);background-color:rgb(253, 253, 254);">和</font>**<font style="color:rgb(6, 7, 31);background-color:rgb(253, 253, 254);">优先级调度</font>**<font style="color:rgb(6, 7, 31);background-color:rgb(253, 253, 254);">，使复杂 UI 渲染更高效、流畅，同时为并发模式、异步特性等高级功能奠定了基础。</font>

<font style="color:rgb(6, 7, 31);background-color:rgb(253, 253, 254);"></font>

### <font style="color:rgb(6, 7, 31);background-color:rgb(253, 253, 254);">10.useNavigate</font>
react编程式路由跳转使用useNavigate实现。

```javascript
// MyComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MyComponent() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/about')}>前往关于我们页面</button>
  );
}

export default MyComponent;
```

## 五、其他问题
#### 1. html元素多属性如何合并？为什么alt属性不能使用展开？
```jsx
function Home() {
  const Home = "Home页面";
  const title = "首页";

  const [change, setChange] = useState(false);
  const handleClick = () => {
    setChange(!change);
  };

  // 多个属性
  const h1obj = {
    title: title,
    style: { background: change ? "green" : "blue" },
    className: change ? 'title' : ''
  }
  return (
    <>
      <h1 title={title} style={{ background: change ? "green" : "blue" }} className={change ? 'title' : ''}>{change ? Home : title}</h1>
      <h1 {...h1obj}>{change ? Home : title}</h1>
      <Button type="primary" onClick={handleClick}>切换状态</Button>
    </>
  );
}
```

alt属性是img标签的图片秒速，如果缺失会有报错。



##### 












