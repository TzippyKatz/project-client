import { foodType } from "./foodType"

export type userType = {
    id: number;
    password: string;
    role: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    favoriteFood: Array<foodType>;
    imageUrl: string;
    weight: Array<number>;
    dietId: number;
}