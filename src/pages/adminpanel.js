import Link from 'next/link'
import Head from 'next/head'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState,useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';
import axios from 'axios';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';


export default function Adminpanel() {
    const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }),[]);
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[activeTab,setActiveTab] = useState("orders");
    const[orders,setOrders] = useState([]);
    const[blogs,setBlogs] = useState([]);
    const[users,setUsers] = useState([]);
    const[models,setModels] = useState([]);
    const[brands,setBrands] = useState([]);
    const[offers,setOffers] = useState([]);
    const[showDashboard,setShowDashboard] = useState(false);
    const[showUpdateOrder,setShowUpdateOrder] = useState(false);
    const[selectedBrand,setSelectedBrand] = useState("");
    const[deviceType,setDeviceType] = useState("");
    const[modelsFetched,setModelsFetched] = useState(false);
    const[addModel,setAddModel] = useState(false);
    const[updateModel,setUpdateModel] = useState(false);
    const[addBlog,setAddBlog] = useState(false);
    const[updateBlog,setUpdateBlog] = useState(false);
    const[blogContent,setBlogContent] = useState("");
    const[addBrand,setAddBrand] = useState(false);
    const[updateBrand,setUpdateBrand] = useState(false);
    const[addOffer,setAddOffer] = useState(false);
    const[updateOffer,setUpdateOffer] = useState(false);
    const[updateDetails,setUpdateDetails] = useState({});
    const[services,setServices] = useState([
      {
        id:1,
        label:"all"
      },
      {
        id:2,
        label:"touch"
      },
      {
        id:3,
        label:"display"
      },
      {
        id:4,
        label:"battery"
      },
      {
        id:5,
        label:"charging"
      },
      {
        id:6,
        label:"backpanel"
      },
      {
        id:7,
        label:"tempered"
      },
      {
        id:8,
        label:"speaker"
      },
      {
        id:9,
        label:"reciever"
      },
      {
        id:10,
        label:"glass"
      }
    ])



    useEffect(() => {
      activeTabHandler(activeTab);
    },[])


    const submitHandler = () => {
        if(password && username !== ''){
              if(username === "repairdekhoadmin" && password === "repairdekhoadmin@123"){
                toast.success("Verified",{
                    theme:"colored"
                })
                setTimeout(() => {
                    setShowDashboard(true);
                },1000);
                setActiveTab("orders")
               }else{
                toast.error("Invalid username or password",{
                    theme:"colored"
                  })
              }
        }else{
            toast.error("Please provide login details",{
                theme:"colored"
              })
        }
    }
    const activeTabHandler = async(tabid) => {
      if(tabid === "orders"){
         getOrdersHandler();
      }else if(tabid === "blogs"){
         getBlogsHandler();
      }else if(tabid === "users"){
         getUsersHandler();
      }else if(tabid === "brands" || tabid === "models"){
        getBrandsHandler();
      }else if(tabid === "offers"){
        getOffersHandler();
      }
      setActiveTab(tabid)
    }

    const onCloseUpdateOrder = () => setShowUpdateOrder(false);
    const onCloseAddModel = () => setAddModel(false);
    const onCloseUpdateModel = () => setUpdateModel(false);
    const onCloseAddBlog = () => setAddBlog(false);
    const onCloseUpdateBlog = () => setUpdateBlog(false);
    const onCloseAddBrand = () => setAddBrand(false);
    const onCloseUpdateBrand = () => setUpdateBrand(false);
    const onCloseAddOffer = () => setAddOffer(false);
    const onCloseUpdateOffer = () => setUpdateOffer(false);

    const getOrdersHandler = async() => {
        const orderCall = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/getorders`)
        .then((response) => {
           if(response.data.orders){
               setOrders(response.data.orders)
           }
        }).catch((error) => {
          toast.error(error.message,{
              theme:"colored"
            })
        })
    }

    const deleteOrderHandler = async(orderid) => {
        const data = {
            "id" : orderid
        }
        const deleteCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/deleteorder`,data)
        .then(async(response) => {
           if(response.data.success){
             toast.success(response.data.response,{
                 theme:"colored"
               });
              getOrdersHandler();
           }else{
             toast.error(response.data.response,{
                 theme:"colored"
               }) 
           }
        })
        .catch((error)  => {
            toast.error(error.message?error.message : "Something unexpected happened please try again later",{
              theme:"colored"
            }) 
         });
       
    }

    const updateOrderHandler = async() => {
      const data = {
        "id":updateDetails.id,
        "email":updateDetails.email,
        "orderstatus":updateDetails.orderstatus
      }
    const updateOrderCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/orders/updateorder`,data)
    .then((response) => {
      if(response.data.success){
         toast.success(response.data.response,{
             theme:"colored"
           });
        getOrdersHandler();
      }else{
         toast.error(response.data.error,{
             theme:"colored"
           })
      }
    }).catch((err) => {
       toast.error(err.message ? err.message : "Something unexpected happened please try again later",{
         theme:"colored"
       })
    }) 
    onCloseUpdateOrder();
    }

    const orderDetailsHandler = (order) => {
      setUpdateDetails({
        id:order._id,
        email:order.userdetails.email,
        orderstatus:order.orderstatus
      })
     setShowUpdateOrder(true);
    }

    const getModelsHandler = async() => {
        if(selectedBrand.length > 0 && deviceType.length > 0){
            let data = {
                brand:selectedBrand,
                type:deviceType
             } 
             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/getmodels`,data);
             if(response.data){
                setModels(response.data.models);
                setModelsFetched(true);
             }
        }else{
            toast.error("Please select both brand and device type",{
                theme:"colored"
              })  
            setModelsFetched(false);  
        }
    }

    const detailsChangeHandler = (model) => {
        setUpdateModel(true);
        setUpdateDetails({
          id:model._id,
          type:model.type,
          modelname:model.modelname,
          touch:model.touch ? model.touch : "",
          localdisplay:model.display.local ? model.display.local : "",
          brandeddisplay:model.display.branded ? model.display.branded : "",
          oleddisplay:model.display.oled ? model.display.oled : "",
          battery:model.battery ? model.battery : "",
          charging:model.charging ? model.charging : "",
          backpanel:model.backpanel ? model.backpanel : "",
          tempered:model.tempered ? model.tempered : "",
          speaker:model.speaker ? model.speaker : "",
          receiver:model.receiver ? model.receiver : "",
          glass:model.glass ? model.glass : "",
          modelimagelink:model.modelimagelink,
          smallimagelink:model.smallimagelink  
        });

    }

    const updateModelHandler = async(e) => {
       e.preventDefault();
       let data = {
        "id":updateDetails.id,
        "modelname":updateDetails.modelname,
        ...(updateDetails.touch !== "" && {"touch":updateDetails.touch}),
        ...(updateDetails.battery !== "" && {"battery":updateDetails.battery}),
        ...(updateDetails.charging !== "" && {"charging":updateDetails.charging}),
        ...(updateDetails.backpanel !== "" && {"backpanel":updateDetails.backpanel}),
        ...(updateDetails.tempered !== "" && {"tempered":updateDetails.tempered}),
        ...(updateDetails.speaker !== "" && {"speaker":updateDetails.speaker}),
        ...(updateDetails.receiver !== "" && {"receiver":updateDetails.receiver}),
        ...(updateDetails.glass !== "" && {"glass":updateDetails.glass}),
        "modelimagelink":updateDetails.modelimagelink,
        "smallimagelink":updateDetails.smallimagelink
       }
       if(updateDetails.oleddisplay !== ""){
         data["display"] = {
           "oled":updateDetails.oleddisplay,           
           "local":updateDetails.localdisplay,
           "branded":updateDetails.brandeddisplay
         }
       }else{
        data["display"] = {
           "local":updateDetails.localdisplay,
           "branded":updateDetails.brandeddisplay
        }
       }
        const updateCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/updatemodel`,data)
        .then(async(response) => {
           if(response.data.success){
             toast.success(response.data.response,{
                 theme:"colored"
               });
               getModelsHandler();
           }else{
             toast.error(response.data.response,{
                 theme:"colored"
               }) 
           }
        })
        .catch((error)  => {
           toast.error(error.message?error.message : "Something unexpected hapeened please try again later",{
             theme:"colored"
           }) 
        });
        onCloseUpdateModel();
    }

    const addModelHandler = async(e) => {
        e.preventDefault();
        let data = {
            "brand":selectedBrand,
            "type":deviceType,
            "modelname":e.target.modelname.value,
            ...(e.target.touch.value !== "" && {"touch":Number(e.target.touch.value)}),
            ...(e.target.battery.value !== "" && {"battery":Number(e.target.battery.value)}),
            ...(e.target.charging.value !== "" && {"charging":Number(e.target.charging.value)}),
            ...(e.target.backpanel.value !== "" && {"backpanel":Number(e.target.backpanel.value)}),
            ...(e.target.tempered.value !== "" && {"tempered":Number(e.target.tempered.value)}),
            ...(e.target.speaker.value !== "" && {"speaker":Number(e.target.speaker.value)}),
            ...(e.target.receiver.value !== "" && {"receiver":Number(e.target.receiver.value)}),
            ...(e.target.glass.value !== "" && {"glass":Number(e.target.glass.value)}),
            "modelimagelink":e.target.modelimagelink.value,
            "smallimagelink":e.target.smallimagelink.value
           }
           if(e.target.displayoled.value.length > 0){
             data["display"] = {
               "oled":Number(e.target.displayoled.value),
               "local":Number(e.target.displaylocal.value),
               "branded":Number(e.target.displaybranded.value)
             }
           }else{
            data["display"] = {
               "local":Number(e.target.displaylocal.value),
               "branded":Number(e.target.displaybranded.value)
            }
           }
           const addCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/createmodel`,data)
           .then(async(response) => {
              if(response.data.success){
                toast.success(response.data.response,{
                    theme:"colored"
                  });
                  getModelsHandler();
              }else{
                toast.error(response.data.response,{
                    theme:"colored"
                  }) 
              }
           })
           .catch((error)  => {
              toast.error(error.message?error.message : "Something unexpected hapeened please try again later",{
                theme:"colored"
              }) 
           });
           onCloseAddModel();
    }

    const deleteModelHandler = async(modelid) => {
        const data = {
            "id":modelid
        }
        const deleteCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/models/deletemodel`,data)
        .then(async(response) => {
            console.log(response);
           if(response.data.success){
             toast.success(response.data.response,{
                 theme:"colored"
               });
               getModelsHandler();
           }else{
             toast.error(response.data.response,{
                 theme:"colored"
               }) 
           }
        })
        .catch((error)  => {
            toast.error(error.message?error.message : "Something unexpected happened please try again later",{
              theme:"colored"
            }) 
         });
    }

    const getBlogsHandler = async() => {
        const blogsCall = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/getblogs`)
        .then((response) => {
           if(response.data.success){
             setBlogs(response.data.response);
           }
        }).catch((error) => {
          toast.error(error.message ? error.message : "Something went wrong",{
              theme:"colored"
            })
        })
    }

    const addBlogHandler = async(e) => {
        e.preventDefault();
        const data = {
            "title":e.target.blogtitle.value,
            "summary":e.target.blogsummary.value,
            "cover":e.target.blogcover.value,
            "content":blogContent,
            "timestamp":new Date()
        }
        const addBlogCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs/createblog`,data)
        .then((response) => {
           if(response.data.success){
            toast.success(response.data.message,{
                theme:"colored"
              });
            getBlogsHandler();
           }else{
            toast.error(response.data.message,{
                theme:"colored"
              })
           }
        })
        .catch((error) => {
            toast.error(error.message ? error.message : "Something unexpected happened please try again later",{
                theme:"colored"
              })
        });
        onCloseAddBlog();
    }

    const deleteBlogHandler = async(blogid) => {
       const data = {
          "id" : blogid
       }
       const deleteBlogCall = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs/deleteblog`,data)
       .then((response) => {
         console.log(response);
         if(response.data.response){
            toast.success(response.data.response,{
                theme:"colored"
            });
            getBlogsHandler()
         }else{
            toast.error(response.data.response,{
                theme:"colored"
              }) 
         }
       }).catch((err) => {
         toast.error(err.message?err.message : "Something unexpected hapeened please try again later",{
            theme:"colored"
          }) 
       })
    }

    const blogDetailsHandler  = (blog) => {
        setUpdateBlog(true);
        setUpdateDetails({
          id:blog._id,
          title:blog.title,
          cover:blog.cover,
          summary:blog.summary,
          content:blog.content,
          timestamp:blog.timestamp
        })
    }
    
    const updateBlogHandler  = async(e) => {
       e.preventDefault();
       const data = {
         "id":updateDetails.id,
         "title":updateDetails.title,
         "cover":updateDetails.cover,
         "summary":updateDetails.summary,
         "content":updateDetails.content,
         "timestamp":new Date()
       }
       const updateBlogCall = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/blogs/updateblog`,data)
       .then((response) => {
         if(response.data.success){
            toast.success(response.data.response,{
                theme:"colored"
              });
            getBlogsHandler();
         }else{
            toast.error(response.data.error,{
                theme:"colored"
              })
         }
       }).catch((err) => {
          toast.error(err.message ? err.message : "Something unexpected happened please try again later",{
            theme:"colored"
          })
       })
       onCloseUpdateBlog();
    }

    const getBrandsHandler = async() => {
      const brandsCall = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands/getbrands`)
      .then((response) => {
         if(response.data.success){
           setBrands(response.data.response);
         }
      }).catch((error) => {
        toast.error(error.message ? error.message : "Something went wrong",{
            theme:"colored"
          })
      })
    };

   const addBrandHandler = async(e) => {
      e.preventDefault();
      const data = {
          "name":e.target.brandname.value,
          "value":e.target.brandname.value.toLowerCase(),
          "imagelink":e.target.brandimagelink.value,
      }
      const addBrandCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/brands/createbrand`,data)
      .then((response) => {
         if(response.data.success){
          toast.success(response.data.message,{
              theme:"colored"
            });
          getBrandsHandler();
         }else{
          toast.error(response.data.message,{
              theme:"colored"
            })
         }
      })
      .catch((error) => {
          toast.error(error.message ? error.message : "Something unexpected happened please try again later",{
              theme:"colored"
            })
      });
      onCloseAddBrand();
    }
   
   const deleteBrandHandler = async(brandid) => {
    const data = {
       "id" : brandid
    }
    const deleteBrandCall = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/brands/deletebrand`,data)
    .then((response) => {
      if(response.data.response){
         toast.success(response.data.response,{
             theme:"colored"
         });
         getBrandsHandler()
      }else{
         toast.error(response.data.response,{
             theme:"colored"
           }) 
      }
    }).catch((err) => {
      toast.error(err.message?err.message : "Something unexpected happened please try again later",{
         theme:"colored"
       }) 
    })
    }

   const brandDetailsHandler  = (brand) => {
     setUpdateBrand(true);
     setUpdateDetails({
       id:brand._id,
       name:brand.name,
       value:brand.value,
       imagelink:brand.imagelink,
     })
   }

   const updateBrandHandler  = async(e) => {
    e.preventDefault();
    const data = {
      "id":updateDetails.id,
      "name":updateDetails.name,
      "value":updateDetails.name.toLowerCase(),
      "imagelink":updateDetails.imagelink,
    }
    const updateBrandCall = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/brands/updatebrand`,data)
    .then((response) => {
      if(response.data.success){
         toast.success(response.data.response,{
             theme:"colored"
           });
           getBrandsHandler();
      }else{
         toast.error(response.data.error,{
             theme:"colored"
           })
      }
    }).catch((err) => {
       toast.error(err.message ? err.message : "Something unexpected happened please try again later",{
         theme:"colored"
       })
    })
    onCloseUpdateBrand();
   }

   
   const getOffersHandler = async() => {
    const offersCall = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/offers/getoffers`)
    .then((response) => {
       if(response.data.success){
         setOffers(response.data.response);
       }
    }).catch((error) => {
      toast.error(error.message ? error.message : "Something went wrong",{
          theme:"colored"
        })
    })
  };

   const addOfferHandler = async(e) => {
    e.preventDefault();
    const data = {
        "label":e.target.label.value,
        "discountpercent":Number(e.target.discountpercent.value),
        "applicableservice":e.target.applicableservice.value,
        "infotext":e.target.infotext.value,
        "imagelink":e.target.imagelink.value,
    }
    const addOfferCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/offers/createoffer`,data)
    .then((response) => {
       if(response.data.success){
        toast.success(response.data.message,{
            theme:"colored"
          });
        getOffersHandler();
       }else{
        toast.error(response.data.message,{
            theme:"colored"
          })
       }
    })
    .catch((error) => {
        toast.error(error.message ? error.message : "Something unexpected happened please try again later",{
            theme:"colored"
          })
    });
    onCloseAddOffer();
   }

   const offerDetailsHandler  = (offer) => {
    setUpdateOffer(true);
    setUpdateDetails({
      id:offer._id,
      label:offer.label,
      discountpercent:offer.discountpercent,
      applicableservice:offer.applicableservice,
      infotext:offer.infotext,
      imagelink:offer.imagelink,
    })
  }

  const updateOfferHandler  = async(e) => {
    e.preventDefault();
    const data = {
      "id":updateDetails.id,
      "label":updateDetails.label,
      "discountpercent":Number(updateDetails.discountpercent),
      "applicableservice":updateDetails.applicableservice,
      "infotext":updateDetails.infotext,
      "imagelink":updateDetails.imagelink,
    }
    const updateOfferCall = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/offers/updateoffer`,data)
    .then((response) => {
      if(response.data.success){
         toast.success(response.data.response,{
             theme:"colored"
           });
           getOffersHandler();
      }else{
         toast.error(response.data.error,{
             theme:"colored"
           })
      }
    }).catch((err) => {
       toast.error(err.message ? err.message : "Something unexpected happened please try again later",{
         theme:"colored"
       })
    })
    onCloseUpdateOffer();
   } 
   
   const deleteOfferHandler = async(offerid) => {
    const data = {
       "id" : offerid
    }
    const deleteBrandCall = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/offers/deleteoffer`,data)
    .then((response) => {
      if(response.data.response){
         toast.success(response.data.response,{
             theme:"colored"
         });
         getOffersHandler()
      }else{
         toast.error(response.data.response,{
             theme:"colored"
        }) 
      }
    }).catch((err) => {
      toast.error(err.message?err.message : "Something unexpected happened please try again later",{
         theme:"colored"
       }) 
    })
    }

    const getUsersHandler = async() => {
        const usersCall = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/signup/getusers`)
        .then((response) => {
           if(response.data.success){
             setUsers(response.data.response);
           }
        }).catch((error) => {
          toast.error(error.message ? error.message : "Something went wrong",{
              theme:"colored"
            })
        })
    }

  return (
    <>
     <Head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"/>
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css"/>
    <link rel="stylesheet" href="./css/adminpanel.css"/>
    </Head>
    <>
    {showDashboard ? (
    <div>  
    <input type="checkbox" id="sidebar-toggle"/>
    <div class="sidebar">
        <div class="sidebar-header">
            <h3 class="brand">
                <span class="ti-unlink"></span> 
                <span>Admin</span>
            </h3> 
            <label for="sidebar-toggle" class="ti-menu-alt"></label>
        </div>
        
        <div class="sidebar-menu">
            <ul>
                <li>
                    <Link href="/">
                        <span class="ti-home"></span>
                        <span>Home</span>
                        </Link>
                </li>
                <li>
                    <a href="#">
                        <span class="ti-face-smile"></span>
                        <span onClick={() => activeTabHandler("orders")}>Orders</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="ti-agenda"></span>
                        <span onClick={() => activeTabHandler("users")}>Users</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="ti-clipboard"></span>
                        <span onClick={() => activeTabHandler("blogs")}>Blogs</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="ti-folder"></span>
                        <span onClick={() =>  activeTabHandler("models")}>Models</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="ti-folder"></span>
                        <span onClick={() => activeTabHandler("brands")}>Brands</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="ti-folder"></span>
                        <span onClick={() => activeTabHandler("offers")}>Offers</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="ti-settings"></span>
                        <span onClick={() => setShowDashboard(false)}>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="main-content">    
        <header>
            <div class="search-wrapper">
                <span class="ti-search"></span>
                <input type="search" placeholder="Search" />
            </div>
            <div class="social-icons">
                <span class="ti-bell"></span>
                <span class="ti-comment"></span>
                <div></div>
            </div>
        </header>
        <main>
        {activeTab === "offers" &&  
              <section class="recent">
                <div className="addplus-container">
                   <button onClick={() => setAddOffer(true)}>+Add Offer</button> 
                </div>
              <div class="activity-grid">
                  <div class="activity-card">
                      <h3>Added offers</h3>
                      
                      <div class="table-responsive">
                      {offers.length > 0 ? (
                           <table>
                           <thead>
                               <tr>
                                   <th>Image</th>
                                   <th>Name</th>  
                                   <th>Discount percent</th>
                                   <th>Display info text</th>
                                   <th>Applicable service</th>
                                   <th>Actions</th>
                               </tr>
                           </thead>
                           <tbody>
                            {offers.map((offer) => (
                               <tr>
                               <td>
                                <img src={offer.imagelink} class="blog-cover-show"/>
                               </td>
                               <td>{offer.label}</td>
                               <td>{offer.discountpercent}</td>
                               <td>{offer.infotext}</td>
                               <td>{offer.applicableservice}</td>
                               <td>
                                <div class="actions-container">
                                <FontAwesomeIcon className="icon" icon={faTrashCan}  size="lg" onClick={() => deleteOfferHandler(offer._id)} />
                                <FontAwesomeIcon className="icon" icon={faPenToSquare}  size="lg" onClick={() => offerDetailsHandler(offer)} />  
                                </div>
                               </td>
                           </tr>
                            ))}
                           </tbody>
                       </table>
                      ):(
                        <div className='no-orders'>Currently no offers please add</div>
                      )
                    } 
                      </div>
                  </div>
              </div>
             </section>
        }   
        {activeTab === "brands" &&  
              <section class="recent">
                <div className="addplus-container">
                   <button onClick={() => setAddBrand(true)}>+Add Brand</button> 
                </div>
              <div class="activity-grid">
                  <div class="activity-card">
                      <h3>Added brands</h3>
                      
                      <div class="table-responsive">
                      {brands.length > 0 ? (
                           <table>
                           <thead>
                               <tr>
                                   <th>Image</th>
                                   <th>Name</th>
                                   <th>Actions</th>
                               </tr>
                           </thead>
                           <tbody>
                            {brands.map((brand) => (
                               <tr>
                               <td>
                                <img src={brand.imagelink} class="blog-cover-show"/>
                               </td>
                               <td>{brand.name}</td>
                               <td>
                                <div class="actions-container">
                                <FontAwesomeIcon className="icon" icon={faTrashCan}  size="lg" onClick={() => deleteBrandHandler(brand._id)} />
                                <FontAwesomeIcon className="icon" icon={faPenToSquare}  size="lg" onClick={() => brandDetailsHandler(brand)} />  
                                </div>
                               </td>
                           </tr>
                            ))}
                           </tbody>
                       </table>
                      ):(
                        <div className='no-orders'>Currently no brands please add</div>
                      )
                    } 
                      </div>
                  </div>
              </div>
             </section>
        } 
            {activeTab === "blogs" &&  
              <section class="recent">
                <div className="addplus-container">
                   <button onClick={() => setAddBlog(true)}>+Add Blog</button> 
                </div>
              <div class="activity-grid">
                  <div class="activity-card">
                      <h3>Added blogs</h3>
                      
                      <div class="table-responsive">
                      {blogs.length > 0 ? (
                           <table>
                           <thead>
                               <tr>
                                   <th>Cover</th>
                                   <th>Title</th>
                                   <th>Summary</th>
                                   <th>Date added</th>
                                   <th>Actions</th>
                               </tr>
                           </thead>
                           <tbody>
                            {blogs.map((blog) => (
                               <tr>
                               <td>
                                <img src={blog.cover} class="blog-cover-show"/>
                               </td>
                               <td>{blog.title}</td>
                               <td class="blog-summary-show">{blog.summary}</td>
                               <td>
                              {moment(new Date(blog.timestamp)).format('MMMM Do YYYY, h:mm:ss a')}
                               </td>
                               <td>
                                <div class="actions-container">
                                <FontAwesomeIcon className="icon" icon={faTrashCan}  size="lg" onClick={() => deleteBlogHandler(blog._id)} />
                                <FontAwesomeIcon className="icon" icon={faPenToSquare}  size="lg" onClick={() => blogDetailsHandler(blog)} />  
                                </div>
                               </td>
                           </tr>
                            ))}
                           </tbody>
                       </table>
                      ):(
                        <div className='no-orders'>Currently no blogs please add</div>
                      )
                    } 
                      </div>
                  </div>
              </div>
             </section>
            } 
            {activeTab === "models" &&  
            <section class="recent">
                <div className="selection-container">
                    <h4>Please choose brand and device type : </h4>
                    <select onChange={(e) => setSelectedBrand(e.target.value)}>
                        <option value="" selected>Select brand</option>
                        {brands.map((brand) => (
                           <option key={brand._id} value={brand.value}>{brand.name}</option>
                        ))}
                    </select>
                    <select onChange={(e) => setDeviceType(e.target.value)}>
                        <option value="" selected>Select device type</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="tablet">Tablet</option>
                    </select>
                    <button onClick={getModelsHandler}>Submit</button>
                </div>
                {modelsFetched &&
                <div className="addplus-container">
                   <button onClick={() => setAddModel(true)}>+Add model</button> 
                </div>
                 }
                {modelsFetched && 
                <div class="activity-grid">
                    <div class="activity-card">
                        <h3>Models</h3>
                        <div class="table-responsive">
                            {models.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Modelname</th>
                                        <th>Brand</th>
                                        <th>Services with rates</th>
                                        <th>Type</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {models.map((model) => (
                                    <tr>
                                        <td><div><img className='order-image' src={model.smallimagelink}/></div>{model.modelname}</td>
                                        <td>{model.brand}</td>
                                        <td>
                                            {model.display.local && <span>Local Display : ₹ {model.display.local}<br/></span>}
                                            {model.display.branded && <span>Branded Display : ₹ {model.display.branded}<br/></span>}
                                            {model.display.oled && <span>OLED Display : ₹ {model.display.oled}<br/></span>}
                                            {model.touch && <span>Touch : ₹ {model.touch}<br/></span>}
                                            {model.battery && <span>Battery : ₹ {model.battery}<br/></span>}
                                            {model.receiver && <span>Reciever : ₹ {model.receiver}<br/></span>}
                                            {model.glass && <span>Glass : ₹ {model.glass}<br/></span>}
                                            {model.tempered && <span>Tempered : ₹ {model.tempered}<br/></span>}
                                            {model.charging && <span>Charging : ₹ {model.charging}<br/></span>}
                                            {model.backpanel && <span>Backpanel : ₹ {model.backpanel}<br/></span>}
                                            {model.speaker && <span>Speaker : ₹ {model.speaker}<br/></span>}
                                            </td>
                                        <td>{model.type}</td>
                                        <td>
                                           <div class="actions-container">
                                            <FontAwesomeIcon className="icon" icon={faTrashCan}  size="lg" onClick={() => deleteModelHandler(model._id)}/>
                                            <FontAwesomeIcon className="icon" icon={faPenToSquare}  size="lg" onClick={() => detailsChangeHandler(model)} />  
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            ) : (
                                <div className='no-orders'>Currently no models please add</div>
                            )}
                        </div>
                    </div>
                    
                
                </div>
                }
            </section>} 
           {activeTab === "orders" &&  
             <section class="recent">                     
                           <div class="activity-grid">
                               <div class="activity-card">
                                   <h3>Recent orders</h3>
                                   
                                   <div class="table-responsive">
                                      {orders.length ? (<table>
                                        <thead>
                                    <tr>
                                        <th>Model</th>
                                        <th>Services</th>
                                        <th>Service Type</th>
                                        <th>Total</th>
                                        <th>User Details</th>
                                        <th>Shipping Address</th>
                                        <th>Order Date</th>
                                        <th>Order Status</th>
                                        <th>Coupon applied</th>
                                        <th>Preferred service datetime</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                           <tbody>
                                    {orders.map((order) => (
                                    <tr>
                                        <td><div><img className='order-image' src={order.modelimagelink}/></div>{order.model}</td>
                                        <td>
                                          {order.display && <span>Display : ₹ {order?.display}<br/></span>}
                                          {order.battery && <span>Battery : ₹ {order?.battery}<br/></span>}
                                          {order.charging && <span>Charging : ₹ {order?.charging}<br/></span>}
                                          {order.backpanel && <span>Back Panel : {order?.backpanel}<br/></span>}
                                          {order.tempered && <span>Tempered : ₹ {order?.tempered}<br/></span>}
                                          {order.speaker && <span>Speaker : ₹ {order?.speaker}<br/></span>}
                                          {order.receiver && <span>Receiver : ₹ {order?.receiver}<br/></span>}
                                          {order.glass && <span>Glass : ₹ {order?.glass}<br/></span>}
                                          {order.touch && <span>Touch: ₹ {cartorder.touch}<br /></span>}
                                          {order.others && <span>Others : ₹ {order?.others.price}
                                            <br/> 
                                          Issues : {order?.others.issues?.map((issue) => <span>{issue.label}</span>)}
                                          <br/>
                                           Query : <span>{order?.others.query}</span>
                                          </span>}
                                          </td>
                                        <td>{order.servicetype && order.servicetype}</td>
                                        <td>₹ {order.total}</td>
                                        <td>
                                        {order.userdetails && <span>Email : {order.userdetails?.email}<br/></span>}
                                        {order.userdetails && <span>Mobile no : {order.userdetails?.mobileno}<br/></span>} 
                                        </td>
                                        <td>
                                          {<span>{order?.shippingaddress?.housenumber}<br/></span>}
                                          {<span>{order?.shippingaddress?.apartmentno}<br/></span>}
                                          {<span>{order?.shippingaddress?.town}<br/></span>}
                                          {<span>{order?.shippingaddress?.state}<br/></span>}
                                          {<span>{order?.shippingaddress?.state}<br/></span>}
                                          </td>
                                        <td>
                                           {moment(new Date(order.orderdate)).format('MMMM Do YYYY, h:mm:ss a')}
                                        </td>
                                        <td>
                                            {order.orderstatus}
                                        </td>
                                        <td onClick={() => console.log(order)}>
                                            {order.couponapplied}
                                        </td>
                                        <td>
                                           {order.servicedatetimepreffered && moment(new Date(order.servicedatetimepreffered)).format('MMMM Do YYYY, h:mm:ss a')}
                                        </td>
                                        <td>
                                            <div class="actions-container">
                                            <FontAwesomeIcon className="icon" icon={faTrashCan}  size="lg" onClick={() => deleteOrderHandler(order._id)}/>
                                            <FontAwesomeIcon className="icon" icon={faPenToSquare}  size="lg" onClick={() => orderDetailsHandler(order)}/>  
                                            </div>
                                        </td>
                                    </tr>))}
                                    
                                </tbody>
                                       </table>) :(
                                           <div className='no-orders'>Currently no order placed</div>
                                       )}
                                   </div>
                               </div>
                           </div>
             </section>
            }
           {activeTab === "users" &&
            <section class="recent">
                <div class="activity-grid">
                    <div class="activity-card">
                        <h3>Active users</h3>
                        
                        <div class="table-responsive">
                            {users.length > 0 ? (
                                <table>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Mobile no</th>
                                        <th>Fullname</th>
                                        <th>Shipping Address</th>
                                        {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                      <tr>
                                      <td>{user.username}</td>
                                      <td>{user.email}</td>
                                      <td>{user.mobileno}</td>
                                      <td>{user.firstname + " " + user.lastname}</td>
                                      <td>
                                        {user.shippingaddress}
                                      </td>
                                  </tr>
                                    ))}
                                </tbody>
                            </table>
                            ) : ( 
                                <div className='no-orders'>Currently no users registered</div>
                            )}

                        </div>
                    </div>
                    
                
                </div>
            </section>} 
        </main>
        
    </div>
    </div>
    ):(
    <div className='login-container'>
    <div className='login-form-container'>
        <h3 class="login-header">Admin Login</h3>
        <input placeholder="Username" type="username" onChange={(e) => setUsername(e.target.value)} className='login-input'/>
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} className='login-input'/>
        <button className='login-submit' onClick={() =>  submitHandler()}>Submit</button>
    </div>
    </div>)}
    </>
    <ToastContainer />
    <Modal open={showUpdateOrder} onClose={onCloseUpdateOrder} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Update order status</h2>
            <div className="orderupdate-container">
                <select value={updateDetails.orderstatus} onChange={(e) => setUpdateDetails({...updateDetails,orderstatus:e.target.value})}>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Completed">Completed</option>
                    <option value="Declined">Declined</option>
                    <option value="Inprogress">Inprogess</option>
                </select>
                <button onClick={updateOrderHandler}>Submit</button>
            </div>
         </div>  
    </Modal>
    <Modal open={addModel} onClose={onCloseAddModel} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Add model</h2>
            <div className="addmodel-container">
            <form onSubmit={addModelHandler}>
                    <input type="text" placeholder="Modelname" name="modelname" required/>
                    <input type="number" placeholder="Touch" name="touch" />
                    <input type="number" placeholder="Display Local" name="displaylocal" required/>
                    <input type="number" placeholder="Display branded" name="displaybranded" required/>
                    <input type="number" placeholder="Display OLED" name="displayoled" />
                    <input type="number" placeholder="Battery" name="battery" />
                    <input type="number" placeholder="Charging" name="charging" />
                    <input type="number" placeholder="Backpanel" name="backpanel"/>
                    <input type="number" placeholder="Tempered" name="tempered" />
                    <input type="number" placeholder="Speaker" name="speaker" />
                    <input type="number" placeholder="Receiver" name="receiver" />
                    <input type="number" placeholder="Glass" name="glass" />
                    <input type="text" placeholder="Small Image link"  name="smallimagelink" required/>
                    <input type="text" placeholder="Big Image link" name="modelimagelink" required/>
                    <button type="submit">Submit</button>
               </form>     
            </div>
         </div>  
    </Modal>
    <Modal open={updateModel} onClose={onCloseUpdateModel} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Update Model</h2>
            <div className="addmodel-container">
                    <form onSubmit={updateModelHandler}>
                    <input type="hidden" name="modelid" value={updateDetails.id}/>
                    <input placeholder="Modelname" name="modelname" value={updateDetails.modelname} c required/>
                    <input type="number" placeholder="Touch" name="touch" value={updateDetails.touch}  onChange={(e) => setUpdateDetails({...updateDetails,touch:e.target.value.length > 0 ? Number(e.target.value) : ""})} required/>
                    <input type="number" placeholder="Display Local" name="displaylocal" value={updateDetails.localdisplay}  onChange={(e) => setUpdateDetails({...updateDetails,localdisplay:e.target.value.length > 0 ? Number(e.target.value) : ""})} required/>
                    <input type="number" placeholder="Display branded" name="displaybranded" value={updateDetails.brandeddisplay}  onChange={(e) => setUpdateDetails({...updateDetails,brandeddisplay:e.target.value.length > 0 ? Number(e.target.value) : ""})} required/>
                    <input type="number" placeholder="Display OLED" name="displayoled" value={updateDetails.oleddisplay}  onChange={(e) => setUpdateDetails({...updateDetails,oleddisplay:e.target.value.length > 0 ? Number(e.target.value) : ""})}/>
                    <input type="number" placeholder="Battery" name="battery" value={updateDetails.battery}  onChange={(e) => setUpdateDetails({...updateDetails,battery:e.target.value.length > 0 ? Number(e.target.value) : ""})} />
                    <input type="number" placeholder="Charging" name="charging" value={updateDetails.charging}  onChange={(e) => setUpdateDetails({...updateDetails,charging:e.target.value.length > 0 ? Number(e.target.value) : ""})}/>
                    <input type="number" placeholder="Backpanel" name="backpanel" value={updateDetails.backpanel}  onChange={(e) => setUpdateDetails({...updateDetails,backpanel:e.target.value.length > 0 ? Number(e.target.value) : ""})} />
                    <input type="number" placeholder="Tempered" name="tempered" value={updateDetails.tempered}  onChange={(e) => setUpdateDetails({...updateDetails,tempered:e.target.value.length > 0 ? Number(e.target.value) : ""})} />
                    <input type="number" placeholder="Speaker" name="speaker" value={updateDetails.speaker}  onChange={(e) => setUpdateDetails({...updateDetails,speaker:e.target.value.length > 0 ? Number(e.target.value) : ""})} />
                    <input type="number" placeholder="Receiver" name="receiver" value={updateDetails.receiver}  onChange={(e) => setUpdateDetails({...updateDetails,receiver:e.target.value.length > 0 ? Number(e.target.value) : ""})} />
                    <input type="number" placeholder="Glass" name="glass" value={updateDetails.glass}  onChange={(e) => setUpdateDetails({...updateDetails,glass:e.target.value.length > 0 ? Number(e.target.value) : ""})} />
                    <input placeholder="Small Image link"  name="smallimagelink" value={updateDetails.smallimagelink}  onChange={(e) => setUpdateDetails({...updateDetails,smallimagelink:e.target.value})} required/>
                    <input placeholder="Big Image link" name="modelimagelink" value={updateDetails.modelimagelink}  onChange={(e) => setUpdateDetails({...updateDetails,modelimagelink:e.target.value})} required/>
                    <button type="submit">Submit</button>
                    </form>
            </div>
         </div>  
    </Modal>
    <Modal open={addBlog} onClose={onCloseAddBlog} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Add model</h2>
            <div className="addmodel-container">
               <form onSubmit={addBlogHandler} class="form-handler">
                    <input  placeholder="Blog title" name="blogtitle" required/>
                    <input  placeholder="Blog Summary" name="blogsummary" required/>
                    <input  placeholder="Blog Cover link" name="blogcover" required/>
                    <ReactQuill theme="snow" onChange={newValue => setBlogContent(newValue)}/>
                    <button type="submit">Submit</button>
               </form>     
            </div>
         </div>  
    </Modal>
    <Modal open={updateBlog} onClose={onCloseUpdateBlog} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Update Blog</h2>
            <div className="addmodel-container">
               <form onSubmit={updateBlogHandler} class="form-handler">
                    <input  placeholder="Blog title" name="blogtitle" value={updateDetails.title} onChange={(e) => setUpdateDetails({...updateDetails,title:e.target.value})}required/>
                    <input  placeholder="Blog Summary" name="blogsummary" value={updateDetails.summary} onChange={(e) => setUpdateDetails({...updateDetails,summary:e.target.value})} required/>
                    <input  placeholder="Blog Cover link" name="blogcover" value={updateDetails.cover} onChange={(e) => setUpdateDetails({...updateDetails,cover:e.target.value})} required/>
                    <ReactQuill theme="snow"  value={updateDetails.content} onChange={(newValue) => setUpdateDetails({...updateDetails,content:newValue})}/>
                    <button type="submit">Submit</button>
               </form>     
            </div>
         </div>  
    </Modal>
    <Modal open={addBrand} onClose={onCloseAddBrand} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Add Brand</h2>
            <div className="addmodel-container">
               <form onSubmit={addBrandHandler} class="form-handler">
                    <input  placeholder="Brand name" name="brandname" required/>
                    <input  placeholder="Brand image link" name="brandimagelink" required/>
                    <button type="submit">Submit</button>
               </form>     
            </div>
         </div>  
    </Modal>
    <Modal open={updateBrand} onClose={onCloseUpdateBrand} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Update Brand</h2>
            <div className="addmodel-container">
               <form onSubmit={updateBrandHandler} class="form-handler">
                     <input  placeholder="Brand name" name="brandname" value={updateDetails.name} onChange={(e) => setUpdateDetails({...updateDetails,name:e.target.value})} required/>
                     <input  placeholder="Brand image link" name="brandimagelink" value={updateDetails.imagelink} onChange={(e) => setUpdateDetails({...updateDetails,imagelink:e.target.value})} required/>
                     <button type="submit">Submit</button>
               </form>     
            </div>
         </div>  
    </Modal>
    <Modal open={addOffer} onClose={onCloseAddOffer} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Add Offer</h2>
            <div className="addmodel-container">
               <form onSubmit={addOfferHandler} class="form-handler">
                    <input  placeholder="Offer label"  name="label" required/>
                    <input   type="number" placeholder="Discount percent" name="discountpercent" required/>
                    <select name="applicableservice" required>
                       <option value="" >Select applicable service for offer</option>
                       {services.map((service) => (
                         <option value={service.label}>{service.label}</option>
                         ))}
                       </select>
                    <input  placeholder="Display text" name="infotext" required/>
                    <input  placeholder="Offer cover image link" name="imagelink" required/>
                    <button type="submit">Submit</button>
               </form>     
            </div>
         </div>  
    </Modal>
    <Modal open={updateOffer} onClose={onCloseUpdateOffer} center classNames={{modal:'customModal'}}>
         <div>
            <h2>Update Brand</h2>
            <div className="addmodel-container">
               <form onSubmit={updateOfferHandler} class="form-handler">
                     <input  placeholder="Offer label"  name="label" value={updateDetails.label} onChange={(e) => setUpdateDetails({...updateDetails,label:e.target.value})} required/>
                     <input   type="number" placeholder="Discount percent" name="discountpercent" value={updateDetails.discountpercent} onChange={(e) => setUpdateDetails({...updateDetails,discountpercent:e.target.value})} required/>
                      <select name="applicableservice" value={updateDetails.applicableservice} onChange={(e) => setUpdateDetails({...updateDetails,applicableservice:e.target.value})} required>
                       <option value="" >Select applicable service for offer</option>
                       {services.map((service) => (
                         <option value={service.label}>{service.label}</option>
                         ))}
                       </select>
                    <input  placeholder="Display text" name="infotext" value={updateDetails.infotext} onChange={(e) => setUpdateDetails({...updateDetails,infotext:e.target.value})} required/>
                    <input  placeholder="Offer cover image link" name="imagelink" value={updateDetails.imagelink} onChange={(e) => setUpdateDetails({...updateDetails,imagelink:e.target.value})} required/>
                     <button type="submit">Submit</button>
               </form>     
            </div>
         </div>  
    </Modal>
    </>
  )
}