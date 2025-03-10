import { foodType } from "./food.type";

export type mealType = {
    id: number;
    calories: number;
    carbohydrates: number;
    proteins: number;
    cholesterol: number;
    sugars: number;
    sodium: number;
    foods: Array<foodType>;
    typeMealId: number;
}