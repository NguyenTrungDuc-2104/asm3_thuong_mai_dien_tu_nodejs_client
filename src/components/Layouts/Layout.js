import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaFacebookMessenger } from "react-icons/fa";
import Modal from "../../UI/Modal";
import LiveChat from "./LiveChat/LiveChat";
import styles from "./Layout.module.css";
const Layout = () => {
  const [isShow, setShow] = useState(false);

  const hiddenMessageHander = () => {
    setShow(false);
  };

  useEffect(() => {
    const keyEvent = (e) => {
      if (e.key === "Escape") setShow(false);
    };
    document.addEventListener("keydown", keyEvent);
    return () => {
      setShow(false);
      document.removeEventListener("keydown", keyEvent);
    };
  }, []);
  //-----------------------------------------------
  const showMessageHandler = () => {
    setShow(true);
  };
  return (
    <>
      <div className={styles.container__layout}>
        <Navbar />
        <Outlet />
      </div>
      {!isShow && (
        <div className={styles.icon__message}>
          <FaFacebookMessenger onClick={showMessageHandler} />
        </div>
      )}
      <Footer />
      {isShow && (
        <Modal
          backdrop__color={styles.backdrop__color}
          className={styles.modal__live_chat}
          onConfirm={hiddenMessageHander}
        >
          <LiveChat onHiddenMessage={hiddenMessageHander} />
        </Modal>
      )}
    </>
  );
};
export default Layout;
