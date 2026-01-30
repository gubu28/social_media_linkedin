import React, { useState } from 'react';
import './Register.css';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        if (!name) {
            return alert("Please enter a full name!");
        }

        dispatch(login({
            email: email,
            uid: Date.now(),
            displayName: name,
            photoUrl: profilePic
        }));
        navigate("/");
    };

    return (
        <div className="register">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinkedIn_Logo.svg/1200px-LinkedIn_Logo.svg.png"
                alt="B@G-LAMS Technologies Logo"
            />

            <form onSubmit={register}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name (required)"
                    type="text"
                    required
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
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    required
                />

                <button type="submit">Agree & Join</button>
            </form>

            <p>
                Already on B@G-LAMS?{" "}
                <Link to="/login" className="register__login">Sign In</Link>
            </p>
        </div>
    );
}

export default Register;
