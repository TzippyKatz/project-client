import axios from "axios"
import { foodType } from "../types/food.type"

const serviceUrl = '/api/Food'

export const getFoods = async () =>{
    const response = await axios.get(serviceUrl, )
    const data = response.data
    return data
}

export const getFoodById = async (food: Omit<foodType, 'id'>) =>{
    const response = await axios.get(serviceUrl)
    const data = response.data
    return data
}

//אני כן מקבלת כרגע מזהה אבל אני צריכה לשנות את זה
export const addFood = async (food: Omit<foodType, 'id'>) =>{
    const response = await axios.post(serviceUrl)
    const data = response.data
    return data
}

export const deleteFood = async (id: number) =>{
    const response = await axios.delete(`${serviceUrl}/${id}`)
    const data = response.data
    return data
}

export const updateFood = async (food: foodType) =>{
    const response = await axios.put(`${serviceUrl}/${food.id}`)
    const data = response.data
    return data
}