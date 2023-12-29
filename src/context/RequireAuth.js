import { useRouter } from "next/router";
import { useAuth } from "./auth-context";
import { useEffect,useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { adduserobj,addbillingdetails,addShippingdetails } from "slices/counterSlice";

export const RequireAuth = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch();

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
        }else if(!validUser && router.pathname === "/Userpanel" || !validUser && router.pathname === "/Cart" || !validUser && router.pathname === "/Checkout"){
            router.replace("/Login")
        }
      }


    useEffect(() => {
        // getAllData();
        verifySession();
    },[router.pathname])

    return children;
}