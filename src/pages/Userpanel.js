import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCartShopping, faLocationDot, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch,useSelector } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import Head from 'next/head';
import moment from 'moment/moment';
import axios from 'axios';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import 'react-toastify/dist/ReactToastify.css';
import states from '../Utils/states.json';

export default function Userpanel () {
    const router = useRouter();
    const reduxstate = useSelector((state) => state.counter); 
    const [tab,setTab] = useState('orders');
    const [billingedit,setBillingEdit] = useState(false);
    const [shippingedit,setShippingEdit] = useState(false);
    const [orders,setOrders] = useState([]);
    const [billingaddress,setBillingAddress] = useState({
      housenumber:'',
      apartmentno:'',
      town:'',
      state:'',
      pincode:''
    });
    const [shippingAddress,setShippingAddress] = useState({
      housenumber:'',
      apartmentno:'',
      town:'',
      state:'',
      pincode:''  
    });
    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [username,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [mobileno,setMobileNo] = useState('');

    const getAllData = async () => {
        const cookiesArray = document.cookie.split(';');
        const tokenCookieItem = cookiesArray.find((cookie) => cookie.includes('token'));
        if(tokenCookieItem){
           const tokenCookie = tokenCookieItem.split('=');  
           const decodedToken = jwtDecode(tokenCookie[1]);   
           const data = {
             userid:decodedToken.id
           }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/getuserorders`,data);
        if(response.data){
            setOrders(response.data.orders);
        }
        const response2 = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accountdetails/getdetails`,data);
        if(response2.data){
            setFirstName(response2.data.firstname && response2.data.firstname);
            setLastName(response2.data.lastname && response2.data.lastname);
            setUserName(response2.data.username && response2.data.username);
            setEmail(response2.data.email && response2.data.email);
            setMobileNo(response2.data.mobileno && response2.data.mobileno);
        }
        if(response2.data.hasOwnProperty('billingaddress')){
            let address;
            if(response2.data.billingaddress.length > 0){
                let addressarray = response2.data.billingaddress.split(';');
                let housenumberarray = addressarray[0].split('=');
                let apartmentnoaaray = addressarray[1].split('=');
                let townarray = addressarray[2].split('=');
                let statearray = addressarray[3].split('=');
                let pincodearray = addressarray[4].split('=');
                address = {
                   housenumber:housenumberarray[1],
                   apartmentno:apartmentnoaaray[1],
                   town:townarray[1],
                   state:statearray[1],
                   pincode:pincodearray[1]
               }
            }
            else{
                address = {
                    housenumber:'',
                    apartmentno:'',
                    town:'',
                    state:'',
                    pincode:''
                }
            }
        setBillingAddress(address)
        }
        if(response2.data.hasOwnProperty('shippingaddress')){
            let address;
            if(response2.data.shippingaddress.length > 0){
                let addressarray = response2.data.shippingaddress.split(';');
                let housenumberarray = addressarray[0].split('=');
                let apartmentnoaaray = addressarray[1].split('=');
                let townarray = addressarray[2].split('=');
                let statearray = addressarray[3].split('=');
                let pincodearray = addressarray[4].split('=');
                address = {
                    housenumber:housenumberarray[1],
                    apartmentno:apartmentnoaaray[1],
                    town:townarray[1],
                    state:statearray[1],
                    pincode:pincodearray[1]
                }
            }else{
                address = {
                    housenumber:'',
                    apartmentno:'',
                    town:'',
                    state:'',
                    pincode:''
                }  
            }
             setShippingAddress(address)
         }
        }
    }


    useEffect(() => {
      getAllData();
    },[]);

    const Logout = () => {
        var Cookies = document.cookie.split(';');
        for (var i = 0; i < Cookies.length; i++) {
           document.cookie = Cookies[i] + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';
        }
        router.push('/');
    }


    const submitAccountDetails = async (e) => {
       e.preventDefault();
       let cookies = document.cookie.split(';')
       let idarray = cookies[1].split('=');
       let data = {
          userid:idarray[1],
          firstname:firstname,
          lastname:lastname,
          email:email,
          username:username,
          mobileno:Number(mobileno)
       }
       let updateAccountCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accountdetails/update`,data)
       .then((response) => {
        if(response.data){
            toast.success(response.data.message,{
                theme:"colored"
              })      
           }
       }).catch((error) => {
        toast.error(error.response?.data?.message ? error.response?.data?.message : "Something unexpected happened",{
            theme:"colored"
          })     
       })
       setBillingEdit(false); 
    }

    const submitBillingAddress = async (e) => {
        e.preventDefault();
        let cookies = document.cookie.split(';')
        let idarray = cookies[1].split('=');
        let data = {
          userid:idarray[1],
          billingaddress:`housenumber=${billingaddress.housenumber};apartmentno=${billingaddress.apartmentno};town=${billingaddress.town};state=${billingaddress.state};pincode=${billingaddress.pincode}`
        }
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accountdetails/update`,data)
        if(response.data){
         toast.success("Address updated successfully",{
             theme:"colored"
           })
        }
        setBillingEdit(false);
        getAllData();
    }

    const submitShippingAddress = async (e) => {
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
       setShippingEdit(false);
       getAllData()
    }


    const deleteAddress = async(addresstype) => {
        let cookies = document.cookie.split(';')
        let idarray = cookies[1].split('=');
        let data = {
          userid:idarray[1],
        }
        data[`${addresstype}`] = '';
        const addressUpdateCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accountdetails/update`,data)
        .then((response)=> {
            if(response.data){
                getAllData();
                toast.success("Address updated successfully",{
                    theme:"colored"
                  })
               }
        })
        .catch((error) => {
            toast.error(error.message ? error.message : "Something unexpected happened",{
                theme:"colored"
              })  
        })
    }

  return (
    <>
     <Head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
    <title>Userpanel</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="theme-color" content="#111"/>
    <link href="/images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css"/>
    <link rel="stylesheet" href="/css/userpanel.css"/>
    <link href="/css/bootstrap.min.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
    <link href="/css/style.css" rel="stylesheet"/>
    <link href="/css/responsive.css" rel="stylesheet"/>
    </Head>  
    <Header location={"userpanel"}/>
    <div class="userpanel-container">
    <div>  
    <input type="checkbox" id="sidebar-toggle"/>
    <div class="sidebar">
        <div class="sidebar-header">
            <h3>
                <span>Dashboard</span>
            </h3>             <label for="sidebar-toggle" class="ti-menu-alt"></label>
        </div>
        
        <div class="sidebar-menu">
            <ul>
                <li onClick={() => setTab('orders')} style={{fontSize:`${tab==='orders' ? '20px' :''}`}}>
                    <a href='#'>
                    <FontAwesomeIcon icon={faCartShopping}/>
                        <span >Orders</span>
                    </a>
                </li>
                <li onClick={() => setTab('address')} style={{fontSize:`${tab==='address' ? '20px' :''}`}}>
                <a href='#'>
                        <FontAwesomeIcon icon={faLocationDot}/>
                        <span >Address</span>
                  </a>
                </li>
                <li onClick={() => setTab('account')} style={{fontSize:`${tab==='account' ? '20px' :''}`}}>
                <a href='#'>
                        <span class="ti-settings"></span>
                        <span >Account</span>
                   </a>
                </li>
                <li onClick={() => Logout()}>
                    <a href="">
                        <FontAwesomeIcon icon={faRightFromBracket}/>
                        <span  >Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    </div>
    <div class="main-content">    
        {/* <header>
            <div class="search-wrapper">
                <span class="ti-search"></span>
                <input type="search" placeholder="Search" />
            </div>
            
            <div class="social-icons">
                <span class="ti-bell"></span>
                <span class="ti-comment"></span>
                <div></div>
            </div>
        </header> */}
        
        <main>
            
            <h2 class="dash-title" >Overview</h2>
            
            {tab === 'address' && <div class="dash-cards">
                {shippingedit ? (
                   <div class="card-single">
                   <div class="card-body">
                   <span><FontAwesomeIcon icon={faLocationDot}/></span>
                       <div>
                          <h5>Shipping address</h5>
                          <form  onSubmit={submitShippingAddress} className='address-form'>
                          <input type="text" className='address-form-input' placeholder='House number or Street name'  
                           onChange={(e) => setShippingAddress((address) => ({
                            ...address,
                            housenumber:e.target.value
                          }))}
                          required/>
                          <input type="text" className='address-form-input' placeholder='Apartment,suite,unit' 
                           onChange={(e) => setShippingAddress((address) => ({
                            ...address,
                            apartmentno:e.target.value
                          }))}
                          required/>
                          <input type="text" className='address-form-input' placeholder='Town/City' 
                           onChange={(e) => setShippingAddress((address) => ({
                            ...address,
                            town:e.target.value
                          }))}
                          required/>
                          <select className='address-form-input' 
                           onChange={(e) => setShippingAddress((address) => ({
                            ...address,
                            state:e.target.value
                          }))}
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
                          required/>
                          <button className="address-submit">Submit</button>
                          </form>
                          <button className="address-submit-cancel" onClick={() => setShippingEdit(false)}>Cancel</button>
                       </div>
                   </div>
               </div>
                ) :(
                    <div class="card-single">
                    <div class="card-body">
                        <span><FontAwesomeIcon icon={faLocationDot}/></span>
                        <div>
                           <h5>Shipping address</h5>
                           <h4>{shippingAddress.housenumber}</h4>
                           <h4>{shippingAddress.apartmentno}</h4>
                           <h4>{shippingAddress.town}</h4>
                           <h4>{shippingAddress.state}</h4>
                           <h4>{shippingAddress.pincode}</h4>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="addressaction-container">
                        <span onClick={() => setShippingEdit(true)}>{shippingAddress.housenumber.length > 0 ? 'Edit':'Add'}</span>
                        {shippingAddress.housenumber.length > 0 && <span onClick={() => deleteAddress('shippingaddress')}>Delete</span>}
                        </div>
                    </div>
                </div>
                )}
                
                {billingedit ? (
                <div class="card-single">
                <div class="card-body">
                <span><FontAwesomeIcon icon={faAddressCard}/></span>
                    <div>
                       <h5>Billing address</h5>
                       <form onSubmit={submitBillingAddress} className='address-form'>
                       <input type="text" className='address-form-input' placeholder='House number or Street name' onChange={(e) => setBillingAddress((address) => ({
                         ...address,
                         housenumber:e.target.value
                       }))} required />
                       <input type="text" className='address-form-input' placeholder='Apartment,suite,unit' 
                        onChange={(e) => setBillingAddress((address) => ({
                            ...address,
                            apartmentno:e.target.value
                          }))}
                       required/>
                       <input type="text" className='address-form-input' placeholder='Town/City' 
                        onChange={(e) => setBillingAddress((address) => ({
                            ...address,
                            town:e.target.value
                          }))}
                       required/>
                       <select className='address-form-input' 
                        onChange={(e) => setBillingAddress((address) => ({
                            ...address,
                            state:e.target.value
                          }))}
                       >
                          <option value="" >State</option>
                          {states.map((state) => (
                            <option value={state}>{state}</option>
                            ))}
                          </select>
                       <input type="text" className='address-form-input' placeholder='Pincode' 
                        onChange={(e) => setBillingAddress((address) => ({
                            ...address,
                            pincode:e.target.value
                          }))}
                       required />
                       <button className="address-submit">Submit</button>
                       </form>
                       <button className="address-submit-cancel" onClick={() => setBillingEdit(false)}>Cancel</button>
                    </div>
                </div>
            </div>
                ) :(
                <div class="card-single">
                    <div class="card-body">
                    <span><FontAwesomeIcon icon={faAddressCard}/></span>
                        <div>
                           <h5>Billing address</h5>
                           <h4>{billingaddress.housenumber}</h4>
                           <h4>{billingaddress.apartmentno}</h4>
                           <h4>{billingaddress.town}</h4>
                           <h4>{billingaddress.state}</h4>
                           <h4>{billingaddress.pincode}</h4>
                        </div>
                    </div>
                    <div class="card-footer">
                    <div class="addressaction-container">
                        <span onClick={() => setBillingEdit(true)} style={{cursor:'pointer'}}>{billingaddress.housenumber.length > 0 ? 'Edit':'Add'}</span>
                        {billingaddress.housenumber.length > 0 && <span onClick={() => deleteAddress('billingaddress')}  style={{cursor:'pointer'}}>Delete</span>}
                    </div>
                    </div>
                </div>
                )}
            </div>}
            
            
            {tab === 'orders' && <section class="recent">
                <div class="activity-grid">
                    <div class="activity-card">
                        <h3>Recent orders</h3>
                        
                        <div class="table-responsive">
                           {orders.length ? (<table>
                                <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Services</th>
                                        <th>Service Type</th>
                                        <th>Total</th>
                                        <th>User Details</th>
                                        <th>Shipping Address</th>
                                        <th>Order Date</th>
                                        <th>Order Status</th>
                                        <th>Coupon applied</th>
                                        <th>Preferred service datetime</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                    <tr>
                                        <td><div><img className='order-image' src={order.modelimagelink}/></div>{order.model}</td>
                                        <td>
                                          {order.display && <span>Display({order.display.type}): ₹ {order.display.price}<br /></span>}
                                          {order.battery && <span>Battery : ₹ {order?.battery}<br/></span>}
                                          {order.charging && <span>Charging : ₹ {order?.charging}<br/></span>}
                                          {order.backpanel && <span>Back Panel : {order?.backpanel}<br/></span>}
                                          {order.tempered && <span>Tempered : ₹ {order?.tempered}<br/></span>}
                                          {order.speaker && <span>Speaker : ₹ {order?.speaker}<br/></span>}
                                          {order.receiver && <span>Receiver : ₹ {order?.receiver}<br/></span>}
                                          {order.glass && <span>Glass : ₹ {order?.glass}<br/></span>}
                                          {order.touch && <span>Touch: ₹ {cartorder.touch}<br /></span>}
                                          {order.others && <span>Others : ₹ {order?.others.price}
                                            <br/> 
                                          Issues : {order?.others.issues?.map((issue) => <span>{issue.label}</span>)}
                                          <br/>
                                           Query : <span>{order?.others.query}</span>
                                          </span>}
                                          </td>
                                        <td>{order.servicetype && order.servicetype}</td>
                                        <td>₹ {order.total}</td>
                                        <td>
                                        {order.userdetails && <span>Email : {order.userdetails?.email}<br/></span>}
                                        {order.userdetails && <span>Mobile no : {order.userdetails?.mobileno}<br/></span>} 
                                        </td>
                                        <td>
                                          {<span>{order?.shippingaddress?.housenumber}<br/></span>}
                                          {<span>{order?.shippingaddress?.apartmentno}<br/></span>}
                                          {<span>{order?.shippingaddress?.town}<br/></span>}
                                          {<span>{order?.shippingaddress?.state}<br/></span>}
                                          {<span>{order?.shippingaddress?.state}<br/></span>}
                                          </td>
                                        <td>
                                           {moment(new Date(order.orderdate)).format('MMMM Do YYYY, h:mm:ss a')}
                                        </td>
                                        <td>
                                            {order.orderstatus}
                                        </td>
                                        <td onClick={() => console.log(order)}>
                                            {order.couponapplied}
                                        </td>
                                        <td>
                                           {order.servicedatetimepreffered && moment(new Date(order.servicedatetimepreffered)).format('MMMM Do YYYY, h:mm:ss a')}
                                        </td>
                                    </tr>))}
                                    
                                </tbody>
                            </table>
                            ):(
                            <div className='no-orders'>Currently no order placed</div>
                            )}
                        </div>
                    </div>
                </div>
            </section>}

            {tab === 'account' && 
            <section className='recent'>
                 <form onSubmit={submitAccountDetails}>
                    <div className='user-form-input-container'>
                        <input placeholder='Firstname' className='user-form-input' value={firstname} onChange={(e) =>setFirstName(e.target.value)} required/>
                    </div>
                    <div className='user-form-input-container'>
                        <input  placeholder='Lastname' className='user-form-input' value={lastname} onChange={(e) =>setLastName(e.target.value)} required />
                    </div>
                    <div className='user-form-input-container'>
                        <input  placeholder='Email' className='user-form-input' value={email} required readOnly />
                    </div>
                    <div className='user-form-input-container'>
                        <input placeholder='Username' className='user-form-input' value={username} onChange={(e) =>setUserName(e.target.value)} required/>
                    </div>
                    <div className='user-form-input-container'>
                    <input type="tel" className='user-form-input'  pattern="[7-9]{1}[0-9]{9}" placeholder="Phone or Mobile no" value={mobileno} onChange={(e) =>setMobileNo(e.target.value)} required/>
                    </div>
                    <button className='user-form-submit'>Submit</button>
                 </form>
            </section>
            }
            
        </main>
        
    </div>
    </div>
    <Footer />
    <ToastContainer />
    </>
  )
}
