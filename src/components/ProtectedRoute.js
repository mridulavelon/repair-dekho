import { useRouter } from 'next/router';


const ProtectedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    let validUser = false;
    const isLogged = document.cookie ? true : false;


    if(isLogged){
      return <WrappedComponent {...props} />;
     }else{
      router.replace('/Login');
      return null;
     }
  };
};

export default ProtectedRoute;