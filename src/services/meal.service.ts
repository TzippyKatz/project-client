import axios from "axios"
import { mealType } from "../types/meal.type"
import axiosInstance, { baseUrl } from "./axios"

const serviceUrl = `${baseUrl}/Meal`

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
    const formData = new FormData()
    formData.append("calories", String(meal.calories))
    formData.append("carbohydrates", String(meal.carbohydrates))
    formData.append("proteins", String(meal.proteins))
    formData.append("cholesterol", String(meal.cholesterol))
    formData.append("sugars", String(meal.sugars))
    formData.append("sodium", String(meal.sodium))
    formData.append("foods", JSON.stringify(meal.foods))
    formData.append("typeMealId", String(meal.typeMealId))

    const response = await axiosInstance.post(serviceUrl, formData)
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