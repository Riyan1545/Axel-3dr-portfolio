const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuid } = require('uuid')

const userModel = require('../models/user.model.js');

const storageService = require('../services/storage.service.js');

const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'This user already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = {
            fullName,
            email,
            password: hashedPassword
        };

        if (req.file) {
            const uploadFileResult = await storageService.uploadFile(
                req.file.buffer,
                uuid()
            );

            userData.profilePic = uploadFileResult.url;
        }

        const user = await userModel.create(userData);

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });

        res.status(201).json({
            message: 'User registered Successfully',
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                isAdmin: user.isAdmin,
                profilePic: user.profilePic
            }
        });

    } catch (err) {
        res.status(500).json({
            message: 'Registration failed'
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password, rememberMe, isAdmin } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: rememberMe ? "30d" : "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            message: 'User logged in successfully',
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                isAdmin: user.isAdmin,
                profilePic: user.profilePic
            }
        });

    } catch (err) {

        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
};

async function logoutUser(req, res) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/"
        });

        return res.status(200).json({
            code: 200,
            message: 'User logged out successfully'
        });

    } catch (err) {

        return res.status(500).json({
            code: 500,
            title: 'Logout Failed',
            message: 'An unexpected error occurred while logging out.',
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}