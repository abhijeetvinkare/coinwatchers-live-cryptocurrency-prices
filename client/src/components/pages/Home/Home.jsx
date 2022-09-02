import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./Coin";
import "./Home.css";
import "../News/Pagination.css";
import ReactPaginate from "react-paginate";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// loading spinner
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("inr");
  const [search, setSearch] = useState("");


  //page loading
  const [loading, setLoading] = useState(false);

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const coinsPerPage = 50;
  const pagesVisited = pageNumber * coinsPerPage;
  const pageCount = Math.ceil(coins.length / coinsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  function toptopage() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }
  //pagination end

  useEffect(() => {
    APICALL();
    get_user_watchlist();
  }, [currency]);

  const options = {
    method: "GET",
    url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=1000&page=1&sparkline=false`,
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

  const filteredCoins = coins.filter(
    (coin) =>
      coin.symbol.toLowerCase().includes(search.toLowerCase()) ||
      coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const displayCoins = filteredCoins
    .slice(pagesVisited, pagesVisited + coinsPerPage)
    .map((coin) => {
      return (
        <Coin
          key={coin.id}
          id={coin.id}
          image={coin.image}
          name={coin.name}
          symbol={coin.symbol}
          currency={currency}
          current_price={coin.current_price}
          volume={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
          rank={coin.market_cap_rank}
        />
      );
    });


//getting and setting user watchcoins to localstorage 
  function get_user_watchlist(){
      if(localStorage.length > 0){
        const user_details =  JSON.parse(localStorage.getItem("user-info"));
        const WatchlistUserIdd = user_details._id
        axios.post("/get-signed-user-watchlist",{WatchlistUserIdd,}).then((res)=>{
          if(res){
            localStorage.setItem("user-watchlisted-coins",JSON.stringify(res.data.WatchlistCoin));
          }
        })
      }
    }
//above code is to only to get watchcoin on home page renders. this code has nothing to do with home page.

  
  return (
    <div className="home-div-container">
      <div className="heading-and-other-main">
        <div className="heading-and-other">
          <h1> All Cryptocurrency Prices</h1>
          <div action="" className="search-box-container">
            <div className="search">
              <input
                type="text"
                className="searchTerm"
                placeholder="Search Coin ..."
                onChange={(event) => setSearch(event.target.value)}
              />
              <button
                type=""
                className="searchButton"
                onClick={() => setSearch("")}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="select-currency-box">
            <label htmlFor="" className="select-currency-label">
              Select Currency :
            </label>
            <select onChange={(event) => setCurrency(event.target.value)}>
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-heading">
        <p className="heading-1">CRYPTOCURRENCY</p>
        <p className="heading-2">SYMBOL</p>
        <p className="heading-3">PRICE</p>
        <p className="heading-4">24H</p>
        <p className="heading-5">MARKET CAP</p>
      </div>

      <div>
        {displayCoins}
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
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={
            <ArrowBackIosNewIcon fontSize="sm" onClick={toptopage()} />
          }
          nextLabel={
            <ArrowForwardIosIcon fontSize="sm" onClick={toptopage()} />
          }
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          pageRangeDisplayed={1}
          marginPagesDisplayed={1}
        />
      </div>
    </div>
  );
}

export default Home;
