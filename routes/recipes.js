const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
// const ejs = require('ejs');
const path = require('path');

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, false);
//   } else {
//     cb(null, false);
//   }
// };

//storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function(res, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage: storage});

const Chef = require('../models/chef-model');
const Recipes = require('../models/recipe-model');
const Mealtype = require('../models/mealtype-model');

//Add Recipe
router.post('/', upload.single('recipeImg'), function(req, res) {
  console.log(req.file);
  const recipe = new Recipes();
  recipe._id = new mongoose.Types.ObjectId();
  recipe.name = req.body.name;
  recipe.ingredients = req.body.ingredients;
  recipe.instructions = req.body.instructions;
  recipe.picture = req.body.picture;
  recipe.recipeImg = req.file.path
  recipe.description = req.body.description;
  recipe.mealtype = req.body.mealtype;
  recipe.chef = req.body.chef;

  recipe.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.status(200).json(recipe);
    }
  });
});

//ES6 syntax, just incase mongo gets wierd.
// router.get('/', (req, res, next) => {
//   Recipes.find({}, function(err, recipes) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.status(200).json(recipes)
//     }
//   });
// });

//GET recipes
router.get('/', (req, res, next) => {
  Recipes.find()
    .populate('chef', 'name location')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        recipes: docs.map(doc => {
          return {
            name: doc.name,
            ingredients: doc.ingredients,
            instructions: doc.instructions,
            picture: doc.picture,
            recipeImg: doc.recipeImg,
            description: doc.description,
            mealtype: doc.mealtype,
            meal_types: {
              breakfast: doc.breakfast,
              lunch: doc.lunch,
              dinner: doc.dinner,
              dessert: doc.dessert,
              snack: doc.snack
            },
            chef: doc.chef,
            request: {
              type: 'GET',
              url: `https://chefportfoliopt4.herokuapp.com/recipes/${doc._id}`,
              _id: doc._id
            }
          };
        })
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(200).json({ message: "We can't find that recipe" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Get Specific Recipe
router.get('/:dishId', (req, res, next) => {
  const id = req.params.dishId;
  Recipes.findById(id)
    .select(
      'name ingredients instructions picture description mealtype breakfast lunch dinner dessert snack _id recipeImg chef'
    )
    .populate('chef', 'name location')
    .exec()
    .then(doc => {
      console.log('from database', doc);
      if (doc) {
        res.status(200).json({
          recipe: doc,
          request: {
            type: 'GET',
            description: 'GET one Chef by _id',
            url: 'https://chefportfoliopt4.herokuapp.com/recipes/' + doc._id
          }
        });
      } else {
        res.status(404).json({ message: 'no valid entry found for this id' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//UPDATE chef
router.put('/:dishId', function(req, res) {
  let dish = {};
  dish.name = req.body.name;
  dish.ingredients = req.body.ingredients;
  dish.description = req.body.description;
  dish.picture = req.body.picture;
  dish.instructions = req.body.instructions;
  dish.mealtype = req.body.mealtype;
  dish.chef = req.body.chef;

  let query = { _id: req.params.dishId };

  Recipes.updateOne(query, dish, function(err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.status(201).json({ dish });
    }
  });
});

//UPDATE Chef using Patch
// router.patch("/:dishId", (req, res, next) => {
//   id = req.params.dishId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Recipes.update(
//     { _id: id },
//     {
//       $set: updateOps
//     }
//   )
//     .exec()
//     .then(res => {
//       console.log(result);
//       result.status(200).json({
//         message: "Recipe updated, Chef."
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//Delete Recipe
router.delete('/:dishId', function(req, res) {
  let query = { _id: req.params.dishId };

  Recipes.remove(query, function(err) {
    if (err) {
      res.send(err);
    } else {
      res.send('Recipe has been removed.');
    }
  });
});

module.exports = router;
