const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "GET all recipes" });
});

router.post("/", (req, res, next) => {
  res.status(201).json({ message: "POST  recipes" });
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
