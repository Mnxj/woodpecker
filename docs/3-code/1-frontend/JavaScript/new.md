### **new一个对象，到底发生什么？**

```js
/**
 * new 的执行过程
 * 1. 创建一个对象obj
 * 2. 该对象的__proto__指向构造函数Fn的原型prototype
 * 3. 执行构造函数Fn的代码，往新创建的对象obj上添加成员属性和方法
 * 4. 返回这个新的对象obj
 */

const _new = function (func, ...args) {
  if (typeof func !== 'function') {
    throw 'func must be a function'
  }
  let obj = {}
  obj.__proto__ = func.prototype
  let result = func.apply(obj, args)

  return !!result&& typeof result === 'object' || typeof result === 'function' ? result : obj
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
n typeof res === "object" || typeof res === "function" ? res : instance;
}
```