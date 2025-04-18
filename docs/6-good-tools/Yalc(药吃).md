---
title: Yalc(药吃)
sidebar_position: 2
slug: /Yalc
---

## 前言

### 为什么要本地调试组件库？

> 在做项目架构设计的时，为了让项目更健壮和易于维护，会在组件库进行组件化开发。

当你正在开发一个`组件库/sdk/插件`或其他npm库的时候，如果你想知道它们在一个前端项目上`被依赖/被使用`的真正效果时，你应该怎么做？

例如：

> `demo`依赖了`ui`，我在`ui`实现了一个功能，但我想知道它在`demo`中的实际表现如何，我应该怎么做呢？

一般来说，我有以下几种选择：

#### **1.通过相对或绝对路径引用**

```js
// import { Button } from 'ui'
// 为了调试，强行改成了绝对或者相对路径
import { Button } from 'C:/codes/ui/dist'
```

**此方案缺点**：`需要频繁改业务代码`，这既麻烦又危险，毕竟谁能保证`人类不犯错`呢？。

2. #### **发布到npm源后再调试**

```shell
# 去ui里升级版本&发布
npm version prerelease # 升级版本
npm publish # 发布
# 在admin-management中
npm install goood-ui@latest
```

**此方案缺点**：污染了npm版本线，且需要频繁npm install，效率也不高

3. **使用npm link或yarn link调试**

- 在全局包路径（Global Path）下创建一个软连接(Symlinked)指向`ui`的dist包;
- 在`demo`里通过软连接，将全局的软链接指向其`node_modules/ui` 通常也需要两步：

```bash
# 第一步 在ui中执行：
npm link
# or
yarn link
# 第二步 在admin-management中执行：
npm link ui
# or
yarn link ui
```

### npm link/yarn link有什么问题？

[npm link](https://docs.npmjs.com/cli/v10/commands/npm-link)

- 与全局安装的npm包或其他项目依赖的版本冲突。<!--调试起来可能会消磨开发这心态-->
- 影响node_modules中原本的包
- 软链接和文件系统引发的其他各种奇怪的问题

- --legacy-peer-deps忽略冲突。<!--会造成组件内提示依赖的包找不到-->
- 对于已存在的组件库调试还需要修改一些参数。<!--build 和 test公用一个文件就会出现main和file参数需要反复修改-->

[yarn link](https://classic.yarnpkg.com/lang/en/docs/cli/link/)

- 也存在依赖冲突问题
- 影响node_modules中原本的包
- 软链接和文件系统引发的其他各种奇怪的问题

## 什么是[yalc](https://github.com/wclr/yalc)

> 对`包开发者`而言，一种比yarn/npm link`更好的开发流程`。
>
> `yalc` 是一个简单的、基于[文件系统](https://so.csdn.net/so/search?q=文件系统&spm=1001.2101.3001.7020)的包管理器，它可以让你在本地开发和测试你的 npm 模块，而不需要发布到 npm 仓库。



1. 借助 `nodemon` 和 `yalc` 来实现组件库的本地联调。

   `nodemon` 是一个用于开发 Node.js 应用的工具，它会监视你的文件变化，并在文件变化时自动重启你的应用

```shell
npm install -g yalc
npm i nodemon -g
```

2. 在组件库中package.json添加

```js
"watch": "nodemon --ignore dist/ --ignore node_modules/ --watch src/ -C -e ts,tsx,scss,less --debug -x \"npm run build && yalc push\""
```

3. 在`组件库`项目中使用 `yalc` 来发布包。会将包添加到 `yalc` 的本地仓库

```shell
yalc publish
npm run watch
```

4. 在`主系统`项目中，你可以使用 `yalc` 来添加组件库

```shell
yalc add <package-name> --link
```

5. 清除yalc本地依赖包

```js
yalc remove <package-name>
// or
yalc remove --all // 移除所有依赖并还原
```





### 测试demo

> https://github.com/LwcReber/yalc-project