import axios, { AxiosRequestConfig } from 'axios'

export const baseUrl = 'https://localhost:7280/api'


export const axiosInstance = axios.create({ baseURL: baseUrl })

const token = 'aXXXXXXa'

axios.defaults.headers.common.Authorization = `Bearer ${token}`;


axiosInstance.interceptors.request.use((request) => {
    if(false){
        throw new Error('unathrized')
    }
    return request
})

axiosInstance.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 401) {
            throw new Error('unauthorized');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance