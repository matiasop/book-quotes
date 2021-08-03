import getBookList from "../../utils/getBooksList"
import BookListType from '../../utils/BookListType'
import Link from 'next/link'
import { GetStaticProps } from "next"
import data from '../../data/quotes_complete_indexed.json'
import styles from '../../styles/Books.module.css'

export const getStaticProps: GetStaticProps = async (context) => {
  const booksList: BookListType[] = getBookList(data); 

  return {
    props: { booksList }
  }
}

const Book = ({ booksList }: { booksList: BookListType[] }) => {
  return (
    <div className={styles.booklist} >
      <h1>All Books</h1>
      <div className={styles.titles}>
        {booksList.map((book: BookListType) => (
          <div className={styles.title} key={book.id.toString()}>
            <Link href={`/books/${book.id.toString()}`}>
              <a className={styles.link}>
                <p>{book.title}</p>
              </a>
            </Link>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Book;