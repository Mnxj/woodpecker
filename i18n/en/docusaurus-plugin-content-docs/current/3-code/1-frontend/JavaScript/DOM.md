### Implement a `prepend()` with native DOM APIs

```js
// Insert one or more nodes at the beginning of the parent's child list
function prepend(parent, ...nodes) {
    // Iterate over all nodes to insert
    nodes.forEach(node => {
        // If the node is a DOM element, insert it directly
        if (node instanceof Element) {
            parent.insertBefore(node, parent.firstChild);
        } else if (node instanceof Text) {
            // If it's a text node, create a new text node and insert
            parent.insertBefore(new Text(node.textContent), parent.firstChild);
        } else if (node instanceof DocumentFragment) {
            // If it's a DocumentFragment, recursively insert child nodes
            node.childNodes.forEach(childNode => {
                parent.insertBefore(childNode, parent.firstChild);
            });
        } else {
            // Otherwise try to convert it to a string and insert
            parent.insertBefore(new Text(String(node)), parent.firstChild);
        }
    });
}

// Usage
const parentElement = document.getElementById('parent');
const childElement = document.createElement('div');
childElement.textContent = 'Hello, World!';
prepend(parentElement, childElement);
```



### A simple chat box

A simple chat box using WebSocket:

```js
<div id="chat">
  <div id="messages"></div>
  <input id="messageInput" type="text" placeholder="Type a message..." />
  <button id="sendButton">Send</button>
</div>

<script>
  const socket = new WebSocket('ws://your-websocket-url');

  socket.onmessage = function(event) {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML += `<div>${event.data}</div>`;
  };

  document.getElementById('sendButton').onclick = function() {
    const input = document.getElementById('messageInput');
    socket.send(input.value);
    input.value = '';
  };
</script>
```
