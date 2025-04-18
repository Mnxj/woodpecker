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

1. **内容动态性**
   - 如果页面内容经常更新,需要实时渲染,应该选择 SSR。
   - 如果内容相对静态,变化不频繁,应该选择 SSG。
   - 如果内容完全由客户端动态生成,可以选择 CSR。
2. **用户体验**
   - SSR 可以提供更快的首次加载速度,提升用户体验。
   - SSG 可以提供更出色的页面加载性能,同时也支持增量式更新。
   - CSR 可以提供更流畅的交互体验,减少页面跳转。
3. **SEO 需求**
   - SSR 和 SSG 天然支持 SEO,可以更好地被搜索引擎抓取和索引。
   - CSR 由于初始 HTML 内容较少,SEO 支持较弱,需要额外处理。
4. **开发和部署复杂度**
   - SSR 需要处理服务器运行时的逻辑,复杂度相对较高。
   - SSG 只需要在构建时生成静态文件,部署和运行更简单。
   - CSR 可以完全在客户端运行,开发和部署更加简单。
5. **数据获取模式**
   - SSR 可以在服务端获取数据,减少网络请求。
   - SSG 可以在构建时预取数据,减少页面加载时间。
   - CSR 需要在客户端获取数据,会增加页面加载时间。

综合上述因素,可以制定以下策略:

- 对于内容相对静态、SEO 需求强的页面,应该优先选择 SSG。
- 对于内容经常更新、交互复杂的页面,应该优先选择 SSR。
- 对于完全由客户端生成的页面,可以选择 CSR。
- 对于混合场景,可以采用 SSR 和 SSG 并存的方式,根据页面特点选择合适的渲染模式。