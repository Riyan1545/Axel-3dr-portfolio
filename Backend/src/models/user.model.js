const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true,
        minLength: 3,
        trim: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        default: '/images/default.png'
    }
},
{
    timestamps: true
}
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;