/**
 * 
 * App component is top-level component. Common accross all the
 * different pages. You can use this App component to keep state
 * when navigating between pages. 
 * 
 * https://nextjs.org/learn/basics/assets-metadata-css/global-styles
 *   
 */
import '../styles/global.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}