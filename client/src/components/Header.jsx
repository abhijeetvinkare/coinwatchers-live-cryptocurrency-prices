import React from "react";
import "./Header.css";
// import logo from "./images/blue1.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CDropdownMenu,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
} from "@coreui/react";

function Header() {
  // function for hide side bar on mobile devices on link Click
  function onclik() {
    document.getElementById("click").checked = false;
  }

  let navigate = useNavigate();
  function handleClickNavigate() {
    navigate("/");
  }

  function logout() {
    localStorage.clear();
    handleClickNavigate();
  }

  let user = JSON.parse(localStorage.getItem("user-info"));

  return (
    <div>
      <nav>
        <NavLink to="/">
          <div className="logo-container">
            <div className="logo-name">Coinwatchers</div>
          </div>
        </NavLink>

        <input type="checkbox" id="click" />
        <label htmlFor="click" className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>

        <ul className="ul">
          <li className="home-sidebar">
            <NavLink to="/" className="a" onClick={onclik}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/news" className="a" onClick={onclik}>
              NEWS
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className="a" onClick={onclik}>
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className="a" onClick={onclik}>
              CONTACT
            </NavLink>
          </li>
          <li>
            {localStorage.getItem("user-info") ? (
              <div>
                <CDropdown>
                  <CDropdownToggle color="primary">
                    <span className="after-login-name">
                      &nbsp; Hi, {user.username.split(" ")[0]} &nbsp;
                    </span>
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <NavLink
                      to="/user-profile"
                      className="login-userprofile-navlink"
                      onClick={onclik}
                    >
                      <CDropdownItem>Profile</CDropdownItem>
                    </NavLink>
                    <NavLink
                      to="/user/watchlist"
                      className="login-userprofile-navlink"
                      onClick={onclik}
                    >
                      <CDropdownItem>WatchList</CDropdownItem>
                    </NavLink>
                    <CDropdownItem onClick={logout} href='/'>
                      Logout
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
            ) : (
              <NavLink to="/sign-in" className="sign-in-btn" onClick={onclik}>
                SIGN IN
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
