import Layout from '../../components/layout'
import Head from 'next/head'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

//Also an example of templating a page and wiring content depending on the comnponent data

// for async calls to load static props in static page generation context
// runs at build time in production
// can fetch external data and send it as props to the page.
// In development mode, getStaticProps runs on each request instead.
export async function getStaticProps({ params }) {
    // Get external data from the file system, API, DB, etc.
    const postData = await getPostData(params.id); 
    // The value of the `props` key will be
    // passed to the `Home` component
    return {
        props: {
            postData
        }
    }
}
// async external call examples (e.g., APIs) using getStaticProps
// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from an external API endpoint
//   const res = await fetch('..')
//   return res.json()
// }

// Because getServerSideProps is called at request time, its parameter (context) contains request specific parameters.
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// }

// #IMPORTANT To use Server-side Rendering, you need to export getServerSideProps instead of getStaticProps from your page.

//for dynamic routes to work. dynamic route is the prop name [{name}]
//in between the square brackets
//runs on every request in dev and runs at build time in production
//falback documenttion: https://nextjs.org/docs/basic-features/data-fetching/overview#the-fallback-key-required
export async function getStaticPaths() {
    const paths = getAllPostIds(); 
    return {
        paths, 
        fallback: false
    }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}