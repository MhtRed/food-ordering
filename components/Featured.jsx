import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Featured.module.css";

export default function Featured() {
  const [index, setIndex] = useState(0);
  const images = [
    "/imgs/featured.png",
    "/imgs/featured2.png",
    "/imgs/featured3.png",
  ];
  const slide = (direction) => {
    if (direction === "r") {
      if (index === 2) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    } else {
      if (index === 0) {
        setIndex(2);
      } else {
        setIndex(index - 1);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div
        onClick={() => slide("l")}
        className={styles.arrowContainer}
        style={{ left: 0 }}
      >
        <Image src="/imgs/arrowl.png" alt="" layout="fill" objectFit="cover" />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div key={i} className={styles.imgContainer}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div
        onClick={() => slide("r")}
        className={styles.arrowContainer}
        style={{ right: 0 }}
      >
        <Image src="/imgs/arrowr.png" alt="" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
}
