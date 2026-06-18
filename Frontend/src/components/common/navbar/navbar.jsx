import React from 'react'
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "./navbar.css";
import axios from 'axios'
import Loading from '../loading/loading';

import logo from '../../../assets/icons/MainLogo.png'

import defaultProfile from '../../../../public/images/user-3-fill.png';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [showMenu, setShowMenu] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, []);

    const handleLogout = async () => {

        setLoading(true);

        try {
            await axios.get(
                `${import.meta.env.VITE_API_URL}/api/auth/user/logout`,
                {
                    withCredentials: true
                }
            );

            localStorage.removeItem('user');
            setUser(null);

            navigate('/');

        } catch (err) {

            if (!err.response) {
                navigate('/error', {
                    state: {
                        error: {
                            code: 'NETWORK_ERROR',
                            title: 'Connection Failed',
                            message: 'Unable to connect to the server.'
                        }
                    }
                });

                return;
            }

            navigate('/error', {
                state: {
                    error: {
                        code: err.response?.data?.code || err.response?.status,
                        title: err.response?.data?.title || 'Logout Failed',
                        message: err.response?.data?.message || 'Unable to logout.'
                    }
                }
            });

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Loading
                title="Logging Out"
                message="Signing you out of your account"
            />
        );
    }

    return (
        <div>
            <header className='navbar'>

                {showLogout && (
                    <div className="logout-box">
                        <div className="logout-btn-container">
                            <button onClick={() => { setShowLogout(prev => !prev) }}>Cancle</button>

                            <button onClick={() => { handleLogout(), setShowLogout(prev => !prev) }}>Logout</button>
                        </div>
                    </div>
                )}

                <div className='navbar-container'>

                    <div className="logo-container">
                        <Link to='/'>
                            <img src={logo} alt="Logo" className='logo' />
                        </Link>
                    </div>

                    <div className="link-container">
                        <nav className={`nav-menu ${menuOpen ? "active" : ""}`}>
                            <NavLink to="/" onClick={() => setMenuOpen(false)} className="nav-link">
                                <span>Home</span>
                            </NavLink>

                            <NavLink to="/about" onClick={() => setMenuOpen(false)} className="nav-link">
                                <span>About</span>
                            </NavLink>

                            <NavLink to="/work" onClick={() => setMenuOpen(false)} className="nav-link">
                                <span>Work</span>
                            </NavLink>

                            {user?.isAdmin && (
                                <NavLink to="/admin/dashboard" onClick={() => setMenuOpen(false)} className="nav-link">
                                    <span>Admin Dashboard</span>
                                </NavLink>
                            )}

                            {user ? (
                                <div className='profile-icon-container'>

                                    <div className='user-avatar'>
                                        <img src={user.profilePic ||
                                            defaultProfile}
                                            alt="Profile"
                                            onClick={() => setShowMenu(prev => !prev)}
                                        />

                                        {showMenu && (
                                            <div className="drop-box">
                                                <button className='logout-btn' onClick={() => setShowLogout(prev => !prev)}><i className="ri-logout-circle-line"></i> Logout</button>
                                                <div onClick={() => setShowMenu(prev => !prev)} className="close-box"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to="/register"
                                    className="auth-link"
                                >
                                    Register / Login
                                </Link>
                            )}

                        </nav>

                        <button
                            className="menu-toggle"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <i className="ri-close-line"></i> : <i className="ri-menu-line"></i>}
                        </button>
                    </div>

                </div>
            </header>
        </div>
    )
}

export default Navbar
