import React from 'react';
import './project.card.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '../../../services/project.service';
import thumbnail from '../../../assets/images/default-thumbnail.svg';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const deleteMutation = useMutation({
        mutationFn: deleteProject,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['projects'],
            });
        }
    });

    const handleDelete = () => {

        const confirmed = window.confirm(
            `Delete "${project.title}"?`
        );

        if (!confirmed) return;

        deleteMutation.mutate(project._id);
    };



    return (
        <div className="admin-project-card">
            <img src={project.thumbnail?.url ?? thumbnail} alt={project.title} />

            <div className="project-card-wrapper">

                <div className="project-card-info">
                    <div className="card-left">
                        <h3>{project.title}</h3>
                        <p>{project.category}</p>
                        <small>{project.description}</small>
                    </div>

                    <div className="card-right">
                        {project.isPublished ? (
                            <div className="card-published">
                                <h5 id='published-h5'><i class="ri-circle-fill"></i> Published</h5>
                            </div>
                        ) : (
                            <div className="card-published">
                                <h5><i class="ri-circle-fill"></i> Draft</h5>
                            </div>
                        )
                        }

                        {project.featured ? (
                            <span className='featured-span'>
                                <i className="ri-star-s-line"></i> Featured
                            </span>
                        ) : (
                            ""
                        )
                        }
                    </div>
                </div>

                <div className="project-card-bottom">
                    <div className="views-container">

                        <p><i className="ri-eye-line"></i> {project.views >= 1000 ? (project.views / 1000) + 'k' : project.views}</p>

                        <p><i className="ri-heart-3-line"></i> {project.likes >= 1000 ? (project.likes / 1000) + 'k' : project.likes}</p>
                    </div>

                    <div className="edit-features">
                        <button onClick={() =>
                            navigate(`/admin/edit-project/${project._id}`)
                        } className="ri-pencil-fill"></button>

                    <button onClick={handleDelete} className="ri-delete-bin-7-line"></button>
                </div>
            </div>

        </div>
        </div >
    )
}

export default ProjectCard
