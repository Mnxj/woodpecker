> 速度速度hi函数
```js
// compose底层
function compose(fn) {
  const f = fn.shift(); //取出来第一个
  return function(...args) {
    return fn.reduce((pre, cur) => {
      return  pre.then(result=> {
        return cur.call(null,result)
      });
    }, Promise.resolve(f.apply(null,args)))  //reduce的值
  }
}

// 同步方案案例
function fn1(x) {
  return x + 1;
}
function fn2(x) {
  return x + 2;
}
function fn3(x) {
  return x + 3;
}


// 异步方法案例
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
// 依次打印 async1 → async1 → async1 → 3
```