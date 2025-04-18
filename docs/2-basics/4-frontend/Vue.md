### **Vue 组件怎么透传？**
```vue
<!-- 父组件 -->
<template>
  <ChildComponent class="parent-class" @click="handleClick" />
</template>

<!-- 子组件 -->
<template>
  <div>
    <button>Click Me</button>
  </div>
</template>
```
- 父组件通过属性或事件传递给子组件

  子组件没有在 `props` 或 `emits` 中显式声明，但仍然会自动应用到子组件的根元素上。
- 父组件传递的 `class="parent-class"` 和 `@click="handleClick"` 会自动透传到子组件的根元素 `<div>` 上。
- 如果不希望透传，可以在子组件中设置 `inheritAttrs: false`。

### `keep-alive` 组件缓存
- 来缓存动态组件或路由组件，避免重复渲染，提升性能。

- 当组件切换时不会触发销毁和重新创建。

当组件被 `keep-alive` 缓存时，第一次进入会触发以下生命周期：
1. `beforeCreate`
2. `created`
3. `beforeMount`
4. `mounted`
5. `activated`（`keep-alive` 特有的钩子）

属性

- `include`：只有匹配的组件会被缓存。
- `exclude`：匹配的组件不会被缓存。
- `max`：最多缓存多少个组件实例。

`keep-alive` 组件特有的生命周期钩子：

- `activated`：组件被激活时触发。
- `deactivated`：组件被停用时触发。

---

### 如何缓存多层路由的组件

- 确保路由组件有 `meta` 属性来标记，并在 `<keep-alive>` 中使用 `include` 属性来指定


- 如果超过两层路由，确保将每层的组件都包含在 `<keep-alive>` 的 `include` 属性中。


### **Vue 的生命周期**

**创建阶段**

- **`beforeCreate`**
    - **触发时机**：在实例初始化之后，数据观测（data observer）和事件配置之前被调用。
    - **特点**：此时 `data`、`methods`、`computed` 等还未初始化，无法访问。
    - **使用场景**：通常用于插件开发或初始化一些全局配置。

- **`created`**
    - **触发时机**：实例创建完成后，此时已完成数据观测、属性和方法的运算，但尚未挂载 DOM。
    - **特点**：可以访问 `data`、`methods`、`computed` 等，但无法操作 DOM。
    - **使用场景**：常用于异步请求、初始化数据。

**挂载阶段**

- **`beforeMount`**
    - **触发时机**：挂载之前，模板已编译完成，没有 DOM 。
    - **使用场景**：较少使用，通常用于调试。
- **`mounted`**
    - **触发时机**：在实例挂载到 DOM 后被调用，可以访问真实的 DOM 元素。
    - **使用场景**：常用于发起异步请求、操作 DOM、初始化插件等。

**更新阶段**

- **`beforeUpdate`**
    - **触发时机**：在数据更新之前被调用，此时 DOM 尚未重新渲染。
    - **特点**：可以访问更新前的 DOM 状态。
    - **使用场景**：较少使用，通常用于调试。

- **`updated`**
    - **触发时机**：在数据更新完成后被调用，此时 DOM 已重新渲染。
    - **特点**：可以访问更新后的 DOM 状态。
    - **使用场景**：常用于在数据更新后执行 DOM 操作。

销毁阶段（Destruction）

- **`beforeDestroy`**
    - **触发时机**：在实例销毁之前被调用，此时实例仍然完全可用。
    - **特点**：可以执行清理操作。
    - **使用场景**：常用于释放资源、取消订阅等。

- **`destroyed`**
    - **触发时机**：在实例销毁之后被调用，此时所有的事件监听器和子实例已被移除。
    - **特点**：无法再访问实例的属性和方法。
    - **使用场景**：较少使用，通常用于调试。

### **父子组件生命周期钩子函数执行顺序**

- 父组件 `beforeCreate` -> `created` -> `beforeMount`
- 子组件 `beforeCreate` -> `created` -> `beforeMount` -> `mounted`
- 父组件 `mounted`

### **vue-router 的动态路由匹配**
动态路由通过 `:` 定义参数，例如：
```javascript
{
  path: '/user/:id',
  component: User
}
```
在组件中可以通过 `this.$route.params.id` 获取参数。

###  **Vue2 和 Vue3 的区别**
**性能优化**

- **Vue2**：使用 `Object.defineProperty`。
- **Vue3**：使用 `Proxy`

**Composition API**

- **Vue2**：使用 Options API（`data`、`methods`、`computed` 等）组织代码，逻辑分散。
- **Vue3**：引入 Composition API，允许将相关逻辑组织在一起，代码更清晰、更易维护。

```javascript
// Vue2
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  }
};

// Vue3
import { ref } from 'vue';
export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    return { count, increment };
  }
};
```

**更好的 TypeScript 支持**

- **Vue2**：对 TypeScript 的支持较弱，需要额外配置。
- **Vue3**：完全使用 TypeScript 重写，提供更好的类型推断和开发体验。

**更小的体积**

- **Vue2**：体积较大，所有功能打包在一起。
- **Vue3**：通过 Tree-shaking 优化，只打包使用的功能，体积更小。

**Fragment 支持**

- **Vue2**：模板必须有一个根元素。
- **Vue3**：支持多个根元素（Fragment）。

**Teleport 组件**

- **Vue2**：没有内置的 Portal 功能，需要依赖第三方库。
- **Vue3**：提供 `Teleport` 组件，可以将组件渲染到任意 DOM 节点。

```vue
<template>
  <teleport to="body">
    <div class="modal">This is a modal</div>
  </teleport>
</template>
```

**Suspense 组件**

- **Vue2**：没有内置的异步组件加载状态处理。
- **Vue3**：提供 `Suspense` 组件，用于处理异步组件的加载状态。

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
```

**全局 API 变化**

- **Vue2**：全局 API（如 `Vue.component`、`Vue.directive`）直接挂载到 Vue 对象上。
- **Vue3**：全局 API 改为通过 `createApp` 创建实例。

```javascript
// Vue2
Vue.component('my-component', { /* ... */ });

// Vue3
const app = createApp({});
app.component('my-component', { /* ... */ });
app.mount('#app');
```

**事件总线移除**

- **Vue2**：常用 `EventBus` 实现组件通信。
- **Vue3**：推荐使用第三方库（如 Vuex、Pinia）替代 `EventBus`。

**v-model 改进**

- **Vue2**：`v-model` 只能绑定一个值。
- **Vue3**：`v-model` 支持多个绑定，并可以自定义修饰符。

```vue
<!-- Vue2 -->
<input v-model="message" />

<!-- Vue3 -->
<input v-model:title="title" v-model:content="content" />
```

**生命周期钩子变化**

- **Vue2**：生命周期钩子包括 `beforeCreate`、`created`、`beforeMount`、`mounted` 等。
- **Vue3**：新增 `setup` 函数，部分钩子名称变化（如 `beforeDestroy` 改为 `beforeUnmount`）。

---

### **Vue 框架和原生框架最大的区别**
- Vue 提供了响应式数据绑定、组件化开发、虚拟 DOM 等特性，减少了直接操作 DOM 的复杂度。
- 原生框架需要手动管理 DOM 和状态，开发效率较低。

---

### **Vue 响应式原理**
- Vue2 使用 `Object.defineProperty` 实现数据劫持。
- Vue3 使用 `Proxy` 实现响应式。

---

### **Vue 双向绑定过程，原理**
- 当用户在输入框中输入内容时，`message` 会自动更新。
- 当 `message` 的值在代码中改变时，输入框的内容也会自动更新。

**双向绑定的原理**

1. **数据劫持**：通过 `Object.defineProperty` 或 `Proxy` 监听数据的变化。
2. **依赖收集**：在渲染过程中，收集依赖（即哪些视图依赖于哪些数据）。
3. **派发更新**：当数据变化时，通知依赖的视图更新。
4. **事件监听**：监听用户输入事件，更新数据。

- 对于输入框，`v-model` 实际上是 `:value` 和 `@input` 的语法糖。
- 当用户输入时，触发 `input` 事件，更新数据。

---

### **Vue 使用虚拟 DOM 的好处**
- 减少直接操作 DOM 的性能开销。
- 通过 Diff 算法高效更新 DOM。

---

### **Composition API **
**核心概念**

1. **`setup` 函数**：Composition API 的入口函数，在组件创建之前执行。 在 `beforeCreate` 和 `created` 之间执行。
2. **响应式数据**：
    - **`ref`**：用于创建基本类型的响应式数据。
    - **`reactive`**：用于创建对象类型的响应式数据。

2. 使用 `computed` 创建计算属性。
4. **生命周期钩子**：在setup中使用 `onMounted`、`onUpdated` 等函数注册生命周期钩子。
5. **逻辑复用**：通过自定义 Hook 函数实现逻辑复用。

好处

1. **逻辑组织更清晰**：将相关逻辑组织在一起，避免 Options API 中逻辑分散的问题。
2. **更好的类型推断**：对 TypeScript 的支持更好。
3. **逻辑复用更方便**：通过自定义 Hook 函数实现逻辑复用。



### **Composition API 与 Options API 的对比**

Options API

```javascript
export default {
  data() {
    return {
      count: 0
    };
  },
  methods: {
    increment() {
      this.count++;
    }
  },
  mounted() {
    console.log('组件已挂载');
  }
};
```

Composition API

```javascript
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    onMounted(() => {
      console.log('组件已挂载');
    });
    return { count, increment };
  }
};
```

---

### **v-on 参数传递问题**

> `v-on` 用于监听 DOM 事件，并可以传递参数给事件处理函数

- 传递参数。 如果方法没有参数，默认会传递事件对象。
- 如果需要传递参数和事件对象，可以使用 `$event`。 v-on:click="handleClick('Hello Vue!', $event)"
- 支持动态事件名 v-on:[eventName]="handleClick"
- **多个事件处理函数** v-on:click="handleClick1(); handleClick2()"
- **对象语法** v-on="{ click: handleClick, mouseover: handleMouseOver }"
- 组件上使用 `v-on` 可以监听子组件触发的自定义事件 子组件用this.$emit发送

**常用修饰符：**

- `.stop`：阻止事件冒泡。
- `.prevent`：阻止默认行为。
- `.capture`：使用事件捕获模式。
- `.self`：只有当事件是从触发元素自身触发时才触发回调。
- `.once`：事件只触发一次。

---

### **v-show 和 v-if 的区别**
- `v-show`：通过 CSS 控制显示/隐藏，适合频繁切换的场景。
- `v-if`：动态添加/移除 DOM 元素，适合条件渲染。

---

### **v-model 修饰符**
- `.lazy`：输入框失去焦点时更新数据。
- `.number`：将输入值转为数字。
- `.trim`：去除输入值两端的空格。
- **自定义修饰符**：在 Vue3 中支持自定义修饰符。

```js
<!-- 父组件 -->
<template>
  <CustomInput v-model.trim="message" />
  <p>{{ message }}</p>
</template>

<script>
import CustomInput from './CustomInput.vue';

export default {
  components: {
    CustomInput
  },
  data() {
    return {
      message: ''
    };
  }
};
</script>

<!-- 子组件 CustomInput.vue -->
<template>
  <input :value="modelValue" @input="updateValue" />
</template>

<script>
export default {
  props: ['modelValue'],
  methods: {
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value);
    }
  }
};
</script>
```

---

### **计算属性 computed**
计算属性是基于响应式依赖进行缓存的，只有依赖变化时才会重新计算。

```javascript
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
```

---

### **计算属性的 setter 和 getter**

计算属性的 `setter` 通常用于以下场景：

1. **双向绑定**：当需要根据计算属性的值反向更新依赖的数据时。
2. **数据格式化**：当用户输入的数据需要格式化后再存储时。

**与 `watch` 的区别**

- **计算属性**：适合用于派生状态，具有缓存机制，只有依赖的数据变化时才会重新计算。
- **`watch`**：适合用于监听数据变化并执行副作用（如异步操作）。

---

### **计算属性 computed 和 methods 的区别**
- **computed**：
    - 用于计算基于响应式数据的值。
    - 通常用于需要基于现有数据生成的新数据。
    - 计算属性的值会被缓存，只有当其依赖的数据发生变化时才会重新计算。
- **methods**：
    - 用于定义可以在组件中调用的函数。
    - 一般用于处理事件或执行某些动作，而不是生成新的数据。

---

### **计算属性 computed 和 watch 的区别**
- **computed**：基于响应式数据计算出新值。且会被缓存。。
- **watch**：不会缓存结果，每次被观察的数据变化时，watcher 都会执行指定的回调函数。

- 使用 `computed` 时，关注的是计算并返回一个值，而使用 `watch` 时，你关注的是在某些数据变化时执行特定的逻辑或副作用。

---

### **过滤器**

> 过滤器（filters）是一种用于格式化文本的功能，可以在模板中使用

Vue3 已移除。可以用计算属性或方法替代。与过滤器相比，可读性和可维护性更高。

```js
Vue.filter('repeat', function(value, times) {
  return value.repeat(times);
});

<p>{{ message | repeat(3) }}</p> 有点像angular pipe
```

---

### **组件中的 data 为什么是函数**
- 组件可能被复用，`data` 作为函数，可以保证每个实例都有独立的数据副本。
- 增强组件的封装性，使得每个组件的状态和行为更加独立。

---

### **父子组件访问属性**
- **`props`**：用于父组件向子组件传递数据，子组件通过 `props` 选项接收。
- **事件机制**：用于子组件向父组件发送数据或通知，父组件通过 `$emit` 和事件监听来接收。

---

### **vue 组件通信方式**
- **父子组件通信**：使用 `props` 和事件机制。
- **兄弟组件通信**：通过父组件中介或使用事件总线。
- **跨级组件通信**：使用事件总线或 Vuex。
- **Vuex**：适合大型应用的集中状态管理。

---

### **vue 如何监听键盘事件**
使用 `v-on` 监听键盘事件。

```vue
<input @keyup.enter="handleEnter" />
```

### **直接给一个数组项赋值，Vue 能检测到变化吗**
**直接赋值**：如 `this.items[1] = 10`，Vue 无法检测到变化。

**使用 `Vue.set` 或 `splice`**：这些方法可以确保 Vue 正确检测到变化并更新视图

---

### **Vue 组件没办法写单元测试怎么办**
确保组件设计可测试，使用 Props 和 Events 进行通信。

选择合适的测试工具和配置测试环境。

从简单的测试用例开始，逐步增加复杂度。

调试失败的测试，确保理解组件的行为。

---

### **Vue2 的发布订阅模式具体是如何实现的**
- 当用户在点击发送按钮时，调用 `EventBus.$emit` 发布了一个名为 `message` 的事件，并传递了数据。
- **订阅**：`SubscriberComponent` 在 `created` 钩子中使用 `EventBus.$on` 订阅了 `message` 事件。当事件被触发时，它会接收到消息并更新组件的状态。
- **清理**：在 `beforeDestroy` 钩子中使用 `EventBus.$off` 清理订阅，避免内存泄漏。

#### 优点：

- **解耦**：组件之间通过事件总线进行通信，减少了组件之间的直接依赖。
- **灵活性**：可以将多个组件连接在一起，方便地传递消息。

#### 缺点：

- **维护性**：随着事件数量增加，可能导致难以跟踪和维护。
- **调试**：事件流动可能不够清晰，调试时可能较为困难。

### **使用 Vue 写一个点赞功能的组件**
```vue
<template>
  <button @click="like">{{ likes }} Likes</button>
</template>

<script>
export default {
  data() {
    return {
      likes: 0
    };
  },
  methods: {
    like() {
      this.likes++;
    }
  }
};
</script>
```

###  **父组件给予组件传值，子组件是否能修改？为什么**
子组件不能直接修改父组件传递的 `props`，这遵循了 Vue 的单向数据流原则。

###  **如果要修改父组件传入的值，怎么修改**
通过 `$emit` 触发事件，让父组件修改。

### Pinia 和 Vuex 的区别是什么

**设计理念**

- Pinia
    - 为 Vue 3 设计，利用了 Composition API，提供更灵活和现代的状态管理方式。
    - 代码更简洁，易于理解和使用。
- Vuex
    - 为 Vue 2 设计，虽然有 Vue 3 的支持，但整体设计仍然基于 Vue 2 的特性。
    - 使用较为传统的 Options API，结构较为复杂。

**API 结构**

- **Pinia**:

    - 使用 `defineStore` 定义 store，支持直接在 store 中定义状态、动作和计算属性（getters）。
    - 直接使用 `this` 访问状态和方法，简化了代码。

  ```javascript
  import { defineStore } from 'pinia';
  
  export const useStore = defineStore('store', {
    state: () => ({ count: 0 }),
    actions: {
      increment() {
        this.count++;
      }
    }
  });
  ```

- **Vuex**:

    - 使用 `Vuex.Store` 创建 store，状态、变更、动作和计算属性（getters）分开定义。
    - 需要使用 `commit` 和 `dispatch` 来修改状态和调用动作，增加了代码的复杂性。

  ```javascript
  import Vue from 'vue';
  import Vuex from 'vuex';
  
  Vue.use(Vuex);
  
  export const store = new Vuex.Store({
    state: { count: 0 },
    mutations: {
      increment(state) {
        state.count++;
      }
    },
    actions: {
      increment({ commit }) {
        commit('increment');
      }
    }
  });
  ```

**模块化**

- **Pinia**:
    - 支持无缝的模块化，多个 store 可以独立定义，且每个 store 都是响应式的。
    - 更易于组合和拆分逻辑。
- **Vuex**:
    - 支持模块化，但需要手动创建模块，结构可能变得复杂。
    - 每个模块的状态、变更、动作和计算属性需要在同一模块内定义。

**类型支持**

- **Pinia**:
    - 对 TypeScript 友好，提供更好的类型推导和支持。
    - API 设计自然支持类型定义。
- **Vuex**:
    - TypeScript 支持较弱，虽然有相关插件，但使用起来较为繁琐。

**性能**

- **Pinia**:
    - 采用更轻量的实现方式，性能更优。
    - 由于采用了 Vue 3 的响应式系统，性能开销较小。
- **Vuex**:
    - 在大型应用中，性能开销较大，尤其是在复杂的状态管理中

### **Vue中scoped的原理**

主要就是通过生成一个唯一的attribute来实现的，并且带大家通过程序编译了一下带有scoped属性css的`.vue文件`，另外要注意的是子组件的根节点会同时被自己以及父组件的样式所影响，以及scoped在slot中的表现！
