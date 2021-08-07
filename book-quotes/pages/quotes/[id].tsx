import { GetStaticPaths, GetStaticProps } from "next";
import data from '../../data/quotes_complete_indexed.json'
import QuoteType from '../../utils/QuoteType'
import getQuotesList from '../../utils/getQuotesList'
import styles from '../../styles/Quote.module.css'
import Image from 'next/image'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getQuotesList(data).map((quote: QuoteType) => {
    return {
      params: {id: quote.quote_id.toString() }
    }
  });

  return {
    // [{}, {}, {params: { id: ...}}, ...]
    paths, 
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  return {
    props: { quote: getQuotesList(data).filter((q: QuoteType) => q.quote_id.toString() === id)[0]}
  }
}

const Quote = ({ quote }: { quote: QuoteType }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{quote.book_title}</h1>
      <p className={styles.author}>{quote.author}</p>
      <div className={styles.flex}>
        <Image className={styles.image} src={String(quote.thumbnail) || '/book.jpg'} alt="book" width={150} height={200} />
        <div className={styles.content}>
          <p className={styles.publishedDate}>Published Date: {quote.published_date}</p>
          <p className={styles.readingDate}>Reading Date: {quote.date} {quote.time}</p>
          <p className={styles.pos}>Position: {quote.initial_pos}-{quote.final_pos}</p>
        </div>
        <div className={styles.content}>
          <p className={styles.isbn}>ISBN: {quote.isbn_13 || quote.isbn_10}</p>
          <p className={styles.lang}>Language: {quote.language}</p>
          <p className={styles.pages}>Page Count: {quote.page_count.toString()}</p>
        </div>
      </div>
      <p className={styles.quote}>{`"${quote.quote}"`}</p>
    </div>
  )
}

export default Quote;