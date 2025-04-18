### TypeScript和JavaScript的主要区别。

> javaScript的超集，支持Es6语法 支持面向对象编程的概念 类 接口继承范性


◦ 静态类型检查：提供了编译时的类型检查。这有助于在代码运⾏之前发现可能的错误。

◦ **类和接⼝**：TypeScript⽀持基于类的⾯向对象编程，并引⼊了接⼝。

◦ ES6+特性：TypeScript⽀持所有的JavaScript新特性，并且还包括⼀些额外的功能，如枚举（Enums）、泛型和命名空间。



TypeScript在构建⼤型或复杂的前端应⽤时特别受欢迎，因为它可以提⾼代码的质量和可维护性

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
   
     `Type Partial<T> = {[k in keyof T]?: T[K]}`
   - `Required<T>`、 变为必选属性
   
     `Type required<T> = {[K in keyof T]-?: T[k]}`
   - `Readonly<T>`、 变为只读属性
   
     `Type Readonly<T> = { readonly [K in keyof T]:T[K]}`
   - `Pick<T, K>`、  从T选取属性K
   
     `Type Pick<T, K extends keyof T> = { [P in K]: T[P]}`
   - `Omit<T, K>`    从T中移除属性K
   
     `Type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T,K>>`
   
4.  **工具类型**
   - `Exclude<T, U>`  从T中中移除可以赋值给类型 U 的部分
   
     **type** `Exclude<T,U>` = T **extends** U? `never:T`;
   
   - `Extract<T, U>` 从T中选取可以赋值给类型 U 的部分
   
     **type** `Extract<T,U>` = T **extends** U? `T:never`;
   
   - `NonNullable<T>` T 中排除 null 和 undefined
   
     `Type Nonullable<T> = T extends null | undefind ? never: T`;
   
   - `ReturnType<T>`  获取返回类型
   
     `Type ReturnType<T extends(...args:any) =>any > = T extends (...args: any) => infer R? R:never`
   
     `Parameters `以元组的方式获得函数的入参类型。
   
     `Type Parameter<T extends (...args:any)=> any> = T extends (...args:infer P) => any? P :never`
   
     `ConstructorParameters `以元组的方式获得构造函数的入参类型
   
     `Type constructorParamets <T extends new(...args:any)=> any> = T extends new (...args: infer R) => any ? R : never`
   
     `InstanceType `获得构造函数返回值的类型
   
     `type InstanceType <T extends new(..args:any) =>any > = T extends new(...args:any) => infer R ? R : never`
   
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
   
10. **ES6+ 特性**
    - `Promise`、`Async/Await`、`Generator`、`Decorator`、`Reflect` 等

### const 和readonly区别

- `const` 在 JavaScript 和 TypeScript 中都用于声明一个常量，其值不可更改。
- `readonly` 在 TypeScript 中用于声明类的属性或索引签名，表示这些属性或索引签名只能在声明时或构造函数中被赋值，之后不能被更改。

### typescript 语言在编译时如何实现变量的类型推导

在编译时实现变量的类型推导主要依赖于类型检查器。类型检查器会分析代码的结构和上下文，以确定变量、函数参数、返回值等的类型

1. 编译器对源代码进行语法分析，生成抽象语法树（AST）。
2. 类型检查器遍历 AST，对每个节点进行类型分析，包括类型推导、类型断言处理、类型守卫等。
3. 在类型分析的基础上，类型检查器对代码中的类型使用进行检查，确保类型兼容性。
4. 如果发现类型错误，类型检查器会生成错误信息，并在编译时报错。

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

应用：日期、角色

### 装饰器 @expression

 其实是 Object.defineProperty 的语法糖,需要在tsconfig.json⽂件启动，

可以装饰：

- 类 constructor构造器
- 属性/方法  traget对象原型、propertyKey方法的名称、descriptor方法的属性描述符
- 参数 traget对象原型、propertyKey参数的名称、index参数数组中的位置
- 访问器

### 范型的理解 `<>`

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

解决重名问题 在⼀个新的名字空间中可定义任何标识符，它们不会与任何已有的标识符发⽣冲突，因为已有的定义都处于其他名字空间中



### 命名空间和模块区别

- 命名空间：内部模块，主要用于组织代码，避免命名冲突
- 模块：ts的外部模块简称，侧重代码的重用，一个模块里可能有多个命名空间