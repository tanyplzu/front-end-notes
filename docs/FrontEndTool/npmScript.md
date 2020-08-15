---
sidebarDepth: 1
---

# npm script 

## npm 切换镜像

```shell
npm get registry
npm config set registry https://registry.npm.taobao.org/
npm config set registry https://registry.npmjs.org/

yarn config get registry
yarn config set registry https://registry.npm.taobao.org/
yarn config set registry https://registry.yarnpkg.com
```

## npm init

npm init 的过程

```text
package name: (hello-npm-script)
version: (0.1.0)
description: hello npm script
entry point: (index.js)
test command:
git repository:
keywords: npm, script
license: (MIT)
```

package.json

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "description": "my app",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "npm",
    "script"
  ],
  "author": "",
  "license": "MIT"
}
```

### 开源协议xs

- [五种开源协议(GPL,LGPL,BSD,MIT,Apache)](https://www.oschina.net/question/54100_9455)