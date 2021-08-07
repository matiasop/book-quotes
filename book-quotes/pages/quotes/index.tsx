import Link from 'next/link'
import { GetStaticProps } from "next";
import data from '../../data/quotes_complete_indexed.json'
import QuoteType from '../../utils/QuoteType'
import getQuotesList from '../../utils/getQuotesList'
import Image from 'next/image'
import styles from '../../styles/Quotes.module.css'

export const getStaticProps: GetStaticProps = async (context) => {
  const quotesList: QuoteType[] = getQuotesList(data);
  
  return {
    props: { quotesList }
  }
}

const Quotes = ({ quotesList }: { quotesList: QuoteType[] }) => {
  return (
    <div className={styles.cardContainer}>
      {quotesList.map((q: QuoteType) => (
        <div key={q.quote_id.toString()} className={styles.card}>
          <Link href={`/quotes/${q.quote_id.toString()}`}>
            <a className={styles.flex}>
              <div className={styles.imageDiv}>
                <Image className={styles.image} src={String(q.thumbnail) || '/book.jpg'} alt="book" width={150} height={200} />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title}>{q.book_title}</h3>
                <p className={styles.author}>{q.author}</p>
                <p className={styles.date}>{q.date}</p>
                <p className={styles.quote}>{`"${q.quote}"`}</p>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Quotes;