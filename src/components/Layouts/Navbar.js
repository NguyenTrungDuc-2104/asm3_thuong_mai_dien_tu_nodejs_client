import { memo } from "react";
import { NavLink, useNavigate, useFetcher } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import styles from "./Layout.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const fetch = useFetcher();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  //-----------------------------shop handler--------------------------
  const navShopHandler = (e) => {
    e.preventDefault();
    navigate("/shop/all");
  };
  //-----------------------------logout--------------------------
  const logoutHandler = () => {
    if (window.confirm("Do you want to logout")) {
      localStorage.removeItem("user");
      localStorage.removeItem("roomId");
      fetch.submit(null, { method: "DELETE", action: "/" });
    }
  };

  return (
    <nav className={styles.container__nav}>
      <ul className={styles.list__nav}>
        <div className={styles.content__nav}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="shop"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
              onClick={navShopHandler}
            >
              Shop
            </NavLink>
          </li>
        </div>

        <h1>BOUTIQUE</h1>

        <div className={styles.content__nav}>
          <li>
            <NavLink
              to="orders"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cart"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              <div className={styles.content__nav_cart}>
                <FaShoppingCart />
                <p>Cart</p>
              </div>
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                <div className={styles.content__nav_login}>
                  <FaUser />
                  <p>Login</p>
                </div>
              </NavLink>
            </li>
          )}

          {user && (
            <li className={styles.content__nav_user} onClick={logoutHandler}>
              <FaUser />
              <p>{user.name}</p>
              <p>(Logout)</p>
            </li>
          )}
        </div>
      </ul>
    </nav>
  );
};
export default memo(Navbar);
