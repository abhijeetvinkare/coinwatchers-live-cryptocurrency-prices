const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: './config.env'});
const app = express();
app.use(express.json());
const path = require("path");
const cors = require("cors");
app.use(cors());

const connectDB = require("./config/db");
connectDB()

const ContactUsModule = require("./models/ContactUsModule");
const NewUsers = require("./models/NewUsers");
const FeedbakModule = require("./models/FeedbakModule")


// getting user contact-us data
app.get("/get-contactus-form-data",(req,res) =>{
    ContactUsModule.find({},(err,result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    }).sort({_id:-1}).limit(1)
})

// user contact response data save
app.post("/post-contactus-form-data",async (req,res) => {
    const user = req.body;
    const newUser = new ContactUsModule(user);
    await newUser.save();
    res.json(user);
})

// saving user feedback in database
app.post("/user-feedback",async (req,res) => {
    const user = req.body;
    const newUser = new FeedbakModule(user);
    await newUser.save();
    res.json(user);
})

//registerd users data 
app.get("/get-signed-user",(req,res) =>{
    NewUsers.find({},(err,result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})


// Register New User
app.post("/new-user-sign-up",(req,res) => {
    const {username,useremail,userpass,} = req.body
    NewUsers.findOne({ useremail: useremail},(err,newuser) => {
        if(newuser){
             res.send({message : "User Already Registered!"});
        }else{
    const newuser = new NewUsers({
        username,
        useremail,
        userpass
    });
     newuser.save();

    res.json(newuser);}
})
})

// user login authentication
app.post("/api/login",(req, res)=>{
    const {email, password} = req.body
    NewUsers.findOne({ useremail: email},(err,user) => 
   { if(user){
        if(password === user.userpass){
        res.send({message : "Succesfull",user:user});
    }else{
        res.send({message : "passwordnotmatch"});
    }
    }else{
        res.send({message : "user not found!"});
    }}
)})

//delete user account
app.post("/delete-user",(req,res) => {
    const {userid} = req.body
    NewUsers.deleteOne({ _id: userid},(err,newuser) => {
        if(newuser){
             res.send({message : "User Deleted!"});
        }else{
            res.send({message : "error!"});
        }
})
})

//add coin to watchlist
app.post("/add-to-watchlist",(req,res) => {
    const {WatchlistUserId,WatchlistCoin,WatchlistCoinId,} = req.body
    NewUsers.findOne({ _id: WatchlistUserId},{WatchlistCoin: {$elemMatch: {coinid:WatchlistCoinId}}}
        ,(err,result) => {
            if(err){
                res.json(err);
            }else if(!result.WatchlistCoin.length){
                NewUsers.updateOne({_id:WatchlistUserId},{$push:{ WatchlistCoin :{"coinid":WatchlistCoinId,"coinname":WatchlistCoin}}},(err,newusercoin) => {
                    if(newusercoin){
                        res.send({message:"success"});
                    }else{
                     res.send({message : "error"});
                }
            })
            }
            else{
                res.send({message : "already"});
            }
        })
    }
)

//get watchlist
app.post("/get-signed-user-watchlist",(req,res) =>{
    const {WatchlistUserIdd} = req.body
    NewUsers.findOne({_id:WatchlistUserIdd},(err,result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})

//remove coin from watchlist
app.post("/remove-coin-from-watchlist",(req,res) => {
    const {_id,coinid} = req.body
    NewUsers.updateOne({ _id: _id},{ $pull: { WatchlistCoin: { coinid: coinid} } },(err,newuser) => {
        if(newuser){
             res.send({message : "success"});
        }else{
            res.send({message : "error!"});
        }
})
})


const PORT = process.env.PORT || 5000;

// ------------------------------------------deyployment----------------------------------- 

// const __dirname1 = path.resolve();

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.resolve(__dirname1, "./client/build")));

//   app.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname1, "client", "build", "index.html"))
//   );
// } else {
//   app.get("/", (req, res) => {
//     res.send("API is running..");
//   });
// }

// ------------------------------------------deyployment----------------------------------- 


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});