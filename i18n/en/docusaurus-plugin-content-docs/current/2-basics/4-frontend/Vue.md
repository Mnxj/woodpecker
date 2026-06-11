### **How does Vue pass through attributes between components?**
```vue
<!-- Parent -->
<template>
  <ChildComponent class="parent-class" @click="handleClick" />
</template>

<!-- Child -->
<template>
  <div>
    <button>Click Me</button>
  </div>
</template>
```
- The parent passes attributes/events to the child.

  Even when not declared in `props` or `emits`, they're auto-applied to the child's root element.
- The parent's `class="parent-class"` and `@click="handleClick"` pass through to the child's root `<div>`.
- To opt out, set `inheritAttrs: false` in the child.

### `keep-alive` component caching
- Cache dynamic components or route components to avoid re-rendering and improve performance.

- When switching components, they aren't destroyed and recreated.

When a component is cached by `keep-alive`, the first activation triggers:
1. `beforeCreate`
2. `created`
3. `beforeMount`
4. `mounted`
5. `activated` (specific to `keep-alive`)

Props

- `include`: only matching components are cached.
- `exclude`: matching components are not cached.
- `max`: maximum number of cached instances.

Lifecycle hooks specific to `keep-alive`:

- `activated`: triggered when the component is activated.
- `deactivated`: triggered when the component is deactivated.

---

### How to cache nested route components

- Make sure route components have a `meta` flag, then use `<keep-alive>`'s `include` prop.


- For routes nested more than two levels, include every level's component in `<keep-alive>`'s `include`.


### **Vue lifecycle**

**Creation**

- **`beforeCreate`**
    - **When**: after instance init, before data observation and event setup.
    - **Characteristics**: `data`, `methods`, `computed` aren't initialized yet — can't access them.
    - **Use cases**: plugin development or initializing global config.

- **`created`**
    - **When**: instance created — data observation, computed properties, watchers, methods all set up; but DOM is not yet mounted.
    - **Characteristics**: can access `data`, `methods`, `computed`; can't access DOM.
    - **Use cases**: async requests, initializing data.

**Mounting**

- **`beforeMount`**
    - **When**: before mount; template compiled; no DOM yet.
    - **Use cases**: rarely used; mostly debugging.
- **`mounted`**
    - **When**: after instance mounts to DOM; can access real DOM elements.
    - **Use cases**: async requests, DOM operations, initializing plugins.

**Updates**

- **`beforeUpdate`**
    - **When**: before data updates cause DOM re-render.
    - **Characteristics**: access pre-update DOM state.
    - **Use cases**: rarely used; mostly debugging.

- **`updated`**
    - **When**: after data update causes DOM re-render.
    - **Characteristics**: access post-update DOM state.
    - **Use cases**: DOM operations after data updates.

Destruction

- **`beforeDestroy`**
    - **When**: before the instance is destroyed; instance is still fully usable.
    - **Characteristics**: can do cleanup.
    - **Use cases**: free resources, unsubscribe, etc.

- **`destroyed`**
    - **When**: after instance is destroyed; all event listeners and child instances are removed.
    - **Characteristics**: can't access instance properties or methods.
    - **Use cases**: rarely used; debugging only.

### **Parent/child lifecycle order**

- Parent: `beforeCreate` -> `created` -> `beforeMount`
- Child: `beforeCreate` -> `created` -> `beforeMount` -> `mounted`
- Parent: `mounted`

### **vue-router dynamic route matching**
Dynamic routes use `:` for parameters:
```javascript
{
  path: '/user/:id',
  component: User
}
```
In the component, access the parameter via `this.$route.params.id`.

###  **Vue2 vs Vue3 differences**
**Performance**

- **Vue2**: uses `Object.defineProperty`.
- **Vue3**: uses `Proxy`.

**Composition API**

- **Vue2**: Options API (`data`, `methods`, `computed`) — logic is scattered.
- **Vue3**: Composition API — group related logic, cleaner and more maintainable code.

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

**Better TypeScript support**

- **Vue2**: weak TS support; requires extra configuration.
- **Vue3**: rewritten in TypeScript; provides better type inference and DX.

**Smaller bundle**

- **Vue2**: larger; everything bundled.
- **Vue3**: tree-shakable — only used features are bundled, smaller size.

**Fragment support**

- **Vue2**: template must have a single root element.
- **Vue3**: supports multiple root elements (Fragments).

**Teleport component**

- **Vue2**: no built-in portal; depends on third-party libs.
- **Vue3**: provides `Teleport` for rendering components into arbitrary DOM nodes.

```vue
<template>
  <teleport to="body">
    <div class="modal">This is a modal</div>
  </teleport>
</template>
```

**Suspense component**

- **Vue2**: no built-in async-component loading state.
- **Vue3**: provides `Suspense` for async component loading states.

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

**Global API changes**

- **Vue2**: global APIs (`Vue.component`, `Vue.directive`) attached directly to Vue.
- **Vue3**: globals are scoped to app instances via `createApp`.

```javascript
// Vue2
Vue.component('my-component', { /* ... */ });

// Vue3
const app = createApp({});
app.component('my-component', { /* ... */ });
app.mount('#app');
```

**EventBus removed**

- **Vue2**: commonly used `EventBus` for component communication.
- **Vue3**: prefer third-party libraries (Vuex, Pinia) instead of `EventBus`.

**v-model improvements**

- **Vue2**: `v-model` only binds one value.
- **Vue3**: `v-model` supports multiple bindings and custom modifiers.

```vue
<!-- Vue2 -->
<input v-model="message" />

<!-- Vue3 -->
<input v-model:title="title" v-model:content="content" />
```

**Lifecycle changes**

- **Vue2**: hooks include `beforeCreate`, `created`, `beforeMount`, `mounted`, etc.
- **Vue3**: adds `setup` function; some hooks renamed (`beforeDestroy` → `beforeUnmount`).

---

### **Biggest difference between Vue and vanilla**
- Vue offers reactive data binding, componentization, virtual DOM — reducing the complexity of direct DOM operations.
- Vanilla requires manual DOM and state management — lower productivity.

---

### **Vue reactivity**
- Vue2 uses `Object.defineProperty` for data hijacking.
- Vue3 uses `Proxy` for reactivity.

---

### **Vue two-way binding — process and principles**
- When a user types in the input, `message` updates automatically.
- When `message` changes in code, the input value updates.

**How two-way binding works**

1. **Data interception**: use `Object.defineProperty` or `Proxy` to observe changes.
2. **Dependency collection**: during rendering, collect dependencies (which views depend on which data).
3. **Update dispatch**: when data changes, notify dependent views.
4. **Event listening**: listen for user input events to update data.

- For inputs, `v-model` is syntactic sugar for `:value` and `@input`.
- On user input, `input` fires and data updates.

---

### **Benefits of Vue's virtual DOM**
- Reduces overhead of direct DOM operations.
- Updates DOM efficiently via diff algorithm.

---

### **Composition API**
**Core concepts**

1. **`setup` function**: the Composition API entry; runs before component creation, between `beforeCreate` and `created`.
2. **Reactive data**:
    - **`ref`**: for primitive reactive data.
    - **`reactive`**: for object reactive data.

3. Use `computed` for computed properties.
4. **Lifecycle hooks**: inside `setup`, use `onMounted`, `onUpdated`, etc.
5. **Logic reuse**: use custom Hook functions.

Benefits

1. **Clearer logic organization**: keep related logic together, avoiding scattered logic in Options API.
2. **Better type inference**: better TypeScript support.
3. **Easier logic reuse**: custom Hooks make reuse straightforward.



### **Composition API vs Options API**

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
    console.log('Component mounted');
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
      console.log('Component mounted');
    });
    return { count, increment };
  }
};
```

---

### **v-on argument passing**

> `v-on` listens for DOM events and can pass arguments to the handler

- Pass arguments. If the method has no args, the event object is passed by default.
- To pass both args and the event object, use `$event`: `v-on:click="handleClick('Hello Vue!', $event)"`
- Supports dynamic event names: `v-on:[eventName]="handleClick"`
- **Multiple handlers**: `v-on:click="handleClick1(); handleClick2()"`
- **Object syntax**: `v-on="{ click: handleClick, mouseover: handleMouseOver }"`
- On a component, `v-on` can listen to custom events emitted by the child; the child uses `this.$emit`.

**Common modifiers:**

- `.stop`: stop event propagation.
- `.prevent`: prevent default.
- `.capture`: capture phase.
- `.self`: only trigger if the event was on the element itself.
- `.once`: trigger only once.

---

### **v-show vs v-if**
- `v-show`: uses CSS to show/hide — good for frequent toggles.
- `v-if`: adds/removes the DOM element — good for conditional rendering.

---

### **v-model modifiers**
- `.lazy`: update on blur (instead of on input).
- `.number`: convert input to a number.
- `.trim`: trim whitespace.
- **Custom modifiers**: supported in Vue3.

```js
<!-- Parent -->
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

<!-- Child: CustomInput.vue -->
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

### **computed**
Computed properties are cached based on their reactive dependencies — recomputed only when dependencies change.

```javascript
computed: {
  fullName() {
    return this.firstName + ' ' + this.lastName;
  }
}
```

---

### **computed setters and getters**

Setters on computed properties are useful for:

1. **Two-way binding**: updating dependencies based on the computed value.
2. **Data formatting**: format user input before storage.

**vs `watch`**

- **computed**: derived state, with caching — recomputed only when deps change.
- **`watch`**: watch data changes and run side effects (e.g. async ops).

---

### **computed vs methods**
- **computed**:
    - Used to compute values from reactive data.
    - For values derived from existing data.
    - Cached — only recomputed when deps change.
- **methods**:
    - Functions callable in the component.
    - For handling events or actions, not deriving new data.

---

### **computed vs watch**
- **computed**: derive a new value from reactive data; cached.
- **watch**: doesn't cache; runs callback whenever watched data changes.

- With `computed` you focus on computing and returning a value; with `watch` you focus on running specific logic / side effects when data changes.

---

### **Filters**

> Filters format text in templates

Removed in Vue3. Use computed properties or methods instead — more readable and maintainable.

```js
Vue.filter('repeat', function(value, times) {
  return value.repeat(times);
});

<p>{{ message | repeat(3) }}</p> // a bit like Angular pipes
```

---

### **Why is `data` a function in components**
- Components may be reused; `data` as a function gives each instance its own data copy.
- Improves component encapsulation — state and behavior are isolated.

---

### **Accessing parent/child attributes**
- **`props`**: parent → child data; the child receives via `props`.
- **Events**: child → parent data / notifications; parent listens via `$emit` and event listeners.

---

### **Vue component communication**
- **Parent/child**: via `props` and events.
- **Siblings**: via parent intermediary or event bus.
- **Cross-level**: event bus or Vuex.
- **Vuex**: centralized state management for large apps.

---

### **Listening for keyboard events in Vue**
Use `v-on` for keyboard events.

```vue
<input @keyup.enter="handleEnter" />
```

### **Does directly assigning to an array item trigger reactivity?**
**Direct assignment**: `this.items[1] = 10` — Vue can't detect it.

**Use `Vue.set` or `splice`**: these ensure Vue can detect the change and update the view.

---

### **What if a Vue component is hard to unit-test?**
Design components for testability — communicate via props and events.

Pick the right test tooling and configure the environment.

Start with simple cases and grow complexity.

Debug failing tests and ensure you understand the component's behavior.

---

### **How is Vue2's pub/sub implemented?**
- On send, the user clicks a button, calling `EventBus.$emit` to publish a `message` event with payload.
- **Subscribe**: `SubscriberComponent`'s `created` hook calls `EventBus.$on` to subscribe. When the event fires, it receives data and updates state.
- **Cleanup**: `beforeDestroy` calls `EventBus.$off` to avoid leaks.

#### Pros:

- **Decoupling**: components communicate via an event bus — fewer direct dependencies.
- **Flexibility**: many components can be wired together for messaging.

#### Cons:

- **Maintenance**: as events grow, tracking and maintaining becomes harder.
- **Debugging**: event flow can be unclear.

### **Build a "like" button component in Vue**
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

###  **Can the child modify props passed from the parent? Why?**
No — `props` follow Vue's one-way data flow.

###  **How to change a parent-passed value**
Use `$emit` to fire an event and let the parent update.

### What's the difference between Pinia and Vuex

**Design philosophy**

- Pinia
    - Designed for Vue 3, leveraging the Composition API. More flexible and modern.
    - Cleaner code, easier to understand and use.
- Vuex
    - Designed for Vue 2 (with Vue 3 support too), built around Vue 2 patterns.
    - Uses the older Options API style — more complex structure.

**API structure**

- **Pinia**:

    - Define stores via `defineStore` — supports defining state, actions, and getters together.
    - Use `this` directly to access state and methods — simpler.

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

    - Create a store via `Vuex.Store`; state, mutations, actions, and getters are defined separately.
    - Use `commit` and `dispatch` for state changes and actions — more complexity.

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

**Modularity**

- **Pinia**:
    - Seamless modularization — multiple stores defined independently; each is reactive.
    - Easier to compose and split logic.
- **Vuex**:
    - Supports modules but requires manual setup; structure can get complex.
    - Each module's state, mutations, actions, getters must be in the same module.

**Type support**

- **Pinia**:
    - TypeScript-friendly with better inference.
    - API design naturally supports types.
- **Vuex**:
    - Weaker TS support; plugins exist but feel clunky.

**Performance**

- **Pinia**:
    - Lighter implementation, better performance.
    - Uses Vue 3's reactivity system — low overhead.
- **Vuex**:
    - Higher overhead in large apps, especially with complex state management.

### **How does Vue's `scoped` work?**

It generates a unique attribute. Compiled scoped CSS in a `.vue` file effectively becomes attribute-targeted CSS. Note: a child's root node is affected by both its own and parent's styles. Also note how `scoped` behaves with `slot`s.
