import React from 'react'
import './sidebar.css'
import Logo from '../../../assets/icons/MainLogo.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../../common/loading/loading';

import { NavLink } from 'react-router-dom';

const Sidebar = () => {

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [activeLink, setActiveLink] = useState(false);
    const [openLogout, setOpenLogout] = useState(false)

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
        <aside className="sidebar">

            <div className="top-sidebar">

                <div className="top-sidebar-header top-sidear-col">
                    <img src={Logo} alt="Main-Logo" />
                    <h3>Admin Panel</h3>
                </div>

                <div className="top-sidebar-links top-sidear-col">
                    <nav className={`side-nav-links ${activeLink ? "active-link" : ""}`}>
                        <NavLink to="/admin/dashboard" onClick={() => setActiveLink(false)} className="side-link">
                            <i className="ri-home-9-line"></i> Dashboard
                        </NavLink>

                        <NavLink to="/admin/create-project" onClick={() => setActiveLink(false)} className="side-link">
                            <i className="ri-sticky-note-add-line"></i> Create Project
                        </NavLink>

                        <NavLink to="/admin/manage-projects" onClick={() => setActiveLink(false)} className="side-link">
                            <i className="ri-layout-2-line"></i> Manage Projects
                        </NavLink>

                        <NavLink to="/" onClick={() => setActiveLink(false)} className="side-link">
                            <i className="ri-arrow-left-circle-line"></i> Home
                        </NavLink>
                    </nav>
                </div>
            </div>

            <div className="bottom-sidebar">
                <button className='admin-logout-btn' onClick={() => { setOpenLogout(true) }}><i className="ri-logout-box-line"></i> Logout</button>
            </div>

            {openLogout && (
                <div className="sidebar-logout-box">
                    <div className="sidebar-logout-btn-container">
                        <button onClick={() => { setOpenLogout(prev => !prev) }}>Cancle</button>

                        <button onClick={() => { handleLogout(), setOpenLogout(prev => !prev) }}>Logout</button>
                    </div>
                </div>
            )}

        </aside>
    );
};

export default Sidebar;
