const mongodb = require('../config/mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    apikey: {
        type: String,
        required: true
    }
},{timestamp:true});

const User = mongodb.model('User', userSchema);

module.exports = User;