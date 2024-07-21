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


### Transform 

`transform` 属性可以应用于元素的变换，常见的用例包括：

- 平移（Translate）：使用 `translateX` 和 `translateY` 函数可以在水平和垂直方向上对元素进行平移。例如：

```css
transform: translateX(100px);
transform: translateY(-50%);
```

- 旋转（Rotate）：使用 `rotate` 函数可以对元素进行旋转。例如：

```css
transform: rotate(45deg);
```

- 缩放（Scale）：使用 `scale` 函数可以对元素进行缩放。例如：

```css
transform: scale(1.5);
```

- 斜切（Skew）：使用 `skewX` 和 `skewY` 函数可以对元素进行斜切变换。例如：

```css
transform: skewX(20deg);
transform: skewY(-10deg);
```

- 3D 变换（3D Transform）：`transform` 属性还支持 3D 变换，可以在 3D 空间中对元素进行变换。例如：

```
transform: translate3d(100px, 50px, 0);
transform: rotate3d(1, 0, 0, 45deg);
transform: scale3d(1.5, 1.5, 1.5);
```

- 多重变换（Multiple Transforms）：可以通过在 `transform` 属性中使用多个变换函数来组合多个变换效果。例如：

```css
transform: translateX(100px) rotate(45deg) scale(1.5);
```

**注意事项**

- 不会影响文档流中的其他元素，但会影响元素的布局，特别是当使用 `translate()` 变换时。
- 性能通常很好，使用GPU加速，但大量使用时可能会影响性能，。
- `transform` 属性可以与 `transition` 属性结合使用，创建平滑的动画效果。

### animation 动画

```css
animation：动画名称 + 动画时间 + 速度曲线 + 是否延迟 + 动画次数 + 是否逆向播放
```

### transition和animation的属性分别有哪些

tarnsition 

- Transition-property 过渡css属性
- Transition-duration 完成事件
- Transition-timing-function 过渡函数
- transition-delay 延迟时间

animation

- Animation-name 关键帧名称
- Animation-duration 事件 秒 或者毫米
- Animation-timing-function 如何完成一个周期
- Animation-delay 延迟间隔
- Animation-iteration-count 播放次数
- animation-direction 是否应该反向播放动画
- Animation-fill-mode 不播放 应用形式
- Animation-play-state 正在运行或者已暂停

### transition和animation区别

- **复杂性**：`transition` 用于简单的状态变化，而 `animation` 用于更复杂的动画序列。
- **控制程度**：`transition` 只能控制元素从一个状态到另一个状态的过渡，而 `animation` 可以控制整个动画序列，包括关键帧和动画的重复播放。
- **使用场景**：`transition` 适用于响应用户交互的简单动画效果，而 `animation` 适用于创建循环播放的动画或更复杂的动画序列



### Png8 png16 png32的区别。并简单讲讲png的压缩原理

- Png8 256种颜色
- png16 rgb 256 * 256 * 256z种颜色
- Png32 png24+ 颜色透明色道 reba 256种透明颜色



压缩原理：

1. 过滤算法：预测每个像素值，并将实际像素值与预测值之间的差异存储，从而减少数据的冗余
2. 无损压缩算法：DEFLATE 压缩（LZ77 算法和 Huffman 编码的结合方法）通过查找数据中的重复字符串，并用更短的代码替换它们来实现压缩。
   - **LZ77 算法**：基于字典的压缩方法，它通过查找数据中重复出现的字符串，并用指针指针来替换它们，从而减少数据量。
   - **Huffman 编码**：根据字符出现的频率来分配不同长度的编码。
3. 透明度信息也被压缩。
4. 颜色深度越低，文件大小越小，但图像质量也越低。
5. Adam7 的交错技术，它允许图像在下载过程中逐渐显示，而不是等到整个图像下载完成。



### css选择器的优先级（css specificity

1. important
2. **内联样式** (Inline Styles)
   - 声明在元素标签上的样式,如 `style="color: red;"`。
   - 优先级最高。
3. **ID 选择器** (ID Selectors)
   - 以 `#` 开头的选择器,如 `#myElement`。
   - 优先级次之。
4. **类选择器、属性选择器和伪类** (Class Selectors, Attribute Selectors, and Pseudo-classes)
   - 以 `.` 开头的选择器,如 `.my-class`。
   - 以 `[` 开头的属性选择器,如 `[type="text"]`。
   - 以 `:` 开头的伪类选择器,如 `:hover :active :empty  :focus :first-child :last-child :first-of-type :last-of-type :only-child :only-of-type`。
   - 优先级次之。
5. **元素选择器和伪元素** (Element Selectors and Pseudo-elements)
   - 直接使用 HTML 元素名称的选择器,如 `h1`。
   - 以 `::` 开头的伪元素选择器,如 `::before ::after ::first-line ::first-letter ::selection`。
   - 优先级最低。
6. **通配符选择器** (`*`)
   - 最低优先级。

群组选择器（div,p）  

- **伪类**：以冒号(:)开头，用于选择处于特定状态的元素。

- 伪元素：以双冒号(::)开头，用于在文档中插入虚构的元素。
- 相邻选择器：

 +选择器。如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器。

 ~ 选择器。作用是查找某一个指定元素的后面的所有兄弟结点。

### css3新增了哪些东西

- 选择器 
  - :lang() 语言选择器
  - :is()接受多个选择器作为参数
  - 伪类选择器:first-child 父元素的第一个子元素的元素。大小写不敏感
  - :last-child
  - 属性选择 ^开头 $结尾 *包含

- 盒子模型 border-radius[ˈrediəs] box-shadow border-image
- 背景 background-size background-origin（padding-box，content-box, border-box） background-clip[klɪp]绘制背景()
- 文本效果 text-shadow word-wrap（长单词或 URL 地址
- 渐变 线性渐变 径向渐变
- 字体@font-face[fes] 
- 2d/3d transform transform-origin
- 过渡与动画 transition @keyframs animation
- 媒体查询 @Media
- 多列布局 column[ˈkɑləm]-count column-width column-gap宽度 column-rule样式 column-span跨列样式

### 盒模型分类

> 描述元素在页面上如何显示的一个概念

标准盒模型：margin border padding content

IE盒模型： padding border content

变化使用：box-sizing: content-box(默认 标准) border-box(IE)

### z-index属性什么时候失效？

- 
  对于静态定位(position: static)的元素，z-index 属性无效。设置为相对定位（position: relative）、绝对定位（position: absolute）或固定定位（position: fixed）
- 父元素的 z-index 大于子元素的 z-index  会覆盖子元素。
- 相同的层叠上下文中，相同的 z-index ，它们的显示顺序将由它们在 HTML 中的先后顺序决定。
- z-index 属性对于 flex 容器和 flex 项可能不起作用。Flexbox 布局有自己的层叠上下文规则。

### css加载会造成阻赛嘛？

- css加载不会造成dom树的解析
- 会阻赛dom树渲染 阻赛后面js语句执行



下 ->避免看到白屏，提高css加载速度

- cdn 根据网络情况挑选最近的网络资源
- css压缩 webnpack zip
- 合理使用缓存 cache-control expires e-tag
- 减少http请求数 将多个css进行合并 

### postcss

css里面的babel 可以让我使用一些比较新的语法。

```js
// npm i postcss-loader postcss postcss-preset-env -D
loader: 'postcss-loader',
options: {
    postcssOptions: {
          plugins: [
                'postcss-preset-env' //解决大多数样式兼容性问题
            		'autoprefixer' //检查css代码 添加css代码加上浏览器厂商的私有前缀
...
            
            
  "browserslist": [ //指定项目支持的浏览器范围
    "last 2 version", // 最近的两个版本 ,为且的条件
    "> 1%", //覆盖99%浏览器
    "not dead" // 死的不要
  ]

1) webpack.config.js > postcss.config.js  .browserslistrc 和 package.json同级
2) package.json和.browserslistrc只能定义一个, 否则会冲突
```



### 为什么要选用css in js这项技术？

1. **样式封装和隔离**:
2. **动态样式**:
3. **代码复用**: **支持动态主题切换**: **主题抽象**:



相比之下,使用传统的"裸 CSS"方式实现主题切换会有一些缺点:

1. **样式污染**:
   - 全局作用域的 CSS 容易造成样式污染和意外覆盖。
2. **主题切换效率低**:
   - 需要手动修改和替换 CSS 文件或类名,不够高效。
3. **复用和维护困难**:
   - 主题样式分散在多处,难以统一管理和复用。

### CSS3 硬件加速

CSS3 硬件加速又叫做 `GPU 加速`，减少 CPU 操作的一种优化方案，可以提升网页的性能

**开启GPU硬件加速的属性有：**

1）transform不为none
2）opacity

**弊端**

GPU处理过多的内容会导致内存问题；如果动画结束的时候不关闭硬件加速，会出现字体模糊

### 回流（Reflow）

回流发生在元素的尺寸、位置或内容发生变化时，浏览器需要重新计算元素的几何属性，并且可能需要重新布局页面的其他部分。例如，添加、删除、修改 DOM 元素，或者改变元素的尺寸、位置、字体大小等都会触发回流。

### 重绘（Repaint）

重绘发生在元素的外观发生变化时，但不影响其几何属性。例如，改变元素的背景颜色、文字颜色、边框颜色等。重绘通常比回流的性能开销小，因为它不需要重新布局页面。

### 如何规避带来的性能开销

1. **减少 DOM 操作**：尽量减少对 DOM 的操作，尤其是在循环中。可以使用文档片段（DocumentFragment）或者批量操作 DOM。
2. **使用类和样式表**：避免使用内联样式，而是使用 CSS 类和样式表。这样可以减少重绘和回流的次数，因为浏览器可以批量处理样式变化。
3. **避免复杂的 CSS 选择器**：复杂的 CSS 选择器可能会导致浏览器在计算样式时花费更多时间。
4. **使用硬件加速**：通过 CSS 的 `transform` 和 `opacity` 属性可以触发硬件加速，这可以减少回流和重绘的性能开销。
5. **减少 JavaScript 动画**：尽量使用 CSS 动画代替 JavaScript 动画，因为 CSS 动画由浏览器的合成器处理，不会引起回流和重绘。
6. **避免强制同步布局**：在 JavaScript 中，先读取布局信息（如 offsetWidth、clientHeight 等），然后立即修改 DOM，会导致浏览器进行强制同步布局，这会触发回流。应该先修改 DOM，然后读取布局信息。
7. **使用虚拟 DOM**：框架如 React、Vue 等使用虚拟 DOM 来减少直接对真实 DOM 的操作，从而减少回流和重绘。
8. **节流和防抖**：对于频繁触发的事件（如窗口大小调整、滚动等），可以使用节流（throttle）和防抖（debounce）技术来减少事件处理函数的调用频率。

### css方面如何减少回流、重绘

1）可以使用GPU硬件加速

2）动画可以使用绝对定位或fixed，让其脱离文档流，修改动画不造成主界面的影响

3）使用 visibility 替换 display: none（前者只会引起重绘，后者则会引发回流）

4）避免使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局


### CSS Grid和Flexbox解决什么样的布局问题？

Flexbox

- ⼀维布局。
- 可以对⻬⼦项，处理⼦项之间和⼦项与容器边缘之间的间距。
- ⾃动调整⼦元素的⼤⼩，以适应不同的显⽰空间，⾮常适合动态内容或未知⼤⼩的⼦元素。

CSS Grid

- ⼆维布局设计。
- 允许容器内定义⾏和列的尺⼨和位置，适合创建复杂的布局模式，如杂志布局、棋盘布局等。
- 提供了对⼦元素精确位置控制的能⼒，可以轻松实现⼦元素的对⻬、重叠和层叠。

### position取值和各自特点

1. `static`(默认值):
   - 元素按照正常的文档流进行布局。
   - `top`、`right`、`bottom`、`left` 和 `z-index` 属性不会产生任何效果。
2. `relative`:
   - 元素按照正常的文档流进行布局。
   - 然后根据 `top`、`right`、`bottom`、`left` 属性移动位置,但不会影响其他元素的位置。
   - 相对于自身的正常位置进行移动。
3. `absolute`:
   - 元素从文档流中脱离。
   - 根据最近的已定位祖先元素(即 `position` 不为 `static`)进行定位,如果没有这样的祖先元素,则相对于文档的 `<body>` 元素进行定位。
   - `top`、`right`、`bottom`、`left` 属性用于指定元素的位置。
4. `fixed`:
   - 元素从文档流中脱离。
   - 根据视窗(viewport)进行定位。
   - `top`、`right`、`bottom`、`left` 属性用于指定元素的位置。
   - 即使页面滚动,元素也会保持在相同的位置。
5. `sticky`:
   - 基于用户的滚动位置来定位。
   - 它的行为首先像 `position:relative;`,然后在屏幕位置滚动到预设的位置时,表现像 `position:fixed;`。
   - 需要指定 `top`、`right`、`bottom` 或 `left` 四个阈值其中之一,才能确定元素在哪种模式下呈现。

### 脱离文档流的过程

将元素从普通的文档流中移除，使其不再受文档流中其他元素的布局影响



1. `position: absolute;`
2. `position: fixed`
3. `float: left|right;`
4. `display: inline-block;`：将元素的显示方式设置为内联块级元素。内联块级元素会在行内排列，但可以设置宽度、高度、边距和边框等样式。

### position：absolute什么时候失效

1. **父元素未设置 position 属性**
   - 如果父元素未设置任何 position 属性(默认为 static),那么绝对定位的相对于浏览器窗口定位。
2. **父元素 position 属性设置错误**
   - 父元素如果设置了 position 属性,但是值选择不当(比如 fixed),也会导致绝对定位子元素的定位与预期不符。
3. **父元素尺寸不确定**
4. **父元素使用了 transform 属性**
   - 如果父元素使用了 transform 属性,那么绝对定位子元素的定位会相对于这个经过变换的父元素。这可能会造成意料之外的效果。
5. **绝对定位元素本身设置错误**
   - 绝对定位元素自身如果 top/left/right/bottom 属性设置错误,也会导致定位失效。
6. **绝对定位元素脱离文档流**
7. **浏览器兼容性问题**
   - 不同浏览器对 position: absolute 的解释和实现可能存在差异,这可能会导致兼容性问题。

### 绝对定位脱离文档流

1. 合理设置父元素的 position 属性,通常设置为 relative 或 absolute 更合适。
2. 注意处理父元素高度的"坍缩"问题,可以使用 overflow 属性或者给父元素设置明确的高度。
3. 合理安排绝对定位元素与兄弟元素的布局顺序和层级关系。
4. 根据实际需求,合理设置绝对定位元素的 top/left/right/bottom 属性。
5. 灵活运用 z-index 属性控制绝对定位元素的层级关系。

### 介绍一下粘性布局sticky

> 它使元素能够在滚动过程中在指定位置

Position：sticky[ˈstɪki]

Top：0

**失效：**

1）父元素设置overflow：hidden
2）总之没有剩余的高度，不会产生滚动

### css样式优先级

内联样式->嵌入样式表->外部样式表

### 在html中引入css的方式

1. **外部样式表**

   - 在 HTML 文件的 `<head>` 标签中添加 `<link>` 元素,指向外部 CSS 文件。

2. **内联样式**

   - 在 HTML 元素上直接使用 `style` 属性来设置样式。

3. **内部样式表**

   - 在 HTML 文件的 `<head>` 标签中添加 `<style>` 元素,在其中编写 CSS 规则。

4. **导入样式表**

   - 在 CSS 文件中使用 `@import` 规则引入其他 CSS 文件。

### rem

> html 设置font-size

1.自定义：页面加载时,根据当前设备的屏幕尺寸和分辨率,计算并设置合适的 font-size 值

2.px->转为rem:postcss在postcss.config.js里面的plugins加入postcss-pxtorem: { rootValue:16,propList:[*],selectorBlanckList:[]}

3.webcomponent 定义rem组件

### rew和vw/vh兼容性的问题

`vw`和`vh`是相对视口单位，而`rem`是相对根元素字体大小的单位：

- **浏览器缩放**：当用户缩放浏览器时，`vw`和`vh`会根据视口的大小进行相应的调整，而`rem`通常是基于根元素的字体大小计算的，不会自动缩放。
- **单位混用**：在使用`vw/vh`和`rem`时，要注意避免单位混用导致的布局问题。确保在同一布局中使用一致的单位，或者进行适当的转换和计算。
- **设计和开发考虑**：在设计和开发过程中，要充分考虑不同单位的特点和兼容性

### 样式合并写和分开写有什么区别？

合并写： 节省空间

分开写：可读性非常好，适合大型项目或多人协作时，更容易被理解和方便管理。

### 响应式设计？

- 媒体查询 @media
- Rem,rm
- 流体布局（使用百分比）
- Display:flex 弹性布局
- Display:grid 栅格布局

### 作会引起浏览器重绘和重排

- `position:absolute; left:100px;`：会引起重排。修改绝对定位元素的位置属性会导致布局的重新计算和元素位置的调整。
- `translateX:100px;`：通常不会引起重排，只会引起重绘。由 GPU 来处理的，而不是由浏览器的布局引擎来处理。
- `getBoundingClientRect`：本身不会直接引起重绘和重排，但如果在获取之后基于其结果进行了一些可能引发重排的操作，那就可能间接导致重排。
- `getClientWidth`、`getClientHeight`：一般不会引起重绘和重排，它们只是获取相关的尺寸信息。

### css modules 的原理

1. 为每个 CSS 模块创建一个独立的作用域生成唯一表示符。
2. 在生成 CSS 样式表时，根据模块标识符对样式规则进行重命名，确保唯一性。
3. 将 CSS 文件引入到 JS 模块中。
4. Js可以访问和操作模块中的样式规则。

 

### 前端⽔印了解多少？

在⻚⾯上覆盖⼀个position:fixed的div盒⼦，盒⼦透明度设置较低，设置pointer-events: none;样式实现点击穿透，在这个盒⼦内通过js循环⽣成⼩的⽔印div，每个⽔印div内展⽰⼀个要显⽰的⽔印内容。



canvas输出背景图： 绘制出⼀个⽔印区域，将这个⽔印通过toDataURL⽅法输出为⼀个图⽚，将这个图⽚设置为盒⼦的背景图，通过backgroud-repeat：repeat；样式实现填满整个屏幕的效果。

### 如何处理和优化⼤规模的CSS代码？

1. 使⽤CSS预处理器 可以提供变量、混合、函数和嵌套。

2. 模块化，CSS代码分割成多个⼩⽂件，每个⽂件包含特定组件或⻚⾯的样式。

3. 减少重排和重绘，压缩CSS⽂件

4. 使⽤CSS架构

采⽤⼀致的架构策略，如OOCSS（⾯向对象的CSS）、SMACSS（可扩展和模块化的CSS架构）或

ITCSS（倒三⻆CSS）。

• 这些架构⽅法提供了组织和维护⼤型CSS代码库的指南和最佳实践。

5. Postcss做一些兼容配置。

6. 利⽤CSS Linter⼯具（如Stylelint）⾃动发现潜在的问题和不⼀致的地⽅。

   npm install stylelint --save-dev

   `.stylelintrc`中加入配置（extends, rules

   使用命令行 or 编译器

   webpack中stylelint-webpack-plugin

   ```js
   {
               loader: 'stylelint-webpack-plugin',
               options: {
                 // 配置选项
               }
             }
   ...
   plugins: [
       // ...
       new StyleLintPlugin({
         // 配置选项
         files: ['src/**/*.css', 'src/**/*.scss'],
         fix: true, // 自动修复可修复的错误
       }),
     ],
   ```


### link和@import，两者都是外部引用CSS的方式，但是存在一定的区别：

link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。

link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。

link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。

link支持使用Javascript控制DOM去改变样式；而@import不支持

### src和href

href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系

src表示引用资源，表示替换当前元素，在请求src资源时会将其指向的资源下载并应用到当前文档中，例如js脚本，img图片和frame等元素。