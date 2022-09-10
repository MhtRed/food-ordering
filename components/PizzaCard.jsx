import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
export default function PizzaCard() {
  return (
    <div className={styles.container}>
      <Image src="/imgs/pizza.png" alt="pizza" width="500" height="500"></Image>
      <h1 className={styles.title}>FIORRI DI ZOCCA</h1>
      <span className={styles.price}>£ 19.90</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
      </p>
    </div>
  );
}
