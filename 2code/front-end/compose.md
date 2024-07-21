> 在函数式编程当中有一个很重要的概念就是函数组合，实际上就是把处理数据的函数像管道一样连接起来，然后让数据穿过管道得到最终的结果

在多个框架源码中都有用到，比如redux、koa 中多次遇到这个方法

效果： 将一系列函数，通过compose函数组合起来，像管道一样连接起来，比如函数结合`[f, g, h ]`，通过compose最终达到这样的效果： `f(g(h()))`

compose函数要求：可执行`同步方法`，也可执行`异步方法`，两者都可以兼容
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