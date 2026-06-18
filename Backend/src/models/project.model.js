const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: function () {
            return this.isPublished
        },
        trim: true
    },

    slug: {
        type: String,
        required: function () {
            return this.isPublished
        },
        unique: true,
        lowercase: true
    },

    description: {
        type: String,
        default: 'Description...'
    },

    category: {
        type: String,
        required: function () {
            return this.isPublished
        },
        enum: [
            'Character',
            'Environment',
            'Creature',
            'Prop',
            'Vehicle',
            'Architecture',
            'Weapon',
            'Other'
        ],
        default: 'Other'
    },

    gallery: [
        {
            url: String,
            fileId: String
        }
    ],

    softwareUsed: [
        {
            type: [String],
            default: []
        }
    ],
    tags: [
        {
            type: String
        }
    ],
    featured: {
        type: Boolean,
        default: false
    },

    likes: {
        type: Number,
        default: 0
    },

    views: {
        type: Number,
        default: 0
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    thumbnail: {
        url: {
            type: String,
            required: function () {
                return this.parent().isPublished;
            }
        },
        fileId: {
            type: String,
            required: function () {
                return this.parent().isPublished;
            }
        }
    },

    projectUrl: {
        type: String,
    }
}, {
    timestamps: true
});

const projectModel = mongoose.model('Project', projectSchema);

module.exports = projectModel;