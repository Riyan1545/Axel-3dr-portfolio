import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardGraph from '../../../components/admin/DashboardGraph';
import { getDashboardAnalytics } from '../../../services/project.service';
import './dashboard.css';
import { getProjects, getProjectStats, getRecentProjects } from '../../../services/project.service';
import Loading from '../../../components/common/loading/loading';
import defaultThumbnail from '../../../assets/images/default-thumbnail.svg';

const Dashboard = () => {

    const [analytics, setAnalytics] = useState([]);
    const [stats, setStats] = useState(null);
    const [user, setUser] = useState(null);
    const [showLogout, setShowLogout] = useState(false);
    const [loading, setLoading] = useState(false);
    const [recentProjects, setRecentProjects] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        const fetchStats = async () => {
            try {
                const data = await getProjectStats();
                const { _id, ...cleanStats } = data;
                setStats(cleanStats);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchRecentProjects = async () => {
            try {
                const data = await getRecentProjects();
                setRecentProjects(data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchAnalytics = async () => {
            try {
                const data = await getDashboardAnalytics();

                setAnalytics(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchStats();
        fetchRecentProjects();
        fetchAnalytics();

    }, []);

    const getTimeAgo = (date) => {
        const diff = Date.now() - new Date(date).getTime();

        const hours = Math.floor(diff / (1000 * 60 * 60));

        if (hours < 1) {
            const mins = Math.floor(diff / (1000 * 60));
            return `${mins} min ago`;
        }

        return `${hours} hr ago`;
    };

    const topCard = [
        {
            icon: 'ri-trello-line',
            head: stats?.totalProjects || 0,
            caption: 'Total Project'
        },
        {
            icon: 'ri-star-line',
            head: stats?.featured || 0,
            caption: 'Featured Projects'
        },
        {
            icon: 'ri-draft-line',
            head: stats?.drafts || 0,
            caption: 'Draft Projects'
        },
        {
            icon: 'ri-eye-line',
            head: stats?.totalViews || 0,
            caption: 'Total Views'
        },
    ];

    if (!user || !stats) {
        return <Loading />
    }

    return (
        <section className='admin-dashboard'>

            <div className="admin-header">
                <div className="admin-col-1">
                    <h2>Welocome Back,</h2>
                    <h1>Admin</h1>
                    <p>Here's what's happening with your portfolio today.</p>
                </div>

                <div className="admin-col-2">
                    <button>
                        <i className="ri-notification-3-line"></i>
                    </button>

                    <div className='profile-icon-container'>

                        <div className='user-avatar'>
                            <img src={user.profilePic ||
                                defaultProfile}
                                alt="Profile"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-dashboard-content">
                <div className="admin-progress-container">
                    {topCard.map((card, index) => {
                        return (
                            <div className='admin-card' key={index}>
                                <i className={card.icon}></i>

                                <div className="admin-card-info">
                                    <h1>{card.head}</h1>
                                    <p>{card.caption}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="project-track-container">
                    <div className="recent-projects">
                        <div className="recent-project-header">
                            <h3>Recent Projects</h3>

                            <small><Link replace to='/admin/manage-projects'>VIEW ALL</Link></small>
                        </div>

                        <div className="recent-project-cards">
                            {recentProjects.map((project) => (
                                <div
                                    className="recent-card"
                                    key={project._id}
                                >
                                    <img
                                        src={project.thumbnail?.url ?? defaultThumbnail}
                                        alt={project.title}
                                    />

                                    <div className="recent-card-info">
                                        <div className="recent-card-info-headers">
                                            <h5>{project.title}</h5>
                                            <h6>{project.category}</h6>
                                        </div>

                                        <div className="recent-card-info-time">
                                            <small>
                                                {getTimeAgo(project.createdAt)}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="portfolio-view-graph">

                        <div className="graph-header">
                            <h3>Projects Uploaded</h3>
                            <small>Monthly Activity</small>
                        </div>

                        <DashboardGraph
                            data={analytics}
                        />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard
