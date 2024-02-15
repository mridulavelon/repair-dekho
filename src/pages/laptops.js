import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Head from "next/head"
export default function Laptops() {

  return (
    <>
    <Head>
      <meta charset="utf-8" />
      <title>Laptops</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
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
   <Header location={"laptops"}/>
    <div class="underwork-container">
    <img src="./images/under-construction.jpg" class="image img-3" alt="" width="40%"/>
     <h2>Coming soon</h2>
     </div>
    <Footer /> 
    </>
  )
}