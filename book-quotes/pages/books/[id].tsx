import { GetStaticPaths, GetStaticProps } from "next";
import data from '../../data/quotes_complete_indexed.json'
import getBookList from "../../utils/getBooksList"
import BookListType from '../../utils/BookListType'
import getQuotesList from '../../utils/getQuotesList'
import QuoteType from '../../utils/QuoteType'
import styles from '../../styles/Quotes.module.css'
import Link from 'next/link'
import Image from 'next/image'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getBookList(data).map((book: BookListType) => {
    return {
      params: { id: book.id.toString() }
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
  const quoteList: QuoteType[] = getQuotesList(data).filter((q: QuoteType) => q.book_id.toString() == id);

  return {
    props: { quoteList }
  }
}

const Book = ({ quoteList }: { quoteList: QuoteType[] }) => {
  return (
    <div className={styles.cardContainer}>
      {quoteList.map((q: QuoteType) => (
        <div key={q.quote_id.toString()} className={styles.card} >
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

export default Book;