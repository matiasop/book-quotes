import getBookList from "../../utils/getBooksList"
import BookListType from '../../utils/BookListType'
import Link from 'next/link'
import { GetStaticProps } from "next"
import data from '../../data/quotes_complete_indexed.json'

export const getStaticProps: GetStaticProps = async (context) => {
  const booksList: BookListType[] = getBookList(data); 

  return {
    props: { booksList }
  }
}

const Book = ({ booksList }: { booksList: BookListType[] }) => {
  return (
    <div>
      <h1>All Books</h1>
      {booksList.map((book: BookListType) => (
        <div key={book.id.toString()}>
          <Link href={`/books/${book.id.toString()}`}>
            <a>
              <h1>{book.title}</h1>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Book;