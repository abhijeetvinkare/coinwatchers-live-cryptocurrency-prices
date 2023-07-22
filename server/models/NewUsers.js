const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const UserSchemaSecond = new mongoose.Schema({
  username: {
    type: String,
    trim:true,
  },
  useremail: {
    type: String,
  },
  userpass: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  WatchlistCoin: [
    {
      coinid: String,
      coinname: String,
    },
  ],
});

const NewUsers = mongoose.model("newusersignup", UserSchemaSecond);
module.exports = NewUsers;
