import { AuthUser } from "./auth.types";
import { foodType } from "./food.type"

export type userType = {
    id: number;
    password: string;
    role: string;
    userName: string;
    firstName: string;
    lastName: string;
    ////
    image: string;
    email: string;
    phone: string;
    file: File | null;
    favoriteFood: Array<foodType>;
    weight: string;
    dietId: number;
}

export type loginUserType = {
    email: string;
    password: string;
}

export type FullUser = AuthUser & userType;