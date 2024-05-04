import axios from "axios";
import cookieUtils from "./cookieUtils";
import { useCookies } from "react-cookie";

const api = axios.create({
    baseURL: "http://localhost:3001"
});


export default api;




