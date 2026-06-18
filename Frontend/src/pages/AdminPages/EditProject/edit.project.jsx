import React from 'react'
import { useParams } from 'react-router-dom';
import './edit.project.css';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../../../assets/images/default-thumbnail.svg';
import { useEffect } from 'react';
import { getProjectById } from '../../../services/project.service';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Loading from '../../../components/common/loading/loading.jsx'

import {
  updateProject
} from '../../../services/project.service';

const EditProject = () => {

  const { id } = useParams();

  const navigate = useNavigate()

  const [project, setProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tags: '',
    softwareUsed: '',
    projectUrl: '',
    featured: false,
    isPublished: false
  });

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [galleryPreview, setGalleryPreview] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchProject = async () => {

      try {

        const data = await getProjectById(id);

        setProject(data);

        setFormData({
          title: data.title || '',
          category: data.category || '',
          description: data.description || '',
          tags: Array.isArray(data.tags)
            ? data.tags.join(', ')
            : data.tags || '',
          softwareUsed: Array.isArray(data.softwareUsed)
            ? data.softwareUsed.join(', ')
            : '',
          projectUrl: data.projectUrl || '',
          featured: data.featured || false,
          isPublished: data.isPublished || false
        });

        setThumbnailPreview(
          data.thumbnail?.url || defaultThumbnail
        );

        setGalleryPreview(
          data.gallery || []
        );

      } catch (err) {

        console.log(err);

      }
    };

    fetchProject();

  }, [id]);

  useEffect(() => {
    if (project) {
      setThumbnailPreview(
        project.thumbnail?.url || defaultThumbnail
      );

      setGalleryPreview(
        project.gallery || []
      );
    }
  }, [project]);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : value
    }));
  };

  const handleThumbnailChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setThumbnailFile(file);

    setThumbnailPreview(
      URL.createObjectURL(file)
    );
  };

  const handleGalleryAdd = (e) => {

    const files = Array.from(
      e.target.files
    );

    setGalleryFiles(prev => [
      ...prev,
      ...files
    ]);

    const previews = files.map(file => ({
      url: URL.createObjectURL(file),
      isNew: true
    }));

    setGalleryPreview(prev => [
      ...prev,
      ...previews
    ]);
  };

  const handleRemoveGallery = (index) => {

    const image = galleryPreview[index];

    setGalleryPreview(prev =>
      prev.filter((_, i) => i !== index)
    );

    if (image?.isNew) {
      setGalleryFiles(prev =>
        prev.filter(
          file =>
            file.name !== image.name
        )
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("category", formData.category);
      payload.append("description", formData.description);
      payload.append("projectUrl", formData.projectUrl);
      payload.append("featured", formData.featured);
      payload.append(
        "isPublished",
        formData.isPublished
      );

      payload.append(
        "tags",
        JSON.stringify(
          formData.tags
            .split(",")
            .map(tag => tag.trim())
            .filter(Boolean)
        )
      );

      payload.append(
        "softwareUsed",
        JSON.stringify(
          formData.softwareUsed
            .split(",")
            .map(tool => tool.trim())
            .filter(Boolean)
        )
      );

      if (thumbnailFile) {
        payload.append(
          "thumbnail",
          thumbnailFile
        );
      }

      galleryFiles.forEach(file => {
        payload.append(
          "gallery",
          file
        );
      });

      payload.append(
        "existingGallery",
        JSON.stringify(
          galleryPreview
            .filter(img => !img.isNew)
            .map(img => img.fileId)
        )
      );

      await updateProject(id, payload);

      navigate('/admin/manage-projects');

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return <Loading />;
  }


  return (
    <div>
      <div className="edit-project">
        <div className="edit-project-header">
          <div className="back-to-manage">
            <Link to="/admin/manage-projects"><i className="ri-arrow-left-long-fill"></i></Link>
          </div>
          <div className="edit-project-header-title">
            <h1>Edit Project</h1>
            <small>Edit : {id}</small>
          </div>
        </div>

        <div className="edit-project-container">
          <form onSubmit={handleUpdate}>

            <div className="edit-project-col-1 common-edit-col">
              <div className="project-input-group">
                <label htmlFor="title">Project Title <small>(Required)</small></label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
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

              <div className="featured-project-div project-featured-container">
                <div className="featured-input-info">
                  <p>Published Project</p>
                  <p>Make this project visible publicly</p>
                </div>

                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                />
              </div>
            </div>


            <div className="edit-project-col-2 common-edit-col">
              <div className="edit-project-image-conatiner common-edit-col-2">
                <div className="edit-thumbnail-section">

                  <div className="thumbnail-change-container">
                    <h2>Current Thumbnail</h2>
                    <img src={thumbnailPreview} />
                  </div>
                  <div className="edit-thumbnail-btns">
                    <label htmlFor="change-thumbnail-btn">CHANGE IMAGE</label>
                    <input
                      id="change-thumbnail-btn"
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                    />
                  </div>
                </div>

                <div className="edit-gallery-section">
                  <div className="edit-gallery-container">

                    {galleryPreview.map((image, index) => (

                      <div
                        className="edit-gallery-card"
                        key={index}
                      >
                        <img
                          src={image.url}
                        />

                        <button
                          type="button"
                          className="remove-gallery-btn"
                          onClick={() =>
                            handleRemoveGallery(index)
                          }
                        >
                          <i className="ri-close-line"></i>
                        </button>
                      </div>

                    ))}

                  </div>
                  <div className="add-gallery-container">
                    <input
                      id="add-gallery"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryAdd}
                    />
                    <i className="ri-add-large-line"></i>
                    <p>ADD MORE</p>
                  </div>
                </div>
              </div>

              <div className="edit-project-btn-container common-edit-col-2">
                <button type='submit'>UPDATE PROJECT</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProject 
