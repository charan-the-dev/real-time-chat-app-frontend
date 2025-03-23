import React from "react";

const Message = ({ text, sender, time }) => {
  return (
    <div className={`flex ${sender === "You" ? "justify-end" : "justify-start"} mb-2`}>
      <div className="bg-white p-2 rounded shadow">
        <p>{text}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
    </div>
  );
};

export default Message;