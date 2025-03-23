import { emailType } from '../types/email.type'
import axiosInstance from '../utils/axios';
import { baseUrl } from './axios'

const serviceUrl = `${baseUrl}/Mail`


export const sendEmail = async (email: emailType) => {
    const response = await axiosInstance.post(`${serviceUrl}/send`, email, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = response.data
    console.log("הטופס נשלח")
    return data
}