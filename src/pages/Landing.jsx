import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <div className="landing-page">
            <div className="container">
                <h1>Welcome to the Real-Time Chat App</h1>
                <p>Connect with your friends instantly and securely.</p>
                <button>
                    <Link to={"/chats"}>Get Started</Link>
                </button>
            </div>
        </div>
    );
};

export default Landing;
