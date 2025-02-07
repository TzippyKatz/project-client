import axios from "axios"
import { mealType } from "../types/mealType"

const serviceUrl = '/api/users'

export const getMeals = async () =>{
    const response = await axios.get(serviceUrl, )
    const data = response.data
    return data
}

export const getMealById = async (user: Omit<mealType, 'id'>) =>{
    const response = await axios.get(serviceUrl)
    const data = response.data
    return data
}

//אני כן מקבלת כרגע מזהה אבל אני צריכה לשנות את זה
export const addUser = async (user: Omit<mealType, 'id'>) =>{
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