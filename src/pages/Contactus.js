import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage, faPhone, faRectangleList, faTty, faUser } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'


export default function Contactus() {
    const [loading,setLoading] = useState(false);
    const sendQuery = async(e) => {
       e.preventDefault();
       setLoading(true);
       const data = {
         "fullname": e.target.fullname.value,
         "mobileno": e.target.mobileno.value,
         "email": e.target.email.value,
         "interestedin": e.target.interestedin.value,
         "query": e.target.query.value,
         "date":new Date()
       }
       const sendQueryCall = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact/createcontactquery`,data)
       .then((response) => {
          if(response.data.success){
            setLoading(false);
            toast.success(response.data.response,{
              theme:"colored"
            });
            e.target.fullname.value = ""
            e.target.mobileno.value =""
            e.target.email.value = ""
            e.target.interestedin.value = ""
            e.target.query.value =""
          }
       }).catch((err) => {
        setLoading(false);
        toast.success(err.message ? err.message : "Something went wrong please try again later",{
          theme:"colored"
        });
       })
    }

    return (
      <>
      <Head>
      <meta charset="utf-8" />
      <title>Contactus</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="theme-color" content="#111"/>
      <link href="./images/favicon.png" rel="icon"/>
      <link href="./css/bootstrap.min.css" rel="stylesheet"/>
      <link href="./css/blueket.plugin.css" rel="stylesheet"/>
      <link href="./css/swiper.min.css" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="./css/style.css" rel="stylesheet"/>
      <link href="./css/responsive.css" rel="stylesheet"/>
      <link href="./css/colormode.css" rel="stylesheet"/> 
   </Head>
   <body>
     <Header location={"Contactus"}/>
 <section class="contactblock section-space pb-0 bg--2 mt100">
   <div class="container">
     <div class="row justify-content-between v-center">          

       <div class="col-lg-7">
          {/* <!-- Contact Form--> */}
          <div class="contact-form-card-pr contact-block-sw iconin">
           <h4>Have Question? Write a Message</h4>             
           <div class="form-block blueketform mt40">
               <form id="contactform" onSubmit={sendQuery}>
                   <div class="fieldsets row">
                       <div class="col-md-6 form-group floating-label">
                           <div class="formicon"><FontAwesomeIcon className="icon" icon={faUser} /></div>
                           <input type="text" placeholder=" " required="required" id="name" class="floating-input" name="fullname"/>
                           <label>Full Name*</label>
                           <div class="error-label"></div>
                       </div>
                       <div class="col-md-6 form-group floating-label">
                           <div class="formicon"><FontAwesomeIcon className="icon" icon={faPhone} /></div>
                           <input type="tel" placeholder=" " required="required" id="mobile_number" class="floating-input" name="mobileno"/>
                           <label>Mobile Number*</label>
                           <div class="error-label"></div>
                       </div>
                   </div>
                   <div class="fieldsets row">
                       <div class="col-md-6 form-group floating-label">
                           <div class="formicon"><FontAwesomeIcon className="icon" icon={faEnvelope} /></div>
                           <input type="email" placeholder=" " required="required" id="email" class="floating-input" name="email"/>
                           <label>Email Address*</label>
                           <div class="error-label"></div>
                       </div>
                       <div class="col-md-6 form-group floating-label">
                           <div class="formicon"><FontAwesomeIcon className="icon" icon={faRectangleList} /></div>
                           <select required="required" id="interested_in" class="floating-select" name="interestedin">
                               <option value="">&nbsp;</option>
                               <option value="Mobile service" >Mobile service</option>
                               <option value="Watch service" >Watch service</option>
                               <option value="Tablet service" >Tablet service</option>
                               <option value="Laptop service" >Laptop service</option>
                           </select>
                           <label>Interested In*</label>
                           <div class="error-label"></div>
                       </div>
                   </div>                                
                   <div class="fieldsets row">
                       <div class="col-md-12 form-group floating-label">
                           <div class="formicon"><FontAwesomeIcon className="icon" icon={faMessage} /></div>
                           <textarea placeholder=" " required="required" id="description" class="floating-input" name="query"></textarea>
                           <label>Please enter you query or problem*</label>
                           <div class="error-label"></div>
                       </div>
                   </div>
                   <div class="custom-control custom-checkbox customcheck">
                       <input type="checkbox" class="custom-control-input ctminpt" id="agree" name="agree" checked="checked"/>
                       <label class="custom-control-label ctmlabl" for="agree">By clicking the “Submit” button you agree to our  <a href="javascript:void(0)">Terms &amp; Conditions</a>.</label>
                   </div>
                   <div class="fieldsets mt20"> <button type="submit" name="submit" class="porkai-btn"><span>{loading ? <div class="subloader-container"><div class="sub-loader"></div></div> : "Submit" }</span></button> </div>                               
               </form>
           </div>
       </div>
        {/* <!-- contact form--> */}
       </div>

       <div class="col-lg-5 mmt40 pad-left-70">
         <div class="contactinfodivv">
           <div class="con-block-sw-div">
             <h2 class="mb10">Let's get in touch</h2>
             <p>We will catch you as early as we receive the message</p>
             <div class="contactinfodivsw mt30">
               <div class="contactnumberdiv">
                 <p class="mb5 linktitle">We're Available 24/7. Call Now.</p>
                 <a href="#"><FontAwesomeIcon className="icon" icon={faTty} />+918750120761</a>
                 <a href="#"><FontAwesomeIcon className="icon" icon={faWhatsapp} />+918750120761</a>
               </div>
               <div class="contactnumberdiv mt30">
                 <p class="mb5 linktitle">Send Us an Email:</p>
                 <a href="#"><FontAwesomeIcon className="icon" icon={faEnvelope} /> <span class="__cf_email__" data-cfemail="b1d9c3f1c8dec4c3c6d4d3c2d8c5d49fd2dedc"> contactusrepairdekho@gmail.com</span></a>
               </div>
               <div class="social-link-sw mt30">
                 <span class="linktitle">Follow Us</span>
                 <ul class="footer-social-sw mt10 sw-hover-2">
                   <li><a href="#"><FontAwesomeIcon className="icon" icon={faTwitter} /></a></li>
                   <li> <a href="#"><FontAwesomeIcon className="icon" icon={faFacebook} /></a></li>
                   <li><a href="#"><FontAwesomeIcon className="icon" icon={faYoutube} /></a></li>
                   <li><a href="#"><FontAwesomeIcon className="icon" icon={faLinkedin} /></a></li>
                   <li> <a href="#"><FontAwesomeIcon className="icon" icon={faInstagram} /></a></li>
                 </ul>
               </div>
             </div>
           </div>
         </div>
       </div>

     </div>
   </div>     
 </section>
     <section class="office-block section-space bg--2">
     </section>
    <Footer/>
   </body>
   <ToastContainer />
      </>
    )
  }