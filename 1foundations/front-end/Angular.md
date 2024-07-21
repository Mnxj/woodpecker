### angular的依赖注入和控制反转

**依赖注入(DI)**:

- 一个组件需要使用另一个服务或组件时,不需要自己创建或管理这个依赖。
- `@Injectable()` 来标记可注入的服务,并通过构造函数中引入。
- 解决了组件之间的耦合问题。

**控制反转(IoC)**:

- Angular 的 依赖注入 系统就是一个 IoC 容器,管理各种服务的创建和注入。
- 提高代码的灵活性和可测试性

### `@Injectable()` 的providedIn使用方式

1. **providedIn: 'root'**: HTTP 服务、身份验证服务
   - 默认方式，单列，应用程序级别。
   - 当应用程序启动时,自动创建,整个程序中共享使用。
2. **providedIn: 'platform'**:  日志服务、配置服务
   - 平台级别,单列，应用程序中共享。
3. **providedIn: 'any'**: 表单服务、对话框服务
   - 可以在任何地方被注入,但不是单例。
   - 每次注入时,会创建一个新的服务实例。
4. **providedIn: 'module'**: 路由服务、数据服务
   - 在指定的 Angular 模块中可用。
   - 当该模块被加载时,Angular 会创建该服务的单例实例。
5. **自定义提供方**:
   - 除了以上四种内置的提供方式,你还可以自定义服务的提供方式。
   - 可以通过 `@Injectable({provider: ...})` 的方式来指定自定义的提供方。
   - 这种方式通常用于更复杂的依赖注入场景,如动态注册服务、延迟加载服务等。

### 怎么实现依赖注入

**提供依赖(Provide Dependencies):**

- 使用 `@Injectable()` 装饰器标记服务类,并指定其提供方式。

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // 在根模块中提供
})
export class MyService {
  // 服务类的实现
}
```

**注入依赖(Inject Dependencies):**

- 构造函数参数的方式注入依赖。

```js
import { Component } from '@angular/core';
import { MyService } from './my.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my.component.html'
})
export class MyComponent {
  constructor(private myService: MyService) {
    // 在组件中使用 myService
  }
}
```



**注入令牌(Injection Tokens):**

- 对于非类型的依赖,可以使用注入令牌(`InjectionToken`)进行注入。

```ts
import { InjectionToken } from '@angular/core';

export const CONFIG_OPTIONS = new InjectionToken<any>('config options');

@Injectable({
  providedIn: 'root',
  useFactory: () => ({
    apiUrl: 'https://api.example.com'
  }),
  deps: [CONFIG_OPTIONS]
})
export class MyService {
  constructor(@Inject(CONFIG_OPTIONS) private config: any) {}
}
```

**自定义提供者**

1. **useValue**:

   - 这种提供者用于提供一个固定的值作为服务。

   - 通常用于提供应用程序配置、常量等。

     ```ts
     @Injectable({
       providedIn: 'root',
       providers: [
         { provide: 'API_URL', useValue: 'https://api.example.com' }
       ]
     })
     class MyService {
       constructor(@Inject('API_URL') private apiUrl: string) {}
     }
     ```

2. **useFactory**:

   - 这种提供者用于提供一个工厂函数,该函数返回服务实例。

   - 通常用于根据某些条件或依赖来动态创建服务实例。

     ```ts
     @Injectable({
       providedIn: 'root',
       providers: [
         {
           provide: 'LoggerService',
           useFactory: (config: AppConfig) => {
             return config.logLevel === 'debug' ? new DebugLoggerService() : new ProductionLoggerService();
           },
           deps: [AppConfig]
         }
       ]
     })
     class MyService {
       constructor(@Inject('LoggerService') private logger: LoggerService) {}
     }
     ```

3. **useExisting**:

   - 这种提供者用于将一个服务重新映射到另一个服务。

   - 通常用于为现有服务提供别名或包装。

     ```ts
     @Injectable({
       providedIn: 'root',
       providers: [
         { provide: 'HttpClient', useExisting: HttpClient }
       ]
     })
     class MyService {
       constructor(@Inject('HttpClient') private http: HttpClient) {}
     }
     ```

4. **useClass**:

   - 这种提供者用于提供一个具体的类作为服务。

   - 通常用于根据条件提供不同的服务实现。

     ```ts
     @Injectable({
       providedIn: 'root',
       providers: [
         { provide: 'LoggerService', useClass: config.logLevel === 'debug' ? DebugLoggerService : ProductionLoggerService }
       ]
     })
     class MyService {
       constructor(@Inject('LoggerService') private logger: LoggerService) {}
     }
     ```

###  `@Inject`

> 注入自定义令牌或可选依赖
>
> 管理组件和服务之间的依赖关系

### 指令和component区别

1. **视图和模板**:
   - 组件有自己的视图和模板,由HTML、CSS、TypeScript组成。
   - 指令通常不具有自己的视图和模板,而是修改或扩展现有的 DOM 元素。
2. **模板引用**

- **组件**: 使用模板引用变量来引用自身的 HTML 元素。
- **指令**通常不需要使用模板引用变量。

  ```html
  <some-element #varName></some-element>
  @ViewChild('varName') myElementRef: ElementRef;
  ```



**测试**

- **组件** ：使用单元和集成测试,确保功能正确。
- **指令**： 使用单元测试,测试的重点是对 DOM 的修改和行为。

### $event

- 绑定事件， 自动传递到组件中的处理方法中。
- 会根据事件类型的不同而有所不同,比如鼠标/键盘事件、表单事件或自定义事件。

### angular中组件之间通信的方式

1. **Input 属性**: 父子组件使用`[]` ,子组件使用`@Input`接收并使用这些数据。
2. **Output 事件**:
   - 子使用` @Output + EventEmitter` .emit({})父组件发送事件。
   - 父组件使用`() + $event`绑定事件，获取数据。
3. **服务**（service）: 注入同一个服务在组件之间传递数据。
4. **路由参数**: 导航时设置参数, 目标组件中使用`ActivatedRoute`，.params.subscribe获取。
5. **本地存储**:
   - 使用浏览器的本地存储(如 localStorage、sessionStorage)在组件之间共享数据。
6. **RxJS Observables**:
   - 父组件创建`Subject`async` 管道订阅` 将值显示在模板。 `.next()` 向子组件发送数据。
7. **@ViewChild 和 @ViewChildren** 子组件或 DOM 元素的引用
8. **依赖注入**: 使用依赖注入在组件之间共享数据或服务。

### Observable 在 Angular 中有几种常见的类型:

> 订阅者订阅相关主题，发布者发布主题事件，通知订阅该主题的对象

1. **基本 Observables**:
   - `Observable`: 创建和订阅自定义的数据流。
   - `Subject`: 作为数据的生产者和消费者。可以被多个订阅者订阅,可以手动发送事件。
2. **RxJS Observables**:
   - `BehaviorSubject`: 记录最新发送的值,有新的订阅者立即发送。
   - `ReplaySubject`: 记录最近发送的多个值,有新的订阅者立即发送。
   - `AsyncSubject`: 会在 Observable 完成时发送最后一个值。
3. **HTTP Observables**:
   - `HttpClient`: 返回的是 Observable 类型。
4. **Router Observables**:
   - `Router`:  `events`、`routerState`,用于监听路由相关的事件和状态变化。
5. **Form Observables**:
   - `FormControl`: 表单控件,它提供了 `valueChanges` 和 `statusChanges` 这两个 Observable 属性,用于监听表单控件的值和状态变化。
   - `FormGroup`: 
     - **valueChanges** 值发生变化时发出通知
     - **statusChanges** 状态发生变化时发出通知 'VALID'`、`'INVALID'`、`'PENDING'` 或 `'DISABLED
     - **get()**  获取表单组中指定的表单控件
     - **controls** 返回一个包含表单组中所有表单控件的对象
6. **Other Observables**:
   - `AnimationEvent`: 动画事件的 Observable。
   - `ResizeEvent`: 窗口大小变化事件的 Observable。
   - 以及其他一些 Angular 服务和指令提供的 Observable 属性。

### 数据绑定的方式有哪些

1. **插值绑定 (Interpolation)**: 使用 `{{expression}}`  属性值插入到模板中。
2. **管道绑定 (Pipe Binding)**: 使用 `{{expression | pipe}}` 将组件数据通过管道进行转换后显示在模板中。
3. **属性绑定 (Property Binding)**: 使用 `[property]="expression"` 属性绑定到模板元素的属性上。
4. **指令绑定 (Directive Binding)**: 使用 `[myDirective]="expression"` 将组件数据绑定到自定义指令的属性上。
5. **事件绑定 (Event Binding)**: 使用 `(event)="expression"` 事件绑定到模板元素的事件上。
6. **双向绑定 (Two-way Binding)**: 使用 `[(ngModel)]="expression"` 实现组件属性和表单元素之间的双向数据绑定。
7. **模板引用变量 (Template Reference Variables)**: 使用 `#varName` 在模板中定义一个引用变量,可以访问对应的 DOM 元素或组件实例。

### angular的八大组成部分

1. **模块(Module)**:  组织和打包应用程序的不同部分。 用 `@NgModule` 定义。
2. **组件(Component)**: 视图层。用 `@Component` 定义组件
3. **模板(Template)**: 定义组件的 HTML 结构。用模板语法来动态渲染视图。
4. **指令(Directive)**: 操作 DOM 元素或组件。 用 `@Directive` 定义。
5. **服务(Service)**: 封装通用逻辑。`@Injectable` 定义。
6. **依赖注入(DI)**: 管理组件和服务之间的依赖关系。使用 `@Injectable` 定义。 通过构造函数注入依赖项。
7. **路由(Router)**:  管理应用程序的导航和页面切换。  `@Router` 配置路由。
8. **表单(Forms)**: 管理表单输入和验证，模版板驱动表单和响应式表单。

### 模版板驱动表单和响应式表单

**模板驱动表单 (Template-Driven Forms)**:

- 特点:

  - 定义和验证在模板中完成,只需在模板中添加相关指令即可。
  - `NgModel` 状态和验证信息。
  - 适合于简单的表单

  - 测试和调试较困难,因为表单逻辑耦合在模板中。
  - 不适合动态表单或复杂的验证逻辑。

**响应式表单 (Reactive Forms)**:

- 特点:
  - 定义和验证在组件类中完成,使用 `FormGroup`、`FormControl` 等类。
  - 表单状态和验证信息存储在 `FormGroup` 和 `FormControl` 实例中。
  - 适合动态交互和复杂验证
  - 更易于测试和调试,逻辑集中在组件类中。

### 常用的生命周期钩子函数

1. **组件创建阶段**:
   - `constructor()`:  依赖注入和初始化属性。
   - `ngOnChanges(changes: SimpleChanges)`:  Input 属性发生变化时被调用。
   - `ngOnInit()`:  初始化组件的逻辑。
   - `ngDoCheck()`: 变更检测。可以自定义的变更检测逻辑。
   - `ngAfterContentInit()`: 访问和操作组件的内容。
   - `ngAfterContentChecked()`: 对组件内容的额外检查。
   - `ngAfterViewInit()`: 访问和操作组件的视图及其子视图。
   - `ngAfterViewChecked()`:  执行对组件视图的额外检查。
2. **组件更新阶段**:
   - `ngOnChanges(changes: SimpleChanges)`: 并且会在每次属性变化时被调用。
   - `ngDoCheck()`: 在每次变更检测运行时被调用。可以在这里实现自定义的变更检测逻辑。
   - `ngAfterContentChecked()`: 执行对组件投影内容的额外检查。
   - `ngAfterViewChecked()`: 执行对组件视图的额外检查。
3. **组件卸载阶段**:
   - `ngOnDestroy()`: 在组件销毁前被调用。可以在这里释放资源,如取消订阅、清理定时器等。

### ·@Component可选参数

1. **selector**:
   - 生命组件名字,在模板中引用。
2. **templateUrl** 或 **template**:
   - `templateUrl` 引入外部文件。
   - `template` 内嵌模版。
3. **styleUrls** 或 **styles**:
   - `styleUrls` 指定组件样式的外部文件路径列表。
   - `styles` 内嵌组件样式。
4. **encapsulation**:
   - 定义组件样式的封装策略,可选值为 `ViewEncapsulation.Emulated`、`ViewEncapsulation.Native` 或 `ViewEncapsulation.None`。
5. **changeDetection**:
   - 定义组件的变更检测策略,可选值为 `ChangeDetectionStrategy.Default` 或 `ChangeDetectionStrategy.OnPush`。
6. **providers**:
   - 引入所需的服务。
7. **viewProviders**:
   - 引入视图所需的服务。
8. **animations**:
   - 定义动画。
9. **host**:
   - 定义组件在宿主元素上的属性和事件绑定。
10. **exportAs**:
    - 定义组件在模板中的导出名称。
11. **inputs** 和 **outputs**:
    - 定义组件的输入属性和输出事件。
12. **moduleId**:
    - 指定组件所在模块的 ID,用于解析相对路径。

### 路由的工作原理

1. **路由配置**:
   - 在 Angular 应用程序中,开发者需要先定义路由配置,指定每个 URL 对应的组件。
   - 路由配置通常放在单独的模块中,如 `app-routing.module.ts`。
   - 在配置中,使用 `RouterModule.forRoot()` 或 `RouterModule.forChild()` 来注册路由。
2. **路由激活**: 输入 URL 或点击链接时,路由器会监听 URL 的变化 进行匹配,找到对应的组件。
3. **组件渲染**: 将该组件渲染到`<router-outlet>`所在的位置。 路由出口通常位于应用程序的主要布局组件中,如 `app.component.html`。
4. **导航**: 点击链接或 `router.navigate()`来触发导航。路由器的 URL 监听和匹配过程。
5. **路由参数**: 定义参数化的 URL,如 `/users/:id`。 匹配成功后,路由器会将参数值注入到对应组件的 `ActivatedRoute` 服务中,供组件使用。
6. **导航守卫**:
   - Angular 提供了一系列的导航守卫,如 `CanActivate`、`CanDeactivate`等,用于控制导航的行为。
   - 开发者可以自定义导航守卫,在导航发生时执行相应的逻辑,如权限验证、数据预加载等。
7. **路由状态管理**:
   - Angular 路由器会维护当前路由的状态,包括 URL、参数、查询参数等。
   - 开发者可以通过 `ActivatedRoute` 服务访问和订阅路由状态的变化。

### rxjx在angular中的使用场景

1. **异步数据流管理**:Angular 中大量使用 RxJS 来处理异步数据
2. **状态管理**: 如表单状态、加载状态、错误状态等。
   - 通过 `BehaviorSubject`、`ReplaySubject` 等 RxJS 主体,可以在组件间共享和订阅状态变化。
3. **表单处理**:
   - Angular 的响应式表单(`ReactiveFormsModule`)底层就是基于 RxJS 实现的。
   - 开发者可以利用 RxJS 操作符来实现表单的各种验证、联动等复杂逻辑。
4. **事件处理**:
   - Angular 事件绑定(`(event)`)本质上也是 RxJS 事件流。
   - 开发者可以使用 RxJS 操作符来处理事件,如防抖、节流、组合多个事件等。
5. **路由管理**:
   - Angular 路由器内部广泮使用 RxJS,如路由参数的订阅、导航守卫的实现等。
   - 开发者可以利用 RxJS 来管理路由状态,实现复杂的导航逻辑。
6. **测试**:
   - RxJS 提供了丰富的测试工具,如 `TestScheduler`、`marble testing` 等,有助于 Angular 应用程序的单元测试和集成测试。


### 管道的作用

> 在模板中直接显示格式化的数据,无需进行繁琐的数据处理逻辑。

1. **数据转换**:
2. **过滤和排序**:
3. **国际化和本地化**:
   - 根据用户的语言环境自动选择合适的格式化方式。
4. **复杂逻辑封装**:
   - 封装一些复杂的逻辑,如计算、组合等。
   - 将复杂的逻辑从组件中抽离出来。
5. **可测试性**:
   - 管道是纯函数,输入相同就会得到相同的输出,这使得管道更加易于测试。
   - 通过管道,可以将一些复杂的逻辑从组件中分离出来,从而提高组件的可测试性。

### 双向绑定的原理

> 结合模板语法和表单相关的指令来实现的

1. **双向绑定的实现**:
   - 使用 `[(ngModel)]` 指令来实现双向绑定。内部集成了模型到视图和视图到模型的绑定逻辑。
2. **模型到视图的绑定**:
   - 数据变化时,脏检查机制会检测到。然后自动更新绑定到该数据模型的视图。
3. **视图到模型的绑定**:
   - 用户进行交互操作时,捕获这些事件。然后根据事件类型和绑定关系,自动更新对应的数据模型。



### 兄弟组件之间可能会存在一些间接的生命周期联系

1. **父组件的影响**:
   - 当父组件的 `ngOnInit` 被调用时,它可能会触发子组件的 `ngOnInit`。
2. **数据变化的影响**:
   - 当一个组件更新了共享数据时,可能会触发另一个组件的 `ngOnChanges` 钩子。
3. **事件传递的影响**:
   - 当一个组件触发了一个事件,另一个组件的事件处理器可能会执行某些操作,从而影响到该组件的生命周期。

### keep alive生命周期



1. **组件创建**: 当 `*ngIf` 或 `*ngFor` 条件为 `true` 时,组件会正常创建并执行生命周期钩子,如 `ngOnInit`、`ngOnChanges` 等。
2. **组件隐藏**: 当 `*ngIf` 或 `*ngFor` 条件为 `false` 时,组件不会被销毁,而是进入"隐藏"状态。此时,组件会执行 `ngOnDestroy` 钩子,但会保持在内存中。
3. **组件重新显示**: 当 `*ngIf` 或 `*ngFor` 条件再次为 `true` 时,组件不会被重新创建,而是从"隐藏"状态切换回"显示"状态。此时,组件不会执行 `ngOnInit` 等生命周期钩子,而是直接执行 `ngOnShow` 钩子。
4. **组件销毁**: 当组件最终被移除时(例如父组件被销毁),才会执行 `ngOnDestroy` 钩子并彻底销毁该组件。

**使用场景**:

1. **保持组件状态**: 当组件需要保持一些内部状态时,使用 `keepAlive` 可以避免组件被销毁和重新创建,从而保持状态不丢失。
2. **性能优化**: 对于一些复杂的组件,如果频繁创建和销毁会影响性能,使用 `keepAlive` 可以减少组件的创建和销毁,提高性能。
3. **延迟加载**: 对于一些不常用的组件,使用 `keepAlive` 可以实现延迟加载,提高应用程序的启动速度。

### angular的diff算法的作用



**diff 算法的工作原理**:

1. 首次在将模板渲染到 DOM 时,会首先将模板转换为虚拟 DOM 树。
2. 当数据发生变化时,会重新生成一棵新的虚拟 DOM 树。
3. 将新旧两棵虚拟 DOM 树进行比较,找出差异。
4. 只会将发生变化的部分更新到实际的 DOM 中。

### angular指令分类

1. **结构型指令** (Structural Directives)
   - 用于控制 DOM 结构的指令,例如 `*ngIf`、`*ngFor`、`*ngSwitch` 等。
   - 这些指令会根据条件动态地添加、移除或替换 DOM 元素。
2. **属性型指令** (Attribute Directives)
   - 用于改变 DOM 元素的外观和行为的指令,例如 `ngClass`、`ngStyle`、`ngModel` 等。
   - 这些指令会修改元素的属性、样式或添加事件处理程序。
3. **组件** (Components)
   - 组件是一种特殊的指令,它封装了 HTML 模板、CSS 样式和 TypeScript 逻辑。
   - 组件通常用于创建可重用的 UI 元素,如页面、表单、按钮等。
4. **自定义指令** (Custom Directives)
   - 开发者可以根据业务需求创建自定义的指令。
   - 自定义指令可以是结构型指令或属性型指令,用于实现特定的功能。

下面是一些常见的内置指令示例:

**结构型指令**:

- `*ngIf`: 根据条件显示或隐藏 DOM 元素
- `*ngFor`: 循环渲染列表数据
- `*ngSwitch`: 根据表达式的值切换不同的 DOM 元素

**属性型指令**:

- `ngClass`: 根据条件动态地添加或移除 CSS 类
- `ngStyle`: 根据条件动态地设置元素样式
- `ngModel`: 实现双向数据绑定

**组件**:

- `app-header`: 应用程序头部组件
- `app-sidebar`: 应用程序侧边栏组件
- `app-product-list`: 产品列表组件

### angular双数组和指令的区别

1. **双向数据绑定 (Two-Way Binding)**:
   - 双向数据绑定是一种特殊的数据绑定机制,它可以在组件的属性和 UI 元素之间建立双向关联。
   - 当组件的属性发生变化时,UI 元素会自动更新;当 UI 元素发生变化时,组件的属性也会自动更新。
   - 通常使用 `[(ngModel)]` 指令来实现双向数据绑定。
2. **指令 (Directives)**:
   - 指令是 Angular 中的一种特殊类型,用于扩展 HTML 元素的行为和功能。
   - 指令分为三种类型: 结构型指令、属性型指令和组件。
   - 指令可以用于操作 DOM 元素、添加事件处理程序、修改样式等。

区别总结:

- **目的**: 双向数据绑定主要用于实现组件属性和 UI 元素之间的双向关联,而指令则用于扩展 HTML 元素的功能。
- **实现方式**:
  - 双向数据绑定使用 `[(ngModel)]` 指令来实现。
  - 指令可以是结构型、属性型或组件,需要通过编写指令类来实现。
- **应用场景**:
  - 双向数据绑定常用于表单元素、输入框等需要实时更新数据的场景。
  - 指令可以用于实现各种自定义的 DOM 操作和交互逻辑。

### ng-class和ng-style区别

**应用对象不同**:

- `ngClass` 字符串、对象或数组来指定，用于动态地添加或删除 CSS 类。
- `ngStyle` 对象来指定 用于动态地设置元素的样式属性。

### component和module区别

1. **作用**:
   - **组件**: 定义应用的视图和交互行为。
   - **模块**: 用于管理应用中相关的功能块。
2. **服务和依赖注入**:
   - **组件**: 通过依赖注入的方式使用服务。
   - **模块**: 可以定义应用级别的服务,并在模块中提供(provide)这些服务。
3. **路由**:
   - **组件**: 作为路由的目标组件。
   - **模块**: 定义路由配置,在模块中导入路由模块。

### angular中你对服务有什么了解

1. **定义**:
   - 服务是一个独立的、可复用的代码块,用于封装与应用程序逻辑相关的功能。
2. **依赖注入**:
   - 通过依赖注入(Dependency Injection)的方式在组件或其他服务中使用。
3. **生命周期管理**:
   - 服务的生命周期由 Angular 的依赖注入系统管理,服务实例可以是单例(Singleton)或多实例。
   - 服务可以通过构造函数注入(Constructor Injection)或属性注入(Property Injection)的方式在组件中使用。
4. **注册和提供**:
   - 服务需要在模块或组件的 `providers` 数组中注册,才能被 Angular 的依赖注入系统识别和使用。
   - 通常在应用级别的根模块中注册服务,以便在整个应用程序中使用。
5. **示例**:
   - 数据访问服务:用于与后端 API 进行交互,获取和更新数据。
   - 身份验证服务:用于管理用户的登录状态和权限。
   - 日志服务:用于记录应用程序的日志信息。
   - 配置服务:用于管理应用程序的配置选项。

### 装饰器有哪些

1. **类装饰器**:
   - `@Component`: 用于定义 Angular 组件,包含模板、样式等。
   - `@NgModule`: 用于定义 Angular 模块,包含组件、指令、服务等。
   - `@Injectable`: 用于定义一个可注入的服务。
2. **属性装饰器**:
   - `@Input`: 用于标记组件的输入属性。
   - `@Output`: 用于标记组件的输出属性(事件)。
   - `@HostBinding`: 用于将宿主元素的属性绑定到组件实例的属性。
   - `@HostListener`: 用于将宿主元素的事件绑定到组件的方法。
3. **方法装饰器**:
   - `@HostListener`: 用于绑定宿主元素的事件到组件的方法。
   - `@ContentChild` / `@ContentChildren`: 用于获取组件的内容投影子元素。
   - `@ViewChild` / `@ViewChildren`: 用于获取组件的视图子元素。
4. **参数装饰器**:
   - `@Inject`: 用于标记依赖注入的令牌。
   - `@Optional`: 用于标记可选依赖注入。
   - `@Self`: 用于标记从自身的提供者中查找依赖注入。
   - `@SkipSelf`: 用于标记从父级提供者中查找依赖注入。

### angular优缺点

优点:

1. **完整的框架】**: Angular 提供了一个完整的前端开发解决方案,包括模块化、数据绑定、路由、表单处理、依赖注入等多个方面,开发者无需自行搭建这些基础设施。
2. **TypeScript 支持**: Angular 使用 TypeScript 作为主要语言,TypeScript 提供了更好的类型检查和 IDE 支持,有助于编写更可靠和可维护的代码。
3. **组件化开发**: Angular 采用组件化的开发模式,可以更好地实现代码的复用和模块化。
4. **优秀的性能**: Angular 通过变更检测机制和虚拟 DOM 等技术,可以实现高性能的页面渲染。
5. **强大的CLI工具**: Angular CLI 提供了丰富的命令行工具,可以快速生成组件、服务、模块等,大幅提高开发效率。
6. **良好的可测试性**: Angular 的设计考虑了可测试性,使用依赖注入、观察者模式等模式,有助于编写可测试的代码。
7. **活跃的社区**: Angular 拥有一个活跃的开发者社区,提供丰富的第三方库和工具。

缺点:

1. **学习曲线较陡**: Angular 作为一个全面的框架,其概念和使用方式相对较为复杂,需要一定的学习成本。
2. **bundle 体积较大**: Angular 的整体体积较大,特别是在生产环境中需要对代码进行优化。
3. **单页应用导向**: Angular 更适合开发单页应用(SPA),对于不需要完整 SPA 功能的项目可能有些过重。
4. **与React生态差异较大**: Angular 与React及其生态系统在开发哲学和使用方式上有较大差异,对于同时使用两者的开发者来说需要进行较多切换。
5. **升级成本高**: Angular 的主要版本升级通常需要进行较大的改动,升级成本较高。
6. **性能问题**: 在某些场景下,如大量数据展示,Angular 的性能可能无法达到React或Vue的水平。

### 执行变更检测的情况

> 组件状态何时发生更新

1. **用户交互事件**:
   - 当用户触发事件(如点击、输入等)时,Angular 会执行变更检测,更新受影响的组件。
2. **Observable 数据变化**:
   - 当组件订阅的 Observable 数据发生变化时,Angular 会执行变更检测。
3. **定时器**:
   - 当组件内部使用定时器(如 setTimeout、setInterval)时,Angular 会在定时器触发时执行变更检测。
4. **Promise 完成**:
   - 当组件内部使用 Promise 时,Promise 完成后 Angular 会执行变更检测。
5. **HTTP 请求完成**:
   - 当组件发起 HTTP 请求时,请求完成后 Angular 会执行变更检测。
6. **手动触发**:
   - 开发者可以手动调用 `ChangeDetectorRef` 服务来触发变更检测。
7. **NgZone 事件**:
   - 当组件位于 NgZone 内部时,某些 NgZone 事件(如 setTimeout、event handlers 等)会触发变更检测。
8. **路由导航**:
   - 在路由导航期间,Angular 会执行变更检测来确保页面正确渲染。
9. **生命周期钩子**:
   - 在组件的生命周期钩子被调用时,Angular 会执行变更检测。

### 脏检查机制

负责跟踪和更新数据模型的变化。

它依赖于 Zone.js 拦截事件,并在事件循环的最后阶段进行检查。

通过选择合适的变化检测策略和使用优化技术,开发者可以进一步提高脏检查的性能。

### zone是什么

> 提供了一种机制来拦截和追踪异步操作

**异步任务跟踪**:

- 跟踪应用程序中的所有异步任务,就可以知道何时需要执行变更检测来更新视图。

**执行上下文管理**:

- 将应用程序的执行环境划分为不同的区域。可以针对不同的区域执行不同的变更检测策略。

**错误处理**:

- 可以捕获应用程序中发生的异步错误,报告给错误处理机制。帮助开发者更好地调试和诊断应用程序的问题。



### AOT和JIT

Angular 提供了两种编译模式:AOT(Ahead-of-Time)和JIT(Just-in-Time)。

1. **AOT 编译**:
   - AOT 编译是在构建时完成的。
   - 将模板和组件代码预先编译为 JavaScript 代码,生成优化后的应用程序包。
   - 还可以提前发现一些编译错误,通常在生产环境中使用。
2. **JIT 编译**:
   - JIT 编译是在应用程序运行时完成的。
   - 它会在浏览器中动态编译 Angular 模板和组件代码。

### router和route

1. **Router**:
   - 管理程序的导航和路由。
   - 用于定义路由、监听路由变化操作。
   - 需要在程序的入口模块(通常是 AppModule)中配置  服务。
2. **Route**:
   - 定义路由的基本单元。
   - 是一个对象包含了一个路径和一个组件的映射关系。
   - 应用程序中定义多个 Route 对象,形成一个路由配置。
   - 当用户访问某个路径时,会根据配置的 Route 匹配并渲染相应的组件。

```js
// 在 AppRoutingModule 中定义路由配置
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// 在 AppComponent 中使用 Router 进行导航
<nav>
  <a routerLink="/" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
  <a routerLink="/contact" routerLinkActive="active">Contact</a>
</nav>

<router-outlet></router-outlet>
```

Router 负责管理应用程序的路由,而 Route 则定义了具体的路由映射关系

### mvvm和mvc区别

1. **组件职责分工**:
   - MVC 模式中,Model 负责数据和业务逻辑,View 负责界面显示,Controller 负责处理用户输入并更新 Model 和 View。
   - MVVM 模式中,Model 同样数据和业务逻辑,View 负责界面显示,ViewModel 负责处理 Model 和 View 之间的通信。
2. **视图和控制器的关系**:
   - MVC 中,View 和 Controller 是紧耦合的,Controller 直接操作 View 的渲染。
   - MVVM 中,ViewModel 与 View 是松耦合的,ViewModel 通过数据绑定与 View 进行交互,View 只负责渲染。
3. **数据流向**:
   - MVC 中,数据流向是单向的
   - MVVM 中,数据流向是双向的:
4. **可测试性**:
   - MVC 中,Controller 通常很难测试,因为它同时依赖于 Model 和 View。
   - MVVM 中,ViewModel 可以独立于 View 进行测试,因为它不依赖于 View 的具体实现。

### angular性能优化

1. **Tree-Shaking**:
   - 利用 Rollup 等打包工具移除未使用的代码,减少应用体积。
   - 在 Angular CLI 中,默认会自动进行 Tree-Shaking。
2. **AOT (Ahead-of-Time) 编译**:
   - AOT 编译可以在应用构建时将模板预编译,减少运行时的编译开销。
   - 在 Angular CLI 中,可以通过设置 `aot: true` 来开启 AOT 编译。
3. **懒加载 (Lazy Loading)**: route 中 loadChildren
   - 将应用拆分成多个模块,按需加载模块,减少初始加载时间。
   - 在 Angular 中,可以通过路由配置实现模块的懒加载。
4. **变更检测优化**:
   - 使用 OnPush 变更检测策略来减少不必要的变更检测。
   - 使用 trackBy 函数优化 *ngFor 循环的性能。
5. **分离容器和展示组件**:
   - 将业务逻辑与展示逻辑分离,提高组件的可重用性。
   - 容器组件负责数据获取和业务逻辑,展示组件负责渲染。
6. **使用 RxJS 优化**:
   - 合理使用 RxJS 操作符如 debounceTime、distinctUntilChanged 等来优化订阅和数据流。
   - 使用 OnPush 变更检测策略配合 Observables 可以进一步优化性能。
7. **优化第三方库的使用**:
   - 仅引入需要的第三方库,避免引入过多无用代码。
   - 使用 Angular 的惰性加载特性,按需加载第三方库。
8. **代码分割**:
   - 利用 Angular 的 code splitting 特性,将代码分割成多个 chunk,按需加载。
   - 通过路由配置实现基于路由的代码分割。
9. **Web Worker 和 Service Worker**:
   - 将部分计算密集型任务迁移到 Web Worker 中,提高主线程响应速度。
   - 使用 Service Worker 实现离线缓存和网络优化。
10. **性能监控和分析**:
    - 使用 Angular 内置的性能监控工具 `ng.probe($0)` 分析性能问题。
    - 结合第三方工具如 Chrome DevTools 进行性能分析和优化。
11. 管道优化
12. 

### angular热更新

1. **安装 HMR 相关依赖**:

   - 安装 `webpack-dev-server` 和 `@angularclass/hmr` 等依赖包。

2. **配置 HMR 环境**:

   - 在 `angular.json` 文件中,将 `serve` 命令的 `options` 配置项中的 `hmr` 属性设置为 `true`。
   - 在 `src/main.ts` 文件中,导入 `hmrBootstrap` 函数并替换原有的 `platformBrowserDynamic().bootstrapModule()` 调用。

   ```ts
   import { hmrBootstrap } from './hmr';
   
   // 替换为
   hmrBootstrap(AppModule, bootstrap);
   ```

3. **编写 HMR 模块**:

   - 在 `src/hmr.ts` 文件中定义 `hmrBootstrap` 函数,用于在热更新时重新渲染应用。

   ```ts
   import { NgModuleRef, ApplicationRef } from '@angular/core';
   import { createNewHosts } from '@angularclass/hmr';
   
   export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
     let ngModuleRef: NgModuleRef<any>;
     bootstrap().then(moduleRef => (ngModuleRef = moduleRef));
   
     module.hot.accept();
     module.hot.dispose(() => {
       const appRef: ApplicationRef = ngModuleRef.injector.get(ApplicationRef);
       const elements = appRef.components.map(c => c.location.nativeElement);
       const makeVisible = createNewHosts(elements);
       ngModuleRef.destroy();
       makeVisible();
     });
   };
   ```

4. **启用热更新**:

   - 在开发环境下,运行 `ng serve --hmr` 命令启用热更新功能。

### anuglar服务端渲染

angular Universal 实现这一功能

1. **安装 Angular Universal 依赖**:

   - 运行 `ng add @nguniversal/express-engine` 命令安装 Angular Universal 所需的依赖包。

2. **配置服务端渲染**:

   - 在 `app.server.module.ts` 文件中, 配置服务端渲染所需的模块和组件。
   - 在 `server.ts` 文件中, 编写 Express 服务器的逻辑,用于处理服务端渲染的请求。

   ```ts
   // server.ts
   import 'zone.js/dist/zone-node';
   
   import { ngExpressEngine } from '@nguniversal/express-engine';
   import * as express from 'express';
   import { join } from 'path';
   
   import { AppServerModule } from './src/main.server';
   import { APP_BASE_HREF } from '@angular/common';
   import { existsSync } from 'fs';
   
   // Express server
   const server = express();
   
   const distFolder = join(process.cwd(), 'dist/my-app/browser');
   const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
   
   // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
   server.engine('html', ngExpressEngine({
     bootstrap: AppServerModule,
   }));
   
   server.set('view engine', 'html');
   server.set('views', distFolder);
   
   // Example Express Rest API endpoints
   // app.get('/api/**', (req, res) => { });
   // Serve static files from /browser
   server.get('*.*', express.static(distFolder, {
     maxAge: '1y'
   }));
   
   // All regular routes use the Universal engine
   server.get('*', (req, res) => {
     res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
   });
   
   // Start up the Node server
   server.listen(process.env.PORT || 4000, () => {
     console.log(`Node server listening on http://localhost:${process.env.PORT || 4000}`);
   });
   ```

3. **构建和运行服务端渲染应用**:

   - 运行 `ng build --prod` 命令构建应用。
   - 运行 `node dist/my-app/server/main.js` 命令启动服务器,提供服务端渲染。

使用 Angular Universal 进行服务端渲染的主要好处包括:

1. **更快的初始加载速度**: 服务端渲染可以生成静态 HTML 页面,减少客户端的初始渲染时间。
2. **更好的搜索引擎优化**: 搜索引擎爬虫可以更好地抓取服务端渲染的页面内容。
3. **更好的用户体验**: 初次访问时,用户可以立即看到页面内容,提高了感知性能。

### Jasmine编写注意事项

1. **测试结构**:
   - 使用 `describe()` 函数定义测试套件,表示测试的主要功能或场景。
   - 使用 `it()` 函数定义具体的测试用例,描述预期的行为。
   - 使用 `beforeEach()` 和 `afterEach()` 函数定义测试用例的初始化和清理操作。
2. **断言**:
   - 使用 `expect()` 函数来编写断言,验证测试结果是否符合预期。
   - Jasmine 提供了丰富的断言 API,如 `toBe()`、`toEqual()`、`toContain()`、`toBeTruthy()` 等。
   - 对于异步操作,可以使用 `async/await` 或 `done` 回调来处理异步断言。
3. **依赖注入**:
   - 使用 `TestBed` 来创建测试环境,配置依赖关系并注入服务。
   - 可以使用 `providers` 配置项注入服务,或使用 `inject()` 函数动态注入。
   - 对于需要模拟的服务,可以使用 `spyOn()` 函数来设置预期的行为。
4. **组件测试**:
   - 使用 `TestBed.createComponent()` 创建组件的测试环境。
   - 通过 `fixture.detectChanges()` 触发组件的变更检测,确保测试时组件状态更新。
   - 可以访问组件实例 `fixture.componentInstance` 和模板元素 `fixture.nativeElement` 进行断言。
5. **覆盖率**:
   - 使用 `karma-coverage` 插件生成代码覆盖率报告。
   - 在 `karma.conf.js` 中配置覆盖率报告的输出目录和格式。
   - 可以设置覆盖率阈值,作为持续集成的一部分。
6. **其他**:
   - 使用 `spyOn()` 和 `jasmine.createSpy()` 来模拟外部依赖。
   - 对于涉及 DOM 操作的组件,可以使用 `TestBed.overrideTemplate()` 来替换模板。
   - 在测试中使用 `console.log()` 或 `debugger` 语句来调试问题。

### jasmine和Karma

**Jasmine**:

- 测试框架,用于编写和运行单元测试。
- 提供了一套丰富的 API,用于定义测试套件、断言、钩子函数等。

```ts
describe('MyComponent', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a title', () => {
    expect(component.title).toBe('My Component');
  });
});
```

**Karma**:

- 测试运行器, 自动化运行测试用例。
- 可以在多种浏览器和环境中运行测试用例,
- 可以自定义测试运行的行为,如监听文件变化、生成覆盖率报告等。



### Angular 生态系统中

1. **Angular Universal [ˌjunɪˈvɜrsl]**:
   - 服务端渲染 (Server-Side Rendering, SSR) 解决方案。
   - 它可以在服务端渲染 Angular 应用程序,并将渲染好的 HTML 返回给客户端,提高首屏加载速度和 SEO 友好性。
2. **Nx**:
   - Nx 是一个由 Nrwl 公司开发的 Angular 应用程序构建和开发框架。
   - Nx 提供了一个基于 Webpack 的构建系统,支持代码分割、按需加载等功能,可以帮助开发者构建高性能的 Angular 应用程序。
   - Nx 还集成了许多其他工具和功能,如测试、部署、CI/CD 等,为开发者提供了全面的解决方案。
3. **Storybook**:
   - Storybook 是一个用于构建 UI 组件的开源工具,它与 Angular 和其他主流前端框架都有良好的集成。
   - Storybook 可以帮助开发者更快速地构建、测试和展示 UI 组件,类似于 Next.js 中的 Storybook 功能。
4. **Angular CLI 增强工具**:
   - 代码分割、按需加载等。

### angular.json

项目构建和开发服务器配置的详细信息。这个文件允许开发者自定义构建过程，包括配置不同的构建目标、添加自定义的构建选项、指定源文件和资源文件的位置等。

- `projects`：包含项目列表，每个项目都有自己的配置。
- `schematics`：定义了 Angular CLI 的 schematics 配置，用于生成代码。
- `defaultProject`：指定默认项目，当运行 `ng serve` 或 `ng build` 等命令时，如果没有指定项目名称，则使用默认项目。

每个项目配置通常包含以下部分：

- architect 定义了构建、测试、运行和打包等操作的配置。
  - `build`：用于构建项目的配置。
  - `serve`：用于启动开发服务器的配置。
  - `test`：用于运行单元测试和端到端测试的配置。
  - `lint`：用于执行代码风格检查的配置。
  - `e2e`：用于运行端到端测试的配置。

### 使用webpack

在 `angular.json` 文件中，找到 `architect.build.options` 部分，并添加 `customWebpackConfig` 

```js
"architect": {
  "build": {
...
    "configurations": {
...
    "customWebpackConfig": {
      "path": "./webpack.config.js",
      "mergeStrategies": {
        "externals": "replace"
      }
    }
  }
}
```


