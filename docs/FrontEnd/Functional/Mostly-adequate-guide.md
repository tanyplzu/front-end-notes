# Mostly adequate guide

- [mostly-adequate-guide](https://github.com/MostlyAdequate/mostly-adequate-guide)
- Mostly adequate guide 的中文版[函数式编程指北](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/)

## Chapter 06: 示例应用

### 声明式代码

```js
// imperative
const makes = [];
for (let i = 0; i < cars.length; i += 1) {
  makes.push(cars[i].make);
}

// declarative
const makes = cars.map((car) => car.make);
```

```js
// imperative
const authenticate = (form) => {
  const user = toUser(form);
  return logIn(user);
};

// declarative
const authenticate = compose(logIn, toUser);
```
