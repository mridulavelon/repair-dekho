import { useEffect,useState } from "react"
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import RiseLoader from "react-spinners/RiseLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch,useSelector } from 'react-redux';
import { useRouter } from "next/router";
import { setCart } from "slices/counterSlice";
import Link from "next/link";


export default function Cart () {
   const router = useRouter();
   const dispatch = useDispatch();
   const reduxstate = useSelector((state) => state.counter);
   const [cartorders,setCartOrders] = useState([]);
   const [loading,setLoading] = useState(false);
   const [totalprice,setTotalPrice] = useState(0);


   useEffect(() => {
      setTimeout(() => {
          setLoading(false);
      },1000);
    setCartOrders(reduxstate.cart);
    let totaledprice = 0;
    reduxstate.cart.map((order) => {
          totaledprice = totaledprice + order.total
    })
    setTotalPrice(totaledprice);
    },[])

   const deleteCartOrder = (orderid) => {
       let elementindex = cartorders.findIndex(cartorder => cartorder.orderid === orderid );
       if(elementindex > -1){
          let orders = [...cartorders];
          orders.splice(elementindex,1);
          setCartOrders(orders);
          dispatch(setCart(orders));
       }
   }
 
   const submitCheckout = () => {
       router.push('/Checkout');
   }


  return (
   <>
   {
     loading ? (
      <div className="loader">
       <Head>
      <meta charset="utf-8" />
      <title>Cart</title>
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
      <title>Cart</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="theme-color" content="#111"/>
      <link href="/images/favicon.png" rel="icon"/>
      <link href="/css/bootstrap.min.css" rel="stylesheet"/>
      <link href="/css/blueket.plugin.css" rel="stylesheet"/>
      <link href="/css/swiper.min.css" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="/css/style.css" rel="stylesheet"/>
      <link href="/css/responsive.css" rel="stylesheet" />
      <link href="/css/colormode.css" rel="stylesheet" />
   </Head>
    <Header location={"Cart"}/>
    <section class="h-100" style={{backgroundColor: '#eee'}}>
  <div class="container h-100 py-5">
    {cartorders.length ? (
     <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-10">

        <div class="d-flex justify-content-between align-items-center mb-4 mt-5">
          <h3 class="fw-normal mb-0 text-black">Cart</h3>
        </div>

       {cartorders.map((cartorder) => (
         <div class="card rounded-3 mb-4">
          <div class="card-body p-4">
            <div class="row d-flex justify-content-between align-items-center">
              <div class="col-md-2 col-lg-2 col-xl-2">
              <Link href={`/product/${cartorder.modelid}`}>
                <img
                  src={cartorder.modelimagelink}
                  class="img-fluid rounded-3" alt={`${cartorder.brand} ${cartorder.model}`}/>
              </Link>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-3">
                <p class="lead fw-normal mb-2">{cartorder.modelname}</p>
              </div>
              <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
                <div>
                {cartorder.display && <span>Display({cartorder.display.type}): ₹ {cartorder.display.price}<br /></span>}
                {cartorder.battery && <span>Battery: ₹ {cartorder.battery}<br /></span>}
                {cartorder.charging && <span>Charging: ₹ {cartorder.charging}<br /></span>}
                {cartorder.backpanel && <span>Backpanel: ₹ {cartorder.backpanel}<br /></span>}
                {cartorder.tempered && <span>Tempered: ₹ {cartorder.tempered}<br /></span>}
                {cartorder.speaker && <span>Speaker: ₹ {cartorder.speaker}<br /></span>}
                {cartorder.receiver && <span>Receiver: ₹ {cartorder.receiver}<br /></span>}
                {cartorder.glass && <span>Glass: ₹ {cartorder.glass}<br /></span>}
                {cartorder.touch && <span>Touch: ₹ {cartorder.touch}<br /></span>}
                {cartorder.others && <span>Others: {cartorder.others.issues.length} issue<br /></span>}
                </div>
              </div>
              <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                <h5 class="mb-0">Total: <br/>₹ {cartorder.price}.00</h5>
              </div>
              <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                <FontAwesomeIcon icon={faTrash} style={{cursor:'pointer'}} onClick={() => deleteCartOrder(cartorder.orderid)}/>
              </div>
            </div>
          </div>
        </div>
        ))}
        <div class="card" >
          <div class="card-body">
            <button type="button" class="btn btn-warning btn-block btn-lg" onClick={() => submitCheckout()} style={{
                borderRadius: '25px',
                color: 'whitesmoke',
                background: '#ff572',
                backgroundColor: '#ff5723'
            }}>Proceed to Checkout</button>
          </div>
        </div>

      </div>
    </div>
    ) : (
        <div class="d-flex justify-content-center align-items-center h-100 mt-5">
            <div className="no-cart-container">
            <span>Your cart is empty kindly select your device</span>
            <Link href="/Repairmydevice">
               <button className="select-your-device">Select your device</button>
             </Link>
            </div>
      </div>
    )}
  </div>
</section>
    <Footer/>
    </> )}
   </>
  )
}