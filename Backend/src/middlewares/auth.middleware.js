const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) =>{
    try{
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                message: 'Authentication required'
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        if(!user){
            return res.status(401).json({
                message: 'User not found'
            });
        }

        req.user = user;

        next()
    }
    catch(err){
        return res.status(401).json({
            message: 'Invalid token'
        });
    }
}

module.exports = authMiddleware;