import "@/styles/globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useEffect,useState } from "react";
import { Provider } from "react-redux";
import { store } from "store";
import {persistor} from "store";
import { AuthProvider } from "@/context/auth-context";
import { RequireAuth } from "@/context/RequireAuth";
import { PersistGate } from "redux-persist/integration/react";
import Chatbox from "@/components/Chatbox";
import { Modal } from 'react-responsive-modal';
import { useRouter } from 'next/router';
import 'react-responsive-modal/styles.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const[locationSelected,setLocationSelected] = useState(false);
  const[locations,setLocations] = useState([
    {
      id:1,
      img:"./images/states/delhi.jpg",
      location:"Delhi"
    },
    {
      id:2,
      img:"./images/states/noida.jpg",
      location:"Noida"
    },
    {
      id:3,
      img:"./images/states/gr-noida.jpg",
      location:"Greater Noida"
    },
    {
      id:4,
      img:"./images/states/Ghaziabad.jpg",
      location:"Ghaziabad"
    },
    {
      id:5,
      img:"./images/states/gurgaon.jpg",
      location:"Gurgaon"
    }
  ])

  useEffect(() => {
     const locationChosen = getLocation();
     if(!locationChosen){
      setLocationSelected(true);
     }
    //  console.log(router.pathname)
  },[])

  const onCloseLocation = () => setLocationSelected(false);

  const getLocation = () => {
    const location = localStorage.getItem("selectedlocation");
    return location;
  }

  const selectLocation  = (location) => {
    localStorage.setItem("selectedlocation", `${location}`);
    setLocationSelected(false)
  }
  return  (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
  <AuthProvider>
  <RequireAuth>
  <Component {...pageProps} />
  <Chatbox/>
  </RequireAuth>
  </AuthProvider>
     </PersistGate>
     <Modal open={locationSelected} onClose={onCloseLocation} center classNames={{modal:'locationModal'}}>
           <h3 className="locationpopup-header">Please select your location</h3>
           <div className="locationpopup-container">
           {locations.map((location) => (
               <div className="locationpopup-selectbox" key={location.id} onClick={() => selectLocation(location.location)}>
               <img src={location.img} className="locationpoup-boximg"/>
               <span>{location.location}</span>
            </div>
           ))}
         </div>  
    </Modal>
  </Provider>
  )
}
