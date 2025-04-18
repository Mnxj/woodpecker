### 实现一个 redux。实现 createStore 的功能，关键点发布订阅的功能，以及取消订阅的功能。

```js
// 定义一个 reducer 函数，用于处理状态的更新
function counterReducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// 创建一个 store 对象
function createStore(reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];

  // 获取当前状态
  function getState() {
    return state;
  }

  // 触发状态更新
  function dispatch(action) {
    state = reducer(state, action);
    subscribers.forEach(subscriber => subscriber());
  }

  // 订阅状态变化
  function subscribe(subscriber) {
    subscribers.push(subscriber);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index!== -1) {
        subscribers.splice(index, 1);
      }
    };
  }

  return {
    getState,
    dispatch,
    subscribe
  };
}

// 创建一个 store 实例
const store = createStore(counterReducer);

// 订阅状态变化
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// 触发状态更新
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

// 取消订阅
unsubscribe();
```



### 手写connect函数

```js
export function connect(mapStateToProps, mapDispatchToProps) {

//connect函数的返回值是一个ContainerComponentCreator，也就是容器组件的创建器，而我们说过容器组件会包装一个UI组件，因此创建器的方法参数是一个UI组件
  return (UIComponent) => {
    return class ContainerComponent extends React.Component {
      // 容器组件需要声明接收Provider提供的store
      static contextTypes = {
        store: PropTypes.object
      }
      constructor (props, context) {
        super(props)//调用父类构造器，不解释
　　　　　// 得到Provider传过来的store
        const store = context.store
        // 构造状态数据
        const stateProps = mapStateToProps(store.getState())
        // 将状态数据作为容器的state(因为状态改变意味着我们的UI组件需要随之变化，而state的改变正好会使得容器组件重新渲染)
        this.state = {...stateProps}

        //构造dispatchProps(更新状态数据的方法)，这段不解释，请对照上面的格式①和格式②，很容易看出这段代码做了什么
        const dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
            const actionCreator = mapDispatchToProps[key]
            pre[key] = (...args) => store.dispatch(actionCreator(...args)) 
            return pre
        }, {})

        // 保存到组件上
        this.dispatchProps = dispatchProps
        // 绑定redux状态变化的监听
        store.subscribe(() => { // 状态变化的回调
          // 更新容器组件的状态，使容器组件重新渲染，进而导致UI组件的更新
          this.setState({...mapStateToProps(store.getState())})
        })
      }

      render () {
        // 渲染UI组件，并把UI组件所需的stateProps(状态数据)和dispatchProps(更新状态数据的方法)传入
        return <UIComponent  {...this.state} {...this.dispatchProps}/>
      }
    }

  }
}
```

