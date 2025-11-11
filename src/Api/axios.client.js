import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_URL;



const axiosClient = axios.create({
    baseURL: API_URL,

    headers:{
        "Content-type":"application/json",
        Accept: "application/json"
    },
    withCredentials: false

})

axiosClient.interceptors.request.use(async (config) => {

    if (config.url.includes("/auth/verify-signature")) {
        console.log("Verifying signature before displaying the form...")
    }
    return config;

})

export default axiosClient;
