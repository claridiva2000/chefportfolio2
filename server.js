const express = require('express');

const app = express();

const morgan = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');

const chefroutes = require('./routes/chefs');
const dishroutes = require('./routes/recipes');

mongoose.connect(
  '  mongodb+srv://chefportfolio:' +
    process.env.MONGO_ATLAS_PW +
    '@chefportfolio-8idgc.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

app.use(cors());
app.use(morgan('dev'));

app.use('/chefs', chefroutes);
app.use('/recipes', dishroutes);

app.use(express.json());

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
