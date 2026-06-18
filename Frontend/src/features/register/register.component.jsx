import React from 'react';
import axios from 'axios'
import { useState } from 'react';
import './register.component.css';
import logo from '../../assets/icons/MainLogo.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/common/loading/loading';

const RegisterComponent = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profilePic: ''
    });

    const data = new FormData();

    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('profilePic', formData.profilePic);

    const handleChange = ((e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    });

    const handleFileChange = (e) => {
        setFormData(prev => ({
            ...prev,
            profilePic: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            setLoading(false)
            return
        }

        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/user/register',
                data,
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            navigate('/');

            localStorage.setItem(
                'user',
                JSON.stringify(response.data.user)
            )

            navigate('/');
        } catch (err) {

            // Network error
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

            const status = err.response.status;

            // Form-related errors stay on the page
            if (status === 400 || status === 401 || status === 409) {
                err.response.data.message ||
                    'Registration failed.'

                return;
            }

            // Serious errors go to error page
            navigate('/error', {
                state: {
                    error: {
                        code: status,
                        title: 'Registration Failed',
                        message:
                            err.response.data.message ||
                            'Unable to create account.'
                    }
                }
            });
        }
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(prev => !prev)
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(prev1 => !prev1)
    }

    if (loading) {
        return (
            <Loading
                title="Creating Account"
                message="Uploading profile and creating your account"
            />
        );
    }

    return (
        <>
            <section className="register">
                <div className="col-1">
                    <div className="back-to-home-container">
                        <Link to='/'><i class="ri-arrow-left-long-line"></i></Link>
                    </div>
                    <img src={logo} alt="Main Logo" />

                    <h1>Create Account</h1>

                    <p>Register and be a part of our <span>Comminity.</span></p>
                </div>

                <div className="col-2">
                    <form className="auth-form" onSubmit={handleSubmit}>

                        <div className="top-form">
                            <h2>Register</h2>
                            <p>Create your account to get started.</p>
                        </div>

                        <div className="input-container">
                            <div className="form-group">

                                <input
                                    id="username"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder=' '
                                />

                                <i className="ri-user-fill"></i>

                                <label htmlFor="username">
                                    Username
                                </label>

                            </div>

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

                            <div className="form-group">

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

                            <div className="form-group">

                                <input
                                    id="confirmPassword"
                                    type={
                                        showConfirmPassword ? 'text' : 'password'
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder=' '
                                />

                                <i className={showConfirmPassword ? "ri-eye-off-line" : "ri-eye-line"} onClick={toggleConfirmPassword}></i>

                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                            </div>

                            <div className="form-group">
                                <label htmlFor="profilePic" className="file-upload-btn">
                                    Choose Profile Picture
                                </label>

                                <input
                                    type="file"
                                    name="profilePic"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className='file-upload'
                                />
                            </div>
                        </div>

                        <div className="check-input">
                            <input type="checkbox" required />

                            <label>I agree to the <Link target='_blank' to='/privacy' className='terms'>Privacy policy, </Link> <Link target='_blank' to='/terms-conditions' className='terms'>Terms & Conditions</Link></label>
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                        >
                            Create Account
                        </button>

                    </form>

                    <footer className="auth-footer">
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </footer>
                </div>
            </section>
        </>
    )
}

export default RegisterComponent
