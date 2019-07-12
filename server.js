const express = require("express");

const app = express();

const morgan = require("morgan");
const chefroutes = require("./routes/chefs");
const dishroutes = require("./routes/recipes");
const bodyparser = require("body-parser");

app.use(morgan("dev"));
app.use("/chefs", chefroutes);
app.use("/recipes", dishroutes);

app.use(bodyparser.urlcoded({extended:false}));

app.use((req, res, next) => {
  const error = new Error("Not Found");
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
