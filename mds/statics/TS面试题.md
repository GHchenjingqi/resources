### 1.什么是TypeScript？

TypeScript是微软公司为了弥补JS存在类型缺陷开源的一门语言。

它是JS的超集，支持最新的所有JS。

TS不能直接在各端运行，需要通过ts编译器或babel转成js后才能被浏览器等环境运行。

TS扩展了类，静态类型，接口，模块等功能。

**特性：**

- **跨平台**：TypeScript 编译器可以安装在任何操作系统上，包括 Windows、macOS 和 Linux。

- **ES6 特性**：TypeScript 包含计划中的 ECMAScript 2015 (ES6) 的大部分特性，例如箭头函数。

- **面向对象的语言**：TypeScript 提供所有标准的 OOP 功能，如类、接口和模块。

- **静态类型检查**：TypeScript 使用静态类型并帮助在编译时进行类型检查。因此，你可以在编写代码时发现编译时错误，而无需运行脚本。

- **可选的静态类型**：如果你习惯了 JavaScript 的动态类型，TypeScript 还允许可选的静态类型。

### 2.类型声明和类型推断的区别？

类型声明时显式为变量指定类型；

类型推断是变量不指定类型，直接赋值，TypeScript自动推断变量类型。

### 3.什么是联合类型和交叉类型？

联合类型是，多种类型满足一种。

交叉类型是，满足多种类型的所有特性。

### 4.枚举（enum）是什么，它的优势，应用案例。枚举和常量枚举的区别？

枚举是将变量所有能出现的值都一一枚举出来，一般常见的有数字枚举（数字枚举的值默认从0自增，可以修改，可以为空），字符串枚举（字符串枚举值不能为空）。

优势：增强代码可读性。

枚举和常量枚举的区别：枚举会被编译成对象，常量枚举编译后会被删除。

### 5.什么是类型断言？

类型断言，告诉编辑器变量类型按照某个类型执行。避免类型不一致报错的场景出现。

### 6.TypeScript中的可选参数和默认参数是什么？

TS的可选参数用：a?:string ，默认参数不在？号。

### 7.什么是类型守卫，有什么作用？

类型守卫是一种判断变量类型是否满足条件的检测方式。

类型守卫作用：让代码更安全和可靠。

```ts
interface Car {
  brand: string;
  model: string;
}

function isCar(obj: any): obj is Car {
  return obj && typeof obj.brand === 'string' && typeof obj.model === 'string';
}

function printCarInfo(obj: any) {
  if (isCar(obj)) {
    console.log(`Brand: ${obj.brand}, Model: ${obj.model}`);
  } else {
    console.log('Invalid car object.');
  }
}
```

### 8. const和readonly的区别?

const声明的常量一旦**赋值就不能被修改**。

readonly 关键字用于标记**类属性只读**，不能被修改。只能在声明时和构造函数内赋值。

### 9.TypeScript数据类型都有哪些？

**基本类型**：

- `number`: 表示数字，包括整数和浮点数。
- `string`: 表示文本字符串。
- `boolean`: 表示布尔值，即`true`或`false`。
- `null`、`undefined`: 分别表示null和undefined。
- `symbol`: 表示唯一的、不可变的值。

**复合类型**：

- `array`: 表示数组，可以使用`number[]`或`Array<number>`来声明其中元素的类型。
- `tuple`: 表示元组，用于表示固定数量和类型的数组。
- `enum`: 表示枚举类型，用于定义具名常量集合。

**对象类型**：

- `object`: 表示非原始类型，即除number、string、boolean、symbol、null或undefined之外的类型。
- `interface`: 用于描述对象的结构，并且可以重复使用。

**函数类型**：

- `function`: 表示函数类型。
- `void`: 表示函数没有返回值。
- `any`: 表示任意类型。

**高级类型**：

- `union types`: 表示一个值可以是几种类型之一。
- `intersection types`: 表示一个值同时拥有多种类型的特性。

### 10.interface可以给Function/Array/Class 做声明吗？

TypeScript中的`interface`可以被用来声明函数、数组和具有索引签名的类，从而帮助我们定义和限定这些数据结构的形式和行为。

```ts
// 1.声明函数
interface MyFunc {
  (x: number, y: number): number;
}

let myAdd: MyFunc = function(x, y) {
  return x + y;
};

// 2.声明数组
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Alice"];

// 3.声明类
interface StringDictionary {
  [index: string]: string;
}

let myDict: StringDictionary = {
  "name": "John",
  "age": "30"
};
```

### 11.TypeScript 中 any 类型的作用是什么，滥用会有什么后果?

any类型用来不确定变量的类型的时候使用，但是不推荐使用any类型，因为它有以下副作用：
- 存在潜在的运行类型错误（编译不报错）
- 代码可读性下降
- 污染后续使用该变量的函数和上下文

### 12.说说TypeScript中命名空间与模块的理解和区别？

命名空间，主要解决命名冲突的问题（重名问题），有了命名空间后，命名都在各自的空间内互不干扰。

模块，和ES的模块一样。每个模块都是单独的文件和上下文，抛出对象和函数需要用export，引入需要使用import。

### 13. TypeScript支持的类访问修饰符有哪些？

- 公共（public）-默认，类的所有成员，其子类以及该类的实例都可以访问。
- 受保护（protected），该类及其子类的所有成员都可以访问它们。 但是该类的实例无法访问。
- 私有（private），只有类的成员可以访问它们。
- 只读（readonly)，属性值只能读取，不能修改。

### 14.TypeScript中never和void的区别？

- void 表示没有任何类型（可以被赋值为 null 和 undefined）。
- never 表示一个不包含值的类型，即表示永远不存在的值。

### 15.TypeScript中any和unknown有什么区别？

any 类型的值执行操作之前，我们不必进行任何检查。

unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。

### 16.TypeScript中的泛型是什么？

泛型是值在定义函数，接口或类时，遇到参数或返回值类型不明确时，需要用泛型表示参数和返回值的类型。

### 17.type和interface区别和相同点？

**相同点**：

- 都可以给对象指定类型，都是为了简化复用对象结构。
- 都允许互相扩展extends

**不同点：**

- 接口interface 只能为对象指定类型；类型别名type 可以为任意类型指定别名。
- 接口之间可以继承，类型别名不可以。
- 同名接口属性可以合并，类型别名type不能。

- 写法不同。接口写法类似定义类；类型别名类似 定义对象需要用到=号。

 接口写法：

```ts
interface IPer {
	name:string,
	age:number
}
```

类型别名写法：

```ts
type IPer = {
	name:string,
	age:number
}
```

###  18.Omit 类型有什么作用？

Omit 以一个类型为基础支持**删除某些属性，然后返回一个新类型**。

```ts
interface Todo {
  title: string
  description: string
  completed: boolean
  createdAt: number
}
type TodoPreview = Omit<Todo, "description">
```

### 19.TypeScript中什么是装饰器？

装饰器（Decorator）是TypeScript提供的一个高级语法，它类似于一种特殊类型的声明，可以附加到类声明，方法，访问符，属性或参数上。

装饰器主要以函数的形式出现，运行在编译阶段，以实现对所修饰对象的行为的修改或增强。

**装饰器分为：**

- 类装饰器： 可以观察、修改、或替换类定义。它在提供元编程能力方面特别有用，能够实现诸如依赖注入等高级概念。
- 方法装饰器： 可以监视、修改或者替换类的方法定义。这对于日志记录、性能监控、以及某些应用程序级别的业务逻辑（如记录操作者信息）有巨大的用处。
- 属性装饰器： 可以监视、修改或替换类的属性定义。比如实现类型检查，或者实现相关get/set方法等。
- 参数装饰器： 对类方法中的参数进行注解。
- 访问器装饰器: 用于装饰类的访问器，即类中的get与set方法。

**装饰器用法：**

谁使用就放到谁前面：@装饰器

```ts
// 定义装饰器
function LogClass(target: Function) {
  console.log(`New instance of ${target.name} class created.`);
}

// 定义装饰器
function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`Method ${propertyKey} of class ${target.constructor.name} is called.`);
}

// 使用装饰器修饰类
@LogClass
class MyClass {
  constructor() {
    console.log("This is MyClass constructor");
  }
  // 使用装饰器修饰方法
  @LogMethod
  myMethod() {
    console.log("This is myMethod");
  }
}
```

**开启装饰器：**

在 **`tsconfig.json`** 文件中，有一个叫 **`experimentalDecorators`** 的属性，你需要将其设置为 **`true`** 。没有正式发布，需要手动开启装饰器。

```json
{
    "compilerOptions": {
        "target": "es5",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

### 20.TypeScript中什么是函数重载？

函数重载是指**函数根据传入不同的参数，返回不同类型的数据**。

同一个函数名，根据参数及返回值的不同声明多次，但是实现只有最下面的一次。调用的时候编辑器会提示该函数的多种用法。

**注意：JS不能实现函数重载，同名函数后面的会覆盖前面的函数。**

```ts
// 上边是声明
function add (arg1: string, arg2: string): string
function add (arg1: number, arg2: number): number
// 因为我们在下边有具体函数的实现，所以这里并不需要添加 declare 关键字

// 下边是实现
function add (arg1: string | number, arg2: string | number) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    return arg1 + arg2
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2
  }
}
```

### 21.keyof和typeof关键字的作用？

- **keyof 索引类型查询操作符**： 获取索引类型的属性名，最后构成联合类型。
- **typeof**： 获取一个变量或对象的类型。



### 22.declare有什么用？

declare是用来定义全局变量、全局函数、全局命名空间。

declare global为全局对象window增加新的属性。

```ts
declare global { 
   interface Window { 
        csrf: string; 
   }
}
```

在TS项目中引入第三方库，或图片，css等文件，如果找不到就需要用到 declare定义成全局变量。
