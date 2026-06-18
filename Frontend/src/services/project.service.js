import axios from 'axios';
import API from '../config/api';

const PROJECT_API = `${API}/api/project`;

export const getFeaturedProjects = async () => {
    const response = await axios.get(`${PROJECT_API}/featured`);

    return response.data
}

export const getProjectStats = async () => {
    const response = await axios.get(`${PROJECT_API}/stats`, {
        withCredentials: true
    });

    return response.data;
}

export const getPublicProjects = async (
    category = 'ALL'
) => {

    const response = await axios.get(
        `${PROJECT_API}/public`,
        {
            params: {
                category
            }
        }
    );

    return response.data;
};

export const getProjectBySlug = async (slug) => {

    const response = await axios.get(
        `${PROJECT_API}/${slug}`
    );

    return response.data;
};

export const incrementView = async (id) => {
    const response = await axios.post(
        `${PROJECT_API}/view/${id}`
    );

    return response.data;
};

export const getSkillAnalytics = async () => {

    const response = await axios.get(
        `${PROJECT_API}/skills`
    );

    return response.data;
};

export const getProjectById = async (id) => {

    const response = await axios.get(
        `${PROJECT_API}/edit/${id}`,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const updateProject = async (
    id,
    formData
) => {

    const response = await axios.put(
        `${PROJECT_API}/update/${id}`,
        formData,
        {
            withCredentials: true,
            headers: {
                'Content-Type':
                    'multipart/form-data'
            }
        }
    );

    return response.data;
};

export const likeProject = async (id) => {

    const response = await axios.patch(
        `${PROJECT_API}/like/${id}`
    );

    return response.data;
};

export const getProjects = async ({
    page,
    limit,
    search,
    category,
    featured,
    isPublished
}) => {
    const response = await axios.get(`${PROJECT_API}/manage`, {
        params: {
            page,
            limit,
            search,
            category,
            featured,
            isPublished
        },
        withCredentials: true
    });

    return response.data;

}

export const deleteProject = async (id) => {
    try {
        const response = await axios.delete(
            `${API}/api/project/${id}`,
            { withCredentials: true }
        );

        return response.data;
    } catch (err) {
    }
};

export const getRecentProjects = async () => {
    const response = await axios.get(
        `${PROJECT_API}/recent`,
        {
            withCredentials: true
        }
    );

    return response.data;
};

export const getDashboardAnalytics = async () => {

    const response = await axios.get(
        `${PROJECT_API}/analytics`,
        {
            withCredentials: true
        }
    );

    return response.data;
};