---
sidebarDepth: 0
---

# 创建 AST 节点

## 如何创建

- https://astexplorer.net
- https://esprima.org/demo/parse.html

```js
function add(a, b) {
  const sum = a + b;
  return sum;
}
```

解析成 AST

```json
{
  "type": "Program",
  "body": [
    {
      "type": "FunctionDeclaration",
      "id": {
        "type": "Identifier",
        "name": "add"
      },
      "params": [
        {
          "type": "Identifier",
          "name": "a"
        },
        {
          "type": "Identifier",
          "name": "b"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "body": [
          {
            "type": "VariableDeclaration",
            "declarations": [
              {
                "type": "VariableDeclarator",
                "id": {
                  "type": "Identifier",
                  "name": "sum"
                },
                "init": {
                  "type": "BinaryExpression",
                  "operator": "+",
                  "left": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "right": {
                    "type": "Identifier",
                    "name": "b"
                  }
                }
              }
            ],
            "kind": "const"
          },
          {
            "type": "ReturnStatement",
            "argument": {
              "type": "Identifier",
              "name": "sum"
            }
          }
        ]
      },
      "generator": false,
      "expression": false,
      "async": false
    }
  ],
  "sourceType": "script"
}
```

创建 AST

```js
t.functionDeclaration(id, params, body, generator, async);
```

- id: Identifier (default: null)
- params: `Array<Identifier | Pattern | RestElement>` (required)
- body: BlockStatement (required)

```js
t.functionDeclaration(
  t.identifier('add'), // 函数名
  [t.identifier('a'), t.identifier('b')], // 参数
  t.blockStatement([
    // 函数体
    t.variableDeclaration(
      // const sum = a + b
      'const',
      [
        t.variableDeclarator(
          t.identifier('sum'), // 变量名
          t.binaryExpression('+', t.identifier('a'), t.identifier('b')) // a + b
        ),
      ]
    ),
    t.returnStatement(t.identifier('sum')), // return sum
  ])
);
```

## @babel/types 来创建 AST 节点

### 创建数字

```js
t.numericLiteral(1);

// 1
```

### 创建字符串

```js
t.stringLiteral('a str');

// "a str"
```

### 创建布尔值

```js
t.booleanLiteral(true);
t.booleanLiteral(false);

// true
// false
```

### 创建对象

```js
const nameKey = t.objectProperty(t.identifier('name'), t.stringLiteral('Joel'));
const agetKey = t.objectProperty(t.identifier('age'), t.numericLiteral(18));
t.objectExpression([nameKey, agetKey]);

// {
//   name: "Joel",
//   age: 18
// }
```

### 创建获取对象的属性

```js
t.memberExpression(t.identifier('obj'), t.identifier('name'));
t.memberExpression(t.identifier('obj'), t.identifier('name'), true);

// obj.name
// obj[name]
```

### 创建数组

```js
const item1 = t.numericLiteral(1);
const item2 = t.numericLiteral(2);
t.arrayExpression([item1, item2]);

// [1, 2]
```

### 创建变量定义

```js
t.variableDeclaration(
  'let', // 还支持 const 和 var
  [
    t.variableDeclarator(
      t.identifier('b') // 变量名
    ),
  ]
);

t.variableDeclaration(
  'let', // 还支持 const 和 var
  [
    t.variableDeclarator(
      t.identifier('b') // 变量名
    ),
  ]
);
t.assignmentExpression('=', t.identifier('b'), t.numericLiteral(1));

// let a = 1;
// let b;
// b = 1
```

### 创建定义函数

```js
t.functionDeclaration(
  t.identifier('add'), // 函数名
  [t.identifier('a'), t.identifier('b')], // 参数
  t.blockStatement([
    // 函数体
    t.variableDeclaration(
      // const sum = a + b
      'const',
      [
        t.variableDeclarator(
          t.identifier('sum'), // 变量名
          t.binaryExpression('+', t.identifier('a'), t.identifier('b')) // a + b
        ),
      ]
    ),
    t.returnStatement(t.identifier('sum')), // return sum
  ])
);
```

结果

```js
function add(a, b) {
  const sum = a + b;
  return sum;
}
```

[完整代码](https://github.com/iamjoel/ast-note/blob/master/src/create.js)

## @babel/template
