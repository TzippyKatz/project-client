import { type } from "os";
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
    // favoriteFood: Array<foodType>;
    // imageUrl: string;
    // weight: Array<number>;
    // dietId: number;
}


export type AuthUser = {
    user: userType,
    token: string
}

export type loginUserType = {
    email: string;
    password: string;
}