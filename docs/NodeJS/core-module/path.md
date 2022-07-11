---
sidebarDepth: 0
---

# path

[[toc]]

## 文件路径

- `./` 当前文件所在目录，是个相对路径;
- `__dirname` 当前文件所在目录的完整目录名，也就是绝对路径 `\Users\front-end\docs\NodeJS\`;
- `__filename` 当前文件所在目录的完整目录路径，含文件名`\Users\front-end\docs\NodeJS\Node的工具集.md`;
- `process.cwd()` 当前执行 Node 命令时候的文件夹目录名。如：`node index.js` 就是 index.js 文件夹目录；`node ./lib/index.js` 就是 lib 这一级的目录;

## path.basename()

返回路径的最后一部分。 第二个参数可以过滤掉文件的扩展名：

```js
require('path').basename('/test/something'); //something
require('path').basename('/test/something.txt'); //something.txt
require('path').basename('/test/something.txt', '.txt'); //something
```

## path.dirname()

返回路径的目录部分：

```js
require('path').dirname('/test/something'); // /test
require('path').dirname('/test/something/file.txt'); // /test/something
```

## path.extname()

返回路径的扩展名部分。

```js
require('path').extname('/test/something'); // ''
require('path').extname('/test/something/file.txt'); // '.txt'
require('path').extname('index.'); // '.'
```

## path.isAbsolute()

如果是绝对路径，则返回 true。

```js
require('path').isAbsolute('/test/something'); // true
require('path').isAbsolute('./test/something'); // false
```

## path.join()

连接路径的两个或多个部分

```js
const name = 'joe';
require('path').join('/', 'users', name, 'notes.txt'); //'/users/joe/notes.txt'
```

## path.normalize()

当包含类似 .、.. 或双斜杠等相对的说明符时，则尝试计算实际的路径：

```js
require('path').normalize('/users/joe/..//test.txt'); //'/users/test.txt'
```

## path.parse()

解析对象的路径为组成其的片段：

- root: 根路径。
- dir: 从根路径开始的文件夹路径。
- base: 文件名 + 扩展名
- name: 文件名
- ext: 文件扩展名

```js
require('path').parse('/users/test.txt');
```

```json
{
  "root": "/",
  "dir": "/users",
  "base": "test.txt",
  "ext": ".txt",
  "name": "test"
}
```

## path.relative()

接受 2 个路径作为参数。 基于当前工作目录，返回从第一个路径到第二个路径的相对路径。

```js
require('path').relative('/Users/joe', '/Users/joe/test.txt'); //'test.txt'
require('path').relative('/Users/joe', '/Users/joe/something/test.txt'); //'something/test.txt'
```

## path.resolve()

可以使用 path.resolve() 获得相对路径的绝对路径计算：

```js
path.resolve('joe.txt'); //'/Users/joe/joe.txt' 如果从主文件夹运行
```

通过指定第二个参数，resolve 会使用第一个参数作为第二个参数的基准：

```js
path.resolve('tmp', 'joe.txt'); //'/Users/joe/tmp/joe.txt' 如果从主文件夹运行
```

如果第一个参数以斜杠开头，则表示它是绝对路径：

```js
path.resolve('/etc', 'joe.txt'); //'/etc/joe.txt'
```

## 资料

- [Node.js 路径模块](http://nodejs.cn/learn/the-nodejs-path-module)
