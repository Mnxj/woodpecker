### React 19更新了啥

1. **新的 APIs**: 

   useFormStatus() ，表单提交状态反馈 pending true

   useFormState() 为表单状态管理和反馈显示提供了一个简洁有效的解决方案

   use()  简化我们如何使用 promises、async 代码和 context

   useOptimistic()  在异步操作进行中显示不同的状态

2. React 编译器

   React 编译器现在将管理这些重新渲染。React 将自动决定何时以及如何更改状态并更新 UI。

   有了这个，我们开发人员不再需要手动操作。这也意味着不再需要使用 useMemo()、useCallback() 和 memo。

3. 服务器组件，在顶部使用'use server'

4. Action： 在表单中我们可以省略 onSubmit 事件，并使用 action 属性。action 属性的值将是一个方法，用于在客户端或服务器端提交数据

5. web组件

6. ref 现在将作为 props 传递，而不是使用 forwardRef() 钩子

### React 18有哪些更新

- 批处理 所有事件都进行批处理

- 并行渲染

- 引入新的root API

```js
//17
import ReactDom from 'react-dom'
ReactDom.render(<App/>,root)
//卸载
React.unmoutComponentAtNode(root)

//react18
import ReactDom from 'react-dom/client'
ReactDom.createRoot(root).render(<App/>)
//卸载
root.unmount()
```

- 去掉了对IE浏览器支持

- flush[flʌʃ]Sync

- React 组件返回值更新
  - react 17 return null if返回undefined报错
  - React 18 支持null undefined
- Concurrent 并行模式
- Hook. 
  - `useId`、`useSyncExternalStore` 
  - useTransition 来标记低优先的 state 更新
  - useDeferredValue ：可以⽤来标记低优先的变量

- Suspense

### React v15和v16的区别 生命周期函数

16 引入了新的生命周期方法，并且对一些旧的生命周期方法进行了弃用或修改。主要变化如下：

- `getDerivedStateFromProps`：接收新的 props 作为参数，并返回一个对象来更新 state，或者返回 null 来表示新的 props 不需要更新 state。
- `getSnapshotBeforeUpdate`：可以获取 DOM 的快照。返回的值将作为第三个参数传递给 `componentDidUpdate`。
- `componentDidCatch`：用于捕获子组件树中的错误。如果组件树中的任何组件抛出错误，它将被调用。
- `getDerivedStateFromError`：用于在子组件树中捕获错误并更新 state
- `componentWillMount`、`componentWillReceiveProps` 和 `componentWillUpdate` 被标记为不安全的生命周期方法，并在未来的版本中被弃用。在 React v16.3 中，引入了 `UNSAFE_componentWillMount`、`UNSAFE_componentWillReceiveProps` 和 `UNSAFE_componentWillUpdate` 作为替代。

### 错误边界能捕获哪些错误？

1. 组件的 `render` 方法抛出错误
2. 生命周期方法（如 `componentDidMount`、`componentDidUpdate`、`componentWillUnmount` 等）抛出错误
3. 子组件树中的任何组件抛出错误

**不能处理的：**

1. 错误边界组件自身抛出错误。
2. 事件处理器（如点击事件、键盘事件等）中。事件处理器中的错误需要通过其他方式处理，例如使用 `try...catch` 语句。
3. 在异步代码中（如 `setTimeout`、`setInterval`、`Promise` 回调等）。对于异步代码，需要使用 `try...catch` 语句或者 `Promise` 的 `.catch()` 方法来处理错误。
4. 错误边界仅适用于客户端渲染。在服务器端渲染（SSR）中，错误需要通过其他方式处理。

### 错误边界和 `addEventListener('error')`

- **适用范围**：错误边界仅适用于 React 组件树中的错误，而 `addEventListener('error')` 可以捕获全局范围内的错误，包括资源加载错误。
- **错误处理**：错误边界通常用于渲染备用 UI，而 `addEventListener('error')` 可以用于记录错误、显示错误消息或执行其他错误处理逻辑。
- **实现方式**：错误边界是通过实现特定的 React 生命周期方法来创建的，而 `addEventListener('error')` 是通过添加事件监听器来实现的。

### React实现vue的keep-alive

> `keep-alive` 在 Vue 中用于缓存不活动的组件实例

使用 React Context 和状态管理

```js
//创建一个 React Context 来存储组件的状态，并在组件重新挂载时恢复状态。
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

使用第三方库 `react-activation`。这些库通常提供了更高级的缓存和恢复机制，可以更方便地实现类似的功能。

使用 React 的内置特性

```js
//使用 React.memo 来缓存组件的渲染结果，或者使用 useRef 来保持组件的引用。
function MyComponent() {
  const ref = useRef(null);

  useEffect(() => {
    // 组件挂载后执行的逻辑
    // ...

    return () => {
      // 组件卸载前执行的逻辑
      // ...
    };
  }, []);

  return <div ref={ref}>...</div>;
}
```

### 假如我想在父组件当中执行一个子组件内部的方法, 但我还不知道这个子组件内部方法的名字, 该如何实现

- 使用 Refs

你可以通过创建一个 ref 来引用子组件，然后通过这个 ref 调用子组件的方法

- 使用 Context

如果你需要在多个组件之间共享方法，可以使用 React Context 来实现。

- 使用 Callback Props

你可以通过 props 将一个回调函数传递给子组件，然后在子组件内部调用这个回调函数。

### ag-gird表格组件

> 两个需求，多维表格,,和无限滚动表格

1. 外观模式实现将复杂ui变为简单api
2. 通过工厂模式实现不同组件切换



多维表格：链表的方式实现,对antdesign二次开发，适配我们项目UI需求和展示。

无限滚动表格： length（触发滚动），IntersectionObserer();

### 脑图实现

> 对项目之前的零件脑图组件加入前序节点，加入放大缩小功能

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
   <div id="node1" class="node">主题1</div>
   <div id="node2" class="node">主题2</div>
   <canvas id="mindMapCanvas" width="600" height="400"></canvas>
</div>

...
const canvas = document.getElementById('mindMapCanvas');
const ctx = canvas.getContext('2d');
const node1 = document.getElementById('node1').getBoundingClientRect();
const node2 = document.getElementById('node2').getBoundingClientRect();
// 绘制线条连接两个子主题
function drawLineBetweenTopics(x1, y1, x2, y2) {
  ctx.beginPath(); // 开始一个新的路径
  ctx.moveTo(x1, y1); // 移动到第一个点
  ctx.lineTo(x2, y2); // 从第一个点画线到第二个点
  ctx.stroke(); // 描边路径，实际绘制线条
}

// 调用函数绘制线条
drawLineBetweenTopics(node1.x, node1.y, node2.x, node2.y);
```



### 为什么 react 组件， 都必须要申明⼀个 import React from 'react';

JSX 语法不能直接被浏览器解析和运⾏，因此需要插件 @babel/plugin-transform-react

jsx 来转换语法，使之能够在浏览器或任何 JavaScript 环境中执⾏

Babel 7.0+ / React 17+ ， 可以不再需要 import React

在 Babel 7.0 版本之后， @babel/plugin-transform-react-jsx 插件还⽀持⼀个⾃动模式，

### ref

- javaScript 对象，具有一个名为 `current` 的属性，你可以对其进行读取或设置。
- 调用 `useRef` Hook 来让 React 给你一个 ref。
- 允许你在组件的重新渲染之间保留信息。
- 设置 ref 的 `current` 值不会触发重新渲染。
- 用于非破坏性操作，例如聚焦、滚动或测量 DOM 元素
- 只允许自己组件DOM 节点,访问其他使用`forwardRef`包裹



### 何时添加refs

在 React 中，每次更新都分为 [两个阶段](https://react.docschina.org/learn/render-and-commit#step-3-react-commits-changes-to-the-dom)：

- 在 **渲染** 阶段， React 调用你的组件来确定屏幕上应该显示什么。
- 在 **提交** 阶段， React 把变更应用于 DOM。

第一次渲染期间，DOM 节点尚未创建，因此 `ref.current` 将为 `null`

React 在提交阶段设置更新 DOM 后，React 立即将它们设置到相应的 DOM 节点。

### 何时使用 ref

- 存储 [timeout ID](https://developer.mozilla.org/docs/Web/API/setTimeout)
- 存储和操作 DOM 元素
- 存储不需要被用来计算 JSX 的其他对象。

### ref.current

- 访问ref的当前值
- 可变
- 可以是字符串、对象、函数

### ref 和 state 的不同之处



| ref                                                     | state                                                        |
| ------------------------------------------------------- | ------------------------------------------------------------ |
| `useRef(initialValue)`返回 `{ current: initialValue }`  | `useState(initialValue)` 返回 state 变量的当前值和一个 state 设置函数 ( `[value, setValue]`) |
| 更改时不会触发重新渲染                                  | 更改时触发重新渲染。                                         |
| 可变 —— 你可以在渲染过程之外修改和更新 `current` 的值。 | “不可变” —— 你必须使用 state 设置函数来修改 state 变量，从而排队重新渲染。 |
| 你不应在渲染期间读取（或写入） `current` 值。           | 你可以随时读取 state。但是，每次渲染都有自己不变的 state [快照](https://react.docschina.org/learn/state-as-a-snapshot)。 |

### React refs经常使用的方式

允许用户直接访问DOM元素和实例

- 传入字符串

  ```js
  class MyComponent extends React.Compoent {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render(){
      <div ref="myRef"/>
    }
  }
  ```

  

- 传入变量

  ```js
  class MyComponent extends React.Compoent {
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

  

- 传入函数

```js
class MyComponent extends React.Compoent {
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

- 传入hook

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



### React和react-dom包有啥区别

React 包侧重于组件的构建和逻辑，而 react-dom 包侧重于将组件与实际的网页 DOM 进行交互和呈现。

### flushSync

强制 React 在提供的回调函数内同步刷新任何更新，确保 DOM 立即更新，可能会意外地强制挂起的 Suspense 边界显示其后备状态。

刷新第三方集成更新，

应用：在处理用户输入、动画或与 DOM 进行交互时

### jsx是什么

JSX 是 JavaScript 的一种语法扩展，允许在 js 代码中直接嵌入 HTML 标签和组件， `<>` 来表示 HTML 标签

### React.createElement

接受三个参数：元素类型（type）、属性（props）和子元素（children）。

1. **参数处理**：`React.createElement`首先会对传入的参数进行处理。将属性对象中的`children`属性提取出来，作为剩余参数处理。如果没有传入`children`，则将其设置为`undefined`。
2. **创建元素对象**：然后，会创建一个包含元素类型、属性和子元素的虚拟 DOM 元素。
3. **返回虚拟 DOM 元素**；

### React渲染流程

1.	babel把 jsx代码转为 React.createElement（16），jsx(17 react/jsx-runtime） 形式又叫render方法。
2.	render方法会返回虚拟dom
3.	react会把虚拟dom转为fiber，过程有分为beighwork和completeWork
   1.	beighwork 从下往上 将vdom 转 fiber，比较虚拟 DOM 和旧虚拟DOM，找出需要更新的部分，
      1.	对于需要更新的部分，React 会创建一个更新队列，并按照优先级顺序依次更新 DOM
      2.	在更新过程中，React 会递归地渲染子组件,
      3.	在渲染过程中，React 会调用组件的生命周期钩子 如果组件的状态发生变化
      4.	再次调用render()方法，并重复上述渲染流程
   2.	completeWork 从上往下 按顺序创建元素，组装成一个 dom 树。

### [服务端渲染原理](https://zhuanlan.zhihu.com/p/622415299)

1. 用户在浏览器中输入 URL 并发起请求。
2. 服务器接收到客户端的请求，并根据请求的 URL 查找路由表到对应的组件，拿到需要请求的数据，
3. 将数据作为 props、context或者store 形式传⼊组件
4. react 使用renderToString() 把组件渲染为 html 字符串，
5. 服务器将生成的 HTML 页面发送给客户端浏览器。
6. 客户端浏览器接收到服务器发送的 HTML 页面后开始执行hydrate， 
7. hydrate是在 beginWork 阶段，依次判断 dom 是否可以复用到当前 fiber，可以的话就设置到 fiber.stateNode，
8. 然后在 completeWork 阶段就可以跳过节点的创建。

### React 组件为什不能不能返回多个元素

如果组件返回多个元素，那么 React 将无法确定如何将这些元素正确地插入到父组件的 DOM 结构中

使用： `<div>`、`<Fragment>` 或简写的 `<>`

### React生命周期

函数没有，只有类组件有

- 挂载 16.3后
  - constructor
  - Static getDerivedStateFromProps 判断state是否需要更新
  - render 创建Vdom 阶段
  - componentDidMount 挂载生成真实dom

- 更新
  - Static props 发生变化
  - Static getDerivedStateFromProps 判断state是否需要更新
  - shouldComponentUpadte 根据props和state判断是否需要更新组件
  - render更新Vdom
  - getSnapshotBeforupdate获取更新前状态 [ˈsnæpʃɑt]
  - componentDidUpate 完成更新后调用
- 卸载
  - componentWillUnmount 组件被移除



### 网络请求在 componentWillMount 和 componentDidMount 有什么区别

1. **调用时机**：`componentWillMount` 在组件挂载前调用，而 `componentDidMount` 在组件挂载后调用。
2. **服务器端渲染**：`componentWillMount` 在服务器端渲染时也会被调用，而 `componentDidMount` 只在客户端渲染时调用。
3. **网络请求**：由于 `componentWillMount` 可能在服务器端渲染时被调用，因此不推荐在该方法中发起网络请求。`componentDidMount` 是发起网络请求的最佳位置，因为它保证了组件已经挂载到 DOM 中。
4. **副作用操作**：`componentDidMount` 是执行副作用操作（如发起网络请求、设置定时器、订阅事件等）的理想位置，因为这些操作通常需要在组件挂载到 DOM 后执行

### 初始渲染数据放在哪个⽣命周期中

初始渲染数据通常放在 `constructor` 中初始化状态，或者使用 `getDerivedStateFromProps` 来根据初始的 props 设置状态。

对于网络请求等副作用操作，应放在 `componentDidMount` 生命周期方法中执行。

### React挂载的时候有3个组件，textComponent,composeComponent,domComponent,区别和关系，Dom的结构法生变化时怎么区分data的变化，怎么更新，怎么调度

1. `textComponent`：表示文本组件，通常用于渲染纯文本内容。它是最简单的组件类型，没有子组件。
2. `composeComponent`：表示组合组件，它由其他组件组合而成。组合组件可以包含多个子组件，并负责协调它们的渲染和交互。
3. `domComponent`：表示 DOM 组件，它与实际的 DOM 元素相对应。DOM 组件负责将组件的虚拟 DOM 表示转换为实际的 DOM 操作，并将其渲染到页面上。

当 DOM 的结构发生变化时，React 会通过以下步骤来区分数据的变化并进行更新：

1. 数据变化检测：“虚拟 DOM”的机制来跟踪组件的数据变化。
2. diff算法
3. 更新 DOM：根据差异比较的结果，React 会确定需要更新的 DOM 节点，并进行相应的操作。这可能包括添加、删除或修改 DOM 元素。
4. 调度更新：React 使用一种称为“调度器”的机制来协调组件的更新。根据组件的优先级和其他因素，决定是否立即更新或延迟更新。

### 如果更新的时候还有其他任务存在怎处理

在更新过程中还有其他任务存在，使用它的调度机制来处理，将更新任务标记为高优先级，并尽快执行这些任务，以确保组件的状态能够及时更新。之后会去执行其他任务。

React 的调度机制是基于浏览器的事件循环机制实现的。将任务转换为微任务，并在浏览器的事件循环中尽快执行这些微任务。

### React 常用组件

Protal

> 让组件渲染在除了父组件之外的dom节点的方式

```react
ReactDom.craateProtal(child,container)
-弹框   提示框
 
```

Fargment

> 包裹子列表，不产生额外的dome节点的方法

context

> 前言：Props 嵌套组件-》 另一个嵌套组件，嵌套会被传递很多称，不需要的组件也引入了，多余的数据源来源不清晰

跨层级组件数据传递的一个方法

Transition

> react18引入的并发特效 允许操作被中断，避免回到可见内容

### React 组件通信

- 父组件 -> 子组件 props

- 子组件 -> 父组件 回调函数 事件冒泡

  ```js
  const Child = () => {
    return <button> 点击</button>
  }
  
  const Parent = () => {
    const sayName = {name} => {
      console.log(name)
    }
    return (
      <div onClick=(()=> sayName('e'))/>
  			<Child/>
      </div>
  }
  ```

- 兄弟

  ```js
  class Parent extends React.Component {
    constructor(props) {
      super(props)
      this.state= { count: 0};
    }
    increment() {
      this.setState({count:this.state.count+1})
    }
    return (
      <div>
  			<ChildOne count={this.state.count}/>
        <ChildTwo onCilck={this.increment} />
      </div>
  }
  ```

  

- 隔层传递 Context   或者使用redux

- 无关组件通信. 全局资源管 Redux

### React 16.8class组件function 组件

区别

- 类组件需要生命 constructor 函数：no
- 类组件需要手动绑定this,     函数:no
- 类组件有生命周期狗子。      函数：no
- 类：维护自己state          函数：无状态
- 类： 需要继承              函数：不需要
- 类：面向对象方法，1、封装->组件属性方法 封装到组件内部 2、继承extends 函数：函数式编程思想

### React的插槽怎么实现

使用 `props.children` or  React 的 `cloneElement` API 来渲染到指定的插槽位置。

应用： 比如 React Router 的 `<Route>` 组件、React Bootstrap 的 `<Modal>` 组件

### 如果if语句里写useEffect会有什么表现？

放入if后不能保证每次渲染时被执行，会破坏掉hooks的调用顺序，会导致状态不一致和难以追踪的bug

### useEffect使用

> useEffect(func,[])

- 第二参数无值，每次组建渲染都会触发
- 第二个参数是空数组，相当于componentDidmount 挂载时
- 第二个参数有值，参数发生变化时触发
- 第一个参数函数里加入return 相当于componentUnDidmount 销毁时



应用：

- 获取数据
- 触发动画
- 订阅事件
- 发送分析日志
- 聊天

### useEffect无限循环

```react
  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [count]);

useEffect里面,有set，依赖项里面又加入了count, 

  会出现set的更新然后组建渲染触发useEffect，发现count值变化，再次执行set函数

解决办法：
1.取消依赖项中的count 改为剪头函数
2.或者用memo缓存。
3.useEffect event
```



### useEffect静止情况怎么解决

```react
  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + increment);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [increment]);


//按的太快出现静止，useEffect是响应式的 所以每次useState刷新都会触发useEffect重新同步，引起interval的清理
 <button onClick={() => {
          setIncrement(i => i + 1);
        }}>+</button>

// 解决方案可以使用 需要从 Effect 中提取一个 Effect Event onTick
18.2+
import { experimental_useEffectEvent as useEffectEvent } from 'react';   //非响应式

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

> 适用于`非响应式`
>
> 取值： 调用函数时刻时，环境当前值   ，想要变化可以用`传惨的方式`

### React Hooks

> 允许在函数组件中使用状态和生命周期方法

Why do we need React hooks

> 初衷：为了更好地解决状态逻辑复用和组件之间的逻辑共享问题。

- 告别难以理解的class组件
- 解决业务逻辑难以拆分的问题
- 让状态逻辑复用变得简单



局限性

- 不能完整为函数组件提供类组件的能力
- 对dev提出更高要求



hooks规则约束

- useEffect 处理副作用（数据获取，订阅等）
- useMemo  记忆化计算结果
- useEffectLayout 是 [`useEffect`](https://react.docschina.org/reference/react/useEffect) 的一个版本，在浏览器重新绘制屏幕之前触发。
- useCallback 记忆化回调函数
  - 应用场景：
    - 当将函数作为属性传递给子组件时，可以确保子组件在父组件重新渲染时不会收到新的函数引用
    - 避免在 useEffect 中创建新的函数
    - 缓存复杂的计算函数
- useContext 使用上下文
- useState 声明状态对象
- useReducer 替代Redux的一种状态管理方案
- useTransition 在不阻塞 UI 的情况下更新状态的 React Hook. 
  - `isPending`，告诉你是否存在待处理的 transition。
  - [`startTransition` 函数](https://react.docschina.org/reference/react/useTransition#starttransition)，你可以使用此方法将状态更新标记为 transition。
- useSyncExternalStore 用内置的 Hook 订阅外部 store
- useDeferredValue 延迟加载配置suspense
- useId 生成唯一id
- `useInsertionEffect` 在布局副作用触发之前将元素插入到 DOM 中
- 自定义hook 复用状态逻辑

### React中 Class组件中的this和Hook中的this分别指向什么

- **类组件**：`this` 指向组件实例，可以访问状态、属性和生命周期方法。
- **函数组件**：`this` 没有特殊含义，因为函数组件不创建实例。状态和事件处理函数通过 Hook 来管理。

### Hook和Class组件分别对应生命周期的情况有哪些

1. **constructor**：初始化状态 `useState`。
2. **componentDidMount**：在组件挂载到 DOM 后调用,`useEffect` 传入一个空数组 
3. **componentDidUpdate**：在组件更新后调用。 `useEffect`省略依赖数组来模拟
4. **componentWillUnmount**：在组件卸载前调用。 `useEffect` Hook 并返回一个清理函数来模拟 
5. **getDerivedStateFromProps**：在组件接收到新的 props 时调用。 `useState` 和 `useEffect` 来根据 props 更新状态。

### useEffect原理，他用了什么数据结构

1. 当组件首次渲染时，会执行副作用函数，并将返回的清理函数存储起来。

2. 依赖项数组（第二个参数）发生变化，前的副作用函数标记为“过时的”，并在下一次渲染后执行新的副作用函数，并存储新的清理函数。

3. 组件卸载时，会执行之前存储的清理函数（如果有的话）

   

数据结构包括：

- **任务队列**：副作用函数和清理函数。
- **依赖项映射**：记录每个 `useEffect` 的依赖项数组。
- **副作用链表**：在组件卸载时能够按顺序执行清理函数。
- **调度器**：调度器会根据任务的优先级和当前的渲染任务来安排副作用的执行。

### React事件调度机制

工作流程

1. 在组件渲染时，会将事件处理函数绑定到对应的 DOM 元素上。通过事件系统来管理的。
2. 当用户触发事件时，会捕获这些事件，并将它们转换为合成事件。
3. 根据事件类型和事件目标，将合成事件分发到对应的事件处理函数。（通过事件池来优化的，以减少内存的使用）。
4. 事件处理函数执行时，根据回值来决定是否需要进行额外的处理。例如，如果事件处理函数返回 `false`，React 会阻止事件的进一步传播。
5. 在组件卸载时，会清理所有绑定的事件处理函数，以避免内存泄漏

### 事件调度机制的特点

- **跨浏览器一致性**
- **性能优化**：通过事件池和批量更新机制来优化性能，减少不必要的 DOM 操作。
- **事件委托**：绑定到根 DOM 容器上，而不是每个单独的元素上。当事件发生时，React 会根据事件的目标元素来确定哪个组件应该处理该事件。
- **异步更新**：状态更新会被放入一个队列中，并在当前执行栈清空后，通过 React 的调度器来批量更新。

### 如何自定义合成事件

创建一个继承自 `Synthetic[sɪnˈθɛtɪk]Event` 的类来实现，在里面做一些定义方法

...在组件里面使用 new CustomEvent(event);

customEvent.customMethod(); // 调用自定义方法

### react为什么设计合成事件

1.	跨浏览器兼容性
2.	可以进行批处理和减少不必要的 DOM 操作
3.	更方便的方式事件的冒泡和捕获行为
4.	React 事件是与组件绑定的
5.	可以自定义合成事件的行为或添加额外的功能。
6.	由于合成事件是 React 内部的抽象，更容易进行测试，不必依赖于浏览器环境。

### **与原声dom事件区别**

1.	组件化：   React 事件是与组件绑定的，而原生事件是与 DOM 元素绑定的.
2.	事件处理函数：React 事件的处理函数是作为组件的属性添加的，而原生事件的处理函数是通过添加事件监听器来实现的。
3.	自动更新：当组件的状态发生变化时，React 会自动重新渲染组件，并更新相应的事件处理逻辑。而原生事件需要手动更新事件处理逻辑。
4.	跨浏览器兼容性：React 事件在不同的浏览器中具有更好的兼容性，因为 React 会在内部处理一些浏览器的差异。
5.	性能：React 事件的性能通常比原生事件更好，对事件进行优化和批量处理，减少了不必要的 DOM 操作。
6.	事件命名方式不同。原声：oncilnk（入参字符串 React onCilnk（回调函数

### dom事件如何工作

- 事件捕获
- 处于目标
- 事件冒泡



React 事件都会挂载在document对象上

先触发真实dom事件再触发React事件

最好真正执行document上挂载的事件

### react的合成事件绑定在哪里

在`渲染阶段`,当组件被渲染到 DOM 上时，会为组件的事件处理器创建合成事件监听器，并将它们绑定到根 DOM 容器上。

在`触发阶段`,当用户触发一个事件时，事件首先在 DOM 元素上触发。之后冒泡到根 DOM 容器，事件系统会捕获这个事件，将其转换为一个合成事件对象。之后根据事件的类型和触发事件的元素，找到对应的事件处理器，并执行它。

### react的合成事件组织行为

- **事件冒泡**：在 React 中，合成事件默认在冒泡阶段执行。如果你需要在捕获阶段执行合成事件处理器，可以使用 `onClickCapture` 属性。
- **阻止冒泡**：在合成事件处理器中，你可以调用 `event.stopPropagation()` 来阻止事件继续冒泡到父元素。这不会影响原生事件的冒泡。
- **阻止默认行为**：在合成事件处理器中，你可以调用 `event.preventDefault()` 来阻止事件的默认行为。这同样不会影响原生事件的默认行为。

### react的mixin、hoc、继承的区别、优缺点

- Mixin
  - **优点**：可以在多个组件中共享代码和方法。
  - **缺点**：导致隐式依赖和命名冲突。
- HOC
  - **优点**：包装组件来增强其功能。
  - **缺点**：导致嵌套过深和命名冲突的问题。
- 继承
  - **优点**：可以基于现有的组件创建新的组件，继承其属性和方法。
  - **缺点**：会导致继承链过长。



### setSate() 参数

它接受两种不同形式的参数

1. **对象形式**:

   ```js
   this.setState({ property1: value1, property2: value2 })
   ```

2. **函数形式**:

   ```js
   this.setState((prevState, props) => {
     return { /* new state */ };
   })
   ```

   这种形式接受一个函数作为参数。这个函数会接收两个参数:

   - `prevState`: 表示更新前的状态。
   - `props`: 表示当前组件的 props。

使用函数形式的 `setState()` 有以下优势:

1. **异步更新**: React 可能会将多个 `setState()` 调用合并为一个更新,以提高性能。使用函数形式可以确保你访问到最新的状态。
2. **访问 props**: 有时候更新状态需要访问组件的 props,使用函数形式可以方便地访问 props。

### setSate是同步还是异步

可以是同步的，也可以是异步的，取决于调用`setState`的环境。

异步：

- 在合成事件和生命周期函数中，`setState`是异步的。调用`setState`后，React 不会立即更新组件的状态，而是将状态更新放入一个队列中,取最后一次执行的结果。

同步：

- 在原生事件，React 无法控制代码的执行顺序，所以需要立即更新组件的状态。
- 在`setTimeout`、`setInterval`等函数中，`setState`也是同步的。



### setState(i+1)和setState(i=>i+1)区别

- `setState(i+1)` 是直接传递一个对象，它不会接收到当前的状态值，因此在异步操作中可能会导致状态更新不正确。
- `setState(i=>i+1)` 是传递一个函数，这个函数接收当前的状态值作为参数`i`，然后返回新的状态值。这种方式可以确保在异步操作中获取到最新的状态值。

### useState和setState区别

**使用场景**：

- `useState` 用于函数组件。
- `setState` 用于类组件。

**语法**：

- `useState` 返回一个数组，包含状态值和一个更新状态的函数。
- `setState` 是一个方法，需要通过 `this` 关键字在类组件内部调用。

**赋值**：useState使用更新函数，setState使用对象或者函数，函数入参时是有两个参数一个prevState,props

**性能优化**：

- 使用 `useState` 时，由于函数组件的特性，React 可以更有效地进行性能优化。
- `setState` 在类组件中，React 也会进行优化，但有时需要使用 `shouldComponentUpdate` 生命周期方法来手动优化。

### useState原理

1. 调用 `useState` 时，你传入一个初始状态值。React 会记住这个初始值，并在组件首次渲染时使用它。
2. `闭包`的方式返回一个数组，其中第一个元素是当前状态的值，第二个元素是一个函数，用于更新这个状态。
3. 当你调用更新函数时，React 会将新的状态值保存起来，并安排组件重新渲染。在渲染过程中，React 会使用最新的状态值。
4. 如果在多次调用状态更新函数，React 可能会将这些更新合并为一次渲染

### useState 为什么使用数组而不是对象

```js
const[count,setCount] = useState(0);

// 数组解构
const foo =[1,2,3]
const [one,two,three] = foo; //可以自己命名
console.log(one,two,three);

//对象解构
const user ={ id :123, name :'123'} 
const {id,name} =user; //必须使用原本的key
console.log(id,name);

const { state,setState} = useState(false);
const { state: counter,setState:setCounter} = useState(0);
```



### useSatate介绍

1. **初始状态作为参数**

   ```js
   const [state, setState] = useState(initialState)
   ```

2. **惰性初始化**

   ```js
   const [state, setState] = useState(() => {
     const initialState = someExpensiveComputation(props);
     return initialState;
   })
   ```

   这种形式将一个函数作为参数传入 `useState`。这个函数会在组件的首次渲染时被调用,并返回初始状态。这种方式适用于初始状态的计算比较复杂或需要访问组件 props 的情况。

   javascript

   复制

   ```js
   const [user, setUser] = useState(() => {
     const initialUser = JSON.parse(localStorage.getItem('user'))
     return initialUser || { name: 'John Doe', age: 30 }
   })
   ```

无论使用哪种形式,`useState` 都会返回一个数组,包含两个元素:

1. `state`: 当前状态的值。
2. `setState`: 一个函数,用于更新状态。调用这个函数会导致组件重新渲染。

### useState定义的状态如何确保能拿到最新的值

1.	当状态发生改变时，React 会触发组件的重新渲染，在重新渲染过程中，会使用最新的状态值来构建组件。
2.	useState 所创建的状态变量和更新函数每次渲染时保存在其作用域内，形成闭包，确保能获取到当前渲染周期对应的最新状态。

### legacy 同步阻塞模式

 开始react更新-> 协调fiber tree -> 处理effect（j s代码一直运行，主线程一直被占用）

 更新结束 (js引擎推出主线程)-> 浏览器渲染（渲染引擎开始工作）

### **concurrent 并行模式**

 开始react更新-> 是否协调完成 N -> 协调fiber tree -> 让出主线程 （fiber tree协调分段执行，时间短尾5ms，超过会让出主线程）

 Y-> 处理effect -> 更新结束 -> 浏览器渲染

- 不会长时间阻塞浏览器渲染
- 高优先级更新可以中断低优先级更新，优先渲染

**如何协调？**

借助事件循环，用messageChannel实现react的时间分片和重新请求时间片, prefacemance.now计算时间，channel的post message,onmessage

`messageChannel`允许我们在两个不同的 JavaScript 执行上下文之间进行通信。



每触发一次 **react** 更新，意味着一次 **fiber tree** 的**协调**，但**协调**并不会在更新触发时立刻**同步**进行。相反，**react** 会为这一次更新，生成一个 **task**，并添加到 **taskQueue** 中，**fiber tree** 的**协调**方法会作为新建 **task** 的 **callback**。当 **wookLoop** 开始处理该 **task** 时，才会触发 **task** 的 **callback**，开始 **fiber tree** 的**协调**。

### preact

兼容 react 代码的更轻量级的[框架](https://so.csdn.net/so/search?q=框架&spm=1001.2101.3001.7020),支持class组件和function组件，也支持hook特性，没有fiber，hook存在vdom的vnode.component__hooks数组上。

### react15的reconciler同步不可中断原理

Vdom只有子节点的children引用，没有父节点parent和兄弟节点引用，需要一次性递归把所有的vdom都渲染到dom才行，如果被打断没有记录父节点和子节点，只能继续处理子节点，没办法处理vdom的其他的部分



### React ssr如何实现hook

React-dom/server的renderToString,不需要做vdom-> fiber转换，hook存在全局变量中，使用链式连接

### memorizedState

函数组件内用的hook在fiber节点对应的是`memorizedState`链表,使用next串联，不同hook在memorizedState上值不同。

memorizedState分为创建阶段和更新阶段， 

useXXX最终实现为mountXX和updateXX

```js
xxxWorkInProgressHook()实现节点拼装链表
hook.memorizedState = [nextValue,nextDeps]
```

把hook存在fiber.memorizedState节点上。

### Fiber

**Fiber是什么**

对 vdom 做了下改造用于提升性能的

一种数据结构

fiber有一个父 Fiber 和子 Fiber，形成一个链式结构

三个阶段： schedule、reconcile、commit

```
![image-20240428112555574](./前端面经.assets/image-20240428112555574.png)
```

### Fiber更新机制	

1. 任务拆分：把组件的渲染和更新分解成小任务。

1. 链表结构：链表来组织的任务 Fiber，。

1. 优先级排序：优先级排序。优先级较高的任务先执行。

1. 可中断性：执行过程中被中断，以便浏览器能够处理其他任务。

1. 并发执行：并发执行任务。低优先级的任务可以在后台异步执行，而不阻塞主线程。(`requestIdleCallback` 允许开发者在浏览器有空闲时间时执行一些非关键任务)

1. 更新阶段：渲染阶段和提交阶段。

   ●	渲染阶段：从上到下遍历树，执行组件的渲染逻辑，。

   ●	提交阶段：Fiber 从下到上遍历树，将渲染的结果应用到 DOM 上。

1. 时间分片： 为了避免长时间占用主线程，把时间分片，每个时间片内执行一部分任务。

1. 错误处理：Fiber 提供了更强大的错误处理机制。如果在任务执行过程中发生错误，React 可以捕获并处理这些错误，避免应用崩溃。

1. 协调器：调器负责调度任务、处理中断、进行优先级排序等。

   

   **优势**：Fiber 更新机制带来了以下优势：

   ●	更好的性能：通过任务拆分、优先级排序和并发执行，提高了应用的性能和响应性。

   ●	暂停和恢复：允许在更新过程中暂停，避免长时间的渲染阻塞。

   ●	错误处理：增强了错误处理能力，提高了应用的稳定性。

### Fiber 架构的流程



1. **调度（Scheduling）**：当组件的状态发生变化时，React 会将更新任务放入一个队列中。根据任务的优先级来调度这些任务。
2. **工作循环（Work Loop）**：React 会进入一个循环，从队列中取出任务并执行。这个循环会持续进行，直到没有更多的任务需要执行。
3. **任务执行（Work Execution）**：在工作循环中，React 会执行任务，这包括调用组件的生命周期方法、更新组件的状态和渲染组件。
4. **渲染（Rendering）**：在任务执行阶段，React 会渲染组件，并将渲染结果应用到 DOM 上。
5. **提交（Commit）**：一旦所有的任务都执行完毕，React 会进入提交阶段。在提交阶段，React 会将所有的更新一次性应用到 DOM 上，以确保 DOM 的状态与组件的状态保持一致。

### FiberNode

| tag           | Fiber 的类型。例如 FunctionComponent (函数组件)、ClassComponent（类组件）。 |
| ------------- | ------------------------------------------------------------ |
| elementType   | ReactElement 的类型。例如 REACT_ELEMENT_TYPE（自定义元素），REACT_PORTAL_TYPE（portal）、REACT_FRAGMENT_TYPE(Fragment)等。 |
| type          | React.createElement 的第一个参数                             |
| stateNode     | children 对应的 ReactElement ；其他状态信息。                |
| return        | 父节点的引用                                                 |
| child         | 子节点的引用                                                 |
| sibling       | 兄弟节点的引用                                               |
| index         | fiber 在兄弟节点之间的位置                                   |
| key           | 判断 fiber 身份的标志                                        |
| ref           | 引用                                                         |
| pendingProps  | 将传递给组件的 props                                         |
| memoizedProps | 当前 props                                                   |
| updateQueue   | 更新队列                                                     |
| memoizedState | 当前 state                                                   |
| dependencies  | context 相关链表                                             |
| mode          | 模式                                                         |

### requestIdleCallback

1. **功能**

   - `requestIdleCallback` 允许开发者在浏览器有空闲时间时执行一些非关键任务,而不会阻塞关键任务的执行。
   - 这对于需要在后台执行一些耗时操作的应用程序非常有用,可以提高用户体验。

2. **使用方法**

   - `window.requestIdleCallback(callback, options)`
   - `callback` 函数是在浏览器空闲时被调用的,它会传入一个 `IdleDeadline` 对象作为参数。
   - `options` 对象可以设置 `timeout` 属性,指定任务在超时后仍然会被执行。

3. **IdleDeadline 对象**

   对象包含以下属性:

   - `timeRemaining()`: 返回浏览器还有多少空闲时间(单位为毫秒)。
   - `didTimeout`: 表示任务是否因超时而被执行。

4. **取消执行**

   - 可以使用 `window.cancelIdleCallback(id)` 来取消一个已经注册的 `requestIdleCallback` 任务。

5. **兼容性**

   - `requestIdleCallback` 是一个相对较新的 API,在某些旧版浏览器中可能不支持。
   - 可以使用 polyfill 或者回退到 `setTimeout` 等替代方案。

### React的栈调合

>  将Virtual DOM树转换成Actual DOM树的最少操作

栈调和的过程大致可以分为以下几个步骤：

1. 当组件的状态或属性发生变化时，会触发组件的更新。
2. **生成新的虚拟 DOM**
3. **对比新旧虚拟 DOM**
4. **更新真实 DOM**
5. **批量更新**：为了提高性能，React 会将多个更新操作合并成一个批量更新。这样可以减少 DOM 操作的次数，提高渲染效率。



在实际开发中，我们可以通过一些方式来优化栈调和的性能，例如：

1. **避免不必要的组件重新渲染**
2. **使用 immutable 数据结构**
3. **合理划分组件**：将组件拆分成更小的、可复用的组件，可以提高组件的渲染效率。
4. **使用 key 属性**：在循环渲染组件时，

### Immutable

Immutable 数据结构是一种一旦创建就不能被修改的数据结构。在 JavaScript 中，常见的 Immutable 数据结构包括字符串、数字和布尔值等基本类型，以及一些 Immutable 库提供的不可变数据结构

### diff算法

高效地比较新旧 Virtual DOM 树，并找出最小的变更来更新真实 DOM。

基于三个假设：

1. **同级比较**：React 只会比较同一层级的节点。
2. **类型相同**：如果两个节点类型相同（例如两个 `<div>`），React 会比较它们的属性（props）来决定是否需要更新。
3. **递归子节点**：当节点类型不同，React 会卸载旧节点及其子节点，并挂载新节点。

从源码层面来看，分为两个阶段：

1. Reconciliation（协调）

在协调阶段，React 会遍历新旧 Virtual DOM 树，并使用 diff 算法来比较它们。这个过程主要发生在 `ReactReconciler.js` 文件中。React 会为每个节点创建一个 `workInProgress` 树，这个树是基于旧树的结构，但会根据新树的属性进行更新。

2. Update（更新）

一旦 diff 完成，React 会进入更新阶段，这个阶段会根据 diff 的结果来更新真实 DOM。这个过程主要发生在 `ReactFiberReconciler.js` 文件中。React 会根据 `workInProgress` 树来决定哪些真实 DOM 需要更新。

其中 `reconcileChildFibers` 函数是核心。这个函数会根据新旧节点的类型来决定如何进行 diff：

- **如果新旧节点类型相同**：React 会比较它们的属性（props），如果属性有变化，React 会更新属性。
- **如果新旧节点类型不同**：React 会卸载旧节点，并创建一个新节点。



### 双缓存模式

Current 树          指向    当前的界面的dom树

workinprogressfiber指向     内存中fiber树

通过切换两个树实现界面切换，避免出现卡顿的情况。，减少fiber节点开销，提升性能



Vdom react element对象 只记录子节点没有记录兄弟节点，因此渲染不可中断

FiberfiberNode 对象是一个链表父节点 兄弟节点子节点 可以打断

### diff算法怎么处理a/b/c b/a/c



1. **比较节点类型**：React 会遍历两个列表的节点，比较它们的类型和 key。
2. **移动节点**：如果发现节点类型相同但顺序不同，React 会尝试移动节点而不是销毁和重新创建它们。例如，如果在新列表中 `b` 节点的 key 与旧列表中的 `a` 节点相同，React 会将 `a` 节点移动到 `b` 节点的位置。
3. **更新属性**：对于节点类型相同且位置不变的节点，React 会更新它们的属性。
4. **添加和删除节点**：对于新列表中新增的节点，React 会创建它们并插入到正确的位置；对于旧列表中不再存在的节点，React 会销毁它们。

### 对React理解？有哪些特性？

**是什么**

JS库 提供了UI层面的解决方案

**特性**

- JSX语法

- 单向数据流

- 虚拟DOM

- 声明试编程

  - 编程范式
  - 命令式编程 按照流程一步步的教电脑怎么做

  ```js
  const map = new Map.map(document.getElementById(map),{
    zoom:4
    center:{lat,lng}
  })
  
  //创建标记
  const marker = new Map.marker({
    position: {lat,lng}
    title: 'hello World'
  })
  //地图上添加
  marker.setMap(map)
  
  
  //声明试
  <Map zoom={4}  center={(lat,lng)}>
    <Marker position = {(lat,lng)} title = {'Hello Marker'}/>
    </Map>
  ```

- Component

  - 一切皆为组件

  - 可以是一个函数或者是一个类

- 特点

  - 可组合
  - 可重用
  - 可维护

- 优势

  - 高效：DOM模拟不直接操作DOM
  - 灵活 和已知的框架或者框架很好的配合
  - 跨浏览器兼容：
  - 声明试设计
  - 组件式开发：一切都是component 提高复用率
  - 单向数据流。速度快 更安全

### State 和props 有什么区别

state

setSate 改变数据， 从而实现内部数据变化 更新页面

Props 从外部出入内部的数据 字符串 数字对象数组回调函数

相同点：

- 两者都是JS对象
- 两者都是用来保存信息
- 能触发渲染更新

不同点：

- Props 外部方式传递给组件 state 组件内自己管理维护
- props组件内不可修改 state组件内可修改

### super 和super(props)有什么区别

ES6

extends进行类继承

```js
class sup {
   constructor(name){
      this.name = name
   }
   printName() {
     console.log(this.name);
   }
}
class Sub extends Sup {
  constructor(name,age) {
    super(name)
    this.age = age;
  }
  printAge() {
    console.log(this.age);
  }
}
let jack = new Sub('jack',18)
jack.printName();
jack.printAge();



const instance = new YourComponent(props);
instance.props = props

react. super() 没穿入props 是访问不到的，因为是初始化之后在实例对象上塞入的props
```



### Class事件绑定的方式有哪些？ 区别

Render方法中bind

```js
render() {
    return (
      <button onClick={this.showAlert.bind(this)}>show</button>
    )
  }
```



render使用箭头函数

```js
render() {
    return (
      <button onClick={(e) => this.showAlert(e)}>show</button>
    )
  }
```

constructor中bind

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

定义阶段使用箭头函数绑定

```js
showAlert = ()=> {
  
}

render() {
    return (
      <button onClick={this.showAlert}>show</button>
    )
  }
```

### React构建组件的方式有哪些？



- 函数式创建
- React.createClass
- 继承React.Component

### React中引入Css的方式有哪几种？ 区别？

css遵循规则

- 不能污染其他组件css
- 支持动态css
- 支持css所有特性
- 编写起来比较方便



React引入css

- 在组件中直接使用	编写简单
- 在组件中引入css文件     作用于全局
- Module.css文件        解决局部作用于问题 写法驼峰
- css in js （styled-components emotion 库。    

### 高阶组件的理解？应用场景？

> 接受一个组件作为参数，并返回一个新的组件，新组件通常会添加一些额外的功能或属性

```js
const EnhancedComponent = highOrderComponet(WrappedComponent)
```

如何编写

```js
import React,{Component} from 'react'

export default {WrappedComponent} => {
  return class EnhancedComponent extends Component {
    //do something
     return (){
        return <WrappedComponent/>
     }
  }
}
```

- props保持一致
- 不要以任何方式改变原始组件WrappedComponent
- 不要再render() 方法中使用高阶组件

应用场景

- 多个模块都在使用这个功能
- 权限控制 日志记录 数据校验 异常处理 统计上报

```js
import React,{Component} from 'react'


class MyComponent extends Component {
    componentWillMount() {
      let data = localStorage.getItem('data')
      this.setState({data});
    }
     render (){
        return <div>{this.state.data}</div>
     }
  }
}


//使用高阶组件的方式
function WithPersistentData{WrappedComponent} => { //入参是组件 返回也是组件
  return class extends Component {
        componentWillMount() {
      let data = localStorage.getItem('data')
      this.setState({data});
    }
     return (){
        return <WrappedComponent data={this.state.data} {...this.props}/>
     }
  }
}

class MyComponent2 extends Component {
     render (){
        return <div>{this.props.data}</div>
     }
}

const MyComponentWithData = WithPersistentData(MyComponent2)
```

**属性代理 只能加工 没办法修改内容**

- Props

```js
function HOC(WarppedComponent) {
   const newProps = {type:'HOC'}
   return props => <WarppedComponent {...props} {...newProps} />
}
```

- state

```js
function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ''
      }
      this.onChange = this.onChane.bind(this);
    }
    
    onChange = (e) => {
      this.setState({
        name:e.target.value
      })
    }
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange
        }
      }
      return props -> <WrappedComponent {...this.props} {...newProps} />
    }
  }
}

@HOC
class Example extends Component {
  render() {
    return <input name {...this.props.name}
  }
}
```

- 反响继承

```js
const HOC = (WarppedComponent) => {
  return class extends WarppedComponent {
    render() {
      return super.render()
    }
  }
}
```

1、可以访问到props state

2、实现所谓生命周期的拦截

```js
function HOC(WarppedComponent) {
   const didMount = WarppedComponent.proptype.componentDidmount;
   return class extends WarppedComponent {
     async componentDidmount() {
       if(didMount) {
         await didMount.apply(this)
       }
       //自定义事件处理
     }
     
     render() [
       return super.render();
     ]
   }
}
```

3、进行修改react树

```js
function HOC(WarppedComponent) {
   return class extends WarppedComponent {
     render() [
       const tree = super.render();
  		 const newProps = {};
  		 if( tree && tree.type == 'input') {
         newProps.value = 'chenghuai'
       }
  	   const props = {
         ...tree.props,
         ...newProps,
       }
       const newTree = React.cloneElement(tree,props,tree.props.children)
       return newTree;
     ]
   }
}
```

4、计算组件的渲染时间

```js
class Home extends React.Componet {
  rener() {
    return <h1> hello </h1>
  }
}


function HOC(WarppedComponent) {
  let start,end
   return class extends WarppedComponent {
     constructor(props) {
       super(props)
       start = 0;
       end = 0;
     }
     compoentWillMount() {
       if(super.componentWillMount) {
         super.componentWillMount();
         start = new Date();
       }
     }
     compoentDidMount() {
       if(super.compoentDidMount) {
         super.componentWillMount();
         end = new Date();
         console.log(end - start)
       }
     }
   }
}
```

**属性代理 和 反向继承 对比**

属性代理：从组合角度出发， 外-> 内 传递props

反向继承：从继承角度出发 内-> 外 render props state 

### `Render Props` 和 `HOC`区别

1. **实现方式**：
   - `Render Props`：将函数作为属性传递给子组件，子组件调用函数来获取渲染的内容。
   - `HOC`： 接受一个组件作为参数，并返回一个新的组件，新组件通常会添加一些额外的功能或属性。
2. **关注点分离**：
   - `Render Props`：将渲染逻辑进行分离和复用。
   - `HOC`：通过包装原始组件来添加额外的行为
3. **代码结构**：
   - `Render Props`：可能会导致属性中包含较多的函数，代码结构相对较为复杂。
   - `HOC`：创建一个新的组件，代码结构相对清晰。
4. **适用场景**：
   - `Render Props`：适用于需要动态决定子组件渲染内容的情况，或者需要在不同组件之间共享渲染逻辑的情况。
   - `HOC`：适用于需要对组件进行通用功能增强的情况，如添加状态管理、路由处理等。



### React如何实现组件间过渡动画？

- React-transition-group. 

  - 进入 添加 enter or enter-active

  - 离开 添加 exit exit-active

- cssTransition 过渡动画效果

  in true

  - Xxx-enter xxx-enter-active

  - -enter-done

  In false 

  - Xxx-exit xxx-exit-active

- SwitchTransition 切换

- TranstitionGroup.动画组 cssTransition放入，感受到变化时先保存移除的节点 当动画真正结束后才真移除，先插入到节点先渲染dom 然后在做动画，删除

  - 插入节点。先渲染dom 在做动画
  - 删除节点 先做动画 在删除dom



### 真实DOM和虚拟DOM的区别？ 优缺点？

区别

- 虚拟Dom不回进行重排重会，真实dom频繁重排重会
- 消耗
  - 虚拟 虚拟dom增删改 真实dom差异增删改 之后 进行重排重会
  - 真实 真实dom 完全增删改 重排重会

优缺点

- 真实dom
  - 优势易用
  - 缺点 效率低 性能差
- 虚拟DOM
  - 简单方便
  - 性能方案 避免了大量的重排重会操作
  - 跨平台
  - 缺点 性能要求极高没办法优化 首次渲染大量dom速度稍慢

### 子组件如何阻止自己渲染？函数组件如何阻止自己渲染？

子组件可以通过控制自己的状态来阻止渲染。当子组件的状态没有发生变化时，React 不会重新渲染该子组件

```js
import React, { useState } from'react';

function MyComponent() {
  const [shouldRender, setShouldRender] = useState(true);

  // 这里可以添加其他逻辑

  return shouldRender && (
    <div>
      <h1>我是子组件</h1>
    </div>
  );
}

export default MyComponent;
```





### React有哪些状态

1. **组件状态 (State)**
   - 这是组件内部自己维护的状态,可以通过 `this.state` 访问和更新。
   - 组件状态是最基本和常用的状态管理方式,用于存储组件需要的数据。
2. **Props**
   - Props 是父组件传递给子组件的数据,子组件可以读取但不能直接修改。
   - Props 是单向数据流,父组件负责更新子组件的 Props。
3. **Context**
   - Context 提供了一种在组件树间共享状态的方式,避免了通过 props 逐层传递的麻烦。
   - Context 适用于一些跨层级共享的全局状态,如主题、用户信息等。
4. **Redux 状态**
   - Redux 是一个独立的状态管理库,提供了一套完整的状态管理机制。
   - Redux 状态存储在 store 中,通过 action 和 reducer 进行状态更新。
5. **URL 状态**
   - URL 中的查询参数也可以看作是一种状态,可以使用 React Router 等库进行管理。
   - URL 状态对于记录和共享应用状态非常有用。
6. **离线状态**
   - 一些应用需要管理用户的离线状态,比如 PWA 应用。
   - 可以使用 Service Worker、IndexedDB 等 API 来管理离线状态。



### Context 和redux区别

1. **设计目标**
   - Context 是 React 内置的功能,旨在解决跨组件传递数据的问题。
   - Redux 是一个独立的状态管理库；
2. **状态存储**
   - Context 状态存储在组件树的上下文中,状态是分散的。
   - Redux 将所有状态集中存储在 store 中,提供单一数据源的概念。
3. **更新机制**
   - Context 通过 Provider 和 Consumer 组件进行状态更新。
   - Redux 使用 action 和 reducer 来管理状态的更新。
4. **复杂度**
   - 适用于简单的跨组件状态共享场景。
   - 适用于更复杂的状态管理需求。

### useReducer和useState区别

1. **状态管理**
   - `useState`: 用于管理简单的、独立的状态。
   - `useReducer`: 用于管理复杂的、相互依赖的状态。
2. **状态更新**
   - `useState`: 直接调用状态更新函数来更新状态。
   - `useReducer`: 通过 `dispatch` 函数分发 action 对象来更新状态。
3. **初始状态**
   - `useState`: 初始状态可以是任意类型的值。
   - `useReducer`: 初始状态必须与 reducer 函数的返回值类型一致。
4. **适用场景**
   - `useState`: 适用于管理简单、独立的状态,如计数器、表单输入等。
   - `useReducer`: 适用于管理复杂、相互依赖的状态,如表单验证、分页等。

### useContext使用

```js
// 1.创建上下文（Context）,包含一个 Provider 组件和一个 Consumer 组件。
const MyContext = React.createContext();
//2. 使用 Provider 组件包裹组件树。通过 value 属性传递需要共享的数据。
import MyContext from './MyContext';

const MyProvider = ({ children }) => {
  const contextValue = { /* 一些需要共享的数据 */ };
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

//3. 需要使用上下文值的组件中，使用 useContext Hook 来获取上下文值。
import MyContext from './MyContext';

const MyComponent = () => {
  const contextValue = useContext(MyContext);

  // 现在可以使用 contextValue 中的数据了
  return (
    <div>
      {/* 使用 contextValue 中的数据 */}
    </div>
  );
};
```

### 子孙组件中如何修改通过 useContext 获取到的值

- 使用 `useState` 和 `useContext`

你可以在提供上下文的组件中使用 `useState` 钩子来创建状态，并通过 `useContext` 将状态和修改状态的函数一起传递给子孙组件

```js
// 创建上下文
const MyContext = createContext();

function App() {
  const [value, setValue] = useState('initial value');

  // 提供上下文
  return (
    <MyContext.Provider value={{ value, setValue }}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const { value, setValue } = useContext(MyContext);

  // 修改上下文中的值
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

- 使用 `useReducer`

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

  // 提供上下文
  return (
    <MyContext.Provider value={{ state, dispatch }}>
      <ChildComponent />
    </MyContext.Provider>
  );
}

function ChildComponent() {
  const { state, dispatch } = useContext(MyContext);

  // 修改上下文中的值
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



### useContext和useReducer区别

1. **功能**:
   - `useContext`: 用于访问 React 的上下文 (context) 对象,可以在组件树中共享状态和行为。
   - `useReducer`: 是 useState 的替代方案,用于通过 reducer 函数来管理复杂的状态逻辑。
2. **状态管理**:
   - `useContext`: 通过在组件树中共享 context 对象来管理状态。context 可以在多个组件中使用,避免了prop drilling。
   - `useReducer`: 通过 reducer 函数来管理组件内部的状态。通常用于处理复杂的状态逻辑。
3. **状态更新**:
   - `useContext`: 更新 context 对象会通知所有使用该 context 的组件进行重新渲染。
   - `useReducer`: 更新状态时会触发当前组件的重新渲染,但不会影响其他组件。
4. **适用场景**:
   - `useContext`: 适用于应用程序级别的状态管理,如主题、当前登录用户等。
   - `useReducer`: 适用于组件内部的复杂状态管理,如表单状态、多个状态之间的依赖关系等。
5. **结合使用**:
   - `useContext` 和 `useReducer` 可以结合使用,`useReducer` 可以管理组件内部的状态,`useContext` 可以在组件树中共享这些状态。



### useReducer和redux区别

1. **实现方式**:
   - `useReducer`: 是 React 内置的 Hook,通过 reducer 函数来管理组件内部的状态。状态更新时会触发组件的重新渲染。
   - Redux: 是一个独立的状态管理库,提供了 `createStore`、`dispatch`、`subscribe` 等 API 来管理全局状态。状态更新时会通知所有订阅的组件进行重新渲染。
2. **状态管理范围**:
   - `useReducer`: 主要用于管理组件内部的状态逻辑,状态范围相对较小。
   - Redux: 主要用于管理应用程序级别的全局状态,状态范围较大,适用于复杂的应用程序。
3. **状态更新机制**:
   - `useReducer`: 状态更新时只会触发当前组件的重新渲染,不会影响其他组件。
   - Redux: 状态更新时会通知所有订阅该状态的组件进行重新渲染。
4. **代码结构**:
   - `useReducer`: 状态管理逻辑集中在 reducer 函数中,组件内部可以直接访问和更新状态。
   - Redux: 需要创建 store、reducer、action 等多个模块,代码结构相对更加复杂。
5. **适用场景**:
   - `useReducer`: 适用于组件内部的状态管理,尤其是在处理复杂的状态逻辑时。
   - Redux: 适用于大型应用程序的全局状态管理,可以方便地进行状态追踪和时间旅行调试。



### Redux 了解么 redux的缺点 redux的原理。是如何实现的。

> 状态容器

1.	单一数据源模式
2.	状态变化可预测
3.	状态的变化是通过  actions 和 reducers 处理。



缺点：

1.	概念和模式可能对新手不友好。
2.	严格模式和大量的函数调用，会降低代码可读性。
3.	频繁的状态更新可能会导致性能问题。





核⼼概念：

◦ Store：保存了整个应⽤状态的对象。

◦ Actions：操作状态。

◦ Reducers：接收 actions，并根据type 来更新，返回新的状态。

⼯作流程：

a. 调⽤ store.dispatch(action) 来发起⼀个action。

b. 将当前的状态树和action传递给reducer计算新的状态。

c. 应⽤可能有多个reducer，每个reducer管理状态树的⼀部分。根reducer将这些独⽴部分组合成⼀个单⼀的状态树。

d. store.subscribe监听变化。之后store通知所有订阅



应⽤。

▪ ⽣态系统和中间件：Redux有丰富的中间件⽀持，可以轻松集成异步操作、⽇志记录、持久化等功能。

### redux跟react组件关联在一起

**class组件**

1. **`Provider` 组件**：通过将整个应用包裹在 `Provider` 组件中，`Provider` 接收 `store` 作为属性，可以获取到 `store`。
2. **`connect` 函数**：将组件所需要的状态和方法注入到组件中，并监听 store 的变化，在状态更新时自动重新渲染组件。

**函数式组件**

1. **`Provider` 组件**：

2. **useSelector**钩子：允许你从Redux的state中选择你感兴趣的片段，并将其作为props传递给函数式组件

   useSelector(state-> state.error)

3. **useDispatch钩子**：用于获取Redux的`dispatch`函数，你可以使用它来分发action。

### useSelector原理

1. 使用 `useContext` 来访问 `react-redux` 提供的 `ReactReduxContext`。包含了store 的引用。
2. 会订阅该 store 的状态变化。当 store 的状态更新时，`useSelector` 都会重新执行，并且返回的值发生变化，组件就会重新渲染。
3. `useSelector` 的返回值相同，组件就不会重新渲染。

### useDispatch原理

1. 使用 `useContext` 钩子来访问 `ReactReduxContext`。
2. 直接获取 `dispatch` 函数，并将其作为返回值。
3. 可以被用来分发任何 action，就像你在 Class 组件中使用 `this.props.dispatch` 一样。

### Redux中的异步请求怎么处理

 `redux-thunk` 中间件

- createStore时使用，applyMiddleware(thunk)
- 编写异步action creators，接收dispatch`和`getState 并在适当的时候调用dispatch来发送同步action
- 在组建中的mapDispatchToprops中分发异步action

### redux的state改变，而不是用新的数据，会不会发生变化

状态（state）是不可变的（immutable）。这意味着你不能直接修改状态对象，

当你想要改变 Redux 的状态时，你应该：

1. **创建一个新对象**：使用当前状态作为基础，创建一个新的对象来表示状态的变化。
2. **使用不可变更新函数**：使用如 `Object.assign()`、展开运算符（spread operator）或 `immer` 这样的不可变更新函数来创建新状态。
3. **返回新状态**：在 reducer 函数中，返回这个新创建的状态对象

### redux-thunk和redux-saga有什么区别？

redux-thunk

- **简单性**：`redux-thunk`非常简单，它允许你编写返回函数的action creators。这个函数可以接收`dispatch`和`getState`作为参数，让你可以在其中执行异步操作。
- **易于理解**：对于初学者来说，`redux-thunk`的使用方式比较直观，因为它直接在action creator中处理异步逻辑。
- **控制权**：使用`redux-thunk`时，你完全控制何时以及如何分发action。这可以让你根据异步操作的结果来决定分发什么action。
- **限制**：`redux-thunk`的限制在于它不支持复杂的异步流程控制，如取消请求、重试逻辑等。

redux-saga

- **复杂性**：`redux-saga`使用了ES6的`Generator`函数来处理异步逻辑，这使得它在处理复杂的异步流程时更加灵活和强大。
- **流程控制**：`redux-saga`提供了丰富的API来处理复杂的异步流程，如`takeEvery`、`takeLatest`、`call`、`put`等，这些API可以让你轻松地实现任务的取消、重试、并行执行等。
- **错误处理**：`redux-saga`提供了强大的错误处理机制，可以捕获异步操作中的错误，并进行相应的处理。
- **学习曲线**：由于`redux-saga`使用了`Generator`函数，因此它的学习曲线比`redux-thunk`要陡峭一些，需要对`Generator`有一定的了解。



### react-redux中connect怎么实现

`mapStateToProps` :将 store 中的状态映射到组件的 props 中

`mapDispatchToProps` : action creator 映射到组件的 props 中。

`mergeProps` 函数用于将 `mapStateToProps` 和 `mapDispatchToProps` 返回的 props 合并到一起。

`options` 对象用于配置 `connect` 函数的行为。

下面是一个使用 `connect` 函数的示例代码：

```javascript
import { connect } from'react-redux';

// 定义 mapStateToProps 函数，将 store 中的状态映射到组件的 props 中
const mapStateToProps = state => ({
  count: state.count
});

// 定义 mapDispatchToProps 函数，将 action creator 映射到组件的 props 中
const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' })
});

// 使用 connect 函数连接组件和 store
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(MyComponent);

export default ConnectedComponent;
```

这个组件已经与 store 连接起来，可以通过 props 访问 store 中的状态和 action creator。



### Mobx的object和map有什么区别？底层实现

从底层实现的角度来看,`object` 和 `map` 的主要差异在于:

1. **数据结构**: `object` 使用原生的 JavaScript 对象,而 `map` 使用 MobX 自定义的 `ObservableMap` 类。
2. **劫持方式**: `object` 使用 Proxy 或 `Object.defineProperty()` 来劫持对象的读写操作,而 `map` 直接使用 `ObservableMap` 提供的方法来实现。
3. **API 差异**: `object` 可以直接访问和修改属性,而 `map` 需要使用专门的 API 方法。

### Redux 和mobx

1. **状态管理模式**:
   - **Redux**: 遵循单向数据流,状态存储在单一的 store 中。
   - **MobX**: 采用响应式编程的理念,状态分散在各个组件,通过观察者模式进行更新。
2. **状态更新机制**:
   - **Redux**: 通过 action 和 reducer 函数来更新状态,更新过程是显式的。
   - **MobX**: 通过直接修改可观察的状态对象来更新状态,更新过程是隐式的。
3. **代码量**:
   - **Redux**: 需要编写大量的样板代码,。
   - **MobX**: 需要标记可观察的状态和使用装饰器即可。
4. **性能**:
   - **Redux**: 不可变数据和显式更新机制,在大型应用中通常有更好的性能表现。
   - **MobX**: 隐式机制,在某些场景下可能会产生性能问题。



### 用户如何根据不同的权限查看不同的页面	

- Js.  Ajax.  role -> menulist json 展示有权限菜单

- React-router onEnter

  - ```js
    <Router path="/home" componnt={App} onEnter={(nextState,repalace)=> {
      if(nextState.location.pathename !== '/' {
         // 根据参数判断用户信息
         const uid = utils.getUrlParams(nextState,'uid')
         		if(!uid) {
              replace('/')
            } else {
              // XXXX
            }
         }
    }>
      
    or 写成一个privateRouter组件
    ```

### 单页应用

它在用户与应用交互时，只加载一次页面，然后通过JS动态更新页面内容，而不需要重新加载整个页面

优势:

1. **更流畅的用户体验** ：由于页面不会重新加载，用户在应用中导航时感觉更加流畅。
2. **前后端分离**：前端和后端可以独立开发和部署，便于团队协作。
3. **易于维护**：由于前端代码集中管理，维护起来相对简单。

缺点:

1. **首屏加载时间**
2. **不利于SEO**
3. 浏览器的前进和后退功能需要额外的处理。
4. JavaScript被禁用，SPA将无法正常工作。

### 多页应用

一种传统的Web应用，每个页面的加载都会请求服务器，服务器返回一个新的HTML文档

**优点**：

1. **SEO友好**：每个页面都是独立的HTML文档，易于搜索引擎爬虫索引。
2. **首屏加载快**：每个页面加载时只加载必要的资源。
3. 浏览器的前进和后退功能自然支持。
4. JavaScript被禁用，应用的基本功能仍可使用。

**缺点**：

1. **用户体验**：页面跳转时需要重新加载，用户体验不如SPA流畅。
2. **前后端耦合**：前端和后端的开发和部署通常需要同步进行，不利于团队协作。
3. **维护成本**：随着应用规模的扩大，维护多个页面可能会变得复杂。

### 什么是SEO？

> 搜索引擎优化,提高网站在搜索引擎中的排名



SEO 主要涉及以下几个方面:

1. **关键词优化**
2. **内容优化**
3. **技术优化**
   - 优化网站的技术结构,如页面加载速度、移动端适配等。
   - **sitemap（网站地图**） ： 帮助搜索引擎更好地了解网站的结构和内容,更快速、全面地抓取和索引网站页面
   - **RSS**： 帮助搜索引擎快速发现网站的新内容,提高内容被收录的速度
   - 语义化布局
   - SSR,静态页面部署

### React 和React native区别

1. **目标平台**:
   - React 是一个用于构建 Web 应用程序的 JavaScript 库。
   - React Native 是一个用于构建跨平台移动应用程序的框架,可以在 iOS 和 Android 上运行。
2. **UI 组件**:
   - React 使用 HTML 元素作为 UI 组件,如 `div`、`span`、`button` 等。
   - React Native 使用原生移动平台的 UI 组件,如 `View`、`Text`、`Image` 等,这些组件直接映射到原生的 UI 元素。
3. **开发体验**:
   - React 开发者可以使用浏览器的开发者工具进行调试和测试。
   - React Native 开发者需要使用特定于移动平台的开发工具,如 Xcode 和 Android Studio。

### react native和hybrid区别

1. **架构**:
   - React Native  跨平台的移动开发框架。
   - Hybrid 应用程序通常由一个 Web 视图(WebView)和原生代码组成,。
2. **性能**:
   - React Native 应用程序的性能更接近原生应用程序
   - Hybrid 应用程序的性能取决于 WebView 的实现和优化程度
3. **用户体验**:
   - React Native 它使用原生的 UI 组件和交互方式。
   - Hybrid 使用 Web 技术构建的 UI 和交互方式。
4. **发布和部署**:
   - React Native 应用程序需要通过应用商店发布到移动设备上。
   - Hybrid 可以像 Web 应用程序一样部署到服务器上,并通过 WebView 在移动设备上访问。

### URL SCHME

> 自定义协议，用于在应用内进行不同组件或模块之间的通信。

### rn的vdom和react vdom区别

1. **渲染目标**：React 的 VDOM 用于渲染浏览器中的 HTML 元素，而 React Native 的 VDOM 用于渲染原生平台的 UI 组件。
2. **平台特定性**：React Native 的 VDOM 需要针对不同的平台（iOS、Android）进行适配，以确保 UI 组件在不同平台上的一致性和性能。

### rn和hybrid怎么通信

1. 原生模块:
   - 创建原生模块,可以实现在 JS代码和原生代码之间进行双向通信。
   - 在 Hybrid可以通过这些原生模块来调用 RN应用程序的功能,并接收返回的数据。
2. **通过 WebView**:
   - Hybrid 可以使用 WebView 组件来嵌入 RN中。
   - React Native 应用程序可以通过 `postMessage` 和 `onMessage` 事件来与 WebView 中的 Hybrid 应用程序进行通信。
3. 事件机制:
   - 可以在 RN 和 Hybrid 之间建立一个事件总线,用于发送和接收事件。
   - 事件总线可以基于 Js 事件机制或者原生平台的事件机制实现。
4. **通过共享数据存储**: 可以使用共享的数据存储方式
5. 网络请求
6. js桥街模式

### JavaScriptBridge原理

1. 在原生代码中，创建一个 `JSBridge` 对象，并注册需要回掉调用的方法。
2. 当 JS 通过`postMessage`发送需要调用原生方法时
3. `JSBridge` 接收到 JS发送的消息后，根据消息中的方法名称找到对应的方法，并执行。
4. 执行完成后，通过回调函数。

### hybrid对比rn有很么优势

1. **更快的开发周期**:
   - Hybrid 应用程序的开发周期通常比原生应用程序和 React Native 应用程序更快,可以访问大量成熟的 Web 开发工具和框架
2. **更容易维护和更新**:
   - 可以直接在 Web 代码中进行更改,而无需重新提交应用程序到应用商店。
3. **离线支持**:
   - Hybrid 应用程序可以利用 Web 技术的离线支持功能,如 Service Worker、IndexedDB 等,提供更好的离线体验。
4. **更好的 SEO 支持**:
   - Hybrid 应用程序的 Web 组件可以更好地支持 SEO 优化,因为它们可以直接被搜索引擎索引。

### React Native Debugger怎么检测

1. **使用 Perf Monitor 功能**
   - 在 React Native Debugger 的菜单栏中,选择 `Debug` -> `Start Perf Monitoring`
   - 这将开始记录应用的性能指标,包括帧率、CPU 占用率、内存占用等
2. **分析性能数据**
   - 在 Perf Monitor 窗口中,可以查看实时的性能数据曲线
   - 找到性能出现问题的区域,点击查看更多细节信息
   - 例如,可以查看某个区域的组件树信息,定位导致性能问题的具体组件
3. **分析组件渲染性能**
   - 在react中，查看每个组件的渲染时间，识别渲染时间过长的组件,可能是性能瓶颈所在，还可以查看组件的 update 频率、DOM 变更情况等
4. **分析网络请求性能**
   - 在 Network 面板中,查看应用的网络请求情况，优化网络请求逻辑
5. **检查内存使用情况**
   - 在 Memory 面板中,查看应用的内存占用，观察内存使用曲线,识别内存泄漏或暴涨的问题，可以查看具体的内存分配情况,定位内存问题的源头

### React怎么检测性能问题

1. **React DevTools Profiler**
   - React 官方提供的性能分析工具
   - 可以记录组件的渲染时间、更新次数等性能指标
   - 通过分析数据可以找到性能瓶颈所在的组件
2. **Performance API**
   - 浏览器提供的性能监测 API
   - 可以记录页面加载、脚本执行、网络请求等各个环节的性能数据
   - 可以通过 `window.performance` 对象访问这些数据
3. **User Timing API**
   - 浏览器提供的更细粒度的性能监测 API
   - 可以手动在代码中添加性能测量点,记录特定操作的耗时
   - 可以通过 `window.performance.mark()` 和 `window.performance.measure()` 来使用
4. **Lighthouse**
   - Google 开源的一款网页性能分析工具
   - 可以对页面进行全面的性能、可访问性、SEO 等方面的评测
   - 生成的报告可以帮助开发者快速发现性能问题并进行优化

### React项目性能优化

1. **`React.memo`** 

   - 默认包裹组件对props浅比较，确定是否更新，也可使用自定义 React.memo(MyComponent, (prevProps, nextProps) 
   - **浅比较**是指比较两个对象的引用是否相同,而不是比较对象的内容是否相同

2. `React.lazy` 和 `Suspense` 实现动态组件导入和加载

3. **使用 `React.PureComponent`**

   - 对组件的 props 和 state 进行浅比较

   - ```react
     class MyComponent extends React.PureComponent {
     ```

4. **使用 `useCallback` 和 `useMemo` Hooks 缓存计算结果**

   - `useCallback` 缓存函数引用,`useMemo` 缓存计算结果,减少重复计算。

5. **使用 `windowing` 或 `virtualization` 技术优化长列表性能**

   - 仅渲染可见区域,减少 DOM 操作。

6. **使用 `React.Fragment` 减少 DOM 节点**

   - 使用 `React.Fragment` 可以在不添加额外 DOM 节点的情况下对子元素进行分组。

7. **使用 `React.Profiler` 进行性能分析**

   - `React.Profiler` 可以帮助你识别应用程序中的性能瓶颈。

8. **使用 `shouldComponentUpdate` 生命周期方法使用nextProps, nextState进行 Props 和 State 的浅层比较**

   - 通过比较 props 和 state 的变化,决定是否需要重新渲染组件。

9. **使用 `React.StrictMode` 发现隐藏的性能问题**

   - `React.StrictMode` 可以帮助你发现应用程序中的一些潜在问题,例如意外的副作用。

10. **大组件拆分成小组，优势在于小组件内的state更新后不在影响大组件的render**

### react.lazy的原理

`react.lazy`接受一个函数作为参数，返回一个 Promise，在组件渲染时，如果组件尚未加载，`react.lazy`会抛出一个 Promise，`Suspense`组件会捕获这个 Promise，并显示`fallback`属性指定的内容。当组件加载完成后，`Suspense`会替换`fallback`内容，显示实际的组件。

### Suspense原理

1. 当 `Suspense` 包裹的组件中触发异步操作时，`Suspense` 会将该组件标记为暂停状态。
2. 当组件被标记为暂停状态后，`Suspense` 会使用备用内容。
3. `Suspense` 会监听异步操作。一旦异步操作完成。
4. `Suspense` 会将组件的暂停状态解除，并重新渲染被包裹的组件。

### key主要解决那类问题

1. 识别列表中的元素：当渲染一个列表时，React 使用key唯一标识符来识别每个元素，并准备的更新或删除元素。
2. 提高渲染性能：当列表中的元素发生变化时，React 需要重新渲染整个列表。如果没有 `key` 属性，React 可能会不必要地重新渲染所有元素，这会导致性能下降。通过使用 `key` 属性，React 可以只更新发生变化的元素，从而提高渲染性能。
3. 保持组件状态：当一个组件的状态发生变化时，React 需要重新渲染该组件。如果该组件包含一个列表，并且列表中的元素没有 `key` 属性，React 可能会不必要地重新渲染整个列表，这会导致组件状态的丢失。通过使用 `key` 属性，React 可以只更新发生变化的元素，从而保持组件的状态。

### 为什么react遍历不让使用index

1. **当数组发生变化时,**React 将无法准确地跟踪每个元素的身份,会导致不必要的重新渲染。
2. 当用户与 UI 交互,React 可能会错误地更新 DOM。
3. **diff 算法**：使用索引作为 `key`无法正确地识别元素的变化,。

### react的路由有哪几种模式

- **HashRouter**：使用 URL 的哈希部分（即#后面的部分）来处理路由，无需服务器配置，兼容性良好，路由信息保存在哈希部分。 
- **BrowserRouter**：使用 HTML5 的 History API 来管理路由，无需哈希部分，使用 History API 实现路由导航和状态管理，需要服务器配置
- **MemoryRouter**：将路由状态存储在内存中，适用于不需要浏览器 URL 导航的情况。
- **NativeRouter**：用于在 React Native 应用中进行导航和路由管理。 
- **StaticRouter**：用于在服务器端渲染或静态网站生成时进行路由管理。

### 利用跳转到一个页面，都有哪些方法

**在浏览器中**： 

- **直接设置 `location.href`**：`location.href = 'newPage.html';` 
- **使用 `location.assign()`**：`location.assign('newPage.html');` 

**在 React 中**：

1. **使用`<Link>`组件**：`<Link>`是`react-router-dom`库提供的组件，用于在应用中进行导航。通过to`属性可以实现页面跳转。
2. **使用`history.push()`方法**：通过调用`history.push()`方法，并传入目标路由的路径作为参数，可以实现编程式的页面跳转。
3. **使用`withRouter`高阶组件**：`withRouter`是一个高阶组件，它将`router`对象的属性注入到组件的`props`中。通过在组件中使用注入的`history`对象的`push`方法，可以实现页面跳转

### 跳转路由组件怎样销毁

1. **使用`componentWillUnmount`生命周期方法**：
2. **在路由切换时取消异步操作**：如果在组件中进行了异步操作，例如发送网络请求，可以在路由切换前取消这些操作，以防止在组件销毁后异步操作返回并更新组件状态；
3. **取消订阅事件**：如果组件订阅了某些事件，例如`Redux`的`store`事件或其他全局事件，需要在组件销毁时取消订阅，以避免内存泄漏；
4. **使用`useEffect`的清理函数**：如果使用了`useEffect`钩子来执行副作用操作，可以在`useEffect`的返回函数中进行清理操作，例如取消订阅、清除定时器等。

### react-router的link标签和a标签的区别

`<Link>` 标签是 React Router 中专门用于路由导航的组件，提供了更方便和高效的方式来路由切换。

而 `<a>` 标签则是 HTML 中的标准链接标签，用于链接导航。

在使用 React Router 时，通常建议使用 `<Link>` 标签来实现路由功能，以充分利用其与路由系统的集成和优化。但在某些情况下，可能仍然需要使用 `<a>` 标签来链接到外部资源或执行其他与路由无关的操作。

### 从一个路由页面跳转到另一个路由页面，我在前一个路由页面有一个请求还没有结束，应该怎么办？

1. **取消请求**：如果请求是可取消的，你可以在路由切换之前取消该请求。这样可以避免在请求完成后执行不必要的操作。
2. **忽略请求结果**：如果请求的结果对于新的路由页面不重要，你可以选择忽略请求结果。在新的路由页面中，不依赖于该请求的结果进行操作。
3. **在新的路由页面处理请求结果**：如果请求的结果对于新的路由页面是必要的，你可以在新的路由页面中处理请求结果。可以通过在新的路由页面中监听请求的完成事件或者在组件的 `componentDidMount` 生命周期方法中处理请求结果。
4. **使用全局状态管理**：将请求的状态存储在全局状态管理工具（如 `Redux` 或 `MobX`）中。在新的路由页面中，可以从全局状态中获取请求的状态，并根据需要进行处理。
5. **显示加载状态**：在路由切换时，显示一个加载状态，提示用户正在等待请求完成。这样可以提高用户体验，避免用户在等待请求时感到困惑。

### vue和react技术选型

1. 项目规模和复杂性：如果是小型项目或简单的应用，Vue 可能更适合，因为它的学习曲线较平缓。对于大型、复杂的项目，React 的组件化和性能优势可能更有吸引力。
2. 团队技术栈和经验：如果团队已经熟悉 Vue 或有相关经验，选择 Vue 可以减少学习成本。如果团队对函数式编程和 React 生态更熟悉，那么选择 React 可能更合适。
3. 项目需求和功能：根据项目的具体需求来评估哪个框架更能满足功能要求。例如，如果需要与其他库或框架集成，或者对性能有较高要求，React 可能更适合。
4. 社区和资源支持：考虑框架的社区活跃度、文档质量、第三方库的数量和质量等因素。一个活跃的社区和丰富的资源可以提供更好的支持和解决方案。

### React profiler

- `id` 是 Profiler 组件的唯一标识符，用于在性能数据中标识特定的 Profiler。
- `onRender` 是一个回调函数，在组件树中的组件`提交更新时`被调用。这个回调函数接收多个参数，包括组件的标识符、渲染阶段（挂载或更新）、实际渲染时间、基础渲染时间、渲染开始时间、提交时间以及本次更新的交互集合。

```js
import React, { Profiler } from 'react';

function onRenderCallback(
  id, // 组件的标识符
  phase, // 'mount' 或 'update'
  actualDuration, // 本次渲染实际花费的时间
  baseDuration, // 估计不使用 memoization 的情况下渲染整个子树需要的时间
  startTime, // 开始渲染本次更新的时间戳
  commitTime, // 提交本次更新的时间戳
  interactions // 对象数组，表示本次更新涉及的所有交互集合
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
      {/* 应用的其他组件 */}
    </Profiler>
  );
}
```

在使用 React Profiler 进行性能分析时，你需要在浏览器中打开 React DevTools，并选择 Profiler 选项卡。然后，你可以启用性能分析并观察 Profiler 中显示的性能统计信息，包括组件的渲染次数、渲染时间等。

### 注意事项

- React Profiler 仅在开发模式下可用，生产环境中的使用请参考官方文档。
- Profiler 仅在提交阶段收集性能数据，因此它不能定位非提交阶段的性能问题。
- Profiler 的使用可能会对性能产生轻微影响，因此建议仅在需要时使用。

### React 数据流的管理方式

- **state**:组件内部的私有数据，它由组件自己管理

- **Props**: 父组件传递给子组件的数据,子组件不能直接修改传递给它的属性，但可以通过父组件传递的回调函数来通知父组件更新状态。

- React 的 Context API 允许跨组件层级传递数据，而不需要通过每个层级的组件显式地传递属性(主题)

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

- 状态提升,当多个组件需要共享相同的状态时，可以将状态提升到它们的共同父组件中。




### 受控组件非受控组件

> 受控组件：受我们控制的组件 组件状态全程相应外部数据
>
> 非受控组件：不受我们控制的组件,受组件标签内部的影响



```js
//受控组件

export class UnControll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username:'encode'}
  }
  
  render(){<input name ='encode' value={this.state.username} onChange={}/>}
}

//非受控组件
import React,{Component} from 'react';
export class UnControll extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef(React);
  }
  handleSubmit(){
    console.log(this.inputRef.current.value);
  }
  
  render(){
    <form onSubmit={ e => this.handleSubmit(e)}>
      <input defaultValue ='encode' ref={this.inputRef/>
    </form>
  }
}
非受控改为受控
const [value,setValue] = useState('');
const [checked,setChecked] = useState(false);
return (
	<>//数据操作交友react操作
  	<input value={value} onInpu={event -> setValue(event.target.value)}
		<input type='checkbox' checked=[checked] onChange=[event-> setChecked(event.target.value)]
  </>
)
```

应用场景

受控组件 ： 实现表单

非受控组件： 即时现场验证