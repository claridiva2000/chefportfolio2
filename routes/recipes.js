const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Recipes = require("../models/recipe-model");

router.get("/", (req, res, next) => {
Recipes.find()
.select('name ingredients _id')
.exec()
.then(doc=>{
res.status(200).json({
  count: docs.length,
  recipes: docs.map(doc=>{
    return {
      _d: doc._id,

    }
  })

});
})
.catch(err=>{
  console.log(err =>{
    res.status(500).json(err)
  })
})

});

router.post("/", (req, res, next) => {
  const recipe = new Recipes({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    ingredients: req.body.ingredients,
    chef: req.body.chefId
  });
  recipe
    .save()
    .exec()
    .then(res => {
      console.log(res);
      res.status(201).json(res);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:dishId", (req, res, next) => {
  res.status(200).json({
    message: "recipe details",
    dishId: req.params.dishId
  });
});

router.patch("/:dishId", (req, res, next) => {
  res.status(200).json({
    message: "updated recipe!"
  });
});

router.delete("/:dishId", (req, res, next) => {
  res.status(200).json({
    message: " recipe deleted",
    dishId: req.params.dishId
  });
});

module.exports = router;
