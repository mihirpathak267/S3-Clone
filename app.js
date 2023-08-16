const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');
const S3CloneRoute = require('./routes/S3Clone.route');

// Create express app
const app = express();

app.use(bodyParser.json());

app.use('/', userRoute);
app.use('/', S3CloneRoute);

module.exports = app;

