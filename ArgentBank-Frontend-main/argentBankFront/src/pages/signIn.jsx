import React, { useState } from 'react';
import './signIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const SignIn = function () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const token = data.body.token;
                localStorage.setItem("token", token);
                navigate("/user");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Network error");
        }
    };

    return (
        <div className="sign-in-page">
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <FontAwesomeIcon icon={faCircleUser} />
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="sign-in-button">
                            Sign In
                        </button>
                    </form>
                </section>
            </main>
        </div>
    );
};

export default SignIn;