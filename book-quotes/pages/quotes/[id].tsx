import { GetStaticPaths, GetStaticProps } from "next";
import data from '../../data/quotes_complete_indexed.json'
import QuoteType from '../../utils/QuoteType'
import getQuotesList from '../../utils/getQuotesList'

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
    <div>
      <p>Quote Details</p>
      <h1>{quote.book_title}</h1>
      <p>{quote.quote}</p>
    </div>
  )
}

export default Quote;