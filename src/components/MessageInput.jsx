import { useContext, useState } from "react";
import { ChatContext } from "../App";

const MessageInput = () => {
  const { socket, user, friend } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const sendMessage = () => {
    if (!message) return;

    socket.emit("send_message", {
      sender: user,
      receiver: friend,
      message,
    });

    socket.on("message_error", (err) => {
      setError(err.message);
    });

    setMessage("");
  }

  return (
    <div className="message-input">
      {error && <div className="input-error">{error}</div>}
      <input
        type="text"
        placeholder="Type a Message and Press Enter"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;