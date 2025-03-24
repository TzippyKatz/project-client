import { mealType } from "./meal.type";

export type dietType = {
    id: number
    dietitianId: number
    descGoal: string
    meals: Array<mealType>
    rate: number
    ageMinimum: number,
    ageMaximum: number
}