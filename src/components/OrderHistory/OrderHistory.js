import { useLoaderData, Link } from "react-router-dom";
import Banner from "../../UI/Banner";
import { IoArrowForward } from "react-icons/io5";
import styles from "./OrderHistory.module.css";

const OrderHistory = () => {
  const dataOrder = useLoaderData();
  return (
    <section className={styles.container__history}>
      <Banner data={{ header: "HISTORY", text: "History" }} />
      <table className={styles.table}>
        <thead className={styles.table__header}>
          <tr className={styles.table__header_tr}>
            <th>ID ORDER</th>
            <th>ID USER</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>DETAIL</th>
          </tr>
        </thead>
        <tbody>
          {dataOrder.orders &&
            dataOrder.orders.map((item) => {
              return (
                <tr key={item._id} className={styles.table__body_tr}>
                  <td>{item._id}</td>
                  <td>{item.user.userId}</td>
                  <td>{item.user.name}</td>
                  <td>0{item.user.phoneNumber}</td>
                  <td>{item.user.address}</td>
                  <td>{item.total.toLocaleString()} VND</td>
                  <td>{item.delivery}</td>
                  <td>{item.status}</td>
                  <td>
                    <Link
                      to={`/order/${item._id}`}
                      className={styles.order__detail}
                    >
                      <p>View</p>
                      <IoArrowForward />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default OrderHistory;
