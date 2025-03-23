import React from "react";
import { useContext } from "react";
import { ChatContext } from "../App";

const Message = ({ msg, sender, time }) => {
  const { user } = useContext(ChatContext);

  function convertToTime(datetime) {
    let date = new Date(datetime);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  return (
    <div className={`message ${sender === user ? "sent" : "received"}`}>
      {/* <div>{msg}</div> */}
      <p>{msg}</p>
      <span className="message-time">
        {convertToTime(time)}
      </span>
    </div>
  );
};

export default Message;