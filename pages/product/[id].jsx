import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import styles from "../../styles/Product.module.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

export default function Product({ pizza }) {
  const [size, setSize] = useState(0);
  const [extras, setExtras] = useState([]);
  const [qty, setQty] = useState(1);
  const [extraPrice, setExtraPrice] = useState(0);
  const dispatch = useDispatch();

  const changeHandler = (e, option) => {
    if (e.target.checked) {
      setExtraPrice((extraPrice) => extraPrice + option.price);
      setExtras((prev) => [...prev, option]);
    } else {
      setExtraPrice((extraPrice) => extraPrice - option.price);
      setExtras((prev) => prev.filter((opt) => opt._id !== option._id));
    }
  };
  const clickHandler = () => {
    dispatch(
      addProduct({
        ...pizza,
        qty,
        extraOptions: extras,
        price: pizza.prices[size] + extraPrice,
      })
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            alt={pizza.name}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>
          {" "}
          £ {pizza.prices[size] + extraPrice}
        </span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div onClick={() => setSize(0)} className={styles.size}>
            <Image
              src="/imgs/size.png"
              alt=""
              layout="fill"
              objectFit="contain"
            ></Image>
            <span className={styles.number}>Small</span>
          </div>
          <div onClick={() => setSize(1)} className={styles.size}>
            <Image
              src="/imgs/size.png"
              alt=""
              layout="fill"
              objectFit="contain"
            ></Image>
            <span className={styles.number}>Medium</span>
          </div>
          <div onClick={() => setSize(2)} className={styles.size}>
            <Image
              src="/imgs/size.png"
              alt=""
              layout="fill"
              objectFit="contain"
            ></Image>
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div key={option._id} className={styles.option}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => changeHandler(e, option)}
              />
              <label htmlFor="double">{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={clickHandler}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const response = await axios.get(
    `http://localhost:3000/api/products/${params.id}`
  );
  return {
    props: {
      pizza: response.data,
    },
  };
};
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}
