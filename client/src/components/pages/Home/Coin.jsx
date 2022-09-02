import React from "react";
import "./Coin.css";
import { useNavigate } from "react-router-dom";

function Coin(props) {

  const history =  useNavigate();
  const abc = path => {
    history(path);
  };

  const usd_price = props.current_price

  const inr_price = props.current_price


let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

let rupeeIndian = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
});


  return (
    <>
    <div className="coin-container">
      <div className="coin-row"  onClick={() => abc(`/coin/${props.id}`)}>
        <div className="coin">
          <p className="rank-para">{props.rank}.</p>
          <img src={props.image} alt="crypto-symbol" />
          <h1>{props.name}</h1>
          <p className="coin-symbol">{props.symbol}</p>
        </div>

        <div className="coin-data">
        {props.currency === "USD" ? ( <p className="coin-price">
            {dollarUS.format(usd_price)}
          </p>):( <p className="coin-price">
            {rupeeIndian.format(inr_price)}
          </p>)}
         
          {props.priceChange < 0 ? (
            <p className="coin-percent red">{props.priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">
              +{props.priceChange.toFixed(2)}%
            </p>
          )}

          <p className="coin-marketcap">
            {props.currency === "USD" ? "$" : "₹"}
            {props.volume.toLocaleString().replace(/,/g, ".").slice(0, 5)}{" "}
            {props.currency === "USD" ? "billion" : "trillion"}
          </p>
        </div>
      </div>
    </div>
    </>
  );
  
}

export default Coin;
