import React from "react";
import "./NewsData.css";

function NewsData(props) {
  return (
    <div className="card">
      <div className="card_image">
        <img className="news-img" src={props.image} alt="Crypto" />
      </div>
      <div className="card_content">
        <h2 className="card_title">{props.heading}</h2>
        <p className="card_text">{props.description.slice(0, 100)}....</p>
      </div>
      <div className="btn-div">
        <div className="time-update-div">
          <img
            className="provider-logo"
            src={props.newsprovider}
            alt="provider-img"
          />
          <p className="provider-updated-time">{props.newsupdatedtime}</p>
        </div>
        <a className="news-link" href={props.newslink}>
          <button className="btn">Read More</button>
        </a>
      </div>
    </div>
  );
}

export default NewsData;
