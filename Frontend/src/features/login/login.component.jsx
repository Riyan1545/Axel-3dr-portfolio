import React from 'react';
import axios from 'axios'
import { useState } from 'react';
import './login.component.css';
import logo from '../../assets/icons/MainLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../../components/common/loading/loading';

const LoginComponent = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const [rememberMe, setRememberMe] = useState(false)

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/user/login`,
                {
                    email: formData.email,
                    password: formData.password,
                    rememberMe
                },
                {
                    withCredentials: true
                }
            );

            navigate('/')

            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            );

            navigate('/');

        } catch (err) {
            navigate('/error', {
                state: {
                    error: {
                        title: 'Login Failed',
                        message:
                            err.response?.data?.message ||
                            'Unable to login to your account.'
                    }
                }
            });
        }
    }

    const togglePassword = () => {
        setShowPassword(prev => !prev)
    }

    if (loading) {
        if (loading) {
            return (
                <Loading
                    title="Logging In"
                    message="Verifying your credentials"
                />
            );
        }
    }

    return (
        <>
            <section className="login">
                <div className="login-col-1">

                    <div className="back-to-home-container">
                        <Link to='/'><i class="ri-arrow-left-long-line"></i></Link>
                    </div>
                    
                    <img src={logo} alt="Main Logo" />

                    <h1>Welocme Back</h1>

                    <p>Login to your account to continue your creative journey.</p>
                </div>

                <div className="login-col-2">
                    <form className="auth-form" onSubmit={handleSubmit}>

                        <div className="top-form">
                            <h2>Login</h2>
                            <p>Enter your credentials to get started.</p>
                        </div>

                        <div className="input-container">

                            <div className="form-group">

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder=' '
                                />

                                <i className="ri-mail-fill"></i>

                                <label htmlFor="email">
                                    Email Address
                                </label>
                            </div>

                            <div className="login-form-group">

                                <input
                                    id="password"
                                    type={
                                        showPassword ? 'text' : 'password'
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder=' '
                                />

                                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"} onClick={togglePassword}></i>

                                <label htmlFor="password">
                                    Password
                                </label>
                            </div>
                        </div>

                        <div className="check-input">
                            <input type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)} />

                            <label>Remember Me</label>
                        </div>

                        <button
                            type="submit"
                            className="login-submit-btn"
                        >
                            Login
                        </button>

                    </form>

                    <footer className="login-auth-footer">
                        <p>
                            Don't have an account? <Link to="/register">Sign up</Link>
                        </p>
                    </footer>
                </div>
            </section>
        </>
    )
}

export default LoginComponent
