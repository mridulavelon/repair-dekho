import Link from 'next/link';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import RiseLoader from "react-spinners/RiseLoader";
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';
import { useDispatch,useSelector } from 'react-redux';
import { addShippingdetails,addbillingdetails, adduserobj } from 'slices/counterSlice';
import { PuffLoader } from 'react-spinners';


export default function Login () {
  const dispatch = useDispatch();
  const auth = useAuth();
  const reduxstate = useSelector((state) => state.counter);
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState(""); 
  const [loading,setLoading] = useState(true);
  const[submitting,setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
        setLoading(false);
    },1000);
  },[])
  
  const getAllData = async () => {
    if(document.cookie){
    let cookies = document.cookie.split(';')
    let idarray = cookies[1].split('=');
    const data = {
        userid:idarray[1]
    }
    const response2 = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accountdetails/getdetails`,data);
    if(response2.data){
        dispatch(adduserobj(response2.data));
    }
    if(response2.data.billingaddress){
       let addressarray = response2.data.billingaddress.split(';');
       let housenumberarray = addressarray[0].split('=');
       let apartmentnoaaray = addressarray[1].split('=');
       let townarray = addressarray[2].split('=');
       let statearray = addressarray[3].split('=');
       let pincodearray = addressarray[4].split('=');
      let address = {
          housenumber:housenumberarray[1],
          apartmentno:apartmentnoaaray[1],
          town:townarray[1],
          state:statearray[1],
          pincode:pincodearray[1]
      }
      dispatch(addbillingdetails(address));
    }
    if(response2.data.shippingaddress){
        let addressarray = response2.data.shippingaddress.split(';');
        let housenumberarray = addressarray[0].split('=');
        let apartmentnoaaray = addressarray[1].split('=');
        let townarray = addressarray[2].split('=');
        let statearray = addressarray[3].split('=');
        let pincodearray = addressarray[4].split('=');
       let address = {
           housenumber:housenumberarray[1],
           apartmentno:apartmentnoaaray[1],
           town:townarray[1],
           state:statearray[1],
           pincode:pincodearray[1]
       }
       dispatch(addShippingdetails(address));
     }
    }
    
}

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
       document.cookie = `token=${response.data.token}`
       document.cookie = `id=${response.data.id}` 
       getAllData();
       if(Object.keys(reduxstate.modelobj).length > 0){
        router.push('/product');
       }else{
        router.push('/');
       }
      }

    }catch(error){
      setIsSubmitting(false);
      toast.error("Invalid username or password",{
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
    <title>Login</title>
    <link href="./images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="./css/Login.css" />
   </Head>
      <RiseLoader color='#ff5723'/>
      </div>
      ):(
      <>
    <Head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />   
    <title>Login</title>
    <link href="./images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="./css/Login.css" />
   </Head>
   <main style={{backgroundImage:"url('./images/slider-2.jpg')"}}>
      <div class="box">
        <div class="inner-box">
          <div class="forms-wrap">
            <form onSubmit={submitLogin} autocomplete="off" class="sign-in-form">
              <div class="heading">
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
            </div>
          </div>
        </div>
      </div>
    </main>
    <ToastContainer />
    </>)}
    </>
  )
};