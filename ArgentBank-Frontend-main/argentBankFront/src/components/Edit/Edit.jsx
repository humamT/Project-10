import React, { useState } from 'react';
import './Edit.css';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../../features/user/userSlice';

const Edit = ({ open, onClose, token, firstName, lastName, userName, setUserName }) => {
    const dispatch = useDispatch();
    const [newUserName, setNewUserName] = useState(userName || '');
    const [error, setError] = useState('');

    if (!open) return null;

    const handleSave = async () => {
        setError('');
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userName: newUserName }),
            });
            const data = await response.json();
            if (response.ok) {
                setUserName(newUserName);
                dispatch(setProfile(data.body));
                onClose();
            } else {
                setError(data.message || "Failed to update username");
            }
        } catch (err) {
            setError("Network error");
        }
    };

    return (
        <div className="edit-popup-overlay">
            <div className="edit-popup">
                <h2>Edit Profile</h2>
                <div className="edit-field">
                    <label>First Name</label>
                    <input type="text" value={firstName} disabled />
                </div>
                <div className="edit-field">
                    <label>Last Name</label>
                    <input type="text" value={lastName} disabled />
                </div>
                <div className="edit-field">
                    <label>User Name</label>
                    <input
                        type="text"
                        value={newUserName}
                        onChange={e => setNewUserName(e.target.value)}
                    />
                </div>
                {error && <div className="edit-error">{error}</div>}
                <div className="edit-actions">
                    <button className="edit-button" onClick={handleSave}>Save</button>
                    <button className="edit-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default Edit;