import axios from "axios";
import { authRequestMiddleware, authResponseMiddlware, authErrorMiddleware } from './authMiddleWare'

const url = 'https://localhost:7280'

const axiosInstance = axios.create({ baseURL: url })

axiosInstance.interceptors.request.use(authRequestMiddleware)

axiosInstance.interceptors.response.use(authResponseMiddlware, authErrorMiddleware)

export default axiosInstance