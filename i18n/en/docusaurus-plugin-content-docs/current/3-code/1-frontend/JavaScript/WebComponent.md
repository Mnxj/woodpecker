###

```js
// Define a reusable structure in HTML
<template id="my-template">
  <style>
    .wrapper {
      color: blue;
    }
  </style>
  <span class="wrapper"><slot></slot></span>
</template>

// Custom element — done by extending HTMLElement
class MyElement extends HTMLElement {
  constructor() {
    super(); // must call super first
    const template = document.getElementById('my-template').content;
    // Create a shadow root
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.cloneNode(true)); // import
    // Create some HTML elements
    const wrapper = document.createElement('span');
    wrapper.setAttribute('class', 'wrapper');

    const text = document.createElement('span');
    text.textContent = this.getAttribute('text');

    wrapper.appendChild(text);
    shadow.appendChild(wrapper);
  }
}

// Register the custom element
customElements.define('my-element', MyElement);

// Usage
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

