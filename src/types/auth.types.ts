import { userType } from "./user.type";

export type AuthUser = {
    mail: string,
    token: string
}

export interface AuthState {
    isAuthenticated: boolean; // תיקון שגיאת הכתיב
    isInitialized: boolean;
    user: userType | null; // שימוש בטיפוס המדויק
}