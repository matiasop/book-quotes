import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
        <Link href="/quotes">
          <a className={styles.link}>
            <div className={styles.card}>
              <p className={styles.text}>View all Quotes</p>
            </div>
          </a>
        </Link>
        <Link href="/books">
          <a className={styles.link}>
            <div className={styles.card}>
              <p className={styles.text}>View all Books</p>
            </div>
          </a>
        </Link>
    </div>
  )
}
