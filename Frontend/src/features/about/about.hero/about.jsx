import React from 'react';
import './about.css'
import Profile from '../../../assets/images/AboutPic.png'

const About = () => {

    const qualities = [
        {
            head: '3+',
            caption: 'Years Experience'
        },
        {
            head: '50+',
            caption: 'Projects Completed'
        },
        {
            head: '20+',
            caption: 'Happy Clients'
        },
    ]
    return (
        <section className='about'>
            <div className="about-container">
                <div className="about-content">

                    <span className="about-tag">
                        ABOUT ME
                    </span>

                    <h1>
                        Passionate About Creation
                    </h1>

                    <p>
                        I'am a 3D Artist with a strong passion for creating high-quality, real-time assets adn immersive environments. I love turning ideas into visuals that tell a story
                    </p>

                    <div className="qualification-container">
                        {qualities.map((card) => {
                            return (
                                <div className="quality-holder">
                                    <h1>{card.head}</h1>
                                    <p>{card.caption}</p>
                                </div>
                            )
                        })}

                    </div>

                </div>

                <div className="profile-container">
                    <img src={Profile} alt="" className='profile' />
                </div>
            </div>
        </section>
    )
}

export default About
