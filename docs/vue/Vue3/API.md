---
sidebarDepth: 1
---

# API

[[toc]]

## ref、toRef 和 toRefs

### ref

```js
const foo = (ref < string) | (number > 'foo'); // foo 的类型：Ref<string | number>
foo.value = 123; // ok!
```

### toRef

可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const fooRef = toRef(state, 'foo');

fooRef.value++;
console.log(state.foo); // 2
```

### toRefs

```js
const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);
/*
stateAsRefs 的类型:
{
  foo: Ref<number>,
  bar: Ref<number>
}
*/
```

### isRef

检查值是否为一个 ref 对象。

### customRef

```html
<input v-model="text" />
```

```js
function useDebouncedRef(value, delay = 200) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}

export default {
  setup() {
    return {
      text: useDebouncedRef('hello'),
    };
  },
};
```

## Vue3 升级了那些

## Vue 3.0 之响应式系统 API

主要有：`reactive`、`ref`、`computed`、`readonly`、`watchEffect`、`watch`

reactive 参数必须是对象，

### ref

ref 和 reactive 一样，同样是实现响应式数据的方法。在业务开发中，我们可以使用它来定义一些简单数据

当 ref 作为渲染上下文的属性返回（即在 setup() 返回的对象中）并在模板中使用时，它会自动解套，无需在模板内额外书写 `.value`。之所以会自动解套，是因为 template 模板在被解析的时候，Vue 3.0 内部通过判断模板内的变量是否是 ref 类型。如果是，那就加上 `.value`，如果不是则为 reactive 创建的响应集代理数据。

### watchEffect

watch 和 watchEffect 相比较：

- 两者都可监听 data 属性的变化
- watch 需要明确监听哪个属性
- watchEffect 会根据其中应用的属性，自动监听其变化
- watchEffect 初始化时会默认执行一次

watchEffect 函数返回一个新的函数，我们可以通过执行这个函数或者当组件被卸载的时候，来停止监听行为。

```js
setup() {
  let timer = null
  let state = reactive({
    search: Date.now()
  })

  // 返回停止函数
  const stop = watchEffect((onInvalidate) => {
    console.log(`监听查询字段${state.search}`)
  })

  const handleSearch = () => {
    state.search = Date.now()
  }

  setTimeout(() => {
    console.log('执行 stop 停止监听')
    stop() // 2 秒后停止监听行为
  }, 2000)

  return {
    state,
    handleSearch
  }
}
```

watchEffect 的回调方法内有一个很重要的方法，用于清除副作用。它接受的回调函数也接受一个函数 onInvalidate。

```js
export default {
  setup() {
    let state = reactive({
      search: Date.now(),
    });
    const stop = watchEffect((onInvalidate) => {
      console.log(`监听查询字段${state.search}`);
      onInvalidate(() => {
        console.log('执行 onInvalidate');
      });
    });

    const handleSearch = () => {
      state.search = Date.now();
    };

    return {
      state,
      handleSearch,
    };
  },
};
```

### watch

```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5,
      },
    },
  },
  watch: {
    a: function(val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal);
    },
    // 方法名
    b: 'someMethod',
    // 该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function(val, oldVal) {
        /* ... */
      },
      deep: true,
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true,
    },
    // 你可以传入回调数组，它们会被逐一调用
    e: [
      'handle1',
      function handle2(val, oldVal) {
        /* ... */
      },
      {
        handler: function handle3(val, oldVal) {
          /* ... */
        },
        /* ... */
      },
    ],
    // watch vm.e.f's value: {g: 5}
    'e.f': function(val, oldVal) {
      /* ... */
    },
  },
});
vm.a = 2; // => new: 2, old: 1
```

## setup

### context 上下文

- attrs
- slots
- emit

## setup 中如何获取组件实例

使用 getCurrentInstance 获取。在组合式函数中调用也可以正常执行。

```js
import { getCurrentInstance } from 'vue';
const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance();
  },
};
```

`getCurrentInstance` 只能在 setup 或生命周期钩子中调
