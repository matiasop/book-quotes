import { GetStaticPaths, GetStaticProps } from "next";
import data from '../../data/quotes_complete.json'

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  const paths = data.map((i: any)  => {
    return {
      params: { id: i.id.toString() }
    }
  });

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id;
  const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
  const data = await res.json();

  return {
    props: { item: data }
  }
}

const Quote = ({ item }: any) => {
  console.log(data);
  return (
    <div>
      <p>Quote Details</p>
      <h1>{item.name}</h1>
    </div>
  )
}

export default Quote;