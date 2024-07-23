### useEffect

```js
function useEffect(callback, dependencies) {
  const prevDependencies = useRef([]);
  let cleanUp ;

  const dependenciesHaveChanged = dependencies.some((dep, index) => 
    !Object.is(dep, prevDependencies.current[index])
  );
  if(!prevDependencies.current.length ｜｜ dependenciesHaveChanged) {
    cleanUp = callback();
    callback();

  }
  prevDependencies.current = dependencies;
  return function cleanup() {
    cleanUp();
  };
}
```

### 简化版的 `useState` 源码

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

### useInterval实现

```js
import { useCallback, useEffect } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useCallback(callback,[callback])

  // 设置定时器
  useEffect(() => {

    if (delay !== null) {
      const id = setInterval(savedCallback, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
```


### 自己封装hook



**useToggle**

> 状态切换

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

> 缓存数据

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

> callback 传入的是一个 Promise 函数，将 loading、error、value 统一处理

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

> 渲染多少次

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

> 监听状态

```js
function useAddListener(name) {
    useEffect(() => {
        console.log(name, ' - 组件被挂载或者更新完成 -- 添加监听');
        return () => {
            console.log(name, ' - 组件即将被卸载 -- 移除监听');
        }
    });
}
```

**在线检测功能**

> 使用listener监听online offline 确定网络状态,根据状态返回一个组建组建返回在线情况。

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

