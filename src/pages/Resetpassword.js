import { useEffect, useState } from 'react';
import Head from 'next/head'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from "react-spinners/RiseLoader";
import { useRouter } from 'next/router';



export default function  Resetpassword() {
  const [newpassword,setNewPassword] = useState("");
  const [confirmpassword,setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if(!router.isReady) return;
    if(!router.query.id){
       router.push('/')
    }
  }, [router.isReady])

  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    },1000);
  },[]);


  const submitResetPassword = async (e) => {
    e.preventDefault();
    if( newpassword === confirmpassword ){
      try{
        const data = {
          id:router.query.id,
          password:newpassword
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/resetpassword`,data)
        if(response){
          toast.success("Successfully changed password",{
            theme:"colored"
          });
          setTimeout(() => {
            router.push('/Login');
        },1000);
        }
      }catch(error){
        console.log(error);
      }
    }else{
      toast.error("New password and confirm password does not match",{
        theme:"colored"
      })
    }
  }

  return (
    <>
    {loading ? (
      <div className='loader'>
      <Head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Resetpassword</title>
    <link href="/images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="/css/Signup.css" />
   </Head>
     <RiseLoader color='#ff5723'/>
      </div>
    ):(
    <>
    <Head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Resetpassword</title>
    <link href="/images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="/css/Signup.css" />
   </Head>
   <main style={{backgroundImage:"url('./images/slider-2.jpg')"}}>
      <div class="box">
        
        <div class="inner-box">
        <div class="carousel" style={{background:'none'}}>
            <div class="images-wrapper">
              <img src="https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7886.jpg?w=2000" class="image img-1 show" alt="" />
            </div>

            <div class="text-slider" >
              <div class="text-wrap">
                <div class="text-group">
                  <h2>Create a new password</h2>
                </div>
              </div>
            </div>
          </div> 
          <div class="forms-wrap">
            <form onSubmit={submitResetPassword} autocomplete="off" class="sign-in-form">
              <div class="heading">
                <h2>Reset your password</h2>
                <h6>Create a unique password which you can remember</h6>
              </div>

              <div class="actual-form">

                <div class="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='New password'
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div class="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='Confirm new password'
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <input type="submit" value="Submit" class="sign-btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    <ToastContainer />
    </>)}
    </>
  )
}