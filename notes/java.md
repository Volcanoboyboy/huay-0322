# Java

## Java基础

- ### 基本数据类型

  基本数据类型是CPU可以直接进行运算的类型。Java定义了以下几种基本数据类型：

  - 整数类型：byte，short，int，long
  - 浮点数类型：float，double
  - 字符类型：char
  - 布尔类型：boolean

- ### 引用类型

  除了上述基本类型的变量，剩下的都是引用类型。例如，引用类型最常用的就是`String`字符串：

  ```
  String s = "hello";
  ```

  引用类型的变量类似于C语言的指针，它内部存储一个“地址”，指向某个对象在内存的位置，后续我们介绍类的概念时会详细讨论。

  ### 常量

  定义变量的时候，如果加上`final`修饰符，这个变量就变成了常量：

- **运算**

  - 特别注意：整数的除法对于除数为0时运行时将报错，但编译不会报错。

  - ### 溢出

    要特别注意，整数由于存在范围限制，如果计算结果超出了范围，就会产生溢出，而溢出*不会出错*，却会得到一个奇怪的结果：

- ### 类型自动提升与强制转型

  在运算过程中，如果参与运算的两个数类型不一致，那么计算结果为较大类型的整型。例如，`short`和`int`计算，结果总是`int`，原因是`short`首先自动被转型为`int`：

  ```java
  // 类型自动提升与强制转型 
  public class Main {
      public static void main(String[] args) {
          short s = 1234;
          int i = 123456;
          int x = s + i; // s自动转型为int
          short y = s + i; // 编译错误!
      }
  }
  ```

  

- **浮点数运算**

  - 浮点数常常无法精确表示，因此，浮点数运算会产生误差：（**但是，`0.5`这个浮点数又可以精确地表示。**）

    ```java
    public class Main {
        public static void main(String[] args) {
            double x = 1.0 / 10;
            double y = 1 - 9.0 / 10;
            // 观察x和y是否相等:
            System.out.println(x);
            System.out.println(y);
        }
    }
    ```

    正确的比较方法是判断两个浮点数之差的绝对值是否小于一个很小的数：

    ```java
    // 比较x和y是否相等，先计算其差的绝对值:
    double r = Math.abs(x - y);
    // 再判断绝对值是否足够小:
    if (r < 0.00001) {
        // 可以认为相等
    } else {
        // 不相等
    }
    ```

    如果要进行四舍五入，可以对浮点数加上0.5再强制转型：

    ```java
    // 四舍五入 
    public class Main {
        public static void main(String[] args) {
            double d = 2.6;
            int n = (int) (d + 0.5);
            System.out.println(n);
        }
    }
    ```

    **隐式转换** 如果用`+`连接字符串和其他数据类型，会将其他数据类型先自动转型为字符串，再连接：

    ```java
    // 字符串连接
    public class Main {
        public static void main(String[] args) {
            int age = 25;
            String s = "age is " + age;
            System.out.println(s);
        }
    }
    ```

    

- **数组**

  定义一个数组类型的变量，使用数组类型“类型[]”，例如，`int[]`。和单个基本类型变量不同，数组变量初始化必须使用`new int[5]`表示创建一个可容纳5个`int`元素的数组。

  ```java
          // 5位同学的成绩:
          int[] ns = new int[5];
          ns[0] = 68;
          ns[1] = 79;
          ns[2] = 91;
          ns[3] = 85;
          ns[4] = 62;
  ```

  Java的数组有几个特点：

  - 数组所有元素初始化为默认值，整型都是`0`，浮点型是`0.0`，布尔型是`false`；
  - 数组一旦创建后，大小就不可改变。







