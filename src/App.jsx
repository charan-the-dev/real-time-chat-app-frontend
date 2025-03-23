import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000");

export const ChatContext = createContext({
  socket,
});

const App = () => {

  const [user, setUserId] = useState(localStorage.getItem("user") ?? "");
  const [friend, setFriend] = useState("");

  useEffect(() => {
    console.log(user);
    setTimeout(() => {
      localStorage.removeItem("user");
    }, 50000);

    localStorage.setItem("user", user);
  }, [user]);


  return (
    <ChatContext.Provider
      value={{
        socket,
        setUserId,
        user,
        friend,
        setFriend,
      }}
    >
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chats" element={<Chat />} />
      </Routes>
    </ChatContext.Provider>
  )
}

export default App