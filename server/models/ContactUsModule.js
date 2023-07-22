const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
    },
    subject:{
        type: String,
    },
    message:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const ContactUsModule = mongoose.model("user-contactus-data", UserSchema);
module.exports = ContactUsModule;