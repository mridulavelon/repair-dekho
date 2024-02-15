import Head from 'next/head'
import { useEffect,useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import RiseLoader from "react-spinners/RiseLoader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addmodelsobj } from "slices/counterSlice";
import axios from "axios";

export default function Homepage() {
 const dispatch = useDispatch();
 const router = useRouter();
 const [loading,setLoading] = useState(true);

 var settings = {
   dots: true,
   infinite: true,
   speed: 500,
   autoplay:true,
   slidesToShow: 4,
   slidesToScroll: 4,

   responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
 }

 
 var settings2 = {
   dots: true,
   infinite: true,
   autoplay:false,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1
 }

  useEffect(() => {
   setTimeout(() => {
       setLoading(false);
   },1000);
  },[]);

  
  return (
    <>
    {loading ? (
     <div className='loader'>
      <Head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Repair Dekho</title>
    <link href="./images/favicon.png" rel="icon"/>
    <link rel="stylesheet" href="./css/style.css" />
   </Head>
      <RiseLoader color='#ff5723'/>
      </div>
    ):(<>
    <Head>
    <meta charset="utf-8" />
      <title>Repair Dekho</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="theme-color" content="#111"/>
      <link href="/images/favicon.png" rel="icon"/>
      <link href="/css/bootstrap.min.css" rel="stylesheet"/>
      <link href="/css/blueket.plugin.css" rel="stylesheet"/>
      <link href="/css/swiper.min.css" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="/css/style.css" rel="stylesheet"/>
      <link href="/css/responsive.css" rel="stylesheet"/>
      <link href="/css/colormode.css" rel="stylesheet"/>
      </Head>
      <Header location={"Home"}/>
      <Slider {...settings2}>
      <section class="hero-slider hero-style" id="home">
         <div class="swiper-container">
            <div class="swiper-wrapper">
               <div class="swiper-slide">
                  <div class="slide-inner slide-bg-image" style={{backgroundImage:"url('/images/slider-1.jpg')"}}>
                     <div class="container">
                        <div data-swiper-parallax="300" class="slide-title">
                          <span class="scriptheading dashbefore mb15 wow fadeIn" data-wow-delay=".2s" data-wow-duration="1500ms">We are Expert in</span>
                           <h2>Onsite Mobile Repair Service Provider!
                           </h2>
                        </div>
                        <div data-swiper-parallax="400" class="slide-text">
                           <p>We Are Dedicated To Provide You Best Mobile Phone Repairing Services At Your Door Step.
                           </p>
                        </div>
                        <div class="clearfix"></div>
                        <div data-swiper-parallax="500" class="slide-btns">
                           <Link href="Repairmydevice" class="sw-btn sw-blue-btn">Get Started</Link>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="swiper-slide">
                  <div class="slide-inner slide-bg-image" style={{backgroundImage:"url('/images/slider-2.jpg')"}}>
                     <div class="container">
                        <div data-swiper-parallax="300" class="slide-title">
                           <span class="scriptheading dashbefore mb15 wow fadeIn" data-wow-delay=".2s" data-wow-duration="1500ms">We are Expert in</span>
                           <h2>Doorstep Mobile Repair in
                           </h2>
                        </div>
                        <div data-swiper-parallax="400" class="slide-text">
                           <p>Delhi, Gurgaon, Noida, Gr Noida, Ghaziabad</p>
                        </div>
                        <div class="clearfix"></div>
                        <div data-swiper-parallax="500" class="slide-btns">
                           <a href="contact-1.html" class="sw-btn sw-blue-btn">Get Started <i class="fa-solid fa-arrow-trend-up"></i></a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section class="hero-slider hero-style" id="home">
         <div class="swiper-container">
            <div class="swiper-wrapper">
               <div class="swiper-slide">
                  <div class="slide-inner slide-bg-image" style={{backgroundImage:"url('/images/slider-1.jpg')"}}>
                     <div class="container">
                        <div data-swiper-parallax="300" class="slide-title">
                          <span class="scriptheading dashbefore mb15 wow fadeIn" data-wow-delay=".2s" data-wow-duration="1500ms">We are Expert in</span>
                           <h2>Onsite Mobile Repair Service Provider!
                           </h2>
                        </div>
                        <div data-swiper-parallax="400" class="slide-text">
                           <p>We Are Dedicated To Provide You Best Mobile Phone Repairing Services At Your Door Step.
                           </p>
                        </div>
                        <div class="clearfix"></div>
                        <div data-swiper-parallax="500" class="slide-btns">
                           <a href="/Repairmydevice" class="sw-btn sw-blue-btn">Get Started</a>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="swiper-slide">
                  <div class="slide-inner slide-bg-image" style={{backgroundImage:"url('/images/slider-2.jpg')"}}>
                     <div class="container">
                        <div data-swiper-parallax="300" class="slide-title">
                           <span class="scriptheading dashbefore mb15 wow fadeIn" data-wow-delay=".2s" data-wow-duration="1500ms">We are Expert in</span>
                           <h2>Doorstep Mobile Repair in
                           </h2>
                        </div>
                        <div data-swiper-parallax="400" class="slide-text">
                           <p>Delhi, Gurgaon, Noida, Gr Noida, Ghaziabad</p>
                        </div>
                        <div class="clearfix"></div>
                        <div data-swiper-parallax="500" class="slide-btns">
                           <a href="contact-1.html" class="sw-btn sw-blue-btn">Get Started <i class="fa-solid fa-arrow-trend-up"></i></a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      </Slider>
      <section class="word-block-div section-space bkbg3">
         <div class="container">
            <div class="row justify-content-center">
               <div class="col-xl-7 col-lg-8">
                  <h2 class="text-gradient-1 mb15 wow fadeIn text-center mobile-left" data-wow-delay=".2s">Repair Service</h2>
               </div>
            </div> 
            <div class="row  dm4 large-radius">
               <div class="col-lg-3 col-sm-6 wow mt10 fadeIn" data-wow-delay=".4s">
               <Link href="brandselection">
                  <div class="sw-card sw-cl-2">
                     <div class="box-icons">
                        <img src="/images/app.png" alt="icon"/>
                     </div>
                     <div class="sw-cardinfo">                       
                        <h3 class="swbttitlex">Mobile</h3>
                     </div>
                  </div>
               </Link>
               </div>
               <div class="col-lg-3 col-sm-6 mt10 wow fadeIn" data-wow-delay=".6s">
                  <Link href="/modelselection?brand=apple&devicetype=tablet">  
                  <div class="sw-card sw-cl-2">
                     <div class="box-icons">
                        <img src="/images/ux-design.png" alt="icon"/>
                     </div>
                     <div class="sw-cardinfo">
                        <h3 class="swbttitlex">Ipad</h3>
                     </div>
                  </div>
                  </Link>
               </div>
               <div class="col-lg-3 col-sm-6 mt10 wow fadeIn" data-wow-delay=".8s">
                 
                <Link href="laptops">
                     <div class="sw-card sw-cl-2">
                        <div class="box-icons">
                           <img src="/images/content.png" alt="icon"/>
                        </div>   
                     <div class="sw-cardinfo">
                        <h3 class="swbttitlex">Laptop</h3>
                     </div>
                  </div>
               </Link>
               </div>
               <div class="col-lg-3 mt10 col-sm-6 wow fadeIn" data-wow-delay="1s">
                  <Link href="/modelselection?brand=apple&devicetype=watch">  
                     <div class="sw-card sw-cl-2">    
                        <div class="box-icons">
                           <img src="/images/online-shop.png" alt="icon"/>
                        </div>                   
                     <div class="sw-cardinfo">
                        <h3 class="swbttitlex">Apple Watch</h3>
                     </div>
                  </div>
                  </Link>
               </div>
            </div>
         </div>
      </section>
      <section class="section-space ">
         <div class="container">
           <div class="row justify-content-between align-end">
            
               <div class="about-conent paragraph">
                 <h2 class="wow fadeInUp text-center" data-wow-delay=".2s">
                  Fix Your Gadgets in 3 Steps
</h2>
               </div>
             
            
           </div>
           <div class="row mt30 box-size">
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/edit.png" alt="icon"/></div>
                 <h4>Check Prices​</h4>
                 <p>We understand your time is precious. Repair Dekho  expert will fix your device within 30 minutes!
                  </p>
               </div>
             </div>
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/paid-content.png" alt="icon"/></div>
                 <h4>Fix An Appointment
               </h4>
                 <p>Choose the time according to your ease, Our Technicians will repair your device at your place according to the time provided by you.
               </p>
               </div>
             </div>
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/feature.png" alt="icon"/></div>
                 <h4>Repairing Done
               </h4>
                 <p>Get your device is a brand new condition after availing our repair services. We guarantee 99% customer satisfaction.
               </p>
               </div>
             </div>
            
           </div>
         </div>
       </section>
       <section class="section-space pt-0">
         <div class="container">
            <div class="row justify-content-between v-center">
              
               <div class="col-lg-12 mmt40">
                  
                  <h2>Why People Trust Us
                  </h2>
                  <p class="pt20">
                     We help Individuals to get their device repaired with minimum efforts and minimum Budget.


                  </p>
                  <div class="medialist mt40">
                     <div class="mediablock">
                        <div class="icondiv"><img src="/images/experience.png" alt="icon"/></div>
                        <div class="mediainfoblock">
                           <h5 class="mb10">One Stop Solution</h5>
                           <p>Pickup and Delivery, Upgrades and Repairs.

                           </p>
                        </div>
                     </div>
                     <div class="mediablock mt30">
                        <div class="icondiv"><img src="/images/on-time.png" alt="icon"/></div>
                        <div class="mediainfoblock">
                           <h5 class="mb10">Trained Professionals​
                           </h5>
                           <p>Team of Experts ready to serve you anytime.
                           </p>
                        </div>
                     </div>
                     <div class="mediablock mt30">
                        <div class="icondiv"><img src="/images/investment.png" alt="icon"/></div>
                        <div class="mediainfoblock">
                           <h5 class="mb10">Quality Parts
                           </h5>
                           <p>Certified, Genuine Parts Guaranteed

                           </p>
                        </div>
                     </div>
                     <div class="mediablock mt30">
                        <div class="icondiv"><img src="/images/online-learning.png" alt="icon"/></div>
                        <div class="mediainfoblock">
                           <h5 class="mb10">Transparency</h5>
                           <p>Authoritative and timely declaration of information to its customers

                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section> 
      <section class="aboutblock section-space bkbg0 black-bg-1">
         <div class="container">
            <div class="row v-center">
               <div class="col-lg-7">
                  <div class="about-conent paragraph">
                     <span class="scriptheading dashbefore mb15 wow fadeIn" data-wow-delay=".2s" data-wow-duration="1500ms">WHO WE ARE</span>
                     <h2 class="mb20 wow fadeIn" data-wow-delay=".4s" data-wow-duration="1500ms">You Break, We Fix</h2>
                     <h5 class="wow fadeIn" data-wow-delay=".6s" data-wow-duration="1500ms">Simplest Way To Get Your Mobile Fixed!
                     </h5>
                     <p class="wow fadeIn" data-wow-delay=".8s" data-wow-duration="1500ms">
                        Our aim is to provide every customer with a stress-free and exceptional experience and help you find the best possible solution. Providing a friendly, transparent and cost effective service, our team of experts can assist you with any issue from beginning to end.</p>
                     <div class="item-pair mt40 wow fadeIn" data-wow-delay=".6s" data-wow-duration="1500ms">
                        <a href="/Repairmydevice" class="sw-btn sw-blue-btn">Book Now</a>       
                     </div>
                  </div>
               </div>
               <div class="col-lg-5 mmt40">
                  <div class="img-collage-set row">
                     <div class="blueketshape1 shapesw shapecontrol-4"></div>
                     <div class=" index-up">
                        <div class="imgcover roundimg shadow"> <img src="/images/repair-13.png" alt="img"/></div>
                     </div>
                    
                     <div class="blueketshape2 shapesw shapecontrol-3"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>
      <section class="aboutblock section-space">
         <div class="container">
            <div class="row v-center">
               <div class="col-lg-5 mmt40">
                  <div class="img-collage-set row">
                     <div class=" index-up">
                        <div class="imgcover roundimg shadow"> <img src="/images/Our-Thought.png" alt="img"/></div>
                     </div>
                     <div class="blueketshape2 shapesw shapecontrol-3"></div>
                  </div>
               </div>
               <div class="col-lg-7">
                  <div class="about-conent paragraph">
                     <h4 class="mb20 wow fadeIn" data-wow-delay=".4s" data-wow-duration="1500ms">Our Thought process and execution</h4>      
                     <p class="wow fadeIn" data-wow-delay=".8s" data-wow-duration="1500ms">
                        we look at the Mobile repair industry from a new perspective. And to implement it, we have come up with a new program, in which you will get satisfaction along with a quality services. Your device will be repaired by our professional and experienced technicians. And last but not the least "we value your time, We save your money, We protect your data and We care about your device".
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>   
      <section class="aboutblock section-space bkbg3 big-font">
         <div class="container">
            <div class="row v-center">
               <div class="col-lg-12">
                  <div class="about-conent paragraph">
            
                     <h4 class="mb20 wow fadeIn" data-wow-delay=".4s" data-wow-duration="1500ms">
                        Our Repair Process</h4>
                     
                     <p class="wow fadeIn" data-wow-delay=".8s" data-wow-duration="1500ms">
                        we repair assembled mobiles in our repair system with a perfect fitting. And to do this process we have certified technicians and quality parts who help us to complete this process. We want you to get your repaired in new condition and can use it for a long time.
                     </p>
                     <div class="row justify-content-between mt20">
                        <div class="col-lg-6">
                        <h4 class="mb20 wow fadeIn" data-wow-delay=".4s" data-wow-duration="1500ms">
                       Data Security</h4>
                          
                           <p>we know that your device data is very important to you. so we repair your device in front of you. And take full care of your privacy. and our engineers repair your devices securely.</p>
                        </div>
                        <div class="col-lg-6">
                         
                           <h4 class="mb20 wow fadeIn" data-wow-delay=".4s" data-wow-duration="1500ms">
                          Flexible Prices</h4>
                           <p>Authorized companies repair your device with more money than you. on the other hand. Repair Dekho saves both your money and time with good service and Genuine Products.</p>
                        </div>
                     </div>
                  </div>
               </div>
               {/* <div class="col-lg-5 mmt40">
                  <div class="img-collage-set row">
                     <div class=" index-up">
                        <div class="imgcover roundimg shadow"> <img src="/images/repair-13.png" alt="img"/></div>
                     </div>
                     <div class="blueketshape2 shapesw shapecontrol-3"></div>
                  </div>
               </div> */}
            </div>
         </div>
      </section>
      <section class="section-space">
         <div class="container">
           <div class="row justify-content-between align-end">
               <div class="about-conent paragraph">
                 <h2 class="wow fadeInUp text-center" data-wow-delay=".2s">
                  Why Choose Repair Dekho
                 </h2>
               </div>       
           </div>
           <div class="row mt30">
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/edit.png" alt="icon"/></div>
                 <h4>Quick Service</h4>
                 <p>We understand your time is precious. Repair Dekho  expert will fix your device within 30 minutes!
               </p>
               </div>
             </div>
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/paid-content.png" alt="icon"/></div>
                 <h4>Free Doorstep Service</h4>
                 <p>Get premium mobile repair service at your doorstep with no additional cost.
               </p>
               </div>
             </div>
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/feature.png" alt="icon"/></div>
                 <h4>Transparency   </h4>
                 <p>Repair Dekho provides complete, authoritative and timely declaration of information to its customers
               </p>
               </div>
             </div>
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/code.png" alt="icon"/></div>
                 <h4>Certified Professionals</h4>
                 <p>Repair Dekho technicians are professionally experienced. Rest assured, your device is in safe hands

               </p>
               </div>
             </div>
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/technical-support.png" alt="icon"/></div>
                 <h4>6-Month Warranty</h4>      
                 <p>We offer 6-month warranty. Our team will share all the warranty related information with you
                  </p>
               </div>
             </div>
             <div class="col-lg-4 mt30">
               <div class="sw-card swbdr">
                 <div class="cardicon"><img src="/images/update.png" alt="icon"/></div>
                 <h4>E-waste management
               </h4>
                 <p>At Repair Dekho, e-waste is channelized to a registered recycler for their safe transportation and disposal
               </p>
               </div>
             </div>
           </div>
         </div>
       </section>
      <section class="clients-section section-space">
         <div class="container">
            <div class="row justify-content-center">
               <div class="col-lg-10 text-center">
                  <span class="scriptheading mb15 wow fadeIn" data-wow-delay=".2s">Review/Feedback</span>
                  <h2 class="text-gradient-1 wow fadeIn" data-wow-delay=".4s">What Our Happy Customer Says About Us</h2>
               </div>
            </div>
            <div class="row mt60">
               <div class="col-lg-12 slider-divder responsive">
                  <Slider {...settings}>
                     <div class="blueket-card-noise card-img-round pt30">
                        <div class="review-img-block">
                           <div class="user-image"><img src="/images/user-image.jpg" alt="review"/></div>
                           <div class="user-content">
                              <h5>Karan Kumar</h5>
                              <p>CTO @ Amber Fund</p>
                           </div>
                        </div>
                        <div class="review-content mt30 mb30">
                           <p>When it comes to website development and SEO, Blueket has been the best company I've worked with so far. We hired them for both of our businesses and have seen a drastic increase in our customer base.</p>
                        </div>
                        <div class="review-footer pair-block">
                           <div class="image-icon">
                              <a href="#"><img src="/images/google.png" alt="icon"/></a>
                           </div>
                           <div class="starrating">
                              <ul>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="blueket-card-noise card-img-round pt30">
                        <div class="review-img-block">
                           <div class="user-image"><img src="/images/user-image-2.jpg" alt="review"/></div>
                           <div class="user-content">
                              <h5>Mike Smith</h5>
                              <p>Business Man</p>
                           </div>
                        </div>
                        <div class="review-content mt30 mb30">
                           <p>When it comes to website development and SEO, Blueket has been the best company I've worked with so far. We hired them for both of our businesses and have seen a drastic increase in our customer base.</p>
                        </div>
                        <div class="review-footer pair-block">
                           <div class="image-icon">
                              <a href="#"><img src="/images/google.png" alt="icon"/></a>
                           </div>
                           <div class="starrating">
                           <ul>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="blueket-card-noise card-img-round pt30">
                        <div class="review-img-block">
                           <div class="user-image"><img src="/images/user-image-3.jpg" alt="review"/></div>
                           <div class="user-content">
                              <h5>Riya Smily</h5>
                              <p>CEO @ Tema Security</p>
                           </div>
                        </div>
                        <div class="review-content mt30 mb30">
                           <p>When it comes to website development and SEO, Blueket has been the best company I've worked with so far. We hired them for both of our businesses and have seen a drastic increase in our customer base.</p>
                        </div>
                        <div class="review-footer pair-block">
                           <div class="image-icon">
                              <a href="#"><img src="/images/google.png" alt="icon"/></a>
                           </div>
                           <div class="starrating">
                           <ul>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="blueket-card-noise card-img-round pt30">
                        <div class="review-img-block">
                           <div class="user-image"><img src="/images/user-image-4.jpg" alt="review"/></div>
                           <div class="user-content">
                              <h5>Oliver Kanjorva</h5>
                              <p>Business Man</p>
                           </div>
                        </div>
                        <div class="review-content mt30 mb30">
                           <p>When it comes to website development and SEO, Blueket has been the best company I've worked with so far. We hired them for both of our businesses and have seen a drastic increase in our customer base.</p>
                        </div>
                        <div class="review-footer pair-block">
                           <div class="image-icon">
                              <a href="#"><img src="/images/google.png" alt="icon"/></a>
                           </div>
                           <div class="starrating">
                           <ul>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="blueket-card-noise card-img-round pt30">
                        <div class="review-img-block">
                           <div class="user-image"><img src="/images/user-image-4.jpg" alt="review"/></div>
                           <div class="user-content">
                              <h5>Oliver Kanjorva</h5>
                              <p>Business Man</p>
                           </div>
                        </div>
                        <div class="review-content mt30 mb30">
                           <p>When it comes to website development and SEO, Blueket has been the best company I've worked with so far. We hired them for both of our businesses and have seen a drastic increase in our customer base.</p>
                        </div>
                        <div class="review-footer pair-block">
                           <div class="image-icon">
                              <a href="#"><img src="/images/google.png" alt="icon"/></a>
                           </div>
                           <div class="starrating">
                           <ul>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="blueket-card-noise card-img-round pt30">
                        <div class="review-img-block">
                           <div class="user-image"><img src="/images/user-image-4.jpg" alt="review"/></div>
                           <div class="user-content">
                              <h5>Oliver Kanjorva</h5>
                              <p>Business Man</p>
                           </div>
                        </div>
                        <div class="review-content mt30 mb30">
                           <p>When it comes to website development and SEO, Blueket has been the best company I've worked with so far. We hired them for both of our businesses and have seen a drastic increase in our customer base.</p>
                        </div>
                        <div class="review-footer pair-block">
                           <div class="image-icon">
                              <a href="#"><img src="/images/google.png" alt="icon"/></a>
                           </div>
                           <div class="starrating">
                           <ul>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="blueket-card-noise card-img-round pt30">
                        <div class="review-img-block">
                           <div class="user-image"><img src="/images/user-image-4.jpg" alt="review"/></div>
                           <div class="user-content">
                              <h5>Oliver Kanjorva</h5>
                              <p>Business Man</p>
                           </div>
                        </div>
                        <div class="review-content mt30 mb30">
                           <p>When it comes to website development and SEO, Blueket has been the best company I've worked with so far. We hired them for both of our businesses and have seen a drastic increase in our customer base.</p>
                        </div>
                        <div class="review-footer pair-block">
                           <div class="image-icon">
                              <a href="#"><img src="/images/google.png" alt="icon"/></a>
                           </div>
                           <div class="starrating">
                           <ul>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div class="blueket-card-noise card-img-round pt30">
                        <div class="review-img-block">
                           <div class="user-image"><img src="/images/user-image-4.jpg" alt="review"/></div>
                           <div class="user-content">
                              <h5>Oliver Kanjorva</h5>
                              <p>Business Man</p>
                           </div>
                        </div>
                        <div class="review-content mt30 mb30">
                           <p>When it comes to website development and SEO, Blueket has been the best company I've worked with so far. We hired them for both of our businesses and have seen a drastic increase in our customer base.</p>
                        </div>
                        <div class="review-footer pair-block">
                           <div class="image-icon">
                              <a href="#"><img src="/images/google.png" alt="icon"/></a>
                           </div>
                           <div class="starrating">
                           <ul>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                                 <li> <a href="#" class="checked"><FontAwesomeIcon icon={faStar} aria-hidden="true"/></a> </li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </Slider>
               </div>
            </div>
        
         </div>
      </section>
      <Footer/>
      </>)}
    </>
  )
}