---
title: umi
sidebar_position: 2
---

### pnpm build
1.  `umi: command not found`
    npm install umi -g
2. `AssertionError [ERR_ASSERTION]: Invalid config keys: qiankun`




### [Bug] After updating micro-app files, the old version is still served

> https://github.com/umijs/qiankun/issues/1816#top

1. The server needs to set a response header for the micro-app's `index.html`: `Cache-Control no-cache`, meaning every request should check for updates.

For `Nginx`:

```nginx
location = /index.html {
  add_header Cache-Control no-cache;
}
```

2. Add parameters to the main app's `start` method in `main.js`:

```js
start({
  prefetch: ['A','B'], // preload child apps named A and B
  async fetch(url) { // custom fetch with no-cache
    return window.fetch(url, {
      cache: 'no-cache'
    })
  }
})
```

