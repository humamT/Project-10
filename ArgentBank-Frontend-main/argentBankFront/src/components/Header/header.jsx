import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import './header.css';
import logo from '../../assets/images/argentBankLogo.png';

const Header = () => {
    return (
        <header className='header'>
            <nav className="header-nav">

                <NavLink to='/' className="header-nav-logo">
                    <img src={logo} alt="Argent Bank Logo" />
                </NavLink>

                <div>
                    <NavLink to='/signin' className="header-nav-item">
                        <FontAwesomeIcon icon={faCircleUser} />
                        Sign In
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;