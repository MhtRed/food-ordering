import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import axios from "axios";
import AddButton from "../components/AddButton";
import { useState } from "react";
import Add from "../components/Add";

export default function Home({ pizzas, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant</title>
        <meta name="description" content="Best pizza store in town" />
        <meta name="keywords" content="Pizza restaurant food delivery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzas={pizzas} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getStaticProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    admin = true;
  }
  const response = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzas: response.data,
      admin,
    },
  };
};
