import { Outlet } from "react-router-dom";
import Banner from "../../UI/Banner";
import NavbarShop from "./NavbarShop";
import styles from "./Shop.module.css";
const Shop = () => {
  return (
    <section>
      <Banner data={{ header: "SHOP", text: "Shop" }} />
      <div className={styles.container__nav_shopList}>
        <NavbarShop />
        <Outlet />
      </div>
    </section>
  );
};
export default Shop;
