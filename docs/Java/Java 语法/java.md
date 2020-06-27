---
sidebarDepth: 0
---

# Java 基础语法

[[toc]]

## Hello World

我们先来看一下，Java 语言的 Hello World 代码如何编写。在 Java 中，所有的代码都必须写在类里面，所以，我们定义一个 HelloWorld 类。main() 函数是程序执行的入口。main() 函数中调用了 Java 开发包 JDK 提供的打印函数 System.out.println() 来打印 hello world 字符串。

```java
/*hello world程序*/
public class HelloWorld {
    public static void main(String []args) {
        System.out.println("Hello World"); //打印Hello World
    }
}
```

## 基本数据类型

Java 语言中的基本数据类型跟其他语言类似，主要有下面几种：

- 整型类型：byte（字节）、short（短整型）、int（整型）、long（长整型）
- 浮点类型：float（单精度浮点）、double（双精度浮点）
- 字符型：char 布尔型：boolean

```java
int a = 6;
```

除此之外，为了方便我们使用，Java 还提供了一些封装这些基本数据类型的类，这些类实现了一些常用的功能函数，可以直接拿来使用。常用的有下面几个类：

- Integer：对应封装了基本类型 int；
- Long：对应封装了基本类型 long；
- Float：对应封装了基本类型 float；
- Double：对应封装了基本类型 double；
- Boolean：对应封装了基本类型 boolean；
- String：对应封装了字符串类型 char[]。

```java
Integer oa = new Integer(6);
```

## 数组

```java
int a[] = new int[10]; //定义了一个长度是10的int类型数组
```

在 Java 中，我们通过如下方式访问数组中的元素：

```java
a[1] = 3; //将下标是1的数组元素赋值为3
System.out.println(a[2]); //打印下标是2的数组元素值
```

## 流程控制

流程控制语句跟其他语言类似，主要有下面几种。

- if-else 语句
- switch-case 语句
- for、while 循环

continue、break、return，代码示例如下所示：

```java
for (int i = 0; i < 10; ++i) {
  if (i == 4) {
    continue; //跳过本次循环，不会打印出4这个值
  }
  System.out.println(i);
}

for (int i = 0; i < 10; ++i) {
  if (i == 4) {
    break; //提前终止循环，只会打印0、1、2、3
  }
  System.out.println(i);
}

public void func(int a) {
  if (a == 1) {
    return; //结束一个函数，从此处返回
  }
  System.out.println(a);
}
```

## 类、对象

Java 语言使用关键词 class 来定义一个类，类中包含成员变量（也叫作属性）和方法（也叫作函数），其中有一种特殊的函数叫作构造函数，其命名比较固定，跟类名相同。

除此之外，Java 语言通过 new 关键词来创建一个类的对象，并且可以通过构造函数，初始化一些成员变量的值。代码示例如下所示：

```java
public class Dog { // 定义了一个Dog类
  private int age; // 属性或者成员变量
  private int weight;

  public Dog(int age, int weight) { // 构造函数
    this.age = age;
    this.weight = weight;
  }

  public int getAge() { // 函数或者方法
    return age;
  }

  public int getWeigt() {
    return weight;
  }

  public void run() {
    // ...
  }
}

Dog dog1 = new Dog(2, 10);//通过new关键词创建了一个Dog对象dog1
int age = dog1.getAge();//调用dog1的getAge()方法
dog1.run();//调用dog1的run()方法
```

## 权限修饰符

在前面的代码示例中，我们多次用到 private、public，它们跟 protected 一起，构成了 Java 语言的三个权限修饰符。权限修饰符可以修饰函数、成员变量。

- private 修饰的函数或者成员变量，只能在类内部使用。
- protected 修饰的函数或者成员变量，可以在类及其子类内使用。
- public 修饰的函数或者成员变量，可以被任意访问。

除此之外，权限修饰符还可以修饰类，不过，专栏中所有的类定义都是 public 访问权限的，所以，我们可以不用去了解三个修饰符修饰类的区别。

```java

public class Dog {// public修饰类
  private int age; // private修饰属性，只能在类内部使用
  private int weight;

  public Dog(int age, int weight) {
    this.age = age;
    this.weight = weight;
  }

  public int getAge() { //public修饰的方法，任意代码都是可以调用
    return age;
  }

  public void run() {
    // ...
  }
```

## 继承

Java 语言使用 extends 关键字来实现继承。被继承的类叫作父类，继承类叫作子类。子类继承父类的所有非 private 属性和方法。具体的代码示例如下所示：

```java
public class Animal { // 父类
  protected int age;
  protected int weight;

  public Animal(int age, int weight) {
    this.age = age;
    this.weight = weight;
  }

  public int getAge() { // 函数或者方法
    return age;
  }

  public int getWeigt() {
    return weight;
  }

  public void run() {
    // ...
  }
}

public class Dog extends Animal { // 子类
  public Dog(int age, int weight) { // 构造函数
    super(age, weight); //调用父类的构造函数
  }

  public void wangwang() {
    //...
  }
}

public class Cat extends Animal { //子类
  public Cat(int age, int weight) { // 构造函数
    super(age, weight); //调用父类的构造函数
  }

  public void miaomiao() {
    //...
  }
}

//使用举例
Dog dog = new Dog(2, 8);
dog.run();
dog.wangwang();
Cat cat = new Cat(1, 3);
cat.run();
cat.miaomiao();
```

## 接口

Java 语言通过 interface 关键字来定义接口。接口中只能声明方法，不能包含实现，也不能定义属性。类通过 implements 关键字来实现接口中定义的方法。具体的代码示例如下所示：

```java
public interface Runnable {
  void run();
}

public class Dog implements Runnable {
  private int age; // 属性或者成员变量
  private int weight;

  public Dog(int age, int weight) { // 构造函数
    this.age = age;
    this.weight = weight;
  }

  public int getAge() { // 函数或者方法
    return age;
  }

  public int getWeigt() {
    return weight;
  }

  @Override
  public void run() { //实现接口中定义的run()方法
    // ...
  }
}
```

## 容器

Java 提供了一些现成的容器。容器可以理解为一些工具类，底层封装了各种数据结构。比如 ArrayList 底层就是数组，LinkedList 底层就是链表，HashMap 底层就是散列表等。这些容器我们可以拿来直接使用，不用从零开始开发，大大提高了编码的效率。具体的代码示例如下所示：

```java
public class DemoA {
  private ArrayList<User> users;

  public void addUser(User user) {
    users.add(user);
  }
}
```

## 异常处理

Java 提供了异常这种出错处理机制。我们可以指直接使用 JDK 提供的现成的异常类，也可以自定义异常。在 Java 中，我们通过关键字 throw 来抛出一个异常，通过 throws 声明函数抛出异常，通过 try-catch-finally 语句来捕获异常。代码示例如下所示：

```java
public class UserNotFoundException extends Exception { // 自定义一个异常
  public UserNotFoundException() {
    super();
  }

  public UserNotFoundException(String message) {
    super(message);
  }

  public UserNotFoundException(String message, Throwable e) {
    super(message, e);
  }
}

public class UserService {
  private UserRepository userRepo;
  public UserService(UseRepository userRepo) {
    this.userRepo = userRepo;
  }

  public User getUserById(long userId) throws UserNotFoundException {
    User user = userRepo.findUserById(userId);
    if (user == null) { // throw用来抛出异常
      throw new UserNotFoundException();//代码从此处返回
    }
    return user;
  }
}

public class UserController {
  private UserService userService;
  public UserController(UserService userService) {
    this.userService = userService;
  }

  public User getUserById(long userId) {
    User user = null;
    try { //捕获异常
      user = userService.getUserById(userId);
    } catch (UserNotFoundException e) {
      System.out.println("User not found: " + userId);
    } finally { //不管异常会不会发生，finally包裹的语句块总会被执行
      System.out.println("I am always printed.");
    }
    return user;
  }
}
```

## package 包

Java 通过 pacakge 关键字来分门别类地组织类，通过 import 关键字来引入类或者 package。具体的代码示例如下所示：

```java
/*class DemoA*/
package com.xzg.cd; // 包名com.xzg.cd

public class DemoA {
  //...
}

/*class DemoB*/
package com.xzg.alg;

import java.util.HashMap; // Java工具包JDK中的类
import java.util.Map;
import com.xzg.cd.DemoA;

public class DemoB {
  //...
}
```
