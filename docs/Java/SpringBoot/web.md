# Web 项目开发

[[toc]]

## 前端参数

- 检验代码不能写到控制器，最好分离出去
- 控制器最好不要写业务逻辑

### 接收参数

- @PathVariable 接收`{name}`形式的参数
- @requestParam 接收`?name`形式的参数

```java
public class BannerController {
    @GetMapping("/name/{name}")
    public Banner getByName(@PathVariable @NotBlank String name) {
        Banner banner = bannerService.getByName(name);
        return banner;
    }
}
```

post 格式的参数

```java
public class UserController {
    @PostMapping("/wx_info")
    @ScopeLevel
    public SuccessDTO updateUserInfo(@RequestBody Map<String,Object> user) {
        return new SuccessDTO();
    }
}
```

- @RequestBody 接收 post body 中传入的参数
- `Map<String,Object>`,键是 Sting,值不确定，有个拆箱和装箱的而过程，不建议这样写。
- 使用 DTO（数据传输对象）的方式去接收

### lombok

- 使用@getter 和@setter 注解生成 get 和 set 方法；
- @NoArgsConstructor 无参的构造函数
- @RequireArgsConstructor 生成一个必填项的构造函数
- @NonNull，该字段不能为空
- @build 模式使代码简洁

一个类下面没有定义构造函数时，java 会默认一个无参的构造函数

### 参数校验

```java
import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
public class OrderDTO {
    @DecimalMin(value="0.00", message = "不在合法范围内" )
    @DecimalMax(value="99999999.99", message = "不在合法范围内")
    private BigDecimal totalPrice;

    @Length(min=2, max=10, message = "xxxxx")
    private String name;

    @NotBlank(message = "account不允许为空")
    private String account;

    @TokenPassword(max=30, message = "{token.password}")
    private String password;
}
```

关联 DTO 的校验，需要打上 @valid 注解

### @valid 和 @validated

- 都用于参数校验
- 开启验证一般用 @validated
- 关联 DTO 的校验，需要打上 @valid 注解
- 其它情况一般优先考虑 @validated

### 自定义校验

[springboot使用hibernate validator校验](https://www.cnblogs.com/leeego-123/p/10820099.html)

- 验证密码两次是否相等


## 数据库

### 数据表如何去创建

- 可视化工具
- sql 语句
- Model 映射表

### 配置

- 在 application.properties 文件中或 application.yml
- yml 文件层架较好，推荐使用
- 区分环境

```yml
spring:
  profiles: active:dev
```

### 打包配置

spring boot 打出来的 jar 包叫 uber jar,内置了 tomcat 服务器。启动:

```shell
java -jar xxx.jar
java -jar xxx.jar --spring.profiles.active=dev
```

### maven

idea 中 maven work offline，取消离线模式。
数据源的更改：在本项目或 maven 中修改

### JPA 的配置

application.yml 中配置 jpa

### 使用实体创建表

- 实体类中设置比较麻烦
- 关联表的关系
- 外键的问题，物理外键，逻辑外键

### 表与表之间的关系

- 1 对 1 一般字段太多，分成多个表
- 1 对多 班级和学生
- 多对多 老师和学生

为什么要 1 对 1：

- 查询效率
- 业务的角度

多对多：

- 中间表，记录关系
- 用户和优惠券，是否使用过的状态需要记录在第三张表中

### 数据库的设计

- 把表当成一个模型，把一个表当成一个实体模型
- 再考虑对象与对象的关系（使用外键建立关系）
- 细化：字段、限制、长度、小数点、索引

优化

- 垂直分表和水平分表
- 查询方式（数据库的优化，更多再查询方式上），like 的效率很低
- 缓存多数据库最有效

### 数据设计例子

- @oneToMany 一对多
- banner 和 banner_item
- 消除第三张表，使用外键，@JionColumn
- @GeneratedValue(strategy = GenerationType.IDENTITY)
- 一般建议不要使用物理外键

### JPA Repository

- Repository 接口规范(总接口)
- CRUDRepository 接口(继承 Repository 接口)
- PagingAndSorting 接口(继承 CRUDRepository 接口)
- JPARepository 接口(继承 PagingAndSorting 接口)
- JPASpecificationExecutor 接口

```java
public interface UsersDao extends Repository<Users, Integer> {
  //方法名称命名规则
  List<Users> findByUsername(String string);
  List<Users> findByUsernameLike(String string);
  List<Users> findByUsernameAndUserageGreaterThan(String string, Integer age);
}
```

配置后再控制台可以打印 sql 语句，也可以格式化

- 懒加载，节约性能
- 急加载

## ORM

用面向对象的方式去看待数据库

数据库的作用：

- 存储数据
- 存储关系

表的创建：

- 数据库设计工具
- SQL 定义 DDL

> DDL 是一种数据设计语言

一个 Entity 例子：

```java
@Entity
@Getter
@Setter
@Where(clause = "delete_time is null ")
public class Banner extends BaseEntity {
    @Id
    private Long id;
    private String name;
    private String description;
    private String title;
    private String img;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="bannerId")
    private List<BannerItem> items;
}
```

- @Getter 和 @Setter 不用给每个字段加 getter 和 setter 方法；
- 可以将时间公共的字段放在基类中 BaseEntity
- 如果用数据表生成实体，不需要给实体的每个字段加长度等设置
- FetchType.LAZY 序列化会触发懒加载，可以使用序列化阻止

```java
@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity {

    @JsonIgnore
    @Column(insertable=false, updatable=false)
    private Date createTime;
    @JsonIgnore
    @Column(insertable=false, updatable=false)
    private Date updateTime;
    @JsonIgnore
    private Date deleteTime;
}
```

- abstract 抽象类
- @MappedSuperclass 表示映射的基类，没有该注解，可能取不到时间的值
- @JsonIgnore 结果不出现

### 字段类型

- 时间可以设置默认值
- 价格的表示 decimal(10,2),一定不能用

### 序列化

- 默认库 jackson；fastjson，阿里的，简单些
- @JsonIgnore

### 扩展数据库

- 表里的数据字段不够用
- 列不具备扩展性，行不具备扩展性（有时候可以解决数据扩展的问题）
- 没有特殊理由，可以把一些字段设置成文本，会更灵活的

### 静态资源

- 设置 controller 访问：容易控制权限，但速度较慢；
- 采用 thymeleaf,将图片放到路径'src\main\resources\static\imgs'下
- 不要把静态文件放到数据库

### SPU

列表信息需要返回概要数据还是详情数据？

