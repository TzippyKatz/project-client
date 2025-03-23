import { FullUser, userType } from "./user.type";

export type AuthUser = {
    id: string;
    userName: string;
    email: string;
    role: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
}