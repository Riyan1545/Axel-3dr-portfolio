const express = require('express');
const authController = require('../controller/auth.controller.js');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

router.post('/user/register', upload.single("profilePic"), authController.registerUser);

router.post('/user/login', authController.loginUser);

router.get('/user/logout', authController.logoutUser)

module.exports = router;