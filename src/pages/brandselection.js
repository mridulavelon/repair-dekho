import { useEffect,useState } from "react"
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import 'react-toastify/dist/ReactToastify.css';
import RiseLoader from "react-spinners/RiseLoader";
import axios from "axios";
import {
   Accordion,
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
 } from 'react-accessible-accordion';
 import 'react-accessible-accordion/dist/fancy-example.css';
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

export default function Brandselection({ data }) {
   const [loading,setLoading] = useState(true);
   const [brands,setBrands] = useState(false);

   const faqs = [
      {
         id:1,
         heading:"How Does Repair Dekho Works?",
         para:"Test"
      },
      {
         id:2,
         heading:"How long will the onsite repair take?",
         para:"Test"
      },
      {
         id:3,
         heading:"After the screen/spare parts are replaced,if i don't like the screen will you return my money?",
         para:"Test"
      }
   ]
   
   useEffect(() => {
      if(data.success){
         setBrands(data.response)
      }else{
        toast.error(data.response,{
          theme:"colored"
        })
      }
      setTimeout(() => {
          setLoading(false);
      },1000);
    },[])

  return (
   <>
   {loading ? (
      <div className="loader">
       <Head>
      <meta charset="utf-8" />
      <title>Repairmydevice</title>
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
      <title>Repairmydevice</title>
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
    <Header location={"Brandselection"}/>
    <section class="section-space  padding-b50">
         <div class="container">
            <div class="row justify-content-between">
               <div class="col-xl-6 col-lg-6">
                  <div class="paragraph-block">
                     <h3 class="header-small mb15" style={{color: '#FFAB00'}}>We are Expert in </h3>
                     <div class="service-header">MOBILE REPAIR SERVICES</div>
                     <p class="line-height">We Are Dedicated To Provide You Best Mobile Phone Repairing Services At Your Door Step.
                     </p>
                  </div>                 
                                  
               </div>
               <div class="col-xl-6 col-lg-6 mmt40">
                  <div class="roundimg"><img src="./images/service-bg.png" alt="img"/></div>
               </div>
            </div>
         </div>
      </section>
      <section class="section-space" style={{paddingTop:'50px'}}>
        
               <div class="container select-phone ">

               <div class="row justify-content-center text-center">
               <div class="col-xl-12 col-lg-12">
                  <div class="service-body-head-sub2">
                     Select your mobile brand
                  </div>
               </div>
            </div>
                  <div class="phone-issue brand-box">
                     {brands.map((brand) => (
                     <div class="issue-box" key={brand.value}>
                        <Link href={`/modelselection?brand=${brand.value}&devicetype=mobile`}>
                        <img src={brand.imagelink}/>
                     </Link>
                     </div>))}
                  </div>
                  <div class="clearfix"></div>
               </div>
             <div className="accordion-container">
               <Accordion>
                  {faqs.map((faq) => (
                          <AccordionItem>
                          <AccordionItemHeading>
                              <AccordionItemButton>
                                  {faq.heading}
                              </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel>
                              <p>
                                  {faq.para}
                              </p>
                          </AccordionItemPanel>
                      </AccordionItem>
                  ))}
        </Accordion>  
        </div>
      </section>
    <Footer/>
    <ToastContainer />
    </>
   )}
   </>
  )
}
export async function getServerSideProps() {
   const brandsCall = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands/getbrands`)
   .then((response) => {
     if(response.status ===200){
       return {success:true,response:response.data.response}
     }
   }).catch((error) => {
      return {success:false,response:error.message ? error.message : "Something unexpected happend please try again later"}
   })
   return { props: { data:brandsCall } };
 }