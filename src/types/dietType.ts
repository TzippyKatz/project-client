import { mealType } from "./mealType";

export type dietType = {
    id: number
    DietitianId: number
    descGoal: string
    meals: Array<mealType>
    rate: number
}