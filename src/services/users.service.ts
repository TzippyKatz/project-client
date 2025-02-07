import axios from "axios"
import { userType } from "../types/userType"

const serviceUrl = '/api/users'

export const getUsers = async () =>{
    const response = await axios.get(serviceUrl, )
    const data = response.data
    return data
}

export const getUserById = async (user: Omit<userType, 'id'>) =>{
    const response = await axios.get(serviceUrl)
    const data = response.data
    return data
}

//אני כן מקבלת כרגע מזהה אבל אני צריכה לשנות את זה
export const addUser = async (user: Omit<userType, 'id'>) =>{
    const response = await axios.post(serviceUrl)
    const data = response.data
    return data
}

export const deleteUser = async (id: number) =>{
    const response = await axios.delete(`${serviceUrl}/${id}`)
    const data = response.data
    return data
}

export const updateUser = async (user: userType) =>{
    const response = await axios.put(`${serviceUrl}/${user.id}`)
    const data = response.data
    return data
}