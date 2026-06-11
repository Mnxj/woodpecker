- Built-in routing, building, deployment, testing, etc. Provides an integrated plugin set for React that covers daily development needs.
- Supports configured routes and convention-based routes. Route data loading simplifies request handling (`useClientLoaderData`). In three-level nested routes, you can parallelize data fetching.
- Less is supported by default. One-click code generation. Lint via `umi lint`.

A vanilla Umi app does NOT ship any plugins by default. To use Max features (data flow, antd, etc.), install the plugin and enable it manually:

```js
pnpm add -D @umijs/plugins

// .umirc.ts
export default {
  plugins: ['@umijs/plugins/dist/antd'],
  antd: {}
}

```

### Configured routes

Configured routes are defined in a route configuration file, where developers explicitly specify each route's path, component, and other options. Pros: clear route structure, easy to manage and maintain — especially in large projects.

### Convention-based routes

Convention-based routing automatically infers route rules from file and folder structure. Developers don't need to write a route config explicitly. Pros: less config, more intuitive project structure. Typically done by creating files/folders under `src/pages` — UmiJS auto-generates routes from this structure.



### Proxying

> [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

```js
export default {
  proxy: {
    '/api': {
      'target': 'http://jsonplaceholder.typicode.com/',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },
}
```



### Building micro-frontends with UmiJS

Relies on Umi's plugin system and convention-based routes:

### Steps

1. **Install the micro-frontend plugin**: e.g. `@umijs/plugin-micro-app`.

2. **Configure the host app**: configure the micro-frontend plugin in the host — specify how to load sub-apps, the communication mechanism, etc.

3. **Build sub-apps**: each sub-app is an independent UmiJS app following the conventions and plugin configuration.

4. **Load sub-apps**: load and unload sub-apps from the host via routes or the plugin's APIs.

5. **Inter-app communication**: use the plugin's communication mechanism for data sharing and events between apps.

With these steps you can implement a micro-frontend architecture in UmiJS, splitting a large app into multiple independent sub-apps that can each be developed and deployed independently — improving maintainability and scalability.
