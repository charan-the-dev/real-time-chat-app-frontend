import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ChatContext } from "../App";

const ChatListItem = ({ name }) => {
    const { user, friend, setFriend, socket } = useContext(ChatContext);

    useEffect(() => {
        console.log(user, friend);

    }, [user, friend]);

    const handleClick = () => {

        setFriend(name);

        socket.emit("join", user);

        socket.on("joined", (data) => {
            console.log(data);
        });
    }

    return (
        <div className="chat-list-item" onClick={handleClick}>
            <i className="user-img">
                {/* <img src="" alt="Image" /> */}
                <FontAwesomeIcon icon={faUser} />
            </i>
            <div className="contact-info">
                <div className="chat-list-item-name">{name}</div>
                <div className="chat-list-item-message">message</div>
            </div>
        </div>
    );
};

export default ChatListItem;