import React from "react";
import "./Footer.css";
import { NavLink } from "react-router-dom";

function Footer() {

  const d = new Date();
  let year = d.getFullYear();

  function toptopage() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  return (
    <footer>
      <div className="footer-heading-div">
        <h1 className="footer-h1">Coinwatchers</h1>
      </div>
      <div className="footer-nav-main">
        <div className="footter-nav-div">
          <ul className="footer-nav-list">
            <li className="footer-li">
              <NavLink onClick={toptopage} className="footer-navlink" to="/">
                HOME
              </NavLink>
            </li>
            <li className="footer-li">
              <NavLink
                onClick={toptopage}
                className="footer-navlink"
                to="/news"
              >
           
                NEWS
              </NavLink>
            </li>
            <li className="footer-li">
              <NavLink
                onClick={toptopage}
                className="footer-navlink"
                to="/about"
              >
              
                ABOUT
              </NavLink>
            </li>
            <li className="footer-li">
              <NavLink
                onClick={toptopage}
                className="footer-navlink"
                to="/contact"
              >
             
                CONTACT
              </NavLink>
            </li>
            <li className="footer-li">
              <NavLink
                onClick={toptopage}
                className="footer-navlink"
                to="/feedback"
              >
                
                FEEDBACK
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-social-div">
        <a href="https://twitter.com/karanvinkare" target="_blank" rel="noopener noreferrer" className="footer-social-link">
          <span>Twitter</span>
        </a>
        <a href="https://www.instagram.com/____abhijeet__vinkare____/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
          <span>Instagram</span>
        </a>
        <a href="https://github.com/abhijeetvinkare" target="_blank" rel="noopener noreferrer" className="footer-social-link">
          <span>Github</span>
        </a>
        <a href="https://www.linkedin.com/in/abhijeet-vinkare-2956a61ab/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
          <span>Linkedin</span>
        </a>
      </div>
      <div className="copyright-div">
        <p className="copyright-para">
          Copyright ©{year} All rights reserved | Made with
          <span className="footer-love-icon"> ❤ </span> by Abhijeet_Vinkare
        </p>
      </div>
    </footer>
  );
}

export default Footer;
