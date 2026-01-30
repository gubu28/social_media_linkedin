import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        // Mock authentication logic
        dispatch(login({
            email: email,
            uid: Date.now(),
            displayName: email.split('@')[0],
            photoUrl: ""
        }));
    };

    return (
        <div className="login">
            <div className="login__disclaimer">
                <h3>⚠️ Educational Demo Project</h3>
                <p>This is a portfolio project for <strong>B@G_LAMS Technologies</strong>. Created for educational purposes only. <strong>Do NOT enter real passwords.</strong></p>
                <p>Use dummy credentials: email: <code>test@demo.com</code> / password: <code>any</code></p>
            </div>

            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1200px-LinkedIn_Logo.svg.png"
                alt="B@G_LAMS Technologies Logo"
            />

            <form onSubmit={loginToApp}>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                />

                <button type="submit">Sign In</button>
            </form>

            <p>
                New to B@G_LAMS?{" "}
                <Link to="/register" className="login__register">Join Now</Link>
            </p>
        </div>
    );
}

export default Login;
