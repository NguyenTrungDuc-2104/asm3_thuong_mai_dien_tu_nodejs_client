import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import styles from "./Shop.module.css";
const ShopList = () => {
  const data = useLoaderData();
  const products = data.products;
  //--------lam paging sau--------
  const [isPage, setIsPage] = useState(1);
  // const [isProduct, setIsProduct] = useState([]);
  const totalProduct = data.totalProduct;
  const totalPAge = Math.ceil(totalProduct / 8);
  //----------------------------
  return (
    <main className={styles.container__shop_list}>
      <form className={styles.form__search_shop}>
        <input type="text" name="text_search" placeholder="Enter Search Here" />
        <select>
          <option>test</option>
          <option>test</option>
        </select>
      </form>
      <div className={styles.content__shop_product}>
        {products.length > 0 &&
          products.map((item) => {
            return (
              <figure key={item._id} className={styles.shop_product}>
                <Link to={`/detail/${item._id}`}>
                  <img src={item.img1} alt={item.name} />
                </Link>
                <figcaption className={styles.shop_product_text}>
                  <p>{item.name}</p>
                  <p>{`${item.price.toLocaleString()} VND`}</p>
                </figcaption>
              </figure>
            );
          })}
      </div>

      {products.length === 0 && (
        <h1 className={styles.shop__noProduct}>No products</h1>
      )}
      {products.length > 0 && (
        <div className={styles.container__shop_paging}>
          <div className={styles.change__paging}>
            <span>
              <FaAngleDoubleLeft />
            </span>
            {products.length !== 0 && <p>{isPage}</p>}
            <span>
              <FaAngleDoubleRight />
            </span>
          </div>
          <p>
            Showing {isPage}-{totalPAge} results
          </p>
        </div>
      )}
    </main>
  );
};

export default ShopList;
