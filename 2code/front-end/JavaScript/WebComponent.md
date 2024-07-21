###  

```js
// html中定义一个复用结构
<template id="my-template">
  <style>
    .wrapper {
      color: blue;
    }
  </style>
  <span class="wrapper"><slot></slot></span>
</template>

//自定义元素。这可以通过扩展 HTMLElement 类来完成
class MyElement extends HTMLElement {
  constructor() {
    super(); // 必须首先调用 super 方法
    const template = document.getElementById('my-template').content;
    // 创建一个 shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.cloneNode(true)); //导入
    // 创建一些 HTML 元素
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const text = document.createElement('span');
    text.textContent = this.getAttribute('text');

    wrapper.appendChild(text);
    shadow.appendChild(wrapper);
  }
}

// 注册自定义元素
customElements.define('my-element', MyElement);

//使用
<!DOCTYPE html>
<html>
<head>
  <title>Web Components Example</title>
</head>
<body>
  <my-element text="Hello, Web Components!"></my-element>
</body>
</html>
```

