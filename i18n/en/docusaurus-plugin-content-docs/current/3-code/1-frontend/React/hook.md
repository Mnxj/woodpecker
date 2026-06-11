### useEffect

```js
function useEffect(callback, dependencies) {
  const prevDependencies = useRef([]);
  let cleanUp;

  const dependenciesHaveChanged = dependencies.some((dep, index) =>
    !Object.is(dep, prevDependencies.current[index])
  );
  if(!prevDependencies.current.length || dependenciesHaveChanged) {
    cleanUp = callback();
    callback();

  }
  prevDependencies.current = dependencies;
  return function cleanup() {
    cleanUp();
  };
}
```

### Simplified `useState` source

```js
function useState(initialValue) {
  let _val = initialValue;
  function setState(newVal) {
    _val = newVal;
  }
  function getState() {
    return _val;
  }
  return [getState, setState];
}
```

### useInterval implementation

```js
import { useCallback, useEffect } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useCallback(callback, [callback])

  // Set up the interval
  useEffect(() => {

    if (delay !== null) {
      const id = setInterval(savedCallback, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```


### Custom hooks



**useToggle**

> Toggle state

```js
export default function useToggle(defaultValue) {
  const [value, setValue] = useState(defaultValue)

  function toggleValue(value) {
    setValue(currentValue =>
      typeof value === "boolean" ? value : !currentValue
    )
  }

  return [value, toggleValue]
}
```

**useStorage**

> Cache data

```js
export function useLocalStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage(key, defaultValue) {
  return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage(key, defaultValue, storageObject) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return defaultValue()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}
```

**useAsync**

> The callback takes a function returning a Promise; loading, error, value are managed uniformly.

```js
import { useCallback, useEffect, useState } from "react"

export default function useAsync(callback, dependencies = []) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState()
  const [value, setValue] = useState()

  const callbackMemoized = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then(setValue)
      .catch(setError)
      .finally(() => setLoading(false))
  }, dependencies)

  useEffect(() => {
    callbackMemoized()
  }, [callbackMemoized])

  return { loading, error, value }
}
```

**useFetch**



```js
const DEFAULT_OPTIONS = {
  headers: { "Content-Type": "application/json" },
}

export default function useFetch(url, options = {}, dependencies = []) {
  return useAsync(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then(res => {
      if (res.status === 200) return res.data
      return Promise.reject(res)
    })
  }, dependencies)
}

const { loading, error, value } = useFetch(
    url,
    {
      method: 'post'
    }
  )
```

**useEffectDidMountOnce**

```js
import { useEffect } from "react"

export default function useEffectOnce(cb) {
  useEffect(cb, [])
}
```

**useEffectUnDidMountOnce**

```js
import { useEffect } from "react"

export default function useEffectOnce(cb) {
  useEffect(return () => cb, [])
}
```

**useRenderCount**

> Number of renders

```js
import { useEffect, useRef } from "react"

export default function useRenderCount() {
  const count = useRef(1)
  useEffect(() => count.current++)
  return count.current
}
```

**useDebounce**

```js
export default function useDebounce(callback, delay, dependencies) {
  const { reset, clear } = useTimeout(callback, delay)
  useEffect(reset, [...dependencies, reset])
  useEffect(clear, [])
}
```

 **useAddListener**

> Listen to status

```js
function useAddListener(name) {
    useEffect(() => {
        console.log(name, ' - component mounted/updated -- add listener');
        return () => {
            console.log(name, ' - component will unmount -- remove listener');
        }
    });
}
```

**Online-detection feature**

> Use listeners on `online`/`offline` to detect network status, then return a component showing the status.

```js
export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}
```

