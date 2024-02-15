import Link from 'next/link';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function Forgotpassword() {
  const[email,setEmail] = useState("");
  const[verified,setVerified] = useState(false);


  const submitForgotPassword = async (e) => {
    e.preventDefault();
    const data = {
      "email":email,
    }
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forgotpassword`,data)
      if(response){
        toast.success("Success",{
          theme:"colored"
        })
        setVerified(true);  
      }
    }catch(error){
      toast.error(error.response.data.message,{
        theme:"colored"
      })
    }
  }

  const submitSendLink = async (e) => {
    e.preventDefault();
    try {
     const data = {
        email : email
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/resetpassword/sendlink`,data)
      if(response){
        toast.success("Reset link sent to your registered email id kindly check your mail",{
          theme:"colored"
        })
        setVerified(true);  
      }

    }catch(error){
      toast.error(error.response.data.message,{
        theme:"colored"
      })
    }
  }

  return (
    <>
    <Head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />   
    <title>Forgotpassword</title>
    <link href="/images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="/css/Login.css" />
   </Head>
   <main style={{backgroundImage:"url('/images/slider-2.jpg')"}}>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form onSubmit={verified ? submitSendLink : submitForgotPassword} autocomplete="off" class="sign-in-form">
              <div class="heading">
              <Link href="/">
                <div class="backwardlink-container">
                <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                  <span>  Back to Home</span>
                </div>
                </Link>
                <h2>Forgot your password</h2>
                <h6>Please enter your registered email address</h6>
              </div>

              <div class="actual-form">
                <div class="input-wrap">
                 {verified ? ( 
                 <div>
                   {email}
                 </div>
                 ):(
                   <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  )}
                </div>
                <input type="submit"  value={verified ? 'Send reset link' : 'Submit'} class="sign-btn" />
              </div>
            </form>
          </div>

          <div class="carousel" style={{background:'none'}}>
            <div class="images-wrapper">
              <img src="/images/forgot-password.avif" class="image img-1 show" alt="" />
            </div>

            <div class="text-slider">
              <div class="text-wrap">
                <div class="text-group">
                  <h2>Find your account in one click</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <ToastContainer />
    </>
  )
}