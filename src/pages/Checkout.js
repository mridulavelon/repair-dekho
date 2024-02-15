import { useEffect,useState } from "react"
import { useRouter } from "next/router";
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import RiseLoader from "react-spinners/RiseLoader";
import { useDispatch,useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import states from '../Utils/states.json';
import { setCart } from "slices/counterSlice";

export default function Checkout () {
   const router = useRouter();
   const dispatch = useDispatch();
   const reduxstate = useSelector((state) => state.counter);
   const [orderplacing,setOrderPlacing] = useState(false);
   const [agreed,setAgreed] = useState(false);
   const [loading,setLoading] = useState(true);
   const [orderplaced,setOrderPlaced] = useState(false);
   const [userDetails,setUserDetails] = useState({});
   const [shippingAddress,setShippingAddress] = useState({});
   const [shippingAddressEdit,setShippingAddressEdit] = useState(true);
   const [addressExist,setAddressExist] = useState(false);
   const [preferredDateTime,setPreferredDateTime] = useState("");
   const [userid,setUserId] = useState("");

   useEffect(() => {
      if(reduxstate.cart.length > 0){
        setTimeout(() => {
            setLoading(false);
        },1000);
        getAllData();
      }else{
        router.push('/');
      }
    },[])


    const placeOrder = async () => {
        if(agreed === false){
            toast.error("Please accept the terms and conditions",{
                theme:"colored"
              })
        }else if(shippingAddress.housenumber == undefined){
            toast.error("Please update the shipping address",{
                theme:"colored"
              })
        }else if(preferredDateTime === ""){
            toast.error("Please select preferred service date and time",{
                theme:"colored"
              })
        }else{
            try{
                setOrderPlacing(true);
                await Promise.all(reduxstate.cart.map(async(order) => {
                    let data = {
                      ...order,
                      userid:userid,
                      userdetails:userDetails,
                      shippingaddress:shippingAddress,
                      orderdate:new Date(),
                      servicedatetimepreffered:preferredDateTime,
                      orderstatus:"Confirmed" 
                    };
                    const createOrderCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/createorder`,data)
                    .catch((error) => {
                    })
                  }));
                   dispatch(setCart([]));
                   setOrderPlaced(true);
                   setOrderPlacing(false);  
                   window.scrollTo(0,0);
            }catch(error){
                toast.error(error ? error.message : "Something unexpected happened",{
                    theme:"colored"
                  })
            }
        }
    }

    const getAllData = async () => {
        const cookiesArray = document.cookie.split(';');
        const tokenCookieItem = cookiesArray.find((cookie) => cookie.includes('token'));
        if(tokenCookieItem){
            const tokenCookie = tokenCookieItem.split('=');  
            const decodedToken = jwtDecode(tokenCookie[1]);  
            setUserId(decodedToken.id);
            const data = {
              userid:decodedToken.id
            }
            const response2 = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accountdetails/getdetails`,data);  
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
               setShippingAddress(address);
               setAddressExist(true);
               setShippingAddressEdit(false);
            }
            const userObj = {
                firstname:response2.data.firstname,
                lastname:response2.data.lastname,
                username:response2.data.username,
                email:response2.data.email,
                mobileno:response2.data.mobileno
            }
            setUserDetails(userObj);
        }
    }
    const shippingAddressSubmitHandler = async (e) => {
      e.preventDefault();
      let cookies = document.cookie.split(';')
      let idarray = cookies[1].split('=');
      let data = {
          userid:idarray[1],
          shippingaddress:`housenumber=${shippingAddress.housenumber};apartmentno=${shippingAddress.apartmentno};town=${shippingAddress.town};state=${shippingAddress.state};pincode=${shippingAddress.pincode}`
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accountdetails/update`,data)
        if(response.data){
         toast.success("Address updated successfully",{
             theme:"colored"
           })
        }
       getAllData();
    }

  return (
   <>
   {
     loading ? (
      <div className="loader">
       <Head>
      <meta charset="utf-8" />
      <title>Checkout</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="theme-color" content="#111"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="/css/style.css" rel="stylesheet"/>
   </Head>
        <RiseLoader color='#ff5723'/>
      </div>
      ) : (
     <> 
   <Head>
      <meta charset="utf-8" />
      <title>Checkout</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="theme-color" content="#111"/>
      <link href="/images/favicon.png" rel="icon"/>
      <link href="/css/bootstrap.min.css" rel="stylesheet"/>
      <link href="/css/blueket.plugin.css" rel="stylesheet"/>
      <link href="/css/swiper.min.css" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="/css/style.css" rel="stylesheet"/>
      <link rel="stylesheet" href="/css/userpanel.css"/>
      <link href="/css/responsive.css" rel="stylesheet" />
      <link href="/css/colormode.css" rel="stylesheet" />
   </Head>
    <Header location={"Cart"}/>
    {orderplaced ? (
      <div className="orderplaced-confirmation">
      Order placed Successfully 
      </div>
      ):( 
      <main>      
            <h2 class="dash-title">Order details</h2>
            <div class="dash-cards">
                   <div class="card-single">
                <div class="card-body">
                    <div>
                       <h5>Shipping address</h5>
                       <form  className='address-form' onSubmit={shippingAddressSubmitHandler}>
                       <input type="text" className='address-form-input' placeholder='House number or Street name'  
                        onChange={(e) => setShippingAddress((address) => ({
                         ...address,
                         housenumber:e.target.value
                       }))}
                       value={shippingAddress.housenumber}
                       readOnly={shippingAddressEdit ? false : true}
                       required
                       />
                       <input type="text" className='address-form-input' placeholder='Apartment,suite,unit' 
                        onChange={(e) => setShippingAddress((address) => ({
                         ...address,
                         apartmentno:e.target.value
                       }))}
                       value={shippingAddress.apartmentno}
                       readOnly={shippingAddressEdit ? false : true}
                       required/>
                       <input type="text" className='address-form-input' placeholder='Town/City' 
                        onChange={(e) => setShippingAddress((address) => ({
                         ...address,
                         town:e.target.value
                       }))}
                       value={shippingAddress.town}
                       readOnly={shippingAddressEdit ? false : true}
                       required/>
                       <select className='address-form-input' 
                        onChange={(e) => setShippingAddress((address) => ({
                         ...address,
                         state:e.target.value
                       }))}
                       value={shippingAddress.state}
                       readOnly={shippingAddressEdit ? false : true}
                       required
                       >
                       <option value="" >State</option>
                       {states.map((state) => (
                         <option value={state}>{state}</option>
                         ))}
                       </select>
                       <input type="text" className='address-form-input' placeholder='Pincode' 
                        onChange={(e) => setShippingAddress((address) => ({
                         ...address,
                         pincode:e.target.value
                       }))}
                       value={shippingAddress.pincode}
                       readOnly={shippingAddressEdit ? false : true}
                       required
                       />
                          <div>
                          {shippingAddressEdit && <button type="submit" className="address-submit" >Submit</button>}
                          {!shippingAddressEdit && <button type="button" className="address-submit" onClick={() => setShippingAddressEdit(true)}>Edit</button>}
                          {shippingAddressEdit && addressExist && <button className="address-submit-cancel" type="button" onClick={() => setShippingAddressEdit(false)}>Cancel</button>}
                         </div> 
                       </form>
                    </div>
                </div>
            </div>
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-check-box"></span>
                        <div>
                            <h5>Preferred service date and time</h5>
                            <input 
                             type="datetime-local" 
                             id="preferredservicedatetime"
                             min={new Date().toISOString().slice(0, 16)}
                             onChange={(e) => setPreferredDateTime(e.target.value)}
                             />
                        </div>
                    </div>
                </div>
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-check-box"></span>
                        <div>
                            <h5>Payment method</h5>
                            <h4>Cash on delivery</h4>
                        </div>
                    </div>
                </div>
            </div>
            <section class="recent">
                <div class="activity-grid">
                    <div class="activity-card">
                        <h3>Product details</h3>
                        
                        {reduxstate.cart.map((order) => (
                         <div class="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Services</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><div><img className='order-image' src={order.modelimagelink}/></div>{order.model}</td>
                                        <td>
                                          {order.display && <span>Display({order.display.type}): ₹ {order.display.price}<br /></span>}
                                          {order.battery && <span>Battery : ₹ {order.battery}<br/></span>}
                                          {order.charging && <span>Charging : ₹ {order.charging}<br/></span>}
                                          {order.backpanel && <span>Back Panel : ₹ {order.backpanel}<br/></span>}
                                          {order.tempered && <span>Tempered : ₹ {order.tempered}<br/></span>}
                                          {order.speaker && <span>Speaker : ₹ {order.speaker}<br/></span>}
                                          {order.receiver && <span>Receiver : ₹ {order.receiver}<br/></span>}
                                          {order.glass && <span>Glass : ₹ {order.glass}<br/></span>}
                                          {order.others && <span>Others : {order.others.issues.length} issue<br/></span>}
                                          </td>
                                        <td>₹ {order.total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        ))}
                    </div>
                </div>
            </section>
            <div class="dash-cards">
                <div class="card-single">
                    <div class="card-body">
                        <span class="ti-briefcase"></span>
                        <div>
                            <h5></h5>
                            <h4><input type="checkbox"/> I would like to receive exclusive emails with discounts and product information (optional)</h4>
                            <h4><input type="checkbox" onChange={() => setAgreed(!agreed)}/> I have read and agree to the website terms and conditions *</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div  className="placeorder-button-container">
             <button className="placeorder-button" onClick={() => placeOrder()}>Place order</button>
            </div>
        </main>)}
    <Footer/>
    <ToastContainer />
    </> )}
    {orderplacing && <div className="orderplacing-loader-container"><span className="orderplacing-loader"><RiseLoader color='#ff5723' /></span></div>}
   </>
  )
}
