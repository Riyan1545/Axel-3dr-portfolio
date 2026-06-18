import React from 'react';
import { Link } from "react-router-dom";
import './hero.css';
import hero from '../../../assets/images/Hero.png';
import Button2 from '../../../components/common/button/button2';

const Hero = () => {
  return (
    <div>
      <section className="hero">
      <div className="hero-container">

        <div className="hero-content">

          <span className="hero-tag">
            3D ARTIST • ENVIRONMENT DESIGNER
          </span>

          <h1>
            Bringing
            Ideas
            Into
            <span> Reality</span>
          </h1>

          <p>
            I create high-quality 3D models,
            game-ready assets and cinematic
            environments with a focus on detail,
            storytelling and visual impact.
          </p>

          <div className="hero-actions">
            <Link to="/work" className="primary-btn">
              <Button2 content='VIEW MY WORK' icon='ri-arrow-right-long-line'/>
            </Link>

            <a href='#feature' className="secondary-btn">
              SCROLL DOWN <i class="ri-arrow-down-s-line"></i>
            </a>
          </div>

        </div>
        

      </div>
    </section>
    </div>
  )
}

export default Hero
