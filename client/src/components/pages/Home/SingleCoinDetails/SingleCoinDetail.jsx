import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CoinChart from "./CoinChart";
// loading spinner
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import DOMPurify from "dompurify";
import "./SingleCoinDetail.css";
import CurrencyContext from "../Context/CurrencyContext";
//sweetalert
import Swal from 'sweetalert2';

function toptopage() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

function SingleCoinDetail(props) {
  const params = useParams();
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("inr");

  
   const [WatchlistCoin, setWatchlistCoin] = useState(" ");
   const [WatchlistUserId, setWatchlistUserId] = useState(" ");
   const [WatchlistCoinId, setWatchlistCoinId] = useState(" ");

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    CoinAPI();
    toptopage();
    function setuserid() {
      if(localStorage.getItem("user-info")===null){
        setWatchlistUserId("123");
      }else{
        const user_details =  JSON.parse(localStorage.getItem("user-info"));
        setWatchlistUserId(user_details._id);
      }
    }
    setWatchlistCoin(params.coinId);
    setuserid();
  }, [currency]);



  async function CoinAPI() {
    setLoading(true);
    await axios
      .get(url)
      .then((res) => {
        setCoin(res.data);
        setWatchlistCoinId(res.data.coingecko_rank);
      })
      .catch((error) => {
        console.log(error);
      });
    setLoading(false);
  }


  function onclick_add_to_watchlist(event){
    event.preventDefault()
    axios.post("/add-to-watchlist",{
      WatchlistUserId,
      WatchlistCoin,
      WatchlistCoinId,
    }).then((res)=>{
      if(res.data.message === "success"){
        Swal.fire({
          text: "Coin Successfully Added to WatchList.",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result) => {
          if (result.isConfirmed) {
            const user_details =  JSON.parse(localStorage.getItem("user-info"));
            const WatchlistUserIdd = user_details._id
            axios.post("/get-signed-user-watchlist",{WatchlistUserIdd,}).then((res)=>{
              if(res){
                localStorage.setItem("user-watchlisted-coins",JSON.stringify(res.data.WatchlistCoin));
              }
            })
          }
        })
      }else if(res.data.message ==="already"){
        Swal.fire({
          html: '<b>Coin Already Present in the WatchList</b>',
          icon:"warning",
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
          footer: '<a href="/user/watchlist">Show WatchList</a>',
        })
    }else{
      Swal.fire({
        html: '<b>Login Required to Add a Coin to Watchlist</b>',
        icon: 'info', 
        showCloseButton: true,
        confirmButtonText:
        '<b><a href="/sign-in">LOGIN</a></b> ',
        confirmButtonColor: "#89CFF0",
        footer:
        '<b>Click On Login 👆</b>',
      })
    }
    })
}

  return (
    <>
      <div className="main-container">
        <div className="sidebar-container">
        <div className="chart-select-currency-box">
        <label htmlFor="" className="chart-select-currency-label">
          Select Currency :
        </label>
        <select
          className="chart-select"
          onChange={(event) => setCurrency(event.target.value)}
        >
          <option value="INR">INR</option>
          <option value="USD">USD</option>
          
        </select>
      </div>
          {coin.image ? (
            <img className="coin-symbol-img" src={coin.image.large} alt="" />
          ) : null}
          <h1 className="coin-name-heading"> {coin.name}</h1>
          <p className="coin-about"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                coin.description ? coin.description.en : ""
              ).split(/\r?\n/)[0],
            }}
          ></p>

          <button className="wathchlist-btn" onClick={onclick_add_to_watchlist} > ADD TO WATCHLIST </button>
        </div>
        <div className="graph-container">
          <CurrencyContext.Provider value={currency}>
            {props.children}
            <CoinChart coin={coin}/>
          </CurrencyContext.Provider>
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
    </>
  );
}

export default SingleCoinDetail;
