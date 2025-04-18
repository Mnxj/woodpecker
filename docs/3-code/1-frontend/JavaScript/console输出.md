

 ```js
console.log(null == undefined) // true
console.log(null === undefined) // false
console.log(typeof(new Object()) == typeof(null)) // true
console.log(new Number('1') == 1) // true
console.log(new Number('1') === 1) // false
console.log(new Object('1') == 1) // true
console.log(new Object('1') === 1) // false
console.log(new Boolean() == false) // true
console.log(new Boolean() === true) // false



var a = 1
if (true) {
    console.log(a) // 1
    var a = 2
    var b = 3
    console.log(b) // 3
}
console.log(a) // 2
console.log(b) // 3
b = 4

var a = 1
function a () {}
console.log(a) // 1


var a = 1
function fun(a, b) {
    a = 2
    arguments[0] = 3
    arguments[1] = 1
    return a + b
}
console.log(fun(0, 0)) // 4
console.log(a) // 1

for (var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(5) // 5
    }, 0)
}
console.log(6) // 6



function A() {
    this.num1 = 1
}
A.prototype.num2 = 2
function B() {
    this.num1 = 3
}
B.prototype = new A()
var b1 = new B()
console.log(b1.num1) // 3
console.log(b1.num2) // 2
var b2 = B()
console.log(b2.num1) // error
console.log(b2.num2) // error

//
var a = {x: 1}
var b = a //复制的a的引用 b = {x:1}
a.x = a = {n: 1} //a = {n:1} a.x = a,所以 a.x={n:1}。
console.log(a) // {n:1}
console.log(b)// {x:{n:1}}

//

Function.prototype.a = () => alert(1)
Object.prototype.b = () => alert(2)
function A() {}
const a = new A()
a.a() //1
a.b() //2

//
let a = 0
console.log(a) //0
console.log(b) // undefind
let b = 0
console.log(c) //function
function c() {}
//
var x = 10
function a(y) {
    var x = 20
    return b(y)
}
function b(y) {
    return x + y
}
console.log(a(20)); //40

//
console.log(1)
setTimeout(() => {
    console.log(2)
})
process.nextTick(() => {
    console.log(3)
})
setImmediate(() => {
    console.log(4)
})
new Promise(resolve => {
    console.log(5)
    resolve()
    console.log(6)
})
    .then(() => {
        console.log(7)
    })
Promise.resolve()
    .then(() => {
        console.log(8)
        process.nextTick(() => {
            console.log(9)
        })
    })

//
    [1, 2, 3, 4, 5].map(parseInt) [1, NaN, NaN, NaN, NaN]
//
typeof typeof typeof []
// 1.'object' 2.'string' 3.'string'
// css颜色
<style>
div {color: red;} //3
#title {color: yellow;} //1
div.title {color: blue;} //2
</style>
<div class="title" id="title">abc</div>
//
<style>
    .classA {color: blue;}
    .classB {color: red} //1
</style>
<p class="classB classA">123</p>

//补充代码
function add(args) {
    return args;
}
function one(fn) {
    if(fn){
        return 1 + fn;
    }
    return 1;

}
function two(fn) {
    if(fn){
        return 2 + fn;
    }
    return 2;

}
console.log(one(add(two()))) // 3
console.log(two(add(one()))) // 3

//
function A() {
    this.name = name
}
A.prototype.name = 'xiaoming'
var a = new A()
console.log(a.name)
//
let a = 'ByteDance1'
let obj = {
    a: 'ByteDance2',
    fun1: function() {
        console.log(this.a)
    }
}
let fun2 = obj.fun1
fun2.call(null) //undefined
//
var name = '123'
function func() {
    console.log(this.name)
}
var object = {
    name: 'object',
    getNameFunc: function(fn) {
        fn && fn() //'123'
        return function() {
            return this.name
        }
    }
}
console.log(object.getNameFunc(func)())'object'
//
<style>
#a { font-size: 12px; }
div p { font-size: 13px; }
div .c { font-size: 14px; }
.a .b .c { font-size: 15px; }
#b { font-size: 16px }
<div id="b" class="b">
    <p id="c" class="c">I'am here</p>
</div>
</style>
//实现函数
var obj = {a : { b: { c: 1 } }}
function find(obj, str){
    const  keys= str.split('.');
    let current = obj;
    // 遍历路径数组，逐级访问对象属性
    for (var i = 0; i < keys.length; i++) {
        // 如果当前对象没有该属性，则返回 undefined
        if (!current.hasOwnProperty(keys[i])) {
            return undefined;
        }
        // 否则，继续访问下一级属性
        current = current[keys[i]];
    }
    return current;
}
find(obj, 'a.b.c') // 1
find(obj, 'a.d.c') // undefined
//
var a = 0, b = 0
function A(a) {
    A = function (b) {
        alert(a + b++)
    }
    alert(a++)
}
A(1) //1
A(2) //4
//
const list = [1, 2, 3];
const square = num => {
    return new Promise(resolve => {
        setTimeout(() => { //宏任务
            resolve(num * num);
        }, 1000);
    });
}
function test() {
    list.forEach(async x => { //同步代码
        const res = await square(x);
        console.log(res);
    });
}
test()//等待1000 1 4 9
//
<style>
.b { color: red;}
.a { color: blue;}//1
</style>
<div class="a b">Bytedance</div>
//
Object.prototype.toString.call([])//'[object Array]'



function A(){}
const a = new A();
console.log(a.constructor); // A
console.log(a.prototype); // undefined
a.abc = 123;
console.log(a.__proto__); // A.prototype
console.log(A.prototype.constructor); // A
 ```

