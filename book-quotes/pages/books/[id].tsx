import { GetStaticPaths, GetStaticProps } from "next";
import data from '../../data/quotes_complete_indexed.json'
import getBookList from "../../utils/getBooksList"
import BookListType from '../../utils/BookListType'
import getQuotesList from '../../utils/getQuotesList'
import QuoteType from '../../utils/QuoteType'
import Link from 'next/link'

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
    <div>
      <p>Quote Details</p>
      {quoteList.map((q: QuoteType) => (
        <div key={q.quote_id.toString()}>
          <Link href={`/quotes/${q.quote_id.toString()}`}>
            <a>
              <h3>{q.book_title}</h3>
              <p>{q.quote}</p>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Book;