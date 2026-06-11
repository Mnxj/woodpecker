```js

// https://github.com/mqyqingfeng/Blog/issues/11
/**
 *
 * @param {*} ctx The `this` execution context of the function
 * @param  {...any} args parameter list
 * @returns the function's result
 */
Function.prototype.myCall = function (ctx, ...args) {
  if (!ctx) {  ctx = typeof window !== 'undefined' ? window : global }
  // Handle the case where ctx might not be an object
  ctx = Object(ctx)

  const fnName = Symbol('key')
  ctx[ fnName ] = this
  const result = ctx[ fnName ](...args)
  delete ctx[ fnName ]
  return result
}

let fn = function (name, sex) {
  console.log(this, name, sex)
}

fn.myCall('', '111', 'boy'),
fn.myCall({ name: '111', sex: 'boy' }, '111', 'boy')


/**
 *
 * @param {*} ctx The `this` execution context of the function
 * @param {*} args  arguments array
 * @returns the function's result
 */
Function.prototype.myApply = function (ctx, args) {
  if (!ctx) {
    ctx = typeof window !== 'undefined' ? window : global
  }
  // Handle the case where ctx might not be an object
  ctx = Object(ctx)

  const fnName = Symbol()

  ctx[ fnName ] = this

  const result = ctx[ fnName ](...args)

  delete ctx[ fnName ]

  return result
}

let fn = function (name, sex) {
  console.log(this, name, sex)
}


fn.myApply('', ['111', 'boy'])
fn.myApply({ name: '111', sex: 'boy' }, ['111', 'boy'])
```
