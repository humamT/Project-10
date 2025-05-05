import React, { useEffect, useState } from 'react';
import './user.css';

const User = function () {
    const [accounts, setAccounts] = useState([]);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Fetch user and account data from backend
        const fetchData = async () => {
            try {
                const userResponse = await fetch('/api/user'); // Replace with actual API endpoint
                const userData = await userResponse.json();

                const accountsResponse = await fetch('/api/accounts'); // Replace with actual API endpoint
                const accountsData = await accountsResponse.json();

                setUserName(userData.name);
                setAccounts(accountsData.accounts);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <main className="main bg-dark">
            <div className="header">
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