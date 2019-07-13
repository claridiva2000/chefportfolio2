const mongoose = require("mongoose");

const mealSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  breakfast: { type: Boolean, default: false },
  lunch: { type: Boolean, default: false },
  dinner: { type: Boolean, default: false },
  dessert: { type: Boolean, default: false },
  snack: { type: Boolean, default: false },
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }
});

module.exports = mongoose.model("MealType", mealSchema)