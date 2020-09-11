---
sidebarDepth: 1
---

# react 项目中的一些库

[[toc]]

## dependencies

### antv

AntV 是蚂蚁金服全新一代数据可视化解决方案

### [bizcharts](https://bizcharts.net/)

BizCharts 是一个基于 G2 封装的 React 图表库

### [classnames](https://www.npmjs.com/package/classnames)

```js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
```

```jsx
var btnClass = classNames('btn', this.props.className, {
  'btn-pressed': this.state.isPressed,
  'btn-over': !this.state.isPressed && this.state.isHovered,
});
```

### [numeral](http://numeraljs.com/)

```
numeral(12321).format('0,0')
```

### [nzh](https://gitee.com/cnwhy/nzh?utm_source=aladin&utm_campaign=repo)

金额转大写

```js
nzhcn.encodeB('13.5'); // 壹拾叁點伍
nzhcn.encodeB('13.5', { tenMin: true }); // 拾叁點伍
nzhcn.toMoney('1', { outSymbol: false }); //壹元整
```

### lodash.debounce

```js
_.debounce(func, [(wait = 0)], [(options = {})]);
```

### omit.js

其中，参数 object 为 JSON 格式的对象，keys 表示多个需要排除掉的 key 属性。

```js
import omit from 'omit.js';
const inputProps = omit(otherProps, ['onGetCaptcha', 'countDown']);
<Input {...customprops} {...inputProps} />;
```

lodash 有相同的方法 \_.omit(object, [props])

### [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)

该工具库用来处理 url 中地址与参数，能够很方便得到我们想要的数据。

```js
const { pathToRegexp, match, parse, compile } = require('path-to-regexp');
const keys = [];
const regexp = pathToRegexp('/foo/:bar', keys);
// regexp = /^\/foo\/([^\/]+?)\/?$/i
// keys = [{ name: 'bar', prefix: '/', suffix: '', pattern: '[^\\/#\\?]+?', modifier: '' }]
const regexp = pathToRegexp('/:foo/:bar');
// keys = [{ name: 'foo', prefix: '/', ... }, { name: 'bar', prefix: '/', ... }]

regexp.exec('/test/route');
//=> [ '/test/route', 'test', 'route', index: 0, input: '/test/route', groups: undefined ]
```

### [qs](https://www.npmjs.com/package/qs)

qs 是一个 url 参数转化（parse 和 stringify）的 js 库

**qs.stringify() 和 JSON.stringify()**

```js
var a = {name:'hehe',age:10};
// qs.stringify序列化结果如下
name=hehe&age=10
// 而JSON.stringify序列化结果如下：
"{"a":"hehe","age":10}"
```

**qs.parse()和 JSON.parse**

```js
let url =
  'method=query_sql_dataset_data&projectId=85&appToken=7d22e38e-5717-11e7-907b-a6006ad3dba0';
qs.parse(url);
// {method: "query_sql_dataset_data", projectId: "85", appToken: "7d22e38e-5717-11e7-907b-a6006ad3dba0"}

let str = '[{"field":"thedate","v1":"20170102"},{"field":"rev_type","v1":"大数据收入"}]';
JSON.parse(str);
// [({ field: 'thedate', v1: '20170102' }, { field: 'rev_type', v1: '大数据收入' })];
```

### react-dom

最主要的是 render

```jsx
ReactDOM.render(element, container[, callback])
```

### react-fittext

```jsx
var ReactFitText = require('react-fittext');
<ReactFitText>
  <h2>Testing React Fittext</h2>
</ReactFitText>;
```

### react-helmet-async

seo 优化，在 head 标签里加入 title 标签以及两个 meta 标签（keywords、description）。在单页面应用中，title 和 meta 都是固定的，但是在多页应用中，不同页面的 title 和 meta 可能是不一样的，因此服务端渲染项目是需要支持 title 和 meta 的修改的。react 生态圈已经有人做了一个库来帮助我们去实现这个功能，这个库就是 react-helmet。

### [use-merge-value](https://github.com/chenshuai2144/merge-value-hooks)

- useMergeValue 是一个用于合并 props 的 value 和自己的 value 的 hooks。非常简单粗暴的 hooks

```jsx
import React, { useState } from 'react';
import useMergeState from 'use-merge-value';

const ControlledInput: React.FC<{ value: string, onChange: (value: string) => void }> = (props) => {
  const [value, setValue] = useMergeState('', props);
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)}></input>{' '}
    </div>
  );
};
```

## devDependencies

### carlo

Carlo 通过 Chrome 浏览器给 Node 程序提供了渲染界面的能力。

### chalk

```
const chalk = require('chalk');
const log = console.log;

// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'));
```

### Enzyme

Enzyme 来自 airbnb 公司，是一个用于 React 的 JavaScript 测试工具，方便你判断、操纵和历遍 React Components 输出。

```js
import { shallow } from 'enzyme';
describe('<MyComponent />', () => {
  it('should render three <Foo /> components', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find(Foo)).to.have.length(3);
  });
});
```

### husky

husky 可以防止使用 Git hooks 的一些不好的 commit 或者 push。

```js
// package.json
{
  "scripts": {
    "precommit": "npm test",
    "prepush": "npm test",
    "...": "..."
  }
}
```

### lint-staged

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint-staged"
  }
},
"lint-staged": {
  "**/*.less": ["stylelint --fix", "stylelint --syntax less"],
  "**/*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
  "**/*.{js,jsx,tsx,ts,less,md,json}": ["prettier --write"]
},
```

## package.json

```json
{
  "name": "gold",
  "version": "0.1.0",
  "private": true,
  "description": "",
  "scripts": {
    "http": "http-server -a 0.0.0.0 -p 9999 -c-1 ./dist",
    "analyze": "cross-env ANALYZE=1 umi build",
    "build": "umi build",
    "build:test": "cross-env UMI_ENV=test umi build",
    "build:prod": "cross-env UMI_ENV=prod umi build",
    "deploy": "npm run site && npm run gh-pages",
    "dev": "npm run start:dev",
    "fetch:blocks": "pro fetch-blocks --branch=umi@3 && npm run prettier",
    "gh-pages": "cp CNAME ./dist/ && gh-pages -d dist",
    "postinstall": "umi g tmp",
    "lint": "umi g tmp && npm run lint:js && npm run lint:style && npm run lint:prettier",
    "lint-staged": "lint-staged",
    "lint-staged:js": "eslint --ext .js,.jsx,.ts,.tsx ",
    "lint:fix": "eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src && npm run lint:style",
    "lint:js": "eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src",
    "lint:prettier": "prettier --check \"**/*\" --end-of-line auto",
    "lint:style": "stylelint --fix \"src/**/*.less\" --syntax less",
    "prettier": "prettier -c --write \"**/*\"",
    "start": "umi dev",
    "start:dev": "cross-env REACT_APP_ENV=dev MOCK=none umi dev",
    "start:no-mock": "cross-env MOCK=none umi dev",
    "start:no-ui": "cross-env UMI_UI=none umi dev",
    "start:pre": "cross-env REACT_APP_ENV=pre umi dev",
    "start:test": "cross-env UMI_UI=none UMI_ENV=test umi dev",
    "start:prod": "cross-env UMI_UI=none UMI_ENV=prod umi dev",
    "tsc": "tsc"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint-staged"
    }
  },
  "lint-staged": {
    "**/*.less": ["stylelint --fix", "stylelint --syntax less"],
    "**/*.{js,jsx,ts,tsx}": "npm run lint-staged:js",
    "**/*.{js,jsx,tsx,ts,less,md,json}": ["prettier --write"]
  },
  "browserslist": ["> 1%", "last 2 versions", "not ie <= 10"],
  "dependencies": {
    "@ant-design/icons": "^4.2.2",
    "@ant-design/pro-layout": "^6.3.0",
    "@ant-design/pro-table": "^2.4.4",
    "@antv/data-set": "^0.11.0",
    "@antv/l7-react": "^2.1.9",
    "@types/lodash.debounce": "^4.0.6",
    "@types/lodash.isequal": "^4.5.5",
    "@types/numeral": "^0.0.28",
    "antd": "^4.4.0",
    "bizcharts": "^3.5.3-beta.0",
    "bizcharts-plugin-slider": "^2.1.1-beta.1",
    "classnames": "^2.2.6",
    "dva": "2.6.0-beta.20",
    "lodash": "^4.17.11",
    "lodash-decorators": "^6.0.0",
    "lodash.debounce": "^4.0.8",
    "lodash.isequal": "^4.5.0",
    "mockjs": "^1.0.1-beta3",
    "moment": "^2.25.3",
    "numeral": "^2.0.6", // 数字格式化
    "nzh": "^1.0.3", // 金额大写
    "omit.js": "^1.0.2", // 排除object的某个数据
    "path-to-regexp": "2.4.0",
    "prop-types": "^15.5.10",
    "qs": "^6.9.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-fittext": "^1.0.0",
    "react-helmet-async": "^1.0.4",
    "react-router": "^4.3.1",
    "umi": "^3.2.0",
    "umi-request": "^1.0.8",
    "use-merge-value": "^1.0.1"
  },
  "devDependencies": {
    "@ant-design/pro-cli": "^1.0.18",
    "@types/classnames": "^2.2.7",
    "@types/express": "^4.17.0",
    "@types/history": "^4.7.2",
    "@types/lodash": "^4.14.144",
    "@types/qs": "^6.5.3",
    "@types/react": "^16.9.17",
    "@types/react-dom": "^16.8.4",
    "@types/react-helmet": "^5.0.13",
    "@umijs/fabric": "^2.2.0",
    "@umijs/plugin-blocks": "^2.0.5",
    "@umijs/preset-ant-design-pro": "^1.2.0",
    "@umijs/preset-react": "^1.4.8",
    "@umijs/preset-ui": "^2.0.9",
    "carlo": "^0.9.46",
    "chalk": "^4.0.0",
    "cross-env": "^7.0.0",
    "cross-port-killer": "^1.1.1",
    "detect-installer": "^1.0.1",
    "enzyme": "^3.11.0",
    "eslint": "^7.1.0",
    "express": "^4.17.1",
    "gh-pages": "^3.0.0",
    "husky": "^4.0.7",
    "jsdom-global": "^3.0.2",
    "lint-staged": "^10.0.0",
    "mockjs": "^1.0.1-beta3",
    "prettier": "^2.0.1",
    "pro-download": "1.0.1",
    "puppeteer-core": "^4.0.1",
    "stylelint": "^13.0.0"
  },
  "engines": {
    "node": ">=10.0.0"
  },
  "checkFiles": [
    "src/**/*.js*",
    "src/**/*.ts*",
    "src/**/*.less",
    "config/**/*.js*",
    "scripts/**/*.js"
  ],
  "__npminstall_done": false
}
```
