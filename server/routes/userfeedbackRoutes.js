const express = require("express");
const router = express.Router();

const FeedbakModule = require("../models/FeedbakModule");

// Route handling the user feedback
router.post("/user-feedback", async (req, res) => {
  const user = req.body;
  const newUser = new FeedbakModule(user);
  await newUser.save();
  res.json(user);
});

module.exports = router;
