import axios from "axios";

// SET YOUR BACKEND URL
const BASE_URL = "http://localhost:5000/api";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default axiosInstance;
