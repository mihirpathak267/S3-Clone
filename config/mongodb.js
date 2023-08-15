require('dotenv').config({path:  '../.env'})
const mongoose = require('mongoose');

const connection  = mongoose.createConnection(process.env.MONGODB_URI).on('open', ()=>{
    console.log("Connected to MongoDB database");
}).on('error', (err)=>{
    console.log(err)
});


module.exports = connection;