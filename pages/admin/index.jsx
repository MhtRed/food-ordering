import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
import dbConnect from "../../utils/mongo";
import Product from "../../models/Product";
import Order from "../../models/Order";

export default function Admin({ products, orders }) {
  const [pizzaList, setPizzaList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const status = ["preparing", "On the way", "Delivered"];
  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `/api/products/${id}`
      );
      setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  const statusHandler = async (id) => {
    const order = orderList.filter((item) => item._id === id)[0];
    const currentStatus = order.status;
    try {
      const res = await axios.put(`/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList([
        ...orderList.filter((order) => order._id !== id),
        res.data,
      ]);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            {pizzaList.map((pizza) => (
              <tr key={pizza._id} className={styles.tr}>
                <td>
                  <Image
                    src={pizza.img}
                    alt=""
                    width={50}
                    height={50}
                    objectFit="cover"
                  ></Image>
                </td>
                <td>{pizza._id.slice(0, 5)}...</td>
                <td>{pizza.title}</td>
                <td>£ {pizza.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => deleteHandler(pizza._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            {orderList.map((order) => (
              <tr key={order._id} className={styles.tr}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>£ {order.total}</td>
                <td>{order.method === 1 ? "PAID" : "CASH ON DELIVERY"}</td>
                <td>{status[order.status]}</td>
                <td>
                  <button
                    className={styles.next}
                    onClick={() => {
                      statusHandler(order._id);
                    }}
                  >
                    Next step
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  if (myCookie.token !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  await dbConnect();
  const productsResponse = await Product.find();
  const ordersResponse = await Order.find();
  const products = JSON.parse(JSON.stringify(productsResponse));
  const orders = JSON.parse(JSON.stringify(ordersResponse));
  return {
    props: {
      products,
      orders,
    },
  };
};
