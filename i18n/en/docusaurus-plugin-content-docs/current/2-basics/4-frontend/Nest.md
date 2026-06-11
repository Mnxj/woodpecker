> A framework for building server-side applications.

Features:

- Borrows the best of Angular and Spring Boot. Supports OOP, FP, and FRP (functional reactive programming).
- Modules and dependency injection similar to Angular, with a Spring Boot-like writing style.
- `nest g` for one-line scaffolding.
- `app.controller.ts` — a basic controller example with a single route.
- `app.module.ts` — the root module of the application.
- `main.ts` — the entry file. Uses NestFactory to create the Nest app instance. Decorators can be added.

### Enabling CORS

```js
// CORS: cross-origin resource sharing
// Option 1: allow cross-origin access
app.enableCors();
// Option 2:
const app = await NestFactory.create(AppModule, { cors: true });
// Prevent XSS
app.use(helmet());
// Prevent CSRF
app.use(csurf());
```

### Execution order

Request → middleware → guards → interceptors → pipes → handler → interceptors → response

Global setup order: pipes - guards - interceptors - filters - middleware

```js
 // Global pipe — using a built-in here; custom pipes work too (see below)
app.useGlobalPipes(new ParseIntPipe());
// Global middleware
app.use(LoggerMiddleware)
// Global filters
// Using a custom filter — ignore the details, just see how it's set globally
app.useGlobalFilters(new HttpExceptionFilter());
// Global guards
app.useGlobalGuards(new AuthGuard());
// Global interceptors
app.useGlobalInterceptors(new AuthInterceptor());
```

### Guards

- Extend `CanActivate` with a `canActivate` method. The `context` parameter holds a reference to the `Response`/`Request`.
- Scoped: `@UseGuards(AuthGuard)`
- Global: `useGlobalGuards`
- Decorate with `@Injectable()`

### Interceptors

- Decorate with `@Injectable()`
- Extend `NestInterceptor`; implement `intercept`. The `context` parameter holds the request context (Response/Request).

### Middleware

- Extend `NestMiddleware`; implement `use`; the third argument `next` runs the next middleware.
- Decorate with `@Injectable()`
- Apply inside a module via `@Module`'s `imports[]`

### Filters

- Scoped via `UseFilters()`
- Extend `ExceptionFilter`; implement `catch`. `exception` is the current exception; `host` wraps the original handler's args (Response/Request).
- Decorate with `@Catch(HttpException)`

### Decorators

> Custom decorators like TypeScript decorator functions.

Route decorators:

@Get() — handle GET.

@Post() — handle POST.

@Put() — handle PUT.

@Delete() — handle DELETE.

@Patch() — handle PATCH.

Request-body decorators:

@Body() — extract data from the request body.

@Query() — extract from query parameters.

@Param() — extract from route parameters.

@Headers() — extract from request headers.

Response decorators:

@Res() — inject the native response object.

@Headers() — set response headers.

Status decorators:

@HttpCode() — set the response status.

### Performance comparison

Nest.js — fits API services, microservices, real-time apps, full-stack JavaScript projects.
Java — fits financial systems, e-commerce backends, big data, cloud infra, enterprise services.
Python — common for web apps (especially startups and agile teams), data scraping and analysis, ML and AI projects, education and research.
