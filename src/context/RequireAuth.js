import { useRouter } from "next/router";
import { useAuth } from "./auth-context";
import { useEffect,useState } from "react";
import axios from "axios";

export const RequireAuth = ({ children }) => {
    const router = useRouter();

    const verifySession = async() =>  {
        const cookieArray = document.cookie.split(";");
        const tokenCookieString = cookieArray.find((cookie) => cookie.includes("token"));
        let validUser = false;
        if(tokenCookieString){
          const tokenCookieArray = tokenCookieString.split("=");
          const token = tokenCookieArray[1]
          const data = {
            "token":token
          }
          const verifyCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/verify`,data)
          .then((response) => {
               if(response.data?.valid){
                   return true;
               }else{
                   return false; 
               } 
          }).catch((error) => {
               return false;
          })
          validUser = verifyCall;
        }else{
           validUser = false;
        }
        if(validUser && router.pathname === "/Login" || validUser && router.pathname === "/Forgotpassword" || validUser && router.pathname === "/Resetpassword" || validUser && router.pathname === "/Signup"){
            router.replace("/Userpanel")
        }else if(!validUser && router.pathname === "/Userpanel"  || !validUser && router.pathname === "/Checkout"){
            router.replace("/Login")
        }
      }


    useEffect(() => {
        verifySession();
    },[router.pathname])

    return children;
}