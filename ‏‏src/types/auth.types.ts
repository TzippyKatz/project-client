import { FullUser, userType } from "./user.type";

export type AuthUser = {
    // id: string;
    // userName: string;
    email: string;
    // role: string;
    token: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: any | null;
    loading: boolean;
    error: string | null;
}