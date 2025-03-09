import axios from "axios"
import {loginUserType} from "../types/user.type"
import { baseUrl } from "./axios"

const serviceUrl = `${ baseUrl }/UserLogin`

export const loginUser = async (loginUser: loginUserType) => {
    const response = await axios.post(serviceUrl, null, {
        params: {
            userEmail: loginUser.email,
            password: loginUser.password
        }
    });
    const data = response.data
    return data
}