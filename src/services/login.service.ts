import axios from "axios"
import { loginUserType } from "../types/user.type"
import { baseUrl } from "./axios"
import { getSession, removeSession, setSession } from "../auth/auth.utils"

const serviceUrl = `${baseUrl}/UserLogin`

export const loginUser = async (loginUser: loginUserType) => {
    const response = await axios.post(serviceUrl, null, {
        params: {
            userEmail: loginUser.email,
            password: loginUser.password
        }
    });
    const data = response.data
    
    console.log("data.token" + data.token)
    console.log("data" + data)
    console.log("loginUser.email" + loginUser.email)

    if (data && loginUser.email){
        setSession({ mail: loginUser.email, token: data })
    }

    return data
}