import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005/api'
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    console.log(config.headers)
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            if (
                window.location.pathname === "/"
            ) {
            } else {
                console.log(error);
                window.location = "/";
                localStorage.clear()
            }
        }
        console.log(error);
        throw error;
    }
);


export default axiosInstance