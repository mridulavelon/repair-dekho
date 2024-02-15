import { useEffect,useState } from "react"
import Head from 'next/head';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import moment from "moment";

export default function Blogpage({ data }) {
    const router = useRouter();
    const[blog,setBlog] = useState({});

    useEffect(() => {
      if(!router.isReady) return; 
      getBlogData(router.query.blogpage);
    },[router.isReady])

    const getBlogData = async(blogid) => {
       const data = {
         'blogid':blogid
       }
       const blogCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs/getblog`,data)
      .then((response) => {
        console.log(response)
        if(response.status === 201){
          setBlog(response.data.blog);
        }
      })
      .catch((error) => {
         toast.error(error.message ? error.message : "Something unexpected happened please try again later",{
                theme:"colored"
          })
      })
    }
    
  return (
   <>
   <Head>
      <meta charset="utf-8" />
      <title>{blog.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no,maximum-scale=1.0,user-scalable=no"/>
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
   <Header location={"Blogs"} />
       <section className="blogpage-container">
        <h2 class="blogpage-title">{blog.title}</h2>
        <div>
            <span>{moment(new Date(blog.timestamp)).format('MMMM Do YYYY')}</span>
        </div>
        <div class="blogpage-coverimg">
          <img src={blog.cover}/>
        </div>
        <div class="blogpage-content" dangerouslySetInnerHTML={{__html:blog.content}}>
        </div>
        <div class="blog-differline"></div>
        <div class="blogpage-author">
            <img src="/images/logo-black.svg" alt="brand-logo"/>
            <div >
                <h5>Repair Dekho Team</h5>
                <p>The content of this blog has been created and carefully reviewed by the esteemed team at Kotak General Insurance, with the sole purpose of providing valuable guidance and sharing insights on the importance of general insurance. Our objective is to assist users in making informed decisions when purchasing or renewing insurance policies for their cars, bikes, and health. Our expertly curated information aims to empower our readers with the knowledge they need to protect their valuable assets and financial interests.</p>
            </div>
        </div>
        <div>
            <Link href="/blogs"><button class="check-button">Check more</button></Link>
        </div>
       </section>
    <Footer/>
   </>
  )
}
