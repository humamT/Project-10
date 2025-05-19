import React, { useEffect, useState } from 'react';
import './user.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProfile, setToken } from '../features/user/userSlice';
import Edit from '../components/Edit/Edit';

const User = function () {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tokenFromRedux = useSelector((state) => state.user.token);
    const token = tokenFromRedux || localStorage.getItem('token');

    const [accounts, setAccounts] = useState([]);
    const [userName, setUserName] = useState('');

    const [showEdit, setShowEdit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (!tokenFromRedux && localStorage.getItem('token')) {
            dispatch(setToken(localStorage.getItem('token')));
        }

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
                    const { firstName, lastName, userName, accounts } = data.body;
                    setFirstName(firstName);
                    setLastName(lastName);
                    setUserName(userName || `${firstName} ${lastName}`);
                    dispatch(setProfile(data.body));

                    if (accounts && Array.isArray(accounts)) {
                        const formattedAccounts = accounts.map(acc => ({
                            title: acc.accountType || acc.title || acc.name,
                            amount: acc.balance || acc.amount || parseFloat(acc.solde?.replace(/,/g, '') || 0),
                            description: acc.balanceType || acc.description || acc.balance,
                        }));
                        setAccounts(formattedAccounts);
                    } else {
                        setAccounts([]);
                    }
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
                <h1>Welcome back<br />{userName}</h1>
                <button className="edit-button" onClick={() => setShowEdit(true)}>Edit Name</button>
                <Edit
                    open={showEdit}
                    onClose={() => setShowEdit(false)}
                    token={token}
                    firstName={firstName}
                    lastName={lastName}
                    userName={userName}
                    setUserName={setUserName}
                />
            </div>
            <h2 className="sr-only">Accounts</h2>
            <div className="account-content-wrapper">
                {accounts.map((account, index) => (
                    <section className="account" key={index}>
                        <div className="account-content-wrapper">
                            <h3 className="account-title">{account.title}</h3>
                            <p className="account-amount">${account.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p className="account-amount-description">{account.description}</p>
                        </div>
                        <div className="account-content-wrapper cta">
                            <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
};

export default User;