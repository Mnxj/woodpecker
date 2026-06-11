---
title: "Complete CSS Guide: From Basics to Advanced Features"
description: "Deep dive into CSS core concepts, layouts, animations, and performance — helping developers master modern CSS"
keywords: ["CSS", "layout", "Flexbox", "Grid", "animation", "performance", "responsive design", "BFC", "selectors"]
---

# Complete CSS Guide: From Basics to Advanced Features

## 1. CSS basics

### 1.1 BFC (Block Formatting Context)
BFC is a core layout concept — it creates an independent rendering area with specific layout rules. Understanding BFC is crucial for solving common layout problems.

#### What is BFC?
BFC (Block Formatting Context) is an independent container — element layout inside doesn't affect elements outside. A BFC is created when:
- `float` is not `none`
- `position` is `absolute` or `fixed`
- `display` is `inline-block`, `table-cell`, `flex`, etc.
- `overflow` is not `visible`

**The most common is `overflow: hidden` — it has the smallest side effects. The others have larger side effects.**

Use cases

- Solve parent-height collapse caused by floated children
- Prevent non-floated elements from being overlapped by floats
- Avoid vertical margin collapsing

### Height-collapse compatibility issues

Height collapse can be caused by different browser implementations of CSS box model and float handling, leading to layout miscalculations.

### Clearing floats

- `clear: both` — clear left/right floats
- BFC
- `::after` `::before` + `clear: both`

### BFC, IFC, GFC, FFC

- BFC — Block Formatting Context (block-level layout container)
- IFC — Inline Formatting Context (for inline elements)
- GFC — Grid Formatting Context (for `display: grid`)
- FFC — Flex Formatting Context (for `display: flex`)

### inline vs block vs inline-block

`inline`

- Can't set height; layout is content-driven. Sits on the same line as other inline elements.
- Can set `padding` and `margin`, but only horizontal margins affect layout — vertical margins don't push other elements.
- Examples: `<span>`, `<a>`

`block`

- Takes a full line. If width isn't set, defaults to parent's width.
- Can set `width`, `height`, `padding`, `margin`, `border` — all affect layout.
- Examples: `<div>`, `<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>`, `<li>`, `<table>`, etc.

`inline-block`

- Combines inline and block features. Doesn't take a full line, can sit next to other inline elements, but supports `width`, `height`, `padding`, `margin`, `border`.
- Examples: `<button>`, `<input>`, `<select>`, `<textarea>`, `<img>`, etc.

### Using Flex layout

Flexible box layout — `display: flex`

`flex-direction` — main axis direction

`flex-wrap` — whether items wrap

`flex-flow` — shorthand for `flex-direction` and `flex-wrap`

`justify-content` — main-axis alignment

- **flex-start (default)**: items align to the start of the main axis.
- **flex-end**: items align to the end.
- **center**: items align to center.
- **space-between**: items distributed evenly; first at start, last at end.
- **space-around**: items distributed evenly with equal space around each.
- **space-evenly**: items distributed evenly with equal space between each.

`align-items` — cross-axis alignment

`align-content` — alignment of multiple lines on the cross axis

Item properties



### Flex: 1

`flex: 1` is shorthand for `flex-grow: 1; flex-shrink: 1; flex-basis: 0%`.

- `flex-grow: 1` — grow ratio. Default 0.
- `flex-shrink: 1` — shrink ratio. Default 1.
- `flex-basis: 0%` — when set to 0, content determines size. Default `auto` (the item's natural size).


### `opacity: 0` vs `visibility: hidden` vs `display: none` — pros and use cases

- `display: none` — doesn't occupy space, not clickable, not inherited, triggers reflow + repaint.
- `visibility: hidden` — occupies space, not clickable, inherited, triggers repaint.
- `opacity: 0` — occupies space, clickable, triggers repaint.

### Difference between `rgba()` and `opacity`; which covers child elements?

Differences

- **Scope**: `rgba()` only affects the element itself; `opacity` affects the element and all descendants.
- **Performance**: `opacity` may be slower than `rgba()` when many children exist.
- **Compatibility**: `rgba()` may need vendor prefixes in older browsers (`-webkit-`, `-moz-`).

### Inheritable CSS properties

1. Font-related (6):
   - `font-family`
   - `font-size`
   - `font-weight`
   - `font-style` (e.g. italic)
   - `line-height`
   - `font` (shorthand)

2. Text-related (7):
   - `color`
   - `text-align`
   - `text-decoration` (underline, line-through)
   - `text-indent` (first-line indent)
   - `text-transform` (upper/lower case)
   - `letter-spacing`
   - `word-spacing`

3. List-related (4):
   - `list-style-type`
   - `list-style-image`
   - `list-style-position`
   - `list-style` (shorthand)

4. Other (3):
   - `cursor`
   - `opacity`
   - `visibility`


### Transform

The `transform` property applies transforms to an element:

- Translate — `translateX`, `translateY`:

```css
transform: translateX(100px);
transform: translateY(-50%);
```

- Rotate:

```css
transform: rotate(45deg);
```

- Scale:

```css
transform: scale(1.5);
```

- Skew — `skewX`, `skewY`:

```css
transform: skewX(20deg);
transform: skewY(-10deg);
```

- 3D transform — `transform` also supports 3D:

```
transform: translate3d(100px, 50px, 0);
transform: rotate3d(1, 0, 0, 45deg);
transform: scale3d(1.5, 1.5, 1.5);
```

- Multiple transforms — combine in one `transform` value:

```css
transform: translateX(100px) rotate(45deg) scale(1.5);
```

**Notes**

- Doesn't affect other elements in document flow but does affect element layout — especially `translate()`.
- Generally good performance — GPU-accelerated; heavy use may impact perf.
- Combine with `transition` for smooth animations.

### animation

```css
animation: name + duration + timing-function + delay + iteration-count + direction
```

### Properties of `transition` and `animation`

transition

- `transition-property` — which CSS property transitions
- `transition-duration` — how long
- `transition-timing-function` — easing function
- `transition-delay` — delay before starting

animation

- `animation-name` — keyframes name
- `animation-duration` — duration (seconds or ms)
- `animation-timing-function` — how it advances within a cycle
- `animation-delay` — delay
- `animation-iteration-count` — playback count
- `animation-direction` — should reverse?
- `animation-fill-mode` — pre/post state retention
- `animation-play-state` — running or paused

### transition vs animation

- **Complexity**: `transition` for simple state changes; `animation` for complex sequences.
- **Control**: `transition` only handles A→B transitions; `animation` controls full sequences with keyframes and repeats.
- **Use cases**: `transition` for simple user-interaction effects; `animation` for looping or complex animations



### PNG-8 / PNG-16 / PNG-32 differences, and PNG compression basics

- PNG-8 — 256 colors
- PNG-16 — RGB, 256×256×256 colors
- PNG-32 — PNG-24 + alpha channel (RGBA), 256 levels of transparency



Compression:

1. Filter algorithms: predict each pixel value and store the difference between actual and predicted — reduces redundancy.
2. Lossless compression: DEFLATE (LZ77 + Huffman) — finds duplicate strings and replaces with shorter codes.
   - **LZ77**: dictionary-based compression — find repeated strings and replace with pointers.
   - **Huffman coding**: assign shorter codes to more frequent characters.
3. Alpha channel is also compressed.
4. Lower color depth → smaller files, but lower image quality.
5. Adam7 interlacing — progressively reveals the image as it downloads.



### CSS selector specificity

1. `!important`
2. **Inline styles**
   - Declared in element's `style` attribute, e.g. `style="color: red;"`.
   - Highest specificity.
3. **ID selectors**
   - Start with `#`, e.g. `#myElement`.
4. **Class selectors, attribute selectors, pseudo-classes**
   - Start with `.`, e.g. `.my-class`.
   - Start with `[`, e.g. `[type="text"]`.
   - Pseudo-classes start with `:`, e.g. `:hover`, `:active`, `:empty`, `:focus`, `:first-child`, `:last-child`, `:first-of-type`, `:last-of-type`, `:only-child`, `:only-of-type`.
5. **Element selectors and pseudo-elements**
   - HTML element names, e.g. `h1`.
   - Pseudo-elements start with `::`, e.g. `::before`, `::after`, `::first-line`, `::first-letter`, `::selection`.
6. **Universal selector (`*`)** — lowest specificity.

Group selectors (`div, p`)

- **Pseudo-classes**: start with `:`, select elements in a state.

- Pseudo-elements: start with `::`, insert virtual elements.
- Adjacent selectors:

`+` selector — select an element immediately preceded by a sibling with the same parent.

`~` selector — find all subsequent siblings of an element.

### What's new in CSS3?

- Selectors
   - `:lang()` language selector
   - `:is()` accepts multiple selectors as args
   - Pseudo-class `:first-child` — first child of its parent. Case-insensitive.
   - `:last-child`
   - Attribute selectors: `^` starts-with, `$` ends-with, `*` contains

- Box model: `border-radius`, `box-shadow`, `border-image`
- Background: `background-size`, `background-origin` (padding-box, content-box, border-box), `background-clip`
- Text effects: `text-shadow`, `word-wrap` (long words / URLs)
- Gradients: linear and radial gradients
- Fonts: `@font-face`
- 2D/3D `transform`, `transform-origin`
- Transitions and animations: `transition`, `@keyframes`, `animation`
- Media queries: `@media`
- Multi-column layout: `column-count`, `column-width`, `column-gap`, `column-rule`, `column-span`

### Box model variants

> A concept describing how elements are displayed on the page

Standard box model: margin + border + padding + content

IE box model: padding + border + content

Toggle: `box-sizing: content-box` (default, standard) | `border-box` (IE)

### When does `z-index` not work?

- For statically positioned elements (`position: static`), `z-index` has no effect. Set `position` to `relative`, `absolute`, or `fixed`.
- If the parent's `z-index` is higher than the child's, the parent covers the child.
- In the same stacking context, equal `z-index` values are ordered by HTML source order.
- `z-index` may not work for flex containers/items — flexbox has its own stacking rules.

### Does CSS loading block?

- CSS loading doesn't block DOM parsing
- It blocks render tree painting and JS execution after it



To avoid white-screen, speed up CSS loading:

- CDN — pick nearest resources
- Compress CSS — webpack + zip
- Cache appropriately — `cache-control`, `expires`, `ETag`
- Reduce HTTP requests — merge CSS files

### postcss

PostCSS is like Babel for CSS — lets you use newer syntax.

```js
// npm i postcss-loader postcss postcss-preset-env -D
loader: 'postcss-loader',
options: {
    postcssOptions: {
          plugins: [
                'postcss-preset-env' // fixes most style compatibility issues
            		'autoprefixer' // adds vendor prefixes
...


  "browserslist": [ // browser targets
    "last 2 version", // last 2 versions, AND
    "> 1%", // covers 99% of browsers
    "not dead" // exclude dead browsers
  ]

1) webpack.config.js > postcss.config.js, .browserslistrc and package.json at same level
2) Use only ONE of package.json or .browserslistrc, not both — they conflict
```



### Why CSS-in-JS?

1. **Style encapsulation and isolation**
2. **Dynamic styling**
3. **Code reuse**, **dynamic theming**, **theme abstraction**



Compared with traditional "bare CSS" for theme switching:

1. **Style pollution**:
   - Global-scope CSS easily causes style pollution and unintended overrides.
2. **Inefficient theme switching**:
   - Need to manually modify or swap CSS files / class names — inefficient.
3. **Reuse and maintenance difficulty**:
   - Theme styles scattered across files — hard to manage and reuse.

### CSS3 hardware acceleration

CSS3 hardware acceleration is also called `GPU acceleration` — offloads CPU work for better perf.

**Properties that trigger GPU acceleration:**

1) `transform` not `none`
2) `opacity`

**Drawbacks**

Too much GPU work causes memory issues; if hardware acceleration isn't disabled when animation ends, fonts can blur.

### Reflow

Reflow happens when element size, position, or content changes — the browser recomputes geometry and may relayout other parts of the page. Adding/removing/modifying DOM elements or changing sizes, positions, font sizes triggers reflow.

### Repaint

Repaint happens when an element's appearance changes without affecting geometry — background color, text color, border color. Repaint is usually cheaper than reflow because layout doesn't change.

### How to avoid perf overhead

1. **Reduce DOM ops**: minimize DOM operations, especially in loops. Use `DocumentFragment` or batch updates.
2. **Use classes and stylesheets**: avoid inline styles; use CSS classes — the browser can batch-process style changes, reducing repaints/reflows.
3. **Avoid complex CSS selectors**: complex selectors slow style calculation.
4. **Use hardware acceleration**: CSS `transform` and `opacity` trigger HW acceleration, reducing reflow/repaint cost.
5. **Reduce JS animations**: prefer CSS animations — the browser compositor handles them without reflow/repaint.
6. **Avoid forced sync layouts**: in JS, reading layout info (`offsetWidth`, `clientHeight`) and then mutating the DOM forces sync layout. Mutate first, then read.
7. **Use a virtual DOM**: React, Vue, etc. use vDOM to reduce direct DOM operations.
8. **Throttle / debounce**: for frequently-fired events (resize, scroll), throttle and debounce.

### CSS-level tips to reduce reflow/repaint

1) Use GPU hardware acceleration

2) Animations use absolute/fixed positioning so they leave document flow — modifying them doesn't affect the main layout

3) Use `visibility` instead of `display: none` (former triggers only repaint; latter triggers reflow)

4) Avoid `table` layout — small changes can relayout the entire table


### What problems do CSS Grid and Flexbox solve?

Flexbox

- One-dimensional layout.
- Aligns items, manages spacing between items and between items and container edges.
- Auto-sizes children for available space — great for dynamic content or unknown-size children.

CSS Grid

- Two-dimensional layout.
- Define row and column sizes and positions within the container — great for complex layouts like magazine and chessboard layouts.
- Precise control over child positions — easy alignment, overlap, and stacking.

### `position` values and characteristics

1. `static` (default):
   - Normal document flow.
   - `top`, `right`, `bottom`, `left`, `z-index` have no effect.
2. `relative`:
   - Normal document flow.
   - Then offset by `top`/`right`/`bottom`/`left` without affecting others.
   - Moved relative to its own normal position.
3. `absolute`:
   - Removed from document flow.
   - Positioned relative to the nearest positioned ancestor; if none, relative to `<body>`.
   - Use `top`/`right`/`bottom`/`left` to position.
4. `fixed`:
   - Removed from document flow.
   - Positioned relative to the viewport.
   - Stays in place even on scroll.
5. `sticky`:
   - Positioned based on user scroll.
   - Acts like `relative` until it reaches a defined threshold; then acts like `fixed`.
   - Must specify one of `top`/`right`/`bottom`/`left`.

### Leaving the document flow

Removing an element from normal flow so it doesn't affect other elements' layout.



1. `position: absolute;`
2. `position: fixed`
3. `float: left|right;`
4. `display: inline-block;` — inline block; flows inline but supports width/height/margin/border/padding.

### When does `position: absolute` fail?

1. **Parent has no `position`**
   - If the parent has no `position` (defaults to `static`), absolute positioning is relative to the viewport.
2. **Wrong `position` on parent**
   - Wrong value (e.g. `fixed`) on the parent may cause unexpected positioning.
3. **Indeterminate parent size**
4. **Parent uses `transform`**
   - If the parent uses `transform`, absolute positioning is relative to the transformed parent, which may surprise you.
5. **Incorrect properties on the absolute element**
   - Wrong `top`/`left`/`right`/`bottom` may cause incorrect positioning.
6. **Absolutely positioned element leaves the flow**
7. **Browser compatibility**
   - Different browsers may handle `position: absolute` slightly differently.

### Absolute positioning + leaving flow

1. Set parent `position` sensibly — usually `relative` or `absolute`.
2. Handle parent height "collapse" — use `overflow` or set explicit height on parent.
3. Order absolute elements vs siblings carefully.
4. Set `top`/`left`/`right`/`bottom` based on actual needs.
5. Use `z-index` to control stacking.

### Introduce sticky positioning

> Lets an element stick at a position during scrolling

`position: sticky`

`top: 0`

**Failure cases:**

1) Parent has `overflow: hidden`
2) Insufficient remaining height — nothing to scroll

### CSS style precedence

Inline → embedded stylesheet → external stylesheet

### Ways to include CSS in HTML

1. **External stylesheet**

   - Add `<link>` in `<head>` pointing to an external CSS file.

2. **Inline styles**

   - Use the `style` attribute on an HTML element.

3. **Embedded stylesheet**

   - Use `<style>` in `<head>` with CSS rules inside.

4. **Imported stylesheet**

   - Use `@import` in a CSS file to import other CSS files.

### rem

> Set `font-size` on `html`

1. Custom: on page load, compute and set an appropriate root `font-size` based on screen size and resolution
2. px → rem: postcss — in `postcss.config.js` add plugins like `postcss-pxtorem: { rootValue: 16, propList: ['*'], selectorBlackList: [] }`
3. WebComponent: a rem component

### Compatibility between rem and vw/vh

`vw`/`vh` are viewport units; `rem` is relative to the root font size:

- **Browser zoom**: `vw`/`vh` adjust with viewport size; `rem` is based on root font size and doesn't auto-scale.
- **Mixing units**: be careful when mixing `vw/vh` and `rem` — keep consistent units or convert carefully.
- **Design + dev considerations**: account for unit characteristics and compatibility during design and implementation.

### Combined vs separate style declarations

Combined: saves space.

Separate: very readable — better for large projects or team collaboration.

### Responsive design?

- Media queries `@media`
- rem, rm
- Fluid layout (percentages)
- `display: flex`
- `display: grid`

### Which ops trigger repaint / reflow

- `position: absolute; left: 100px;` — triggers reflow. Changing position of an absolutely positioned element causes layout recalculation.
- `translateX: 100px;` — usually only repaint. Handled by GPU rather than the layout engine.
- `getBoundingClientRect` — doesn't directly cause repaint/reflow, but if reading it triggers subsequent reflow-inducing ops, it indirectly causes reflow.
- `getClientWidth`/`getClientHeight` — usually no repaint/reflow; just reading sizes.

### How CSS Modules work

1. Create an isolated scope for each CSS module with a unique identifier.
2. When generating the stylesheet, rename rules based on the module identifier to ensure uniqueness.
3. Import the CSS file into JS modules.
4. JS can access and operate on the module's style rules.



### How much do you know about frontend watermarks?

- Overlay a `position: fixed` div on the page; set low opacity.
- Set `pointer-events: none` to allow click-through.
- Inside the div, loop and generate small watermark divs via JS; each shows a piece of watermark content.



Canvas-as-background approach:

Draw a watermark area; export it via `toDataURL`.

Set this image as the box's background via `background-repeat: repeat;` to tile the entire screen.

### How do you handle and optimize large-scale CSS?

1. **CSS preprocessors** — variables, mixins, functions, nesting.

2. **Modularization** — split CSS into multiple small files per component or page.

3. Reduce reflow/repaint; compress CSS.

4. Use CSS architectures

Adopt consistent architectures like OOCSS, SMACSS, or ITCSS.

• These methodologies provide guidelines and best practices for organizing and maintaining large CSS codebases.

5. PostCSS for compatibility.

6. Use a CSS linter (e.g. Stylelint) to auto-detect problems and inconsistencies.

   npm install stylelint --save-dev

   Add config to `.stylelintrc` (`extends`, `rules`).

   Run via CLI or editor.

   In webpack, use `stylelint-webpack-plugin`:

   ```js
   {
               loader: 'stylelint-webpack-plugin',
               options: {
                 // config
               }
             }
   ...
   plugins: [
       // ...
       new StyleLintPlugin({
         // config
         files: ['src/**/*.css', 'src/**/*.scss'],
         fix: true, // auto-fix fixable errors
       }),
     ],
   ```


### `link` vs `@import` — both load external CSS, but they differ:

`link` is an XHTML tag — besides CSS, it can also reference RSS and others; `@import` is CSS-only.

`link` loads concurrently with the page; `@import` loads after the page is fully loaded.

`link` has no compatibility issues; `@import` was introduced in CSS2.1 — older browsers don't support it.

`link` can be controlled via JS to alter styles; `@import` can't.

### src vs href

`href` indicates a hyperlink — used in `link`, `a`, etc. — establishes a connection between the current element and the referenced resource.

`src` references a resource that REPLACES the current element. The resource is downloaded and applied — e.g. JS scripts, images, frames.



### `will-change` performance optimization

Tell the browser which properties will change so it can do background optimization — preallocate memory, enable HW acceleration.



When you set `will-change: transform`, the browser creates an independent layer for the element marked "about to transform". This lets the browser handle the element more efficiently during layout and paint without recomputing the entire render tree.



**iPhone Chrome**

After elevation to a composite layer, rasterization can cause blur

> Cause: after compositing, rasterization's pixel-ratio change leads to blurry rendering. Google fixed this in 2016 — so iPhones may still show blur in older cases; Android is fine.




**1. Don't apply will-change to many elements — it creates many composite layers**

**2. Add it just before repaint/reflow operations, and remove it after to free browser resources**

**3. Don't add will-change just for marginal gains — only add it if the benefit is significant**

### tailwind vs less

**Tailwind CSS**:

- A CSS framework providing many predefined utility classes. No compile step needed; you compose them in HTML to build UIs quickly.
- Themes, colors: customize via `tailwind.config.js`.
- Performance: generates large CSS, but PurgeCSS strips unused classes.
- Steep learning curve due to many utility classes; great for rapid dev.

Less:

- A CSS preprocessor extending CSS with variables, nesting, mixins. Compiles to plain CSS.
- Themes, colors: variables and mixins.
- Performance: file size depends on code complexity; usually smaller.
- Need to learn preprocessor syntax; great for projects with complex styles.

