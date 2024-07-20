### BFC及其应用

> BFC 独立布局环境 

1）float属性不为none
2）position为absolute或fixed
3）display为inline-block、table-cell、table-caption、flex、inline-flex
4）overflow不为visible 

**最常用是overflow为hidden，这种方式的副作用最小，其他三种方式的副作用较大**

应用

- 解决浮动元素 令父元素高度坍塌
- 解决非浮动元素被浮动元素覆盖
- 外边距垂直方向重合问题

### 消除浮动的方法

- clear:both 清除左右两侧的浮动
- 块级格式化上下文
- ::after ::before + clear:both

### BFC、IFC、GFC 和FFC

- BFC 块级格式上下问 独立布局环境
- IFC 行内格式化上下文   行内元素形式格式化
- GFC 网格布局格式化上下文。grid 网格形式格式化
- FFC 弹性盒形式格式化

### 行内块元素，inline、block、inline-block区别

`inline`(内联元素)

- 不能设置高度，由内容宽决定布局，可以和其他内联元素一行显示。
- 可以设置 `padding` 和 `margin`，但只会影响左右布局，上下边距不会影响到其他元素的位置。
- **例子**：`<span>`、`<a>` 

`block`（块级元素）

- 占据一整行，如果宽度没有设置，它们会默认扩展到父容器的宽度。
- 可以设置 `width`、`height`、`padding`、`margin` 和 `border`，这些属性都会影响布局。
- **例子**：`<div>`、`<p>`、`<h1>`-`<h6>`、`<ul>`、`<ol>`、`<li>`、`<table>` 等。

`inline-block`（内联块级元素）

- 结合了内联元素和块级元素的特点。它们不会占据一整行，可以与其他内联元素在同一行显示，但可以设置 `width`、`height`、`padding`、`margin` 和 `border`。
- **例子**：`<button>`、`<input>`、`<select>`、`<textarea>`、`<img>` 等。

### FLEX布局如何使用

Flexible box 弹性布局 display:flex

Flex-direction 决定主轴的⽅向

Flex-wrap 决定容器内项⽬是否可换⾏

Flex-flow：Flex-direction  Flex-wrap 

Justify`[ˈdʒʌstəˌfaɪ]`-content 主轴对齐方式

- **flex-start (默认值)**:
  - Flex 项目沿主轴起始位置对齐。
- **flex-end**:
  - Flex 项目沿主轴终点位置对齐。
- **center**:
  - Flex 项目沿主轴中心位置对齐。
- **space-between**:
  - Flex 项目沿主轴均匀分布,第一个项目在起始位置,最后一个项目在终点位置。
- **space-around**:
  - Flex 项目沿主轴均匀分布,每个项目两侧的间距相等。
- **space-evenly**:
  - Flex 项目沿主轴均匀分布,每个项目之间的间距相等。

Align-items 交叉轴如何对齐 

Align-content 多跟轴线对齐方式

子元素属性



### Flex:1

flex: 1 相当于同时设置了 flex-grow: 1、flex-shrink: 1 和 flex-basis: 0%。

●	flex-grow: 1 放⼤⽐例 默认0

●	flex-shrink: 1 缩⼩⽐例 默认1

●	flex-basis: 0% 当设置为0的是，会根据内容撑开，默认值为 auto ，即项⽬的本来⼤⼩



### `margin` 属性有几种不同的编写方式,每种方式都有特定的含义:

1. **单值语法**:
   - `margin: 10px;`
   - 表示四个方向(上、右、下、左)的外边距都是 10 像素。
2. **双值语法**:
   - `margin: 10px 20px;`
   - 第一个值表示上下外边距,第二个值表示左右外边距。
3. **三值语法**:
   - `margin: 10px 20px 30px;`
   - 第一个值表示上外边距,第二个值表示左右外边距,第三个值表示下外边距。
4. **四值语法**:
   - `margin: 10px 20px 30px 40px;`
   - 四个值分别表示上、右、下、左外边距。顺序为: 上 → 右 → 下 → 左。

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



### 分析opacity:0,visibility:hidden、dispaly:none 优势和使用场景

- Display: none 不占空 不能点击  非继承属性 重排重会 
- visibility: hidden 占据空间 不能点击 继承属性  重会
- Opacity:0 占据空间 可点击 重会

### rgba()和opacity区别，哪个能覆盖子元素？

区别

- **作用范围**：`rgba()` 只影响元素本身，而 `opacity` 影响元素及其所有子元素。
- **性能**：性能上可能不如 `rgba()`，特别是在子元素较多的情况下。
- **兼容性** `rgba()` 在某些旧版浏览器中可能需要前缀（如 `-webkit-`、`-moz-` 等）。

### css具有继承的属性

1. 字体相关属性： 6
   - `font-family`：字体系列
   - `font-size`：字体大小
   - `font-weight`：字体粗细
   - `font-style`：字体样式（如斜体）
   - `line-height`：行高
   - `font`：字体的简写属性

2. 文本相关属性： 7
   - `color`：文本颜色
   - `text-align`：文本对齐方式
   - `text-decoration`：文本装饰（如下划线、删除线）
   - `text-indent`：首行缩进
   - `text-transform`：文本转换（如大写、小写）
   - `letter-spacing`：字母间距
   - `word-spacing`：单词间距

3. 列表相关属性： 4
   - `list-style-type`：列表项标记的类型
   - `list-style-image`：列表项标记的图像
   - `list-style-position`：列表项标记的位置
   - `list-style`：列表的简写属性

4. 其他属性： 3
   - `cursor`：鼠标光标样式
   - `opacity`：元素的透明度
   - `visibility`：元素的可见性



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

