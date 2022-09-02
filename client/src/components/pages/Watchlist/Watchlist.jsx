import React, { useEffect, useState } from "react";
import WatchCoin from "./WatchCoin";
import "./Watchlist.css";

function Watchlist() {
  const [watchcoin, setwatchcoin] = useState([]);
  const [currency, setCurrency] = useState("inr");

  const user_coin_details = JSON.parse(
    localStorage.getItem("user-watchlisted-coins")
  );
  const user_info = JSON.parse(localStorage.getItem("user-info"));

  useEffect(() => {
    setwatchcoin(user_coin_details);
  }, []);


  return (
    <>
      {watchcoin.length === 0 ? (
        <div className="emptylist-main-div">
          <div className="emptylist-div">
          <h1>Hey, {user_info.username.split(" ")[0]} your watchlist is empty.</h1>
          </div>
        </div>
      ) : (
        <>
          <div className="watchlist-heading">
            <h1>
              Hi, {user_info.username.split(" ")[0]}. Here is Your Watchlist
            </h1>
          </div>
          <div className="watch-select-currency-box">
            <label htmlFor="" className="watch-select-currency-label">
              Select Currency :
            </label>
            <select
              className="watch-select"
              onChange={(event) => setCurrency(event.target.value)}
            >
              <option value="inr">INR</option>
              <option value="usd">USD</option>
            </select>
          </div>
          <div className="watchlist-main-container">
            {watchcoin.map((data) => {
              return (
                <WatchCoin
                  key={data._id}
                  coinname={data.coinname}
                  coinid={data.coinid}
                  currency={currency}
                  id={data._id}
                />
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Watchlist;
