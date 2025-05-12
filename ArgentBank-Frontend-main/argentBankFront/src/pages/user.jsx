import React, { useEffect, useState } from 'react';
import './user.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfile, setToken } from '../features/user/userSlice';

const User = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tokenFromRedux = useSelector((state) => state.user.token);
    const token = tokenFromRedux || localStorage.getItem('token');

    const [accounts, setAccounts] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // If token is found in localStorage but not in Redux, dispatch it to Redux
        if (!tokenFromRedux && localStorage.getItem('token')) {
            dispatch(setToken(localStorage.getItem('token')));
        }

        // Redirect to index page if no token is found
        if (!token) {
            navigate('/');
            return;
        }

        const fetchUserProfile = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    const { firstName, lastName } = data.body;
                    setUserName(`${firstName} ${lastName}`);
                    dispatch(setProfile(data.body));

                    // Dummy account data for testing
                    setAccounts([
                        {
                            title: 'Checking Account (x8349)',
                            amount: 2082.79,
                            description: 'Available balance',
                        },
                        {
                            title: 'Savings Account (x6712)',
                            amount: 10928.42,
                            description: 'Available balance',
                        },
                        {
                            title: 'Credit Card (x8349)',
                            amount: 184.30,
                            description: 'Current balance',
                        },
                    ]);
                } else {
                    console.error("Profile fetch failed:", data.message);
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, [token, tokenFromRedux, dispatch, navigate]);

    return (
        <main className="main bg-dark">
            <div className="user-header">
                <h1>Welcome back<br />{userName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts.map((account, index) => (
                <section className="account" key={index}>
                    <div className="account-content-wrapper">
                        <h3 className="account-title">{account.title}</h3>
                        <p className="account-amount">${account.amount.toFixed(2)}</p>
                        <p className="account-amount-description">{account.description}</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            ))}
        </main>
    );
};

export default User;