### Explanation of `unshift`

```js
let arr = [1,2,3]


Array.prototype.myUnshift = function() {
  const len = arguments.length;
  for(let i = len-1; i >= 0; i--) {
    const element = arguments[i];
    this.splice(0, 0, element)
  }
  return this.length
}
arr.myUnshift(3)
console.log(arr) // 3,1,2,3
```

### Implement `some`

```js
Array.prototype.mySome = function(fn) {
  for(let i = 0; i < this.length; i++){
    if(fn(this[i])){
      return true;
    }
  }
  return false;
}
console.log([1, 2, 3, 4].mySome(item => item > 6)); // false

```

### Implement `map`

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

### Array flattening

```js
Array.prototype.myFlat = function(deep=1) {
  if(deep === 0) return this;
  return this.reduce((pre, cur) => {
    if(Array.isArray(cur)) {
      return [...pre, ...cur.myFlat(deep-1)]
    }
    return [...pre, cur]
  }, []);
}

Array.prototype.myFlat = function(arr) {
  return [].concat(arr.map(v => Array.isArray(v) ? myFlat(v) : v))
}

  console.log([1, 2, 3, [4, [5, [6]]]].myFlat(2)); // [1, 2, 3, 4, 5, [6]]

```



### Array deduplication

```js
// 1. filter + indexOf
var arr = [ {}, {}, '', '', 12, 12, '22', '22', undefined, NaN]
Array.prototype.myUnique = function() {
  return this.filter((v, idx) => {
    return this.indexOf(v, 0) === idx;
  })
}
console.log(arr.myUnique());
// set
// map
```

### Sort a table's date column ascending/descending

```js
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Table Sort Example</title>
<script>
function sortTableByDate(columnIndex, order) {
    // Get the table
    var table = document.getElementById("myTable");
    // Get rows (excluding header)
    var rows = Array.from(table.rows).slice(1);

    // Sort rows by the given column index and order
    rows.sort(function(a, b) {
        var dateA = new Date(a.cells[columnIndex].textContent);
        var dateB = new Date(b.cells[columnIndex].textContent);
        if (order === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    // Clear table body
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Append sorted rows back to the table
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

### Implement an array shuffle where every number has equal probability of being at any position

```js
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // Random index in [0, i]
        const j = Math.floor(Math.random() * (i + 1));
        // Swap
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Example
const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const shuffledArray = shuffleArray(myArray);
console.log(shuffledArray);
```

