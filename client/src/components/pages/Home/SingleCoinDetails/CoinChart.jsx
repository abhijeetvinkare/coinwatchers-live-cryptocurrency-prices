import React, { useContext, useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
// loading spinner
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import coinGecko from "./CoinGeckoApi";
import ChartDisply from "./ChartDisply";
import CurrencyContext from "../Context/CurrencyContext";

const CoinChart = () => {

  const currency = useContext(CurrencyContext);

  const params = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    const [day, week, twoweek, month, year, detail] = await Promise.all([
      coinGecko.get(`/coins/${params.coinId}/market_chart/`, {
        params: {
          vs_currency: currency,
          days: "1",
        },
      }),
      coinGecko.get(`/coins/${params.coinId}/market_chart/`, {
        params: {
          vs_currency: currency,
          days: "7",
        },
      }),
      coinGecko.get(`/coins/${params.coinId}/market_chart/`, {
        params: {
          vs_currency: currency,
          days: "14",
        },
      }),
      coinGecko.get(`/coins/${params.coinId}/market_chart/`, {
        params: {
          vs_currency: currency,
          days: "30",
        },
      }),
      coinGecko.get(`/coins/${params.coinId}/market_chart/`, {
        params: {
          vs_currency: currency,
          days: "365",
        },
      }),
      coinGecko.get("/coins/markets/", {
        params: {
          vs_currency: currency,
          ids: params.coinId,
        },
      }),
    ]);

    setCoinData({
      day: formatData(day.data.prices),
      week: formatData(week.data.prices),
      twoweek: formatData(twoweek.data.prices),
      month: formatData(month.data.prices),
      year: formatData(year.data.prices),
      detail: detail.data[0],
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currency]);

  return (
    <div>
      <div>
        {isLoading ? (
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
      <ChartDisply data={coinData} />
    </div>
  );
};

export default CoinChart;
