import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import Modal from "../../UI/Modal";
import { FaShoppingCart } from "react-icons/fa";
import { GoX } from "react-icons/go";
import styles from "./Home.module.css";

const HomeListProduct = () => {
  const data = useLoaderData();
  const [isProducts, setIsProducts] = useState();
  const [isShowModal, setIsShowModal] = useState(false);
  const [isDataItem, setDataItem] = useState({});
  //--------------------------paging--------------------------
  useEffect(() => {
    if (data.products.length > 8) {
      const products = data.products.slice(0, 8);
      setIsProducts(products);
    } else {
      setIsProducts(data.products);
    }
  }, [data]);

  //----------------------------modal----------------------------
  const showAnItemHandler = (e) => {
    setIsShowModal(true);
    setDataItem(e);
  };

  const hidenPopupHandler = () => {
    setIsShowModal(false);
  };

  useEffect(() => {
    const hidenModal = (e) => {
      if (e.key === "Escape") {
        setIsShowModal(false);
      }
    };

    document.addEventListener("keydown", hidenModal);

    return () => {
      document.removeEventListener("keydown", hidenModal);
      setIsShowModal(false);
    };
  }, []);

  return (
    <>
      <main className={styles.container__product}>
        <header className={styles.header__product_list}>
          <p>MADE THE HARD WAY</p>
          <h3>TOP TRENDING PRODUCTS</h3>
        </header>
        <div className={styles.list__product}>
          {isProducts &&
            isProducts.map((item) => {
              return (
                <figure className={styles.content__product} key={item._id}>
                  <img
                    src={item.img1}
                    alt={item.name}
                    onClick={showAnItemHandler.bind(null, item)}
                  />
                  <figcaption className={styles.text__product}>
                    <p>{item.name}</p>
                    <p>{item.price.toLocaleString()} VND</p>
                  </figcaption>
                </figure>
              );
            })}
        </div>
      </main>

      {isShowModal && (
        <Modal className={styles.home__modal} onConfirm={hidenPopupHandler}>
          <aside className={styles.container__popup}>
            <img src={isDataItem.img1} alt={isDataItem.name} />
            <div className={styles.content__popup}>
              <GoX className={styles.popup__icon} onClick={hidenPopupHandler} />
              <div className={styles.popup__text}>
                <h2>{isDataItem.name}</h2>
                <p>{`${
                  isDataItem.price && isDataItem.price.toLocaleString()
                } VND`}</p>
                <p>{isDataItem.short_desc}</p>
              </div>
              <Link
                to={`/detail/${isDataItem._id}`}
                className={styles.popup__link_detail}
              >
                <FaShoppingCart />
                <p>View Detail</p>
              </Link>
            </div>
          </aside>
        </Modal>
      )}
    </>
  );
};

export default HomeListProduct;
