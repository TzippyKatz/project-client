import axios from "../utils/axios" 
import { userType } from "../types/user.type"
import axiosInstance, { baseUrl } from "./axios"

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
//     const response = await axios.post(serviceUrl, null, {
//       params: {
//         password: user.password,
//         role: user.role,
//         userName: user.userName,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phone
//       }
//     })
//     const data = response.data
//     return data
// }

// export const addUser = async (user: Omit<userType, 'id'>) => {  
//   console.log("Sending request to:", serviceUrl);
//   const formData = new FormData();
//   formData.append('password', user.password);
//   formData.append('role', user.role);
//   formData.append('userName', user.userName);
//   formData.append('firstName', user.firstName);
//   formData.append('lastName', user.lastName);
//   formData.append('email', user.email);
//   formData.append('phone', user.phone);

// user.weight.forEach((w) => {
//     formData.append("Weight[]", w.toString()); // הוסף סוגריים מרובעים כך שהשרת יזהה כ-array
// });

// user.favoriteFood.forEach((food, index) => {
//     formData.append(`FavoriteFood[${index}].Id`, food.id.toString());
//     formData.append(`FavoriteFood[${index}].Name`, food.name);
// });

// //   formData.append('favoriteFood', JSON.stringify(user.favoriteFood));  // אם זה מערך, צריך JSON

//   const response = await axiosInstance.post(serviceUrl, formData)
// //   , {
// //       headers: {
// //           'Content-Type': 'multipart/form-data',
// //       }
// //   });
//   const data = response.data;
//   return data;
// }

export const addUser = async (user: Omit<userType, 'id'>) => {  
    console.log("Sending request to:", serviceUrl);
    const formData = new FormData();
  
    formData.append('password', user.password);
    formData.append('role', user.role);
    formData.append('userName', user.userName);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    
  // נסה את הפורמט הזה עבור משקלים
  formData.append('Weight.0', user.weight[0].toString());
  if (user.weight.length > 1) {
    for (let i = 1; i < user.weight.length; i++) {
      formData.append(`Weight.${i}`, user.weight[i].toString());
    }
  }
  
  // עבור מאכלים מועדפים
  if (user.favoriteFood.length > 0) {
    formData.append('FavoriteFood.0.Id', user.favoriteFood[0].id.toString());
    formData.append('FavoriteFood.0.Name', user.favoriteFood[0].name);
    
    for (let i = 1; i < user.favoriteFood.length; i++) {
      formData.append(`FavoriteFood.${i}.Id`, user.favoriteFood[i].id.toString());
      formData.append(`FavoriteFood.${i}.Name`, user.favoriteFood[i].name);
    }
  }
  
  // שליחת קובץ - לא כמחרוזת אלא כאובייקט File אמיתי
  if (user.file && user.file instanceof File) {
    formData.append('File', user.file);
  }
  const response = await axiosInstance.post(
    serviceUrl, 
    formData,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  const data = response.data;
  return data;
  };
  

// export const addUser = async (user: Omit<userType, 'id'>) => {
//   const formData = new FormData(); // השתמש ב-FormData להעלאת קבצים

//   // הוספת כל הערכים שנמצאים בתוך המשתמש ל-formData
//   Object.keys(user).forEach((key) => {
//       const typedKey = key as keyof Omit<userType, 'id'>;

//       const value = user[typedKey];

//       if (Array.isArray(value)) {
//           // אם הערך הוא מערך, הופכים אותו למספרים מופרדים בפסיק
//           formData.append(typedKey, value.join(','));
//       } else if (typeof value === 'string') {
//           // אם הערך הוא מחרוזת, פשוט מוסיפים אותו ככה
//           formData.append(typedKey, value);
//       } else if (value && value instanceof File) {
//         // אם הערך הוא קובץ (כמו תמונה), מוסיפים אותו
//         formData.append(typedKey, value as File);

//       } else {
//           // טפל במקרים אחרים אם יש
//           console.warn(`Unexpected type for ${typedKey}: ${typeof value}`);
//       }
//   });

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