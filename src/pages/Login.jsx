import { useState, useContext, useEffect } from 'react';
import { ChatContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  const { socket, setUserId } = useContext(ChatContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Ensure event listener is added once
    socket.on("login_success", (user) => {
      console.log("Login successful:", user);
      alert("Login Successful for User: " + user.username);
      setUserId(user.username); // Ensure user ID is set
      navigate("/chats");
    });

    socket.on("login_error", (err) => {
      console.error("Login error:", err);
      setMessage("There was an error logging in. Check your credentials.");
    });

    // Cleanup event listeners when component unmounts
    return () => {
      socket.off("login_success");
      socket.off("login_error");
    };
  }, [socket, setUserId, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage("Please enter all fields");
      return;
    }
    
    setMessage("");
    socket.emit("login", { username, password });
    setUsername('');
    setPassword('');
  }

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      {message && <div style={styles.message}>{message}</div>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
        <Link to={"/signup"} style={styles.linkButton}>Register</Link>
      </form>
    </div>
  );
};

export default Login;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  linkButton: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#6c757d',
    color: '#fff',
    textDecoration: 'none',
    textAlign: 'center',
  },
  message: {
    marginBottom: '10px',
    color: 'red',
  },
};
