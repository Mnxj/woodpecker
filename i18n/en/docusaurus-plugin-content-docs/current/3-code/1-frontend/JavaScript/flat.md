```js
/**
 *
 * @param {*} array deeply nested array
 * @returns the flattened new array
 */
const flat1 = (array) => {
  return array.reduce((result, it) => {
    return result.concat(Array.isArray(it) ? flat1(it) : it)
  }, [])
}

let arr1 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]
console.log(flat1(arr1))

// Native flat method
/**
 *
 * @param {*} array deeply nested array
 * @returns new array
 */
const flat2 = (array) => {
  return array.flat(Infinity)
}

let arr2 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]

console.log(flat2(arr2))

const flat3 = (array) => {
  const result = []
  const stack = [ ...array ]

  while (stack.length !== 0) {
    const val = stack.pop()
    if (Array.isArray(val)) {
      stack.push(...val)
    } else {
      result.unshift(val)
    }
  }
  return result
}

let arr3 = [
  1,
  [ 2, 3, 4 ],
  [ 5, [ 6, [ 7, [ 8 ] ] ] ]
]

console.log(flat3(arr3))

```
