require('dotenv').config()
const mongoose = require('mongoose');

const connection  = mongoose.createConnection("mongodb://127.0.0.1:27017/S3clone").on('open', ()=>{
    console.log("Connected to MongoDB database");
}).on('error', (err)=>{
    console.log(err)
});


module.exports = connection;