const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const NewUsers = require("../models/NewUsers");

// Register New User
router.post("/new-user-sign-up", async (req, res) => {
  try {
    const { username, useremail, userpass } = req.body;
    const newuser = await NewUsers.findOne({ useremail: useremail });

    if (newuser) {
      res.send({ message: "User Already Registered!" });
    } else {
      const hashedPassword = await bcrypt.hash(userpass, 10);

      const newuser = new NewUsers({
        username,
        useremail,
        userpass: hashedPassword,
      });

      await newuser.save();
      res.json(newuser);
    }
  } catch (error) {
    res.status(500).send({ message: "Error registering user" });
  }
});

// Get registered users data
router.get("/get-signed-user", (req, res) => {
  NewUsers.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// User login authentication
router.post("/login-api", (req, res) => {
  const { email, password } = req.body;
  NewUsers.findOne({ useremail: email }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.userpass, (err, isMatch) => {
        if (isMatch) {
          // Create a new object without the userpass field
          const responseUser = {
            _id: user._id,
            username: user.username,
            useremail: user.useremail,
            WatchlistCoin: user.WatchlistCoin,
          };

          res.send({ message: "Successful", user: responseUser });
        } else {
          res.send({ message: "Password does not match" });
        }
      });
    } else {
      res.send({ message: "User not found!" });
    }
  });
});


// Delete user account
router.post("/delete-user", (req, res) => {
  const { userid } = req.body;
  NewUsers.deleteOne({ _id: userid }, (err, newuser) => {
    if (newuser) {
      res.send({ message: "User Deleted!" });
    } else {
      res.send({ message: "Error!" });
    }
  });
});

module.exports = router;
