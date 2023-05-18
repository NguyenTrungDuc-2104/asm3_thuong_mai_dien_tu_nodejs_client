import { useEffect, useState } from "react";
import {
  useLoaderData,
  useSubmit,
  useNavigation,
  useNavigate,
  Link,
} from "react-router-dom";
import {
  IoCaretBackOutline,
  IoCaretForwardOutline,
  IoTrashOutline,
  IoGiftSharp,
  IoArrowBack,
  IoArrowForward,
} from "react-icons/io5";
import Banner from "../../UI/Banner";
import styles from "./Cart.module.css";

const Cart = () => {
  const dataCart = useLoaderData();
  const submit = useSubmit();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [isCheckout, setIsChekout] = useState(true);
  //==================================================================
  const total = dataCart.cart.items
    .reduce((total, item) => total + item.product.price * item.quantity, 0)
    .toLocaleString();

  //---------------check count in stock-----------------
  useEffect(() => {
    if (dataCart) {
      const checkQuantity = dataCart.cart.items.some((item) => {
        return item.product.count < item.quantity;
      });
      if (checkQuantity) {
        setIsChekout(false);
      } else {
        setIsChekout(true);
      }
    }
  }, [dataCart]);

  //--------------------change cart handler-----------------------
  //----increase----
  const increaseHandler = (productId, quantity, count) => {
    if (quantity < count) {
      const formData = new FormData();
      formData.append("type", "increase");
      formData.append("productId", productId);
      submit(formData, { method: "PATCH" });
    }
  };
  //----decrease----
  const decreaseHandler = (productId, quantity) => {
    if (quantity <= 1) {
      if (!window.confirm("The product will be deleted, are you sure")) return;
    }
    const formData = new FormData();
    formData.append("type", "decrease");
    formData.append("productId", productId);
    submit(formData, { method: "PATCH" });
  };
  //----remove----
  const removeHandler = (productId) => {
    if (!window.confirm("Are you sure you want to delete")) {
      return;
    }
    const formData = new FormData();
    formData.append("type", "remove");
    formData.append("productId", productId);
    submit(formData, { method: "PATCH" });
  };
  //----------------------------check out-----------------------
  const checkOutHandler = () => {
    if (dataCart.cart.items.length > 0) {
      if (!isCheckout) {
        return window.alert("Quantity in stock does not meet requirements");
      }
      navigate("/checkout");
    } else {
      alert("You have no items in your shopping cart!");
    }
  };

  return (
    <section className={styles.container__cart}>
      <Banner data={{ header: "CART", text: "Cart" }} />
      <h1>SHOPPING CART</h1>
      <main className={styles.content__cart}>
        <div>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th>IMAGE</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>COUNT</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {dataCart.cart &&
                dataCart.cart.items.map((item) => {
                  return (
                    <tr key={item._id} className={styles.tr__table}>
                      <td>
                        <img
                          src={item.product.img1}
                          alt={item.product.name}
                          className={styles.img}
                        />
                      </td>
                      <td className={styles.name}>{item.product.name}</td>
                      <td className={styles.price}>
                        {item.product.price.toLocaleString()} VND
                      </td>
                      <td className={styles.quantity}>
                        <div>
                          <IoCaretBackOutline
                            className={`${styles.icon__quantity} ${
                              navigation.state !== "idle"
                                ? styles.disable
                                : null
                            }`}
                            onClick={decreaseHandler.bind(
                              null,
                              item._id,
                              item.quantity
                            )}
                          />
                          <p>{item.quantity}</p>
                          {item.quantity < item.product.count && (
                            <IoCaretForwardOutline
                              className={`${styles.icon__quantity} ${
                                navigation.state !== "idle"
                                  ? styles.disable
                                  : null
                              }`}
                              onClick={increaseHandler.bind(
                                null,
                                item._id,
                                item.quantity,
                                item.product.count
                              )}
                            />
                          )}
                        </div>
                      </td>
                      <td>{item.product.count}</td>
                      <td className={styles.total_product}>
                        {(item.product.price * item.quantity).toLocaleString()}{" "}
                        VND
                      </td>
                      <td className={styles.remove}>
                        <IoTrashOutline
                          className={` ${
                            navigation.state !== "idle" ? styles.disable : null
                          }`}
                          onClick={removeHandler.bind(null, item._id)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <footer className={styles.cart__footer}>
            <Link to="/shop/all" className={styles.link}>
              <IoArrowBack />
              <p>Continue shopping</p>
            </Link>
            <button
              className={`${styles.link} ${styles.link__boder}`}
              onClick={checkOutHandler}
            >
              <p>Proceed to checkout</p>
              <IoArrowForward />
            </button>
          </footer>
        </div>

        <div className={styles.container__cart_total}>
          <p>CART TOTAL</p>
          <div className={styles.sub__total}>
            <p>SUBTOTAL</p>
            <p>{total} VND</p>
          </div>
          <div className={styles.total}>
            <p>TOTAL</p>
            <p>{total} VND</p>
          </div>
          <div className={styles.form}>
            <input placeholder="Enter your coupon" className={styles.input} />
            <button className={styles.btn}>
              <IoGiftSharp />
              <p>Apply coupon</p>
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Cart;
