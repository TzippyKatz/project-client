import axiosInstance, { baseUrl } from "./axios";

const buildMealServiceUrl = `${baseUrl}/BuildMeal`;

// אופטימיזציה של ארוחה
export const optimizeMeal = async (mealRequest: mealRequest) => {
    try {
        const formData = new FormData();
        formData.append("MealId", mealRequest.mealId.toString())
        mealRequest.requestedCategories.forEach((category) => {
            formData.append("RequestedCategories", category);
        });
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
