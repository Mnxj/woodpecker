### What's new in React 19

1. **New APIs**:

   `useFormStatus()` — form submission status feedback; `pending: true`

   `useFormState()` — clean and effective solution for form-state management and feedback

   `use()` — simplify how we use Promises, async code, and Context

   `useOptimistic()` — show a different state during async operations

2. React Compiler

   The React Compiler now manages re-renders. React automatically decides when and how state changes and updates the UI.

   With this, developers no longer need to do it manually. It also means we no longer need `useMemo()`, `useCallback()`, and `memo`.

3. Server Components — use `'use server'` at the top

4. Actions — in forms, we can skip the `onSubmit` event and use the `action` attribute. The value of `action` is a method that submits data on the client or server.

5. Web Components

6. `ref` is now passed as a prop — no need for `forwardRef()`

### What's new in React 18

- Batching — all events are batched

- Concurrent rendering

- New root API

```js
// 17
import ReactDom from 'react-dom'
ReactDom.render(<App/>, root)
// Unmount
React.unmountComponentAtNode(root)

// React 18
import ReactDom from 'react-dom/client'
ReactDom.createRoot(root).render(<App/>)
// Unmount
root.unmount()
```

- Dropped IE support
- `flushSync`
- Component return value undefined
    - React 17 — return null; if you return undefined, an error is thrown
    - React 18 — supports null and undefined
- Hooks
    - `useId`, `useSyncExternalStore`
    - `useTransition` — mark low-priority state updates
    - `useDeferredValue` — mark low-priority variables
- Suspense

### Differences between React v15 and v16 lifecycle

16 introduced new lifecycle methods and deprecated/modified some old ones:

- `getDerivedStateFromProps`: receives new props as args, returns an object to update state, or `null` to indicate no update.
- `getSnapshotBeforeUpdate`: captures a DOM snapshot. Its return value is passed as the third arg to `componentDidUpdate`.
- `componentDidCatch`: catches errors in the child component tree. Called when any component in the tree throws.
- `getDerivedStateFromError`: catches errors in the child tree and updates state.
- `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate` are marked unsafe and will be deprecated in future versions. In React v16.3, `UNSAFE_componentWillMount`, `UNSAFE_componentWillReceiveProps`, `UNSAFE_componentWillUpdate` were introduced as replacements.

### What errors can error boundaries catch?

1. Errors thrown in a component's `render` method
2. Errors thrown in lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, etc.)
3. Errors thrown in any component in the child tree

**Cannot handle:**

1. Errors in the error boundary itself.
2. Errors in event handlers (click, keyboard, etc.). Use `try/catch`.
3. Errors in async code (`setTimeout`, `setInterval`, Promise callbacks). Use `try/catch` or `.catch()`.
4. Error boundaries only work on the client. For SSR, errors need other handling.

### Error boundaries vs `addEventListener('error')`

- **Scope**: error boundaries only work for errors in React component trees; `addEventListener('error')` catches global errors including resource load failures.
- **Error handling**: error boundaries typically render fallback UI; `addEventListener('error')` can log errors, show messages, or perform other handling.
- **Implementation**: error boundaries use specific React lifecycle methods; `addEventListener('error')` adds event listeners.

### React equivalent of Vue's keep-alive

> Vue's `keep-alive` caches inactive component instances

Use React Context + state management:

```js
// Create a React Context to store component state; restore on remount
const KeepAliveContext = createContext(null);

function KeepAliveProvider({ children }) {
  const [cache, setCache] = useState({});

  const keepAlive = (key, component) => {
    setCache(prevCache => ({
      ...prevCache,
      [key]: component
    }));
  };

  const getComponent = (key) => {
    return cache[key];
  };

  return (
    <KeepAliveContext.Provider value={{ keepAlive, getComponent }}>
      {children}
    </KeepAliveContext.Provider>
  );
}

function useKeepAlive(key) {
  const { keepAlive, getComponent } = useContext(KeepAliveContext);
  const [Component, setComponent] = useState(() => getComponent(key));

  if (!Component) {
    keepAlive(key, Component);
  }

  return Component;
}

export { KeepAliveProvider, useKeepAlive };
```

Use a third-party library like `react-activation` — typically provides higher-level caching and restoration mechanisms.

Use React's built-in features:

```js
// Use React.memo to cache render output, or useRef to keep a reference
function MyComponent() {
  const ref = useRef(null);

  useEffect(() => {
    // mount logic
    // ...

    return () => {
      // unmount logic
      // ...
    };
  }, []);

  return <div ref={ref}>...</div>;
}
```

### How can a parent call a method inside a child whose name it doesn't know?

- Use Refs

Create a ref to reference the child component, then call its methods via the ref.

- Use Context

If multiple components need to share methods, use React Context.

- Use callback props

Pass a callback function via props to the child and invoke it from inside the child.

### ag-grid

> Two needs: multi-dimensional tables and infinite scroll tables

1. Facade pattern — wrap complex UI in a simple API
2. Factory pattern — swap between different components



Multi-dimensional table: linked list implementation; built on top of Ant Design with customization for our UI needs.

Infinite scroll table: `length` (triggers scroll), `IntersectionObserver()`.

### Mind map

> Add ancestor node and zoom in/out features to the existing parts-of-product mind map component

```js
  #mindMap {
    position: relative;
    width: 600px;
    height: 400px;
    border: 1px solid #000;
   }
   .node {
    position: absolute;
    width: 100px;
    height: 50px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
   }
   #node1 {
    top: 50px;
    left: 50px;
   }
   #node2 {
    top: 200px;
    left: 300px;
   }
<div id="mindMap">
   <div id="node1" class="node">Topic 1</div>
   <div id="node2" class="node">Topic 2</div>
   <canvas id="mindMapCanvas" width="600" height="400"></canvas>
</div>

...
const canvas = document.getElementById('mindMapCanvas');
const ctx = canvas.getContext('2d');
const node1 = document.getElementById('node1').getBoundingClientRect();
const node2 = document.getElementById('node2').getBoundingClientRect();
// Draw a line between two child topics
function drawLineBetweenTopics(x1, y1, x2, y2) {
  ctx.beginPath(); // start a new path
  ctx.moveTo(x1, y1); // move to first point
  ctx.lineTo(x2, y2); // draw line to second point
  ctx.stroke(); // stroke the path
}

// Invoke
drawLineBetweenTopics(node1.x, node1.y, node2.x, node2.y);
```



### Why must every React component declare `import React from 'react'`?

JSX can't be directly parsed by browsers, so the `@babel/plugin-transform-react-jsx` plugin transforms it into runnable code.

In Babel 7.0+ / React 17+, you no longer need `import React`.

From Babel 7.0, `@babel/plugin-transform-react-jsx` supports an automatic mode.

### ref

- A JavaScript object with a `current` property you can read or set.
- Call the `useRef` Hook to get one from React.
- Persists info between renders.
- Setting `ref.current` doesn't trigger re-render.
- For non-destructive operations like focusing, scrolling, measuring DOM elements.
- Only allowed on your own component's DOM nodes; for others, wrap with `forwardRef`.



### When to add refs

In React, each update goes through [two phases](https://react.docschina.org/learn/render-and-commit#step-3-react-commits-changes-to-the-dom):

- **Render** phase: React calls your component to figure out what should be on screen.
- **Commit** phase: React applies changes to the DOM.

During the first render, DOM nodes haven't been created yet — `ref.current` is `null`.

After React updates the DOM during the commit phase, refs are immediately set to the corresponding DOM nodes.

### When to use ref

- Store a [timeout ID](https://developer.mozilla.org/docs/Web/API/setTimeout)
- Store and manipulate DOM elements
- Store other objects that don't need to be used to compute JSX

### `ref.current`

- Access the ref's current value
- Mutable
- Can be a string, object, or function

### Differences between ref and state

| ref                                                       | state                                                       |
| --------------------------------------------------------- | ----------------------------------------------------------- |
| `useRef(initialValue)` returns `{ current: initialValue }` | `useState(initialValue)` returns the current value and a setter (`[value, setValue]`) |
| Changing it doesn't trigger re-render                     | Changing it triggers re-render                              |
| Mutable — you can modify and update `current` outside the render | "Immutable" — you must use the setter to enqueue re-renders |
| Don't read or write `current` during render               | You can read state at any time; each render has its own [snapshot](https://react.docschina.org/learn/state-as-a-snapshot) |

### Common ways to use React refs

Direct access to DOM elements and instances:

- String ref

  ```js
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render(){
      <div ref="myRef"/>
    }
  }
  ```



- Object ref

  ```js
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render(){
      <div ref={this.myRef}/>
    }
  }

   console.log(this.myRef.current)
  ```



- Function ref

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render(){
    <div ref={element => this.myRef = element}/>
  }
}

 console.log(this.myRef.current)
```

- Hook ref

```js
function App(props){
  const myref = useRef();

  return (
    <>
  <div ref={element => this.myRef = element}/>
    </>
  )
}
 console.log(this.myRef.current)
```



### React vs react-dom packages

The React package focuses on building components and logic; react-dom focuses on interacting with and rendering to actual web DOM.

### flushSync

Forces React to flush any updates synchronously inside the provided callback — ensures the DOM updates immediately. May force pending Suspense boundaries to show their fallback unexpectedly.

Useful for flushing third-party integration updates.

Use case: when handling user input, animation, or DOM interaction.

### What is JSX

JSX is a syntax extension for JavaScript that lets you embed HTML tags and components directly in JS code, using `<>` for HTML tags.

### React.createElement

Takes three arguments: element type, properties (props), and children.

1. **Argument processing**: `React.createElement` first processes the args. It extracts `children` from the props object as rest args. If no `children`, set to `undefined`.
2. **Create element object**: builds a virtual DOM element containing type, props, and children.
3. **Return the virtual DOM element**.



### React render flow

1. Babel transforms JSX to `React.createElement` (16) or `jsx` (17, `react/jsx-runtime`) — also called the render method.
2. The render method returns virtual DOM.
3. React converts vDOM to Fiber, split into `beginWork` and `completeWork`.
1. `beginWork` — bottom-up — convert vDOM to Fiber, compare new vs old vDOM, find what needs updating.
   1. For parts needing updates, React creates an update queue and updates DOM in priority order.
   2. During updates, React recursively renders children.
   3. During rendering, React calls component lifecycle hooks. If state changes,
   4. `render()` is called again, repeating the flow.
2. `completeWork` — top-down — create elements in order and assemble them into a DOM tree.

### [SSR principles](https://zhuanlan.zhihu.com/p/622415299)

1. User enters a URL in the browser and sends a request.
2. Server receives the request and looks up the corresponding component in the route table; fetches required data.
3. Passes data as props, context, or store into the component.
4. React uses `renderToString()` or `ReactDOMServer.renderToStaticMarkup()` to render.
5. During rendering, React converts the component tree into an HTML string.
6. Server sends the HTML page to the client browser.
7. Once HTML loads, the browser loads and runs React's JS bundle.
8. On the client, React performs "hydration" — binding the client React app to the server-returned HTML. This ensures JS event handlers and React component state match the server-rendered HTML. After the page begins executing hydration,
9. Hydration happens in the `beginWork` phase — for each DOM node, decide whether it's reusable for the current Fiber. If yes, attach to `fiber.stateNode`.
10. In `completeWork`, skip creating these nodes.

### Why can't a React component return multiple elements?

Without a single root, React can't determine how to insert multiple elements correctly into the parent's DOM structure.

Use: `<div>`, `<Fragment>`, or shorthand `<>`.

### React lifecycle

Function components don't have them — only class components.

- Mount (post 16.3)
    - `constructor`
    - `static getDerivedStateFromProps` — decides whether state needs to update
    - `render` — create vDOM
    - `componentDidMount` — mount, generate real DOM

- Update
    - Static props change
    - `static getDerivedStateFromProps` — decides whether state needs to update
    - `shouldComponentUpdate` — based on props and state, decide whether to update the component
    - `render` — update vDOM
    - `getSnapshotBeforeUpdate` — get state before update
    - `componentDidUpdate` — called after update completes
- Unmount
    - `componentWillUnmount` — component is being removed



### Network requests — differences between `componentWillMount` and `componentDidMount`

1. **Timing**: `componentWillMount` runs before mount; `componentDidMount` runs after.
2. **SSR**: `componentWillMount` also runs during SSR; `componentDidMount` only runs on the client.
3. **Network requests**: since `componentWillMount` may be called during SSR, it's not recommended to fire requests there. `componentDidMount` is the best place since the component is guaranteed mounted.
4. **Side effects**: `componentDidMount` is ideal for side effects like requests, timers, subscriptions — these usually need the component mounted.

### Where should initial render data go?

Usually initialize state in `constructor`, or use `getDerivedStateFromProps` to set state from initial props.

For network requests and other side effects, use `componentDidMount`.

### React mount with 3 component types — textComponent, composeComponent, domComponent — differences and relationships. How to detect data changes when DOM structure changes; how to update; how to schedule?

1. `textComponent`: text component — renders plain text. The simplest component type; no children.
2. `composeComponent`: compose component — composed of other components. Can contain multiple children and coordinate their rendering and interaction.
3. `domComponent`: DOM component — corresponds to actual DOM elements. Responsible for converting the virtual DOM representation into actual DOM operations.

When the DOM structure changes, React differentiates data changes and updates via:

1. Data change detection — uses the "virtual DOM" mechanism to track component data changes.
2. Diff algorithm.
3. Update DOM — based on diff results, determine which DOM nodes need updating and apply (add, remove, modify).
4. Schedule updates — React uses a "scheduler" to coordinate updates based on component priority and other factors — decides whether to update immediately or defer.

### What if there are other tasks during an update?

React uses its scheduling mechanism — marks the update task as high priority and runs it as soon as possible, then handles other tasks.

React's scheduler is built on the browser's event loop — converts tasks to microtasks and runs them as soon as possible in the event loop.

### Common React components

Portal

> Lets components render in DOM nodes other than the parent

```react
ReactDOM.createPortal(child, container)
- Modals, tooltips

```

Fragment

> Wraps a list of children without adding extra DOM nodes

Context

> Background: Props passed through nested components → another nested component, leading to many "prop drilling" — components in the middle receive props they don't need.

A way to pass data across component levels.

Transition

> Concurrent feature introduced in React 18 — allows operations to be interrupted, avoiding fallbacks for visible content.

### React component communication

- Parent → Child: props

- Child → Parent: callback functions, event bubbling

  ```js
  const Child = () => {
    return <button> Click</button>
  }

  const Parent = () => {
    const sayName = ({name}) => {
      console.log(name)
    }
    return (
      <div onClick={() => sayName('e')}/>
  			<Child/>
      </div>
  }
  ```

- Siblings

  ```js
  class Parent extends React.Component {
    constructor(props) {
      super(props)
      this.state = { count: 0 };
    }
    increment() {
      this.setState({ count: this.state.count + 1 })
    }
    return (
      <div>
  			<ChildOne count={this.state.count}/>
        <ChildTwo onClick={this.increment} />
      </div>
  }
  ```



- Cross-level: Context, or use Redux

- Unrelated component communication: global state management like Redux

### React 16.8 — class vs function components

Differences:

- Class needs a constructor: No (function)
- Class needs manual `this` binding: No (function)
- Class has lifecycle hooks: No (function)
- Class maintains its own state: Function — stateless (originally)
- Class needs inheritance: Function — no
- Class — OOP style: 1. Encapsulation → component props/methods 2. Inheritance via extends. Function — functional style

### Hooks vs class — performance comparison

**Render perf**: in most cases, **Hooks and class components have no significant render perf difference**. React's optimizations effectively manage both.

**Update perf**: for complex updates, **Hooks** offer more efficient and flexible mechanisms, especially with `useMemo`, `useCallback`, `useEffect` reducing unnecessary renders and side effects.

**Memory/instance overhead**: function components and Hooks typically have lower memory overhead — they don't create instances like classes.

**Developer experience**: **Hooks** improve productivity, code conciseness, and maintainability — avoid `this` and complex lifecycle management.

### How to implement slots in React?

Use `props.children` or React's `cloneElement` API to render to a specific slot.

Examples: React Router's `<Route>`, React Bootstrap's `<Modal>`.

### **Things to watch with primitives vs reference types in React?**

- **Primitives (string, number, boolean)**:
    - In React, primitives are compared by value — safe to use as deps (e.g. `useEffect` dep array).
- **Reference types (object, array, function)**:
    - In React, reference types are compared by identity — same content but different references = different.
    - **Notes**:
        - Avoid creating new reference types during render (writing `style={{}}` or `onClick={() => {}}` inline in JSX) — causes unnecessary re-renders.
        - Use `useMemo` or `useCallback` to cache them.

---

###  **How to fix component re-renders caused by `useContext` value changes?**

1. **Avoid using complex objects directly as Context value**

React compares context `value` to decide whether to update components. Default is shallow comparison — if `value` is an object/array/function, even content-identical instances will trigger re-renders due to reference changes.

Solutions:

- Avoid creating new objects/arrays as `value` on every render.
- Use `useMemo` or `useCallback` to cache `value` — reference only changes when value actually changes.

2. **Split Context to reduce unnecessary re-renders**

If your context contains multiple values (user info, theme, etc.) and you only care about some, split into multiple independent contexts to avoid one's change triggering re-renders for others.

3. **Use `React.memo` or `useMemo` to optimize components**

`React.memo` is a HOC that wraps child components and avoids unnecessary re-renders. Combine with `useContext` so that when context changes, only the relevant child re-renders.

4. **Avoid too many Context subscriptions**

If a component uses many contexts whose values change often, consider merging into a single context.

By combining related values into one object and optimizing with `useMemo`/`useCallback`, you can effectively reduce re-renders.

5. **Use `useReducer` to optimize Context state management**

For complex scenarios, `useReducer` is more efficient than `useState` for managing Context state. Centralizing update logic avoids re-renders triggered by every state change.

---

### **Can `useEffect(() => {}, [])` access the DOM? What if `useState(false)` is inside?**

- **Yes, can access DOM**: `useEffect` runs after mount — DOM is rendered. You can use `document.getElementById` or `ref`.
- **Effect of `useState(false)`**:
    - If `useState(false)` triggers re-render, `useEffect` won't run again (deps array is empty).
    - To run on state change, add the state to deps: `useEffect(() => {}, [state])`.

### useEffect usage

> `useEffect(func, [])`

- No second arg → runs on every render
- Empty array → runs only on mount (`componentDidMount` equivalent)
- With deps → runs when deps change
- Return from the first arg → cleanup (`componentWillUnmount` equivalent)



Use cases:

- Fetch data
- Trigger animations
- Subscribe events
- Send analytics
- Chat

### useEffect infinite loop

```react
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [count]);

// useEffect contains set, and count is in deps;

// set updates → re-render → useEffect fires → sees count changed → set runs again

Solutions:
1. Remove count from deps; use a function update instead
2. Use memo to cache
3. useEffect event
```



### useEffect stale closure — how to fix?

```react
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [increment]);


// Clicking too fast causes a halt; useEffect is reactive — every state update triggers it to re-sync, clearing the interval
 <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>

// Solution: extract an Effect Event onTick from the Effect
18.2+
import { experimental_useEffectEvent as useEffectEvent } from 'react';   // non-reactive

 const onTick = useEffectEvent(() => {
    setCount(c => c + increment);
  });

  useEffect(() => {
    const id = setInterval(() => {
      onTick();
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
```

### experimental_useEffectEvent

> For `non-reactive` use
>
> Value: the current value at call time; to make it change, `pass parameters`

### React Hooks

> Allow state and lifecycle methods in function components

Why do we need React Hooks?

> Original intent: better solve state-logic reuse and shared logic between components.

- Move away from hard-to-understand class components
- Solve business-logic splitting difficulties
- Make stateful logic reuse easy



Limitations

- Can't fully provide class-component features to function components
- Higher demands on developers



Hooks rules

- `useEffect` — handle side effects (data fetching, subscribing, etc.)
- `useMemo` — memoize computation results
- `useLayoutEffect` — a version of `useEffect` fired before the browser repaints
- `useCallback` — memoize callbacks
    - Use cases:
        - When passing a function as a prop to a child component, ensures the child doesn't see a new function reference on parent re-render
        - Avoid creating new functions inside `useEffect`
        - Cache expensive function instances
- `useContext` — use context
- `useState` — declare state
- `useReducer` — alternative to Redux for state management
- `useTransition` — update state without blocking UI
    - `isPending` — whether a transition is pending
    - [`startTransition`](https://react.docschina.org/reference/react/useTransition#starttransition) — mark state updates as transitions
- `useSyncExternalStore` — subscribe to external stores with a built-in Hook
- `useDeferredValue` — defer values for Suspense
- `useId` — generate unique IDs
- `useInsertionEffect` — insert elements into the DOM before layout effects fire
- Custom hooks — reuse stateful logic

### Why can't React Hooks be placed inside conditionals?

- React tracks component state and side effects via a call stack.

- If Hooks are skipped or reordered under certain conditions, React can't track or manage state — possibly leading to bugs.

- Hooks run each time a function component `renders`. If `if` controls Hook execution order, some Hooks may be called in some renders but not others, breaking the call order.

### `this` in class components vs Hook context

- **Class components**: `this` refers to the component instance — can access state, props, lifecycle methods.
- **Function components**: `this` has no special meaning — function components don't create instances. State and event handlers are managed via Hooks.

### How do Hooks map to class component lifecycle?

1. **constructor**: state initialization → `useState`.
2. **componentDidMount**: after mount → `useEffect` with empty deps.
3. **componentDidUpdate**: after update → `useEffect` with omitted deps to simulate.
4. **componentWillUnmount**: before unmount → `useEffect` with a cleanup return function.
5. **getDerivedStateFromProps**: on new props → combine `useState` and `useEffect` to update state from props.

### useEffect internals — what data structures does it use?

1. On first render, the effect function runs; the returned cleanup function is stored.

2. When deps change, the previous effect is marked "stale"; on the next render, the new effect runs, and the new cleanup is stored.

3. On unmount, the stored cleanup runs (if any).



Data structures involved:

- **Task queue**: effect and cleanup functions.
- **Deps map**: each `useEffect`'s deps array.
- **Effect linked list**: ensures cleanups run in order on unmount.
- **Scheduler**: arranges effect execution based on priority and current render task.

### React's event dispatch

Workflow

1. On render, React binds handlers to DOM elements via its event system.
2. On user event, React captures it and converts it to a synthetic event.
3. Dispatches the synthetic event to the appropriate handler based on event type and target. (Optimized via event pooling to reduce memory.)
4. The handler runs; based on the return value, React decides whether more handling is needed. E.g. returning `false` stops event propagation.
5. On unmount, all bound handlers are cleaned up to avoid leaks.

### Features of the event dispatch mechanism

- **Cross-browser consistency**
- **Performance**: event pooling and batched updates reduce DOM operations.
- **Event delegation**: handlers attach to the root DOM container, not individual elements. On events, React determines the target component.
- **Async updates**: state updates are queued and batched by React's scheduler after the call stack empties.

### How to create custom synthetic events

Create a class extending `SyntheticEvent` and define methods.

In components, use `new CustomEvent(event)` and call `customEvent.customMethod()`.

### Why did React design synthetic events?

1. Cross-browser compatibility
2. Batching and reducing DOM operations
3. Easier event bubbling/capture control
4. React events are bound to components
5. Customizable behavior
6. As an internal abstraction, easier to test — no browser dependency

### **Differences from native DOM events**

1. Componentization — React events are bound to components; native events are bound to DOM elements.
2. Handler — React handlers are component props; native handlers use `addEventListener`.
3. Auto-update — when component state changes, React re-renders and updates event handlers. Native events need manual updates.
4. Cross-browser compatibility — React events are more consistent across browsers since React handles browser differences internally.
5. Performance — React events typically outperform native, with batching and optimization.
6. Naming — native: `onclick` (string handler); React: `onClick` (callback function).

### How does DOM events work

- Event capture
- Target phase
- Event bubble



All React events are mounted on the document object.

True DOM event fires first, then React event.

The events mounted on the document are executed last.

### Where are synthetic events bound in React?

In the `render phase`, when a component is rendered to the DOM, React creates synthetic event listeners for the component's event handlers and binds them to the root DOM container.

In the `trigger phase`, when the user fires an event, it first fires on the DOM element. After bubbling to the root DOM container, the event system captures it and converts it to a synthetic event. React then finds the corresponding handler based on event type and target and executes it.

### React synthetic event behavior

- **Bubbling**: synthetic events default to bubble-phase execution. For capture phase, use `onClickCapture`.
- **Prevent bubble**: call `event.stopPropagation()` inside the handler to stop further bubbling — doesn't affect native event bubbling.
- **Prevent default**: call `event.preventDefault()` to prevent default behavior — also doesn't affect native default behavior.

### Mixin, HOC, inheritance — differences and pros/cons

- Mixin
    - **Pros**: share code and methods across components.
    - **Cons**: implicit dependencies and name collisions.
- HOC
    - **Pros**: wrap components to enhance functionality.
    - **Cons**: can cause deep nesting and name collisions.
- Inheritance
    - **Pros**: build new components based on existing ones, inheriting props and methods.
    - **Cons**: long inheritance chains.



### `setState()` arguments

Two forms:

1. **Object form**:

   ```js
   this.setState({ property1: value1, property2: value2 })
   ```

2. **Function form**:

   ```js
   this.setState((prevState, props) => {
     return { /* new state */ };
   })
   ```

   Takes a function as arg, receiving:

    - `prevState`: state before update
    - `props`: current props

Advantages of function form:

1. **Async update**: React may batch multiple `setState()` calls. Function form guarantees access to the latest state.
2. **Access props**: sometimes state updates need props — function form provides easy access.

### Is `setState` sync or async?

Can be either, depending on the context.

Async:

- In synthetic events and lifecycle methods, `setState` is async. After calling, React doesn't immediately update state — it queues updates and takes the final result.

Sync:

- In native events, React can't control execution order, so state must update immediately.
- In `setTimeout`, `setInterval`, etc., `setState` is sync.



### `setState(i+1)` vs `setState(i => i+1)`?

- `setState(i+1)` passes an object directly; doesn't see the current state — can result in incorrect updates in async ops.
- `setState(i => i+1)` passes a function receiving the current state `i`, returning the new state. Ensures the latest state in async ops.

### `useState` vs `setState`

**Use cases**:

- `useState` — function components.
- `setState` — class components.

**Syntax**:

- `useState` returns an array — state value and setter.
- `setState` is a method called via `this`.

**Assignment**: `useState` uses the updater function; `setState` uses an object or function (with two args: `prevState`, `props`).

**Performance**:

- With `useState`, function components let React optimize more effectively.
- With `setState`, class components also enable React optimizations but sometimes need `shouldComponentUpdate` for manual tuning.

### useState internals

1. Calling `useState` with an initial value — React remembers it for the first render.
2. Returns an array via closure — first element is the current state, second is the updater.
3. When you call the updater, React stores the new state and schedules a re-render. On render, React uses the latest state.
4. Multiple calls to the updater may be batched into a single render.

### How does React get the updated value from `useState`?

When you call `setState` (the `useState` updater), it queues the new state for next render.

**On the next render, React uses the latest state value to re-render the component.**

### Why does `useState` cause re-renders?

**State change**: call `setState` to update state.

**Update queue**: React queues the update task.

**Re-render**: when queue updates are ready, React re-renders affected components.

**Virtual DOM diff**: React compares new vs old UI via vDOM to update only what changed.

**Real DOM update**: finally, React applies updates to the real DOM.

### Why does `setState`'s callback run after DOM update?

`setState` updates are **async** — React `batches and defers` state updates.

When state updates, callbacks wait for component re-render and DOM update before firing.

###

### Why does `useState` use an array, not an object?

```js
const [count, setCount] = useState(0);

// Array destructuring
const foo = [1, 2, 3]
const [one, two, three] = foo; // you can name them yourself
console.log(one, two, three);

// Object destructuring
const user = { id: 123, name: '123' }
const { id, name } = user; // must use original keys
console.log(id, name);

const { state, setState } = useState(false);
const { state: counter, setState: setCounter } = useState(0);
```



### useState forms

1. **Initial state as argument**

   ```js
   const [state, setState] = useState(initialState)
   ```

2. **Lazy initialization**

   ```js
   const [state, setState] = useState(() => {
     const initialState = someExpensiveComputation(props);
     return initialState;
   })
   ```

   Pass a function — called during first render, returns initial state. Useful when initial state is expensive or needs props.

   ```js
   const [user, setUser] = useState(() => {
     const initialUser = JSON.parse(localStorage.getItem('user'))
     return initialUser || { name: 'John Doe', age: 30 }
   })
   ```

Either way, `useState` returns an array with two elements:

1. `state`: current state value.
2. `setState`: function to update state. Calling it triggers a re-render.

### How does `useState` guarantee the latest value?

1. When state changes, React triggers re-render. On re-render, the latest state is used.
2. State variables and setters created by `useState` are preserved in their scope each render — they form closures, ensuring access to the current render's state.

### Legacy sync blocking mode

Start update → reconcile fiber tree → process effects (JS runs continuously, main thread occupied)

Update ends (JS engine exits main thread) → browser renders (render engine works)

### **Concurrent mode**

Start update → reconcile complete? N → reconcile fiber tree → yield main thread (split fiber reconciliation, short time slice ~5ms, exceed = yield)

Y → process effects → update ends → browser renders

- Doesn't block browser rendering long
- High-priority updates can interrupt low-priority ones

**How does it coordinate?**

Via the event loop, using `MessageChannel` for time slicing and re-scheduling time slices. `performance.now()` for timing; `channel.postMessage` and `onmessage`.

`MessageChannel` allows communication between two different JS execution contexts.



### preact

A lightweight React-compatible framework. Supports class and function components, hooks. No fiber — hooks live on `vnode.component.__hooks` array on the vDOM.

### React 15 reconciler sync uninterruptible principle

vDOM only has a children reference, no parent or sibling references. Must recursively render all vDOM to DOM in one go. If interrupted, no record of parent/child → only can continue with children, can't handle the rest of vDOM.



### React SSR — how to implement hooks?

`React-dom/server`'s `renderToString` doesn't do vDOM → fiber conversion. Hooks live in a global variable, chained.

### memoizedState

Hooks in function components correspond to a `memoizedState` linked list on the fiber node, chained via `next`. Different hooks store different values.

`memoizedState` has create and update phases.

`useXXX` is implemented as `mountXX` and `updateXX`.

```js
xxxWorkInProgressHook() // create the next list node
hook.memorizedState = [nextValue, nextDeps]
```

Hooks live on `fiber.memorizedState`.

### React scheduling

Key parts of React's scheduling:

1. **Render process + task scheduling**: React decides when to re-render based on state or prop changes. Priority and timing come from the scheduling system.
2. **Fiber architecture**: precisely controls the render process, allocates compute resources, splits rendering into many small tasks.
3. React assigns priorities to different update types (user interaction, network) to optimize perf.
4. **Event pool and event system**: high priority for user interaction (clicks, scrolls).
5. **Async rendering**: rendering and computation happen in the background; can pause and resume. Even with many updates, React can render in chunks to avoid jank.
6. **Batched updates**: batches state updates so multiple `setState` calls or other update ops are merged into one render — avoids unnecessary re-renders.

### Update internals

1. React puts the new state object into an update queue.
2. Calls the component's `render` to produce a new vDOM tree.
3. The scheduler pulls tasks from the queue. Each task usually creates a new Fiber node. React uses `requestIdleCallback` to check if there's time in the current frame to run the next task. If yes, continue; if no, pause and wait for next frame.
4. After all Fiber nodes are created, React uses Diff to compare new and old Fiber trees to find what needs updating.
5. Finally, React commits the updates to the renderer, which applies them to the real DOM.

### Fiber

**What is Fiber?**

A reworked vDOM for performance.

A data structure.

**Core purpose**:

Before React 16, React rendered synchronously — once started, it blocked until done. Long renders (complex trees or many DOM ops) caused UI jank.

**Fiber** makes rendering async — schedules and pauses tasks based on browser idle time to avoid blocking the main thread.

Three phases: schedule, reconcile, commit.



### **How is Fiber implemented?**

Fiber is React's new scheduling algorithm — builds a "Fiber tree" representing UI rendering. Each Fiber corresponds to a render task with info (priority, children).

**Workflow:**

1. **Build Fiber tree**: React creates a Fiber tree on render; each Fiber node represents a React element with component info, state, and render tasks.
2. **Scheduling**: Fiber splits rendering into multiple smaller units via the scheduler. Each task has a priority — user-interaction updates (clicks, input) are higher priority than non-critical (data load).
3. **Sliced execution**: Fiber splits rendering into many tiny slices to avoid long blocks. Fiber can pause between frames and resume during browser idle time.
4. **Idle execution**: Fiber detects browser idle time (via `requestIdleCallback`) and schedules low-priority tasks (animations, non-critical updates).

### **How to execute tasks during browser idle time**

React's Fiber uses these techniques:

1. **Task queue**: render tasks go into a queue (work queue). Each has a priority — React runs higher-priority tasks first (user input, clicks), then lower ones (background data).
2. **Scheduler**: React manages tasks via the **Scheduler** based on priority and idle time. The scheduler checks after each frame whether more tasks can run.
3. **Idle detection**: via `requestIdleCallback` (browser API) or React's internal mechanism — schedules low-priority tasks when idle.
4. **`requestIdleCallback` API**:
    - A browser API for running low-priority ops during idle time. React uses this to do non-critical work — updating background state or non-urgent renders.
5. **`yield` and `setTimeout`**: React can use `setTimeout` to split rendering into chunks — each executes a small portion, then yields control to the browser, resuming during idle time.

### Fiber update mechanism

1. Task splitting: break component rendering and updates into small tasks.

1. Linked list structure: tasks (Fibers) are organized in a linked list.

1. Priority sorting: higher priority runs first.

1. Interruptibility: execution can be interrupted so the browser can handle other tasks.

1. Concurrent execution: tasks can run concurrently. Low-priority tasks can run in background without blocking the main thread. (`requestIdleCallback` allows non-critical work during idle time.)

1. Update phases: render phase and commit phase.

   ●	Render phase: traverse the tree top-down, run rendering logic.

   ●	Commit phase: traverse bottom-up, apply rendered results to the DOM.

1. Time slicing: avoid long main-thread occupation by splitting into time slices.

1. Error handling: stronger error handling. If errors happen, React can catch and handle them without crashing the app.

1. Coordinator: responsible for scheduling, interruption, prioritization.



**Benefits** of Fiber update:

●	Better perf: task splitting, prioritization, concurrency improve perf and responsiveness.

●	Pause and resume: allows pausing updates to avoid long render blocks.

●	Error handling: enhanced error handling for app stability.

### Fiber architecture flow



1. **Scheduling**: when state changes, React queues update tasks. Scheduler prioritizes them.
2. **Work loop**: React enters a loop, pulling and running tasks. Continues until no tasks remain.
3. **Work execution**: in the work loop, React runs tasks — calling lifecycle methods, updating state, rendering components.
4. **Rendering**: during work execution, React renders components and applies results to DOM.
5. **Commit**: once all tasks complete, React enters commit phase — applies all updates at once to ensure DOM matches component state.

### FiberNode

| tag           | Fiber type. e.g. FunctionComponent, ClassComponent.          |
| ------------- | ------------------------------------------------------------ |
| elementType   | ReactElement type. e.g. REACT_ELEMENT_TYPE, REACT_PORTAL_TYPE, REACT_FRAGMENT_TYPE. |
| type          | First arg to React.createElement                             |
| stateNode     | The ReactElement corresponding to children; other state info. |
| return        | Parent reference                                             |
| child         | Child reference                                              |
| sibling       | Sibling reference                                            |
| index         | Fiber's position among siblings                              |
| key           | Identifier for the fiber                                     |
| ref           | Ref                                                          |
| pendingProps  | Incoming props                                               |
| memoizedProps | Current props                                                |
| updateQueue   | Update queue                                                 |
| memoizedState | Current state                                                |
| dependencies  | Context-related linked list                                  |
| mode          | Mode                                                         |

### requestIdleCallback

1. **Purpose**

   >  Run non-critical tasks during browser idle time without blocking critical tasks.

    - Useful for apps needing background ops in idle time — improves UX.

2. **Usage**

    - `window.requestIdleCallback(callback, options)`
    - `callback` is called during idle time, receiving an `IdleDeadline` object.
    - `options` can set `timeout` to specify a max wait.

3. **IdleDeadline object**

   Has:

    - `timeRemaining()`: milliseconds of idle time left.
    - `didTimeout`: whether the task ran due to timeout.

4. **Cancellation**

    - `window.cancelIdleCallback(id)` to cancel a registered `requestIdleCallback`.

5. **Compatibility**

    - `requestIdleCallback` is relatively new; some old browsers don't support it.
    - Use polyfills or fall back to `setTimeout`.

### React's stack reconciler

>  Computes the minimal set of operations to transform the Virtual DOM tree into the Actual DOM tree.

Stack reconciliation roughly:

1. When component state/props change, the component is updated.
2. **Generate new vDOM**
3. **Compare new vs old vDOM**
4. **Update real DOM**
5. **Batched updates**: React batches multiple ops to improve perf — fewer DOM operations.



In practice, we can optimize:

1. **Avoid unnecessary re-renders**
2. **Use immutable data structures**
3. **Sensible component decomposition**: smaller, reusable components render more efficiently.
4. **Use `key`**: when rendering lists.

### Immutable

Immutable data structures can't be modified after creation. In JS, primitives (strings, numbers, booleans) are immutable. Immutable libraries provide immutable structures.

### Diff algorithm

React's Diff steps:

1. From the root, recursively compare new and old DOM tree nodes.
2. If node types differ, destroy old and create new; if same type, update attributes (`className`, `style`).
3. **Compare children**:
    - For child lists, React uses `key` to identify new, moved, or removed nodes.
    - Without `key`, React compares children in order — can cause perf issues.
4. **Generate update ops**:
    - Based on diff, generate minimal updates (insert, move, delete) for the real DOM.

### Diff algorithm limitations

1. **Cross-level moves**:
    - React doesn't move nodes across levels. If a node moves between levels, React destroys and recreates.
2. **List render perf**:
    - Without `key`, React compares children in order — can cause perf issues.

### Double-buffer mode

`current` tree — points to the current screen DOM tree
`workInProgress` fiber — points to in-memory fiber tree

Switching between two trees achieves screen switching — avoids jank, reduces fiber node overhead, improves perf.



vDOM react element objects only track children — not siblings. So rendering is uninterruptible.

Fiber `FiberNode` is a linked list — parent, sibling, children — interruptible.

### How does diff handle `a/b/c` → `b/a/c`?



1. **Compare node types**: React iterates both lists, comparing type and key.
2. **Move nodes**: if types match but order differs, React moves nodes instead of destroying/recreating. E.g. if new `b`'s key matches old `a`'s key, React moves `a` to `b`'s position.
3. **Update attributes**: for nodes with same type and unchanged position, React updates attributes.
4. **Add/remove**: for new nodes in the new list, React creates and inserts; for removed nodes, React destroys.

### Understanding React — features?

**What it is**

A JS library providing UI-layer solutions.

**Features**

- JSX syntax

- Unidirectional data flow

- Virtual DOM

- Declarative programming

    - Programming paradigm
    - Imperative: instruct the computer step-by-step

  ```js
  const map = new Map.map(document.getElementById(map), {
    zoom: 4
    center: { lat, lng }
  })

  // Create marker
  const marker = new Map.marker({
    position: { lat, lng }
    title: 'hello World'
  })
  // Add to map
  marker.setMap(map)


  // Declarative
  <Map zoom={4}  center={(lat, lng)}>
    <Marker position={(lat, lng)} title={'Hello Marker'}/>
    </Map>
  ```

- Components

    - Everything is a component

    - Can be a function or class

- Characteristics

    - Composable
    - Reusable
    - Maintainable

- Advantages

    - Efficient: DOM simulation, no direct DOM operations
    - Flexible: works well with other frameworks
    - Cross-browser compatibility
    - Declarative design
    - Component-based dev: everything is a component — high reusability
    - Unidirectional data flow — fast and safer

### State vs Props

state

`setState` to change data → internal data change → UI update

Props — data passed in from outside (string, number, object, array, callback)

Similarities:

- Both are JS objects
- Both store information
- Both can trigger re-renders

Differences:

- Props — passed in from outside; state — managed internally
- Props — can't be modified inside the component; state — can be modified

### `super` vs `super(props)`

ES6

`extends` for class inheritance

```js
class Sup {
   constructor(name){
      this.name = name
   }
   printName() {
     console.log(this.name);
   }
}
class Sub extends Sup {
  constructor(name, age) {
    super(name)
    this.age = age;
  }
  printAge() {
    console.log(this.age);
  }
}
let jack = new Sub('jack', 18)
jack.printName();
jack.printAge();



const instance = new YourComponent(props);
instance.props = props

// In React, if you don't pass props to super(), this.props is undefined in the constructor — props are set onto the instance after initialization
```



### Ways to bind events in class components — differences

`bind` in render

```js
render() {
    return (
      <button onClick={this.showAlert.bind(this)}>show</button>
    )
  }
```



Arrow function in render

```js
render() {
    return (
      <button onClick={(e) => this.showAlert(e)}>show</button>
    )
  }
```

`bind` in constructor

```js
constructor(){
  this.showAlert = this.showAlert.bind(this)
}

showAlert() {

}

render() {
    return (
      <button onClick={this.showAlert}>show</button>
    )
  }
```

Arrow function at definition

```js
showAlert = () => {

}

render() {
    return (
      <button onClick={this.showAlert}>show</button>
    )
  }
```

### Ways to build React components



- Function components
- `React.createClass`
- Extending `React.Component`

### Ways to use CSS in React — differences

CSS rules

- Should not pollute other components' CSS
- Support dynamic CSS
- Support all CSS features
- Convenient to write



React CSS approaches

- Inline in components — easy to write
- Import a CSS file in the component — applies globally
- Module.css — scoped, uses camelCase
- CSS-in-JS (styled-components, emotion libraries)

### Understanding HOCs — use cases?

> Accepts a component and returns a new component, typically adding functionality or props.

```js
const EnhancedComponent = highOrderComponent(WrappedComponent)
```

How to write

```js
import React, { Component } from 'react'

export default (WrappedComponent) => {
  return class EnhancedComponent extends Component {
    // do something
     render() {
        return <WrappedComponent/>
     }
  }
}
```

- Keep props consistent
- Don't mutate the original component WrappedComponent
- Don't use HOCs inside render()

Use cases

- Logic shared across modules
- Permission control, logging, validation, exception handling, telemetry

```js
import React, { Component } from 'react'


class MyComponent extends Component {
    componentWillMount() {
      let data = localStorage.getItem('data')
      this.setState({ data });
    }
     render() {
        return <div>{this.state.data}</div>
     }
}


// HOC version
function WithPersistentData(WrappedComponent) { // takes a component, returns a component
  return class extends Component {
        componentWillMount() {
      let data = localStorage.getItem('data')
      this.setState({ data });
    }
     render() {
        return <WrappedComponent data={this.state.data} {...this.props}/>
     }
  }
}

class MyComponent2 extends Component {
     render() {
        return <div>{this.props.data}</div>
     }
}

const MyComponentWithData = WithPersistentData(MyComponent2)
```

**Props proxy — can only enhance, can't modify content**

- Props

```js
function HOC(WrappedComponent) {
   const newProps = { type: 'HOC' }
   return props => <WrappedComponent {...props} {...newProps} />
}
```

- State

```js
function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ''
      }
      this.onChange = this.onChange.bind(this);
    }

    onChange = (e) => {
      this.setState({
        name: e.target.value
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onChange
        }
      }
      return <WrappedComponent {...this.props} {...newProps} />
    }
  }
}

@HOC
class Example extends Component {
  render() {
    return <input name {...this.props.name} />
  }
}
```

- Inverse inheritance

```js
const HOC = (WrappedComponent) => {
  return class extends WrappedComponent {
    render() {
      return super.render()
    }
  }
}
```

1. Can access props and state

2. Implement lifecycle interception

```js
function HOC(WrappedComponent) {
   const didMount = WrappedComponent.prototype.componentDidMount;
   return class extends WrappedComponent {
     async componentDidMount() {
       if(didMount) {
         await didMount.apply(this)
       }
       // custom event handling
     }

     render() {
       return super.render();
     }
   }
}
```

3. Modify the React tree

```js
function HOC(WrappedComponent) {
   return class extends WrappedComponent {
     render() {
       const tree = super.render();
       const newProps = {};
       if(tree && tree.type === 'input') {
         newProps.value = 'chenghuai'
       }
       const props = {
         ...tree.props,
         ...newProps,
       }
       const newTree = React.cloneElement(tree, props, tree.props.children)
       return newTree;
     }
   }
}
```

4. Measure component render time

```js
class Home extends React.Component {
  render() {
    return <h1> hello </h1>
  }
}


function HOC(WrappedComponent) {
  let start, end
   return class extends WrappedComponent {
     constructor(props) {
       super(props)
       start = 0;
       end = 0;
     }
     componentWillMount() {
       if(super.componentWillMount) {
         super.componentWillMount();
         start = new Date();
       }
     }
     componentDidMount() {
       if(super.componentDidMount) {
         super.componentDidMount();
         end = new Date();
         console.log(end - start)
       }
     }
   }
}
```

**Props proxy vs inverse inheritance**

Props proxy: composition perspective — outer → inner, pass props

Inverse inheritance: inheritance perspective — inner → outer, render/props/state

### Render Props vs HOC

1. **Implementation**:
    - `Render Props`: pass a function as a prop to the child; the child calls the function to get content.
    - `HOC`: take a component, return a new component with added functionality/props.
2. **Separation of concerns**:
    - `Render Props`: separate and reuse render logic.
    - `HOC`: add behavior by wrapping the original component.
3. **Code structure**:
    - `Render Props`: props may contain many functions — more complex structure.
    - `HOC`: creates a new component — cleaner structure.
4. **Use cases**:
    - `Render Props`: dynamic decisions about child render content; share render logic across components.
    - `HOC`: generic functionality enhancement — state management, routing.



### How to implement component transitions in React?

- React-transition-group.

    - Enter: add `enter` or `enter-active`

    - Exit: add `exit`, `exit-active`

- CSSTransition — transition effects

  `in: true`

    - `xxx-enter` `xxx-enter-active`

    - `-enter-done`

  `in: false`

    - `xxx-exit` `xxx-exit-active`

- SwitchTransition — switching

- TransitionGroup — animation group. Wrap CSSTransition. Detects changes; first saves removed nodes; only truly removes after animation; for inserted nodes, render DOM first then animate.

    - Insert: render DOM first, then animate
    - Delete: animate first, then remove DOM



### Real DOM vs Virtual DOM — pros/cons

Differences

- Virtual DOM doesn't trigger reflow/repaint; real DOM frequently triggers reflow/repaint
- Cost
    - Virtual: vDOM CRUD; diff real DOM; then reflow/repaint
    - Real: full real DOM CRUD; reflow/repaint

Pros/cons

- Real DOM
    - Easy to use
    - Inefficient, poor perf
- Virtual DOM
    - Simple
    - Performance approach — avoids many reflow/repaint ops
    - Cross-platform
    - Cons: hard to optimize when extreme perf is needed; first-render of many DOM elements is slow

### How can a child prevent itself from rendering? How can a function component?

A child can control its own state to prevent rendering. If its state doesn't change, React won't re-render.

```js
import React, { useState } from 'react';

function MyComponent() {
  const [shouldRender, setShouldRender] = useState(true);

  // other logic

  return shouldRender && (
    <div>
      <h1>I'm a child component</h1>
    </div>
  );
}

export default MyComponent;
```



### Kinds of state in React

1. **Component state**
    - Internal state maintained by the component; accessible via `this.state`.
    - Most basic and common state management — for component-needed data.
2. **Props**
    - Data passed from parent to child; child can read but not directly modify.
    - One-way data flow; parent updates child props.
3. **Context**
    - Provides a way to share state across the component tree without prop drilling.
    - Good for cross-level shared global state — theme, user info.
4. **Redux state**
    - Redux is a standalone state management library with a complete mechanism.
    - State lives in the store; updated via actions and reducers.
5. **URL state**
    - URL query parameters can also be a state — manageable with React Router.
    - Useful for recording and sharing app state.
6. **Offline state**
    - Some apps manage user offline state — PWAs.
    - Use Service Worker, IndexedDB APIs.



### Context vs Redux

1. **Design goals**
    - Context is React's built-in feature for cross-component data passing.
    - Redux is a standalone state management library.
2. **State storage**
    - Context state lives in the component tree's context — distributed.
    - Redux centralizes all state in the store — single source of truth.
3. **Update mechanism**
    - Context updates via Provider and Consumer components.
    - Redux uses actions and reducers.
4. **Complexity**
    - Context for simple cross-component state sharing.
    - Redux for more complex state management needs.

### useReducer vs useState

1. **State management**
    - `useState`: simple, independent state.
    - `useReducer`: complex, interdependent state.
2. **State updates**
    - `useState`: call the setter directly.
    - `useReducer`: dispatch action objects via `dispatch`.
3. **Initial state**
    - `useState`: any type.
    - `useReducer`: must match the reducer return type.
4. **Use cases**
    - `useState`: simple state — counters, form inputs.
    - `useReducer`: complex state — form validation, pagination.

### useContext usage

```js
// 1. Create context (Context). Includes Provider and Consumer components.
const MyContext = React.createContext();
// 2. Wrap the component tree with Provider. Pass shared data via the value prop.
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const contextValue = { /* shared data */ };
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

// 3. In components needing the context, use useContext Hook to get the value.
import MyContext from './MyContext';

const MyComponent = () => {
  const contextValue = useContext(MyContext);

  // now you can use contextValue
  return (
    <div>
      {/* use data from contextValue */}
    </div>
  );
};
```

### How to modify the value obtained via useContext from descendants

- Use `useState` + `useContext`

In the providing component, use `useState` to create state, and pass both state and the setter via `useContext` to descendants:

```js
// Create context
const MyContext = createContext();

function App() {
  const [value, setValue] = useState('initial value');

  // Provide context
  return (
    <MyContext.Provider value={{ value, setValue }}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const { value, setValue } = useContext(MyContext);

  // Modify context value
  const changeValue = () => {
    setValue('new value');
  };

  return (
    <div>
      <p>Value: {value}</p>
      <button onClick={changeValue}>Change Value</button>
    </div>
  );
}
```

- Use `useReducer`

```js
const MyContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_VALUE':
      return { ...state, value: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { value: 'initial value' });

  // Provide context
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const { state, dispatch } = useContext(MyContext);

  // Modify context value
  const changeValue = () => {
    dispatch({ type: 'CHANGE_VALUE', payload: 'new value' });
  };

  return (
    <div>
      <p>Value: {state.value}</p>
      <button onClick={changeValue}>Change Value</button>
    </div>
  );
}
```



### useContext vs useReducer

1. **Function**:
    - `useContext`: access React's context object — share state and behavior in the tree.
    - `useReducer`: alternative to useState — manage complex state logic via a reducer function.
2. **State management**:
    - `useContext`: share state across the tree via context. Multiple components can use it without prop drilling.
    - `useReducer`: manage internal state via reducer. Used for complex state logic.
3. **State updates**:
    - `useContext`: updating context notifies all consuming components to re-render.
    - `useReducer`: updates re-render the current component but not others.
4. **Use cases**:
    - `useContext`: app-level state management — theme, current user.
    - `useReducer`: complex component-internal state — form state, multiple interdependent state.
5. **Combined use**:
    - `useContext` and `useReducer` can combine — `useReducer` manages internal state, `useContext` shares it across the tree.



### useReducer vs Redux

1. **Implementation**:
    - `useReducer`: built-in React Hook; manages component-internal state via a reducer. Updates trigger component re-render.
    - Redux: standalone state management library with `createStore`, `dispatch`, `subscribe` APIs to manage global state. Updates notify all subscribed components.
2. **State management scope**:
    - `useReducer`: mainly for component-internal state logic — smaller scope.
    - Redux: for app-wide global state — larger scope; suitable for complex apps.
3. **State update mechanism**:
    - `useReducer`: updates only re-render the current component.
    - Redux: updates notify all subscribed components.
4. **Code structure**:
    - `useReducer`: state management logic centralized in the reducer; component directly accesses and updates state.
    - Redux: requires store, reducer, action modules — more complex structure.
5. **Use cases**:
    - `useReducer`: component-internal state management, especially complex state logic.
    - Redux: large app global state management — easy state tracking and time-travel debugging.



### Redux — pros, cons, principles, implementation

> State container

1. Single source of truth
2. State changes are predictable
3. State changes via actions and reducers



Cons:

1. Concepts and patterns can be unfriendly to newcomers.
2. Strict mode and many function calls reduce code readability.
3. Frequent state updates can cause perf issues.




Core concepts:

◦ Store: object holding the entire app state.

◦ Actions: operate on state.

◦ Reducers: receive actions and return new state based on type.

Workflow:

a. Call `store.dispatch(action)` to fire an action.

b. Pass the current state tree and action to the reducer to compute new state.

c. An app may have multiple reducers, each managing part of the state tree. The root reducer combines them into a single state tree.

d. `store.subscribe` listens for changes. Store notifies all subscribers.



Ecosystem and middleware: Redux has rich middleware support — easily integrates async, logging, persistence.

### Connecting Redux to React components

**Class components**

1. **`Provider` component**: wrap the whole app in `Provider`, passing `store` as a prop.
2. **`connect`**: inject required state and methods into the component; subscribe to store changes; auto re-render on state update.

**Function components**

1. **`Provider` component**

2. **`useSelector`**: select pieces of Redux state as props for function components.

   `useSelector(state => state.error)`

3. **`useDispatch`**: get the Redux dispatch function; dispatch any action.

### useSelector internals

1. Uses `useContext` to access `react-redux`'s `ReactReduxContext` — contains the store reference.
2. Subscribes to store state changes. When store state updates, `useSelector` re-executes; if the returned value changes, the component re-renders.
3. If `useSelector`'s return value is the same, the component doesn't re-render.

### useDispatch internals

1. Uses `useContext` to access `ReactReduxContext`.
2. Directly returns the `dispatch` function.
3. Can dispatch any action — like `this.props.dispatch` in class components.

### Async requests in Redux

`redux-thunk` middleware

- When creating the store, use `applyMiddleware(thunk)`
- Write async action creators that receive `dispatch` and `getState`, dispatching synchronous actions at the right moments
- In components, dispatch async actions via `mapDispatchToProps`

### What if Redux state changes but you don't return new data?

State is **immutable** in Redux — you must not directly modify the state object.

When changing Redux state:

1. **Create a new object**: build a new object based on the current state.
2. **Use immutable update**: use `Object.assign()`, spread operator, or `immer` to create new state.
3. **Return new state**: return the new state object in the reducer.

### Differences between redux-thunk and redux-saga

redux-thunk

- **Simplicity**: very simple — write action creators that return functions. The function receives `dispatch` and `getState` for async ops.
- **Easy to grasp**: intuitive for beginners since async logic is handled in action creators.
- **Control**: full control over when and how to dispatch actions based on async results.
- **Limitations**: doesn't support complex async flows like cancellation or retry logic.

redux-saga

- **Complexity**: uses ES6 generators for async logic — more flexible and powerful for complex flows.
- **Flow control**: rich APIs like `takeEvery`, `takeLatest`, `call`, `put` for cancellation, retry, parallel execution.
- **Error handling**: strong error handling — catch async errors and respond.
- **Learning curve**: steeper than redux-thunk because of generators.



### How does react-redux's `connect` work?

`mapStateToProps`: maps store state to component props.

`mapDispatchToProps`: maps action creators to component props.

`mergeProps`: merges props from `mapStateToProps` and `mapDispatchToProps`.

`options`: configure `connect` behavior.

Example:

```javascript
import { connect } from 'react-redux';

// Map store state to component props
const mapStateToProps = state => ({
  count: state.count
});

// Map action creators to component props
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' })
});

// Connect the component
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyComponent);

export default ConnectedComponent;
```

The component is now connected to the store — props give access to state and action creators.



### MobX `object` vs `map` — internals

Differences in implementation:

1. **Data structure**: `object` uses native JS objects; `map` uses MobX's custom `ObservableMap` class.
2. **Hijacking**: `object` uses Proxy or `Object.defineProperty()`; `map` uses `ObservableMap`'s methods.
3. **API differences**: `object` allows direct property access; `map` requires specialized methods.

### Redux vs MobX

1. **State management**:
    - **Redux**: unidirectional data flow, state in a single store.
    - **MobX**: reactive programming — state distributed across components, updated via observer pattern.
2. **State updates**:
    - **Redux**: explicit updates via actions and reducers.
    - **MobX**: implicit updates by mutating observable state directly.
3. **Boilerplate**:
    - **Redux**: lots of boilerplate.
    - **MobX**: just mark state as observable and use decorators.
4. **Performance**:
    - **Redux**: immutable data + explicit updates — typically better perf in large apps.
    - **MobX**: implicit mechanism — may cause perf issues in some scenarios.



### How can users see different pages based on permissions?

- JS, Ajax — role → menulist JSON, show permitted menus

- React-router `onEnter`

```js
    <Router path="/home" component={App} onEnter={(nextState, replace) => {
      if(nextState.location.pathname !== '/') {
         // Check user info based on parameters
         const uid = utils.getUrlParams(nextState, 'uid')
         		if(!uid) {
              replace('/')
            } else {
              // XXXX
            }
         }
    }>

    // Or wrap as a PrivateRouter component
```

### SPA (Single-Page Application)

Loads the page once; uses JS to dynamically update content without reloading the whole page.

Advantages:

1. **Smoother UX**: pages don't reload — navigation feels seamless.
2. **Frontend/backend separation**: independent development and deployment.
3. **Easier to maintain**: frontend code centralized.

Disadvantages:

1. **First-screen load time**
2. **Bad for SEO**
3. Browser back/forward needs extra handling.
4. With JavaScript disabled, SPA can't function.



### MPA (Multi-Page Application)

Traditional web app — each page reload requests the server, which returns a new HTML document.

**Pros**:

1. **SEO-friendly**: each page is an independent HTML doc — easy for crawlers.
2. **Fast first-screen load**: each page loads only the necessary resources.
3. Browser back/forward works naturally.
4. Works with JS disabled.

**Cons**:

1. **UX**: page navigation requires reloads — less smooth than SPA.
2. **Coupled frontend/backend**: dev and deploy usually sync.
3. **Maintenance cost**: maintaining many pages can get complex.

### What is SEO?

> Search Engine Optimization — improve website ranking in search engines



SEO covers:

1. **Keyword optimization**
2. **Content optimization**
3. **Technical optimization**
    - Optimize technical structure — page load speed, mobile compatibility, etc.
    - **Sitemap**: helps search engines understand structure and content — faster, more thorough indexing.
    - **RSS**: helps search engines discover new content quickly.
    - Semantic layout.
    - SSR, static page deployment.

### React vs React Native

1. **Target platform**:
    - React — JavaScript library for web apps.
    - React Native — framework for cross-platform mobile apps; runs on iOS and Android.
2. **UI components**:
    - React uses HTML elements like `div`, `span`, `button`.
    - React Native uses native mobile UI components like `View`, `Text`, `Image` — mapped to native UI.
3. **Developer experience**:
    - React devs use browser DevTools for debugging.
    - React Native devs use platform-specific tools — Xcode, Android Studio.

### React Native vs Hybrid

1. **Architecture**:
    - React Native — cross-platform mobile framework.
    - Hybrid — typically a WebView + native code combo.
2. **Performance**:
    - React Native — closer to native performance.
    - Hybrid — perf depends on WebView implementation.
3. **User experience**:
    - React Native — uses native UI and interactions.
    - Hybrid — uses web tech for UI and interaction.
4. **Release and deployment**:
    - React Native — requires app store distribution.
    - Hybrid — can deploy like a web app to a server and access via WebView on mobile.

### URL Scheme

> Custom protocol for communication between components or modules within an app.

### RN vDOM vs React vDOM

1. **Render target**: React's vDOM renders HTML in the browser; React Native's vDOM renders native platform UI components.
2. **Platform specifics**: React Native's vDOM is adapted for each platform (iOS, Android) to ensure consistency and performance.

### How does RN communicate with Hybrid?

1. Native modules:
    - Create native modules to enable two-way communication between JS and native code.
    - Hybrid uses these modules to call RN features and receive returned data.
2. **Via WebView**:
    - Hybrid can embed WebView components in RN.
    - RN can communicate with Hybrid in WebView via `postMessage` and `onMessage`.
3. Event mechanism:
    - Build an event bus between RN and Hybrid for sending and receiving events.
    - Event bus can be built on JS event mechanism or native event mechanism.
4. **Shared data storage**
5. Network requests
6. JS bridge pattern

### JavaScriptBridge principles

1. In native code, create a `JSBridge` object and register callable methods.
2. When JS sends a message via `postMessage`,
3. `JSBridge` receives the message and finds the matching method to execute.
4. After execution, returns results via callback.

### Hybrid advantages over RN

1. **Faster dev cycles**:
    - Faster than native and RN; access to mature web dev tools and frameworks.
2. **Easier to maintain and update**:
    - Change web code directly without resubmitting to the app store.
3. **Offline support**:
    - Hybrid can leverage Service Workers, IndexedDB for better offline experience.
4. **Better SEO**:
    - Hybrid web components can be indexed by search engines.

### How to use React Native Debugger?

1. **Perf Monitor**
    - In React Native Debugger menu, select `Debug` → `Start Perf Monitoring`.
    - Records perf metrics — frame rate, CPU, memory.
2. **Analyze perf data**
    - In the Perf Monitor window, view real-time perf curves.
    - Click problem regions for more details.
    - E.g. view component tree info for a region to identify the problematic component.
3. **Analyze component render perf**
    - In React Devtools, view each component's render time. Identify slow components — likely bottlenecks. Also view update frequency, DOM changes.
4. **Analyze network perf**
    - In the Network panel, view network requests; optimize request logic.
5. **Check memory usage**
    - In the Memory panel, view memory usage. Observe curves to identify leaks or spikes; view specific allocations to locate sources.

### How to detect perf issues in React?

1. **React DevTools Profiler**
    - React's official perf analysis tool.
    - Records component render time, update count.
    - Find bottleneck components.
2. **Performance API**
    - Browser API for perf monitoring.
    - Records page load, script execution, network request timings.
    - Access via `window.performance`.
3. **User Timing API**
    - Finer-grained browser perf API.
    - Manually add perf measurement points to record specific op timings.
    - Use `window.performance.mark()` and `window.performance.measure()`.
4. **Lighthouse**
    - Google's open-source page perf analysis tool.
    - Comprehensive perf, accessibility, SEO audits.
    - Reports help quickly identify and optimize issues.

### React project performance optimization

1. **`React.memo`**

    - Wraps a component, shallow-compares props to decide whether to update. Can also use a custom comparator: `React.memo(MyComponent, (prevProps, nextProps) => ...)`.
    - **Shallow comparison** compares references, not content.

2. **`React.lazy` + `Suspense`** — dynamic component import and loading.

3. **`React.PureComponent`**

    - Shallow-compares props and state.

    ```react
     class MyComponent extends React.PureComponent {
     ```

4. **`useCallback` and `useMemo` Hooks** — cache computation results

    - `useCallback` caches function references; `useMemo` caches computation results — reduces repeat calculations.

5. **`windowing` or `virtualization`** — optimize long lists

    - Only render visible region — reduces DOM operations.

6. **`React.Fragment`** — reduce DOM nodes

    - Group children without an extra DOM node.

7. **`React.Profiler`** — performance analysis

    - Identify perf bottlenecks.

8. **`shouldComponentUpdate`** — use `nextProps`, `nextState` for shallow Props/State comparison

    - Decide whether to re-render based on prop/state changes.

9. **`React.StrictMode`** — find hidden perf issues

    - Helps identify potential issues like unintended side effects.

10. **Split large components into small ones** — small components' state updates don't affect parent's render.

### `useMemo` vs `useCallback`

useMemo:

When computation is expensive and only needs to re-run when deps change.

E.g. filtering, sorting, heavy data processing.

useCallback:

When passing a function to a child and you want the child to re-render only when deps change, not on every render.

E.g. callbacks passed to `React.memo` or `useEffect`.

### React.lazy internals

`React.lazy` accepts a function returning a Promise. On render, if the component isn't loaded, `React.lazy` throws a Promise. `Suspense` catches it and shows the `fallback`. Once loaded, `Suspense` replaces the fallback with the actual component.

### Suspense internals

1. When a component inside `Suspense` triggers an async op, `Suspense` marks it as suspended.
2. Once suspended, `Suspense` shows fallback content.
3. `Suspense` listens for the async op. Once it completes,
4. `Suspense` unsuspends and re-renders the wrapped component.

### What does `key` solve?

1. Identify list elements: when rendering a list, React uses `key` to identify each element and accurately update or remove elements.
2. Improve render perf: when list elements change, React re-renders the list. Without `key`, React may unnecessarily re-render all elements, hurting performance. With `key`, only changed elements update.
3. Preserve component state: when a component's state changes, React re-renders. If the component contains a list without `key`, React may unnecessarily re-render the whole list, losing state. With `key`, only changed elements update.

### Why doesn't React allow using index when iterating?

1. **When the array changes,** React can't accurately track each element's identity — causes unnecessary re-renders.
2. When users interact with UI, React may incorrectly update DOM.
3. **diff algorithm**: using index as `key` doesn't correctly identify element changes.

### React router modes

- **HashRouter**: uses URL hash (the `#` part) for routing — no server config needed, good compatibility, info in hash.
- **BrowserRouter**: uses HTML5 History API — no hash, uses History API for navigation and state, requires server config.
- **MemoryRouter**: stores route state in memory — for cases not needing browser URL navigation.
- **NativeRouter**: for navigation/route management in React Native apps.
- **StaticRouter**: for server-side rendering or static site generation.

### Methods to navigate to a page

**In the browser**:

- **Set `location.href` directly**: `location.href = 'newPage.html';`
- **`location.assign()`**: `location.assign('newPage.html');`

**In React**:

1. **`<Link>` component**: provided by `react-router-dom` for navigation. `to` attribute for page navigation.
2. **`history.push()`**: programmatic navigation. Pass the target path.
3. **`withRouter` HOC**: injects router properties into props. Use `history.push()` to navigate.

### How to destroy a route component on navigation

1. **`componentWillUnmount`**
2. **Cancel async operations on route switch**: cancel ops like network requests before navigation to avoid updating state after unmount.
3. **Unsubscribe events**: if the component subscribes to events (Redux store, global), unsubscribe on unmount to avoid leaks.
4. **`useEffect` cleanup**: use the cleanup function in `useEffect` for unsubscribing, clearing timers, etc.

### React-router's `<Link>` vs `<a>`

`<Link>` is React Router's component specifically for routing — efficient and convenient.

`<a>` is HTML's standard anchor tag for link navigation.

When using React Router, prefer `<Link>` for routing — it integrates with the routing system. In some cases you may still need `<a>` for external resources or non-routing operations.

### In React, can you skip react-router and use browser's native history API?

Yes — use the `history` library to manually manage routing.

```javascript
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

history.listen((location, action) => {
    console.log('Route changed:', location.pathname);
});

history.push('/new-route');
```

###

### How to monitor route changes in React?

Use `react-router-dom`'s `useHistory` or `useLocation` Hooks.

```javascript
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function App() {
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen((location, action) => {
            console.log('Route changed:', location.pathname);
        });
        return () => unlisten();
    }, [history]);

    return <div>App</div>;
}
```

### **React-router vs native routing differences?**

- **React-router**:
    - Component-based route management.
    - Supports dynamic and nested routes.
    - Uses `history` API for navigation without reload.
- **Native routing**:
    - Based on `window.location` and `hashchange` events.
    - Manually manage route state.

### Navigating away from a page with an in-flight request — what to do?

1. **Cancel the request**: if cancellable, cancel before navigation.
2. **Ignore the result**: if the result isn't important for the new page, ignore it.
3. **Handle the result on the new page**: if important, listen for completion on the new page or in `componentDidMount`.
4. **Use global state management**: store request state in Redux or MobX; the new page reads from global state.
5. **Show loading state**: during navigation, show a loading state — better UX.

### Vue vs React technology choice

1. Project size and complexity: for small projects or simple apps, Vue may fit better — gentler learning curve. For large, complex projects, React's componentization and perf may be more attractive.
2. Team tech stack and experience: if the team already knows Vue, sticking with Vue reduces learning cost. If the team knows functional programming and React ecosystem better, React fits better.
3. Project needs and features: assess based on specifics. E.g. if integrating with other libraries, React may be better.
4. Community and resources: consider community activity, doc quality, third-party libraries — an active community provides better support.

### React Profiler

- `id` — Profiler's unique identifier, identifies specific Profiler in performance data.
- `onRender` — callback invoked when components in the tree `commit updates`. Receives many args — component id, render phase (mount/update), actual render time, base render time, render start time, commit time, interactions for this update.

```js
import React, { Profiler } from 'react';

function onRenderCallback(
  id, // component identifier
  phase, // 'mount' or 'update'
  actualDuration, // actual time spent rendering this update
  baseDuration, // estimated render time for the entire subtree without memoization
  startTime, // when this update started rendering
  commitTime, // when this update committed
  interactions // set of interactions for this update
) {
  console.log(
    `${id} ${phase} took ${actualDuration} ms. ` +
    `Base duration: ${baseDuration} ms. ` +
    `Start time: ${startTime}. ` +
    `Commit time: ${commitTime}. `
  );
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      {/* other components */}
    </Profiler>
  );
}
```

When using React Profiler for analysis, open React DevTools in the browser, select the Profiler tab. Enable profiling and observe stats — render count, render time.

Notes

- React Profiler is only available in dev mode; refer to docs for production.
- Profiler only collects perf data during commit phase — doesn't address non-commit-phase issues.
- Profiler may slightly impact performance — use only when needed.

### React data flow

- **state**: component's private data managed internally

- **Props**: passed parent → child. Child can't directly modify props but can notify the parent via callbacks to update state.

- React Context API allows cross-component-level data passing without explicit prop drilling (theme).

  ```js
  const ThemeContext = React.createContext('light');

  function App() {
    return (
       <ThemeContext.Provider value="dark">
         <Toolbar />
       </ThemeContext.Provider>
     );
  }

  function Toolbar() {
    return (
       <div>
         <ThemedButton />
       </div>
     );
  }

  function ThemedButton() {
    const theme = useContext(ThemeContext);
     return <button style={{ background: theme }}>I am styled by theme context!</button>;
  }
  ```

- State lifting: when multiple components share state, lift to their common parent.




### Controlled vs uncontrolled components

> Controlled: state fully controlled by external data.
>
> Uncontrolled: not controlled — relies on the component's internal state via DOM refs.



```js
// Controlled

export class UnControll extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: 'encode' }
  }

  render() { <input name='encode' value={this.state.username} onChange={} /> }
}

// Uncontrolled
import React, { Component } from 'react';
export class UnControll extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  handleSubmit() {
    console.log(this.inputRef.current.value);
  }

  render() {
    <form onSubmit={e => this.handleSubmit(e)}>
      <input defaultValue='encode' ref={this.inputRef} />
    </form>
  }
}
// Convert uncontrolled to controlled
const [value, setValue] = useState('');
const [checked, setChecked] = useState(false);
return (
	<> // React manages data
  	<input value={value} onInput={event => setValue(event.target.value)} />
		<input type='checkbox' checked={checked} onChange={event => setChecked(event.target.value)} />
  </>
)
```

Use cases

Controlled: form implementation

Uncontrolled: real-time live validation

### Lazy loading? Batch rendering? Image lazy loading?

- **Lazy loading**: `React.lazy` + `Suspense`.
- **Batch rendering**: virtual lists or pagination for batched rendering.
- **Image lazy loading**: `IntersectionObserver`.

```javascript
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LazyComponent />
        </Suspense>
    );
}
```

### **Have you used immutable types?**

- **Immutable types** — once created, can't be modified. In JS, primitives (string, number) are immutable; reference types (object, array) are mutable.

- **In React**:

    - Immutable data avoids unintended side effects, simplifying state management.

    - Common immutable libraries: **Immer** and **Immutable.js**.

    - Example:

      ```javascript
      const state = { count: 0 };
      const newState = { ...state, count: state.count + 1 }; // immutable update
      ```
