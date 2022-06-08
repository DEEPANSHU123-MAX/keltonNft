import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';



// let decodedToken :any = jwtDecode(accessToken);
// console.log("Decoded Token", decodedToken);
// let currentDate = new Date();

// // JWT exp is in seconds
// if (decodedToken.exp * 1000 < currentDate.getTime()) {
//   accessToken = await refresh(refreshToken);

//   return accessToken;

const navigate = useNavigate();



const baseURL=`https://38bc-103-93-251-39.ngrok.io`

const AxiosInstance = axios.create({
  baseURL,
  
});

const refresh = async (refreshToken: any) => {
  console.log(refreshToken , "refresh..................");

   axios.post(`${baseURL}/token/generate`, { token: refreshToken })
          .then(response => {
            console.log(response , "resssssssssssssssssss")
              if (!response.data) {
                return false;
                  
                 
              } else {
                  const { accessToken } = response.data;
                  Cookies.set("access", accessToken);
                 
                  return accessToken;
              }
          });
 
    
  };



const hasAccess = async (accessToken : any, refreshToken : any) => {
  if (!refreshToken) return null;

  // console.log(accessToken ,"access")

  console.log("inside if");

  if (!accessToken) {

    console.log("inside if");
      // generate new accessToken
      accessToken = await refresh(refreshToken);
      
      return accessToken;
  }

  return accessToken;
};





 AxiosInstance.interceptors.request.use( async (config : any) => {


  
  let accessToken = Cookies.get("access");
  let refreshToken = Cookies.get("refresh");
 


  const accessTokenvalue = await hasAccess(accessToken, refreshToken);


  

  if (!accessTokenvalue) return config;


  

  config.headers.Authorization =  accessTokenvalue ? `Bearer ${accessTokenvalue}` : '';
  return config;





 
  
},
error => {
  Promise.reject(error)
}
)



AxiosInstance.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === 401) {
    console.log("please login again");
    navigate('/')
    
  }
});


export default AxiosInstance;

