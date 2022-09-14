import { useState } from "react";
import styles from "../styles/OrderDetails.module.css";

export default function OrderDetails({ total, createOrder }) {
  const [customer, setCustomer] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const clickHandler = () => {
    createOrder({
      customer,
      address,
      total,
      method: 0,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay £ {total} after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Full Name</label>
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="John Doe "
            type="text"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 234 567 89"
            type="phone"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Elton St. 505 NY"
            type="text"
            className={styles.input}
          />
        </div>
        <button className={styles.button} onClick={clickHandler}>
          Order
        </button>
      </div>
    </div>
  );
}
