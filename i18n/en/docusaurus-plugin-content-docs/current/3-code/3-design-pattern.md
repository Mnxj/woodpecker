---
sidebar_position: 3
title: Design Patterns
---

### Singleton

A class has only one instance.

Use cases: modals, database connections.

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

**Factory Pattern**

Use a factory function to create objects instead of instantiating them directly.

Use case: create different menus based on user roles.

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



### Strategy Pattern

Hit different strategies based on parameters.

Use case: form validation.

```js
 // validate that the field is not empty
  isNoEmpty: function(value, errorMsg) {
    if (value.trim() === "") {
      return errorMsg;
    }
  },
  // validate minimum length
  minLength: function(value, length, errorMsg) {
    if (value.trim().length < length) {
      return errorMsg;
    }
  },
```



### Decorator Pattern

Dynamically add extra responsibilities to an object.

Use case: add hooks before/after a function executes.

```js
function fuc() {
  console.log(2);
}
Function.prototype.before = function(beFn) {
  let self = this;
  return function() {
    beFn.apply(this, arguments); // run the inserted method first, like pre-order traversal
    return self.apply(this, arguments); // then run the current method
  };
};
Function.prototype.after = function(afFn) {
  let self = this;
  return function() {
    self.apply(this, arguments); // run the current method first
    return afFn.apply(this, arguments); // then run the inserted method
  };
};

```

### Visitor Pattern

Add a new way to access elements of a structure without changing the object itself.

Use case: babel plugins.

```js
// Element class
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

// Visitor classes
class ChineseTeacher {
  visit(student) {
    console.log(`Chinese ${student.chinese}`);
  }
}

class MathTeacher {
  visit(student) {
    console.log(`Math ${student.math}`);
  }
}

class EnglishTeacher {
  visit(student) {
    console.log(`English ${student.english}`);
  }
}

// Instantiate element
const student = new Student("Zhang San", 90, 80, 60);
// Instantiate visitors
const chineseTeacher = new ChineseTeacher();
const mathTeacher = new MathTeacher();
const englishTeacher = new EnglishTeacher();
// Accept visitors
student.accept(chineseTeacher); // Chinese 90
student.accept(mathTeacher); // Math 80
student.accept(englishTeacher); // English 60
```



### Pub/Sub Pattern

Subscribers subscribe to topics; publishers notify subscribers of those topics by publishing topic events.

Use case: `EventBus`.

```js
class EventBus {
  constructor() {
    this.task = {};
  }
  on(type, fn) {
    // on — register event
    if (!this.task[type]) this.task[type] = [];
    this.task[type].push(fn);
  }
  emit(type, ...args) {
    // emit — dispatch event
    if (this.task[type]) {
      this.task[type].forEach(fn => {
        fn.apply(this, args); // mind the `this` binding
      });
    }
  }
  off(type, fn) {
    // remove event handler
    if (this.task[type]) {
      this.task[type] = this.task[type].filter(item => item !== fn);
    }
  }
  once(type, fn) {
    // run only once
    function f(...args) {
      fn(...args);
      this.off(type, f);
    }
    this.on(type, f);
  }
}

// Test
let event = new EventBus();
event.on("change", (...args) => {
  console.log(args);
});
// Runs only once
event.once("change", (...args) => {
  console.log(args);
});
event.emit("change", 1, 2);
event.emit("change", 2, 3);
```

### Observer Pattern

When an object's state changes, related objects are automatically notified.

Use case: Vue two-way binding, MobX.

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

### Iterator Pattern

