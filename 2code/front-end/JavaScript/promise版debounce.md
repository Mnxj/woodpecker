### 手写promise版debounce

```js
function debounce(fn, delay) {
    let timer;
    return function(...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        Promise.resolve(fn.apply(this, args)).then(() => {
          timer = null;
        });
      }, delay);
    };
  }
  
  const debouncedFunction = debounce((text) => {
    console.log('Function called with:', text);
  }, 500);
  
  debouncedFunction('Hello');
  debouncedFunction('World');
  debouncedFunction('React Native');
```