### 输入一个promise和一个时间，在规定的时间内如果promise的状态为非pending，则返回状态，如果为pending则返回一个新的promise，内容为new Error()

```js
function checkPromise(promise, time) {
  return new Promise((resolve, reject) => {
    const race= Promise.race([promise,
      new Promise(reject => {
        setTimeout(()=> {
          reject(new Error('test'))
        },time)
      })
    ])
    race.then(res=> resolve(res)).catch(err=> reject(err));
  });
}

const promise = new Promise(resolve => {
  setTimeout(() => {
    resolve('success');
  }, 1000);
});
checkPromise(promise, 2000)
.then(res=> console.log(res))
.catch(err=> console.log(err))
```

