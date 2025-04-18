### TypeScript和JavaScript的主要区别。

> javaScript的超集，支持Es6语法 支持面向对象编程的概念 类 接口继承范性


◦ 静态类型检查：提供了编译时的类型检查。这有助于在代码运⾏之前发现可能的错误。

◦ 如枚举（Enums）、泛型和命名空间。

### 类型

1. **基础类型** 9种
    - `number`、`string`、`boolean`、`void`、`null`、`undefined`
    - `never` 永不存在的值的类型（用于抛出异常或无限循环的函数
    - `unknown` 表示未知类型,比 `any` 更安全
    - `any` 关闭了TypeScript的类型检查

2. **复合类型**
    - `Array<T>`、`Tuple`、`Enum`、`Interface`、`Type`、`Class` 等

3. **高级类型**

    - `Partial<T>`、[ˈpɑrʃl]  变为可选属性

      Type Partial<T> = {[k in keyof T]?: T[K]}
    - `Required<T>`、 变为必选属性

      Type required<T> = {[K in keyof T]-?: T[k]}
    - `Readonly<T>`、 变为只读属性

      Type Readonly<T> = { readonly [K in keyof T]:T[K]}
    - `Pick<T, K>`、  从T选取属性K

      Type Pick<T, K extends keyof T> = { [P in K]: T[P]}
    - `Omit<T, K>`    从T中移除属性K

      Type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T,K>>

4.  **工具类型**
- `Exclude<T, U>`  从T中中移除可以赋值给类型 U 的部分

  **type** Exclude<T,U> = T **extends** U? never:T;

- `Extract<T, U>` 从T中选取可以赋值给类型 U 的部分

  **type** Extract<T,U> = T **extends** U? T:never;

- `NonNullable<T>` T 中排除 null 和 undefined

  Type Nonullable<T> = T extends null | undefind ? never: T;

- `ReturnType<T>`  获取返回类型

  Type ReturnType<T extends (...args:any) =>any > = T extends (...args: any) => infer R? R:never

  `Parameters `以元组的方式获得函数的入参类型。

  Type Parameter<T extends (...args:any)=> any> = T extends (...args:infer P) => any? P :never

  `ConstructorParameters `以元组的方式获得构造函数的入参类型

  Type constructorParamets <T extends new(...args:any)=> any> = T extends new (...args: infer R) => any ? R : never

  `InstanceType `获得构造函数返回值的类型

  type InstanceType <T extends new(..args:any) =>any > = T extends new(...args:any) => infer R ? R : never

  嵌套数组的类型 type NestedArray<T>=T | NestedArray<T>[]

    18. ```typescript
         type NestedArray<T> = T | NestedArray<T>[];
         ```



5. **声明文件**

    - `declare var` 只是声明类型,不会实际分配内存或实现相应的功能
    - `declare function`
    - `declare class`
    - `declare namespace` 等

6. **装饰器**
    - 类装饰器
    - 属性装饰器
    - 方法装饰器
    - 参数装饰器

7. **模块系统**
    - `import`、`export`、`namespace`（组织和封装相关的代码）、`module` 等

8. **编译配置**
    - `tsconfig.json` 的各种编译选项

9. **实用工具**
    - `typeof`、`instanceof`、`as`、`!`、`?:` 等

### const 和readonly区别

- `const` 在 JavaScript 和 TypeScript 中都用于声明一个常量，其值不可更改。
- `readonly` 在 TypeScript ,表示这些属性或索引签名只能在声明时或构造函数中被赋值，之后不能被更改。

### typescript 语言在编译时如何实现变量的类型推导

1. `编译器`对源代码进行语法分析，生成抽象语法树（AST）。
2. `类型检查器`遍历 AST，对每个节点进行类型分析。
3. 在类型分析的基础上，`类型检查器`对代码中的类型进行检查，确保类型兼容性。
4. 如果发现类型错误，`类型检查器`会生成错误信息，并在编译时报错。

### type

高级类型：

- 交叉类型 &

  ```ts
  //组合多个类型，创建一个包含所有类型属性的新类型。
  type IntersectionType = { a: number } & { b: string };
  let myIntersection: IntersectionType = { a: 1, b: 'hello' };
  ```

- 联合类型 ｜

  ```ts
  type UnionType = string | number;
  let myUnion: UnionType = 'hello'; // 或者 myUnion = 1;
  ```

- 类型别名 用：去声明一个类型别名

  ```js
  type GenericType<T> = {
    value: T;
    doSomething: () => void;
  };
  // 使用泛型类型别名
  let myGeneric: GenericType<string> = {
    value: 'Hello',
    doSomething: () => console.log('Do something with the value'),
  };
  ```

- 映射类型

  ```ts
  //映射类型允许你基于现有的类型创建新的类型，通过遍历现有类型的所有属性并应用新的类型。
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };
  
  type ReadonlyString = Readonly<{ name: string }>;
  ```

- 条件类型

  ```ts
  //条件类型允许你根据类型检查的结果来选择不同的类型。
  type IsString<T> = T extends string ? true : false;
  type Result = IsString<'hello'>; // Result 是 true
  ```



### 枚举 enum

可以分为：数字枚举、字符串枚举、异构枚举

应用：日期、角色、筛选狂

### 装饰器 @expression

其实是 Object.defineProperty 的语法糖,需要在tsconfig.json⽂件启动，

可以装饰：

- 类 constructor构造器
- 属性/方法  traget对象原型、propertyKey方法的名称、descriptor方法的属性描述符
- 参数 traget对象原型、propertyKey参数的名称、index参数数组中的位置
- 访问器

### 范型的理解 <>

可以声明接口、函数、类、索引类型、约束类型

### 询问TypeScript中泛型的作⽤，并举例其在开发中的常⻅

作用

1. 允许你在编译时就捕获类型错误，而不是在运行时。这有助于避免类型不匹配导致的错误。
2. 使得函数、接口或类可以处理多种类型的数据，编写重复的代码。

用途

- 函数

>  可以在调用时接受任意类型的参数。

```typescript
function identity<T>(arg: T): T {
   return arg;
}

let output = identity<string>("myString"); // 显式指定类型
let output = identity("myString"); // TypeScript 会自动推断类型
```

- 接口

> 可以在实现时指定具体的类型。

```typescript
interface GenericIdentityFn<T> {
   (arg: T): T;
}

function identity<T>(arg: T): T {
   return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

- 类

> 可以在创建实例时指定具体的类型。

```typescript
class GenericNumber<T> {
   zeroValue: T;
   add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

- 泛型约束

>  限制泛型类型必须满足的条件。

```typescript
interface Lengthwise {
   length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
   console.log(arg.length);  // 现在我们知道 arg 有一个 length 属性
   return arg;
}
```

- 泛型工具类型

泛型工具类型，如 `Partial<T>`、`Readonly<T>`、`Pick<T, K>` 等，这些工具类型可以用来创建新的类型。

```typescript
interface Todo {
   title: string;
   description: string;
   completed: boolean;
}

type PartialTodo = Partial<Todo>;
// 现在 PartialTodo 是 { title?: string; description?: string; completed?: boolean; }
```



### 命名空间 namespace

`解决重名问题`

在⼀个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发⽣冲突。



### 命名空间和模块区别

- 命名空间：内部模块，主要用于组织代码，避免命名冲突
- 模块：ts的外部模块简称，侧重代码的重用，一个模块里可能有多个命名空间

### **typeof的相关输出结果** object

- 对`object`输出都为`'object'`，如`typeof []`、`typeof {}`、`typeof null`。

**怎么判断类型，有哪些方式**：

- `instanceof` 检查对象是否是某个构造函数的实例
- `Object.prototype.toString.call` 方法来获取对象的内部类型标签
- `typeof` 判断变量类型的基本方法，返回一个表示类型的字符串

### instanceof与typeof

1）`typeof`一般被用于来判断一个变量的类型
typeof可以用来判断`number、undefined、symbol、string、function、boolean、object`?这七种数据类型，特殊情况：`typeof null === 'object'`

2）`instanceof`判断一个对象的原型链上是否包含该构造函数的原型

### TypeScript 的 infer

`infer` 关键字用于在条件类型中推导类型，可以根据上下文推导出类型。



### 类型断言和类型转换的区别

- **类型断言**：告诉编译器某个值的类型，不改变值的类型。
- **类型转换**：在运行时改变值的类型。

### 为什么要使用 TypeScript

TypeScript 提供静态类型检查，增强代码的可维护性和可读性，减少运行时错误。
