### css如何实现一个元素旋转并横向移动如果只用一个css属性

```css
@keyframes rotate-and-move {
  0% {
    transform: rotate(0deg) translateX(0);
  }
  100% {
    transform: rotate(360deg) translateX(100%);
  }
}

.element {
  animation: rotate-and-move 5s linear infinite;
}
```

### CSS画一个图形

```css
<div class="triangle"></div>
    <p></p>
    <div class="trapezoid1"></div>
    <p></p>
    <div class="hexagon"></div>
    <p></p>
   <div class="circle"></div>
       .triangle {
  width: 200px;
  height: 100px;
  background-color: #4CAF50;
  clip-path: polygon( 50% 0%, 0% 100%, 100% 100%);
         
}
        .trapezoid1 {
  width: 200px;
  height: 100px;
  background-color: #4CAF50;
  clip-path: polygon( 20% 0%, 80% 0%, 100% 100%, 0% 100%);
}
.hexagon {
    width: 200px;
  height: 100px;
  background-color: #4CAF50;
  clip-path: polygon( 50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}
.circle {
    width: 200px;
  height: 200px;
  background-color: #ccc;
  border-radius: 50%;
}


//三角形  或者使用微元素
.triangle {
  width: 0;
  height: 0;
  border-top: 50px solid transparent;
  border-right: 50px solid red;
  border-bottom: 50px solid transparent;
  border-left: 50px solid transparent;
}
<div class="triangle"></div>
```

画三角形元素的方式

- svg polygon
- Canvos polygon
- border
- Polygon

### 二栏布局的几种实现方式

1. **浮动布局**:

   ```css
   .container {
     width: 100%;
     max-width: 1200px;
     margin: 0 auto;
   }
   .left {
     float: left;
     width: 300px;
     background-color: #f1f1f1;
   }
   .right {
     margin-left: 320px; /* 左侧栏宽度 + 间距 */
     background-color: #fff;
   }
   .clearfix:after {
     content: "";
     display: block;
     clear: both;
   }
   ```

2. **Flexbox 布局**:

   ```css
   .container {
     display: flex;
     max-width: 1200px;
     margin: 0 auto;
   }
   .left {
     width: 300px;
     background-color: #f1f1f1;
   }
   .right {
     flex-grow: 1;
     background-color: #fff;
   }
   ```

3. **Grid 布局**:

   ```css
   .container {
     display: grid;
     grid-template-columns: 300px 1fr;
     max-width: 1200px;
     margin: 0 auto;
   }
   .left {
     background-color: #f1f1f1;
   }
   .right {
     background-color: #fff;
   }
   ```

4. **绝对定位**:

   ```css
   .container {
     position: relative;
     max-width: 1200px;
     margin: 0 auto;
   }
   .left {
     position: absolute;
     left: 0;
     width: 300px;
     background-color: #f1f1f1;
   }
   .right {
     margin-left: 320px; /* 左侧栏宽度 + 间距 */
     background-color: #fff;
   }
   ```

### 三栏布局的几种实现方式

1. 浮动布局

   - 使用 `float` 属性将左右两个侧栏设置为浮动元素,中间栏设置为非浮动元素。
   - 需要注意清除浮动,以确保中间栏能正确地包裹内容。

   ```css
   /* 容器样式 */
   .container {
     width: 100%;
     max-width: 1200px;
     margin: 0 auto;
   }
   
   /* 左侧栏样式 */
   .left {
     float: left;
     width: 200px;
     background-color: #f1f1f1;
   }
   
   /* 主内容区样式 */
   .main {
     margin: 0 220px; /* 左右侧栏宽度 */
     background-color: #fff;
   }
   
   /* 右侧栏样式 */
   .right {
     float: right;
     width: 200px;
     background-color: #f1f1f1;
   }
   
   /* 清除浮动 */
   .clearfix:after {
     content: "";
     display: block;
     clear: both;
   }
   ```

   

2. flex布局

   ```css
   .container {
     display: flex;
     justify-content: space-between;
   }
   
   .left, .right {
     width: 200px;
     background-color: #f1f1f1;
   }
   
   .main {
     flex-grow: 1;
     background-color: #fff;
   }
   ```

3. Grid布局

   ```css
   .container {
     display: grid;
     grid-template-columns: 200px 1fr 200px;
     grid-gap: 20px;
   }
   ```

4. position布局

   ```css
   .container {
     position: relative;
   }
   
   .left, .right {
     position: absolute;
     top: 0;
     width: 200px;
     background-color: #f1f1f1;
   }
   
   .left {
     left: 0;
   }
   
   .right {
     right: 0;
   }
   
   .main {
     margin-left: 220px;
     margin-right: 220px;
     background-color: #fff;
   }
   ```

### 如何实现 3 * 3 网格布局

```js
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 创建三列，每列等宽 */
  grid-template-rows: repeat(3, 1fr); /* 创建三行，每行等高 */
  gap: 10px; /* 设置网格项之间的间隔 */
}
```


### 水平对其的方式

**使用 `margin: 0 auto`**

**使用 `text-align: center`**

**使用 `position：absolute + left:50% + transform:translateX(-50%)` 属性**

**使用display:flex, justify-content:center 布局**

**使用 Grid + justify-content:center + justify-items:center 布局**

### 垂直对其方式

使用 `position：absolute + top:50% + transform:translateX(-50%)` 属性

**使用 display:flex, align-items:center 布局**

**使用 Grid + align-content:center + align-items:center 布局**

**使用height:100px, line-height:100px布局**

### 水平垂直对齐

使用 子元素,`position：absolute + top:50% + left:50% + transform:translate(-50%,-50%)` 属性

```css
    position: absolute; /* 相对于 .container 定位 */
    top: 50%; /* 将元素的顶部定位到父容器的50%位置 */
    left: 50%; /* 将元素的左侧定位到父容器的50%位置 */
    transform: translate(-50%, -50%); /* 平移元素的50%自身尺寸，从而实现居中效果 */
```

**使用display:flex, align-items:center + justify-content: center 布局**

**使用 Grid + align-content:center + align-items:center justify-content:center + justify-items:center 布局**



### 如何使用css或js实现多行文本溢出省略效果，考虑兼容性

```css
//单行
overflow:hidden
text-overflow:ellipsis[ɪˈlɪpsɪs] //超出省略的展示
white-space: nowarp; //不换行
//多行

dispaly: -webkit-box;
-webkite-box-orient: vertical; [ˈvɜrtɪkl]
-webkite-box-clamp: 3; //行数
overflow:hidden;

js -> split + 正则words  scrollHeight clientHeight 超出从words pop出来
```




### `<style>`可以在html的什么位置

1. **头部 (`<head>` 区域)**

   - 在 `<head>` 区域可以确保在页面渲染之前就加载并应用样式。

   ```html
   <head>
     <title>My Web Page</title>
     <style>
       /* CSS styles go here */
     </style>
   </head>
   ```

2. **主体 (`<body>` 区域)**

   ```html
   <body>
     <h1>Welcome to my website</h1>
     <style>
       /* CSS styles go here */
     </style>
     <p>This is a paragraph of text.</p>
   </body>
   ```
   
3. **嵌套在 HTML 元素中** 用局部样式。

   ```html
   <div>
     <style>
       /* CSS styles go here */
     </style>
     <h2>This is a heading</h2>
     <p>This is a paragraph of text.</p>
   </div>
   ```
