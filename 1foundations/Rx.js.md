### rxjs是什么？基本概念有哪些

用于异步数据处理、事件处理、多数据源整合、响应式用户界面

核心概念包括：

**Observable**: `可观察对象`,可以发送三种信号:值、错误和完成。 `new Observable()` 或 创建操作符(如 `of()`, `from()` 等)来创建 。

**Observer**:`观察者`,用于订阅 Observable ，并处理发送的信号。 需要实现三个方法:`next()`、`error()` 和 `complete()`。

**Subscription** `订阅`,表示 Observer 与 Observable 之间的连接。 `subscribe()` 方法来订阅 Observable, 并通过调用 `unsubscribe()` 方法来取消订阅。

**Operators** :`操作符`有创建、转换、组合、错误。

**Subject**: `主体`,是同时充当 Observable 和 Observer 的特殊 Observable。next() 方法向订阅者发送数据,也可以订阅其他 Observable。

**Schedulers**: `调度器`,控制 Observable 的执行时机和线程。 有 `asyncScheduler`、`queueScheduler` 和 `observeOnScheduler` 等。



### 常用的 API

1. **创建操作符**:
   - `of()`: 创建一个发出指定值序列的 Observable。
   - `from()`: 将其他数据结构转换为 Observable。
   - `interval()`: 创建一个定期发出递增整数的 Observable。
   - `timer()`: 创建一个在指定延迟后发出单个值的 Observable。
2. **转换操作符**:
   - `map()`: 对 Observable 发出的每个值应用转换函数。
   - `filter()`: 只发出符合指定条件的值。
   - `switchMap()`: 只会发出当前最新产生的 Observable 的值,之前的 Observable 会被丢弃
   - `mergeMap()`: 会发出所有 Observables 的值,并行合并
3. **组合操作符**:
   - `concat()`: 顺序连接多个 Observables。
   - `merge()`: 并行发出多个 Observables 的值。
   - `combineLatest()`: 当任意一个 Observable 发出值时,发出一个值数组。
   - `forkJoin()`: 等待所有 Observables 完成,然后发出一个值数组。
4. **错误处理操作符**:
   - `catch()`: 捕获并处理 Observable 抛出的错误。
   - `retry()`: 出错误时重新订阅 Observable。
5. **订阅和取消订阅**:
   - `subscribe()`: 订阅 Observable,接收值、错误和完成通知。
   - `unsubscribe()`: 取消对 Observable 的订阅。
6. **主题 (Subject)**:
   - `Subject`: 既是 Observable 又是观察者的特殊类型。
   - `BehaviorSubject`: 保留最新发出的值,并在新订阅时立即发出该值。
   - `ReplaySubject`: 保留指定数量的发出值,并在新订阅时重放这些值。
   - `AsyncSubject`: 仅在 Observable 完成时发出最后一个值。
7. **调度器**:
   - `asyncScheduler`: 在事件循环的下一个可用时间点执行任务。
   - `queueScheduler`: 以先进先出的顺序执行任务。
   - `animationFrameScheduler`: 在浏览器动画帧中执行任务。

### pipe 

它接受一个或多个操作符作为参数,并返回一个新的函数

### promise和abservable区别

1. **数据流特性**:
   - Promise 一种单值、不可观察的数据流, 即一个 Promise 对象只能产生一个数据结果。
   - Observable 一种多值、可观察的数据流,它可以产生多个数据结果,并且可以是同步或异步的。
2. **订阅方式**:
   - Promise 使用 `.then()` 和 `.catch()` 方法进行订阅和处理。
   - Observable 使用 `.subscribe()` 方法进行订阅,并可以通过 RxJS 提供的各种操作符进行数据流的处理。
3. **取消订阅**:
   - Promise 不支持取消订阅,一旦 Promise 对象被创建,就只能等待它完成或失败。
   - Observable 支持取消订阅,开发者可以通过调用 `.unsubscribe()` 方法来取消订阅。
4. **适用场景**:
   - Promise 适用于单次异步操作,如 HTTP 请求、文件读写等。
   - Observable 适用于需要处理连续、多个数据的场景,如事件监听、定时器、WebSocket 等。


### 什么情况下使用RXjs什么情况下使用promise

- 如果你的异步操作相对简单，或者你只需要处理一个异步操作，Promise 可能是更好的选择。
- 如果你的应用需要处理多个异步操作，特别是当这些操作需要组合、转换或以复杂的方式相互依赖时，RxJS 提供了更强大的工具和灵活性。
- 在某些情况下，你可能会发现将 Promise 和 RxJS 结合使用可以达到最佳效果。例如，你可以使用 Promise 来处理单个异步操作，然后将结果转换为 Observable，以便利用 RxJS 的操作符。


