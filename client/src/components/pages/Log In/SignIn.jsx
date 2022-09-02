import React, {useState } from 'react'
import './SignIn.css';
import more from './more.png'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function SignIn() {

  let navigate = useNavigate();
  function handleClickNavigate() {
    navigate('/');
  };
  function toastmsg()
  {toast.success('Login Successful', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
  });}
  const [user, setuser] = useState({
    email:"",
    password:""
  });

  function handlechange(event){
    const {name, value} = event.target
    setuser({
      ...user,
      [name]: value
    })
  }


  function loginSubmit(event){
    let messageee = document.getElementById("messageee");
    event.preventDefault()
    axios.post("/api/login",user).then((res) =>{
    if(res.data.message==="Succesfull"){
      toastmsg();
      setTimeout(()=>{
        handleClickNavigate();
    },800);

    
    localStorage.setItem("user-info",JSON.stringify(res.data.user));
    
    }else if(res.data.message==="passwordnotmatch"){
      messageee.textContent = "incorrect password";
    }else{
      messageee.textContent = "No User Found!";
    }
    
    
  })
}


  // top to page
  function toptopage(){
    window.scroll({
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
     });
  }

  // remove incoreect pass msg
  function reomvemsgInpass(){
    let messageee = document.getElementById("messageee");
    messageee.textContent = "";
  }
  
  return (
    <div>
        <div className='login-login-main-container'>
             <div className='login-login-div'>
            <div className='login-upper-div-main'>
              <h1 className='log-in-welcome'>Welcome</h1>
              <div className="login-upper-div">
              </div>
              <img className='login-dot-hr' src={more} alt="" />
              </div>
              <div className='user-login-details-main'>
                <form onSubmit={loginSubmit} className='user-login-details-sub'>
                <input name="email" type="email"  className='log-in-input-email login-input-fields' placeholder='Email' required
                 onChange={(event) => {
                  handlechange(event)
                  reomvemsgInpass()
                }}
                value={user.email}
                
                />
                <input name="password" type="password" className='log-in-input-pass login-input-fields' placeholder='Password' autoComplete='off' required
                 onChange={(event) => {
                  handlechange(event)
                  reomvemsgInpass()
                }}
                 value={user.password}/>
                 <p className="pass-match-msg-log-in" id="messageee"></p>
                <button  className='log-in-input-btn' type='submit'>LOGIN</button>
                <div className='login-or-div'>
                  <p className='login-OR'>OR</p>
                  <p className="login-bottom-para">Don’t have an account?</p>
                  <NavLink onClick={toptopage} to="/sign-up"> <p className='login-sign'>Sign Up</p></NavLink>
                </div>
                </form>
              </div>
            </div>
    </div>
    <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
    theme="dark"
    />
    </div>
  )
}

export default SignIn