import React from 'react';
import './skills.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { getSkillAnalytics } from '../../../services/project.service';

const Skills = () => {

    const [skills, setSkills] = useState([]);

    useEffect(() => {

        const fetchSkills = async () => {

            const data =
                await getSkillAnalytics();

            setSkills(data);
        };

        fetchSkills();

    }, []);

    const skillIcons = {
        Environment: "ri-painting-line",
        Character: "ri-user-3-line",
        Architecture: "ri-building-line",
        Weapon: "ri-sword-line",
        Prop: "ri-box-3-line",
        Vehicle: "ri-car-line"
    };

    const tools = [
        {
            icon: 'ri-blender-line',
            caption: 'Blender'
        },
    ]
    return (
        <section className='skill'>
            <div className="header">
                <h2>MY SKILLS</h2>
            </div>
            <div className="skill-container">

                {skills.map((skill) => (
                    <div
                        className="skill-card"
                        key={skill.title}
                    >
                        <div className="card-data">

                            <div className="card-head">
                                <i
                                    className={
                                        skillIcons[skill.title]
                                    }
                                ></i>

                                <h3>{skill.title}</h3>
                            </div>

                            <p>{skill.percentage}%</p>

                        </div>

                        <div
                            className="slider"
                            style={{
                                "--slide":
                                    `${skill.percentage}%`
                            }}
                        ></div>

                    </div>
                ))}
            </div>

            <div className="tools-container">
                <div className="tool-head">
                    <h2>TOOLS I USE</h2>
                </div>

                <div className="tool-card-container">
                    {tools.map((toolCard) => {
                        return (
                            <div className="tool-card">
                                <i className={toolCard.icon}></i>
                                <p>{toolCard.caption}</p>
                            </div>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}

export default Skills
