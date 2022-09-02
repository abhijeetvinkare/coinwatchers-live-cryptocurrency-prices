const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    feedback:{
        type: String,
        required: true,
    },
});

const FeedbakModule = mongoose.model("user-feedback", UserSchema);
module.exports = FeedbakModule;