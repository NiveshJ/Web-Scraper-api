import axios from "axios";

const axiosInstance = axios.create( {
    baseURL: "https://www.amazon.in/"
} );

export default axiosInstance;
