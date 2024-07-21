### **new一个对象，到底发生什么？**

1）创建一个对象，该对象的原型指向构造函数的原型

2）调用该构造函数改变this指向新的对象

3）判断构造函数是否有返回值，如果有返回值且返回值是一个对象或一个方法，则返回该值；否则返回新生成的对象

```js
function selfNew(fn, ...args) {
  // 创建一个instance对象，该对象的原型是fn.prototype  let instance = Object.create(fn.prototype);
  let res = fn.apply(instance, args);
  // 如果fn函数有返回值，并且返回值是一个对象或方法，则返回该对象，否则返回新生成的instance对象
  return typeof res === "object" || typeof res === "function" ? res : instance;
}
```