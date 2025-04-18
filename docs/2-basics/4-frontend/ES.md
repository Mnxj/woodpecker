### ES7

**Array.prototype.includes() 方法**：
比 `indexOf` 更直观，支持 `NaN`，并且不会与 `-1` 产生混淆。

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.includes(3)); // true
console.log(arr.includes(10)); // false
```

### ES8

- `async` 和 `await` 使异步操作变得更加简单。
- Object.values() 和 Object.entries()：
    - `Object.values()` 方法返回一个给定对象自身的所有可枚举属性值组成的数组。
    - `Object.entries()` 方法返回一个给定对象自身可枚举属性的键值对数组。
- String.padStart` 和 `String.padEnd 符串填充指定的字符，直到其达到指定的长度。

### ES9

**1. 异步迭代（`for-await-of`）**

- **概述**：与同步的 `for-of` 类似，`for-await-of` 用于异步迭代，它允许你迭代一个返回 Promise 的异步可迭代对象。

```
async function fetchData() {
  const data = ['a', 'b', 'c'];

  for await (let item of data) {
    console.log(item);  // 会在每个异步操作完成后逐个输出
  }
}
```

**2. 正则表达式的改进：**

- Unicode 中所有的数字字符可以通过 `\d` 匹配。
- **`RegExp` 的 `s` 和 `dotAll` 标志**：允许 `.` 匹配换行符。

```js
const regex = /foo.bar/s;
console.log(regex.test('foo\nbar'));  // true
```

### ES10

- **`Array.prototype.flat` 和 `Array.prototype.flatMap`** 先对数组每个元素进行映射，再进行扁平化操作。
- **`Object.fromEntries()`**
    - **概述**：将一个键值对数组转换为对象。

### ES11

**`BigInt`**

- **概述**：允许处理任意大小的整数（超出 `Number` 类型的最大值）。

```js
const bigInt = 1234567890123456789012345678901234567890n;
console.log(bigInt + 1n);  // 1234567890123456789012345678901234567891n
```

**2. `Nullish Coalescing Operator (??)`**

- **概述**：提供了一种简便的方式来处理 `null` 或 `undefined` 的情况，只有在左侧操作数为 `null` 或 `undefined` 时，才会返回右侧的值。

```js
const foo = null ?? 'default';  // 'default'
const bar = 0 ?? 42;            // 0
```

**3. `Optional Chaining (?.)`**

- **概述**：允许你在访问深层嵌套的属性时，如果某个值是 `null` 或 `undefined`，避免抛出错误，直接返回 `undefined`。

### ES12

- **`Logical Assignment Operators`**

- **概述**：`&&=`, `||=`, `??=` 这三个操作符用于在条件为真或为假时对变量进行赋值
- **`WeakRefs`**
    - **概述**：允许你创建对对象的弱引用，这样对象可以在没有强引用的情况下被垃圾回收。
- **`Promise.any()`**
    - **概述**：`Promise.any()` 接受一个 Promise 数组，返回第一个成功的 Promise。如果没有 Promise 成功，则返回一个 `AggregateError` 错误。

### es6新增   11个

- **let 和 const 声明变量**:
    - `let` 声明块级作用域变量,可以重新赋值。
    - `const` 声明块级作用域常量,不可以重新赋值。
- **箭头函数 (Arrow Functions)**:
    - 提供了更简洁的函数定义语法。
    - `this` 指向定义时所在的上下文,而不是调用时所在的上下文。
- **模板字符串 (Template Literals)**:
    - 使用 `` 括起来的字符串,可以包含换行和变量interpolation。
- **解构赋值 (Destructuring)**:
    - 可以从数组或对象中提取值,并赋值给变量。
- **默认参数 (Default Parameters)**:
    - 为函数参数提供默认值。
- **剩余参数（rest 参数 (Rest Parameters)）**:
    - 将不定数量的参数收集到一个数组中。
- **扩展运算符 (Spread Operator)**:
    - 将数组或对象展开为单独的元素。
- **类 (Class)**:
    - 提供了一种更加面向对象的编程方式。
    - 包括类的继承、静态方法和getter/setter。
- **模块 (Modules)**:
    - 通过 `import` 和 `export` 关键字实现代码的模块化。
- **Promise**:
    - 提供了一种更优雅的异步编程方式。
    - 避免了"回调地狱"的问题。
- **Symbol**:
    - 引入了一种新的原始数据类型,用于创建唯一的属性键。

### ES6 symbol如何使用以及场景

1. **创建 Symbol**

    - 使用 Symbol()函数创建一个新的 Symbol 值:

      ```js
      const mySymbol = Symbol('description');
      ```

    - 每次调用 `Symbol()` 都会创建一个新的 Symbol 值,即使描述字符串相同。

2. **使用 Symbol 作为对象属性键**

    - Symbol 值可以作为对象的属性键使用,这样可以创建独一无二的属性:

      ```js
      const obj = {
        [mySymbol]: 'hello'
      };
      console.log(obj[mySymbol]); // 输出 'hello'
      ```

4. **全局 Symbol 注册表**

    - 使用 Symbol.for()方法可以在全局注册表中创建和查找 Symbol:

      ```js
      const globalSymbol = Symbol.for('global symbol');
      const anotherGlobalSymbol = Symbol.for('global symbol');
      console.log(globalSymbol === anotherGlobalSymbol); // 输出 true
      ```

5. **内置 Symbol**

    - JavaScript 提供了一些内置 Symbol,如 `Symbol.iterator`、`Symbol.hasInstance` 等,用于扩展语言的行为。

6. **Symbol 的场景**

    - **属性键的唯一性**: 使用 Symbol 作为对象属性键可以确保该属性名是唯一的,不会与其他属性发生冲突。
    - **私有属性和方法**: 可以使用 Symbol 实现类的私有属性和方法。
    - **对象扩展**: 在不改变现有代码的情况下,使用 Symbol 为对象添加新的功能。
    - **消除魔术字符串**: 使用 Symbol 代替字符串可以消除魔术字符串,提高代码的可读性和可维护性。

### js数组方法会改变数组结构的方法

1. `pop()` - 移除数组的最后一个元素并返回该元素。
2. `push()` - 将一个或多个元素添加到数组的末尾，并返回新的数组长度。
3. `shift()` - 移除数组的第一个元素并返回该元素。
4. `unshift()` - 将一个或多个元素添加到数组的开头，并返回新的数组长度。
5. `splice()` - 通过删除现有元素和/或添加新元素来更改数组的内容。
6. `sort()` - 对数组的元素进行排序。
7. `reverse()` - 颠倒数组中元素的位置。
8. `fill()` - 使用一个固定值填充数组的开始到结束（或指定范围）的所有元素。
9. `copyWithin()` - 复制数组中一系列元素到同一数组中的另一个位置。

而以下是一些不会改变原数组的方法：

1. `concat()` - 返回一个新数组，它是通过将一个或多个数组与原数组合并而成的。
2. `slice()` - 返回一个新数组，包含从开始到结束（不包括结束）选择的数组的一部分。
3. `map()` - 创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值。
4. `filter()` - 创建一个新数组，包含通过所提供函数实现的测试的所有元素。
5. `reduce()` - 将数组元素组合起来，根据回调函数减少为单个值。
6. `reduceRight()` - 与 `reduce()` 类似，但它是从数组的末尾开始执行的。
7. `forEach()` - 对数组的每个元素执行一次提供的函数。
8. `entries()` - 返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。
9. `keys()` - 返回一个新的Array Iterator对象，包含数组中每个索引的键。
10. `values()` - 返回一个新的Array Iterator对象，包含数组中每个索引的值。



### Set转Array有哪些方式

```js
[...new Set([1, 2, 3, 4, 5])] //1
Array.from(new Set([1, 2, 3, 4, 5])) //2
Array.prototype.slice.call(new Set([1, 2, 3, 4, 5])) //3
const mySet = new Set([1, 2, 3, 4, 5]);//4
const myArray = [];
for (const value of mySet) {
   myArray.push(value);
}
const mySet = new Set([1, 2, 3, 4, 5]); //5
const myArray = [];
mySet.forEach(value => myArray.push(value));
```

### 数组去重的方式

```js
[...new Set(arr)] //1
arr.filter((item, index) => arr.indexOf(item) === index);//2
return arr.reduce((unique, item) => { //3
     return unique.includes(item) ? unique : [...unique, item];
   }, []);
for (let i = 0; i < arr.length; i++) { //4
     if (uniqueArray.indexOf(arr[i]) === -1) {
       uniqueArray.push(arr[i]);
     }
   }

const uniqueMap = new Map(); //5
   arr.forEach(item => uniqueMap.set(item, true));
   return Array.from(uniqueMap.keys());
```

### splice

splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。

```js
//在数组指定位置插入
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
//输出结果
//Banana, Orange, Lemon, Kiwi, Apple, Mango
 
 
//在数组开头插入
var shuiguo = ["Banana", "Orange", "Apple", "Mango"];
shuiguo.splice(0, 0, "Lemon");
//输出结果
//Lemon, Banana, Orange, Apple, Mango

let arr = [1, 2, 3, 4, 5];  
let index = arr.indexOf(3); // 找到要删除的元素的索引  
if (index !== -1) { // 确保元素存在于数组中  
    arr.splice(index, 1); // 删除一个元素  
}  
console.log(arr); // 输出: [1, 2, 4, 5]

```

### slice() 复制数组元素

### Var let const 区别

- Var 可以重复声明 let const 不可以重复声明
- var不受限于块级 而let Const受限于块级
- Const 声明之后的必须赋值否则会报错 不可修改 常量
- let声明上方访问变量 let 暂存死区

### 函数声明和变量声明

函数声明和变量声明都会被提升（hoisting）。这意味着函数和变量的声明会被移动到它们所在作用域的顶部，但赋值操作不会被提升。

```js
console.log(c); // function
function c() {}
//⬇️
function c() {} // 函数声明被提升到作用域的顶部
console.log(c); // 执行时，c已经被声明为函数，所以输出 function
```



### 箭头函数**与普通函数区别**

- 语法：箭头函数使用 `=>` ，普通函数使用 `function`
- `this` 指向：箭头函数中的 `this` 指向定义时所在的上下文，而普通函数中的 `this` 指向在函数调用时的对象。
- 构造函数：箭头函数不能用作构造函数
- 原型：箭头函数没有自己的原型对象
- arguments 对象：箭头函数没有自己的 `arguments` 对象，它访问的是外层函数的 `arguments` 对象。普通函数有自己的 `arguments` 对象，它包含了函数调用时传递的参数。
- 返回值： 箭头函数可以省略 `return` 关键字

### 箭头为啥没有构造函数

- 设计目标是提供一种简洁、灵活的语法用于回调和内联函数。

- 它没有 `Function.prototype`，因为箭头函数不能作为构造函数使用，也没有自己的 `this` 和 `arguments` 对象。

- 箭头函数仅仅是为了简化代码的书写，并且与常规函数的行为有一些显著区别，因此它没有传统函数的 `prototype` 属性。

### 如果箭头函数使用call or apply or bind会发生什么？

箭头函数的 `this` 是在函数定义时由外部作用域决定的，而不是调用时动态绑定的。

因此，无论你如何使用 `call`、`apply` 或 `bind`，箭头函数的 `this` 仍然会保持为定义时的 `this`。

### 介绍Set,Map,WeakSet,WeakMap的区

- set
    - 成员不能重复
    - 类似于数组
    - 可以遍历 add delete has
- weakSet
    - 参数只能是对象
    - 对象都是弱引用 垃圾回收机制不考虑对象对该机制的引用，如果其他对象都不在引用该对象那么垃圾回收机制就会回首，所以没有可以遍历 也没有size属性
    - 存储dom节点 而不用担心节点被移除造成内存泄漏
- map
    - 对象是数据结构，键值对集合 建：多类型
    - 可以接受数组作为参数 键值对数组
    - Map 的建 跟内存地址绑定 内存地址不一样视为两个键
    - 简单类型值 值严格相等 视为一个键
    - Map的遍历顺序 就是插入顺序
- WeakMap
    - WeakMap只接受对象作为键值
    - 建名是对象的弱引用
    - 没有遍历操作 无法清空 不支持clear
    - Get set has delete



### 字符串增添方法？

模版字符串 includes 是否包含。endsWith StartWith

### 数组新增了哪些方法，并指明他的用法？

Array.Form()讲类数组（arguments 对象，DOM 元素集合，字符串，TypedArray）转为数组，对象set map

Array.of()将一组值转成数组。array.of(1,2,3)//[1,2,3]

Array,fill 填充数据

Array.find()

Array.findIndex()

### 对象的拓展哪些属性？

遍历方式

- Object.keys()
- Reflect.ownKeys(obj)
- Object.is() //两个值是否相等
- Object.assign //对象合并 复制到目标对象 浅拷贝

### Generator

1）`generator函数`跟普通函数在写法上的区别就是，多了一个星号`*`

2）只有在generator函数中才能使用`yield`，相当于generator函数执行的`中途暂停点`

3）generator函数是不会自动执行的，每一次调用它的`next`方法，会停留在下一个yield的位置

4) 调用并不会立即执行 返回一个迭代器 可以进行异步调用



应用场景：

**迭代器模式实现** **异步操作控制流程** **无限数据流处理**



### ES6 的class和 ES5 的构造函数有以下联系和区别：

**联系：**

• 都可以用来创建对象的实例。

• 都可以在实例上定义属性和方法。

• 都可以通过new关键字来调用。

**区别：**

• 语法：ES6 的class，ES5 使用函数。

• 继承：ES6 extends，而 ES5 原型链。

• 方法的定义方式：ES6 可以直接在类的定义中定义方法，而 ES5 构造函数的原型对象上定义方法。

• 静态方法和属性：ES6 的class支持定义静态方法和属性，而 ES5 在构造函数本身上定义静态方法和属性。

• 访问器属性：ES6 的class支持使用get和set关键字来定义访问器属性，而 ES5 需要使用Object.defineProperty()方法来实现。

• 类的本质：ES6 基于原型链的继承和对象的创建方式，而 ES5直接创建对象的方式。



### ES6的模块理解，有哪些场景？

模块：一种更现代化和结构化的方式来组织和管理 JS 代码，有助于提高代码的质量、可维护性和可扩展性

模块化可以实现： 抽象 封装 复用

采用export.import



没有模块化

- 变量和方法不容易维护 容易污染全局作用域
- 加载资源的方式通过script标签上到下
- 大型项目维护会让人崩溃
