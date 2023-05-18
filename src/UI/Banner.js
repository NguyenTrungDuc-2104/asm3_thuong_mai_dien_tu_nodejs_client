import styles from "./Banner.module.css";

const Banner = (props) => {
  return (
    <article className={styles.contanier__banner}>
      <h1>{props.data.header}</h1>
      <p>{props.data.text}</p>
    </article>
  );
};
export default Banner;
