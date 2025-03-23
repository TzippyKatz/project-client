import axios, { AxiosResponse } from "axios";//
import axiosInstance from "./axios";//
import { dietType } from "../types/diet.type"
import { baseUrl } from "./axios"

const serviceUrl = `${baseUrl}/Diet`

export const getDiet = async () => {
    const response = await axios.get(serviceUrl)
    const data = await response.data
    return data
}

export const getDietById = async (diet: Omit<dietType, 'id'>) => {
    // export const getDietById = async (diet: dietType) =>{
    const response = await axios.get(serviceUrl)
    const data = await response.data
    return data
}

export const addDiet = async (diet: Omit<dietType, 'id'>) => {
    //כיוון שהטוקן שמור כמחזרוזת של אוביקט - מייל וטוקן השליפה היא כך
    const userData = localStorage.getItem("user")
    const user = userData ? JSON.parse(userData) : null;
    const token = user?.token || null;
    const formData = new FormData();

    formData.append("DietitianId", String(diet.DietitianId));
    formData.append("Meals", JSON.stringify(diet.meals));  // אם זה מערך, צריך JSON
    formData.append("DescGoal", diet.descGoal);
    formData.append("Rate", String(diet.rate));
    formData.append("ageMinimum", String(diet.ageMinimum));
    formData.append("ageMaximum", String(diet.ageMaximum));

    const response = await axiosInstance.post(serviceUrl, formData, {
        headers: {
            Authorization: `Bearer ${token}` // הוספת הטוקן לכותרת
        }
    })
    const data = response.data
    return data
}

export const deleteDiet = async (id: number) => {
    const response = await axios.delete(`${serviceUrl}/${id}`)
    const data = response.data
    return data
}

export const updateDiet = async (diet: dietType) => {
    const response = await axios.put(`${serviceUrl}/${diet.id}`, diet)
    const data = response.data
    return data
}

export const getDietByDietitianId = async (dietitianId: number) => {
    const response = await axios.get((`${serviceUrl}/DietitianId/${dietitianId}`))
    const data = await response.data
    return data
}

export const getDietByGoal = async (goal:string) => {
    const response = await axios.get(`${serviceUrl}/goal/${goal}`)
    const data = await response.data
    return data
}

export const getDietByAge = async (age:number) => {
    const response = await axios.get(`${serviceUrl}/age/${age}`)
    const data = await response.data
    return data
}