const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({ message: "GET all chefs" });
});

router.post("/", (req, res, next) => {
  res.status(200).json({ message: "POST chefs" });
});

router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  if (id === "special") {
    res.status(200).json({ 
        message: "you discovered the special id!" ,
         id:id
        });
  } else {
      res.status(200).json({message:'you passed an id!'})
  }
});

router.patch("/:userId", (req, res, next) => {
    res.status(201).json({ 
        message: "updated chef!" 
        });
});

router.delete("/:userId", (req, res, next) => {
    res.status(200).json({ 
        message: "nuked chef!" 
        });
});

module.exports = router;
