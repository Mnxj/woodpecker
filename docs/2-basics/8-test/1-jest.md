---
title: Jest
sidebar_position: 1
---



### mock的方式

`@testing-library/react` 提供的 `render` 方法允许你传递 `props` 给组件。你可以直接在 `render` 方法中传递 `props`：

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders with custom props', () => {
  const { getByText } = render(<MyComponent myProp="value" />);
  const element = getByText(/value/i);
  expect(element).toBeInTheDocument();
});
```

使用 `jest.fn()` 模拟函数 `props`

```javascript
import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

test('calls onClick prop when button is clicked', () => {
  const handleClick = jest.fn();
  const { getByRole } = render(<MyComponent onClick={handleClick} />);
  const button = getByRole('button');
  button.click();
  expect(handleClick).toHaveBeenCalled();
});
```

使用 `jest.mock` 模拟模块

```javascript
// MyComponent.js
import React from 'react';
import ExternalModule from './ExternalModule';

export default function MyComponent({ data }) {
  return <ExternalModule data={data} />;
}

// MyComponent.test.js
import React from 'react';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';
import ExternalModule from './ExternalModule';

jest.mock('./ExternalModule', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => <div>Mocked ExternalModule</div>),
}));

test('renders ExternalModule with mocked props', () => {
  const { getByText } = render(<MyComponent data="mocked data" />);
  const element = getByText(/Mocked ExternalModule/i);
  expect(element).toBeInTheDocument();
});
```

使用 `@testing-library/user-event` 模拟用户事件

```javascript
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MyComponent from './MyComponent';

test('updates state when input changes', () => {
  const { getByPlaceholderText } = render(<MyComponent />);
  const input = getByPlaceholderText(/input/i);
  fireEvent.change(input, { target: { value: 'new value' } });
  expect(input.value).toBe('new value');
});
```

### 配置 Jest

```js
// jest.config.js
module.exports = {
   maxWorkers: 4, // 设置为机器可用核心数的1.5倍，或者根据需要调
   // 指定测试环境
   testEnvironment: 'node',
   // 指定测试文件的匹配模式
   testMatch: [
     '**/__tests__/**/*.+(js|jsx|ts|tsx)',
     '**/?(*.)+(spec|test).+(js|jsx|ts|tsx)',
   ],
   // 其他配置...
  coverageThreshold: {
     global: {
       branches: 80,
       functions: 80,
       lines: 80,
       statements: 80,
     },
   },
};

testEnvironment：指定测试环境，如 node、jsdom 等。
testMatch：指定 Jest 应该运行哪些测试文件。
collectCoverage：是否生成代码覆盖率报告。
coverageReporters：指定代码覆盖率报告的格式。
coverageThreshold：设置代码覆盖率的阈值。
transform：指定如何转换测试文件。
setupFilesAfterEnv：在测试环境设置之后运行的文件。
snapshotSerializers：指定快照序列化器。
```



### 命令行参数

jest --watchAll --coverage

`--watchAll` 使 Jest 监听所有文件的变化并重新运行测试，

`--coverage` 生成代码覆盖率报告。

