### pnpm build 
1.  `umi: command not found`
    npm install umi -g
2. `AssertionError [ERR_ASSERTION]: Invalid config keys: qiankun`





### [Bug]微应用文件跟新后，访问的还是旧版文件]

> https://github.com/umijs/qiankun/issues/1816#top

1. 服务器需要给微应用的 `index.html` 配置一个响应头：`Cache-Control no-cache`，意思就是每次请求都检查是否更新。

以 `Nginx` 为例:

```nginx
location = /index.html {
  add_header Cache-Control no-cache;
}
```

2. 主应用的main.js的start方法增加参数

```js
start({
  prefetch: ['A','B'], // 预加载 name为 A和B的子应用
  async fetch(url) { // 自定义fetch方法，加上一个no-cache
    return window.fetch(url, {
      cache: 'no-cache'
    })
  }
})
```

