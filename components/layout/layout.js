import CustomHead from '../customhead/customhead'
import Header from '../header/header'
import Footer from '../footer/footer'
import styles from './layout.module.css'

export default function Layout({ home, children }) {
  return (
    <div className={styles.container}>
      <head>{<CustomHead />}</head>
      <header className={styles.header}>
        {home ? <Header /> : <Header props={"Going home"}/>}
      </header>
      <main>{children}</main>
      <footer>{<Footer props={home}/>}</footer>
    </div>
  )
}
