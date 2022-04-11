import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../../styles/utils.module.css'

const name = 'lefv'
export default function Header({props}) {
    console.log(props); 
    return (
        <header className={styles.header}>
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
      </header>
    );
}