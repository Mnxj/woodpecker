### Main differences between TypeScript and JavaScript

> A superset of JavaScript that supports ES6 syntax and OOP concepts: class, interface, inheritance, generics.


◦ Static type checking — compile-time type checking. Helps catch errors before code runs.

◦ Also adds features like enums, generics, and namespaces.

### Types

1. **Primitive types** — 9 of them
    - `number`, `string`, `boolean`, `void`, `null`, `undefined`
    - `never` — a value that never occurs (e.g. functions that throw or loop forever)
    - `unknown` — an "unknown" type, safer than `any`
    - `any` — disables TS type checking

2. **Compound types**
    - `Array<T>`, `Tuple`, `Enum`, `Interface`, `Type`, `Class`, etc.

3. **Advanced types**

    - `Partial<T>` — make all properties optional

      `type Partial<T> = { [K in keyof T]?: T[K] }`
    - `Required<T>` — make all properties required

      `type Required<T> = { [K in keyof T]-?: T[K] }`
    - `Readonly<T>` — make all properties readonly

      `type Readonly<T> = { readonly [K in keyof T]: T[K] }`
    - `Pick<T, K>` — pick keys K from T

      `type Pick<T, K extends keyof T> = { [P in K]: T[P] }`
    - `Omit<T, K>` — remove keys K from T

      `type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>`

4.  **Utility types**
- `Exclude<T, U>` — remove from T anything assignable to U

  `type Exclude<T, U> = T extends U ? never : T;`

- `Extract<T, U>` — extract from T anything assignable to U

  `type Extract<T, U> = T extends U ? T : never;`

- `NonNullable<T>` — exclude `null` and `undefined` from T

  `type NonNullable<T> = T extends null | undefined ? never : T;`

- `ReturnType<T>` — get a function's return type

  `type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never`

  `Parameters` — get a function's parameters as a tuple

  `type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never`

  `ConstructorParameters` — get a constructor's parameters as a tuple

  `type ConstructorParameters<T extends new (...args: any) => any> = T extends new (...args: infer R) => any ? R : never`

  `InstanceType` — get a constructor's instance type

  `type InstanceType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : never`

  Nested array type: `type NestedArray<T> = T | NestedArray<T>[]`

    18. ```typescript
         type NestedArray<T> = T | NestedArray<T>[];
         ```



5. **Declaration files**

    - `declare var` — declare a variable's type only (no memory allocation, no implementation)
    - `declare function`
    - `declare class`
    - `declare namespace`, etc.

6. **Decorators**
    - Class decorators
    - Property decorators
    - Method decorators
    - Parameter decorators

7. **Module system**
    - `import`, `export`, `namespace` (organize and encapsulate related code), `module`

8. **Compiler config**
    - `tsconfig.json` and its various compiler options

9. **Utilities**
    - `typeof`, `instanceof`, `as`, `!`, `?:`, etc.

### Difference between `const` and `readonly`

- `const` — both JS and TS — declares a constant whose value can't be changed.
- `readonly` — TS only — marks properties or index signatures so they can only be assigned at declaration or in the constructor; not changeable afterward.

### How does TypeScript do type inference at compile time?

1. The `compiler` parses source code into an AST.
2. The `type checker` walks the AST and analyzes the type of each node.
3. With type analysis, the checker verifies type compatibility throughout the code.
4. If a type error is found, the checker emits a compile-time error.

### type

Advanced types:

- Intersection `&`

  ```ts
  // Combine multiple types into a new type with all properties
  type IntersectionType = { a: number } & { b: string };
  let myIntersection: IntersectionType = { a: 1, b: 'hello' };
  ```

- Union `|`

  ```ts
  type UnionType = string | number;
  let myUnion: UnionType = 'hello'; // or myUnion = 1;
  ```

- Type aliases — use `:` to declare a type alias

  ```js
  type GenericType<T> = {
    value: T;
    doSomething: () => void;
  };
  // Use a generic type alias
  let myGeneric: GenericType<string> = {
    value: 'Hello',
    doSomething: () => console.log('Do something with the value'),
  };
  ```

- Mapped types

  ```ts
  // Mapped types let you build new types based on existing ones by walking properties.
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };

  type ReadonlyString = Readonly<{ name: string }>;
  ```

- Conditional types

  ```ts
  // Conditional types choose different types based on type-check results.
  type IsString<T> = T extends string ? true : false;
  type Result = IsString<'hello'>; // true
  ```



### Enums (`enum`)

Can be numeric, string, or heterogeneous.

Use cases: dates, roles, filter types.

### Decorators (`@expression`)

Essentially syntactic sugar for `Object.defineProperty`. Must be enabled in `tsconfig.json`.

Can decorate:

- Classes — constructor
- Properties/methods — `target` (prototype), `propertyKey` (name), `descriptor`
- Parameters — `target` (prototype), `propertyKey` (name), `index` (position)
- Accessors

### Generics `<>`

Can be used with interfaces, functions, classes, index types, and type constraints.

### Generics in TypeScript — purpose and common use cases

Purpose:

1. Catch type errors at compile time, not runtime — avoids type mismatches.
2. Lets functions, interfaces, or classes handle multiple types of data without duplication.

Use cases:

- Functions

> Can accept any type of argument when called.

```typescript
function identity<T>(arg: T): T {
   return arg;
}

let output = identity<string>("myString"); // explicit type
let output = identity("myString"); // TS infers automatically
```

- Interfaces

> Can be implemented for specific types.

```typescript
interface GenericIdentityFn<T> {
   (arg: T): T;
}

function identity<T>(arg: T): T {
   return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

- Classes

> Specify the type when creating instances.

```typescript
class GenericNumber<T> {
   zeroValue: T;
   add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

- Generic constraints

> Constrain what a generic must satisfy.

```typescript
interface Lengthwise {
   length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
   console.log(arg.length);  // now we know arg has a length
   return arg;
}
```

- Generic utility types

Generic utility types like `Partial<T>`, `Readonly<T>`, `Pick<T, K>` create new types based on existing ones.

```typescript
interface Todo {
   title: string;
   description: string;
   completed: boolean;
}

type PartialTodo = Partial<Todo>;
// PartialTodo is { title?: string; description?: string; completed?: boolean; }
```



### Namespaces

`Avoid name collisions`.

You can define any identifier in a new namespace without colliding with existing ones.



### Namespace vs module

- Namespace — internal modules, mainly for organizing code and avoiding name collisions
- Module — TS's term for external modules; emphasizes code reuse. A module can contain multiple namespaces.

### `typeof` output for objects

- For `object`, `typeof` returns `'object'` — `typeof []`, `typeof {}`, `typeof null` all return `'object'`.

**Ways to check types**:

- `instanceof` — check if an object is an instance of a constructor
- `Object.prototype.toString.call` — get an object's internal type tag
- `typeof` — basic type check returning a type string

### `instanceof` vs `typeof`

1) `typeof` checks a variable's type — handles `number`, `undefined`, `symbol`, `string`, `function`, `boolean`, `object`. Special case: `typeof null === 'object'`.

2) `instanceof` checks whether an object's prototype chain includes a constructor's prototype.

### TypeScript's `infer`

`infer` is used inside conditional types to extract a type from context.



### Difference between type assertion and type conversion

- **Type assertion**: tells the compiler the type of a value without changing its actual type.
- **Type conversion**: changes the value's type at runtime.

### Why use TypeScript

TypeScript provides static type checking, improving maintainability and readability and reducing runtime errors.
