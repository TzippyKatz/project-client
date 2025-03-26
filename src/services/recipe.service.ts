import axiosInstance, { baseUrl } from "./axios";

const serviceUrl = `${baseUrl}/Recipe`;

// חיפוש מתכונים לפי מזהה ארוחה
export const searchRecipes = async (mealId:number) => {
    try {
        const response = await axiosInstance.get(`${serviceUrl}/search/${mealId}`);
        return response.data;
    } catch (error) {
        console.error("Error searching recipes:", error);
        throw error;
    }
};

// קבלת כתובת URL של מתכון לפי מזהה
export const getRecipeUrl = async (recipeId:number) => {
    try {
        const response = await axiosInstance.get(`${serviceUrl}/recipe/${recipeId}`);
        return response.data.RecipeUrl;
    } catch (error) {
        console.error("Error getting recipe URL:", error);
        throw error;
    }
};
