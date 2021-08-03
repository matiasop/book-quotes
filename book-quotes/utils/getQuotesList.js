// import QuoteType from "./QuoteType";

// const getQuotesList = (data: Object): QuoteType[] => {
//   const titles: String[] = Object.keys(data);
//   let quotes: QuoteType[] = [];
//   titles.forEach((title: String) => {
//     quotes = [...quotes, ...data[title]]
//   });
//   return quotes;
// }

const getQuotesList = (data) => {
  const titles = Object.keys(data);
  let quotes = [];
  titles.forEach((title) => {
    quotes = [...quotes, ...data[title]]
  });
  return quotes;
}
export default getQuotesList;