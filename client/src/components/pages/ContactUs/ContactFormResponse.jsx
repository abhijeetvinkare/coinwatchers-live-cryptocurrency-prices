import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./ContactFormResponse.css";
import more from './more.png';

function ContactFormResponse() {


    const [userResponse, setUserResponse] = useState([]);

    useEffect(() => {
        axios.get("/get-contactus-form-data").then((response) =>{
          setUserResponse(response.data);
          console.log(response.data);
        });
      }, []);


  return (
    <div className='contact-response-main-container'>
      {userResponse.map((user) => {
            return  <div className='contact-response-div'>
            <div className='response-upper-div-main'>
              <div className="response-upper-div">
              </div>
              
              <div className='response-name-div'> 
                <p className='response-user-name'> Hi, {user.name.split(" ")[0]}</p>
              </div>
              <p className='response-para'>Following is Your Response </p>
              <img className='response-dot-hr' src={more} alt="" />
              </div>
              <div className='user-response-details-main'>
                <div className='user-response-details-sub'>
                <p className='user-response-name user-response-details' ><span className='user-response-span'> Your Name :</span><br /> {user.name}</p>
                <p className='user-response-email user-response-details' ><span className='user-response-span'>Your Email : </span> <br /> {user.email}</p>
                <p className='user-response-subject user-response-details' ><span className='user-response-span'>Your Subject : </span> <br />{user.subject}</p>
                <p className='user-response-msg user-response-details' ><span className='user-response-span'>Your Message : </span> <br /> {user.message} </p>
                </div>
              </div>
            </div>
          })}
     
    </div>
  )
}

export default ContactFormResponse;