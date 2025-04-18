```js
const deepClone = (target, cache = new Map()) => {
  
    const isObject = (obj) => obj && typeof obj === 'object'
    if(!isObject(target)) return target;
    if(cache.has(target)) return cache.get(target);
    let cloneTarget = Array.isArray(target) ? [] : {}
    cache.set(target, cloneTarget)
    for (const key in target) {
      if(target.hasOwnProperty(key)){
        const value = target[ key ] 
        cloneTarget[ key ] = isObject(value) ? deepClone(value, cache) : value
      }
    }
    return cloneTarget
  }
  
  const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
  };
  
  target.target = target;
  
  console.time();
  const result1 = deepClone(target);
  console.log(result1)
  console.timeEnd();
```  