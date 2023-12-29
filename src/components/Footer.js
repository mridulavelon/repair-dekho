import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp, faMessage, faPhone, faRectangleList, faSquareEnvelope, faTty, faUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faLinkedin, faTwitter, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addmodelsobj } from "slices/counterSlice";
import axios from "axios";


export default function Footer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const getIpads = async (event,brand) => {
    event.preventDefault();
    let data = {
       brand:brand,
       type:"ipad"
    } 
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/getmodels`,data);
    if(response.data){
       dispatch(addmodelsobj(response.data.models));
       router.push('./modelselection')
    }
 }
 const getIwatches = async (event,brand) => {
    event.preventDefault();
    let data = {
       brand:brand,
       type:"iwatch"
    } 
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/getmodels`,data);
    if(response.data){
       dispatch(addmodelsobj(response.data.models));
       router.push('./modelselection')
    }
 }

  return (
    <footer class="footer-design-sw pt80 pb30 bkbg2  black-bg-1"> 
    <div class="container index-up">
      <div class="row justify-content-between">
        <div class="col-lg-3">
          <div class="footer-brand-info">
            <div class="footer-logo-sw"> 
              <a href="#"><img src="/images/logo-white.svg" alt="logo" class="light"/></a>
              <a href="#"><img src="/images/logo-black.svg" alt="logo" class="dark"/></a>
            </div>
                       {/* <!-- contact --> */}
             <div class="contactinkediv mt50">
              <span class="linktitle">Send Us an Email:</span>
              <a href="/#"><span> info@repairdekho.in</span></a>
            </div>
            <div class="contactinkediv mt30">
              <span class="linktitle">Give Us a Call:</span>
              <a href="tel:+911234567900">91 123 4567 890</a>
            </div>
             {/* <!-- /contact -->   */}
             {/* <!-- social link --> */}
            <div class="social-link-sw mt40">
              <span class="linktitle">Follow Us</span>
              <ul class="footer-social-sw mt10 sw-hover-2">
              <li><a href="https://twitter.com/repair_dekho?s=09" target="_blank"><FontAwesomeIcon className="icon" icon={faTwitter} /></a></li>
                 <li> <a href="https://www.facebook.com/repairdekho20?mibextid=ZbWKwL" target="_blank"><FontAwesomeIcon className="icon" icon={faFacebook} /></a></li>
                 <li><a href="https://youtube.com/@repairdekho" target="_blank"><FontAwesomeIcon className="icon" icon={faYoutube} /></a></li>
                 <li><a href="https://www.linkedin.com/in/repair-dekho-31a15b238" target="_blank"><FontAwesomeIcon className="icon" icon={faLinkedin} /></a></li>
                 <li> <a href="https://instagram.com/repairdekho20?igshid=NTc4MTIwNjQ2YQ==" target="_blank"><FontAwesomeIcon className="icon" icon={faInstagram} /></a></li>
              </ul>
            </div>
            {/* <!--/social link --> */}
          </div>
        </div>
        <div class="col-lg-3 mt30">
          <div class="footer-links">
            <h5 class="linktitle">Company Links</h5>
            <ul class="mt20">
              <li><Link href="About">About Us</Link></li>
              <li><Link href="Repairmydevice">Service</Link></li>
              <li><Link href="offers">Offers</Link></li>
              <li><Link href="blogs">Blogs</Link></li>
              <li><Link href="Contactus">Contact Us</Link></li>
                         
            </ul>
          </div>
        </div>
     
        <div class="col-lg-3 mt30">
          <div class="footer-links">
            <h5 class="linktitle">Our Services</h5>
            <ul class="mt20">
              <li><Link href="/brandselection">Mobile</Link></li>
              <li> <Link href="/modelselection?brand=apple&devicetype=tablet">Ipad</Link></li>
              <li><Link href="/laptops">Macbook</Link></li>
              <li> <Link href="/modelselection?brand=apple&devicetype=watch">Apple Watch</Link></li>
                               
            </ul>
          </div>
        </div>   
        <div class="col-lg-3 mt30">
          <div class="footer-links">
            <h5 class="linktitle">Service Location</h5>
            <ul class="mt20">
              <li><a href="#">Delhi</a></li>
              <li><a href="#">Noida</a></li>
              <li><a href="#">Gr Noida</a></li>
              <li><a href="#">Ghaziabad</a></li>
                               
            </ul>
          </div>
        </div>   
      </div>    
      {/* <!-- /footer links column --> */}
      <div class="footercreditandrevielinks swhr pt20 mt60">
        <div class="row">
          <div class="col-lg-12">
            <div class="footercreditnote sw-hover-1">
              <div>
                <p>© 2022 All Rights</p>
              </div>
              <div class="linkftsw">
                <ul class="list-h-styled">
                  <li><a href="#">Terms of Use</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>  
  )
}