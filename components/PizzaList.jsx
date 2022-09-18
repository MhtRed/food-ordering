import styles from "../styles/PizzaList.module.css";
import PizzaCard from "../components/PizzaCard";

export default function PizzaList({ pizzas }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The Best Pizza in Town</h1>
      <p className={styles.desc}>
        Pizza is an Italian food that was created in Italy (The Naples area). It
        is made with different toppings. Some of the most common toppings are
        cheese, sausages, pepperoni, vegetables, tomatoes, spices and herbs and
        basil. These toppings are added over a piece of bread covered with sauce
      </p>
      <div className={styles.wrapper}>
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
}
