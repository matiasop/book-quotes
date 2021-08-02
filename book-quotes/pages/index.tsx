import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>hola mundo</h1>
      <Link href="/quotes">
        <a>All Quotes</a>
      </Link>
      <Link href="/books">
        <a>All Books</a>
      </Link>
    </div>
  )
}
