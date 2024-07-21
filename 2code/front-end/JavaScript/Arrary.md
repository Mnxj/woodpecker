### unshift用法解释

```js
let arr = [1,2,3]


Array.protopty.myUnshift = function() {
  const let = arguments.length;
  for(let i = len-1;i>=0;i++) {
    const element = arguments[i];
    this.splice(0,0,elemnt)
  }
  return this.lenght
}
arr.myUnshift(3)
console.log(arr)3123
```

### some 函数实现

```js
Array.prototype.mySome = function(fn) {
  for(let i = 0;i<this.length;i++){
    if(fn(this[i])){
      return true;
    }
  }
  return false;
}
console.log([1, 2, 3, 4].mySome(item => item > 6)); // false

```

### map实现

```js
Array.prototype.selfMap = function(fn) {
    let mappedArr = [];
    for (let i = 0; i < this.length; i++) {
      if(!this.hasOwnProperty(i)) continue
      mappedArr[i] = fn(this[i]);
    }
    return mappedArr;
};
let arr = [1, 2, 3];
console.log(arr.selfMap(item => item * 2)); // [2, 4, 6]
```

### 数组扁平化

```js
Array.prototype.myFlat = function(deep=1) {
  if(deep === 0) return this;
  return this.reduce((pre,cur)=> {
    if(Array.isArray(cur)) {
      return [...pre, ...cur.myFlat(deep-1)]
    }
    return [...pre,cur]
  },[]);
}

Array.prototype.myFlat = function(arr) {
  return [].concat(arr.map(v->Array.isArray(v)?myFlat(v):v))
}

  console.log([1, 2, 3, [4, [5, [6]]]].myFlat(2)); // [1, 2, 3, 4, 5, [6]]

```



### 数组去重方式

```js
// 1.filter indexof
var arr = [ {},{},'','',12,12,'22','22',undefind,NAN]
Array.proptype.myUnique = function() {
  return this.filter((v,idx)=> {
    return this.indexof(v,0) = idx;
  })
}
console.log(arr.myUnique());
// set
// map
```
