import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

export default function PizzaCard({ pizza }) {
  return (
    <Link href={`product/${pizza._id}`}>
      <div className={styles.container}>
        <Image
          className={styles.image}
          src={pizza.img}
          alt="pizza"
          width="500"
          height="500"
          objectFit="cover"
        ></Image>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>$ {pizza.prices[0]}</span>
        <p className={styles.desc}>{pizza.desc}</p>
      </div>
    </Link>
  );
}
