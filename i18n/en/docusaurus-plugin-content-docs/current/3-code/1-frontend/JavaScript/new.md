### **What happens when you `new` an object?**

```js
/**
 * The `new` process
 * 1. Create a new object `obj`
 * 2. Set obj.__proto__ to the constructor Fn's prototype
 * 3. Run the constructor Fn's code, adding properties and methods onto obj
 * 4. Return the new object obj
 */

const _new = function (func, ...args) {
  if (typeof func !== 'function') {
    throw 'func must be a function'
  }
  let obj = {}
  obj.__proto__ = func.prototype
  let result = func.apply(obj, args)

  return !!result && typeof result === 'object' || typeof result === 'function' ? result : obj
}

let Person = function (name, sex) {
  this.name = name
  this.sex = sex
}

Person.prototype.showInfo = function () {
  console.log(this.name, this.sex)
}

let p1 = _new(Person, '111', 'sex')

console.log(p1)
console.log(p1.showInfo)
return typeof res === "object" || typeof res === "function" ? res : instance;
}
```
