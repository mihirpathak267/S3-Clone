const express = require('express');
const bodyParser = require('body-parser');

// Create express app
const app = express();

app.use(bodyParser.json());

module.exports = app;

