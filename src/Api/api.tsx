import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: `https://52a6-103-159-44-158.ngrok.io`,
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

