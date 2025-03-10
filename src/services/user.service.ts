import axios from "../utils/axios" 
import { userType } from "../types/user.type"
import { baseUrl } from "./axios"

const serviceUrl = `${baseUrl}/User`

export const getUsers = async () =>{
    const response = await axios.get(serviceUrl)
    const data = await response.data
    return data
}

export const getUsersById = async (user: Omit<userType, 'id'>) =>{
    const response = await axios.get(serviceUrl)
    const data = await response.data
    return data
}

//אני כן מקבלת כרגע מזהה אבל אני צריכה לשנות את זה
// export const addUser = async (user: Omit<userType, 'id'>) =>{
//     const response = await axios.post(serviceUrl, user)
//     const data = response.data
//     return data
// }

export const addUser = async (user: Omit<userType, 'id'>) => {
    const params = new URLSearchParams();
  
    // הוספת כל הערכים שנמצאים בתוך המשתמש ל-params
    Object.keys(user).forEach((key) => {
      // TypeScript expects the key to be a keyof Omit<userType, 'id'>
      const typedKey = key as keyof Omit<userType, 'id'>;
      
      if (Array.isArray(user[typedKey])) {
        // אם הערך הוא מערך, הופכים אותו למספרים מופרדים בפסיק
        params.append(typedKey, (user[typedKey] as Array<any>).join(','));
      } else {
        params.append(typedKey, user[typedKey] as string);
      }
    });
  
    // שליחה של הבקשה עם ה-params
    const response = await axios.post("/User", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  
    const data = response.data;
    return data;
  };
  

export const deleteUser = async (id: number) =>{
    const response = await axios.delete(`${serviceUrl}/${id}`)
    const data = response.data
    return data
}

export const updateUser = async (user: userType) =>{
    const response = await axios.put(`${serviceUrl}/${user.id}`, user)
    const data = response.data
    return data
}