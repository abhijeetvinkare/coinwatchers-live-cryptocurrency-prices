const express = require("express");
const router = express.Router();

const ContactUsModule = require("../models/ContactUsModule");

// getting user contact-us data
router.get("/get-contactus-form-data",(req,res) =>{
    ContactUsModule.find({},(err,result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    }).sort({_id:-1}).limit(1)
})

// user contact response data save
router.post("/post-contactus-form-data",async (req,res) => {
    const user = req.body;
    const newUser = new ContactUsModule(user);
    await newUser.save();
    res.json(user);
})

module.exports = router;
