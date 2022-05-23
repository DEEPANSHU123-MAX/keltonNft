import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: `https://980e-1-6-151-77.ngrok.io/`,
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

