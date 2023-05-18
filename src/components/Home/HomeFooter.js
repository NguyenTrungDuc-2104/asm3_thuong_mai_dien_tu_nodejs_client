import styles from "./Home.module.css";

const HomeFooter = () => {
  return (
    <footer className={styles.container__homeFooter}>
      <div className={styles.homeFooter__info}>
        <div>
          <h3>FREE SHIPPING</h3>
          <p>Fre shipping worlwide</p>
        </div>

        <div>
          <h3>24 X 7 SERVICE</h3>
          <p>Fre shipping worlwide</p>
        </div>

        <div>
          <h3>FESTIVAL OFFER</h3>
          <p>Fre shipping worlwide</p>
        </div>
      </div>

      <div className={styles.homeFooter__form_register}>
        <div>
          <h2>LET'S BE FRIENDS!</h2>
          <p>Nisi nisi tempor consequat laboris nisi</p>
        </div>
        <form className={styles.homeFooter__form}>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
          />
          <button>Subcribe</button>
        </form>
      </div>
    </footer>
  );
};

export default HomeFooter;
