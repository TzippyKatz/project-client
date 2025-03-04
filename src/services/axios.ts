import axios, { AxiosRequestConfig } from 'axios'

const baseUrl = 'https://localhost:7280/api'

const axiosInstance = axios.create({ baseURL: baseUrl })

const token = 'aXXXXXXa'

axios.defaults.headers.common.Authorization = `Bearer ${token}`

axiosInstance.interceptors.request.use((request) => {
    if(false){
        throw new Error('unathrized')
    }
    return request
})

// axiosInstance.interceptors.request.use((response) => {
//     if(response.status === 401){
//         throw new Error('unathrized')
//     }
//     return response
// })

export default axiosInstance