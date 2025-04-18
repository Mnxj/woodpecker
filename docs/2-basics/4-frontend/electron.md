###  如何在 Electron 中进行通信？

进程间的通信可以分为以下三种：

**主进程** 到 **渲染进程**：通过 `webContents.send` 来发送 --->`ipcRenderer.on` 来监听

**渲染线程** 到 **主线程**：通过 `ipcRenderer.send`发送 ---> `ipcMain.on`来监听

**渲染进程** 到 **渲染进程**：通过**主进程转发**或者**通过ipcRenderer.sendTo指定渲染进程id进行发送**

### 7. Electron 应用怎么做更新？

### https://juejin.cn/post/7302724955700264999?searchId=202502181120008094A5DCD91D66B8ED708. Electron 中不能正常使用 SQLite

如果 SQLite 在 Electron 中不能正常工作，可能是因为本地模块未编译为适合 Electron 的版本。可以使用 `electron-rebuild` 重新编译 SQLite 模块。

### 9. Electron-rebuild 把 Node 模块重新变为 Electron 能使用的

`electron-rebuild` 是一个工具，可以将 Node.js 原生模块重新编译为适用于当前 Electron 版本的格式。这是因为 Electron 使用的是 Chromium 和 Node.js 的特定版本，原生模块需要与之兼容。

### 10. Electron 跨进程状态共享

可以通过 IPC 或使用共享内存（如 `sharedArrayBuffer`）来实现跨进程的状态共享。主进程可以维护一个全局状态，渲染进程通过 IPC 进行更新和读取。



### Electron 底层有几个线程

Electron 底层主要有以下几种线程：

- 主进程
- 渲染进程
- GPU 进程



