import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Feedback.css'
import Swal from 'sweetalert2'

function Feedback() {
    const [userfeedback, setUserfeedback] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
  
    function createUser(event){
      event.preventDefault();
      const response = axios.post("/user-feedback",{
        name,
        email,
        feedback 
      }).then((response)=>{
        setUserfeedback([...userfeedback,
          {
            name,
            email,
            feedback
        }])
      })
      
      if(response){
        Swal.fire(
          'Success!',
          'Thank you for your valuable feedback!',
          'success'
        )
      }else{
        alert("Something Went Wrong!")
    }
  
    setName("")
    setEmail("")
    setFeedback("")
  
    }
  
    return (
      <div className='feedback-main-container'>
        <div className='feedback-left-container'>
        <h1 className="feedback-heading">It is our pleasure to hear your valuable feedback!</h1>
        <p className="feedback-para"></p>
        </div>
        <div className='feedback-left-container'>
          <form onSubmit={createUser} className='feedback-form-div'>
              <input name="name" onChange={(event)=>{setName(event.target.value)}} value={name}  className='feedback-input'  type="text" placeholder='Your name' required/>
              <input name= "email" onChange={(event)=>{setEmail(event.target.value)}} value={email}  className='feedback-input'type="text" placeholder='Email' />
              <textarea name="feedback" onChange={(event)=>{setFeedback(event.target.value)}} value={feedback}  className='feedback-input' rows="10" cols="30" placeholder='Write your feedback' required></textarea>
              <button className='feedback-btn' type='submit'> Send Message</button>
          </form>
        </div>
      </div>
    )
}

export default Feedback