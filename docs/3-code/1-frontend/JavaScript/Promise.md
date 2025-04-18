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

### Promise.All
```js
Promise.All = (promises) => {
  let result = []
  return new Promise((resolve,reject) => {
    promises.forEach(promise=> {
      Promise.resolve(promise).then(res=> {
        result.push(res)
        if(result.length === promises.length) {
          resolve(result);
        }
      }).catch(reject)
    })
  })
}

let p1 = Promise.resolve(1);
let p2 = 2;
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 3);
});
let p4 = Promise.reject('出错啦')


Promise.All([ p1, p2, p3 ]).then((res) => {
  console.log(res, 'res---1')
}).catch((err) => {
  console.log('err', err)
})

Promise.All([ p1, p2, 3 ]).then((res) => {
  console.log(res, 'res---2')
}).catch((err) => {
  console.log('err', err)
})

Promise.All([ p1, p2, p4 ]).then((res) => {
  console.log(res, 'res--3')
}).catch((err) => {
  console.log('err', err)
})

```
### Promise.race
```js
Promise.myRace = (promises) => {
  return new Promise((rs, rj) => {
    promises.forEach((p) => {
      Promise.resolve(p).then(rs).catch(rj)
    })
  })
}

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 1);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 2);
});

Promise.myRace([promise1, promise2]).then((value) => {
  console.log(value) // 2
});

Promise.myRace([promise1, promise2, 3]).then((value) => {
  console.log(value) // 3
});
```

### Promise

```js
class MyPromise {
  constructor (exe) {
    this.value = undefined
    this.status = 'pending'
    this.successQueue = []
    this.failureQueue = []
    const resolve = () => {
      const doResolve = (value) => {
        if (this.status === 'pending') {
          this.status = 'success'
          this.value = value
  
          while (this.successQueue.length) {
            const cb = this.successQueue.shift()
  
            cb && cb(this.value)
          }
        }
      }

      setTimeout(doResolve, 0)
    }

    const reject = () => {
      const doReject = (value) => {
        if (this.status === 'pending') {
          this.status = 'failure'
          this.value = value
  
          while (this.failureQueue.length) {
            const cb = this.failureQueue.shift()
  
            cb && cb(this.value)
          }
        }
      }

      setTimeout(doReject, 0)
    }

    exe(resolve, reject)
  }

  then (success = (value) => value, failure = (value) => value) {
    return new MyPromise((resolve, reject) => {
      const successFn = (value) => {
        try {
          const result = success(value)
          
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }

      const failureFn = (value) => {
        try {
          const result = failure(value)
          
          result instanceof MyPromise ? result.then(resolve, reject) : resolve(result)
        } catch (err) {
          reject(err)
        }
      }

      if (this.status === 'pending') {
        this.successQueue.push(successFn)
        this.failureQueue.push(failureFn)
      } else if (this.status === 'success') {
        success(this.value)
      } else {
        failure(this.value)
      }
    })
  }

  catch () {

  }
} 

const pro = new MyPromise((resolve, reject) => {
  setTimeout(resolve, 1000)
  setTimeout(reject, 2000)
})

pro
  .then(() => {
    console.log('2_1')
    const newPro = new MyPromise((resolve, reject) => {
      console.log('2_2')
      setTimeout(reject, 2000)
    })
    console.log('2_3')
    return newPro
  })
  .then(
    () => {
      console.log('2_4')
    },
    () => {
      console.log('2_5')
    }
  )
  
pro
  .then(
    data => {
      console.log('3_1')
      throw new Error()
    },
    data => {
      console.log('3_2')
    }
  )
  .then(
    () => {
      console.log('3_3')
    },
    e => {
      console.log('3_4')
    }
  )
```

### Promise.allSettled

```js
Promise.myAllSettled = (promises) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject('Promise.allSettled accepts an array')
    }

    const length = promises.length
    let remaining = length
    const result = []

    if (length === 0) {
      return resolve([])
    }

    const response = (i, value) => {
      if (value instanceof Promise) {
        // 注意此val非value
        value.then((val) => {
          response(i, val)
        }, (err) => {
          result[i] = { 
            status: 'rejected', 
            reason: err 
          }

          if (--remaining === 0){
            resolve(result)
          }
        })
        return
      }

      result[ i ] = {
        status: 'fulfilled',
        value
      }

      if (--remaining === 0) {
        resolve(result)
      }
    }

    for (let i = 0; i < length; i++) {
      response(i, promises[i])
    }
  })
}

Promise.myAllSettled2 = (promises) => {
  return new Promise((rs, rj) => {
    let count = 0
    let result = []
    const len = promises.length

    if (len === 0) {
      return resolve([])
    }

    promises.forEach((p, i) => {
      Promise.resolve(p).then((res) => {
        count += 1
        result[ i ] = {
          status: 'fulfilled',
          value: res
        }
        
        if (count === len) {
          rs(result)
        }
      }).catch((err) => {
        count += 1
        result[i] = { 
          status: 'rejected', 
          reason: err 
        }

        if (count === len) {
          rs(result)
        }
      })
    })
  })
}

const p1 = 1
const p2 = Promise.resolve(2)
const p3 = Promise.reject(3)

Promise.myAllSettled([ p1, p2, p3 ]).then(console.log)

```

### Promise.reject 

```js
Promise.myReject = function (value) {
  return new Promise((resolve, reject) => {
    reject(value)
  })
}

Promise.myReject('err').then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err, 'err')
})
```

### Promise.resolve

```js
Promise.myResolve = function (value) {
  if (value && typeof value === 'object' && (value instanceof Promise)) {
    return value
  }

  return new Promise((resolve) => {
    resolve(value)
  })
}
// 1. 非Promise对象，非thenable对象
Promise.resolve(1).then(console.log) // 1
// 2. Promise对象成功状态
const p2 = new Promise((resolve) => resolve(2))
Promise.resolve(p2).then(console.log) // 2
// 3. Promise对象失败状态
const p3 = new Promise((_, reject) => reject('err3'))
Promise.resolve(p3).catch(console.error) // err3
// 4. thenable对象
const p4 = {
  then (resolve) {
    setTimeout(() => resolve(4), 1000)
  }
}
Promise.resolve(p4).then(console.log) // 4
// 5. 啥都没传
Promise.resolve().then(console.log) // undefined

// Promise.myResolve(1).then((res) => {
//   console.log(res)
// })

// Promise.myResolve(new Promise((resolve, reject) => {
//   reject(1)
// })).then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err, 'err')
// })


```