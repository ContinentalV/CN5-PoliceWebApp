import axios from "axios"
const axiosInstance = axios.create({
    baseURL: "https://www.vibrant-darwin.37-60-246-29.plesk.page",
    headers: {
        post: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "https://www.policeapp.vibrant-darwin.37-60-246-29.plesk.page",
            "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
        }
    }
});

export default axiosInstance;