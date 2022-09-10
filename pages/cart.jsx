import Image from "next/image";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody className={styles.tbody}>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src="/imgs/pizza.png"
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  ></Image>
                </div>
              </td>
              <td>
                <span className={styles.name}>CORALZO</span>
              </td>
              <td>
                <span className={styles.extras}>
                  Double ingredients, spicy sauce
                </span>
              </td>
              <td>
                <span className={styles.price}>£ 19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>£ 39.80</span>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src="/imgs/pizza.png"
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  ></Image>
                </div>
              </td>
              <td>
                <span className={styles.name}>CORALZO</span>
              </td>
              <td>
                <span className={styles.extras}>
                  Double ingredients, spicy sauce
                </span>
              </td>
              <td>
                <span className={styles.price}>£ 19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>£ 39.80</span>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src="/imgs/pizza.png"
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  ></Image>
                </div>
              </td>
              <td>
                <span className={styles.name}>CORALZO</span>
              </td>
              <td>
                <span className={styles.extras}>
                  Double ingredients, spicy sauce
                </span>
              </td>
              <td>
                <span className={styles.price}>£ 19.90</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>£ 39.80</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.box}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> £ 39.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b> £ 00.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b> £ 39.60
          </div>
          <button className={styles.button}>CHECKOUT NOW</button>
        </div>
      </div>
    </div>
  );
}
