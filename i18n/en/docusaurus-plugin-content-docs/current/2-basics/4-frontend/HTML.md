---
title: "Complete HTML Guide: From Basics to Advanced Features"
description: "A deep dive into HTML's core concepts, semantic tags, Canvas, and SVG — helping developers master modern HTML"
keywords: ["HTML", "semantic", "Canvas", "SVG", "Web Components", "performance", "responsive design"]
---

# Complete HTML Guide: From Basics to Advanced Features

## Table of Contents
1. [HTML basics](#html-basics)
2. [Canvas & SVG](#canvas-svg)
3. [Web Components](#web-components)
4. [Performance](#performance)
5. [Responsive design](#responsive-design)

## 1. HTML basics

### 1.1 Semantic tags
Semantic tags are a major HTML5 feature, making page structure clearer and improving SEO and accessibility.

#### Common semantic tags:
- `<header>`: page header
- `<nav>`: navigation
- `<main>`: main content
- `<article>`: self-contained article
- `<section>`: a document section
- `<aside>`: sidebar
- `<footer>`: page footer

### How to make an element draggable?

> Add the `draggable="true"` attribute to the element

In JavaScript, listen for drag-related events:

- `dragstart`: fires when dragging starts.
- `drag`: fires continuously while dragging.
- `dragover`: fires while the dragged element hovers over a valid drop target.
- `drop`: fires when the dragged element is dropped on a valid target.
- `dragend`: fires when dragging ends.

### Canvas API

1. **Basic drawing APIs**:
    - `getContext('2d')`: get the 2D drawing context.
    - `beginPath()`: start a new path.
    - `moveTo(x, y)`: move the drawing cursor.
    - `lineTo(x, y)`: draw a straight line from current to given point.
    - `stroke()`: stroke the current path.
    - `fill()`: fill the shape formed by the current path.
    - `closePath()`: close the current path.
2. **Shape APIs**:
    - `rect(x, y, width, height)`: draw a rectangle.
    - `arc(x, y, radius, startAngle, endAngle, anticlockwise)`: draw a circle or arc.
    - `quadraticCurveTo(cp1x, cp1y, x, y)`: draw a quadratic Bezier curve.
    - `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)`: draw a cubic Bezier curve.
3. **Style APIs**:
    - `strokeStyle = color`: stroke color.
    - `fillStyle = color`: fill color.
    - `lineWidth = value`: line width.
    - `lineCap = butt|round|square`: line cap style.
    - `lineJoin = bevel|round|miter`: line join style.
    - `font = value`: text font.
    - `textAlign = start|end|left|right|center`: text alignment.
    - `textBaseline = top|hanging|middle|alphabetic|ideographic|bottom`: text baseline.
4. **Image APIs**:
    - `drawImage(image, x, y)`: draw an image onto the canvas.
    - `createImageData(width, height)`: create a new blank ImageData object.
    - `getImageData(x, y, width, height)`: get pixel data from a canvas region.
    - `putImageData(imageData, x, y)`: draw an ImageData onto the canvas.
5. **Transform APIs**:
    - `translate(x, y)`: move the origin.
    - `rotate(angle)`: rotate the coordinate system.
    - `scale(x, y)`: scale the coordinate system.
    - `transform(a, b, c, d, e, f)`: apply a complex transform.
    - `setTransform(a, b, c, d, e, f)`: reset to identity, then apply a new transform.
6. **Other APIs**:
    - `save()`: save current state.
    - `restore()`: restore the most recently saved state.
    - `clearRect(x, y, width, height)`: clear a rectangular region to fully transparent.

### Optimizing Canvas draw performance

- Reduce drawing operations — use `fillRect` instead of `moveTo`/`lineTo`.
- Use `requestAnimationFrame`.
- Transparency adds GPU overhead.
- For frequent pixel read/write, use `getImageData` to grab pixels, modify in memory, then `putImageData`.
- Compressed image assets reduce memory and load time.
- For complex scenes, draw different elements on separate canvases, then composite them.
- Use Web Workers.

### SVG attributes and notes

1. **SVG tag attributes**
    - `width` / `height`: SVG element size. Px, %, etc.
    - `viewBox`: defines the SVG coordinate system — `"min-x min-y width height"`.
    - `preserveAspectRatio`: how the viewBox fits the width/height.
    - `xmlns`: SVG namespace, typically `"http://www.w3.org/2000/svg"`.
2. **SVG shape elements**
    - `<rect>`: rectangle. Attributes: `x`, `y`, `width`, `height`, `rx`, `ry`.
    - `<circle>`: circle. Attributes: `cx`, `cy`, `r`.
    - `<ellipse>`: ellipse. Attributes: `cx`, `cy`, `rx`, `ry`.
    - `<line>`: line. Attributes: `x1`, `y1`, `x2`, `y2`.
    - `<polyline>`: polyline. `points` attribute for vertices.
    - `<polygon>`: polygon. `points` attribute for vertices.
    - `<path>`: arbitrary shape via `d` attribute.
3. **SVG text elements**
    - `<text>`: render text. `x`, `y`, `fill`, `font-size`, etc.
    - `<tspan>`: style a portion of text. Nest inside `<text>`.
4. **SVG styling and interaction**
    - CSS can style SVG elements: `fill`, `stroke`, `font-family`, etc.
    - Add event listeners (click, mouseover) for interactivity.
5. **Best practices**
    - Make sure SVG has the proper `xmlns`.
    - With relative units (percentages), ensure the parent container has explicit dimensions.
    - For complex SVGs, predefine shapes with `<defs>`.
    - Add `id` or `class` to SVG elements for easy CSS/JS targeting.
    - For dynamic SVGs, mind performance — minimize unnecessary repaints/reflows.

### Canvas vs SVG

- **Canvas**:
    - Pixel-based rendering
    - An HTML element with no document structure
    - Drawn dynamically via JS
    - Better for large numbers of shapes; no parent DOM management
    - Scaling causes blurriness
- **SVG**:
    - Vector-based rendering
    - XML, has document structure
    - Styled and scripted via CSS and JavaScript
    - Better for small numbers of shapes
    - Can leverage DOM manipulation and CSS to control graphics
    - Scaling is lossless

### Animations

1. **CSS transitions**:
    - With `transition`, you can animate smooth changes when properties change.
    - Common properties: `transition-property`, `transition-duration`, `transition-timing-function`, `transition-delay`.
    - For simple, single-property animations.
2. **CSS keyframes**:
    - Use `@keyframes` to define a sequence of frames describing how the animation evolves.
    - Use `animation` to control playback — name, duration, timing function.
    - For complex, multi-property animations.
3. **JavaScript animations**:
    - Use `requestAnimationFrame` or `setInterval` to update element styles over time.
    - Fine-grained control of each frame; complex animation logic.
    - For interactions or DOM-state-dependent animations.
4. **SVG animations**:
    - SVG supports rich animation attributes — `animate`, `animateMotion`.
    - Animate via SVG tags or CSS properties.
    - For vector-graphic transformations.
5. **Canvas animations**:
    - Use `<canvas>` and JavaScript for custom animations.
    - Free control over each frame; complex animation logic.
    - For many custom graphic transformations.



### Semantic layout

> Helps search engines understand structure, makes code clearer, improves compatibility.

1. **Header**: defines a page or section header. Often contains the logo and primary nav.

2. **Main**: defines the main content area. Articles, blog posts, etc.

3. **Nav**: container for navigation links. Typically holds the site's main menu.

4. **Aside**: secondary content typically beside the main area.

5. **Footer**: defines a page or section footer. Often contains copyright, contact info, etc.

### What do `dl`, `dt`, `dd` mean in HTML semantics? What about `ol` and `ul`?

- `<dl>` — the description list container.
- `<dt>` — a term being described.
- `<dd>` — the description.
- `<ol>` — ordered list, items numbered or lettered.
- `<ul>` — unordered list, items bulleted.

**Set `list-style-type: none` to remove markers.**

### Web Components

1. **Custom Elements**: define custom HTML tags via `customElements.define`.
2. **Shadow DOM**: encapsulate and isolate DOM via `attachShadow` to create an isolated subtree (shadow tree).
3. **HTML Templates**: define templates that can be cloned at runtime. Template content isn't rendered until inserted.
4. **HTML Imports**: deprecated. Originally for loading HTML fragments, replaced by ES Modules.

### **Benefits of Web Components**

- **Framework-agnostic**: work with any modern framework or library (React, Vue, Angular).
- **Encapsulation**: Shadow DOM ensures component styles and behavior aren't affected externally, reducing style conflicts.
- **Reusability**: modular — easy to create and reuse UI components.
- **Standardized**: natively supported in browsers; no third-party library required.

### URL-to-page-render process

- Enter URL
- Browser cache → system cache → router cache — if cached, render the page
- Before HTTP request: DNS to IP
- TCP three-way handshake
- After handshake: browser sends HTTP request packet
- Server receives the request and returns the data
- HTTP response
- Browser reads the content, parses HTML, builds the DOM tree
- Parse CSS: browser parses external stylesheets and inline styles to build the CSSOM tree
- Combine DOM + CSSOM into the Render tree: invisible DOM elements (e.g. `<head>` contents, `display: none`) aren't included
- Layout (Reflow): compute position and size of each node in the render tree
- Paint: convert render tree nodes into actual pixels
- Compositing: divide the page into layers, process on the GPU, composite to screen

### How to take a screenshot?

Create a Canvas element with desired size and style.

Use the Canvas API to draw what you want to capture.

Call `toDataURL()` to convert the page screenshot to base64-encoded image data.

Pass the base64 image data to the backend or display it on the frontend.

### Hash vs History

1. **URL structure**:
    - `Hash` mode stores app state in the URL hash (`#`), e.g. `https://example.com/#/page1`.
    - `History` mode uses the browser's History API to manage clean URL paths, e.g. `https://example.com/page1`.
2. **Browser compatibility**:
    - `Hash` works in all browsers. `History` requires HTML5.
3. **Refresh behavior**:
    - In `Hash` mode, refreshing doesn't reload the page — only triggers `hashchange`.
    - In `History` mode, refreshing reloads the page and triggers `popstate`.
4. **SEO friendliness**: `History` mode is more search-friendly.
5. **User experience**:
    - `Hash` mode shows `#` in the URL, which may feel awkward.
    - `History` mode has cleaner URLs, better UX.

### history

- `history.go(n)` — n can be a number or string to navigate.
- `history.forward()` — go forward one page.
- `history.back()` — go back one page.
- `history.length` — number of entries.

### When navigating via history, is the page actually switched? How does it work?

- In `browserHistory` mode, the page truly switches — the browser reloads to match the new URL.
- In `hashHistory` mode, the "switch" is virtual — no browser refresh; it's handled by JavaScript on the frontend.

```js
// The `history` library supports two main modes: browserHistory and hashHistory

import { createBrowserHistory, createHashHistory } from 'history';

// Use browserHistory
const history = createBrowserHistory();

// Use hashHistory
const history = createHashHistory();
// Use history.push or history.replace to navigate
history.push('/new-path');

// Or use history.go to move through history
history.go(-1); // back
history.go(1);   // forward
```



### Behavior of `pushState` and `replaceState`

- `pushState` adds a new entry in the browser's history. Takes 3 args: state object, title, and optional URL. It changes the address bar URL without loading a page.
- `replaceState` replaces the current entry. Same 3 args.

### `popstate` event

- `popstate` fires when the user navigates via browser forward/back. It passes an `event` with a `state` property — the state object provided to `pushState`/`replaceState`.

### How does routing actually work?

It lets you navigate between views/components without reloading the page — reducing load time and improving UX.

How it works:

1. **Core concepts:**

   ◦ Route table: maps URL paths to views.

   ◦ Router: monitors URL changes and renders the matching view based on the table.



3. **Implementation steps:**

   ◦ Initialize: on app load, the router reads the current URL and decides which view to render.

   ◦ Listen for URL changes: use `popstate` or `hashchange`.

   ◦ Resolve URL: on change, the router parses the new URL and looks up the matching view.

   ◦ Render: the router renders the matched view — typically calling render logic and updating the UI.



In `practice`, frontend routing can include more complex features:

• Route guards: run permission checks or preload data before navigation.

• Lazy loading: load components/assets only when the route is visited.

• Dynamic routes: parameterized routes (user ID, product ID) for more flexible routing.



React Router uses the HTML5 History API for frontend routing.

### What happens under the hood when the route changes vs full page refresh

1. **Frontend routing**: JavaScript controls the URL and history, updating page content dynamically without a full refresh.
    - Use `history` API or `hashchange` to listen for and modify the URL.
    - Used in SPAs.
2. **Page refresh**: when the URL changes, the browser requests the server, reloads assets, and re-renders the whole page.

### What's `data-` for?

Custom attributes / data.

### Browser caching mechanism

**Strong cache**:

- When the browser first requests a resource, the server sets fields in the response headers — `Cache-Control` or `Expires`. On subsequent requests within the cache lifetime, the browser reads from the local cache without contacting the server.
    - `Expires` — expiry timestamp
    - `Cache-Control` — caching policy
        - `max-age=<seconds>`: max cache duration.
        - `no-cache`: must validate before using cache.
        - `no-store`: don't cache.
        - `public`: cacheable by any cache.
        - `private`: cache only on the client.


**Negotiated cache**:

- When strong cache expires, the browser sends a request; the server checks request headers to decide if the resource is updated. Common headers: `Last-Modified` and `ETag`. If unchanged, server returns 304 and the browser uses cache; if changed, returns the new resource.
    - `Last-Modified` — last modification time
    - `ETag` — unique identifier of the resource


**Local storage**:

- `LocalStorage`: persistent storage — data remains until manually cleared.
- `SessionStorage`: per-session data — cleared when the tab closes.

### Cache validation flow

**Memory cache**: small, frequently-accessed resources may be cached in memory for speed.

1. **First request**: server returns resource + caching headers (`Cache-Control`, `ETag`).
2. **Subsequent requests**: browser checks cache validity.
    - Not expired: use cache directly.
    - Expired: send request with `If-None-Match` (based on `ETag`) or `If-Modified-Since` (based on `Last-Modified`) to validate.
3. **Server response**:
    - Not modified: returns `304 Not Modified`; browser keeps using cache.
    - Modified: returns new resource and updated caching headers.

### Suggestions

- **Static assets**: long `Cache-Control: max-age` plus `ETag` or `Last-Modified` for validation.
- **Dynamic resources**: use `Cache-Control: no-cache` or `no-store` to avoid caching sensitive data.

### How skeleton screens work

Use simple shapes as placeholders for actual content. When data isn't loaded or rendering isn't complete, placeholders fill the layout, giving the user a sense that content is coming.

As content loads, the skeleton is progressively replaced by real content — smoothing the transition and reducing the user's perceived wait and uncertainty.



### Properties an input component would need

Here are typical properties for an `input` component:

**Basic properties**:

- `type`: `text`, `password`, `number`, `email`, `checkbox`, etc.
- `value`: current value of the input.
- `placeholder`: placeholder hint text.

**Appearance**:

- `className`: custom style classes.
- `style`: inline styles.

**Events**:

- `onChange`: callback on value change.
- `onFocus`: callback on focus.
- `onBlur`: callback on blur.

**State**:

- `checked`: checked state
- `disabled`: disabled?
- `readonly`: read-only?

**Sizing**:

- `size`: relative size of the input.

**Other**:

- `name`: form submission key.
- `maxLength`: maximum character count.
- `min`, `max`: range limits for numeric inputs.
- `required`: required?

### What type is `value`? How is its type constrained in `onChange`?

`value` is typically a string. The actual type may differ based on the input type — for numeric inputs, `value` may be converted to a number.



Event handlers receive an `event` argument — use `event.target.value` to read the value.



### Difference between `href` and `src`?

`src` replaces the current element; `href` establishes a relationship between the current document and the referenced resource.

### Are `<script>` tags cross-origin?

By default, scripts loaded via `<script>` aren't restricted by the same-origin policy.

Notes:

- **CORS**: cross-origin scripts can load, but must follow the browser's CORS policy. Without proper CORS headers on the server, the browser may block script loading.
- **JSONP**: leverages `<script>`'s cross-origin loading to bypass the same-origin policy. But it only supports GET and has security risks — not recommended.

### Difference between `alt` and `title` on `<img>`

- **Purpose**: `alt` provides alternative text for the image; `title` provides additional info tooltip.
- **When displayed**: `alt` appears when the image fails to display; `title` appears on hover.
- **Accessibility**: `alt` is critical for accessibility, especially for screen readers. `title` provides extra context but isn't designed for accessibility.

### WebGL

Renders 2D and 3D graphics in compatible browsers using the GPU for hardware-accelerated rendering.

Main uses:

- **3D games and applications**
- **Data visualization**: interactive charts and graphics.
- **AR/VR**

Basic concepts:

- Uses `shaders` for two render stages: vertex shaders handle vertex data; fragment shaders handle pixel color.
- Uses `buffers` to store vertex data — positions, colors, texture coords.
- Uses `textures` to add images and detail to 3D objects.
- The `render pipeline` is the processing flow of graphics data.

### WebGPU

The next-generation Web graphics API — successor to WebGL. Provides more direct access to modern GPU capabilities, including parallel compute and rendering.

### `meta`, `link`, `style` — what resources can `link` load, what's `type` for, can `link` be cross-origin?

`<meta>` provides metadata about the HTML document — charset, description, keywords, author, etc.
`<link>` links to external resources; the tag itself doesn't directly involve cross-origin issues since it's for linking resources.
`<style>` defines inline page styles.



### manifest.json

A JSON file that describes Web app metadata and configures PWA (Progressive Web App) features. Often used for offline support, icons, theme colors, launch modes — improving installation UX.

**Basic uses**

1. **Web app installation**: lets users install the site to their device (desktop or home screen) and run it like a native app.
2. **Customize appearance**: set icons, splash screens, background colors — consistent experience across devices.
3. **Control display mode**: set how the app launches — fullscreen, browser mode, etc.

**Common fields**

- `name`: full app name.
- `short_name`: short name for display on device screens.
- `start_url`: page to launch when the app starts.
- `display`: display mode — `fullscreen`, `standalone`, `minimal-ui`, `browser`.
- `background_color`: background color, typically shown on the splash screen.
- `theme_color`: browser UI color (e.g. address bar).
- `icons`: app icon files, typically in multiple sizes for different devices.
