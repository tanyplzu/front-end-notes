---
sidebarDepth: 0
---

# Spring Boot 基础

[[toc]]

## IOC

- 实现过程：容器，**加入容器**，注入
- 目的：控制权交给用户

### 加入容器

- xml
- 注解

使用@Component 加入容器，容器已经将类实例化，在别的类中可以直接使用

```java
@Component
public class Book {}

@Service
public class BookService {}
```

使用 @Autowired 注入

```java
public class literature {
  @Autowired
  private Book book;
}
```

除了属性的注入，还可以使用构造函数的方式注入。推荐使用构造函数注入。

## 自动配置有什么用？

与其它的后端框架不同，Spring Boot 并没有在程序的入口处引入各层的模块，各层代码看色并不相关。但其实他们之间有个桥接点，就是 IOC。

## Spring 的实例化和依赖注入

Spring Boot 可以更改对象实例化和实例化的时机的。可以使用 @Lazy 注解。

## 
