import { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from "react-spinners/RiseLoader";
import { useRouter } from 'next/router';
import { PuffLoader } from 'react-spinners';


export default function Signup() {
  const router = useRouter();
  const [firstname,setFirstName] = useState("");
  const [lastname,setLastName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [mobileno,setMobileNo] = useState("");
  const [loading,setLoading] = useState(true);
  const[submitting,setIsSubmitting] = useState(false);


  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    },1000);
  },[])


  const submitSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try{
      const data = {
        firstname:firstname,
        lastname:lastname,
        username:username,
        mobileno:Number(mobileno),
        email:email,
        password:password
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`,data)
      if(response){
        toast.success("Registered successfully",{
          theme:"colored"
        })
        setIsSubmitting(false);  
      }
      setTimeout(() => {
        router.push('/Login');
    },1000);
    }catch(error){
      toast.error(error.response.data.message,{
        theme:"colored"
      })
      setIsSubmitting(false);
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
    <title>Signup</title>
    <link href="./images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="./css/Signup.css" />
   </Head>
      <RiseLoader color='#ff5723'/>
      </div>
    ):(
    <>
    <Head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signup</title>
    <link href="./images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="./css/Signup.css" />
   </Head>
   <main style={{backgroundImage:"url('./images/slider-2.jpg')"}}>
      <div class="box">  
        <div class="inner-box">
        <div class="carousel">
            <div class="images-wrapper">
              <img src="./images/image1.png" class="image img-1 show" alt="" />
              <img src="./images/image2.png" class="image img-2" alt="" />
              <img src="./images/image3.png" class="image img-3" alt="" />
            </div>

            <div class="text-slider">
              <div class="text-wrap">
                <div class="text-group">
                  <h2>Login to place your order</h2>
                  <h2>Customize as you like</h2>
                  <h2>Invite students to your class</h2>
                </div>
              </div>

              <div class="bullets">
                <span class="active" data-value="1"></span>
                <span data-value="2"></span>
                <span data-value="3"></span>
              </div>
            </div>
          </div> 
          <div class="forms-wrap">
            <form onSubmit={submitSignup} autocomplete="off" class="sign-in-form">
              <div class="heading">
                <h2>Get Started</h2>
                <h6>Already have an account?</h6>
                <Link href="Login" className='toggle'>Login</Link>
              </div>

              <div class="actual-form">
                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='Firstname'
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='Lastname'
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='Username'
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div class="input-wrap">
                  <input
                    type="email"
                    class="input-field"
                    autocomplete="off"
                    required
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div class="input-wrap">
                  <input
                    type="tel"
                    class="input-field"
                    autocomplete="off"
                    required
                    placeholder='Mobile number'
                    pattern="[1-9]{1}[0-9]{9}"
                    maxlength="10"
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                </div>
                <div class="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button class="sign-btn" disabled={submitting ? true : false}>
                  {submitting ? (
                    <PuffLoader color='whitesmoke' size={20}/>
                    ) :(
                  <span>Submit</span>
                 )}
                </button>
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