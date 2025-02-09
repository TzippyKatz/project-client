import axios from "axios"
import { mealType } from "../types/meal.type"

const serviceUrl = '/api/Meal'

export const getMeals = async () =>{
    const response = await axios.get(serviceUrl, )
    const data = response.data
    return data
}

export const getMealById = async (meal: Omit<mealType, 'id'>) =>{
    const response = await axios.get(serviceUrl)
    const data = response.data
    return data
}

//אני כן מקבלת כרגע מזהה אבל אני צריכה לשנות את זה
export const addMeal = async (meal: Omit<mealType, 'id'>) =>{
    const response = await axios.post(serviceUrl)
    const data = response.data
    return data
}

export const deleteMeal = async (id: number) =>{
    const response = await axios.delete(`${serviceUrl}/${id}`)
    const data = response.data
    return data
}

export const updateMeal = async (meal: mealType) =>{
    const response = await axios.put(`${serviceUrl}/${meal.id}`)
    const data = response.data
    return data
}