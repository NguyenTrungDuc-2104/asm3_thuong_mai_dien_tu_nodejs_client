import ReactDom from "react-dom";
import styles from "./Modal.module.css";

const Backdrop = (props) => {
  return (
    <div
      className={`${styles.backdrop} ${props.className}`}
      onClick={props.onConfirm}
    />
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDom.createPortal(
        <Backdrop
          onConfirm={props.onConfirm}
          className={props.backdrop__color}
        />,
        document.getElementById("backdrop__root")
      )}
      {ReactDom.createPortal(
        <div className={`${styles.modal} ${props.className}`}>
          {props.children}
        </div>,
        document.getElementById("overlay__root")
      )}
    </>
  );
};

export default Modal;
