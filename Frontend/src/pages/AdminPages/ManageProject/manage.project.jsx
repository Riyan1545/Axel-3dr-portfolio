import React from 'react';
import './manage.project.css';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useProjects } from '../../../hooks/useProjects.js';
import Loading from '../../../components/common/loading/loading.jsx';
import ProjectCard from './project.card.jsx'

const ManageProject = () => {

  const [searchInput, setSearchInput] = useState('');

  const searchInputRef = useRef(null);

  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
    search: '',
    category: '',
    featured: '',
    isPublished: ''
  });

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: searchInput,
        page: 1
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const { data, isLoading, error } = useProjects(filters);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [data]);


  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className='error-load-project'>
        Failed to load projects
      </div>
    )
  }

  return (
    <section className='manage-project'>

      <div className="manage-header">
        <div className="manage-col-1">
          <h1>Manage Projects</h1>
          <p>View, edit and manage all your portfolio projects.</p>
        </div>

        <div className="manage-col-2">
          <Link to='/admin/create-project'><i class="ri-add-line"></i> ADD NEW PROJECT</Link>
        </div>
      </div>

      <div className="manage-project-links">

        <div className="manage-left">
          <form>
            <input
              ref={searchInputRef}
              id="manage-search-input"
              type="text"
              placeholder="Search projects..."
              value={searchInput}
              onChange={handleSearch}
            />
          </form>
        </div>

        <div className="manage-right">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters(prev => ({
                ...prev,
                category: e.target.value,
                page: 1
              }))
            }
          >
            <option value="">All Categories</option>
            <option value="Character">Character</option>
            <option value="Environment">Environment</option>
            <option value="Creature">Creature</option>
            <option value="Prop">Prop</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Architecture">Architecture</option>
            <option value="Weapon">Weapon</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={filters.isPublished}
            onChange={(e) =>
              setFilters(prev => ({
                ...prev,
                isPublished: e.target.value
              }))
            }
          >
            <option value="">All Projects</option>
            <option value="true">Published</option>
            <option value="false">Drafts</option>
          </select>
        </div>
      </div>

      <div className="manage-project-container">

        {data?.projects?.map(project => (
          <ProjectCard
            key={project._id}
            project={project}
          />
        ))}

        <Link to='/admin/create-project' className="null-create-card">
          <i className="ri-folder-add-line"></i>

          <p>Add New Project</p>
        </Link>

      </div>
    </section>
  )
}

export default ManageProject
