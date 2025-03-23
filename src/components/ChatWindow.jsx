import { useState, useEffect, useContext } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { ChatContext } from "../App";

const ChatWindow = () => {
  const { socket, user, friend } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("get_messages", { sender: user, receiver: friend });

    socket.on("recieve_messages", (msgs) => {
      setMessages(msgs);
    });

    socket.on("new_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("recieve_messages");
      socket.off("new_message");
    };

  }, [user, friend]);

  return (
    <div className="chat-window">
      <h2 className="chat-header">{friend}</h2>
      <div className="chat-messages">
        {/* <Message text={user} />
        <Message text={friend} /> */}
        {
          messages.map((msg, i) => (
            <Message key={msg._id} msg={msg.message} sender={msg.sender} time={msg.timestamp} />
          ))
        }
        {/* <img src="./src/assets/react.svg" alt="Sent" className="chat-image" /> */}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatWindow;