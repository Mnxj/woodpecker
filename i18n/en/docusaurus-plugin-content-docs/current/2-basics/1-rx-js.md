---
sidebar_position: 1
title: Rx.js
---

### What is RxJS, and what are the core concepts?

It's used for async data processing, event handling, multi-source integration, and reactive UIs.

Core concepts:

**Observable**: An `observable object` that can emit three signals — value, error, and completion. Create one with `new Observable()` or creation operators like `of()`, `from()`.

**Observer**: An `observer` subscribes to an Observable and handles emitted signals. It must implement `next()`, `error()`, and `complete()`.

**Subscription**: Represents the connection between Observer and Observable. Use `subscribe()` to subscribe and `unsubscribe()` to cancel.

**Operators**: Includes creation, transformation, combination, and error operators.

**Subject**: A special Observable that is both Observable and Observer. Use `next()` to push data to subscribers; it can also subscribe to other Observables.

**Schedulers**: Control when and on which thread an Observable runs. Examples: `asyncScheduler`, `queueScheduler`, `observeOnScheduler`.



### Common APIs

1. **Creation operators**:
   - `of()`: Create an Observable that emits a given sequence.
   - `from()`: Convert other data structures into an Observable.
   - `interval()`: Create an Observable that emits incrementing integers on a fixed interval.
   - `timer()`: Create an Observable that emits a single value after a delay.
2. **Transformation operators**:
   - `map()`: Apply a transformation to each emitted value.
   - `filter()`: Emit only values matching a condition.
   - `switchMap()`: Only emit from the latest inner Observable; previous ones are discarded.
   - `mergeMap()`: Emit from all inner Observables, merged in parallel.
3. **Combination operators**:
   - `concat()`: Concatenate multiple Observables in sequence.
   - `merge()`: Emit values from multiple Observables in parallel.
   - `combineLatest()`: Emit a combined array whenever any input emits.
   - `forkJoin()`: Wait for all to complete, then emit a combined array.
4. **Error operators**:
   - `catch()`: Catch and handle errors from an Observable.
   - `retry()`: Re-subscribe to the source on error.
5. **Subscribe / unsubscribe**:
   - `subscribe()`: Subscribe to the Observable; receive values, errors, completion.
   - `unsubscribe()`: Cancel the subscription.
6. **Subjects**:
   - `Subject`: Both Observable and Observer.
   - `BehaviorSubject`: Retains the latest emitted value and replays it to new subscribers.
   - `ReplaySubject`: Retains a specified number of emitted values and replays them.
   - `AsyncSubject`: Emits only the last value, and only on completion.
7. **Schedulers**:
   - `asyncScheduler`: Execute tasks on the next available tick of the event loop.
   - `queueScheduler`: Execute tasks in FIFO order.
   - `animationFrameScheduler`: Execute tasks on the browser animation frame.

### pipe

Takes one or more operators as arguments and returns a new function.

### Difference between Promise and Observable

1. **Data flow**:
   - A Promise is a single-value, non-observable data flow — it produces one result.
   - An Observable is a multi-value, observable data flow — it can produce multiple results, sync or async.
2. **Subscription**:
   - Promise uses `.then()` and `.catch()` for subscription and handling.
   - Observable uses `.subscribe()` and can compose operators from RxJS.
3. **Cancellation**:
   - Promise doesn't support cancellation — once created, you wait for it to fulfill or reject.
   - Observable supports cancellation via `.unsubscribe()`.
4. **Use cases**:
   - Promise fits single async operations: HTTP requests, file I/O.
   - Observable fits sequential/multiple data: event listeners, timers, WebSocket.


### When to use RxJS vs Promise?

- If your async logic is simple or you only need one async op, Promise is usually the better choice.
- If your app deals with many async operations — especially when they need composition, transformation, or complex dependencies — RxJS provides more power and flexibility.
- Sometimes combining the two yields the best result: use Promise for single async ops and convert to Observable to leverage RxJS operators.

