const express = require("express");
const router = express.Router();
const NewUsers = require("../models/NewUsers");

// Remove coin from watchlist
router.post("/remove-coin-from-watchlist", (req, res) => {
  const { _id, coinid } = req.body;
  NewUsers.updateOne(
    { _id: _id },
    { $pull: { WatchlistCoin: { coinid: coinid } } },
    (err, newuser) => {
      if (newuser) {
        res.send({ message: "success" });
      } else {
        res.send({ message: "error!" });
      }
    }
  );
});

//get watchlist
router.post("/get-signed-user-watchlist",(req,res) =>{
    const {WatchlistUserIdd} = req.body
    NewUsers.findOne({_id:WatchlistUserIdd},(err,result) => {
        if(err){
            res.json(err);
        }else{
            res.json(result);
        }
    })
})

module.exports = router;
