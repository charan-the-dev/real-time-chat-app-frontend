import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ChatContext } from '../App'
import "../CSS/signup.css";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { socket } = useContext(ChatContext);
    const [errMessage, setErrMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("add_user", { username, email, password });
        setUsername('');
        setEmail('');
        setPassword('');
        
        socket.on("user_added", (user) => {
            console.log(user);
        });

        socket.on("user_error", (err) => {
            console.log(err);
            setErrMessage(err.message);
        });
    };

    return (
        <>
            <h1>Sign Up</h1>
            {errMessage && <div className='errMessage'>{errMessage}</div>}
            <form className='signUp-container' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Sign Up</button>
            </form>
            <div>
                <Link to={"/login"}>Login</Link>
            </div>
        </>
    )
}

export default SignUp