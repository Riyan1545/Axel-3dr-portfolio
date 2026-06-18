import React from 'react'
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from 'react';

import "swiper/css";
import "swiper/css/navigation";
import './feature.css'

import defaultThumbnail from '../../../assets/images/default-thumbnail.svg';
import { getFeaturedProjects } from '../../../services/project.service';

const Feature = () => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchFeaturedProjects = async () => {
            try {
                const data = await getFeaturedProjects();
                setProjects(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchFeaturedProjects();
    }, []);
    return (
        <section className='feature' id='feature'>
            <div className="feature-container">
                <div className="top-div">
                    <h2>FEATURED WORK</h2>

                    <Link to='/work' className='view'>VIEW ALL WORK</Link>
                </div>

                <div className="home-work-container">
                    {projects.map((project) => (
                        <Link
                            key={project._id}
                            to={`/project/${project.slug}`}
                            className="feature-project-link"
                        >
                            <div className="card">
                                <img
                                    src={
                                        project.thumbnail?.url ||
                                        defaultThumbnail
                                    }
                                    alt={project.title}
                                />

                                <div className="card-info">
                                    <div className="first-coloumn">
                                        <h3>{project.title}</h3>
                                        <p>{project.category}</p>
                                    </div>

                                    <div className="second-coloumn">
                                        <i className="ri-arrow-right-up-long-line"></i>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Feature
