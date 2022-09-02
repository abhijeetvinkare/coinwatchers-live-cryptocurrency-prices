import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import more from './more.png';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function UserProfile() {

    const [userid, setUserid] = useState("");

    let user = JSON.parse(localStorage.getItem("user-info"));

    useEffect(() => {
      setUserid(user._id); 
    }, []);

    let navigate = useNavigate();
    function handleClickNavigate() {
      navigate("/");
    }


    function deletealert(){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteuserAccount()
        }
      })
    }

    function deleteuserAccount(event){
      axios.post("/delete-user",{
      userid,
    }).then((res)=>{
      if(res.data.message === "User Deleted!"){
       localStorage.clear();
       Swal.fire(
        {
          icon: 'success',
          title: 'Deleted!',
          text: 'Account Successfully Deleted!',
          footer: '<a href="/sign-up">Create New Account</a>'
        }
      )
       handleClickNavigate();
      }else{
        alert("error");
    }
      
    })

    }

  return (
    <div className='userprofile-userprofile-main-container'>
     <div className='userprofile-userprofile-div'>
         <div className='delete-icon-btn-div'>
         <Tooltip title="Delete Account"><div className="delete-user-icon-btn"><IconButton onClick={deletealert}> <DeleteIcon color="action" fontSize="large"></DeleteIcon></IconButton></div></Tooltip>
         </div>
          <div className='userprofile-upper-div-main'>
        
            <div className="userprofile-upper-div">
            </div>
            <div className='userprofile-name-div'> 
              <p className='userprofile-user-name'> Hi, {user.username.split(" ")[0]}</p>
            </div>
            <p className='userprofile-para'>Your Profile</p>
            <img className='userprofile-dot-hr' src={more} alt="" />
            </div>
            <div className='user-userprofile-details-main'>
              <div className='user-userprofile-details-sub'>
              <p className='user-userprofile-name user-userprofile-details' ><span className='user-userprofile-span'> Your Name :</span><br /> {user.username}</p>
              <p className='user-userprofile-email user-userprofile-details' ><span className='user-userprofile-span'>Your Email : </span> <br /> {user.useremail}</p>
              </div>
            </div>
          </div>
  </div>
  )
}

export default UserProfile