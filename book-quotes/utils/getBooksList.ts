import QuoteType from './QuoteType'
import BookListType from './BookListType'

const getBooksList = (data: Object): BookListType[] => {
  const titles: String[] = Object.keys(data);
  let bookList: BookListType[] = [];
  titles.forEach((title: String) => {
    let first_quote: QuoteType = data[title][0];
    bookList.push({'title': first_quote.book_title, 'id': first_quote.book_id})
  });

  return bookList;
}

export default getBooksList;