import axios from "axios";
import { json } from "stream/consumers";
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

export const addFood = async (food: Omit<foodType, 'id' | 'fileImage'>) => {
    const formDataToSend = new FormData();

    formDataToSend.append("name", food.name);
    formDataToSend.append("calories", String(food.calories));
    formDataToSend.append("carbohydrates", String(food.carbohydrates));
    formDataToSend.append("proteins", String(food.proteins));
    formDataToSend.append("cholesterol", String(food.cholesterol));
    formDataToSend.append("sugars", String(food.sugars));
    formDataToSend.append("sodium", String(food.sodium));
    if (food.imageFile) {
        formDataToSend.append("imageFile", food.imageFile);
    }
    formDataToSend.append("pmd", String(food.pmd));
    formDataToSend.append("category", String(food.category));

    console.log("food in service: "+ JSON.stringify(formDataToSend))

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