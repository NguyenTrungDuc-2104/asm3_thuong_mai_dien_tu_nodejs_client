import { memo } from "react";
import styles from "./Layout.module.css";
const Footer = () => {
  return (
    <footer className={styles.container__footer}>
      <div className={styles.content__footer}>
        <div>
          <p>CUSTOMER SERVICES</p>
          <a href="#" target="_blank">
            Help & Contact US
          </a>
          <a href="#" target="_blank">
            Return & Refunds
          </a>
          <a href="#" target="_blank">
            Online Stores
          </a>
          <a href="#" target="_blank">
            Terms & Conaitions
          </a>
        </div>

        <div>
          <p>COMPANY</p>
          <a href="#" target="_blank">
            What We Do
          </a>
          <a href="#" target="_blank">
            Avaiable Services
          </a>
          <a href="#" target="_blank">
            Latest Posts
          </a>
          <a href="#" target="_blank">
            FAQs
          </a>
        </div>

        <div>
          <p>SOCIAL MEDIA</p>
          <a href="#" target="_blank">
            Twitter
          </a>
          <a href="#" target="_blank">
            Intagram
          </a>
          <a href="#" target="_blank">
            Facebook
          </a>
          <a href="#" target="_blank">
            Printerest
          </a>
        </div>
      </div>
    </footer>
  );
};
export default memo(Footer);
