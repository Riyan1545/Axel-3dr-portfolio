import { useEffect, useState } from 'react';
import { getPublicProjects } from '../../services/project.service';
import { Link } from 'react-router-dom';

const WorkProjects = ({ category }) => {

    const [projects, setProjects] = useState([]);

    useEffect(() => {

        const fetchProjects = async () => {

            try {

                const data =
                    await getPublicProjects(
                        category
                    );

                setProjects(data);

            } catch (err) {

                console.log(err);

            }
        };

        fetchProjects();

    }, [category]);

    return (
        <div className="projects-grid">

            {projects.map(project => (

                <Link key={project._id} to={`/project/${project.slug}`}>
                    <div
                        className="project-card"
                    >
                        <img
                            src={
                                project.thumbnail?.url
                            }
                            alt={project.title}
                        />

                        <h3>{project.title}</h3>

                        <p>
                            {project.category}
                        </p>

                    </div>
                </Link>

            ))}

        </div>
    );
};

export default WorkProjects;