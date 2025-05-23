---
sidebar_position: 3
title: 设计模式
---

### 单例模式

一个类只有一个实例

应用案例：弹框，数据库连接

```js
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }
}

const instance1 = new Singleton();
const instance2 = new Singleton();

console.log(instance1 === instance2); 
```

**工厂模式（Factory Pattern）**

通过工厂函数来创建对象，而不是直接在代码中实例化对象。

应用：根据用户角色创建不同的菜单。

```js
class Product {
  constructor(name) {
    this.name = name;
  }
}

class Factory {
  createProduct(type) {
    if (type === 'A') {
      return new Product('Product A');
    } else if (type === 'B') {
      return new Product('Product B');
    }
  }
}

const factory = new Factory();
const productA = factory.createProduct('A');
const productB = factory.createProduct('B');

console.log(productA.name); 
console.log(productB.name); 
```



### 策略模式

根据不同参数命中不同的策略

应用案例：表单验证

```js
 // 验证是否为空
  isNoEmpty: function(value, errorMsg) {
    if (value.trim() === "") {
      return errorMsg;
    }
  },
  // 验证最小长度
  minLength: function(value, length, errorMsg) {
    if (value.trim().length < length) {
      return errorMsg;
    }
  },
```



### 装饰者模式

动态地给对象添加一些额外的职责

应用案例：在函数执行前后添加新的方法

```js
function fuc() {
  console.log(2);
}
Function.prototype.before = function(beFn) {
  let self = this;
  return function() {
    beFn.apply(this, arguments); // 先执行插入到前面的方法，类似于二叉树的前序遍历
    return self.apply(this, arguments); // 后执行当前的方法
  };
};
Function.prototype.after = function(afFn) {
  let self = this;
  return function() {
    self.apply(this, arguments); // 先执行当前的方法
    return afFn.apply(this, arguments); // 后执行插入到后面的方法
  };
};

```

### 访问者模式

在不改变该对象的前提下访问其结构中元素的新方法

应用案例：babel插件

```js
// 元素类
class Student {
  constructor(name, chinese, math, english) {
    this.name = name;
    this.chinese = chinese;
    this.math = math;
    this.english = english;
  }

  accept(visitor) {
    visitor.visit(this);
  }
}

// 访问者类
class ChineseTeacher {
  visit(student) {
    console.log(`语文 ${student.chinese}`);
  }
}

class MathTeacher {
  visit(student) {
    console.log(`数学 ${student.math}`);
  }
}

class EnglishTeacher {
  visit(student) {
    console.log(`英语 ${student.english}`);
  }
}

// 实例化元素类
const student = new Student("张三", 90, 80, 60);
// 实例化访问者类
const chineseTeacher = new ChineseTeacher();
const mathTeacher = new MathTeacher();
const englishTeacher = new EnglishTeacher();
// 接受访问
student.accept(chineseTeacher); // 语文90
student.accept(mathTeacher); // 数学80
student.accept(englishTeacher); // 英语60
```



### 发布订阅模式

订阅者订阅相关主题，发布者通过发布主题事件的方式，通知订阅该主题的对象

应用案例：`EventBus`

```js
class EventBus {
  constructor() {
    this.task = {};
  }
  on(type, fn) {
    // on 注册事件
    if (!this.task[type]) this.task[type] = [];
    this.task[type].push(fn);
  }
  emit(type, ...args) {
    // emit 发送事件
    if (this.task[type]) {
      this.task[type].forEach(fn => {
        fn.apply(this, args); // 注意this指向
      });
    }
  }
  off(type, fn) {
    // 删除事件
    if (this.task[type]) {
      this.task[type] = this.task[type].filter(item => item !== fn);
    }
  }
  once(type, fn) {
    // 只执行一次
    function f(...args) {
      fn(...args);
      this.off(type, f);
    }
    this.on(type, f);
  }
}

// 测试
let event = new EventBus();
event.on("change", (...args) => {
  console.log(args);
});
// 只执行一次
event.once("change", (...args) => {
  console.log(args);
});
event.emit("change", 1, 2);
event.emit("change", 2, 3);
```

### 观察者模式

一个对象的状态发生改变时，自动通知其他相关对象。

应用案例： vue 双向绑定,MOBX

```js
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs!== observer);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer.update());
  }
}

class Observer {
  update() {
    console.log('Observer updated');
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers(); 
```

### 迭代器模式

