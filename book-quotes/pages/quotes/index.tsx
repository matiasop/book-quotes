import Link from 'next/link'
import { GetStaticProps } from "next";
import data from '../../data/quotes_complete_indexed.json'
import QuoteType from '../../utils/QuoteType'
import getQuotesList from '../../utils/getQuotesList'

export const getStaticProps: GetStaticProps = async (context) => {
  const quotesList: QuoteType[] = getQuotesList(data);
  
  return {
    props: { quotesList }
  }
}

const Quotes = ({ quotesList }: { quotesList: QuoteType[] }) => {
  return (
    <div>
      <h1>All Quotes</h1>
      {quotesList.map((q: QuoteType) => (
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

export default Quotes;