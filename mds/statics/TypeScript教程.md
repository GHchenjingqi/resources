## 介绍
TS 是 JavaScript 的一个超集（是对JS的增强，支持所有JS的特性），在JS基础上添加了静态类型系统。

简单来说，**<font style="color:#DF2A3F;">TypeScript = JavaScript + 静态类型 + 其他新特性。</font>**

## 安装
```bash
npm i -g typescript
```

创建ts文件就可以使用了 index.ts

```javascript
console.log('TS IS RUN')
```

控制台或终端运行ts文件

```bash
tsc index.ts
```





## 优势
+ 便于发现问题，节省修复异常的时间；
+ 增强代码提示，增强开发体验；
+ 提高了代码的可维护性，重构更加简单；
+ 完全支持JS最新语法。

## 静态类型
TypeScript 通过 TypeScript 编译器或 Babel 转译为 JavaScript 代码。Typescript 是JavaScript的超集，是**微软**对js的升级，弥补了js弱类型的缺陷，因此**TypeScript是一种强类型语言**。

**类型注解，为变量添加类型约束！** 变量后跟 “: 类型” ，这种写法就叫 类型注解。

### 1.数值类型 number
与JavaScript一样，所有的数字在TypeScript中都是**浮点数**。

```typescript
let num: number = 5;
```

### 2.布尔类型 boolean
boolean类型只可能是两种值。它们分别是true和false。

```typescript
let bool: boolean = true;
```

### 3.字符串类型 string
使用字符串是将它们放在单引号或者双引号中间。

```typescript
let str: string = "Hello, TypeScript";
```

### 4.数组类型 array
array类型的声明有两种写法。

第一种在数组元素的类型后面跟着[];

第二种是使用泛型数组类型Array。

```typescript
let arr: number[] = [1, 2, 3];
let arr1: string[];
let arr2: array<number> = [1, 2, 3];
let arr3: array<any> = [1, "123", 3]; // 任意类型数组
let arr4: (number | string)[] = [1,'222']; // 联合类型数组，需要用括号包起来
```

类型别名，当一个复杂类型重复使用时，就可以使用类型别名简化类型。类型别名需要用 **type** 关键字声明。

```plain
type ass = (number | string)[];
let arr4:ass = ['aaa',3,'1']
```



### 5.元组 tuple
元组tuple就是固定长度的数组，明确指定数组包含多少个元素，比如坐标元素。

```typescript
let job:[string,string] = ['送外卖','送快递']
```

### 6.空类型 void
void空类型一般用于函数无返回结果的场景。

```typescript
function fn(a:number):void{
    console.log(a)
}
```

### 7.枚举类型 enum
enum枚举类型用于一些常量集合。数字枚举成员的值默认是从0自增的，当然也可以自定义值。字符串枚举每个对象都必须有值，数字枚举可以部分有值。

```typescript
enum Direction  {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3
};

// 枚举属性值未赋值会从0递增
enum Direction  {
  Up,//0
  Down,//1
  Left,//2
  Right//3
};
// 字符串枚举
enum Direction  {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right'
};
```

### 8.任意类型 any
any类型可以表示任意JavaScript值。**不推荐使用**，原因是在赋值和使用任意类型变量时会导致相关的变量均污染成任意类型，失去了TS类型语言的意义。

### 9.未知类型 unknown
unknown未知类型和any任意类型很接近，但是使用未知类型会类型报错，这时解决办法就是使用类型断言。

#### TS的类型断言有2种写法：关键字as || <类型>值
```typescript
let e:unknown = 10;
let s:string = "hi";
// s = e  直接赋值就会类型报错
s = e as string
s = <string>e

// 不断言就无法获取到a元素的类型，获取href就会报不存在
let alink = document.getElementByID('link') as HTMLAnchorElement
// HTMLAnchorElement 可以通过控制台 console.dir 打印改元素
```

TS除了类型断言，还有非空断言：! -当使用非空断言的时候就是表示告诉编辑器该变量不会为空。

```javascript
let msg = 'hi' + name!;
```

### 10.永远不会有返回值类型 never
never一般用于报错函数的返回值类型：永远不会有返回值类型

```typescript
function fn():never{
    throw new Error('失败了！')
}
```

### 11.字面量类型
字面量类型直接理解为限制的值，可与联合类型使用

```typescript
let sex:'男' | '女' | '未知'   // sex 的值只能是男，女，和未知，其他都会报错
sex = '女'
```

### 12.对象 object
TS里面定义对象通过 **{}** 进行对象属性类型声明，多个属性可以用 “；”或“，”分割。可选属性通过 ’**?**‘  表示；多个未知任意属性通过 **[xx:string]:any** 表示。

也可以用**type**先描述一个对象结构，再使用这个结构类型限制对象。

```typescript
let obj1:{name:string; age?:number} = {name:'张三'}
let obj2:{name:string, age?:number, [propname:string]:any} = {name:'张三',sex:1};

// type 描述一个对象的类型
type mytype ={
    name:string,
    age:number
}
let obj3:mytype = {
    name:'张三',
    age:40
}
```

### 13.函数表达式类型
TS也可以在定义函数之前先声明函**数参数及返回值**的类型

```typescript
let add:(a:number,b:number)=>number;
add = function(a,b):number{
    return a+b;
}
```

### 14.接口类型 interface
接口用来定义一个类结构，用来定义类应该包含哪些属性和方法。同时，接口也可以当初类声明去使用，同type描述对象属性类型结构。也是简化重复使用的对象类型。

接口只定义对象的结构，不关心实际值。

用interface定义同一个接口名，里面属性不同，等效与属性组合在一起（合并）。

```typescript
interface myobj{
    name:string,
    age:number
}
interface myobj{
    sex:number
}

let obj:myobj = {
    name:"aaa",
    age:100,
    sex:1
}
// 接口便于对象结构的复用
let obj2:myobj;
```

接口第二个用法就是：**继承接口，实现一个类**。需要使用 **interface** 和 **implements** 关键字。接口就是用来 **定义类的规范**。

```typescript
// 声明类结构及方法
interface myint{
    name:string;
    say():void;
}

class myclass implements myint{
    name:string;
    // 需要增加一个构造函数定义初始属性
    constructor(name:string){
        this.name = name;
    }
    say(){
        console.log(this.name)
    }
}
```

**接口继承，可以用extends 关键字实现接口继承。*_两个接口有_公共的属性*就可以把公共的作为父类接口，其他属性通过子类继承实现。

```typescript
interface Mypoint{
    x:number;
    y:number;
}
// 继承父类接口的所有属性，也可以新增子类自己的属性
interface Point3D extends Mypoint{
    z:number
}

```



### 15.泛型 Generics
泛型是值在定义**函数，接口或类**时，遇到参数或返回值类型不明确时，需要用泛型表示参数和返回值的类型。

定义时不确定类型，在函数调用执行时，才明确数据类型。

泛型类型：由于是未知，因此可以用任意变量代替。一般常用T,K,U等作为泛型函数、类、接口的类型。

泛型函数：

```typescript
function fn<T>(a:T):T{
    return a
}

let res1 = fn(10) // 返回结果是数字
let res2 = fn('hi') // 返回值是字符串
```

泛型函数的也参数值可以是多个：

```typescript
function fn<T,K>(a:T,b:K):T{
    console.log(b);
    return a;
}

let res1 = fn(10,'hi ts') // 返回结果是数字
```

泛型接口：

```typescript
interface FnInter{
 	<T>(arg: T): T
}
let Fn: FnInter = fn

// 或
interface FnInter<T>{
 (arg:T): T
}
let Fn: FnInter<string> = fn
```

泛型约束：通过接口+extends 实现泛型约束。

```typescript
// 约束参数必须是带length属性的
interface Inter{
    length:number
}
function fn<T extends Inter>(a:T): number{
    return a.length;
}
```

泛型类：类里面使用泛型。

```typescript
class myclass<T>{
    name:T;
    constructor(name:T){
        this.name = name
    }
}
// 泛型由传进去的参数决定
const m = new myclass('hi')
```

### 16.联合类型
联合类型表示变量的类型不固定，是多种类型。用 “|” 分割多个类型。

```typescript
let a: string | number | string[];
```

### 17.交叉类型
交叉类型也是多个类型，使用 “&” 分割多个类型，表示同时满足所有类型特性。

```typescript
type Person = {
  name: string;
  age: number;
};
 
type Employee = {
  companyId: string;
  role: string;
};
 
type PersonEmployee = Person & Employee;
 
const personEmployee: PersonEmployee = {
  name: "Alice",
  age: 30,
  companyId: "ABC123",
  role: "Manager"
};
```

### 18.工具类型
TS内置很多工具类型，例如：

```plain
- Parameters<Type> 获取函数的参数类型，将每个参数类型放进一个元组中。
- ReturnType<Type> 获取函数的返回值类型。
- Awaited<Type> 获取`Promise`中的结果类型
- NonNullable<Type> 去除类型中的null,和undefined
- Omit<Type, Keys> 移除一些属性, 用Omit<T, K>从T中取出除去K的，返回剩余的属性类型。
- Pick<Type, Keys> 从Type中选取一系列的属性, 用Pick, 构成新的类型。
- Required<Type> 将类型的所有属性变为必选。
- Partial<Type> 将类型的所有属性变为可选。
- Readonly<Type> 将数组或对象的属性值转换为只读的。
- Record<Type> 将对象所有属性都转换成指定类型。
```

## 对象-类Class
万物皆对象，面向对象编程。

### 定义类
对象主要包含 属性和方法。

```plain
class 类名{
    属性名: 类型;
    constructor(参数:类型){
        this.属性名 = 参数;
    }
    方法名(){
        ...
    }
}
```

例如实现一个人的对象。

```plain
class Person{
    // 实例化属性
    name: string;
    age: number;
    // 静态属性
    static sex：string = '男'
    // 构造函数
    constructor(name: string){
        this.name = name;
    }
    sayHi(){
    
    }
    // 静态方法
    static say(){
    
    }
}
```

静态属性和静态方法必须使用类获取，不能通过实例化方式获取。静态属性不可修改。

```plain
Person.sex;
Person.say();
```

默认实例化属性和实例化方法需要先实例化，再调用。

```plain
let per = new Person();
per.name;
per.sayHi();
```

### 构造函数constructor
每个对象都有一个constructor构造函数，用于初始化对象。

### this指向
类里面的this指向当前实例化的对象。

### 类继承
类的继承通过关键字：extends 实现继承。子类继承父类的所有属性和方法。子类方法与父类方法同名，子类方法会重写改方法（子类方法生效）。

```plain
class 子类 extends 父类{ }

class Male extends Person{ 
    sex:string;
    constructor(sex: string){
        super();
        this.sex = sex;
    }
}
```

子类通过关键字：super 继承父类的所有属性，同事可以在子类构造函数里新增自己的属性。

### 抽象类与抽象方法
抽象类和抽象方法通过关键字：abstract 实现。在类前面就是抽象类，抽象方法必须在抽象类里面。

```plain
abstract class Person{
    name:string;
    constructor(name: string){
        this.name = name;
    }
    // 抽象方法
    abstract say(){
    
    }
}
```

## **<font style="color:rgb(38, 38, 38);">tsconfig.json</font>**
tsconfig.json是ts编译器的配置文件，可以指定不同的选项来告诉编译器如何编译当前项目。

tsconfig.json文件所处位置是TypeScript项目的根目录。

参数如下：  

+ include : 用来指定哪些文件需要被编译
+ exclude : 用来指定哪些文件不需要被编译 ：默认node_module
+ extends : 用来指定继承的配置文件
+ files   : 用来指定被编译的文件列表，只有编译少量文件才使用
+ compilerOptions : 编译器的选项是配置文件中非常重要也是非常复杂的配置选项

```json
{
  "exclude": [
    "node_module"
  ],
   "include": [
     "./src/**/*"    //**表示任意目录，*表示任意文件
  ],
  "files": [
    "index.ts",
  ],
  compilerOptions:{
     "target": "ES2020", // 指定 ES 版本 ESNext : 最新版。 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ESNext'
     "module": "ESNext", // 指定模块化的规范。可选的有commonjs,amd,system,es6,es2015,es2020
     "lib": "", // 指定项目中所需要使用的库,一般不使用，如果为空则默认不不使用任何的库。
     "outDir": "./dist", // 指定编译后的js文件所在的目录
     "allowJs": false, // 是否对js文件进行编译，默认是false
     "checkJs": false, // 检查js代码是否符合语法规范，默认为false
     "removeComments": false, // 否移除注释信息，默认为false,
     "strict": false,  // 所有的严格检查的总开关，默认false
     "noImplicitAny": false, // 不允许隐式的any，默认false(允许)
     "noImplicitThis": false, // 不允许隐式的this，默认false(允许)
     "strictNullChecks": true, // 是否严格的检查空值，默认false 检查有可能为null的地方
     "strictBindCallApply":false,  // 是否严格检查bind、call和apply的参数列表，默认false  检查是否有多余参数
     "strictFunctionTypes":false, // 是否严格检查函数的类型，
     "strictPropertyInitialization":false, // 是否严格检查属性是否初始化，默认false
     "noFallthroughCasesInSwitch":false,// 是否检查switch语句包含正确的break，默认false
     "noImplicitReturns":false,  // 检查函数没有隐式的返回值，默认false
     "noUnusedLocals":false, // 是否检查检查未使用的局部变量，默认false
     "noUnusedParameters":false, // 是否检查未使用的参数，默认false
     ...
  },
}
```

## 
