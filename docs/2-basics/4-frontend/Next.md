### 为什么需要？

**React 构建一个完整的 Web 应用程序**

- 必须使用打包程序（例如 webpack）打包代码，并使用 Babel 等编译器进行代码转换。
- 你需要针对生产环境进行优化，例如代码拆分。
- 你可能需要对一些页面进行预先渲染以提高页面性能和 SEO。你可能还希望使用服务器端渲染或客户端渲染。
- 你可能必须编写一些服务器端代码才能将 React 应用程序连接到数据存储。



**好处**

- 直观的、 [基于页面](https://www.nextjs.cn/docs/basic-features/pages) 的路由系统（并支持 [动态路由](https://www.nextjs.cn/docs/routing/dynamic-routes)）
- [预渲染](https://www.nextjs.cn/docs/basic-features/pages#pre-rendering)。支持在页面级的 [静态生成](https://www.nextjs.cn/docs/basic-features/pages#static-generation-recommended) (SSG) 和 [服务器端渲染](https://www.nextjs.cn/docs/basic-features/pages#server-side-rendering) (SSR)
- 自动代码拆分，提升页面加载速度
- 具有经过优化的预取功能的 [客户端路由](https://www.nextjs.cn/docs/routing/introduction#linking-between-pages)
- [内置 CSS](https://www.nextjs.cn/docs/basic-features/built-in-css-support) 和 [Sass 的支持](https://www.nextjs.cn/docs/basic-features/built-in-css-support#sass-support)，并支持任何 [CSS-in-JS](https://www.nextjs.cn/docs/basic-features/built-in-css-support#css-in-js) 库
- 开发环境支持 [快速刷新](https://www.nextjs.cn/docs/basic-features/fast-refresh)
- 利用 Serverless Functions 及 [API 路由](https://www.nextjs.cn/docs/api-routes/introduction) 构建 API 功能
- 完全可扩展

### Next.js 开发应用时,需要注意以下几个方面:

1. **页面渲染模式的选择**
   - Next.js 提供了服务端渲染、静态站点生成、客户端渲染 等多种页面渲染模式
2. **静态资源优化**
   - Next.js 支持自动代码分割和资源预加载等优化手段
   - 需要合理配置 `next/image` 组件和 `next/link` 组件,优化图片和链接的加载性能
3. **API Routes 设计**
   - Next.js 支持在应用中直接定义 API 路由
   - API Routes 的设计需要考虑安全性、性能、可维护性等因素
4. **数据获取与预取**
   - 合理使用 `getStaticProps`（构建时预取数据）、`getServerSideProps`（服务端动态获取数据）、`getInitialProps（用于在服务端或客户端获取数据）` 等数据获取方法
   - 充分利用预取的能力,提升页面加载速度
5. **TypeScript 的应用**
6. **性能监控与优化**
   - 可以使用 Lighthouse、PageSpeed Insights 等工具定期检测应用的性能
   - 根据性能报告进行针对性的优化,如代码分割、图片优化、缓存策略调整等
7. **SEO 优化**
   - SSR 和 SSG 特性天然支持 SEO
8. **错误处理与日志**
   - 在开发和生产环境中,都需要合理的错误处理和日志记录机制
   - 可以使用 `_error.js` 页面和 `getInitialProps` 等方法进行全局错误处理
9. **部署与运维**
   - Next.js 应用可以部署在各种平台,如 Vercel、Netlify、AWS、GCP 等
   - 需要根据部署环境合理配置环境变量、缓存策略、日志收集等

### Next.js选择模式

- 对于内容相对静态、SEO 需求强的页面,优先使用 `getStaticProps`。
- 对于内容经常更新、交互复杂的页面,优先使用 `getServerSideProps`。
- 对于完全由客户端驱动的页面,可以选择 CSR 模式。
- 对于混合场景,可以在同一应用中灵活使用多种渲染模式。

### Next.js的pages和app路由有什么区别？

1. `app` 目录替代了 `pages` 目录,用于管理应用路由。
2. `layout.js` 定义了应用的整体布局。
3. `posts` 和 `about` 目录下的 `page.js` 文件对应原来的页面组件。
4. `posts/[slug]` 目录下的 `page.js` 对应单篇文章页面。
5. `head.js` 用于定义应用的 HTML Head 部分

### React 和next区别

1. **渲染方式**:
   - React 是一个前端库,主要在客户端渲染(CSR)。
   - Next.js 是一个基于 React 的框架,可以支持服务端渲染(SSR)、静态站点生成(SSG)和客户端渲染(CSR)。
2. **路由**:
   - React 需要使用第三方路由库(如 React Router)来管理路由。
   - Next.js 内置了文件系统路由,开发者只需要在 `pages` 目录下创建对应的文件即可自动生成路由。
3. **SEO**:
   - 对于 React 应用,由于默认使用客户端渲染,爬虫可能无法正确获取页面内容,不利于 SEO。
   - Next.js 支持服务端渲染和静态站点生成,能够更好地满足 SEO 需求。
4. **开发体验**:
   - React 自行配置打包、开发服务器等工具。
   - Next.js 提供了开箱即用的配置
5. **数据获取**:
   - React 应用通常在客户端获取数据。
   - Next.js 支持在服务端、静态生成时以及客户端获取数据。
6. **部署**:
   - React 应用通常部署为单页应用(SPA)。
   - Next.js 应用可以部署为服务端渲染应用,也可以部署为静态站点。

### SSR SSG. CSG

综合上述因素,可以制定以下策略:

- 对于内容相对静态、SEO 需求强的页面,应该优先选择 SSG。
- 对于内容经常更新、交互复杂、首屏加载的页面,应该优先选择 SSR。
- 对于完全由客户端生成的页面,可以选择 CSR。
- 对于混合场景,可以采用 SSR 和 SSG 并存的方式,根据页面特点选择合适的渲染模式。

### 服务端渲染组件的原理

**用户请求页面**

- 用户访问 `https://example.com/page`
- Next.js 服务器接收到请求

**服务器处理请求**

- 解析 URL、路由匹配
- 调用 `getServerSideProps` 获取数据（如果使用的话）
- 服务器端执行 React 组件逻辑（Server Components）
- 生成 HTML

**服务器返回 HTML**

- HTML 被返回给客户端
- 客户端 hydration（混合渲染），React 在浏览器端接管交互

### **服务器渲染 vs. 客户端渲染**

|              | **服务端渲染（SSR）**           | **客户端渲染（CSR）**       |
| ------------ | ------------------------------- | --------------------------- |
| **数据请求** | 服务器执行 `getServerSideProps` | 浏览器执行 `fetch`          |
| **首次加载** | 服务器生成 HTML，浏览器直接渲染 | 仅返回 JS，浏览器再请求数据 |
| **SEO**      | 好，HTML 可读                   | 差，HTML 初始无内容         |
| **交互性**   | 需要 Hydration 处理交互         | 交互更自然                  |

### Server Components 在 SSR 的作用

它们直接在服务端运行，不会被打包进客户端 JavaScript，带来：

- **更轻量的客户端代码**
- **服务端直接读取数据库**（无需 API）
- **无需暴露敏感环境变量**

```js

// app/page.tsx (Server Component)
async function getData() {
  const res = await fetch("https://api.example.com/data");
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <div>{data.title}</div>; // 服务器直接返回 HTML
}
```

### **Server Components 运行原理**

- 服务器端执行 `Page` 组件
- 解析 `fetch` 请求，并在 **服务器端获取数据**
- 生成 HTML 并返回给客户端
- 仅最少的 **必要 JS** 传输到前端

### nextjs的优化手段

**1. 静态生成（SSG）和增量静态生成（ISR）**

- **静态生成（SSG）**：使用 `getStaticProps` 将页面内容在构建时生成静态 HTML，适用于内容不常变动的页面，极大提高加载速度和 SEO 性能。

  ```tsx
  export async function getStaticProps() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();
  
    return {
      props: { data },  // 将数据传递给组件
      revalidate: 10,    // 页面会在 10 秒后重新生成
    };
  }
  ```

- **增量静态生成（ISR）**：允许部分页面在访问时“增量”生成，这种方式适用于有些页面需要偶尔更新但又不希望每次访问时都重新构建的场景。

   - 设置 `revalidate` 参数来控制重新生成的频率。

**2. 服务器端渲染（SSR）与客户端渲染优化**

- **服务器端渲染（SSR）**：使用 `getServerSideProps` 可以将页面渲染放在服务器上，确保页面每次请求时都有最新的内容。

- **客户端渲染（CSR）**：对于不需要 SEO 或实时更新的页面，可以通过客户端渲染提升性能。

  使用 **动态导入** 来只在需要时加载某些组件，可以减小初始加载的 JS 体积。

**3. 代码分割（Code Splitting）**

Next.js 默认实现了自动代码分割，即每个页面的 JavaScript 代码会被拆分成独立的包，按需加载。这有助于减小初始加载体积。

- **自动代码分割**：每个页面的 JavaScript 文件单独分割，只有访问该页面时才加载相关的 JS。
- **按需加载组件**：对于大型组件或第三方库，使用动态导入（`dynamic`）来减少初始加载时需要的 JS 量。

**4. 图像优化**

Next.js 提供了 **Image Optimization** 组件，可以自动优化图像大小，按设备和网络条件加载不同分辨率的图像。

```tsx
import Image from 'next/image';

export default function Page() {
  return (
    <div>
      <Image 
        src="/path/to/image.jpg"
        alt="An image"
        width={500}
        height={300}
        priority  // 优先加载
      />
    </div>
  );
}
```

- **自动优化**：Next.js 会自动压缩和裁剪图像，并根据访问设备的不同加载合适的图像尺寸。
- **`next/image` 组件**：自动处理图片的懒加载、响应式尺寸、格式优化等。

**5. 静态资源优化**

- **优化静态资源**：通过 CDN 和压缩静态资源（CSS、JS、图片等），可以显著提升性能。Next.js 默认使用 Webpack 构建优化资源，但你也可以进行进一步的自定义。
- **使用现代文件格式**：如 `.webp` 格式代替 `.jpg` 或 `.png`，提高图像质量并减小文件大小。

**6. 静态资源缓存**

- **缓存控制**：通过配置缓存策略（例如 Cache-Control header）来缓存静态资源。
- **Vercel（默认部署平台）** 提供了强大的缓存功能，可以利用 CDN 和缓存机制加速页面的访问。

**7. 使用 `next/head` 进行 SEO 优化**

确保页面有合适的 `meta` 标签，优化搜索引擎和社交媒体预览：

```tsx
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Page Title</title>
        <meta name="description" content="Page description" />
        <meta property="og:image" content="https://example.com/image.jpg" />
      </Head>
      <div>Page Content</div>
    </>
  );
}
```

**8. 使用 `prefetch` 和 `preload`**

- **预取**：Next.js 会自动预取用户可能访问的页面，利用浏览器空闲时间提前加载页面资源。
- **预加载**：通过 `<link rel="preload">` 和 `<link rel="prefetch">` 标签，可以帮助浏览器提前加载重要资源。

**9. 避免大块的客户端 JavaScript**

- 将 **大型 JavaScript 库**（例如 D3.js、Charts.js 等）用动态导入来按需加载。
- 使用 **Web Workers** 来进行复杂的计算，避免阻塞主线程。

**10. 使用 Vercel 优化部署**

如果你使用 **Vercel** 部署你的 Next.js 应用，Vercel 提供了很多自动化优化手段：

- 自动 CDN 缓存和静态页面生成
- 按需静态生成（ISR）
- 自适应图像优化

**11. 集成 PWA (渐进式 Web 应用)**

Next.js 支持通过插件（如 `next-pwa`）将应用转换为 PWA，从而提升离线功能、应用加载速度等。

```bash
npm install next-pwa
```

在 `next.config.js` 配置中启用：

```js
module.exports = {
  pwa: {
    dest: 'public',
  },
};
```