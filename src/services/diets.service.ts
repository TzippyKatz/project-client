import axios from "axios"
import { dietType } from "../types/diet.type"

const serviceUrl = '/api/Diet'

export const getDiet = async () =>{
    const response = await axios.get(serviceUrl)
    const data = await response.data
    return data
}

export const getDietById = async (diet: Omit<dietType, 'id'>) =>{
    const response = await axios.get(serviceUrl)
    const data = await response.data
    return data
}

//אני כן מקבלת כרגע מזהה אבל אני צריכה לשנות את זה
export const addTypeMeal = async (diet: Omit<dietType, 'id'>) =>{
    const response = await axios.post(serviceUrl, diet)
    const data = response.data
    return data
}

export const deleteTypeMeal = async (id: number) =>{
    const response = await axios.delete(`${serviceUrl}/${id}`)
    const data = response.data
    return data
}

export const updateTypeMeal = async (diet: dietType) =>{
    const response = await axios.put(`${serviceUrl}/${diet.id}`, diet)
    const data = response.data
    return data
}