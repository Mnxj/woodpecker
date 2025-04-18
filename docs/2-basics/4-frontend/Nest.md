> 服务器端应用程序的开发框架,

特点：

- 借鉴了angular和springboot的优点。 支持OOP（面向对象编程）、FP（函数式编程）和 FRP（函数响应式编程）。
- 模块、依赖注入 类似于angular,写法又类似于springboot
- nest g 一键生成
- `app.controller.ts` 带有单个路由的基本控制器示例。
- `app.module.ts` 应用程序的根模块。
- `main.ts` 应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。可以加一些装饰器

### 允许跨域办法

```js
//cors：跨域资源共享，
方式一：允许跨站访问
app.enableCors();
// 方式二：
const app = await NestFactory.create(AppModule, { cors: true });
//防止跨站脚本攻击
app.use(helmet());
//C跨站点请求伪造
app.use(csurf());
```

### 执行顺序

发起请求 -> 中间件 -> 守卫 -> 拦截器 -> 管道 -> 执行方法 -> 拦截器 -> 返回结束

全局使用: 管道 - 守卫 - 拦截器 - 过滤器 - 中间件

```js
 //全局使用管道：这里使用的是内置，也可以使用自定义管道，在下文
app.useGlobalPipes(new ParseIntPipe());
//全局使用中间件
app.use(LoggerMiddleware)
//全局使用过滤器
//这里使用的是自定义过滤器，先别管，先学会怎么在全局使用
app.useGlobalFilters(new HttpExceptionFilter());
//全局使用守卫
app.useGlobalGuards(new AuthGuard());
//全局使用拦截器
app.useGlobalInterceptors(new AuthInterceptor());
```

### 守卫

- 继承CanActivate，一个canActivate方法,context参数：请求的(Response/Request)的引用
- 局部@UseGuards(AuthGuard)
- 全局 useGlobalGuards
- @Injectable()声明

### 拦截器

- @Injectable()声明
- 继承NestInterceptor，固定写法，一个intercept方法 intercept参数：context：请求上下文，可以拿到的Response和Request

### 中间件

- 继承NestMiddleware use方法 第三个参数next：执行下一个中件间
- @Injectable()
- 使用在@Module 里面使用@imports[]

### 过滤器

- 局部UseFilters()
- 继承ExceptionFilter 一个catch方法  exception：当前正在处理的异常对象  host：传递给原始处理程序的参数的一个包装(Response/Request)的引用
- @Catch(HttpException)

### 装饰器

> 自定义像ts定义函数声明

路由装饰器（Route decorators）：

@Get()：定义处理 GET 请求的路由。

@Post()：定义处理 POST 请求的路由。

@Put()：定义处理 PUT 请求的路由。

@Delete()：定义处理 DELETE 请求的路由。

@Patch()：定义处理 PATCH 请求的路由。
请求体装饰器（Request body decorators）：

@Body()：从请求体中提取数据。

@Query()：从查询参数中提取数据。

@Param()：从路由参数中提取数据。

@Headers()：从请求头中提取数据。

响应装饰器（Response decorators）：

@Res()：注入原生 response 对象。

@Headers()：设置响应头。

状态码装饰器（Status code decorators）：

@HttpCode()：设置响应的状态码。

### 性能对比

Nest.js：适合于构建API服务、微服务架构、实时交互应用、全栈JavaScript开发环境下的项目。
Java：适用于金融系统、电商后台、大数据处理、云计算基础设施、企业级服务应用等场景。
Python：常见于Web应用开发（尤其是初创公司和敏捷开发环境）、数据抓取与分析、机器学习和人工智能项目、教育科研等领域
