import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faSignOut as faSignOut } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/user/userSlice';
import './header.css';
import logo from '../../assets/images/argentBankLogo.png';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    const profile = useSelector((state) => state.user.profile); // Get the user's profile from Redux

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token'); // Clear token from localStorage
        navigate('/'); // Redirect to the home page
    };

    return (
        <header className="header">
            <nav className="header-nav">
                <NavLink to="/" className="header-nav-logo">
                    <img src={logo} alt="Argent Bank Logo" />
                </NavLink>
                <div className="header-nav-right">
                    {token ? (                                                          //if token is present, show user info and logout button
                        <div className="header-user-info">
                            <div className='username'>
                            <FontAwesomeIcon icon={faCircleUser} />
                            <span className="header-username">{profile?.firstName}</span>
                            </div>
                            <div className='logout'>
                            <FontAwesomeIcon icon={faSignOut} />
                            <button onClick={handleLogout} className="header-nav-item">
                                Sign Out
                            </button>
                            </div>
                        </div>
                    ) : (                                                               //if token is not present, show sign in button
                        <NavLink to="/signin" className="header-nav-item">
                            <FontAwesomeIcon icon={faCircleUser} />
                            Sign In
                        </NavLink>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;