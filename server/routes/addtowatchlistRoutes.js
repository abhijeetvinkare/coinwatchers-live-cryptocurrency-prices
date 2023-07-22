const express = require("express");
const router = express.Router();
const NewUsers = require("../models/NewUsers");

//add coin to watchlist
router.post("/add",(req,res) => {
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

module.exports = router;
