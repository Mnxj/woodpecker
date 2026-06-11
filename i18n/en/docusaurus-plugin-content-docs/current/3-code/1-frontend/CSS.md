### How to rotate and translate an element with only one CSS property?

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

### Draw a shape with CSS

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


// Triangle — or use borders
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

Ways to draw a triangle:

- svg polygon
- Canvas polygon
- border
- CSS Polygon (clip-path)

### Several ways to implement a two-column layout

1. **Float layout**:

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
     margin-left: 320px; /* left column width + gap */
     background-color: #fff;
   }
   .clearfix:after {
     content: "";
     display: block;
     clear: both;
   }
   ```

2. **Flexbox layout**:

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

3. **Grid layout**:

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

4. **Absolute positioning**:

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
     margin-left: 320px; /* left column width + gap */
     background-color: #fff;
   }
   ```

### Several ways to implement a three-column layout

1. Float layout

   - Use `float` for the left and right side columns and leave the middle column unfloated.
   - Don't forget to clear floats so the middle column wraps its content correctly.

   ```css
   /* Container */
   .container {
     width: 100%;
     max-width: 1200px;
     margin: 0 auto;
   }

   /* Left column */
   .left {
     float: left;
     width: 200px;
     background-color: #f1f1f1;
   }

   /* Main content area */
   .main {
     margin: 0 220px; /* width of left and right side columns */
     background-color: #fff;
   }

   /* Right column */
   .right {
     float: right;
     width: 200px;
     background-color: #f1f1f1;
   }

   /* Clear floats */
   .clearfix:after {
     content: "";
     display: block;
     clear: both;
   }
   ```



2. Flex layout

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

3. Grid layout

   ```css
   .container {
     display: grid;
     grid-template-columns: 200px 1fr 200px;
     grid-gap: 20px;
   }
   ```

4. Position-based layout

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

### How to build a 3x3 grid layout

```js
.grid-container {
   display: grid;
   grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
   grid-template-rows: repeat(3, 1fr); /* 3 equal rows */
   gap: 10px; /* space between cells */
}
```


### Ways to horizontally center

**Use `margin: 0 auto`**

**Use `text-align: center`**

**Use `position: absolute + left: 50% + transform: translateX(-50%)`**

**Use display: flex + justify-content: center**

**Use Grid + justify-content: center + justify-items: center**

### Ways to vertically center

Use `position: absolute + top: 50% + transform: translateY(-50%)`

**Use display: flex + align-items: center**

**Use Grid + align-content: center + align-items: center**

### Horizontal + vertical centering

On the child element: `position: absolute + top: 50% + left: 50% + transform: translate(-50%, -50%)`

```css
    position: absolute; /* relative to .container */
top: 50%; /* top edge at 50% of parent */
left: 50%; /* left edge at 50% of parent */
transform: translate(-50%, -50%); /* shift by 50% of own size to truly center */
```

**Use display: flex + align-items: center + justify-content: center**

**Use Grid + align-content: center + align-items: center + justify-content: center + justify-items: center**



### How to implement multi-line text truncation with ellipsis (consider compatibility)

```css
// Single line
overflow:hidden
text-overflow:ellipsis // show ellipsis on overflow
white-space: nowrap; // no wrap

// Multi-line
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3; // number of lines
overflow:hidden;

js -> split + regex words; scrollHeight clientHeight; pop words on overflow
```




### Where can `<style>` go in HTML?

1. **Head (`<head>` section)**

   - Placing it in `<head>` ensures styles are loaded and applied before the page renders.

   ```html
   <head>
     <title>My Web Page</title>
     <style>
       /* CSS styles go here */
     </style>
   </head>
   ```

2. **Body (`<body>` section)**

   ```html
   <body>
     <h1>Welcome to my website</h1>
     <style>
       /* CSS styles go here */
     </style>
     <p>This is a paragraph of text.</p>
   </body>
   ```

3. **Nested inside HTML elements** for scoped styles.

   ```html
   <div>
     <style>
       /* CSS styles go here */
     </style>
     <h2>This is a heading</h2>
     <p>This is a paragraph of text.</p>
   </div>
   ```
