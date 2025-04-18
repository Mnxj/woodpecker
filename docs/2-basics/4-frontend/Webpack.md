## 基本使用

webpack是一个`静态资源打包工具`

输出编译好的文件（bundle），放在浏览器可以直接运行

## 功能介绍

webpack本身功能有限

- 开发模式：仅能编译js中的`ES Module`语法
- 生产模式：能编译js中的`ES Module`语法，还能压缩JS代码

## 开始使用

### 1、资源目录

```js
// ./src/main.js
import count from './js/count'
import sum from './js/sum'

console.log(count(2,1))
console.log(sum(1,2,3,4))

//./src/js/sum.js
export default function count(x,y) {
    return x-y;
}
//./src/js/count.js
export default function sum(...args) {
    return args.reduce((p,c) => p+c,0)
}
//./public/index.html
<h1> hello webpack</h1>
<script src="../src/main.js"></script>
```

> 运行index.html 看不到log信息

### 2、打包

```shell
# init package.json
npm init -y

# install
npm i webpack webpack-cli -D

# build
npx webpack ./src/main.js --mode=development

#./public/index.html
  <script src="../dist/main.js"></script>
```

> 日志显示不过会有eval提示 ,dev环境仅能编译js语法，不能压缩

```shell
# 开发模式不会有eval提示
npx webpack ./src/main.js --mode=production 
```

### 基本配置

在开始使用 `webpack`之前，我们需要对`webpack`的配置有一定的认识。

#### 5大核心概念

1. Entry(入口) 提示webpack从哪个文件开始打包
2. Output（输出） 指示webpack打包完的文件输出到哪里去，如何命名等
3. Loader(加载器) webpack本身只能处理js\json等资源，其他资源需要借助loader,webpack才能解析
4. Plugin(插件) 拓展webpack的功能
5. Mode(模式) development, production

#### 准备Webpack配件文件

在项目根目录新建，webpack.config.js

> 是需要在node.js中运行的所以模块化都是common模块化

```js
const path = require("path")
module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"), //绝对路径
        filename: "main.js",
    },
    // 加载器
    module: {
        rules: [
       ]
    },
    plugins: [
    ],
    mode: "development",
}
```

#### 开发模式介绍

开发时使用的模式：

1. 编译代码，使浏览器能识别运行（样式、图片、字体，webpack默认都不能处理这些资源，所以我们要加载配置来编译这些资源）
2. 代码质量检查，树立代码规范

#### 开发模式介绍

开发时使用的模式：

1. 编译代码，使浏览器能识别运行（样式、图片、字体，webpack默认都不能处理这些资源，所以我们要加载配置来编译这些资源）
2. 代码质量检查，树立代码规范

### webpack 中chunkHash与contentHash区别

> 有效地控制文件的缓存行为，提高应用的加载速度和性能。

**含义**

- `chunkHash`: 基于整个 chunk 内容生成的哈希值,适用于`动态导入`的模块或`代码分割`生成的 chunk。使用 `import()` 动态导入一个模块时，这个模块会被放入一个单独的 chunk 中，
- `contentHash`: 基于文件内容生成的哈希值,适用于静态资源，这些资源通常不会在构建过程中发生变化， `contentHash` 可以确保它们的哈希值在内容不变的情况下保持不变。

**示例配置**

```js
module.exports = {
  // ...
  output: {
    //使用 [chunkhash] 或 [contenthash] 占位符来插入相应的哈希值。
    filename: '[name].[chunkhash].js',//
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  // ...
};
```

### webpack的loader和plugin

**Loader**:

- 本质上是一个函数
- 负责处理非 JavaScript 文件(如 CSS、图片、字体等)的转换
- 可以链式调用,从下往上，从右往左。
- `module.rules` 中定义。
- 常见 Loader:
    - `babel-loader`: 将 ES6+ 代码转换为 ES5
    - `css-loader`: 处理 CSS 文件
    - `file-loader`: 处理图片、字体等文件
    - `sass-loader`: 将 Sass 代码转换为 CSS

**Plugin**:

- 具有 `apply` 方法的 JS 对象。
- 可以访问 Webpack 完整的编译生命周期。
- 可以修改 Webpack 的各种配置选项。
- 解决 Loader 无法实现的其他自定义需求,如文件压缩、资源优化等。
- 在 `plugins` 数组中定义。
- 常见 Plugin:
    - `HtmlWebpackPlugin`: 自动生成 HTML 文件
    - `MiniCssExtractPlugin`: 将 CSS 从 bundle 中提取为单独的文件
    - `OptimizeCssAssetsWebpackPlugin`: 优化和最小化 CSS 资源
    - `webpack.HotModuleReplacementPlugin`: 开启模块热替换功能

### webpack遇到import是什么解析出来的

1. 遇到import会使用模块解析器，
2. 来解析 `import` 语句中的模块标识符，将其转换为模块的相对或绝对路径
3. 根据模块路径查找对应的模块文件。
4. 找到模块文件后加载并执行该模块的代码。
5. 加载模块的过程中，还会解析内部的 `import` 语句，递归地处理模块的依赖关系，并构建模块依赖图。
6. 最后，根据模块依赖图，将所有模块打包成一个或多个输出文件。

### vite与webpack的区别

1. **开发服务器**
    - **Vite** 利用浏览器原生的 ESM 支持,实现了即时热更新(HMR)。
    - **Webpack**使用 webpack-dev-server,需要进行打包才能提供开发服务。
2. **构建过程**
    - **Vite**采用 esbuild 进行打包,速度比 Webpack 快很多。Go 语言编写,编译速度很快。
    - **Webpack**采用 JavaScript 编写的 webpack,构建时间较长,特别是对于大型项目。
3. **依赖预构建**
    - **Vite** 使用 `esbuild` 进行预构建，将依赖的模块打包成单个文件，加快开发服务器的启动速度。
    - **Webpack** 每次构建时都需要重新解析和打包所有依赖项。
4. **配置复杂度**
    - **Vite**    配置相对简单,专注于开发和构建过程。
    - **Webpack** 配置更加复杂,需要处理更多的功能,如代码分割、懒加载等。
5. **插件生态**
    - **Webpack** 比**Vite** 有丰富的插件生态,可以满足更多的需。

### rollup和webpack区别

- **设计理念**：Rollup 专注于 ES6 模块的打包，而 Webpack 是一个更全面的模块打包器，支持多种资源和复杂的构建流程。
- **输出格式**：Rollup 支持多种输出格式，但更侧重于 ES 模块，而 Webpack 支持多种格式，包括 ES 模块、CommonJS 和 UMD 等。
- **适用场景**：Rollup 适合用于构建库和框架，而 Webpack 适合用于构建复杂的应用。

### 模块加载机制

1. 从配置文件确定入口
2. 分析入口模块及其依赖的其他模块，构建一个模块依赖图
3. 根据模块依赖图，按异步方式需加载所需的模块
4. 将所有模块打包成一个或多个文件。文件包含模块之间的依赖关系。
5. 在运行时,会根据模块的加载顺序，动态地加载和执行这些文件，会缓存对加载过的模块。

### AST了解吗

- 抽象语法树。它是编译器或解释器在编译或解释源代码时构建的中间表示形式。
- 每个节点表示源代码中的一个语法结构，节点之间的关系表示了源代码的语法结构和逻辑关系。
- 通过分析 AST可以做语法检查、代码优化、代码生成。

### AST怎么生成的

词法分析：词法分析器负责将源代码文本分解成一个个的词法单元（源代码的最小有意义的单元）

语法分析：语法分析器会检查是否语法规则，并构建出一棵树状结构，这棵树就是 AST。

### Babel是什么？它是如何⼯作的？

JavaScript编译器，它允许开发者使⽤最新的JavaScript代码（ES6+

```js
const square = (x) => x * x;

// Babel 转换过程:
// 1.  @babel/parser 将源代码解析成 抽象语法树AST


// 2. @babel/traverse 遍历 AST,并使用各种插件对 AST 进行转换和修改。(核心)
// AST => 转换后的 AST

// 3. @babel/generator 将修改后的AST转换回代码字符串,同时创建source map映射转换后的代码到原始代码。

var square = function square(x) {
  return x * x;
};
```

### babel 核⼼库有哪些？

1. @babel/core: 核⼼包，提包含了解析、转换和⽣成代码的主要功能。

2. @babel/cli: 命令⾏接⼝

3. @babel/preset-env: 智能预设，允许你使⽤最新的 JavaScript

4. babel-loader: webpack 插件，可以将 Babel 集成到 webpack 构建过程中，

5. @babel/plugin-transform-runtime: ⽤于复⽤ Babel 注⼊的辅助代码，

6. transform-remove-console 移除console

### babel配置

1.**预设（Presets）**：用于转换特定的语法。例如，`@babel/preset-env` 会根据目标环境自动确定需要哪些转换。`@babel/preset-react` 用于转换 JSX 语法。

2.**插件（Plugins）**：插件提供了更细粒度的转换控制。你可以单独添加插件来转换特定的语法或特性。例如，`@babel/plugin-proposal-class-properties` 用于转换类属性。

3.**缓存（Caching）**：Babel 提供了缓存功能，可以显著提高编译速度。在 `babel.config.js` 中，你可以通过 `api.cache(true)` 来启用缓存。

6.从 Babel 7.4.0 开始，推荐使用 `@babel/preset-env` 的 `useBuiltIns` 选项来自动引入 polyfills(`用于提供旧环境不支持的特性`)。

###  **babel-runtime 作用是啥？**

- **babel-runtime** 是一个 Babel 插件，用于将代码中的 ES6+ 语法（如 `Promise`、`Symbol`）转换为兼容性更好的 ES5 代码。
- **作用**：
    - 避免在每个文件中重复引入 polyfill，减少代码体积。
    - 通过模块化的方式引入 polyfill，避免全局污染。



### ESLint

静态代码分析⼯具，⽤于识别JavaScript代码中的模式和错误。它⾮常灵活，可以通过配置⽂件调整规则，使其适应特定项⽬的编码⻛格和质量标准。



基本配置步骤：

a. 安装ESLint：⾸先，在项⽬中安装ESLint：

```shell
npm install eslint --save-dev
```

a. 初始化配置⽂件：通过运⾏ eslint --init 命令⽣成⼀个配置⽂件。



b. 配置规则：在 .eslintrc ⽂件中，你可以定义⾃⼰的规则，例如错误级别、环境（浏览

器、Node.js等）、全局变量、插件和扩展。规则可以设置为 "off"（关闭）、"warn"（警告）

或 "error"（错误）。

c. 集成到构建过程：将ESLint添加到你的构建脚本中，可以使⽤ npm scripts 或其他任务运⾏器

来运⾏ESLint。





### Eslint 代码检查的过程

1. 配置：配置相关规则

2. 解析：当运⾏ ESLint 时，⽤⼀个解析器（如 espree ，默认的解析器）来解析代码，将代码转换成⼀个抽象语法树（AST）。会遍历该树。它会查找树的每个节点，检查是否有任何规则适⽤于该节点。在遍历过程中，如果发现违反了某项规则，ESLint 将记录⼀个问题

3. 报告：遍历之后，会⽣成⼀份报告。说明了它在代码中找到的任何问题。问题被分类为错误或警告。

4. 修复： ESLint 尝试⾃动修复。`editor[哎].codeActionOnSave{source.fixAll: true}`

5. 集成：可以集成到 IDE 中，可以在代码编写过程中即时提供反馈。也可以被集成到构建⼯具如 Webpack

### 什么是CSS预处理器？它解决了什么问题

- 可以像编程语言一样使用变量、函数、嵌套规则等，使 CSS 编写更具逻辑性和可维护
- **提高效率** 比如自动添加前缀等操作，节省手动添加的时间。
- **易于维护**：变量的修改可以快速反映到所有使用该变量的地方。
- **代码复用**：可以创建可复用的样式模块或函数。提高代码的利用率，避免重复劳动。

### sass预处理器

**变量**： $primary-color: #333;

**嵌套规则**：

**混合（Mixin）**@mixin @include

```scss
@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  border-radius: $radius;
}

div {
  @include border-radius(10px);
}
```

**函数**：@function @return

```scss
@function double($value) {
  @return $value * 2;
}
```

**计算**：

```scss
width: 100px + 20%;
```

**继承**： @extend

```scss
%button-style {
  padding: 10px;
}

.btn-primary {
  @extend %button-style;
  background-color: blue;
}
```

### less预处理

**变量**：@primary-color: #333;

**嵌套规则**

**混合（Mixin）**：

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
  border-radius: @radius;
}

div {
 .border-radius(10px);
}
```

**函数**

```less
.scale(@value, @factor) {
  @return @value * @factor;
}
```

**计算**：

```less
width: 100px + 20%;
```

**导入**：

```less
@import "other.less";
```



### less 和 sass 的区别

1.	语法：Less 的语法相对简单，容易学习和上手。Sass 相对复杂一些
2.	变量和常量：Sass  可以定义全局和局部变量，并进行复杂的计算和赋值。Less 也支持变量，但功能相对较简单。
3.	混合和扩展：Sass 提供了更丰富的混合和扩展功能，可以创建可重复使用的模块和扩展现有选择器的功能。Less 在这方面的功能相对较弱。
4.	函数：Sass 支持编写函数，可以对样式值进行处理和计算。Less 也可以使用一些内置函数，但功能相对较有限。

### Tree Shaking

> 摇树优化，是⼀种通过移除多于代码，来优化打包体积的， ⽣产环境默认开启。
>
> 可以在代码不运⾏的状态下，分析出不需要的代码
>
>
>
> 发生在webpack的优化阶段，

利⽤ es6模块 的规范

◦ ES6 Module静态分析，判断那些模块和变量未被使⽤或者引⽤，进⽽删除对应代码具。



注意：

- 使用 ES6 模块语法，更易于进行静态分析。
- 尽量避免在模块中创建全局副作用，例如修改全局变量或执行 DOM 操作，可能会影响 `Tree Shaking` 的结果。
- 明确的依赖关系，这样可以更容易地进行 `Tree Shaking`。



`webpack.config.js` 文件的 `optimization` 部分

- `usedExports`：表示只导出被使用的模块成员，从而实现 Tree Shaking。
- `sideEffects`：表示模块是否具有副作用。将其设置为 `false` 表示模块没有副作用，可以进行更彻底的 Tree Shaking

### webpack 离线缓存静态资源如何实现

Service Worker

```js
workbox-webpack-plugin` 和 `webpack-pwa-manifest
new WorkboxPlugin.GenerateSW({
      // 这些选项帮助 Service Worker 快速启用
      // 不允许遗留任何“旧的” Service Workers
      clientsClaim: true,
      skipWaiting: true,
    }),
    new WebpackPwaManifest({
      name: 'My Progressive Web App',
      short_name: 'MyPWA',
      description: 'My awesome Progressive Web App!',
      background_color: '#ffffff',
      theme_color: '#4DBA87',
      start_url: '/',
      display: 'standalone',
      icons: [
        {
          src: path.resolve('src/assets/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512], // 多尺寸图标
          destination: path.join('assets', 'icons'),
        },
      ],
     inject: true, // 默认值，将链接和图标标签插入到 <head> 中
    }),
  
  
  //注册
  
  if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
```

- 确保你的应用在 HTTPS 环境下运行，因为 Service Workers 只能在安全的上下文中工作。
- Service Workers 仅在支持 Service Workers 的浏览器中工作。
- 你可能需要在 `webpack.config.js` 中配置 `output.publicPath`，以确保 Service Worker 能够正确地缓存资源。
- 为了确保 Service Worker 能够正确地缓存资源，你可能需要在 `webpack-pwa-manifest` 插件中配置 `inject` 选项。



`inject` 选项可以接受以下值：

- `true`：默认值。将 Web 应用清单的链接和图标标签插入到 HTML 文件的 `<head>` 标签中。
- `false`：不自动注入任何内容到 HTML 文件中。你可能需要手动添加链接和图标标签。
- `'head'`：将 Web 应用清单的链接和图标标签插入到 HTML 文件的 `<head>` 标签中。
- `'body'`：将 Web 应用清单的链接和图标标签插入到 HTML 文件的 `<body>` 标签的末尾。

### 如何实现持久化缓存

• 服务端设置http缓存头 （cache-control）

• 打包依赖和运⾏时到不同的chunk， 即作为splitChunk,因为他们⼏乎是不变的

• 延迟加载 ：使⽤ import()⽅式 ，可以动态加载的⽂件，分到独⽴的chunk,以得到⾃⼰的chunkhash

• 保持hash值的稳定 ：编译过程和⽂件内通的更改尽量不影响其他⽂件hash的计算，对于低版本

### webpack的生命周期

初始化阶段

1. 从配置文件（默认为 `webpack.config.js`）或命令行参数中读取配置信息。
2. 根据配置信息创建 Compiler 实例，并负责整个打包过程。
3. 加载配置文件中指定的插件，并执行插件的 `apply` 方法，并绑定到 Compiler 实例上。

编译阶段

1. Compiler 实例开始编译，创建 Compilation 对象，代表一次特定的编译过程。
2. 从入口文件开始，递归地构建模块依赖图。每个模块都会根据配置的 Loader 规则进行转换。
3. 模块构建完成后，Webpack 会生成对应的代码块（Chunk）。

输出阶段

1. **输出资源**：根据配置的输出路径和文件名，将编译后的资源输出到指定目录。
2. **完成输出**：所有资源都已输出到指定目录，Webpack 打包过程结束。

### 生命周期钩子

- `entry-option`：在读取配置文件后，但在初始化 Compiler 之前触发。
- `after-plugins`：在所有内置插件和用户定义的插件被添加到 Compiler 后触发。
- `compiler.hooks.run`：在 Compiler 开始执行编译后触发。
- `compiler.hooks.compile`：在创建新的编译(compilation)对象时触发。
- `compilation.hooks.optimize`：在优化阶段开始时触发。
- `compilation.hooks.afterOptimizeAssets`：在优化阶段完成后触发。
- `compilation.hooks.processAssets`：在处理资源阶段触发。
- `emit`：在生成资源到输出目录之前触发。
- `done`：在完成所有编译过程后触发。

### tapable

一个小型的库，为 Webpack 提供hooks系统。

主要用途：

1. **插件系统**：可以创建自己的插件。
2. **模块化**：通过 `tapable`，Webpack 的编译过程被模块化为不同的阶段，每个阶段都可以通过钩子来扩展。使代码更加清晰和易于维护。
3. **性能优化**：允许开发者精确控制哪些部分需要执行，哪些可以跳过。

### tapable 的设计思路和实现原理是什么？

**设计思路**

`tapable` 的设计思路主要基于以下几点：

1. 提供一系列的钩子类，允许开发者在 Webpack 的不同编译阶段插入自定义逻辑，从而实现模块化和可插拔的设计。

2. 同步钩子、异步钩子、并行钩子等。

3. 通过钩子的机制，可以在编译过程中只执行必要的逻辑。



**实现原理**

`tapable` 的实现原理主要基于以下机制：

1. 每个钩子类都封装了注册回调函数和触发回调函数的逻辑。

2. 调用钩子对象的 `tap` 方法来注册回调函数。`tap` 方法接受两个参数：一个是回调函数的名称（可选），另一个是回调函数本身。

3. 当需要执行注册的回调函数时，开发者可以调用钩子对象的 `call`、`callAsync` 或 `promise` 方法

4. 执行回调函数，会根据钩子的类型来决定回调函数的执行方式。例如，对于同步钩子，回调函数会依次同步执行；对于异步钩子，回调函数可以是异步的，并且可以并行或串行执行。

5. 还支持钩子链的概念，即一个钩子可以触发另一个钩子，从而形成一个钩子链

```js
const { SyncHook } = require("tapable");
class MyWebpackPlugin {
  constructor(options) {
    // 可以接收插件选项
    this.options = options;
  }
  apply(compiler) {
    // 创建一个同步钩子
    const hook = new SyncHook(["compilation"]);
    // 注册一个回调函数到钩子
    hook.tap("MyPlugin", (compilation) => {
      console.log("MyPlugin: Compilation started!");
    });

    // 注册钩子到 Webpack 的生命周期
    compiler.hooks.compile.tap("MyPlugin", (compilation) => {
      hook.call(compilation);
    });
  }
}

module.exports = MyWebpackPlugin;
```



### Code splitting

它主要有以下几个好处：

- **提升加载速度**：将大型应用程序分割成多个较小的模块，在实际运行时仅加载当前页面或功能所需的代码，避免一次性加载所有代码，从而显著提高页面加载速度。
- **优化资源利用**：减少不必要的代码传输和内存占用。
- **更好的可维护性**：可以更清晰地组织和管理代码模块。

ES6 的 `import、Webpack 中可以通过配置来将不同路由对应的组件进行代码分割。这样，当用户访问特定路由时，才会加载对应的代码块。

### 如何配置webpack以允许更小的bundle大小

**代码分割** optimization => splitChunks: => chunks: 'all',

**压缩代码**：  optimization =>  minimize: true

**使用 Tree Shaking**：确保只打包实际使用的代码

**优化图片等资源**：使用合适的图片压缩工具和配置。

**启用缓存**：利用缓存来避免重复处理。

**分析 bundle 内容**：使用如 `webpack-bundle-analyzer['ænəˌlaɪzə]` 等工具来找出可以优化的部分。

**选择合适的模块加载器和插件**：有些可能有更高效的实现



### cdn原理

**分布式存储**：在多个地理位置部署了大量的服务器节点

**缓存机制**：当用户请求资源时，会首先检查本地节点是否有缓存的该资源。如果有，就直接提供，减少了数据传输的距离和时间，提高了访问速度。

**智能路由**：根据用户的地理位置、网络状况等因素，将用户的请求导向距离最近、网络状况最佳的节点，以确保数据能够快速、可靠地传输到用户。

**内容更新**：当网站或应用的内容发生更新时，源站会将更新信息推送到 CDN 网络，CDN 节点会及时更新缓存的内容。

**负载均衡**：将大量用户的请求分散到不同的节点上，避免单个服务器负载过高。

### webpack怎么配cdn引入资源

1. **使用 CDN URL 引用资源**

   ```js
   <!-- 在 HTML 文件中 -->
   <link rel="stylesheet" href="https://cdn.example.com/assets/style.css">
   <script src="https://cdn.example.com/assets/script.js"></script>
   // 在 JavaScript 文件中
   import React from 'https://cdn.example.com/assets/react.min.js';
   ```

2. **修改 Webpack 配置**：

```javascript
      output: {
        //相对路径引用资源，确保 publicPath 的设置不会影响这些路径。
         	publicPath: 'https://cdn.example.com/assets/', 
   		},
     
```

3. 配置 HTML 插件

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   
   module.exports = {
      // ...其他配置
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
          publicPath: 'https://cdn.example.com/assets/',
        }),
      ],
      // ...其他配置
   };
   ```



### 如何用webpack从0到1搭建一个React项目

1. 创建项目目录并初始化 `npm`：

```plaintext
   mkdir my-react-project
   cd my-react-project
   npm init -y
```

1. 安装必要的依赖：

```plaintext
   npm install --save react react-dom
   npm install --save-dev webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react
```

1. 创建 `webpack.config.js` 文件：

```javascript
   const path = require('path');

   module.exports = {
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'bundle.js',
     },
     module: {
       rules: [
         {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use: 'babel-loader',
         },
       ],
     },
     resolve: {
       extensions: ['.js', '.jsx'],
     },
   };
```

1. 创建 `.babelrc` 文件并配置：

```json
   {
     "presets": [
       "@babel/preset-env",
       "@babel/preset-react"
     ]
   }
```

1. 创建 `src` 目录，并在其中创建 `index.js` 文件：

```javascript
   import React from 'eact';
   import ReactDOM from 'eact-dom';

   ReactDOM.render(<h1>Hello, React!</h1>, document.getElementById('root'));
```

1. 创建 `index.html` 文件在项目根目录：

```html
   <!DOCTYPE html>
   <html lang="en">

   <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
   </head>

   <body>
     <div id="root"></div>
   </body>

   </html>
```

1. 运行 `webpack` 进行打包：

```plaintext
   npx webpack
```



### 如果解决重复引⽤ node_modules ⾥⾯的不

- resolve.alias 配置项将它们指向同⼀个模块
- ⽤ webpack 的 ProvidePlugin 插件，将需要共享的模块注⼊到全局作⽤域中，这样就可以在不同模块中共享相同的依赖库
- resolve.modules 配置选项，将 node_modules ⽬录移动到项⽬根⽬录之外，

### webpack 是如何给 web 应⽤注⼊环境变量的， 原理是啥

- DefinePlugin 使用process.env

- dotenv-webpack 环境变量文件

- ### `cross-env` 在script命令中

### webpack热更新原理是什么？

1. **编译器（Compiler）**：Webpack 编译器在编译过程中生成一个 HMR 更新的清单。包含模块的 ID 和更新后的哈希值。
2. **运行时（Runtime）**：HMR 运行时被注入到入口文件中。负责与编译器通信，接收，并根据清单中的信息来决定哪些模块需要更新。
3. **模块更新**：当检测到模块更新时，会请求编译器提供更新后的模块代码。编译器会将更新后的模块代码发送给运行时。
4. **模块替换**：接收到更新后的模块代码后，会使用一种策略来替换旧模块。对于 CSS 模块，通常可以直接替换样式表。对于 JavaScript 模块，运行时会尝试使用一种热替换逻辑来更新模块。
5. **通知应用**：会通知应用哪些模块被更新了，可以在这个过程中添加自定义逻辑来处理模块更新。

### 异步加载原理是啥

- 使⽤动态 import: import().then

- require.ensure(,()=> ) 异步加载模块并将其放置到指定的 chunk 中

- bundle-loader: 将模块放置到⼀个单独的⽂件中，按需加载。



**webpack如何实现动态加载**

当 Webpack 打包代码时，遇到动态导⼊语句时不会将其打包进⼊主⽂件，⽽是将其单独打

包为⼀个新的⽂件。在运⾏时，当需要加载，会通过⽹络请求动态加载该⽂件。

可以减⼩主⽂件的体积，提高加载速度，

同时，Webpack 还可以对动态加载的⽂件进⾏代码分割和按需加载，进⼀步优化⻚⾯的性

能。,import()函数进⾏动态导⼊；⽽在不⽀持动态导⼊的浏览器中，需要使⽤ Webpack 提供的

require.ensure 或 require.include 等⽅法进⾏模块的异步加载



### require有什么性能问题

1. **同步阻塞**：在传统的 CommonJS 中，`require` 执行是同步的，如果一个模块的加载时间较长，可能会阻塞后续代码的执。
2. **大量模块加载时的开销**：当有大量模块频繁地进行 `require` 操作时，可能会产生一定的性能开销，特别是在一些复杂的应用场景中。

### require会把加载过的模块缓存在内存，说说这会导致什么问题

**内存占用**：如果有大量不常使用的模块被缓存，可能会逐渐占用较多内存，尤其是在长时间运行的应用中。

**版本冲突**：不同地方多次加载同一个模块，但期望的是不同版本，由于缓存机制可能会导致始终使用首次加载的版本，而不是期望的特定版本，从而引发不一致问题。

### requires加载原理

![image-20240613121213216](/Users/clover/Library/Application Support/typora-user-images/image-20240613121213216.png)

### import和require的区别

**语法**： `import` 是 ES6 引入的模块导入语法 `require` 是在 CommonJS 规范中使用的。

**静态与动态**： `import` 是静态的，在编译时确定模块的依赖关系。`require` 在运行时动态加载模块。

**异步特性**： `import` 值的引用。 `require` 值的拷贝。 模块内部变化会影响到import

### require引入的模块能做到摇树嘛

`require`是 CommonJS 模块系统中的引入方式，它是动态的，在运行时加载模块，不支持静态分析，因此无法进行摇树优化。

### Webpack proxy

```js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 代理到的服务器地址
        pathRewrite: {'^/api' : ''}, // 重写路径，去除请求中的 '/api'
        changeOrigin: true, // 允许改变请求头中的 host
      },
    },
  },
};
```

### 代理的原理

工作流程：

1. 浏览器向代理服务器发送请求。
2. 代理服务器接收到客户端的请求后，根据配置的规则决定如何处理这个请求。
3. 将请求转发到目标服务器。
4. 目标服务器处理请求并返回响应给代理服务器。
5. 代理服务器接收到目标服务器的响应后，可能会对响应进行处理后返回给客户端。

类型：

- **正向代理**：用于客户端，配置代理服务器的地址，通过代理服务器访问外部网络。可以隐藏客户端的真实 IP 地址，实现匿名访问。
- **反向代理**：用于服务器端，客户端直接访问反向代理服务器，反向代理服务器根据请求的 URL 路径将请求转发到后端服务器。反向代理可以实现负载均衡、缓存、安全过滤等功能

### 组件库如何按需加载

1. **使用 ES6 模块和动态导入**：利用 ES6 的模块系统和动态导入（`import()`）功能。
2. 使用 Webpack 的代码分割功能，可以将组件库拆分成多个块。
3. **组件懒加载**
4. **使用路由懒加载**。
5. `babel-plugin-import` 插件可以将组件的导入转换为按需加载的形式。

### import {button} from 'antd' 打包的时候只打包button分模块加载怎么做到的

```javascript
1.按需引入button,然后二次加工
2.import()引入
3.webpack做一些配置
   module.exports = {
...
     output: {
       ...
       chunkFilename: '[name].[chunkhash].js',
     },
     // 其他配置...
     optimization: {
       splitChunks: {
         chunks: 'all',
         name: 'button',
       },
     },
   };
```

### 使import时，webpack对node_modules的依赖会做什么

1. 对于 `node_modules` 中的模块，Webpack 会按照模块的名称和版本进行查找。
2. **模块打包**：如果找到对应的模块，Webpack 会将其打包到最终的输出文件中。



### webpack分包策略

1. **入口点分割（Entry Points）**：通过配置多个入口点，Webpack 会为每个入口点生成一个独立的包。
2. **动态导入（Dynamic Imports）**：使用 `import()` 语法动态导入模块，Webpack 会自动将这些模块分割成单独的包。这种方式适用于按需加载功能或组件。
3. **SplitChunksPlugin**：可以自动分割公共模块、按需加载的模块等。
    1. splitChunks中的`cacheGroups` 对象用于定义不同的缓存组。定义了一个名为 `commons` 的缓存组，它将所有被至少两个块引用的模块提取到一个名为 `commons` 的公共块中。
    2. Webpack-merge

应用场景

1. **按需加载（Lazy Loading）**：对于大型应用，用户可能不需要立即访问所有功能
2. **并行加载（Parallel Loading）**：将应用分割成多个包，可以并行加载这些包，从而减少加载时间。
3. 公共库提取（Vendor Splitting）
4. **代码分割优化（Optimization）**：通过分包，可以减少主包的大小，提高应用的加载速度。

### webpack怎么生成的hash码

ouput的filename设置[contenthash]站位，webpack默认使用md4生成哈希码，然后痛使用哈希码替换，

或者使用hashDigest改变算法，hex是md5,hashDigestLength设置生成的hash长度

### webpack打包是hash码如何生成的？

Webpack 打包时生成的 hash 码是通过文件内容计算得出的。可以使用 `[hash]`、`[chunkhash]` 或 `[contenthash]` 来生成不同的 hash。

```javascript
output: {
    filename: '[name].[contenthash].js',
    path: __dirname + '/dist'
}
```

### 

### sideEffects 是如何辅助 webpack 进⾏优化的？

Webpack会检查模块的 sideEffects 字段。如果⼀个模块具有 sideEffects 字段，并且设置为 false ，Webpack会认为该模块没有副作⽤。Webpack会在摇树优化过程中将未使，⽤的导出从该模块中删除，因为它不会影响项⽬的功能



### 如何打包运⾏时 chunk，且在项⽬⼯程中，如何去加载这个运⾏时chunk ?

**打包运⾏时**chunk的⽅式可以通过optimization.runtimeChunk：single

**加载运⾏时chunk有两种⽅式**:

- 通过script标签加载：可以使⽤HtmlWebpackPlugin插件来⾃动将运⾏时chunk添加到 HTML ⽂件中。 运⾏时chunk（'runtime'）和其他的业务代码chunk（'app'）
- 通过import语句动态加载

### ts 编写的库， 在使⽤ webpack 构建的时候，如何对外提供 d.ts

- **配置 TypeScript 编译选项**:tsconfig.json -> declaration : 告诉 TS 编译器为每个 .ts ⽂件⽣成相应的 .d.ts

  声明⽂件。declarationDir : 这是指定声明⽂件的输出⽬录。

- **配置Webpack**： output -> libraryTarget: "umd",  package.json ⽂件中包含 types 或 typings 字段指向⼊⼝ .d.ts ⽂件

### .d.ts

为 JavaScript 库提供类型信息，使得这些库可以在 TypeScript 项目中被类型安全地使用

###  配置代码太多，达到数千⾏，这个时候该如何优化配置代码

- 将配置⽂件分成多个部分，每个⽂件只负责⼀部分逻辑
- 通过环境变量来区分不同的配置环境
- 将常⽤的 loader、plugins、entry 等配置项封装成函数或者模块
- 使⽤ webpack-merge 抽离通⽤配置
- 统⼀管理插件和加载器

### 你⽤过哪些可以提⾼效率的插件？

• webpack-dashboard：展⽰相关打包信息。

• webpack-merge：提取公共配置

• HotModuleReplacementPlugin：模块热替换

• webpack.ProgressPlugin：打包进度分析

• webpack-bundle-analyzer：打包结果分析

• speed-measure-webpack-plugin：分析出打包过程中 Loader 和 Plugin 的耗时。

• size-plugin：监控资源体积变化，尽早发现问题

• friendly-errors-webpack-plugin： 代码源码编译报错友好提⽰

### 如何提取复⽤代码给多个 entry 使⽤？

```js
module.exports = {// ...其他配置...
 	optimization: {
 		splitChunks: {
 			chunks: "all", // 对所有的 chunk 有效，包括异步和⾮异步 chunk
 			cacheGroups: {
 			commons: {
 				name: "commons", // 提取出来的⽂件命名为 'commons.js'
 				chunks: "initial", // 提取出的 chunk 类型，'initial' 为初始
				//chunk，'async' 为异步 chunk，'all' 表⽰全部 chunk
 				minChunks: 2, // 模块被引⽤>=2次，便分割
 				minSize: 0, // 模块的最⼩体积
        ...
 };
```

### externals 作⽤是啥

指定在打包时需要排除掉的模块。

### 对 AMD（异步模块定义） 和 CMD（通用模块定义） 理解？

用于define.定义模块和模块之间的依赖关系，以便于模块化开发

区别

- **依赖声明**：AMD 需要在模块定义时声明所有依赖，而 CMD 根据需要动态加载依赖。
- **加载时机**：AMD 强调依赖的预加载，而 CMD 强调依赖的延迟加载。
- **模块导出**：在 AMD 中，模块的导出值是通过返回值来定义的，而在 CMD 中，模块的导出值是通过 `exports` 对象或 `module.exports` 来定义的。

### esm怎么引入 commonsjs

```js
//直接食用import
import fs from 'fs'; // CommonJS模块
//该模块没有默认导出，你可以使用import()
const module = await import('module-name'); // CommonJS模块
```

### commonsjs怎么引入esm

```js
// 假设你有一个ESM模块 'my-esm-module.mjs'
const myEsmModule = await import('my-esm-module.mjs');

// 使用导入的模块
console.log(myEsmModule.default); // 如果模块有一个默认导出
```

webpack怎么同时使用这俩？

```js
package.json：如果你的项目中同时存在 CommonJS 和 ESM 模块，你可能需要在 package.json 中设置 "type": "module"
//import() 来动态导入 ESM 模块。
async function loadModule() {
  const module = await import('./my-esm-module.mjs');
  // 使用模块
}
//Webpack 会自动处理 CommonJS 模块，无需额外配置
```

### HappyPack组件共享进程设置

它通过将任务分解给多个子进程并发执行来加速 JS 的加载和编译过程步

1. 安装

   ```bash
   npm install --save-dev happypack
   # 或者
   yarn add happypack --dev
   ```

2. **引入 HappyPack**：

   ```javascript
   const HappyPack = require('happypack');
   ```

3. **创建共享进程池**：
   使用 HappyPack 的 `ThreadPool` 方法创建一个共享进程池。进程池的大小通常设置为 CPU 核心数：

   ```javascript
   const os = require('os');
   const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
   ```

4. **配置 HappyPack 插件**：
   在 webpack 的 `plugins` 数组中添加 HappyPack 插件实例。你需要为每种文件类型指定一个唯一的标识符（id），并配置相应的 loader：

   ```javascript
   plugins: [
     new HappyPack({
       id: 'js', // 用于标识当前 HappyPack 实例处理的文件类型
       loaders: ['babel-loader?cacheDirectory'], // 指定 loader
       threadPool: happyThreadPool, // 使用共享进程池
       verbose: true, // 允许 HappyPack 输出日志
     }),
     // 可以添加更多 HappyPack 实例，每个实例处理不同类型的文件
   ]
   ```

5. **修改规则以使用 HappyPack**：
   在 webpack 的 `module.rules` 配置中，将需要 HappyPack 处理的文件类型的 loader 替换为 `happypack/loader`，并指定相应的 id：

   ```javascript
   module: {
     rules: [
       {
         test: /\.js$/, // 匹配 .js 文件
         use: ['happypack/loader?id=js'], // 使用 HappyPack 处理 .js 文件
         include: path.resolve('src'), // 指定需要处理的目录
         exclude: /node_modules/, // 排除 node_modules 目录
       },
     ]
   
   ```

HappyPack 的使用在 Webpack 5 中已被 `thread-loader` 所取代。

### 如何使用thread-loader？

`thread-loader` 可以用来实现类似 HappyPack 的多线程处理功能。`thread-loader` 会将特定的 loader 放置在一个单独的 Node.js 进程中运行。

以下是使用 `thread-loader` 的基本步骤：

1. **安装 thread-loader**：
   通过 npm 或 yarn 安装 `thread-loader`：

   ```bash
   npm install --save-dev thread-loader
   # 或者
   yarn add thread-loader --dev
   ```

2. **配置 thread-loader**：

   ```javascript
   const path = require('path');
   
   module.exports = {
     // ...
     module: {
       rules: [
         {
           test: /\.js$/,
           include: path.resolve('src'),
           exclude: /node_modules/,
           use: [
             {
               loader: 'thread-loader',
               options: {
                 // 传递给 worker 的选项
                 // 例如，可以设置 worker 的数量
                 workers: require('os').cpus().length,
               },
             },
             'babel-loader',
           ],
         },
         // 其他规则...
       ],
     },
     // ...
   };
   ```

   适用于计算密集型的 loader，如 `babel-loader`、`ts-loader` 等。对于一些轻量级的 loader，使用 `thread-loader` 可能不会带来明显的性能提升，甚至可能会因为进程间通信的开销而降低性能。

### **如何清理源码里面没有被应用的代码，主要是 JS、TS、CSS 代码？**

- **使用工具**：
    - **ESLint**：检测未使用的变量和函数。
    - **Webpack**：通过 `Tree Shaking` 移除未使用的代码。
    - **PurgeCSS**：移除未使用的 CSS 代码。

### Webpack 构建速度优化是怎么做的,给一些方案，umi/max

1. webpack4使用拆包缓存优化。

- Webpack-bundle-analyzer分析 pnpm run analyze

- 在于`optimization.splitChunks.cacheGroups.vendors`，它的作用是告诉webpack，只要是在`/node_modules`目录下，被引用次数大于等于2次的模块，全都打包到一个叫*vendors*的文件中，而不是像之前那样，被打包到不同的页面文件中。

这样我们就实现了把公共依赖提取到一个单独的文件，以供其他页面引用的目的。

之后，不要忘了在`chunks`配置中加上我们刚刚抽离出来的*vendors*文件。`chunks`代表初始加载时需要加载的文件。*vendors*包含了所有的第三方库，所以初始加载时肯定是需要的

减小1mb;

```js
chainWebpack: function (config, { webpack }) {
    config.merge({
      minimize: true,
      optimization: {  //webpack配置
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          minChunks: 2,
          cacheGroups: {
            vendors: {
              name(module) {
                const reg = /(echarts|zrender|brace|react-json-view)/;
                if (reg.test(module.identifier())) {
                  const [chunkName] = reg.exec(module.identifier()) || [];
                  return `npm.${chunkName}`;
                };
                return 'vendors';
              },
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    }); 
```

2. webpack 5

默认开启webpack 5中[cache](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fcache%2F%23root)特性，对提升打包速度也很有帮助。

*umi.js*中的第三方依赖，即`/node_modules`目录下的模块，通过`optimization.splitChunks`是拆不出来的，

*umi.js*中包含了多个几乎不更新的第三方依赖，但是当我们更改代码，重新打包，*umi.js*的hash值经常会变化。这就导致了一旦我们发布新版本，用户访问网站，需要重新下载*umi.js*里这些其实并没有发生更新的依赖。

项目必需，又很少更新的第三方库，比如：`antd` / `moment` / `react` / `react-dom`

3. externals

- `externals`用于将一些第三方库排除出打包过程，不出现在最终的打包结果中。再通过其他方式引入它们，比如`<script>`标签引入。

- `externals`的值是一个对象，其中`key`的值是第三方库的名字，`value`的值是通过`<script>`标签引入的全局变量的名字。
-  我们把`antd` / `moment` / `react` / `react-dom` / `xlsx`全部配置到`externals`中，并通过cdn引入它们。这样，就可以实现把它们排除出*umi.js*。每次更新、发布新版本，如果用户之前访问过，有缓存，就不需要重新下载它们了。

```js
import * as antd from 'antd';
import _ from 'lodash';

let externalsAntd = {};
for (const key in antd) {
  if (Object.hasOwnProperty.call(antd, key)) {
    externalsAntd[`antd/es/${_.kebabCase(key)}`] = `antd.${key}`;
  }
};

const config = {
  //...other umi config
  externals: {
    react: 'React',
    moment: 'moment',
    xlsx: 'XLSX',
    'react-dom': 'ReactDOM',
    'moment/locale/zh-cn': 'moment.locale',
    ...externalsAntd,
  },
  styles: ['https://cdnjs.cloudflare.com/ajax/libs/antd/4.23.6/antd.min.css'],
  scripts: [
    'https://cdnjs.cloudflare.com/ajax/libs/react/16.14.0/umd/react.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.14.0/umd/react-dom.production.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/antd/4.23.6/antd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/locale/zh-cn.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js',
  ],
};
```

虽然*umi.js*的体积有了明显地降低，但是实际上用户首次访问网站需要加载的文件体积不会减少，甚至还有可能会增加。这是**因为`externals`配置的第三方库，通过cdn引入，是不经过webpack打包的，自然就不支持webpack的tree-shaking。**   所以对于那些可以通过`optimization.splitChunks`单独拆分出来的、支持tree-shaking的依赖，就不建议配置到`externals`了。

即使首次访问加载的文件体积没有减少，但通过cdn引入的依赖，我们之后每次发布新版本，用户都无需再重新下载依赖文件。这是我们配置`externals`的目的所在。

4、runtimeChunk

如果修改了这个页面的代码，重新打包。会发现*umi.js*和*Tracking_detail.js*的hash值都会改变。这就导致，我们虽然只修改了一个页面的代码，却需要重新下载*umi.js* + *Tracking_detail.js*。

这是因为默认情况下，*umi.js*包含整个应用的[runtime和manifest](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fconcepts%2Fmanifest%2F%23runtime)，`runtime和manifest`包含了打包后的带有hash值的文件名。所以只要有一个文件的hash值改变，都会导致*umi.js*的内容及其hash值的更新，进而导致用户缓存的*umi.js*失效，需要重新下载。

如果我们可以把`runtime和manifest`抽离成单独的文件，每次更改单个页面的代码，就只需要重新下载对应页面的js文件 + 小小的*runtime.js*，并使用缓存的*umi.js*了。

抽离`runtime和manifest`需要用到webpack的`optimization.runtimeChunk`，具体配置如下：

```js
{
  //...other umi config
  chunks: ['runtime~umi', 'vendors', 'umi'],  //添加'runtime~umi'
  chainWebpack: function (config, { webpack }) {
    config.merge({
      optimization: {
        runtimeChunk: true,  //添加runtimeChunk
        splitChunks: {
          //...splitChunks config
        },
      },
    });
  },
};
```

5.开启gzip压缩 （Gzip 压缩通常适用于未经过压缩的资源）

需要Nginx开启Gzip属性

```js
npm install compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// 开启gzip压缩
config.plugin('CompressionPlugin').use(
  new CompressionWebpackPlugin({
    test: /.(js|css)$/,
    threshold: 10240, // 超过10kb的文件就压缩
    deleteOriginalAssets: false, // 不删除源文件
    minRatio: 0.8,
  }),
);

```

6. esbuild
7. mfsu: {},   *// 有缓存时启动 1s+，热更新平均 500ms 内*

8.npx turbo run build --concurrency 4 turbo并行打包