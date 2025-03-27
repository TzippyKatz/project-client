import { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getSession, isValidToken, removeSession } from "../auth/auth.utils"

// export const authRequestMiddleware = (request: InternalAxiosRequestConfig) => {
//     const authUser = getSession()
//     if(!authUser || isValidToken(authUser.token)){
//         removeSession()
//         // Promise.reject('Unauthorized')
//         throw new Error('Unauthorized')
//     }
//     return request
// }

export const authRequestMiddleware = (request: InternalAxiosRequestConfig) => {
    const authUser = getSession();
    
    // אם יש משתמש וגם הטוקן תקף, נוסיף את ה-Authorization header
    if (authUser && authUser.token && isValidToken(authUser.token)) {
        request.headers['Authorization'] = `Bearer ${authUser.token}`;
    }
    
    return request;
}

export const authResponseMiddlware = (response: AxiosResponse) => {
    if (response.status === 401) {
        removeSession();
        return Promise.reject('Unauthorized');
    }
    return response;
}

// טיפול בשגיאות
export const authErrorMiddleware = (error: any) => {
    if (error.response && error.response.status === 401) {
        removeSession();
    }
    return Promise.reject(error);
}
