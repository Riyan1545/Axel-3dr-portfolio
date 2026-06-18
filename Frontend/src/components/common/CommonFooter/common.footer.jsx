import React from 'react'
import { Link, NavLink } from "react-router-dom";
import footerLogo from '../../../assets/icons/MainLogo.png';
import './common.footer.css'

const CommonFooter = () => {
    const links = [
        {
            link: 'Home',
            src: '/'
        },
        {
            link: 'About',
            src: '/about'
        },
        {
            link: 'Work',
            src: '/work'
        },
    ];

    const about = [
        {
            content: 'Privacy',
            src: '/privacy'
        },
        {
            content: 'Terms & Conditions',
            src: '/terms-conditions'
        },
    ]

    const socials = [
        {
            src: 'https://discord.com/channels/@axel.3d',
            icon: 'ri-discord-fill'
        },
        {
            src: 'https://instagram.com/axel.3dr/',
            icon: 'ri-instagram-line'
        },
        {
            src: '#',
            icon: 'ri-twitter-x-line'
        }
    ]
    return (
        <div>
            <section className='common-footer'>
                <div className="two-section-container">
                    <div className="top-footer">
                        <div className="col-1 common-coloumn">
                            <img src={footerLogo} alt="footerLogo" className='footer-logo' />
                            <p>I create 3D models and environments that brings ideas to life.</p>
                        </div>
                        <div className="about-col-2 common-coloumn">
                            <h2>LINKS</h2>
                            {links.map((link) => {
                                return (<Link to={link.src} className='footer-links'>{link.link}</Link>)
                            })}
                        </div>
                        <div className="col-about common-coloumn">
                            <h2>ABOUT US</h2>
                            {about.map((link) => {
                                return (<Link target='_blank' to={link.src} className='footer-links'>{link.content}</Link>)
                            })}
                        </div>
                        <div className="col-3 common-coloumn">
                            <h2>CONTACT</h2>

                            <p>axel.3d@gmail.com</p>

                            <div className="social-container">
                                {socials.map((link) => {
                                    return (
                                        <Link target='_blank' className='social' to={link.src}><i className={link.icon}></i></Link>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="bottom-footer">
                        <p>&copy; 2026 AXEL. All rights reserved.</p>
                        <p className='left-p'>Designed & Built with Passion <i className="ri-heart-2-line"></i></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CommonFooter
