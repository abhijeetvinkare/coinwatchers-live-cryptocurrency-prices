import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsData from "./NewsData";
import "./News.css";
import "./Pagination.css";
import moment from "moment";
import ReactPaginate from "react-paginate";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// loading spinner
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function News() {
  const demoNewsimage =
    "https://analyticsinsight.b-cdn.net/wp-content/uploads/2021/05/AdobeStock_288803828-1-1024x576.jpeg";
  const demosymbol =
    "https://cdn.vox-cdn.com/thumbor/wBRCdEaZtpAd2bJBlOhtRC6euVk=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21937385/binglogo.jpg";
  const [news, setNews] = useState([]);

  //loading
  const [loading, setLoading] = useState(false);

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const newsPerPage = 15;
  const pagesVisited = pageNumber * newsPerPage;

  useEffect(() => {
    NEWSAPICALL();
  }, []);

  const options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: "cryptocurrency crypto bitcoin btc eth",
      freshness: "Day",
      textFormat: "Raw",
      safeSearch: "Off",
      count: 100,
    },
    headers: {
      "x-bingapis-sdk": "true",
      "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
      "x-rapidapi-key": "plz put your api key",
    },
  };

  async function NEWSAPICALL() {
    setLoading(true);
    await axios
      .request(options)
      .then(function (response) {
        setNews(response.data.value);
      })
      .catch(function (error) {
        console.error(error);
      });
    setLoading(false);
  }

  const displayNews = news
    .slice(pagesVisited, pagesVisited + newsPerPage)
    .map((newsdata) => {
      return (
        <NewsData
          key={Math.round(Math.random() * 1000)}
          heading={newsdata.name}
          description={newsdata.description}
          image={newsdata?.image?.thumbnail?.contentUrl || demoNewsimage}
          newsprovider={
            newsdata.provider[0]?.image?.thumbnail?.contentUrl || demosymbol
          }
          newsupdatedtime={moment(newsdata.datePublished)
            .startOf("ss")
            .fromNow()}
          newslink={newsdata.url}
        />
      );
    });

  const pageCount = Math.ceil(news.length / newsPerPage);

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

  return (
    <div className="news-main-container">
      <div className="heading-container">
        <h1>Trending Cryptocurrency News</h1>
      </div>
      <div className="card-main">
        {displayNews}
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

export default News;
