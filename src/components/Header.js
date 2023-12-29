import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown, faCartShopping, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { jwtDecode } from "jwt-decode";


export default function Header({ location }) {
   const reduxstate = useSelector((state) => state.counter);
   const phoneNumber = "8750120761";
   const [showPhoneTooltip,setShowPhoneToolTip] = useState(false);
   const [validUser,setValidUser] = useState(false);
   const [userDetails,setUserDetails] = useState({});
   const handlePhonePad = () => {
      if (isMobile) {
         window.location.href = `tel:${phoneNumber}`;
       } else {
         navigator.clipboard.writeText("8750120761")
       }
   }

   useEffect(() => {
     const cookieArray = document.cookie.split(";");
     const tokenCookieString = cookieArray.find((cookie) => cookie.includes("token"));
     if(tokenCookieString){
        const tokenCookieArray = tokenCookieString.split("=");
        const token = tokenCookieArray[1]
        const decodedToken = jwtDecode(token);
        if(decodedToken.username && decodedToken.resource === "repairdekho"){
           setValidUser(true);
           setUserDetails(decodedToken)
        }else{
           setValidUser(false);
        }
     }else{
         setValidUser(false);
     }
   },[document.cookie])
  return (
    <>
    <header class="header animation headerbg header-white-bg">
    <div class="container">
       <div class="wrapper">
          <div class="header-item-left">
             <a href="/" class="brandlogo">
             <img src="/images/logo-white.svg" alt="logo" class="light"/>
             <img src="/images/logo-black.svg" alt="logo" class="dark"/>
             </a>
          </div>
          <div class="header-item-center hic">
             <div class="overlay"></div>
             <nav class="navbar navbar-expand-lg ">
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
      <Link class="nav-link" href='/'>Home</Link>
      </li>
      <li class="nav-item">
      <Link href='/About' class="nav-link">About Us</Link>
      </li>
      <li>
      <Link href="/Repairmydevice"  class="nav-link">Repair My Device</Link>
      </li>
      <li>
      <Link href="/offers" class="nav-link">Offers</Link>
      </li>
      <li>
      <Link href="/Contactus" class="nav-link">Contact Us</Link>
      </li>
      <li>
      <Link href="/blogs" class="nav-link">Blogs</Link> 
      </li>
     
    </ul>
   
  </div>
</nav>

           
          </div>
          <div class="header-item-right headeraction">
             <ul>
             <li data-tooltip-id="phone-mark" onClick={() => handlePhonePad()}><a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" class="menu-icon"><FontAwesomeIcon className="icon" icon={faPhone}/></a></li>
                <li><Link href={validUser ? "Userpanel" : "Login"} className="sw-btn sw-orange-btn header-btn">{userDetails.username ? `${userDetails.username}` : 'Login'}<FontAwesomeIcon className="icon" icon={faUser}/></Link></li>
                <li><button type="button" class="menu-mobile-toggle white"  data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span></span>  <span></span> <span></span> <span></span> </button> </li>
                <li class="">
                       <div class="switch-wrapper">
                          <label class="switch" for="blueket"> 
                          <Link href='Cart'><FontAwesomeIcon icon={faCartArrowDown} size="lg"/></Link>
                           </label> </div>
                    </li>
             </ul>
          </div>
       </div>
    </div>
 </header>
  </>
  )
}