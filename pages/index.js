import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home({ pizzas }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best pizza store in town" />
        <meta name="keywords" content="Pizza restaurant food delivery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <PizzaList pizzas={pizzas} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzas: response.data,
    },
  };
};
