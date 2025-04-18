### 实现一个类似antdeign的modal

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;
//ReactDOM.createPortal 用于将模态框的内容渲染到 document.body 中
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;

import Modal from './Modal';
import './modal.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Modal Title</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default App;
```

