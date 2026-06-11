---
title: Jest
sidebar_position: 1
---



### Mocking patterns

`@testing-library/react`'s `render` lets you pass `props` to a component. Pass them directly in `render`:

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

Use `jest.fn()` to mock function props:

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

Use `jest.mock` to mock a module:

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

Use `@testing-library/user-event` to simulate user events:

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

### Configuring Jest

```js
// jest.config.js
module.exports = {
   maxWorkers: 4, // set to ~1.5x available CPU cores, or tune
   // Test environment
   testEnvironment: 'node',
   // Match test files
   testMatch: [
     '**/__tests__/**/*.+(js|jsx|ts|tsx)',
     '**/?(*.)+(spec|test).+(js|jsx|ts|tsx)',
   ],
   // Other config...
  coverageThreshold: {
     global: {
       branches: 80,
       functions: 80,
       lines: 80,
       statements: 80,
     },
   },
};

testEnvironment — specify environment (node, jsdom, etc.).
testMatch — which test files Jest should run.
collectCoverage — whether to collect coverage.
coverageReporters — coverage report formats.
coverageThreshold — coverage thresholds.
transform — how to transform test files.
setupFilesAfterEnv — files to run after the test environment is set up.
snapshotSerializers — snapshot serializers.
```



### CLI args

jest --watchAll --coverage

`--watchAll` makes Jest watch all files and re-run tests on changes.

`--coverage` produces a coverage report.

