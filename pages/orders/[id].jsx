import axios from "axios";
import Image from "next/image";
import styles from "../../styles/Orders.module.css";
export default function Orders({ order }) {
  const statusClass = (index) => {
    if (index - order.status < 1) return styles.done;
    if (index - order.status === 1) return styles.inProgress;
    if (index - order.status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.customer}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td>
                  <span className={styles.total}>£ {order.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/imgs/paid.png" alt="" width={30} height={30} />
            <span>Payement</span>
            <div className={styles.checkedIcon}>
              <Image src="/imgs/checked.png" alt="" width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/imgs/bake.png" alt="" width={30} height={30} />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image src="/imgs/checked.png" alt="" width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/imgs/bike.png" alt="" width={30} height={30} />
            <span>On the Way</span>
            <div className={styles.checkedIcon}>
              <Image src="/imgs/checked.png" alt="" width={20} height={20} />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/imgs/delivered.png" alt="" width={30} height={30} />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image src="/imgs/checked.png" alt="" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.box}>
          <h2 className={styles.title}>ORDER TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> £ {order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b> £ 00.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b> £ {order.total}
          </div>
          <button disabled className={styles.button}>
            {order.method === 1 ? "PAID" : "CASH ON DELIVERY"}
          </button>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
  return {
    props: {
      order: res.data,
    },
  };
};
