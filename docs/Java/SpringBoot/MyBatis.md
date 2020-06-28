---
sidebarDepth: 0
---

# MyBatis

[[toc]]

MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射。MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集。MyBatis 可以使用简单的 XML 或注解来配置和映射原生信息，将接口和 Java 的 POJOs（Plain Old Java Objects，普通的 Java 对象）映射成数据库中的记录。

MyBatis 依赖 JDBC 驱动，所以，在项目中使用 MyBatis，除了需要引入 MyBatis 框架本身（mybatis.jar）之外，还需要引入 JDBC 驱动（比如，访问 MySQL 的 JDBC 驱动实现类库 mysql-connector-java.jar）。

## 配置

在 src/mian/resources/mybatis 下创建 mybatis-config.xml，这个文件是 MyBatis 的全局配置文件，包含以下几种类型的配置：

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

## Spring Boot 整合 MyBatis 实例

在数据库中新建了一个名称为 tb_user 的数据表

```sql
DROP TABLE IF EXISTS `tb_user`;

CREATE TABLE `tb_user` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '登录名',
  `password` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '密码',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
```

### 新建实体类和 Mapper 接口

在 entity 包下新建 User 类，将 tb_user 中的字段映射到该实体类中：

```java
package ltd.newbee.mall.entity;

public class User {
    private Integer id;
    private String name;
    private String password;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```

在 dao 包中新建 UserDao 接口，并定义增删改查四个接口：

```java
package ltd.newbee.mall.dao;
import ltd.newbee.mall.entity.User;
import java.util.List;

/**
 * @author 13
 * MyBatis 测试
 */
public interface UserDao {
    /**
     * 返回数据列表
     *
     * @return
     */
    List<User> findAllUsers();

    /**
     * 添加
     *
     * @param User
     * @return
     */
    int insertUser(User User);

    /**
     * 修改
     *
     * @param User
     * @return
     */
    int updUser(User User);

    /**
     * 删除
     *
     * @param id
     * @return
     */
    int delUser(Integer id);
}
```

### 创建 Mapper 接口的映射文件

在 resources/mapper 目录下新建 Mapper 接口的映射文件 UserDao.xml，之后进行映射文件的编写。

首先，定义映射文件与 Mapper 接口的对应关系，比如该示例中，需要将 UserDao.xml 的与对应的 UserDao 接口类之间的关系定义出来：

```xml
<mapper namespace="ltd.newbee.mall.dao.UserDao">
```

之后，配置表结构和实体类的对应关系：

```xml
<resultMap type="ltd.newbee.mall.entity.User" id="UserResult">
  <result property="id" column="id"/>
  <result property="name" column="name"/>
  <result property="password" column="password"/>
</resultMap>
```

最后，按照对应的接口方法，编写具体的 SQL 语句，最终的 UserDao.xml 文件如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="ltd.newbee.mall.dao.UserDao">
    <resultMap type="ltd.newbee.mall.entity.User" id="UserResult">
        <result property="id" column="id"/>
        <result property="name" column="name"/>
        <result property="password" column="password"/>
    </resultMap>
    <select id="findAllUsers" resultMap="UserResult">
        select id,name,password from tb_user
        order by id desc
    </select>
    <insert id="insertUser" parameterType="ltd.newbee.mall.entity.User">
        insert into tb_user(name,password)
        values(#{name},#{password})
    </insert>
    <update id="updUser" parameterType="ltd.newbee.mall.entity.User">
        update tb_user
        set
        name=#{name},password=#{password}
        where id=#{id}
    </update>
    <delete id="delUser" parameterType="int">
        delete from tb_user where id=#{id}
    </delete>
</mapper>
```

### 新建 MyBatisController

为了对 MyBatis 进行功能测试，在 controller 包下新建 MyBatisController 类，并新增 4 个方法分别接收对于 tb_user 表的增删改查请求，代码如下：

```java
package ltd.newbee.mall.controller;

import ltd.newbee.mall.dao.UserDao;
import ltd.newbee.mall.entity.User;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

@RestController
public class MyBatisController {
    @Resource
    UserDao userDao;

    // 查询所有记录
    @GetMapping("/users/mybatis/queryAll")
    public List<User> queryAll() {
        return userDao.findAllUsers();
    }

    // 新增一条记录
    @GetMapping("/users/mybatis/insert")
    public Boolean insert(String name, String password) {
        if (StringUtils.isEmpty(name) || StringUtils.isEmpty(password)) {
            return false;
        }
        User user = new User();
        user.setName(name);
        user.setPassword(password);
        return userDao.insertUser(user) > 0;
    }

    // 修改一条记录
    @GetMapping("/users/mybatis/update")
    public Boolean insert(Integer id, String name, String password) {
        if (id == null || id < 1 || StringUtils.isEmpty(name) || StringUtils.isEmpty(password)) {
            return false;
        }
        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setPassword(password);
        return userDao.updUser(user) > 0;
    }

    // 删除一条记录
    @GetMapping("/users/mybatis/delete")
    public Boolean insert(Integer id) {
        if (id == null || id < 1) {
            return false;
        }
        return userDao.delUser(id) > 0;
    }
}
```

## 资料

- [MyBatis 如何权衡易用性、性能和灵活性？](https://time.geekbang.org/column/article/239239)
- [总结 MyBatis 框架中用到的 10 种设计模式](https://time.geekbang.org/column/article/240971)
