---
title: Yalc
sidebar_position: 2
slug: /Yalc
---

## Background

### Why debug a component library locally?

> When architecting a project, to make it more robust and maintainable, you'll often build components into a component library.

When you're working on a `component library / SDK / plugin` or another npm package and you want to know how it actually behaves when `imported / used` by a frontend project, what do you do?

For example:

> `demo` depends on `ui`. I implemented a feature in `ui`, but I want to know how it actually behaves in `demo`. What should I do?

Generally you have a few options:

#### **1. Reference by relative or absolute path**

```js
// import { Button } from 'ui'
// For debugging, force a relative or absolute path
import { Button } from 'C:/codes/ui/dist'
```

**Downside:** you have to `frequently modify business code`, which is tedious and risky — after all, who can guarantee `humans don't make mistakes`?

2. #### **Publish to npm registry, then debug**

```shell
# Bump version & publish in ui
npm version prerelease # bump
npm publish # publish
# In admin-management
npm install goood-ui@latest
```

**Downside:** pollutes the npm version timeline and requires frequent `npm install`, which is inefficient.

3. **Use npm link or yarn link to debug**

- Create a symlink in the global package path pointing to `ui`'s dist package;
- In `demo`, link the global symlink to its `node_modules/ui` — usually two steps:

```bash
# Step 1, in ui:
npm link
# or
yarn link
# Step 2, in admin-management:
npm link ui
# or
yarn link ui
```

### What's wrong with npm link / yarn link?

[npm link](https://docs.npmjs.com/cli/v10/commands/npm-link)

- Version conflicts with globally installed npm packages or other project dependencies. <!-- Debugging this can wear down a developer's morale -->
- Affects existing packages in node_modules
- Various weird issues caused by symlinks and the file system

- `--legacy-peer-deps` ignores conflicts. <!-- Causes the component to report missing dependencies -->
- For existing component-library debugging, you may also need to tweak parameters. <!-- If build and test share a file, you may need to repeatedly change main and file parameters -->

[yarn link](https://classic.yarnpkg.com/lang/en/docs/cli/link/)

- Also has dependency-conflict issues
- Affects existing packages in node_modules
- Various weird issues caused by symlinks and the file system

## What is [yalc](https://github.com/wclr/yalc)?

> For `package authors`, a `better development workflow` than yarn/npm link.
>
> `yalc` is a simple, [file-system](https://so.csdn.net/so/search?q=%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F&spm=1001.2101.3001.7020)-based package manager that lets you develop and test your npm modules locally without publishing to the npm registry.



1. Use `nodemon` and `yalc` together for local linking of a component library.

   `nodemon` is a tool for developing Node.js apps — it watches your files and automatically restarts your app when files change.

```shell
npm install -g yalc
npm i nodemon -g
```

2. In the component library's `package.json`, add:

```js
"watch": "nodemon --ignore dist/ --ignore node_modules/ --watch src/ -C -e ts,tsx,scss,less --debug -x \"npm run build && yalc push\""
```

3. In the `component library` project, use `yalc` to publish the package. It will be added to `yalc`'s local registry.

```shell
yalc publish
npm run watch
```

4. In the `host system` project, use `yalc` to add the component library:

```shell
yalc add <package-name> --link
```

5. Clean up yalc local dependencies:

```js
yalc remove <package-name>
// or
yalc remove --all // remove all and restore
```





### Test demo

> https://github.com/LwcReber/yalc-project
