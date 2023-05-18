import { memo } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
const BannerHome = () => {
  return (
    <article className={styles.container__banner}>
      <div className={styles.content__banner}>
        <p>NEW INSPIRATION 2020</p>
        <h1>20% OFF ON NEW SEASON</h1>
        <Link to="shop/all" className={styles.bannerHome__link}>
          Browse collections
        </Link>
      </div>
    </article>
  );
};
export default memo(BannerHome);
