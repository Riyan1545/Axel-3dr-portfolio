import React from 'react';
import './create.project.css';
import axios from 'axios'
import { useState } from 'react';
import Loading from '../../../components/common/loading/loading.jsx';
import { useNavigate } from 'react-router-dom';

const CreateProject = () => {

  const descriptionIcon = [
    {
      i: 'ri-bold'
    },
    {
      i: 'ri-italic'
    },
    {
      i: 'ri-underline'
    },
    {
      i: 'ri-strikethrough'
    }
  ];

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tags: '',
    projectUrl: '',
    featured: false,
    softwareUsed: '',
    thumbnail: null,
    gallery: []
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox' ? checked : value
    }));
  };

  const handleThumbnailChange = (e) => {

    setFormData(prev => ({
      ...prev,
      thumbnail: e.target.files[0]
    }));
  };

  const handleGalleryChange = (e) => {

    setFormData(prev => ({
      ...prev,
      gallery: [...e.target.files]
    }));
  };


  const handleSubmit = async (e, isPublished = true) => {

    setLoading(true)

    e?.preventDefault();

    try {

      const data = new FormData();

      data.append("title", formData.title),
        data.append("category", formData.category),
        data.append("description", formData.description),
        data.append("projectUrl", formData.projectUrl),
        data.append("featured", formData.featured),
        data.append("softwareUsed", formData.softwareUsed)

        data.append("thumbnail", formData.thumbnail),
        data.append("isPublished", isPublished)

      formData.gallery.forEach((image) => {
        data.append("gallery", image)
      });

      data.append(
        "tags",
        JSON.stringify(
          (formData.tags || "")
            .split(",")
            .map(tag => tag.trim())
            .filter(tag => tag)
        )
      );

      const response = await axios.post(
        'http://localhost:3000/api/project/create',
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      navigate('/admin/manage-projects')

    } catch (err) {
      if (!err.response) {
        navigate('/error', {
          state: {
            error: {
              code: 'NETWORK_ERROR',
              title: 'Connection Failed',
              message: 'Unable to connect to the server.'
            }
          }
        });

        return;
      }

      navigate('/error', {
        state: {
          error: {
            code: err.response?.data?.code || err.response?.status,
            title: err.response?.data?.title || 'Creation Failed',
            message: err.response?.data?.message || 'Unable to create project.'
          }
        }
      });
    }
    finally {
      setLoading(false);
    }

  }

  const handleSaveDraft = () => {
    handleSubmit(null, false);
  };

  if (loading) {
    return (
      <Loading
        title="Creating new Project"
        message="Uploading project details"
      />
    );
  }
  return (
    <section className='create-dashboard'>

      <div className="create-header">
        <div className="create-col-1">
          <h1>Create New Project</h1>
          <p>Fill in the details to add a new project.</p>
        </div>
      </div>

      <div className="create-project-container">
        <form onSubmit={handleSubmit}>

          <div className="project-form-col-1 project-col">

            <div className="project-input-group">
              <label htmlFor="title">Project Title <small>(Required)</small></label>

              <input type="text" name="title" id="project-title" placeholder='Enter project title' value={formData.title} onChange={handleChange} />
            </div>

            <div className="project-input-group">
              <label htmlFor="category">Category <small>(Required)</small></label>

              <select name='category' value={formData.category} onChange={handleChange}>
                <option value="" disabled>Select Category</option>
                <option>Character</option>
                <option>Environment</option>
                <option>Creature</option>
                <option>Prop</option>
                <option>Vehicle</option>
                <option>Architecture</option>
                <option>Weapon</option>
                <option>Other</option>
              </select>
            </div>

            <div className="project-input-group project-description">
              <label htmlFor="description">description</label>

              <div className="description-components">
                {descriptionIcon.map((icon, index) => {
                  return (
                    <i key={index} className={icon.i}></i>
                  )
                })}
              </div>

              <textarea name="description" id="project-description" placeholder='Tell the story behind your project...' value={formData.description} onChange={handleChange}></textarea>
            </div>

            <div className="project-input-group">
              <label htmlFor="tags">Tags</label>

              <input type="text" name="tags" id="project-tags" placeholder='Add tags (e.g, environment, cyberpunk etc.)' value={formData.tags} onChange={handleChange} />
            </div>

            <div className="project-input-group">
              <label htmlFor="softwareUsed">Software Used</label>

              <input type="text" name="softwareUsed" id="softwareUsed" placeholder='Add software used (e.g, blender, ... etc.)' value={formData.softwareUsed} onChange={handleChange} />
            </div>

            <div className="project-input-group">
              <label htmlFor="projectUrl">Project URL <small>(Optional)</small></label>

              <input type="text" name="projectUrl" id="project-title" placeholder='Enter project title' value={formData.projectUrl} onChange={handleChange} />
            </div>

            <div className="featured-project-div project-featured-container">
              <div className="featured-input-info">
                <p>Featured Project</p>
                <p>Show This project on the home page</p>
              </div>
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
            </div>

          </div>

          <div className="project-form-col-2 project-col">

            <label id='thumbnail-label' htmlFor="thumbnail">Thumbnail image <small>(Required)</small></label>
            <div className="project-thumbnail-1">

              <i className="ri-cloud-line"></i>
              <p>Drag & drop your thumbnail here</p>
              <small>or</small>

              <div className="browse-container">
                <input id='thumbnail' type="file" name='thumbnail' accept='image/*' onChange={handleThumbnailChange} />
                <label htmlFor="thumbnail" id='file-selector'>BROWSE FILE</label>
              </div>
              <small>Recommended size: 1280x720px</small>
            </div>

            <label id='thumbnail-label' htmlFor="gallery">Project Gallery</label>
            <div className="project-thumbnail-1">

              <i className="ri-cloud-line"></i>
              <p>Drag & drop images here</p>
              <small>or</small>

              <div className="browse-container">
                <input id='gallery' type="file" name='gallery' multiple accept="image/*" onChange={handleGalleryChange} />
                <label htmlFor="gallery" id='file-selector'>BROWSE FILE</label>
              </div>
              <small>Recommended size: 1280x720px</small>
            </div>
          </div>

          <div className="project-form-col-3 project-col">
            <button
              onClick={handleSaveDraft}
              type="button">
              SAVE
            </button>

            <button type='submit'>PUBLISH PROJECT</button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default CreateProject