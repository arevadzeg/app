import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005/api'
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    return config;
});


export default axiosInstance