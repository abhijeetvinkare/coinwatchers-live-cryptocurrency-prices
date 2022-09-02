import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./Contact.css";
import contact_img from './undraw-contact.svg'
import Swal from 'sweetalert2'

function Contact() {

  const [listofusers, setListofusers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/get-contactus-form-data").then((response) =>{
      setListofusers(response.data);
    });
  }, []);

  function createUser(event){
    event.preventDefault();
    const response = axios.post("/post-contactus-form-data",{
      name,
      email,
      subject,
      message 
    }).then((response)=>{
      setListofusers([...listofusers,
        {
          name,
          email,
          subject,
          message
      }])
    })
    
    if(response){
      Swal.fire(
        {
          icon: 'success',
          title: 'Success!',
          text: 'Thank you for getting in touch!',
          footer: '<a href="/contact-response">See Your Response</a>'
        }
      )
    }else{
      alert("Something Went Wrong!")
  }

  setName("")
  setEmail("")
  setSubject("")
  setMessage("")

  }

  return (
    <div className='contact-main-container'>
      <div className='contact-left-container'>
      <h1 className="contact-heading">Let's talk about everything!</h1>
      <p className="contact-para"></p>
      <img className="contact-img" src={contact_img} alt="" />
      </div>
      <div className='contact-left-container'>
        <form onSubmit={createUser} className='contact-form-div'>
            <input name="name" onChange={(event)=>{setName(event.target.value)}} value={name}  className='contact-input'  type="text" placeholder='Your name' required/>
            <input name= "email" onChange={(event)=>{setEmail(event.target.value)}} value={email}  className='contact-input'type="text" placeholder='Email' />
            <input name= "subject" onChange={(event)=>{setSubject(event.target.value)}} value={subject}  className='contact-input'type="text" placeholder='Subject'/>
            <textarea name="message" onChange={(event)=>{setMessage(event.target.value)}} value={message}  className='contact-input' rows="10" cols="30" placeholder='Write your message' required></textarea>
            <button className='contact-btn' type='submit'> Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact