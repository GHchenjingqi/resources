## java基础知识

### 1.java数据类型

```
1.基本类型 8个：数字（整数，小数），字符，布尔
   整数：byte( -2^8 ~ 2^8-1 ),short( -2^15 ~ 2^15-1 ) ,int( -2^31 ~ 2^31-1 ) ,long( -2^64 ~ 2^64-1 )
   小数：float,double
   字符: char
   布尔: boolean
2.引用类型 无限个（可以自定义
   []数组
   class 类
   interface 接口
   enum 枚举
   @interface 注解
```

java 判断数据类型使用 instanceof 。

```java
String str = "hi java";
System.out.println(str instanceof String);
```

### 2.运算类型转换

- 隐式转换: 由小到大

* 强制转换: 由大到小

数字类型由小到大排序： byte < short < char < int < long < float < double

数字类型运算时，由小变大不报错，由大变小会报错（需要强转类型）！

**隐式：**

```java
byte a1 = 10;
byte a2 = 10;
// 隐式结果输出是 int类型
System.out.println(a1 + a2);
```

**强制转换：**

```java
int aaa = 10;
byte bbb = 20;
// 需要在右侧表达式前 限定值类型  (byte)
byte ccc = (byte)( aaa + bbb) ;
```

**字符串运算：**

char + 数字/字符时，会把字符 转为asc11码值 再进行相加。

```java
char aa = 'a';
int bb = 3;
// aa 对应asc码值：97，最后隐式转换为 int类型，输出100
System.out.println(aa + bb); 
```

### 3.类实例化方法

```java
package test.app.varber2;

public class VarF {
    String name = "zhangSans";
    // 实例化方法
    public void logName(){
        System.out.println(this.name);
    }
    public static void main(String[] args) {
    	// 实例化对象
        VarF log = new VarF();
        // 调用对象
        log.logName();
    }
}
```

实例化方法传参

```java
package test.app.varber2;

public class VarF {
    String Name = "zhangSans";
    public void logName(String name){
        Name = name;
        System.out.println(Name);
    }
    public static void main(String[] args) {
        VarF log = new VarF();
        // 传参
        log.logName("LiSan");
    }
}
```

### 4.修饰符使用

#### 访问修饰符

- public  公有的（默认修饰符），对所有类可见。
- private  私有的，同一类内可见。
- protected  受保护的，同包内的类和所有子类可见。

定义变量的隐式声明：public static final ，默认方法访问权限是 public  。

**访问控制和继承**

- 父类中声明为 public 的方法在子类中也必须为 public。
- 父类中声明为 protected 的方法在子类中要么声明为 protected，要么声明为 public。不能声明为 private。
- 父类中声明为 private 的方法，不能够被继承。

```java
class AudioPlayer {
   protected boolean openSpeaker(Speaker sp) {
      // 实现细节
   }
}

class StreamingAudioPlayer extends AudioPlayer {
   boolean openSpeaker(Speaker sp) {
      // 实现细节:父类protected 方法，继承子类修饰符不能为 private
   }
}
```

#### 非访问修饰符

- static 修饰符，用来创建类方法和类变量。

- final 修饰符，用来修饰类、方法和变量，**final 修饰的类不能够被继承，修饰的方法不能被继承类重新定义，修饰的变量为常量，是不可修改的**。

- abstract 修饰符，用来创建抽象类和抽象方法。一个类不能同时被 abstract 和 final 修饰。

- synchronized 和 volatile 修饰符，主要用于线程的编程。

### 5.对象和类

java中的对象是一个个的功能模块，可以相互调用。

#### 变量

变量类型由局部变量、实例变量、类变量。

- 局部变量：类方法中的变量。
- 实例变量：独立于方法之外的变量，不过没有 static 修饰。
- 类变量：独立于方法之外的变量，用 static 修饰。

```java
public class Variable{
    static int allClicks=0;    // 类变量/静态变量

    String str="hello world";  // 实例变量
 
    public void method(){
        int i =0;  // 局部变量
    }
}
```

**static 静态属性和方法**

在类里面使用关键字 static定义静态属性和方法。

#### 构造函数

每个类都有构造方法。构造方法的名称必须与类同名，如果没有java编译器会自动提供一个默认的构造方法。

```java
public class Puppy{
   public Puppy(String name){
      // 这个构造器仅有一个参数：name
   }
}
```

#### 创建对象

对象是类的实例化，通过关键字new实现。创建对象需要三步：

- **声明**：声明一个对象，包括对象名称和对象类型。
- **实例化**：使用关键字 `new` 来创建一个对象。
- **初始化**：使用 `new` 创建对象时，会调用构造方法初始化对象。

```java
public class Puppy{
   public Puppy(String name){
      //这个构造器仅有一个参数：name
      System.out.println("Puppy Name is :" + name ); 
   }
   public static void main(String []args){
      // 下面的语句将创建一个Puppy对象
      Puppy myPuppy = new Puppy( "tommy" );
   }
}
```

### 6.循环结构

java的循环结构有3种：

- while循环
- do…while循环
- for循环



**while循环**

只要满足条件就一直循环：

```java
package test.app.doIt;

public class doit {
    public static void add(){
        int n = 0;
        int s = 0;
        while (n<10){
            n++;
            s= s+n;
        }
        System.out.println("求和结果："+s);
    }
    public static void main(String[] args) {
        doit ss = new doit();
        doit.add();
    }
}

```

**do...while循环**

先执行一次，后判断，满足条件继续执行，直到不满足条件。

```java
public static void dowhilefn(){
    int n = 0;
    int s = 0;
    do{
        n++;
        s= s+n;
    }while (n<10);
    System.out.println("求和结果："+s);
}
```

**for循环**

```java
public static void forfn(){
    int s = 0;
    int i = 0;
    for ( i =0;i<=10;i++){
        s = s + i;
    }
    System.out.println("求和结果："+s);
}
```

**数组增强for循环**

Java5引入了一种主要用于数组的增强型for循环。语法如下：

```java
for(类型 item : arrays){
}
```

```java
public static void  forArr(){
    // 定义数组
    int [] numbers = {10,20,25,40};
    int s=0;
    for (int item : numbers){
        s = s + item;
    }
    System.out.println("求和结果："+s);
}
```

**break关键字**

break用于在循环语句和switch语句中，跳出循环。

**continue关键字**

continue关键字用于循环语句中，结束本次循环，继续下一次循环。

### 7.条件语句

Java有两种分支结构：

- if语句
- switch语句

```java
switch(expression){
    case value :
       //语句
       break; //可选
    case value :
       //语句
       break; //可选
    //你可以有任意数量的case语句
    default : //可选
       //语句
}
```

### 8.数组结构

定义数组有2种方式，【】可以放到变量名前后，首选放到类型和变量之间。

```java
double[] myList;         // 首选的方法
或
double myList[];         //  效果相同，但不是首选方法
```

创建数组有两种方式：

- dataType[] arrayRefVar = new dataType[arraySize] 

    ```java
    int data[] = new int[3]; /*开辟了一个长度为3的数组*/
    data[0] = 10; // 第一个元素
    data[1] = 20; // 第二个元素
    data[2] = 30; // 第三个元素
    ```

- dataType[] arrayRefVar = {value0, value1, ..., valuek} 

    ```java
    int[] myList = {10, 20, 30};
    ```



**Arrays数组操作方法**

- 给数组赋值：通过 fill 方法。

```java
int[] ints = new int[5];//定义一个一维数组，含有五个数，默认值为0
Arrays.fill(ints,8);//替换数组的元素，值为8
```

- 对数组排序：通过 sort 方法,按升序。

```java
int [] numbers = {100,10,20,25,40};
Arrays.sort(numbers);
System.out.println(Arrays.toString(numbers) );
```

- 比较数组：通过 equals 方法比较数组中元素值是否相等。

```java
int [] numbers = {100,10,20,25,40};
int [] numbers2 = {100,10,20,25,40};
System.out.println(Arrays.equals(numbers, numbers2)); // true
```

- 查找数组元素：通过 binarySearch 方法能对排序好的数组进行二分查找法操作。

```java
int [] numbers = {100,10,20,25,40};
int index = Arrays.binarySearch(numbers,20);// 2
```

### 9.String类

**创建字符串**

```java
String str = "hi java";
String str2 = new String("hahhah");
```

获取字符串长度 length方法

```
str2.length();
```

拼接字符串 a.concat(b)

```java
String str = "hi java";
String str2 = new String("还可以！");
String str1 = str.concat(str2);
```

其他方法：

- trim()  去除首尾空格
- toUpperCase()  转换为大写
- toLowerCase()  转换为小写
- valueOf()  删除头尾空白符的字符串
- toString()  返回此对象本身
- toCharArray()  将字符串转换为字符数组
- substring(start,end)  字符串切片
- startsWith() 用于检测字符串是否以指定的前缀开始，返回布尔值
- split() 拆分字符串
- replace(old,new) 返回替换后的新字符串
- replaceAll(reg,new) 替换所有匹配的字符串
- 

### 10.charactor类

 Character 类是Java 语言为内置数据类型 char 提供了包装类。

创建一个 Character 类：

```java
Character ch = new Character('a');
```

其他方法：

- isLetter()   是否是一个字母
- isDigit()  是否是一个数字字符
- isWhitespace()  是否一个空格
- isUpperCase()  是否是大写字母
- isLowerCase()  是否是小写字母
- toUpperCase()  指定字母的大写形式
- toLowerCase()  指定字母的小写形式
- toString()  返回字符的字符串形式，字符串的长度仅为1
