import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/"><a><h1 className={styles.title}>Book Quotes</h1></a></Link>
        <div className={styles.link}>
          <Link href="/quotes"><a className={styles.button} >All Quotes</a></Link>
          <Link href="/books"><a className={styles.button} >Books</a></Link>
        </div>
    </nav>
  )
}

export default Navbar;