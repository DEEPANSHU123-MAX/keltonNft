import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: `https://9f0c-103-93-251-38.ngrok.io`,
});

 AxiosInstance.interceptors.request.use( (config : any) => {
  // Do something before request is sent
  let token = localStorage.getItem("token");
  config.headers.Authorization =  token ? `Bearer ${token}` : '';
  return config;
  
},
error => {
  Promise.reject(error)
}
)


export default AxiosInstance;

