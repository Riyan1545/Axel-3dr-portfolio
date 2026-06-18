const express = require('express');

const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
});

const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

const projectController = require('../controller/project.controller')

router.post(
    '/create',
    authMiddleware,
    adminMiddleware,
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'gallery', maxCount: 20 }
    ]),
    projectController.createProject
);

router.get(
    '/edit/:id',
    authMiddleware,
    adminMiddleware,
    projectController.getProjectById
);

router.put(
    "/update/:id",
    authMiddleware,
    adminMiddleware,
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "gallery", maxCount: 20 }
    ]),
    projectController.updateProject
);

router.get(
    '/manage',
    authMiddleware,
    adminMiddleware,
    projectController.getProjects
);

router.get(
    '/skills',
    projectController.getSkillAnalytics
);

router.get(
    '/stats',
    projectController.getProjectStats,
);

router.get(
    '/recent',
    authMiddleware,
    adminMiddleware,
    projectController.getRecentProjects
);

router.get(
    '/analytics',
    authMiddleware,
    adminMiddleware,
    projectController.getDashboardAnalytics
);

router.patch(
    '/like/:id',
    projectController.likeProject
);

router.post(
    '/view/:id',
    projectController.incrementView
);

router.delete(
    '/:id',
    authMiddleware,
    adminMiddleware,
    projectController.deleteProject
);

router.get(
    '/featured',
    projectController.getFeaturedProjects
);

router.get(
    '/public',
    projectController.getPublicProjects
);

router.get(
    '/:slug',
    projectController.getProjectBySlug
);

module.exports = router;