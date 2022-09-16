import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles/Cart.module.css";
import { reset } from "../redux/cartSlice";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import OrderDetails from "../components/OrderDetails";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const { products, qty, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const discount = 20;
  const router = useRouter();
  const amount = total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const createOrder = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      if (res.status === 201) {
        router.push(`/orders/${res.data._id}`);
      }
      dispatch(reset());
    } catch (err) {
      console.log(err.response.data);
    }
  };
  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

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
            {products.map((product) => (
              <tr key={product._id} className={styles.tr}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      alt={product.title}
                      layout="fill"
                      objectFit="contain"
                    ></Image>
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  {product.extraOptions.map((option) => (
                    <span key={option.text} className={styles.extras}>
                      -{option.text}{" "}
                    </span>
                  ))}
                </td>
                <td>
                  <span className={styles.price}>£ {product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.qty}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    £ {product.price * product.qty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.box}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> £ {total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b> {discount} %
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b> £{" "}
            {total * ((100 - discount) / 100)}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.paybutton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AV0Jf8WIDCtPAhngKGx4F0QLQm2hoMZuH96WcedVFguG3ciAbyKXz1hXn7P-jYzvzzQhBiSd0H9p2o6z",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen((open) => !open)}
              className={styles.button}
            >
              CHECKOUT
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetails total={total} createOrder={createOrder} />}
    </div>
  );
}
