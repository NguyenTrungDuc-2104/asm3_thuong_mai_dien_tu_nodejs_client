import { memo } from "react";
import { Link } from "react-router-dom";
import iphone from "../../assets/product_1.png";
import mac from "../../assets/product_2.png";
import ipad from "../../assets/product_3.png";
import watch from "../../assets/product_4.png";
import airPods from "../../assets/product_5.png";

import styles from "./Home.module.css";

const BrowseProduct = () => {
  return (
    <main>
      <header className={styles.header__browse}>
        <p>CAREFULLY CREATED COLLECTIONS</p>
        <h3>BROWSE OUR CATEGORIES</h3>
      </header>

      <div className={styles.container__browse}>
        <div className={styles.item__1}>
          <Link to="/shop/iphone">
            <img src={iphone} alt="iphone" />
          </Link>
          <Link to="/shop/macbook">
            <img src={mac} alt="mac" />
          </Link>
        </div>

        <div className={styles.item__2}>
          <Link to="/shop/ipad">
            <img src={ipad} alt="ipad" />
          </Link>
          <Link to="/shop/watch">
            <img src={watch} alt="watch" />
          </Link>
          <Link to="/shop/airpod">
            <img src={airPods} alt="airpods" />
          </Link>
        </div>
      </div>
    </main>
  );
};
export default memo(BrowseProduct);
