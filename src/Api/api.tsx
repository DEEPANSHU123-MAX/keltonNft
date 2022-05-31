import axios from 'axios';
import Cookies from "js-cookie";


const baseURL=`https://e24e-103-93-251-38.ngrok.io`

const AxiosInstance = axios.create({
  baseURL,
  
});




const refresh = async (refreshToken: any) => {
  console.log(refreshToken);

   axios.post(`${baseURL}/generateToken`, { token: refreshToken })
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

  if (!accessToken) {
      // generate new accessToken
      accessToken = await refresh(refreshToken);
      console.log(accessToken,"accesssssssss")
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


export default AxiosInstance;

