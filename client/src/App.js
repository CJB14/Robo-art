const download = require('./download.png');
const logo = require('./logo.svg');
const preview = require('./preview.png');

module.exports = {
  download,
  logo,
  preview
};
const express = require('express');
const userController = require('./controllers/userControllers');

const app = express();

app.use('/users', userController);

app.listen(3000);