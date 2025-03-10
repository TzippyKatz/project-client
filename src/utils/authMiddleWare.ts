import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, isValidToken, removeSession } from "../auth/auth.utils"

export const authRequestMiddleware = (request: InternalAxiosRequestConfig) => {
    const authUser = getSession()
    if(!authUser || isValidToken(authUser.token)){
        removeSession()
        // Promise.reject('Unauthorized')
        throw new Error('Unauthorized')
    }
    return request
}

export const authResponseMiddlware = (response: AxiosResponse) => {
    if(response.status === 401)
    {
        removeSession()
        Promise.reject('Unauthorized')
    }
    return response
}