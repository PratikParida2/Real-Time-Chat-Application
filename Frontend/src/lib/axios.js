import axios from'axios'
const baseURL = import.meta.env.MODE === "development" ? "http://localhost:8050/api" : "/api"

const axiosInstance=axios.create({
    baseURL:baseURL,
    withCredentials:true
})
export default axiosInstance