import { useLoaderData } from "react-router-dom";
import styles from "./OrderDetail.module.css";
const OrderDetail = () => {
  const dataOrder = useLoaderData();
  return (
    <section className={styles.container__order_detail}>
      <header className={styles.order__header}>
        <h1>INFORMATION ORDER</h1>
        <div className={styles.content__order_header}>
          <p>ID User: {dataOrder.user.userId}</p>
          <p>Name: {dataOrder.user.name}</p>
          <p>Phone: 0{dataOrder.user.phoneNumber}</p>
          <p>Aaddress: {dataOrder.user.address}</p>
          <p>Total: {dataOrder.total.toLocaleString()} VND</p>
        </div>
      </header>

      <table className={styles.order__table}>
        <thead className={styles.table__header}>
          <tr>
            <th>ID PRODUCT</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody className={styles.table__body}>
          {dataOrder.products &&
            dataOrder.products.map((item) => {
              return (
                <tr key={item._id} className={styles.table__body_tr}>
                  <td>{item.product._id}</td>
                  <td className={styles.container__img}>
                    <img src={item.product.img1} />
                  </td>
                  <td>{item.product.name}</td>
                  <td>{item.product.price.toLocaleString()} VND</td>
                  <td>{item.quantity}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </section>
  );
};

export default OrderDetail;
