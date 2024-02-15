import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { PuffLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'react-toastify/dist/ReactToastify.css';


export default function Login () {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState(""); 
  const[submitting,setIsSubmitting] = useState(false);
  const router = useRouter();
  const reduxstate = useSelector((state) => state.counter);

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = {
      "email":email,
      "password":password
    }
    try{
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`,data)
      if(response){
        setIsSubmitting(false);
        toast.success("Success",{
          theme:"colored"
        }) 
       document.cookie = `token=${response.data.token}`;
       if(reduxstate.cart.length > 0){
         const lastOrderIndex = reduxstate.cart.length - 1;
         const lastOrderRoute = reduxstate.cart[lastOrderIndex].modelid;
         router.push(`/product/${lastOrderRoute}`)
       }else{
        router.push('/');
       }
      }

    }catch(error){
      setIsSubmitting(false);
      console.log(error);
      toast.error("Invalid username or password",{
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
    <title>Login</title>
    <link href="/images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="/css/Login.css" />
   </Head>
   <main style={{backgroundImage:"url('/images/slider-2.jpg')"}}>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form onSubmit={submitLogin} autocomplete="off" class="sign-in-form">
              <div class="heading">
                <Link href="/">
                <div class="backwardlink-container">
                <FontAwesomeIcon className="icon" icon={faArrowLeft} />
                  <span>  Back to Home</span>
                </div>
                </Link>
                <h2>Login</h2>
                <h6>Not registred yet?</h6>
                <Link href="Signup" className='toggle'>  Sign up</Link>
              </div>

              <div class="actual-form">
                <div class="input-wrap">
                  <input
                    type="text"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder='Email or Mobile Number'
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                
                </div>
                <div class="input-wrap">
                  <input
                    type="password"
                    minlength="4"
                    class="input-field"
                    autocomplete="off"
                    placeholder="Password"
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

                <p class="text">
                  <Link href="Forgotpassword" class="forgot-link">Forgotten password?</Link>
                </p>
              </div>
            </form>
          </div>

          <div class="carousel">
            <div class="images-wrapper">
              <img src="/images/image1.png" class="image img-1 show" alt="" />
              <img src="/images/image2.png" class="image img-2" alt="" />
              <img src="/images/image3.png" class="image img-3" alt="" />
            </div>

            <div class="text-slider">
              <div class="text-wrap">
                <div class="text-group">
                  <h2>Login to place your order</h2>
                  <h2>Customize as you like</h2>
                  <h2>Invite students to your class</h2>
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
};