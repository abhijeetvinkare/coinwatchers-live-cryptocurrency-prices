const mongoose = require("mongoose");
const UserSchemaSecond = new mongoose.Schema({
  username: {
    type: String,
  },
  useremail: {
    type: String,
  },
  userpass: {
    type: String,
  },
  WatchlistCoin:[{
    coinid: String,
    coinname: String,
},]
});

const NewUsers = mongoose.model("newusersignup", UserSchemaSecond);
module.exports = NewUsers;
