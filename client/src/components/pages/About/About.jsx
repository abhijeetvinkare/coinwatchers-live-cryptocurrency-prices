import React from "react";
import about from "./about1.png";
import "./About.css";

function About() {
  return (
    <div className="about-main-div">
      <div className="about-image-div">
        <img className="about-image" src={about} alt="" />
      </div>
      <div className="about-para-div">
        <h1 className="about-heading">About Coinwatchers</h1>
        <p className="about-para">
          We are building the cryptoeconomy – a more fair, accessible,
          efficient, and transparent financial system enabled by crypto. We
          started in 2022 with the radical idea that anyone, anywhere, should be
          able to easily track the live prices of the cryptocurrency. Today, we offer
          a trusted and easy-to-use platform for accessing the broader
          cryptoeconomy.
        </p>
      </div>
    </div>
  );
}

export default About;
