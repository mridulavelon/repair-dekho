import { useEffect,useState } from "react"
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function offers({ data }) {
   const [loading,setLoading] = useState(true);
   const [offers,setOffers] = useState([]);


   useEffect(() => {
    if(data.success){
      setOffers(data.response)
   }else{
     toast.error(data.response,{
       theme:"colored"
     })
   }
      setTimeout(() => {
          setLoading(false);
      },1000);
    },[])

    const copyOffer = async(code) => {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard",{
        theme:"colored"
      });
    }

  return (
   <>
   {
     loading ? (
      <div className="loader">
       <Head>
      <meta charset="utf-8" />
      <title>Offers</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="theme-color" content="#111"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="./css/style.css" rel="stylesheet"/>
   </Head>
        <RiseLoader color='#ff5723'/>
      </div>
      ) : (
     <> 
   <Head>
      <meta charset="utf-8" />
      <title>Offers</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="theme-color" content="#111"/>
      <link href="./images/favicon.png" rel="icon"/>
      <link href="./css/bootstrap.min.css" rel="stylesheet"/>
      <link href="./css/blueket.plugin.css" rel="stylesheet"/>
      <link href="./css/swiper.min.css" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="./css/style.css" rel="stylesheet"/>
      <link href="./css/responsive.css" rel="stylesheet" />
      <link href="./css/colormode.css" rel="stylesheet" />
   </Head>
    <Header location={"Offers"}/>
    {

<section className="offer-sec">
<div className="container">
  <div className="section-title">
    <h1>
      <span>
      {offers.length > 0 ? "Coupon Codes & Offers" : "No offers found"}
      </span>
    </h1>
  </div>
  <div className="offer-main">
   {offers.map((offer) => (
        <div className="offer-full-col" key={offer._id}>
        <div className="offer-img">
          <img src={offer.imagelink} alt="FixScreenRepair-offer" />
        </div>
        <div className="offer-code-detail">
            <h2>{offer.label}</h2>
            <p>
              {offer.infotext}
            </p>
            <div>
              <a href="#" onClick={() => copyOffer(offer.label)}>Click here</a> to copy
            </div>
        </div>
        <div className="clearfix"></div>
    </div>
   ))}
  </div>
</div>
</section>
    }
    <Footer/>
    <ToastContainer />
    </> )}
   </>
  )
}
export async function getServerSideProps() {
  const offersCall = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/offers/getoffers`)
  .then((response) => {
    if(response.status ===200){
      return {success:true,response:response.data.response}
    }
  }).catch((error) => {
     return {success:false,response:error.message ? error.message : "Something unexpected happend please try again later"}
  })
  return { props: { data:offersCall } };
}