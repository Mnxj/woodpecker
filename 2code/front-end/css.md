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