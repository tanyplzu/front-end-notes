# 一个 web 项目

## 加入 Web 依赖

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

## 创建 Controller

新建一个 Controller，需要在类上加入注解@RestController，这个注解是 Spring 4.0 版本之后的一个注解，功能相当于@Controller 与 @ResponseBody 两个注解的功能之和。


