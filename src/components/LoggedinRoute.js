import { useRouter } from 'next/router';


const LoggedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    let validUser = false;
    const isLogged = document.cookie ? true : false;

    // useEffect(() => {
    //   const verifySession = async() =>  {
    //     const cookieArray = document.cookie.split(";");
    //     const tokenCookieString = cookieArray.find((cookie) => cookie.includes("token"));
    //     if(tokenCookieString){
    //       const tokenCookieArray = tokenCookieString.split("=");
    //       const token = tokenCookieArray[1]
    //       const data = {
    //         "token":token
    //       }
    //       const verifyCall = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login/verify`,data)
    //       .then((response) => {
    //            if(response.data?.valid){
    //               validUser = true;
    //            }else{
    //               validUser = false;
    //            }
    //       }).catch((error) => {
    //            validUser = false;
    //       })
    //     }else{
    //       validUser = false;
    //     }
    //   }
    //   verifySession();
    // },[])

    if(isLogged){
      router.replace('/Userpanel');
      return null;
    }else{
     return <WrappedComponent {...props} />;
    }
  };
};

export default LoggedRoute;