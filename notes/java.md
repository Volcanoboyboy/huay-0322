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



- **条件控制**

  要判断引用类型的变量内容是否相等，必须使用`equals()`方法：

  ```java
  public class Main {
      public static void main(String[] args) {
          String s1 = "hello";
          String s2 = "HELLO".toLowerCase();
          System.out.println(s1);
          System.out.println(s2);
          if (s1.equals(s2)) {
              System.out.println("s1 equals s2");
          } else {
              System.out.println("s1 not equals s2");
          }
      }
  }
  ```

- ### for each循环

  `for`循环经常用来遍历数组，因为通过计数器可以根据索引来访问数组的每个元素：

```java
public class Main {
    public static void main(String[] args) {
        int[] ns = { 1, 4, 9, 16, 25 };
        for (int n : ns) {
            System.out.println(n);
        }
    }
}
// 除了数组外，`for each`循环能够遍历所有“可迭代”的数据类型，包括后面会介绍的`List`、`Map`等。
```



## 面向对象编程

### 面向对象编程

- ### this变量

  在方法内部，可以使用一个隐含的变量`this`，它始终指向当前实例。因此，通过`this.field`就可以访问当前实例的字段。

  如果没有命名冲突，可以省略`this`。例如：

  ```java
  class Person {
      private String name;
  
      public String getName() {
          return name; // 相当于this.name
      }
  }
  ```

- **构造方法**
  由于构造方法是如此特殊，所以构造方法的名称就是类名。构造方法的参数没有限制，在方法内部，也可以编写任意语句。但是，和普通方法相比，构造方法没有返回值（也没有`void`），调用构造方法，必须用`new`操作符。

  ```java
  public class Main {
      public static void main(String[] args) {
          Person p = new Person("Xiao Ming", 15);
      }
  }
  
  class Person {
      private String name;
      private int age;
  	// 如果一个类没有定义构造方法，编译器会自动为我们生成一个默认构造方法
      // 如果我们自定义了一个构造方法，那么，编译器就不再自动创建默认构造方法
      // 又想保留不带参数的构造方法，那么只能把两个构造方法都定义出来
      /**
      	public Person() {
      	}
      	
      	public Person(String name, int age) {
          	this.name = name;
          	this.age = age;
      	}
      */
      public Person(String name, int age) {
          this.name = name;
          this.age = age;
      }
      // 一个构造方法可以调用其他构造方法，这样做的目的是便于代码复用。调用其他构造方法的语法是this(…)
      
      public Person(String name) {
          this(name, 18); // 调用另一个构造方法Person(String, int)
      }
      
  }
  // 注意 没有在构造方法中初始化字段时，引用类型的字段默认是null，数值类型的字段用默认值，int类型默认值是0，布尔类型默认值是false
  
  
  ```

  

- **继承 Java使用`extends`关键字来实现继承**：

  ```java
  class Person {
      private String name;
      private int age;
  
      public String getName() {...}
      public void setName(String name) {...}
      public int getAge() {...}
      public void setAge(int age) {...}
  }
  
  class Student extends Person {
      // 不要重复name和age字段/方法,
      // 只需要定义新增score字段/方法:
      private int score
  
      public int getScore() { … }
      public void setScore(int score) { … }
  }
  ```

  可见，通过继承，`Student`只需要编写额外的功能，不再需要重复代码。

   注意：**子类自动获得了父类的所有字段，严禁定义与父类重名的字段！**

- **Override和Overload不同的是**，如果方法签名不同，就是Overload，Overload方法是一个新方法；如果方法签名相同，并且返回值也相同，就是`Override`。

   注意：方法名相同，方法参数相同，但方法返回值不同，也是不同的方法。在Java程序中，出现这种情况，编译器会报错。

- ### 多态

  多态是指，针对某个类型的方法调用，其真正执行的方法取决于运行时期实际类型的方法

- **静态字段和静态方法**

  对于静态字段，无论修改哪个实例的静态字段，效果都是一样的：所有实例的静态字段都被修改了，原因是静态字段并不属于实例：

  - 调用实例方法必须通过一个实例变量，而调用静态方法则不需要实例变量，通过类名就可以调用。因为静态方法属于`class`而不属于实例，因此，静态方法内部，无法访问`this`变量，也无法访问实例字段，它只能访问静态字段

- **在Java虚拟机执行的时候，JVM只看完整类名，因此，只要包名不同，类就不同**。

  包可以是多层结构，用`.`隔开。例如：`java.util`。

   **要特别注意：包没有父子关系。java.util和java.util.zip是不同的包，两者没有任何继承关系**。

- ### import

  在一个`class`中，我们总会引用其他的`class`。例如，小明的`ming.Person`类，如果要引用小军的`mr.jun.Arrays`类，他有三种写法：

  第一种，直接写出完整类名，例如：

  ```
  // Person.java
  package ming;
  
  public class Person {
      public void run() {
          mr.jun.Arrays arrays = new mr.jun.Arrays();
      }
  }
  ```

  很显然，每次写完整类名比较痛苦。

  因此，第二种写法是用`import`语句，导入小军的`Arrays`，然后写简单类名：

  ```
  // Person.java
  package ming;
  
  // 导入完整类名:
  import mr.jun.Arrays;
  
  public class Person {
      public void run() {
          Arrays arrays = new Arrays();
      }
  }
  ```

  在写`import`的时候，可以使用`*`，表示把这个包下面的所有`class`都导入进来（但不包括子包的`class`）：

  ```
  // Person.java
  package ming;
  
  // 导入mr.jun包的所有class:
  import mr.jun.*;
  
  public class Person {
      public void run() {
          Arrays arrays = new Arrays();
      }
  }
  ```

- ### 最佳实践

  为了避免名字冲突，我们需要确定唯一的包名。推荐的做法是使用倒置的域名来确保唯一性。例如：

  - org.apache
  - org.apache.commons.log
  - com.liaoxuefeng.sample
  - com.company

### Java核心类

- 创建新对象时，优先选用静态工厂方法而不是new操作符

#### enum类型

通过`enum`定义的枚举类，和其他的`class`有什么区别？

答案是没有任何区别。`enum`定义的类型就是`class`，只不过它有以下几个特点：

- 定义的`enum`类型总是继承自`java.lang.Enum`，且无法被继承；
- 只能定义出`enum`的实例，而无法通过`new`操作符创建`enum`的实例；
- 定义的每个实例都是引用类型的唯一实例；
- 可以将`enum`类型用于`switch`语句。

```java
// 返回常量名
String s = Weekday.SUN.name(); // "SUN"
// 返回定义的常量的顺序，从0开始计数
int n = Weekday.MON.ordinal(); // 1
```

#### 异常捕获

存在多个`catch`的时候，`catch`的顺序非常重要：子类必须写在前面。例如：

```java
public static void main(String[] args) {
    try {
        process1();
        process2();
        process3();
    } catch (IOException e) {
        System.out.println("IO error");
    } catch (UnsupportedEncodingException e) { // 永远捕获不到
        System.out.println("Bad encoding");
    }
}
```

#### 抛出异常

下面是一个例子：

```
void process2(String s) {
    if (s==null) {
        throw new NullPointerException();
    }
}
```

#### 断言

这样，断言失败的时候，`AssertionError`会带上消息`x must >= 0`，更加便于调试。

Java断言的特点是：断言失败时会抛出`AssertionError`，导致程序结束退出。因此，断言不能用于可恢复的程序错误，只应该用于开发和测试阶段。

对于可恢复的程序错误，不应该使用断言。例如：

```
void sort(int[] arr) {
    assert arr != null;
}
```

应该抛出异常并在上层捕获：

```
void sort(int[] arr) {
    if (arr == null) {
        throw new IllegalArgumentException("array cannot be null");
    }
}
```

#### Commons Logging https://commons.apache.org/proper/commons-logging/download_logging.cgi

和Java标准库提供的日志不同，Commons Logging是一个第三方日志库，它是由Apache创建的日志模块。

Commons Logging的特色是，它可以挂接不同的日志系统，并通过配置文件指定挂接的日志系统。默认情况下，Commons Loggin自动搜索并使用Log4j（Log4j是另一个流行的日志系统），如果没有找到Log4j，再使用JDK Logging。

使用Commons Logging只需要和两个类打交道，并且只有两步：

第一步，通过`LogFactory`获取`Log`类的实例； 第二步，使用`Log`实例的方法打日志。

示例代码如下：

```
import org.apache.commons.logging.Log; import org.apache.commons.logging.LogFactory; 
```

#### Log4j https://logging.apache.org/log4j/2.x/download.html

