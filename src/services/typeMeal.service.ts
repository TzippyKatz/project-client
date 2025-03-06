import axios from "axios"
import { typeMealType } from "../types/typeMeal.type"
import { baseUrl } from "./axios"

const serviceUrl = `${baseUrl}/TypeMeal`

export const getTypeMeal = async () =>{
    const response = await axios.get(serviceUrl)
    const data = await response.data
    return data
}

export const getTypeMealById = async (typeMeal: Omit<typeMealType, 'id'>) =>{
    const response = await axios.get(serviceUrl)
    const data = await response.data
    return data
}

//אני כן מקבלת כרגע מזהה אבל אני צריכה לשנות את זה
export const addTypeMeal = async (typeMeal: Omit<typeMealType, 'id'>) =>{
    const response = await axios.post(serviceUrl, typeMeal)
    const data = response.data
    return data
}

export const deleteTypeMeal = async (id: number) =>{
    const response = await axios.delete(`${serviceUrl}/${id}`);
    const data = response.data
    return data
}

export const updateTypeMeal = async (typeMeal: typeMealType) =>{
    const response = await axios.put(`${serviceUrl}/${typeMeal.id}`, typeMeal);
    const data = response.data
    return data
}