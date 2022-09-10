import styles from "../styles/PizzaList.module.css";
import PizzaCard from "../components/PizzaCard";

export default function PizzaList() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The best pizza in town</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit velit
        molestiae nisi illo, eligendi maxime qui nostrum labore perspiciatis
        officiis ad delectus deleniti distinctio voluptate dicta. Exercitationem
        voluptatum minus et.
      </p>
      <div className={styles.wrapper}>
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
        <PizzaCard />
      </div>
    </div>
  );
}
