import React, { useContext, useRef, useEffect, useState } from "react";
import Chartjs from "chart.js";
import "./ChartDisply.css";
import CurrencyContext from "../Context/CurrencyContext";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const ChartDisply = ({ data }) => {
  const currency = useContext(CurrencyContext);

  const chartRef = useRef();
  const { day, week, twoweek, month, year, detail } = data;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "14d":
        return twoweek;
      case "30d":
        return month;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              data: determineTimeFormat(),
              backgroundColor: "rgba(172,229,238)",
              borderColor: "rgba(30,144,255)",
              pointRadius: 0,
            },
          ],
        },
        options: {
          lineHeightAnnotation: {
            always: true,
            hover: false,
            lineWeight: 1.5,
          },

          animation: {
            duration: 2000,
          },
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                type: "time",
                distribution: "linear",
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      });
    }
  });

  const renderSmallDetails = () => {
    if (detail) {
      const usd_price = detail.current_price;
      const inr_price = detail.current_price;

      const low_usd_price = detail.low_24h;
      const low_inr_price = detail.low_24h;
      
      const high_usd_price = detail.high_24h;
      const high_inr_price = detail.high_24h;

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
          {currency === "USD" ? (
            <p className="chart-small-para">
              Current Price : {dollarUS.format(usd_price)}
            </p>
          ) : (
            <p className="chart-small-para">
              Current Price : {rupeeIndian.format(inr_price)}
            </p>
          )}

          {detail.price_change_percentage_24h < 0 ? (
            <p className="chart-small-para red">
              24H Change : {detail.price_change_percentage_24h.toFixed(2)}%
              <TrendingDownIcon color="danger" />
            </p>
          ) : (
            <p className="chart-small-para green">
              24H Change : +{detail.price_change_percentage_24h.toFixed(2)}%
              <TrendingUpIcon color="success" />
            </p>
          )}

          {currency === "USD" ? (
            <p className="chart-small-para">
              24H Low: {dollarUS.format(low_usd_price)}
            </p>
          ) : (
            <p className="chart-small-para">
              24H Low: {rupeeIndian.format(low_inr_price)}
            </p>
          )}

          {currency === "USD" ? (
            <p className="chart-small-para">
              24H High: {dollarUS.format(high_usd_price)}
            </p>
          ) : (
            <p className="chart-small-para">
              24H High: {rupeeIndian.format(high_inr_price)}
            </p>
          )}
        </>
      );
    }
  };
  const renderCoinName = () => {
    if (detail) {
      return (
        <>
          <h1>
            {detail.name} Price Chart ({currency.toUpperCase()})
          </h1>
        </>
      );
    }
  };

  return (
    <div>
      <div className="chat-heading-container">{renderCoinName()}</div>
      <div className="chart-small-details-para-div">{renderSmallDetails()}</div>
      <div className="chart-div">
        <canvas ref={chartRef} id="myChart"></canvas>
      </div>

      <div className="chart-button-div">
        <button onClick={() => setTimeFormat("24h")} className="chart-buttons">
          24 Hour
        </button>
        <button onClick={() => setTimeFormat("7d")} className="chart-buttons">
          7 Days
        </button>
        <button onClick={() => setTimeFormat("14d")} className="chart-buttons">
          14 Days
        </button>
        <button onClick={() => setTimeFormat("30d")} className="chart-buttons">
          1 Month
        </button>
        <button
          onClick={() => setTimeFormat("1y")}
          className="chart-buttons chart-buttonss"
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default ChartDisply;
