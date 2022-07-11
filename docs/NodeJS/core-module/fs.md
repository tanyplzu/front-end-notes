---
sidebarDepth: 0
---

# fs

[[toc]]

## 拷贝

```js
fs.copyFileSync('./1.txt', './2.txt');
```

## 读文件

项目启动，读取配置文件

```js
const fs = require('fs');

fs.readFile('/Users/joe/test.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
```

同步的方式

```js
const fs = require('fs');

try {
  const data = fs.readFileSync('/Users/joe/test.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.error(err);
}
```

::: tip 同步还是异步

- 对于一次性加载进来，不会二次加载的，比如项目启动之初，或者过程中只读取一次配置文件的，可以用 Sync/同步的方法；
- 对于体积较大的，可能需要多次读写的，有可能影响到业务流程的响应速度的，改用异步的方式。

实在不知道选哪种，那就保险起见选异步的方式做。如果采用同步的方式做，需要注意捕获错误，避免程序崩溃。

:::

Promise 异步改写

```js
// 先把 readFile 封装到一个 Prmoise 里面
const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => resolve(data))
}

// 然后通过 Promise.then 链式调用
readFile('./cfg1.json')
  .then(data => readFile(data.cfgPath))
  .then(data => readFile(data.cfgPath))
  .then(data => readFile(data.cfgPath))
  .then(data => {
    console.log('data4.cfgPath:', data)
  })
```

```js
const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => resolve(data))
}

// 放到 async function 里面逐个调用
async function readCfg () {
  const data1 = await readFile('./cfg1.json)
  const data2 = await readFile(data1.cfgPath)
  const data3 = await readFile(data2.cfgPath)
  const data4 = await readFile(data3.cfgPath)
  console.log(data4)
}
```

```js
fs.readFile(path[, options], callback)
```

- `[, options]` 意思是这个参数可以省略不写

```js
fs.readFile('./a.txt', 'utf8', function(err, data) {});
```

## 打开文件

```js
fs.open('./a.txt', 'w', function(err, fd) {
  console.log(fd);
  // fs.open 打开了文件，当然使用后应该关闭文件，通过 fs.close 方法可以关闭打开的文件
  fs.close(fd, callback);
});
```

文件打开后，就可以使用 `fs.read()` 方法进行更加精细的读取

```js
fs.read(fd, buffer, offset, length, position, callback);
```

- buffer，是把读取的数据写入这个对象，是个 Buffer 对象
- offset，写入 buffer 的起始位置
- length，写入 buffer 的长度
- position，从文件的什么位置开始读

```js
fs.open('./a.txt', 'r', function(err, fd) {
  var buf = new Buffer(1024);
  var offset = 0;
  var len = buf.length;
  // var pos = 2000
  var pos = 101;
  // 这里我定义了参数，文件打开后，会从第 100 个字节开始，读取其后的 1024 个字节的数据。
  // 读取完成后，回调方法中可以处理读取到的的缓冲的数据了
  fs.read(fd, buf, offset, len, pos, function(err, bytes, buffer) {
    console.log('读取了' + bytes + ' bytes');
    // 数据已被填充到 buf 中
    console.log(buf.slice(0, bytes).toString());
  });
});
```

- r+ 打开文件用于读写。
- w+ 打开文件用于读写，将流定位到文件的开头。如果文件不存在则创建文件。
- a 打开文件用于写入，将流定位到文件的末尾。如果文件不存在则创建文件。
- a+ 打开文件用于读写，将流定位到文件的末尾。如果文件不存在则创建文件。

## 写文件

```js
var data = new Buffer('Hi Juejin!');
fs.writeFile(
  './b.txt',
  data,
  {
    flag: 'w',
    encoding: 'utf8',
  },
  function(err) {}
);
```

```js
fs.write(fd, buffer, offset, length, position, callback);
```

### 追加到文件

```js
const content = '一些内容';

fs.appendFile('file.log', content, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //完成！
});
```

## JSON 合并

```js
const fs = require('fs');
const path = require('path');

// 判断目标路径的文件存在与否
const exists = (filePath) => fs.existsSync(filePath);
const jsonPath = process.argv[2];

if (!jsonPath) {
  console.log('没有传 JSON 目录参数哦！');
  process.exit(1);
}

const rootPath = path.join(process.cwd(), jsonPath);
// 遍历所有文件
const walk = (path) =>
  fs.readdirSync(path).reduce((files, file) => {
    const filePath = path + '/' + file;
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      if (/(.*)\.(json)/.test(file)) {
        return files.concat(filePath);
      }
    }
    return files;
  }, []);

// 合并文件内容
const mergeFileData = () => {
  const files = walk(rootPath);

  if (!files.length) process.exit(2);

  const data = files.filter(exists).reduce((total, file) => {
    const fileData = fs.readFileSync(file);
    const basename = path.basename(file, '.json');
    let fileJson;

    try {
      fileJson = JSON.parse(fileData);
    } catch (err) {
      console.log('读出出错', file);
      console.log(err);
    }

    total[basename] = fileJson;
    return total;
  }, {});

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
};

mergeFileData();
```

::: tip 小结

无论读写，都有两种方式，一种粗矿的，一种精细化的，精细化的控制，需要先 open 一个文件，然后操作读写，但需要手工调用 close 方法关闭文件，这种方式适合于多次写入或读取。粗狂的读写是一次性服务的，直接调用 writeFile/appendFile/readFile 方法，只会写入或读取一次，在它的内部自动调用了 close 方法，另外呢，对于 write 方法，因为多次对同一文件进行 write 并不安全，必须等到 callback 调用才可以，官方推荐是使用 stream 方式替代。

:::

## 文件夹

### 检查文件夹是否存在

```js
fs.access();
```

### 创建文件夹

```js
fs.mkdir(path[, options], callback)
fs.mkdirSync(path[, options])
```

### 读取目录

使用 `fs.readdir` 读取目录

```js
fs.readdir(path, callback);
```

```js
/**
 * path, 要读取目录的完整路径及目录名；
 * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
 */

const walk = function(path) {
  fs.readdirSync(path).forEach(function(file) {
    const newPath = path + '/' + file;
    const stat = fs.statSync(newPath);

    if (stat.isFile()) {
      if (/\.js/.test(file)) {
        files.push(file);
      }
    } else if (stat.isDirectory()) {
      walk(newPath);
    }
  });
};
walk(filesPath);
console.log(files.join('\r\n'));
```

### 重命名文件夹

第一个参数是当前的路径，第二个参数是新的路径：

```js
const fs = require('fs');

fs.rename('/Users/joe', '/Users/roger', (err) => {
  if (err) {
    console.error(err);
    return;
  }
  //完成
});
```

### 删除文件夹

```js
fs.rmdir();
```

删除包含内容的文件夹可能会更复杂。

在这种情况下，最好安装 `fs-extra` 模块，该模块非常受欢迎且维护良好。 它是 fs 模块的直接替代品，在其之上提供了更多的功能。

```js
const fs = require('fs-extra');

const folder = '/Users/joe';

fs.remove(folder, (err) => {
  console.error(err);
});
```
