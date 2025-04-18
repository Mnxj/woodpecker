### 怎么让一个元素实现被她可以拖拽?

>  给需要拖拽的元素添加 `draggable="true"` 属性

JavaScript 中,监听以下拖拽相关的事件:

- `dragstart`: 当拖拽开始时触发。
- `drag`: 拖拽过程中持续触发。
- `dragover`: 拖拽元素悬停在可放置目标上时触发。
- `drop`: 拖拽元素放置在可放置目标上时触发。
- `dragend`: 拖拽结束时触发。

### Canvas API

1. **基础绘制 API**:
    - `getContext('2d')`: 获取 2D 绘图上下文。
    - `beginPath()`: 开始一个新的路径。
    - `moveTo(x, y)`: 将绘图笔移动到指定位置。
    - `lineTo(x, y)`: 从当前位置绘制一条直线到指定位置。
    - `stroke()`: 绘制当前路径的边框。
    - `fill()`: 填充当前路径形成的图形。
    - `closePath()`: 关闭当前路径,使之成为封闭路径。
2. **图形绘制 API**:
    - `rect(x, y, width, height)`: 绘制一个矩形。
    - `arc(x, y, radius, startAngle, endAngle, anticlockwise)`: 绘制一个圆或圆弧。
    - `quadraticCurveTo(cp1x, cp1y, x, y)`: 绘制一条二次贝塞尔曲线。
    - `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`: 绘制一条三次贝塞尔曲线。
3. **样式设置 API**:
    - `strokeStyle = color`: 设置边框颜色。
    - `fillStyle = color`: 设置填充颜色。
    - `lineWidth = value`: 设置线宽。
    - `lineCap = butt|round|square`: 设置线条端点样式。
    - `lineJoin = bevel|round|miter`: 设置线条连接样式。
    - `font = value`: 设置字体样式。
    - `textAlign = start|end|left|right|center`: 设置文本对齐方式。
    - `textBaseline = top|hanging|middle|alphabetic|ideographic|bottom`: 设置文本基线。
4. **图像操作 API**:
    - `drawImage(image, x, y)`: 在 Canvas 上绘制图像。
    - `createImageData(width, height)`: 创建一个新的空白 ImageData 对象。
    - `getImageData(x, y, width, height)`: 获取 Canvas 区域的像素数据。
    - `putImageData(imageData, x, y)`: 将 ImageData 对象绘制到 Canvas 上。
5. **转换和变换 API**:
    - `translate(x, y)`: 移动坐标原点。
    - `rotate(angle)`: 旋转坐标系。
    - `scale(x, y)`: 缩放坐标系。
    - `transform(a, b, c, d, e, f)`: 应用复杂的几何变换。
    - `setTransform(a, b, c, d, e, f)`: 将当前变换重置为单位矩阵,然后应用新的变换。
6. **其他 API**:
    - `save()`: 保存当前环境的状态。
    - `restore()`: 恢复到最近保存的环境状态。
    - `clearRect(x, y, width, height)`: 清除指定的矩形区域,让它变得完全透明。

### canvas 优化绘制性能。

- 减少绘图操作`fillRect` 代替 `moveTo` 和 `lineTo` 。
- 使用 `requestAnimationFrame`
- 透明度的处理会增加 GPU 的负担。
- 对于需要频繁读取和修改像素数据的场景，可以使用 `getImageData` 获取像素数据，然后在内存中进行修改，最后使用 `putImageData` 。
- 用压缩过的图像资源可以减少内存占用和提高加载速度
- 对于复杂的场景，可以将不同的元素绘制到不同的 Canvas 上，然后将它们组合起来。
- 使用 Web Workers。

### svg标签属性和操作注意事项

1. **SVG 标签属性**
    - `width` 和 `height`: 用于设置 SVG 元素的宽度和高度。可以使用像素、百分比等单位。
    - `viewBox`: 定义 SVG 绘制区域的坐标系统。格式为 `"min-x min-y width height"`。
    - `preserveAspectRatio`: 控制 `viewBox` 如何适应 `width` 和 `height` 属性指定的区域。
    - `xmlns`: 声明 SVG 命名空间,通常设置为 `"http://www.w3.org/2000/svg"`。
2. **SVG 图形元素**
    - `<rect>`: 用于绘制矩形。可设置 `x`、`y`、`width`、`height`、`rx`、`ry` 等属性。
    - `<circle>`: 用于绘制圆形。可设置 `cx`、`cy`、`r` 等属性。
    - `<ellipse>`: 用于绘制椭圆。可设置 `cx`、`cy`、`rx`、`ry` 等属性。
    - `<line>`: 用于绘制直线。可设置 `x1`、`y1`、`x2`、`y2` 等属性。
    - `<polyline>`: 用于绘制折线。可设置 `points` 属性,表示各个顶点的坐标。
    - `<polygon>`: 用于绘制多边形。可设置 `points` 属性,表示各个顶点的坐标。
    - `<path>`: 用于绘制任意形状。可使用 `d` 属性指定路径数据。
3. **SVG 文本元素**
    - `<text>`: 用于显示文本。可设置 `x`、`y`、`fill`、`font-size` 等属性。
    - `<tspan>`: 用于控制文本的一部分样式。可嵌套在 `<text>` 标签内部。
4. **SVG 样式和交互**
    - 可以在 SVG 内部使用 CSS 样式,如 `fill`、`stroke`、`font-family` 等。
    - 可以为 SVG 元素添加事件监听器,如 `click`、`mouseover` 等,实现交互效果。
5. **SVG 使用注意事项**
    - 确保 SVG 标签有正确的 `xmlns` 声明。
    - 使用相对单位(如百分比)时,要确保父容器有明确的尺寸。
    - 对于复杂的 SVG 图形,可以考虑使用 `<defs>` 标签预定义复杂的形状。
    - 为 SVG 元素添加适当的 `id` 或 `class` 属性,方便通过 CSS 或 JavaScript 进行样式和交互操作。
    - 对于动态 SVG,要注意性能,尽量减少不必要的重绘和回流。

### canvas和svg

- **Canvas**:
    - 基于像素的渲染技术
    - HTML 元素 没有文档结构,
    - JS 动态绘制的
    - 大量的图形元素,表现更好,不需要处理父DOM 结构，
    - 图形缩放会失真
- **SVG**:
    - 基于矢量的渲染技术。
    - XML语言,有文档结构,
    - 用 CSS 和 JavaScript编写
    - 少量的图形元素效果好,
    - 可以利用 DOM 操作和 CSS 样式来控制图形。
    - 图形缩放无损地缩

### 动画

1. **transition 过渡动画**:
    - 通过设置 `transition` 属性,可以实现元素在属性变化时的平滑过渡动画。
    - 常用属性有 `transition-property`、`transition-duration`、`transition-timing-function`、`transition-delay`。
    - 适用于简单的、单一属性的动画效果。
2. **CSS 关键帧动画 (keyframes)**:
    - 使用 `@keyframes` 规则定义一系列关键帧,描述动画效果随时间变化的过程。
    - 通过 `animation` 属性控制动画的播放,包括动画名称、持续时间、速度曲线等。
    - 适用于复杂的、多属性的动画效果。
3. **JavaScript 动画**:
    - 使用 JavaScript 的 `requestAnimationFrame` 或 `setInterval` 方法来定时更新元素的样式,实现动画效果。
    - 可以更精细地控制动画的每一帧,实现复杂的动画逻辑。
    - 适用于需要与交互行为或 DOM 状态变化相关的动画效果。
4. **SVG 动画**:
    - SVG 元素本身支持丰富的动画属性,如 `animate`、`animateMotion` 等。
    - 可以通过 SVG 的标签或 CSS 属性来定义动画效果。
    - 适用于需要矢量图形变换的动画效果。
5. **Canvas 动画**:
    - 使用 HTML5 的 `<canvas>` 元素,通过 JavaScript 编程实现各种动画效果。
    - 可以自由控制每一帧的绘制内容,实现复杂的动画逻辑。
    - 适用于需要大量自定义图形变换的动画效果。



### 语义化布局

> 让搜索引擎更好地理解页面结构、代码结构清晰、提高兼容性

1. **头部 (header)**: 用于定义网页或网页部分的页眉。通常包含网站标志、主导航菜单等。

2. **主体 (main)**: 用于定义页面的主要内容区域。通常包含文章、博客等主要内容。

3. **导航 (nav)**: 用于定义导航链接的容器。通常包含网站的主导航菜单。

4. **侧边栏 (aside)**: 用于定义页面的辅助内容,通常位于主内容区域的侧面。

5. **页脚 (footer)**: 用于定义网页或网页部分的页脚。通常包含版权信息、联系方式等。

### Html语义化种dl、dt和dd什么意思？，ol和ul呢？

- `<dl>` 定义描述列表的整体容器。
- `<dt>` 描述列表中的项目名称。
- `<dd>` 详细说明
- `<ol>` 用于创建有序列表，其中的列表项会按照特定的顺序进行排列。有序列表通常使用数字或字母作为列表项的标记。
- `<ul>` 创建无序列表，其中的列表项没有特定的顺序。无序列表通常使用项目符号（如圆点、方块等）作为列表项的标记。

**list-style-type`属性为`none去掉标记**

### Web Components

1. **Custom Elements**：可以定义自定义 HTML 标签，使用 `customElements.define` 注册新的自定义元素。
2. **Shadow DOM**:封装和隔离 DOM，通过 `attachShadow` 方法创建一个隔离的子树（shadow tree）。
3. **HTML Templates**: 允许开发者定义模板，它们可以在运行时克隆，并将内容插入到页面中。模板内容在初始加载时不会被渲染，而是等待被克隆。
4. **HTML Imports**:（目前已弃用）：最初用于加载 HTML 片段，但已被现代 JavaScript 模块（ES Modules）取代。

### **Web Components 的优点**

- **跨框架兼容**：Web Components 可以与任何现代框架或库（如 React、Vue、Angular 等）一起使用。
- **封装性**：通过 Shadow DOM，可以确保组件的样式和行为不受外部影响，减少样式冲突。
- **重用性**：具有良好的模块化特性，开发者可以方便地创建和复用 UI 组件。
- **标准化**：是由浏览器原生支持的标准，意味着它们不依赖于任何第三方库或框架。

### 从输入url,到页面展示的过程

- 输入url
- 浏览器缓存 - 系统缓存- 路由器缓存 有缓存 显示页面内容
- http 请求前dns ip地址
- tcp连接 三次握手
- 握手成功 浏览器发送http请求 请求数据包
- 服务器收到请求返回数据到浏览器
- http响应
- 读取页面内容 解析html源码 生成dom树
- 解析CSS :浏览器解析外部CSS⽂件和内联样式 生成cssom树
- DOM树与CSSOM树合成并渲染树：(不可⻅的DOM元素（如 <head> 标签内的内容或具有 display: none 属性的元素）不会被包括在渲染树中)
- 布局（Reflow）：浏览器计算渲染树中每个节点的位置和⼤⼩
- 绘制（Painting）：渲染树的节点将被转换成屏幕上的实际像素
- 合成：将⻚⾯分割成多个层，并在GPU中处理，最后合成到屏幕上。

### 如何实现截图？

创建一个 Canvas 元素，并设置其宽高和样式。

使用 Canvas API 在 Canvas 上绘制需要截图的内容

调用 Canvas API 中的 toDataURL() 方法将整个页面的截图转换为 base64 编码的图片数据

将 base64 编码的图片数据传递给后端进行处理或者直接在前端进行显示。

### hash和history

1. **URL 结构**:
    - `Hash` 模式使用  hash 部分(`#`)来存储应用状态信息,如`https://example.com/#/page1`。
    - `History` 模式使用浏览器的历史 API 来管理完整的 URL 路径,如`https://example.com/page1`。
2. **浏览器兼容性**:
    - `Hash` 兼容所有浏览器。 History` 仅支持 HTML5 。
3. **刷新行为**:
    - `Hash` 模式下页面刷新时,页面不会重新加载,只会触发 `hashchange` 事件。
    - `History` 模式下页面刷新时,页面会重新加载,并触发 `popstate` 事件。
4. **SEO 友好性** `History` 模式下,搜索引擎索到。
5. **用户体验**:
    - `Hash` 模式下,URL 中会出现 `#` 号,可能影响用户体验。
    - `History` 模式下,URL 更加美观,用户体验更好

### history

- History.go（） 参数可以是数字或字符串实现跳转
- history.forward() ：向前跳转⼀个⻚⾯
- history.back() ：向后跳转⼀个⻚⾯
- history.length ：获取历史记录数

### 在使⽤history进⾏导航时，⻚⾯是否真的发⽣了切换，以及如何实现的

- 在 `browserHistory` 模式下，页面确实发生了切换，因为浏览器会重新加载页面以匹配新的 URL。
- 在 `hashHistory` 模式下，页面的切换是“虚拟”的，不会触发浏览器的刷新，而是通过 JavaScript 在前端完成的。

```js
//history` 库支持两种主要的路由模式：`browserHistory` 和 `hashHistor

import { createBrowserHistory, createHashHistory } from 'history';

// 使用 browserHistory
const history = createBrowserHistory();

// 使用 hashHistory
const history = createHashHistory();
// 使用 history.push 或 history.replace 方法来导航到新的路径
history.push('/new-path');

// 或者使用 history.go 方法来在历史记录中前进或后退
history.go(-1); // 后退
history.go(1);   // 前进
```



### `pushState` 和 `replaceState` 的行为

- `pushState` 在浏览器的历史记录中添加一个新的记录。它接受三个参数：状态对象、标题和可选的 URL。调用 `pushState` 会改变浏览器的地址栏 URL，但不会加载页面。
- `replaceState` 替换当前的历史记录项。它接受三个参数：状态对象、标题和可选的 URL。

### `popstate` 事件

- `popstate` 在用户通过浏览器的前进或后退按钮在历史记录中导航时触发。它会传递一个 `event` 对象，该对象包含一个 `state` 属性，这个属性是 `pushState` 或 `replaceState` 方法调用时传入的状态对象。

### 路由的实现原理

允许在不重新加载⻚⾯的情况下导航到不同的视图或组件状。减少⻚⾯加载时间，提⾼⽤⼾体验，

原理和⼯作机制：

1. **路由的核⼼概念：**

◦ 路由表：URL路径与视图映射关系。

◦ 路由器：负责监控URL的变化，并根据路由表渲染相应的视图。



3. **路由的实现步骤：**

◦ 初始化路由：在应⽤加载时，路由器读取当前的URL，并决定渲染哪个视图。

◦ 监听URL变化：使⽤ popstate 或 hashchange 事件监听URL变化。

◦ 解析URL：当URL变化时，路由器解析新URL并查找路由表中相应的视图。

◦ 视图渲染：路由器渲染匹配的视图，通常涉及到调⽤视图组件的渲染逻辑，并将其结果显⽰到⽤⼾界⾯上。



在`实际应⽤`中，前端路由还可能涉及到更复杂的功能，如：

• 路由守卫（Route Guards）：⽤于在路由变化前执⾏权限检查或数据预加载等操作。

• 懒加载（Lazy Loading）：只有在路由被访问时才加载相关的资源或组件，以减少应⽤初始加载的时间。

• 动态路由：⽀持基于参数的路由，如⽤⼾ID或商品ID，使得路由更加灵活和动态。



React Router 使⽤HTML5 History API来管理前端路由。

### 前端路由发送变化，页面刷新的原理

1. **前端路由**：通过 JavaScript 操控浏览器的 URL 和历史记录，实现页面内容的动态更新，不会刷新整个页面。
    - 使用 **`history` API** 或 **`hashchange`** 来监听和改变 URL。
    - 适用于单页应用（SPA）。
2. **页面刷新**：当浏览器 URL 发生变化时，浏览器会向服务器发起请求，重新加载页面资源，重新渲染整个页面。

### Data-是做什么

自定义的属性或数据

### 浏览器缓存机制 （爱诗科技）

**强缓存**：

- 当浏览器第一次请求资源时，服务器会在响应头中设置相关的字段，如 `Cache-Control` 或 `Expires`。如果再次请求该资源且缓存仍在有效期，浏览器会直接从本地缓存中读取，而不会向服务器发送请求。
    - `Expires` 过期时间
    - `Cache-Control` 缓存策略
        - `max-age=<seconds>`: 资源缓存的最大时间。
        - `no-cache`: 缓存前需验证资源是否更新。
        - `no-store`: 禁止缓存。
        - `public`: 资源可被任何缓存存储。
        - `private`: 资源仅可被客户端缓存。


**协商缓存**：

- 当强缓存失效后，浏览器会发送请求到服务器，服务器会根据请求头中的信息来判断资源是否有更新。常见的协商缓存字段有 `Last-Modified` 和 `ETag`。如果资源没有更新，服务器返回 304 状态码，浏览器继续使用本地缓存；如果有更新，则返回新的资源。
    - `Last-Modified` 资源的最后修改时间
    - `ETag`资源的唯一标识符


**本地存储**：

- `LocalStorage`：用于持久化存储数据，除非手动清除，数据会一直存在。
- `SessionStorage`：数据只在当前会话期间有效，关闭浏览器窗口后数据会被清除。

### 缓存验证流程

**内存缓存**：一些频繁访问且体积较小的资源可能会被临时存储在内存中，以加快访问速度。

1. **首次请求**: 服务器返回资源及缓存头（如`Cache-Control`、`ETag`）。
2. **后续请求**: 浏览器检查缓存是否过期。
    - 未过期: 直接使用缓存。
    - 过期: 发送请求，带上`If-None-Match`（基于`ETag`）或`If-Modified-Since`（基于`Last-Modified`）验证资源是否更新。
3. **服务器响应**:
    - 资源未更新: 返回`304 Not Modified`，浏览器继续使用缓存。
    - 资源已更新: 返回新资源及更新后的缓存头。

### 使用建议

- **静态资源**: 使用`Cache-Control: max-age`设置较长缓存时间，结合`ETag`或`Last-Modified`进行验证。
- **动态资源**: 使用`Cache-Control: no-cache`或`no-store`，避免缓存敏感数据。

### 骨架图原理

用简单的图形元素来模拟实际内容，数据未加载或渲染未完成时，先占据相应的空间，给用户即将呈现感觉，

当内容准备，骨架图逐渐被实际内容替换，从而实现从占位到真实的一个过渡。让用户减少等待时的焦虑感和不确定性。



### 设计一个input组件需要哪些属性

以下是设计一个 input 组件通常可能需要的一些属性：

**基本属性**：

- `type`：如`text`、`password`、`number`、`email`、checkbox等，定义输入类型。
- `value`：当前输入框的值。
- `placeholder`：占位提示文本。

**外观相关属性**：

- `className`：用于添加自定义样式类。
- `style`：内联样式。

**事件相关属性**：

- `onChange`：值改变时的回调函数。
- `onFocus`：获得焦点时的回调函数。
- `onBlur`：失去焦点时的回调函数。

**状态相关属性**：

- `Checked`: 勾选
- `disabled`：是否禁用。
- `readonly`：是否只读。

**尺寸相关属性**：

- `size`：可以表示输入框的相对尺寸。

**其他可能的属性**：

- `name`：表单提交时的名称。
- `maxLength`：允许输入的最大字符长度。
- `min`、`max`：针对数值型输入的限制范围。
- `required`：是否必填。

### value是什么类型，onChange怎么规定value的类型

`value`通常是字符串类型。然而，具体的类型可能会根据`input`元素的类型而有所不同。例如，对于数字类型的输入框，`value`可能会被转换为数字类型。



事件处理程序可以接收一个参数，通常称为`event`，event.target.value可以处理



### href 和 src 的区别？

src ⽤于替换当前元素，⽽ href ⽤于在当前⽂档和引⽤资源之间建⽴联系。

### script跨域吗

默认`<script>` 标签加载的脚本不受同源策略的限制

注意事项

- **CORS**：可以加载跨域脚本，但加载的脚本必须遵守浏览器的 CORS（跨源资源共享）策略。如果服务器没有正确配置 CORS 头部，浏览器可能会阻止脚本的加载。
- **JSONP**：由于 `<script>` 标签的跨域特性，JSONP（JSON with Padding）技术被用来绕过同源策略。JSONP 通过动态创建 `<script>` 标签来加载数据，但这种方法仅限于 GET 请求，并且存在安全风险，因此不推荐使用。

### img 标签的 alt 和 title 的区别

- **用途**：`alt` 属性用于提供图像的替代文本，而 `title` 属性用于提供额外的信息提示。
- **显示时机**：`alt` 文本在图像无法显示时显示，`title` 文本在用户将鼠标悬停在图像上时显示。
- **可访问性**：`alt` 属性对于提高网页的可访问性至关重要，特别是对于使用屏幕阅读器的用户。而 `title` 属性虽然也提供信息，但不是为了可访问性设计的，而是为了提供额外的上下文信息。

### webGL

兼容的浏览器中渲染 2D 和 3D 图形,使用 GPU进行硬件加速的图形渲染。

WebGL 的主要用途包括：

- **3D 游戏和应用**
- **数据可视化**：创建交互式的数据可视化图表和图形。
- **增强现实（AR）和虚拟现实（VR）**：

基本概念：

- 使用`着色器`来处理图形渲染的两个阶段：顶点着色器处理顶点数据，而片段着色器处理像素颜色。
- 使用`缓存区存`储顶点数据，如位置、颜色和纹理坐标。
- 使用`纹理`来为 3D 对象添加图像和细节。
- `渲染管线`是一个处理图形数据的流程。

### webGPU

下一代的 Web 图形 API，成为 WebGL 的继任者，提供了对现代 GPU 功能的更直接访问，包括并行计算和图形渲染。

### meta、link、style，link可以引入哪些资源，里面的type是做啥的，link可以跨域吗

`<meta>` 元素用于提供关于 HTML 文档的元数据，如字符集、页面描述、关键字、作者等
`<link>` 元素用于链接外部资源，标签本身不直接涉及跨域问题，因为它是用来链接外部资源的
`<style>` 用于定义页面的内联样式



### manifest.json

一个 JSON 文件，主要用于描述 Web 应用的一些元信息，并提供一种方式来配置 Progressive Web Apps（PWA）功能。它通常用于增强应用的离线功能、图标、主题颜色、启动模式等，提供更好的安装体验。

**基本作用**

1. **Web App 安装**：允许用户将网站安装到他们的设备（例如桌面或主屏幕）上，像原生应用一样运行。
2. **自定义外观**：通过设置图标、启动画面、背景颜色等，让 Web 应用在不同设备上呈现出一致的用户体验。
3. **控制显示模式**：可以设置应用的启动方式（例如全屏、浏览器模式等）。

**常见字段**

- `name`：Web 应用的完整名称。
- `short_name`：应用的短名称，用于在设备屏幕上显示。
- `start_url`：指定应用启动时的页面。
- `display`：定义应用的显示模式（`fullscreen`, `standalone`, `minimal-ui`, `browser`）。
- `background_color`：应用的背景颜色，通常显示在加载画面。
- `theme_color`：设置浏览器的 UI 颜色，常见于地址栏。
- `icons`：提供应用的图标文件，通常提供多种尺寸的图标以适应不同设备。