> In functional programming, function composition is an important concept — it's essentially connecting data-processing functions like a pipeline and letting the data flow through to get the final result.

This pattern appears in many framework source codes — it shows up repeatedly in redux and koa, for example.

Effect: Given a series of functions, `compose` chains them into a pipeline. Given `[f, g, h]`, `compose` produces something like `f(g(h()))`.

Requirements for the `compose` function: it must work with both `synchronous methods` and `asynchronous methods` — both must be supported.
```js
// compose implementation
function compose(fn) {
  const f = fn.shift(); // take the first
  return function(...args) {
    return fn.reduce((pre, cur) => {
      return pre.then(result => {
        return cur.call(null, result)
      });
    }, Promise.resolve(f.apply(null, args)))  // reduce's initial value
  }
}

// Synchronous case
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}


// Asynchronous case
let async1 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("async1");
      resolve(data);
    }, 1000);
  });
};
let async2 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("async2");
      resolve(data + 1);
    }, 1000);
  });
};
let async3 = data => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("async3");
      resolve(data + 2);
    }, 1000);
  });
};

const composeFn1 = compose([fn1, fn2, fn3]);
composeFn1(0).then(console.log);
// 6

const composeFn2 = compose([async1, async2, async3]);

composeFn2(0).then(console.log);
// Prints async1 → async1 → async1 → 3 in order
```
