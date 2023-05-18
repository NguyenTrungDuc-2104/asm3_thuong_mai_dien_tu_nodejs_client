import { NavLink } from "react-router-dom";
import styles from "./Shop.module.css";
const NavbarShop = () => {
  return (
    <nav className={styles.container__navbar}>
      <h1>CATEGORIES</h1>
      <div className={styles.content__navbar}>
        <h4>APPLE</h4>
        <NavLink
          to="/shop/all"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          All
        </NavLink>
        <h6 className={styles.content__navbar_header}>IPHONE & MAC</h6>
        <NavLink
          to="/shop/iphone"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          iPhone
        </NavLink>
        <NavLink
          to="/shop/ipad"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          iPad
        </NavLink>
        <NavLink
          to="/shop/macbook"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Macbook
        </NavLink>
        <h6 className={styles.content__navbar_header}>WIRIELESS</h6>
        <NavLink
          to="/shop/airpod"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Airpod
        </NavLink>
        <NavLink
          to="/shop/watch"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Watch
        </NavLink>
        <h6 className={styles.content__navbar_header}>OTHER</h6>
        <NavLink
          to="/shop/mouse"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Mouse
        </NavLink>
        <NavLink
          to="/shop/keyboard"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Keyboard
        </NavLink>
        <NavLink
          to="/shop/other"
          className={({ isActive }) => (isActive ? styles.active : null)}
        >
          Other
        </NavLink>
      </div>
    </nav>
  );
};
export default NavbarShop;
