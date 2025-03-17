import axios from "axios"
import {loginUserType} from "../types/user.type"
import { baseUrl } from "./axios"
import { setSession } from "../auth/auth.utils"

const serviceUrl = `${ baseUrl }/UserLogin`

export const loginUser = async (loginUser: loginUserType) => {
    const response = await axios.post(serviceUrl, null, {
        params: {
            userEmail: loginUser.email,
            password: loginUser.password
        }
    });
    const data = response.data

    if (data.token && loginUser.email) {
        setSession({ mail:loginUser.email, token: data.token }); 
    }

    return data
}