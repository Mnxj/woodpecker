> A new web framework from the team behind Express, aimed at being `smaller, more expressive, and more robust`.

- Avoids tedious nested callbacks and greatly improves error-handling efficiency.
- Doesn't bundle middleware in the core. Provides a lightweight, elegant function library that makes writing web apps a joy.

### The "onion model" explained

Koa's middleware works like layers of an onion:

1. **Request order**: when a request enters the server, middlewares execute from outer to inner in declaration order.
2. **Response order**: as the response leaves the server, middlewares execute from inner to outer.



### Implementing middleware

Each middleware function takes two arguments:

- `ctx`: Koa's context object containing all request/response info.
- `next`: a function that invokes the next middleware.

### `koa-static`

Helps serve static files when the server receives requests.

### `koa-bodyparser`

Parses request bodies.

`app.use(bodyParser());` — just install it before other middleware.

It automatically parses JSON, URL-encoded forms, etc., and attaches the parsed object to `ctx.request.body`.

### Koa error handling

- When using `ctx.onerror`, if the error is handled (not rethrown), `app.on('error', fn)` is NOT triggered.
- If `ctx.onerror` doesn't handle the error, it bubbles up to `app.on('error', fn)`.
- Inside `app.on('error', fn)`, avoid throwing again — it'd cause an infinite loop.

```js
// Error-handling middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    // Don't call ∗∗∗.emit('error', err, ctx) here
    // because ctx.onerror has already handled it
  }
});

// Error listener
app.on('error', (err, ctx) => {
  console.error('server error', err);
  // Log errors here
  // Or send error notifications
});
```

- **Order of error-handling middleware**: place it at the end of the middleware stack so it can catch errors thrown by earlier middleware.
- **Completeness**: make sure every error in your app is properly captured and handled — unhandled errors can crash the app.
- **Error logging**: in production, log errors for traceability and debugging.

### Express error handling

```js
// Async error handling
// For async operations, errors must be forwarded to the error-handling middleware via `next`
app.get('/async', async (req, res, next) => {
  try {
    // async operation
    await someAsyncFunction();
  } catch (err) {
    next(err); // pass error to the error-handling middleware
  }
});

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Use a third-party error-handling library
const errorhandler = require('errorhandler');
const port = process.env.PORT || 3000;

app.use(errorhandler());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```



### Differences between Express and Koa

- **Middleware system**: Both Express and Koa use middleware to handle requests/responses. Express's middleware ecosystem is mature with many ready-to-use middlewares. Koa's middleware system is more minimal.
- **Error handling**: Express handles errors via middleware — you must add error-handling middleware in the chain. Koa is more flexible — you can use `try/catch` anywhere.
- **Async control**: Koa uses ES6 `async`/`await`, making async control natural and concise. Express doesn't have built-in `async/await` support but you can use libraries like `co` for similar behavior.

### In Koa, what happens with response.send, response.round, response.json — how does the browser know it's JSON or HTML?

**ctx.response.send**

`ctx.response.send` sends the response body. It auto-sets `Content-Type` based on the data. For example, a string may be detected as HTML, while objects/arrays may be detected as JSON.

**ctx.response.round**

`ctx.response.round` is not a standard Koa method. You may mean `ctx.response.round`, a custom method to round numbers in the response. It doesn't change the response type — it just runs a math op on the body.

**ctx.response.json**

`ctx.response.json` sends JSON data. When you call `ctx.response.json(data)`, Koa auto-sets `Content-Type: application/json` and serializes data to JSON. The browser can then recognize the response body as JSON.



The browser determines content type by inspecting the `Content-Type` response header:

- `Content-Type: text/html` → parsed as HTML
- `Content-Type: application/json` → parsed as JSON

When Koa sends a response, it sets the proper `Content-Type` based on the method you called and the data you provided. For example:

```javascript
ctx.response.body = { message: 'Hello, World!' };
// Koa auto-sets Content-Type: application/json
```

```javascript
ctx.response.body = '<p>Hello, World!</p>';
// Koa auto-sets Content-Type: text/html
```

If `Content-Type` is not explicitly set, Koa guesses based on the body. For example, a string body defaults to HTML.
