import { useEffect,useState } from "react"
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { addmodelobj } from "slices/counterSlice";
import RiseLoader from "react-spinners/RiseLoader";
import { useRouter } from "next/router";
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

export default function Modelselection({ data }) {
   const reduxState = useSelector((state) => state.counter);
   const router = useRouter();
   const dispatch = useDispatch();
   const [loading,setLoading] = useState(true);
   const [models,setModels] = useState([]);
   const faqs = [
      {
         id:1,
         heading:"How can i contact Repair Dekho?",
         para:"Test"
      },
      {
         id:2,
         heading:"Is there any warrant from Repair Dekho for the repairs?",
         para:"Test"
      },
      {
         id:3,
         heading:"How can i claim my warranty?",
         para:"Test"
      },
      {
         id:3,
         heading:"What does a 6-month warranty cover?",
         para:"Test"
      }
   ]

   useEffect(() => {
      if(data.invalidroute){
         router.replace("/")
       }else{
         if(data.success){
           setModels(data.response);
           setLoading(false);
         }else{
           toast.error(data.response,{
               theme:"colored"
            })
            setLoading(false);
         }
       }
    }, [])    

    const modelselected = (model) => {
      dispatch(addmodelobj(model));
      router.push('/product')
    }

  return (
   <>
   {
     loading ? (
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
    <Header location={"Modelselection"}/>
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
               <div class="container select-phone">
               <div class="row justify-content-center text-center">
               <div class="col-xl-12 col-lg-12">
                  <div class="service-body-head-sub2">
                    {models.length > 0 ? "Select your model" : "No models found"}
                  </div>
               </div>
            </div>
                  <div class="phone-issue brand-box">
                     {models.map((model) => (
                     <div class="issue-box" key={model._id}>
                         <a href="#">
                        <img src={model.smallimagelink}/>
                        </a>
                        <div>
                           {model.modelname}
                        </div>
                        <button className="modelnextbutton" onClick={() => modelselected(model)}>                       
                           Next 
                        </button>
                     </div>))}
                  </div>
                 
                  </div>
                  <div class="clearfix"></div>
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
    </>)}
    <ToastContainer />
   </>
  )
}
export async function getServerSideProps(contextdata) {
   const params = contextdata.query;
   let modelsCall;
   if(params.brand && params.devicetype){
      let data = {
         brand:params.brand,
         type:params.devicetype
      } 
      modelsCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/getmodels`,data)
     .then((response) => {
       if(response.status === 201){
         return {invalidroute:false,success:true,response:response.data.models}
       }else{
         return {success:true}
       }
     }).catch((error) => {
        return {invalidroute:false,success:false,response:error.message ? error.message : "Something unexpected happened please try again later"}
     })
   }else{
       modelsCall = {invalidroute:true,success:false}     
   }
   return { props: { data:modelsCall } };
}