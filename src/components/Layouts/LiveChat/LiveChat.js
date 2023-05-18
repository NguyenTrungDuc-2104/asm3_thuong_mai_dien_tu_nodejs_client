import { useState, useEffect, useRef } from "react";
import LiveChatMessage from "./LiveMessage";
import { IoIosSend } from "react-icons/io";
import { FcBusinessman } from "react-icons/fc";
import { FaTimes } from "react-icons/fa";
import { io } from "socket.io-client";
import styles from "./LiveChat.module.css";
const socket = io(process.env.REACT_APP_API_URL);

const LiveChat = (props) => {
  const [isvalueInput, setIsValueInput] = useState("");
  const [isMessage, setIsMessage] = useState([]);
  const [isDataSocket, setIsDataSocket] = useState();
  const [isStartMessage, setIsStartMessgae] = useState(true);
  const scrollRef = useRef();

  const roomId = localStorage.getItem("roomId")
    ? JSON.parse(localStorage.getItem("roomId"))
    : "null";
  //----------------------------get message------------------------
  const getMessage = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/chat/user/get_message/${roomId}`,
      { method: "GET", credentials: "include" }
    );
    if (response.status === 401) {
      window.alert("You need to login to use this feature");
      return;
    }
    if (!response.ok) {
      console.log("Something went wrong");
      return;
    }
    const data = await response.json();
    setIsMessage(data.message);
  };
  //----------------------lấy message--------------------
  useEffect(() => {
    getMessage();
    socket.on("send_message", (data) => {
      setIsDataSocket(data);
    });
  }, []);
  //---------push message vào mảng message hiện tại----
  useEffect(() => {
    if (isDataSocket) {
      setIsMessage((prev) => [...prev, isDataSocket]);
    }
  }, [isDataSocket]);

  //------------------------data input---------------------
  const onChangeInputHandler = (e) => {
    const value = e.target.value;
    setIsValueInput(value);
  };
  //--------------------------post message---------------------------
  const postMessage = async () => {
    setIsValueInput("");
    const response = await fetch(
      process.env.REACT_APP_API_URL + `/chat/user/post_message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: isvalueInput, roomId }),
        credentials: "include",
      }
    );
    if (response.status === 401) {
      window.alert("You need to login to use this feature");
      return;
    }
    if (!response.ok) {
      console.log("Something went wrong");
      return;
    }
    const data = await response.json();
    localStorage.setItem("roomId", JSON.stringify(data.roomId));
  };
  //----------------------submit-------------------
  const submitHander = (e) => {
    e.preventDefault();
    socket.emit("create_room", roomId);
    if (isvalueInput.trim() === "") return;
    //--------kết thúc khi nhập /end-------------
    if (isvalueInput.trim() === "/end") {
      socket.emit("leave_room");
      localStorage.removeItem("roomId", roomId);
      setIsStartMessgae(true);
      setIsValueInput("");
      setIsMessage([]);
      return;
    }
    //-------post new message----------
    postMessage();
  };
  //----------------------------new conversation---------------------------
  const newMessageHandler = async () => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/chat/user/get_new_conversation",
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (response.status === 401) {
      window.alert("You need to login to use this feature");
      return;
    }
    if (!response.ok) {
      console.log("Something went wrong");
      return;
    }
    const data = await response.json();
    localStorage.setItem("roomId", JSON.stringify(data.roomId));
    setIsStartMessgae(false);
  };
  //-------------------------------scroll tới message mới nhất---------------------------------
  useEffect(() => {
    scrollRef.current &&
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [isMessage]);

  return (
    <section className={styles.container__live_chat}>
      <header className={styles.live__chat_header}>
        <h2>Customer Support</h2>
        <span onClick={props.onHiddenMessage}>
          <FaTimes />
        </span>
      </header>
      <main className={styles.live__chat_main}>
        {isMessage.length > 0 &&
          isMessage.map((item) => {
            return (
              <div key={item._id} ref={scrollRef}>
                <LiveChatMessage data={item} />
              </div>
            );
          })}
      </main>
      {roomId !== "null" && (
        <footer className={styles.liver__chat_footer}>
          <form onSubmit={submitHander}>
            <FcBusinessman className={styles.icon__user} />
            <textarea
              className={styles.textarea}
              placeholder="Enter Message!"
              value={isvalueInput}
              onChange={onChangeInputHandler}
            />
            <button>
              <IoIosSend className={styles.icon__send} />
            </button>
          </form>
        </footer>
      )}
      {roomId === "null" && isStartMessage && (
        <button
          className={styles.start_conversation}
          onClick={newMessageHandler}
        >
          Start Mesage
        </button>
      )}
    </section>
  );
};

export default LiveChat;
