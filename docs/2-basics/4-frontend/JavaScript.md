### **[1,2,3,4].map(parseInt) 输出：[ 1, NaN, NaN, NaN ]**

使用 `parseInt` 时，`parseInt` 的第二个参数是基数（radix），它表示数字的进制。

当你这样写 `[1, 2, 3, 4].map(parseInt)` 时，实际上会将数组中的每个元素和其索引传递给 `parseInt`。因此，调用的情况如下：

- `parseInt(1, 0)` → 返回 `1`（0 表示自动推断进制）
- `parseInt(2, 1)` → 返回 `NaN`（1 进制没有数字 2）
- `parseInt(3, 2)` → 返回 `NaN`（2 进制没有数字 3）
- `parseInt(4, 3)` → 返回 `NaN`（3 进制没有数字 4）

### JS中精度丢失如何解决

Math.ceil((6.8-0.9)*10); //向上取整 59

Math.floor((6.8-0.9)*10); //想下取整 58

Math.round((6.8-0.9)*10); //四舍五入59

大数使用bitInt，字符串表示小数可以避免丢失

### `var a = {b:1}` 存放在那

对象 `{b: 1}` 存储在堆中，变量 a 存储在栈中，指向堆中的对象

### `var a ={b:{c:1}}` 存放在那

`{b: {c: 1}}` 是一个嵌套对象储存在堆，a 在栈。

### 栈和堆的区别

栈：先进后出，大小通常在编译时就确定，栈空间不足，JS引擎会抛出“栈溢出”错误，主要用于存储基本数据类型和引用类型的引用。

堆：动态分配的内存区域，大小没有固定的限制，但受限于系统可用的内存总量，存储引用类型的数据

### 垃圾回收时栈和堆的区别

- **栈**：不需要垃圾回收器介入。当函数执行完毕后，会自动被释放。
- **堆**：因为堆中的数据可以相互引用。垃圾回收器通过标记-清除算法来识别和回收不再被引用的堆内存。

### betterscroll

>  解决移动端各种滚动场景需求的插件。



在外层容器上设置`固定高度`，使子元素内容的高度能够超出容器并被隐藏。只有当内容的高度超过容器的高度时，才能实现滚动。

⚠️需要确保父元素和子元素的内容已经正确渲染，否则可能会导致滚动不正常。

### bom和dom

- BOM 浏览器对象模型，把浏览器对象当作一个对象，顶级对象时window,操作`浏览器窗口交互`，兼容性差（每个浏览器的BOM不同
- DOM 文档对象模型 把文档当作一个对象，顶级对象是document，`操作页面元素`，W3C标准规范

### window和document区别

1. `window` 对象：
   - 代表浏览器的`窗口或框架`。
   - 可以进行一些`全局操作`，如打开新窗口、关闭窗口、获取当前窗口的焦点等。
   - `事件处理`程序通常也会绑定到 `window` 对象上，以监听窗口的加载、卸载、大小改变等事件。
2. `document` 对象：
   - 代表当前网页的文档内容。它是 `window` 对象的一个属性，可以通过 `window.document` 来访问。
   - 提供了对网页文档的操`作和访问`。
   - 许多`DOM操作`都是通过 `document` 对象来实现的。

### dom操作

**• 创建节点**

- document.createElement  创建一个新元素 ，div
- document.createTextNode 创建一个文本节点
- document.createDocumentFragment 创建⼀个⽂档碎⽚，// 添加多个子节点到DOM中时，使用文档碎片可以减少对DOM的修改次数
- document.createAttribute 创建属性节点

**• 查询节点**

- document/element.querySelector('CSS选择器')
- document/element.querySelectorAll('CSS选择器');
- document.getElementById
- document.getElementsByClassName
- document.getElementsByTagName
- document.getElementsByName('name属性值'); 返回拥有指定名称的对象结合
- document.documentElement; 获取⻚⾯中的HTML标签
- document.body; 获取⻚⾯中的BODY标签
- document.all['']; 获取⻚⾯中的所有元素节点的对象集合型

**• 更新节点**

- innerHTML 不返回隐藏元素的⽂本
- textContent 返回所有⽂本
- Style

**• 添加节点**

- innerHTML
- appendChild
- insertBefore(newElement, referenceElement)⼦节点会插⼊到 referenceElement 之前
- setAttribute

**• 删除节点**

- removeChild

### 使用getElementsByClassName返回的结果是什么类型，querySelector

- `getElementsByClassName` 返回的是一个实时更新的 `HTMLCollection` 对象，包含所有匹配指定类名的元素。
- `querySelector` 返回的是一个 `Element` 对象，代表第一个匹配指定CSS选择器的元素，如果没有找到匹配的元素则返回 `null`。

### querySelector可以选择伪元素吗

不能只直接选择伪元素，可以用div::before的方式

### **DOM 里面，如何判断 A 元素是否是 B 元素的子元素？**

- **使用 `Node.contains`**：

  ```javascript
  const isChild = B.contains(A);
  ```

### **判断一个对象是否为空，包含了其原型链上是否有自定义数据或者方法，该如何判定？**

- **使用 `Object.keys` 和 `Object.getOwnPropertyNames`**：

  ```javascript
  function isEmpty(obj) {
    return Object.keys(obj).length === 0 && Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).length === 0;
  }
  ```

---

### 兄弟节点插入一个新的DOM节点

- **`insertBefore(newNode, referenceNode)`**: 将新的节点 `newNode` 插入到 `referenceNode` 之前。

- **`insertAdjacentElement(position, newNode)`**: 将新的节点 `newNode` 插入到指定位置
   - `beforebegin`: 在当前元素前面插入。
   - `afterbegin`: 在当前元素内部的最前面插入。
   - `beforeend`: 在当前元素内部的最后面插入。
   - `afterend`: 在当前元素后面插入。

- **`appendChild(newNode)`**: 将 `newNode` 作为子节点添加到父节点的末尾，虽然它不能直接用来插入兄弟节点，但在适当的父元素下也可以通过附加来完成。

### **DocumentFragment API 是什么，有什么使用场景？**

- **DocumentFragment** 是一个轻量级的 DOM 节点容器，用于批量操作 DOM。

- **使用场景**：

   - 批量插入 DOM 节点，减少重绘和重排。

   - 示例：

     ```javascript
     const fragment = document.createDocumentFragment();
     for (let i = 0; i < 100; i++) {
       const div = document.createElement('div');
       fragment.appendChild(div);
     }
     document.body.appendChild(fragment);
     ```



### indexOf的原理

通过线性搜索算法来查找元素，从数组的开始位置向后遍历，直到找到匹配的元素或遍历完整个数组。

### Function 和 Object 的关系

- 所有的函数都是`Object`的实例。
- `Function`是构造函数的实例。
- `Function`本身也是一个函数，可以调用自身。
- `Function`是`Object`的子类型，因此它继承了`Object`的所有属性和方法。

### DOM 的`oninput`和`onchange`

`oninput`在输入内容的时候，持续调用，通过`element.value`可以持续取值，失去焦点和获取焦点不会被调用。

`onchange`在输入期间不会被调用，在失去焦点的`value`与获得焦点时的`value`不一致（输入内容有变化）的时候才会被调用。

### load发现在浏览器的加载的什么时机

当页面的 DOM 结构构建完成，所有的图片、样式表、脚本文件、iframe 内容等都已经下载并解析完毕时，`load` 事件才会被触发。

例如：

- 初始化第三方脚本或库。
- 执行依赖于图片尺寸的布局调整。
- 统计页面加载时间。
- 启动视频播放或动画。

### 执行上下文

**变量对象**：存储变量和函数声明。

**作用域链**：用于变量查找的链结构。

**`this` 值**：指向当前执行上下文的对象。

### **执行上下文生命周期**

1）创建阶段
生成变量对象、建立作用域链、确定this的指向

2）执行阶段
变量赋值、函数的引用、执行其他代码

### **变量对象**

> 与执行上下文相关的数据作用域，  存储了上下文中定义的变量和函数声明，

### 执行栈

是一种`先进后出`的数据结构，用来存储代码运行的所有执行上下文

1）当 JS 引擎第一次遇到js脚本时，会创建一个全局的执行上下文并且压入当前执行栈

2）每当JS 引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部

3）当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文

4）一旦所有代码执行完毕，JS 引擎从当前栈中移除全局执行上下文

### 全局、函数、Eval执行上下文

执行上下文分为`全局、函数、Eval执行上下文`

1）全局执行上下文（浏览器环境下，为全局的 `window` 对象）

2）函数执行上下文，每当一个函数被调用时, 都会为该函数创建一个新的上下文

3）Eval 函数执行上下文，如eval("1 + 2")

对于每个执行上下文，都有三个重要属性：`变量对象、作用域链(Scope chain)、this`

### **执行上下文的特点：**

1）单线程，只在主线程上运行；

2）同步执行，从上向下按顺序执行；

3）全局上下文只有一个，也就是`window`对象；

4）函数每调用一次就会产生一个新的执行上下文环境。

### 作用域

> 可访问变量的集合

**用处**:`隔离变量`，不同作用域下同名变量不会有冲突

### 作用域类型

全局作用域、函数作用域、块级作用域

### 作用域链

当查找变量的时候，首先会先从当前上下文的变量对象（作用域）中查找，如果没有找到，就会从父级的执行上下文的变量对象中查找，如果还没有找到，一直找到全局上下文的变量对象，也就是全局对象

### 原型

> 给其它对象提供共享属性的对象，函数的实例可以共享原型上的属性和方法

- 对象的proto属性，       指向自己的原型对象
- 构造函数的prototype属性，指向实例对象的原型对象
- 原型对象的constructor。 指向构造函数

### 原型链

在访问一个对象上属性的时候，如果该对象内部不存在这个属性，那么就会去它`__proto__`属性所指向的对象（原型对象）上查找。如果原型对象依旧不存在这个属性，那么就会去其原型的`__proto__`属性所指向的原型对象上去查找。以此类推，直到找到`nul

### **原型链和作用域的区别**

>  原型链是查找对象上的属性，作用域链是查找当前上下文中的变量

### 原型继承是如何工作的？

从另⼀个对象继承属性。每个对象都有⼀个原型对象，它从中继承⽅法和属性。

原型继承的核⼼是 `prototype` 属性。

例如，你可以为JavaScript的 Array 对象添加新的⽅法：

`Array.prototype.myCustomFeature = function() {*// implementation };`

### 怎么判断是自己的方法和变量，还是原型上的

- **`hasOwnProperty`**：判断属性是否是对象自身的（不包括原型链上的）。

- **`in`**：判断属性是否存在于对象本身或原型链中。

- **`Object.keys()`**：获取对象自身的所有可枚举属性。

- **`Object.getPrototypeOf()`** + `hasOwnProperty`：检查属性是否在某个特定原型上。

```js
const obj = {
  name: 'John'
};

const prototype = Object.getPrototypeOf(obj);
console.log(prototype.hasOwnProperty('name')); // false，name是在obj本身定义的，不在原型上

```



### __proto__和prototype啥区别

**`prototype`**：

- 它是构造函数的一个属性。
- 可以定义在函数上共享的属性和方法。

**`__proto__`**：

- 内部属性。指向构造函数的原型对象。
- 对象和构造函数原型之间的链接，
- 可以访问原型上的属性和方法。

### __proto__、prototype、constructor属性介绍

1）js中对象分为两种，普通对象和函数对象

2）`__proto__`和`constructor`是对象独有的。`prototype`属性是函数独有的，它的作用是包含可以给特定类型的所有实例提供共享的属性和方法；但是在 JS 中，函数也是对象，所以函数也拥有`__proto__`和 `constructor`属性

3）`constructor`属性是对象所独有的，它是一个对象指向一个函数，这个函数就是该对象的构造函数
`构造函数.prototype.constructor === 该构造函数本身`

4）一个对象的`__proto__`指向其构造函数的`prototype`
`函数创建的对象.__proto__ === 该函数.prototype`

5）特殊的`Object`、`Function`

### 那种方式能改变作用域链

1. **使用 `var` 声明变量**:
   - 使用 `var` 声明的变量会被提升到其所在函数作用域的顶部。
2. **使用 `function` 声明函数**:
   - 使用 `function` 声明的函数会被提升到其所在函数作用域的顶部。
3. **使用 `let` 和 `const` 声明变量**:
   - `let` 和 `const` 声明的变量不会被提升,它们的作用域是块级作用域。
4. **使用箭头函数**:
   - 箭头函数不会创建新的作用域,它们会继承外层作用域的 `this` 值。
   - 这可能会影响 `this` 的行为,从而影响作用域链的查找。
5. **使用 `eval()` 函数**:
   - `eval()` 函数可以执行任意 JavaScript 代码,并创建新的作用域。
   - 这会改变作用域链的结构,因为 `eval()` 创建的作用域会被插入到现有的作用域链中。
6. **使用 `with` 语句**:
   - `with` 语句可以将一个对象添加到作用域链中。
   - 这会改变作用域链的结构,因为 `with` 块中的变量查找会先在该对象上进行

### 闭包

> 内部函数可以访问外部函数的局部变量 不合理的使用闭包，会造成内存泄露，写法 函数里面return函数

作用：

可以让局部变量的值始终保持在内存中；对内部变量进行保护，使外部访问不到

应用：创建私有变量，延长变量的生命周期，防抖、截流、柯里化

### 防抖和节流的用途

- **防抖**：适用于连续事件，如输入，请求点击等，需要在用户停止操作一段时间后才执行的场景。
- **节流**：适用于高频事件，如动画、拖拽、滚动等，需要在一定时间内执行一次的场景。

### 柯里化函数的应用常见有哪些

```js 
//1.参数复用 2.延迟执行
function add(a, b) {
  return a + b;
}
const addCurried = a => b => a + b;
const addFive = addCurried(5);
console.log(addFive(10)); // 输出 15

//3.提高函数的通用性
function log(date, importance, message) {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
const logCurried = date => importance => message => log(date, importance, message);
const logToday = logCurried(new Date());
const logImportant = logToday('Important');
logImportant('This is an important message');
//4 高阶函数
function map(arr, fn) {
  return arr.reduce((acc, val) => [...acc, fn(val)], []);
}
const mapCurried = fn => arr => map(arr, fn);
const double = x => x * 2;
const doubledNumbers = mapCurried(double)([1, 2, 3, 4]);
console.log(doubledNumbers); // 输出 [2, 4, 6, 8]
//5 函数组合
function compose(f, g) {
  return x => f(g(x));
}
const composeCurried = f => g => x => f(g(x));
const addOne = x => x + 1;
const double = x => x * 2;
const addOneThenDouble = composeCurried(double)(addOne);
console.log(addOneThenDouble(5)); // 输出 12
```

### 如何通过柯里化函数统计函数的执行次数

```js
let count = 0; // 初始化计数器
function countCalls(fn) {
  // 创建一个柯里化函数，它会返回一个包装函数
  return function() {
    count++; // 每次调用包装函数时，计数器加一
    return fn.apply(this, arguments); // 调用原始函数并返回结果
  };
}
// 示例函数
function add(a, b) {
  return a + b;
}
// 使用 countCalls 创建一个计数器包装函数
const countAdd = countCalls(add);

// 调用包装函数
console.log(countAdd(1, 2)); // 输出 3
console.log(countAdd(3, 4)); // 输出 7

// 打印函数执行次数
console.log(`Function has been called ${count} times.`); // 输出 Function has been called 2 times.
```

### **最新的es属性了解吗**：

- 如可选链操作符（`?.`）、空值合并操作符（`??`）、BigInt 等。

### 类型转换机制

分为：

强制转换:

- Number undefined NaN, null和false 0, true变1，symbol报错，String，Object先toPrimitive然后toNumber
- parseInt 逐个字符转换
- String undefined false true number变成字符串，symbol报错，Object先toPrimitive然后toNumber
- Boolean null undefind 0 NaN 空字符串 转为 false

自动转换

- == != < if while
- , +  - * / %

### **内存溢出（Out Of Memory，OOM）**

> 在申请内存时，没有足够的内存空间可供分配

- 处理非常大的数据结构或大量数据，例如创建一个极其庞大的数组或对象。
- 无限递归

### 内存泄漏

> 一个程序不断创建新的对象但从不释放它们

- **意外的全局变量**：未使用 `var`、`let` 或 `const` 声明的变量会成为全局变量，这些变量可能不会被正确释放。
- **未清理的事件监听**：添加了事件监听后，在不再需要时没有移除，导致相关对象无法被释放。
- **定时器未清理**：设置了定时器但在合适的时候没有清除。
- **闭包使用不当**：闭包中引用的变量可能导致其相关的对象无法正常释放。
- **缓存未及时清理**：一些应用可能会缓存数据，但如果不及时清理旧的缓存数据，也可能导致内存泄漏。

检测手段： 谷歌 performance,点击collect garbage进行录制，

- 泄漏：上升
- 不泄漏：锯齿状

### a标签默认事件禁掉之后做什么才能实现跳转

event.preventDefault()//禁掉a标签的默认行为

window.location.href //实现跳转

### js内存机制

本质是Js 引擎如何管理内存的分配和释放。JS 是一种动态类型语言，它的内存管理是自动的，这意味着开发者不需要手动分配和释放内存。

垃圾回收器会定期扫描内存中的对象，并标记那些不再被引用的对象。这些会被垃圾回收器回收，释放它们占用的内存。



注意事项：

- 对象的创建和销毁会消耗一定的内存，尽量避免创建不必要的对象。
- 及时释放不再使用的对象，将其设置为`null`，以便垃圾回收器可以回收。
- 避免循环引用，垃圾回收器无法回收这些对象，会导致内存泄漏
- 选择和合适的算法和数据结构

### v8引擎的垃圾回收算法

1. **标记阶段**：从根对象开始，遍历所有可达对象，并标记为活动对象。
2. **清除阶段**：之后会遍历堆内存，清除所有未被标记的对象。
3. **整理阶段**：为了减少内存碎片，V8 引擎会进行内存整理，将活动对象移动到连续的内存区域，更好地利用空间。
4. **并发阶段**：在回收阶段，利CPU的优势，将标记和清除阶段并行执行，以提高垃圾回收的效率。



V8 引擎还采用了一些优化策略来提高垃圾回收的性能和效率，例如：

1. **分代回收**：将堆内存分为新生代和老生代两个区域，采用不同的垃圾回收算法。
   1. 新生代中的对象通常生命周期较短，采用复制算法进行回收；
   2. 老生代中的对象通常生命周期较长，采用标记-清除或标记-整理算法进行回收。

2. **增量回收**：将垃圾回收过程分成多个小步骤，在应用程序执行的间隙逐步完成，以减少垃圾回收对应用程序性能的影响。
3. **空闲时间垃圾回收**：在应用程序空闲时，主动触发垃圾回收，以避免垃圾积累过多。

### V8 ⾥⾯的 JIT 是什么？

在不牺牲启动速度的情况下，提供接近于或同等于编译语⾔的运⾏速度

- V8 通过解释器（如 Ignition）来执⾏ JavaScript 代码。这个过程中，代码不会编译成机器语⾔，⽽是逐⾏解释执⾏。

- 当代码被多次执⾏时，V8 会认为这部分代码是“热点代码”（Hot Spot）

- 此时 JIT 编译器（如 TurboFan）会介⼊，将这部分热点代码编译成机器语⾔。机器语⾔运⾏在 CPU 上⽐解释执⾏要快得多。

### 浏览器垃圾回收分类

垃圾收集器定期找出不再继续使用的变量，然后释放内存。

1. 标记清楚：进入环境打一个进入环境标记，变量离开时打一个离开环境的标记，打上后者标记的变量将会被清除
2. 引用计数：跟踪记录每个值被引用的次数，会释放引用次数为0的变量，会导致循环引用的问题

### 长列表渲染原理

- 无限滚动。当用户滚动到列表底部时，自动加载更多数据。
- **虚拟滚动**：只渲染当前视口内可见元素的技术，当用户滚动时，动态更新渲染的元素。
- **分页**： 将长列表分割成多个页面，用户可以翻页查看

### 属性

1. **原始数据类型 (Primitive Data Types)**: 6种
   - `Number`: 表示数字,包括整数和浮点数。
   - `String`: 表示文本字符串。
   - `Boolean`: 表示逻辑值,只有 `true` 和 `false` 两个值。
   - `Undefined`: 表示一个未定义的值。
   - `Null`: 表示一个空值。
   - `Symbol`: 表示唯一且不可变的标识符。
2. **引用数据类型 (Reference Data Types)**: 6
   - `Object`: 表示一组键值对的集合,包括普通对象、数组、函数等。
   - `Array`: 表示有序的值的集合。
   - `Function`: 表示可执行的代码块。
   - `Date`: 表示日期和时间。
   - `RegExp`: 表示正则表达式。
   - `Error`: 表示错误信息。

### js遍历方式

1. **for 循环**:

   - 使用 `for` 循环遍历数组或对象的属性。

     ```js
     // 遍历数组
     for (let i = 0; i < arr.length; i++) {
       console.log(arr[i]);
     }
     // 遍历对象
     for (let key in obj) {
       console.log(key, obj[key]);
     }
     ```

2. **forEach()**:

   - 使用数组的 `forEach()` 方法遍历数组元素。

     ```js
     arr.forEach(function(item) {
       console.log(item);
     });
     ```

3. **for...of 循环**:

   - 使用 `for...of` 循环遍历可迭代对象,如数组、字符串等。

     ```js
     for (let item of arr) {
       console.log(item);
     }
     ```

4. **for...in 循环**:

   - 使用 `for...in` 循环遍历对象的属性

     ```js
     for (let key in obj) {
       console.log(key, obj[key]);
     }
     ```

5. **map()**:

   - 使用数组的 `map()` 方法遍历数组元素并转换为新数组。



     ```js
     const newArr = arr.map(function(item) {
       return item * 2
     });
     ```

6. **filter()**:

   - 使用数组的 `filter()` 方法遍历数组元素并过滤出符合条件的元素。

     ```js
     const filteredArr = arr.filter(function(item) {
       return item > 5;
     });
     ```

7. **reduce()**:

   - 使用数组的 `reduce()` 方法遍历数组元素并将其归纳为单个值。

     ```js
     const sum = arr.reduce(function(accumulator, currentValue) {
       return accumulator + currentValue;
     }, 0);
     ```

8. **every() 和 some()**:

   - 使用数组的 `every()` 方法检查数组中是否所有元素都满足条件。

   - 使用数组的 `some()` 方法检查数组中是否有任意元素满足条件。

     ```js
     const allPositive = arr.every(function(item) {
       return item > 0;
     });
     
     const hasNegative = arr.some(function(item) {
       return item < 0;
     });
     ```

### Axios 拦截，怎么统计请求时长

可以使用 Axios 的请求和响应拦截器来统计请求时长：

```js
axios.interceptors.request.use(config => {
  config.startTime = Date.now();
  return config;
});

axios.interceptors.response.use(response => {
  const duration = Date.now() - response.config.startTime;
  console.log(`请求时长: ${duration}ms`);
  return response;
});
```

### axios和fetch，ajax区别

1. **AJAX (Asynchronous JavaScript and XML)**:

   - 异步技术,允许网页在不重新加载的情况下与服务器交换数据。
   - 使用 XMLHttpRequest 对象来发送和接收 HTTP 请求和响应。
   - 是概念,而不是一个具体的技术或库。

2. **Fetch API**:

   - JavaScript 内置的一个用于发送 HTTP 请求和响应处理的 API。

   - 返回一个 Promise,使用 `.then()` 链式调用来处理响应。

3. **Axios**:

   - 基于 Promise 的 HTTP 客户端,可以运行在浏览器和 Node.js 环境中。
   - 包含AJAX 的高级特性,如拦截请求和响应、转换请求和响应数据等。
   - 返回一个 Promise,可以使用 `.then()` 和 `.catch()` 处理响应。

主要区别:

1. **API 设计**:
   - Fetch 使用浏览器内置的 API,提供了更加简洁的 Promise 风格 API。
   - Axios 是第三方库,提供了更加丰富的 API 特性。
2. **兼容性**:
   - Fetch 是较新的 API,在较旧的浏览器上可能需要 polyfill。
   - Axios 有较好的浏览器兼容性,可以在更广泛的环境中使用。
3. **功能特性**:
   - Fetch 功能较为基础,需要自行处理一些细节,如处理错误、发送 Cookie 等。
   - Axios 提供了更多的功能,如拦截器、取消请求、自动转换 JSON 数据等。

### clientHeight，innerHeight，scrollTop，viewportHeight

- `clientHeight`：表示元素的可见高度
- `innerHeight`：表示浏览器窗口的内部高度。
- `scrollTop`：表示元素滚动条的垂直偏移量，即元素向上滚动的距离。
- `viewportHeight`：表示浏览器窗口的可视区域高度

### 如何判断元素是否在可视区域

**getBoundingClientRect()**

- 该方法返回元素相对于视窗的位置信息,包括 top、right、bottom、left 等属性。
- 可以通过比较这些属性值与视窗大小来判断元素是否在可视区域内。

```js
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&  //documentElement根结点
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
```

**IntersectionObserver API**

- 该 API 可以观察元素是否进入或退出可视区域。
- 可以通过设置阈值来判断元素进入或退出的程度。

```js
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('Element is in the viewport');
      } else {
        console.log('Element is not in the viewport');
      }
    });
  },
  { threshold: 0.5 } // 当元素至少 50% 可见时触发回调
);

observer.observe(document.querySelector('#myElement'));
```

**scrollTop 和 clientHeight**

- 可以通过获取页面滚动位置和元素高度来判断元素是否在可视区域内。

```js
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  const elementTop = rect.top + scrollTop;
  const elementBottom = elementTop + el.offsetHeight;

  return (
    elementTop >= scrollTop &&
    elementBottom <= scrollTop + viewportHeight
  );
}
```

### 获取⻚⾯元素位置与宽⾼？

**获取元素相对于页面的位置（包括偏移量）**：

getBoundingClientRect方法返回一个矩形对象，包含了元素的位置和尺寸信息。这个方法可以用来获取元素相对于视口的位置，即元素的顶部、左侧、底部和右侧距离视口顶部和左侧的距离。

```js
const element = document.getElementById('myElement');
const rect = element.getBoundingClientRect();

// x 坐标
const x = rect.left;
// y 坐标
const y = rect.top;
```

**获取元素自身的宽高**：

```js
const width = element.offsetWidth;
const height = element.offsetHeight;
```

### 对象合并

使用对象解构和对象扩展运算符来合并对象

### performance.now 和 date.now

date.now返回自 1970 年 1 月 1 日（UTC 时间）以来经过的毫秒数

performance.now 页面加载以来经过的毫秒数

### e.target和e.current有啥区别

- `e.target` 是事件的实际来源,而 `e.currentTarget` 是当前正在处理事件的元素。
- 在事件委托和事件冒泡/捕获过程中,这两个属性的值会有所不同,开发者需要根据具体需求选择使用合适的属性

```js
<div id="outerDiv">
    <button id="innerButton">点击我</button>
  </div>
document.getElementById('outerDiv').addEventListener('click', function (e) {
      console.log('e.target:', e.target);  // button
      console.log('e.currentTarget:', e.currentTarget);  // div
    });
```

### for in 和for of 有什么区别

1. **遍历顺序**:
   - `for...in` 顺序是不确定的,因为它遍历的是对象的属性名称(键),而对象的属性无序。
   - `for...of` 顺序是确定的,按照数据结构中元素的顺序进行遍历。
2. **遍历内容**:
   - `for...in` 遍历对象的属性 包括原型链上的属性
   - `for...of` 遍历数组或任何实现了 `Symbol.iterator` 接口的数据结构，遍历的是数据结构中的值(value)，无法直接遍历对象的属性需要使用 `Object.keys()/values()/entries()`。
3. **性能**:
   - 一般来说,`for...of` 的性能要优于 `for...in`,因为 `for...in` 需要进行原型链检查。

### 解释一下为什么map和forEach不能中断

目的是对数组中的每个元素进行处理，并执行提供的回调函数，而不管是否满足某些条件

### typeof Class的结果是啥

function,`class` 关键字引入了新的语法，但JavaScript的类仍然是基于函数的

### CommonJS 和 ES Module 区别

1. **语法**
   - CommonJS 模块是动态加载的，使用 `require()` 导入模块，运行时才会被执行，`module.exports` 导出模块 支持导出单个值或对象。
   - ES Module 静态分析，使用 `import`（编译时就会被处理） 和 `export` 导出 支持导出命名导出和默认导出。
2. **环境支持**
   - CommonJS 最初被设计用于服务器端 Node.js 环境。
   - ES Module 最初被设计用于浏览器环境
3. 引用，require是值的拷贝 import是值的引用。
4. **解决循环依赖**：
   - ES Module 采用静态分析的方式,在编译时就确定了依赖关系。出现循环依赖时会先加载没有被引用的模块,然后再加载引用了该模块的模块。
   - 在 CommonJS 中,加载时会缓存已经加载的模块。出现循环依赖时, 会返回已经加载的模块的 `exports` 对象,

### esmodule在客户端js脚本能不能使用

从ES6开始，浏览器已经支持了 ES 模块系统。可以直接使用 `import` 和 `export` 来导入和导出模块

- 需要设置一下`<script type="module">`

### esmodule import 与export的原理

1. 当一个模块被导入时，JS 引擎会根据导入路径解析模块的位置。
2. 异步加载模块。加载完成后，模块会被执行，并且其导出的值会被缓存起来。即使模块被多次导入，也只会被加载一次。
3. 每个模块都有自己的作用域，不会影响其他模块。

### Type和interface区别

1. **语法定义**:
   - `type` 使用 `type SomeType = { ... }` 的语法定义类型别名。
   - `interface` 使用 `interface SomeInterface { ... }` 的语法定义接口。
2. **扩展方式**:
   - `type` 通过 `&` 操作符来实现类型的交叉合并。
   - `interface` 可以使用 `extends` 关键字来继承和扩展其他接口。
3. **重复定义**:
   - `type` 不允许重复定义相同名称的类型别名,会报错。
   - `interface` 允许重复定义同名的接口,会自动合并属性。
4. **使用场景**:
   - `type`      更适合定义复杂的联合类型、交叉类型等。
   - `interface` 更适合定义对象结构。

### map和对象的区别

Map：

1.	键可以是任意类型（包括对象、函数等)。

2.	可以方便地获取键值对的数量。

3.	有一些特定的方法来进行操作，如 set()、get()、has() 等。

对象：

1.	键通常是字符串（虽然在 ES6 之后也可以使用符号等作为键）。

2.	对于键的类型限制相对较窄。

3.	直接使用属性访问操作符来获取和设置值。

### 事件捕获

事件从DOM树的根节点开始，向下传递到⽬标元素的过程中触发。

### 事件冒泡机制

事件从⽬标元素向上冒泡到DOM树的根节点的过程中触发。



在实际应⽤中，你可以选择在哪个阶段监听事件：

```js
element.addEventListener('click', function(event) {
console.log('Clicked!');
}, false); *//* *使⽤**false**作为第三个参数，表⽰在冒泡阶段触发*

如果将第三个参数设置为 true ，则监听器将在捕获阶段触发。
```

### 事件总线

采用发布订阅模式，用于在应用程序的不同部分之间进行通信。

### 事件总线的工作原理

1. **发布事件**：发布者创建一个事件，并通过事件总线发布它
2. **订阅事件**：可以订阅特定类型的事件。当事件总线接收到一个事件时，它会通知所有订阅了该事件类型的组件。
3. **事件处理**：订阅者接收到事件后，可以执行相应的处理逻辑。

### 如果一个父元素同时有一个设置了捕获的事件和普通的事件，子元素有一个普通的事件，事件触发顺序是怎么样

1. 捕获阶段：从根节点开始，向下遍历 DOM 树，直到找到目标元素。在这个过程中，会触发父元素上设置的捕获阶段的事件。
2. 目标阶段：当到达目标元素时，会触发目标元素上设置的普通事件。
3. 冒泡阶段：如果目标元素上的事件没有被阻止冒泡，浏览器会继续向上冒泡，触发父元素上设置的普通事件。

### 什么是事件委托？原理是什么？

利用事件冒泡的特性，优化事件监听和处理,将事件监听器绑定到父元素上。

优点：

●减少事件处理器的数量：通过将事件监听器绑定到父元素，而不是每个子元素上，可以减少事件处理器的数量，从而减少内存消耗和性能开销。

●动态添加和移除元素的支持：当在页面上动态添加或移除元素时，通过事件委托可以自动处理新添加的元素或移除的元素，而无需手动重新绑定事件监听器。

●简化代码逻辑：通过委托事件处理给父元素，可以将事件处理逻辑集中在一个地方

### requestAnimationFrame的理解

h5专门用于请求动画的api requestAnimationFrame

> 处于未激活的状态下 刷新任务被暂停 停止渲染。激活时从暂停的位置开始渲染

1. `requestAnimationFrame` 会在浏览器进行下一次重绘(通常是每秒 60 次)之前执行回调函数
2. 与浏览器的刷新频率同步:。
3. 自动节流:
   - `requestAnimationFrame` 会自动对回调函数进行节流处理，即使你在短时间内多次调用 `requestAnimationFrame`,浏览器也只会在下一次重绘之前执行一次回调函数。
4. 支持取消:
   - 通过调用 `cancelAnimationFrame(requestId)` 可以取消一个之前注册的 `requestAnimationFrame` 回调

### 深拷贝和浅拷贝有什么区别？

浅拷贝：

- 复制对象的引用而不是创建新的独立对象。
- 原始对象和新对象共享相同的嵌套对象。
- 对嵌套对象的修改会影响到原始对象和新对象。
- Object.assign()  e sin

深拷贝：

- 创建新的独立对象，包括嵌套对象。
- 原始对象和新对象之间彼此独立，修改一个对象不会影响另一个对象。

实现方式：

- _.cloneDeep() loads 深拷贝函数
- JSON.parse() JSON.stringify() 不能复制函数、undefined、和循环引⽤
- 手写循环递归
- 浏览器原生支持的 `structuredClone()` 方法使用结构化克隆算法进行深拷贝。

### **事件循环解决什么问题？**

- **单线程阻塞问题**：JavaScript 是单线程的，事件循环通过异步任务调度避免了长时间运行的任务阻塞主线程。
- **任务优先级**：通过微任务和宏任务的划分，确保高优先级的任务（如 Promise）能够及时执行。
- **任务调度**：合理地安排同步任务、微任务和宏任务的执行顺序，保证代码的执行效率和正确性。


### 事件轮询机制 Event Loop

⼯作原理：

1. 调⽤栈：同步任务在这⾥执⾏，当栈为空时，Event Loop开始⼯作。

2. 消息队列：异步任务如事件响应、定时器等完成后，回调函数会进⼊消息队列等待执⾏。



宏任务（setTimeout、setInterval、I/O 操作、UI rendering）

微任务（Promise.then 回调、MutationObserver（监听dom节点更新完毕)



首先,JavaScript 引擎会执行所有同步代码,并将异步任务(宏任务和微任务)加入到各自的队列中。

当同步代码执行完毕,调用栈为空时,事件循环开始工作:

1. 先检查并执行所有的微任务队列中的任务。
2. 然后从宏任务队列中取出一个任务执行。
3. 再次检查并执行所有的微任务队列中的任务。
4. 重复上述步骤,直到所有任务都被处理完毕。

### event loop 与 浏览器更新渲染时机

1）浏览器更新渲染会在event loop中的完成后进行，

2）宏任务队列中，如果有大量任务等待执行时，将`dom的变动作为微任务，能更快的将变化呈现给用户`，这样就可以在这一次的事件轮询中更新dom

### node 和浏览器的事件循环机制区别

- **任务类型**：浏览器和 Node.js 都有宏任务和微任务的概念，但它们处理的任务类型和顺序有所不同。例如，Node.js 的 `process.nextTick` 是微任务，而浏览器中没有直接对应的机制。
- **I/O 操作**：Node.js 的事件循环特别优化了对 I/O 操作的处理，这使得它非常适合于服务器端应用。而浏览器的事件循环则更侧重于处理用户界面和 DOM 事件。
- **执行环境**：浏览器的事件循环运行在用户的浏览器环境中，而 Node.js 的事件循环运行在服务器端的 Node.js 运行环境中。

### 什么是PWA

类似原生应用体验的网页应用。

特点：

- 使用Service Worker技术来缓存应用的资源实现离线访问
- 利用缓存技术和预加载策略，可以快速加载应用的内容，
- 响应式设计
- 具有类似原生应用的交互和导航体验。

### 异步编程有哪些实现方式？

1. 回调函数（Callbacks）：
   - 优点：简单易懂，是异步编程的基础。
   - 缺点：回调地狱，可读性差，难以维护。
2. Promise：
   - 优点：解决了回调地狱问题，提供了更清晰的异步编程模型。
   - 缺点：无法取消已发起的异步操作，错误处理不够灵活。
3. Generator 函数：
   - 优点：可以暂停和恢复执行，实现更复杂的异步流程控制。
   - 缺点：需要使用特定的语法和工具支持，使用起来相对复杂。
4. Async/Await：
   - 优点：基于 Promise，提供了更简洁和直观的异步编程语法。
   - 缺点：需要在支持 Async/Await 的环境中运行。

### **Ajax 的 callback 和 fetch 的 `.then` 哪个更早？**

- **Ajax 的 callback** 是基于传统的回调函数机制，属于宏任务（macrotask）。
- **fetch 的 `.then`** 是基于 Promise 的机制，属于微任务（microtask）。
- **执行顺序**：在事件循环中，微任务（如 `.then`）会比宏任务（如 Ajax 的回调）更早执行。因此，**fetch 的 `.then` 会比 Ajax 的 callback 更早执行**。

---

### **Promise.then 的调度解析**

- **Promise.then** 是微任务（microtask），它会在当前同步代码执行完毕后立即执行，且在宏任务（如 setTimeout、setInterval）之前执行。
- **调度机制**：
   - 当 Promise 状态变为 resolved 或 rejected 时，`.then` 或 `.catch` 中的回调会被推入微任务队列。
   - 在当前调用栈清空后，事件循环会优先处理微任务队列中的任务，然后再处理宏任务队列。

### 你是怎么理解promise的？

异步编程解决方案 可以获取异步操作信息 避免回调地狱

状态：

1、Pending 进行中

2、Resolved 已完成

3、Rejectd已拒绝

特点：

- 对象状态不受外界影响
- 只有异步操作的结果 可以决定当前哪一种状态

注意：

​	构造promise的时候 ，构造函数内部的代码立即执行

**静态方法：**

all: 返回所有的结果

race: 返回第一个执行结果

Series：依次执行这些 Promise 任务

```js
Promise.series = (promises) => {
  return promises.reduce((promise, nextPromise) => {
    return promise.then(nextPromise)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }, Promise.resolve());
};
```

**resolve**：返回回一个 `fulfilled` 的 Promise 对象

```js
Promise.resolve = function(x) {
    // 如果传入的 x 本身就是一个 Promise 对象,则直接返回 x
    if (x instanceof Promise) {
        return x;
    }
    return new Promise(function(resolve, reject) {
        // 如果 x 是 thenable 对象(即带有 then 方法),则调用它的 then 方法
        if (typeof x === 'object' && x !== null || typeof x === 'function') {
            try {
                var then = x.then;
                if (typeof then === 'function') {
                    then.call(x, resolve, reject);
                    return;
                }
            } catch (e) {
                reject(e);
            }
        }
        resolve(x);
    });
};
```

Reject: 返回一个`rejected` 的 Promise 对象

**allSettled**: 接受一个 Promise 对象的数组或可迭代对象,返回一个新的 Promise 对象,其值是一个对象数组,`{status,value}`

### Promise缺点

1. **无法取消**
   - 一旦创建了 Promise 对象,它就会一直执行下去,无法取消。这可能会导致资源浪费的问题。
2. **错误处理麻烦**
   - Promise 的错误处理需要通过 `.catch()` 方法,如果忘记添加 `.catch()` 处理程序,错误就会被吞噬,不易发现。
3. **嵌套地狱问题**
   - 当需要处理多个异步操作时,如果使用 Promise 的 `.then()` 链式调用,很容易陷入"回调地狱"般的代码结构,不利于代码的可读性和维护性。
4. **无法知道当前 Promise 状态**
   - Promise 只能通过 `.then()` 和 `.catch()` 方法来访问成功或失败的结果,无法直接获知当前 Promise 的状态。
5. **无法共享结果**
   - 每个 Promise 实例都是独立的,无法共享状态或结果。
6. **组合无法满足所有场景下的需求**
   - `Promise.all()` 和 `Promise.race()` 等组合方法。
7. **不适合异步流程控制**
   - Promise 虽然可以解决简单的异步问题,但对于复杂的异步流程控制,比如条件判断、循环等,它的表现并不出色。

### Promise值穿透是什么？

> 当 Promise 链中某个 Promise 实例没有返回值或返回值为 `undefined` 时,该值会自动"穿透"到下一个 `.then()` 的入参中。

```js
// 示例 1
Promise.resolve(1)
  .then(value => {
    console.log(value); // 输出 1
    // 此处没有返回值
  })
  .then(value => {
    console.log(value); // 输出 undefined
  });

// 示例 2  
Promise.resolve(1)
  .then(value => {
    console.log(value); // 输出 1
    return; // 返回 undefined
  })
  .then(value => {
    console.log(value); // 输出 undefined
  });

// 示例 3
Promise.resolve(1)
  .then(value => {
    console.log(value); // 输出 1
    return undefined;
  })
  .then(value => {
    console.log(value); // 输出 undefined
  });
```

从上面的示例可以看出:

1. 当 `.then()` 回调函数没有返回任何值时,它会默认返回 `undefined`。
2. 当 `.then()` 回调函数显式地返回 `undefined` 时,也会产生类似的结果。



为了避免这种情况,可以采取以下措施:

1. 在 `.then()` 回调函数中始终显式地返回一个值,即使是 `undefined`。
2. 使用 `async/await` 语法糖,它可以更好地控制返回值的行为。
3. 使用 `Promise.resolve()` 手动创建一个新的 Promise 实例,并返回它。

### Promise 解决异步编程的几种常见方式:

1. **链式调用 (Chaining)**:
   - 使用 `.then()` 方法可以将多个异步操作串联起来,形成链式调用。这样可以避免回调地狱的问题。
2. **错误处理**:
   - 使用 `.catch()` 方法可以捕获 Promise 链中任何一个步骤发生的错误,集中处理错误。
3. **并行执行**:
   - 使用 `Promise.all()` 方法可以并行执行多个 Promise,当所有 Promise 都 resolved 时,才会执行后续操作。
   - 使用 `Promise.race()` 方法可以并行执行多个 Promise,当其中任何一个 Promise 先 resolved 时,就会执行后续操作。
4. **异步等待 (Async/Await)**:
   - 使用 `async` 函数和 `await` 关键字可以简化 Promise 的使用,使异步代码看起来更像同步代码。
6. **Promise 组合**:
   - 可以使用 `Promise.all()`, `Promise.race()`, `Promise.allSettled()` 等方法组合多个 Promise,实现更复杂的异步流程控制。
7. **Promise 转换**:
   - 可以使用 `Promise.resolve()` 和 `Promise.reject()` 将值转换为 Promise 对象。
   - 可以使用 `Promise.from()` 将其他异步操作转换为 Promise 对象。

### async await怎么实现

> **用同步方式，执行异步操作**

1）`async`函数是`generator`（迭代函数）的语法糖

2）async ⽤于声明⼀个函数是异步的。它会使函数返回⼀个Promise。

3）`await`关键字只能放在async函数内部，await关键字的作用 就是获取Promise中返回的resolve或者reject的值

4）`async、await`要结合`try/catch`使用，防止意外的错误

### async await和promise什么区别

1. **语法糖**:
   - `async/await` 建立在 Promise 之上,用于更简洁地表达异步操作。
   - `Promise`异步编程解决方案。
2. **错误处理**:
   - 在 `async/await` 中,您可以使用标准的 `try/catch` 块来处理异步操作中的错误。
   - 在使用 Promise 时,您需要使用 `.catch()` 方法来处理错误。
3. **链式调用**:
   - `async/await` 使得异步代码更加线性和同步化,更加易于阅读和理解。
   - `Promise` 链式调用可能会导致"回调地狱"的问题。

### 解析js会阻碍渲染流程吗为什么

在解析时遇到`<script>`标签时，它会暂停解析 HTML 文档，并开始下载和执行 JavaScript 代码。

在解析 HTML 文档的过程中同时执行 JavaScript 代码，可能会导致浏览器在渲染页面时出现不一致或错误的情况。

### js脚本延迟加载的方式有哪些？

延迟加载： 等页面加载完成后在加载js，有助于提高页面的加载速度

几种方式：

- `defer`：脚本在文档解析完成后执行，按顺序执行。
- `async`：脚本在下载完成后立即执行，不保证顺序。
- 动态创建dom标签方式： 对文档的加载事件进行监听，当文档完成后在动态的创建script标签来引入js脚本
- setTimeout 延迟加载：脚本

### **假如在defer后面又有了dom元素怎么办**：

- `defer` 脚本会在 DOM 解析完成后执行，因此后面的 DOM 元素会被正常处理。

### **JS 放在 head 里和放在 body 里有什么区别？**

在 `<head>` 里会在页面加载之前执行 JavaScript 代码，导致页面渲染延迟，

而放在 `<body>` 里会在页面加载后执行 减少这种影响。

### 预加载资

可以在link标签中使用rel='preload' href='指定文件'，加载字体、图片、css、js

### Web Worker

> 后台线程中执⾏脚本的⽅法，运⾏在与主线程脚本独⽴的线程中，这意味着它们不会⼲扰到主线程的执⾏，
>
> 适⽤于不需要与DOM交互的⻓时间运⾏或资源密集型任务，因为Workers⽆法访问DOM。



```js
if (window.Worker) {
	const myWorker = new Worker('worker.js');
 	myWorker.postMessage('Hello');
	myWorker.onmessage = function(e) {
  	console.log('Message received from worker: ', e.data);
  };
}

//在 worker.js 中，你可以处理数据并返回结果到主线程：

onmessage = function(e) {
 console.log('Message received from main script');
 const result = 'Worker result: ' + (e.data);
 postMessage(result);
}
```

应用：

- 离线体验：通过缓存关键资源来提供离线访问能⼒。

- 数据同步：在连接恢复时发送或同步数据。
- 推送通知：即使Web应⽤关闭，也能向⽤⼾发送通知。



当js有大量计算时，会造成`UI 阻塞`，出现界面卡顿、掉帧等情况，严重时会出现页面卡死的情况，俗称`假死`

### 计算时长超过多久适合用Web Worker

**计算的运算时长 - 通信时长 > 50ms，推荐使用Web Worker**

### npm yarn

- **npm**：Node.js 的包管理工具。
- **yarn**：Facebook 开发的包管理工具，支持并行下载。

### 简单说说对pnpm的理解

> 包管理器,它是 npm 和 yarn 的一种替代方案

- `硬链接`的方式来安装依赖包,避免了安装重复的包。
- 使用`内容寻址`的方式来管理包,避免产生冲突。
- 使用 `pnpm-lock.yaml` 文件来锁定依赖包的版本。

### 函数式编程

- 纯函数：无副作用，输入相同则输出相同。
- 高阶函数：接受函数作为参数或返回函数。
- 不可变数据：避免直接修改数据。
- 将多个函数组合成一个新函数。

**优点：**

- 更好的管理状态
- 更简单的复用。
- 更优雅的组合

**缺点：**

- 过渡包装，对垃圾回收所产生的压力超过其他方式
- 递归陷阱

### with

在于改变作用域；**with**语句将某个对象添加到作用域链的顶部

### CSR和SSR区别

- CSR：客户端渲染
- SSR: js文件比较大 加载起来比较慢 首屏白屏，如何解决？
   - SSR服务端渲染， 服务端直接生成html 返回给浏览器渲染首屏内容

服务端渲染页面交互能力有限 实现复杂交互 引入js文件 同构：

CSR SSR html代码是客户端添加的 还是服务端添加

### SSR和CSR渲染不一致咋办

- `同一个数据`,`渲染页面`。
- 在客户端渲染完成后，再次从服务器获取数据，进行比较，如果不一致，则更新客户端的数据。
- 服务器端渲染时，避免使用依赖于 DOM 的代码，服务器端`没有 DOM 环境`
- 服务器端渲染时，只渲染页面的`静态部分`，客户端使用 JS 动态注入剩余的动态内容。
- 在客户端渲染时，使用`水合（Hydration）`过程来将服务器端渲染的静态标记转换为可交互的客户端应用




### 文件渲染过程css文件和js文件的下载，是否会阻赛渲染？

Css文件的下载：

- 解析不会影响DOM解析
- 没下载和解析完成之前 后续的js脚本不能执行

js文件的下载：

- 会阻赛GUI渲染进程 会阻赛dom和csss解析和渲染

### Object.defineProperty

ES5 引入的一个方法，它允许精确地添加或修改对象的属性。

```javascript
Object.defineProperty(obj, prop, descriptor);
```

- `obj` 是要在其上定义属性的对象。
- `prop` 是要定义或修改的属性的名称。
- `descriptor` 是一个描述符对象，它描述了属性的特性。

`descriptor` 可以包含以下属性：

- `value`：属性的值。
- `writable`：如果为 `true`，属性的值可以被修改。
- `enumerable`：如果为 `true`，属性会被枚举。
- `configurable`：如果为 `true`，属性可以被删除，以及这些属性的特性（除了 `value` 和 `writable`）可以被修改。
- Get, set

使用 `Object.defineProperty` 的一个限制是它只能定义或修改对象的单个属性，不能一次性定义或修改多个属性。

`Object.defineProperty` 是一个非常强大的方法，它允许你精确地控制对象的属性。下面是一些使用 `Object.defineProperty` 的常见场景：

- 创建不可枚举的属性

```javascript
const person = {};

Object.defineProperty(person, 'name', {
  value: 'Alice',
  enumerable: false // 不可枚举
});

console.log(person); // { name: 'Alice' }
console.log(Object.keys(person)); // []
```

- 创建只读属性

```javascript
const person = {};

Object.defineProperty(person, 'name', {
  value: 'Alice',
  writable: false // 只读
});

person.name = 'Bob'; // 无效，不会改变属性值
console.log(person.name); // 'Alice'
```

- 创建不可配置的属性

```javascript
const person = {};

Object.defineProperty(person, 'name', {
  value: 'Alice',
  configurable: false // 不可配置
});

// 以下操作将失败
// Object.defineProperty(person, 'name', { enumerable: true });
// Object.defineProperty(person, 'name', { value: 'Bob' });
// delete person.name;
```

- 创建访问器属性

```javascript
const person = {
  _name: 'Alice'
};

Object.defineProperty(person, 'name', {
  get() {
    console.log('Getting name');
    return this._name;
  },
  set(value) {
    console.log('Setting name to', value);
    this._name = value;
  }
});

console.log(person.name); // 'Getting name' 'Alice'
person.name = 'Bob'; // 'Setting name to Bob'
console.log(person.name); // 'Getting name' 'Bob'
```

- 创建带有默认值的属性

```javascript
const person = {};

Object.defineProperty(person, 'name', {
  value: 'Alice',
  writable: true,
  configurable: true,
  enumerable: true
});

console.log(person.name); // 'Alice'
```

- 创建一个属性，当尝试访问不存在的属性时返回默认值

```javascript
const person = {};

Object.defineProperty(person, 'name', {
  get() {
    return 'Default Name';
  }
});

console.log(person.name); // 'Default Name'
```

- 创建一个属性，当尝试修改时抛出错误

```javascript
const person = {};

Object.defineProperty(person, 'name', {
  value: 'Alice',
  writable: false,
  configurable: false,
  enumerable: false,
  set() {
    throw new Error('Cannot change the name');
  }
});

person.name = 'Bob'; // 抛出错误
```

- 创建一个属性，当尝试删除时抛出错误

```javascript
const person = {};

Object.defineProperty(person, 'name', {
  value: 'Alice',
  configurable: false,
  enumerable: false,
  set() {
    throw new Error('Cannot delete the name');
  }
});

delete person.name; // 抛出错误
```

- 创建一个属性，当尝试枚举时返回空数组

```javascript
const person = {};

Object.defineProperty(person, 'name', {
  value: 'Alice',
  enumerable: false
});

console.log(Object.keys(person)); // []
```



### Proxy

`Proxy` 是 ES6 引入的一个对象，为对象创建一个代理，这个代理可以拦截并定义基本操作的自定义行为（如属性查找、赋值、枚举、函数调用等）。

```javascript
let proxy = new Proxy(target, handler);
```

- `target` 是要代理的目标对象。
- `handler` 是一个对象，它定义了代理的行为。

`handler` 对象可以包含许多陷阱（trap），每个陷阱对应一个基本操作。例如：

- `get`：拦截属性的读取。
- `set`：拦截属性的设置。
- `has`：拦截 `in` 操作符。
- `deleteProperty`：拦截 `delete` 操作符。
- `apply`：拦截函数调用。

使用 `Proxy` 的好处是它提供了一种更灵活的方式来控制对象的行为，可以拦截和修改对象的多个操作，而不仅仅是单个属性。

`Proxy` 是 ES6 引入的一个强大的特性，它允许你创建一个对象的代理，这个代理可以拦截并定义基本操作的自定义行为。这使得 `Proxy` 在很多场景下都非常有用，比如数据验证、日志记录、性能优化等。以下是一些使用 `Proxy` 的常见场景：

- 数据验证

```javascript
const validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 存储属性值
    obj[prop] = value;

    // 返回 true 表示成功
    return true;
  }
};

const person = new Proxy({}, validator);

person.age = 100; // 正常
person.age = 'young'; // TypeError: The age is not an integer
person.age = 300; // RangeError: The age seems invalid
```

- 日志记录

```javascript
const loggedObj = new Proxy(obj, {
  get: function(target, name) {
    console.log(`GET ${name}`);
    return Reflect.get(target, name);
  },
  set: function(target, name, value) {
    console.log(`SET ${name} = ${value}`);
    return Reflect.set(target, name, value);
  }
});

loggedObj.name = 'Alice'; // SET name = Alice
console.log(loggedObj.name); // GET name
```

-  性能优化

```javascript
const cache = new Map();

const memoizedObj = new Proxy(obj, {
  get: function(target, name) {
    if (cache.has(name)) {
      console.log('Fetching from cache');
      return cache.get(name);
    }

    const value = Reflect.get(target, name);
    cache.set(name, value);
    return value;
  }
});

memoizedObj.slowFunction(); // 执行函数并缓存结果
memoizedObj.slowFunction(); // 从缓存中获取结果
```

- 防止属性被删除

```javascript
const protectedObj = new Proxy(obj, {
  deleteProperty: function(target, name) {
    console.log(`Deleting ${name} is not allowed!`);
    return false;
  }
});

delete protectedObj.name; // Deleting name is not allowed!
```

- 防止属性被修改

```javascript
const immutableObj = new Proxy(obj, {
  set: function(target, name, value) {
    console.log(`Property ${name} is immutable!`);
    return false;
  }
});

immutableObj.name = 'Alice'; // Property name is immutable!
```

- 自动填充属性

```javascript
const autoFillObj = new Proxy({}, {
  get: function(target, name) {
    if (!(name in target)) {
      console.log(`Property ${name} does not exist, creating it.`);
      target[name] = name;
    }
    return target[name];
  }
});

console.log(autoFillObj.name); // Property name does not exist, creating it.
console.log(autoFillObj.name); // 'name'
```

- 虚拟属性

```javascript
const virtualObj = new Proxy({}, {
  get: function(target, name) {
    if (name === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }
    return Reflect.get(target, name);
  },
  set: function(target, name, value) {
    if (name === 'firstName' || name === 'lastName') {
      Reflect.set(target, name, value);
    }
  }
});

virtualObj.firstName = 'John';
virtualObj.lastName = 'Doe';
console.log(virtualObj.fullName); // John Doe
```

`Proxy` 提供了非常灵活的方式来控制对象的行为，可以拦截和修改对象的多个操作。这使得 `Proxy` 成为实现各种高级功能的强大工具。不过，需要注意的是，由于 `Proxy` 是 ES6 引入的特性，它在一些旧版浏览器中可能不被支持。在使用 `Proxy` 时，需要确保目标环境支持 ES6。

### Object.definePropety和Proxy区别

- **操作范围**：`Object.defineProperty` 用于定义或修改单个属性，而 `Proxy` 可以拦截和修改对象的多个操作。
- **灵活性**：`Proxy` 提供了更多的控制和灵活性，可以拦截和自定义对象的多种行为。
- **兼容性**：`Object.defineProperty` 在旧版浏览器中也有较好的支持，而 `Proxy` 需要 ES6 环境。

需要对对象的单个属性进行精细控制，`Object.defineProperty` 可能是更好的选择。

需要对对象的多个操作进行拦截和自定义，`Proxy` 提供了更强大的功能。

### const定义对象，怎样让对象属性不能改变

1.`Object.freeze()` 可以将一个对象冻结，使得该对象的所有属性变得不可修改、不可添加和不可删除。

```js
const obj = {
  name: "Alice",
  age: 25
};

// 冻结对象，之后无法修改对象的属性
Object.freeze(obj);

obj.name = "Bob";  // 无效，属性不能修改
obj.age = 30;      // 无效，属性不能修改
delete obj.name;   // 无效，属性不能删除

console.log(obj);  // 输出: { name: 'Alice', age: 25 }

```



`Object.freeze()` 只是浅冻结，只会冻结对象的第一层属性。如果对象的某个属性本身是一个对象，那个嵌套对象是可变的。为了完全冻结一个对象及其嵌套对象，你需要递归地冻结每个嵌套对象。

```js
const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false,  // 不允许修改
  enumerable: true,
  configurable: true
});

obj.name = 'Bob';  // 无效，属性不可修改
console.log(obj.name);  // 输出: Alice

```



2. `Object.defineProperty()` 和 `Object.defineProperties()` 允许你更精细地控制对象属性的行为，特别是可以设置 `writable`（是否可写）为 `false` 来使属性不可修改。

`Object.defineProperty()` 只会定义一个属性。如果你需要定义多个属性，可以使用 `Object.defineProperties()`。

```js
const obj = {};

Object.defineProperties(obj, {
  name: {
    value: 'Alice',
    writable: false,
    enumerable: true,
    configurable: true
  },
  age: {
    value: 25,
    writable: false,
    enumerable: true,
    configurable: true
  }
});

obj.name = 'Bob';  // 无效，属性不可修改
obj.age = 30;      // 无效，属性不可修改

console.log(obj);  // 输出: { name: 'Alice', age: 25 }
```

3. `Object.seal()` 会阻止添加和删除对象的属性，但允许修改现有属性的值。它比 `Object.freeze()` 更松散一些，但依然防止了属性的删除和添加。

```js
const obj = {
  name: "Alice",
  age: 25
};

Object.seal(obj);

obj.name = "Bob";  // 有效，属性值可以修改
obj.age = 30;      // 有效，属性值可以修改
delete obj.name;   // 无效，不能删除属性
obj.city = "Paris";  // 无效，不能添加新属性

console.log(obj);  // 输出: { name: 'Bob', age: 30 }
```

4. Proxy` 是 ES6 引入的一种强大工具，可以自定义对象的行为。你可以使用 `Proxy` 来拦截对对象的访问，并根据需要控制属性是否可修改。

```js
const handler = {
  set(target, prop, value) {
    if (prop === 'name') {
      console.log('Cannot change name');
      return false;  // 阻止对 name 的修改
    }
    target[prop] = value;  // 允许其他属性修改
    return true;
  }
};

const obj = new Proxy({ name: 'Alice', age: 25 }, handler);

obj.name = 'Bob';  // 输出: Cannot change name
obj.age = 30;      // 允许修改
console.log(obj);  // 输出: { name: 'Alice', age: 30 }
```





### Reflect

JS内置对象，提供了一种更加简洁和一致的方式来操作对象。它使得 `Proxy` 的使用更加直观，与`Proxy` 方法名称相同，参数也相同。这样，你可以直接在 `Proxy` 的陷阱方法中调用 `Reflect` 的方法来执行默认操作。

### Reflect和Object的区别



- `Reflect` 与 `Proxy` 配合使用，以提供对对象操作的控制。`Object`用于创建、修改、查询对象的属性和行为。

- `Reflect.defineProperty()` 返回一个布尔值，而 `Object.defineProperty()` 返回被操作的对象。

- `Object`兼容较好，`Reflect` 是 ES6 引入



### 大文件上传断点续传



- 在客户端，首先确定文件的总大小。
- 计算出需要上传的分片数量。
- 为每个分段⽣成 hash 值，发送到服务器携带⼀个标志，⽤于标识⼀个完整的⽂件
- 上传成功的，服务端保存各段⽂件，本地保存分段信息，
- 所有分断上传完成，发送给服务端⼀个合并⽂件的请求
- 服务端根据⽂件标识、类型、分⽚顺序进⾏⽂件合并
- 之后删除分⽚⽂件
- 重新上传时，进⾏和本地分段 hash 值的对⽐，如果相同的话则跳过，继续下⼀个分段的上传

### 进度条显示

使用h5的progress元素

- 监听load和readystatechange 变更progress的value实现

nprogress

- 一个轻量级的进度条插件
- `Nprogress.configure({showSpinner: false})`
- 监听load（nprogress.done）和readystatechange z状态是interactive progress.start else progress.done

### js为什么0.1+0.2!=0.3，怎么做能保证精确

计算机使用二进制来表示数据。在将十进制的小数转换为二进制时，无法精确地用有限的二进制位数来表示，这就会导致在转换和后续计算过程中产生误差积累。

例如，十进制的 0.1 转换为二进制是一个无限循环的小数，在实际存储和处理时只能近似表示，这种近似就不可避免地带来了精度损失。

- **方法一：使用第三方库，如 `decimal.js`**
- **转换为整数计算后再转换回来**

### Server-Sent Events（SSE）

服务器推送技术，允许服务器向浏览器发送事件。

SSE 是一种单向通信机制，意味着数据只能从服务器流向客户端，而客户端不能向服务器发送数据。

SSE 适用于实时更新场景，如实时聊天、股票报价、新闻更新等。

```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/events') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    // 发送消息
    const sendEvent = () => {
      const data = `data: ${new Date().toLocaleTimeString()}\n\n`;
      res.write(data);
    };

    // 每隔一段时间发送一条消息
    setInterval(sendEvent, 1000);

    // 如果客户端断开连接，清除定时器
    req.on('close', () => {
      clearInterval(sendEvent);
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

...
<script>
  const eventSource = new EventSource('http://localhost:3000/events');

  eventSource.onmessage = function(event) {
    const newElement = document.createElement('p');
    newElement.textContent = 'Server says: ' + event.data;
    document.getElementById('events').appendChild(newElement);
  };

  eventSource.onerror = function(error) {
    console.error('EventSource failed:', error);
  };
</script>
</body>
</html>
```

### 注意事项

- SSE 仅支持文本数据
- SSE 的连接是持久的，但服务器可以随时关闭连接。如果连接关闭，客户端需要重新建立连接。
- SSE 适用于单向数据流

### SSE 的工作原理

1. **建立连接**：客户端通过 HTTP 请求与服务器建立连接。这个请求的 `Accept` 头包含 `text/event-stream`，表明客户端希望接收事件流。
2. **保持连接**：一旦连接建立，服务器可以开始发送事件。这些事件以纯文本格式发送，每条消息以两个换行符（`\n\n`）分隔。
3. **事件处理**：客户端接收到事件后，会触发一个 `onmessage` 事件处理器，该处理器可以处理接收到的数据。

### SSE的优势

- **简单性**：SSE 相对简单，不需要复杂的协议或额外的库。
- **兼容性**：SSE 是基于 HTTP 的，因此它与大多数现代浏览器兼容。
- **持久性**：SSE 可以保持连接打开，允许服务器在有新数据时随时发送数据。
- **灵活性**：SSE 支持自动重连，如果连接中断，客户端可以自动尝试重新连接



### js严格模式

通过在脚本或函数的顶部添加 `"use strict";` 指令来启用。

严格模式的好处

1. 禁止使用未声明的变量。
2. 不能使用 `with` 语句。
3. 函数的 `this` 值不会默认指向全局对象，而是 `undefined`。
4. `eval` 不能在调用它的上下文中创建变量或函数。
5. `delete` 操作符不能删除变量声明。
6. 使用 `new` 调用非构造函数会抛出错误

### 合同预览怎么做的

Pdf,html,img,服务端渲染

### 使用 `iframe` 可能造成的问题

虽然 `iframe` 是实现合同预览的一种简单方法，但它也有一些潜在的问题：

1. **安全性问题**：`iframe` 可能被用于跨站脚本攻击（XSS），攻击者可能会注入恶意脚本到 `iframe` 中。因此，确保从可信源加载 `iframe` 内容，并且对 `iframe` 内容进行适当的验证和清理。
2. **性能问题**：`iframe` 会增加页面的加载时间，因为它需要加载嵌入页面的所有资源。如果嵌入页面很大或者加载速度慢，可能会导致用户体验下降。
3. **可访问性问题**：`iframe` 可能会影响屏幕阅读器等辅助技术的使用，因为它们可能无法正确地处理 `iframe` 内容。
4. **SEO 问题**：搜索引擎可能无法正确索引 `iframe` 内部的内容，这可能会影响页面的 SEO 表现。
5. **版本控制问题**：如果合同内容经常更新，需要确保 `iframe` 指向的 URL 总是最新版本的合同页面。
6. **用户界面问题**：`iframe` 可能会与主页面的样式和布局不协调，需要额外的 CSS 来确保它们看起来一致。

### typeof NaN是什么

Numbe

### 响应式原理

1. 数据流是响应式编程中的基本元素
2. 数据流通常是异步的
3. 以声明式编写代码，即描述“做什么”而不是“怎么做”。
4. 基于事件驱动的模型，事件可以是用户输入、网络请求、定时器等。
5. 在数据流中，背压是指下游处理者（Subscriber）如何通知上游生产者（Publisher）减缓数据流的速度，以避免处理不过来。

### object.prototype.tostring.call()

`Object.prototype.toString.call()` 是 JavaScript 中的一个方法调用方式，用于获取一个对象的内部 [[Class]] 属性的字符串表示形式

### 移动端如何实现上拉加载，下拉刷新？

可以使用 `touch` 事件和 `scroll` 事件来实现上拉加载和下拉刷新。

```javascript
let startY = 0;

document.addEventListener('touchstart', (event) => {
    startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', (event) => {
    const currentY = event.touches[0].pageY;
    const deltaY = currentY - startY;

    if (deltaY > 50) {
        console.log('Pull to refresh');
    } else if (deltaY < -50) {
        console.log('Pull to load more');
    }
});
```

###  在表单校验场景中，如何实现页面视口滚动到报错的位置？

可以使用 `scrollIntoView` 方法将报错元素滚动到视口中。

```javascript
const errorElement = document.getElementById('error-field');
errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
```

### call apply bind

三者的区别

1）三者都可以显式绑定函数的this指向

2）三者第一个参数都是this要指向的对象，若该参数为undefined或null，this则默认指向全局window

3）传参不同：apply是数组、call是参数列表，而bind可以分为多次传入，实现参数的合并

4）call、apply是立即执行，bind是返回绑定this之后的函数，如果这个新的函数作为构造函数被调用，那么this不再指向传入给bind的第一个参数，而是指向新生成的对象

手写call apply bind

```js
// 手写call
Function.prototype.Call = function(context, ...args) {
  // context为undefined或null时，则this默认指向全局window
  if (!context || context === null) {
    context = window;
  }
  // 利用Symbol创建一个唯一的key值，防止新增加的属性与obj中的属性名重复
  let fn = Symbol();
  // this指向调用call的函数
  context[fn] = this; 
  // 隐式绑定this，如执行obj.foo(), foo内的this指向obj
  let res = context[fn](...args);
  // 执行完以后，删除新增加的属性
  delete context[fn]; 
  return res;
};

// apply与call相似，只有第二个参数是一个数组，
Function.prototype.Apply = function(context, args) {
  if (!context || context === null) {
    context = window;
  }
  let fn = Symbol();
  context[fn] = this;
  let res = context[fn](...args "fn");
  delete context[fn];
  return res;
};
Function.prototype.Bind = function(context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  let fn = this;
  let f = Symbol();
  const result = function(...args1) {
    if (this instanceof fn) {
      // result如果作为构造函数被调用，this指向的是new出来的对象
      // this instanceof fn，判断new出来的对象是否为fn的实例
      this[f] = fn;
      this[f](...args1, ...args "f");
      delete this[f];
    } else {
      // bind返回的函数作为普通函数被调用时
      context[f] = fn;
      context[f](...args1, ...args "f");
      delete context[f];
    }
  };
  // 如果绑定的是构造函数 那么需要继承构造函数原型属性和方法
  // 实现继承的方式: 使用Object.create
  result.prototype = Object.create(fn.prototype);
  return result;
};
```

### **this的5种绑定方式**

1）默认绑定(非严格模式下this指向全局对象，严格模式下函数内的this指向`undefined`)

2）隐式绑定(当函数引用有上下文对象时, 如 `obj.foo()`的调用方式, foo内的this指向obj)

3）显示绑定(通过call或者apply方法直接指定this的绑定对象, 如`foo.call(obj)`)

4）new构造函数绑定，this指向新生成的对象

5）箭头函数，this指向的是定义该函数时，外层环境中的this，**箭头函数的this在定义时就决定了，不能改变**

### 富文本里面，是如何做到划词的？

- **实现原理**：

   - 使用 `window.getSelection()` 获取用户选中的文本。

   - 通过 `Range` 对象获取选中的 DOM 节点和位置。

   - 在选中的文本上添加高亮样式或自定义操作。

   - 示例：

     ```javascript
     const selection = window.getSelection();
     const range = selection.getRangeAt(0);
     const span = document.createElement('span');
     span.style.backgroundColor = 'yellow';
     range.surroundContents(span);
     ```

### **如何在划词选择的文本上添加右键菜单？**

- **实现步骤**：

   1. 监听 `mouseup` 事件，获取用户选中的文本。
   2. 监听 `contextmenu` 事件，阻止默认右键菜单。
   3. 自定义右键菜单并显示在鼠标位置。

   - 示例：

     ```javascript
     document.addEventListener('mouseup', () => {
       const selectedText = window.getSelection().toString();
       if (selectedText) {
         document.addEventListener('contextmenu', (e) => {
           e.preventDefault();
           showCustomMenu(e.clientX, e.clientY);
         }, { once: true });
       }
     });
     ```

###  **JS 超过 Number 最大值的数该怎么处理？**

- **使用 `BigInt`**：

  ```javascript
  const bigNum = BigInt(Number.MAX_SAFE_INTEGER) + BigInt(1);
  ```

---

### == 和 ===区别

使用 `==` 时，JavaScript 会进行类型转换，可能导致意想不到的结果。

使用 `===` 时，不进行类型转换，只有类型和内容都相等时才返回 `true`。

###  `==` 运算符

如果两个值类型相同，则直接比较。

如果类型不同：

- 字符串与数字比较时，将字符串转换为数字。    `NaN`。

  ```js
  console.log('5' == 5);    // true，'5' 被转换为数字 5
  console.log('' == 0);     // true，'' 被转换为 0
  console.log('abc' == 0);  // false，'abc' 无法转换为数字
  ```

- 布尔值转换为数字进行比较。

  ```js
  console.log(true == 1);   // true
  console.log(false == 0);  // true
  ```

- 对象会被转换为原始值。

  ```js
  const obj = {
    valueOf() { return 2; }
  };
  console.log(obj == 2); // true，obj 被转换为 2
  
  const obj2 = {
    toString() { return '5'; }
  };
  console.log(obj2 == '5'); // true，obj2 被转换为 '5'
  ```

- `null` 和 `undefined` 仅相等于彼此。

   - `null` 只等于 `undefined`，其他任何比较都返回 `false`。

  ```js
  console.log(null == undefined); // true
  console.log(null == 0);          // false
  console.log(undefined == 0);     // false
  ```

- 字符串与布尔值

  ```js
  如果字符串为空（''），则转换为 0
  如果字符串是数字字符（如 '5'），则转换为对应的数字
  如果字符串无法转换为数字（如 'abc'），则结果为 NaN
  ```



**如何获取url中的query参数**：

- 使用`URLSearchParams`或手动解析`window.location.search`

### || 与 ?? 区别

使用 ?? 时，您只关心变量是否存在（即不是 null 或 undefined），而不关心其是否为假值。

使用 || 时，您希望处理所有假值（如 false、0、''、null、undefined）等。



### WebRtc

### 工作流程

1. **创建信令服务器**：
   - 使用 WebSocket 或其他协议实现信令服务器，用于交换 SDP 和 ICE 候选者。
2. **获取本地媒体流**：
   - 使用 `getUserMedia` 获取用户的摄像头和麦克风流。
3. **创建 RTCPeerConnection**：
   - 创建 `RTCPeerConnection` 对象，用于管理 WebRTC 连接。
4. **交换 SDP 和 ICE 候选者**：
   - 通过信令服务器交换 SDP 和 ICE 候选者，建立连接。
5. **显示远程视频流**：
   - 将远程视频流显示在页面上。

#### **信令服务器（Node.js + WebSocket）**

```js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // 广播消息给所有客户端
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

console.log('Signaling server running on ws://localhost:8080');
```

------

#### **客户端代码（HTML + JavaScript）**

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WebRTC Video Chat</title>
</head>
<body>
  <video id="localVideo" autoplay muted></video>
  <video id="remoteVideo" autoplay></video>

  <script>
    const localVideo = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');

    const ws = new WebSocket('ws://localhost:8080');
    let localStream;
    let peerConnection;

    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }, // 免费 STUN 服务器
      ],
    };

    // 获取本地媒体流
    async function startLocalStream() {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    }

    // 创建 RTCPeerConnection
    function createPeerConnection() {
      peerConnection = new RTCPeerConnection(configuration);

      // 添加本地媒体流
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      // 监听远程媒体流
      peerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
      };

      // 处理 ICE 候选者
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          ws.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
        }
      };
    }

    // 处理信令消息
    ws.onmessage = async (message) => {
      const data = JSON.parse(message.data);

      if (data.type === 'offer') {
        // 收到 Offer，创建 Answer
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        ws.send(JSON.stringify({ type: 'answer', answer }));
      } else if (data.type === 'answer') {
        // 收到 Answer，设置远程描述
        await peerConnection.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data.type === 'candidate') {
        // 添加 ICE 候选者
        await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    // 发起呼叫
    async function call() {
      createPeerConnection();

      // 创建 Offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      ws.send(JSON.stringify({ type: 'offer', offer }));
    }

    // 初始化
    startLocalStream();
  </script>

  <button onclick="call()">Call</button>
</body>
</html>
```



### 优势

- **实时性**：WebRTC 提供低延迟的音视频通信，适合需要即时反馈的应用（如视频通话、在线游戏等）。
- **跨平台**：支持多种设备和浏览器，包括桌面和移动设备。
- **无需插件**：WebRTC 是基于浏览器的技术，用户无需安装额外的插件或软件。
- **安全性**：WebRTC 默认采用加密传输（SRTP和DTLS），提高了通信的安全性。

### 应用场景

- **视频会议**：如 Zoom、Google Meet 等。
- **实时聊天**：如 Facebook Messenger、WhatsApp Web 等。
- **在线教育**：实现师生之间的实时互动。
- **远程医疗**：医生与患者的实时视频咨询。



### 为什么会出现变量提升

在JavaScript的执行过程中，代码会分为两个阶段：解析阶段和执行阶段。

- **解析阶段**：在这一阶段，JavaScript引擎会扫描代码并处理变量和函数的声明。所有的变量和函数声明会被提升到其作用域的顶部。
- **执行阶段**：在这一阶段，代码会按照顺序执行。由于变量和函数的声明已经被提升，执行时可以在声明之前访问它们。

在 JavaScript 中，`Iterator` 是一个用于按顺序访问数据集合元素的对象，通常用于遍历数组、字符串、Map、Set 等集合类型。`Iterator` 使得我们可以逐个访问集合中的元素，而无需了解集合内部的具体实现方式。

### `Iterator`

`Iterator` 是实现了 `next()` 方法的对象。`next()` 方法返回一个对象，这个对象包含两个属性：

- `value`: 当前元素的值
- `done`: 一个布尔值，表示是否已经遍历完成。如果已经遍历完所有元素，`done` 会是 `true`，否则是 `false`。

使用 `Iterator`

在 JavaScript 中，几乎所有的集合类型（如 `Array`、`Set`、`Map`、`String` 等）都有自己的默认 `Iterator` 实现。你可以通过调用 `.next()` 方法来获取元素。

示例 1：数组的迭代器

```javascript
const arr = [10, 20, 30];
const iterator = arr[Symbol.iterator](); // 获取迭代器

console.log(iterator.next()); // { value: 10, done: false }
console.log(iterator.next()); // { value: 20, done: false }
console.log(iterator.next()); // { value: 30, done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

示例 2：字符串的迭代器

```javascript
const str = "hello";
const iterator = str[Symbol.iterator]();

console.log(iterator.next()); // { value: "h", done: false }
console.log(iterator.next()); // { value: "e", done: false }
console.log(iterator.next()); // { value: "l", done: false }
console.log(iterator.next()); // { value: "l", done: false }
console.log(iterator.next()); // { value: "o", done: false }
console.log(iterator.next()); // { value: undefined, done: true }
```

`for...of` 循环与 `Iterator`

`for...of` 循环背后其实是利用了 `Iterator` 来迭代集合的每个元素。它会自动调用集合的迭代器，直到 `done` 为 `true`。

示例 3：使用 `for...of` 遍历集合

```javascript
const arr = [10, 20, 30];

for (const value of arr) {
  console.log(value);
}
// 输出:
// 10
// 20
// 30
```

在 `for...of` 循环中，你不需要显式调用 `next()` 方法，JavaScript 会自动处理。

自定义迭代器

你可以通过实现 `Symbol.iterator` 方法来为自定义对象创建迭代器。例如，下面的例子展示了如何为一个简单的对象定义迭代器：

```javascript
const myObject = {
  data: [1, 2, 3, 4],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return { value: this.data[index++], done: false };
        } else {
          return { done: true };
        }
      }
    };
  }
};

for (const value of myObject) {
  console.log(value); // 输出: 1 2 3 4
}
```

其他集合类型的迭代器

`Map` 的迭代器

Map 也提供了迭代器，可以用来遍历键值对。

```javascript
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

for (const [key, value] of map) {
  console.log(key, value);
}
// 输出:
// a 1
// b 2
// c 3
```

`Set` 的迭代器

`Set` 会遍历集合中的所有唯一值：

```javascript
const set = new Set([1, 2, 3, 3, 4]);

for (const value of set) {
  console.log(value);
}
// 输出:
// 1
// 2
// 3
// 4
```

总结

- **`Iterator`** 是一个通过 `next()` 方法逐个访问集合元素的对象。
- `for...of` 循环会自动使用迭代器来遍历集合。
- 可以为自定义对象实现 `Symbol.iterator` 方法，来定义自己的迭代器。
- JavaScript 中的数组、字符串、Map、Set 等都实现了默认的迭代器。

通过这些迭代器，我们可以优雅地遍历各种数据结构，简化代码。



### 怎么用原生js实现框架中的组件

1. **封装组件**：用类或者函数封装组件。
2. **状态管理**：在组件中管理自己的状态。
3. **视图更新**：根据状态更新视图。
4. **事件处理**：通过事件来响应用户操作。

**组件类 `Counter`**：

- `constructor(selector)`：接受一个选择器，初始化时将组件渲染到指定容器中。
- `setState(newState)`：更新组件的状态并重新渲染视图。
- `render()`：根据当前的状态重新渲染组件内容，包括绑定事件处理程序（比如点击按钮时增加计数）。

**事件绑定**：

- 在 `render()` 方法中，我们将一个点击事件绑定到按钮上，当点击时更新状态并触发重新渲染。

**组件的状态管理**：

- `state` 是组件的内部状态，我们通过 `setState()` 方法来更新状态，`render()` 会根据最新的状态来更新 DOM。

**生命周期管理**：

- 这个例子中，生命周期很简单，组件的生命周期就是从初始化（`new Counter()`）到销毁。你可以在 `Counter` 类中扩展更多生命周期钩子（比如组件挂载时、销毁时的逻辑）。

```js
class Counter {
  constructor(selector) {
    this.container = document.querySelector(selector);
    this.state = { count: 0 };
    this.render();
  }

  // 更新状态并重新渲染
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  // 渲染组件视图
  render() {
    this.container.innerHTML = `
      <div>
        <p>Count: ${this.state.count}</p>
        <button id="increment">Increment</button>
      </div>
    `;

    // 绑定事件
    this.container.querySelector("#increment").addEventListener("click", () => {
      this.setState({ count: this.state.count + 1 });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 初始化 Counter 组件，挂载到 #app 元素上
  const counter = new Counter("#app");
});

```

### Js请求和解析那个会阻塞主进程吗？

网络请求不会阻塞主进程，而解析是否阻塞主进程取决于它是同步(JSON.parse())还是异步的。
