import { foodType } from "./food.type"

export type userType = {
    id: number;
    password: string;
    role: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    file: File | null;
    favoriteFood: Array<foodType>;
    weight: Array<Number>;
    dietId: number;
}

export type loginUserType = {
    email: string;
    password: string;
}