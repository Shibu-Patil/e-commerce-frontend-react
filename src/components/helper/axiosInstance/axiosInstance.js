import axios from "axios";

const baseURL="http://localhost:5000/api"
let AxiosInstance=axios.create({
baseURL:baseURL
})

export default AxiosInstance