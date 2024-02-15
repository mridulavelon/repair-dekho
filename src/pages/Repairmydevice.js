import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import services from '../Utils/services.json';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function Repairmydevice() {


   var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay:true,
      slidesToShow: 8,
      slidesToScroll: 1,

      
   responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

    }

  return (
   <>
   <Head>
      <meta charset="utf-8" />
      <title>Repairmydevice</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="theme-color" content="#111"/>
      <link href="/images/favicon.png" rel="icon"/>
      <link href="/css/bootstrap.min.css" rel="stylesheet"/>
      <link href="/css/blueket.plugin.css" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
      <link href="/css/style.css" rel="stylesheet"/>
     <link href="/css/responsive.css" rel="stylesheet" />
      <link href="/css/colormode.css" rel="stylesheet" /> 
   </Head>
    <Header location={"Repairmydevice"}/>
      <section className="section-space  padding-b50">
         <div className="container nobreack">
            <div className="row justify-content-between">
               <div className="col-xl-6 col-lg-6">
                  <div className="paragraph-block">
                     <h3 className="header-small mb15" style={{color: '#FFAB00'}}>We are Expert in </h3>
                     <div className="service-header">MOBILE <br /> REPAIR<br /> SERVICES</div>
                     <p className="line-height">We Are Dedicated To Provide You Best Mobile Phone Repairing Services At Your Door Step.
                     </p>
                  </div>                 
                                  
               </div>
               <div className="col-xl-6 col-lg-6 mmt40">
                  <div className="roundimg"><img src="/images/service-bg.png" alt="img"/></div>
               </div>
            </div>
         </div>
      </section>
      <section className="section-space" style={{paddingTop:'50px'}}>
      
               <div className="container select-phone">
               <div className="row justify-content-center text-center">
               <div className="col-xl-12 col-lg-12">
                  <div className="paragraph-block">
                     <h2 className="service-body-head">One Stop Solution For All Your Devices</h2>
                     <div className="service-body-head-sub">We Solve All Major Smartphone Issues.
                        <div className="line-bg"></div>
                     </div>
                  </div>
                  <div className="service-body-head-sub2">
                     Select the issue with your phone?
                  </div>
               </div>
            </div>
                  <div className="phone-issue">
                    {services.map((service) => (
                        <div className="issue-box">
                        <Link href={service.routelink}>
                        <img src={service.imagelink}/>
                        <div>
                           {service.servicelabel}
                        </div>
                     </Link>
                     </div>))}
                  </div>
                  <div className="clearfix"></div>
               </div>

      </section>
      <section className="word-block-div section-space black-bg2">
         <div className="container">
            <div className="row justify-content-center">
               <div className="text-center">
                  <h2 className=" wow fadeIn color-white" data-wow-delay=".2s">Why Choose RepairDekho for Mobile Repair and Replacement?
                  </h2>
                  <div className="line-bg"></div>
               </div>
            </div>
            <div className="row mt30 dm4">
               <div className="col-lg-4 col-sm-6 mt60 wow fadeIn" data-wow-delay=".4s">
                  <div className="sw-card  sw-cl-2">
                     <div className="cardicon-out shadow"><img src="/images/app.png" alt="icon"/></div>
                     <div className="sw-cardinfo">
                        <h3 className="swbttitlex">6 Months Warranty
                        </h3>
                        <p>
                           Repair Dekho provides genuine parts and 6 months warranty on every part we replace which makes us the perfect place for your mobile.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 col-sm-6 mt60 wow fadeIn" data-wow-delay=".6s">
                  <div className="sw-card sw-cl-2">
                     <div className="cardicon-out shadow"><img src="/images/ux-design.png" alt="icon"/></div>
                     <div className="sw-cardinfo">
                        <h3 className="swbttitlex">Onsite Repair
                        </h3>
                        <p>
                           Every customer wants quick repair of their mobile phones, we value our customer’s time, therefore, our team repair mobile devices at their doorstep on time.
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-lg-4 col-sm-6 mt60 wow fadeIn" data-wow-delay=".8s" >
                  <div className="sw-card  sw-cl-2">
                     <div className="cardicon-out shadow"><img src="/images/content.png" alt="icon"/></div>
                     <div className="sw-cardinfo">
                        <h3 className="swbttitlex">Best Pricing
                        </h3>
                        <p>
                           When you will compare our price with our competitors – You will feel very happy, because of our low price & best services for your device repair.
                        </p>
                     </div>
                  </div>
               </div>
              
            </div>
         </div>
      </section>
      <div className="clearfix"></div>
      <div className="container model-logo">
                    <Slider {...settings}>
                       <div className="img-client-logo-cell"><img src="/images/company/1.png" alt="logo"/></div>                     
                       <div className="img-client-logo-cell"><img src="/images/company/2.png" alt="logo"/></div>                     
                       <div className="img-client-logo-cell"><img src="/images/company/3.png" alt="logo"/></div>                     
                       <div className="img-client-logo-cell"><img src="/images/company/4.png" alt="logo"/></div>                     
                       <div className="img-client-logo-cell"><img src="/images/company/5.png" alt="logo"/></div>                     
                       <div className="img-client-logo-cell"><img src="/images/company/6.png" alt="logo"/></div>                     
                       <div className="img-client-logo-cell"><img src="/images/company/7.png" alt="logo"/></div>                     
                       <div className="img-client-logo-cell"><img src="/images/company/8.png" alt="logo"/></div>  
                       <div className="img-client-logo-cell"><img src="/images/company/google.webp" alt="logo"/></div>  
                       </Slider>                  
           </div>
    <Footer/>
   </>
  )
}