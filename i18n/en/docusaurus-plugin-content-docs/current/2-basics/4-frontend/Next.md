### Why do you need Next?

**Building a full React web application requires:**

- A bundler like webpack and transpilers like Babel.
- Production optimizations like code splitting.
- Pre-rendering some pages for performance and SEO. You may also want server-side rendering or client-side rendering.
- Writing server-side code to connect your React app to a data store.



**Benefits**

- An intuitive [page-based](https://www.nextjs.cn/docs/basic-features/pages) routing system (with [dynamic routes](https://www.nextjs.cn/docs/routing/dynamic-routes))
- [Pre-rendering](https://www.nextjs.cn/docs/basic-features/pages#pre-rendering): both [Static Site Generation](https://www.nextjs.cn/docs/basic-features/pages#static-generation-recommended) (SSG) and [Server-Side Rendering](https://www.nextjs.cn/docs/basic-features/pages#server-side-rendering) (SSR) per page
- Automatic code splitting for faster page loads
- [Client-side routing](https://www.nextjs.cn/docs/routing/introduction#linking-between-pages) with optimized prefetching
- [Built-in CSS](https://www.nextjs.cn/docs/basic-features/built-in-css-support) and [Sass support](https://www.nextjs.cn/docs/basic-features/built-in-css-support#sass-support), plus any [CSS-in-JS](https://www.nextjs.cn/docs/basic-features/built-in-css-support#css-in-js) library
- [Fast Refresh](https://www.nextjs.cn/docs/basic-features/fast-refresh) in development
- Build APIs with Serverless Functions / [API Routes](https://www.nextjs.cn/docs/api-routes/introduction)
- Fully extensible

### Things to watch when developing with Next.js:

1. **Choice of rendering mode**
   - Next.js offers SSR, SSG, and CSR
2. **Static-asset optimization**
   - Next supports automatic code splitting and asset preloading
   - Configure `next/image` and `next/link` to optimize images and link loading
3. **API Routes design**
   - Next.js lets you define APIs directly within the app
   - Consider security, performance, and maintainability when designing them
4. **Data fetching and prefetching**
   - Use `getStaticProps` (build-time data), `getServerSideProps` (server-side data per request), `getInitialProps` (server or client) appropriately
   - Take advantage of prefetching to speed up navigation
5. **TypeScript usage**
6. **Performance monitoring and optimization**
   - Use Lighthouse, PageSpeed Insights to regularly check app performance
   - Optimize based on reports — code splitting, image optimization, cache tuning
7. **SEO**
   - SSR and SSG naturally support SEO
8. **Error handling and logging**
   - Need proper error handling and logging in dev and production
   - Use `_error.js` and `getInitialProps` for global error handling
9. **Deployment and ops**
   - Next.js apps can be deployed on Vercel, Netlify, AWS, GCP, etc.
   - Configure env vars, caching strategy, log collection appropriately

### Choosing Next.js modes

- For mostly static, SEO-critical pages, prefer `getStaticProps`.
- For frequently updated, interactive pages, prefer `getServerSideProps`.
- For purely client-driven pages, use CSR.
- For hybrid scenarios, mix rendering modes in the same app.

### Differences between Next.js `pages` and `app` routers?

1. The `app` directory replaces `pages` for managing routes.
2. `layout.js` defines the overall layout.
3. `page.js` files inside `posts/`, `about/` correspond to the original page components.
4. `posts/[slug]/page.js` corresponds to a single post page.
5. `head.js` defines the HTML `<head>` portion.

### React vs Next.js

1. **Rendering**:
   - React is a frontend library that primarily does CSR.
   - Next.js is a React-based framework that supports SSR, SSG, and CSR.
2. **Routing**:
   - React relies on third-party routing libraries like React Router.
   - Next.js has built-in file-based routing — create files under `pages` and routes are auto-generated.
3. **SEO**:
   - React apps default to CSR; crawlers may not see the rendered page well — bad for SEO.
   - Next.js supports SSR and SSG, which is better for SEO.
4. **Developer experience**:
   - React requires you to set up bundling, dev server, etc.
   - Next.js comes with batteries included.
5. **Data fetching**:
   - React apps typically fetch on the client.
   - Next.js supports server-side, build-time (SSG), and client-side fetching.
6. **Deployment**:
   - React is usually deployed as a SPA.
   - Next.js can be deployed as SSR or as a static site.

### SSR vs SSG vs CSR

Strategy:

- For mostly static, SEO-critical pages, prefer SSG.
- For frequently updated, interactive, fast-first-paint pages, prefer SSR.
- For purely client-driven pages, choose CSR.
- For hybrid scenarios, mix SSR + SSG per page.

### How Server Components render

**User requests a page**

- User visits `https://example.com/page`
- Next.js server receives the request

**Server processes the request**

- Parse URL, match routes
- Call `getServerSideProps` (if used) to fetch data
- Server runs the React component logic (Server Components)
- Generate HTML

**Server returns HTML**

- HTML is returned to the client
- Client hydration takes over and React handles interactivity in the browser

### Server rendering vs client rendering

|              | **SSR**                                  | **CSR**                                    |
| ------------ | ---------------------------------------- | ------------------------------------------ |
| **Data**     | Server runs `getServerSideProps`         | Browser runs `fetch`                       |
| **First load** | Server generates HTML; browser renders | Returns JS; browser fetches data on load   |
| **SEO**      | Good — HTML is readable                  | Poor — initial HTML has no content         |
| **Interactivity** | Requires hydration for interactivity | Natural interaction                        |

### Role of Server Components in SSR

Server Components run only on the server and aren't bundled to the client, bringing:

- **Smaller client code**
- **Direct server-side DB access** (no API needed)
- **No need to expose sensitive env vars to the client**

```js

// app/page.tsx (Server Component)
async function getData() {
  const res = await fetch("https://api.example.com/data");
  return res.json();
}

export default async function Page() {
  const data = await getData();

  return <div>{data.title}</div>; // Server returns HTML directly
}
```

### How Server Components actually run

- Server runs the `Page` component
- Resolves `fetch` requests and **fetches data on the server**
- Generates HTML and sends to the client
- Only minimal **necessary JS** is sent to the frontend

### Next.js optimization techniques

**1. SSG and ISR**

- **SSG**: use `getStaticProps` to generate static HTML at build time. Best for pages whose content rarely changes — fast loads and great SEO.

  ```tsx
  export async function getStaticProps() {
    const res = await fetch('https://api.example.com/data');
    const data = await res.json();

    return {
      props: { data },  // pass data to the component
      revalidate: 10,    // regenerate after 10 seconds
    };
  }
  ```

- **ISR (Incremental Static Regeneration)**: regenerate some pages on access, ideal for pages that need occasional updates without rebuilding the whole site.

   - Use `revalidate` to control regeneration frequency.

**2. SSR and CSR optimization**

- **SSR**: `getServerSideProps` renders on the server per request — always fresh content.

- **CSR**: for pages that don't need SEO or real-time updates, CSR can improve performance.

  Use **dynamic imports** to load components on-demand, shrinking initial JS.

**3. Code splitting**

Next.js does automatic code splitting — each page's JS is its own bundle, loaded on demand. Reduces initial payload.

- **Automatic code splitting**: each page's JS file is separate; only loaded on visit.
- **Lazy-load components**: for large components or third-party libs, use `dynamic` import to shrink initial JS.

**4. Image optimization**

Next.js provides the **Image Optimization** component — auto-optimizes images, picks resolutions per device/network.

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
        priority  // prioritize loading
      />
    </div>
  );
}
```

- **Auto-optimization**: Next.js auto-compresses and crops images, serving sizes appropriate for the device.
- **`next/image` component**: handles lazy loading, responsive sizes, format optimization automatically.

**5. Static-asset optimization**

- **Static-asset optimization**: CDN and asset compression (CSS, JS, images) for big perf wins. Next.js uses Webpack to optimize by default, but you can customize further.
- **Modern formats**: prefer `.webp` over `.jpg`/`.png` for better quality at smaller sizes.

**6. Static asset caching**

- **Cache control**: configure cache policy (e.g. `Cache-Control` headers) for static assets.
- **Vercel** (default deploy target) provides powerful caching — leverage CDN and caching to accelerate page access.

**7. Use `next/head` for SEO**

Make sure pages have appropriate `meta` tags for search engines and social previews:

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

**8. `prefetch` and `preload`**

- **Prefetch**: Next.js automatically prefetches pages the user is likely to visit, using browser idle time.
- **Preload**: use `<link rel="preload">` and `<link rel="prefetch">` to help the browser load critical assets early.

**9. Avoid large client-side JS**

- Lazy-load **large JS libraries** like D3.js, Charts.js via dynamic imports.
- Use **Web Workers** for heavy computation to avoid blocking the main thread.

**10. Use Vercel for deployment**

If you deploy on **Vercel**, you get many automatic optimizations:

- Automatic CDN caching and static page generation
- ISR
- Adaptive image optimization

**11. PWA integration**

Next.js supports converting your app to a PWA via plugins like `next-pwa` — improving offline support, load speed, etc.

```bash
npm install next-pwa
```

Enable it in `next.config.js`:

```js
module.exports = {
  pwa: {
    dest: 'public',
  },
};
```
