---
title: "Nest.js 入门"
sidebarDepth: 1
---

### 目录

[[toc]]

### 前言

Nest 是一套基于 Node.js 的强大的 Web 框架，可帮助你轻松构建出高效的、可扩展的应用程序。它是通过结合 OOP （面向对象编程）和 FP （函数式编程）的最佳理念，采用现代化 JavaScript(ES6+)，使用 TypeScript 构建的。

Nest 不仅仅只是一套框架，因为它是基于著名的流行库 Express 和 Socket.io 构建的（你也可以根据自己的需求选择任何其他库），所以无需等待社区成长，可以直接使用，更无需担心第三方库的缺失。

### Hello world

**（1）创建项目:**

```sh
$ npm i -g @nestjs/cli
$ nest new project-name
```

**（2）启动:**

```sh
$ cd project-name
$ npm start
```

### 控制器（Controller）

控制器负责处理传入的请求并将响应返回给客户端。

![image](https://docs.nestjs.com/assets/Controllers_1.png)

控制器的目的是接收应用程序的特定请求。路由策略控制着哪些控制器接收哪些请求。通常，每个控制器具有多个路由，并且不同的路由可以执行不同的动作。

为了创建一个基本的控制器，我们使用类和装饰器。装饰器将类与所需的元数据相关联，并使 Nest 能够创建路由映射（将请求绑定到相应的控制器）。

```sh
 nest g co users //使用 CLI 提供的 generate （别名：g） 命令生成一个基本的 users Controller （别名： co）：
```

#### 请求方法

其中 @Put()，@Delete()，@Patch()，@Options()，@Head() 和 @All()。每个代表其各自的 HTTP 请求方法。

#### http 请求对象

装饰器 | 说明
---|---
@Request() | req
@Response() | res
@Next() | next
@Session() | res.session
@Param(key?: string) | res.params
@Body(key?: string) | res.body
@Query(key?: string) | res.query
@Headers(name?: string) | res.headers

#### 路由

```js
import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

#### 路由参数

```js
import { Controller, Get, Post } from '@nestjs/common';
//路由名称
@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
  // 路由通配符
  @Get('ab*cd')
  findAll2() {
    return 'This route uses a wildcard';
  }
  // 路由参数
  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }
}
```

需要注意的是路由匹配也有顺序

#### 状态码

更改请求的状态码

```js
@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
```

#### 响应头

要指定自定义响应标头，您可以使用 @Header() 装饰器或特定于库的响应对象（并 res.header() 直接调用）。

```js
@Post()
@Header('Cache-Control', 'none')
// Access-Control-Allow-Origin :*
create() {
  return 'This action adds a new cat';
}

```

#### 异步

我们可以使用 async / await
或者使用 RxJS (Nest 将自动订阅下面的源并获取最后一个发射值）

```js
@Get()
findAll(): Observable<any[]> {
  return of([]);
}
```

#### DTO

DTO 是一个定义网络发送的对象，相当于请求方法的接口，但是 nest 最后会转成 js, 在转换的过程中 interface 会被删除，所以这里推荐使用 class , 类是 javascript ES6 的一部分。

```js
// 创建Dto类
export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
//使用Dto
@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}

```

### 提供者（Provider）

Provider 是 Nest 的基本概念。许多基本的 Nest 类可以被视为提供者 - 服务，存储库，工厂，helper 等。提供者的主要思想是它可以注入依赖关系。

控制器一般只处理 HTTP 请求，并将更复杂的任务委派给提供者。
提供者就是一个简单的 JavaScript 类， 然后使用 @Injectable 装饰器修饰。

#### 服务（Service）

service 负责业务逻辑，核心是如何将业务逻辑抽象成接口及其粒度。service 层应该尽量提供功能相对单一的基础方法，更多的场景和变化可以在 controller 层实现。这样设计有利于 service 层的复用和稳定。主要实现业务逻辑。

```js
import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
//要使用CLI创建服务，只需执行$ nest g service cats命令即可。
```

此时的 Controller

```js
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  //请注意private readonly语法的使用。这个简写允许我们 catsService 在同一位置立即声明和初始化成员。
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
```

#### 依赖注入

依赖注入（Dependency Injection，简称 DI） 是实现 控制反转（Inversion of Control，缩写为 IoC） 的一种常见方式。

##### 什么是控制反转呢

控制反转，是面向对象编程中的一种设计原则，可以用来减低计算机代码之间的耦合度。通过控制反转，对象在被创建的时候，由一个调控系统内所有对象的外界实体，将其所依赖的对象的引用传递给它。也可以说，依赖被注入到对象。
我们看一个例子

```js
// 比如一个类A中，需要用到另一个类B的方法，那么我们就要在A中实例化B，然后调用B的方法。代码如下：
class A{
 let b = new ClassB();
 b.active();
}
/*假设，我们还有C类，D类等。他们也都要用到B的方法，同样地他们也需要实例化B，然后调用B的方法。如果B的实例化是一个十分消耗系统资源的过程，比如数据库连接等。那么这样每次一个类中需要调用B的方法，就要实例化B一次，这将是一个非常消耗系统资源的过程。*/
```

##### Nest 中的依赖注入

nest 就是建立在依赖注入这种设计模式之上的，所以它在框架内部封装了一个 IoC 容器来管理所有的依赖关系。
在 MVC 设计模式中， Controller 只负责对请求的分发，并不处理实际的业务逻辑。Service 主要处理实际业务逻辑 (CRUD)。

#### 注册提供者

现在我们已经定义了一个 provider（CatsService），并且我们有了该 service（CatsController）的使用者，我们需要使用 Nest 注册该服务，以便它可以执行注入。我们通过编辑模块文件（app.module.ts）并将服务添加到装饰器的 providers 数组来完成此操作 @Module()。

```js
app.module.ts JS

import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
```

### 模块（Module）

模块化是指解决一个复杂问题时自顶向下逐层把系统划分成若干模块的过程，有多种属性，分别反映其内部特性。

![image](https://docs.nestjs.com/assets/Modules_1.png)

在 CatsController 与 CatsService 属于同一功能。由于它们密切相关，因此将它们移动到模块中。功能模块只是组织与特定功能相关的代码，保持代码建立清晰的边界。这有助于我们管理复杂性并使用 SOLID 原则进行开发，尤其是随着应用程序或团队规模的增长。

```js
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
//要使用CLI创建模块，只需执行$ nest g module cats命令即可。
```

最后是将此模块导入根模块

```js
app.module.ts JS

import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
```

### 中间件（Middleware ）

中间件是在路由处理程序之前调用的函数。中间件功能可以访问请求和响应对象，以及应用程序请求 - 响应周期中的下一个中间件功能。下一个中间件函数通常由一个名为 next 的变量表示。

- 执行任何代码。
- 对请求和响应对象进行更改。
- 请求 - 响应周期结束。
- 调用堆栈中的下一个中间件函数。
- 如果当前中间件函数没有结束请求 - 响应周期，它必须调用 next() 将控制权传递给下一个中间件函数。否则，请求将被挂起。

### 过滤器（Exception filter）

捕获错误信息，返回响应给客户端。可以控制器中的类、方法、全局注册使用，可以做自定义响应异常格式。

### 管道（Pipe）

数据流处理，在中间件后路由处理前做数据处理，可以控制器中的类、方法、方法参数、全局注册使用，只能是一个纯函数。可以做数据验证，数据转换（将输入数据转换为所需的输出）等数据处理。

### 守卫（Guard）

决定请求是否可以到达对应的路由处理器，能够知道当前路由的执行上下文，可以控制器中的类、方法、全局注册使用，可以做角色守卫。

### 拦截器（Interceptor）

进入控制器之前和之后处理相关逻辑，能够知道当前路由的执行上下文，可以控制器中的类、方法、全局注册使用，可以做日志、事务处理、异常处理、响应数据格式等。

### 执行顺序

客户端请求 ---> 中间件 ---> 守卫 ---> 拦截器之前 ---> 管道 ---> 控制器处理并响应 ---> 拦截器之后 ---> 过滤器

### SQL（TypeORM）

什么是 ORM

它的作用是在关系型数据库和对象之间作一个映射，这样，我们在具体的操作数据库的时候，就不需要再去和复杂的 SQL 语句打交道，只要像平时操作对象一样操作它就可以了 。
比如:

- save({name:'张三',age:1}); // 保存指定对象
- findAll();// 查询所有
- remove({id:123}); // 根据 id 删除指定对象
- findOne({id:123}) // 根据 id 查出指定对象
- ...

#### 新建实体类

```js
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn() // 组件
    id: number;
    @Column({ length: 10,unique:true }) //是否唯一，并限制长度为10
    date: string;
    @Column('int') // int类型
    value: number;
    @Column()
    isActive: boolean;
}
```

#### 创建 database 提供者

```js
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'test',
      entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: true,
    }),
  },
];
```

创建 Module 模块

```js
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
```

连接实体类，并且创建对应业务的 Provide

```js
import { Connection, Repository } from 'typeorm';
import { Users } from './users.entity';

export const usersProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Users),
    inject: ['DATABASE_CONNECTION'],
  },
];
```

具体使用

```js
import { Injectable, Inject } from '@nestjs/common';
import { TravelDay } from './user.interface';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USERS_REPOSITORY')
        private readonly usersRepository: Repository<Users>,
    ) { }
     create(params: any) {
        this.usersRepository.save(params);
    }
}

```

### Nest Cli

简单用法

```
$ nest generate service users
或者
$ nest g s users
```

类型| 说明
---|---
class （简写：cl)| 类
controller （简写：co) |控制器
decorator （简写：d) |装饰器
exception （简写：e)| 异常捕获
filter （简写：f)| 过滤器
gateway （简写：ga)| 网关
guard （简写：gu) |守卫
interceptor （简写：i) |拦截器
middleware （简写：mi) |中间件
module （简写：mo) |模块
pipe （简写：pi) |管道
provider （简写：pr) |供应商
service （简写：s) |服务

### 总结

NestJS 使用现代 JavaScript，使用 Typescript （保留与纯 JavaScript 的兼容性）构建，熟悉 angluar 的开发者能更快的入门，不仅是前端开发人员，哪怕是熟悉 Java Spring MVC 的后端开发者也能快速入门。

参考链接：

- [nestJS文档](https://docs.nestjs.com/)
- [nodeJS文档](http://nodejs.cn/api/fs.html)
- [SOLID原则](https://www.imooc.com/article/51098)

> 此文来自内部同事的分享
