import axios from "axios";

const url_base = process.env.REACT_APP_API_URL;


const axiosClient = axios.create({
    baseURL: url_base ,
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosClient;
