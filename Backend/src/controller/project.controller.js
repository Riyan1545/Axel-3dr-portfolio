const projectModel = require('../models/project.model');
const mongoose = require('mongoose');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            softwareUsed,
            featured,
            projectUrl,
            isPublished,
        } = req.body;

        const tags = req.body.tags
            ? JSON.parse(req.body.tags)
            : [];

        const published = isPublished === 'true';

        const thumbnailFile = req.files?.thumbnail?.[0];
        const galleryFiles = req.files?.gallery || [];

        if (published) {
            if (!thumbnailFile) {
                return res.status(400).json({
                    code: "THUMBNAIL_REQUIRED",
                    title: "Missing Thumbnail",
                    message: 'Thumbnail is required'
                });
            }

            if (galleryFiles.length === 0) {
                return res.status(400).json({
                    code: "GALLERY_REQUIRED",
                    message: "At least one gallery image is required"
                });
            }

            if (!title || !category) {
                return res.status(400).json({
                    code: "MISSING_REQUIRED_FIELDS",
                    title: "Missing Required Fields",
                    message: "Title and category are required"
                });
            }
        }

        const slug = title
            ? title.toLowerCase().trim().replace(/\s+/g, '-')
            : `draft-${uuid()}`;

        const existingProject = await projectModel.findOne({ slug });

        if (existingProject) {
            return res.status(409).json({
                code: "PROJECT_EXISTS",
                title: "Duplicate Project",
                message: "A project with this title already exists"
            });
        }

        let thumbnailURL = null;

        if (thumbnailFile) {
            let uploadResult

            try {
                uploadResult = await storageService.uploadFile(
                    thumbnailFile.buffer,
                    uuid()
                );

                thumbnailURL = {
                    url: uploadResult.url,
                    fileId: uploadResult.fileId
                }
            } catch (err) {
                return res.status(500).json({
                    code: "IMAGE_UPLOAD_FAILED",
                    message: "Failed to upload image"
                });
            }
        }

        let galleryURLs = []

        if (galleryFiles.length > 0) {
            try {
                galleryURLs = await Promise.all(
                    galleryFiles.map(async (file) => {
                        const result = await storageService.uploadFile(file.buffer, uuid());

                        return {
                            url: result.url,
                            fileId: result.fileId
                        };
                    })
                )
            } catch (err) {
                return res.status(500).json({
                    code: "GALLERY_UPLOAD_FAILED",
                    title: "Gallery Upload Failed",
                    message: "Failed to upload one or more gallery images"
                });
            }
        }

        const project = await projectModel.create({
            title: title || "undefined",
            thumbnail: thumbnailURL,
            gallery: galleryURLs,
            slug,
            description: description || "project description...",
            category: category || undefined,
            softwareUsed: softwareUsed || [],
            featured: featured || false,
            tags,
            projectUrl,
            isPublished: published
        });

        return res.status(201).json({
            message: 'Project created successfully',
            project
        });
    } catch (err) {
        console.error("CREATE PROJECT ERROR:", err);

        return res.status(500).json({
            message: err.message,
            stack: err.stack
        });

    }
}

const getPublicProjects = async (req, res) => {

    const { category } = req.query;

    const query = {
        isPublished: true
    };

    if (
        category &&
        category !== 'ALL'
    ) {
        query.category = category;
    }

    const projects = await projectModel
        .find(query)
        .sort({ createdAt: -1 });

    res.json(projects);
};

const updateProject = async (req, res) => {
    try {

        const { id } = req.params;

        const project =
            await projectModel.findById(id);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // ========================
        // BASIC FIELDS
        // ========================

        project.title = req.body.title;
        project.category = req.body.category;
        project.description = req.body.description;
        project.projectUrl = req.body.projectUrl;
        project.featured =
            req.body.featured === "true";

        project.isPublished =
            req.body.isPublished === "true";

        project.tags = JSON.parse(
            req.body.tags || "[]"
        );

        project.softwareUsed = JSON.parse(
            req.body.softwareUsed || "[]"
        );

        // ========================
        // THUMBNAIL UPDATE
        // ========================

        if (req.files?.thumbnail?.[0]) {

            if (project.thumbnail?.fileId) {

                try {
                    await storageService.deleteFile(
                        project.thumbnail.fileId
                    );
                } catch (err) {
                    console.log(
                        "Thumbnail delete failed:",
                        err.message
                    );
                }

            }

            const uploadedThumbnail =
                await storageService.uploadFile(
                    req.files.thumbnail[0].buffer,
                    req.files.thumbnail[0].originalname
                );

            project.thumbnail = {
                url: uploadedThumbnail.url,
                fileId: uploadedThumbnail.fileId
            };
        }

        // ========================
        // EXISTING GALLERY
        // ========================

        const existingGallery =
            req.body.existingGallery
                ? JSON.parse(
                    req.body.existingGallery
                )
                : [];

        const removedImages =
            project.gallery.filter(
                image =>
                    !existingGallery.includes(
                        image.fileId
                    )
            );

        for (const image of removedImages) {

            try {

                await storageService.deleteFile(
                    image.fileId
                );

            } catch (err) {

                console.log(
                    "Gallery image delete failed:",
                    err.message
                );

            }

        }

        project.gallery =
            project.gallery.filter(
                image =>
                    existingGallery.includes(
                        image.fileId
                    )
            );

        // ========================
        // NEW GALLERY IMAGES
        // ========================

        if (req.files?.gallery?.length) {

            for (const file of req.files.gallery) {

                const uploaded =
                    await storageService.uploadFile(
                        file.buffer,
                        file.originalname
                    );

                project.gallery.push({
                    url: uploaded.url,
                    fileId: uploaded.fileId
                });

            }

        }

        // ========================
        // SAVE PROJECT
        // ========================

        await project.save();

        return res.status(200).json({
            message:
                "Project updated successfully",
            project
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: err.message
        });

    }
};

const getProjectById = async (req, res) => {

    try {

        const project =
            await projectModel.findById(req.params.id);

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        res.status(200).json(project);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const getProjects = async (req, res) => {
    try {

        const {
            page = 1,
            limit = 8,
            search,
            category,
            featured,
            isPublished
        } = req.query;

        const query = {}

        if (search) {

            query.title = {
                $regex: search,
                $options: 'i'
            }
        }

        if (category) {

            query.category = category;
        }

        if (featured !== undefined && featured !== '') {

            query.featured = featured === 'true';
        }

        if (isPublished !== undefined && isPublished !== '') {
            query.isPublished = isPublished === 'true';
        }

        const totalProjects = await projectModel.countDocuments(query);

        const pageNum = Number(page);
        const limitNum = Number(limit);

        const projects = await projectModel.find(query)

            .sort({ createdAt: -1 })

            .skip((pageNum - 1) * limitNum)

            .limit(Number(limitNum));

        return res.status(200).json({

            projects,

            pagination: {
                page: Number(page),
                limit: Number(limit),
                totalProjects,
                totalPages: Math.ceil(totalProjects / limit)
            }
        });
    } catch (err) {

        return res.status(500).json({
            message: err.message,
            stack: err.stack
        });
    }
}

const getProjectBySlug = async (req, res) => {

    try {

        const project = await projectModel.findOne({
            slug: req.params.slug,
            isPublished: true
        });

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        res.status(200).json(project);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const incrementView = async (req, res) => {

    try {

        await projectModel.findByIdAndUpdate(
            req.params.id,
            {
                $inc: {
                    views: 1
                }
            }
        );

        res.status(200).json({
            success: true
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const likeProject = async (req, res) => {

    try {

        const project =
            await projectModel.findByIdAndUpdate(
                req.params.id,
                {
                    $inc: {
                        likes: 1
                    }
                },
                {
                    new: true
                }
            );

        res.status(200).json(project);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const getSkillAnalytics = async (req, res) => {
    try {

        const categories = [
            "Environment",
            "Character",
            "Architecture",
            "Weapon",
            "Prop",
            "Vehicle"
        ];

        const totalProjects =
            await projectModel.countDocuments({
                isPublished: true
            });

        const analytics =
            await projectModel.aggregate([
                {
                    $group: {
                        _id: "$category",
                        count: {
                            $sum: 1
                        }
                    }
                }
            ]);

        const skills = categories.map(category => {

            const found = analytics.find(
                item => item._id === category
            );

            const count = found?.count || 0;

            return {
                title: category,
                count,
                percentage:
                    totalProjects > 0
                        ? Math.round(
                            (count / totalProjects) * 100
                        )
                        : 0
            };
        });

        res.status(200).json(skills);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
};

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await projectModel.findById(id);

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            });
        }

        if (project.thumbnail) {
            try {
                if (project.thumbnail?.fileId) {
                    await storageService.deleteFile(project.thumbnail.fileId);
                }
            } catch (err) {
                console.log("Thumbnail delete failed:", err.message);
            }
        }

        if (project.gallery?.length) {
            for (const image of project.gallery) {
                try {
                    await storageService.deleteFile(image.fileId);
                } catch (err) {
                    console.log("Gallery image delete failed:", err.message);
                }
            }
        }

        await project.deleteOne();

        return res.status(200).json({
            message: 'Project deleted successfully'
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });
    }
};

const getProjectStats = async (req, res) => {
    try {
        const stats = await projectModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalProjects: { $sum: 1 },
                    drafts: {
                        $sum: {
                            $cond: [{ $eq: ["$isPublished", false] }, 1, 0]
                        }
                    },
                    featured: {
                        $sum: {
                            $cond: [{ $eq: ["$featured", true] }, 1, 0]
                        }
                    },
                    totalViews: {
                        $sum: { $ifNull: ["$views", 0] }
                    }
                }
            }
        ]);

        res.status(200).json(stats[0] || {
            totalProjects: 0,
            drafts: 0,
            featured: 0,
            totalViews: 0
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getRecentProjects = async (req, res) => {
    try {
        const last24Hours = new Date();
        last24Hours.setHours(last24Hours.getHours() - 24);

        const projects = await projectModel
            .find({
                createdAt: { $gte: last24Hours }
            })
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json(projects);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

const getDashboardAnalytics = async (req, res) => {
    try {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 4);

        const analytics = await projectModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: fiveDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        date: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt"
                            }
                        }
                    },
                    projects: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    "_id.date": 1
                }
            }
        ]);

        const result = [];

        for (let i = 4; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);

            const dateString =
                date.toISOString().split("T")[0];

            const found = analytics.find(
                item => item._id.date === dateString
            );

            result.push({
                day: date.toLocaleDateString("en-US", {
                    weekday: "short"
                }),
                projects: found ? found.projects : 0
            });
        }

        res.status(200).json(result);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getFeaturedProjects = async (req, res) => {
    try {
        const projects = await projectModel.find({
            featured: true,
            isPublished: true
        })
            .sort({ createdAt: -1 })
            .limit(4);

        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}


module.exports = {
    createProject,
    getProjects,
    getPublicProjects,
    incrementView,
    getProjectBySlug,
    getSkillAnalytics,
    likeProject,
    getProjectById,
    updateProject,
    deleteProject,
    getProjectStats,
    getRecentProjects,
    getDashboardAnalytics,
    getFeaturedProjects
};