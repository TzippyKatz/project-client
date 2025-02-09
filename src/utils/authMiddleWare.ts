import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { request } from "https";
import { getSession, isValidToken, removeSession } from "../auth/auth.utils"

export const aurhRequestMiddleware = (request: InternalAxiosRequestConfig) => {
    const authUser = getSession()
    if(!authUser || isValidToken(authUser.token)){
        removeSession()
        Promise.reject('Unauthorized')
    }
    return request
}

export const authResponseMiddleware = (response: AxiosResponse) => {
    if(response.status === 401)
    {
        removeSession()
        Promise.reject('Unauthorized')
    }
    return response
}