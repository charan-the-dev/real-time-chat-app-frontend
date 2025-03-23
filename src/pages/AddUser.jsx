import React, { useState, useContext } from 'react';
import { ChatContext } from '../App';

const AddUser = ({ isOpen, onClose }) => {
    const { socket } = useContext(ChatContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username && !email) {
            setError("Enter either email or Password");
            return;
        }
        socket.emit('add_chat', { username, email });

        socket.on('chat_added', (msg) => setError(msg.message));
        socket.on('chat_error', (err) => setError(err.message));

        setUsername('');
        setEmail('');
    };

    if (!isOpen) return null; // Don't render the modal if not open

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Add User</h2>
                {error && <div>{error}</div>}
                <form onSubmit={handleSubmit} style={formStyle}>
                    <div>
                        <label htmlFor="username" style={labelStyle}>Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" style={labelStyle}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={inputStyle}
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>Add User</button>
                    <button type="button" onClick={onClose} style={closeButtonStyle}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default AddUser;

// Styles
const formStyle = {
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderBottom: "1px solid",
    border: "none",
    borderRadius: '4px',
    outline: "none",
    fontSize: '16px',
};

const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block',
};

const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    outline: "none",
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
};

const closeButtonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    outline: "none",
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
};

const modalOverlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

