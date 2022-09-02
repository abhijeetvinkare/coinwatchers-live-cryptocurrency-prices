import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Swal from "sweetalert2";
// loading spinner
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "./WatchCoin.css";

function WatchCoin(props) {
 


  const [Coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const currency = props.currency;

  const user_details = JSON.parse(localStorage.getItem("user-info"));

  const history = useNavigate();
  const abc = (path) => {
    history(path);
  };

  useEffect(() => {

    APICALL();
    //render after coin removed
    function get_user_watchlist() {
      if (localStorage.length > 0) {
        const user_details = JSON.parse(localStorage.getItem("user-info"));
        const WatchlistUserIdd = user_details._id;
        axios
          .post("/get-signed-user-watchlist", { WatchlistUserIdd })
          .then((res) => {
            if (res) {
              localStorage.setItem(
                "user-watchlisted-coins",
                JSON.stringify(res.data.WatchlistCoin)
              );
            }
          });
      }
    }
    get_user_watchlist();
  }, [currency]);

  const options = {
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${props.coinname}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  };

  async function APICALL() {
    setLoading(true);
    await axios
      .request(options)
      .then(function (response) {
        setCoins(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    setLoading(false);
  }

  const _id = user_details._id;
  const coinid = props.coinid;

  function onclick_removecoin() {
    axios.post("/remove-coin-from-watchlist", {
        _id,
        coinid,
      })
      .then((res) => {
        if (res.data.message === "success") {
          Swal.fire({
            text: "Coin Successfully Removed From WatchList.",
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then((result) => {
            if (result.isConfirmed) {
              const user_details = JSON.parse(
                localStorage.getItem("user-info")
              );
              const WatchlistUserIdd = user_details._id;
              axios
                .post("/get-signed-user-watchlist", { WatchlistUserIdd })
                .then((res) => {
                  if (res) {
                    localStorage.setItem(
                      "user-watchlisted-coins",
                      JSON.stringify(res.data.WatchlistCoin)
                    );
                  }
                });
            }
            setTimeout(() => {
              window.location.reload(false);
            }, 300);
          });
        } else {
          alert("error");
        }
      });
  }

  const usd_price = Coins[0]?.current_price

  const inr_price = Coins[0]?.current_price

  let dollarUS = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let rupeeIndian = Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });


  return (
    <div className="watchlist-top-div">
      <div className="watchlist-coin-main-container">
        <div
          className="watchlist-coin-row"
          onClick={() => abc(`/coin/${props.coinname}`)}
        >
          <div className="coin-watchlist-row">
            <p className="rank-para">{Coins[0]?.market_cap_rank}.</p>
            <img
              className="watchlist-coin-imag"
              src={Coins[0]?.image}
              alt="crypto-symbol"
            />
            <h1>{Coins[0]?.name}</h1>
            <p className="watchlist-coin-symbol">{Coins[0]?.symbol}</p>
          </div>

          <div className="watchlist-coin-data">
            {currency === "usd" ? (
              <p className="watchlist-coin-price">{dollarUS.format(usd_price)}</p>
            ) : (
              <p className="watchlist-coin-price">{rupeeIndian.format(inr_price)}</p>
            )}

            {Coins[0]?.price_change_percentage_24h < 0 ? (
              <p className="watchlist-coin-percent red">
                {Coins[0]?.price_change_percentage_24h.toFixed(2)}%
              </p>
            ) : (
              <p className="watchlist-coin-percent green">
                +{Coins[0]?.price_change_percentage_24h.toFixed(2)}%
              </p>
            )}

            <p className="watchlist-coin-marketcap">
              {currency === "usd" ? "$" : "₹"}
              {Coins[0]?.market_cap
                .toLocaleString()
                .replace(/,/g, ".")
                .slice(0, 5)}{" "}
              {currency === "usd" ? "billion" : "trillion"}
            </p>
          </div>
        </div>
        <div className="rmv-btn">
          <Tooltip title="Remove Coin">
            <div className="delete-user-icon-btn">
              <IconButton onClick={onclick_removecoin}>
                {" "}
                <DeleteIcon color="action" fontSize="large"></DeleteIcon>
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </div>
      <div>
        {loading ? (
          <Backdrop
            sx={{
              color: "#ffffff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default WatchCoin;
