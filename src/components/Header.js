import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCartArrowDown, faCartShopping, faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { jwtDecode } from "jwt-decode";
import styles from "@/styles/header.module.css";


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
    <header className={styles.navcontainer}>
    <nav className={styles.navbarcontainer}>
      <input type="checkbox" className={styles.check} id="check"/>
      <label for="check" className={styles.checkbtn}>
           <FontAwesomeIcon icon={faBars} aria-hidden="true" color='black'/>
      </label>
      <label class={styles.navbarlabel}>
      <Link  href='/'>
        {/* <img src="/images/logo-white.svg" alt="logo"/> */}
         <img src="/images/logo-black.svg" alt="logo" class="dark"/>
      </Link>
      </label>
      <ul>
         <li><Link  href='/'>Home</Link></li>
         <li><Link href='/About' >About Us</Link></li>
         <li><Link href="/Repairmydevice" >Repair My Device</Link></li>
         <li><Link href="/offers" >Offers</Link></li>
         <li><Link href="/Contactus">Contact Us</Link></li>
         <li data-tooltip-id="phone-mark" onClick={() => handlePhonePad()}><a href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" className={styles.phonemenuitem}><FontAwesomeIcon className="icon" icon={faPhone}/></a></li>
         <li><Link href={validUser ? "Userpanel" : "Login"} className={styles.loginmenuitem}>{userDetails.username ? `${userDetails.username}` : 'Login'}<FontAwesomeIcon className="icon" icon={faUser}/></Link></li>
         <li><Link href='Cart'><FontAwesomeIcon icon={faCartArrowDown} size="lg"/></Link></li>
      </ul>
    </nav>
  </header>
  )
}