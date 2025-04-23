import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",
    withCredentials: true,
    timeout: 5000, // Add a timeout
    headers: {
        "Content-Type": "application/json",
    },
});
