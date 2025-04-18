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
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        const resolve = (value) => {
            const donResolve = () => {
                if (this.state === 'pending') {
                    this.state = 'fulfilled';
                    this.value = value;
                    this.onFulfilledCallbacks.forEach(fn => fn());
                }
            }
            setTimeout(donResolve, 0);
        }
        const reject = (reason) => {
            const donReject = () => {
                if (this.state === 'pending') {
                    this.state = 'rejected';
                    this.reason = reason;
                    this.onRejectedCallbacks.forEach(fn => fn());
                }
            }
            setTimeout(donReject, 0);
        }
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const success = () => {
                try {
                    const x = onFulfilled(this.value);
                    return x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            }
            const fail = () => {
                try {
                    const x = onRejected(this.reason);
                    return x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
                } catch (error) {
                    reject(error);
                }
            }
            if (this.state === 'fulfilled') {
                success(this.value);
            }
            if (this.state === 'rejected') {
                fail(this.reason);
            }
            if (this.state === 'pending') {
                this.onFulfilledCallbacks.push(success);
                this.onRejectedCallbacks.push(fail);
            }
        })
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

Promise.AllSettled = function (promises) {
    return new Promise((resolve) => {
        if(!Array.isArray(promises)) {
            reject('Promise.AllSettled expects an array of promises');
        }
        const results = [];
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then(res=> {
                results[index] = {status: 'fulfilled', value: res};
            })
                .catch(err => {
                    results[index] = {status: 'rejected', reason: err};
                })
                .finally(() => {
                    if(results.length === promises.length) {
                        resolve(results);
                    }
                });
        });
    });
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