import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";

export default function Navbar() {
  const qty = useSelector((state) => state.cart.qty);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image
            src="/imgs/telephone.png"
            alt=""
            width="32"
            height="32"
          ></Image>
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW</div>
          <div className={styles.text}>065 667 789</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
            <li className={styles.listItem}>Home</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.logo}>
            <Image src="/imgs/logo.png" alt="" layout="fill"></Image>
          </li>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart" passHref>
          <div className={styles.cart}>
            <Image src="/imgs/cart.png" alt="" width="30" height="30" />
            <div className={styles.counter}>{qty}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
