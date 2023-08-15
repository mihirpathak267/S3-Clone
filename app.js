const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.route');

// Create express app
const app = express();

app.use(bodyParser.json());

app.use('/', userRoute);

module.exports = app;

