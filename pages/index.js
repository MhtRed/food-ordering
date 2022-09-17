import Head from "next/head";
import Featured from "../components/Featured";
import PizzaList from "../components/PizzaList";
import styles from "../styles/Home.module.css";
import axios from "axios";
import AddButton from "../components/AddButton";
import { useState } from "react";
import Add from "../components/Add";
import Product from "../models/Product";
import dbConnect from "../utils/mongo";

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

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
    admin = true;
  }
  // const response = await axios.get("/api/products/index.js");
  await dbConnect();
  const res = await Product.find();
  const pizzas = JSON.parse(JSON.stringify(res));
  console.log({ pizzas });
  return {
    props: {
      pizzas: pizzas,
      admin,
    },
  };
};
