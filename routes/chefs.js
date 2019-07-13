const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Chefs = require("../models/chef-model");

router.get("/", (req, res, next) => {
  Chefs.find()
    .select("name email location _id")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        chefs: docs.map(doc => {
          return {
            name: doc.name,
            email: doc.email,
            location: doc.location,
            _id: doc._id,
            request: {
              type: this.get,
              url: "http://localhost:6000/chefs/" + doc._id
            }
          };
        })
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(200).json({ message: "no entries found" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
  // res.status(200).json({ message: 'GET all chefs' });
});

//es6 version
router.post("/", function(req, res, next) {
  const chef = new Chefs(req.body);
  console.log(chef);
  chef
    .save()
    .then(chef => {
      res.json(`Welcome, Chef ${req.param.name}`);
    })
    .catch(err => {
      res.status(400).send("Sorry, Chef. I can't add you");
    });
});

//async await version
// router.post("/", async function(req, res, next) {
//   const chefBody = req.body;
//   const chef = new Chefs({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     email: req.body.email,
//     location: req.body.location
//   });

//   try {
//     let newChef = await chef.save();
//     res.status(201).send({ response: `Welcome, Chef ${req.param.name}` });
//   } catch {
//     res.status(500).send(err);
//   }
// });

// router.post('/', function(req, res, next) {
//   const chef = new Chefs({
//     _id: new mongoose.Types.ObjectId(),
//     name: req.body.name,
//     email: req.body.email,
//     location: req.body.location
//   });
//   chef.save().then(res=>{
//     res.status(201).json({
//       message: "Welcome Chef!",
//       chefAdded: res
//     })
//   }).catch(err=>{
//     res.status(500).json(err)
//   })
// });

router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  Chefs.findById(id)
    .select("name email location _id")
    .exec()
    .then(doc => {
      console.log("from database", doc);
      if (doc) {
        res.status(200).json({
          chef: doc,
          request: {
            type: "GET",
            description: "GET one Chef by _id",
            url: "http://localhost:6000/chefs/" + doc._id
          }
        });
      } else {
        res.status(404).json({ message: "no valid entry found for this id" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:userId", (req, res, next) => {
  id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Chefs.update(
    { _id: id },
    {
      $set: updateOps
    }
  )
    .exec()
    .then(res => {
      console.log(result);
      result.status(200).json({
        message: "Account Updated, Chef."
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:userId", (req, res) => {
  Chefs.findByIdAndUpdate(req.params.userId, req.body, { new: true }),
    res.send(`Thanks for your update ${res.name}`);
  (err, chef) => {
    if (err) return res.status(500).send(err);
    return res.send(chef);
  };
});

router.delete("/:userId", (req, res, next) => {
  const id = req.params.userId;
  Chefs.deleteOne({ _id: id })
    .exec()
    .then(res=>{
      res.status(200).json({
        message: 'Chef has been removed',
        request: {
          type: 'DELETE',
          url: 'http://localhost:6000/chefs/' + res._id,
        }
      })
    })
    .catch()
    .then(res => {
      result.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
