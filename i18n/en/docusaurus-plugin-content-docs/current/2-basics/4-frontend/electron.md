### How does communication work in Electron?

Inter-process communication falls into three categories:

**Main → Renderer**: send via `webContents.send` ---> listen with `ipcRenderer.on`

**Renderer → Main**: send via `ipcRenderer.send` ---> listen with `ipcMain.on`

**Renderer → Renderer**: either route through the **main process** or use `ipcRenderer.sendTo` with the target renderer's id

### 7. How to update an Electron app?

### https://juejin.cn/post/7302724955700264999?searchId=202502181120008094A5DCD91D66B8ED708. SQLite doesn't work properly in Electron

If SQLite doesn't work in Electron, it's likely the native module wasn't compiled against the Electron runtime. Use `electron-rebuild` to recompile the SQLite module.

### 9. electron-rebuild — rebuild Node modules for Electron

`electron-rebuild` recompiles native Node.js modules to match the current Electron version. Electron uses specific versions of Chromium and Node.js, so native modules must be compatible.

### 10. Sharing state across processes in Electron

Use IPC, or shared memory (e.g. `SharedArrayBuffer`). The main process can hold a global state and the renderer can update/read it via IPC.



### How many threads does Electron have under the hood?

Electron has these main process types:

- Main process
- Renderer process
- GPU process


