import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";
import "../CSS/chat.css";

const Chat = () => {
    return (
        <>
            <div className="chat-app">
                <Sidebar />
                <ChatWindow />
            </div>
        </>
    );
};

export default Chat;

