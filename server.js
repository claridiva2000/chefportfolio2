const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// const ejs = require('ejs');
// const multer = require('multer');
// app.set('view engine', ejs);

const app = express();

const morgan = require('morgan');



app.use('/public/uploads', express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(morgan('dev'));


const chefroutes = require('./routes/chefs');
const dishroutes = require('./routes/recipes');

mongoose.connect(
  '  mongodb+srv://chefportfolio:' +
    process.env.MONGO_ATLAS_PW +
    '@chefportfolio-8idgc.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true }
);

// app.use(cors());

app.use('/chefs', chefroutes);
app.use('/recipes', dishroutes);

app.get('/', (req, res, next)=>{
  res.send('<h1>ChefPortfolio</h1> <p>Welcome to our server.</p> <p>access chefs:</p> <p>https://chefportfoliopt4.herokuapp.com/chefs</p><p>access recipes:</p> <p>https://chefportfoliopt4.herokuapp.com/recipes</p> <p>to access individual recipes/chefs, just paste in the _id or click the link in the URL which is included for each recipe and chef</p> <p>access pictures: still working on that. we have pictures in memory, just not sure how to get them working just yet.</p>')
})




app.use(express.json());



app.use((req, res, next) => {
  const error = new Error('Not Found');
 res.status(404);
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
