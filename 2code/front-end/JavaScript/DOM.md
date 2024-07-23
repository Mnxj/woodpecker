### 用原生 DOM API 实现一个 prepend() 方法

```js
//用于在指定元素的子节点列表的开头插入一个或多个节点
function prepend(parent, ...nodes) {
    // 遍历所有要插入的节点
    nodes.forEach(node => {
        // 如果节点是DOM元素，则直接插入
        if (node instanceof Element) {
            parent.insertBefore(node, parent.firstChild);
        } else if (node instanceof Text) {
            // 如果节点是文本节点，创建一个新的文本节点并插入
            parent.insertBefore(new Text(node.textContent), parent.firstChild);
        } else if (node instanceof DocumentFragment) {
            // 如果节点是文档片段，递归地将子节点插入
            node.childNodes.forEach(childNode => {
                parent.insertBefore(childNode, parent.firstChild);
            });
        } else {
            // 如果节点是其他类型，尝试将其转换为字符串并插入
            parent.insertBefore(new Text(String(node)), parent.firstChild);
        }
    });
}

// 使用示例
const parentElement = document.getElementById('parent');
const childElement = document.createElement('div');
childElement.textContent = 'Hello, World!';
prepend(parentElement, childElement);
```



### 