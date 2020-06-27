---
sidebarDepth: 0
---

# MyBatis

[[toc]]

MyBatis 是一个 ORM（Object Relational Mapping，对象 - 关系映射）框架。ORM 框架主要是根据类和数据库表之间的映射关系，帮助程序员自动实现对象与数据库中数据之间的互相转化。说得更具体点就是，ORM 负责将程序中的对象存储到数据库中、将数据库中的数据转化为程序中的对象。实际上，Java 中的 ORM 框架有很多，除了刚刚提到的 MyBatis 之外，还有 Hibernate、TopLink 等。

MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs（Plain Old Java Objects，普通的 Java 对象）映射成数据库中的记录

MyBatis 依赖 JDBC 驱动，所以，在项目中使用 MyBatis，除了需要引入 MyBatis 框架本身（mybatis.jar）之外，还需要引入 JDBC 驱动（比如，访问 MySQL 的 JDBC 驱动实现类库 mysql-connector-java.jar）。

src/mian/resources/mybatis 下创建 mybatis-config.xml，这个文件是 MyBatis 的全局配置文件，包含以下几种类型的配置：

- ·properties（属性）
- ·settings（全局配置参数）
- ·typeAliases（类型别名）
- ·typeHandlers（类型处理器）
- ·objectFactory（对象工厂）
- ·plugins（插件）
- ·environments（环境集合属性对象）
- ·environment（环境子属性对象）
- ·transactionManager（事务管理）
- ·dataSource（数据源）
- ·mappers（映射器）

```java
// 1. 定义UserDO
public class UserDo {
  private long id;
  private String name;
  private String telephone;
  // 省略setter/getter方法
}

// 2. 定义访问接口
public interface UserMapper {
  public UserDo selectById(long id);
}

```

```xml
// 3. 定义映射关系：UserMapper.xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org/DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="cn.xzg.cd.a87.repo.mapper.UserMapper">
    <select id="selectById" resultType="cn.xzg.cd.a87.repo.UserDo">
        select * from user where id=#{id}
    </select>
</mapper>

// 4. 全局配置文件: mybatis.xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="dev">
        <environment id="dev">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver" />
                <property name="url" value="jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8" />
                <property name="username" value="root" />
                <property name="password" value="..." />
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="mapper/UserMapper.xml"/>
    </mappers>
</configuration>
```

- [MyBatis 如何权衡易用性、性能和灵活性？](https://time.geekbang.org/column/article/239239)
- [总结 MyBatis 框架中用到的 10 种设计模式](https://time.geekbang.org/column/article/240971)
