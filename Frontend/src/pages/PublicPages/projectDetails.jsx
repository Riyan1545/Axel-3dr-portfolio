import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../styles/project.page.css';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../../assets/images/default-thumbnail.svg';
import { likeProject } from '../../services/project.service';

import {
    getProjectBySlug,
    incrementView
} from '../../services/project.service';

import Loading from '../../components/common/loading/loading';

const ProjectDetails = () => {

    const { slug } = useParams();

    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [liked, setLiked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {

        const fetchProject = async () => {

            try {

                const data = await getProjectBySlug(slug);

                setProject(data);

                const viewedProjects =
                    JSON.parse(localStorage.getItem("viewedProjects"))
                    || [];

                if (!viewedProjects.includes(data._id)) {

                    await incrementView(data._id);

                    viewedProjects.push(data._id);

                    localStorage.setItem(
                        "viewedProjects",
                        JSON.stringify(viewedProjects)
                    );
                }

                const likedProjects =
                    JSON.parse(
                        localStorage.getItem('likedProjects')
                    ) || [];

                setLiked(
                    likedProjects.includes(
                        String(data._id)
                    )
                );

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }
        };

        fetchProject();

    }, [slug]);

    useEffect(() => {
        if (project?.thumbnail?.url) {
            setSelectedImage(project.thumbnail.url);
        }
    }, [project]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(project.projectUrl);

            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);

        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {

        if (liked) return;

        try {

            const updated =
                await likeProject(project._id);

            setProject(updated);

            const likedProjects =
                JSON.parse(
                    localStorage.getItem('likedProjects')
                ) || [];

            likedProjects.push(
                String(project._id)
            );

            localStorage.setItem(
                'likedProjects',
                JSON.stringify(likedProjects)
            );

            setLiked(true);

        } catch (err) {

            console.log(err);

        }
    };

    if (loading) {
        return <Loading />;
    }

    if (!project) {
        return <Loading />
    }

    const tags = project?.tags || ["none"];

    return (
        <div className='project-display-container'>
            <div className="project-display-left">
                <Link className='back-to-work' to="/"><i className="ri-arrow-left-line"></i></Link>
                <div className="project-display-left-header">

                    <p>{project.category}</p>

                    <h1>{project.title}</h1>
                </div>

                <div className="project-display-images">
                    <div className="project-thumbnail-display">
                        <img
                            src={selectedImage || defaultThumbnail}
                            alt={project.title}
                        />
                    </div>

                    <div className="gallery-conatiner-left">
                        <div className="gallery-header">
                            <h3>Gallery</h3>
                        </div>

                        <div className="project-gallery-display">
                            {project.gallery?.map((image) => (
                                <div
                                    key={image.fileId}
                                    className={`gallery-card ${selectedImage === image.url ? 'active' : ''
                                        }`}
                                    onClick={() => setSelectedImage(image.url)}>
                                    <img
                                        src={image.url}
                                        alt={project.title} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="project-display-right">
                <div className="project-display-right-header">
                    <h3>PROJECT INFO</h3>

                    <div className="project-display-right-info">
                        <div className="project-display-right-key key-value-info-box">
                            <p><i className="ri-menu-search-line"></i> Category</p>
                            <p><i className="ri-time-line"></i> Completed</p>
                            <p><i className="ri-tools-line"></i> Tools Used</p>
                        </div>

                        <div className="project-display-right-value key-value-info-box">
                            <p>{project.category}</p>
                            <p>
                                {new Date(
                                    project.createdAt
                                ).toLocaleDateString()}
                            </p>
                            <p>
                                {project.softwareUsed?.join(", ") || "none"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="project-display-right-description">
                    <h3>DESCRIPTION</h3>

                    <small>
                        {project.description}
                    </small>
                </div>

                <div className="project-display-right-input">
                    <h3>PROJECT URL</h3>

                    <div className="project-link-container" onClick={handleCopy}>
                        <small id="project-url-small">
                            {project.projectUrl}
                        </small>
                        <i className={
                            copied
                                ? "ri-check-line"
                                : "ri-file-copy-line"
                        }
                            onClick={handleCopy}></i>
                    </div>
                </div>

                <div className="project-display-right-tags">
                    <h3>TAGS</h3>

                    <div className="project-tag-container">
                        {tags.map((tag, index) => (
                            <p key={index} id="project-tag">
                                {tag}
                            </p>
                        ))}


                    </div>
                </div>

                <div className="project-botton-container">
                    <button
                        onClick={handleLike}
                        disabled={liked}
                    >
                        <i
                            className={
                                liked
                                    ? "ri-heart-fill"
                                    : "ri-heart-line"
                            }
                        ></i>

                        {liked
                            ? `LIKED (${project.likes})`
                            : `LIKE (${project.likes})`}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails
