import { useMemo, useEffect,useState } from "react";
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from "react-redux";
import { addtocart } from "slices/counterSlice";
import { useRouter } from "next/router";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import {
   Accordion,
   AccordionItem,
   AccordionItemHeading,
   AccordionItemButton,
   AccordionItemPanel,
 } from 'react-accessible-accordion';
 import 'react-accessible-accordion/dist/fancy-example.css';
 import axios from "axios";



export default function Product({ data }) {
   const router = useRouter();
   const dispatch = useDispatch();
   const reduxstate = useSelector((state) => state.counter);
   const [selectedservices,setSelectedServices] = useState([]);
   const [services,setServices] = useState([]);
   const [price,setPrice] = useState(0);
   const [discountedprice,setDiscountedPrice] = useState(0);
   const [promocodeapplied,setPromoCodeApplied] = useState(false);
   const [promocodeerror,setPromoCodeError] = useState(false);
   const [displayprices,setDisplayPrices] = useState([]);
   const [open, setOpen] = useState(false);
   const [showCodes,setShowCodes] = useState(false);
   const [enteredPromoCode,setEnteredPromoCode] = useState("");
   const [appliedPromoCode,setAppliedPromoCode] = useState("");
   const [showOthers,setShowOthers] = useState(false);
   const [selectedOtherIssues,setSelectedOtherIssues] = useState([]);
   const [queryDetails,setQueryDetails] = useState("");
   const [serviceType,setServiceType] = useState("Normal");
   const [faultyCheck,setFaultyCheck] = useState(false);
   const [promoCodeArray,setPromoCodeArray] = useState([]);
   const { uuid } = require('uuidv4');
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


   const onOpenModal = () => setOpen(true);
   const onCloseModal = () => setOpen(false);

   const onOpenPromoCodes = () => setShowCodes(true);
   const onClosePromoCodes = () => setShowCodes(false);

   const onOpenOthersService = () => setShowOthers(true);
   const onCloseOthersService = () => {
      setQueryDetails("");
      setSelectedOtherIssues([]);
      setShowOthers(false);
   }

   const otherIssuesArray = [
      {
         id:1,
         label:"IC Issue",
      },
      {
         id:2,
         label:"Motherboard Issues",
      },
      {
         id:3,
         label:"Dead Phone",
      },
      {
         id:4,
         label:"Camera Issues",
      },
      {
         id:5,
         label:"Volume Key FPC",
      },
      {
         id:6,
         label:"Power key FPC",
      },
   ]

   const serviceTypeArray = [
      {
        id:1,
        label:"Express Service (₹ 100)",
        value:"Express"
      },
      {
        id:2,
        label:"Normal Service",
        value:"Normal"
      }
   ]

   useEffect(() => {
      if(data.success){
         setPromoCodeArray(data.response)
      }else{
        toast.error(data.response,{
          theme:"colored"
        })
      }
      let servicesarray= [];
      for(const property in reduxstate.modelobj){
         if(property === 'display'){
            servicesarray.push({id:property,label:'Display',link:'display.webp'});
            let displayContainingObj = JSON.parse(JSON.stringify(reduxstate.modelobj[property]))
            delete displayContainingObj._id;
            let displayArray = [];
            for(const item in displayContainingObj){
               const label = item.replace(/^./, item[0].toUpperCase())
               let displayText
               if(label ==="Local"){
                  displayText = "Local screen is not better than branded one"
               }else if(label === "Branded"){
                  displayText = "Branded screen is not better than local one"
               }else{
                  displayText = "OLED screen better than both ones"
               }
               const displayObj = {id:"display",label:`Display(${label})`,displayLabel:label,price:displayContainingObj[item],displayText:displayText};
               displayArray.push(displayObj);
            }
            setDisplayPrices(displayArray);           
         }else if(property === 'battery'){
            servicesarray.push({id:property,label:'Battery',price:reduxstate.modelobj[property],link:'battery.webp'})
         }else if(property === 'charging'){
            servicesarray.push({id:property,label:'Charging',price:reduxstate.modelobj[property],link:'charging.webp'})
         }else if(property === 'backpanel'){
            servicesarray.push({id:property,label:'Backpanel',price:reduxstate.modelobj[property],link:'backpanel.webp'})
         }else if(property === 'tempered'){
            servicesarray.push({id:property,label:'Tempered',price:reduxstate.modelobj[property],link:'tempered.webp'})
         }else if(property === 'glass'){
            servicesarray.push({id:property,label:'Glass',price:reduxstate.modelobj[property],link:'tempered.webp'})
         }else if(property === 'speaker'){
            servicesarray.push({id:property,label:'Speaker',price:reduxstate.modelobj[property],link:'speaker.webp'})
         }else if(property === 'receiver'){
            servicesarray.push({id:property,label:'Receiver',price:reduxstate.modelobj[property],link:'dialer.webp'})
         }else if(property === 'touch'){
            servicesarray.push({id:property,label:'Touch',price:reduxstate.modelobj[property],link:'display.webp'})
         }
      }
      servicesarray.push({id:'others',label:'Others',price:199,link:'others.svg'})  
      setServices(servicesarray);
   },[]);

   const selectDisplayService = (service) => {
         let array = [...selectedservices];
         array.push(service);
         setTimeout(() => {
            setSelectedServices(array);
            if(promocodeapplied){
               const totalPrice = price + service.price + discountedprice;
               const discountNew = Math.round(totalPrice * 10/100);
               const newDiscountedPrice = totalPrice - discountNew;
               setDiscountedPrice(discountNew);
               setPrice(Math.round(newDiscountedPrice));
            }else{
               setPrice(price + service.price);
            }
           onCloseModal();
        },500);
        document.getElementById('display').checked = true;
   }

   const Showdisplayprice = () => {
         return (
            <Modal open={open} onClose={onCloseModal} center classNames={{modal:'customModal'}}>
            <h2 >Select display price</h2>
            <form>
            {displayprices.map((element) => {
             return (   
            <>
            <div style={{ display: "flex", gap: '71%', marginTop: '10px' }}>
                   <span>{element.displayLabel} : ₹ {element.price}</span>
                   <label class="checkbox-container">
                      <input type="radio" id={element.id} name={element.label} value={element.price} onChange={() => selectDisplayService(element)} />
                      <span class="checkmark"></span>
                   </label>
                </div>
                 <div className="displayinfo-cont">
                <FontAwesomeIcon icon={faCircleInfo} />
                <span className="displayinfo-text">{element.displayText}</span>
                </div>
                </>
            )})}
            </form>
       </Modal>
         )
   }

   const Showpromocode = () => {
      return (
         <Modal open={showCodes} onClose={onClosePromoCodes} center classNames={{modal:'customModal'}}>
         <h2>Select promo code</h2>
         {promoCodeArray.length > 0  ? (
             <div className="promo-codes-container">
             {promoCodeArray.map((promo) => {
             return (
             <div className="promo-code"> 
                <div key={promo.id}>
                <h4>{promo.label}</h4>
                <span>{promo.infotext}</span>
                </div>
                <button className="apply-button" onClick={() => applypromocode(promo)}>APPLY</button>
             </div>
           )})}
          </div>
            ):(
             <div>No available promo codes found</div>   
            )}
    </Modal>
      )
   }

   const selectOtherIssueHandler = (issue) => {
      const elementindex = selectedOtherIssues.findIndex(element => element.id === issue.id);
      if(elementindex > -1){
         let array = [...selectedOtherIssues];
         array.splice(elementindex,1);
         setSelectedOtherIssues(array);
      }else{
         let array = [...selectedOtherIssues];
         array.push(issue);
         setSelectedOtherIssues(array);
      }
   }
   const selectOtherService = () => {
    if(selectedOtherIssues.length === 0){
      toast.error('Please select a issue',{
         theme:"colored"
       }) 
    }else if(queryDetails === ""){
      toast.error('Please enter your query',{
         theme:"colored"
       }) 
    }else{
      let service = {
         id:"others",
         label:'Others',
         link:'others.svg',
         price:199,
         issues : selectedOtherIssues,
         query:queryDetails
      }
      let array = [...selectedservices];
      array.push(service);
      setSelectedServices(array);
      if(promocodeapplied){
         const totalPrice = price + service.price + discountedprice;
         const discountNew = Math.round(totalPrice * 10/100);
         const newDiscountedPrice = totalPrice - discountNew;
         setDiscountedPrice(discountNew);
         setPrice(Math.round(newDiscountedPrice));
      }else{
         setPrice(price + service.price);
      }
      onCloseOthersService();
      document.getElementById('others').checked = true;
    }
   }

   const queryChangeHandler = (e) => {
      setQueryDetails(e.target.value);
   }

   const ShowOthersService = useMemo(() => {
      return (
         <Modal open={showOthers} onClose={onCloseOthersService} center classNames={{modal:'customModal'}}>
         <h5 class="issuemodal-header">Select your issue type :</h5>
         <div className="othersissue-box-container">
            {otherIssuesArray.map((issue) => {
            return (
            <div className={selectedOtherIssues.find((item) => item.id === issue.id) ? "issue-box-selected" : "issue-box"} key={issue.id} onClick={() => selectOtherIssueHandler(issue)}> 
               {issue.label}
            </div>
          )})}
         </div>
         <div className="querybox-container">
         <label>
            Details of query :
         </label>
         <input onChange={queryChangeHandler} />
         <button onClick={selectOtherService}>Submit</button>
         </div>
    </Modal>
      )
   }
   )

   const selectService = (event,service) => {
        event.preventDefault();;
        const elementindex = selectedservices.findIndex(servicelement => servicelement.id === service.id);
        if(elementindex > -1){
            if(service.id === 'display'){
               let serviceprice = selectedservices[elementindex].price;
               let array = [...selectedservices];
               array.splice(elementindex,1);
               setSelectedServices(array);
               if(array.length > 0){
                  let priced = serviceprice > price ? serviceprice - price : price - serviceprice;
                  if(priced < 1000){
                     setPrice(Math.round(serviceprice > price ? serviceprice - price : price - serviceprice + discountedprice));   
                     if(promocodeapplied){
                        setPromoCodeError(true);
                        setPromoCodeApplied(false);
                        setDiscountedPrice(0);
                     }else{
                        setPromoCodeError(false);
                        setPromoCodeApplied(false);
                        setDiscountedPrice(0);
                     }
                  }else{
                     if(promocodeapplied){
                        const totalPrice =  serviceprice > price ? serviceprice - price + discountedprice : price - serviceprice + discountedprice;
                        const discountNew = Math.round(totalPrice * 10/100);
                        const newDiscountedPrice = totalPrice - discountNew;
                        setDiscountedPrice(discountNew);
                        setPrice(Math.round(newDiscountedPrice));
                     }else{
                        setPrice(priced);
                     }
                     setPromoCodeError(false);
                  }
               }else{
                  setPrice(0);   
                  setPromoCodeApplied(false);
                  setDiscountedPrice(0);
               }  
            }else{
               let array = [...selectedservices];
               array.splice(elementindex,1);
               setSelectedServices(array);
               if(array.length > 0){
                  let priced = service.price > price ? service.price - price : price - service.price;
                  if(priced < 1000){
                     setPrice(Math.round(service.price > price ? service.price - price : price - service.price + discountedprice));
                     if(promocodeapplied){
                        setPromoCodeError(true);
                        setPromoCodeApplied(false);
                        setDiscountedPrice(0);
                     }else{
                        setPromoCodeError(false);
                        setPromoCodeApplied(false);
                        setDiscountedPrice(0);
                     }
                  }else{
                     if(promocodeapplied){
                        const totalPrice = service.price > price ? service.price - price + discountedprice : price - service.price + discountedprice;
                        const discountNew = Math.round(totalPrice * 10/100);
                        const newDiscountedPrice = totalPrice - discountNew;
                        setDiscountedPrice(discountNew);
                        setPrice(Math.round(newDiscountedPrice));
                     }else{
                        setPrice(priced);
                     }
                     setPromoCodeError(false);
                  }
               }else{
                  setPrice(0);  
                  setPromoCodeApplied(false);
                  setDiscountedPrice(0); 
               } 
            }      
        }else{
            if(service.id === 'display'){
               document.getElementById('display').checked = false;
               onOpenModal()
            }else if(service.id === 'others'){
               document.getElementById('others').checked = false;
               onOpenOthersService()
            }else{
               let array = [...selectedservices];
               array.push(service);
               setSelectedServices(array);
               if(promocodeapplied){
                  const totalPrice = price + service.price + discountedprice;
                  const discountNew = Math.round(totalPrice * 10/100);
                  const newDiscountedPrice = totalPrice - discountNew;
                  setDiscountedPrice(discountNew);
                  setPrice(Math.round(newDiscountedPrice));
               }else{
                  setPrice(price + service.price);
               }
               if(price + service.price > 1000){
                  setPromoCodeError(false);
               }
            }
        }
   }

   const applypromocode = (promo) => {
        if(promocodeapplied){
         toast.error('Promo code already applied',{
            theme:"colored"
          }) 
        }else if(price <= 1000 ){
         toast.error('Bill amount should be more than 1000',{
            theme:"colored"
          })
          setPromoCodeError(true);
        }else if(promo.applicableservice !== "all" && !selectedservices.find((service) => service.id === promo.applicableservice)){
         toast.error(`Please select the ${promo.applicableservice} service`,{
            theme:"colored"
          })
          setPromoCodeError(true);
        }
        else{
         const discount = price * promo.discountpercent/100;
         setDiscountedPrice(discount);
         const discountedprice = price - discount;
         setPrice(Math.round(discountedprice));
         setPromoCodeApplied(true);
         setPromoCodeError(false);
         setAppliedPromoCode(promo.label);
        }
        onClosePromoCodes();
   }

   const applyEnteredPromoCode = () => {
      if(enteredPromoCode.length > 0){
         const foundPromoCode = promoCodeArray.find((promo) => promo.label === enteredPromoCode);
         if(foundPromoCode){
             applypromocode(foundPromoCode);
         }else{
            toast.error('Invalid promo code',{
               theme:"colored"
             })
         }
      }else{
         toast.error('Please enter promo code',{
            theme:"colored"
          })
      }
   }
 
   const revertPromoCode = () => {
      const revertedPrice = price + discountedprice;
      setPrice(Math.round(revertedPrice));
      setPromoCodeApplied(false);
      setDiscountedPrice(0);
      setPromoCodeError(false);
   }

   const addToCart = () => {
       if(selectedservices.length){
          if(faultyCheck === false){
            toast.error('Please select submit faulty parts box',{
               theme:"colored"
             })
          }else{
            let product = {}
            let cookies = document.cookie.split(';')
            if(cookies[1]){
             let idarray = cookies[1].split('=');
             product['userid'] = idarray[1];
             product['brand'] = reduxstate.modelobj.brand;
             product['model'] = reduxstate.modelobj.modelname;
             selectedservices.map((service) => (
                product[`${service.id}`] = service.id === "others" ? {issues:service.issues,query:service.query,price:service.price} : service.price
             ))
             product['price'] = price;
             product['total'] = price;
             product['servicetype'] = serviceType;
             product['couponapplied'] = promocodeapplied ? appliedPromoCode : "No";
             product['modelimagelink'] = reduxstate.modelobj.modelimagelink;
             product['orderid'] = uuid();
             dispatch(addtocart(product));
             router.push('/Cart');
            }else{
             router.push('/Login');
            }
          }
       }else{
         toast.error('Please select a service',{
            theme:"colored"
          })
       }
   }

   const serviceTypeChangeHandler = (checked,value) => {
      if(checked){
          if(value === "Express"){
            setPrice(price + 100);
            setServiceType(value);
          }else{
            setServiceType(value);
            if(price >= 100){
              setPrice(price - 100)
            }else{
               setPrice(100 - price)
            }
          }
      }
   }

  return (
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
    <Header location={"Repairmydevice"}/>
      <section className="section-space" style={{paddingTop:'50px'}}>
               <div className="container" >
                 <div className="row">
               <div className="col-xl-3 col-lg-3">
                  <div className="paragraph-block">
                     <img src={reduxstate.modelobj.modelimagelink} alt="productimage"/>
                  </div>
               </div>
               <div className="col-xl-9 col-lg-9">
                  <div className="phone-issue">
                     {services.map((service) => (
                       <div className="issue-box-container"  key={service.id}  onClick={(e) => selectService(e,service)}>
                     <div className="issue-box" id={service.id} >
                        <div className="product-repair">
                        <img className="repair-product-img" src={`./images/product-service/${service.link}`}/>
                        <div className="procut-name-price">
                           <span style={{width:'100%'}}>{service.label}<br/></span>
                           <span>{service.price ? `₹ ${service.price}` : " "}</span>
                        </div>
                        <div className="service-price-container" >
                        <label class="checkbox-container"  >
                          <input type="checkbox"  checked={selectedservices.find((services) => services.id === service.id) ? true : false }/>
                          <span class="checkmark" id={service.id}></span>
                          </label>
                      </div>
                        </div>
                        <div className="product-time">
                           <span>Repairing Time : 30 Minutes</span>
                           <span>Warranty: 6 Months</span>
                           </div>
                      <div style={{marginTop:'10px'}}>
                        <p className="product-info">If your device Touch/LCD is damaged (Cracked) and has a destroyedimage, no image or touch is not responding properly/ Only Half Display works.</p>
                        </div>
                     </div>
                     </div>
                     ))}
                  </div>
                  <div className="clearfix"></div>
                  <div class="issue-box" style={{width:'100%',padding:'0px'}}>
                    <div className="booking-summary-container"><span style={{lineHeight:'41px'}}>Booking Summary</span></div>
                    <div style={{margin: '20px',padding: '10px'}}>
                     {selectedservices.map((service) => (
                      <div>
                      <div style={{display: 'flex',width: '100%',justifyContent: 'center'}}>
                        <span style={{display: 'flex',width: '100%',justifyContent: 'flex-start'}}>{service.label} : </span>
                        <span style={{width:'14%'}}>{`₹ ${service.price}`}</span>
                      </div>
                      <div style={{border: '1px solid #0101021a',marginTop:'10px',marginBottom:'10px'}}></div>
                      </div>
                      ))}
                    </div>
                    <div>
                    <input  className="promocode-input" placeholder="Apply promo code" onChange={(e) => setEnteredPromoCode(e.target.value)} />
                    <button className="promocode-button" onClick={() => applyEnteredPromoCode()}>Apply</button>
                    </div>
                    <div className="servicetype-container">
                     {serviceTypeArray.map((servicetype) => (
                         <div className="servicetype" key={servicetype.id}>
                         <input type="radio" checked={serviceType === servicetype.value ? true : false} onChange={(e) => serviceTypeChangeHandler(e.target.checked,servicetype.value)} />
                         <label>{servicetype.label}</label>
                       </div>
                     ))}
                    </div>
                    {promocodeapplied &&
                    <div className="remove-promo">
                     <h5>Saved ₹ {discountedprice} with coupon {appliedPromoCode} (<a href="#" className="remove-promo-button" onClick={() => revertPromoCode()}>Remove</a>)</h5>
                    </div>
                     }
                    <div> 
                    <button onClick={() => onOpenPromoCodes()} style={{
                        borderRadius: '25px',
                        color: 'white',
                        backgroundColor: '#ff5723',
                        fontSize: '18px',
                        border: 'none',
                        width: '20%',
                        height: '38px',
                        marginTop:"1rem"
                    }}>View promo codes</button>
                    </div>
                    <div class="faulty-container">
                    <input type="checkbox" onChange={() => setFaultyCheck(!faultyCheck)}/>
                      <span>Customer need to submit faulty parts</span>
                    </div>
                    <div className="price-details-container">
                    <span style={{
                        padding:'9px',
                        width:'45%'
                    }}>Price total: <br/>₹ {price}</span>
                    <div className="add-to-cart-button-container">
                    <button onClick={() => addToCart()} style={{
                        borderRadius: '25px',
                        color: 'white',
                        backgroundColor: '#ff5723',
                        fontSize: '18px',
                        border: 'none',
                        width: '45%',
                        height: '48px'
                    }}>Add to cart</button>
                    </div>
                    </div>
                  </div>
                  <div className="product-accordion">
                    <h4 className="accordion-heading">FAQ</h4> 
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
                  </div>
               </div>
               </div>
      </section>
    <Footer/>
    <ToastContainer />
    <Showdisplayprice />
    <Showpromocode />
    {ShowOthersService}
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