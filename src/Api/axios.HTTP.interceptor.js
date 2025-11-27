import axios from "axios";


const apiJava = axios.create({
    baseURL: process.env.REACT_APP_JAVA_URL,
});

apiJava.interceptors.response.use(
    (config) => {
        const jsrfToken = document.querySelector("#root").dataset.csrfToken;
        config.headers["X-CSRFToken"] = jsrfToken;
        return config;
    });

export default apiJava;