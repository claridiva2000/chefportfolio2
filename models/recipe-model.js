const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  picture: { type: String },
  mealtype: { type: String },
  chef: { type: mongoose.Schema.Types.ObjectId, ref: "Chefs", required: true }
});

module.exports = mongoose.model("Recipes", recipeSchema);
