> 一个新的 web 框架，由 Express 原班人马打造，致力于成为一个`更小、更富有表现力、更健壮`的 web 框架。

- 可以避免`重复繁琐`的回调函数嵌套，并极大地提升`错误处理`的效率。
- 不在`内核方法`中绑定任何`中间件`，它仅仅提供了一个轻量优雅的函数库，使得编写 Web 应用得心应手。

### 洋葱模型解释

Koa 中的中间件机制的工作方式。它的核心思想类似于洋葱的层层剥离，

1. **请求的进入顺序**：请求进入服务器时，按照中间件的顺序从外层到内层逐个执行。
2. **响应的返回顺序**：响应离开服务器时，按照中间件的顺序从内层到外层逐个执行。



### 中间件的实现

每个中间件函数接收两个参数：

- `ctx`：Koa 的上下文对象，包含请求和响应的所有信息。
- `next`：一个函数，表示调用下一个中间件。

### `koa-static`

在服务器接到请求时，帮我们处理静态⽂件

### `koa-bodyparser`

用于解析请求体中的数据。

app.use(bodyParser());你只需要在其他中间件之前调用它，

会自动解析它，JSON,URL,表单，将解析后的js对象数据挂载到 `ctx.request.body` 上。

### koa错误处理

- 当使用 `ctx.onerror` 时，如果错误被处理了（即错误没有被重新抛出），则不会触发 `app.on('error', fn)`。
- 如果错误没有被 `ctx.onerror` 处理，它会冒泡到 `app.on('error', fn)`。
- 在 `app.on('error', fn)` 中处理错误时，你应该避免再次抛出错误，因为这会导致无限循环。

```js
// 错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    // 不要在这里调用 ∗∗∗.emit('error', err, ctx);
    // 因为 ctx.onerror 已经处理了错误
  }
});

// 错误监听器
app.on('error', (err, ctx) => {
  console.error('server error', err);
  // 可以在这里记录错误日志
  // 或者发送错误通知
});
```

- **错误处理中间件的顺序**：错误处理中间件应该放在中间件堆栈的最后，这样它们才能捕获到前面中间件中抛出的错误。
- **错误处理的完整性**：确保你的应用中所有的错误都被适当地捕获和处理，避免未处理的错误导致应用崩溃。
- **错误日志记录**：在生产环境中，应该记录错误日志，以便于问题的追踪和调试。

### Express错误处理

```js
//异步错误处理
//在处理异步操作时，如果在异步函数中发生错误，你需要使用 next 函数将错误传递给错误处理中间
app.get('/async', async (req, res, next) => {
  try {
    // 异步操作
    await someAsyncFunction();
  } catch (err) {
    next(err); // 将错误传递给错误处理中间件
  }
});

//基本错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//使用第三方错误处理库
const errorhandler = require('errorhandler');
const port = process.env.PORT || 3000;

app.use(errorhandler());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```



### express和koa区别

- **中间件系统**：Express 和 Koa 都使用`中间件`系统来处理`请求`和`响应`。Express 的中间件系统非常成熟，提供了大量的中间件来处理各种任务。Koa 的中间件系统更加简洁，
- **错误处理**：Express 的错误处理机制是通过`中间件`来实现的，开发者需要在中间件链中添加`错误处理中间件来捕获和处理错误`。Koa 的错误处理机制更加灵活，它允许开发者在任何地方使用 `try/catch` 语句来捕获和处理错误。
- **异步控制**：Koa 使用了 ES6 的 `async` 函数和 `await` 关键字，这使得异步控制更加直观和简洁。Express 没有内置对 `async/await` 的支持，但开发者可以通过使用第三方库（如 `co`）来实现类似的功能。

### koa中response.send、response.round、response.json发生了什么事，浏览器为什么识别到她说个json结构或是html

**ctx.response.send**

`ctx.response.send`方法用于发送响应体。它会自动设置 `Content-Type` 头部，根据发送的数据类型来决定。例如，如果你发送一个字符串，它可能会被识别为 HTML，而发送一个对象或数组时，它可能会被识别为 JSON。

**ctx.response.round**

`ctx.response.round` 并不是一个标准的 Koa 方法。可能你指的是 `ctx.response.round`，这是一个自定义方法，用于对响应体进行四舍五入操作。这个方法本身不会改变响应的类型，它只是对响应体进行数学处理。

**ctx.response.json**

`ctx.response.json` 方法用于发送 JSON 格式的数据。当你调用 `ctx.response.json(data)` 时，Koa 会自动设置 `Content-Type` 为 `application/json`，并序列化提供的数据为 JSON 字符串。这样，浏览器就能识别出响应体是一个 JSON 对象。



浏览器通过检查 HTTP 响应头中的 `Content-Type` 字段来识别响应内容的类型。例如：

- 如果 `Content-Type` 是 `text/html`，浏览器会将响应体解释为 HTML。
- 如果 `Content-Type` 是 `application/json`，浏览器会将响应体解释为 JSON 数据。

当 Koa 应用发送响应时，它会根据你调用的方法和提供的数据类型来设置正确的 `Content-Type` 头部。例如：

```javascript
ctx.response.body = { message: 'Hello, World!' };
// Koa 会自动设置 Content-Type: application/json
```

```javascript
ctx.response.body = '<p>Hello, World!</p>';
// Koa 会自动设置 Content-Type: text/html
```

如果 `Content-Type` 没有被明确设置，Koa 会根据响应体的内容来猜测合适的类型。例如，如果响应体是一个字符串，Koa 会默认将其视为 HTML。