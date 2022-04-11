import Link from 'next/link'
import styles from './layout.module.css'

export default function Footer({home}) {
    console.log(home); 
    return (
        <> 
            {!home && (
                <div className={styles.backToHome}>
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
                </div>
            )}
        </>
    );
}