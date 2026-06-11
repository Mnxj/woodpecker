### ES7

**Array.prototype.includes()**:
More intuitive than `indexOf`, supports `NaN`, no `-1` confusion.

```javascript
let arr = [1, 2, 3, 4, 5];
console.log(arr.includes(3)); // true
console.log(arr.includes(10)); // false
```

### ES8

- `async` and `await` make async operations simpler.
- Object.values() and Object.entries():
    - `Object.values()` returns an array of an object's own enumerable property values.
    - `Object.entries()` returns an array of an object's own enumerable [key, value] pairs.
- `String.padStart` and `String.padEnd` pad a string with a specified character until it reaches a given length.

### ES9

**1. Async iteration (`for-await-of`)**

- **Overview**: like sync `for-of` but for async iteration over an async iterable that returns Promises.

```
async function fetchData() {
  const data = ['a', 'b', 'c'];

  for await (let item of data) {
    console.log(item);  // logs each item one by one after each async op completes
  }
}
```

**2. Regex improvements**

- All Unicode digits match `\d`.
- **`s` (dotAll) flag**: allows `.` to match newlines.

```js
const regex = /foo.bar/s;
console.log(regex.test('foo\nbar'));  // true
```

### ES10

- **`Array.prototype.flat` and `Array.prototype.flatMap`** — map each element then flatten.
- **`Object.fromEntries()`**
    - **Overview**: convert an array of key-value pairs into an object.

### ES11

**`BigInt`**

- **Overview**: handle arbitrarily large integers (beyond `Number`'s max).

```js
const bigInt = 1234567890123456789012345678901234567890n;
console.log(bigInt + 1n);  // 1234567890123456789012345678901234567891n
```

**2. Nullish Coalescing Operator (`??`)**

- **Overview**: a concise way to handle `null` or `undefined` — returns the right operand only when the left is `null` or `undefined`.

```js
const foo = null ?? 'default';  // 'default'
const bar = 0 ?? 42;            // 0
```

**3. Optional Chaining (`?.`)**

- **Overview**: safely access deeply nested properties; if any value is `null` or `undefined`, returns `undefined` instead of throwing.

### ES12

- **Logical Assignment Operators**

- **Overview**: `&&=`, `||=`, `??=` assign based on truthy/falsy/nullish conditions.
- **WeakRefs**
    - **Overview**: weak references to objects; the referent can be GC'd if no strong references exist.
- **Promise.any()**
    - **Overview**: accepts an array of Promises; returns the first fulfilled. If none fulfill, returns an `AggregateError`.

### 11 new features in ES6

- **`let` and `const` declarations**:
    - `let` — block-scoped variable, reassignable.
    - `const` — block-scoped constant, not reassignable.
- **Arrow functions**:
    - Concise function syntax.
    - `this` refers to the enclosing lexical context, not the call site.
- **Template literals**:
    - Strings in backticks, supporting line breaks and interpolation.
- **Destructuring**:
    - Extract values from arrays or objects into variables.
- **Default parameters**:
    - Default values for function parameters.
- **Rest parameters**:
    - Collect variable-length arguments into an array.
- **Spread operator**:
    - Expand arrays or objects into individual elements.
- **Class**:
    - More object-oriented programming style.
    - Inheritance, static methods, getter/setter.
- **Modules**:
    - Modular code via `import`/`export`.
- **Promise**:
    - More elegant async programming.
    - Avoids "callback hell".
- **Symbol**:
    - A new primitive type for unique property keys.

### ES6 Symbol — usage and use cases

1. **Create a Symbol**

    - Use `Symbol()` to create a new value:

      ```js
      const mySymbol = Symbol('description');
      ```

    - Each call produces a new Symbol, even with the same description.

2. **Use Symbol as an object key**

    - Symbol values can serve as object keys, creating unique keys:

      ```js
      const obj = {
        [mySymbol]: 'hello'
      };
      console.log(obj[mySymbol]); // 'hello'
      ```

4. **Global Symbol registry**

    - Use `Symbol.for()` to create/lookup Symbols in a global registry:

      ```js
      const globalSymbol = Symbol.for('global symbol');
      const anotherGlobalSymbol = Symbol.for('global symbol');
      console.log(globalSymbol === anotherGlobalSymbol); // true
      ```

5. **Built-in Symbols**

    - JS provides built-in Symbols like `Symbol.iterator`, `Symbol.hasInstance` for extending language behavior.

6. **Use cases**

    - **Unique keys**: Symbol keys won't collide with others.
    - **Private properties/methods**: simulate private members of a class.
    - **Object extension**: add new functionality without changing existing code.
    - **Eliminate magic strings**: replace magic strings with Symbols to improve readability and maintainability.

### Array methods that mutate

1. `pop()` — remove and return the last element.
2. `push()` — append elements to the end; returns new length.
3. `shift()` — remove and return the first element.
4. `unshift()` — prepend elements to the start; returns new length.
5. `splice()` — modify the array by removing and/or adding elements.
6. `sort()` — sort elements.
7. `reverse()` — reverse element order.
8. `fill()` — fill the array with a static value.
9. `copyWithin()` — copy a range of elements within the array.

Methods that DON'T mutate the original array:

1. `concat()` — return a new array combining input arrays.
2. `slice()` — return a new array with a portion of the input.
3. `map()` — return a new array of transformed values.
4. `filter()` — return a new array of elements passing a test.
5. `reduce()` — reduce array to a single value.
6. `reduceRight()` — like `reduce()` but from the end.
7. `forEach()` — execute a function for each element.
8. `entries()` — return a new Array Iterator over [index, value] pairs.
9. `keys()` — return a new Array Iterator over keys.
10. `values()` — return a new Array Iterator over values.



### Ways to convert a Set to an Array

```js
[...new Set([1, 2, 3, 4, 5])] // 1
Array.from(new Set([1, 2, 3, 4, 5])) // 2
Array.prototype.slice.call(new Set([1, 2, 3, 4, 5])) // 3
const mySet = new Set([1, 2, 3, 4, 5]); // 4
const myArray = [];
for (const value of mySet) {
   myArray.push(value);
}
const mySet = new Set([1, 2, 3, 4, 5]); // 5
const myArray = [];
mySet.forEach(value => myArray.push(value));
```

### Array deduplication methods

```js
[...new Set(arr)] // 1
arr.filter((item, index) => arr.indexOf(item) === index); // 2
return arr.reduce((unique, item) => { // 3
     return unique.includes(item) ? unique : [...unique, item];
   }, []);
for (let i = 0; i < arr.length; i++) { // 4
     if (uniqueArray.indexOf(arr[i]) === -1) {
       uniqueArray.push(arr[i]);
     }
   }

const uniqueMap = new Map(); // 5
   arr.forEach(item => uniqueMap.set(item, true));
   return Array.from(uniqueMap.keys());
```

### splice

`splice()` adds/removes items in an array and returns the removed items.

```js
// Insert at a specific position
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
// Result:
// Banana, Orange, Lemon, Kiwi, Apple, Mango


// Insert at the beginning
var shuiguo = ["Banana", "Orange", "Apple", "Mango"];
shuiguo.splice(0, 0, "Lemon");
// Result:
// Lemon, Banana, Orange, Apple, Mango

let arr = [1, 2, 3, 4, 5];
let index = arr.indexOf(3); // find the index to remove
if (index !== -1) { // make sure the element exists
    arr.splice(index, 1); // remove one element
}
console.log(arr); // [1, 2, 4, 5]

```

### `slice()` copies array elements

### Differences between `var`, `let`, `const`

- `var` can be redeclared; `let` and `const` cannot.
- `var` is not block-scoped; `let` and `const` are.
- `const` must be assigned at declaration and cannot be reassigned — for constants.
- `let` has a "temporal dead zone" — can't access before declaration.

### Function declarations vs variable declarations

Both function and variable declarations are hoisted — their declarations move to the top of their scope, but assignments are not hoisted.

```js
console.log(c); // function
function c() {}
// ⬇️
function c() {} // function declaration hoisted to the top
console.log(c); // c is already declared as a function, so logs 'function'
```



### Arrow vs regular functions

- Syntax: arrow uses `=>`; regular uses `function`.
- `this` binding: arrow's `this` is lexical (defined-time context); regular's `this` is bound at call time.
- Constructor: arrow functions can't be used as constructors.
- Prototype: arrow functions have no prototype object.
- `arguments` object: arrow functions don't have their own `arguments`; they access the outer function's `arguments`. Regular functions have their own.
- Return: arrow can omit `return` for single expressions.

### Why don't arrow functions have a constructor?

- Designed for concise, flexible callbacks and inline functions.

- They have no `Function.prototype` because they can't be used as constructors, and they have no own `this` or `arguments`.

- Arrow functions exist to simplify code, with notable differences from regular functions — they don't get the traditional `prototype`.

### What happens if you use `call`, `apply`, or `bind` on an arrow function?

Arrow functions' `this` is decided lexically at definition, not dynamically bound at call.

So regardless of `call`/`apply`/`bind`, an arrow function's `this` stays the same.

### Differences between Set, Map, WeakSet, WeakMap

- Set
    - Members can't be duplicated
    - Similar to an array
    - Iterable; `add`, `delete`, `has`
- WeakSet
    - Members must be objects
    - References are weak — GC ignores WeakSet references; if nothing else references the object, it can be collected. So no iteration, no `size`.
    - Useful for storing DOM nodes without worrying about leaks when nodes are removed
- Map
    - A data structure of key-value pairs; keys can be of any type
    - Accepts an array of pairs as initializer
    - Map keys are tied to memory addresses — different addresses count as different keys
    - For primitive values, strict equality counts as the same key
    - Iteration order is insertion order
- WeakMap
    - WeakMap keys must be objects
    - Keys are weakly referenced
    - No iteration; no `clear`; no `clear` method
    - `get`, `set`, `has`, `delete`



### What's new for strings?

Template literals, `includes` (contains check), `endsWith`, `startsWith`.

### What array methods were added and how to use them?

`Array.from()` — convert array-likes (`arguments`, DOM collections, strings, TypedArrays) into arrays; also accepts Set/Map.

`Array.of()` — create an array from a list of values. `Array.of(1,2,3) // [1,2,3]`

`Array.prototype.fill` — fill with data.

`Array.prototype.find()`

`Array.prototype.findIndex()`

### What object features were extended?

Iteration:

- `Object.keys()`
- `Reflect.ownKeys(obj)`
- `Object.is()` — value equality check
- `Object.assign` — merge objects, copy to target (shallow copy)

### Generators

1) A `generator function` differs syntactically from a regular function by an extra `*`.

2) `yield` can only be used inside a generator function — it pauses generator execution.

3) Generators don't auto-execute; each `next()` call resumes until the next `yield`.

4) Calling a generator doesn't run it immediately — it returns an iterator. Useful for async.



Use cases:

**Iterator pattern**, **async control flow**, **infinite streams**



### ES6 `class` vs ES5 constructors

**Similarities:**

• Both create instances.

• Both let you define properties and methods on instances.

• Both invoked with `new`.

**Differences:**

• Syntax: ES6 uses `class`; ES5 uses functions.

• Inheritance: ES6 `extends`; ES5 prototype chains.

• Methods: ES6 defines methods directly in the class; ES5 defines them on the constructor's prototype.

• Static members: ES6 `class` supports static methods/properties; ES5 attaches them to the constructor itself.

• Accessors: ES6 `class` supports `get`/`set`; ES5 needs `Object.defineProperty()`.

• Nature: ES6 builds on prototype-based inheritance; ES5 creates objects directly.



### Understanding ES6 modules — when to use them?

Modules: a modern, structured way to organize and manage JS code — improving quality, maintainability, and extensibility.

Modularity enables: abstraction, encapsulation, reuse.

Use `export` / `import`.



Without modularization:

- Variables and methods are hard to maintain; pollute the global scope.
- Resources are loaded via `<script>` tags top to bottom.
- Large projects become unmanageable.
