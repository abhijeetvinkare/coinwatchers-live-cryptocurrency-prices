import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import more from "./more.png";
import userr from "./user.png";
import email from "./email.png";
import lock from "./lock.png";
import passwordicon from "./key.png";
import "./SignUp.css";
import Swal from 'sweetalert2';
import axios from "axios";

function SignUp() {

  let message = document.getElementById("message");
  // confirm password code
  function checkPassword(){
    let password = document.getElementById("password").value;
    let cnfrmPassword = document.getElementById("cnfrm-password").value;
    let message = document.getElementById("message");
    let signupbtn = document.getElementById("signupbtn");
    

    if(password.length !== 0){
        if(password === cnfrmPassword){
            message.textContent = "Password match";
            message.style.color = "#1dcd59";
            document.getElementById("signupbtn").disabled = false;
            signupbtn.style.cursor = "pointer";
            signupbtn.style.backgroundColor ="#001524";
        }
        else{
            message.textContent = "Password doesn't match";
            message.style.color = "#ff4d4d";
            signupbtn.style.cursor = "no-drop";
            signupbtn.style.backgroundColor ="#706e6e96";
            document.getElementById("signupbtn").disabled = true;

        }
    }
    if(password.length === 0){
      message.textContent = "";
      signupbtn.style.backgroundColor ="#001524";
    }
  }

//getting user info

  const [userlogInInfo, setUserlogInInfo] = useState([]);
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const [userpass, setUserPass] = useState("");
  const [userpassconf, setUserPassconf] = useState("");

  function submitpass(event){
    setUserPass(event.target.value)
  }
  function submitpassconf(event){
    setUserPassconf(event.target.value)
  }

// top to page
  function toptopage(){
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }

  // post request for sending data to server
  function ResgisterNewUser(event){
    event.preventDefault();
      axios.post("/new-user-sign-up",{
      username,
      useremail,
      userpass,
    }).then((res)=>{
      if(res.data.message === "User Already Registered!"){
        Swal.fire('User Email Already Registered!')
      }else{
        Swal.fire(
          {
            icon: 'success',
            title: 'Success!',
            text: 'Registration Successfull',
            footer: '<a href="/sign-in">Log In</a>'
          }
        )
    }
      setUserlogInInfo([...userlogInInfo,{username,useremail, userpass}]);
    })

    setUserName("")
    setUserEmail("")
    setUserPass("")
    setUserPassconf("")
    message.textContent = "";
}


  return (
    <div>
      <div className="signup-signup-main-container">
        <div className="signup-signup-div">
          <div className="signup-upper-div-main">
            <h1 className="sign-up-welcome">Welcome</h1>
            <div className="signup-upper-div"></div>
            <img className="signup-dot-hr" src={more} alt="" />
          </div>
          <div className="user-signup-details-main">
            <form onSubmit={ResgisterNewUser} className="user-signup-details-sub">
            <div className="sign-up-name-field">
              <img className="sign-up-name-logo-field" src={userr} alt="" />
            <input
                type="text"
                maxLength="30"
                className="sign-up-input-name signup-input-fields"
                placeholder="Full Name"
                required
                onChange={(event) => setUserName(event.target.value)}
                value={username}
              />
              </div>
              <div className="sign-up-name-field">
              <img className="sign-up-name-logo-field" src={email} alt="" />
              <input
                type="email"
                className="sign-up-input-email signup-input-fields"
                placeholder="Email"
                required
                onChange={(event) => setUserEmail(event.target.value)}
                value={useremail}
              />
              </div>
              <div className="sign-up-name-field">
              <img className="sign-up-name-logo-field" src={lock} alt="" />
              <input
              id="password"
                type="password"
                className="sign-up-input-pass signup-input-fields"
                placeholder="Password"
                autoComplete="off"
                required
                onChange={(event) => {
                  submitpass(event)
                  checkPassword()
                }}
                value={userpass}
                />
              </div>
              <div className="sign-up-name-field">
              <img className="sign-up-name-logo-field" src={passwordicon} alt="" />
              <input
                type="password"
                className="sign-up-input-pass signup-input-fields"
                placeholder="Confirm-Password"
                id="cnfrm-password"
                autoComplete="off"
                required
                onChange={(event) => {
                  submitpassconf(event)
                  checkPassword()
                }}
                value={userpassconf}
              />
              </div>
              <p className="pass-match-msg" id="message"></p>
              <button id="signupbtn" className="sign-up-input-btn" type="submit" >
                Sign Up
              </button>



              <div className="signup-or-div">
                <p className="signup-OR">OR</p>
                <p className="signup-bottom-para">Already have an account?</p>
                <NavLink onClick={toptopage} to="/sign-in">
                  <p className="signup-sign">Log In</p>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default SignUp;
