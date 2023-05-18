import { FcAssistant } from "react-icons/fc";
import { format } from "timeago.js";
import styles from "./LiveChat.module.css";

const LiveChatMessage = (props) => {
  const containerClasses =
    props.data.sender.role === "customer"
      ? `${styles.container__message} ${styles.content__message_own}`
      : styles.container__message;

  const textClasses =
    props.data.sender.role === "customer"
      ? `${styles.message__text} ${styles.message__text_own}`
      : styles.message__text;

  return (
    <div className={containerClasses}>
      <div className={styles.content__message}>
        <div className={textClasses}>
          {props.data.sender.role !== "customer" && (
            <span className={styles.icon__admin}>
              <FcAssistant />
            </span>
          )}
          <p>{props.data.text}</p>
        </div>
        <p>{format(props.data.createdAt)}</p>
      </div>
    </div>
  );
};
export default LiveChatMessage;
