const Trello = require("../Model/List");
const express = require("express");
const router = express.Router();



// Post Operation
router.post("/", async (req, res) => {
  const trello = new Trello({
    trello: req.body.trello
  });
  trello
    .save()
    .then(result => {
      if (result) {
        return res.status(200).json({
          msg: true
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        msg: false,
        err: err
      });
    });
});

// Read Operation
router.get("/", async (req, res) => {
  Trello.findById(
    "5ec026d44c38ba57b5157cbc",
    function (err, result) {
      if (err) {
        console.log(err);
      }
      if (!result) {
        flag = false;
      } else {
        flag = true;
      }
      res.json({
        flag: flag,
        result: result
      });
    }
  );
});

// Update Operation
router.post("/update", async (req, res) => {
  Trello.findByIdAndUpdate(
    '5ec026d44c38ba57b5157cbc',
    {
      $set: {
        trello: req.body.trello
      }
    },
    { multi: true, new: true },
    function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(400).send("No user found");
      }
      return res.status(200).json({
        data: user
      });
    }
  );
});

// Reset Board
router.put("/", async (req, res) => {
  Trello.findByIdAndUpdate(
    '5ec026d44c38ba57b5157cbc',
    {
      $set: {
        trello: [
          // {
          //   title: "Trello Clone ..",
          //   id: '500',
          //   cards: [
          //     {
          //       id: '0',
          //       text: "Click To Edit"
          //     },
          //   ]
          // },
        ]
      }
    },
    { multi: true, new: true },
    function (err, user) {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(400).send("No user found");
      }
      return res.status(200).json({
        data: user
      });
    }
  );
});

module.exports = router;