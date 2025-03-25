import axios from "../utils/axios"
import { userType } from "../types/user.type"
import axiosInstance, { baseUrl } from "./axios"

const serviceUrl = `${baseUrl}/User`

export const getUsers = async () => {
  const userData = localStorage.getItem("user")
  const user = userData ? JSON.parse(userData) : null;
  const token = user?.token || null;
  console.log("token: " + token)
  const response = await axios.get(serviceUrl, {
    headers: {
      Authorization: `Bearer ${token}` // הוספת הטוקן לכותרת
    }
  })
  const data = await response.data
  return data
}

export const getUserById = async (id: number) => {
  const response = await axios.get(`${serviceUrl}/${id}`)
  const data = await response.data
  return data
}

export const getUserByEmail = async (email: string) => {
  const response = await axios.get(`${serviceUrl}/${email}`)
  const data = await response.data
  return data
}

export const addUser = async (user: Omit<userType, 'id'>) => {
  console.log("Sending request to:", serviceUrl);
  const formData = new FormData();

  formData.append('Password', user.password);
  formData.append('Role', user.role);
  formData.append('UserName', user.userName);
  formData.append('FirstName', user.firstName);
  formData.append('LastName', user.lastName);
  formData.append('Image', user.image);
  formData.append('Email', user.email);
  formData.append('Phone', user.phone);
  // שליחת משקלים כמחרוזת JSON
  formData.append('Weight', user.weight as any);

  // שליחת מאכלים אהובים כמחרוזת JSON
  formData.append('FavoriteFood', JSON.stringify(user.favoriteFood));

  // שליחת הקובץ
  if (user.file) {
    formData.append('file', user.file);
  }

  console.log("FormData Sent:", Object.fromEntries(formData.entries()));

  const response = await axiosInstance.post(
    serviceUrl,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  );

  const data = response.data;
  return data;

};

export const deleteUser = async (id: number) => {
  const response = await axios.delete(`${serviceUrl}/${id}`)
  const data = response.data
  return data
}

export const updateUser = async (user: userType) => {
  const userId = user.id
  const { id, ...userData } = user; // מסירים את ה-ID
  const formData = new FormData();

  formData.append('Password', user.password);
  formData.append('Role', user.role);
  formData.append('UserName', user.userName);
  formData.append('FirstName', user.firstName);
  formData.append('LastName', user.lastName);
  formData.append('Image', user.image);
  formData.append('Email', user.email);
  formData.append('Phone', user.phone);

  if (user.weight && user.weight.length > 0) {
    formData.append('Weight', user.weight as any);
    console.log("weight: " + user.weight)
  } else {
    formData.append('Weight', [-1.0] as any); // ערך ברירת מחדל
  }
  // שליחת מאכלים אהובים כמחרוזת JSON
  formData.append('FavoriteFood', JSON.stringify(user.favoriteFood));

  // שליחת הקובץ
  if (user.file) {
    formData.append('file', user.file);
  }
  const response = await axios.put(`${serviceUrl}/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // חשוב כדי לשלוח קובץ
    },
  });

  const data = response.data
  return data
}