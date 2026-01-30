import React, { useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        // Mock authentication logic
        dispatch(login({
            email: email,
            uid: Date.now(), // Simulating unique ID
            displayName: name || email.split('@')[0], // Fallback name
            photoUrl: profilePic
        }));
    };

    const register = () => {
        if (!name) {
            return alert("Please enter a full name!");
        }

        dispatch(login({
            email: email,
            uid: Date.now(),
            displayName: name,
            photoUrl: profilePic
        }));
    };

    return (
        <div className="login">
            <div className="login__disclaimer">
                <h3>⚠️ Educational Demo Project</h3>
                <p>This is a portfolio project (LinkedIn clone) created for educational purposes. <strong>Do NOT enter real personal information or passwords.</strong></p>
                <p>Use dummy credentials to test: email: <code>test@demo.com</code> / password: <code>any</code></p>
            </div>

            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1200px-LinkedIn_Logo.svg.png"
                alt="Portfolio Demo Logo"
            />

            <form>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name (required if registering)"
                    type="text"
                />
                <input
                    value={profilePic}
                    onChange={(e) => setProfilePic(e.target.value)}
                    placeholder="Profile pic URL (optional)"
                    type="text"
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                />

                <button type="submit" onClick={loginToApp}>Sign In</button>
            </form>

            <p>
                Not a member?{" "}
                <span className="login__register" onClick={register}>Register Now</span>
            </p>
        </div>
    );
}

export default Login;
