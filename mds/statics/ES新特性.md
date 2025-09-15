## 为什么叫ES6？

ECMAScript是TC39（浏览器厂商：谷歌，苹果，火狐等）推出的js的版本。

es5 => 2009年

es6 => 2015年

es7 => 2016年

...

es10 => 2019年

esnext => 最新版

## ES6 新特性

### 1.let声明变量及特性

- 变量不能重复声明
- 块级作用域
- 不存在变量提升
- 不影响作用域链

### 2.const声明常量

- 必须有初始值
- 常量不能修改
- 块级作用域
- 一般常量使用大写（潜规则-不是必须的）

### 3.解构赋值

按照一定模式从数组和对象中取值

```js
// 解构数组
const F3 = ['a','b','c']
let [a,b,c] = F3

// 解构对象
const obj = {
	name:"张三",
	age:20,
	say(){}
}
let {name,age,say} = obj
```

### 4.模板字符串

模板字符串用 `` 表示，模板字符串中使用 ${变量} 语法替换动态变量。

```js
let aa = '张三'
let str = `${aa}是最帅的！`
```

### 5.对象简化写法

ES6对对象进行了简化处理，写起来更简单。

```js
let name = '张三';
let change = function(){}
// 简化写法 - 推荐
const obj = {
	name,
	change,
	fn(){}
}
// 传统写法
let obj = {
	name:name,
	change:change,
	fn:function(){}
}
```

### 6.箭头函数

简写：单个参数可以省略小括号()，单条执行语句可以省略花括号{}和return

```js
let aa = (a,b)=>a+b;
```

- 箭头函数的this始终**指向函数声明时所在作用域**的this

- 不能作为构造函数
- 不能使用argument变量

### 7.函数参数设置默认值

- 形参初始值

    ```js
    function (a=2){}
    ```

### 8.rest参数

rest参数 通过 ...args 获取参数的参数集合（数组格式）

```js
function date(...args){}
date('12','333','43') // ['12','333','43']
```

- rest 参数必须放到最后（多个参数）

```js
function aaa(a,b,...args){}
aaa(1,2,3,4,5) // a:1,b:2,c:[3,4,5]
```

### 9.扩展运算符

[...]将数组转换为逗号分割的参数序列

```js
let aa = [1,2,3]
function ccc(){
	console.log(arguments)
}
ccc(...aa) // a,b,c
```

扩展运算符的应用：

- 数组合并

    ```
    let a = [1],b = [2,3]
    let c = [...a,...b]
    ```

- 数组克隆

    ```
    let d = [...c]
    ```

- 将伪数组转成数组

- ```
    const div = document.querySelectorAll('div')
    let arrr = [...div]
    ```

### 10.数据类型symbol

es6 引入了新的原始数据类型symbol。

特点：

- Symbol值唯一
- Symbol值不能进行运算、比较
- Symbol定义的对象不能用for循环，但是可以用Reflect.ownKeys获取对象的所有key名。

```
// 创建Symbol
let s = Symbol()
let s1 = Symbol('稀罕三')
let s2 = Symbol('稀罕三')
// s1 !== s2

// 通过Symbol.for 创建
let s3 = Symbol.for('稀罕三')
let s4 = Symbol.for('稀罕三')
// s3 === s4
```

### 11.迭代器 iterator

迭代器iterator是一种接口（对象的一个属性 Symbol.iterator），数据结构只要有这个结果就可以进行遍历操作。以下：Array,Arguments,Set,Map,String,TypedArray,NodeList 都可以进行for of遍历。

工作原理：

- 创建一个指针对象，指向当前数据结构的起始位置。
- 第一次调用next方法，指针知道指向第一个成员。每次返回一个包含value和done属性的对象
- 接下来每次调用next方法，指针都会一直往后移动，直到最后一个（最后一个done返回true，表示结束）。

```js
let arrr = [1,2,3,4]
let iterator = arrr[Symbol.iterator]()
// 调用对象的next方法
console.log(iterator.next())
```

应用场景：自定义遍历数据

```js
const obj = {
	name:"一班",
	students:[
		'xiaoming','xiaohong','xiaoli'
	],
    // 通过自定义迭代器实现对象数组属性可迭代
    [Symbol.iterator](){
        let index = 0;
        let that = this;
        return{
            next:function(){
                if(index < that.students.length){
                    index++;
                    return {
                        value: that.students[index],
                        done: false
                    }
                }else{
                     return {
                        value: undefined,
                        done: true
                    }
                }
            }
        }
    }
}
// 返回结果是 obj的students每次的成员
for(let v of obj){
	console.log(v)
}
```

### 12.生成器 generator

生成器是一个特殊的函数（可迭代）。在function和函数名之间使用 *，函数里面通过关键字 yield 分割迭代层次，然后通过next()方法调用。

```js
function * gen(){
	yield '第1次';
	yield '第2次';
	yield '第3次';
}

let iteror = gen()
iteror.next(); // 第1次
iteror.next(); // 第2次
iteror.next(); // 第3次
```

迭代器可以传参，在调用next时执行参数。next(arg)方法可以传入实参，作为上一次的返回结果(next参数影响上次的结果）。

```js
function * gen(arg){
	console.log(arg);
	let one = yield '第1次';
	yield '第2次';
	yield '第3次';
}
let iteror = gen('AAA')
iteror.next(); // 第1次
iteror.next('BBB'); // 第2次 one会被改成BBB ，同时返回‘第2次’
```

**生成器实例- 解决回调地狱问题**

函数调用生成器next方法，执行下一次调用，避免函数嵌套函数的情况出现

```js
function getuser(){
	console.log(111);
    iteror.next('user'); // 函数调用生成器next方法，执行下一次调用，避免函数嵌套函数的情况出现
}
function getorder(){
	console.log(222);
    iteror.next('order'); 
}
function getGoods(){
	console.log(333);
    iteror.next('goods'); 
}

function * gen(){
    let users = yield getuser();
    let order = yield getorder();
    let goods = yield getGoods();
}
let iteror = gen()
iteror.next(); 
```

### 13.Promise 

Promise是ES6引入的解决异步编程的新方法。用于解决回调地狱的问题。

Promise 函数的状态有：pending(初始化状态)，fulfilled(已成功)和rejected(已失败)

```js
let p = new Promise((resolve,reject)=>{
	// 默认状态是 pending
	try{
		resolve('成功') // resolve将状态修改为fulfilled
	}catch(e){
		reject('失败') // reject将状态修改为rejected
	}
})

// 调用promise对象的then方法
p.then(function(res){
    console.log(res);
},function(e){
    console.log(e);
})
```

**then()方法接收2个函数，第一个函数是成功回调（resolve时触发），第二个参数是失败回调（reject时触发）。**

then返回结果：返回结果是Promise对象，对象的状态由函数执行的结果决定。

- then如果返回结果是非Promise，如：“123”，那么返回值是对象成功的值
- 返回结果是一个Promise，then的返回值是Promise的返回值
- 如果then抛出了错误，then的返回值就是抛出的错误值

```js
//node 获取文件内容异步
import fs form 'fs';
let p =new Promise((resolve,reject)=>{
	fs.readFile('./1.txt',(err,data)=>{
		if(err) reject(err)
		resolve(data)
	})
})
p.then(val=>{
    console.log(val.tostring())
},err=>{
    console.error(err)
})
```



### 14.集合 Set

ES6新增的数据结构 Set集合，集合中元素不能有重复（会自动去重）。

属性方法
- size 集合元素长度
- add 新增元素
- delete 删除元素
- has 检测是否含有元素
- clear 清空集合

```js
let s = new Set([1,2,3,4,2]) // Set[1,2,3,4]
s.size // 4
s.add(31)
s.delete(31)
s.clear()
```
集合用法

- 数组去重
    ```js
    let arr = [...new Set([1,2,3,2])]
    ```
    
    

### 15.Map

ES6新增的数据结构 Map，保存数据是键值对集合。但是“键值”可以是任何类型的值（包括对象）。

Map原型也有interator接口，所以也可以使用扩展运算符和for of循环。

- size 返回Map的元素长度
- set 增加新元素并返回当前Map
- get 返回键名对应的值
- has 检测是否函数某个元素
- delete 删除指定键值对
- clear 清空集合

```js
let m = new Map();
m.set('name','七娃')；
m.set({name:'七娃'},function(){}) // key和value都可以是任意类型
m.get('name')
m.delete('name')
m.clear()
```

### 16.Class 类

ES6的类class就是一个语法糖，能实现ES5的类各种功能，只是看起来更像一个面向对象编程的类。这种写法更接近于传统语言(java,c)。

```js
class 类名{
	constructor(参数){
		this.参数 = 参数
	}
	方法(){}
}
```

#### 构造函数

每个类都有自己的构造函数 constructor，但是也可以省略不写。

```js
class Phone{
	get name(){
		return 'zhangsan'
	}
	set name(){
	
	}
}
```

#### 静态成员

静态成员，通过 static 关键词定义静态成员。静态成员及方法**只能通过类获取，不能通过类实例化**对象获取。

```js
class Phone{
    // 静态属性
	static price = '5000'
	constructor(name){
		this.name = name
	}
    // 静态方法
    static change(){ } 
}
// 获取静态属性和方法
Phone.price
Phone.change()
```

#### 类继承

通过关键字 extends 继承父类属性和方法。

```js
class Phone{
	constructor(name){
		this.name = name
	}
	call(){
	 	console.log('打电话')
	}
}
// 子类继承
class xiaomi extends Phone{
	constructor(name,size){
		super(name)
		this.size = size
	}
	photo(){}
}
```

子类内方法名和父类方法名一致，就是方法重写。重写后子类方法生效，父类无效！

#### 类的getter和seter方法

类的getter,setter方法用于监听类属性读取和改变时

```js
class Phone{
	get name(){
		return 'zhangsan'
	}
	set name(){
	}
}
```

### 17.ES6数值扩展

#### Number.EPSILON-数值最小精度

Number.EPSILON属性值接近于 2.22044604...E-16 ，我们可以用它解决js精度丢失的问题。

```js
// 0.1+0.2 !== 0.3
function equal(a,b){
	if(Math.abs(a-b) < Number.EPSILON){
		return true
	}else{
		return false
	}
}
equal(0.1+0.2,0.3) // ture
```

####Number.isFinite-判断是否是有限数

```js
console.log(Number.isFinite(100)) // ture
console.log(Number.isFinite(10/3)) // false
```

#### Number.isNaN-判断数值是否是NaN

```js
Number.isNaN(3) // false
```

#### Number.parseInt 和Number.parseFloat

Number.parseInt 和es5的parseInt 是一样(都是将字符串转成整数），就是放到了Number对象下面。

```js
console.log(Number.parseInt('213123looosss')) // 213123 会截取到后面的字母，保留数值
console.log(Number.parseFloat('10.2looooos')) // 10.2
```

#### Number.isInteger - 判断是否是整数

```
Number.isInteger(3) // true
```

#### Math.truc - 抹掉小数部分

```
Math.trunc(3.5) //3
```

#### Math.sign - 判断数值是正数（1），负数（-1），还是0

```js
Math.sign(100) // 1
Math.sign(-100) // -1
Math.sign(0) // 0
```

### 18.ES6对象扩展

#### Object.is - 判断2个值是否完全相等

- 判断对象返回false

- 判断的值1负1正就返回false

```js
// NaN === NaN  false
Object.is(NaN,NaN) // true
```

#### Object.assign - 对象合并

对象合并时，如果属性重复，后面对象的属性会覆盖前面的属性。

```js
let obj = {
	name:'zhangsn'
}
let obj1 = {
	name:'zhangsn2',
	sex:'男'
}
let obj2 = Object.assign(obj,obj1)
```

####Object.setPrototypeOf - 设置对象的原型对象

setPrototypeOf 方法可以更改对象的原型对象，也可以理解为，在对象原型链之间插入一个原型。

```js
let school = {name:"hi"}
let city = {
	list:[’北京‘]
}
Object.setPrototypeOf(school,city) // school 的原型 指向了city
Object.getPrototypeOf(school) // 获取对象的原型 city
```

### 19.ES6模块化

模块化是将一个大工程文件拆分成许多小文件，然后由小文件组合起来。

**模块化优点：**

- 防止命名冲突
- 代码复用
- 高维护

**ES6之前模块化规范：**

- CommonJS  => nodejs
- AMD => requireJS
- CMD => seaJS

**ES6模块化语法**

模块功能主要有export和import构成。

```js
// m1.js 文件
export let school = "张三";
export function say(){}
```

使用的时候使用 import 导入。导入的时候可以用 as 取别名。

浏览器使用模块化需要在 script 上加 type="module"。

```js
<script type="module">
	import * as m1 from "./src/m1.js";
</script>
```

export暴露数据的方式：

```js
// 分别暴露
export let school = "张三";
export function say(){}
```

```js
// 统一暴露
let school = "张三";
function say(){}
export { school,say}
```

```js
// 默认暴露 - 使用时需要使用 .default.school 才能访问到
export default{ 
	school = "张三",
	say(){}
}
```

import导入数据的方式：

```js
// 通用导入
import * as m1 from "./src/m1.js";
```

```js
// 解构赋值
import { school, say} from "./src/m1.js";
import { school as school2, change} from "./src/m2.js"; // as 别名避免同名
import { default as m3} from "./src/m3.js"; // 默认暴露，可以把default直接给别名
```

```js
// 针对default默认暴露，可以直接简写
import m3 from "./src/m3.js"; // 默认暴露，export default {}
```

使用babel对ES6模块化代码转换步骤：

- 1. 安装node插件 babel-cli babel-preset-env browserify(打包工具) 

- 2. npx babel src/js -d dist/js
- 3. 打包 npx browserify dist/js/app.js -o dist/bundle.js

这样浏览器都可以支持bundle.js这个文件了。

## ES7 新特性

### 1.Array.includes - 是否包含某个元素

```js
const ss = [1,"2"]
ss.includes('2') // true
ss.includes(1) // false
```

### 2.幂运算**

ES7新增** 标识幂运算

```js
let c = 2 ** 10 // 1024
// 等效于
let d = Math.pow(2,10) // 1024
```

## ES8 新特性

### 1.async 和 await

异步编程解决方案：生成器，promise，async await

async 函数的返回值是一个promise对象，promise对象的解构由async函数执行返回值决定：

- 返回一个非promise对象，如字符串，那么async的返回promise对象的状态是成功，值是该字符串；如果抛出了异常，那么返回promise对象的状态是失败，值是异常报错。
- 返回promise对象，结果就是promise的结果。

**注意事项：**

- await 必须写在 async里面
- await 右侧表达式 一般是promise对象
- await 返回值是**promise的成功值**
- await的返回值失败就会抛异常，需要通过 try catch 捕获异常。

```js
// 发送ajax
function ajax(url){
	return new Promise((resolve,reject)=>{
		// 1.创建对象
		let x = new XMLHttpRequest();
		// 2.初始化
		x.open('GET',url);
		// 3.发送
		x.send();
		// 4.事件绑定
		x.onreadystatechange = function(){
			if(x.readyState === 4){
				if(x.status>= 200 && x.status <200){
					resolve(x.response)
				}else{
					reject(x.status)
				}
			}
		}
	})
}

// then 获取返回结果
ajax("http://api.tianqi.com/api").then(val=>{
    console.log(val)
},err=>{
    console.log(err)
})

// 使用await
async function main(){
   let res =  await ajax("http://api.tianqi.com/api"); // 只返回成功结果
} 
main()
```

### 2.ES8 对象方法扩展

#### Object.keys 和Object.values 

Object.keys 获取对象key的键值集合（数组）

Object.values 获取对象value值集合（数组）

```js
let obj = {
	name:"sss",
	age:19,
	sex:1
}
Object.keys(obj)  // ['name','age','sex']
Object.values(obj)  // ['sss',19,1]
```

#### Object.entries - 对象转成键值对的集合

Object.entries 用于创建Map，返回的是一个数组

```js
let obj = {
	name:"sss",
	age:19,
	sex:1
}
const m = new Map(Object.entries(obj))
```

#### Object.getOwnPropertyDescriptors - 获取对象所有属性的描述

Object.getOwnPropertyDescriptor**s**(obj) 获取对象所有属性的描述

Object.getOwnPropertyDescriptor(obj,'name') 获取对象的某个对象的属性描述

```js
let obj = {
	name:"sss",
	age:19,
	sex:1
}
Object.getOwnPropertyDescriptors(obj)
// age:{value: 19, writable: true, enumerable: true, configurable: true}
// name:{value: 'sss', writable: true, enumerable: true, configurable: true}
// sex:{value: 1, writable: true, enumerable: true, configurable: true}
```

声明对象描述：

```js
var obj = new Object();
Object.defineProperty(obj, 'name', {
    configurable: false,
    writable: true, // 是否可以被赋值
    enumerable: true, // 是否可枚举
    value: '李明'
})
```

## ES9 新特性

### 1.扩展运算符和rest参数

es6的...只能用在数组上，es9把这个用法扩展到了对象上。

```js
let obj = {
	name:'张三'
}
let obj2 = {
	sex:1
}
let obj3 = {
	age:19
}
// 使用扩展运算符合并对象
let ooo = {...obj,...obj2,...obj3}  // {name:'张三',sex:1,age:19}

main(ooo)
// rest 获取剩余参数，这里面的剩余参数会自动合并成一个对象
function main({a,...b}){
    
}
```

### 2.正则捕获分组

### 3.正则反向断言

根据内容的前后进行识别，从而获取需要的数据。

正向断言：通过需要的字符后面的字符获取前面的数据。语法：(?=所需字符后面的字符)

```js
let str = ’js2131231你是555啦啦啦'
// 目标获取555
const reg = /\d+(?=啦)/;
```

反向断言：通过需要的字符前面的字符获取后面所需的数据。语法：(?<=所需字符前面的字符)

```js
let str = ’js2131231你是555啦啦啦'
// 目标获取555
const reg = /(?<=是)\d+/;
```

## ES10 新特性

### 1.Object.fromEntries - 将二维数组或Map类型转成对象

```js
const res = Object.fromEntries([
	['name','zss'],
	['sex','19']
])
// {name: 'zss', sex: '19'}
```

Object.entries 是将对象转成二维数组(ES8)

```js
const res = Object.entries ({
	name:'shangsan'
})
// [['name','shangsan']]
```

### 2.trimStart与trimEnd

trimStart 去除左侧空白符

trimEnd 去除右侧空白符

### 3.flat - 将多维数组转低维数组

```js
let arr = [1,2,3,[4,5]]
arr.flat() // [1,2,3,4,5]

// 将多维转1维，需要给flat传参维度n-1
// 例如：将3维转1维
let arr = [1,2,3,[4,5,[6,7]]]
arr.flat(2) // [1,2,3,4,5,6,7]
```

flatMap是flat和map方法的结合，又降维又遍历。

### 4.Symbol.description - 获取Symbolde描述

Symbolde描述其实就是symbol的值。

```
let s = Symbol('张三')
s.description() // '张三'
```

## ES11 新特性

### 1.类的私有属性

私有属性只能在类里面定义和调用，外部不能调用。

```js
class Person{
	name;
	#age; // 私有属性
	#weight; // 私有属性
	constructor(name,age,weight){
		this.name = name;
		this.#age = age;
		this.#weight = weight;
	}
	init(){
		console.log(this.#age)
	}
}
let gir = new Person('lili',20,'120kg')
```

### 2.Promise.allSettled

Promise.allSettled([p1,p2]) 用于处理多个promise的返回结果，它永远是成功的，即便其中一个是失败的，但不影响其他的promise返回结果。

Promise.all 是所有的promise的返回结构都成功，才有返回成功，不然就失败。

### 3.可选链操作符

用 ?. 表示可选链操作符，应用场景：去深层级的属性

```js
function main(config){
	// 目标获取host属性
    // 传统写法 且短路写法
    let host = config && config.db && config.db.host;
    // 使用可选链操作符 
    let host2 = config?.db?.host;
}
main({
    db:{
        host:"20.32.18.95"
    }
})
```

### 4.动态导入import

ES6在文件头部import导入文件的方式被称作静态导入；ES11引入了动态导入的概念，在用的时候导入，并返回一个promise对象，导入成功，文件对象就是返回值。

```js
btn.onclick = function(){
	// 动态导入js模块
	import('./hello.js').then(module =>{
        // 导入成功的返回值module就是 动态文件抛出的对象
		module.hello()
	})
}
```

### 5.BigInt数据类型

ES11引入了新的数据类型BigInt，用于表示大整型的数字（不能是小数）

定义BigInt类型：

- 方式1：在数字后面+n ，类型变成 BigInt

```js
let n = 123n
```

- 方式2：使用BigInt定义

```js
let n = BigInt(123)
```

**应用场景：大数值运算。**

js支持最大的数值是 Number.MAX_SAFE_INTEGER - 9007199254740991 ，也就是说超过这个值进行运算就会失效，这时就需要使用BigInt。

```js
let max = Number.MAX_SAFE_INTEGER;
let cc = BigInt(max) + BigInt(2)
```

### 6.globalThis - 特殊变量

globalThis 永远指向 全局环境。浏览器永远指向 window对象。
