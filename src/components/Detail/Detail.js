import { useState, useEffect } from "react";
import { useLoaderData, Link, useLocation, Form } from "react-router-dom";
import { IoCaretBackOutline, IoCaretForwardOutline } from "react-icons/io5";
import styles from "./Detail.module.css";

const Detail = () => {
  const { product, relatedProducts } = useLoaderData();
  const [isImg, setIsImg] = useState();
  const [isAmount, setIsAmount] = useState(1);
  const location = useLocation();
  useEffect(() => {
    setIsImg(product.img1);
    setIsAmount(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const changImgHandler = (e) => {
    setIsImg(e.target.src);
  };
  // thay doi so luong san pham
  const increaseHandler = () => {
    if (isAmount > 1) {
      setIsAmount((prev) => prev - 1);
    }
  };
  const decreasehandler = () => {
    if (isAmount < product.count) {
      setIsAmount((prev) => prev + 1);
    }
  };

  return (
    <section className={styles.container__detail}>
      <main className={styles.content__product}>
        <figure className={styles.shop__list_img} onClick={changImgHandler}>
          <img src={product.img1} alt={product.name} />
          <img src={product.img2} alt={product.name} />
          <img src={product.img3} alt={product.name} />
          <img src={product.img4} alt={product.name} />
        </figure>

        <figure className={styles.shop__main_img}>
          <img src={isImg} alt={product.name} />
        </figure>

        <div className={styles.content__product_text}>
          <div className={styles.product__info}>
            <h1>{product.name}</h1>
            <p>{product.price.toLocaleString()} VND</p>
            <p>{product.short_desc}</p>
            <p className={styles.product__category}>
              <span>CATEGORY:</span>
              {product.category}
            </p>
            <p className={styles.product__quantity}>
              <span>Quantity in stock:</span> {product.count}
            </p>
          </div>

          {product.count > 0 && (
            <Form method="post" className={styles.content__shop_cart}>
              <div className={styles.cart__quantity}>
                <p>QUANTITY</p>
                <div className="d-flex align-items-center fs-4">
                  {isAmount > 1 && (
                    <IoCaretBackOutline
                      className={styles.icon}
                      onClick={increaseHandler}
                    />
                  )}
                  <input value={isAmount} name="quantity" readOnly />
                  {isAmount < product.count && (
                    <IoCaretForwardOutline
                      className={styles.icon}
                      onClick={decreasehandler}
                    />
                  )}
                </div>
              </div>
              <button className={styles.btn__cart}>Add to cart</button>
            </Form>
          )}
          {product.count <= 0 && (
            <p className={styles.out_of_stock}>Hết hàng</p>
          )}
        </div>
      </main>

      <article className={styles.content__description}>
        <p>DESCRIPTION</p>
        <h1>PRODUCT DESCRIPTION</h1>
        <p className={styles.description__info}>{product.long_desc}</p>
      </article>

      <aside className={styles.container__related}>
        <h1>RELATED PRODUCTS</h1>
        <div>
          {relatedProducts.length > 0 &&
            relatedProducts.map((item) => {
              return (
                <figure className={styles.content__related} key={item._id}>
                  <Link to={`/detail/${item._id}`}>
                    <img src={item.img1} alt={item.name} />
                  </Link>
                  <figcaption>
                    <p>{item.name}</p>
                    <p>{item.price.toLocaleString()} VND</p>
                  </figcaption>
                </figure>
              );
            })}
        </div>
      </aside>
    </section>
  );
};
export default Detail;
