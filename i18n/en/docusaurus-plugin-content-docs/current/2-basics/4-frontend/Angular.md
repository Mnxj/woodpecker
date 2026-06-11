### Angular's DI and IoC

**Dependency Injection (DI)**:

- When a component needs a service or another component, it doesn't have to create or manage that dependency.
- Mark a service as injectable with `@Injectable()` and inject it via the constructor.
- Solves coupling between components.

**Inversion of Control (IoC)**:

- Angular's DI system is an IoC container — manages creation and injection of services.
- Improves code flexibility and testability.

### `@Injectable()` `providedIn` options

1. **`providedIn: 'root'`** — e.g. HTTP service, auth service
   - Default; singleton at app level.
   - Auto-created when the app starts; shared across the whole app.
2. **`providedIn: 'platform'`** — e.g. logging service, config service
   - Platform-level singleton; shared in the app.
3. **`providedIn: 'any'`** — e.g. form service, dialog service
   - Can be injected anywhere; not a singleton.
   - A new instance is created at each injection point.
4. **`providedIn: 'module'`** — e.g. router service, data service
   - Available in the specified Angular module.
   - When that module loads, Angular creates a singleton for that module.
5. **Custom providers**:
   - Beyond the four built-in options, you can customize how a service is provided.
   - Use `@Injectable({ provider: ... })` to specify a custom provider.
   - Useful for complex DI scenarios — dynamic registration, lazy loading services, etc.

### How to do dependency injection

**Provide dependencies:**

- Mark a service class with `@Injectable()` and specify how to provide it.

```js
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // provided in the root module
})
export class MyService {
  // service implementation
}
```

**Inject dependencies:**

- Inject via constructor parameters.

```js
import { Component } from '@angular/core';
import { MyService } from './my.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my.component.html'
})
export class MyComponent {
  constructor(private myService: MyService) {
    // use myService in the component
  }
}
```



**Injection tokens:**

- For non-class dependencies, use `InjectionToken`.

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

**Custom providers**

1. **useValue**:

   - Provides a fixed value as the service.

   - Often used for app config, constants, etc.

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

   - Provides a factory function that returns the service instance.

   - Useful when service instances depend on dynamic conditions.

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

   - Maps one service to another — useful for aliasing or wrapping existing services.

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

   - Provides a concrete class as the service.

   - Use for conditional service implementations.

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

> Inject a custom token or optional dependency
>
> Manage dependencies between components and services

### Directives vs components

1. **View and template**:
   - Components have their own view and template (HTML, CSS, TypeScript).
   - Directives typically don't have their own view/template — they modify or extend existing DOM elements.
2. **Template references**

- **Component**: use template reference variables to refer to its HTML element.
- **Directive**: typically doesn't need template reference variables.

  ```html
  <some-element #varName></some-element>
  @ViewChild('varName') myElementRef: ElementRef;
  ```



**Testing**

- **Components**: unit and integration tests — verify functionality.
- **Directives**: unit tests focused on DOM modification and behavior.

### $event

- Bind events; auto-passes the event to the component's handler.
- Type depends on the event — mouse/keyboard events, form events, or custom events.

### Component communication in Angular

1. **Input properties**: parent passes via `[]`; child receives with `@Input`.
2. **Output events**:
   - Child uses `@Output + EventEmitter` `.emit({})` to fire events to the parent.
   - Parent binds with `()` and accesses data via `$event`.
3. **Services**: inject the same service to share data between components.
4. **Route parameters**: set parameters during navigation; the target component uses `ActivatedRoute` and `.params.subscribe` to retrieve them.
5. **Local storage**:
   - Use browser storage (`localStorage`, `sessionStorage`) to share data across components.
6. **RxJS Observables**:
   - Parent creates a `Subject`; the `async` pipe subscribes and displays the value. `.next()` sends data to children.
7. **@ViewChild / @ViewChildren** — reference child components or DOM elements.
8. **Dependency injection** — share data/services across components.

### Common Observable types in Angular:

> Subscribers subscribe to topics; publishers emit events; the subscriber is notified.

1. **Basic Observables**:
   - `Observable`: create and subscribe to custom data streams.
   - `Subject`: producer and consumer; subscribable by multiple subscribers; can emit manually.
2. **RxJS Observables**:
   - `BehaviorSubject`: stores the latest emitted value; emits immediately to new subscribers.
   - `ReplaySubject`: stores N recent values; emits them to new subscribers.
   - `AsyncSubject`: emits only the last value, when the Observable completes.
3. **HTTP Observables**:
   - `HttpClient`: returns `Observable`.
4. **Router Observables**:
   - `Router`: `events`, `routerState` for monitoring route changes.
5. **Form Observables**:
   - `FormControl`: provides `valueChanges` and `statusChanges` — observable streams.
   - `FormGroup`:
     - **valueChanges**: notify on value changes
     - **statusChanges**: notify on status changes — `'VALID'`, `'INVALID'`, `'PENDING'`, `'DISABLED'`
     - **get()**: get a specific form control
     - **controls**: object containing all form controls
6. **Others**:
   - `AnimationEvent`: animation event Observable.
   - `ResizeEvent`: window resize Observable.
   - Plus other Angular services and directives.

### Data binding mechanisms

1. **Interpolation**: `{{expression}}` inserts a property value into the template.
2. **Pipe binding**: `{{expression | pipe}}` transforms data via a pipe.
3. **Property binding**: `[property]="expression"` binds to template element properties.
4. **Directive binding**: `[myDirective]="expression"` binds to custom directives.
5. **Event binding**: `(event)="expression"` binds to template element events.
6. **Two-way binding**: `[(ngModel)]="expression"` for two-way data binding between properties and form elements.
7. **Template reference variables**: `#varName` defines a reference variable accessible elsewhere in the template.

### Angular's 8 building blocks

1. **Module**: organizes and packages parts of the app. Defined with `@NgModule`.
2. **Component**: view layer. Defined with `@Component`.
3. **Template**: defines a component's HTML structure with template syntax for dynamic rendering.
4. **Directive**: operate on DOM elements or components. Defined with `@Directive`.
5. **Service**: encapsulate shared logic. Defined with `@Injectable`.
6. **Dependency Injection (DI)**: manages dependencies between components and services. Defined with `@Injectable`; injected via constructor.
7. **Router**: manages navigation and page transitions. Configured via `@Router`.
8. **Forms**: manage form input and validation — template-driven and reactive forms.

### Template-driven vs Reactive Forms

**Template-Driven Forms**:

- Characteristics:

  - Defined and validated in templates — just add directives.
  - `NgModel` carries state and validation info.
  - Suits simple forms.

  - Harder to test and debug — form logic is coupled to the template.
  - Not ideal for dynamic forms or complex validation.

**Reactive Forms**:

- Characteristics:
  - Defined and validated in the component class via `FormGroup`, `FormControl`, etc.
  - State and validation info live in `FormGroup` and `FormControl` instances.
  - Better for dynamic interactions and complex validation.
  - Easier to test and debug — logic centralized in the component class.

### Common lifecycle hooks

1. **Creation phase**:
   - `constructor()`: DI and property initialization.
   - `ngOnChanges(changes: SimpleChanges)`: called when `@Input` properties change.
   - `ngOnInit()`: initialize component logic.
   - `ngDoCheck()`: change detection — for custom change detection logic.
   - `ngAfterContentInit()`: access and operate on projected content.
   - `ngAfterContentChecked()`: extra checks on content.
   - `ngAfterViewInit()`: access and operate on the component's view and children.
   - `ngAfterViewChecked()`: extra checks on the view.
2. **Update phase**:
   - `ngOnChanges`: called on each property change.
   - `ngDoCheck`: called on each change detection run.
   - `ngAfterContentChecked`: extra checks on projected content.
   - `ngAfterViewChecked`: extra checks on the view.
3. **Destruction phase**:
   - `ngOnDestroy()`: called before the component is destroyed — release resources, unsubscribe, clear timers.

### Optional parameters for `@Component`

1. **selector**: component selector name used in templates.
2. **templateUrl** or **template**:
   - `templateUrl` references an external file.
   - `template` is inline.
3. **styleUrls** or **styles**:
   - `styleUrls` is a list of external CSS file paths.
   - `styles` is inline styles.
4. **encapsulation**: view-encapsulation strategy — `ViewEncapsulation.Emulated`, `Native`, or `None`.
5. **changeDetection**: change-detection strategy — `ChangeDetectionStrategy.Default` or `OnPush`.
6. **providers**: services required for this component.
7. **viewProviders**: services available to the view.
8. **animations**: animations.
9. **host**: define attribute and event bindings on the host element.
10. **exportAs**: export name in templates.
11. **inputs** and **outputs**: input properties and output events.
12. **moduleId**: module ID, used to resolve relative paths.

### How the router works

1. **Route config**:
   - Define route config that maps URLs to components, often in a separate module like `app-routing.module.ts`.
   - Use `RouterModule.forRoot()` or `RouterModule.forChild()` to register routes.
2. **Route activation**: When the user enters a URL or clicks a link, the router monitors URL changes and matches the corresponding component.
3. **Component rendering**: render the matched component into the `<router-outlet>`. The router outlet typically lives in the main layout component like `app.component.html`.
4. **Navigation**: clicks on links or `router.navigate()` trigger navigation — same matching process.
5. **Route parameters**: parameterized URLs like `/users/:id`. On match, the router injects parameters into the component's `ActivatedRoute`.
6. **Route guards**:
   - Angular provides guards like `CanActivate`, `CanDeactivate` to control navigation.
   - Implement custom guards to run logic (auth checks, data preloading) during navigation.
7. **Route state**:
   - The router maintains current route state — URL, params, query params.
   - Subscribe to state changes via `ActivatedRoute`.

### RxJS use cases in Angular

1. **Async data streams**: Angular uses RxJS heavily for async data.
2. **State management**: form state, loading state, error state.
   - Use RxJS subjects like `BehaviorSubject`, `ReplaySubject` to share and subscribe to state across components.
3. **Forms**:
   - Angular's Reactive Forms (`ReactiveFormsModule`) is built on RxJS.
   - Use RxJS operators for complex validation and form linkage.
4. **Events**:
   - Angular event bindings (`(event)`) are essentially RxJS event streams.
   - Use RxJS operators for debounce, throttle, combining events.
5. **Routing**:
   - Angular Router uses RxJS internally — param subscriptions, guard implementations.
   - Manage route state with RxJS for complex navigation.
6. **Testing**:
   - RxJS provides testing tools like `TestScheduler` and marble testing for unit and integration tests.


### Purpose of pipes

> Display formatted data directly in templates without complex data-processing logic.

1. **Data transformation**
2. **Filtering and sorting**
3. **Internationalization / localization**:
   - Automatically pick the appropriate format based on the user's locale.
4. **Complex logic encapsulation**:
   - Encapsulate complex logic — calculations, composition.
   - Extract complex logic from components.
5. **Testability**:
   - Pipes are pure functions — same input, same output — easy to test.
   - Extracting complex logic into pipes improves component testability.

### How two-way binding works

> Combines template syntax with form-related directives

1. **Implementation**:
   - Use `[(ngModel)]` for two-way binding. Internally combines model-to-view and view-to-model bindings.
2. **Model → View**:
   - When data changes, dirty checking detects it and auto-updates the view.
3. **View → Model**:
   - User interaction events are captured; based on event type and binding, the corresponding data model is auto-updated.



### Indirect lifecycle relationships between sibling components

1. **Parent influence**:
   - When the parent's `ngOnInit` runs, it may trigger children's `ngOnInit`.
2. **Data-change influence**:
   - When one component updates shared data, another may have its `ngOnChanges` triggered.
3. **Event-passing influence**:
   - When one component triggers an event, another's handler may perform operations affecting its lifecycle.

### Keep-alive lifecycle



1. **Create**: when `*ngIf` or `*ngFor` is `true`, the component is created normally with lifecycle hooks — `ngOnInit`, `ngOnChanges`, etc.
2. **Hide**: when `*ngIf` or `*ngFor` is `false`, the component is NOT destroyed but enters a "hidden" state. `ngOnDestroy` fires, but the component remains in memory.
3. **Re-show**: when the condition is `true` again, the component isn't recreated — it transitions from "hidden" back to "visible". No `ngOnInit`; instead, an `ngOnShow` hook runs.
4. **Destroy**: only when the component is permanently removed (e.g. parent is destroyed) does `ngOnDestroy` truly fire and the component is destroyed.

**Use cases**:

1. **Preserve state**: when a component needs to retain internal state, `keepAlive` prevents destruction/recreation.
2. **Performance**: for complex components, avoid frequent create/destroy cycles.
3. **Lazy loading**: lazy-load less-used components to improve startup performance.

### Purpose of Angular's diff algorithm



**How diff works**:

1. On first render, the template becomes a virtual DOM tree.
2. When data changes, a new virtual DOM tree is generated.
3. The new and old trees are compared to find diffs.
4. Only the changed parts are applied to the real DOM.

### Directive categories

1. **Structural directives**
   - Control DOM structure — `*ngIf`, `*ngFor`, `*ngSwitch`.
   - Add, remove, or replace DOM elements based on conditions.
2. **Attribute directives**
   - Change DOM element appearance and behavior — `ngClass`, `ngStyle`, `ngModel`.
   - Modify attributes, styles, or attach event handlers.
3. **Components**
   - A special kind of directive that bundles HTML template, CSS, and TypeScript.
   - For reusable UI — pages, forms, buttons.
4. **Custom directives**
   - Built per business need — can be structural or attribute directives.

Some common built-in directive examples:

**Structural**:

- `*ngIf`: show/hide DOM based on a condition
- `*ngFor`: render lists
- `*ngSwitch`: switch DOM based on an expression

**Attribute**:

- `ngClass`: dynamically add/remove CSS classes
- `ngStyle`: dynamically set inline styles
- `ngModel`: two-way binding

**Components**:

- `app-header`, `app-sidebar`, `app-product-list`, etc.

### Two-way binding vs directives

1. **Two-way binding**:
   - A special data-binding mechanism creating a bidirectional link between a component property and a UI element.
   - When the property changes, UI updates automatically; when the UI changes, the property updates automatically.
   - Typically implemented via `[(ngModel)]`.
2. **Directives**:
   - Extend HTML element behavior — three types: structural, attribute, component.
   - Can manipulate DOM, attach handlers, modify styles.

Summary of differences:

- **Goal**: two-way binding ties properties to UI; directives extend HTML element behavior.
- **Implementation**:
  - Two-way binding via `[(ngModel)]`.
  - Directives can be structural, attribute, or components — implemented via directive classes.
- **When to use**:
  - Two-way binding for forms, inputs needing live data updates.
  - Directives for custom DOM operations and interactions.

### ngClass vs ngStyle

**Different targets**:

- `ngClass`: takes a string, object, or array; dynamically adds or removes CSS classes.
- `ngStyle`: takes an object; dynamically sets style properties.

### Component vs Module

1. **Purpose**:
   - **Component**: defines view and interaction behavior.
   - **Module**: organizes related features.
2. **Services and DI**:
   - **Component**: uses services via DI.
   - **Module**: can define app-level services and provide them.
3. **Routing**:
   - **Component**: the target of routes.
   - **Module**: defines route config and imports the routing module.

### Angular services

1. **Definition**:
   - A service is an independent, reusable code block encapsulating logic.
2. **DI**:
   - Used in components or other services via dependency injection.
3. **Lifecycle**:
   - Angular's DI system manages service lifecycle; instances can be singletons or per-instance.
   - Inject via constructor or property injection.
4. **Register and provide**:
   - Services must be registered in module/component `providers` arrays.
   - Typically registered at the root module level.
5. **Examples**:
   - Data-access service for backend APIs.
   - Authentication service for login state and permissions.
   - Logging service for app logs.
   - Config service for app config options.

### Decorators

1. **Class decorators**:
   - `@Component`: defines an Angular component — template, styles, etc.
   - `@NgModule`: defines an Angular module — components, directives, services.
   - `@Injectable`: defines an injectable service.
2. **Property decorators**:
   - `@Input`: marks a component input.
   - `@Output`: marks a component output (event).
   - `@HostBinding`: binds a host element property to a component instance property.
   - `@HostListener`: binds a host element event to a component method.
3. **Method decorators**:
   - `@HostListener`: binds host element events to component methods.
   - `@ContentChild` / `@ContentChildren`: get projected content children.
   - `@ViewChild` / `@ViewChildren`: get view children.
4. **Parameter decorators**:
   - `@Inject`: mark an injection token.
   - `@Optional`: optional dependency injection.
   - `@Self`: find dependency only from self's providers.
   - `@SkipSelf`: find dependency from parent providers (skip self).

### Angular pros and cons

Pros:

1. **Complete framework**: Angular provides a full frontend solution — modularization, data binding, routing, forms, DI. No need to assemble infrastructure.
2. **TypeScript support**: TypeScript improves type checking and IDE support; helps write more reliable, maintainable code.
3. **Component-based**: Angular uses component-based development — better code reuse and modularization.
4. **Excellent performance**: Change detection and virtual DOM enable high-perf rendering.
5. **Strong CLI**: Angular CLI provides rich commands for generating components, services, modules — boosting productivity.
6. **Great testability**: Angular's design favors testability via DI, observer pattern, etc.
7. **Active community**: Angular has a vibrant developer community with many third-party libraries.

Cons:

1. **Steep learning curve**: Angular is comprehensive; concepts and usage are relatively complex.
2. **Large bundle size**: Angular's overall size is bigger; production needs optimization.
3. **SPA-focused**: Angular suits SPAs; may be heavyweight for non-SPA projects.
4. **Different from React ecosystem**: Angular vs React have different philosophies and usage patterns; developers using both may need significant context-switching.
5. **High upgrade cost**: Major version upgrades often require significant changes.
6. **Performance issues**: in some scenarios (large data displays), Angular may not match React or Vue performance.

### When does change detection run?

> When component state may update

1. **User interaction events**: clicks, inputs.
2. **Observable data changes**: when subscribed observables emit.
3. **Timers**: setTimeout, setInterval inside components.
4. **Promise resolution**: when promises inside components resolve.
5. **HTTP completion**: when HTTP requests complete.
6. **Manual trigger**: via `ChangeDetectorRef`.
7. **NgZone events**: when components run inside NgZone, certain events (setTimeout, event handlers) trigger detection.
8. **Route navigation**: during navigation.
9. **Lifecycle hooks**: when component lifecycle hooks run.

### Dirty checking

Tracks and updates data model changes.

Relies on Zone.js to intercept events and runs checks at the end of the event loop.

Pick the right change-detection strategy and use optimization techniques to further improve dirty-check performance.

### What is Zone

> A mechanism to intercept and track async operations

**Async task tracking**:

- Tracks all async tasks in the app to know when to run change detection.

**Execution context management**:

- Divides app execution into separate zones. Can apply different change-detection strategies per zone.

**Error handling**:

- Captures async errors and reports them to the error-handling mechanism. Helps debugging and diagnostics.



### AOT vs JIT

Angular provides two compilation modes: AOT (Ahead-of-Time) and JIT (Just-in-Time).

1. **AOT**:
   - Compiled at build time.
   - Templates and component code are pre-compiled to JS — optimized app bundle.
   - Catches some compile errors early; typically used in production.
2. **JIT**:
   - Compiled at runtime — dynamically compiles Angular templates and component code in the browser.

### Router vs Route

1. **Router**:
   - Manages navigation and routing in the app.
   - Used to define routes and listen for route changes.
   - Configured in the app's entry module (usually AppModule).
2. **Route**:
   - The basic unit of routing.
   - An object that maps a path to a component.
   - Many Route objects form the route config.
   - When the user visits a path, the matching Route is found and its component is rendered.

```js
// Define route config in AppRoutingModule
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

// Use Router for navigation in AppComponent
<nav>
  <a routerLink="/" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
  <a routerLink="/contact" routerLinkActive="active">Contact</a>
</nav>

<router-outlet></router-outlet>
```

Router manages app routing; Route defines the actual path-to-component mappings.

### MVVM vs MVC

1. **Responsibilities**:
   - MVC: Model = data and business logic; View = UI; Controller = handles user input, updates Model and View.
   - MVVM: Model = data and business logic; View = UI; ViewModel = communication between Model and View.
2. **View ↔ Controller**:
   - MVC: tightly coupled — Controller directly operates on View rendering.
   - MVVM: ViewModel is loosely coupled to View via data binding; View only renders.
3. **Data flow**:
   - MVC: one-way.
   - MVVM: two-way.
4. **Testability**:
   - MVC: Controllers are usually hard to test — depend on both Model and View.
   - MVVM: ViewModels can be tested independently of View.

### Angular performance optimization

1. **Tree-shaking**:
   - Remove unused code via Rollup, etc.; reduce bundle size.
   - Angular CLI does tree-shaking automatically.
2. **AOT compilation**:
   - Pre-compile templates at build time; reduces runtime overhead.
   - In Angular CLI, enable with `aot: true`.
3. **Lazy loading**: via `loadChildren` in route config
   - Split the app into modules loaded on demand; reduces initial load time.
4. **Change-detection optimization**:
   - Use `OnPush` to reduce unnecessary checks.
   - Use `trackBy` to optimize `*ngFor` performance.
5. **Container/presentational component split**:
   - Separate business logic from presentation for better reuse.
6. **RxJS optimization**:
   - Use `debounceTime`, `distinctUntilChanged` to optimize subscriptions and streams.
   - Combine with `OnPush` for further gains.
7. **Optimize third-party libraries**:
   - Only import what you need; avoid pulling in extra code.
   - Use Angular's lazy loading for third-party libs.
8. **Code splitting**:
   - Use Angular's code splitting to break the app into chunks.
   - Use route-based code splitting.
9. **Web Workers and Service Workers**:
   - Offload CPU-heavy tasks to Web Workers; improves main-thread responsiveness.
   - Use Service Workers for offline cache and network optimization.
10. **Performance monitoring**:
    - Use Angular's built-in perf monitoring `ng.probe($0)`.
    - Combine with Chrome DevTools for analysis.
11. Pipe optimization.

### Angular Hot Module Replacement

1. **Install HMR deps**:

   - Install `webpack-dev-server`, `@angularclass/hmr`.

2. **Configure HMR**:

   - In `angular.json`, set `serve` `options.hmr` to `true`.
   - In `src/main.ts`, import `hmrBootstrap` and replace the original `platformBrowserDynamic().bootstrapModule()` call.

   ```ts
   import { hmrBootstrap } from './hmr';

   // Replace with
   hmrBootstrap(AppModule, bootstrap);
   ```

3. **Write the HMR module**:

   - Define `hmrBootstrap` in `src/hmr.ts` to re-render the app on hot update.

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

4. **Enable HMR**:

   - In dev, run `ng serve --hmr` to enable HMR.

### Angular Server-Side Rendering

Angular Universal achieves this.

1. **Install Angular Universal**:

   - Run `ng add @nguniversal/express-engine`.

2. **Configure SSR**:

   - Configure required modules and components in `app.server.module.ts`.
   - In `server.ts`, write the Express server logic for SSR.

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

3. **Build and run SSR**:

   - Run `ng build --prod` to build.
   - Run `node dist/my-app/server/main.js` to launch SSR.

Benefits of Angular Universal SSR:

1. **Faster initial load**: SSR generates static HTML, reducing client render time.
2. **Better SEO**: crawlers can read server-rendered content.
3. **Better UX**: users see content immediately, improving perceived perf.

### Tips for writing Jasmine tests

1. **Test structure**:
   - Use `describe()` to define test suites — main features or scenarios.
   - Use `it()` for specific test cases.
   - Use `beforeEach()` and `afterEach()` for setup/teardown.
2. **Assertions**:
   - Use `expect()` to verify outcomes.
   - Jasmine has rich assertions — `toBe()`, `toEqual()`, `toContain()`, `toBeTruthy()`.
   - For async, use `async/await` or `done` callbacks.
3. **DI**:
   - Use `TestBed` to create test environments and configure dependencies.
   - Use `providers` to inject services or `inject()` for dynamic injection.
   - Use `spyOn()` to set expected behavior on mocks.
4. **Component testing**:
   - Use `TestBed.createComponent()` to create component test environments.
   - Use `fixture.detectChanges()` to trigger change detection.
   - Access `fixture.componentInstance` and `fixture.nativeElement` for assertions.
5. **Coverage**:
   - Use `karma-coverage` to generate coverage reports.
   - Configure in `karma.conf.js`.
   - Set coverage thresholds for CI.
6. **Other**:
   - Use `spyOn()` and `jasmine.createSpy()` to mock external deps.
   - Use `TestBed.overrideTemplate()` to swap templates.
   - Use `console.log()` or `debugger` for debugging.

### Jasmine vs Karma

**Jasmine**:

- A testing framework for writing and running unit tests.
- Provides APIs to define suites, assertions, hooks.

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

- A test runner that automates running tests.
- Runs tests in multiple browsers and environments.
- Customizable behavior — watch files, generate coverage reports.



### Angular ecosystem

1. **Angular Universal**:
   - SSR solution.
   - Renders Angular apps on the server and returns HTML to the client — improves first-paint and SEO.
2. **Nx**:
   - Nx is an Angular build and dev framework by Nrwl.
   - Webpack-based build system; supports code splitting, lazy loading.
   - Integrates many tools — testing, deployment, CI/CD.
3. **Storybook**:
   - Open-source tool for building UI components; integrates with Angular and other major frontend frameworks.
   - Like Storybook in Next.js, lets you build, test, and showcase UI components quickly.
4. **Angular CLI enhancements**:
   - Code splitting, lazy loading.

### angular.json

Detailed project build and dev-server config. Lets developers customize the build process — configure targets, add custom build options, specify source and asset locations.

- `projects`: list of projects, each with its own config.
- `schematics`: defines Angular CLI schematics for code generation.
- `defaultProject`: default project — used when running `ng serve` or `ng build` without specifying a project.

Each project config typically has:

- architect: defines build, test, run, package operations
  - `build`: project build config.
  - `serve`: dev server config.
  - `test`: unit and e2e test config.
  - `lint`: linting config.
  - `e2e`: e2e test config.

### Using webpack

In `angular.json`, find `architect.build.options` and add `customWebpackConfig`:

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

