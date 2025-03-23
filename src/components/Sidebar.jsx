import { useState, useEffect, useContext } from "react";
import ChatListItem from "./ChatListItem";
import { ChatContext } from "../App";
import AddUser from "../pages/AddUser";

const Sidebar = () => {
    const { socket, user } = useContext(ChatContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.emit("get_users", user);
    
        socket.on("users", (users) => {
            console.log(users);
            setUsers(users);
        });
    
        socket.on("chat_added", () => {
            // Re-fetch users when a new chat is added
            socket.emit("get_users", user);
        });
    
        return () => {
            socket.off("users");
            socket.off("chat_added"); // Cleanup event listener
        };
    }, [user, socket]);
    
    return (
        <div className="sidebar">
            <h2>Chats <button className="add-user" onClick={() => setIsModalOpen(true)}>+</button></h2>
            <AddUser isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <input type="text" placeholder="Search Chats" className="search-bar" />
            <div className="chats-wrapper">
                {users.forEach((user, i) => (
                    <ChatListItem key={i} name={user.username} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar;