const mongodb = require('../config/mongodb');
const mongoose = require('mongoose');
const User = require('./user.model');

const uploadsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.modelName
    },
    filename: {
        type: String
    },
    mimeType: {
        type: String
    },
    path: {
        type: String
    }
},{timestamps:true})

const Uploads = mongodb.model('Uploads', uploadsSchema);

module.exports = Uploads;