## Scanner类的使用

```java
package test.app.ScannerDemo; // 包名
// 1.导入Scanner依赖
import java.util.Scanner;

// 创建类入口与包名一致
public class ScannerDemo {
    public static void main(String[] args) {
    	// 2.实例化Scanner对象
        Scanner sc = new Scanner(System.in);
        // 控制台输出
        System.out.println("请输入：");
        // 3.获取控制台输入的值
        int number1 = sc.nextInt();
        System.out.println("您输入了："+number1);
        System.out.println("请继续输入：");
        // 4.获取控制台输入的值
        int number2 = sc.nextInt();
        System.out.println("您输入了："+number2);
    }
}
```

