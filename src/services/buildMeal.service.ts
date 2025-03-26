import axiosInstance, { baseUrl } from "./axios";

const buildMealServiceUrl = `${baseUrl}/BuildMeal`;

// אופטימיזציה של ארוחה
export const optimizeMeal = async (mealRequest: mealRequest) => {
    try {
        const formData = new FormData();
        formData.append("RequestedCategories", JSON.stringify(mealRequest.requestedCategories));
        // formData.append("NutritionalGoals", JSON.stringify(mealRequest.NutritionalGoals));

        const response = await axiosInstance.post(`${buildMealServiceUrl}/optimize`, formData);
        return response.data;
    } catch (error) {
        console.error("Error optimizing meal:", error);
        throw error;
    }
};

type mealRequest={
    mealId: number,
    requestedCategories: Array<string>
}
