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
    // try {
    //     const response = await axios.post(serviceUrl, {
    //         userEmail: loginUser.email,
    //         password: loginUser.password
    //     });
        
    //     console.log("Login success:", response.data); // הדפסת תגובת השרת
    //     return response.data;
    // } catch (error: any) {
    //     console.error("Login failed:", error.response?.data || error.message); // הדפסת שגיאת השרת
    //     throw error;
    // }

    
    const data = response.data
    console.log("data" + data)
    console.log("loginUser.email" + loginUser.email)

    if (data && loginUser.email){
        setSession({ email: loginUser.email, token: data,  })
    }

    return data
}