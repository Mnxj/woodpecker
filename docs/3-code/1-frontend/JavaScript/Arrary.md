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

### 实现一个表格内 date 字段正序和倒序

```js
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Table Sort Example</title>
<script>
function sortTableByDate(columnIndex, order) {
    // 获取表格元素
    var table = document.getElementById("myTable");
    // 获取表格行
    var rows = Array.from(table.rows).slice(1); // 排除表头

    // 根据指定的列索引和排序顺序对行进行排序
    rows.sort(function(a, b) {
        var dateA = new Date(a.cells[columnIndex].textContent);
        var dateB = new Date(b.cells[columnIndex].textContent);
        if (order === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    // 清空表格内容
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // 将排序后的行添加回表格
    rows.forEach(function(row) {
        table.appendChild(row);
    });
}
</script>
</head>
<body>

<table id="myTable">
    <tr>
        <th>Name</th>
        <th>Date</th>
    </tr>
    <tr>
        <td>John Doe</td>
        <td>2023-01-01</td>
    </tr>
    <tr>
        <td>Jane Smith</td>
        <td>2023-02-01</td>
    </tr>
    <tr>
        <td>Emily Johnson</td>
        <td>2023-03-01</td>
    </tr>
</table>

<button onclick="sortTableByDate(1, 'asc')">Sort by Date Ascending</button>
<button onclick="sortTableByDate(1, 'desc')">Sort by Date Descending</button>

</body>
</html>
```

### 请实现一个算法，实现数组乱序，要求每个数字出现在每个位置的概率是平均的

```js
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // 生成一个从0到i的随机索引
        const j = Math.floor(Math.random() * (i + 1));
        // 交换元素
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 示例使用
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffledArray = shuffleArray(myArray);
console.log(shuffledArray);
```

