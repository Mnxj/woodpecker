### Implement Redux's createStore — key points: pub/sub and unsubscribe

```js
// Define a reducer to handle state updates
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

// Create a store
function createStore(reducer) {
  let state = reducer(undefined, {});
  const subscribers = [];

  // Get current state
  function getState() {
    return state;
  }

  // Trigger a state update
  function dispatch(action) {
    state = reducer(state, action);
    subscribers.forEach(subscriber => subscriber());
  }

  // Subscribe to state changes
  function subscribe(subscriber) {
    subscribers.push(subscriber);
    return () => {
      const index = subscribers.indexOf(subscriber);
      if (index !== -1) {
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

// Create a store instance
const store = createStore(counterReducer);

// Subscribe to state changes
const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Dispatch
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

// Unsubscribe
unsubscribe();
```



### Hand-written connect

```js
export function connect(mapStateToProps, mapDispatchToProps) {

// connect returns a ContainerComponentCreator — i.e. a container-component creator. Since a container wraps a UI component, the creator's parameter is a UI component.
  return (UIComponent) => {
    return class ContainerComponent extends React.Component {
      // Container needs to declare it receives the store from Provider
      static contextTypes = {
        store: PropTypes.object
      }
      constructor (props, context) {
        super(props) // call parent constructor
        // Get the store provided by Provider
        const store = context.store
        // Construct the state data
        const stateProps = mapStateToProps(store.getState())
        // Use the state data as container state (state changes mean UI must re-render — state updates cause re-render)
        this.state = {...stateProps}

        // Construct dispatchProps (methods that update state). Refer to formats ① and ② above — it's clear what this does
        const dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
            const actionCreator = mapDispatchToProps[key]
            pre[key] = (...args) => store.dispatch(actionCreator(...args))
            return pre
        }, {})

        // Save on the component
        this.dispatchProps = dispatchProps
        // Bind redux state-change listener
        store.subscribe(() => { // callback on state change
          // Update container state, causing re-render and UI update
          this.setState({...mapStateToProps(store.getState())})
        })
      }

      render () {
        // Render the UI component, passing stateProps (state data) and dispatchProps (state-updating methods)
        return <UIComponent  {...this.state} {...this.dispatchProps}/>
      }
    }

  }
}
```

