import axios from "axios";
import { foodType } from "../types/food.type"
import { baseUrl } from "./axios";

const serviceUrl = `${ baseUrl }/Food`;

export const getFoods = async () =>{
    try {
        const response = await axios.get(serviceUrl)
        const data = response.data
        return data
    } catch (error) {
        console.error('Error fetching foods:', error)
        throw error
    }
}

export const getFoodById = async (id: number) => {
    const response = await axios.get(`${serviceUrl}/${id}`)
    const data = response.data
    return data
}

//By GPT
export const addFood = async (food: Omit<foodType, 'id'>) => {
    const response = await axios.post(serviceUrl, food)
    const data = response.data
    return data
}

export const deleteFood = async (id: number) =>{
    const response = await axios.delete(`${serviceUrl}/${id}`)
    const data = response.data
    return data
}

export const updateFood = async (food: foodType) => {
    const response = await axios.put(`${serviceUrl}/${food.id}`, food)
    const data = response.data
    return data
}