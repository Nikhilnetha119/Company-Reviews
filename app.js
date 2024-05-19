const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const reviewRoutes = require('./routes/review');

const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(reviewRoutes);


sequelize.sync()
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
