#reference
https://www.sitepoint.com/create-new-express-js-apps-with-express-generator/

#reference
https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/

#added origin remote
git remote add origin https://github.com/gwicho38/lefv_io.git
git branch -M main
git push -u origin main

#adding https
https://timonweb.com/javascript/running-expressjs-server-over-https/

# NexJS Refactor docs

https://nextjs.org/docs/getting-started

# NextJS - GetServerSideProps example

https://nextjs.org/learn/basics/data-fetching/request-time

# NextJS - Assets

Next.js can serve static assets, like images, under the top-level public directory. Files inside public can be referenced from the root of the application similar to pages.

The public directory is also useful for robots.txt, Google Site Verification, and any other static assets. Check out the documentation for Static File Serving to learn more.

# NextJS Metadata

```
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>

```

# Customizing the Document

(Docs here)[https://nextjs.org/docs/advanced-features/custom-document]

# Third Party JS

Third-party JavaScript refers to any scripts that are added from a third-party source. Usually, third-party scripts are included in order to introduce newer functionality into a site that does not need to be written from scratch, such as analytics, ads, and customer support widgets.

## Per Component

```

export default function FirstPost() {
  return (
    <>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}

```

# CSS Styling

## Adding Global Styles

1. To load global CSS files, create a file called pages/\_app.js with the following content:

```
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

**_This App component is the top-level component which will be common across all the different pages. You can use this App component to keep state when navigating between pages, for example._**

2. In Next.js, you can add global CSS files by importing them from pages/\_app.js. You cannot import global CSS anywhere else.

The reason that global CSS can't be imported outside of pages/\_app.js is that global CSS affects all elements on the page.

## Example

Create a top-level styles directory and create global.css inside.

Add the following content to styles/global.css. It resets some styles and changes the color of the a tag:

```
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
    Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  line-height: 1.6;
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

a {
  color: #0070f3;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

img {
  max-width: 100%;
  display: block;
}
```

Finally, open pages/\_app.js add import the CSS file like so:

```
import '../styles/global.css'

export default function App({ Component, pageProps }) {
return <Component {...pageProps} />
}
```

## Adding CSS To Component

Now, let’s add some styles to the Layout component. To do so, we’ll use CSS Modules, which lets you import CSS files in a React component.

Create a file called components/layout.module.css with the following content:

```
.container {
  max-width: 36rem;
  padding: 0 1rem;
  margin: 3rem auto 6rem;
}
```

_To use CSS Modules, the CSS file name must end with .module.css._

## Adding Tailwind

https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss

## Adding `classnames` library

# Pre-Rendering and Data Fetching

https://nextjs.org/learn/basics/data-fetching/pre-rendering

## Static vs Server Side Rendering (Can be done per page)

https://nextjs.org/learn/basics/data-fetching/two-forms

Static Generation is the pre-rendering method that generates the HTML at build time. The pre-rendered HTML is then reused on each request.

Server-side Rendering is the pre-rendering method that generates the HTML on each request.

## Decision Heuristic on Satic vs SSR

You should ask yourself: "Can I pre-render this page ahead of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is not a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use Server-side Rendering. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate frequently updated data.

### Addendum: Client Side Render - using POJS

For example, there is a Vercel-published React hook for data fetching

https://swr.vercel.app/

```
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}

```

# Static Page Generation Dynamic Routing

How to Statically Generate Pages with Dynamic Routes
In our case, we want to create dynamic routes for blog posts:

We want each post to have the path /posts/<id>, where <id> is the name of the markdown file under the top-level posts directory.
Since we have ssg-ssr.md and pre-rendering.md, we’d like the paths to be /posts/ssg-ssr and /posts/pre-rendering.
Overview of the Steps
We can do this by taking the following steps. You don’t have to make these changes yet — we’ll do it all on the next page.

First, we’ll create a page called [id].js under pages/posts. Pages that begin with [ and end with ] are dynamic routes in Next.js.

In pages/posts/[id].js, we’ll write code that will render a post page — just like other pages we’ve created.

We’ll export an async function called getStaticPaths from this page. In this function, we need to return a list of possible values for id.

https://nextjs.org/docs/routing/dynamic-routes

## Catch-all Routes

Dynamic routes can be extended to catch all paths by adding three dots (...) inside the brackets. For example:

pages/posts/[...id].js matches /posts/a, but also /posts/a/b, /posts/a/b/c and so on.
If you do this, in getStaticPaths, you must return an array as the value of the id key like so:

```
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
```

And params.id will be an array in getStaticProps:

```
export async function getStaticProps({ params }) {
  // params.id will be like ['a', 'b', 'c']
}
```

### Access NextJS router

https://nextjs.org/docs/api-reference/next/router#userouter

## Error Pages and 404s

To create a custom 404 page, create pages/404.js. This file is statically generated at build time.

```
// pages/404.js
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```

### Example Blog Sites

https://nextjs.org/learn/basics/dynamic-routes/dynamic-routes-details

# Create APIs with NextJS

https://nextjs.org/docs/api-routes/introduction

## API Routes

https://nextjs.org/docs/api-routes/introduction

## API Middlewares

https://nextjs.org/docs/api-routes/api-middlewares

## Response Helpers

https://nextjs.org/docs/api-routes/response-helpers

## Preview Mode

## Dynamic API Routes

https://nextjs.org/docs/api-routes/dynamic-api-routes

# Add Custom Domain

https://vercel.com/docs/concepts/projects/custom-domains

# Deployment

https://nextjs.org/learn/basics/deploying-nextjs-app/other-hosting-options

# Environment Variables

https://nextjs.org/docs/basic-features/environment-variables

# AMP

https://nextjs.org/docs/advanced-features/amp-support/introduction
