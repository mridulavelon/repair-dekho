import { useEffect,useState } from "react"
import Head from 'next/head'
import Header from '@/components/Header'
import Footer from '@/components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import RiseLoader from "react-spinners/RiseLoader";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from 'react-toastify';

export default function blogs({ data }) {
   const reduxState = useSelector((state) => state.counter);
   const router = useRouter();
   const dispatch = useDispatch();
   const [loading,setLoading] = useState(true);
   const [blogs,setBlogs] = useState([]);


   useEffect(() => {
      if(data.success){
         setBlogs(data.response)
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
   {
     loading ? (
      <div className="loader">
       <Head>
      <meta charset="utf-8" />
      <title>Blogs</title>
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
      <title>Blogs</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no,maximum-scale=1.0,user-scalable=no"/>
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
    <Header location={"Blogs"} />
       <section id="blog" class="blogs-container">
          <div class="blog-heading">
              <span>
                Recent Posts
              </span>
              <h3>
                Blogs
              </h3>
            </div>
            <div class="blog-container">
              {blogs.map((blog) => (
                 <div class="blog-box" key={blog._id}>
                 <div class="blog-img">
                   <img src={blog.cover}  alt="blog"/>
                 </div>
                 <div class="blog-text">
                    <span>{moment(new Date(blog.timestamp)).format('MMMM Do YYYY')}</span>
                    <a href="#"  class="blog-title">{blog.title}</a>
                    <p>{blog.summary}</p>
                    <Link href={`/blogs/${blog.title.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase()}?id=${blog._id}`}>Read more</Link>
                </div>
              </div>
              ))}
            </div>
       </section>
    <Footer/>
    <ToastContainer />
    </> )}
   </>
  )
}

export async function getServerSideProps() {
  const blogCall = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/getblogs`)
  .then((response) => {
    if(response.status ===200){
      return {success:true,response:response.data.response}
    }
  }).catch((error) => {
     return {success:false,response:error.message ? error.message : "Something unexpected happend please try again later"}
  })
  return { props: { data:blogCall } };
}